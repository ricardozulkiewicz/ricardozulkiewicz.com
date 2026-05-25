import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, TimerReset } from "lucide-react";
import { readCvToken, versionLabel } from "@/app/lib/cv-access";

export const metadata: Metadata = {
  title: "Download do CV | Ricardo Zulkiewicz",
  description: "Download autorizado do CV profissional de Ricardo Zulkiewicz.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: {
    token?: string;
  };
};

export default function CvDownloadPage({ searchParams }: PageProps) {
  const token = searchParams?.token || "";

  try {
    const payload = readCvToken(token, "download");

    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#1F1F1F] px-5 py-12 text-[#F7F5F0] antialiased">
        <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#0F4C5C]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-56 h-[28rem] w-[28rem] rounded-full bg-white/[0.035] blur-3xl" />

        <section className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0F4C5C]/50 bg-[#0F4C5C]/20">
            <Download className="h-8 w-8 text-[#F7F5F0]" />
          </div>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D8D8D8]/70">
            <FileText className="h-4 w-4" />
            Acesso autorizado
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Seu CV está pronto para download.
          </h1>

          <p className="mt-5 text-base leading-8 text-[#D8D8D8]/70">
            Este link é individual, temporário e vinculado à solicitação confirmada de {payload.fullName}. Versão
            solicitada: {versionLabel(payload.cvVersion)}.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left">
            <div className="flex items-start gap-3">
              <TimerReset className="mt-0.5 h-5 w-5 shrink-0 text-[#0F4C5C]" />
              <div>
                <p className="text-sm font-semibold text-[#F7F5F0]">Link válido por 48 horas</p>
                <p className="mt-1 text-sm leading-6 text-[#D8D8D8]/65">
                  Caso o prazo expire, será necessário solicitar um novo acesso ao CV.
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/api/cv/download?token=${encodeURIComponent(token)}`}
            className="group mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#F7F5F0] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#1F1F1F] transition hover:translate-y-[-1px]"
          >
            Baixar CV em PDF
            <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </Link>
        </section>
      </main>
    );
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1F1F1F] px-5 py-12 text-[#F7F5F0] antialiased">
        <section className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Link inválido ou expirado.</h1>
          <p className="mt-5 text-base leading-8 text-[#D8D8D8]/70">
            Este link não está mais disponível. Para receber um novo acesso, faça uma nova solicitação.
          </p>
          <Link
            href="/cv/link-expirado"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#F7F5F0] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#1F1F1F]"
          >
            Solicitar novo acesso
          </Link>
        </section>
      </main>
    );
  }
}
