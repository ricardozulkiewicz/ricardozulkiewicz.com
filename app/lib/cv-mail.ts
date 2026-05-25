import "server-only";

import {
  createCvToken,
  getBaseUrl,
  type CvLeadPayload,
  type CvTokenPayload,
  reasonLabel,
  versionLabel,
} from "./cv-access";

type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function button(label: string, href: string) {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:#0F4C5C;color:#F7F5F0;text-decoration:none;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:14px 20px;border-radius:14px;font-size:12px;">${escapeHtml(label)}</a>`;
}

function shell(title: string, preview: string, body: string) {
  return `<!doctype html><html><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${escapeHtml(title)}</title></head><body style="margin:0;background:#1F1F1F;color:#F7F5F0;font-family:Montserrat,Inter,Arial,sans-serif;"><span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preview)}</span><table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background:#1F1F1F;padding:32px 16px;"><tr><td align="center"><table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;border:1px solid rgba(247,245,240,.14);background:#242424;border-radius:28px;overflow:hidden;"><tr><td style="padding:32px 32px 20px;"><div style="font-size:13px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#F7F5F0;">Ricardo Zulk</div><div style="margin-top:8px;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#57a6b7;">B2B Technology Sales</div></td></tr><tr><td style="padding:8px 32px 36px;">${body}</td></tr><tr><td style="border-top:1px solid rgba(247,245,240,.12);padding:22px 32px;color:rgba(216,216,216,.64);font-size:12px;line-height:1.7;">Este e-mail foi enviado a partir de uma solicitação feita em ricardozulkiewicz.com.</td></tr></table></td></tr></table></body></html>`;
}

export function buildConfirmationEmail(lead: CvLeadPayload, request: Request): EmailMessage {
  const baseUrl = getBaseUrl(request);
  const token = createCvToken(lead, "confirm");
  const confirmationUrl = `${baseUrl}/cv/confirmar?token=${encodeURIComponent(token)}`;

  const subject = "Confirme seu e-mail para acessar o CV de Ricardo Zulkiewicz";
  const text = `Olá, ${lead.fullName}.\n\nRecebi sua solicitação de acesso ao meu CV profissional.\n\nPara confirmar seu e-mail e seguir com o acesso ao documento, acesse:\n${confirmationUrl}\n\nApós a confirmação, você receberá a versão mais recente do meu CV em PDF.\n\nAtenciosamente,\nRicardo Zulkiewicz`;
  const html = shell(
    subject,
    "Confirme seu e-mail para receber o acesso ao CV.",
    `<h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;letter-spacing:-.04em;color:#F7F5F0;">Confirme seu e-mail para acessar meu CV.</h1><p style="margin:0 0 24px;color:rgba(216,216,216,.76);font-size:15px;line-height:1.8;">Olá, ${escapeHtml(lead.fullName)}. Recebi sua solicitação de acesso ao meu CV profissional. Para confirmar seu e-mail e seguir com o acesso ao documento, clique no botão abaixo.</p>${button("Confirmar e-mail", confirmationUrl)}<p style="margin:24px 0 0;color:rgba(216,216,216,.58);font-size:13px;line-height:1.7;">Após a confirmação, você receberá a versão mais recente do meu CV em PDF.</p>`
  );

  return { to: lead.email, subject, html, text };
}

export function buildCvLinkEmail(lead: CvTokenPayload, request: Request): EmailMessage {
  const baseUrl = getBaseUrl(request);
  const token = createCvToken(lead, "download");
  const downloadUrl = `${baseUrl}/download/cv?token=${encodeURIComponent(token)}`;

  const subject = "CV Ricardo Zulkiewicz";
  const text = `Olá, ${lead.fullName}.\n\nObrigado por confirmar seu e-mail.\n\nVocê pode acessar meu CV profissional em PDF pelo link abaixo:\n${downloadUrl}\n\nEste link é individual e temporário.\n\nAtenciosamente,\nRicardo Zulkiewicz`;
  const html = shell(
    subject,
    "Seu acesso ao CV foi liberado.",
    `<h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;letter-spacing:-.04em;color:#F7F5F0;">Seu acesso ao CV foi liberado.</h1><p style="margin:0 0 24px;color:rgba(216,216,216,.76);font-size:15px;line-height:1.8;">Olá, ${escapeHtml(lead.fullName)}. Obrigado por confirmar seu e-mail. Você pode acessar meu CV profissional em PDF pelo link abaixo.</p>${button("Baixar CV em PDF", downloadUrl)}<p style="margin:24px 0 0;color:rgba(216,216,216,.58);font-size:13px;line-height:1.7;">Este link é individual, temporário e vinculado à solicitação confirmada.</p>`
  );

  return { to: lead.email, subject, html, text };
}

export function buildInternalNotificationEmail(lead: CvTokenPayload): EmailMessage {
  const to = requiredEnv("CV_NOTIFICATION_EMAIL");
  const subject = `Nova solicitação confirmada de CV — ${lead.fullName}`;
  const detailRows = [
    ["Nome", lead.fullName],
    ["E-mail", lead.email],
    ["WhatsApp", lead.whatsapp],
    ["Versão do CV", versionLabel(lead.cvVersion)],
    ["Motivo", reasonLabel(lead.reason)],
    ["Empresa", lead.company || "Não informado"],
    ["Cargo", lead.role || "Não informado"],
    ["LinkedIn", lead.linkedin || "Não informado"],
    ["Mensagem", lead.message || "Não informado"],
    ["Solicitado em", lead.requestedAt],
  ];

  const text = detailRows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = detailRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 0;color:rgba(216,216,216,.54);font-size:12px;text-transform:uppercase;letter-spacing:.12em;border-bottom:1px solid rgba(247,245,240,.1);">${escapeHtml(label)}</td><td style="padding:10px 0;color:#F7F5F0;font-size:14px;border-bottom:1px solid rgba(247,245,240,.1);">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = shell(
    subject,
    "Novo lead confirmado no fluxo de CV.",
    `<h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;letter-spacing:-.04em;color:#F7F5F0;">Nova solicitação confirmada de CV.</h1><p style="margin:0 0 24px;color:rgba(216,216,216,.76);font-size:15px;line-height:1.8;">Um visitante confirmou o e-mail e recebeu o link individual de acesso ao CV.</p><table role="presentation" width="100%" cellPadding="0" cellSpacing="0">${htmlRows}</table>`
  );

  return { to, subject, html, text };
}

export async function sendEmail(message: EmailMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Ricardo Zulk <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured. Email was not sent.", {
      to: message.to,
      subject: message.subject,
    });
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${response.status} ${errorText}`);
  }

  return response.json();
}
