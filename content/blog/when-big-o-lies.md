---
title: "When Big-O Lies"
description: "Asymptotic complexity is a promise about behavior at infinity. Most of my code never runs there — it runs at n = 4,000 on a Tuesday, and the constants I dropped are the whole story."
date: 2026-07-20
tags: ["performance", "go", "measurement"]
---

There's a particular kind of confidence that comes from writing `O(n log n)` in a design doc. It feels like a proof. And it is one — about a limit you will, in practice, never reach.[^1] The trouble starts when we treat the asymptote as advice for the machine in front of us.

Last week I replaced a "slow" quadratic scan with a "fast" sort-then-sweep. The theory was unimpeachable. The result was _slower_ — for every realistic input we actually saw.

## The measurement

Here's the inner loop I started with. The two highlighted lines are the base case — the part I assumed didn't matter, and the part the profiler kept pointing at.

```go {file="fib.go" hl_lines="4-5"}
func Fibonacci(n int) []int {
    seq := make([]int, n)
    for i := range seq {
        if i < 2 {
            seq[i] = i // base case
            continue
        }
        seq[i] = seq[i-1] + seq[i-2]
    }
    return seq
}
```

Runtime is not one number, it's a curve with a shape. A more honest model keeps the constants that `O`-notation throws away:

<math display="block" alttext="T(n) = c1 n log n + c2 n + c3" xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>T</mi><mo form="prefix" stretchy="false">(</mo><mi>n</mi><mo form="postfix" stretchy="false">)</mo>
    <mo>=</mo>
    <msub><mi>c</mi><mn>1</mn></msub><mo>&#8290;</mo><mi>n</mi><mo>&#8290;</mo><mi>log</mi><mo>&#8289;</mo><mi>n</mi>
    <mo>+</mo>
    <msub><mi>c</mi><mn>2</mn></msub><mo>&#8290;</mo><mi>n</mi>
    <mo>+</mo>
    <msub><mi>c</mi><mn>3</mn></msub>
  </mrow>
</math>

When <math alttext="c sub 1" xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>c</mi><mn>1</mn></msub></math> hides a cache miss and <math alttext="c sub 2" xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>c</mi><mn>2</mn></msub></math> is a tight, predictable stride, the linear term wins for every <math alttext="n less than ten to the sixth" xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi><mo>&lt;</mo><msup><mn>10</mn><mn>6</mn></msup></math> you'll ever feed it.

## A cost model, not a verdict

> Premature optimization is the root of all evil — but so is treating a limit theorem as a benchmark.

So now I hold two numbers in my head before I reach for a cleverer algorithm:

- The **asymptotic class** — does this fall off a cliff as inputs grow?
- The **constant** — what does it actually cost at the size I ship?

### The rule I settled on

Measure first, at the real input size, on the real hardware. Let the asymptote decide only when the two curves actually cross — and then [write down where they crossed](#), because the next person (usually me) will want the number, not the theorem.

[^1]: The whole trick of asymptotic analysis is to let _n_ run to infinity so the low-order terms vanish — useful for theory, a liability when your real _n_ is small and fixed.
