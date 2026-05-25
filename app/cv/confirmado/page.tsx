import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "E-mail confirmado | Ricardo Zulkiewicz",
  description: "E-mail confirmado com sucesso para acesso ao CV profissional de Ricardo Zulkiewicz.",
  robots: { index: false, follow: false },
};

export default function CvConfirmedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#1F1F1F] px-5 py-12 text-[#F7F5F0] antialiased">
      <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#0F4C5C]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-56 h-[28rem] w-[28rem] rounded-full bg-white/[0.035] blur-3xl" />

      <section className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0F4C5C]/50 bg-[#0F4C5C]/20">
          <ShieldCheck className="h-8 w-8 text-[#F7F5F0]" />
        </div>

        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D8D8D8]/70">
          <CheckCircle2 className="h-4 w-4" />
          E-mail confirmado
        </p>

        <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
          E-mail confirmado com sucesso.
        </h1>

        <p className="mt-5 text-base leading-8 text-[#D8D8D8]/70">
          Obrigado por confirmar seu e-mail. O link individual de acesso ao CV foi enviado para sua caixa de entrada.
        </p>

        <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8D8D8]/50">Status</p>
            <p className="mt-1 text-sm text-[#F7F5F0]">CV enviado</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8D8D8]/50">Link</p>
            <p className="mt-1 text-sm text-[#F7F5F0]">Único e temporário</p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D8D8D8]/70 transition hover:border-[#0F4C5C]/70 hover:text-[#F7F5F0]"
        >
          <Home className="h-4 w-4" />
          Voltar ao site
        </Link>
      </section>
    </main>
  );
}
