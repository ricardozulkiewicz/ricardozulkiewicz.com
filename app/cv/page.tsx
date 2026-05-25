import type { Metadata } from "next";
import Link from "next/link";
import { FileText, LockKeyhole, MailCheck, ShieldCheck, UserRound } from "lucide-react";
import CvRequestForm from "./CvRequestForm";

export const metadata: Metadata = {
  title: "Solicitar acesso ao CV | Ricardo Zulkiewicz",
  description:
    "Solicite acesso controlado ao CV profissional de Ricardo Zulkiewicz. O download é liberado após confirmação de e-mail.",
  robots: {
    index: false,
    follow: true,
  },
};

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute border border-[#F7F5F0]/80" style={{ inset: "18% 6% 6% 18%" }} />
      <div className="absolute border border-[#F7F5F0]/80" style={{ inset: "10% 14% 14% 10%" }} />
      <div className="absolute border border-[#F7F5F0]/80" style={{ inset: "2% 22% 22% 2%" }} />
      <div
        className="absolute bg-[#0F4C5C] shadow-[0_0_28px_rgba(15,76,92,0.65)]"
        style={{ width: "18%", height: "18%", left: "28%", top: "56%" }}
      />
    </div>
  );
}

function FlowStep({
  icon: Icon,
  title,
  description,
  active,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        active
          ? "border-[#0F4C5C]/60 bg-[#0F4C5C]/15 shadow-[0_0_40px_rgba(15,76,92,0.22)]"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">
        <Icon className="h-5 w-5 text-[#F7F5F0]" />
      </div>
      <h3 className="text-sm font-semibold text-[#F7F5F0]">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-[#D8D8D8]/65">{description}</p>
    </div>
  );
}

export default function CvPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <section className="relative isolate px-5 py-8 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#0F4C5C]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-56 h-[28rem] w-[28rem] rounded-full bg-white/[0.035] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D8D8D8]/25 to-transparent" />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Voltar para a home">
            <BrandMark className="h-9 w-9" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">Ricardo Zulk</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#D8D8D8]/55">
                B2B Technology Sales
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D8D8D8]/75 transition hover:border-[#0F4C5C]/70 hover:text-[#F7F5F0]"
          >
            Voltar ao site
          </Link>
        </nav>

        <div className="relative mx-auto grid max-w-7xl gap-8 pb-16 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:pt-20">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0F4C5C]/40 bg-[#0F4C5C]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#D8D8D8]">
              <LockKeyhole className="h-4 w-4" />
              Acesso controlado
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#F7F5F0] sm:text-5xl lg:text-6xl">
              Solicite acesso ao meu CV profissional.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#D8D8D8]/72">
              Para receber a versão mais recente do meu CV em PDF, preencha seus dados profissionais. Após
              confirmar seu e-mail, o link individual de acesso será enviado automaticamente.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <FlowStep
                icon={UserRound}
                title="1. Dados profissionais"
                description="Nome, e-mail, WhatsApp, versão do CV e motivo do interesse."
                active
              />
              <FlowStep
                icon={MailCheck}
                title="2. Confirmação"
                description="Validação obrigatória do e-mail antes de liberar o documento."
              />
              <FlowStep
                icon={FileText}
                title="3. Envio do CV"
                description="Segundo e-mail com link individual para download."
              />
              <FlowStep
                icon={ShieldCheck}
                title="4. Link temporário"
                description="Token único com validade limitada e registro de acesso."
              />
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 lg:p-8">
            <CvRequestForm />
          </section>
        </div>
      </section>
    </main>
  );
}
