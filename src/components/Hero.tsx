import Image from "next/image";
import { ArrowRight, BadgeCheck, GraduationCap, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";
import Typewriter from "./Typewriter";
import { site, stats } from "@/data/content";

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background: soft gradient mesh + network */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -right-32 top-20 h-[460px] w-[460px] rounded-full bg-brand-2/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-accent/10 blur-3xl" />
        <NetworkCanvas className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <div style={{ "--d": "0s" } as React.CSSProperties} className="fade-up mb-6 flex flex-wrap gap-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-brand shadow-card backdrop-blur">
              <GraduationCap size={16} aria-hidden />
              MSc Computer Science · University of Ghana
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-accent shadow-card backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for audits, pen tests & training
            </p>
          </div>

          <h1 style={{ "--d": "0.08s" } as React.CSSProperties} className="fade-up text-[clamp(2.6rem,6.5vw,4.75rem)] font-extrabold leading-[1.04] tracking-tight text-text">
            Hi, I&apos;m Pascal.
            <br />
            <span className="text-gradient">I secure what others ship.</span>
          </h1>

          <p style={{ "--d": "0.16s" } as React.CSSProperties} className="fade-up mt-6 flex min-h-[3.6em] flex-wrap sm:min-h-[1.8em] items-center gap-x-2 text-lg font-semibold text-text sm:text-xl">
            <span className="text-muted">I&apos;m</span>
            <Typewriter words={site.roles} className="text-brand" />
          </p>

          <p style={{ "--d": "0.24s" } as React.CSSProperties} className="fade-up mt-4 max-w-xl text-pretty text-lg text-muted">
            {site.tagline}
          </p>

          <div style={{ "--d": "0.32s" } as React.CSSProperties} className="fade-up mt-9 flex flex-wrap gap-3">
            <a
              href="#ai"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(29,92,255,0.7)] transition hover:-translate-y-0.5 hover:bg-[#1749d6]"
            >
              See how I work with AI
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-text shadow-card transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
            >
              Get in touch
            </a>
          </div>

          <dl style={{ "--d": "0.4s" } as React.CSSProperties} className="fade-up mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-2xl border border-line bg-white/80 p-4 shadow-card backdrop-blur">
                <dt className="mt-1 text-xs font-medium leading-snug text-muted">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait card */}
        <div
          style={{ "--d": "0.15s" } as React.CSSProperties}
          className="fade-up relative mx-auto w-full max-w-[420px]"
        >
          <div aria-hidden className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-brand/25 via-brand-2/15 to-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-lift">
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand/10 to-accent/10">
              <Image
                src="/pascal.jpg"
                alt={`Portrait of ${site.name}`}
                width={840}
                height={829}
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
              <div>
                <p className="font-bold text-text">{site.fullName}, MSc</p>
                <p className="flex items-center gap-1 text-sm text-muted">
                  <MapPin size={13} aria-hidden /> {site.location}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <BadgeCheck size={14} aria-hidden /> MSc CS
              </span>
            </div>
          </div>

          {/* Floating badges */}
          <div className="float absolute -left-4 top-10 hidden items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-lift sm:flex lg:-left-12">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
              <ShieldCheck size={18} aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-text">MSc CS · Security+ · ISC2 CC</span>
              <span className="block text-xs text-muted">CISSP in progress</span>
            </span>
          </div>
          <div className="float-delay absolute -right-3 bottom-24 hidden items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-lift sm:flex lg:-right-10">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet/10 text-violet">
              <Sparkles size={18} aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-text">AI-augmented</span>
              <span className="block text-xs text-muted">Agentic AI Security Engineer</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
