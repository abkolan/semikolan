---
title: "The Markdown reference"
description: "Everything the theme knows how to render — headings, inline marks, lists, tables, callouts, math, diagrams, footnotes — shown in context so the type and spacing can be judged together."
date: 2026-07-22
---

<p class="grouplabel">Headings</p>
<p style="font-family:var(--serif); font-size:var(--fs-h2); font-weight:600; margin:0.4rem 0 0.2rem;">H1 · Heading one</p>
<p style="font-family:var(--serif); font-size:var(--fs-h2); font-weight:600; margin:1rem 0 0.2rem;">H2 · Heading two</p>
<p style="font-family:var(--serif); font-size:var(--fs-h3); font-weight:600; margin:0.9rem 0 0.2rem;">H3 · Heading three</p>
<p style="font-family:var(--serif); font-size:var(--fs-h4); font-weight:600; margin:0.9rem 0 0.2rem;">H4 · Heading four</p>
<p style="font-family:var(--sans); font-size:var(--fs-xs); font-weight:600; text-transform:uppercase; letter-spacing:0.07em; color:var(--ink-soft); margin:0.9rem 0 0.2rem;">H5 · Heading five</p>
<p style="font-family:var(--sans); font-size:var(--fs-2xs); font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:var(--muted); margin:0.8rem 0 0.2rem;">H6 · Heading six</p>

<p class="grouplabel">Inline formatting</p>
<p>Text can be <strong>bold</strong>, <em>italic</em>, <strong><em>bold italic</em></strong>, <del>struck through</del>, or <ins>inserted</ins>. You can <mark>highlight a phrase</mark> to draw the eye, drop in <code>inline code</code>, and link to <a href="#">another post</a>.</p>
<p>Scientific bits read cleanly too: H<sub>2</sub>O, the area <em>πr</em><sup>2</sup>, the <abbr title="HyperText Markup Language">HTML</abbr> spec, and keyboard shortcuts like <kbd>⌘</kbd> <kbd>K</kbd> to open search or <kbd>Esc</kbd> to close it.</p>

<p class="grouplabel">Lists</p>
<h5>Unordered, with nesting</h5>
<ul>
  <li>A first idea worth its own line</li>
  <li>A second idea
    <ul>
      <li>with a supporting detail</li>
      <li>and one more beneath it</li>
    </ul>
  </li>
  <li>A third to close the thought</li>
</ul>
<h5>Ordered, with nesting</h5>
<ol>
  <li>Measure the real workload</li>
  <li>Form a hypothesis
    <ol>
      <li>write down the expected win</li>
      <li>write down how you'll know</li>
    </ol>
  </li>
  <li>Change one thing, measure again</li>
</ol>
<h5>Task list</h5>
<ul class="task">
  <li><input type="checkbox" checked disabled aria-label="done"> Draft the post</li>
  <li><input type="checkbox" checked disabled aria-label="done"> Add the benchmark numbers</li>
  <li><input type="checkbox" disabled aria-label="not done"> Get someone to poke holes in it</li>
</ul>
<h5>Definition list</h5>
<dl>
  <dt>Amortized cost</dt>
  <dd>The average cost per operation across a worst-case sequence, not the worst single operation.</dd>
  <dt>Tail latency</dt>
  <dd>The slow end of the distribution — the p99 your users actually notice.</dd>
</dl>

<p class="grouplabel">Quotes</p>
<blockquote>
  <p>A blockquote for the borrowed thought — set apart, a touch quieter than the body.</p>
  <blockquote>
    <p>And a nested quote inside it, for the reply to the borrowed thought.</p>
  </blockquote>
</blockquote>

<p class="grouplabel">Callouts</p>
<div class="callout note">
  <p class="clabel">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01M11 12h1v4h1"></path></svg>
    Note
  </p>
  <p>Hugo renders GitHub-style alerts natively. Label text stays high-contrast; the type is signalled by the bar and icon color, not by tinting the words.</p>
</div>
<div class="callout tip">
  <p class="clabel">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.5h6c0-1.2.4-1.9 1-2.5A6 6 0 0 0 12 3z"></path></svg>
    Tip
  </p>
  <p>A muted green marks advice — the small semantic hue lives on the icon and bar only.</p>
</div>
<div class="callout warn">
  <p class="clabel">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path><path d="M12 9v4M12 17h.01"></path></svg>
    Warning
  </p>
  <p>Warm amber for the thing that will bite you. Still low-saturation, still at home on the paper.</p>
</div>

<p class="grouplabel">Tables</p>
<div class="table-scroll">
  <table>
    <caption>Runtime by approach and input size.</caption>
    <thead>
      <tr><th scope="col">Approach</th><th scope="col" class="num">n = 1k</th><th scope="col" class="num">n = 1M</th><th scope="col">Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Linear scan</td><td class="num">0.4 ms</td><td class="num">380 ms</td><td>Cache-friendly, tight stride</td></tr>
      <tr><td>Sort + sweep</td><td class="num">1.1 ms</td><td class="num">240 ms</td><td>Wins only past the crossover</td></tr>
      <tr><td>Hash index</td><td class="num">0.9 ms</td><td class="num">190 ms</td><td>Best asymptotically, worst constants</td></tr>
    </tbody>
  </table>
</div>

<p class="grouplabel">Code &amp; syntax</p>
<p>Inline <code>go test -bench=.</code> sits in the run of text. Fenced blocks get syntax colors and optional <mark>line highlighting</mark> — here the highlighted line is the one that allocates:</p>
<figure class="code">
  <figcaption>bench_test.go</figcaption>
  <pre><code><span class="ln"><span class="tok-k">func</span> <span class="tok-f">BenchmarkFib</span>(b <span class="tok-d">*</span>testing.B) {</span><span class="ln">    <span class="tok-k">for</span> i := <span class="tok-n">0</span>; i &lt; b.N; i<span class="tok-d">++</span> {</span><span class="ln hl">        _ = <span class="tok-f">Fibonacci</span>(<span class="tok-n">4000</span>) <span class="tok-c">// allocates a slice</span></span><span class="ln">    }</span><span class="ln">}</span></code></pre>
</figure>

<p class="grouplabel">Terminal</p>
<p>For commands you'd actually run, opt a fenced block into a terminal window — a mac-style frame with traffic lights — by adding <code>{term=true}</code>:</p>

```bash {term=true}
brew install hugo && hugo server
```

<p>Set the language to <code>console</code> to show a command with its output; the prompt and the output are styled apart:</p>

```console {term=true}
$ hugo --gc
Start building sites …
Total in 84 ms
```

<p class="grouplabel">Math</p>
<p>Inline math flows with the sentence — the series <math alttext="sum from k=1 to n of 1 over k squared" xmlns="http://www.w3.org/1998/Math/MathML"><munderover><mo>&#8721;</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><mfrac><mn>1</mn><msup><mi>k</mi><mn>2</mn></msup></mfrac></math> converges — and display math gets its own line:</p>
<math display="block" alttext="sum from k=1 to infinity of 1 over k squared equals pi squared over 6" xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <munderover><mo>&#8721;</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mi>&#8734;</mi></munderover>
    <mfrac><mn>1</mn><msup><mi>k</mi><mn>2</mn></msup></mfrac>
    <mo>=</mo>
    <mfrac><msup><mi>&#960;</mi><mn>2</mn></msup><mn>6</mn></mfrac>
  </mrow>
</math>

<p class="grouplabel">Diagrams</p>
<p>Mermaid diagrams render from a fenced <code>```mermaid</code> block, themed to the warm palette:</p>
<figure>
  <pre class="mermaid">
flowchart LR
  A[Measure real workload] --> B{Hot spot?}
  B -- no --> A
  B -- yes --> C[Form a hypothesis]
  C --> D[Change one thing]
  D --> E[Measure again]
  E --> B
</pre>
  <figcaption style="text-align:center; font-family:var(--serif); font-style:italic; font-size:var(--fs-sm); color:var(--muted); margin-top:0.4rem;">Fig 2 — the optimization loop, as a Mermaid flowchart.</figcaption>
</figure>

<p class="grouplabel">Collapsible</p>
<details>
  <summary>Show the full benchmark output</summary>
  <p>Details/summary collapses long asides — raw logs, proofs, the stuff most readers skip but some want.</p>
  <p style="font-family: var(--mono); font-size: 0.82rem; color: var(--ink-soft); margin-bottom:0.2rem;">BenchmarkFib-8   3084   386118 ns/op   32768 B/op   1 allocs/op</p>
</details>

<p class="grouplabel">Image</p>
<figure class="img">
  <svg class="ph" viewBox="0 0 640 260" role="img" aria-label="Two runtime curves crossing near the middle of the chart">
    <g fill="none" stroke-width="2">
      <line x1="48" y1="212" x2="600" y2="212" stroke="var(--hair)"></line>
      <line x1="48" y1="28" x2="48" y2="212" stroke="var(--hair)"></line>
      <path d="M48 208 C 220 196, 420 150, 600 44" stroke="var(--clay)"></path>
      <path d="M48 120 C 200 118, 420 112, 600 104" stroke="var(--muted)"></path>
      <circle cx="392" cy="132" r="4" fill="var(--clay)" stroke="none"></circle>
    </g>
    <text x="606" y="44" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="end">n log n</text>
    <text x="606" y="120" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="end">linear</text>
  </svg>
  <figcaption>Fig 1 — the two cost curves, and the crossover point that actually matters.</figcaption>
</figure>

<p class="grouplabel">Rule</p>
<p>A horizontal rule marks a hard break in thought:</p>
<hr>
<p>…and the writing picks back up on the other side.</p>

<div class="footnotes">
  <ol>
    <li id="fn1">Footnotes render at the foot of the article, linked both ways. <a href="#" class="backref" aria-label="Back to content">↩</a></li>
  </ol>
</div>
