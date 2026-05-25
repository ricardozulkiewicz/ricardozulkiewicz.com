import { NextResponse } from "next/server";
import { getCvFileUrl, logLeadEvent, readCvToken } from "@/app/lib/cv-access";

export const runtime = "nodejs";

function resolveCvUrl(version: "pt" | "en" | "both") {
  if (version === "en") return getCvFileUrl("en");
  return getCvFileUrl("pt");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/cv/link-expirado", request.url));
  }

  try {
    const payload = readCvToken(token, "download");
    await logLeadEvent("cv_download_accessed", payload);

    const cvUrl = resolveCvUrl(payload.cvVersion);
    return NextResponse.redirect(cvUrl);
  } catch (error) {
    console.error("CV download failed", error);
    return NextResponse.redirect(new URL("/cv/link-expirado", request.url));
  }
}
