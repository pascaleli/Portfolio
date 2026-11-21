"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  id: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 max-w-3xl md:mb-16 ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold leading-[1.1] tracking-tight text-text">
        {title}
      </h2>
      {lede && <p className="mt-5 text-pretty text-lg text-muted">{lede}</p>}
    </Reveal>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`group relative rounded-2xl border border-line bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift motion-reduce:hover:translate-y-0 ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-1 text-[0.75rem] font-medium text-muted">
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className = "",
  tinted = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative py-24 md:py-32 ${tinted ? "border-y border-line bg-surface" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
