import { NextResponse } from "next/server";

import { buildAbsoluteUrl } from "./cv-access";

export function redirectLegacyCvAccess() {
  const response = NextResponse.redirect(buildAbsoluteUrl("/cv"), 307);
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store, private, max-age=0");
  return response;
}
