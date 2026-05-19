"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Layers3,
  LineChart,
  Network,
  Search,
  Target,
  Workflow,
} from "lucide-react";

const linkedinUrl = "https://www.linkedin.com/in/ricardozulkiewicz/";

const pillars = [
  {
    title: "Diagnóstico comercial",
    description:
      "Entendimento de mercado, ICP, personas, dores, contexto de negócio, urgência, impacto e sinais reais de oportunidade.",
    icon: Search,
  },
  {
    title: "Vendas consultivas B2B",
    description:
      "Prospecção, discovery, qualificação, proposta, negociação e fechamento conectando solução, dor e impacto de negócio.",
    icon: Target,
  },
  {
    title: "Outbound & new business",
    description:
      "Mapeamento de contas, abordagem multicanal, conexão com decisores e construção de relacionamento comercial.",
    icon: Network,
  },
  {
    title: "Sales Enablement",
    description:
      "Criação de narrativas, roteiros, guias, frameworks e materiais que transformam conhecimento em método de venda.",
    icon: Layers3,
  },
  {
    title: "CRM e processo comercial",
    description:
      "Organização de pipeline, atividades, campos, histórico e governança para dar consistência à operação comercial.",
    icon: Workflow,
  },
];

const projects = [
  {
    title: "Estruturação comercial para operação B2B de tecnologia",
    description:
      "Organização de processos comerciais, definição de pipeline, materiais de apoio, padronização de CRM e rotinas comerciais para uma frente de IT Outsourcing.",
  },
  {
    title: "Desenvolvimento de materiais de Sales Enablement",
    description:
      "Criação de documentos, roteiros e guias para apoiar prospecção, discovery, qualificação, objeções, negociação e gestão de oportunidades.",
  },
  {
    title: "Organização de CRM e governança comercial",
    description:
      "Construção de padrões de cadastro, etapas de funil, regras de uso, campos obrigatórios e boas práticas para acompanhamento de pipeline.",
  },
];

const topics = [
  "CRM como processo, não apenas ferramenta",
  "Sales Enablement como infraestrutura comercial",
  "Outbound consultivo em mercados B2B",
  "Discovery e qualificação em vendas complexas",
  "IT Outsourcing como solução estratégica",
  "Rotinas comerciais, pipeline e previsibilidade de receita",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-500 shadow-sm backdrop-blur">
      {children}
    </div>
  );
}

function PillarCard({
  item,
  index,
}: {
  item: (typeof pillars)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm transition group-hover:scale-105">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-slate-950">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {item.description}
      </p>
    </motion.article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_44%,_#f1f5f9_100%)] text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight text-slate-950">
          Ricardo Zulkiewicz
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <a href="#sobre" className="transition hover:text-slate-950">
            Sobre
          </a>
          <a href="#trabalho" className="transition hover:text-slate-950">
            Como trabalho
          </a>
          <a href="#projetos" className="transition hover:text-slate-950">
            Projetos
          </a>
          <a href="#contato" className="transition hover:text-slate-950">
            Contato
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:pb-28 lg:pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Account Executive · B2B Sales · CRM · IT Outsourcing
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 md:text-7xl">
            Estruturo vendas B2B, pipeline e crescimento comercial para empresas de tecnologia.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Atuo na interseção entre vendas consultivas, tecnologia e desenvolvimento de negócios, conectando prospecção, CRM, relacionamento e materiais comerciais a uma operação comercial mais previsível.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Meu trabalho combina execução prática, visão estratégica e organização de processos para transformar oportunidades em receita com mais clareza, método e consistência.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#trabalho"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Ver como eu trabalho
              <ArrowUpRight className="ml-2" size={17} />
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Conhecer projetos
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-100 via-white to-emerald-100 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10">
            <div className="rounded-[1.5rem] bg-slate-950 p-7 text-white">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
                Forma de atuação
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                Estratégia comercial com execução prática.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Organizo narrativa, pipeline, CRM, cadência comercial e tomada de decisão para que vendas deixe de depender de improviso e passe a operar com método.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-slate-200 p-5">
                <LineChart className="mb-4 text-slate-950" size={22} />
                <p className="text-2xl font-semibold tracking-tight">
                  Pipeline & CRM
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                 Visibilidade, previsibilidade e gestão comercial.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-5">
                <BriefcaseBusiness className="mb-4 text-slate-950" size={22} />
                <p className="text-2xl font-semibold tracking-tight">
                 Geração de demanda
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-500">
Prospecção, relacionamento e abertura de mercado B2B.
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </section>

      <section id="sobre" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Sobre</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              Um perfil comercial construído entre vendas, tecnologia e
              processo.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Sou um profissional de vendas B2B com experiência em
              desenvolvimento de negócios, vendas consultivas, recrutamento
              especializado, tecnologia e estruturação comercial.
            </p>
            <p>
              Minha trajetória passa pelo ecossistema de startups, empresas em
              crescimento e negócios em transformação digital, com atuação em
              prospecção, relacionamento com decisores, diagnóstico de
              necessidades, negociação, fechamento e acompanhamento de clientes.
            </p>
            <p>
              Hoje, minha atuação está concentrada em IT Outsourcing, outbound e
              new business, com foco em construir uma abordagem comercial mais
              estruturada, consultiva e orientada a receita.
            </p>
          </div>
        </div>
      </section>

      <section id="trabalho" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>Como eu trabalho</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            Método comercial para transformar contexto em oportunidade.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Mais do que executar vendas, busco organizar contexto, processo e
            narrativa para que operações comerciais consigam vender com mais
            clareza, consistência e previsibilidade.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, index) => (
            <PillarCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="projetos" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10 md:p-10 lg:p-12">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-300">
              Projetos profissionais
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
              Estrutura, enablement e governança aplicados à operação
              comercial.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Exemplos de frentes de atuação apresentados de forma
              institucional, sem exposição de materiais internos, dados sensíveis
              ou informações confidenciais.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Ideias</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              Temas que fazem parte do meu repertório.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Escrevo, estudo e trabalho com temas ligados a vendas B2B,
              tecnologia, outbound, CRM, Sales Enablement, desenvolvimento
              comercial e previsibilidade de receita.
            </p>
          </div>
          <div className="grid gap-3">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm"
              >
                <span>{topic}</span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <SectionLabel>Contato</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
                Conversas profissionais, networking e troca de ideias.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                Para conversas sobre vendas B2B, tecnologia, desenvolvimento
                comercial, CRM e Sales Enablement, entre em contato pelo
                LinkedIn.
              </p>
            </div>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Conectar no LinkedIn
              <ArrowUpRight className="ml-2" size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 pb-10 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} Ricardo Zulkiewicz. Marca pessoal e portfólio profissional.</p>
        <p>ricardozulkiewicz.com</p>
      </footer>
    </main>
  );
}
