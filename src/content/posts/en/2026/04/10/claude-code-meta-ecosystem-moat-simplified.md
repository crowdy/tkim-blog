---
title: 'The Claude Code Meta-Ecosystem Explosion — The Real Moat for Agents Is Not the Model, It Is the Operational-Knowledge Layer'
description: '"Five repositories took over GitHub Trending in the same week. Every one of them was about how to use Claude Code better. The phenomenon does not yet have a name."'
pubDate: 2026-04-10T02:25:30.111Z
lang: en
pairSlug: 'claude-code-meta-ecosystem-moat-simplified'
draft: false
---
# The Claude Code Meta-Ecosystem Explosion — The Real Moat for Agents Is Not the Model, It Is the Operational-Knowledge Layer

> "Five repositories took over GitHub Trending in the same week. Every one of them was about how to use Claude Code better. The phenomenon does not yet have a name."

---

During the week of April 10, 2026, the GitHub Trending page presented an unusual scene. When daily and weekly rankings were combined, five repositories at the top shared a single commonality. All of them were tools built to "use Claude Code — or a comparable coding agent — better."

[obra/superpowers](https://github.com/obra/superpowers) recorded 143,712 stars at +2,299 per day. It is a Shell project described as "An agentic skills framework & software development methodology that works." [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) had 10,441 stars, +1,364/day, +2,230/week. The repository's core artifact is a single CLAUDE.md file. [luongnv89/claude-howto](https://github.com/luongnv89/claude-howto) sat at 24,002 stars with +7,342 weekly. It is a collection of copy-paste templates and guides. [YishenTu/claudian](https://github.com/YishenTu/claudian) had 6,815 stars, +200/day. It is a plugin that embeds Claude Code inside an Obsidian vault. And [Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) hit 19,938 stars with +9,737/week — the second-fastest-growing repo across all of GitHub that week. This one is aimed at OpenAI's Codex rather than Claude Code, but the pattern is the same.

The cumulative star count across the five repos comes to 204,908. Even by a conservative tally, the stars added this week alone exceed 20,000. Even during the peak of the VS Code extension ecosystem and the prompt engineering boom of 2023–2024, five meta-tools had never landed on Trending in a single week.

What is going on?

This essay's thesis: **beyond an individual's context, the collective operational knowledge of the community is forming a new layer on top of the model, and that layer itself becomes a new kind of moat.**

---

## 1. Five Repos — One Pattern

The five repositories are five expressions of the same phenomenon. Yet each has a distinct character.

**obra/superpowers** is the flagship of the week. It injects skills corresponding to the stages of software development — brainstorming, plan-writing, code review, debugging — into Claude Code, and structures the agent to call the appropriate skill depending on the situation. More importantly, the keyword is methodology. "Always go through a brainstorming step." "Write a plan first and execute it through subagents." "Always run verification before claiming completion." The tacit knowledge of senior developers is crystallized into Shell scripts and Markdown files. The 143,712 stars say the demand for that methodology is enormous.

**forrestchang/andrej-karpathy-skills** is the purest example of the pattern. The core artifact is a single CLAUDE.md file. It distills Karpathy's observations about the pitfalls of LLM-generated code. Repositories with more than 10,000 stars sit in the top 0.01% on GitHub. This is not code. It is not a binary. There is nothing to install, build, or run. You copy the text file into your project root and you are done. More than 10,000 people starred it anyway. **The CLAUDE.md file format itself has become a product category.** There used to be a culture of sharing `.vimrc` and `.emacs` files in dotfiles repos, but dotfiles repos rarely reached 10,000 stars — only legendary exceptions like mathiasbynens/dotfiles (30k), and that number accumulated over many years. andrej-karpathy-skills added 2,230 stars in a single week.

**luongnv89/claude-howto** has 24,002 stars with +7,342/week. "Visual, example-driven guide to Claude Code with copy-paste templates" captures it exactly. Traditionally, software documentation was an appendage to a product. The product came first, documentation followed. claude-howto inverts that relationship. The documentation is the product. The original product, Claude Code, was built by Anthropic, but the knowledge product called "how to use Claude Code effectively" is being built by the community. A weekly gain of +7,342 puts it within the top 10 across all of GitHub for the week. Standing shoulder to shoulder with corporate open-source frameworks and new programming languages is — a copy-paste guide. What the developer ecosystem is thirsting for right now is not a better model, but better ways to use the models we already have.

**YishenTu/claudian** has 6,815 stars. It is a tool that expands Claude Code's physical surface area. By embedding Claude Code inside an Obsidian vault, the agent leaves the code editor and enters the user's thinking space. The cost of replacing an agent that lives only in your terminal is one thing; the cost of replacing one that runs through your editor, terminal, and knowledge-management tool is a different order altogether.

**Yeachan-Heo/oh-my-codex** is the most important data point of the week. 19,938 stars, +9,737/week — the second-fastest-growing repo on GitHub. But this one is not for Claude Code; it is for OpenAI's Codex. Even the name is telling. The "Oh My" prefix comes from [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh). It declares its identity as "a user knowledge layer on top of Codex."

A Korean developer, Yeachan-Heo, maintains it, and it provides three core features. Hooks are a mechanism for running user-defined logic before or after the agent performs certain actions — effectively governance for the agent. Agent teams provide a structure for orchestrating multiple agents — design, implementation, testing — rather than a single one. HUD is an interface that lets you observe the state of the agent system in real time. This combination suggests the coding-agent usage paradigm is evolving from "a 1:1 conversation between me and an agent" to "me, as a manager, running an agent team."

If only superpowers, andrej-karpathy-skills, claude-howto, and claudian had trended, the phenomenon could have been read as a "Claude Code special case." oh-my-codex rules that interpretation out. **The same pattern transferred to a different model.** This is not a product-level phenomenon but a category-level one. Evidence that an "operational-knowledge layer" is forming across the entire coding-agent category.

---

## 2. CLAUDE.md — An Explosion Driven by a Natural-Language Configuration File

The most striking fact running through the five repos is that the core artifact is not code but text.

Throughout software history, "files in which users define a tool's behavior" have always existed. Unix's `.profile`, Emacs's `.emacs`, Vim's `.vimrc`, Zsh's `.zshrc`. But previous-generation configuration files required dedicated syntax or programming languages. Without knowing Emacs Lisp you could not understand someone else's `.emacs`, and even copy-pasting risked conflicts or unintended behavior.

CLAUDE.md takes a decisive leap from this tradition. It is written in natural language. "Write commit messages in English." "Write tests first, then implement." Even people who do not know programming languages can read it, edit it, and share it. The barrier to entry has essentially disappeared. That is what explains the explosive growth of andrej-karpathy-skills. It took years for an `.emacs` file to reach 10,000 stars, but CLAUDE.md added 2,230 stars in one week.

The more decisive difference is the radius of impact. `.vimrc` adjusts the parameters of mechanical behaviors like key bindings and tab width. CLAUDE.md alters the agent's judgment system. "When code gets long, split it into functions." "Don't implement immediately — confirm the design first." These are not parameters but values. They can produce completely different outputs for the same request. In the harness framing I discussed in an earlier essay, CLAUDE.md is the outermost layer of the harness. If the harness structures the agent's "how," CLAUDE.md prescribes the agent's "what" and "why."

The economic leverage of this file is worth noting. If a CLAUDE.md from andrej-karpathy-skills helps the agent avoid one common mistake per session, saving 30 minutes of debugging — when 10,000 people benefit from that once per week, the annualized developer-time savings are enormous. Traditional libraries made "code reuse" possible; the CLAUDE.md ecosystem makes "operational-knowledge reuse" possible.

Just as [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) (180,000+ stars) laid a community-knowledge layer on top of Zsh, superpowers does the same on top of Claude Code, and oh-my-codex does the same on top of Codex. Side by side:

| | Zsh + oh-my-zsh | Claude Code + superpowers |
|---|---|---|
| Base tool | Zsh shell | Claude Code |
| Knowledge layer | oh-my-zsh plugins/themes/configs | superpowers skills/methodology |
| Config file | .zshrc | CLAUDE.md |
| Core value | Crystallized know-how for the shell | Crystallized know-how for the agent |

Two differences stand out. First, speed. oh-my-zsh took 17 years to reach 180,000 stars. superpowers is already at 143,712 and adding 2,299 per day. Second, leverage. What `.zshrc` changes is the look of the prompt and tab-completion. What CLAUDE.md changes is the agent's decision-making system.

Place this in a wider historical arc and three qualitative transitions appear. Era 1 was IDE plugins (VS Code extensions in the 2010s) — attaching features to a tool. Era 2 was prompt engineering (2023–2024) — exploring "how to ask so that the answer is good," but the knowledge was one-shot. It evaporated when the session ended. Era 3 is now. The user's operational knowledge is captured in a file, and that file persistently shapes the agent's behavior. Once written into CLAUDE.md, it works across every session. The knowledge does not evaporate. It crystallizes.

| | Era 1: Plugins | Era 2: Prompts | Era 3: Operational Knowledge |
|---|---|---|---|
| Period | 2010s | 2023–2024 | 2026– |
| Target | Editor | LLM | Coding Agent |
| Form of extension | Code (extension program) | Text (one-shot prompt) | Text (persistent instructions) |
| Nature of tool | Neutral (reflects user input) | Reactive (answers questions) | Autonomous (judges from instructions) |

The pivotal difference is autonomy. The IDE does what the user tells it. The LLM answers what the user asks. The coding agent, given a goal, judges and acts on its own. Autonomous tools need to be given "judgment criteria," not "features." That is why the form of operational knowledge ended up being neither a code plugin nor a one-shot prompt, but a persistent instruction file.

---

## 3. Extending the Moat Discussion — From Individual Context to Collective Operational Knowledge

In an earlier essay, "Conditions for an Agent That Survives Being Copied," I argued for three moats: context accumulation, the feedback flywheel, and deep integration. Those three are still valid. But the April 2026 phenomenon exposes a new layer that framework misses.

**The earlier moats all operate at the individual level.** The context built up in my CLAUDE.md, the inertia of my flywheel, the integration of my workflow. Strong lock-in, but developer A's context does not transfer to developer B.

What superpowers, andrej-karpathy-skills, claude-howto, and oh-my-codex demonstrate is a different dimension. Individual operational knowledge crystallizes into a file, is shared via GitHub, and is instantly applied to thousands of users. It is the process by which individual context becomes collective knowledge.

| Layer | Earlier essay's moat | This essay's new moat |
|---|---|---|
| Unit | Individual/team | Community/ecosystem |
| Form | Tacit knowledge | Explicit knowledge |
| Storage medium | User profile, conversation history | CLAUDE.md, skills, templates |
| Transferability | None (the core of the moat) | Yes (knowledge crystallized) |
| Accumulation rate | Proportional to individual usage time | Proportional to community contribution rate |

As of April 2026, the phenomenon visible on GitHub can be summarized as a **"collective operational knowledge layer."**

```
[Individual user's context]   ← earlier essay's moat
        ↑
[Collective operational knowledge layer: superpowers, karpathy-skills, claude-howto, oh-my-codex]   ← this essay's subject
        ↑
[Harness/Agent software: Claude Code, Codex CLI]
        ↑
[Foundation Model: Opus 4.6, GPT-5.x, etc.]
```

The two layers do not oppose each other; they complement. Collective operational knowledge raises the baseline, and individual context adds personalization on top.

Concretely. A developer starts using Claude Code. They first install superpowers and copy andrej-karpathy-skills' CLAUDE.md into the project. With that, "community-validated best practices" are immediately in effect. Over a few weeks, individual context accumulates — "this project doesn't use this pattern," "this team writes review comments in Korean." At the same time, if the developer discovers new best practices, they file a PR on GitHub or build their own skills repo and share it.

The more this loop runs, the more three things strengthen simultaneously: the value of the Claude Code product, the individual user's switching cost, and the community's overall level of knowledge. A composite flywheel with three meshed wheels.

---

## 4. Two-Sided Reading: Network Effects vs. Commoditization of Best Practices

Read this far, and you may slide into the conclusion that "Anthropic is the biggest winner here." True. But only half the story.

**Reading A — Anthropic's network effect.** The better superpowers makes Claude Code work, the higher its de facto performance. The more andrej-karpathy-skills corrects the pitfalls of LLM coding, the higher user satisfaction. The lower claude-howto pushes the barrier to entry, the easier new-user acquisition. The more claudian extends the surface area into Obsidian, the larger the agent's habitat. None of this was built by Anthropic. It is the same structure as npm packages raising the value of Node.js. As CLAUDE.md becomes a de facto standard, it preempts the ecosystem. The very fact that the core artifact of andrej-karpathy-skills carries the name CLAUDE.md tells you that Anthropic's brand has become the ecosystem's default.

**Reading B — Commoditization of best practices.** The reverse reading also holds. In the past, "knowing how to use Claude Code well" was a competitive advantage that only power users possessed. People who polished their CLAUDE.md over hundreds of hours of trial and error, defined skills, optimized workflows. They got noticeably better results from the same model than beginners did. What is happening now is the democratization of that competitive advantage. Copy and paste andrej-karpathy-skills, and someone who started yesterday can apply a power user's instructions on day one. The operational knowledge that used to be scarce is being distributed for free and is losing its scarcity. Once everyone knows "how to use it well," "knowing how to use it well" is no longer a differentiator — it is the default.

The more important point: once operational knowledge is commoditized, it is not bound to a platform. As oh-my-codex proves, the same pattern applies to Codex. The methodology in superpowers — brainstorm first, plan first, verification mandatory — is general-purpose knowledge applicable to any coding agent. As long as operational knowledge is not model-bound, its accumulation need not strengthen lock-in for any particular model.

What does this mean for Anthropic? On the positive side, when the default level rises, overall product satisfaction rises and dissatisfaction-driven churn falls. On the negative side, as users internalize general-purpose operational knowledge, the friction of moving from Claude Code to Codex — or to some agent that has not yet appeared — drops.

**The reality is that Reading A and Reading B operate simultaneously.** Network effects and commoditization are not contradictions. They are two sides of the same phenomenon. In the short term, Reading A dominates — CLAUDE.md as a name is locked into the ecosystem, skills are optimized for Claude Code, and migrating away requires translating every accumulated skill and template into the new environment. In the long term, Reading B may rise. oh-my-codex is the first signal in that direction. "Superpowers for every coding agent" appearing may only be a matter of time. Which side prevails cannot be judged today. We need data from three and six months out.

---

## 5. Why Now, Why All at Once — and Open Questions

Five repos trending in the same week is not coincidence. Three structural conditions met simultaneously.

**First, the user population for coding agents reached a critical mass.** For meta-tools to become necessary, the base tool needs enough users. oh-my-zsh emerged only after Zsh users crossed a certain threshold. superpowers' 143,712 stars suggest that the number of people who have tried this tool is in the hundreds of thousands at minimum.

**Second, the gap between "knowing how to use it well" became visible.** The productivity gap between a first-time coding-agent user and someone who has used it for six months is large enough to be felt directly. The Maganti case I cited earlier — same person, same model, same project, first attempt (no operational knowledge) was scrapped wholesale, second attempt (after operational knowledge had accumulated) shipped successfully — illustrates this.

**Third, the removal of sharing friction.** GitHub has served as a code-sharing infrastructure for more than 20 years, but the arrival of the CLAUDE.md file format enabled a new kind of sharing. Not code, but knowledge. Previously, sharing operational knowledge meant writing a blog post, reading it, interpreting it, and manually applying it. High friction. CLAUDE.md removed that friction. The three steps of "read, understand, apply" collapsed into the single step of "copy and paste." The removal of that friction is what blew up the sharing rate.

There are practical implications for developers who write code every day. Invest in your CLAUDE.md — if you are running Claude Code with an empty CLAUDE.md, you are wasting a meaningful portion of its performance. Fork andrej-karpathy-skills and adapt it to your project's context; when an interaction with the agent makes you think "that's not what I wanted," fold the lesson back in. Commit CLAUDE.md to Git and log your reasons for changes — once that history accumulates, it becomes your team's record of how it operates agents. And as agents grow more powerful, strengthen the hooks that constrain their behavior. This is permission management and risk management at once.

On top of that summary, the open questions.

**Question 1 — Will the operational-knowledge layer be model-bound or generalized?** Right now superpowers is optimized for Claude Code, and oh-my-codex for Codex. Will "a general-purpose operational-knowledge framework applicable to every coding agent" emerge? If it generalizes, lock-in weakens. If the separation holds, each ecosystem's lock-in strengthens.

**Question 2 — Will CLAUDE.md become the standard?** Claude Code uses CLAUDE.md; Codex uses AGENTS.md. Just as HTML became the web's standard, will a standard format for agent instruction files emerge?

**Question 3 — Can the "generation" of operational knowledge be automated?** What if the agent itself observes its own operations, detects failure patterns, and automatically proposes optimal instructions? That would be the conversion of today's static knowledge into dynamic learning. The next generation of tools after superpowers may explore this direction.

**Question 4 — Are you participating in this ecosystem?** Is your CLAUDE.md empty, or does it hold operational knowledge polished over months? Are you only consuming the skills others have built, or are you returning your findings? This ecosystem grows on user contributions. When the ecosystem's level rises, so does the quality of the tools and knowledge you receive from it.

If the earlier essay's conclusion was "is your agent getting better the more you use it?", this essay adds one more. **"Is your operational knowledge crystallizing? And is that crystal reaching anyone else?"**

The moat for an agent is not in the model. It is in the operational knowledge that piles on top of the model — the layer where individual context and collective knowledge meet. During the week of April 10, 2026, five repositories pointed at that fact at the same time. How far this direction will go is still unknown. But one thing is certain — making a good model and knowing how to use a model well are entirely different capabilities, and the market for the latter is exploding right now.

---

Sources:
- [obra/superpowers](https://github.com/obra/superpowers) — GitHub, 143,712 stars, +2,299/day (as of 2026-04-10)
- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) — GitHub, 10,441 stars, +1,364/day, +2,230/week
- [luongnv89/claude-howto](https://github.com/luongnv89/claude-howto) — GitHub, 24,002 stars, +7,342/week
- [YishenTu/claudian](https://github.com/YishenTu/claudian) — GitHub, 6,815 stars, +200/day
- [Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) — GitHub, 19,938 stars, +9,737/week
- [ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) — GitHub, 180,000+ stars (comparison)
- Sebastian Raschka, [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) — the harness framework cited in the earlier essay
- Lalit Maganti, [Building syntaqlite with AI](https://lalitm.com/post/building-syntaqlite-ai/) — the operational case cited in the earlier essay
