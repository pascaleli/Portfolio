import { Briefcase, GraduationCap, Languages, Target } from "lucide-react";
import { about, education } from "@/data/content";
import { Reveal, Section, SectionHeading } from "./ui";

const factIcons = [GraduationCap, Target, Briefcase, Languages];

export default function About() {
  return (
    <Section id="about" tinted>
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            title={
              <>
                From quality engineer, automation engineer to <span className="text-gradient">security lead</span>.
              </>
            }
          />
          <div className="-mt-4 space-y-5 text-pretty text-lg leading-relaxed text-text/85">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="space-y-5 lg:pt-24">
          <Reveal>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {about.facts.map((f, i) => {
                const Icon = factIcons[i % factIcons.length];
                return (
                  <div key={f.k} className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{f.k}</dt>
                      <dd className="mt-0.5 font-semibold leading-snug text-text">{f.v}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-gradient-to-br from-brand to-[#3b2bd9] p-6 text-white shadow-lift">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <GraduationCap size={18} aria-hidden /> Education
              </p>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-lg font-bold leading-snug">{e.degree}</p>
                    <p className="text-sm text-white/95">
                      {e.school} · {e.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
