"use client";

import React, { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Linkedin,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const email = "ricardomachado.zulk@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/rick-zulk/";

type FlowStep = "form" | "pendingConfirmation" | "cvSent" | "cvAccessed";

type FormData = {
  fullName: string;
  professionalEmail: string;
  whatsapp: string;
  company: string;
  role: string;
  linkedin: string;
  cvVersion: string;
  reason: string;
  message: string;
  consent: boolean;
};

const initialForm: FormData = {
  fullName: "",
  professionalEmail: "",
  whatsapp: "",
  company: "",
  role: "",
  linkedin: "",
  cvVersion: "pt-br-commercial",
  reason: "",
  message: "",
  consent: false,
};

const requiredFields: Array<keyof FormData> = [
  "fullName",
  "professionalEmail",
  "whatsapp",
  "cvVersion",
  "reason",
];

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

function Label({ htmlFor, children, required = false }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8D8D8]/72">
      {children} {required && <span className="text-[#57a6b7]">*</span>}
    </label>
  );
}

function inputClass(hasError = false) {
  return `w-full border bg-[#F7F5F0]/[0.035] px-4 py-4 text-sm text-[#F7F5F0] outline-none transition placeholder:text-[#D8D8D8]/35 focus:border-[#57a6b7]/80 ${
    hasError ? "border-red-300/60" : "border-[#F7F5F0]/14"
  }`;
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#57a6b7]/30 bg-[#0F4C5C]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">
      <Sparkles size={13} />
      {children}
    </span>
  );
}

function FlowStatus({ step }: { step: FlowStep }) {
  const items: { id: FlowStep; title: string; text: string; icon: React.ElementType }[] = [
    { id: "form", title: "Solicitação recebida", text: "Lead registrado com dados mínimos de contato e intenção.", icon: FileText },
    { id: "pendingConfirmation", title: "E-mail pendente", text: "Acesso condicionado à validação do e-mail informado.", icon: Mail },
    { id: "cvSent", title: "Link temporário enviado", text: "CV enviado somente após confirmação do e-mail.", icon: LockKeyhole },
    { id: "cvAccessed", title: "CV acessado", text: "Status final para rastrear interesse real no material.", icon: CheckCircle2 },
  ];
  const currentIndex = items.findIndex((item) => item.id === step);

  return (
    <div className="grid gap-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        const active = index <= currentIndex;
        return (
          <div key={item.id} className={`border p-5 transition ${active ? "border-[#57a6b7]/45 bg-[#0F4C5C]/16" : "border-[#F7F5F0]/12 bg-[#F7F5F0]/[0.025]"}`}>
            <div className="flex gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center border ${active ? "border-[#57a6b7]/60 text-[#57a6b7]" : "border-[#F7F5F0]/14 text-[#D8D8D8]/45"}`}>
                <Icon size={18} strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F7F5F0]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#D8D8D8]/62">{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CvAccessPage() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [flowStep, setFlowStep] = useState<FlowStep>("form");
  const [submittedLead, setSubmittedLead] = useState<FormData | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const missingFields = useMemo(() => {
    const missing = requiredFields.filter((field) => !String(formData[field]).trim());
    if (!formData.consent) missing.push("consent");
    return missing;
  }, [formData]);

  const isValid = missingFields.length === 0;

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    if (!isValid) return;

    setSubmittedLead(formData);
    setFlowStep("pendingConfirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetFlow() {
    setFormData(initialForm);
    setSubmittedLead(null);
    setFlowStep("form");
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasError = (field: keyof FormData) => showErrors && missingFields.includes(field);

  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">

      <section className="relative overflow-hidden border-b border-[#F7F5F0]/14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(15,76,92,0.30),transparent_32%),radial-gradient(circle_at_8%_0%,rgba(247,245,240,0.07),transparent_28%)]" />
        <div className="absolute right-[-8%] top-[8%] hidden h-[560px] w-[560px] opacity-35 lg:block">
          <BrandMark className="h-full w-full" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-4" aria-label="Voltar para a página inicial">
            <BrandMark className="h-10 w-10" />
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-[0.26em] text-[#F7F5F0] md:text-base md:tracking-[0.34em]">RICARDO ZULK</div>
              <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">B2B TECHNOLOGY SALES</div>
            </div>
          </Link>

          <Link href="/" className="inline-flex items-center gap-3 border border-[#F7F5F0]/16 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8D8D8]/78 transition hover:border-[#F7F5F0]/35 hover:text-[#F7F5F0]">
            <ArrowLeft size={15} />
            Início
          </Link>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:pb-28 lg:pt-20">
          <div className="animate-enter-up">
            <StatusPill>Acesso controlado ao CV</StatusPill>
            <h1 className="mt-8 max-w-5xl text-5xl font-light leading-[1.04] tracking-[-0.06em] text-[#F7F5F0] md:text-7xl lg:text-[82px]">
              Solicite acesso ao meu CV de forma <span className="italic tracking-[-0.075em] text-[#F7F5F0]/90">controlada</span>, profissional e rastreável.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#D8D8D8]/76 md:text-lg">
              O CV não fica disponível em um link público direto. Para acessar o material, preencha o formulário, confirme seu e-mail e receba um link único e temporário.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-5">
                <UserRound className="mb-6 text-[#57a6b7]" size={22} />
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Identificação</h2>
                <p className="mt-3 text-sm leading-6 text-[#D8D8D8]/62">Nome, contato e contexto profissional.</p>
              </div>
              <div className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-5">
                <ShieldCheck className="mb-6 text-[#57a6b7]" size={22} />
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Validação</h2>
                <p className="mt-3 text-sm leading-6 text-[#D8D8D8]/62">Confirmação antes do envio do arquivo.</p>
              </div>
              <div className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-5">
                <Clock3 className="mb-6 text-[#57a6b7]" size={22} />
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Link temporário</h2>
                <p className="mt-3 text-sm leading-6 text-[#D8D8D8]/62">Acesso restrito, não indexado e rastreável.</p>
              </div>
            </div>
          </div>

          <aside className="animate-enter-side self-end border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-6 backdrop-blur shadow-[0_0_80px_rgba(15,76,92,0.22)]">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#57a6b7]">Fluxo previsto</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#D8D8D8]/65">MVP visual do funil de solicitação, confirmação e envio do CV.</p>
              </div>
              <LockKeyhole className="text-[#F7F5F0]/72" size={30} strokeWidth={1.5} />
            </div>
            <FlowStatus step={flowStep} />
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.58fr_1fr]">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">Formulário</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">Solicitar acesso ao CV</h2>
            <p className="mt-6 text-base leading-8 text-[#D8D8D8]/68">
              Nesta primeira versão, o formulário simula o fluxo completo. A próxima etapa técnica será conectar backend, confirmação por e-mail, token temporário e registro de lead.
            </p>

            <div className="mt-8 space-y-4 border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.025] p-5 text-sm leading-7 text-[#D8D8D8]/65">
              <p className="font-semibold uppercase tracking-[0.16em] text-[#F7F5F0]">Regra do produto</p>
              <p>O CV não deve ser publicado em URL óbvia, botão direto ou arquivo aberto em pasta pública.</p>
            </div>
          </div>

          {flowStep === "form" ? (
            <form onSubmit={handleSubmit} className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName" required>Nome completo</Label>
                  <input id="fullName" className={inputClass(hasError("fullName"))} value={formData.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Nome e sobrenome" />
                </div>
                <div>
                  <Label htmlFor="professionalEmail" required>E-mail profissional</Label>
                  <input id="professionalEmail" type="email" className={inputClass(hasError("professionalEmail"))} value={formData.professionalEmail} onChange={(event) => updateField("professionalEmail", event.target.value)} placeholder="nome@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="whatsapp" required>WhatsApp</Label>
                  <input id="whatsapp" className={inputClass(hasError("whatsapp"))} value={formData.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="+55 11 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="cvVersion" required>Versão desejada do CV</Label>
                  <select id="cvVersion" className={inputClass(hasError("cvVersion"))} value={formData.cvVersion} onChange={(event) => updateField("cvVersion", event.target.value)}>
                    <option className="bg-[#1F1F1F]" value="pt-br-commercial">Português — Account Executive / Vendas B2B</option>
                    <option className="bg-[#1F1F1F]" value="en-commercial">English — B2B Technology Sales</option>
                    <option className="bg-[#1F1F1F]" value="both">Ambas as versões</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <input id="company" className={inputClass()} value={formData.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Empresa / organização" />
                </div>
                <div>
                  <Label htmlFor="role">Cargo</Label>
                  <input id="role" className={inputClass()} value={formData.role} onChange={(event) => updateField("role", event.target.value)} placeholder="Seu cargo atual" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <input id="linkedin" className={inputClass()} value={formData.linkedin} onChange={(event) => updateField("linkedin", event.target.value)} placeholder="https://www.linkedin.com/in/..." />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="reason" required>Motivo do interesse</Label>
                  <textarea id="reason" rows={4} className={inputClass(hasError("reason"))} value={formData.reason} onChange={(event) => updateField("reason", event.target.value)} placeholder="Ex.: oportunidade profissional, networking, parceria, análise de perfil, convite para processo seletivo..." />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="message">Mensagem adicional</Label>
                  <textarea id="message" rows={4} className={inputClass()} value={formData.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Contexto adicional, prazo ou observações relevantes." />
                </div>
              </div>

              <label className={`mt-7 flex cursor-pointer gap-4 border p-5 text-sm leading-7 text-[#D8D8D8]/70 ${hasError("consent") ? "border-red-300/60" : "border-[#F7F5F0]/14"}`}>
                <input type="checkbox" checked={formData.consent} onChange={(event) => updateField("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-[#0F4C5C]" />
                <span>Concordo em informar meus dados para solicitar acesso ao CV e entendo que o envio não é automático nem público.</span>
              </label>

              {showErrors && !isValid && (
                <p className="mt-5 border border-red-300/50 bg-red-950/20 px-4 py-3 text-sm leading-6 text-red-100/90">
                  Preencha todos os campos obrigatórios e aceite o consentimento para simular o envio da solicitação.
                </p>
              )}

              <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:bg-[#126177] md:w-auto">
                Solicitar acesso ao CV
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-6 md:p-8">
              <div className="mb-8 flex items-start gap-5 border-b border-[#F7F5F0]/14 pb-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#57a6b7]/45 text-[#57a6b7]">
                  <CheckCircle2 size={22} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#57a6b7]">Solicitação registrada</p>
                  <h3 className="mt-3 text-2xl font-light tracking-[-0.04em] text-[#F7F5F0]">{submittedLead?.fullName || "Lead"}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#D8D8D8]/65">{submittedLead?.professionalEmail}</p>
                </div>
              </div>

              <div className="grid gap-5 text-sm leading-7 text-[#D8D8D8]/70 md:grid-cols-2">
                <div className="border border-[#F7F5F0]/12 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">WhatsApp</p>
                  <p className="mt-2 text-[#F7F5F0]">{submittedLead?.whatsapp}</p>
                </div>
                <div className="border border-[#F7F5F0]/12 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">CV solicitado</p>
                  <p className="mt-2 text-[#F7F5F0]">{submittedLead?.cvVersion}</p>
                </div>
                <div className="border border-[#F7F5F0]/12 p-5 md:col-span-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">Motivo</p>
                  <p className="mt-2 text-[#F7F5F0]">{submittedLead?.reason}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {flowStep === "pendingConfirmation" && (
                  <button onClick={() => setFlowStep("cvSent")} className="inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:bg-[#126177]">
                    Simular confirmação de e-mail
                    <Mail size={16} />
                  </button>
                )}
                {flowStep === "cvSent" && (
                  <button onClick={() => setFlowStep("cvAccessed")} className="inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:bg-[#126177]">
                    Simular acesso ao CV
                    <LockKeyhole size={16} />
                  </button>
                )}
                <button onClick={resetFlow} className="inline-flex items-center justify-center gap-3 border border-[#F7F5F0]/16 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition hover:border-[#F7F5F0]/36">
                  Nova solicitação
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#F7F5F0]/14 px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[#D8D8D8]/62 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Ricardo Zulkiewicz. CV access flow MVP.</p>
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]"><Mail size={15} /> E-mail</a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-[#F7F5F0]"><Linkedin size={15} /> LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
