import { createSign } from "crypto";
import { type CvFile } from "./cv-access";

type PrivateCvFileResult =
  | {
      ok: true;
      body: ArrayBuffer;
      contentType: string;
      fileName: string;
    }
  | {
      ok: false;
      reason: "not_configured" | "fetch_failed" | "invalid_response";
      status?: number;
      detail?: string;
    };

type GoogleAccessTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.readonly";

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function getPrivateKey() {
  return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getJwtAssertion(scope: string) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error("Google service account credentials are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claimSet = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope,
      aud: GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    })
  );
  const unsignedToken = `${header}.${claimSet}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
}

async function getGoogleAccessToken(scope: string) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: getJwtAssertion(scope),
    }),
  });

  const payload = (await response.json()) as GoogleAccessTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Could not fetch Google access token.");
  }

  return payload.access_token;
}

function getFileName(file: CvFile) {
  return file === "pt"
    ? "Ricardo_Zulkiewicz_CV_PT.pdf"
    : "Ricardo_Zulkiewicz_CV_EN.pdf";
}

function getGoogleDriveFileId(file: CvFile) {
  return file === "pt"
    ? process.env.CV_PT_GOOGLE_DRIVE_FILE_ID
    : process.env.CV_EN_GOOGLE_DRIVE_FILE_ID;
}

function getFallbackSourceUrl(file: CvFile) {
  return file === "pt" ? process.env.CV_PT_DOWNLOAD_URL : process.env.CV_EN_DOWNLOAD_URL;
}

function getSourceAuthHeaders() {
  const authHeader = process.env.CV_FILE_SOURCE_AUTH_HEADER;

  if (!authHeader) {
    return undefined;
  }

  return { Authorization: authHeader };
}

async function fetchGoogleDriveFile(file: CvFile, fileId: string): Promise<PrivateCvFileResult> {
  try {
    const accessToken = await getGoogleAccessToken(GOOGLE_DRIVE_SCOPE);
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      return {
        ok: false,
        reason: "fetch_failed",
        status: response.status,
        detail,
      };
    }

    return {
      ok: true,
      body: await response.arrayBuffer(),
      contentType: response.headers.get("content-type") || "application/pdf",
      fileName: getFileName(file),
    };
  } catch (error) {
    return {
      ok: false,
      reason: "fetch_failed",
      detail: error instanceof Error ? error.message : "Google Drive file fetch failed.",
    };
  }
}

async function fetchSourceUrl(file: CvFile, sourceUrl: string): Promise<PrivateCvFileResult> {
  try {
    const response = await fetch(sourceUrl, {
      headers: getSourceAuthHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        reason: "fetch_failed",
        status: response.status,
        detail: await response.text(),
      };
    }

    return {
      ok: true,
      body: await response.arrayBuffer(),
      contentType: response.headers.get("content-type") || "application/pdf",
      fileName: getFileName(file),
    };
  } catch (error) {
    return {
      ok: false,
      reason: "fetch_failed",
      detail: error instanceof Error ? error.message : "CV source URL fetch failed.",
    };
  }
}

export function isPrivateCvDeliveryConfigured() {
  return Boolean(
    process.env.CV_PT_GOOGLE_DRIVE_FILE_ID ||
      process.env.CV_EN_GOOGLE_DRIVE_FILE_ID ||
      process.env.CV_PT_DOWNLOAD_URL ||
      process.env.CV_EN_DOWNLOAD_URL
  );
}

export async function getPrivateCvFile(file: CvFile): Promise<PrivateCvFileResult> {
  const googleDriveFileId = getGoogleDriveFileId(file);

  if (googleDriveFileId) {
    return fetchGoogleDriveFile(file, googleDriveFileId);
  }

  const fallbackSourceUrl = getFallbackSourceUrl(file);

  if (fallbackSourceUrl) {
    return fetchSourceUrl(file, fallbackSourceUrl);
  }

  return {
    ok: false,
    reason: "not_configured",
  };
}

export function getPrivateCvDeliveryMode(file: CvFile) {
  if (getGoogleDriveFileId(file)) return "google_drive_service_account";
  if (getFallbackSourceUrl(file)) return "server_side_source_url_proxy";
  return "not_configured";
}
