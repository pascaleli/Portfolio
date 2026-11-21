# Pascal A. Tamekloe · Portfolio

Personal portfolio for Pascal A. Tamekloe, Co-Founder, Lead Cybersecurity Consultant and Instructor at ParoCyber.

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion) · Lucide icons

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run lint
```

## Edit content

All copy lives in one file: [`src/data/content.ts`](src/data/content.ts). Update roles, projects, skills, certifications or experience there; no component changes are needed.

The headshot is `public/pascal.jpg`. Replace it with a square image around 560px.

Set the production domain in `site.url` (used for canonical URLs, sitemap, Open Graph and JSON-LD).

## Deploy

The build is a fully static site in `out/`.

- **Netlify:** connect the repo; `netlify.toml` sets the build command and publish dir. Security headers come from `public/_headers`.
- **Vercel:** import the repo; `vercel.json` sets the output dir and security headers.
- **Cloudflare Pages:** build command `npm run build`, output dir `out`. `_headers` is honoured.

## Structure

```
src/
  app/            layout, page, globals.css, OG image, icon, robots, sitemap
  components/     Nav, Hero, NetworkCanvas, About, AIWorkflow, Projects, Skills, Experience, Contact, Footer, ui
  data/content.ts all site copy
docs/             design system and QA report
```

## Quality

- Accessibility: skip link, landmarks, single H1, keyboard-operable tabs/accordions/menu, visible focus, `prefers-reduced-motion` respected everywhere (canvas renders one static frame).
- Performance: static HTML, self-hosted fonts via `next/font`, canvas paused off-screen and in background tabs, DPR capped at 2.
- Security: strict CSP, HSTS, frame denial, nosniff, referrer and permissions policies; no third-party scripts or trackers.
