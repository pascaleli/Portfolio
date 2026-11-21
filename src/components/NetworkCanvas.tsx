"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };
type Packet = { a: number; b: number; t: number; speed: number; color: string };

/**
 * Light hero background: a soft network of nodes with data packets travelling
 * between them and occasional green "secured" pulses. Pauses off-screen, in
 * background tabs, and renders a single still frame for reduced motion.
 */
export default function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const linkDist = () => Math.min(160, Math.max(100, w / 9));

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(26, (w * h) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.8 + 1.4,
        pulse: 0,
      }));
      packets = [];
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const LD = linkDist();

      for (const n of nodes) {
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - dt * 0.0005);
      }
      if (Math.random() < 0.005) nodes[(Math.random() * nodes.length) | 0].pulse = 1;

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LD) {
            ctx.strokeStyle = `rgba(29,92,255,${(1 - dist / LD) * 0.18})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (packets.length < 18 && Math.random() < 0.0007 * dt) {
              packets.push({
                a: i,
                b: j,
                t: 0,
                speed: 0.0006 + Math.random() * 0.0008,
                color: Math.random() < 0.7 ? "29,92,255" : "10,138,102",
              });
            }
          }
        }
      }

      packets = packets.filter((p) => {
        p.t += p.speed * dt;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b || p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LD) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `rgba(${p.color},0.75)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      for (const n of nodes) {
        if (n.pulse > 0) {
          ctx.strokeStyle = `rgba(10,138,102,${n.pulse * 0.5})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, (1 - n.pulse) * 22 + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = n.pulse > 0 ? "rgba(10,138,102,0.8)" : "rgba(29,92,255,0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    init();
    if (reduce) draw(16);
    else start();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        init();
        if (reduce) draw(16);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeT);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
}
