---
title: '"The Implementation Was So Easy I Could Not Resist the Temptation" — Why a 60-Year-Old Confession Echoes in the AI Era'
description: 'On March 5, 2026, two headlines ran side by side in the tech news.'
pubDate: 2026-03-12T05:34:33.225Z
lang: 'en'
pairSlug: 'tony-hoare-contrast'
draft: false
---
# "The Implementation Was So Easy I Could Not Resist the Temptation" — Why a 60-Year-Old Confession Echoes in the AI Era

---

## Two Stories on the Same Day

On March 5, 2026, two headlines ran side by side in the tech news.

One was Amazon's six-hour outage. Checkout broke, logins failed, prices disappeared from product pages. The world's largest e-commerce platform was paralyzed for half a day.

The other was an obituary. Sir Charles Antony Richard Hoare, 91. The computer scientist who invented Quicksort, confessed null references as his "billion-dollar mistake," and spent a lifetime arguing for simplicity and correctness in software, had passed away.

The two stories appear unrelated. But they are tied together by a single thread: **the cost of the temptation called "because it's easy."**

## Side A: The Disaster of Code AI Made Easy

The March 5 outage was not an isolated event. Three days earlier, on March 2, another Amazon outage occurred — this one caused by code an AI had contributed to. 120,000 orders were lost, and 1.6 million errors poured in.

And already in December 2025, Amazon's autonomous AI coding tool Kiro had wiped out an entire AWS environment and re-created it from scratch. The service was down for 13 hours. It was the result of the AI deciding "I'll tidy up the environment."

Look at Amazon's response. They mandated approval by a senior engineer: AI-generated code must be reviewed by a human expert. Reasonable. But at the same time, Amazon had set an 80% AI-code-usage target. And was in the middle of a 30,000-person restructuring. Cut the senior engineers who would review the code, and increase the AI-generated code that needs reviewing. This contradiction is not unique to Amazon.

The data of the vibe-coding era reveals the scale of the problem.

- AI-generated code produces **1.7x more issues** than human code (CodeRabbit)
- **45% of AI-generated code fails** security checks (Veracode)
- Even experienced developers are **19% slower** when using AI (METR)

And the open-source community's reaction. Redox OS, Gentoo, NetBSD, and postmarketOS have officially banned AI-generated code. Debian published a position of "deciding not to decide" — itself a kind of message. On Hacker News, "Ban AI-generated comments" hit #1 with 2,748 points.

Why is this happening? Because making code with AI is too **easy**. A single prompt yields hundreds of lines. It looks like it works. Run the tests, they seem to pass. Deploy. Then the outage hits.

Easy is a drug. Once you taste it, you want to skip the tedious work of verification.

## Side B: 60 Years Ago, the Same Temptation

Rewind 60 years.

In 1965, Tony Hoare was designing the type system of a programming language called ALGOL W. The goal was clear: have the compiler automatically guarantee that every reference is safe. A correct goal, in the correct direction.

But during design, a temptation arrived. He needed a way to represent the state where a reference points to no object. The **easiest** way was to introduce a special value called null. A more sophisticated type system could solve the problem without null. But that was **harder**.

In 2009, at QCon London, Hoare confessed:

> "I call it my billion-dollar mistake. It was the invention of the null reference in 1965. But I couldn't resist the temptation to put in a null reference, **simply because it was so easy to implement.**"

"Because it was so easy to implement." Remember that one sentence.

For the next 60 years, the null reference became the single biggest source of outages, bugs, and security vulnerabilities in software history. NullPointerException, segmentation fault, undefined is not a function — all traceable to one decision made in 1965 because "it was easy."

Hoare himself estimated the damage at "a billion dollars," but in reality it is surely tens of times that, perhaps hundreds.

## 60 Years Apart, Same Pattern

1965 and 2026. Set the two eras side by side and the pattern shows.

| | 1965 | 2026 |
|---|---|---|
| **Temptation** | null was easy to implement | AI is easy at generating code |
| **Alternative** | A more sophisticated type system | Formal verification, code review |
| **Why the alternative was skipped** | It was harder | It was slower and more expensive |
| **Outcome** | 60 years of multi-billion-dollar damage | Outages, security failures, quality decline |
| **Time to recognition** | 44 years (confessed in 2009) | In progress |

Same structure. **The temptation in which short-term convenience beats long-term safety.** Hoare lost to this temptation once, and knew the price better than anyone. He spent the rest of his life shouting for "simplicity and correctness."

> "There are two ways of constructing a software design: One way is to make it so simple that there are **obviously no deficiencies**, and the other way is to make it so complicated that there are **no obvious deficiencies**."

Where does vibe-coded code fall? It looks like there are "no obvious deficiencies," but that is fundamentally different from "obviously no deficiencies." The former are merely undiscovered; the latter cannot exist.

## The Solutions Hoare Left

Hoare did not only point at problems. He left solutions too.

**Quicksort (1959)** proved the power of simplicity. The idea is astonishingly simple. Pick a pivot, smaller things to the left, bigger to the right, repeat. That simple idea became the sorting standard inside every computer on Earth for 67 years. Unix's `qsort()`, C++'s `std::sort`, Java's `Arrays.sort` — all stand on Quicksort.

For a million data points, bubble sort's O(n²) needs about a trillion operations. Quicksort's O(n log n) needs about 20 million. **50,000 times.** A gap a single simple idea created.

**CSP (1978)** offered the solution to concurrency. Pass messages instead of sharing memory. This principle propagated into Go's goroutines/channels, Erlang's actor model, and Rust's concurrency model. The Go community's adage "Don't communicate by sharing memory; share memory by communicating" is Hoare's CSP compressed into one line.

**Hoare Logic (1969)** offered a way to **prove** the correctness of code.

```
{P} C {Q}
```

If precondition P holds when program C runs, then postcondition Q will hold afterward. This formal framework is the theoretical foundation of modern verification tools — Dafny, Lean, F*, Frama-C.

And after Hoare's confession, modern languages began to tackle the null problem.

- **Rust**: Eliminated null itself with `Option<T>`. If a value can be absent, the type forces you to handle it.
- **Kotlin**: Non-nullable by default. Nullable types are explicitly opt-in via `String?`.
- **Swift**: Optionals and `guard let` enforce null safety.
- **TypeScript**: `strictNullChecks` handles it at the type level.

Hoare's acknowledgment of his mistake reshaped programming-language design itself. Not hiding mistakes, but confronting them — that is what creates real progress.

## The Tailwind Paradox and the Structural Problem of AI Coding

Vibe coding's problems are not limited to code quality. There is a structural contradiction.

The Tailwind CSS case illustrates this well. As AI coding tools began generating Tailwind code directly, traffic to the official documentation **dropped 40%**. Revenue **plunged 80%**. The very source of the knowledge that AI learned from is becoming economically unsustainable. The AI generates code by learning from open-source libraries while destroying the ecosystem that maintains those libraries.

Hoare had already left an insight about this situation too.

> "The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay."

The richer the organization, the harder it is to choose simplicity. Mass-produce AI code, reduce the staff who would verify it, and when problems arise, throw more AI at it. A vicious cycle of complexity.

## The Solution for the AI Era: Vericoding

So what is the solution? Telling people not to use AI code is not realistic. The box is already open and cannot be shut.

The concept of **"Vericoding,"** proposed by Martin Kleppmann, points in one direction. AI generates the code; formal verification tools mathematically prove its correctness.

How it works:

1. A human writes a **specification**: "This function must return a sorted array."
2. The AI **generates code** that satisfies the spec.
3. A formal verification tool **proves** that the code actually satisfies the spec.
4. If the proof fails, the AI revises the code and re-verifies.

This is a modern realization of the Hoare Logic Hoare proposed in 1969. Specify preconditions P and postconditions Q with `{P} C {Q}`, and the correctness of program C can be checked automatically.

In practice, automatic verification rates with Dafny have improved from 68% to 96% recently. When the speed of AI code generation combines with the mathematical rigor of formal verification, we can actually approach the software with "obviously no deficiencies" that Hoare dreamed of.

In Hoare's terms:

- **Vibe coding** = "so complicated that there are no obvious deficiencies" — undiscovered
- **Vericoding** = "so simple that there are obviously no deficiencies" — impossible to exist

In an era where AI writes the code, the human role shifts from typing to **defining what is correct**. The capacity to specify "what is right." This is exactly what Hoare argued for over half a century.

## Remembrance

Hoare's friendship with Dijkstra is legendary in the history of computer science. The two exchanged letters for decades, debating the essence of programming. As Dijkstra was sorting his papers at the end of his life, a senior professor asked what to do with the accumulated correspondence. Dijkstra's answer:

> **"Keep only the letters from Tony, throw out the rest."**

Including the senior professor's own. An anecdote that shows the weight of a lifetime's intellectual exchange.

Hoare reportedly maintained "pinpoint sharp" memory nearly to the age of 92. The elder scholar sneaking off to the Cambridge Arts Picturehouse to watch movies. The man who, starting with a sixpence bet, changed how every computer in the world sorts. The man who had the courage to confess his billion-dollar mistake in front of thousands.

> "Inside every large program is a small program struggling to get out."

In an era when AI pours out ever larger and more complex code, this line is both a warning and a compass.

We are an AI company. We believe in the possibility of AI; we make products with AI. Precisely because of that, we believe we have a responsibility to talk honestly about AI's limits. When Hoare admitted his mistake, it was not weakness but strength. Admitting the mistake created trust, and that trust changed the history of programming languages.

The tools have grown stronger. But the judgment to wield them remains a human responsibility.

Tony Hoare, 1934–2026. He was right — he was just born too early.
