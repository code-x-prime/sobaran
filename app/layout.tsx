import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language";
import { getDictionary, getLanguage } from "@/lib/i18n/server";

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});
const devanagariSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari-serif",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { language, dict } = await getDictionary();
  const { title, description } = dict.meta.default;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title,
    description,
    keywords: [
      "Sobaran",
      "SOBARAN",
      "Indian spices",
      "भारतीय मसाले",
      "premium foods",
      "Pratapgarh",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: language === "hi" ? "hi_IN" : "en_IN",
      alternateLocale: language === "hi" ? "en_IN" : "hi_IN",
      images: ["/branding/sobaran-burgundy.png"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const viewport: Viewport = { colorScheme: "light", themeColor: "#65000B" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const language = await getLanguage();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SOBARAN Premium Foods",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/branding/sobaran-burgundy.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pratapgarh",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  };
  return (
    <html lang={language} dir="ltr">
      <body
        className={`${devanagari.variable} ${devanagariSerif.variable} ${cormorant.variable} ${manrope.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
