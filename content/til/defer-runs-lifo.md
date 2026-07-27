---
title: "Go's defer runs in LIFO order"
description: "Stacked defers unwind last-in-first-out — which is exactly what you want for paired setup and teardown."
date: 2026-06-18
tags: ["go"]
---

Multiple `defer` statements in a function run in reverse order — the last one deferred runs first:

```go
func process() {
    f := open()
    defer f.Close()      // runs second

    tx := f.Begin()
    defer tx.Rollback()  // runs first
    // ...
}
```

This is the right default: teardown happens in the reverse of setup, so inner resources release before the outer ones they depend on. It mirrors how a stack unwinds — which is the whole point.
