---
title: "If AI Writes the Code, Why Use Python — Verification Cost Picks the Language Again"
description: "Python's expressiveness was a trade-off built for humans. In an era where humans barely read code, is that trade-off still valid, or does a language that hands verification off to the compiler become the new default?"
pubDate: 2026-05-06T00:00:00.000Z
lang: en
pairSlug: ai-code-language-choice
draft: false
---

# If AI Writes the Code, Why Use Python — Verification Cost Picks the Language Again

> Python has held the top spot for a decade because "humans can write it fast and read it fast." But if humans barely write code anymore, and the presence or absence of a compiler at review time decides the cost per hour, does the basis for that top spot still hold?

## Introduction — The Language Wars, Restarted

On May 1, 2026, a short Medium post took over the Hacker News front page. The title: "If AI writes your code, why use Python?" The piece itself is brief. Its core claim can be reduced to a single line: "For the last decade, fast-to-ship beat fast-to-run. Not anymore." Yet 922 comments were posted, and the aggregate score reached 868. An unusual scale of response for a single blog post.

The reason this post hit a nerve is straightforward. Every defense of Python heard until now — readability, expressiveness, learning curve, rich libraries — held only on the premise that "a human writes the code." The piece pushed that premise into view. If that premise wavers — that is, if it becomes ordinary for agents like ChatGPT Codex, Claude Code, and Cursor to produce 70–90% of new code — where does Python's advantage remain?

It is no accident that the original post cites Microsoft's move of the TypeScript compiler to Go, Discord's adoption of Rust, and the broader Python ecosystem's dependence on Rust (uv, ruff, polars, pydantic-core, and so on). They are all data points pointing the same way. "The cost of making one engineer a little happier for a week" is being outweighed once again by "the cost of operating a settled system for five years." And to that five-year cost has been added a new line item: "the cost of verifying code produced by AI."

What is interesting is that the claim itself is not new. The static vs. dynamic types debate is 30 years old, and "Python isn't real production" is not a fresh argument either. What is new is the context that drove 922 remote keyboards to bang in at once. That context fits in a sentence. AI raised hourly code output by an order of magnitude, which makes the verification cost per line the dominant term in system cost. And verification cost is set by the language.

## Section 1 — What the Original Said: The Axis of Trade-offs Has Shifted

Let us pin down the original argument precisely. The author, NMitchem, starts from three observations.

First, **Python's real identity has already swapped clothes for Rust.** uv is a package manager written in Rust. ruff is a linter and formatter written in Rust. polars is a dataframe library written in Rust. pydantic-core is a validation core written in Rust. ML inference engines are increasingly moving to Rust as well. "The Python ecosystem is increasingly a Rust ecosystem wearing a Python hat."

Second, **the TypeScript camp is moving in the same direction.** Microsoft announced in 2025 that it had begun rewriting the TypeScript compiler in Go. The largest TypeScript user in the world moved its own compiler to a different, harder language. The reason is plain. Compile speed sets the speed of the entire type-aware toolchain, and a JS/TS compiler had no more headroom to push that speed. That is a signal that the arithmetic of trade-offs has changed.

Third, **the Discord case.** Discord moved its Read States service from Go to Rust in 2020 and brought GC pauses close to zero. That is old news, but the original's point is that the same company has been building more and more new services in Rust since 2024. The "cost of an engineer learning Rust" is a one-time investment paid once and done; the "cost of GC eating 50ms per request" is a chronic expense that compounds with traffic.

That is the factual base of the original. On top of it, NMitchem stacks two conclusions. (1) The old defenses of Python and TypeScript — "developer experience is better" — really meant "better only when humans type the code themselves," and the defense expires when AI takes the keyboard. (2) Therefore, new projects, especially those built for long operation, are rational to start in languages like Rust or Go. The final anecdote in the post puts the conclusion in miniature. The author writes that, alongside a team that didn't know Rust, he had AI write Rust code and shipped an app one-tenth the size and faster at runtime than the same app would have been if built in Electron. "The humans never had to learn Rust to get there."

That closing anecdote drew the most heated reactions in the thread. j_w cut back: "Yeah and nobody knows or cares about the app, so it doesn't matter. Naming an unused product as your anecdote isn't a great way to close out the piece." vhantz cut shorter: "Let's look back on this not too far in the future." Both comments point at the same suspicion. AI can produce "code that runs in a language you don't know," but debugging that code five years later is still a human job, and if that human doesn't know the language, the code becomes a write-off.

The original's argument should therefore be split into two for assessment. "The old defense of Python has weakened" is a proposition most of the comments agree with. "Therefore start new projects in Rust" is the prescription on which opinions split.

## Section 2 — The Grain of HN: Three Branches of Answer

Reduce the 922 comments to a shape and the answers to "what language to pick in the AI era" fork into three branches. Let us examine the reasoning and limits of each.

**Branch one: "Python is still the answer — because of training data and readability."**

bryanrasmussen lists three rules for working with LLMs: (1) use a language you know well — it must be easy to read so you can do follow-on work; (2) use a language with a large training set — the LLM works more efficiently; (3) use a language that is easy to read. The conclusion: "python has a large training set and it is easy to read." _boffin_ shortens the same point: "I could write in brainfuck with ai, but I presume, wouldn't get the same results than if going with python." The core of this branch is that AI models are themselves the product of training on internet code, and Python has the dominant share by sheer volume of that code.

The strongest defense of this branch comes from luodaint: "Even if the agent produces 90% of the code, every diff still lands in my review queue. Python's readability isn't an advantage during write; it's an advantage while reviewing. I have to read, understand, and judge whether it does what was intended. That's the other 10%, and it is the decisive 10%." Where the original assumed "humans lift their hands off the keyboard," this branch assumes "humans move into the reviewer seat instead." And the reviewer seat does not reduce reliance on readability; it increases it.

**Branch two: "Static types win now — because the compiler takes over verification."**

The essence of this branch is pshirshov's comment: "The more you can offload to the compiler or the type system, the shorter the feedback loop and the better the agent performs. The absence of strictly enforced static typing is exactly why agents fail late in Python. In my view, Rust and Scala are the best targets for agentic flows." slashdev is more declarative: "The static vs dynamic language debate is decisively over and static has won." He writes that 50 engineers at his company work almost 100% in Rust, and that he no longer writes code by hand. He adds the observation that AI couldn't handle the borrow checker well a year ago and now handles thorny lifetime issues better than he can.

bob1029 transposes the same logic to .NET: "Across a ~50MB worth of .NET codebases I work with, C#'s strong typing is the spine that holds everything on rails. Code edits have been flawless for months; an apply_patch touching 20 files at once just works. LLM code-editing performance might be mostly language agnostic once we compensate for the strictness of the type system. More precisely, it's a question of how much useful information you get back at compile time." That is a very important insight. It is not the model's raw capability that differs, but "how much signal is available for the agent to verify its own work" that determines the outcome. A compile error message is faster and cheaper than a unit test. As p4bl0 phrased it: "if you're auto-generating code that humans won't 100% review, it's always better to use the safest possible language so that the compiler can catch most of the errors."

**Branch three: "Human familiarity beats everything."**

The representative of this branch is fbrncci's comment: "Why Python? Because I've used it for over a decade, I can debug it, and I can smell something off within ten seconds when the agent is about to write a massive foot-gun. With other languages, that's not the case — I'd need to relearn a lot. So I prefer Python. Even at the speed AI pumps out code, some sense of control remains. With Go or Rust it would feel more like 'vibecoding' than AI-assisted programming, just yolo the whole product." This view looks like branch one but emphasizes a different point. Not Python's objective superiority but the developer's **accumulated personal experience** is what governs verification cost. As fxj put it: "use the language that you know best to make your life as uncomplicated as possible."

This third branch is often dismissed, yet it is the most realistic. When one developer reviews equivalent Rust and Python code, even if the Rust is objectively safer, if that person is seeing lifetimes for the first time the review time grows tenfold. They cannot do other work during that time. Verification cost is not a property of the language; it is the product of language times person.

Combine the three branches and there is no single right answer for language choice in the AI era. What is clear is that there are three axes of evaluation. (1) How well does AI write that language — training data volume and the model's domain familiarity. (2) How well does that language verify AI's output — type system, compiler, static analysis. (3) How well can a human read and debug that language — the team's accumulated experience. Python is overwhelming on (1), very strong on (3), weak on (2). Rust is overwhelming on (2), increasingly strong on (1), 0 to 100 on (3) depending on the team. Go is roughly 7–8 across all three. TypeScript is strong on (1), middling on (2), but the runtime error surface remains large.

## Section 3 — Domain Decides: What to Start a New Project In

Even if we accept the three axes, picking a language for a new project still requires a decision. The most practical approach is to organize by domain.

**ML / data domain — Python's dominance won't crack any time soon.** rchowe's comment is precise: "Python has a much more mature ecosystem than Rust, especially for AI/ML stuff. I found a Rust crate claiming to do a certain ML algorithm but it wasn't accurate. I could build a replacement with Claude, but still." Library lock-in is not about language superiority; it is about the gravity of data. The compatibility surface of Hugging Face, scikit-learn, PyTorch, JAX, polars, ray, and mlflow is Python. Even if a new data pipeline starts in Rust, the moment a second component calls Python, a boundary appears, and boundaries are costs. In this domain the dominant pattern remains "start in Python, peel hot paths into Rust." polars and pydantic-core are exactly that pattern.

**Systems / infrastructure domain — Rust or Go is becoming the default.** Almost every newly written database, runtime, proxy, and orchestrator starts in Rust or Go. Cloudflare's Pingora, new modules in ScyllaDB, Tigerbeetle, Materialize, Restate, dragonfly. The character of this domain is "the cost of a single error is very high," which means it is the domain where compiler verification offers the most. As AI writes more infrastructure code, the Rust share in this domain will accelerate. slashdev's company snapshot — 50 engineers working almost 100% in Rust, not writing code by hand — is a preview of the systems domain.

**Web backend — TypeScript vs. Go competes anew.** Microsoft moving the TypeScript compiler to Go is symbolic. fulafel's comment reads the signal cleanly: "In my experience few people consider Go harder than TS or JS. TS is quite complex and JS is a foot-gun." At the same time, TypeScript's old defense — "use one language for both frontend and backend" — remains strong. The decision variable in this domain is therefore "how much of the team shares frontend and backend code." If it is high, TypeScript; if it is low, Go. For a fresh start either is reasonable.

**CLI / desktop / embedded — Rust is becoming the default.** CLI tools like ripgrep, fd, and bat have already settled as Rust standards, and Tauri is steadily eating Electron's seat. The original's closing anecdote fits this domain best. Memory, binary size, and startup time touch the user experience directly here. The parts AI handles poorly (unsafe Rust, complex lifetimes) remain a small surface, and the model is plenty good on ordinary CLI code.

**Scripts / one-off automation — Python is permanently number one.** The character of this domain is that verification cost is roughly zero. Code you run once and throw away does not need the compiler's protection. AI builds it in 30 seconds, you run it, done. That is exactly the territory scotty79 described when he said "I tried using Rust but the development just seemed too slow." Python's seat is not shaking in the one-off space.

What this domain mapping suggests is that the original's claim — "Rust is the new default" — is only half right. In systems, CLI, and embedded, the claim is rapidly becoming true. In ML and one-off scripts, it will likely be false for the next five years too. Web backend and desktop are in transition. In other words, the language choice of the AI era is not "Python or Rust" but "language polyglottism advances faster and deeper." A developer who worked in Python and JavaScript five years ago will now ordinarily work across Python, TypeScript, Go, and Rust simultaneously. This is possible precisely because AI lowers the cost of switching languages. fxj's joke — "you might as well learn LISP, COBOL, FORTRAN, APL, J for fun" — may not be a joke at all. If the model knows every language, the number of languages a human needs to know deeply may go down rather than up.

## Conclusion

Back to the lead question. Does Python keep its top spot? The answer is "it keeps it, but the spot narrows."

The areas where Python keeps the top spot are still two. First, ML and data. Where the gravity of libraries outweighs the language itself, Python's lock-in does not break. Second, one-off automation and scripts. Where verification cost is close to zero, the compiler's protection is a luxury. Python will be number one in those two areas for the next decade as well.

In every other area — systems, infrastructure, CLI, embedded, newly built web backends — Python's share shrinks. The seat is filled by Rust (verification advantage) or Go (simplicity and compile-speed advantage). TypeScript holds the frontend but loses ground on the backend to Go. The driver of this shift is singular. AI raised code output by an order of magnitude, which raised the share of verification cost in system cost by an order of magnitude, and verification cost is decided by the compiler.

What the original missed was the role of the human. As luodaint correctly noted, humans do not lift their hands off the keyboard; they move into the reviewer seat. And in the reviewer seat, readability does not decrease, it increases. So the language of the future will favor those that are both "easy for AI to write" and "easy for humans to read." Among current candidates that satisfy both — rich training data, a strong compiler, and simple syntax — Go is the closest fit, Rust is second, and Python remains strong only on the readability axis.

A one-line summary of language choice in the AI era: **For a new project, look at the domain first. If it is systems, infrastructure, or CLI, pick Rust or Go; if ML, data, or automation, Python; if web, look at team composition and pick TypeScript or Go. Whatever you pick, do not forget that a language whose compiler can take over half of verification has the advantage over five years of operation.** The reason Python topped the list was that humans needed to write fast. Now humans need to review fast. And review is fastest when the compiler stands next to them.
