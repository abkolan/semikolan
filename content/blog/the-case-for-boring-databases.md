---
title: "The Case for Boring Databases"
description: "Why my default is still Postgres, and the specific moments that justify anything else."
date: 2025-09-14
tags: ["databases", "postgres"]
---

My default database is Postgres, and my second choice is also Postgres. This isn't nostalgia. It's that "boring" is a technical property, and it's one I want more of as a system gets important.

## What boring buys you

A boring database is one whose failure modes are already written down — in blog posts, in Stack Overflow answers, in the scar tissue of every engineer you'll ever hire. When it's 3am and something is wrong, you are not the first person to see this error. That is worth more than almost any feature.

Postgres also quietly absorbs the jobs people reach for other tools to do:

- JSON columns handle the document-store itch until you genuinely outgrow it.
- `LISTEN`/`NOTIFY` covers a surprising amount of "we need a queue."
- Full-text search is good enough to postpone standing up a search cluster for a long time.

Every one of those is one fewer moving part to operate at 3am.

## When to reach for something else

There are real reasons to leave, and they're specific — not vibes:

- A genuine write throughput ceiling you've _measured_, not imagined.
- An access pattern that fights the relational model on every query.
- A scale where the operational cost of sharding Postgres exceeds the cost of a system built for distribution.

If you can't name which of these you're hitting, you're not hitting one. Stay boring a while longer.
