---
title: "Pretty-print JSON in one shell pipe"
description: "curl -s url | python -m json.tool — no jq required for a quick look."
date: 2026-07-18
tags: ["shell", "json"]
---

When you just want to _read_ an API response and don't feel like installing anything:

```bash {term=true}
curl -s https://api.example.com/thing | python -m json.tool
```

`python -m json.tool` ships with every Python install and pretty-prints stdin. No `jq`, no dependencies. Here's the whole thing, command and output:

```console {term=true}
$ echo '{"name":"ada","langs":["go","rust"]}' | python -m json.tool
{
    "name": "ada",
    "langs": [
        "go",
        "rust"
    ]
}
```

For anything more than eyeballing — filtering, reshaping — reach for `jq`. For a quick look, this is already on your machine.
