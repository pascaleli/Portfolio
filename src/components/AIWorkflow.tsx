"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Bot, CheckCircle2, FileSearch, FileText, Lock, RotateCcw, ScanSearch, ShieldCheck, Sparkles, UserCheck, Zap } from "lucide-react";
import { aiWorkflow } from "@/data/content";
import { Card, Reveal, Section, SectionHeading } from "./ui";

const icons = {
  recon: ScanSearch,
  analyse: FileSearch,
  validate: UserCheck,
  report: FileText,
  regress: ShieldCheck,
} as const;

const principleIcons = [CheckCircle2, Lock, Zap];

const lineColor = {
  cmd: "text-white",
  out: "text-slate-400",
  warn: "text-amber-300",
  ok: "text-emerald-400",
} as const;

function TerminalReplay() {
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const lines = aiWorkflow.terminal;
  const [shown, setShown] = useState(reduce ? lines.length : 0);
  const [typed, setTyped] = useState("");
  const [run, setRun] = useState(0);

  const replay = () => {
    setShown(0);
    setTyped("");
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (reduce || !started) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const l = lines[i];
        if (l.type === "cmd") {
          for (let c = 1; c <= l.text.length; c++) {
            if (cancelled) return;
            setTyped(l.text.slice(0, c));
            await wait(22);
          }
          await wait(250);
        } else {
          await wait(450);
        }
        if (cancelled) return;
        setTyped("");
        setShown(i + 1);
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [started, run, reduce, lines]);

  const current = lines[shown];
  const done = shown >= lines.length;

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-2xl bg-ink shadow-[0_30px_60px_-30px_rgba(11,21,48,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-slate-400">claude-code · security audit</span>
        <button
          type="button"
          onClick={replay}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
          disabled={!done || !!reduce}
          aria-label="Replay terminal session"
        >
          <RotateCcw size={12} aria-hidden /> replay
        </button>
      </div>
      <div
        className="min-h-[300px] flex-1 space-y-1.5 overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed sm:text-[0.82rem]"
        role="log"
        aria-label="Example AI-assisted security audit session"
      >
        {lines.slice(0, shown).map((l, i) => (
          <p key={`${run}-${i}`} className={`whitespace-pre-wrap break-words ${lineColor[l.type as keyof typeof lineColor]}`}>
            {l.type === "cmd" && <span className="text-sky-400">$ </span>}
            {l.text}
          </p>
        ))}
        {!done && current?.type === "cmd" && (
          <p className="whitespace-pre-wrap break-words text-white">
            <span className="text-sky-400">$ </span>
            <span className="caret">{typed}</span>
          </p>
        )}
        {!done && current?.type !== "cmd" && <p className="caret text-slate-500" aria-hidden />}
        {done && (
          <p className="text-white">
            <span className="text-sky-400">$ </span>
            <span className="caret" />
          </p>
        )}
      </div>
    </div>
  );
}

export default function AIWorkflow() {
  const [active, setActive] = useState(0);
  const step = aiWorkflow.pipeline[active];
  const reduce = useReducedMotion();
  const n = aiWorkflow.pipeline.length;

  const focusTab = (i: number) => {
    setActive(i);
    document.getElementById(`tab-${aiWorkflow.pipeline[i].id}`)?.focus();
  };

  return (
    <Section id="ai" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[620px] w-[1000px] max-w-[100vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(109,74,255,0.16), rgba(29,92,255,0.10), transparent)" }}
      />

      <SectionHeading
        id="ai-title"
        eyebrow="AI workflow"
        center
        title={
          <>
            Security work, <span className="text-gradient-ai">amplified by AI</span>.
          </>
        }
        lede={aiWorkflow.lede}
      />

      <Reveal>
        <div className="ai-frame p-4 sm:p-6 lg:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
              <Sparkles size={15} aria-hidden /> My agentic audit pipeline
            </p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Tools in this workflow">
              {aiWorkflow.tools.map((t) => (
                <li key={t} className="rounded-full border border-line bg-bg px-3 py-1 text-xs font-medium text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Pipeline */}
          <div role="tablist" aria-label="Workflow stages" className="relative grid gap-3 md:grid-cols-5 md:gap-0">
            {aiWorkflow.pipeline.map((p, i) => {
              const Icon = icons[p.id as keyof typeof icons];
              const isActive = i === active;
              const isHuman = p.id === "validate";
              return (
                <div key={p.id} className="relative">
                  {i < n - 1 && (
                    <>
                      <span aria-hidden className="absolute left-[calc(50%+2.25rem)] right-[calc(-50%+2.25rem)] top-[2.1rem] hidden h-[2px] opacity-40 flow-line md:block" />
                      <span aria-hidden className="absolute bottom-[-0.75rem] left-[2.05rem] top-[4rem] w-[2px] opacity-40 flow-line-v md:hidden" />
                    </>
                  )}
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={isActive}
                    aria-controls="ai-stage-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        focusTab((i + 1) % n);
                      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        focusTab((i - 1 + n) % n);
                      } else if (e.key === "Home") {
                        e.preventDefault();
                        focusTab(0);
                      } else if (e.key === "End") {
                        e.preventDefault();
                        focusTab(n - 1);
                      }
                    }}
                    className="group relative z-10 flex w-full items-center gap-4 rounded-2xl p-2 text-left md:flex-col md:gap-3 md:text-center"
                  >
                    <span
                      className={`relative grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? isHuman
                            ? "bg-accent text-white shadow-[0_12px_28px_-10px_rgba(10,138,102,0.8)]"
                            : "bg-brand text-white shadow-[0_12px_28px_-10px_rgba(29,92,255,0.8)]"
                          : "border border-line bg-white text-muted group-hover:border-brand/40 group-hover:text-brand"
                      }`}
                    >
                      <Icon size={22} aria-hidden />
                      {isActive && !reduce && (
                        <motion.span
                          layoutId="ai-ring"
                          className={`absolute -inset-1.5 rounded-[1.2rem] border-2 ${isHuman ? "border-accent/30" : "border-brand/30"}`}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-muted">Step {p.step}</span>
                      <span className={`block font-bold leading-tight ${isActive ? "text-text" : "text-text/70"}`}>{p.title}</span>
                      <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${isHuman ? "text-accent" : "text-violet"}`}>
                        {isHuman ? <UserCheck size={12} aria-hidden /> : <Bot size={12} aria-hidden />}
                        {p.agent}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Stage detail + terminal */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div
              id="ai-stage-panel"
              role="tabpanel"
              aria-labelledby={`tab-${step.id}`}
              className="flex flex-col rounded-2xl border border-line bg-bg p-6 md:p-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1"
                >
                  <p className="text-sm font-semibold text-brand">
                    Step {step.step} of 0{n}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-text">{step.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted">{step.text}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm">
                    <span className="text-muted">Output</span>
                    <span className="font-mono font-medium text-accent">{step.output}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex gap-1.5" aria-hidden>
                {aiWorkflow.pipeline.map((p, i) => (
                  <span key={p.id} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= active ? "bg-brand" : "bg-line"}`} />
                ))}
              </div>
            </div>
            <TerminalReplay />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {aiWorkflow.principles.map((p, i) => {
            const Icon = principleIcons[i % principleIcons.length];
            return (
              <Card key={p.title} as="li" className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold text-text">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </Card>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
