# Development Instructions for AI Agents & Developers

**Purpose:** Central reference for how to work on finperiti.com  
**Audience:** Claude Code, AI agents, developers, maintainers

---

## Documentation Hierarchy

This project uses a clear hierarchy of documentation files. Always consult the most specific level first:

```
CLAUDE.md / AGENTS.md (you are here)
    ↓ points to ↓
.dev/index.md (this file)
    ↓ points to ↓
.dev/docs/prds/index.md (specific domain instructions)
    ↓ points to ↓
.dev/docs/prds/*.md (source documents: seo.md, etc.)
```

---

## Core Development Areas

### 1. SEO, Marketing, and Messaging
**See:** `.dev/docs/prds/index.md`

Instructions for implementing SEO updates based on canonical messaging and technical specifications.

- **Marketing copy & messaging:** `.dev/docs/prds/seo.md`
- **Technical implementation:** `.dev/docs/prds/seo-optimization.md`
- **Implementation guide:** `.dev/docs/prds/index.md`

**When to use:**
- Updating page titles, meta descriptions, headings
- Implementing schema.org structured data
- Writing customer-facing copy for SEO
- Validating SEO implementations

---

## Project Structure

```
finperiti.com/
├── index.html, about.html, pricing.html, contact.html    ← Main website pages
├── css/site.css                                            ← Shared stylesheet
├── images/                                                  ← Optimized assets
├── robots.txt, sitemap.xml, 404.html, humans.txt          ← SEO infrastructure
│
├── SEO_OPTIMIZATION.md                                     ← [DEPRECATED - use .dev/docs/prds/]
├── .dev/                                                   ← Development documentation
│   ├── index.md                                            ← You are here
│   └── docs/
│       └── prds/
│           ├── index.md                                    ← SEO implementation guide
│           ├── seo.md                                      ← Source of truth: marketing copy
│           └── seo-optimization.md                         ← Technical reference
│
└── .github/workflows/static.yml                            ← GitHub Pages deployment

```

---

## Guidelines for All Work

### Before Starting Any Task:
1. **Check `.dev/docs/prds/index.md`** if it's SEO or marketing-related
2. **Reference the appropriate source document** (seo.md, etc.)
3. **Never invent copy or positioning** — always use documented sources
4. **Follow established patterns** in the codebase

### When Making Changes:
- **Semantic HTML** — Use proper HTML5 tags (`<header>`, `<main>`, `<section>`, etc.)
- **CSS conventions** — Reference `.css/site.css` for patterns
- **Brand consistency** — Use "Finperiti" (company) vs "finperiti" (product) correctly
- **Metadata accuracy** — Ensure all meta tags, titles, descriptions are up-to-date
- **Commit messages** — Include ticket reference (WRK-21, MRK-20, etc.)

### Testing Before Commit:
- Validate HTML structure
- Check that metadata is correct
- Verify links are working
- Ensure brand names are capitalized correctly
- Test on mobile viewport

### Git Workflow:
1. Make changes on a branch or locally
2. Test thoroughly
3. Stage only relevant files (`git add <specific-files>`)
4. Commit with ticket reference
5. **Do NOT push** unless explicitly told to

---

## Common Tasks

### Task: Update SEO Copy on a Page
**Go to:** `.dev/docs/prds/index.md` → "Task: Update Copy to Match seo.md"

### Task: Add New Page with SEO
**Go to:** `.dev/docs/prds/index.md` → "Task: Add a New Page to SEO Coverage"

### Task: Update Schema.org Structured Data
**Go to:** `.dev/docs/prds/index.md` → "Task: Update Schema.org Structured Data"

### Task: Review or Fix Errors
See the root-level `CLAUDE.md` or `AGENTS.md` for instructions on running `/code-review`

---

## Documentation Types

### CLAUDE.md
Entry point for Claude Code sessions. Points here.

### AGENTS.md
Entry point for AI agents. Points here.

### .dev/index.md
This file. Master development instructions.

### .dev/docs/prds/index.md
Domain-specific instructions for SEO implementation.

### .dev/docs/prds/seo.md
**Source of truth** for marketing copy, messaging, and SEO content.

### .dev/docs/prds/seo-optimization.md
Technical reference for what SEO was implemented.

---

## Key Principles

1. **Source of Truth** — Always consult documented sources before making changes
2. **Hierarchy** — Follow the documentation hierarchy (most specific level first)
3. **No Invention** — Never invent messaging, copy, or positioning
4. **Consistency** — Maintain consistency with existing code patterns and brand guidelines
5. **Transparency** — Document what was implemented and why
6. **Validation** — Test changes before committing

---

## Questions or Issues?

- **For SEO/Marketing questions:** See `.dev/docs/prds/index.md`
- **For technical implementation questions:** See `.dev/docs/prds/seo-optimization.md`
- **For general development guidelines:** See `CLAUDE.md` or `AGENTS.md`

---

**Last Updated:** July 14, 2026  
**Owner:** Development Team  
**Related:** WRK-21 (SEO Optimization), all future SEO work
