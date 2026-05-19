"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Workflow,
} from "lucide-react";

const linkedinUrl = "https://www.linkedin.com/in/rick-zulk/";
const emailAddress = "ricardomachado.zulk@gmail.com";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
const mailtoUrl = `mailto:${emailAddress}`;

const indicators = [
  "B2B Sales",
  "IT Outsourcing",
  "Outbound",
  "CRM",
  "Sales Enablement",
];

const pillars = [
  {
    title: "Diagnóstico comercial",
    description:
      "Leitura de mercado, ICP, personas, dores, contexto de negócio, impacto financeiro e sinais reais de oportunidade.",
    icon: Search,
  },
  {
    title: "Vendas consultivas B2B",
    description:
      "Condução de prospecção, discovery, qualificação, proposta, negociação e fechamento com foco em dor, valor e decisão.",
    icon: Target,
  },
  {
    title: "Outbound e new business",
    description:
      "Mapeamento de contas, abordagem multicanal, criação de relacionamento e geração de conversas qualificadas com decisores.",
    icon: Network,
  },
  {
    title: "Sales Enablement",
    description:
      "Construção de narrativas, roteiros, frameworks, guias e materiais que transformam conhecimento comercial em método de venda.",
    icon: Layers3,
  },
  {
    title: "CRM e processo comercial",
    description:
      "Organização de pipeline, cadência, atividades, campos, histórico e governança para dar previsibilidade à operação.",
    icon: Workflow,
  },
  {
    title: "Execução orientada a receita",
    description:
      "Priorização de oportunidades, disciplina comercial, follow-up, gestão de próximos passos e foco em conversão real.",
    icon: LineChart,
  },
];

const method = [
  {
    step: "01",
    title: "Entender o contexto",
    description:
      "Antes de vender, busco entender mercado, momento da empresa, dor, urgência, estrutura decisória e custo de inação.",
  },
  {
    step: "02",
    title: "Organizar a narrativa",
    description:
      "Transformo informações dispersas em mensagem comercial clara, conectando problema, solução, impacto e próximos passos.",
  },
  {
    step: "03",
    title: "Executar com cadência",
    description:
      "Trabalho prospecção, relacionamento, discovery, follow-up e negociação com consistência, contexto e rastreabilidade.",
  },
  {
    step: "04",
    title: "Gerir pipeline com método",
    description:
      "Uso CRM, atividades e critérios de avanço para reduzir improviso, aumentar visibilidade e melhorar previsibilidade comercial.",
  },
];

const projects = [
  {
    title: "Estruturação comercial B2B para tecnologia",
    description:
      "Organização de processos comerciais, pipeline, critérios de qualificação, materiais de apoio e rotinas para uma frente de IT Outsourcing.",
  },
  {
    title: "Materiais de Sales Enablement",
    description:
      "Criação de documentos, playbooks, roteiros e guias para apoiar prospecção, discovery, objeções, negociação e gestão de oportunidades.",
  },
  {
    title: "Governança de CRM e operação comercial",
    description:
      "Definição de padrões de cadastro, etapas de funil, campos essenciais, regras de uso e boas práticas para acompanhamento de pipeline.",
  },
];

const repertory = [
  "CRM como processo comercial",
  "Vendas complexas B2B",
  "IT Outsourcing",
  "Outbound consultivo",
  "Discovery e qualificação",
  "Pipeline e forecast",
  "Sales Enablement",
  "Relacionamento com decisores",
  "Governança comercial",
  "New business",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm backdrop-blur">
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
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm transition duration-300 group-hover:scale-105">
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_30%),radial-gradient(circle_at_top_right,_#dcfce7,_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_42%,_#f1f5f9_100%)] text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight text-slate-950">
          Ricardo Zulkiewicz
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <a href="#sobre" className="transition hover:text-slate-950">
            Sobre
          </a>
          <a href="#metodo" className="transition hover:text-slate-950">
            Método
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
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-28 lg:pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Account Executive · B2B Sales · CRM · IT Outsourcing
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 md:text-7xl">
            Transformo contexto comercial em pipeline, relacionamento e crescimento B2B.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Atuo na interseção entre vendas consultivas, tecnologia e desenvolvimento de negócios, conectando prospecção, CRM, relacionamento com decisores e materiais comerciais a uma operação mais clara, previsível e orientada a receita.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {indicators.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Conectar no LinkedIn
              <ArrowUpRight className="ml-2" size={17} />
            </a>
            <a
              href="#metodo"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Ver método de trabalho
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
                Organizo narrativa, pipeline, CRM, cadência comercial e próximos passos para que vendas deixe de depender de improviso e passe a operar com método.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  New business
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
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionLabel>Sobre</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              Um perfil comercial construído entre vendas, tecnologia e processo.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Sou um profissional de vendas B2B com experiência em desenvolvimento de negócios, vendas consultivas, recrutamento especializado, tecnologia e estruturação comercial.
            </p>
            <p>
              Minha trajetória passa pelo ecossistema de startups, empresas em crescimento e negócios em transformação digital, com atuação em prospecção, relacionamento com decisores, diagnóstico de necessidades, negociação, fechamento e acompanhamento de clientes.
            </p>
            <p>
              Hoje, minha atuação está concentrada em IT Outsourcing, outbound e new business, com foco em construir uma abordagem comercial mais estruturada, consultiva e orientada a receita.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Sparkles className="mb-4 text-slate-950" size={22} />
            <h3 className="font-semibold tracking-tight text-slate-950">
              Clareza de posicionamento
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Traduzir ofertas complexas em mensagens comerciais objetivas, relevantes e conectadas à dor do cliente.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Users2 className="mb-4 text-slate-950" size={22} />
            <h3 className="font-semibold tracking-tight text-slate-950">
              Conversas com decisores
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Construir relacionamento com diferentes personas, entendendo influência, prioridade, decisão e critérios de compra.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="mb-4 text-slate-950" size={22} />
            <h3 className="font-semibold tracking-tight text-slate-950">
              Disciplina operacional
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Registrar contexto, próximos passos e aprendizados para transformar execução comercial em ativo de gestão.
            </p>
          </div>
        </div>
      </section>

      <section id="metodo" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>Método</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            Da leitura do mercado à gestão do pipeline.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Mais do que executar vendas, busco organizar contexto, narrativa e processo para que operações comerciais consigam vender com mais clareza, consistência e previsibilidade.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {method.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-semibold text-slate-400">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>Como eu contribuo</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            Estrutura comercial para vender melhor, não apenas vender mais.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, index) => (
            <PillarCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="projetos" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10 md:p-10 lg:p-12">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                Projetos profissionais
              </div>
              <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                Enablement, governança e processo aplicados à operação comercial.
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Exemplos de frentes apresentados de forma institucional, sem exposição de materiais internos, dados sensíveis ou informações confidenciais.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <CheckCircle2 className="mb-5 text-emerald-300" size={22} />
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
            <SectionLabel>Repertório</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              Temas que fazem parte da minha atuação.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Estudo e trabalho com temas ligados a vendas B2B, tecnologia, outbound, CRM, Sales Enablement, desenvolvimento comercial e previsibilidade de receita.
            </p>
          </div>
          <div className="flex flex-wrap content-start gap-3">
            {repertory.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
              >
                {topic}
              </span>
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
                Para conversas sobre vendas B2B, tecnologia, desenvolvimento comercial, CRM, IT Outsourcing e Sales Enablement, entre em contato pelo LinkedIn ou por e-mail.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:flex-wrap">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} /> São Paulo, Brasil
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Compass size={16} /> Marca pessoal e portfólio profissional
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Mail size={16} /> {emailAddress}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                LinkedIn
                <ArrowUpRight className="ml-2" size={17} />
              </a>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
              >
                E-mail
                <Mail className="ml-2" size={17} />
              </a>
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:hidden"
              >
                E-mail
                <Mail className="ml-2" size={17} />
              </a>
            </div>
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
