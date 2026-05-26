import type { Metadata } from "next";
import HomePage from "../components/HomePage";

const siteUrl = "https://ricardozulkiewicz.com";

export const metadata: Metadata = {
  title: "Ricardo Zulkiewicz | Vendas B2B em Tecnologia",
  description:
    "Site pessoal de Ricardo Zulkiewicz, com foco em vendas B2B em tecnologia, Outsourcing de TI, outbound, governança de CRM, Sales Enablement e execução previsível de receita.",
  alternates: {
    canonical: `${siteUrl}/pt`,
    languages: {
      "en-US": siteUrl,
      "pt-BR": `${siteUrl}/pt`,
    },
  },
  openGraph: {
    title: "Ricardo Zulkiewicz | Vendas B2B em Tecnologia",
    description:
      "Site pessoal de Ricardo Zulkiewicz, com foco em vendas B2B em tecnologia, Outsourcing de TI, outbound, governança de CRM, Sales Enablement e execução previsível de receita.",
    url: `${siteUrl}/pt`,
    siteName: "Ricardo Zulkiewicz",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    type: "profile",
  },
};

export default function PortugueseHome() {
  return <HomePage language="pt" />;
}
