# finperiti.com — Marketing Site

A fully self-contained, static marketing site for finperiti. No build step, no
dependencies, no server-side code — just HTML files with all CSS, JavaScript, and
images embedded inline (base64). It deploys as-is to Azure Static Web Apps.

---

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Home page (hero, problem, solution, how-it-works, why-us, press, pricing, team, CTA) |
| `about.html` | About Us — story + full team bios |
| `pricing.html` | Pricing — Core Platform, modular add-ons, firm configurations |
| `contact.html` | Contact — enquiry form (see "Contact form" below) |
| `privacy-policy.html` | Privacy Policy |
| `terms-and-conditions.html` | Terms & Conditions |
| `finperiti-full-site.html` | **Preview only** — all pages merged into one file for offline review/sharing. Not part of the navigation; safe to keep or delete. |
| `staticwebapp.config.json` | Azure routing (clean URLs like `/pricing`), security headers, 404 handling |
| `.github/workflows/azure-static-web-apps.yml` | CI/CD — auto-deploys on every push to `main` |
| `.gitignore` | Standard ignores |

Every page shares the same nav, footer, brand palette (Petrol #0E4F5E, Jewel Teal
#0E9F90, Ink #08191C, Bright Teal #5DE6D2, Steel #5B6B7C, Mist #EAF0F1) and fonts
(Manrope + JetBrains Mono, loaded from Google Fonts).

---

## Deploy: GitHub → Azure Static Web Apps

### Step 1 — Push to GitHub
```bash
cd finperiti-deploy          # this folder
git init
git add .
git commit -m "Initial finperiti marketing site"
git branch -M main
git remote add origin https://github.com/<your-org>/<your-repo>.git
git push -u origin main
```

### Step 2 — Create the Static Web App (one time)
1. Go to **portal.azure.com** → *Create a resource* → **Static Web App**.
2. **Basics:**
   - Subscription / Resource group: your choice
   - Name: e.g. `finperiti-web`
   - Plan type: **Free** is fine for a marketing site
   - Region: choose closest to your users (e.g. *West Europe*)
3. **Deployment:** choose **GitHub**, authorise, then select your
   Organisation / Repository / Branch (`main`).
4. **Build Details:**
   - Build Presets: **Custom**
   - **App location:** `/`
   - **Api location:** *(leave blank)*
   - **Output location:** *(leave blank)*
5. Click **Review + create** → **Create**.

Azure automatically commits a workflow file to your repo and runs the first
deployment. If you prefer, the workflow in `.github/workflows/` here does the same
thing — if Azure adds its own, you can delete one to avoid duplicates (keep whichever
references your `AZURE_STATIC_WEB_APPS_API_TOKEN` secret).

### Step 3 — Confirm the deployment secret
Azure adds a repository secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` automatically
when you link the repo in the portal. The included workflow expects exactly that name.
If you ever set it up manually: GitHub repo → *Settings* → *Secrets and variables* →
*Actions* → add `AZURE_STATIC_WEB_APPS_API_TOKEN` with the deployment token from your
Static Web App's *Manage deployment token* page.

### Step 4 — Every future change
Just push to `main`. The GitHub Action rebuilds and redeploys in ~1–2 minutes.
Pull requests get their own temporary preview URL automatically.

---

## Custom domain (finperiti.com)
In the Static Web App → **Custom domains** → add `www.finperiti.com`, then create the
CNAME record Azure shows you at your DNS provider. Add the apex `finperiti.com` too if
wanted (Azure supports apex via ALIAS/ANAME or the provided TXT validation).

---

## Clean URLs
`staticwebapp.config.json` maps friendly paths to the files:
- `/about` → `about.html`
- `/pricing` → `pricing.html`
- `/contact` → `contact.html`
- `/privacy-policy` → `privacy-policy.html`
- `/terms-and-conditions` → `terms-and-conditions.html`
- Legacy `/about-us` and `/terms-and-condition` 301-redirect to the new paths.

The in-page navigation links use the `.html` filenames directly, so the site also
works when opened straight from disk (no server needed).

---

## Two things still to wire up before launch

1. **Contact form endpoint.** `contact.html` currently falls back to opening the
   visitor's email client (`mailto:team@finperiti.com`). To capture submissions
   properly, set the `ENDPOINT` variable in the `<script>` block near the bottom of
   `contact.html` to a Formspree URL or an Azure Function endpoint. When `ENDPOINT`
   is set, the form POSTs JSON `{name, email, company, message}` and shows the inline
   success/error message instead of opening email.

2. **"Sign in" link.** The nav "Sign in" points at the raw Azure app URL
   (`kind-river-...azurestaticapps.net/signup`). Replace with a branded subdomain
   (e.g. `https://app.finperiti.com`) once DNS is set up. Search the files for
   `kind-river` to find every occurrence.

---

## Editing
No tooling required. Open any `.html` file in an editor, change the markup, commit,
push. Because images are embedded as base64 they're large data URIs inside the HTML —
use your editor's fold/minimap to skip past them, or search for the visible text you
want to change.

© 2026 finperiti Limited. finperiti® is a registered trademark of finperiti Ltd.,
registered in the European Union.
