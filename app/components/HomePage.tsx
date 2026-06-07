"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Database,
  Download,
  Layers3,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessagesSquare,
  ShieldCheck,
  Target,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const email = "ricardomachado.zulk@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/rick-zulk/";

type Language = "en" | "pt";
type Card = { icon: LucideIcon; title: string; text: string; number?: string };
type Experience = { period: string; role: string; company: string; text: string; tags: string[] };
type Copy = {
  lang: string;
  nav: [string, string][];
  brandSubtitle: string;
  contact: string;
  heroEyebrow: string;
  heroBefore: string;
  heroHighlight: string;
  heroAfter: string;
  heroText: string;
  primaryCta: string;
  secondaryCta: string;
  profileTitle: string;
  profileText: string;
  metrics: [string, string, string][];
  expertiseTitle: string;
  expertise: Card[];
  aboutTitle: string;
  aboutText: string[];
  aboutPills: string[];
  servicesTitle: string;
  services: Card[];
  approachTitle: string;
  approachText: string;
  method: [string, string, string][];
  principlesTitle: string;
  principles: Card[];
  experienceTitle: string;
  experience: Experience[];
  workTitle: string;
  work: { title: string; description: string }[];
  positioningTitle: string;
  positioning: string[];
  finalTitle: string;
  finalText: string;
  location: string;
};

const sharedExperienceEn: Experience[] = [
  { period: "2026 — Present", role: "Account Executive", company: "First Decision", text: "B2B sales for technology and IT Outsourcing, focused on outbound, new business, CRM, pipeline governance and sales enablement for the private market.", tags: ["IT Outsourcing", "Outbound", "Pipedrive", "New Business"] },
  { period: "2023 — 2025", role: "Account Executive", company: "Talentu", text: "Full-cycle consultative sales for startups and companies in digital transformation, including diagnosis, strategic meetings, negotiation, closing and retention.", tags: ["Full-cycle Sales", "B2B", "Startups", "Consultative Selling"] },
  { period: "2022 — 2023", role: "Business Development Representative", company: "Talentu", text: "Prospecting, qualification, market mapping, cadence execution and generation of commercial conversations with technology and growth companies.", tags: ["Prospecting", "Qualification", "Market Mapping", "BDR"] },
];

const sharedExperiencePt: Experience[] = [
  { period: "2026 — Presente", role: "Account Executive", company: "First Decision", text: "Vendas B2B para tecnologia e Outsourcing de TI, com foco em outbound, new business, CRM, governança de pipeline e sales enablement para o mercado privado.", tags: ["Outsourcing de TI", "Outbound", "Pipedrive", "New Business"] },
  { period: "2023 — 2025", role: "Account Executive", company: "Talentu", text: "Vendas consultivas full-cycle para startups e empresas em transformação digital, incluindo diagnóstico, reuniões estratégicas, negociação, fechamento e retenção.", tags: ["Full-cycle Sales", "B2B", "Startups", "Venda Consultiva"] },
  { period: "2022 — 2023", role: "Business Development Representative", company: "Talentu", text: "Prospecção, qualificação, mapeamento de mercado, execução de cadência e geração de conversas comerciais com empresas de tecnologia e crescimento.", tags: ["Prospecção", "Qualificação", "Mapeamento", "BDR"] },
];

const content: Record<Language, Copy> = {
  en: {
    lang: "en-US",
    nav: [["About", "#about"], ["Expertise", "#expertise"], ["Approach", "#approach"], ["Experience", "#experience"], ["Work", "#work"], ["Contact", "#contact"]],
    brandSubtitle: "B2B TECHNOLOGY SALES",
    contact: "Contact",
    heroEyebrow: "Strategy. Pipeline. Revenue.",
    heroBefore: "I build the commercial structure behind",
    heroHighlight: "predictable",
    heroAfter: "B2B technology revenue.",
    heroText: "From outbound and discovery to CRM governance and sales enablement, I translate business context into a practical sales system teams can execute, measure and improve.",
    primaryCta: "Start a conversation",
    secondaryCta: "View the work",
    profileTitle: "Commercial profile",
    profileText: "Sales, CRM, outbound, IT Outsourcing and commercial operations.",
    metrics: [["First Decision", "Current focus", "Private-market IT Outsourcing, outbound and CRM governance."], ["R$35k–R$120k", "Deal range", "Historical consultative B2B sales context."], ["5 deals/mo", "Average closed deals", "Historical sales performance in Talentu context."], ["B2B Tech", "Market focus", "Technology, startups, digital transformation and IT services."]],
    expertiseTitle: "Sales structure for complex B2B technology conversations.",
    expertise: [{ icon: Target, number: "01", title: "B2B Sales Strategy", text: "Commercial positioning, sales narrative, ICP logic, qualification criteria, buying triggers and execution discipline." }, { icon: Workflow, number: "02", title: "Outbound Execution", text: "Account mapping, prospecting logic, contact prioritization, messaging, cadence and next-step management." }, { icon: Database, number: "03", title: "IT Outsourcing Sales", text: "Commercial conversations around technical capacity, talent allocation, delivery risk, continuity and business impact." }, { icon: LineChart, number: "04", title: "CRM & Pipeline Governance", text: "Pipedrive structure, field discipline, activity management, forecast visibility and commercial operating rhythm." }],
    aboutTitle: "A commercial operator built between technology, process and business context.",
    aboutText: ["My work sits at the intersection of consultative B2B sales, technology, CRM governance and commercial operations.", "Today, my focus is IT Outsourcing, outbound and new business, building a more structured, consultative and revenue-oriented commercial approach for complex technology conversations."],
    aboutPills: ["Positioning clarity", "Decision-maker conversations", "Operational discipline"],
    servicesTitle: "For teams that need a clearer path from market context to qualified pipeline.",
    services: [{ icon: BriefcaseBusiness, title: "For technology companies", text: "Sharper commercial positioning, better qualification, clearer sales narrative and structured pipeline execution." }, { icon: Layers3, title: "For commercial teams", text: "CRM standards, field governance, outbound routines, activity discipline and playbooks that make execution easier to manage." }, { icon: Users, title: "For leaders and founders", text: "A practical bridge between business strategy and day-to-day sales execution." }],
    approachTitle: "Strategy first. Execution that scales.",
    approachText: "I partner with leadership and commercial teams to align context, refine process and implement execution systems that make pipeline more visible, measurable and predictable.",
    method: [["01", "Diagnose", "Understand market context, ICP, stakeholders, pain, urgency and buying process."], ["02", "Structure", "Turn dispersed context into messaging, qualification logic, CRM rules and materials."], ["03", "Execute", "Run prospecting, discovery, follow-up, negotiation and next steps with discipline."], ["04", "Improve", "Use pipeline governance and operating rhythm to make revenue execution more predictable."]],
    principlesTitle: "The work is not about adding activity. It is about improving the quality of commercial decisions.",
    principles: [{ icon: Compass, title: "Context before cadence", text: "Outbound works when it starts from market context, business pain and a clear reason to engage." }, { icon: MessagesSquare, title: "Discovery before pitch", text: "Complex technology sales require diagnosis, stakeholder mapping and impact clarity before proposal." }, { icon: ShieldCheck, title: "CRM as a management system", text: "A CRM should guide decisions, forecast, accountability and next steps." }],
    experienceTitle: "Commercial experience in technology, startups and B2B operations.",
    experience: sharedExperienceEn,
    workTitle: "Enablement, governance and process applied to commercial execution.",
    work: [{ title: "Sales Enablement for IT Outsourcing", description: "Commercial narrative, ICP, personas, discovery, objection handling, proposal structure and pipeline action plan." }, { title: "Pipedrive CRM Governance", description: "Pipeline architecture, field groups, required fields, loss reasons, activities, forecast logic and operating discipline." }, { title: "Outbound Operating System", description: "Account prioritization, buying triggers, contact mapping, messaging, cadence and next-step discipline." }, { title: "Commercial Materials & Playbooks", description: "Executive-grade materials that translate commercial context into usable sales assets." }],
    positioningTitle: "Not just selling services. Building the system behind revenue execution.",
    positioning: ["Outbound that starts from business context, not generic messaging.", "CRM as a management system, not a place to store notes after meetings.", "Qualification based on urgency, impact, fit, stakeholders and timing.", "Commercial materials that help teams sell with clarity and consistency."],
    finalTitle: "Let’s build your next stage of growth.",
    finalText: "For conversations about B2B sales, technology, IT Outsourcing, CRM, outbound and sales enablement, reach out directly.",
    location: "São Paulo, Brazil",
  },
  pt: {
    lang: "pt-BR",
    nav: [["Sobre", "#about"], ["Especialidades", "#expertise"], ["Abordagem", "#approach"], ["Experiência", "#experience"], ["Projetos", "#work"], ["Contato", "#contact"]],
    brandSubtitle: "VENDAS B2B EM TECNOLOGIA",
    contact: "Contato",
    heroEyebrow: "Estratégia. Pipeline. Receita.",
    heroBefore: "Eu estruturo a operação comercial por trás de uma receita",
    heroHighlight: "previsível",
    heroAfter: "em tecnologia B2B.",
    heroText: "Do outbound ao discovery, da governança de CRM ao sales enablement, eu transformo contexto de negócio em um sistema comercial prático, executável, mensurável e evolutivo.",
    primaryCta: "Iniciar conversa",
    secondaryCta: "Ver projetos",
    profileTitle: "Perfil comercial",
    profileText: "Vendas, CRM, outbound, Outsourcing de TI e operação comercial.",
    metrics: [["First Decision", "Foco atual", "Outsourcing de TI para mercado privado, outbound e governança de CRM."], ["R$35k–R$120k", "Faixa de deals", "Histórico em vendas consultivas B2B."], ["5 deals/mês", "Média de fechamentos", "Histórico de performance comercial no contexto da Talentu."], ["B2B Tech", "Foco de mercado", "Tecnologia, startups, transformação digital e serviços de TI."]],
    expertiseTitle: "Estrutura comercial para conversas complexas de tecnologia B2B.",
    expertise: [{ icon: Target, number: "01", title: "Estratégia de Vendas B2B", text: "Posicionamento comercial, narrativa de vendas, lógica de ICP, critérios de qualificação, gatilhos de compra e disciplina de execução." }, { icon: Workflow, number: "02", title: "Execução Outbound", text: "Mapeamento de contas, lógica de prospecção, priorização de contatos, mensagens, cadência e gestão de próximos passos." }, { icon: Database, number: "03", title: "Vendas de Outsourcing de TI", text: "Conversas comerciais sobre capacidade técnica, alocação de talentos, risco de entrega, continuidade operacional e impacto de negócio." }, { icon: LineChart, number: "04", title: "Governança de CRM & Pipeline", text: "Estrutura de Pipedrive, disciplina de campos, gestão de atividades, visibilidade de forecast e ritmo operacional comercial." }],
    aboutTitle: "Um operador comercial construído entre tecnologia, processo e contexto de negócio.",
    aboutText: ["Meu trabalho fica na intersecção entre vendas consultivas B2B, tecnologia, governança de CRM e operação comercial.", "Hoje, meu foco está em Outsourcing de TI, outbound e new business, construindo uma abordagem comercial mais estruturada, consultiva e orientada a receita para conversas complexas de tecnologia."],
    aboutPills: ["Clareza de posicionamento", "Conversas com decisores", "Disciplina operacional"],
    servicesTitle: "Para times que precisam transformar contexto de mercado em pipeline qualificado.",
    services: [{ icon: BriefcaseBusiness, title: "Empresas de tecnologia", text: "Posicionamento comercial mais claro, melhor qualificação, narrativa de vendas mais forte e execução estruturada de pipeline." }, { icon: Layers3, title: "Times comerciais", text: "Padrões de CRM, governança de campos, rotinas outbound, disciplina de atividades e playbooks que facilitam a gestão da execução." }, { icon: Users, title: "Líderes e fundadores", text: "Uma ponte prática entre estratégia de negócio e execução comercial diária." }],
    approachTitle: "Estratégia antes. Execução com escala.",
    approachText: "Atuo com liderança e times comerciais para alinhar contexto, refinar processos e implementar sistemas de execução que tornam o pipeline mais visível, mensurável e previsível.",
    method: [["01", "Diagnosticar", "Entender mercado, ICP, stakeholders, dor, urgência e processo de compra."], ["02", "Estruturar", "Transformar contexto disperso em mensagem, qualificação, regras de CRM e materiais."], ["03", "Executar", "Conduzir prospecção, discovery, follow-up, negociação e próximos passos com disciplina."], ["04", "Evoluir", "Usar governança de pipeline e rotina operacional para tornar a receita mais previsível."]],
    principlesTitle: "O trabalho não é sobre adicionar atividade. É sobre melhorar a qualidade das decisões comerciais.",
    principles: [{ icon: Compass, title: "Contexto antes de cadência", text: "Outbound funciona quando parte de contexto de mercado, dor de negócio e uma razão clara para conversar." }, { icon: MessagesSquare, title: "Discovery antes do pitch", text: "Vendas complexas de tecnologia exigem diagnóstico, stakeholders e clareza de impacto antes da proposta." }, { icon: ShieldCheck, title: "CRM como sistema de gestão", text: "Um CRM deve orientar decisões, forecast, accountability e próximos passos." }],
    experienceTitle: "Experiência comercial em tecnologia, startups e operações B2B.",
    experience: sharedExperiencePt,
    workTitle: "Enablement, governança e processo aplicados à execução comercial.",
    work: [{ title: "Sales Enablement para Outsourcing de TI", description: "Narrativa comercial, ICP, personas, discovery, objeções, proposta e plano de ação de pipeline." }, { title: "Governança de CRM no Pipedrive", description: "Arquitetura de pipeline, grupos de campos, campos obrigatórios, motivos de perda, atividades, forecast e disciplina operacional." }, { title: "Sistema Operacional Outbound", description: "Priorização de contas, gatilhos de compra, mapeamento de contatos, mensagens, cadência e próximos passos." }, { title: "Materiais Comerciais & Playbooks", description: "Materiais executivos que transformam contexto comercial em ativos utilizáveis." }],
    positioningTitle: "Não é só vender serviços. É construir o sistema por trás da execução de receita.",
    positioning: ["Outbound que começa por contexto de negócio, não por mensagem genérica.", "CRM como sistema de gestão, não como lugar para guardar notas depois das reuniões.", "Qualificação baseada em urgência, impacto, fit, stakeholders e timing.", "Materiais comerciais que ajudam times a vender com clareza e consistência."],
    finalTitle: "Vamos construir seu próximo estágio de crescimento.",
    finalText: "Para conversas sobre vendas B2B, tecnologia, Outsourcing de TI, CRM, outbound e sales enablement, entre em contato diretamente.",
    location: "São Paulo, Brasil",
  },
};

function BrandMark({ className = "", subtle = false, dark = false }: { className?: string; subtle?: boolean; dark?: boolean }) {
  const line = dark ? "border-[#1F1F1F]/80" : subtle ? "border-[#F7F5F0]/22" : "border-[#F7F5F0]/85";
  return <div className={`relative ${className}`} aria-hidden="true"><div className={`absolute border ${line}`} style={{ inset: "18% 6% 6% 18%" }} /><div className={`absolute border ${line}`} style={{ inset: "10% 14% 14% 10%" }} /><div className={`absolute border ${line}`} style={{ inset: "2% 22% 22% 2%" }} /><div className="absolute bg-[#0F4C5C] shadow-[0_0_28px_rgba(15,76,92,0.65)]" style={{ width: "18%", height: "18%", left: "28%", top: "56%" }} /></div>;
}

function LogoLockup({ subtitle }: { subtitle: string }) {
  return <div className="flex items-center gap-4"><BrandMark className="h-10 w-10" /><div className="leading-none"><div className="text-sm font-semibold tracking-[0.26em] text-[#F7F5F0] md:text-base md:tracking-[0.34em]">RICARDO ZULK</div><div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">{subtitle}</div></div></div>;
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] ${dark ? "text-[#0F4C5C]" : "text-[#57a6b7]"}`}>{children}</p>;
}

function LanguageSwitch({ language, mobile = false }: { language: Language; mobile?: boolean }) {
  const base = mobile ? "mb-5 flex border hairline text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8D8D8]/70" : "hidden items-center border hairline text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8D8D8]/70 md:flex";
  const item = mobile ? "flex-1 px-3 py-3 text-center" : "px-3 py-3 transition hover:text-[#F7F5F0]";
  const active = "bg-[#F7F5F0] text-[#1F1F1F] hover:text-[#1F1F1F]";
  return <div className={base}><a href="/" className={`${item} ${language === "en" ? active : ""}`}>EN</a><a href="/pt" className={`${item} ${language === "pt" ? active : ""}`}>PT</a></div>;
}

export default function HomePage({ language }: { language: Language }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const c = content[language];
  const mailto = `mailto:${email}`;

  return (
    <main lang={c.lang} className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <style>{`:root { font-family: Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; } html { scroll-behavior: smooth; } .hairline { border-color: rgba(247,245,240,.14); } .dark-hairline { border-color: rgba(31,31,31,.12); } .soft-glow { box-shadow: 0 0 80px rgba(15,76,92,.22); }`}</style>
      <section className="relative overflow-hidden border-b hairline"><div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_26%,rgba(15,76,92,0.24),transparent_32%),radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.06),transparent_24%)]" /><div className="absolute right-[-7%] top-[11%] hidden h-[540px] w-[540px] opacity-45 lg:block"><BrandMark className="h-full w-full" subtle /></div><header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10"><a href="#top" aria-label="Ricardo Zulk home"><LogoLockup subtitle={c.brandSubtitle} /></a><nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.24em] text-[#D8D8D8]/75 lg:flex">{c.nav.map(([label, href]) => <a key={label} className="transition hover:text-[#F7F5F0]" href={href}>{label}</a>)}</nav><div className="flex items-center gap-3"><LanguageSwitch language={language} /><a href={mailto} className="hidden items-center gap-3 border border-[#0F4C5C]/70 bg-[#0F4C5C]/80 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#F7F5F0] transition hover:bg-[#0F4C5C] md:flex">{c.contact} <ArrowUpRight size={15} /></a><button onClick={() => setIsMenuOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center border hairline text-[#F7F5F0] lg:hidden" aria-label="Toggle navigation">{isMenuOpen ? <X size={18} /> : <Menu size={18} />}</button></div></header>{isMenuOpen && <div className="relative z-20 mx-6 mb-6 border hairline bg-[#1F1F1F]/95 p-5 backdrop-blur lg:hidden"><LanguageSwitch language={language} mobile /><nav className="grid gap-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#D8D8D8]/80">{c.nav.map(([label, href]) => <a key={label} href={href} onClick={() => setIsMenuOpen(false)} className="border-b hairline pb-4 last:border-b-0 last:pb-0">{label}</a>)}</nav></div>}<div id="top" className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1fr_0.78fr] lg:px-10 lg:pb-28 lg:pt-20"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">{c.heroEyebrow}</p><h1 className="max-w-5xl text-5xl font-light leading-[1.04] tracking-[-0.06em] text-[#F7F5F0] md:text-7xl lg:text-[84px]">{c.heroBefore} <span className="italic tracking-[-0.075em] text-[#F7F5F0]/90">{c.heroHighlight}</span> {c.heroAfter}</h1><p className="mt-8 max-w-2xl text-base leading-8 text-[#D8D8D8]/78 md:text-lg">{c.heroText}</p><div className="mt-10 flex flex-col gap-4 sm:flex-row"><a href={mailto} className="inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:bg-[#126177]">{c.primaryCta} <ArrowUpRight size={16} /></a><a href="#work" className="inline-flex items-center justify-center gap-3 border border-[#D8D8D8]/20 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:border-[#F7F5F0]/45">{c.secondaryCta}</a></div></motion.div><motion.aside initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="self-end border hairline bg-[#F7F5F0]/[0.035] p-6 backdrop-blur soft-glow"><div className="mb-12 flex items-start justify-between gap-6"><div><p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#57a6b7]">{c.profileTitle}</p><p className="mt-3 max-w-xs text-sm leading-6 text-[#D8D8D8]/65">{c.profileText}</p></div><BrandMark className="h-24 w-24 shrink-0" /></div><div className="grid gap-6">{c.metrics.map(([value, label, detail]) => <div key={label} className="border-t hairline pt-5"><div className="text-2xl font-light tracking-[-0.04em] text-[#F7F5F0] md:text-3xl">{value}</div><div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#57a6b7]">{label}</div><div className="mt-2 text-sm leading-6 text-[#D8D8D8]/65">{detail}</div></div>)}</div></motion.aside></div></section>
      <section id="expertise" className="border-b hairline px-6 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><Eyebrow>Expertise</Eyebrow><div className="grid gap-10 lg:grid-cols-[0.48fr_1fr]"><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.expertiseTitle}</h2><CardGrid cards={c.expertise} /></div></div></section>
      <section id="about" className="bg-[#F7F5F0] px-6 py-24 text-[#1F1F1F] lg:px-10"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.86fr_1fr]"><div><Eyebrow dark>{language === "pt" ? "Sobre" : "About"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{c.aboutTitle}</h2></div><div className="space-y-7 text-base leading-8 text-[#4A4A4A]">{c.aboutText.map((p) => <p key={p}>{p}</p>)}<div className="grid gap-4 pt-6 md:grid-cols-3">{c.aboutPills.map((item) => <div key={item} className="border dark-hairline bg-white/45 p-5"><CheckCircle2 className="mb-5 text-[#0F4C5C]" size={20} /><h3 className="text-sm font-semibold uppercase tracking-[0.12em]">{item}</h3></div>)}</div></div></div></section>
      <section className="border-b hairline px-6 py-24 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-3xl"><Eyebrow>{language === "pt" ? "Quem eu ajudo" : "Who I help"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.servicesTitle}</h2></div><CardGrid cards={c.services} columns="three" /></div></section>
      <section id="approach" className="border-b hairline px-6 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-14 grid gap-8 lg:grid-cols-[0.5fr_1fr]"><div><Eyebrow>{language === "pt" ? "Abordagem" : "Approach"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.approachTitle}</h2></div><p className="max-w-3xl text-base leading-8 text-[#D8D8D8]/70">{c.approachText}</p></div><div className="grid gap-6 md:grid-cols-4">{c.method.map(([number, title, text]) => <article key={number} className="border-t hairline pt-8"><div className="mb-10 text-4xl font-light tracking-[-0.04em] text-[#F7F5F0]/55">{number}</div><h3 className="text-sm font-semibold uppercase tracking-[0.20em] text-[#F7F5F0]">{title}</h3><p className="mt-5 text-sm leading-7 text-[#D8D8D8]/65">{text}</p></article>)}</div></div></section>
      <section className="bg-[#F7F5F0] px-6 py-24 text-[#1F1F1F] lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-4xl"><Eyebrow dark>{language === "pt" ? "Princípios de operação" : "Operating principles"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.principlesTitle}</h2></div><div className="grid gap-px overflow-hidden border dark-hairline bg-[#1F1F1F]/10 lg:grid-cols-3">{c.principles.map((card) => { const Icon = card.icon; return <article key={card.title} className="bg-[#F7F5F0] p-8"><Icon className="mb-10 text-[#0F4C5C]" size={24} strokeWidth={1.5} /><h3 className="text-base font-semibold uppercase tracking-[0.16em] text-[#1F1F1F]">{card.title}</h3><p className="mt-5 text-sm leading-7 text-[#4A4A4A]">{card.text}</p></article>; })}</div></div></section>
      <section id="experience" className="bg-[#F7F5F0] px-6 pb-24 text-[#1F1F1F] lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-14 max-w-3xl border-t dark-hairline pt-20"><Eyebrow dark>{language === "pt" ? "Experiência" : "Experience"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{c.experienceTitle}</h2></div><div className="space-y-5">{c.experience.map((item) => <article key={item.company + item.period} className="grid gap-6 border dark-hairline bg-white/45 p-7 md:grid-cols-[0.25fr_0.75fr]"><div className="text-sm font-medium uppercase tracking-[0.14em] text-[#0F4C5C]">{item.period}</div><div><h3 className="text-2xl font-semibold tracking-[-0.03em]">{item.role}</h3><div className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#4A4A4A]">{item.company}</div><p className="mt-5 max-w-4xl text-base leading-8 text-[#4A4A4A]">{item.text}</p><div className="mt-6 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="border dark-hairline px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A4A4A]">{tag}</span>)}</div></div></article>)}</div></div></section>
      <section id="work" className="px-6 py-24 lg:px-10"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]"><div><Eyebrow>{language === "pt" ? "Projetos selecionados" : "Selected work"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.workTitle}</h2></div><div className="grid gap-4">{c.work.map((project) => <article key={project.title} className="group border-b hairline py-6"><div className="flex gap-5"><ArrowUpRight className="mt-1 shrink-0 text-[#57a6b7] transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} /><div><h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7F5F0]">{project.title}</h3><p className="mt-4 text-base leading-7 text-[#D8D8D8]/74">{project.description}</p></div></div></article>)}</div></div></section>
      <section className="bg-[#F7F5F0] px-6 py-20 text-[#1F1F1F] lg:px-10"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.55fr_1fr]"><div><Eyebrow dark>{language === "pt" ? "Posicionamento" : "Positioning"}</Eyebrow><h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.positioningTitle}</h2></div><div className="grid gap-5 md:grid-cols-2">{c.positioning.map((item) => <div key={item} className="border dark-hairline bg-white/50 p-6"><ShieldCheck className="mb-6 text-[#0F4C5C]" size={21} strokeWidth={1.6} /><p className="text-base leading-7 text-[#4A4A4A]">{item}</p></div>)}</div></div></section>
      <section id="contact" className="px-6 pb-10 pt-10 lg:px-10"><div className="mx-auto max-w-7xl border hairline bg-[#0F4C5C]/70 p-8 md:p-12"><div className="grid gap-10 md:grid-cols-[0.9fr_1fr_0.6fr] md:items-center"><h2 className="text-3xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{c.finalTitle}</h2><p className="text-base leading-8 text-[#F7F5F0]/78">{c.finalText}</p><a href={mailto} className="inline-flex items-center justify-center gap-3 border border-[#F7F5F0]/20 bg-[#F7F5F0] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1F1F1F] transition hover:-translate-y-0.5">{c.contact} <Mail size={15} /></a></div></div><footer className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 border-t hairline py-8 md:flex-row md:items-center md:justify-between"><LogoLockup subtitle={c.brandSubtitle} /><div className="flex flex-wrap items-center gap-5 text-sm text-[#D8D8D8]/65"><span className="inline-flex items-center gap-2"><MapPin size={15} /> {c.location}</span><a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href={mailto}><Mail size={15} /> Email</a><a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href="/cv"><Download size={15} /> CV</a><a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href={language === "pt" ? "/" : "/pt"}>{language === "pt" ? "EN" : "PT"}</a></div></footer></section>
    </main>
  );
}

function CardGrid({ cards, columns = "two" }: { cards: Card[]; columns?: "two" | "three" }) {
  const grid = columns === "three" ? "lg:grid-cols-3" : "md:grid-cols-2";
  return <div className={`grid gap-px overflow-hidden border hairline bg-[#F7F5F0]/10 ${grid}`}>{cards.map((card) => { const Icon = card.icon; return <article key={card.title} className="bg-[#1F1F1F] p-8 transition hover:bg-[#F7F5F0]/[0.035]"><div className="mb-8 flex items-center justify-between"><div className="text-sm font-light tracking-[0.20em] text-[#D8D8D8]/65">{card.number}</div><Icon className="text-[#57a6b7]" size={22} strokeWidth={1.5} /></div><h3 className="text-base font-semibold uppercase tracking-[0.18em] text-[#F7F5F0]">{card.title}</h3><p className="mt-5 text-sm leading-7 text-[#D8D8D8]/68">{card.text}</p></article>; })}</div>;
}
