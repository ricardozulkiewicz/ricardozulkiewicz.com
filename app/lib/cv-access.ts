import crypto from "crypto";

export const cvVersions = ["pt", "en", "both"] as const;
export const interestReasons = [
  "recruiting",
  "networking",
  "partnership",
  "commercial",
  "conversation",
  "other",
] as const;

export type CvVersion = (typeof cvVersions)[number];
export type InterestReason = (typeof interestReasons)[number];
export type TokenKind = "confirm" | "download";

export type CvLeadPayload = {
  requestId: string;
  fullName: string;
  email: string;
  whatsapp: string;
  cvVersion: CvVersion;
  reason: InterestReason;
  company?: string;
  role?: string;
  linkedin?: string;
  message?: string;
  consent: true;
  requestedAt: string;
};

export type CvTokenPayload = CvLeadPayload & {
  kind: TokenKind;
  expiresAt: string;
};

type RawLeadInput = Record<string, unknown>;

const confirmationTtlMs = 24 * 60 * 60 * 1000;
const downloadTtlMs = 48 * 60 * 60 * 1000;

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getEncryptionKey() {
  return crypto.createHash("sha256").update(requiredEnv("CV_ACCESS_SECRET")).digest();
}

function toBase64Url(input: Buffer) {
  return input.toString("base64url");
}

function fromBase64Url(input: string) {
  return Buffer.from(input, "base64url");
}

function normalizeText(value: unknown, maxLength = 280) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeLongText(value: unknown, maxLength = 1200) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function isCvVersion(value: unknown): value is CvVersion {
  return typeof value === "string" && cvVersions.includes(value as CvVersion);
}

function isInterestReason(value: unknown): value is InterestReason {
  return typeof value === "string" && interestReasons.includes(value as InterestReason);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWhatsapp(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function parseLeadInput(input: RawLeadInput): CvLeadPayload {
  const fullName = normalizeText(input.fullName, 120);
  const email = normalizeText(input.email, 160).toLowerCase();
  const whatsapp = normalizeText(input.whatsapp, 40);
  const company = normalizeText(input.company, 120);
  const role = normalizeText(input.role, 120);
  const linkedin = normalizeText(input.linkedin, 220);
  const message = normalizeLongText(input.message, 1200);

  if (!fullName) throw new Error("Nome completo é obrigatório.");
  if (!email || !isValidEmail(email)) throw new Error("Informe um e-mail válido.");
  if (!whatsapp || !isValidWhatsapp(whatsapp)) throw new Error("Informe um WhatsApp válido com DDD.");
  if (!isCvVersion(input.cvVersion)) throw new Error("Selecione a versão desejada do CV.");
  if (!isInterestReason(input.reason)) throw new Error("Selecione o motivo do interesse.");
  if (input.consent !== true) throw new Error("O consentimento é obrigatório.");

  return {
    requestId: crypto.randomUUID(),
    fullName,
    email,
    whatsapp,
    cvVersion: input.cvVersion,
    reason: input.reason,
    company: company || undefined,
    role: role || undefined,
    linkedin: linkedin || undefined,
    message: message || undefined,
    consent: true,
    requestedAt: new Date().toISOString(),
  };
}

export function createCvToken(lead: CvLeadPayload, kind: TokenKind) {
  const expiresInMs = kind === "confirm" ? confirmationTtlMs : downloadTtlMs;
  const payload: CvTokenPayload = {
    ...lead,
    kind,
    expiresAt: new Date(Date.now() + expiresInMs).toISOString(),
  };

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [toBase64Url(iv), toBase64Url(tag), toBase64Url(encrypted)].join(".");
}

export function readCvToken(token: string, expectedKind?: TokenKind): CvTokenPayload {
  const [ivPart, tagPart, encryptedPart] = token.split(".");
  if (!ivPart || !tagPart || !encryptedPart) {
    throw new Error("Token inválido.");
  }

  const key = getEncryptionKey();
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, fromBase64Url(ivPart));
  decipher.setAuthTag(fromBase64Url(tagPart));

  const decrypted = Buffer.concat([
    decipher.update(fromBase64Url(encryptedPart)),
    decipher.final(),
  ]).toString("utf8");

  const payload = JSON.parse(decrypted) as CvTokenPayload;

  if (expectedKind && payload.kind !== expectedKind) {
    throw new Error("Tipo de token inválido.");
  }

  if (new Date(payload.expiresAt).getTime() < Date.now()) {
    throw new Error("Token expirado.");
  }

  return payload;
}

export function reasonLabel(reason: InterestReason) {
  const labels: Record<InterestReason, string> = {
    recruiting: "Recrutamento / vaga",
    networking: "Networking",
    partnership: "Parceria",
    commercial: "Oportunidade comercial",
    conversation: "Convite para conversa",
    other: "Outro",
  };
  return labels[reason];
}

export function versionLabel(version: CvVersion) {
  const labels: Record<CvVersion, string> = {
    pt: "Português",
    en: "Inglês",
    both: "Português e Inglês",
  };
  return labels[version];
}

export function getBaseUrl(request?: Request) {
  const origin = request?.headers.get("origin");
  if (origin) return origin;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getCvFileUrl(version: "pt" | "en") {
  const envName = version === "pt" ? "CV_PT_URL" : "CV_EN_URL";
  return requiredEnv(envName);
}

export async function logLeadEvent(event: string, payload: CvTokenPayload | CvLeadPayload) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, payload, occurredAt: new Date().toISOString() }),
    });
  } catch (error) {
    console.error("Failed to log CV lead event", error);
  }
}
