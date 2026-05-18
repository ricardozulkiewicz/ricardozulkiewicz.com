import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricardo Zulkiewicz | B2B Sales & IT Outsourcing",
  description:
    "Personal website and professional portfolio of Ricardo Zulkiewicz, Account Executive focused on B2B Sales, IT Outsourcing, Outbound and New Business.",
  metadataBase: new URL("https://ricardozulkiewicz.com"),
  openGraph: {
    title: "Ricardo Zulkiewicz | B2B Sales & IT Outsourcing",
    description:
      "Account Executive focused on B2B Sales, IT Outsourcing, Outbound, New Business, Sales Enablement and commercial process structuring.",
    url: "https://ricardozulkiewicz.com",
    siteName: "Ricardo Zulkiewicz",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo Zulkiewicz | B2B Sales & IT Outsourcing",
    description:
      "Account Executive focused on B2B Sales, IT Outsourcing, Outbound, New Business, Sales Enablement and commercial process structuring."
  }
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
