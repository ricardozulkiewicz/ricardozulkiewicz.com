import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ricardozulkiewicz.com";
const title = "Ricardo Zulkiewicz | B2B Technology Sales Strategy";
const description =
  "Personal website of Ricardo Zulkiewicz, focused on B2B technology sales, IT Outsourcing, outbound, CRM governance, Sales Enablement and predictable revenue execution.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ricardo Zulkiewicz",
      url: siteUrl,
      email: "mailto:ricardomachado.zulk@gmail.com",
      jobTitle: "Account Executive",
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressCountry: "BR",
      },
      knowsAbout: [
        "B2B Technology Sales",
        "IT Outsourcing",
        "Outbound Sales",
        "CRM Governance",
        "Sales Enablement",
        "Pipedrive",
        "Consultative Selling",
        "Pipeline Management",
      ],
      sameAs: ["https://www.linkedin.com/in/rick-zulk/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ricardo Zulkiewicz",
      description,
      inLanguage: ["en-US", "pt-BR"],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title,
      description,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ricardo Zulkiewicz",
  authors: [{ name: "Ricardo Zulkiewicz", url: siteUrl }],
  creator: "Ricardo Zulkiewicz",
  publisher: "Ricardo Zulkiewicz",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
  },
  keywords: [
    "Ricardo Zulkiewicz",
    "Ricardo Zulk",
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
    siteName: "Ricardo Zulkiewicz",
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
