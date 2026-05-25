import { createHash, createSign } from "crypto";
import { type CvFile, type CvLead, getCvVersionLabel } from "./cv-access";

export type CvLeadEventStatus =
  | "request_submitted"
  | "email_confirmed"
  | "download_accessed";

type AppendLeadEventInput = {
  status: CvLeadEventStatus;
  lead: CvLead;
  request?: Request;
  file?: CvFile;
  notes?: string;
};

type SheetsAppendResult =
  | { configured: true; appended: true }
  | { configured: true; appended: false; error: string }
  | { configured: false; appended: false; error: string };

type GoogleAccessTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function getPrivateKey() {
  return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

export function isGoogleSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      getPrivateKey() &&
      process.env.CV_LEADS_SPREADSHEET_ID
  );
}

function getSheetName() {
  return process.env.CV_LEADS_SHEET_NAME || "CV Leads";
}

function getLeadId(lead: CvLead) {
  return createHash("sha256")
    .update(`${lead.professionalEmail}|${lead.whatsapp}|${lead.requestedAt}`)
    .digest("hex")
    .slice(0, 16);
}

function getRequestMetadata(request?: Request) {
  if (!request) {
    return {
      userAgent: "",
      referer: "",
      forwardedFor: "",
    };
  }

  return {
    userAgent: request.headers.get("user-agent") || "",
    referer: request.headers.get("referer") || "",
    forwardedFor:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "",
  };
}

function buildRow(input: AppendLeadEventInput) {
  const metadata = getRequestMetadata(input.request);

  return [
    new Date().toISOString(),
    input.status,
    getLeadId(input.lead),
    input.lead.requestedAt,
    input.lead.fullName,
    input.lead.professionalEmail,
    input.lead.whatsapp,
    input.lead.company || "",
    input.lead.role || "",
    input.lead.linkedin || "",
    getCvVersionLabel(input.lead.cvVersion),
    input.file || "",
    input.lead.reason,
    input.lead.message || "",
    metadata.userAgent,
    metadata.referer,
    metadata.forwardedFor,
    input.notes || "",
  ];
}

function getJwtAssertion() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets service account credentials are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claimSet = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: GOOGLE_SHEETS_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    })
  );
  const unsignedToken = `${header}.${claimSet}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
}

async function getGoogleAccessToken() {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: getJwtAssertion(),
    }),
  });

  const payload = (await response.json()) as GoogleAccessTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Could not fetch Google access token.");
  }

  return payload.access_token;
}

export async function appendCvLeadEvent(input: AppendLeadEventInput): Promise<SheetsAppendResult> {
  if (!isGoogleSheetsConfigured()) {
    return {
      configured: false,
      appended: false,
      error:
        "Google Sheets persistence is not configured. Set GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY and CV_LEADS_SPREADSHEET_ID.",
    };
  }

  try {
    const spreadsheetId = process.env.CV_LEADS_SPREADSHEET_ID as string;
    const sheetName = getSheetName();
    const accessToken = await getGoogleAccessToken();
    const range = encodeURIComponent(`'${sheetName}'!A:R`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [buildRow(input)] }),
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        configured: true,
        appended: false,
        error: error || "Google Sheets append failed.",
      };
    }

    return { configured: true, appended: true };
  } catch (error) {
    return {
      configured: true,
      appended: false,
      error: error instanceof Error ? error.message : "Google Sheets append failed.",
    };
  }
}
