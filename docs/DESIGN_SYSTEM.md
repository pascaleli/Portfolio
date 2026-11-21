# Design System: Pascal A. Tamekloe Portfolio

Owner: UI/UX Designer role. Approved before development.

## Principles
1. **Signal over noise.** Dark canvas, neon used sparingly to mark what matters.
2. **Terminal honesty.** Mono type, prompts and status lines make the security theme feel earned, not costume.
3. **Motion with purpose.** Reveal on scroll, hover feedback, one ambient background. Everything respects `prefers-reduced-motion`.
4. **Mobile first.** Every layout starts at 360px with a 16px gutter.

## Color tokens (CSS variables in `globals.css`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#05070d` | Page background |
| `--bg-elev` | `#0b1020` | Cards, panels |
| `--bg-elev-2` | `#111833` | Hover states, terminal bars |
| `--line` | `rgba(120,160,255,0.12)` | Borders, dividers |
| `--text` | `#e6edf7` | Body text (contrast 16:1 on bg) |
| `--muted` | `#8b97b0` | Secondary text (contrast 6.6:1 on bg) |
| `--cyber` | `#00e5ff` | Electric blue: primary accent, links, focus |
| `--matrix` | `#39ff88` | Cyber green: success, terminal prompt, live status |
| `--violet` | `#a78bfa` | Tertiary accent for AI/Claude content only |
| `--danger` | `#ff4d6d` | Threat markers in visuals |

Gradients: `cyber → matrix` for headline highlights and the AI section frame.

## Typography
- Display + body: **Space Grotesk** (400/500/600/700), loaded via `next/font`, self-hosted.
- Mono: **JetBrains Mono** (400/500) for labels, terminal, tags.
- Scale (fluid with `clamp`): H1 `clamp(2.5rem, 7vw, 5.5rem)`, H2 `clamp(2rem, 4.5vw, 3.25rem)`, body 1rem/1.7.
- Section eyebrow: mono, uppercase, 0.75rem, letter-spacing 0.2em, prefixed with `//` and a number (`// 01`).

## Layout
- Container max-width 1200px, gutter 16px mobile / 24px tablet / 32px desktop.
- Section vertical rhythm: `py-24` mobile, `py-32` desktop.
- Grid: 1 col mobile, 2 col ≥768px, 3 col ≥1024px for cards.

## Components
| Component | Spec |
|---|---|
| `Nav` | Sticky, blurred glass bar; mono links; mobile sheet menu with focus trap via native `<dialog>`-like pattern; active section highlight. |
| `SectionHeading` | Eyebrow + H2 + optional lede. Glitch effect on H2 hover only. |
| `GlitchText` | CSS pseudo-element RGB split; animates on hover/once on load; disabled for reduced motion. |
| `TerminalWindow` | macOS-style bar (3 dots), mono body, typewriter lines. |
| `Card` | `bg-elev`, 1px `line` border, 16px radius, cursor-following radial glow on hover. |
| `Tag` | Mono 0.75rem pill, `line` border. |
| `Button` | Primary: cyber fill, dark text. Ghost: border, cyber text. Both have visible focus ring (`--cyber`, 2px offset). |
| `Timeline` | Vertical rail with glowing node; entries expand on click (keyboard accessible `<button aria-expanded>`). |
| `SkillMatrix` | Grouped domains, animated proficiency bars + tool chips. |
| `NetworkCanvas` | Hero background: canvas node graph with packet pulses + matrix rain fade. Paused off-screen and for reduced motion. |

## Wireframe (mobile → desktop)
```
[Nav: PAT_ ................................ links | Hire me]
[HERO]  status line ● available | H1 name (glitch) | role typewriter
        tagline | CTA: View work / Get in touch | stats row (6+ yrs QA, 4+ yrs sec, certs)
        right (desktop): terminal card `whoami`
[01 ABOUT]   photo frame (scanline) | summary | quick facts grid
[02 AI WORKFLOW]  centrepiece: pipeline diagram (Recon → Analyse → Exploit-validate → Report → Remediate)
                  with Claude Code agents, live terminal replay, 3 principle cards (human-in-the-loop)
[03 PROJECTS]  filter chips | 3-col card grid
[04 SKILLS]    domain tabs/radar-like bars + tool chips + certifications strip
[05 EXPERIENCE] interactive vertical timeline
[06 CONTACT]   big CTA, link cards (LinkedIn, GitHub, Email, ParoCyber)
[Footer]
```

## Accessibility
- All text ≥ 4.5:1 contrast. Focus visible on every interactive element.
- Skip link to `#main`. Landmarks: header/nav/main/footer. One H1.
- Decorative canvases `aria-hidden`. Motion off under `prefers-reduced-motion`.

## Performance
- Static export (`output: "export"`), no runtime server.
- Fonts self-hosted via `next/font`. Image pre-optimised (WebP, ≤60KB).
- Canvas animation uses `requestAnimationFrame`, pauses when hidden, DPR capped at 2.
