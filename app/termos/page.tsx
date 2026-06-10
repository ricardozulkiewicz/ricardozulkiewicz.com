import type { Metadata } from "next";
import { ArrowLeft, FileText, Mail, Scale, ShieldCheck } from "lucide-react";

const siteUrl = "https://ricardozulkiewicz.com";

export const metadata: Metadata = {
  title: "Termos de Uso | Ricardo Zulkiewicz",
  description:
    "Termos de uso do site Ricardo Zulkiewicz, incluindo regras de navegação, contato profissional e solicitação controlada de acesso ao CV.",
  alternates: {
    canonical: `${siteUrl}/termos`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#F7F5F0]/14 py-8">
      <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#F7F5F0]">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-[#D8D8D8]/72">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">

      <section className="relative overflow-hidden border-b border-[#F7F5F0]/14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(15,76,92,0.28),transparent_34%),radial-gradient(circle_at_10%_0%,rgba(247,245,240,0.07),transparent_28%)]" />
        <div className="absolute right-[-8%] top-[10%] hidden h-[540px] w-[540px] opacity-30 lg:block">
          <BrandMark className="h-full w-full" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <a href="/" className="inline-flex items-center gap-4" aria-label="Voltar para a página inicial">
            <BrandMark className="h-10 w-10" />
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-[0.18em] text-[#F7F5F0] md:text-base md:tracking-[0.24em]">RICARDO ZULKIEWICZ</div>
              <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">TERMOS DE USO</div>
            </div>
          </a>

          <a href="/cv" className="inline-flex items-center gap-3 border border-[#F7F5F0]/16 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8D8D8]/78 transition hover:border-[#F7F5F0]/35 hover:text-[#F7F5F0]">
            <FileText size={15} />
            CV
          </a>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-20">
          <p className="mb-6 inline-flex items-center gap-2 border border-[#57a6b7]/30 bg-[#0F4C5C]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">
            <Scale size={13} />
            Uso do site e acesso ao CV
          </p>
          <h1 className="max-w-5xl text-5xl font-light leading-[1.04] tracking-[-0.06em] md:text-7xl">
            Termos de uso do site Ricardo Zulkiewicz.
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-[#D8D8D8]/72 md:text-lg">
            Estes termos explicam as condições gerais de navegação, contato profissional e uso do fluxo controlado de solicitação de acesso ao CV.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="self-start border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-6">
            <ShieldCheck className="mb-8 text-[#57a6b7]" size={28} strokeWidth={1.6} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57a6b7]">Resumo</p>
            <p className="mt-4 text-sm leading-7 text-[#D8D8D8]/68">
              O site tem finalidade profissional e informativa. O CV é disponibilizado apenas por solicitação, confirmação de e-mail e link temporário.
            </p>
            <a href="/" className="mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:text-[#57a6b7]">
              <ArrowLeft size={15} />
              Voltar ao site
            </a>
          </aside>

          <article className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.025] p-6 md:p-10">
            <p className="mb-8 text-sm leading-7 text-[#D8D8D8]/60">Última atualização: maio de 2026.</p>

            <Section title="1. Finalidade do site">
              <p>Este site apresenta informações profissionais de Ricardo Zulkiewicz, com foco em vendas B2B, tecnologia, outbound, CRM, Sales Enablement e IT Outsourcing.</p>
              <p>O conteúdo tem finalidade institucional, profissional e informativa. Ele não representa promessa de contratação, prestação automática de serviços ou oferta comercial vinculante.</p>
            </Section>

            <Section title="2. Uso permitido">
              <p>O visitante pode navegar pelo site, consultar informações públicas, entrar em contato por canais indicados e solicitar acesso ao CV por meio do formulário específico.</p>
              <p>Não é permitido usar o site para spam, tentativa de extração automatizada, abuso de formulários, engenharia reversa de rotas protegidas ou tentativa de acesso a arquivos privados.</p>
            </Section>

            <Section title="3. Solicitação de acesso ao CV">
              <p>O CV não é disponibilizado como link público direto. O acesso depende de formulário, confirmação de e-mail e link temporário individual.</p>
              <p>O envio de uma solicitação não garante resposta, continuidade de conversa, participação em processo seletivo ou qualquer obrigação profissional.</p>
            </Section>

            <Section title="4. Links temporários e arquivos">
              <p>Links temporários de acesso ao CV são pessoais, limitados e podem expirar. O compartilhamento indevido desses links pode invalidar a finalidade controlada do fluxo.</p>
              <p>Os arquivos disponibilizados não devem ser republicados, revendidos, alterados ou expostos publicamente sem autorização.</p>
            </Section>

            <Section title="5. Privacidade">
              <p>O uso de dados informados no formulário de CV e demais interações com o site é descrito na Política de Privacidade.</p>
              <a href="/privacidade" className="inline-flex items-center gap-3 text-[#57a6b7] transition hover:text-[#F7F5F0]">
                <ShieldCheck size={16} />
                Acessar Política de Privacidade
              </a>
            </Section>

            <Section title="6. Contato">
              <p>Para dúvidas sobre o site, uso do conteúdo, privacidade ou acesso ao CV, entre em contato pelo e-mail abaixo.</p>
              <a href="mailto:ricardomachado.zulk@gmail.com" className="inline-flex items-center gap-3 text-[#57a6b7] transition hover:text-[#F7F5F0]">
                <Mail size={16} />
                ricardomachado.zulk@gmail.com
              </a>
            </Section>
          </article>
        </div>
      </section>
    </main>
  );
}
