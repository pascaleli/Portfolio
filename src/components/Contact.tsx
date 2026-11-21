import { ArrowUpRight, Mail, Shield } from "lucide-react";
import CopyEmailButton from "./CopyEmailButton";
import { site } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Card, Reveal, Section } from "./ui";

const links = [
  { label: "LinkedIn", handle: "in/pascal-a-tamekloe", href: site.social.linkedin, icon: LinkedinIcon, note: "Career updates & recommendations" },
  { label: "GitHub", handle: "@pascaleli", href: site.social.github, icon: GithubIcon, note: "Frameworks, labs & tooling" },
  { label: "ParoCyber", handle: "parocyber.com", href: site.social.parocyber, icon: Shield, note: "Audits, pen tests & training" },
];

export default function Contact() {
  return (
    <Section id="contact" className="pb-16 md:pb-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-[#2f49e8] to-[#5b3df5] px-5 py-14 text-center text-white shadow-lift sm:px-10 md:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-2/30 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" /> Contact
            </p>
            <h2 id="contact-title" className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.1rem,5.5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight">
              Let&apos;s find your vulnerabilities before attackers do.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-white/95">
              Security audits, API and web pen tests, AI security reviews, or hands-on training for your team. Tell me what you&apos;re protecting.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}?subject=Security%20engagement%20enquiry`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5 focus-visible:outline-white sm:w-auto"
              >
                <Mail size={18} aria-hidden /> Email me
              </a>
              <CopyEmailButton
                email={site.email}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-white sm:w-auto"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Card key={l.label} as="li">
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-text">{l.label}</span>
                    <span className="block truncate text-sm text-muted">{l.handle}</span>
                    <span className="mt-0.5 block text-xs text-muted">{l.note}</span>
                  </span>
                  <ArrowUpRight size={18} aria-hidden className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Card>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
