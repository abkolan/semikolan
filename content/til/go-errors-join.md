---
title: "Go's errors.Join"
description: "You can wrap multiple errors into one since 1.20 — great for validation that collects everything."
date: 2026-06-27
tags: ["go", "errors"]
---

Before Go 1.20, returning "here is everything that's wrong" meant building your own error slice type. Now the standard library does it:

```go
func validate(u User) error {
    var errs error
    if u.Name == "" {
        errs = errors.Join(errs, errors.New("name is required"))
    }
    if u.Age < 0 {
        errs = errors.Join(errs, errors.New("age must be non-negative"))
    }
    return errs // nil if nothing was joined
}
```

`errors.Join` ignores `nil` arguments, so the accumulate-in-a-loop pattern just works. And `errors.Is` / `errors.As` still see through the joined result to each underlying error.
