import { NextResponse } from "next/server";
import {
  buildAbsoluteUrl,
  emailShell,
  escapeHtml,
  getAllowedCvFiles,
  getOwnerEmail,
  sendCvEmail,
  verifyCvAccessToken,
} from "../../../lib/cv-access";
import { appendCvLeadEvent } from "../../../lib/google-sheets";
import { getPrivateCvFile, getPrivateCvDeliveryMode } from "../../../lib/private-cv-files";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const file = searchParams.get("file");

  if (!token || !file) {
    return NextResponse.redirect(buildAbsoluteUrl("/cv?status=missing-token"));
  }

  if (file !== "pt" && file !== "en") {
    return NextResponse.redirect(buildAbsoluteUrl("/cv/access?token=" + encodeURIComponent(token) + "&status=invalid-file"));
  }

  try {
    const payload = verifyCvAccessToken(token, "download_access");
    const allowedFiles = getAllowedCvFiles(payload.lead.cvVersion);

    if (!allowedFiles.includes(file)) {
      return NextResponse.redirect(buildAbsoluteUrl("/cv/access?token=" + encodeURIComponent(token) + "&status=file-not-allowed"));
    }

    const cvFile = await getPrivateCvFile(file);

    if (!cvFile.ok) {
      return NextResponse.redirect(
        buildAbsoluteUrl("/cv/access?token=" + encodeURIComponent(token) + "&status=file-not-configured")
      );
    }

    const accessedAt = new Date().toISOString();
    const deliveryMode = getPrivateCvDeliveryMode(file);
    const fileLabel = file.toUpperCase();
    const escapedLeadName = escapeHtml(payload.lead.fullName);
    const escapedLeadEmail = escapeHtml(payload.lead.professionalEmail);
    const escapedWhatsapp = escapeHtml(payload.lead.whatsapp);
    const escapedFileLabel = escapeHtml(fileLabel);
    const escapedDeliveryMode = escapeHtml(deliveryMode);
    const escapedAccessedAt = escapeHtml(accessedAt);

    await appendCvLeadEvent({
      status: "download_accessed",
      lead: payload.lead,
      request,
      file,
      notes: `Protected backend delivery issued for ${fileLabel} CV. Mode: ${deliveryMode}.`,
    });

    await sendCvEmail({
      to: getOwnerEmail(),
      replyTo: payload.lead.professionalEmail,
      subject: `CV acessado — ${payload.lead.fullName}`,
      text: [
        `${payload.lead.fullName} acessou o CV ${fileLabel}.`,
        `E-mail: ${payload.lead.professionalEmail}`,
        `WhatsApp: ${payload.lead.whatsapp}`,
        `Entrega: ${deliveryMode}`,
        `Acesso em: ${accessedAt}`,
      ].join("\n"),
      html: emailShell(
        "CV acessado",
        `
          <p style="margin:0 0 20px 0;line-height:1.7;">Um acesso ao CV foi registrado pelo backend protegido.</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">Nome</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapedLeadName}</td></tr>
            <tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">E-mail</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapedLeadEmail}</td></tr>
            <tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">WhatsApp</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapedWhatsapp}</td></tr>
            <tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">Arquivo</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapedFileLabel}</td></tr>
            <tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">Entrega</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapedDeliveryMode}</td></tr>
            <tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">Acesso em</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapedAccessedAt}</td></tr>
          </table>
        `
      ),
    });

    return new NextResponse(cvFile.body, {
      status: 200,
      headers: {
        "Content-Type": cvFile.contentType,
        "Content-Disposition": `attachment; filename="${cvFile.fileName}"`,
        "Cache-Control": "no-store, private, max-age=0",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch {
    return NextResponse.redirect(buildAbsoluteUrl("/cv?status=invalid-or-expired-token"));
  }
}
