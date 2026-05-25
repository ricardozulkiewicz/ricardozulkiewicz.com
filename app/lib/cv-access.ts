import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

export type CvVersion = "pt-br-commercial" | "en-commercial" | "both";
export type CvFile = "pt" | "en";
export type TokenType = "email_confirmation" | "download_access";

export type CvLead = {
  fullName: string;
  professionalEmail: string;
  whatsapp: string;
  company?: string;
  role?: string;
  linkedin?: string;
  cvVersion: CvVersion;
  reason: string;
  message?: string;
  consent: true;
  requestedAt: string;
};

type TokenPayload = {
  type: TokenType;
  lead: CvLead;
  iat: number;
  exp: number;
  tokenId: string;
};

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

type ValidationResult =
  | { ok: true; data: CvLead }
  | { ok: false; errors: Record<string, string> };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_SITE_URL = "https://ricardozulkiewicz.com";

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url");
}

function getTokenSecret() {
  const configuredSecret = process.env.CV_ACCESS_SECRET;

  if (configuredSecret) {
    return configuredSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("CV_ACCESS_SECRET is required in production.");
  }

  return "dev-only-insecure-cv-access-secret";
}

function getEncryptionKey() {
  return createHash("sha256").update(getTokenSecret()).digest();
}

function cleanString(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanLongString(value: unknown, maxLength = 1600) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isCvVersion(value: string): value is CvVersion {
  return ["pt-br-commercial", "en-commercial", "both"].includes(value);
}

export function validateCvLead(input: unknown): ValidationResult {
  const data = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const fullName = cleanString(data.fullName, 140);
  const professionalEmail = cleanString(data.professionalEmail, 180).toLowerCase();
  const whatsapp = cleanString(data.whatsapp, 60);
  const company = cleanString(data.company, 140);
  const role = cleanString(data.role, 140);
  const linkedin = cleanString(data.linkedin, 220);
  const rawCvVersion = cleanString(data.cvVersion, 80);
  const reason = cleanLongString(data.reason, 1200);
  const message = cleanLongString(data.message, 1600);
  const consent = data.consent === true;

  const errors: Record<string, string> = {};

  if (!fullName) errors.fullName = "Nome completo é obrigatório.";
  if (!professionalEmail || !EMAIL_REGEX.test(professionalEmail)) {
    errors.professionalEmail = "E-mail profissional válido é obrigatório.";
  }
  if (!whatsapp) errors.whatsapp = "WhatsApp é obrigatório.";
  if (!rawCvVersion || !isCvVersion(rawCvVersion)) {
    errors.cvVersion = "Versão de CV inválida.";
  }
  if (!reason) errors.reason = "Motivo do interesse é obrigatório.";
  if (!consent) errors.consent = "Consentimento é obrigatório.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      fullName,
      professionalEmail,
      whatsapp,
      company: company || undefined,
      role: role || undefined,
      linkedin: linkedin || undefined,
      cvVersion: rawCvVersion as CvVersion,
      reason,
      message: message || undefined,
      consent: true,
      requestedAt: new Date().toISOString(),
    },
  };
}

export function createCvAccessToken(args: {
  type: TokenType;
  lead: CvLead;
  expiresInSeconds: number;
}) {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    type: args.type,
    lead: args.lead,
    iat: now,
    exp: now + args.expiresInSeconds,
    tokenId: randomBytes(16).toString("hex"),
  };

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return base64UrlEncode(
    JSON.stringify({
      v: 1,
      iv: base64UrlEncode(iv),
      tag: base64UrlEncode(tag),
      data: base64UrlEncode(encrypted),
    })
  );
}

export function verifyCvAccessToken(token: string, expectedType?: TokenType): TokenPayload {
  try {
    const envelope = JSON.parse(base64UrlDecode(token).toString("utf8")) as {
      v: number;
      iv: string;
      tag: string;
      data: string;
    };

    if (envelope.v !== 1) {
      throw new Error("Unsupported token version.");
    }

    const decipher = createDecipheriv(
      "aes-256-gcm",
      getEncryptionKey(),
      base64UrlDecode(envelope.iv)
    );
    decipher.setAuthTag(base64UrlDecode(envelope.tag));

    const decrypted = Buffer.concat([
      decipher.update(base64UrlDecode(envelope.data)),
      decipher.final(),
    ]).toString("utf8");

    const payload = JSON.parse(decrypted) as TokenPayload;
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      throw new Error("Token expired.");
    }

    if (expectedType && payload.type !== expectedType) {
      throw new Error("Invalid token type.");
    }

    return payload;
  } catch {
    throw new Error("Invalid or expired token.");
  }
}

export function buildAbsoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return new URL(path, baseUrl).toString();
}

export function getOwnerEmail() {
  return process.env.CV_OWNER_EMAIL || "ricardomachado.zulk@gmail.com";
}

export function getCvVersionLabel(version: CvVersion) {
  const labels: Record<CvVersion, string> = {
    "pt-br-commercial": "Português — Account Executive / Vendas B2B",
    "en-commercial": "English — B2B Technology Sales",
    both: "Ambas as versões",
  };

  return labels[version];
}

export function getAllowedCvFiles(version: CvVersion): CvFile[] {
  if (version === "pt-br-commercial") return ["pt"];
  if (version === "en-commercial") return ["en"];
  return ["pt", "en"];
}

export function getConfiguredCvUrl(file: CvFile) {
  return file === "pt" ? process.env.CV_PT_DOWNLOAD_URL : process.env.CV_EN_DOWNLOAD_URL;
}

export function formatLeadText(lead: CvLead) {
  return [
    `Nome: ${lead.fullName}`,
    `E-mail: ${lead.professionalEmail}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Empresa: ${lead.company || "Não informado"}`,
    `Cargo: ${lead.role || "Não informado"}`,
    `LinkedIn: ${lead.linkedin || "Não informado"}`,
    `CV solicitado: ${getCvVersionLabel(lead.cvVersion)}`,
    `Motivo: ${lead.reason}`,
    `Mensagem: ${lead.message || "Não informado"}`,
    `Solicitado em: ${lead.requestedAt}`,
  ].join("\n");
}

export function formatLeadHtml(lead: CvLead) {
  const rows = [
    ["Nome", lead.fullName],
    ["E-mail", lead.professionalEmail],
    ["WhatsApp", lead.whatsapp],
    ["Empresa", lead.company || "Não informado"],
    ["Cargo", lead.role || "Não informado"],
    ["LinkedIn", lead.linkedin || "Não informado"],
    ["CV solicitado", getCvVersionLabel(lead.cvVersion)],
    ["Motivo", lead.reason],
    ["Mensagem", lead.message || "Não informado"],
    ["Solicitado em", lead.requestedAt],
  ];

  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;width:160px;">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendCvEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CV_EMAIL_FROM;

  if (!apiKey || !from) {
    return {
      sent: false,
      error: "Email provider is not configured. Set RESEND_API_KEY and CV_EMAIL_FROM.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { sent: false, error: errorText || "Email provider rejected the request." };
  }

  return { sent: true };
}

export function emailShell(title: string, body: string) {
  return `
    <div style="margin:0;padding:0;background:#f7f5f0;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;">
      <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
        <div style="background:#1f1f1f;color:#f7f5f0;padding:28px;border-radius:0;">
          <p style="margin:0 0 12px 0;color:#57a6b7;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;">Ricardo Zulk</p>
          <h1 style="margin:0;font-size:28px;line-height:1.15;font-weight:400;letter-spacing:-0.03em;">${escapeHtml(title)}</h1>
        </div>
        <div style="background:#ffffff;padding:28px;border:1px solid #e5e7eb;">
          ${body}
        </div>
      </div>
    </div>
  `;
}
