import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { site, experience, certifications } from "@/data/content";
import Providers from "@/components/Providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} (Pascal A. Tamekloe) | Senior Software Quality Engineer & Application Security Consultant`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Pascal Tamekloe",
    "cybersecurity consultant Ghana",
    "application security",
    "API penetration testing",
    "ParoCyber",
    "AI security",
    "Claude Code",
    "security audit Accra",
  ],
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: `${site.name} | Cybersecurity Consultant`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, Cybersecurity Consultant` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Cybersecurity Consultant`,
    description: site.description,
    images: ["/og.png"],
  },
  // Owner opted out of search engines (2026-11-21). Site stays public via direct link.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  verification: { google: "TvdNoDXQgPTnHXycj6QYpNI4SZCGelN6KTlb5jZJEFA" },
};

export const viewport: Viewport = {
  themeColor: "#f7f9fc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  image: `${site.url}/pascal.jpg`,
  jobTitle: experience[0].role,
  worksFor: [
    { "@type": "Organization", name: "Purple Wave Auction" },
    { "@type": "Organization", name: "ParoCyber" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Ghana" },
    { "@type": "CollegeOrUniversity", name: "University of Cape Coast" },
  ],
  hasCredential: certifications
    .filter((c) => c.status !== "In progress")
    .map((c) => ({ "@type": "EducationalOccupationalCredential", name: `${c.issuer} ${c.name}` })),
  knowsLanguage: ["en", "fr"],
  sameAs: [site.social.linkedin, site.social.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
