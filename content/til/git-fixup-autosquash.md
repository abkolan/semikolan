---
title: "git commit --fixup and autosquash"
description: "Amend an older commit in a branch without an interactive rebase dance."
date: 2026-07-02
tags: ["git"]
---

When review feedback belongs in a commit three back, you don't have to hand-edit a rebase todo. Mark the fix, then let Git sort it:

```sh
git commit --fixup=<sha>          # stages a "fixup! <subject>" commit
git rebase -i --autosquash main   # reorders and squashes it automatically
```

`--fixup` writes a specially-named commit; `--autosquash` recognizes the name, moves it next to its target, and pre-marks it as `fixup` in the todo list. You just confirm. Set `git config --global rebase.autosquash true` and the flag is on by default.
