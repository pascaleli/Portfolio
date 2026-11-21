"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Bot, Bug, Check, Server, Workflow } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { Chip, Section, SectionHeading } from "./ui";

const filters = ["All", "AI Security", "AppSec", "Infrastructure", "Automation"] as const;
type Filter = (typeof filters)[number];

const cat: Record<Project["category"], { icon: typeof Bot; tint: string; bar: string }> = {
  "AI Security": { icon: Bot, tint: "bg-violet/10 text-violet", bar: "from-violet to-brand" },
  AppSec: { icon: Bug, tint: "bg-danger/10 text-danger", bar: "from-danger to-[#f59e0b]" },
  Infrastructure: { icon: Server, tint: "bg-brand/10 text-brand", bar: "from-brand to-brand-2" },
  Automation: { icon: Workflow, tint: "bg-accent/10 text-accent", bar: "from-accent to-brand-2" },
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects" tinted>
      <SectionHeading
        id="projects-title"
        eyebrow="Projects"
        title={
          <>
            Work that <span className="text-gradient">holds up under attack</span>.
          </>
        }
        lede="From AI agent security to training labs and hardened pipelines. Client engagements are described without confidential details."
      />

      <div role="group" aria-label="Filter projects by category" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === f ? "bg-text text-white shadow-card" : "border border-line bg-white text-muted hover:border-brand/40 hover:text-brand"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => {
            const c = cat[p.category];
            const Icon = c.icon;
            return (
              <motion.li
                key={p.title}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0">
                  <span aria-hidden className={`h-1.5 w-full bg-gradient-to-r ${c.bar}`} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className={`grid h-11 w-11 place-items-center rounded-xl ${c.tint}`}>
                        <Icon size={20} aria-hidden />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{p.category}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-snug text-text transition-colors group-hover:text-brand">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                    <ul className="mt-4 space-y-2 text-sm text-text/85">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                        {p.tags.map((t) => (
                          <li key={t}>
                            <Chip>{t}</Chip>
                          </li>
                        ))}
                      </ul>
                      {p.link && (
                        <a
                          href={p.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                        >
                          View on {p.link.label}
                          <ArrowUpRight size={15} aria-hidden />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
