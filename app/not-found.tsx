import { ArrowLeft, FileText, Home } from "lucide-react";

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

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <style>{`:root { font-family: Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }`}</style>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(15,76,92,0.28),transparent_34%),radial-gradient(circle_at_10%_0%,rgba(247,245,240,0.07),transparent_28%)]" />
        <div className="absolute right-[-9%] top-[12%] hidden h-[560px] w-[560px] opacity-35 lg:block">
          <BrandMark className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-8 shadow-[0_0_80px_rgba(15,76,92,0.18)] md:p-10">
            <div className="mb-10 flex items-center gap-4">
              <BrandMark className="h-12 w-12" />
              <div className="leading-none">
                <div className="text-sm font-semibold tracking-[0.26em] text-[#F7F5F0] md:text-base md:tracking-[0.34em]">RICARDO ZULK</div>
                <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">B2B TECHNOLOGY SALES</div>
              </div>
            </div>

            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">404 — Página não encontrada</p>
            <h1 className="text-5xl font-light leading-[1.04] tracking-[-0.06em] md:text-7xl">Essa rota não existe ou foi movida.</h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#D8D8D8]/72">
              O conteúdo que você tentou acessar não está disponível neste endereço. Use os caminhos abaixo para voltar ao site principal ou solicitar acesso controlado ao CV.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/" className="inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:bg-[#126177]">
                <Home size={16} />
                Voltar ao início
              </a>
              <a href="/cv" className="inline-flex items-center justify-center gap-3 border border-[#F7F5F0]/20 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:border-[#F7F5F0]/45">
                <FileText size={16} />
                Solicitar CV
              </a>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="border-l border-[#F7F5F0]/14 pl-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">Rotas principais</p>
              <div className="mt-8 grid gap-4">
                <a href="/" className="group border-b border-[#F7F5F0]/14 pb-5 text-2xl font-light tracking-[-0.04em] text-[#F7F5F0] transition hover:text-[#57a6b7]">
                  <span className="inline-flex items-center gap-3">Home <ArrowLeft className="rotate-180 transition group-hover:translate-x-1" size={18} /></span>
                </a>
                <a href="/pt" className="group border-b border-[#F7F5F0]/14 pb-5 text-2xl font-light tracking-[-0.04em] text-[#F7F5F0] transition hover:text-[#57a6b7]">
                  <span className="inline-flex items-center gap-3">Versão em português <ArrowLeft className="rotate-180 transition group-hover:translate-x-1" size={18} /></span>
                </a>
                <a href="/cv" className="group border-b border-[#F7F5F0]/14 pb-5 text-2xl font-light tracking-[-0.04em] text-[#F7F5F0] transition hover:text-[#57a6b7]">
                  <span className="inline-flex items-center gap-3">Acesso ao CV <ArrowLeft className="rotate-180 transition group-hover:translate-x-1" size={18} /></span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
