import { NextResponse } from "next/server";
import { buildConfirmationEmail, sendEmail } from "@/app/lib/cv-mail";
import { logLeadEvent, parseLeadInput } from "@/app/lib/cv-access";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const lead = parseLeadInput(body);

    await sendEmail(buildConfirmationEmail(lead, request));
    await logLeadEvent("cv_request_created", lead);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado ao processar solicitação.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
