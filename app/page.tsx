import type { Metadata } from "next";
import HomePage from "./components/HomePage";

const siteUrl = "https://ricardozulkiewicz.com";

export const metadata: Metadata = {
  title: "Ricardo Zulkiewicz | B2B Technology Sales Strategy",
  description:
    "Personal website of Ricardo Zulkiewicz, focused on B2B technology sales, IT Outsourcing, outbound, CRM governance, Sales Enablement and predictable revenue execution.",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "pt-BR": `${siteUrl}/pt`,
    },
  },
  openGraph: {
    title: "Ricardo Zulkiewicz | B2B Technology Sales Strategy",
    description:
      "B2B technology sales, IT Outsourcing, outbound, CRM governance, Sales Enablement and predictable revenue execution.",
    url: siteUrl,
    siteName: "Ricardo Zulkiewicz",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    type: "profile",
  },
};

export default function Home() {
  return <HomePage language="en" />;
}
