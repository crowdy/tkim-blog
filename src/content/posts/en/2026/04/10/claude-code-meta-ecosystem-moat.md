---
title: 'The Claude Code Meta-Ecosystem Explosion — The Real Moat for Agents Is Not the Model, It Is the Operational-Knowledge Layer'
description: '"Five repositories took over GitHub Trending in the same week. Every one of them was about how to use Claude Code better. The phenomenon does not yet have a name."'
pubDate: 2026-04-10T01:26:15.490Z
lang: en
pairSlug: 'claude-code-meta-ecosystem-moat'
draft: false
---
# The Claude Code Meta-Ecosystem Explosion — The Real Moat for Agents Is Not the Model, It Is the Operational-Knowledge Layer

> "Five repositories took over GitHub Trending in the same week. Every one of them was about how to use Claude Code better. The phenomenon does not yet have a name."

---

During the week of April 10, 2026, the GitHub Trending page presented an unusual scene. When daily and weekly rankings were combined, five repositories at the top shared a single commonality. All of them were tools built to "use Claude Code — or a comparable coding agent — better."

[obra/superpowers](https://github.com/obra/superpowers) recorded 143,712 stars at +2,299 per day. It is a Shell project described as "An agentic skills framework & software development methodology that works." [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) had 10,441 stars, +1,364/day, +2,230/week. The repository's core artifact is a single CLAUDE.md file. [luongnv89/claude-howto](https://github.com/luongnv89/claude-howto) sat at 24,002 stars with +7,342 weekly. It is a collection of copy-paste templates and guides. [YishenTu/claudian](https://github.com/YishenTu/claudian) had 6,815 stars, +200/day. It is a plugin that embeds Claude Code inside an Obsidian vault. And [Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) hit 19,938 stars with +9,737/week — the second-fastest-growing repo across all of GitHub that week. This one is aimed at OpenAI's Codex rather than Claude Code, but the pattern is the same.

The cumulative star count across the five repos comes to 204,908. Even by a conservative tally, the stars added this week alone exceed 20,000. In the developer-tools category, simultaneous trending at this scale has no precedent. Even at the peak of the VS Code extension ecosystem, five "tools to use VS Code better" never trended in the same week. Even during the prompt-engineering boom of 2023–2024, five "how to use ChatGPT better" repos never appeared at once.

What is going on?

This essay dissects the phenomenon visible in the week of April 10, 2026. It analyzes each repo individually, situates the phenomenon within the history of developer tools, and extends the "uncloneable moat" discussion from my earlier essay by another layer. The earlier essay argued that the accumulation of individual context is the moat. This essay's argument is different — **beyond the individual's context, the collective operational knowledge of the community is forming a new layer on top of the model, and that layer itself becomes a new kind of moat.**

---

## 1. Five Repos — Individual Dissection

The five repositories are five expressions of the same phenomenon. Yet each has a distinct character. Take them one at a time.

**obra/superpowers — Productizing a methodology**

[superpowers](https://github.com/obra/superpowers) is the flagship of the week. 143,712 stars. This number alone already surpasses most programming-language frameworks. The two key words in its description, "An agentic skills framework & software development methodology that works," are skills framework and methodology.

What superpowers does is inject "skills" into Claude Code. It defines skills corresponding to the stages of software development — brainstorming, plan-writing, code review, debugging, Git worktree management — and structures the agent to invoke the right one based on context. These are not prompts. A prompt is a one-shot instruction. A skill is a structured operational directive that says "always behave this way in this kind of situation."

The more important word is methodology. superpowers is not merely a tool; it productizes a software-development methodology. "Always go through a brainstorming step." "Write a plan first and execute through subagents." "Always run verification before claiming completion." These are disciplines that human developers internalize through long experience. superpowers plants them inside the agent. The tacit knowledge of senior developers crystallized into Shell scripts and Markdown files.

The meaning of 143,712 stars is that demand for this methodology is enormous. Claude Code is powerful on its own, but the answer to "how should I use Claude Code?" is not adequately covered in official documentation. superpowers fills that gap.

**forrestchang/andrej-karpathy-skills — When a single file becomes the product**

[andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) is the purest example of this week's pattern. Its core artifact is a single CLAUDE.md file. It distills Andrej Karpathy's observations about the pitfalls of LLM-generated code. 10,441 stars, +1,364/day, +2,230/week.

Stop and sit with these numbers. Repositories with more than 10,000 stars sit in the top 0.01% on GitHub. The content of this repo is a single Markdown file. Not code. Not a binary. Nothing to install, build, or run. Copy the text file into your project root and you are done. Even so, more than 10,000 people starred it, and another 1,364 starred it on a single day.

What this means is clear. **The CLAUDE.md file format itself has become a product category.** In the past, there was a culture of sharing `.vimrc` and `.emacs` files in dotfiles repositories. But dotfiles repos crossing 10,000 stars was the province of a handful of legends like mathiasbynens/dotfiles (30k), and even those accumulated over years. andrej-karpathy-skills added 2,230 stars in a single week. The explosiveness is incomparable with the dotfiles culture's pace.

Why is this file so valuable? CLAUDE.md is the first file Claude Code reads when entering a project. The instructions written there shape the agent's overall behavior. The difference between a well-written CLAUDE.md and an empty one is similar to having a senior developer sitting beside you on the project — or not. Embed Karpathy's observations of LLM coding pitfalls into CLAUDE.md and the agent avoids those pitfalls in advance. One person's experience crystallized in a single file corrects the behavior of thousands of agents. Leverage of knowledge taken to its extreme.

**luongnv89/claude-howto — The industrialization of templates**

[claude-howto](https://github.com/luongnv89/claude-howto) has 24,002 stars with +7,342 weekly. "Visual, example-driven guide to Claude Code with copy-paste templates" captures the repo precisely. It is both documentation and a product at once.

Traditionally, software documentation was appended to the product. Product first, documentation following. claude-howto inverts that relationship. Here, documentation is itself the product. The original product, Claude Code, was built by Anthropic, but the knowledge product "how to use Claude Code effectively" is being built by the community. 24,002 stars show the size of market demand for that knowledge product.

The +7,342/week is especially notable. That puts it inside the top 10 on GitHub for the week. To stand shoulder to shoulder with corporate open-source frameworks, new programming languages, and breakthrough libraries — as a "copy-paste guide." That fact tells you directly what the developer ecosystem is thirsting for. Not a better model, but better ways to use the model already in hand.

**YishenTu/claudian — Expanding the agent's surface**

[claudian](https://github.com/YishenTu/claudian) has 6,815 stars, +200/day. Its character differs from the other four. It is not knowledge or methodology, but a tool that expands Claude Code's physical surface area. A plugin that embeds Claude Code inside an Obsidian vault.

Obsidian is a local, Markdown-based knowledge-management tool, widely used among developers and researchers. What claudian does is attach Claude Code directly as an AI collaborator to the note you are writing in Obsidian. The agent stops living only in the code editor and enters the user's thinking space.

The reason this matters is that it expands the agent's "habitat." Claude Code started in the terminal, extended to the editor, and is now entering knowledge-management tools. The agent is no longer activated only when you write code; it is present from the moment you begin to organize your thoughts. The earlier essay's "moat created by deep integration" finds its exact realization here. The cost of replacing an agent that lives only in the terminal is different in kind from the cost of replacing one that runs through your editor, terminal, and knowledge-management tool.

**Yeachan-Heo/oh-my-codex — Transfer of the pattern**

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) may be this week's most important data point. 19,938 stars, +9,737/week — the second-fastest-growing repo on GitHub. But it is not for Claude Code. It is for OpenAI's Codex. "OmX - Oh My codeX: Your codex is not alone. Add hooks, agent teams, HUDs."

Even the name is telling. The "Oh My" prefix comes from [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh). oh-my-zsh is a community framework for using the Zsh shell better, organizing plugins, themes, and configurations. A legendary project with over 180,000 stars. oh-my-codex's deliberate adoption of that name is a declaration of identity: "the user-knowledge layer on top of Codex."

The maintainer is the Korean developer Yeachan-Heo. Hooks, agent teams, HUD (Heads-Up Display) — these three keywords are a toolkit for turning a coding agent into an operable system. Hooks attach pre/post triggers to the agent's actions, agent teams orchestrate multiple agents, and the HUD is the interface that monitors the agent's state in real time.

The reason oh-my-codex sits at the center of this week's phenomenon is one. **The same pattern transferred to a different model.** It proves that the "meta-tool ecosystem" observed around Claude Code is not confined to Claude Code. Codex users feel the same thirst and are producing solutions of the same shape. This is not a product-level phenomenon but a category-level one. Evidence that an "operational-knowledge layer" is forming across the entire coding-agent category.

---

## 2. The Moment the CLAUDE.md File Format Became a Product

The most striking fact running through the five repos is that, for most of them, the core artifact is not code but text. andrej-karpathy-skills is a single Markdown file. The skills in superpowers are, at heart, structured directive text. claude-howto is templates to copy and paste. Not executable binaries, but readable documents are the core of the product.

To understand this you need to interrogate what the CLAUDE.md format is.

**The evolution of configuration files**

Throughout software history, "files in which users define a tool's behavior" have always existed. Unix's `.profile`, Emacs's `.emacs`, Vim's `.vimrc`, Zsh's `.zshrc`. These files share several traits. First, they adjust the tool's default behavior to the user's preferences. Second, they are shareable across users (the dotfiles culture). Third, they grow more elaborate over time — users refine them as their experience accumulates.

But `.emacs` and `.vimrc` are written in syntax that is close to machine code. To read Emacs Lisp or Vimscript you have to separately learn the tool's configuration language. There is a barrier to entry. Sharing a dotfiles repo presupposes considerable knowledge to read, understand, and adapt the configuration.

CLAUDE.md takes a decisive leap from this tradition. It is written not in code-like syntax but in natural language. "Write commit messages in English." "Write tests first, then implement." "Avoid abstract descriptions; use concrete numbers." These are not configuration but instructions. People who do not know programming languages can read and edit them. The barrier to entry has essentially disappeared.

The disappearance of that barrier explains the explosive growth of andrej-karpathy-skills. To earn 10,000 stars by uploading an `.emacs` file, the file would have to be exceptionally elaborate and broadly useful across the Emacs user base. CLAUDE.md is different. Anyone can read it, copy it, and apply it to their project immediately. The friction of consumption is near zero. So in the same window of time it reaches far more people.

**The explosive leverage of natural-language configuration**

A second property of CLAUDE.md is that the file does not merely configure the tool; it shapes the agent's "personality." `.vimrc` rebinds keys, sets up syntax highlighting, and defines tab widths. It adjusts the parameters of mechanical behaviors. CLAUDE.md sets the criteria of judgment. "When code gets long, split it into functions." "When the user asks a question, do not implement immediately; confirm the design first." These are not parameters but values. They form the agent's decision-making system.

In the harness framing from the earlier essay, CLAUDE.md is the outermost layer of the harness. The six harness elements Raschka defined — Live Repo Context, Prompt Shape, Tool Access, Context-Bloat minimization, Session Memory, Bounded Subagents — operate mainly at the software layer. CLAUDE.md is the crystallization of human knowledge laid on top of that software layer. If the harness structures the agent's "how," CLAUDE.md prescribes the agent's "what" and "why."

That andrej-karpathy-skills earned 10,000 stars implies a severe shortage of answers to that "what" and "why." Anthropic built a powerful engine and harness in Claude Code, but the operational knowledge for "how to drive this engine best" is being built by the community itself. The user of the model, not the maker, has become the supplier of knowledge.

**The economics of a single file**

Add one more lens. The heart of andrej-karpathy-skills is a single CLAUDE.md file. The file is on the order of a few kilobytes. Think about the economic value this file produces.

Suppose this file prevents the Claude Code agent from making a common mistake once per session. Debugging that mistake would have cost 30 minutes. If 10,000 developers apply this file and each benefits once per week, that is 5,000 developer-hours saved per week. At $50/hour, that is $250,000 per week. Annualized, $13,000,000. From a single Markdown file.

The calculation may be overstated. The real effect is probably smaller. But the direction is correct. The value produced by the crystallization and sharing of operational knowledge has the same structure as the value of a code library. One person's experience captured in a file, then duplicated to n people, multiplies value n-fold. Where traditional libraries enabled "code reuse," the CLAUDE.md ecosystem enables "operational-knowledge reuse."

---

## 3. Historical Analogies: oh-my-zsh, .emacs, .vimrc — User-Knowledge Layers on Top of Tools

Is the phenomenon unprecedented? No. Similar structures existed before. But the scale and speed have changed.

**oh-my-zsh — The most precise analogy**

[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) was started in 2009. It wraps the Zsh shell in a framework that systematically manages plugins, themes, and configurations. With more than 180,000 stars today, it is one of the most-starred projects on GitHub.

What oh-my-zsh did for Zsh is exactly what superpowers does for Claude Code. The shell is powerful on its own, but most users do not exercise even 10% of that power. They do not know what options exist, which plugins are useful, or which settings transform their workflow. oh-my-zsh systematized the community's collective knowledge so that beginners can use advanced features immediately.

Compare the structures.

| | Zsh + oh-my-zsh | Claude Code + superpowers |
|---|---|---|
| Base tool | Zsh shell | Claude Code |
| Knowledge layer | oh-my-zsh plugins/themes/configs | superpowers skills/methodology |
| Config file | .zshrc | CLAUDE.md |
| Core value | Crystallized know-how for the shell | Crystallized know-how for the agent |
| Sharing mechanism | GitHub dotfiles repos | GitHub skills repos |
| User customization | Toggle plugins, pick themes | Add/remove skills, edit instructions |

The analogy is almost perfect structurally. Two decisive differences remain.

First, speed. oh-my-zsh took 17 years to reach 180,000 stars. superpowers is already at 143,712 and adding 2,299 per day. At that rate it could close the gap with oh-my-zsh in a few years. There is a correction factor — GitHub itself had far fewer users in the oh-my-zsh era — but the speed gap is clear.

Second, the magnitude of leverage. `.zshrc` settings change the shell's visual presentation (the prompt), the behavior of completion, history management, and so on. Useful, but the actual work the shell performs is not fundamentally changed. Run `ls`, and `ls` runs. CLAUDE.md, by contrast, changes the agent's decision-making system. The same "refactor this code" request produces entirely different results depending on what CLAUDE.md says. The radius of impact is in a different league.

**Emacs's .emacs — The tower of the Lisp wizard**

Emacs is the tool that pushed the philosophy of "extensible text editor" to its limit. Through `.emacs` (or `init.el`) in Emacs Lisp, virtually unlimited customization is possible. The editor can become an email client, a web browser, a file manager — even an operating system. The saying goes, "Emacs is not a text editor, it's a Lisp interpreter that happens to edit text."

In the Emacs ecosystem, `.emacs` was the user's identity. An `.emacs` polished over years carried the user's working style, way of thinking, even their aesthetic sense. The half-joking line "show me your .emacs and I'll tell you what kind of developer you are" had real currency.

But `.emacs` had a barrier-to-entry problem. Without knowing Emacs Lisp, you could not understand someone else's configuration. Even copying it over might lead to conflicts or unintended behavior if you did not understand why a setting was structured that way. Effectively, sharing configurations required the same level of Emacs Lisp fluency in the receiver.

CLAUDE.md solves this with natural language. "Avoid abstract descriptions; use concrete numbers" is readable by people who do not know programming languages. CLAUDE.md is `.emacs` with the barrier-to-entry removed. And once the barrier disappears, the sharing rate explodes. andrej-karpathy-skills receiving 2,230 stars in a week is a cross-section of that explosion.

**Vim's .vimrc — The religion of efficiency**

Vim users polished their `.vimrc` with near-religious devotion. A single keybinding or mapping could mean a difference of seconds, and that difference repeated thousands of times a day produced meaningful productivity gaps. "I don't use hjkl; I use jkl;" could spark debates with the heat of political statements.

What stands out about the `.vimrc` culture is the deep dependence of the optimal configuration on the user's context. A Python developer's `.vimrc` and a C++ developer's `.vimrc` are entirely different. So are the configurations of someone who works in a terminal versus someone who prefers a GUI. A universally "best" `.vimrc` did not exist.

A similar divergence is starting in the CLAUDE.md ecosystem. andrej-karpathy-skills offers general guidance, but in practice CLAUDE.md has to vary with project nature. Optimal instructions differ between front-end projects and systems programming. They diverge by team size, coding convention, and testing strategy. The same divergence that played out in `.vimrc` is being accelerated in CLAUDE.md.

**The shared structure of three generations and their decisive differences**

`.emacs` → `.vimrc` → `.zshrc` → CLAUDE.md. What is consistent along this evolutionary line is that a file in which users define a tool's behavior has always existed. As tools grew more powerful, the importance of this file grew, and a culture of sharing it formed.

The decisive distinctions of the CLAUDE.md generation are three.

First, natural language. Earlier generations of configuration files required dedicated syntax or programming languages. CLAUDE.md is written in everyday language. The friction of sharing has dissolved.

Second, radius of impact. Earlier configurations changed a tool's appearance or mechanical behavior. CLAUDE.md changes the agent's judgment system. The same request can yield entirely different outputs. The importance of configuration is in a different league.

Third, economic value. If `.vimrc` goes wrong, at worst your key bindings get tangled. If CLAUDE.md goes wrong, the agent can plant structural problems in your codebase. Conversely, when CLAUDE.md is well written, the agent's productivity rises noticeably. The correlation between this file's quality and economic outcomes is stronger than for any previous configuration file.

Combined, these three differences are producing the explosive growth of the CLAUDE.md ecosystem. Anyone can use it, the effect is large, and it is easy to share. The three conditions for viral diffusion are met simultaneously.

---

## 4. The Meaning of oh-my-codex — The Same Pattern Transferred to a Different Model

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) deserves a deeper look. This repo is the key to this week's phenomenon.

**Surface facts**

oh-my-codex is a tool for OpenAI's Codex CLI. It adds hooks, agent teams, and a HUD. 19,938 stars at +9,737/week. The second-fastest-growing repo on GitHub this week. The maintainer is Korean developer Yeachan-Heo.

**Why this repo matters — evidence of a category**

If only superpowers, andrej-karpathy-skills, claude-howto, and claudian had trended, the phenomenon could have been read as a "Claude Code special case." The story would be that Anthropic built an unusually good product and users are enthusiastic about it. A product-level story.

oh-my-codex makes that interpretation untenable. The same pattern is occurring inside OpenAI's Codex. Codex and Claude Code are competing products. Different companies, different foundation models, different architectures. And users are producing solutions of the same shape.

This is not a product-level phenomenon but a **category-level** one. The coding-agent category itself demands an "operational-knowledge layer," and the user community is forming that layer independently.

**The precision of the oh-my-zsh analogy**

The name oh-my-codex is not accidental. It deliberately borrows the structure of oh-my-zsh. Just as oh-my-zsh laid a community-knowledge layer on top of Zsh, oh-my-codex lays one on top of Codex.

Why did oh-my-zsh succeed? Zsh was powerful, but most users never left the defaults. Hundreds of useful features were buried in documentation. What oh-my-zsh did was excavate those buried features, systematize them, package them as plugins, and let beginners use them immediately with a single installation command. The community built the "system for using" that the toolmaker had not built (or chosen not to build).

The same dynamics play out in the coding-agent ecosystem. Claude Code's and Codex's official documentation cover only basic usage. The answer to "how do I use this tool to maximize productivity" is not officially provided anywhere. superpowers is filling that gap on the Claude Code side; oh-my-codex is filling it on the Codex side.

**The meaning of hooks — the start of agent governance**

Among the three core features of oh-my-codex, focus on hooks. Hooks are a mechanism that runs user-defined logic before or after the agent performs certain actions. For instance, requiring confirmation before the agent deletes a file, forcing a lint run before a commit, or blocking writes to a specific directory.

This is, in effect, governance for the agent. The user controls in detail what the agent can and cannot do. It is a user-side extension of the harness elements — Tool Access and Validation — discussed in the earlier essay. If Anthropic's harness provides the basic safety apparatus, oh-my-codex's hooks let users install additional governance fitted to their environment.

The emergence of this governance layer signals that the coding agent is shifting from "tool" to "system." A tool is operated directly by the user. A system acts autonomously but is constrained by policy. Hooks are the mechanism by which users define that policy.

**Agent teams and HUD — From single agent to agent system**

oh-my-codex's agent-teams feature creates a structure for coordinating multiple agents rather than a single one. One agent handles design, another implementation, another testing. It projects the structure of a human development team onto an agent system.

The HUD (Heads-Up Display) is the interface that lets users observe the agent system's state in real time. Which agent is doing what, where the bottleneck is, how far along the work has progressed — all visualized.

Agent teams + HUD imply that the coding-agent usage paradigm is evolving from "a 1:1 conversation between me and an agent" to "me, as a manager, running an agent team." What this evolution needs is not a stronger model. It is the operational knowledge for running an agent team effectively. Who to deploy when, in what order to proceed, on what criteria to review the result. This is the knowledge of project management.

What oh-my-codex does is tool-ify that operational knowledge. The 19,938 stars say demand for that tool-ification is enormous.

---

## 5. The Limits and Extension of the Earlier Moat Discussion — From Individual Context to Collective Operational Knowledge

In the earlier essay, "Conditions for an Agent That Survives Being Copied," I argued for three moats. First, the accumulation of context — the personalized knowledge built up through user interaction cannot be cloned. Second, the feedback flywheel — the loop of output → reaction → learning → improvement accelerates with time. Third, deep integration — once the agent becomes the glue of a workflow, replacement cost grows exponentially.

Those three moats are still valid. But the phenomenon of the week of April 10, 2026, exposes a new layer the framework misses.

**The limit of the earlier discussion — moats trapped at the individual level**

All three of the earlier moats operate at the individual or team level. The context built up in my CLAUDE.md, the inertia of my flywheel, the integration of my workflow. They produce strong lock-in but are tied to each user's individual experience. Developer A's context does not transfer to developer B. Each person's moat is theirs alone.

What superpowers, andrej-karpathy-skills, claude-howto, and oh-my-codex demonstrate is a different dimension. Individual operational knowledge crystallizes into a file, is shared via GitHub, and is instantly applied to thousands of users. It is the process by which individual context becomes collective knowledge.

Organized:

| Layer | Earlier essay's moat | This essay's new moat |
|---|---|---|
| Unit | Individual/team | Community/ecosystem |
| Form | Tacit knowledge | Explicit knowledge |
| Storage medium | User profile, conversation history | CLAUDE.md, skills, templates |
| Transferability | None (the core of the moat) | Yes (knowledge crystallized) |
| Accumulation rate | Proportional to individual usage time | Proportional to community contribution rate |

**A new layer: collective operational knowledge**

As of April 2026, the phenomenon visible on GitHub can be summarized in a single concept: **the collective operational knowledge layer.** This layer sits on top of the model and alongside individual context.

The structure:

```
[Individual user's context]   ← earlier essay's moat
        ↑
[Collective operational knowledge layer: superpowers, karpathy-skills, claude-howto, oh-my-codex]   ← this essay's subject
        ↑
[Harness/Agent software: Claude Code, Codex CLI]
        ↑
[Foundation Model: Opus 4.6, GPT-5.x, etc.]
```

Once individual context accumulates, it cannot be transferred — that was the earlier essay's moat. Collective operational knowledge, once accumulated, is immediately shareable — that is this essay's new finding. The two layers do not oppose each other; they complement. Collective operational knowledge raises the baseline, and individual context adds personalization on top of that baseline.

Apply andrej-karpathy-skills and every user's Claude Code experience steps up. That is the role of collective operational knowledge. On top of that, when an individual user polishes their own CLAUDE.md, the experience steps up again. That is the role of individual context.

**Implication — when the two moats combine**

The earlier essay claimed that "when the feedback flywheel and deep integration combine, the moat is complete." This essay adds one more dimension. When the moat of individual context and the moat of collective operational knowledge combine, an ecosystem-level moat forms.

Concretely. A developer starts using Claude Code. They first install superpowers and copy andrej-karpathy-skills' CLAUDE.md into the project. With that, "community-validated best practices" are immediately in effect. Over a few weeks of use, individual context accumulates — "this project doesn't use this pattern," "this team writes review comments in Korean." At the same time, if the developer discovers new best practices, they file a PR on GitHub or build their own skills repo and share it. That act contributes to the collective operational knowledge layer.

The more this loop runs, the more three things strengthen simultaneously: the value of the Claude Code product, the individual user's switching cost, and the community's overall level of knowledge. A composite flywheel with three meshed wheels.

---

## 6. Two-Sided Reading: Anthropic's Network Effect vs. Commoditization of Best Practices

Read this far, and you may slide into the conclusion that "Anthropic is the biggest winner here." The better Claude Code is used, as crystallized and shared by the community, the higher the value of Claude Code, the more users it attracts, and the more operational knowledge accumulates. A textbook network effect. True. But only half the story.

**Reading A — Anthropic's network effect**

The reading is intuitive. The better superpowers makes Claude Code work, the higher its de facto performance. The more andrej-karpathy-skills corrects the pitfalls of LLM coding, the higher Claude Code users' satisfaction. The lower claude-howto pushes the barrier to entry, the easier new-user acquisition. The more claudian extends the surface area into Obsidian, the larger Claude Code's habitat.

None of these were built by Anthropic. Community creations are voluntarily raising Anthropic's product value. The same structure by which Android app developers raised Google's platform value. The same structure by which npm packages raised Node.js's value. A platform's value scales with the depth of the ecosystem above it.

A second point: the CLAUDE.md file format is becoming a de facto standard. Competitors — OpenAI's Codex, for example — support similar agent-instruction files (AGENTS.md, etc.), but the name CLAUDE.md is preempting the ecosystem. That andrej-karpathy-skills' core artifact carries the name CLAUDE.md is itself evidence that Anthropic's brand has become the ecosystem's default.

Under this lens, Anthropic's strategic position is exceptionally strong. Lead in model performance + quality of the harness + the operational-knowledge layer built by the community = a composite moat. Even if competitors close the gap in model performance, as long as 143,712 stars' worth of superpowers and 10,441 stars' worth of andrej-karpathy-skills are anchored to the Claude Code ecosystem, the user's default stays inside Claude Code.

**Reading B — Commoditization of best practices**

But the reverse reading also holds. This reading is more subtle and may be more important.

What superpowers, andrej-karpathy-skills, and claude-howto are doing is making "how to use Claude Code well" accessible to anyone. In the past, only power users held that knowledge. People who polished their CLAUDE.md over hundreds of hours of trial and error, defined skills, optimized workflows. They got noticeably better results from the same model than beginners did. That gap was the power user's competitive advantage.

What is happening now is the democratization of that competitive advantage. Copy and paste andrej-karpathy-skills, and someone who started yesterday can apply a power user's instructions on day one. Install superpowers, and the discipline of years of software-development practice is automatically planted in the agent.

This is commoditization of best practices. Operational knowledge that used to be scarce is being distributed for free over GitHub and is losing its scarcity. The information asymmetry that power users enjoyed dissolves. Once everyone knows "how to use it well," "knowing how to use it well" is no longer a differentiator. It becomes the default.

What does this mean for Anthropic? Two directions of implication.

First, positive. When the default level rises, overall product satisfaction rises. Dissatisfaction-driven churn falls. More users have a good experience with Claude Code and keep their subscriptions.

Second, negative. Once operational knowledge is commoditized, it is not bound to a platform. As oh-my-codex proves, the same pattern applies to Codex. The methodology in superpowers — brainstorm first, plan first, verification mandatory — is not valid only for Claude Code. It is general-purpose knowledge applicable to any coding agent. As users internalize this general-purpose knowledge, the friction of moving from Claude Code to Codex — or to some agent that has not yet appeared — drops. As long as operational knowledge is not bound to a model, its accumulation need not strengthen lock-in for any particular model.

**Both sides operate simultaneously**

The reality is that Reading A and Reading B operate at the same time. Network effects and commoditization are not contradictions. They are two sides of the same phenomenon.

In the short term Reading A dominates. CLAUDE.md as a name is locked into the ecosystem, superpowers' skills are optimized for Claude Code, claude-howto's templates are written to Claude Code's syntax. Moving to a different agent means converting every accumulated skill and template into the new environment. That is the switching cost.

In the long term Reading B may rise. Once operational knowledge is sufficiently systematized and abstracted, a general-purpose framework not tied to any particular tool may emerge. oh-my-codex is already the first signal in that direction. "Superpowers for every coding agent" appearing instead of "superpowers for Claude Code" may only be a matter of time.

**How this reading connects to the earlier essay's lock-in discussion**

In the earlier essay, "The Cracks in LLM Lock-in," I wrote that "the premise of all-in on a single model is wavering." This week's phenomenon shows another face of those cracks. When operational knowledge is crystallized and shared, the friction of moving between models drops. Conversely, when the ecosystem's network effect grows, the cost of leaving a given model's ecosystem rises. The two forces pull in opposite directions. Which side prevails cannot be judged today. We need data from three and six months out.

---

## 7. Implications for Practitioners

What does this phenomenon mean for the developers, team leads, and engineering managers who write code every day? Going beyond abstract ecosystem analysis, let us derive concrete actions.

**Implication 1 — Invest in CLAUDE.md (or the agent's equivalent instruction file)**

andrej-karpathy-skills' 10,441 stars say that this one file determines a meaningful portion of the agent experience. Running Claude Code with an empty CLAUDE.md is throwing away a meaningful portion of its performance. It is a V8 engine running in first gear.

Concrete action: fork andrej-karpathy-skills and place it at the project root, but do not use it as-is. Adapt it to the project's context. Add the team's coding conventions, testing strategy, commit-message rules, and review criteria. Update the file regularly — when an interaction with the agent makes you think "that's not what I wanted," fold the lesson back into CLAUDE.md.

**Implication 2 — Adopt skills and methodology separately**

superpowers includes both skills (individual capabilities) and methodology (workflow). Adopting the two separately matters. Skills are relatively easy to add and remove. If a particular skill does not fit the current project, you can turn it off. Methodology changes how you work, so it requires team consensus.

Concrete action: review the list of superpowers skills and prioritize the ones that map to areas that recur as friction in your current workflow. If code reviews are perpetually thin, adopt the code-review skill first; if debugging eats your time, adopt systematic-debugging first. Treat methodology adoption as a separate team conversation.

**Implication 3 — Start versioning your operational knowledge**

CLAUDE.md should be versioned like code. There is no guarantee that today's effective instructions are still effective in three months. As the model updates, optimal instructions shift. As the team grows, conventions shift. As the project phase changes, the needed agent behavior changes.

Concrete action: commit CLAUDE.md to Git and write the reason for each change into the commit message. For example, "agent kept generating code without tests, so adding a 'write tests first' instruction." Once that history accumulates, it becomes the team's record of how it operates agents.

**Implication 4 — Configure hooks**

oh-my-codex put hooks at the center for a reason. As agents grow more powerful, the mechanisms that constrain their behavior must grow stronger too. This is a problem of permission management and risk management.

Concrete action: define files and directories the agent must never touch (production config, auth keys, database migrations). Set hooks that require confirmation before the agent calls external services. Set hooks that halt the agent before it tries to make changes of more than a certain scope in one shot.

**Implication 5 — Watch the ecosystem**

Five meta-tools trending in the same week — April 10, 2026 — is a signal that this category is growing fast. Tomorrow another tool will appear. The agent-operations tooling landscape is changing rapidly.

Concrete action: check GitHub Trending's developer-tools category regularly. Subscribe to release notes for repos like superpowers and oh-my-codex. Create a team channel for sharing useful new tools in this space.

**Implication 6 — Give your operational knowledge back**

This ecosystem grows on user contributions. The effective agent-operation pattern you found on your project is likely useful to someone else. Distill it into a CLAUDE.md snippet and share it; the ecosystem's overall level rises. It is altruistic and self-interested at once — when the ecosystem's level rises, so does the quality of the tools and knowledge you receive from it.

---

## 8. Structural Reading — Why Now, Why All at Once

Can we explain structurally why five repositories trended in the same week? The success of each repo has its own particulars, but the simultaneity is not coincidence. Three structural conditions sit behind it.

**Condition 1 — The user population for coding agents reached a critical mass**

Since Claude Code launched, its user base has grown steadily. But for "meta-tools" to become necessary, the base tool needs enough users. oh-my-zsh emerged only after Zsh users crossed a certain scale. The npm package ecosystem exploded only after Node.js crossed its threshold.

The April 2026 snapshot suggests coding-agent users have crossed that threshold. Exact numbers are not public, but indirect evidence exists. superpowers' 143,712 stars suggest that the number of people who have ever tried this tool is in the hundreds of thousands at minimum (people who star are only a fraction of actual users).

**Condition 2 — The gap between "knowing how to use it well" became visible**

The productivity gap between a first-time coding-agent user and someone who has used it for six months is large enough to be felt directly. The Maganti case I cited in the earlier essay illustrates this — the same person, same model, same project, first attempt (no operational knowledge) was scrapped wholesale as spaghetti code, second attempt (after operational knowledge had accumulated) shipped successfully.

As that gap becomes visible, demand for "how to use it well" explodes. andrej-karpathy-skills' +2,230/week and claude-howto's +7,342/week are expressions of that demand. Users want to cut down on trial and error and pull in someone else's validated operational knowledge fast.

**Condition 3 — The maturation of sharing infrastructure**

GitHub has served as code-sharing infrastructure for more than 20 years, but the arrival of the CLAUDE.md format enabled a new kind of sharing. Not code, but knowledge — and natural-language knowledge at that.

Previously, sharing operational knowledge required writing a blog post. The reader had to read a long piece, interpret it for their own environment, and apply it manually. High friction. CLAUDE.md removed that friction. Copy one file and it is applied immediately. The three steps of "read, understand, apply" collapsed into the single step of "copy and paste." The removal of that friction is what blew up the sharing rate.

The three conditions — user population reaching a critical mass, the gap becoming visible, and the removal of sharing friction — were met simultaneously in the week of April 10, 2026. That is why five repos exploded in the same week.

---

## 9. IDE Plugins, Prompt Engineering, and Operational Knowledge — Three Eras Compared

Place this phenomenon in a wider historical context. The way developer tools "extend" has gone through three qualitative transitions.

**Era 1: IDE plugins (VS Code extensions in the 2010s)**

After VS Code opened its Extension API, tens of thousands of extensions poured in. Prettier, ESLint, GitLens, Live Share. These extensions added features to the editor. Syntax checking, formatting, version-control integration, collaboration. The essence of extensions is "attaching features to a tool."

The core assumption of this era is that the tool is neutral. VS Code is a general-purpose editor that can edit Python, JavaScript, or Rust equally. Extensions layer specialized features on top of that generality. The tool has no "judgment." The editor faithfully reflects the user's keystrokes.

**Era 2: Prompt engineering (2023–2024)**

After ChatGPT, users began exploring "how should I ask so that the answer is good?" Prompt engineering became a discipline. Prompt tips were shared on Twitter, and "best prompts for coding" appeared as GitHub gists.

The core of this era is that the knowledge was one-shot. "To induce chain-of-thought, append 'Let's think step by step'" is a tip, not a system. Apply it once and you are done. You have to remember and apply it again in the next conversation. The knowledge of prompt engineering lived in the user's head and was not reflected in the tool. It evaporated at the end of a session.

**Era 3: Crystallization of operational knowledge (2026)**

What is happening now is qualitatively different. The user's operational knowledge is captured in a file, and that file persistently shapes the agent's behavior. Once written into CLAUDE.md, it works across every session. Once defined as a skill in superpowers, it is callable across every project. The knowledge does not evaporate. It crystallizes.

The three eras compared:

| | Era 1: Plugins | Era 2: Prompts | Era 3: Operational Knowledge |
|---|---|---|---|
| Period | 2010s | 2023–2024 | 2026– |
| Target | Editor | LLM | Coding Agent |
| Form of extension | Code (extension program) | Text (one-shot prompt) | Text (persistent instructions) |
| Nature of tool | Neutral (reflects user input) | Reactive (answers questions) | Autonomous (judges from instructions) |
| Knowledge persistence | Permanent (kept after install) | Temporary (lost at session end) | Permanent (crystallized in file) |
| Unit of sharing | Package (.vsix) | Text snippet | Instruction file (CLAUDE.md) |
| Leverage | Adding features | Improving answer quality | Changing the agent's behavior system |

The pivotal difference in Era 3 is that the tool is autonomous. IDE: does what the user tells it. LLM: answers what the user asks. Coding agent: given a goal, judges and acts on its own. Autonomous tools need "judgment criteria," not "features." That is why the form of operational knowledge ended up being neither a code plugin nor a one-shot prompt, but a persistent instruction file.

From this perspective, the five repos of April 2026 are the official opening of Era 3. The way developer tools extend is shifting from "feature attachment" to "operational-knowledge injection."

---

## 10. Open Questions — Where Does This Explosion Lead?

Summarizing the phenomenon of the week of April 10, 2026:

One, the coding-agent meta-tool ecosystem is growing explosively. Five repos trended in the same week, with a combined star count of over 200,000.

Two, the core artifact of this ecosystem is operational knowledge, not code. CLAUDE.md files, skill definitions, copyable templates — natural-language knowledge has taken the form of a product.

Three, the same pattern is occurring not only around Claude Code but around Codex (oh-my-codex). This is a category-level phenomenon, not a product-level one.

Four, the phenomenon is forming a new kind of moat. On top of the individual-context moat from the earlier essay, a collective-operational-knowledge moat is being added. At the same time, the commoditization of best practices is in progress, leaving room for operational knowledge to be unbound from any particular platform.

On top of that summary, the open questions.

**Question 1 — Will the operational-knowledge layer be model-bound or generalized?**

Right now superpowers is optimized for Claude Code. oh-my-codex is optimized for Codex. They share a structure but are incompatible. Will that separation persist? Or will a general-purpose operational-knowledge framework applicable to every coding agent emerge?

If it generalizes, the operational-knowledge layer weakens model lock-in — the same skills can be applied to any agent. If the separation persists, each model's ecosystem lock-in strengthens — to move my skills, I have to rewrite them all.

**Question 2 — How will Anthropic handle this ecosystem?**

So far Anthropic has moved in a direction that encourages the CLAUDE.md and skills ecosystem. But as the ecosystem grows, the problem of control arises. Community-made skills may bypass the model's limits or weaken safety mechanisms. Will Anthropic formally curate this ecosystem, leave it alone, or allow it only within bounds?

You can call up the difference between Apple's App Store strategy (strict review and control) and Google's Play Store strategy (more open). Which side Anthropic picks will shape the ecosystem's character.

**Question 3 — Will CLAUDE.md become the standard?**

Today Claude Code uses CLAUDE.md, Codex uses AGENTS.md, and other tools each use their own formats. Will these converge? Just as HTML became the web's standard markup and Dockerfile became the container's standard format, will a standard format for agent-instruction files emerge?

If a standard emerges, the portability of operational knowledge rises. The instruction file you wrote once can be used across multiple agents. That is a win for users and a threat to any particular vendor's lock-in.

**Question 4 — Beyond "applying" operational knowledge, can we automate its "generation"?**

Today's operational knowledge is written by humans. Karpathy observes, someone organizes, and it lands on GitHub. But can the agent itself observe its own operations, detect failure patterns, and propose optimal instructions automatically?

"In this session, the agent repeated the same mistake three times. Should I add the following to CLAUDE.md: 'whenever a function exceeds 20 lines, split it'?" — if such feedback is generated automatically, that is the conversion of today's static knowledge into dynamic learning. The next generation of tools after superpowers may explore this direction.

**Question 5 — Are you participating in this ecosystem?**

The last question goes directly to the reader. Is your CLAUDE.md empty, or does it hold operational knowledge polished over months? Are you only consuming the skills others have built, or are you returning your findings?

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
