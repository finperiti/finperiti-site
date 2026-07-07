# Finperiti — Static Site Recovery

A faithful static clone of **www.finperiti.com**, reconstructed from the live site so it can be
version-controlled and hosted on GitHub Pages.

## Folder structure

```
finperiti-site/
├── index.html                 # Home ( was / )
├── about-us.html              # ( was /about-us )
├── pricing.html               # ( was /pricing )
├── contact.html               # ( was /contact )
├── terms-and-condition.html   # ( was /terms-and-condition )
├── privacy-policy.html        # ( was /privacy-policy )
├── css/
│   └── finperiti.css          # Complete site stylesheet
├── js/
│   └── script.js              # Mobile menu toggle only (~40 lines, no dependencies)
├── .nojekyll                  # Tells GitHub Pages to serve files as-is
├── .gitignore
└── README.md
```

## Deploy to GitHub Pages

```bash
cd finperiti-site
git init
git add .
git commit -m "Recover finperiti.com as static site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `main` / root**.

Pages are flat `.html` files with **relative links**, so the site works whether it is served
from the domain root (`example.com/`) or a project subpath (`user.github.io/repo/`).

To use the finperiti.com custom domain, add a file named `CNAME` containing `www.finperiti.com`
and configure DNS per GitHub's custom-domain docs. (Not included here so it doesn't interfere
with a default deploy.)

## What was preserved

- All page text, headings, and copy — verbatim.
- Full layout, colours, fonts (Poppins + Inter), and spacing — the original stylesheet is kept
  intact, so rendering is pixel-faithful on desktop and mobile (verified via screenshots).
- Images, icons, logos, and the dashboard graphic — these still load from the original Webflow
  CDN URLs (`cdn.prod.website-files.com`), as agreed. See note below if you want them local.
- Section anchors (`#the-solution`, `#advantages`) and team anchors (`#fiona`, `#richard`, …).
- SEO metadata, Open Graph / Twitter tags, favicon, and the JSON-LD structured data.

## What changed (and why)

- **Internal links** rewritten from absolute (`/about-us`) to relative (`about-us.html`) for portability.
- **Stylesheet** now loaded from `css/finperiti.css` instead of the CDN (SRI integrity hash removed,
  since it applied to the CDN copy).
- **JavaScript** — the original site loaded jQuery + several Webflow runtime scripts. These were
  removed and replaced with a single ~40-line vanilla script that only drives the mobile hamburger
  menu (the site's one interactive element). It reuses the classes/attributes the existing CSS
  already defines, so the open/closed menu looks identical to the live site.

## ⚠️ Dynamic content that plain HTML/CSS cannot replicate

The live site was built in Webflow. These pieces depended on Webflow's hosted backend and will
**not** function on static hosting without extra setup:

1. **Contact form** (`contact.html`) and **Waitlist form** (`index.html`).
   Both submitted to Webflow's form-handling backend and used a Cloudflare Turnstile anti-bot
   widget. On GitHub Pages the fields render and validate in-browser, but submissions go nowhere.
   To make them work, point each `<form>` at a form service — e.g. Formspree, Basin, or Getform —
   by setting `action="https://…"` and `method="post"`, or move hosting to a platform with built-in
   forms (Netlify/Cloudflare Pages). The Turnstile widget can be dropped or re-keyed.

2. **Form success / error messages.** The "Thank you! / Oops!" blocks exist in the markup but were
   shown/hidden by Webflow's JS after submission. Wire these up with your chosen form service.

3. **"Get Started" button** links to the external signup app
   (`kind-river-07dda5b03.6.azurestaticapps.net/signup`) — unchanged, still external.

4. **Scroll animations.** The live site had subtle Webflow scroll-in animations. These were purely
   cosmetic (no content was hidden behind them), so they were dropped for a clean, dependency-free
   build. Content appears immediately.

## Optional: fully self-host images

Images currently load from the Webflow CDN. If you'd rather not depend on it, download each asset
into a local `images/` folder and replace the `cdn.prod.website-files.com/...` URLs. I can generate
a script to do this automatically if you want the site to be 100% self-contained.
