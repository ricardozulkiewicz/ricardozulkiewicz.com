import { NextResponse } from "next/server";
import { buildCvLinkEmail, buildInternalNotificationEmail, sendEmail } from "@/app/lib/cv-mail";
import { getBaseUrl, logLeadEvent, readCvToken } from "@/app/lib/cv-access";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const baseUrl = getBaseUrl(request);

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/cv/link-expirado`);
  }

  try {
    const lead = readCvToken(token, "confirm");

    await sendEmail(buildCvLinkEmail(lead, request));
    await logLeadEvent("cv_email_confirmed", lead);

    try {
      await sendEmail(buildInternalNotificationEmail(lead));
    } catch (notificationError) {
      console.error("CV internal notification failed", notificationError);
    }

    return NextResponse.redirect(`${baseUrl}/cv/confirmado`);
  } catch (error) {
    console.error("CV confirmation failed", error);
    return NextResponse.redirect(`${baseUrl}/cv/link-expirado`);
  }
}
