import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ricardozulkiewicz.com";
const title = "Ricardo Zulkiewicz | B2B Sales, CRM & IT Outsourcing";
const description =
  "Site pessoal e portfólio profissional de Ricardo Zulkiewicz, Account Executive focado em vendas B2B, IT Outsourcing, outbound, CRM, Sales Enablement e estruturação comercial.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ricardo Zulkiewicz",
  authors: [{ name: "Ricardo Zulkiewicz", url: siteUrl }],
  creator: "Ricardo Zulkiewicz",
  publisher: "Ricardo Zulkiewicz",
  keywords: [
    "Ricardo Zulkiewicz",
    "B2B Sales",
    "IT Outsourcing",
    "Account Executive",
    "CRM",
    "Sales Enablement",
    "Outbound Sales",
    "New Business",
    "Vendas consultivas",
    "Desenvolvimento comercial",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Ricardo Zulkiewicz",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
