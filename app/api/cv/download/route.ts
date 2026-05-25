import { NextResponse } from "next/server";
import { getCvFileUrl, logLeadEvent, readCvToken, type CvVersion } from "@/app/lib/cv-access";

export const runtime = "nodejs";

type DownloadVersion = "pt" | "en";

function isDownloadVersion(value: string | null): value is DownloadVersion {
  return value === "pt" || value === "en";
}

function resolveRequestedVersion(cvVersion: CvVersion, requestedVersion: string | null): DownloadVersion {
  if (cvVersion === "both") {
    return isDownloadVersion(requestedVersion) ? requestedVersion : "pt";
  }

  return cvVersion;
}

function resolveCvUrl(version: DownloadVersion) {
  return getCvFileUrl(version);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/cv/link-expirado", request.url));
  }

  try {
    const payload = readCvToken(token, "download");
    const requestedVersion = resolveRequestedVersion(payload.cvVersion, url.searchParams.get("version"));

    await logLeadEvent(`cv_download_accessed_${requestedVersion}`, payload);

    const cvUrl = resolveCvUrl(requestedVersion);
    return NextResponse.redirect(cvUrl);
  } catch (error) {
    console.error("CV download failed", error);
    return NextResponse.redirect(new URL("/cv/link-expirado", request.url));
  }
}
