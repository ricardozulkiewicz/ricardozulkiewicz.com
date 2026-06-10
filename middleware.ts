import { NextRequest, NextResponse } from "next/server";

const LEGACY_DIRECT_CV_PATHS = new Set([
  "/cv/en",
  "/cv/pt",
  "/cv/pt-final",
  "/cv/ricardo-zulkiewicz-cv-en",
  "/cv/ricardo-zulkiewicz-cv-pt",
  "/Ricardo_Zulkiewicz_CV_PT.pdf",
  "/Ricardo_Zulkiewicz_CV_EN.pdf",
  "/CV_Ricardo_Zulkiewicz_PT.pdf",
  "/CV_Ricardo_Zulkiewicz_EN.pdf",
  "/Ricardo_Zulkiewicz_CV_English.pdf",
  "/Ricardo_Zulkiewicz_CV_English..pdf",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LEGACY_DIRECT_CV_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/cv";
    url.search = "";

    const response = NextResponse.redirect(url, 307);
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store, private, max-age=0");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cv/en",
    "/cv/pt",
    "/cv/pt-final",
    "/cv/ricardo-zulkiewicz-cv-en",
    "/cv/ricardo-zulkiewicz-cv-pt",
    "/Ricardo_Zulkiewicz_CV_PT.pdf",
    "/Ricardo_Zulkiewicz_CV_EN.pdf",
    "/CV_Ricardo_Zulkiewicz_PT.pdf",
    "/CV_Ricardo_Zulkiewicz_EN.pdf",
    "/Ricardo_Zulkiewicz_CV_English.pdf",
    "/Ricardo_Zulkiewicz_CV_English..pdf",
  ],
};
