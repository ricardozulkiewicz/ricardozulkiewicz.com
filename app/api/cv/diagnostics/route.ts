import { NextResponse } from "next/server";
import {
  createCvAccessToken,
  verifyCvAccessToken,
  type CvLead,
} from "../../../lib/cv-access";
import { isGoogleSheetsConfigured } from "../../../lib/google-sheets";
import {
  getPrivateCvDeliveryMode,
  isPrivateCvDeliveryConfigured,
} from "../../../lib/private-cv-files";

export const runtime = "nodejs";

type EnvCheck = {
  key: string;
  required: boolean;
  configured: boolean;
  purpose: string;
};

function unauthorized(status = 404) {
  return NextResponse.json({ ok: false, error: "Not found." }, { status });
}

function isAuthorized(request: Request) {
  const configuredToken = process.env.CV_ADMIN_TOKEN;

  if (!configuredToken) {
    return false;
  }

  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

  return token === configuredToken;
}

function envCheck(key: string, required: boolean, purpose: string): EnvCheck {
  return {
    key,
    required,
    configured: Boolean(process.env[key]),
    purpose,
  };
}

function getEnvironmentChecks(): EnvCheck[] {
  return [
    envCheck("NEXT_PUBLIC_SITE_URL", true, "Builds absolute confirmation and access links."),
    envCheck("CV_ACCESS_SECRET", true, "Encrypts and validates temporary CV access tokens."),
    envCheck("CV_ADMIN_TOKEN", true, "Protects this diagnostics endpoint."),
    envCheck("RESEND_API_KEY", true, "Sends confirmation, access and owner-notification e-mails."),
    envCheck("CV_EMAIL_FROM", true, "Defines the verified sender used by Resend."),
    envCheck("CV_OWNER_EMAIL", true, "Receives lead notifications and access alerts."),
    envCheck("CV_PT_GOOGLE_DRIVE_FILE_ID", false, "Preferred: private Google Drive file ID for the Portuguese CV."),
    envCheck("CV_EN_GOOGLE_DRIVE_FILE_ID", false, "Preferred: private Google Drive file ID for the English CV."),
    envCheck("CV_PT_DOWNLOAD_URL", false, "Fallback: server-side source URL for the Portuguese CV."),
    envCheck("CV_EN_DOWNLOAD_URL", false, "Fallback: server-side source URL for the English CV."),
    envCheck("CV_FILE_SOURCE_AUTH_HEADER", false, "Optional Authorization header for fallback private source URLs."),
    envCheck("GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL", false, "Optional: service account e-mail used for Google Sheets and private Google Drive files."),
    envCheck("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY", false, "Optional: service account private key used for Google Sheets and private Google Drive files."),
    envCheck("CV_LEADS_SPREADSHEET_ID", false, "Optional: Google Sheets spreadsheet ID used to persist lead events."),
    envCheck("CV_LEADS_SHEET_NAME", false, "Optional: Google Sheets tab name. Defaults to CV Leads."),
  ];
}

function runTokenSelfTest() {
  const lead: CvLead = {
    fullName: "Diagnostics Lead",
    professionalEmail: "diagnostics@example.com",
    whatsapp: "+55 11 99999-9999",
    cvVersion: "pt-br-commercial",
    reason: "Production diagnostics token self-test.",
    consent: true,
    requestedAt: new Date().toISOString(),
  };

  const token = createCvAccessToken({
    type: "email_confirmation",
    lead,
    expiresInSeconds: 60,
  });
  const payload = verifyCvAccessToken(token, "email_confirmation");

  return payload.lead.professionalEmail === lead.professionalEmail;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return unauthorized(process.env.CV_ADMIN_TOKEN ? 401 : 404);
  }

  const checks = getEnvironmentChecks();
  const missingRequired = checks.filter((check) => check.required && !check.configured);

  let tokenSelfTest = false;
  let tokenSelfTestError: string | null = null;

  try {
    tokenSelfTest = runTokenSelfTest();
  } catch (error) {
    tokenSelfTest = false;
    tokenSelfTestError = error instanceof Error ? error.message : "Token self-test failed.";
  }

  const sheetsConfigured = isGoogleSheetsConfigured();
  const privateCvDeliveryConfigured = isPrivateCvDeliveryConfigured();

  return NextResponse.json({
    ok: missingRequired.length === 0 && tokenSelfTest && privateCvDeliveryConfigured,
    status:
      missingRequired.length === 0 && tokenSelfTest && privateCvDeliveryConfigured
        ? "ready"
        : "incomplete",
    environment: process.env.NODE_ENV || "unknown",
    checks,
    missingRequired: missingRequired.map((check) => check.key),
    tokenSelfTest: {
      ok: tokenSelfTest,
      error: tokenSelfTestError,
    },
    privateCvDelivery: {
      configured: privateCvDeliveryConfigured,
      ptMode: getPrivateCvDeliveryMode("pt"),
      enMode: getPrivateCvDeliveryMode("en"),
    },
    persistence: {
      googleSheets: {
        configured: sheetsConfigured,
        mode: sheetsConfigured ? "enabled" : "disabled_optional",
      },
    },
  });
}
