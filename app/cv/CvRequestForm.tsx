"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, MailCheck } from "lucide-react";

const inputBase =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#F7F5F0] outline-none transition placeholder:text-[#D8D8D8]/35 focus:border-[#0F4C5C] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#0F4C5C]/20";

const labelBase = "mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#D8D8D8]/70";

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  cvVersion: string;
  reason: string;
  company: string;
  role: string;
  linkedin: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  cvVersion: "",
  reason: "",
  company: "",
  role: "",
  linkedin: "",
  message: "",
  consent: false,
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelBase}>
        {label} {required && <span className="text-[#F7F5F0]">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function CvRequestForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const requiredComplete = useMemo(() => {
    return Boolean(
      form.fullName.trim() &&
        form.email.trim() &&
        form.whatsapp.trim() &&
        form.cvVersion &&
        form.reason &&
        form.consent
    );
  }, [form]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requiredComplete || status === "submitting") return;

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/cv/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Não foi possível enviar sua solicitação.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (requestError) {
      setStatus("error");
      setError(requestError instanceof Error ? requestError.message : "Erro inesperado ao enviar solicitação.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[620px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/10 p-8 text-center">
        <div className="mx-auto max-w-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0F4C5C]/50 bg-[#0F4C5C]/20">
            <MailCheck className="h-8 w-8 text-[#F7F5F0]" />
          </div>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D8D8D8]/70">
            <Clock3 className="h-4 w-4" />
            Confirmação pendente
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Confirme seu e-mail para continuar.
          </h2>

          <p className="mt-5 text-base leading-8 text-[#D8D8D8]/70">
            Recebemos sua solicitação de acesso ao CV. Enviamos um link de confirmação para o e-mail informado.
            Após confirmar seu e-mail, você receberá o link individual de acesso ao documento.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F4C5C]" />
              <p className="text-sm leading-6 text-[#D8D8D8]/70">
                Caso não encontre o e-mail, verifique sua caixa de spam, promoções ou lixo eletrônico.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-6">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Dados de solicitação</h2>
            <p className="mt-2 text-sm leading-6 text-[#D8D8D8]/65">
              Campos marcados com * são obrigatórios para iniciar o processo de validação.
            </p>
          </div>
          <div className="hidden rounded-full border border-[#0F4C5C]/40 bg-[#0F4C5C]/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8D8D8] sm:block">
            CV Request
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nome completo" required>
            <input
              className={inputBase}
              placeholder="Seu nome completo"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
            />
          </Field>

          <Field label="E-mail profissional" required>
            <input
              type="email"
              className={inputBase}
              placeholder="nome@empresa.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </Field>

          <Field label="WhatsApp" required>
            <input
              className={inputBase}
              placeholder="+55 (11) 99999-9999"
              value={form.whatsapp}
              onChange={(event) => updateField("whatsapp", event.target.value)}
            />
          </Field>

          <Field label="Versão desejada do CV" required>
            <select
              className={inputBase}
              value={form.cvVersion}
              onChange={(event) => updateField("cvVersion", event.target.value)}
            >
              <option className="bg-[#1F1F1F]" value="">
                Selecione uma opção
              </option>
              <option className="bg-[#1F1F1F]" value="pt">
                Português
              </option>
              <option className="bg-[#1F1F1F]" value="en">
                Inglês
              </option>
              <option className="bg-[#1F1F1F]" value="both">
                Ambas
              </option>
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Motivo do interesse" required>
              <select
                className={inputBase}
                value={form.reason}
                onChange={(event) => updateField("reason", event.target.value)}
              >
                <option className="bg-[#1F1F1F]" value="">
                  Selecione uma opção
                </option>
                <option className="bg-[#1F1F1F]" value="recruiting">
                  Recrutamento / vaga
                </option>
                <option className="bg-[#1F1F1F]" value="networking">
                  Networking
                </option>
                <option className="bg-[#1F1F1F]" value="partnership">
                  Parceria
                </option>
                <option className="bg-[#1F1F1F]" value="commercial">
                  Oportunidade comercial
                </option>
                <option className="bg-[#1F1F1F]" value="conversation">
                  Convite para conversa
                </option>
                <option className="bg-[#1F1F1F]" value="other">
                  Outro
                </option>
              </select>
            </Field>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
        <h2 className="text-xl font-semibold tracking-[-0.03em]">Informações opcionais</h2>
        <p className="mt-2 text-sm leading-6 text-[#D8D8D8]/65">
          Esses campos ajudam a contextualizar melhor a solicitação, mas não são obrigatórios.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Empresa">
            <input
              className={inputBase}
              placeholder="Empresa"
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </Field>

          <Field label="Cargo">
            <input
              className={inputBase}
              placeholder="Cargo atual"
              value={form.role}
              onChange={(event) => updateField("role", event.target.value)}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="LinkedIn">
              <input
                className={inputBase}
                placeholder="https://linkedin.com/in/..."
                value={form.linkedin}
                onChange={(event) => updateField("linkedin", event.target.value)}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Mensagem rápida">
              <textarea
                className={`${inputBase} min-h-[112px] resize-none`}
                placeholder="Conte brevemente o motivo do contato, se desejar."
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-[#0F4C5C]"
          />
          <span className="text-sm leading-6 text-[#D8D8D8]/75">
            Autorizo o uso dos meus dados para receber o CV solicitado e permitir eventual contato profissional
            relacionado a oportunidades, networking, parcerias ou projetos.
            <span className="mt-2 block text-xs text-[#D8D8D8]/45">
              Seus dados não serão vendidos ou compartilhados com terceiros. Eles serão usados apenas para tratar
              esta solicitação e eventuais contatos profissionais relacionados.
            </span>
          </span>
        </label>
      </div>

      {status === "error" && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!requiredComplete || status === "submitting"}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F7F5F0] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1F1F1F] transition hover:translate-y-[-1px] hover:shadow-2xl hover:shadow-[#0F4C5C]/20 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === "submitting" ? "Enviando solicitação..." : "Confirmar dados e solicitar CV"}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}
