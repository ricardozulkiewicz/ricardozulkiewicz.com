import type { Metadata } from "next";
import { Suspense } from "react";
import CvAccessRequestPage from "../components/CvAccessRequestPage";

const siteUrl = "https://ricardozulkiewicz.com";

export const metadata: Metadata = {
  title: "Solicitar acesso ao CV | Ricardo Zulk",
  description:
    "Página de solicitação controlada de acesso ao CV de Ricardo Zulkiewicz, com formulário, confirmação de e-mail e link temporário.",
  alternates: {
    canonical: `${siteUrl}/cv`,
  },
  openGraph: {
    title: "Solicitar acesso ao CV | Ricardo Zulk",
    description:
      "Solicite acesso ao CV de Ricardo Zulkiewicz por meio de um fluxo controlado, profissional e rastreável.",
    url: `${siteUrl}/cv`,
    siteName: "Ricardo Zulk",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CvPage() {
  return (
    <Suspense fallback={null}>
      <CvAccessRequestPage />
    </Suspense>
  );
}
