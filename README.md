# KARANEH — کرانه

A Persian, RTL-first site for a fictional interior-architecture studio. Nine
projects across three categories, a gallery, an about page, and an inquiry path
that ends in WhatsApp rather than a cart.

Derived from the PARNIAN template. The architecture, routes, accessibility
guarantees and build pipeline are unchanged; the palette, typography, rhythm,
content and placeholder art direction are this trade's own.

## Stack

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. Three
runtime dependencies — `next`, `react`, `react-dom` — and no more.

Static export (`output: 'export'`). There is no Node runtime on GitHub Pages, so
there are no API routes, no Server Actions, no Middleware and no ISR.

## Commands

```
npm run dev            # localhost:3210 — convenient, and not what you verify against
npm run build:pages    # static export with the deployed base path applied
npm run preview:pages  # serve that export at localhost:4321/karaneh/
npm run typecheck
npm run lint
npm run test:smoke
npm run media          # regenerate the placeholder studies under public/media
npm run og             # regenerate the share card
```

On Git Bash, `export MSYS_NO_PATHCONV=1` before a build or the leading slash in
`basePath` is rewritten into a Windows path and the build fails.

## Content

Everything a visitor reads lives under `src/content/`, typed against
`src/types/content.ts`. No component hard-codes copy. Adding a project to
`products.ts` generates its page; setting `status: "draft"` removes it.

Colours, sizes, durations and easings live only in `src/app/tokens.css`.

## Placeholders

The photographs are generated tonal studies, not stock imagery, and the phone,
WhatsApp and email details are deliberately non-functional. The studio is
fictional: the copy describes material, craft and space, and asserts nothing
about a company.

## Search engines

The site is excluded from indexing — `robots: { index: false }` in the root
metadata, and a `robots.ts` that disallows everything. It is a demonstration,
not a business that should rank.
