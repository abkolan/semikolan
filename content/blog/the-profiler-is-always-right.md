---
title: "The Profiler Is Always Right"
description: "Every time I've argued with a profiler, I've been wrong. A short catalogue of my defeats."
date: 2026-04-03
tags: ["performance", "debugging"]
---

I keep a mental list of times I was certain I knew where the time was going, ran a profiler to confirm it, and got humbled. The list is long. The profiler's record against me is perfect.

## The bottleneck was never where I looked

I'd stare at the gnarly nested loop, the obvious `O(n²)`, and optimize it for an afternoon. The profiler would then point, flatly, at a `json.Marshal` call in the logging path that ran on every request. The scary algorithm ran twice a day. The boring serialization ran a million times an hour.

Intuition is trained on _what looks expensive_. Profilers measure _what is expensive_. Those two agree far less often than my ego would like.

## How I argue with it now

I don't. I've adopted a rule: no performance change ships without a before-and-after from the same tool, on the same input. Not because I don't trust myself — because I've watched myself be wrong too many times to pretend otherwise.

The corollary is uncomfortable but freeing: most of my code is fast enough, and the profiler will tell me exactly which small part isn't. I just have to stop guessing and go look.
