import { redirectLegacyCvAccess } from "../../lib/legacy-cv-redirect";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return redirectLegacyCvAccess();
}
