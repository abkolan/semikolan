---
title: "The Quiet Cost of a Fast Loop"
description: "What branch prediction taught me about writing boring, predictable code on purpose."
date: 2026-06-30
tags: ["performance", "cpu"]
---

The first time I saw a sorted array process faster than an identical unsorted one, I assumed I'd measured wrong. Same data, same instructions, same count. The only difference was order — and order, I'd been taught, doesn't change complexity.

It doesn't. It changes the _constant_, and the constant is a physical thing living in the branch predictor.

## The branch that couldn't guess

A modern CPU runs ahead of itself. When it hits an `if`, it doesn't wait to learn the answer — it bets, and speculatively executes the branch it thinks you'll take. Guess right and the work is already done. Guess wrong and it throws away a dozen in-flight instructions and starts over.

On sorted data the condition `if x > threshold` is a long run of _true_, then a long run of _false_. The predictor learns that in a heartbeat. On shuffled data it's a coin flip, and the predictor is wrong roughly half the time. Same loop; a mispredict tax on every iteration.

## Boring on purpose

The lesson I keep relearning is that predictable code is fast code — often faster than clever code. Sort the data if you're going to branch on it. Prefer a branchless `min`/`max` in a hot loop. Lay your structs out so the field you touch every iteration sits in the same cache line as the one next to it.

None of this shows up in a complexity analysis. All of it shows up in a flame graph.
