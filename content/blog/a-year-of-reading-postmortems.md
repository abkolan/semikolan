---
title: "A Year of Reading Postmortems"
description: "Patterns in how large systems actually fail, drawn from a year of public incident writeups."
date: 2025-12-02
tags: ["reliability", "systems"]
---

I spent last year reading one public postmortem a week — outages from companies large enough to be forced into candor. I expected exotic failures. What I found was the same three or four stories wearing different logos.

## The retry that became the outage

The single most common shape: a small failure triggers automatic retries, the retries multiply the load, and the load turns a blip into a self-sustaining fire. The system's own recovery mechanism is the accelerant.

The fix is almost always the same words — exponential backoff, jitter, a circuit breaker — and it's almost never in place before the incident that teaches it.

## Nobody was watching the thing that broke

The second story: the failure was in a dependency two hops away from any dashboard. Metrics existed for the service and for the database, but not for the queue between them, and that queue is exactly where the pressure built.

You monitor what you've already been burned by. The next outage is, by definition, in the place you haven't.

## The postmortem is the product

The best writeups don't just explain what happened. They change a default, add an alert, or delete a foot-gun — and they say so, specifically. A postmortem that ends in "we'll be more careful" hasn't ended. It's just paused until next time.
