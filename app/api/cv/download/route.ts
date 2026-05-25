import { NextResponse } from "next/server";
import {
  buildAbsoluteUrl,
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

    await appendCvLeadEvent({
      status: "download_accessed",
      lead: payload.lead,
      request,
      file,
      notes: `Protected backend delivery issued for ${file.toUpperCase()} CV. Mode: ${deliveryMode}.`,
    });

    await sendCvEmail({
      to: getOwnerEmail(),
      replyTo: payload.lead.professionalEmail,
      subject: `CV acessado — ${payload.lead.fullName}`,
      text: [
        `${payload.lead.fullName} acessou o CV ${file.toUpperCase()}.`,
        `E-mail: ${payload.lead.professionalEmail}`,
        `WhatsApp: ${payload.lead.whatsapp}`,
        `Entrega: ${deliveryMode}`,
        `Acesso em: ${accessedAt}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
          <h1>CV acessado</h1>
          <p><strong>Nome:</strong> ${payload.lead.fullName}</p>
          <p><strong>E-mail:</strong> ${payload.lead.professionalEmail}</p>
          <p><strong>WhatsApp:</strong> ${payload.lead.whatsapp}</p>
          <p><strong>Arquivo:</strong> ${file.toUpperCase()}</p>
          <p><strong>Entrega:</strong> ${deliveryMode}</p>
          <p><strong>Acesso em:</strong> ${accessedAt}</p>
        </div>
      `,
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
