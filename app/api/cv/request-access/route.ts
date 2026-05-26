import { NextResponse } from "next/server";
import {
  buildAbsoluteUrl,
  createCvAccessToken,
  emailShell,
  escapeHtml,
  formatLeadHtml,
  formatLeadText,
  getOwnerEmail,
  getCvVersionLabel,
  sendCvEmail,
  validateCvLead,
} from "../../../lib/cv-access";
import { appendCvLeadEvent } from "../../../lib/google-sheets";
import { checkRateLimit, getClientIp, getRetryAfterSeconds } from "../../../lib/rate-limit";

export const runtime = "nodejs";

function isSpamSubmission(body: unknown) {
  if (!body || typeof body !== "object") {
    return false;
  }

  const data = body as Record<string, unknown>;
  const honeypotValues = [
    data.website,
    data.companyWebsite,
    data.url,
    data.homepage,
  ];

  return honeypotValues.some(
    (value) => typeof value === "string" && value.trim().length > 0
  );
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `cv-request:${clientIp}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const retryAfter = getRetryAfterSeconds(rateLimit.resetAt);

    return NextResponse.json(
      {
        ok: false,
        error: "Too many CV access requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
        },
      }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (isSpamSubmission(body)) {
    return NextResponse.json(
      { ok: true, status: "received" },
      {
        status: 202,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
        },
      }
    );
  }

  const validation = validateCvLead(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 422 }
    );
  }

  const lead = validation.data;
  const persistence = await appendCvLeadEvent({
    status: "request_submitted",
    lead,
    request,
  });
  const confirmationToken = createCvAccessToken({
    type: "email_confirmation",
    lead,
    expiresInSeconds: 60 * 60 * 24,
  });
  const confirmationUrl = buildAbsoluteUrl(`/api/cv/confirm-email?token=${confirmationToken}`);
  const escapedLeadName = escapeHtml(lead.fullName);
  const escapedConfirmationUrl = escapeHtml(confirmationUrl);

  const confirmationEmail = await sendCvEmail({
    to: lead.professionalEmail,
    replyTo: getOwnerEmail(),
    subject: "Confirme seu e-mail para acessar o CV de Ricardo Zulk",
    text: [
      `Olá, ${lead.fullName}.`,
      "",
      "Recebemos sua solicitação de acesso ao CV de Ricardo Zulkiewicz.",
      "Para confirmar seu e-mail e receber o link temporário de acesso, abra o link abaixo:",
      "",
      confirmationUrl,
      "",
      "Este link expira em 24 horas.",
      "",
      "Ricardo Zulk",
    ].join("\n"),
    html: emailShell(
      "Confirme seu e-mail para acessar o CV",
      `
        <p style="margin:0 0 16px 0;line-height:1.7;">Olá, <strong>${escapedLeadName}</strong>.</p>
        <p style="margin:0 0 20px 0;line-height:1.7;">Recebemos sua solicitação de acesso ao CV de Ricardo Zulkiewicz. Para continuar, confirme seu e-mail. Depois disso, você receberá um segundo e-mail com um link único e temporário para acessar o CV.</p>
        <p style="margin:24px 0;"><a href="${escapedConfirmationUrl}" style="display:inline-block;background:#0f4c5c;color:#f7f5f0;text-decoration:none;padding:14px 20px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Confirmar e-mail</a></p>
        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Este link expira em 24 horas. Caso você não tenha solicitado acesso, ignore este e-mail.</p>
      `
    ),
  });

  const ownerNotification = await sendCvEmail({
    to: getOwnerEmail(),
    replyTo: lead.professionalEmail,
    subject: `Nova solicitação de CV — ${lead.fullName}`,
    text: formatLeadText(lead),
    html: emailShell(
      "Nova solicitação de acesso ao CV",
      `
        <p style="margin:0 0 20px 0;line-height:1.7;">Uma nova pessoa solicitou acesso ao seu CV.</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">${formatLeadHtml(lead)}</table>
      `
    ),
  });

  const response = {
    ok: true,
    status: "pending_confirmation",
    message:
      "Solicitação registrada. Se o provedor de e-mail estiver configurado, um e-mail de confirmação será enviado ao endereço informado.",
    lead: {
      fullName: lead.fullName,
      professionalEmail: lead.professionalEmail,
      cvVersion: getCvVersionLabel(lead.cvVersion),
    },
    email: {
      confirmationSent: confirmationEmail.sent,
      ownerNotificationSent: ownerNotification.sent,
      providerConfigured: confirmationEmail.sent && ownerNotification.sent,
    },
    persistence,
  };

  return NextResponse.json(response, {
    headers: {
      "X-RateLimit-Limit": "5",
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
    },
  });
}
