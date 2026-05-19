import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ricardozulkiewicz.com";
const title = "Ricardo Zulkiewicz | B2B Sales, CRM & IT Outsourcing";
const description =
  "Bilingual personal website and professional portfolio of Ricardo Zulkiewicz, Account Executive focused on B2B Sales, IT Outsourcing, outbound, CRM, Sales Enablement and commercial process structuring.";

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
    "Ricardo Zulkiewicz portfolio",
    "B2B Sales",
    "IT Outsourcing",
    "Account Executive",
    "CRM",
    "Sales Enablement",
    "Outbound Sales",
    "New Business",
    "Consultative Sales",
    "Vendas consultivas",
    "Desenvolvimento comercial",
    "Pipeline Management",
    "Pipedrive",
    "Technology Sales",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "pt-BR": siteUrl,
      "en-US": siteUrl,
    },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Ricardo Zulkiewicz",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    type: "profile",
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
      <body>
        {children}
        <a
          href="/cv"
          className="fixed bottom-5 right-5 z-50 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          CV
        </a>
      </body>
    </html>
  );
}
