---
title: "git switch beats git checkout"
description: "git switch -c branch says what it does; checkout is four tools in a trenchcoat."
date: 2026-07-09
tags: ["git"]
---

`git checkout` does too much: it moves branches, restores files, detaches HEAD, and creates branches — all under one overloaded verb. That's why it's a classic source of "I ran the right command and lost my changes."

Since Git 2.23 the job is split into two honest commands:

```sh
git switch -c new-feature   # create and move to a branch
git switch main             # move to an existing branch
git restore path/to/file    # discard changes to a file
```

`switch` only changes branches. `restore` only touches files. The name tells you the blast radius before you hit enter.
