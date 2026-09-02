# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website (`semikolan.dev`) built with [Hugo](https://gohugo.io/) using a small, hand-built **first-party theme** — there is no external theme dependency. Layouts live in `layouts/` and styles in a single-file design system at `assets/css/main.css`. Hugo version 0.146.0+ is required (extended version not needed; built and verified on 0.164.0). See `README.md` for a fuller tour of the theme, Markdown features, and deployment.

## Common Commands

```bash
# Start local dev server with live reload → http://localhost:1313
hugo server

# Include drafts
hugo server -D

# Production build into ./public
hugo --minify
```

## Architecture

- **`hugo.toml`** — site configuration (baseURL, title, params, menus, outputs, taxonomies, markup)
- **`content/`** — Markdown content files; section structure maps to URL paths (`blog/`, `til/`, `projects/`, `about/`, plus standalone pages)
- **`layouts/`** — first-party theme templates (`baseof.html`, `index.html`, `single.html`, `list.html`)
  - `layouts/_default/_markup/` — render hooks (code blocks, tables, headings)
  - `layouts/partials/` — shared partials
  - `layouts/shortcodes/` — shortcodes (e.g. `callout.html`)
- **`assets/`** — CSS/JS processed by Hugo Pipes
  - `assets/css/main.css` — the entire design system as CSS custom properties (`--paper`, `--ink`, `--clay`, `--serif`, `--mono`, …); light / dark / system themes
  - `assets/js/search.js` — dependency-free client-side search
- **`static/`** — files copied as-is to the output (favicons, social image, manifest, robots.txt)
- **`archetypes/`** — front-matter templates for new content

Since the theme is first-party, edit `layouts/` and `assets/css/main.css` directly — there is no separate theme directory to override.

### Outputs

The site outputs HTML, RSS, and JSON (used for the client-side search index). The relevant `outputs` config lives in `hugo.toml`.

## Cloud environment setup

For Cursor Cloud / remote-agent-specific setup notes (environment provisioning, Hugo install, etc.), see `AGENTS.md`.
