# AGENTS.md

Setup notes for remote coding agents (Cursor Cloud, and other cloud/CI agent
environments) working on this repository. For an overview of the site itself,
see `README.md`; for Claude Code guidance, see `CLAUDE.md`.

## What this repo is

A [Hugo](https://gohugo.io/) static site with a hand-built first-party theme —
no external theme dependency, no submodules. Content lives in `content/`,
templates in `layouts/`, and the design system in `assets/css/main.css`.

## Environment provisioning

Fresh cloud environments usually don't ship with Hugo. Install it before
building or serving.

```bash
# Linux (x86_64) — pin to a known-good version
HUGO_VERSION=0.164.0
curl -sSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz" \
  | tar -xz -C /usr/local/bin hugo
hugo version
```

The **extended** edition is **not** required (no SCSS/Sass or WebP asset
processing in this project). Any Hugo `0.146.0+` works; `0.164.0` is what
production builds against.

### Full clone required

`hugo.toml` sets `enableGitInfo = true`, so templates read git metadata (e.g.
last-modified dates). Shallow clones can produce missing or wrong `.Lastmod`
values — make sure the agent environment does a full clone (or run
`git fetch --unshallow` if it started shallow).

## Common commands

```bash
hugo server        # dev server with live reload → http://localhost:1313
hugo server -D     # include drafts
hugo --minify      # production build into ./public
```

There is no separate Node/npm build step and no test suite — the "build" is
simply `hugo`. A non-zero exit or any `ERROR`/`WARN` line in the output means
the change broke templating or content.

## Notes for agents

- **Edit the theme in place.** It's first-party — change `layouts/` and
  `assets/css/main.css` directly. There is no `themes/` directory to override.
- `public/` and `resources/` are build artifacts (git-ignored). Never commit
  them.
- New content should follow the front-matter shape in `archetypes/` and the
  examples in `README.md`.
