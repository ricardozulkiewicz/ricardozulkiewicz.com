"use client";

import React, { useMemo, useState } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";

const siteUrl = "https://ricardozulkiewicz.com";
const email = "ricardomachado.zulk@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/rick-zulk/";
const cvUrl = "/cv";

const navItems = [
  ["About", "#about"],
  ["Expertise", "#expertise"],
  ["Approach", "#approach"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

function BrandMark({ className = "", subtle = false, dark = false }) {
  const line = dark
    ? "border-[#1F1F1F]/80"
    : subtle
      ? "border-[#F7F5F0]/22"
      : "border-[#F7F5F0]/85";

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className={`absolute border ${line}`} style={{ inset: "18% 6% 6% 18%" }} />
      <div className={`absolute border ${line}`} style={{ inset: "10% 14% 14% 10%" }} />
      <div className={`absolute border ${line}`} style={{ inset: "2% 22% 22% 2%" }} />
      <div
        className="absolute bg-[#0F4C5C] shadow-[0_0_28px_rgba(15,76,92,0.65)]"
        style={{ width: "18%", height: "18%", left: "28%", top: "56%" }}
      />
    </div>
  );
}

function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <BrandMark className={compact ? "h-10 w-10" : "h-12 w-12"} />
      <div className="leading-none">
        <div className="text-sm font-semibold tracking-[0.26em] text-[#F7F5F0] md:text-base md:tracking-[0.34em]">
          RICARDO ZULK
        </div>
        <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">
          B2B TECHNOLOGY SALES
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] ${dark ? "text-[#0F4C5C]" : "text-[#57a6b7]"}`}>
      {children}
    </p>
  );
}

const expertise = [
  {
    icon: Target,
    number: "01",
    title: "B2B Sales Strategy",
    text: "Commercial positioning, sales narrative, ICP logic, qualification criteria, buying triggers and execution discipline.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Outbound Execution",
    text: "Account mapping, prospecting logic, contact prioritization, messaging, cadence and next-step management.",
  },
  {
    icon: Database,
    number: "03",
    title: "IT Outsourcing Sales",
    text: "Commercial conversations around technical capacity, talent allocation, delivery risk, continuity and business impact.",
  },
  {
    icon: LineChart,
    number: "04",
    title: "CRM & Pipeline Governance",
    text: "Pipedrive structure, field discipline, activity management, forecast visibility and commercial operating rhythm.",
  },
];

const metrics = [
  ["First Decision", "Current focus", "Private-market IT Outsourcing, outbound and CRM governance."],
  ["R$35k–R$120k", "Deal range", "Historical consultative B2B sales context."],
  ["5 deals/mo", "Average closed deals", "Historical sales performance in Talentu context."],
  ["B2B Tech", "Market focus", "Technology, startups, digital transformation and IT services."],
];

const services = [
  {
    icon: BriefcaseBusiness,
    title: "For technology companies",
    text: "Sharper commercial positioning, better qualification, clearer sales narrative and structured pipeline execution.",
  },
  {
    icon: Layers3,
    title: "For commercial teams",
    text: "CRM standards, field governance, outbound routines, activity discipline and playbooks that make execution easier to manage.",
  },
  {
    icon: Users,
    title: "For leaders and founders",
    text: "A practical bridge between business strategy and day-to-day sales execution, with focus on visibility, consistency and revenue quality.",
  },
];

const method = [
  ["01", "Diagnose", "Understand market context, ICP, stakeholders, pain, urgency, buying process and cost of inaction."],
  ["02", "Structure", "Turn dispersed context into clear messaging, qualification logic, CRM rules and commercial materials."],
  ["03", "Execute", "Run prospecting, discovery, follow-up, negotiation and next steps with discipline and traceability."],
  ["04", "Improve", "Use pipeline governance, enablement and operating rhythm to make revenue execution more predictable."],
];

const principles = [
  {
    icon: Compass,
    title: "Context before cadence",
    text: "Outbound only works when it starts from market context, business pain and a clear reason to engage.",
  },
  {
    icon: MessagesSquare,
    title: "Discovery before pitch",
    text: "Complex technology sales require diagnosis, stakeholder mapping and impact clarity before any proposal makes sense.",
  },
  {
    icon: ShieldCheck,
    title: "CRM as a management system",
    text: "A CRM should guide decisions, forecast, accountability and next steps — not just store notes after meetings.",
  },
];

const experience = [
  {
    period: "2026 — Present",
    role: "Account Executive",
    company: "First Decision",
    text: "B2B sales for technology and IT Outsourcing, focused on outbound, new business, CRM, pipeline governance and sales enablement for the private market.",
    tags: ["IT Outsourcing", "Outbound", "Pipedrive", "New Business"],
  },
  {
    period: "2023 — 2025",
    role: "Account Executive",
    company: "Talentu",
    text: "Full-cycle consultative sales for startups and companies in digital transformation, including diagnosis, strategic meetings, negotiation, closing and retention.",
    tags: ["Full-cycle Sales", "B2B", "Startups", "Consultative Selling"],
  },
  {
    period: "2022 — 2023",
    role: "Business Development Representative",
    company: "Talentu",
    text: "Prospecting, qualification, market mapping, cadence execution and generation of commercial conversations with technology and growth companies.",
    tags: ["Prospecting", "Qualification", "Market Mapping", "BDR"],
  },
];

const selectedWork = [
  {
    title: "Sales Enablement for IT Outsourcing",
    description: "Commercial narrative, ICP, personas, discovery, objection handling, proposal structure and pipeline action plan.",
  },
  {
    title: "Pipedrive CRM Governance",
    description: "Pipeline architecture, field groups, required fields, loss reasons, activities, forecast logic and operating discipline.",
  },
  {
    title: "Outbound Operating System",
    description: "Account prioritization, buying triggers, contact mapping, messaging, cadence and next-step discipline.",
  },
  {
    title: "Commercial Materials & Playbooks",
    description: "Executive-grade materials that translate commercial context into usable sales assets for teams and leadership.",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mailto = `mailto:${email}`;

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Ricardo Zulkiewicz",
          alternateName: "Ricardo Zulk",
          url: siteUrl,
          sameAs: [linkedinUrl],
          email,
          jobTitle: "Account Executive",
          knowsAbout: [
            "B2B Technology Sales",
            "IT Outsourcing",
            "CRM Governance",
            "Outbound Sales",
            "Sales Enablement",
            "Pipeline Management",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "São Paulo",
            addressCountry: "BR",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Ricardo Zulkiewicz",
          url: siteUrl,
          inLanguage: "en-US",
          publisher: { "@id": `${siteUrl}/#person` },
        },
      ],
    }),
    []
  );

  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        :root { font-family: Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        html { scroll-behavior: smooth; }
        .hairline { border-color: rgba(247,245,240,.14); }
        .dark-hairline { border-color: rgba(31,31,31,.12); }
        .soft-glow { box-shadow: 0 0 80px rgba(15,76,92,.22); }
      `}</style>

      <section className="relative overflow-hidden border-b hairline">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_26%,rgba(15,76,92,0.24),transparent_32%),radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.06),transparent_24%)]" />
        <div className="absolute right-[-7%] top-[11%] hidden h-[540px] w-[540px] opacity-45 lg:block">
          <BrandMark className="h-full w-full" subtle />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <a href="#top" aria-label="Ricardo Zulk home">
            <LogoLockup compact />
          </a>
          <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.24em] text-[#D8D8D8]/75 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} className="transition hover:text-[#F7F5F0]" href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={mailto}
              className="hidden items-center gap-3 border border-[#0F4C5C]/70 bg-[#0F4C5C]/80 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#F7F5F0] transition hover:bg-[#0F4C5C] md:flex"
            >
              Contact <ArrowUpRight size={15} />
            </a>
            <button
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center border hairline text-[#F7F5F0] lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        {isMenuOpen && (
          <div className="relative z-20 mx-6 mb-6 border hairline bg-[#1F1F1F]/95 p-5 backdrop-blur lg:hidden">
            <nav className="grid gap-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#D8D8D8]/80">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setIsMenuOpen(false)} className="border-b hairline pb-4 last:border-b-0 last:pb-0">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}

        <div id="top" className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1fr_0.78fr] lg:px-10 lg:pb-28 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">
              Strategy. Pipeline. Revenue.
            </p>
            <h1 className="max-w-5xl text-5xl font-light leading-[1.04] tracking-[-0.06em] text-[#F7F5F0] md:text-7xl lg:text-[84px]">
              I build the commercial structure behind <span className="italic tracking-[-0.075em] text-[#F7F5F0]/90">predictable</span> B2B technology revenue.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#D8D8D8]/78 md:text-lg">
              From outbound and discovery to CRM governance and sales enablement, I translate business context into a practical sales system teams can execute, measure and improve.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:bg-[#126177]"
              >
                Start a conversation <ArrowUpRight size={16} />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-3 border border-[#D8D8D8]/20 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:border-[#F7F5F0]/45"
              >
                View the work
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="self-end border hairline bg-[#F7F5F0]/[0.035] p-6 backdrop-blur soft-glow"
          >
            <div className="mb-12 flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#57a6b7]">Commercial profile</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#D8D8D8]/65">
                  Sales, CRM, outbound, IT Outsourcing and commercial operations.
                </p>
              </div>
              <BrandMark className="h-24 w-24 shrink-0" />
            </div>
            <div className="grid gap-6">
              {metrics.map(([value, label, detail]) => (
                <div key={label} className="border-t hairline pt-5">
                  <div className="text-2xl font-light tracking-[-0.04em] text-[#F7F5F0] md:text-3xl">{value}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#57a6b7]">{label}</div>
                  <div className="mt-2 text-sm leading-6 text-[#D8D8D8]/65">{detail}</div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="expertise" className="border-b hairline bg-[#1F1F1F] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Expertise</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr]">
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
              Sales structure for complex B2B technology conversations.
            </h2>
            <div className="grid gap-px overflow-hidden border hairline bg-[#F7F5F0]/10 md:grid-cols-2">
              {expertise.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.number} className="bg-[#1F1F1F] p-8 transition hover:bg-[#F7F5F0]/[0.035]">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="text-sm font-light tracking-[0.20em] text-[#D8D8D8]/65">{item.number}</div>
                      <Icon className="text-[#57a6b7]" size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold uppercase tracking-[0.18em] text-[#F7F5F0]">{item.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-[#D8D8D8]/68">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#F7F5F0] px-6 py-24 text-[#1F1F1F] lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.86fr_1fr]">
          <div>
            <Eyebrow dark>About</Eyebrow>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              A commercial operator built between technology, process and business context.
            </h2>
          </div>
          <div className="space-y-7 text-base leading-8 text-[#4A4A4A]">
            <p>
              My work sits at the intersection of consultative B2B sales, technology, CRM governance and commercial operations. I help turn scattered market context into clear sales execution: who to target, what to say, how to qualify, what to track and how to move opportunities forward.
            </p>
            <p>
              Today, my focus is IT Outsourcing, outbound and new business, building a more structured, consultative and revenue-oriented commercial approach for complex technology conversations.
            </p>
            <div className="grid gap-4 pt-6 md:grid-cols-3">
              {["Positioning clarity", "Decision-maker conversations", "Operational discipline"].map((item) => (
                <div key={item} className="border dark-hairline bg-white/45 p-5">
                  <CheckCircle2 className="mb-5 text-[#0F4C5C]" size={20} />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b hairline px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <Eyebrow>Who I help</Eyebrow>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
              For teams that need a clearer path from market context to qualified pipeline.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border hairline bg-[#F7F5F0]/10 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="bg-[#1F1F1F] p-8">
                  <Icon className="mb-10 text-[#57a6b7]" size={24} strokeWidth={1.5} />
                  <h3 className="text-base font-semibold uppercase tracking-[0.18em] text-[#F7F5F0]">{service.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#D8D8D8]/68">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="approach" className="border-b hairline px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.5fr_1fr]">
            <div>
              <Eyebrow>Approach</Eyebrow>
              <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">Strategy first. Execution that scales.</h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#D8D8D8]/70">
              I partner with leadership and commercial teams to align context, refine process and implement execution systems that make pipeline more visible, measurable and predictable.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {method.map(([number, title, text]) => (
              <article key={number} className="relative border-t hairline pt-8">
                <div className="mb-10 text-4xl font-light tracking-[-0.04em] text-[#F7F5F0]/55">{number}</div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.20em] text-[#F7F5F0]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-[#D8D8D8]/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F5F0] px-6 py-24 text-[#1F1F1F] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <Eyebrow dark>Operating principles</Eyebrow>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
              The work is not about adding activity. It is about improving the quality of commercial decisions.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border dark-hairline bg-[#1F1F1F]/10 lg:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title} className="bg-[#F7F5F0] p-8">
                  <Icon className="mb-10 text-[#0F4C5C]" size={24} strokeWidth={1.5} />
                  <h3 className="text-base font-semibold uppercase tracking-[0.16em] text-[#1F1F1F]">{principle.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#4A4A4A]">{principle.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-[#F7F5F0] px-6 pb-24 text-[#1F1F1F] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl border-t dark-hairline pt-20">
            <Eyebrow dark>Experience</Eyebrow>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Commercial experience in technology, startups and B2B operations.
            </h2>
          </div>
          <div className="space-y-5">
            {experience.map((item) => (
              <article key={item.company + item.period} className="grid gap-6 border dark-hairline bg-white/45 p-7 md:grid-cols-[0.25fr_0.75fr]">
                <div className="text-sm font-medium uppercase tracking-[0.14em] text-[#0F4C5C]">{item.period}</div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{item.role}</h3>
                  <div className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#4A4A4A]">{item.company}</div>
                  <p className="mt-5 max-w-4xl text-base leading-8 text-[#4A4A4A]">{item.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="border dark-hairline px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A4A4A]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
              Enablement, governance and process applied to commercial execution.
            </h2>
          </div>
          <div className="grid gap-4">
            {selectedWork.map((project) => (
              <article key={project.title} className="group border-b hairline py-6">
                <div className="flex gap-5">
                  <ArrowUpRight className="mt-1 shrink-0 text-[#57a6b7] transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7F5F0]">{project.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#D8D8D8]/74">{project.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F5F0] px-6 py-20 text-[#1F1F1F] lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.55fr_1fr]">
          <div>
            <Eyebrow dark>Positioning</Eyebrow>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
              Not just selling services. Building the system behind revenue execution.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Outbound that starts from business context, not generic messaging.",
              "CRM as a management system, not a place to store notes after meetings.",
              "Qualification based on urgency, impact, fit, stakeholders and timing.",
              "Commercial materials that help teams sell with clarity and consistency.",
            ].map((item) => (
              <div key={item} className="border dark-hairline bg-white/50 p-6">
                <ShieldCheck className="mb-6 text-[#0F4C5C]" size={21} strokeWidth={1.6} />
                <p className="text-base leading-7 text-[#4A4A4A]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-10 pt-10 lg:px-10">
        <div className="mx-auto max-w-7xl border hairline bg-[#0F4C5C]/70 p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1fr_0.6fr] md:items-center">
            <h2 className="text-3xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
              Let’s build your next stage of growth.
            </h2>
            <p className="text-base leading-8 text-[#F7F5F0]/78">
              For conversations about B2B sales, technology, IT Outsourcing, CRM, outbound and sales enablement, reach out directly.
            </p>
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-3 border border-[#F7F5F0]/20 bg-[#F7F5F0] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1F1F1F] transition hover:-translate-y-0.5"
            >
              Contact <Mail size={15} />
            </a>
          </div>
        </div>

        <footer className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 border-t hairline py-8 md:flex-row md:items-center md:justify-between">
          <LogoLockup compact />
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#D8D8D8]/65">
            <span className="inline-flex items-center gap-2"><MapPin size={15} /> São Paulo, Brazil</span>
            <a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href={mailto}><Mail size={15} /> Email</a>
            <a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
            <a className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]" href={cvUrl}><Download size={15} /> CV</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
