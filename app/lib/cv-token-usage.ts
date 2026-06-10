import { type CvFile } from "./cv-access";
import { setEphemeralIfAbsent } from "./server-state";

export async function consumeCvDownloadToken(args: {
  tokenId: string;
  file: CvFile;
  expiresAt: number;
}) {
  const now = Math.floor(Date.now() / 1000);
  const ttlSeconds = Math.max(args.expiresAt - now + 60, 60);
  const result = await setEphemeralIfAbsent({
    key: `cv-download-used:${args.tokenId}:${args.file}`,
    value: new Date().toISOString(),
    ttlSeconds,
  });
  const remoteError = "remoteError" in result ? result.remoteError : undefined;

  return {
    allowed: result.stored,
    mode: result.mode,
    remoteError,
  };
}
