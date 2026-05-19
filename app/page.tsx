"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Languages,
  Laptop,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  MessageSquareText,
  Network,
  Rocket,
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

type Locale = "pt" | "en";

const copy = {
  pt: {
    nav: {
      about: "Sobre",
      method: "Método",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
    },
    languageLabel: "Idioma",
    hero: {
      badge: "Account Executive · B2B Sales · CRM · IT Outsourcing",
      title:
        "Transformo contexto comercial em pipeline, relacionamento e crescimento B2B.",
      subtitle:
        "Sou Ricardo Zulkiewicz, profissional de vendas consultivas B2B com atuação em tecnologia, IT Outsourcing, outbound, CRM e estruturação comercial.",
      description:
        "Meu trabalho combina prospecção, discovery, qualificação, narrativa comercial, CRM, relacionamento com decisores e disciplina de pipeline para transformar oportunidades em conversas qualificadas, propostas mais fortes e crescimento previsível.",
      primaryCta: "Conectar no LinkedIn",
      secondaryCta: "Ver método de trabalho",
      location: "São Paulo, Brasil",
      cardLabel: "Forma de atuação",
      cardTitle: "Estratégia comercial com execução prática.",
      cardText:
        "Organizo narrativa, pipeline, CRM, cadência comercial e próximos passos para que vendas deixe de depender de improviso e passe a operar com método.",
      cardOneTitle: "Pipeline & CRM",
      cardOneText: "Visibilidade, previsibilidade e gestão comercial.",
      cardTwoTitle: "New business",
      cardTwoText: "Prospecção, relacionamento e abertura de mercado B2B.",
    },
    indicators: [
      "B2B Sales",
      "IT Outsourcing",
      "Outbound",
      "CRM",
      "Sales Enablement",
      "New Business",
    ],
    stats: [
      { value: "Full-cycle", label: "Atuação em prospecção, negociação e fechamento" },
      { value: "B2B", label: "Experiência em vendas consultivas e relacionamento" },
      { value: "Tech", label: "Foco em tecnologia, outsourcing e transformação digital" },
      { value: "CRM", label: "Pipeline, governança comercial e previsibilidade" },
    ],
    about: {
      label: "Sobre",
      title: "Um perfil comercial construído entre vendas, tecnologia e processo.",
      paragraphs: [
        "Minha trajetória foi construída em ambientes de crescimento, startups, recrutamento especializado, tecnologia e transformação digital. Atuei em desenvolvimento de negócios, vendas consultivas, relacionamento com decisores, diagnóstico de necessidades, negociação, fechamento, pós-venda e retenção.",
        "Hoje, minha atuação está concentrada em IT Outsourcing, outbound e new business, com foco em construir uma abordagem comercial mais estruturada, consultiva e orientada a receita.",
        "Acredito que vendas B2B de alta qualidade não depende apenas de carisma ou volume. Depende de leitura de contexto, clareza de posicionamento, disciplina operacional, domínio do CRM e capacidade de conduzir conversas relevantes com diferentes stakeholders.",
      ],
    },
    strengths: [
      {
        title: "Clareza de posicionamento",
        description:
          "Traduzo ofertas complexas em mensagens comerciais objetivas, relevantes e conectadas à dor do cliente.",
      },
      {
        title: "Conversas com decisores",
        description:
          "Construo relacionamento com diferentes personas, entendendo influência, prioridade, decisão e critérios de compra.",
      },
      {
        title: "Disciplina operacional",
        description:
          "Registro contexto, próximos passos e aprendizados para transformar execução comercial em ativo de gestão.",
      },
    ],
    expertise: {
      label: "Como eu contribuo",
      title: "Estrutura comercial para vender melhor, não apenas vender mais.",
      intro:
        "Minha contribuição combina execução de vendas com construção de processo, materiais e método comercial.",
      items: [
        {
          title: "Diagnóstico comercial",
          description:
            "Leitura de mercado, ICP, personas, dores, contexto de negócio, impacto financeiro e sinais reais de oportunidade.",
        },
        {
          title: "Vendas consultivas B2B",
          description:
            "Condução de prospecção, discovery, qualificação, proposta, negociação e fechamento com foco em dor, valor e decisão.",
        },
        {
          title: "Outbound e new business",
          description:
            "Mapeamento de contas, abordagem multicanal, criação de relacionamento e geração de conversas qualificadas com decisores.",
        },
        {
          title: "Sales Enablement",
          description:
            "Construção de narrativas, roteiros, frameworks, guias e materiais que transformam conhecimento comercial em método de venda.",
        },
        {
          title: "CRM e processo comercial",
          description:
            "Organização de pipeline, cadência, atividades, campos, histórico e governança para dar previsibilidade à operação.",
        },
        {
          title: "Execução orientada a receita",
          description:
            "Priorização de oportunidades, disciplina comercial, follow-up, gestão de próximos passos e foco em conversão real.",
        },
      ],
    },
    method: {
      label: "Método",
      title: "Da leitura do mercado à gestão do pipeline.",
      intro:
        "Mais do que executar vendas, busco organizar contexto, narrativa e processo para que operações comerciais consigam vender com mais clareza, consistência e previsibilidade.",
      steps: [
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
      ],
    },
    experience: {
      label: "Experiência",
      title: "Experiência comercial em tecnologia, startups e operações B2B.",
      intro:
        "Atuação em ambientes de crescimento, com foco em geração de demanda, vendas consultivas, relacionamento com decisores, processos comerciais e CRM.",
      items: [
        {
          period: "2026 — atual",
          role: "Account Executive",
          company: "First Decision",
          description:
            "Atuação em vendas B2B para tecnologia e IT Outsourcing, com foco em outbound, new business, estruturação comercial, CRM, pipeline e construção de materiais de apoio à operação comercial.",
          tags: ["IT Outsourcing", "Outbound", "CRM", "New Business"],
        },
        {
          period: "2023 — 2025",
          role: "Account Executive",
          company: "Talentu",
          description:
            "Condução de vendas consultivas full-cycle no ecossistema de startups e empresas em transformação digital, incluindo diagnóstico, reuniões estratégicas, negociação, fechamento e relacionamento com clientes.",
          tags: ["Full-cycle sales", "B2B", "Startups", "Consultative selling"],
        },
        {
          period: "2022 — 2023",
          role: "Business Development Representative",
          company: "Talentu",
          description:
            "Prospecção, qualificação de oportunidades, mapeamento de mercado, cadência comercial e geração de conversas com empresas de tecnologia, startups e negócios em crescimento.",
          tags: ["Prospecting", "Qualification", "Market mapping", "BDR"],
        },
      ],
    },
    projects: {
      label: "Projetos profissionais",
      title: "Enablement, governança e processo aplicados à operação comercial.",
      intro:
        "Exemplos de frentes apresentados de forma institucional, sem exposição de materiais internos, dados sensíveis ou informações confidenciais.",
      items: [
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
      ],
    },
    operatingSystem: {
      label: "Sistema de trabalho",
      title: "Como penso uma operação comercial saudável.",
      items: [
        "ICP e segmentação claros antes de volume de prospecção.",
        "CRM como fonte de verdade, não apenas ferramenta de registro.",
        "Discovery orientado a dor, impacto, urgência e decisão.",
        "Follow-up com contexto, próximo passo e racional de negócio.",
        "Materiais comerciais como infraestrutura de escala.",
        "Pipeline com critérios objetivos de avanço e forecast.",
      ],
    },
    toolkit: {
      label: "Ferramentas e repertório",
      title: "Temas, métodos e ferramentas que fazem parte da minha atuação.",
      groups: [
        {
          title: "Comercial",
          items: ["Outbound", "Discovery", "Qualificação", "Negociação", "Forecast", "Follow-up"],
        },
        {
          title: "Operação",
          items: ["CRM", "Pipeline", "Pipedrive", "Playbooks", "Cadências", "Dashboards"],
        },
        {
          title: "Mercado",
          items: ["IT Outsourcing", "Startups", "SaaS", "Transformação digital", "Tecnologia", "B2B"],
        },
      ],
    },
    languages: {
      label: "Idiomas",
      title: "Atuação com comunicação em português e inglês.",
      items: [
        "Português nativo para comunicação executiva, negociação e relacionamento comercial.",
        "Inglês para leitura, escrita profissional, networking, pesquisa e construção de presença internacional.",
      ],
    },
    faq: {
      label: "Perguntas frequentes",
      title: "Como este site deve ser lido profissionalmente.",
      items: [
        {
          question: "Este site é um currículo?",
          answer:
            "Não exatamente. Ele funciona como uma presença profissional, reunindo posicionamento, repertório, experiência e formas de contato em uma estrutura mais executiva do que um currículo tradicional.",
        },
        {
          question: "Que tipo de conversa faz sentido iniciar?",
          answer:
            "Conversas sobre vendas B2B, tecnologia, outsourcing, CRM, estruturação comercial, outbound, Sales Enablement, networking e oportunidades profissionais.",
        },
        {
          question: "Os projetos apresentados são confidenciais?",
          answer:
            "Não. As descrições são institucionais e não expõem materiais internos, dados sensíveis, clientes, valores comerciais ou informações estratégicas confidenciais.",
        },
      ],
    },
    contact: {
      label: "Contato",
      title: "Conversas profissionais, networking e troca de ideias.",
      text:
        "Para conversas sobre vendas B2B, tecnologia, desenvolvimento comercial, CRM, IT Outsourcing e Sales Enablement, entre em contato pelo LinkedIn ou por e-mail.",
      linkedin: "LinkedIn",
      email: "E-mail",
      portfolio: "Marca pessoal e portfólio profissional",
    },
    footer: "Marca pessoal e portfólio profissional.",
  },
  en: {
    nav: {
      about: "About",
      method: "Method",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    languageLabel: "Language",
    hero: {
      badge: "Account Executive · B2B Sales · CRM · IT Outsourcing",
      title: "I turn commercial context into pipeline, relationships and B2B growth.",
      subtitle:
        "I am Ricardo Zulkiewicz, a B2B consultative sales professional focused on technology, IT Outsourcing, outbound, CRM and commercial process structuring.",
      description:
        "My work combines prospecting, discovery, qualification, commercial narrative, CRM, stakeholder relationships and pipeline discipline to turn opportunities into qualified conversations, stronger proposals and more predictable growth.",
      primaryCta: "Connect on LinkedIn",
      secondaryCta: "See working method",
      location: "São Paulo, Brazil",
      cardLabel: "Working style",
      cardTitle: "Commercial strategy with practical execution.",
      cardText:
        "I organize narrative, pipeline, CRM, commercial cadence and next steps so sales relies less on improvisation and more on method.",
      cardOneTitle: "Pipeline & CRM",
      cardOneText: "Visibility, predictability and commercial management.",
      cardTwoTitle: "New business",
      cardTwoText: "Prospecting, relationships and B2B market development.",
    },
    indicators: [
      "B2B Sales",
      "IT Outsourcing",
      "Outbound",
      "CRM",
      "Sales Enablement",
      "New Business",
    ],
    stats: [
      { value: "Full-cycle", label: "Prospecting, negotiation and closing experience" },
      { value: "B2B", label: "Consultative sales and relationship-driven selling" },
      { value: "Tech", label: "Technology, outsourcing and digital transformation focus" },
      { value: "CRM", label: "Pipeline, commercial governance and predictability" },
    ],
    about: {
      label: "About",
      title: "A commercial profile built across sales, technology and process.",
      paragraphs: [
        "My background was built in growth environments, startups, specialized recruiting, technology and digital transformation. I have worked across business development, consultative sales, stakeholder relationships, needs diagnosis, negotiation, closing, post-sales and client retention.",
        "Today, my work is focused on IT Outsourcing, outbound and new business, with an emphasis on building a more structured, consultative and revenue-oriented commercial approach.",
        "I believe high-quality B2B sales does not depend only on charisma or volume. It depends on context reading, positioning clarity, operational discipline, CRM ownership and the ability to lead relevant conversations with different stakeholders.",
      ],
    },
    strengths: [
      {
        title: "Positioning clarity",
        description:
          "I translate complex offerings into objective, relevant commercial messages connected to customer pain.",
      },
      {
        title: "Executive conversations",
        description:
          "I build relationships with different personas, understanding influence, priorities, decision criteria and buying dynamics.",
      },
      {
        title: "Operational discipline",
        description:
          "I document context, next steps and learnings to turn sales execution into a management asset.",
      },
    ],
    expertise: {
      label: "How I contribute",
      title: "Commercial structure to sell better, not only to sell more.",
      intro:
        "My contribution combines sales execution with process design, enablement materials and commercial method.",
      items: [
        {
          title: "Commercial diagnosis",
          description:
            "Market reading, ICP, personas, pains, business context, financial impact and real opportunity signals.",
        },
        {
          title: "B2B consultative sales",
          description:
            "Prospecting, discovery, qualification, proposals, negotiation and closing focused on pain, value and decision.",
        },
        {
          title: "Outbound and new business",
          description:
            "Account mapping, multichannel outreach, relationship creation and qualified conversations with decision makers.",
        },
        {
          title: "Sales Enablement",
          description:
            "Narratives, scripts, frameworks, guides and materials that transform commercial knowledge into a sales method.",
        },
        {
          title: "CRM and sales process",
          description:
            "Pipeline, cadence, activities, fields, history and governance to create operational predictability.",
        },
        {
          title: "Revenue-oriented execution",
          description:
            "Opportunity prioritization, commercial discipline, follow-up, next-step management and focus on real conversion.",
        },
      ],
    },
    method: {
      label: "Method",
      title: "From market reading to pipeline management.",
      intro:
        "More than executing sales, I organize context, narrative and process so commercial teams can sell with more clarity, consistency and predictability.",
      steps: [
        {
          step: "01",
          title: "Understand the context",
          description:
            "Before selling, I seek to understand the market, company moment, pain, urgency, decision structure and cost of inaction.",
        },
        {
          step: "02",
          title: "Organize the narrative",
          description:
            "I turn scattered information into a clear commercial message connecting problem, solution, impact and next steps.",
        },
        {
          step: "03",
          title: "Execute with cadence",
          description:
            "I work prospecting, relationships, discovery, follow-up and negotiation with consistency, context and traceability.",
        },
        {
          step: "04",
          title: "Manage pipeline with method",
          description:
            "I use CRM, activities and stage criteria to reduce improvisation, increase visibility and improve sales predictability.",
        },
      ],
    },
    experience: {
      label: "Experience",
      title: "Commercial experience in technology, startups and B2B operations.",
      intro:
        "Work in growth environments, focused on demand generation, consultative sales, stakeholder relationships, commercial processes and CRM.",
      items: [
        {
          period: "2026 — present",
          role: "Account Executive",
          company: "First Decision",
          description:
            "B2B sales work for technology and IT Outsourcing, focused on outbound, new business, commercial structuring, CRM, pipeline and enablement materials for the commercial operation.",
          tags: ["IT Outsourcing", "Outbound", "CRM", "New Business"],
        },
        {
          period: "2023 — 2025",
          role: "Account Executive",
          company: "Talentu",
          description:
            "Full-cycle consultative sales in the startup and digital transformation ecosystem, including diagnosis, strategic meetings, negotiation, closing and client relationships.",
          tags: ["Full-cycle sales", "B2B", "Startups", "Consultative selling"],
        },
        {
          period: "2022 — 2023",
          role: "Business Development Representative",
          company: "Talentu",
          description:
            "Prospecting, opportunity qualification, market mapping, commercial cadence and conversation generation with technology companies, startups and growing businesses.",
          tags: ["Prospecting", "Qualification", "Market mapping", "BDR"],
        },
      ],
    },
    projects: {
      label: "Professional projects",
      title: "Enablement, governance and process applied to commercial operations.",
      intro:
        "Examples presented institutionally, without exposing internal materials, sensitive data or confidential information.",
      items: [
        {
          title: "B2B commercial structuring for technology",
          description:
            "Organization of commercial processes, pipeline, qualification criteria, support materials and routines for an IT Outsourcing sales motion.",
        },
        {
          title: "Sales Enablement materials",
          description:
            "Creation of documents, playbooks, scripts and guides to support prospecting, discovery, objections, negotiation and opportunity management.",
        },
        {
          title: "CRM governance and commercial operations",
          description:
            "Definition of data standards, funnel stages, essential fields, usage rules and good practices for pipeline management.",
        },
      ],
    },
    operatingSystem: {
      label: "Operating system",
      title: "How I think about a healthy commercial operation.",
      items: [
        "Clear ICP and segmentation before prospecting volume.",
        "CRM as the source of truth, not only a registration tool.",
        "Discovery guided by pain, impact, urgency and decision.",
        "Follow-up with context, next step and business rationale.",
        "Commercial materials as scale infrastructure.",
        "Pipeline with objective stage criteria and forecast discipline.",
      ],
    },
    toolkit: {
      label: "Tools and repertoire",
      title: "Topics, methods and tools that are part of my work.",
      groups: [
        {
          title: "Commercial",
          items: ["Outbound", "Discovery", "Qualification", "Negotiation", "Forecast", "Follow-up"],
        },
        {
          title: "Operations",
          items: ["CRM", "Pipeline", "Pipedrive", "Playbooks", "Cadences", "Dashboards"],
        },
        {
          title: "Market",
          items: ["IT Outsourcing", "Startups", "SaaS", "Digital transformation", "Technology", "B2B"],
        },
      ],
    },
    languages: {
      label: "Languages",
      title: "Professional communication in Portuguese and English.",
      items: [
        "Native Portuguese for executive communication, negotiation and commercial relationships.",
        "English for reading, professional writing, networking, research and building international presence.",
      ],
    },
    faq: {
      label: "FAQ",
      title: "How this website should be read professionally.",
      items: [
        {
          question: "Is this website a resume?",
          answer:
            "Not exactly. It works as a professional presence, bringing together positioning, repertoire, experience and contact channels in a more executive structure than a traditional resume.",
        },
        {
          question: "What kind of conversation makes sense?",
          answer:
            "Conversations about B2B sales, technology, outsourcing, CRM, commercial structuring, outbound, Sales Enablement, networking and professional opportunities.",
        },
        {
          question: "Are the projects confidential?",
          answer:
            "No. The descriptions are institutional and do not expose internal materials, sensitive data, clients, commercial values or confidential strategic information.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Professional conversations, networking and exchange of ideas.",
      text:
        "For conversations about B2B sales, technology, business development, CRM, IT Outsourcing and Sales Enablement, reach out through LinkedIn or e-mail.",
      linkedin: "LinkedIn",
      email: "E-mail",
      portfolio: "Personal brand and professional portfolio",
    },
    footer: "Personal brand and professional portfolio.",
  },
};

const expertiseIcons = [Search, Target, Network, Layers3, Workflow, LineChart];
const strengthIcons = [Sparkles, Users2, ShieldCheck];
const projectIcons = [Building2, FileText, BarChart3];
const toolkitIcons = [Handshake, Laptop, Rocket];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm backdrop-blur">
      {children}
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt");
  const t = copy[locale];

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ricardo Zulkiewicz",
      url: "https://ricardozulkiewicz.com",
      sameAs: [linkedinUrl],
      email: emailAddress,
      jobTitle: "Account Executive",
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressCountry: "BR",
      },
      knowsAbout: [
        "B2B Sales",
        "IT Outsourcing",
        "CRM",
        "Outbound Sales",
        "Sales Enablement",
        "New Business",
        "Commercial Strategy",
      ],
    }),
    []
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_30%),radial-gradient(circle_at_top_right,_#dcfce7,_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_42%,_#f1f5f9_100%)] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="text-sm font-semibold tracking-tight text-slate-950">
            Ricardo Zulkiewicz
          </a>
          <nav className="hidden items-center gap-7 text-sm text-slate-600 lg:flex">
            <a href="#about" className="transition hover:text-slate-950">
              {t.nav.about}
            </a>
            <a href="#method" className="transition hover:text-slate-950">
              {t.nav.method}
            </a>
            <a href="#experience" className="transition hover:text-slate-950">
              {t.nav.experience}
            </a>
            <a href="#projects" className="transition hover:text-slate-950">
              {t.nav.projects}
            </a>
            <a href="#contact" className="transition hover:text-slate-950">
              {t.nav.contact}
            </a>
          </nav>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold shadow-sm">
            <Languages size={15} className="ml-2 text-slate-500" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLocale("pt")}
              className={`rounded-full px-3 py-1.5 transition ${
                locale === "pt" ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"
              }`}
              aria-label="Português"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-3 py-1.5 transition ${
                locale === "en" ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-28 lg:pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {t.hero.badge}
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl">
            {t.hero.title}
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-700">
            {t.hero.subtitle}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {t.hero.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {t.indicators.map((item) => (
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
              {t.hero.primaryCta}
              <ArrowUpRight className="ml-2" size={17} />
            </a>
            <a
              href="#method"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {t.hero.secondaryCta}
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
                {t.hero.cardLabel}
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                {t.hero.cardTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.hero.cardText}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-5">
                <LineChart className="mb-4 text-slate-950" size={22} />
                <p className="text-2xl font-semibold tracking-tight">
                  {t.hero.cardOneTitle}
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {t.hero.cardOneText}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-5">
                <BriefcaseBusiness className="mb-4 text-slate-950" size={22} />
                <p className="text-2xl font-semibold tracking-tight">
                  {t.hero.cardTwoTitle}
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {t.hero.cardTwoText}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <MapPin size={16} />
              {t.hero.location}
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat, index) => (
            <FadeIn key={stat.value} delay={index * 0.04}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              {t.about.title}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.strengths.map((item, index) => {
            const Icon = strengthIcons[index];
            return (
              <FadeIn key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon className="mb-4 text-slate-950" size={22} />
                  <h3 className="font-semibold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>{t.expertise.label}</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            {t.expertise.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{t.expertise.intro}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.expertise.items.map((item, index) => {
            const Icon = expertiseIcons[index];
            return (
              <FadeIn key={item.title} delay={index * 0.04}>
                <article className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm transition duration-300 group-hover:scale-105">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section id="method" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>{t.method.label}</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            {t.method.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{t.method.intro}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.method.steps.map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.04}>
              <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-slate-400">{item.step}</span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>{t.experience.label}</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              {t.experience.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{t.experience.intro}</p>
          </div>
          <div className="space-y-5">
            {t.experience.items.map((item, index) => (
              <FadeIn key={`${item.company}-${item.role}`} delay={index * 0.04}>
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {item.period}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-600">{item.company}</p>
                    </div>
                    <GraduationCap className="text-slate-300" size={24} />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10 md:p-10 lg:p-12">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                {t.projects.label}
              </div>
              <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                {t.projects.title}
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-300">{t.projects.intro}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {t.projects.items.map((project, index) => {
              const Icon = projectIcons[index];
              return (
                <article
                  key={project.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <Icon className="mb-5 text-emerald-300" size={22} />
                  <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>{t.operatingSystem.label}</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              {t.operatingSystem.title}
            </h2>
          </div>
          <div className="grid gap-3">
            {t.operatingSystem.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium leading-6 text-slate-700 shadow-sm"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-slate-950" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>{t.toolkit.label}</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            {t.toolkit.title}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.toolkit.groups.map((group, index) => {
            const Icon = toolkitIcons[index];
            return (
              <article key={group.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="mb-5 text-slate-950" size={22} />
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Globe2 className="mb-5 text-slate-950" size={24} />
            <SectionLabel>{t.languages.label}</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              {t.languages.title}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {t.languages.items.map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <MessageSquareText className="mb-4 text-slate-950" size={22} />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
            {t.faq.title}
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {t.faq.items.map((item) => (
            <article key={item.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.question}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <SectionLabel>{t.contact.label}</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
                {t.contact.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                {t.contact.text}
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:flex-wrap">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} /> {t.hero.location}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Compass size={16} /> {t.contact.portfolio}
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
                {t.contact.linkedin}
                <ArrowUpRight className="ml-2" size={17} />
              </a>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
              >
                {t.contact.email}
                <Mail className="ml-2" size={17} />
              </a>
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:hidden"
              >
                {t.contact.email}
                <Mail className="ml-2" size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 pb-10 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} Ricardo Zulkiewicz. {t.footer}</p>
        <p>ricardozulkiewicz.com</p>
      </footer>
    </main>
  );
}
