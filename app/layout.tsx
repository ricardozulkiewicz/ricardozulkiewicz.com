import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ricardozulkiewicz.com";
const title = "Ricardo Zulk | B2B Technology Sales Strategy";
const description =
  "Personal website of Ricardo Zulkiewicz, focused on B2B technology sales, IT Outsourcing, outbound, CRM governance, Sales Enablement and predictable revenue execution.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ricardo Zulk",
  authors: [{ name: "Ricardo Zulkiewicz", url: siteUrl }],
  creator: "Ricardo Zulkiewicz",
  publisher: "Ricardo Zulkiewicz",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
  },
  keywords: [
    "Ricardo Zulk",
    "Ricardo Zulkiewicz",
    "B2B Technology Sales",
    "Technology Sales Strategy",
    "IT Outsourcing",
    "Account Executive",
    "CRM Governance",
    "Sales Enablement",
    "Outbound Sales",
    "New Business",
    "Consultative Sales",
    "Pipeline Management",
    "Pipedrive",
    "Commercial Strategy",
    "Predictable Revenue",
    "Vendas B2B em tecnologia",
    "Vendas consultivas",
    "Governança de CRM",
    "Outsourcing de TI",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "pt-BR": `${siteUrl}/pt`,
    },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Ricardo Zulk",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
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
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
