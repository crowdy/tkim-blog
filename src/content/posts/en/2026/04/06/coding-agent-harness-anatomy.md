---
title: 'The Model Was Never Everything — What Actually Makes a Coding Agent Work'
description: 'A developer shipped software in three months with AI that he had failed to build in eight years. Same LLM, but in some environments results came out and in others they did not. The difference was not the model.'
pubDate: 2026-04-06T08:47:38.261Z
lang: en
pairSlug: 'coding-agent-harness-anatomy'
draft: false
---
# The Model Was Never Everything — What Actually Makes a Coding Agent Work

> A developer shipped software in three months with AI that he had failed to build in eight years. Same LLM, but in some environments results came out and in others they did not. The difference was not the model.

---

In March 2026, Google's PerfettoSQL maintainer Lalit Maganti [released syntaqlite](https://lalitm.com/post/building-syntaqlite-ai/). A complete developer toolkit that parses SQLite's 400 grammar rules — parser, formatter, LSP, VS Code extension, Python/JavaScript bindings, and a web playground. About 250 hours, three months of work. Alone.

He had wanted to do this project for eight years and had failed. The requirement was that SQL had to be parsed "in exactly the same way that SQLite itself actually parses it," and meeting that requirement meant extracting grammar rules one at a time from SQLite's dense C source code. The combination of difficult and tedious work simultaneously — a perennial side-project candidate. AI changed this. He started with Aider, went through Roo Code, and settled on Claude Code.

But the interesting part begins here. In the first month, he was "vibe coding." He delegated nearly all design and implementation to Claude. More than 500 tests were generated, and the approach was proven feasible. But what got built was unmaintainable spaghetti code. He threw it all out and started over. Same model. Same AI. Yet the second time the result was different. Why?

A structural answer to that question appeared the same week in Sebastian Raschka's [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent). The piece dissects how coding agents like Claude Code or Codex CLI are actually composed, and it converges on one core insight — **"much of what looks like 'model quality' is actually 'context quality.'"**

The model is the engine. But engines alone do not move cars. The structure surrounding the engine determines real performance. Raschka calls this structure the **Agent Harness**.

The word "harness" originally referred to the gear placed on a horse to transmit its power to a cart or plow. It does not change the horse's own capability, but it determines where that power goes and how it is delivered. A horse without harness just runs around a field. Power without direction. A horse with harness plows fields, hauls loads, carries people. The same power, channeled through structure into purpose.

In software engineering the word has been used in similar contexts. A test harness is the framework that runs tests and collects their results. It does not change the quality of the test code itself, but it ensures tests run in the right environment in the right order and that results are systematically reported. The Agent Harness follows the same logic. It is the software layer that wraps an LLM — a powerful but directionless engine — and collects context, validates tools, manages memory, and limits the scope of action. It does not make the model smarter; it structures the model's smartness toward the right direction.

The reason Maganti's first attempt failed and his second succeeded was not the model but the structure in which the model was used.

---

## 1. Anatomy of a Coding Agent — Six Things Outside the Engine

Raschka identifies six core elements that compose a coding agent. These are not the model. They are the software layers wrapping the model. Take them one by one.

**First, Live Repo Context.** Before the agent handles the user's request, it gathers "stable facts" about the current work environment. Git branch state, repository structure, project documents (README, AGENTS.md), in-flight changes. To handle "fix the tests," the agent must first know which test framework is in use and what the test commands are. Without this context, the model guesses in a vacuum.

**Second, Prompt Shape and Cache Reuse.** Rather than reconstructing the prompt from scratch on every interaction, the harness separates the stable prefix (general instructions, tool definitions, work environment summary) from dynamic elements (recent dialog, the user's request). This architecture enables prompt caching and prevents unnecessary reprocessing.

**Third, Tool Access and Validation.** Instead of letting the model emit arbitrary commands, it acts through structured tool definitions. When the model instructs a tool call, the harness validates whether the tool is recognized, whether arguments are valid, whether permissions are required, and whether file paths are in scope. Reducing degrees of freedom paradoxically increases reliability.

**Fourth, Minimizing Context Bloat.** Long context is expensive and noisy. The harness counters with two strategies. Clipping truncates verbose tool output, and Transcript Reduction compresses the whole session history into a summary while keeping recent events richer. Repeated reads of the same file are also deduplicated.

**Fifth, Structured Session Memory.** The agent maintains a two-layer store. Working Memory is a refined summary of currently important information. Full Transcript is a complete record of every request, tool output, and response. This is why you can close a session, reopen it, and pick up where you left off.

**Sixth, Bounded Subagents.** Subagents are spawned for parallel processing or side tasks but run with stricter permissions than the main agent. They may be allowed read-only operations, have a recursion-depth limit, or have their scope explicitly bounded.

Notice what the six elements have in common. None of them improve the model's reasoning. Every one of them organizes the conditions under which the model reasons. To borrow Raschka's analogy: LLM is the engine, a reasoning model is a tuned engine, and the Agent Harness is what lets you use that engine effectively. The same engine becomes a racing car in one chassis and a broken cart in another.

---

## 2. One Developer's Experiment — The Difference the Harness Made

Raschka's framework is theoretically clean. So how does it play out in practice? Maganti's three months are a precise field report showing where these six elements actually work and where they hit their limits.

**Where the harness shone: breaking inertia.**

The reason the project never started for eight years was not lack of skill. Maganti maintains PerfettoSQL at Google — he is an expert. The problem was the combination of "hard and tedious at the same time." Extracting SQLite's 400 grammar rules from C source code requires high concentration while being repetitive. A combination human motivation structures struggle with.

The way AI broke this inertia is interesting. It converted abstract uncertainty into a concrete prototype. The vague question "will this approach work?" turned into the verifiable question "does this code pass this test?" From the harness's perspective: Live Repo Context grasped the current codebase state, Tool Access automated test execution, and Session Memory preserved the results of previous attempts. Not because the model was "smarter," but because the context in which the model could work was structurally in place.

**Where the harness shone: compressing the domain gap.**

There were things Maganti had to learn to build syntaqlite. The Wadler-Lindig pretty-printing algorithm, the VS Code extension API, the Rust toolchain, the WASM build pipeline, packaging for PyPI/crates.io. Each of those would take days to learn the traditional way. AI compressed them into a few focused conversations. That is what he described as the "teaching assistant" role.

In the harness frame, this is the domain of Prompt Shape and Context Management. The harness effectively manages the boundary between what the user already knows (PerfettoSQL, parser design) and what they do not (the Rust build system). Stable context (the user's domain expertise) is placed in the prompt prefix, while dynamic context (newly learned content) is injected efficiently — a structure that accelerates learning.

**Where the harness shone: implementing "what could not be economically justified."**

One of Maganti's most candid admissions is that without AI he would not have built things like the editor extension, the web playground, or the multi-language bindings. He would have built only the core parser and skipped the rest. The ROI was not there. As AI dramatically lowered implementation cost, features that previously failed the cost-benefit test became economically viable. The increased polish of the product came not from the model being smarter but from Subagent-mediated parallel distribution of work and Session Memory's preservation of context making it possible for one person to advance multiple areas at the same time.

---

## 3. What the Harness Did Not Solve — Design Is a Different Problem

If you have read this far, the question "is the harness then a silver bullet?" will arise. The answer is clearly no. Maganti's experience exposes the harness's limits as sharply as it exposes its possibilities.

**Failure in design decisions.** Maganti says AI made a "total mess" of the public API design. Is this a lack of model capability? No. It is a structural limit. Look again at Raschka's six elements. Live Repo Context tells you the state of the current code. Tool Access runs the tests. Verification confirms the build passes. But there is no tool for verifying "does this API give the user a good experience?" None of the six can answer that question.

The difference between implementation and design lies here. Implementation has "right answers." Code compiles or it does not, tests pass or they fail. This binary verifiability is what makes the harness's Tool Access and Verification powerful. Even if the model produces wrong code, when the test fails the feedback loop kicks in.

Design has no such verification mechanism. "Will this API still be easy to use six months from now?" cannot be checked by a test. "Is this level of abstraction appropriate?" cannot be decided by a compiler. To borrow Maganti's phrasing: "implementation has a right answer. Design does not." The harness is strong where there is a right answer and powerless where there is not.

**Loss of codebase comprehension.** A subtler problem also appeared. As AI generated large amounts of code, Maganti repeatedly lost his grip on his own codebase. He knew the architecture, but he lost the everyday detail — which function lives where, how components connect. This is a problem the harness's Session Memory does not solve. The harness preserves the agent's context, but it cannot preserve the human developer's mental model.

As a result his prompts kept getting longer and more vague. Unable to express what he wanted precisely, he wrote more words; more words produced more ambiguous output; ambiguous output further eroded his codebase comprehension — a vicious cycle. The paradoxical risk of working with AI is here: as productivity goes up, human understanding goes down.

**Absence of temporal awareness.** Another limit Maganti pointed out is that AI lacks "temporal awareness." It does not know why a particular decision was made earlier and why it was later reversed. It is similar to what disappears when an experienced senior engineer leaves an organization — not the skill but the context. The harness's Session Memory preserves the context of the current session, but it does not preserve the months-long history of design decisions and the reasons behind them.

---

## 4. What Two Builds Proved

The most pivotal point in Maganti's experience is between the two builds.

First build (December 2025–January 2026): a month of vibe coding. Both design and implementation delegated to AI. More than 500 tests generated. The approach proven feasible. But the result was unmaintainable spaghetti code. **All thrown away.**

Second build (February–March 2026): rewritten from scratch in Rust. The human drove the design, and AI was used as "autocomplete on steroids." Constant refactoring. Every generated piece of code reviewed immediately. The core features were finished in six weeks, with packaging and documentation following before release.

The same person, with the same model, built the same project twice. What was the difference?

In the first, the human did not play the harness role. Context management, tool validation, quality gates — everything was entrusted to the model. The model mass-produced plausible code within the given context, but there was no structure to maintain long-term consistency.

In the second, the human became the harness. They made design decisions (Brainstorming), reviewed generated code immediately (Verification), recovered context via refactoring when it drifted (Context Management), and explicitly limited the AI's scope of work (the human version of Bounded Subagent).

Overlay Raschka's framework on Maganti's experience and one principle stands out. **A harness must exist. Whether implemented as software, or operated as human discipline.** Asking a bare model to "produce a good result" is like placing only an engine on the ground and saying "run."

Maganti himself summed it up in one sentence. "AI is an unbelievable force multiplier in implementation. But as a substitute for design it is dangerous." That sentence is accurate. And Raschka's framework structurally explains why — the six elements of the harness are all optimized for context management in implementation; they do not handle judgment in design.

---

## 5. Refactoring Is Not a Choice, but a Condition for Survival

One thing Maganti discovered in the second build is that the meaning of refactoring has fundamentally changed in the age of AI code generation. He put it this way: "if you're generating code at industrial scale with AI, you *have* to refactor constantly."

Why? In traditional development, refactoring was the cleanup work done "after enough code piled up." Once technical debt reached a threshold, you would do a big sweep. But at the speed AI generates code, technical debt accumulates at industrial scale too. Hundreds of lines per hour. Among them are patterns the model wrote as "plausible but not optimal." Leave it alone for a day and other code gets layered on top; a week later you have structural problems hard to root out.

Maganti's first build followed this trajectory exactly. AI generated code fast, more than 500 tests passed, everything "worked." But what he faced a month later was a codebase even he could not understand. The fact that tests pass did not guarantee structural health. He called it "false reassurance" — the false comfort tests provide.

From the harness perspective, this is a variant of the Context Bloat problem. Raschka's strategies for minimizing Context Bloat operate at the prompt level — noise management. But bloat in the codebase itself — unnecessary abstractions, inconsistent patterns, the "reasonable but duplicative" structures the model produced — is not solved by prompt management. It is the domain where humans must intervene.

What Maganti did in the second build was put refactoring into the core loop of his workflow. Generate code → review immediately → refactor → next generation. Concurrent, not after the fact. This worked because AI also dramatically lowered the cost of refactoring. "The cost of wrong approaches drops dramatically. You can change structure quickly." That is his phrasing. Paradoxically, AI generates code fast enough that refactoring becomes mandatory, and AI refactors fast enough that the practice is sustainable. AI solves the problems AI created, while a human judges *when* to refactor.

One more harness role surfaces from this pattern — one not explicitly in Raschka's six. It is the function of "monitoring the structural health of the codebase and suggesting when to refactor." When complexity passes a threshold, when inconsistent patterns repeat, when duplication accumulates, the agent says "now is the time to clean up." Most current coding agents lack this. They refactor when asked, but they do not detect the need for refactoring on their own.

---

## 6. The Structure of Addiction — What the Harness Must Protect

The most candid and least-discussed part of Maganti's retrospective is the "addiction-like" pattern of AI coding.

Entering a prompt and waiting for a result has a slot-machine-like structure. Sometimes the result is excellent, sometimes useless. The uncertainty triggers "just one more time." Especially when tired, the pattern intensifies. Sleep deprivation → vague prompt → bad result → frustration → "just one more" → deeper fatigue. Maganti confessed this from his own experience.

What does this have to do with harness design? Current harness architecture focuses on structuring the agent's behavior but does not intervene in the human user's behavior. Nowhere in Raschka's six elements is "monitor the user's work patterns and detect unproductive loops."

From the perspective of anti-sycophancy raised in an earlier essay, this is another face of the same problem. Sycophancy is the model agreeing blindly with the user's opinion. When a tired user inputs a vague prompt, should the agent push back — "this prompt is too vague, what specifically do you want?" — or should it execute, saying "okay"? An RLHF-optimized model is likely to choose the latter. Agreeing with the user's immediate request increases reward. But executing a vague request from a fatigued user damages both the codebase's quality and the user's health in the long run.

The next evolution of the Agent Harness may be here. Managing not just the context of the code but the context of the user. A harness that can distinguish a sharp prompt at 10 a.m. from a blurry one at 2 a.m. An agent that can say "your prompt quality is dropping; how about a short break?" This is not a question of features but of the relationship the agent forms with its user.

---

## 7. Questions

Together, Maganti's three months and Raschka's framework pose one question. **Do you have a harness?**

The question has layers.

First, does your AI tool have a software harness? Is there a structure where Live Repo Context gathers context, Tool Validation checks behavior, and Session Memory ensures continuity? Typing a prompt into a chat window and getting a result is the state without a harness. If you are using a coding agent, you already have some level of harness, but how sophisticated it is varies by tool.

Second, do you have a human-side harness — your own discipline? The reason Maganti's first build failed was not the absence of tooling but the absence of discipline. Do you review generated code immediately? Do you include refactoring in the work loop? Do you make design decisions yourself rather than delegating them to the AI? Do you maintain a mental model of the codebase?

Third, are you aware of the harness's limits? The harness is strong in implementation and powerless in design. Knowing this boundary lets you use the right strategy in each domain. Not knowing it means repeating Maganti's first build.

What Raschka's paper shows is structure. What Maganti's experience shows is the practical application of that structure and its limits. Together, this picture emerges — the performance of a coding agent is not a function of the model but a function of **model × harness × human discipline**. If any one of those is zero, the whole is zero. Even the most powerful model produces spaghetti without a harness, and even the most sophisticated harness produces "working but unmaintainable" output without human design judgment.

What Maganti built in three months — after eight years of inability — was the power of the model. Throwing away the first month's results and succeeding on the second attempt was the power of the harness. And that harness was half in software, half in the human.

---

## References

- [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) — Sebastian Raschka (2026)
- [Eight years of wanting, three months of building with AI](https://lalitm.com/post/building-syntaqlite-ai/) — Lalit Maganti (2026)
- [syntaqlite GitHub Repository](https://github.com/nicoritschel/syntaqlite)
- [Your AI Is Flattering You — Why You Need an Agent Harness](anti-sycophancy-agent-harness.md)
- [The Conditions of an Agent That Survives Being Copied](unreplicable-agent-moat.md)
