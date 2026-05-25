import { NextResponse } from "next/server";
import {
  buildAbsoluteUrl,
  createCvAccessToken,
  emailShell,
  formatLeadHtml,
  formatLeadText,
  getOwnerEmail,
  getCvVersionLabel,
  sendCvEmail,
  validateCvLead,
} from "../../../lib/cv-access";
import { appendCvLeadEvent } from "../../../lib/google-sheets";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
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
        <p style="margin:0 0 16px 0;line-height:1.7;">Olá, <strong>${lead.fullName}</strong>.</p>
        <p style="margin:0 0 20px 0;line-height:1.7;">Recebemos sua solicitação de acesso ao CV de Ricardo Zulkiewicz. Para continuar, confirme seu e-mail. Depois disso, você receberá um segundo e-mail com um link único e temporário para acessar o CV.</p>
        <p style="margin:24px 0;"><a href="${confirmationUrl}" style="display:inline-block;background:#0f4c5c;color:#f7f5f0;text-decoration:none;padding:14px 20px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Confirmar e-mail</a></p>
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

  return NextResponse.json(response);
}
