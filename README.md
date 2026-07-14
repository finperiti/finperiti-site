# finperiti.com — Marketing Site

Static marketing site for finperiti. No build step, no dependencies, no
server-side code — plain HTML pages sharing one stylesheet and self-hosted
assets. Deployed to **GitHub Pages** at `www.finperiti.com`.

---

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Home page (hero, problem, solution, how-it-works, why-us, press, pricing, team, CTA) |
| `about.html` | About Us — story + full team bios |
| `pricing.html` | Pricing — Core Platform, modular add-ons, firm configurations |
| `contact.html` | Contact — enquiry form (currently emails `team@finperiti.com`) |
| `privacy-policy.html` | Privacy Policy |
| `terms-and-conditions.html` | Terms & Conditions |
| `css/site.css` | Single shared stylesheet for every page (base + per-page sections + responsive) |
| `fonts/` | Self-hosted Manrope (variable) + JetBrains Mono woff2, preloaded from each page |
| `images/` | Optimized assets — see image policy below |
| `CNAME` | Custom domain for GitHub Pages (`www.finperiti.com`) |
| `.nojekyll` | Tells GitHub Pages to skip the Jekyll build and serve files as-is |
| `.github/workflows/static.yml` | CI/CD — deploys to GitHub Pages on every push to `main` |

## Image policy

- **Vector-first:** UI icons and logos are optimized SVGs (run through SVGO).
- **AVIF for everything raster:** photos, screenshots, and raster-heavy art are
  AVIF (all modern browsers support it). Team photos are sized 2× their largest
  display size.
- `images/hero-illustration.avif` (43 KB) is what the homepage loads; clicking
  the hero opens `images/hero-illustration.svg` — the full-resolution vector
  original (~900 KB, embedded photos recompressed) — in a new tab.
- Favicons stay PNG/SVG for platform compatibility.

To regenerate a raster: `npx` + [sharp](https://sharp.pixelplumbing.com)
(`sharp(src).resize(w).avif({ quality: 55–70 })`). For SVGs: `npx svgo --multipass`.

## Styling

All CSS lives in `css/site.css`, ordered: shared base → per-page sections
(`/* ===== ABOUT PAGE ===== */` etc.) → shared responsive media queries.
Order matters — keep page-specific rules **before** the responsive block so
mobile breakpoints aren't overridden. Each page links it with two font
preloads ahead of it in `<head>`.

## Deploy

Push to `main` → `.github/workflows/static.yml` uploads the repo as-is to
GitHub Pages. DNS: `www.finperiti.com` CNAME → GitHub Pages (see `CNAME`).
Clean URLs like `/about` work because GitHub Pages resolves them to
`about.html` automatically.

## Editing

No tooling required. Open any `.html` file, change the markup, commit, push.
Shared visual changes go in `css/site.css` (one place, every page).

---

## Still to wire up before launch

1. **Contact form endpoint.** The form currently falls back to email
   (`team@finperiti.com`). Point it at a Formspree URL or serverless function
   to capture submissions properly.
2. **"Sign in" link.** Hidden in the nav for now; the old links point at the
   raw Azure app URL (`kind-river-...azurestaticapps.net/signup`). Replace with
   a branded subdomain (e.g. `https://app.finperiti.com`) once DNS is set up —
   search the files for `kind-river` to find every occurrence.

© 2026 finperiti Limited. finperiti® is a registered trademark of finperiti Ltd.,
registered in the European Union.
