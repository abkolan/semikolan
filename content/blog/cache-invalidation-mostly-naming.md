---
title: "Cache Invalidation, Mostly Naming"
description: "The two hard problems collapse into one: if you can't name what a cache entry represents, you can't know when it's stale."
date: 2026-05-12
tags: ["systems", "caching"]
---

The joke is that there are two hard problems in computer science: cache invalidation and naming things. I've come to think they're the same problem wearing two hats.

## What a key really is

A cache key is a name for a claim: "the answer to _this question_ is _that value_." Invalidation is just noticing the claim stopped being true. The reason invalidation is hard is almost never the eviction mechanics — it's that the key doesn't actually name the claim.

When a key is `user:42`, what does it promise? The user's profile? Their permissions? Their last-seen timestamp? If three different code paths write to that key meaning three different things, no invalidation strategy will save you. You didn't have a caching bug. You had a naming bug that cached.

## The fix is boring

Name the claim precisely and the invalidation falls out:

- `user:42:profile:v3` invalidates when the profile changes, and the `v3` lets you roll the whole namespace when the shape changes.
- Derived data keys its version off its inputs, so a stale input can't produce a fresh-looking output.

If you can state, in one sentence, exactly what a key promises and what events break that promise, invalidation stops being scary. If you can't state it, no TTL will hide that you don't know what you cached.
