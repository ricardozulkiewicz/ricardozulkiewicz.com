import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, RefreshCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Link expirado | Ricardo Zulkiewicz",
  description: "Link de acesso ao CV expirado ou inválido.",
  robots: { index: false, follow: false },
};

export default function CvExpiredPage() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#1F1F1F] px-5 py-12 text-[#F7F5F0] antialiased">
      <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#0F4C5C]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-56 h-[28rem] w-[28rem] rounded-full bg-white/[0.035] blur-3xl" />

      <section className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/15">
          <AlertTriangle className="h-8 w-8 text-[#F7F5F0]" />
        </div>

        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D8D8D8]/70">
          <AlertTriangle className="h-4 w-4" />
          Link expirado
        </p>

        <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Este link expirou ou não está mais disponível.
        </h1>

        <p className="mt-5 text-base leading-8 text-[#D8D8D8]/70">
          Por segurança, o acesso ao CV é temporário. Para receber um novo link, faça uma nova solicitação com seus
          dados profissionais.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left">
          <div className="flex items-start gap-3">
            <RefreshCcw className="mt-0.5 h-5 w-5 shrink-0 text-[#F7F5F0]" />
            <p className="text-sm leading-6 text-[#D8D8D8]/70">
              A nova solicitação gera outro token individual e reinicia o processo de validação por e-mail.
            </p>
          </div>
        </div>

        <Link
          href="/cv"
          className="group mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#F7F5F0] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#1F1F1F] transition hover:translate-y-[-1px]"
        >
          Solicitar novo acesso
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </section>
    </main>
  );
}
