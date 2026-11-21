"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronDown, MapPin, Quote } from "lucide-react";
import { experience, testimonials } from "@/data/content";
import { Reveal, Section, SectionHeading } from "./ui";

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  // Only animate panels the visitor opens; the default-open panel renders statically (visible without JS).
  const [touched, setTouched] = useState(false);

  return (
    <Section id="experience" tinted>
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title={
          <>
            From network cables, software quality, automation engineering to <span className="text-gradient">application security leadership</span>.
          </>
        }
        lede="Nearly a decade across networking, development, quality engineering and security. Select a role to see the details."
      />

      <ol className="relative ml-3 border-l-2 border-line md:ml-5">
        {experience.map((job, i) => {
          const isOpen = open === i;
          const panelId = `job-panel-${i}`;
          return (
            <li key={`${job.org}-${job.role}`} className="relative pb-5 pl-7 last:pb-0 md:pl-10">
              <span
                aria-hidden
                className={`absolute -left-[9px] top-7 h-4 w-4 rounded-full border-[3px] border-white shadow-[0_0_0_2px] transition-all duration-300 ${
                  job.current ? "bg-accent shadow-accent/40" : isOpen ? "bg-brand shadow-brand/40" : "bg-line-strong shadow-line"
                }`}
              />
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <div
                  className={`rounded-2xl border transition duration-300 ${
                    isOpen ? "border-line bg-bg shadow-card" : "border-transparent hover:border-line hover:bg-bg"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        setTouched(true);
                        setOpen(isOpen ? null : i);
                      }}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 text-sm">
                          <span className={`font-semibold ${job.current ? "text-accent" : "text-brand"}`}>{job.period}</span>
                          {job.current && (
                            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-accent">Current</span>
                          )}
                        </span>
                        <span className="mt-1.5 block text-lg font-bold leading-snug text-text md:text-xl">{job.role}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted">
                          <span className="font-semibold text-text/80">{job.org}</span>
                          {job.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={13} aria-hidden /> {job.location}
                            </span>
                          )}
                        </span>
                      </span>
                      <span
                        className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition duration-300 ${
                          isOpen ? "rotate-180 border-brand bg-brand text-white" : "border-line bg-white text-muted"
                        }`}
                      >
                        <ChevronDown size={16} aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} hidden={!isOpen}>
                    <motion.div
                      key={isOpen ? "open" : "closed"}
                      initial={touched ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                        {job.progression && (
                          <ol aria-label="Role progression" className="mx-5 mb-5 space-y-2 rounded-xl border border-line bg-white p-4 md:mx-6">
                            {job.progression.map((r, k) => (
                              <li key={r.title} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                <span className={`text-sm ${k === 0 ? "font-semibold text-text" : "text-muted"}`}>{r.title}</span>
                                <span className="shrink-0 text-xs font-medium text-muted">{r.period}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                        <ul className="space-y-2.5 px-5 pb-6 text-[0.95rem] text-text/85 md:px-6">
                          {job.points.map((pt) => (
                            <li key={pt} className="flex gap-3">
                              <Check size={17} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal>
        <div className="mt-20">
          <h3 className="mb-6 text-2xl font-extrabold text-text">What colleagues say</h3>
          <ul className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="relative flex h-full flex-col rounded-3xl border border-line bg-bg p-7 shadow-card md:p-8">
                  <Quote aria-hidden size={32} className="mb-4 text-brand/25" />
                  <blockquote className="flex-1 text-pretty text-[1.05rem] leading-relaxed text-text/85">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-sm font-bold text-white">
                      {t.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span>
                      <span className="block font-bold text-text">{t.name}</span>
                      <span className="block text-sm text-muted">
                        {t.title} · {t.context}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Excerpts from LinkedIn recommendations.</p>
        </div>
      </Reveal>
    </Section>
  );
}
