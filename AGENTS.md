# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **pure [Hugo](https://gohugo.io/) static site** with a first-party
theme. There is **no `themes/` directory, no npm/Node setup, and no lint step** —
the `CLAUDE.md` "Linting (run from `themes/zen/`)" section is stale and does not
apply to the current layout (layouts live in `layouts/`, styles in
`assets/css/main.css`). Ignore it.

### Services

Single service: the Hugo site. The only build dependency is the `hugo` binary
(non-extended is fine). The startup update script installs a pinned Hugo
(`0.164.0`, matching the README) to `/usr/local/bin/hugo`.

Standard commands are already documented in `README.md`:

- Dev server (live reload): `hugo server` → http://localhost:1313/
- Include drafts: `hugo server -D`
- Production build: `hugo --minify` → outputs to `./public`

Bind for external access when needed: `hugo server --bind 0.0.0.0 --port 1313`.

### Notes / gotchas

- No automated test suite exists. "Verification" = a clean `hugo --minify`
  build succeeding plus spot-checking pages on the dev server.
- Content with `draft: true` (the archetype default) is hidden unless you run
  `hugo server -D`. Set `draft = false` in front matter to see a new post on a
  plain `hugo server`.
- After adding a new content file, the live server serves the new page
  immediately, but list pages (e.g. `/blog/`) and the search index
  (`/index.json`) can lag by a moment; they refresh on the next rebuild. A full
  `hugo --minify` build always includes everything.
- Site outputs HTML + RSS (`/index.xml`) + a JSON search index (`/index.json`)
  consumed by the dependency-free client search at `/search/`.
