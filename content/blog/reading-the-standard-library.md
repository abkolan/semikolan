---
title: "Reading the Standard Library for Fun"
description: "A slow walk through sort.Slice, and why the obvious implementation isn't the one they shipped."
date: 2026-06-11
tags: ["go", "reading-code"]
---

The standard library is the best-reviewed code most of us will ever have free access to, and almost nobody reads it. I've started treating it like a museum you're allowed to touch — pick one function, follow it all the way down, and notice every decision that isn't the obvious one.

## sort.Slice is not quicksort

If you'd asked me to implement `sort.Slice`, I'd have written quicksort and moved on. Go's implementation is a _pattern-defeating_ quicksort — `pdqsort` — and the difference is a catalogue of the ways plain quicksort betrays you in production.

- It detects already-sorted and reverse-sorted runs and bails to a linear pass.
- It switches to insertion sort under a small threshold, where the constants favor simplicity.
- It falls back to heapsort when recursion goes too deep, killing quicksort's `O(n²)` worst case dead.

Every one of those branches exists because someone hit the pathological input in the wild.

## Why bother

Reading shipped code rewires your taste. You stop asking "what's the algorithm?" and start asking "what inputs did they refuse to be surprised by?" That question has made me a better engineer than any algorithms course did.
