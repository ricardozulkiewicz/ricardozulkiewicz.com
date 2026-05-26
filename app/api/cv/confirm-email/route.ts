import { NextResponse } from "next/server";
import {
  buildAbsoluteUrl,
  createCvAccessToken,
  emailShell,
  escapeHtml,
  formatLeadHtml,
  formatLeadText,
  getAllowedCvFiles,
  getOwnerEmail,
  getCvVersionLabel,
  sendCvEmail,
  verifyCvAccessToken,
} from "../../../lib/cv-access";
import { appendCvLeadEvent } from "../../../lib/google-sheets";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(buildAbsoluteUrl("/cv?status=missing-token"));
  }

  try {
    const payload = verifyCvAccessToken(token, "email_confirmation");
    const lead = payload.lead;
    const downloadToken = createCvAccessToken({
      type: "download_access",
      lead,
      expiresInSeconds: 60 * 60 * 24,
    });
    const accessUrl = buildAbsoluteUrl(`/cv/access?token=${downloadToken}`);
    const files = getAllowedCvFiles(lead.cvVersion);
    const cvVersionLabel = getCvVersionLabel(lead.cvVersion);
    const releasedFiles = files.join(", ");
    const escapedLeadName = escapeHtml(lead.fullName);
    const escapedAccessUrl = escapeHtml(accessUrl);
    const escapedCvVersionLabel = escapeHtml(cvVersionLabel);
    const escapedReleasedFiles = escapeHtml(releasedFiles);

    await appendCvLeadEvent({
      status: "email_confirmed",
      lead,
      request,
      notes: `Arquivos liberados: ${releasedFiles}`,
    });

    await sendCvEmail({
      to: lead.professionalEmail,
      replyTo: getOwnerEmail(),
      subject: "Seu link temporário de acesso ao CV de Ricardo Zulk",
      text: [
        `Olá, ${lead.fullName}.`,
        "",
        "Seu e-mail foi confirmado.",
        `Versão solicitada: ${cvVersionLabel}.`,
        "",
        "Acesse seu link temporário abaixo:",
        accessUrl,
        "",
        "Este link expira em 24 horas.",
        "",
        "Ricardo Zulk",
      ].join("\n"),
      html: emailShell(
        "Seu link temporário de acesso ao CV",
        `
          <p style="margin:0 0 16px 0;line-height:1.7;">Olá, <strong>${escapedLeadName}</strong>.</p>
          <p style="margin:0 0 20px 0;line-height:1.7;">Seu e-mail foi confirmado. Use o link abaixo para acessar a versão solicitada do CV.</p>
          <p style="margin:0 0 16px 0;line-height:1.7;"><strong>Versão solicitada:</strong> ${escapedCvVersionLabel}</p>
          <p style="margin:24px 0;"><a href="${escapedAccessUrl}" style="display:inline-block;background:#0f4c5c;color:#f7f5f0;text-decoration:none;padding:14px 20px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Acessar CV</a></p>
          <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Este link expira em 24 horas e foi gerado apenas para este acesso.</p>
        `
      ),
    });

    await sendCvEmail({
      to: getOwnerEmail(),
      replyTo: lead.professionalEmail,
      subject: `E-mail confirmado para CV — ${lead.fullName}`,
      text: [
        "O e-mail do lead foi confirmado e o link temporário do CV foi enviado.",
        "",
        formatLeadText(lead),
        "",
        `Arquivos liberados: ${releasedFiles}`,
      ].join("\n"),
      html: emailShell(
        "E-mail confirmado para acesso ao CV",
        `
          <p style="margin:0 0 20px 0;line-height:1.7;">O e-mail do lead foi confirmado e o link temporário do CV foi enviado.</p>
          <p style="margin:0 0 20px 0;line-height:1.7;"><strong>Arquivos liberados:</strong> ${escapedReleasedFiles}</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">${formatLeadHtml(lead)}</table>
        `
      ),
    });

    return NextResponse.redirect(buildAbsoluteUrl("/cv?status=email-confirmed"));
  } catch {
    return NextResponse.redirect(buildAbsoluteUrl("/cv?status=invalid-or-expired-token"));
  }
}
