---
title: 'From a 1959 Sorting Problem in Moscow to a 2026 Amazon Outage — What Tony Hoare Left Behind'
description: 'In 1959, a twenty-six-year-old Englishman named Tony Hoare was at Moscow State University. Working on Russian-English machine translation in Kolmogorov''s lab, he was handed a practical problem: he needed to sort Russian words into dictionary order.'
pubDate: 2026-03-12T05:08:34.168Z
lang: 'en'
pairSlug: 'tony-hoare-timeline'
draft: false
---
# From a 1959 Sorting Problem in Moscow to a 2026 Amazon Outage — What Tony Hoare Left Behind

---

## Moscow, 1959 — A Twenty-Six-Year-Old's Problem

In 1959, a twenty-six-year-old Englishman named Tony Hoare was at Moscow State University. Working on Russian-English machine translation in Kolmogorov's lab, he was handed a practical problem: he needed to sort Russian words into dictionary order.

The known method at the time was bubble sort. Hoare felt it was "obviously rather slow." So he started thinking about another way. The idea was simple. Pick one pivot element, put smaller items to the left and larger ones to the right, then sort each side the same way. Recursively.

This was the birth of Quicksort.

The problem was that the programming languages of the era did not support recursion. The Elliott Brothers' Mercury Autocode that Hoare was using had no concept of recursive calls. Quicksort existed only inside his head. In 1961, once ALGOL 60 supported recursion, it could finally be implemented in code. The idea had to wait two years.

## A Sixpence Bet and the Economics of Algorithms

After Hoare joined Elliott Brothers, an anecdote survives. He told his boss, "I have a faster sorting algorithm than what exists." The boss's response was simple.

> "I bet you sixpence you don't!"

Hoare proved it, and got his sixpence.

Sixpence was a small sum even by the standards of the day. But the economic value Quicksort brought the world is essentially unmeasurable. The numbers say so plainly.

To sort a million data points, bubble sort's O(n²) needs about a trillion operations. Quicksort's O(n log n) needs only about 20 million. A **50,000x** difference. Scale up to a billion items and the gap becomes **33 million times**.

Unix's `qsort()`, C++'s `std::sort`, Java's `Arrays.sort` — all of these stand on Quicksort. For 67 years it has run trillions of times a day on millions of servers worldwide. To put it in human terms, it is as if someone laid down a high-speed rail line between every pair of cities people used to walk between — and did so for every computer at once.

The price was sixpence.

## "Simplicity Is Reliability"

In 1980, Hoare won the Turing Award. The line from his acceptance speech became a classic of software engineering.

> "There are two ways of constructing a software design: One way is to make it so simple that there are **obviously no deficiencies**, and the other way is to make it so complicated that there are **no obvious deficiencies**."

The heart of the sentence lies in the placement of "obviously" and "obvious." The former is a state in which the structure is so simple that the absence of defects is self-evident. The latter is complex but happens to have no defects discovered yet. The difference between them is fundamental. One is proof; the other is hope.

Hoare did not stop there.

> "The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay."

A paradox: the larger the organization running the system, the harder it is to choose simplicity. Budget is plentiful, so complex solutions get picked; as complexity accumulates, more budget gets thrown in. Hoare nailed this pattern 40 years ago.

And another observation:

> "Inside every large program is a small program struggling to get out."

Inside every gigantic program is a small program struggling to escape. Complexity is not essence but accumulation.

## CSP and Hoare Logic — The Legacy in Modern Programming Languages

Hoare's contributions were not limited to Quicksort.

**CSP (Communicating Sequential Processes)** is a concurrent programming model published in 1978. The core idea is simple. Processes communicate by exchanging messages instead of sharing memory. Decades later, this concept became the bedrock of modern programming languages.

Go's goroutines and channels are direct descendants of CSP. The Go community's adage "Don't communicate by sharing memory; share memory by communicating" is, in essence, Hoare's CSP philosophy compressed into a single line. Erlang's actor model, Rust's futures, Clojure's core.async — all are trees grown from seeds Hoare planted.

**Hoare Logic** is a system for proving the correctness of programs mathematically. The "Hoare triple," composed of a precondition, a program, and a postcondition, became the foundation of formal verification.

```
{P} C {Q}
```

"If condition P holds when program C runs, then condition Q holds afterward."

This simple form is the theoretical underpinning of modern verification tools like Dafny, Lean, F*, and Frama-C. The fact that the system Hoare proposed in 1969 has, 57 years later, become more urgently needed than ever in 2026 — we will return to that in the second half.

## "Because the Implementation Was So Easy, I Could Not Resist the Temptation"

One of Hoare's great qualities was the courage to admit his own mistakes.

In 2009, at QCon London, Hoare confessed:

> "I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object-oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, **simply because it was so easy to implement.**"

"Because it was so easy to implement." This single sentence holds the core lesson of software history.

For 60 years, the null reference has been the cause of countless NullPointerExceptions, segfaults, and system outages. Hoare himself put the damage at "a billion dollars," but the actual cost is far higher.

Yet his confession brought change. Modern programming languages learned from Hoare's mistake.

- **Rust**: Eliminated null entirely with `Option<T>`. The type system forces handling of cases where a value may be absent.
- **Kotlin**: Variables are non-nullable by default. Nullable types must be explicitly opted into, like `String?`.
- **Swift**: Optionals, `guard let`, and `if let` guarantee null safety.
- **TypeScript**: The `strictNullChecks` option manages null/undefined at the type level.

A mistake Hoare made in 1965, publicly acknowledged in 2009, changed the direction of programming-language design. Proof that facing mistakes rather than hiding them is what creates real progress.

## March 2026, Amazon — The Same Temptation Repeats

In March 2026, a chain of outages hit Amazon.

On March 2, an outage caused by AI-contributed code occurred. The toll: 120,000 orders lost, 1.6 million errors. On March 5, a six-hour large-scale outage followed. Checkout, login, even price display were paralyzed. And already in December 2025, Amazon's autonomous AI coding tool Kiro had deleted and re-created an entire AWS environment, causing a 13-hour outage.

Amazon's response was to mandate senior-engineer sign-off. But at the same time, Amazon was maintaining its 80% AI-code-usage target and conducting a 30,000-person layoff. Increase surveillance of AI code while expanding the use of AI code. This contradiction is a microcosm of the entire tech industry today.

Read Hoare's 1965 words again.

> "I couldn't resist the temptation because the implementation was so easy."

And the reality of 2026:

> "AI generates code so easily that we cannot resist the temptation."

A 60-year gap, and the same pattern repeats. **The temptation in which short-term convenience beats long-term safety.** Hoare knew the structure of this temptation better than anyone. He had been taken in by it once himself.

## The Data of the Vibe-Coding Era

Look at the numbers, not the impressions.

According to a CodeRabbit analysis, AI-generated code produces **1.7x more issues** than human-written code. A Veracode report found that **45% of AI-generated code fails security checks**. The METR study is more surprising still: **even experienced developers are 19% slower when using AI**. The exact opposite of the intuition that tools raise productivity.

The open-source community's reaction is more direct. Redox OS, Gentoo, NetBSD, and postmarketOS have adopted policies that outright ban AI-generated code. Debian took the curious position of "deciding not to decide." On Hacker News, the post "Ban AI-generated comments" took the #1 spot with 2,748 points.

The Tailwind CSS case illustrates the paradox of the AI era well. As AI coding tools began generating code directly, traffic to the official documentation fell 40%, and revenue plunged 80%. A structural problem in which the very source of knowledge the AI learned from becomes economically unsustainable.

All of this data points in one direction. Accept code without verification "because it's easy," and the price will come due. Just as Hoare paid a billion dollars for null.

## Why Hoare's Legacy Matters More in the AI Era

Ironically, in an era when AI mass-produces code, Hoare's formal-verification philosophy is more urgently needed than ever.

Martin Kleppmann proposed the concept of **"Vericoding"**: AI generates the code, and formal-verification tools mathematically prove its correctness. All a human needs to do is write a specification of "what you want."

This is a modern realization of the Hoare Logic Hoare proposed in 1969. Specify preconditions and postconditions with `{P} C {Q}`, and program correctness can be checked automatically.

In practice, the fusion of AI and formal verification has accelerated through 2025–2026. Automatic verification rates with Dafny have risen from 68% to 96%. When the speed of AI code generation combines with the rigor of formal verification, we can take a step closer to the software with "obviously no deficiencies" that Hoare dreamed of.

Borrowing Hoare's adage again:

- **Vibe coding** = making it "so complicated that there are no obvious deficiencies"
- **Vericoding** = making it "so simple that there are obviously no deficiencies"

In an era when AI writes code, the human role shifts from typing code to **defining what is correct**. This is exactly what Hoare has argued for half a century.

## Remembrance: "He Was Right, Just Too Early"

On March 5, 2026, Tony Hoare passed away at the age of 91.

One comment on Hacker News summed up his life best.

> **"He was right, just too early."**

Hoare was right. When he said simplicity is reliability, the industry was busy stuffing in more features. When he said formal verification was needed, the industry insisted that raising test coverage was enough. When he confessed that null had been a mistake, the world was already running on systems built on top of NullPointerException.

He was right. It just took the world decades to understand what he was saying.

Hoare's friendship with Dijkstra is the stuff of legend. As Dijkstra was sorting his papers at the end of his life, a senior professor asked what to do with decades of accumulated correspondence. Dijkstra's answer:

> **"Keep only the letters from Tony, throw out the rest."**

Including the senior professor's own letters. An anecdote that tells you the weight of the intellectual conversation the two men carried on for a lifetime.

Hoare reportedly maintained "pinpoint sharp" memory nearly to the age of 92. The elder scholar sneaking off to the Cambridge Arts Picturehouse to watch movies. The man with the courage to confess a sixty-year-old mistake in front of thousands. The man who, with a single algorithm, changed the speed of every computer in the world.

> "Inside every large program is a small program struggling to get out."

In an era when AI pours out ever larger and more complex code, this last adage of Hoare's is both a warning and a compass. Finding simplicity within complexity. Refusing the seduction of "easy" and choosing what is right. That is the legacy Tony Hoare left us.

The tools have grown stronger. But the judgment to wield them remains a human responsibility.

Tony Hoare, 1934–2026. Rest in peace.
