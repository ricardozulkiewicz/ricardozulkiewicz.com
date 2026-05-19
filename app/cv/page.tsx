import { ArrowLeft, Download, FileText, Globe2 } from "lucide-react";

const cvOptions = [
  {
    language: "Português",
    title: "CV em português",
    description:
      "Versão premium do currículo profissional de Ricardo Zulkiewicz em português, com posicionamento executivo, experiência, competências, projetos e idiomas.",
    href: "/cv/pt",
  },
  {
    language: "English",
    title: "English CV",
    description:
      "Premium English version of Ricardo Zulkiewicz's professional CV, covering executive summary, experience, core skills, tools and languages.",
    href: "/cv/en",
  },
];

export const metadata = {
  title: "CV | Ricardo Zulkiewicz",
  description:
    "Download Ricardo Zulkiewicz's CV in Portuguese or English. B2B Sales, CRM, IT Outsourcing, Outbound and Sales Enablement.",
};

export default function CVPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_55%,_#f1f5f9_100%)] text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950 hover:shadow-md"
        >
          <ArrowLeft className="mr-2" size={16} />
          Voltar / Back
        </a>

        <section className="py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
            <Globe2 size={16} />
            CV · Portuguese / English
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl">
            Download CV
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            Escolha a versão premium do currículo para download. Choose the premium CV version you want to download.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {cvOptions.map((option) => (
            <article
              key={option.language}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <FileText size={22} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {option.language}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {option.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {option.description}
              </p>
              <a
                href={option.href}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Download PDF
                <Download className="ml-2" size={17} />
              </a>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 text-sm leading-7 text-slate-600 shadow-sm">
          <p>
            Esta página complementa o site principal e serve como ponto rápido para compartilhar currículo em processos seletivos, networking e conversas profissionais.
          </p>
          <p className="mt-3">
            This page complements the main website and provides a quick place to share CV files for hiring processes, networking and professional conversations.
          </p>
        </section>
      </div>
    </main>
  );
}
