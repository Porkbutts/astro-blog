# CLAUDE.md

## Project Overview

This is Adrian Teng-Amnuay's personal blog and portfolio site. It covers applied AI automation, agentic systems, workflow automation, developer tooling, and production AI infrastructure.

Built with Astro 5, Tailwind CSS 4, and TypeScript. Deployed to GitHub Pages at `https://porkbutts.github.io/`.

## Tech Stack

- **Framework**: Astro 5 (content collections, markdown with remark plugins)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite`
- **Search**: Pagefind (built post-build, served from `public/pagefind`)
- **OG Images**: Dynamic generation via Satori + resvg-js + Sharp
- **Code Highlighting**: Shiki (themes: min-light / night-owl)
- **Fonts**: Google Sans Code (experimental Astro font provider)

## Project Structure

- `src/config.ts` — Site-wide config (author, title, description, feature flags)
- `src/content.config.ts` — Astro content collection schema for blog posts
- `src/data/blog/` — Blog post markdown files
- `src/pages/` — Astro pages (including `about.md`)
- `src/layouts/` — Astro layout components
- `src/components/` — Reusable Astro/UI components
- `src/styles/` — Global styles
- `src/utils/` — Utility functions and transformers

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Type-check, build, and generate search index
- `npm run preview` — Preview production build
- `npm run format` — Format with Prettier
- `npm run lint` — Lint with ESLint

## Content Consistency

Before writing or updating any blog post, review `src/pages/about.md` to ensure the post aligns with the site's stated vision, positioning, and goals. Specifically:

- The post should reinforce Adrian's positioning as a builder of production-grade agentic AI systems, not a commentator or tutorial writer.
- Content should match the site's stated purpose: build logs, architectural breakdowns, design patterns, and honest assessments of what works and what doesn't.
- The post should serve the target audience described in the about page: founders, engineers, product builders, and operators who need AI automation built well.
- Avoid content that contradicts or dilutes the about page's framing (e.g., beginner tutorials, hype pieces, purely theoretical posts with no build context).

## Blog Post Format

Blog posts live in `src/data/blog/` as `.md` files. Frontmatter schema:

```yaml
author: Adrian Teng-Amnuay        # defaults to site author
pubDatetime: 2026-02-21T12:00:00Z # required
title: "Post Title"                # required
slug: post-slug                    # optional, derived from filename
featured: false                    # optional
draft: false                       # optional
tags:                              # defaults to ["others"]
  - tag-name
description: "Short description"   # required
```

## Transcript Anonymization

Blog posts frequently include Claude conversation transcripts to demonstrate agentic workflows. Before incorporating any transcript into a post, anonymize it:

- Replace real company names, client names, and employer names with generic placeholders (e.g., "Acme Corp", "the client", "a fintech startup").
- Remove or replace internal project names, repo names, and infrastructure identifiers that could identify a specific organization.
- Strip API keys, tokens, secrets, internal URLs, and IP addresses.
- Replace real people's names (other than Adrian's) with generic references ("a colleague", "the team lead").
- Preserve the technical substance. The goal is to protect privacy without losing the engineering detail that makes the transcript useful.

When Adrian provides a transcript, apply these rules automatically before drafting the post. Flag anything ambiguous and ask before publishing.

---

## Adrian's Identity and Positioning

Senior software engineer with 10+ years in production infrastructure, cloud systems, and security. Now focused on AI automation full-time.

Background includes service mesh architectures across hundreds of Kubernetes clusters, zero-trust auth systems, container orchestration platforms at scale, and AI-powered developer tools. The common thread is taking complex operational problems and building systems that handle them reliably.

Current focus areas: agentic systems, workflow automation, developer tooling, and the infrastructure to run AI workloads in production.

Positioning: AI is operational infrastructure, not a prompting exercise. The interesting engineering is orchestration, failure handling, state management, and integration. This site demonstrates that perspective through real build logs, architectural decisions, and implementation details.

Target audience: technical founders, engineers adopting AI, product builders, and SMB operators looking for automation. Not aimed at beginners.

Goals for the site: demonstrate applied AI expertise through real systems, attract consulting and collaboration opportunities, showcase experimentation velocity, and establish systems-level credibility.

---

## Writing Voice

All content on this site should be written in Adrian's voice. Follow these rules strictly when writing blog posts, page copy, or any other prose.

### Core Tone

Write like a technical builder explaining something practical to another capable builder. Grounded, precise, slightly informal. Never casual or hype-driven. It should feel like the writer has built the system themselves and is explaining what actually matters.

Competent. Calm. Direct. Practical.

### Priorities

- Clarity over polish
- Substance over inspiration
- Reasoning over persuasion
- Practicality over completeness

Sound like an experienced engineer thinking out loud while explaining something useful. Not a marketer, teacher, or cheerleader.

### Sentence Style

- Clear, direct sentences at moderate length
- Natural flow, not rigid structure
- Sounds spoken but controlled
- Precision over flourish

Do not use:
- Em dashes
- Overly punchy micro-sentences
- Academic density
- Motivational phrasing ("let's dive in", "exciting times", etc.)
- Exaggerated confidence

### Structure

Favor natural progression: context, then reasoning, then conclusion. Use headers and lists only when they genuinely improve clarity, not for decoration. Do not over-organize.

### Language

Use concrete, technical language. Specific observations, practical implications, tradeoffs, constraints, real usage.

Do not use:
- Buzzwords without explanation
- Grand claims
- Vague abstraction
- Filler transitions ("in today's fast-moving landscape", "as we all know", etc.)

### Reader Assumptions

Assume the reader is intelligent and capable. Do not over-explain fundamentals or simplify to the point of distortion. Do not perform expertise. Just demonstrate it through clarity.

It is fine to qualify statements, mention uncertainty, describe limitations, or explain why something may not matter.

### What the Writing Should Feel Like

Grounded in experience. Technically credible. Quietly confident. Efficient with words. Focused on usefulness. The reader should feel like they are learning from someone who builds real systems, not someone describing them from a distance.
