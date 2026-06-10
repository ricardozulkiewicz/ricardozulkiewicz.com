import Link from "next/link";
import { ArrowLeft, Download, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  getAllowedCvFiles,
  getCvVersionLabel,
  verifyCvAccessToken,
  type CvFile,
} from "../../lib/cv-access";

export const metadata = {
  title: "Acesso temporário ao CV | Ricardo Zulk",
  description: "Página temporária e protegida para acesso ao CV de Ricardo Zulkiewicz.",
  robots: {
    index: false,
    follow: false,
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

function fileLabel(file: CvFile) {
  return file === "pt" ? "CV em português" : "English CV";
}

function fileDescription(file: CvFile) {
  return file === "pt"
    ? "Versão em português com posicionamento para Account Executive, Vendas B2B, Outbound, CRM e Tecnologia."
    : "English version focused on B2B Technology Sales, outbound, CRM governance, IT Outsourcing and commercial execution.";
}

function InvalidAccessCard() {
  return (
    <section className="mx-auto max-w-3xl border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-8 text-center shadow-[0_0_80px_rgba(15,76,92,0.14)] md:p-12">
      <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border border-[#57a6b7]/40 text-[#57a6b7]">
        <LockKeyhole size={28} strokeWidth={1.5} />
      </div>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#57a6b7]">Acesso inválido</p>
      <h1 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">Este link é inválido ou expirou.</h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#D8D8D8]/68">
        Por segurança, o acesso ao CV depende de um token temporário. Solicite um novo acesso para receber outro link por e-mail.
      </p>
      <Link href="/cv" className="mt-9 inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F5F0] transition hover:bg-[#126177]">
        Solicitar novo acesso
      </Link>
    </section>
  );
}

export default async function CvAccessTokenPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string; status?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const token = resolvedSearchParams.token;

  let leadName = "";
  let leadEmail = "";
  let cvVersion = "";
  let allowedFiles: CvFile[] = [];

  if (token) {
    try {
      const payload = verifyCvAccessToken(token, "download_access");
      leadName = payload.lead.fullName;
      leadEmail = payload.lead.professionalEmail;
      cvVersion = getCvVersionLabel(payload.lead.cvVersion);
      allowedFiles = getAllowedCvFiles(payload.lead.cvVersion);
    } catch {
      allowedFiles = [];
    }
  }

  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#F7F5F0] antialiased selection:bg-[#0F4C5C] selection:text-[#F7F5F0]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(15,76,92,0.26),transparent_32%),radial-gradient(circle_at_8%_0%,rgba(247,245,240,0.07),transparent_28%)]" />
        <div className="absolute right-[-8%] top-[10%] hidden h-[520px] w-[520px] opacity-30 lg:block">
          <BrandMark className="h-full w-full" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-4" aria-label="Voltar para a página inicial">
            <BrandMark className="h-10 w-10" />
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-[0.26em] text-[#F7F5F0] md:text-base md:tracking-[0.34em]">RICARDO ZULK</div>
              <div className="mt-2 text-[10px] font-medium tracking-[0.22em] text-[#57a6b7] md:text-xs md:tracking-[0.32em]">TEMPORARY CV ACCESS</div>
            </div>
          </Link>
          <Link href="/cv" className="inline-flex items-center gap-3 border border-[#F7F5F0]/16 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8D8D8]/78 transition hover:border-[#F7F5F0]/35 hover:text-[#F7F5F0]">
            <ArrowLeft size={15} />
            Solicitação
          </Link>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10 lg:pt-20">
          {!token || allowedFiles.length === 0 ? (
            <InvalidAccessCard />
          ) : (
            <section className="grid gap-12 lg:grid-cols-[0.76fr_1fr]">
              <div>
                <p className="mb-5 inline-flex items-center gap-2 border border-[#57a6b7]/30 bg-[#0F4C5C]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#57a6b7]">
                  <ShieldCheck size={13} />
                  Link validado
                </p>
                <h1 className="text-5xl font-light leading-[1.04] tracking-[-0.06em] text-[#F7F5F0] md:text-7xl">
                  Acesso temporário liberado ao CV.
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-[#D8D8D8]/72 md:text-lg">
                  Este link foi emitido para <strong className="font-semibold text-[#F7F5F0]">{leadName}</strong> ({leadEmail}) e libera apenas a versão solicitada: <strong className="font-semibold text-[#F7F5F0]">{cvVersion}</strong>.
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#D8D8D8]/58">
                  Ao clicar no arquivo, o acesso será registrado e você será redirecionado para o download configurado.
                </p>
              </div>

              <div className="grid gap-5 self-start">
                {allowedFiles.map((file) => (
                  <article key={file} className="border border-[#F7F5F0]/14 bg-[#F7F5F0]/[0.035] p-7 shadow-[0_0_80px_rgba(15,76,92,0.12)]">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center border border-[#57a6b7]/45 text-[#57a6b7]">
                      <FileText size={24} strokeWidth={1.6} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#57a6b7]">{file.toUpperCase()}</p>
                    <h2 className="mt-3 text-3xl font-light tracking-[-0.04em] text-[#F7F5F0]">{fileLabel(file)}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#D8D8D8]/66">{fileDescription(file)}</p>
                    <a
                      href={`/api/cv/download?token=${encodeURIComponent(token)}&file=${file}`}
                      className="mt-8 inline-flex items-center justify-center gap-3 bg-[#0F4C5C] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F5F0] transition hover:-translate-y-0.5 hover:bg-[#126177]"
                    >
                      Baixar CV
                      <Download size={16} />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
