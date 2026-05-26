"use client";

import { AlertTriangle, ArrowLeft, Mail, RotateCcw } from "lucide-react";

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute border border-[#F7F5F0]/22" style={{ inset: "18% 6% 6% 18%" }} />
      <div className="absolute border border-[#F7F5F0]/22" style={{ inset: "10% 14% 14% 10%" }} />
      <div className="absolute border border-[#F7F5F0]/22" style={{ inset: "2% 22% 22% 2%" }} />
      <div
        className="absolute bg-[#0F4C5C] shadow-[0_0_28px_rgba(15,76,92,0.65)]"
        style={{ width: "18%", height: "18%", left: "28%", top: "56%" }}
      />
    </div>
  );
}

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(15,76,92,0.28),transparent_34%),radial-gradient(circle_at_10%_0%,rgba(247,245,240,0.07),transparent_28%)]" />
        <div className="absolute right-[-9%] top-[12%] hidden h-[560px] w-[560px] opacity-35 lg:block">
          <BrandMark className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-8 shadow-[0_0_80px_rgba(15,76,92,0.18)] md:p-10">
          <div className="mb-10 flex items-center gap-4">
            <BrandMark className="h-12 w-12" />
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-[0.18em] text-[#F7F5F0] md:text-base md:tracking-[0.24em]">RICARDO ZULKIEWICZ</div>
              <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">B2B TECHNOLOGY SALES</div>
            </div>
          </div>

          <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">
            <AlertTriangle size={14} />
            Erro temporário
          </p>
          <h1 className="text-5xl font-light leading-[1.04] tracking-[-0.06em] md:text-7xl">Algo não carregou como deveria.</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#D8D8D8]/72">
            A página encontrou uma falha temporária. Tente recarregar a experiência ou volte para o início do site.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button onClick={reset} className="inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:bg-[#126177]">
              <RotateCcw size={16} />
              Tentar novamente
            </button>
            <a href="/" className="inline-flex items-center justify-center gap-3 border border-[#F7F5F0]/20 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:border-[#F7F5F0]/45">
              <ArrowLeft size={16} />
              Voltar ao início
            </a>
            <a href="mailto:ricardomachado.zulk@gmail.com" className="inline-flex items-center justify-center gap-3 border border-[#F7F5F0]/20 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:border-[#F7F5F0]/45">
              <Mail size={16} />
              Contato
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
