import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { site, experience, certifications } from "@/data/content";
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
    default: `${site.name} | Cybersecurity Consultant & AppSec Pen Tester`,
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Cybersecurity Consultant`,
    description: site.description,
  },
  robots: { index: true, follow: true },
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
  worksFor: { "@type": "Organization", name: "ParoCyber" },
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
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
