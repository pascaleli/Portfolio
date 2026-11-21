# Design System: Pascal A. Tamekloe Portfolio

Owner direction (2026-11-21): bright, professional and visually appealing, not dark or robotic. Security is signalled through subtle cues (soft network graphic, shield marks, one dark code panel), not a hacker aesthetic.

## Principles
1. **Bright and confident.** Light canvas, white cards, deep navy type, saturated blue as the single primary colour.
2. **Security, tastefully.** A soft animated network in the hero; a single dark terminal panel in the AI section as deliberate contrast.
3. **Motion with purpose.** Gentle fade-ups, card lift on hover, floating credential badges. All respect `prefers-reduced-motion`.
4. **Mobile first.** Every layout starts at 360px with a 16px gutter.

## Colour tokens (`src/app/globals.css`)
| Token | Value | Use | Contrast on #fff |
|---|---|---|---|
| `--bg` | `#f7f9fc` | Page canvas | |
| `--surface` | `#ffffff` | Cards, tinted sections | |
| `--surface-2` | `#eef3fb` | Chips, subtle fills | |
| `--line` / `--line-strong` | `#e3e9f2` / `#cdd7e6` | Borders | |
| `--text` | `#0b1b33` | Headings, body | 16.9:1 |
| `--muted` | `#4a5a73` | Secondary text | 7.0:1 |
| `--brand` | `#1d5cff` | Primary actions, links, focus | 5.0:1 |
| `--brand-2` | `#0ea5e9` | Gradients only | |
| `--accent` | `#067556` | Success, "current", checkmarks | 5.7:1 |
| `--violet` | `#5b3df0` | AI content | 6.3:1 |
| `--danger` | `#e5484d` | AppSec category icon only | |
| `--ink` | `#0b1530` | Dark terminal panel | |

Headline gradient: brand → sky → emerald. AI gradient: brand → violet → magenta.

## Typography
- **Plus Jakarta Sans** (display and body) via `next/font`, self-hosted. Headings use weight 800 with tight tracking.
- **JetBrains Mono** only inside the terminal and file names.
- H1 `clamp(2.6rem, 6.5vw, 4.75rem)`, H2 `clamp(2rem, 4.5vw, 3.1rem)`, body 1rem/1.7, ledes 1.125rem.

## Layout
- Container 1200px; gutters 16 / 24 / 32px.
- Sections alternate canvas and white (`Section tinted`) for rhythm; vertical padding 96px mobile, 128px desktop.
- Cards: 16 to 24px radius, 1px line border, `shadow-card`, lift to `shadow-lift` on hover.

## Components
| Component | Notes |
|---|---|
| `Nav` | Transparent over the hero, white glass on scroll; pill active state; accessible mobile dialog with focus trap |
| `Hero` | Server-rendered, CSS fade-up; portrait card with floating credential badges; soft blobs and a network canvas |
| `SectionHeading` | Pill eyebrow, extra-bold H2 with gradient phrase, muted lede |
| `AIWorkflow` | Gradient-border frame; 5-step ARIA tablist; stage panel; dark terminal replay with an sr-only transcript |
| `Projects` | Filter pills; cards with a category colour bar, check bullets and tech chips |
| `Skills` | Six domain cards with coloured icon tiles; certification grid |
| `Experience` | Vertical timeline, accordion entries with role progression; testimonial cards |
| `Contact` | Blue-to-violet gradient banner, white primary CTA, copy-email button, link cards |

## Accessibility
- WCAG 2.2 AA contrast on all text tokens; visible focus (white on the gradient banner).
- One H1; landmarks; skip link; keyboard-operable tabs, accordion and menu.
- Content is visible without JS (CSS hero animation, `<noscript>` reveal override).

## Performance
- Static export; the hero and contact are server components.
- Canvas paused off-screen or in hidden tabs, DPR capped at 2, single frame under reduced motion.
- Portrait 840px JPEG (~106 KB); fonts self-hosted.
