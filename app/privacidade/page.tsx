import type { Metadata } from "next";
import { ArrowLeft, FileText, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

const siteUrl = "https://ricardozulkiewicz.com";

export const metadata: Metadata = {
  title: "Privacidade | Ricardo Zulk",
  description:
    "Política de privacidade do site Ricardo Zulk, incluindo o fluxo de solicitação controlada de acesso ao CV.",
  alternates: {
    canonical: `${siteUrl}/privacidade`,
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <style>{`:root { font-family: Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }`}</style>

      <section className="relative overflow-hidden border-b border-[#F7F5F0]/14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(15,76,92,0.28),transparent_34%),radial-gradient(circle_at_10%_0%,rgba(247,245,240,0.07),transparent_28%)]" />
        <div className="absolute right-[-8%] top-[10%] hidden h-[540px] w-[540px] opacity-30 lg:block">
          <BrandMark className="h-full w-full" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <a href="/" className="inline-flex items-center gap-4" aria-label="Voltar para a página inicial">
            <BrandMark className="h-10 w-10" />
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-[0.26em] text-[#F7F5F0] md:text-base md:tracking-[0.34em]">RICARDO ZULK</div>
              <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">PRIVACIDADE</div>
            </div>
          </a>

          <a href="/cv" className="inline-flex items-center gap-3 border border-[#F7F5F0]/16 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8D8D8]/78 transition hover:border-[#F7F5F0]/35 hover:text-[#F7F5F0]">
            <FileText size={15} />
            CV
          </a>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-20">
          <p className="mb-6 inline-flex items-center gap-2 border border-[#57a6b7]/30 bg-[#0F4C5C]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">
            <ShieldCheck size={13} />
            Dados, contato e acesso ao CV
          </p>
          <h1 className="max-w-5xl text-5xl font-light leading-[1.04] tracking-[-0.06em] md:text-7xl">
            Política de privacidade do site Ricardo Zulk.
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-[#D8D8D8]/72 md:text-lg">
            Esta página explica, de forma objetiva, como os dados enviados pelo site podem ser usados no contexto de contato profissional e solicitação controlada de acesso ao CV.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="self-start border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-6">
            <LockKeyhole className="mb-8 text-[#57a6b7]" size={28} strokeWidth={1.6} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57a6b7]">Resumo</p>
            <p className="mt-4 text-sm leading-7 text-[#D8D8D8]/68">
              Os dados do formulário de CV são usados para avaliar e responder solicitações profissionais, confirmar e-mail, enviar link temporário e registrar acessos de forma controlada.
            </p>
            <a href="/" className="mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:text-[#57a6b7]">
              <ArrowLeft size={15} />
              Voltar ao site
            </a>
          </aside>

          <article className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.025] p-6 md:p-10">
            <p className="mb-8 text-sm leading-7 text-[#D8D8D8]/60">Última atualização: maio de 2026.</p>

            <Section title="1. Dados que podem ser coletados">
              <p>Ao solicitar acesso ao CV, o visitante pode informar nome completo, e-mail profissional, WhatsApp, empresa, cargo, LinkedIn, versão desejada do CV, motivo do interesse e mensagem adicional.</p>
              <p>Também podem ser registrados dados técnicos básicos associados ao acesso, como data/hora, página de origem, user agent e endereço IP encaminhado pelo provedor de hospedagem, quando disponível.</p>
            </Section>

            <Section title="2. Finalidade de uso">
              <p>Os dados são usados para processar a solicitação de acesso ao CV, confirmar o e-mail informado, enviar um link temporário, registrar o acesso ao arquivo e permitir eventual contato profissional relacionado à solicitação.</p>
              <p>O objetivo do fluxo é evitar exposição pública irrestrita do currículo e manter contexto mínimo sobre quem solicitou o material.</p>
            </Section>

            <Section title="3. E-mails transacionais">
              <p>O site pode enviar e-mails transacionais relacionados ao fluxo de CV, como confirmação de e-mail, link temporário de acesso e notificações internas de solicitação/acesso.</p>
              <p>Esses e-mails não têm finalidade de newsletter ou comunicação promocional recorrente.</p>
            </Section>

            <Section title="4. Compartilhamento e armazenamento">
              <p>Os dados podem ser processados por ferramentas necessárias para operar o site, como provedor de hospedagem, serviço de envio de e-mail, Google Drive e, quando configurado, Google Sheets para registro de solicitações.</p>
              <p>O acesso ao CV é feito por backend e link temporário. O visitante não deve receber diretamente o link-fonte privado do arquivo.</p>
            </Section>

            <Section title="5. Retenção dos dados">
              <p>Os dados podem ser mantidos enquanto forem úteis para registro profissional, segurança do fluxo de acesso, acompanhamento de oportunidades e histórico de contato.</p>
              <p>Uma solicitação de remoção ou atualização pode ser feita pelo canal de contato indicado abaixo.</p>
            </Section>

            <Section title="6. Direitos e contato">
              <p>Para solicitar correção, atualização, remoção ou esclarecimentos sobre dados enviados pelo site, entre em contato pelo e-mail abaixo.</p>
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
