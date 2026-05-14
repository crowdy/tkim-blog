---
title: 'From Framework to Harness — How AI Coding Rediscovered Determinism'
description: '"Five repositories trending in the same week began describing themselves differently. Not framework, but harness, hooks, HUD. Where does this lexical migration point?"'
pubDate: 2026-04-10T02:23:56.828Z
lang: en
pairSlug: 'framework-to-harness-paradigm-shift-simplified'
draft: false
---
# From Framework to Harness — How AI Coding Rediscovered Determinism

> "Five repositories trending in the same week began describing themselves differently. Not framework, but harness, hooks, HUD. Where does this lexical migration point?"

---

On April 10, 2026, a glance at GitHub Trending's daily and weekly charts surfaces something striking. Look at the words the top repositories in the AI coding tools category use to describe themselves. [Archon](https://github.com/coleam00/Archon) sits at 14,411 stars with a daily gain of +185 and writes — *"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* [hermes-agent](https://github.com/NousResearch/hermes-agent) is the week's biggest gainer at +19,765, with the subtitle *"The agent that grows with you."* [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex), the week's second-biggest gainer at +9,737, describes itself as *"Your codex is not alone. Add hooks, agent teams, HUDs."*

The three projects share little. Archon is TypeScript, hermes-agent is Python, oh-my-codex is also TypeScript. The authors differ. There is no trace of mutual reference. And yet the trajectories of the words these three projects use line up with uncanny precision. Archon calls itself a **harness builder**. The phrase *"grows with you"* from hermes-agent implies a relationship where the agent wraps around the user from the outside and follows along. The three words from oh-my-codex — **hooks**, **teams**, **HUDs** — mean, respectively, "something inserted into an existing flow," "a horizontal unit of collaboration," and "a cockpit gauge that shows current state." None of these three words belongs to the lexicon of framework. Override, pipeline, orchestrator — those were the words AI agent frameworks used in 2023-2025. Hooks, teams, HUDs come from a different world. A world where you don't change the existing system, you layer over it.

This essay tracks that lexical migration. The core argument is that the shift "from framework to harness" is not a marketing fad but reflects the structural lessons that the AI coding tools ecosystem has learned from two years of the framework era. At the center of this shift sits a single word — **determinism**.

---

## 1. Archon's Declaration and the Background of Framework Fatigue

The opening line of [Archon](https://github.com/coleam00/Archon)'s README is this essay's starting point. *"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* The first sentence is positioning, the second is value proposition.

Archon's choice to call itself a harness builder is conscious. In 2024, a tool with the same functionality would have introduced itself as an "AI coding framework" or an "agent orchestration platform." LangChain described itself as a "framework for developing applications powered by large language models." CrewAI was a "framework for orchestrating role-playing, autonomous AI agents." Framework was effectively the standard self-description for AI agent tools in 2023-2025.

For Archon to claim "the first" presupposes that this category is itself new. Dozens of AI coding frameworks already exist. AI coding harness builders — by Archon's self-conception — did not. The declaration is a bid to create a new category. The numbers — 14,411 stars and +185 daily — show the community responding to that message.

The second sentence, *"Make AI coding deterministic and repeatable,"* is not framework language. The framework value proposition usually invokes "easy," "fast," "powerful." Deterministic and repeatable belong to a different lineage — software testing and quality assurance. For a test to be deterministic means the same input yields the same output. For a test to be repeatable means anyone, anywhere, running it any number of times gets the same result. When Archon declares it will give AI coding these two properties, it is staking a position: it will tame the essential problem of the LLM's probabilistic nature at the tooling layer. Where the framework promised "you can do more," the harness promises "you can do the same thing reliably." Expansion versus convergence. That is the design philosophy hiding behind the difference in vocabulary.

Behind this choice lies two years of framework fatigue. When [LangChain](https://github.com/langchain-ai/langchain) appeared in 2023, developer reaction was euphoric. [AutoGen](https://github.com/microsoft/autogen), [CrewAI](https://github.com/crewAIInc/crewAI), and [LangGraph](https://github.com/langchain-ai/langgraph) followed. The common pattern was putting the user's work inside a structure the framework defined — "inversion of control."

The problems began the moment work strayed from the standard. As agents grew more complex, tool calls nested, and production requirements (logging, monitoring, cost control, timeouts) piled on, the framework's abstractions became obstacles. Catching an async error inside a LangChain Chain required understanding LangChain's internals. The abstractions were no longer helping; they were standing in the way. Posts like "LangChain is not needed," "Why I stopped using LangChain," and "The case against AI frameworks" appeared throughout 2024. The critique was consistent — **the framework creates more problems than it solves**. Too many abstraction layers make debugging hard, and the things the framework hides (the details of LLM API calls, the actual contents of prompts, token usage) are exactly what users want to see but can't.

The fatigue peaked in mid-2025 when Anthropic released the Claude Agent SDK. The SDK's agent definition was deliberately minimal — **model + tools + context management**. No orchestration, no workflow, no state machine. "What we provide is the minimal building blocks. How you assemble them is your call." If a framework already provides a rich structure, there's no room for an external layer. If the SDK provides only the minimum, there's room above it for deterministic execution, repeatable workflows, and quality gates. By analogy, the Claude Agent SDK provides the horse (the model) and the basic reins (tool access); it delegates the harness to the community. Archon was born in exactly that space.

---

## 2. Harness vs Framework — Context from Software Engineering History and the Horse Harness Metaphor

The word "harness" that Archon chose is new in AI coding but has decades of history in software engineering.

In software testing, a "test harness" means the infrastructure for executing tests. JUnit's runner, pytest's fixture system, Selenium's WebDriver. A test harness does three things — setup, execution and collection, teardown. The harness does not intervene in the test logic. It simply ensures the test runs under the right conditions. A framework determines the structure of the test. A harness manages only the execution. If the framework says "come inside," the harness says "I'll wrap you from the outside."

The most important property of a test harness is that it is **non-invasive**. You can swap out the harness without changing the test code. Mapped onto AI coding tools, the meaning sharpens. Agent logic written inside a LangChain Chain cannot be used as-is outside LangChain. A workflow designed in CrewAI's Crew-Task structure won't work without CrewAI. For Archon to call itself a harness is a declaration to avoid that coupling.

A previous essay on this blog, ["The Model Wasn't Everything"](coding-agent-harness-anatomy.md), addressed Sebastian Raschka's Agent Harness concept. If Raschka's piece was an academic analysis, Archon turns that analysis into a product. The moment an academic concept becomes a product category, and the fact that it climbed to the top of GitHub Trending, means the community has validated the shift.

**Historical analogy: from EJB to Spring**

The most instructive precedent for this transition is the **shift from EJB to Spring** in the late 1990s. Enterprise JavaBeans (EJB) had vast ambitions — distributed transactions, remote calls, security, concurrency, all solved by the framework. The price was invasive coupling. Wrapping a simple calculation in EJB required at least four files, with a hundred lines of boilerplate for ten lines of business logic. EJB ran only inside an application server, making unit testing effectively impossible. This overlaps precisely with LangChain's situation in 2024.

In 2002, Rod Johnson proposed Spring with the core philosophy of **respect the POJO (Plain Old Java Object)**. Spring didn't alter the developer's code. Through Dependency Injection, dependencies between objects were injected externally, but the object itself didn't even need to know it was running inside Spring. Non-invasive wrapping. The definition of harness. EJB lost; the spirit of the harness won.

**The original meaning of horse harness**

The oldest meaning of the English word "harness" is "horse harness" — the apparatus you strap on a horse's body to transfer the horse's force to a cart or plow. The analogy is uncannily exact. A horse harness doesn't change what the horse can do — just like an agent harness, which doesn't alter an LLM's reasoning capability but controls its direction. Without a horse, the harness is just useless leather and metal — just like a software harness, which doesn't function without a model. It's swappable — apply different harness configurations to the same model and you get different kinds of work. And most importantly, **it imposes determinism** — a horse without a harness can run anywhere, but with a harness its force is delivered in a predictable direction.

In an era when frontier models like GPT-5, Claude Opus 4.6, and Gemini 3.1 already have powerful reasoning, what's needed isn't a stronger horse, but a better harness.

---

## 3. hermes-agent and oh-my-codex — Same Paradigm, Different Vocabulary

If Archon is the only repository to use the word harness explicitly, hermes-agent and oh-my-codex express the same paradigm in a different vocabulary.

In [hermes-agent](https://github.com/NousResearch/hermes-agent)'s subtitle, *"The agent that grows with you,"* the operative phrase is **"with you."** The framework's relationship is "come inside" — the user adapts to the framework's structure. "Grows with you" runs the opposite direction. The agent comes to where the user is. As the user's workflow changes, the agent adjusts. A relationship where the agent wraps the user from the outside — not a framework relationship, but a harness one. The numbers — 44,309 stars, weekly +19,765 — show that this message is resonating with the community.

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)'s three words are more concrete. **Hooks** — entry points in an existing system's execution flow into which user-defined code is inserted. The same pattern as Git hooks and React hooks. Override replaces existing behavior, but a hook preserves existing behavior and inserts additional behavior. Non-destructive extension. **Teams** — if the framework era's "orchestration" was a hierarchical model where a central conductor controls each agent, team is a horizontal model where each member has autonomy and collaborates. **HUDs** — like a fighter pilot's Heads-Up Display, they overlay information in real time without obscuring reality. If the framework's dashboard shows internal state in the framework's terms, the HUD overlays information onto the user's field of view.

Synthesize the three and oh-my-codex's design philosophy emerges. Don't change the existing tool (Codex CLI). From outside, build entry points (hooks), layer horizontal collaboration (teams), and overlay real-time state display (HUDs). This is a harness. The 19,938 stars and weekly +9,737 ascent is the community's response to this approach.

In the same weekly trending list, [obra/superpowers](https://github.com/obra/superpowers) (143,000 stars) introduces itself as a "skills framework & software development methodology," and [onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx) (26,000 stars, weekly +5,556) as "works with every LLM." Both share the direction of wrapping existing tools and models from outside without changing them.

---

## 4. Why Determinism Became the Word of the Moment — Lessons from Agentic Failure

There's a reason Archon's *"Make AI coding deterministic and repeatable"* appeared in 2026 and not in 2024. The concern of 2024 was "How far can AI go?" What made determinism the topic in 2026 is two years of accumulated agentic failure.

**The impossibility of debugging a non-deterministic workflow.** The first problem teams hit when putting agents into production was that the same input gave different results. Temperature, micro-changes in prompts, the contents of the context window, the order of tool calls — all vary probabilistically, so a workflow that succeeded once could fail next time. And no one could tell why it failed. The framework had abstracted the intermediate state away. Debugging works in traditional software because of determinism. Without that guarantee in an AI agent, debugging falls to the level of "I ran it again and it worked this time."

**The control flow hidden by the framework.** Inability to understand the agent's control flow was the second problem. In what order does it call tools? How does it recover from errors? — All hidden behind the framework's abstractions. The attribution bug from a previous essay — the case where Claude Code misattributed its own utterances as user input — is the extreme form of this problem.

**"It works, but I don't know why it works."** The Maganti syntaqlite experience covered in ["The Model Wasn't Everything"](coding-agent-harness-anatomy.md) is the archetype. Over 500 tests passed, but he didn't understand why it worked. False reassurance.

The common denominator of all three failures is **the loss of control**. The harness's promise is to return this control. The agent's interior — the model's reasoning — remains probabilistic, but the agent's exterior — the execution conditions, input construction, output validation, and tool call ordering managed by the harness — can be made deterministic. You can't control the interior, but controlling the exterior prevents the interior's uncertainty from propagating to system-wide uncertainty.

The same pendulum operated in Ruby's Rails vs Sinatra and Python's Django vs Flask. The framework first dominates the market; once complexity crosses a threshold, a lightweight alternative rises. The AI agent ecosystem is in the segment of moving toward harness. But history's lesson is that, just as Sinatra didn't replace Rails, the harness won't completely replace the framework. Standard RAG pipelines or simple chatbots — LangChain or its successor will still be efficient there. The harness shines in production, customization, and where determinism is needed.

Clear implications for practitioners follow from this analysis. First, when evaluating an AI agent tool, pay close attention to whether it calls itself a framework or a harness. Words reflect design philosophy. Second, measure the coupling between your code and the tool — if you tore the tool out, how much of your code would survive? Third, when an AI agent enters production, demand harness-level determinism — same prompt composition, same tool call order, same validation logic. With it, debugging is feasible; without it, impossible.

---

## 5. Open Questions — How Far Will the Lexical Migration Go?

What GitHub Trending showed on April 10, 2026 is that the vocabulary of AI coding tools is shifting. From framework to harness. From override to hooks. From dashboard to HUD. From "come inside" to "I'll wrap you from outside."

Whether this is a fleeting trend or a structural shift, time will answer. But the evidence this essay traces — Archon's explicit "harness builder" declaration, hermes-agent's "grows with you," oh-my-codex's hooks/teams/HUDs, two years of framework fatigue, the historical precedent of EJB to Spring, the space opened by Claude Agent SDK's minimalism — tips the scale toward structural shift over passing trend.

Several open questions remain. How will harnesses standardize — Archon's claim of "first" can be read as an attempt to capture this standard. Will frameworks absorb harnesses — just as Spring began as an alternative to EJB and became a massive framework. Will models themselves embed harnesses — if a model itself does tool validation and manages context bloat, the role of an external harness shrinks. What's the cost of determinism — forcing determinism might constrain the LLM's probabilistic exploration.

These questions have no answers yet. What matters is the direction of the questions. If the question of 2023-2025 was "What can AI agents do?", the question of 2026 is "How can AI agents be controlled?" From possibility to control. From expansion to convergence. From framework to harness.

The two sentences Archon used to introduce itself — "the first open-source harness builder for AI coding" and *"Make AI coding deterministic and repeatable"* — compress the transition of the AI coding tool ecosystem in 2026. In the framework era we gave AI freedom to do more. In the harness era we demand structure to understand and reproduce what AI does.

Horses till fields once a harness is on them. Did the harness take away the horse's freedom? No. It gave the horse's force a purpose. AI coding in 2026 has rediscovered determinism for the same reason. The model's force is already sufficient. Now it's time to give that force direction.

---

## Sources

- [Archon — GitHub Repository](https://github.com/coleam00/Archon) — "The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable." TypeScript, 14,411 stars.
- [hermes-agent — GitHub Repository](https://github.com/NousResearch/hermes-agent) — "The agent that grows with you." Python, 44,309 stars, weekly +19,765.
- [oh-my-codex — GitHub Repository](https://github.com/Yeachan-Heo/oh-my-codex) — "OmX - Oh My codeX: Your codex is not alone. Add hooks, agent teams, HUDs." TypeScript, 19,938 stars, weekly +9,737.
- [obra/superpowers — GitHub Repository](https://github.com/obra/superpowers) — "Skills framework & software development methodology." 143,000 stars.
- [onyx-dot-app/onyx — GitHub Repository](https://github.com/onyx-dot-app/onyx) — AI chat platform, "works with every LLM." 26,000 stars, weekly +5,556.
- [The Model Wasn't Everything — What Actually Makes a Coding Agent Work](coding-agent-harness-anatomy.md) — Previous essay, anatomy of the six components of an Agent Harness.
- [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) — Sebastian Raschka (2026). Academic analysis of the Agent Harness concept.
- [The Rediscovery of the Agent Runtime](agent-runtime-rediscovery.md) — Previous essay, analysis of the "same-week simultaneous releases" pattern in the first week of April 2026.
- [Claude Code's $100 Escape and GLM-5.1's Counterstrike](llm-lockin-cracks-48h.md) — Previous essay, analysis of LLM lock-in fatigue and framework dependency.
