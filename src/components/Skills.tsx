import { Award, BadgeCheck, Bot, Cloud, Code2, Hourglass, ShieldAlert, ShieldCheck, TestTubeDiagonal } from "lucide-react";
import { certifications, skills } from "@/data/content";
import { Card, Reveal, Section, SectionHeading } from "./ui";

const domainStyle = [
  { icon: ShieldAlert, tint: "bg-danger/10 text-danger" },
  { icon: ShieldCheck, tint: "bg-brand/10 text-brand" },
  { icon: Bot, tint: "bg-violet/10 text-violet" },
  { icon: TestTubeDiagonal, tint: "bg-accent/10 text-accent" },
  { icon: Cloud, tint: "bg-brand-2/10 text-[#0369a1]" },
  { icon: Code2, tint: "bg-[#f59e0b]/10 text-[#b45309]" },
];

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills & expertise"
        title={
          <>
            Offense, defense and <span className="text-gradient">everything in between</span>.
          </>
        }
        lede="Six domains I work across every day, from breaking APIs to shipping the automation that keeps them fixed."
      />

      <Reveal>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => {
            const { icon: Icon, tint } = domainStyle[i % domainStyle.length];
            return (
              <Card key={s.domain} as="li" className="p-6">
                <div className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${tint}`}>
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold text-text">{s.domain}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((t) => (
                    <li
                      key={t}
                      className="rounded-lg border border-line bg-bg px-2.5 py-1 text-[0.8rem] font-medium text-text/80 transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-16 rounded-3xl border border-line bg-surface p-6 shadow-card md:p-8">
          <h3 className="flex items-center gap-2 text-lg font-bold text-text">
            <Award size={20} className="text-brand" aria-hidden /> Certifications
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => {
              const pending = c.status === "In progress";
              return (
                <li
                  key={c.name}
                  className={`flex items-start gap-3 rounded-2xl border p-4 ${
                    pending ? "border-dashed border-violet/40 bg-violet/5" : "border-line bg-bg"
                  }`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${pending ? "bg-violet/10 text-violet" : "bg-accent/10 text-accent"}`}>
                    {pending ? <Hourglass size={18} aria-hidden /> : <BadgeCheck size={18} aria-hidden />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug text-text">{c.name}</span>
                    <span className="block text-sm text-muted">
                      {c.issuer} · {c.status}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
