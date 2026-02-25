import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kaizen 2026 | NSS IIT Delhi — Impact Counter",
  description:
    "Are you staying back on campus for Kaizen 2026? Join the movement — March 6–8, NSS IIT Delhi's annual impact fest.",
  openGraph: {
    title: "Kaizen 2026 — Impact Counter",
    description:
      "See how many students are staying back for Kaizen 2026, the annual fest of NSS IIT Delhi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
