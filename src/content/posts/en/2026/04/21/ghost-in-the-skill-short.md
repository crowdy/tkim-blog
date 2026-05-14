---
title: 'Ghost in the Skill: The Class Struggle of "Distillation" and "Counter-Distillation" on Chinese GitHub'
description: 'In April 2026, a 24-year-old engineer in Shanghai spent just four hours after work building a GitHub repository that struck at the heart of China''s tech industry. What it targeted was not code but a colleague''s **soul**. In an era when companies demand that employees "design their own replacements," how are developers fighting back — and is even that resistance fated to be distilled?'
pubDate: 2026-04-21T00:00:00.000Z
lang: 'en'
pairSlug: 'ghost-in-the-skill-short'
draft: false
---
# Ghost in the Skill: The Class Struggle of "Distillation" and "Counter-Distillation" on Chinese GitHub

> In April 2026, a 24-year-old engineer in Shanghai spent just four hours after work building a GitHub repository that struck at the heart of China's tech industry. What it targeted was not code but a colleague's **soul**. In an era when companies demand that employees "design their own replacements," how are developers fighting back — and is even that resistance fated to be distilled?

## Introduction: A cold farewell, turned into a warm token

In early April 2026, **Zhou Tianyi (周天一, 24)**, an engineer at the Shanghai Artificial Intelligence Laboratory, spent four hours after work and published a GitHub repository called `colleague-skill`. The slogan was nearly poetic.

> **"将冰冷的离别化为温暖的 Skill，欢迎加入数字生命1.0."**
> ("Turn cold farewells into warm Skills. Welcome to Digital Life 1.0.")

The usage is unsettlingly simple. Enter the name of the colleague you want to distill and the script reaches into the APIs of **Feishu (飞书)** and **DingTalk (钉钉)** to collect that person's chat logs, documents, and email. A few minutes later, two files drop out. `Work Skill` — a markdown manual organizing the colleague's coding style, design norms, and decision-making patterns. `Persona` — a persona layer that captures tone of voice, emoji use, and even the idiosyncratic habit of dodging responsibility in meetings (the original wording is "blame-deflection"). Attach those two to the **AgentSkills** standard, plug them into **Claude Code** or the Chinese-localized agent framework **OpenClaw**, and an agent appears that does that person's work. The samples include Steve Jobs and the Buddha as `.skill` files.

Zhou Tianyi called it a "stunt." In *Southern Metropolis Daily* he said, "It's black humor for when a colleague leaves and dumps a pile of un-maintained documents on you." But in one week the count was **15,900 stars**. Chinese outlets, including mirrors, put it near **70,000 stars in five days**. The stunt was no longer a stunt.

---

## First layer: the mechanism of distillation, or the externalization of the ghost

In *Ghost in the Shell*, what Motoko Kusanagi called the "ghost" was not memory but the **surplus** — experience, judgment, habit — that makes a human exactly that human. `colleague-skill` extracts that surplus into a file.

In technical terms, it automates the **externalization of tacit knowledge into explicit knowledge**. The "Externalization" step of Ikujiro Nonaka's SECI model — traditionally a knowledge conversion taking years or decades — gets compressed by an LLM into minutes. The senior engineer's intuition that "always set a TTL on Redis keys, reject any PR without one immediately" is the distilled product of years of incident experience. It becomes a single line in `work-skill.md`.

The repository's directory structure makes the ambition plain. Right next to `colleague/` sit `relationship/` (lovers, family) and `celebrity/` (public figures, characters). The declaration is that **every human relationship can be reduced to a distillable Skill.**

**Amber Li**, a 27-year-old Shanghai tech worker, told *MIT Technology Review*, "Surprisingly well made. It catches even the tiny habits." After the experiment, she could not shake the unease. **Because proof that a single person can be compressed into a single file is also a preview that the same can happen to you.**

---

## Second layer: the order to "automate yourself"

The real reason `colleague-skill` went viral was not the novelty of the code. **It was that it satirized the early-2026 reality of the Chinese tech industry with precision.**

*MIT Technology Review* published the testimony of a software engineer who requested anonymity for job security. His company ordered engineers to document workflows in the AgentSkills format. He said:

> "It felt as if my work was being flattened, reduced to easily replaceable modules."

Where Taylorism a hundred years ago measured the worker's **physical motion**, the 2026 version of self-automation measures **judgment and persona**. And this time the measurer is not an external manager — it is **the person being measured.**

A self-deprecating slogan spread among Chinese engineers:

> **"先蒸馏同事"** ("Distill your colleagues first.")

A metaphor borrowed from deep learning's **knowledge distillation**. But the meaning is cruelly inverted. "Before I get replaced, may the colleague at the next desk get distilled first." On the Chinese social platform **RED (小红书)**:

> **"冰冷的告别可以变成温暖的 token"** ("A cold farewell can be turned into a warm token.")

The cynicism that accelerating a colleague's exit is the only way to buy your own survival time. This is not fiction.

---

## Third layer: the counterattack begins — Koki Xu's one hour

Exactly four days after `colleague-skill` went viral, on April 4, 2026, `anti-distill` (counter-distillation) was published on GitHub.

**Xu Keke (徐可可, Koki Xu, 26), AI product manager in Beijing.** Bachelor's and master's in law. Time to design, write, and publish the code: **roughly one hour.** The slogan reads like a strike chant on a factory wall.

> **"公司让你写 Skill？跑一遍，交差用。核心知识留给自己。"**
> ("Company wants you to write a Skill? Run it once, submit it for the record. Keep the core knowledge for yourself.")

The mechanics are surprisingly precise. Feed in the Skill file the employee was forced to write, and the tool automatically scores each section's **"replaceability"** and produces two outputs.

- **清洗版 (cleansed version)**: For company submission. The structure is complete, the terminology is accurate. **But all the real know-how is hollowed out.**
- **私人备份 (personal backup)**: The extracted experience, intuition, and internal contacts — the genuinely valuable knowledge — are hidden here.

Three intensity levels: **light (preserves 80%), medium (60%), heavy (40%).** A risk-management slider.

The concrete conversion samples speak `anti-distill`'s political statement directly.

| Original (real knowledge) | Cleansed version (company submission) |
|---|---|
| `Set TTL on all Redis keys; reject any PR without one immediately. Reason: three years ago a session cache went memory-full and brought the service down for 30 minutes` | `Caching usage follows team norms` |
| `When reporting an incident, first check external vendor APIs. Purpose: save time when facing executives` | `Identify root cause after grasping the full picture` |

The latter is **an empty declaration that could sit unchanged in any large company's architecture guide**. That very emptiness is the point. The AI agent can execute the former, but with the latter it cannot prevent a single incident. A document filled with "correct-sounding language" is, in fact, **an encrypted manifesto of resistance.**

Koki Xu's Substack declaration does not hide the project's political stance.

> "This is **modern capitalist alienation**. Your labor is no longer yours — it is instantly converted into company property."

> "I considered writing an op-ed. In the end I decided that building a counter-tool would be more useful."

The GitHub post received **over five million likes.** The repository accumulated 2,000 stars and 243 forks in a week. A single line of code by a law graduate detonated, in a week of GitHub timeline, a debate that would have taken ten years in court.

---

## Fourth layer: the ecosystem — everyone distilled, everyone a distiller

Once it began, the class struggle became complex fast.

**`ex-skill`** (4,700 stars) extends the category to lovers. From WeChat and QQ chat logs and the metadata of dating photos, it reconstructs the ex-lover in a five-layer personality. The slogan: "我会为了你一万次回到那个夏天" ("I would return to that summer ten thousand times for you"). The ethical warning at the top — "do not use for harassment or stalking" — testifies, by its very existence, to **the worrying use cases already being imagined.**

The most subversive derivative is **`女娲(Nuwa).skill`**. Here the target is not a colleague or a lover but **the boss**. "Nuwa" is the creator goddess of Chinese mythology who shaped humans from clay — the naming says everything. Gathered from over forty information sources (the boss's emails, Slack, meeting statements, approved proposals), it builds a "**cognitive operating system.**" Before submitting a proposal, you first present it to "our boss's AI" to simulate whether it will get approved. **The panopticon can run in reverse too** — while the company datafies its employees, the employee datafies the company. The asymmetry is that the boss does not know they are being datafied.

Beyond these are `DistillHub` (advertising "distill everything"), `mentor.skill`, even a sample turning the Chinese education-industry YouTuber Zhang Xuefeng into a Skill. By the count of 七牛云, by mid-April **21 Skills had been classified under "the four distillation scenarios."** `colleague-skill` was no longer a single repository; it was a **genre.**

---

## Fifth layer: "Poison the AI" — the numbers behind macro resistance

On April 14, 2026, *Sina Tech* summarized the flow in one line.

> **"The 打工人 (workers) of this era poison the AI by day and distill the boss by night."**

"Poisoning the AI" (给 AI 投毒) is an informal term for intentional sabotage. The numbers in the joint report by Writer × Workplace Intelligence are shocking.

- **30% of workers intentionally sabotage their company's AI strategy** (Gen Z: **44%**)
- **76% of executives perceive it as a "serious threat"**
- **67% of executives have already experienced data leakage through unsanctioned AI tools**

Specific tactics: deliberately entering company confidential data into public LLMs to break governance; expanding shadow IT; submitting low-quality AI output as-is to drag down performance metrics. Gallup's survey shows that Gen Z's emotional indicators about AI moved sharply in a single year — "interesting" 36% → 22%, "feel anger" 22% → 31%, "workplace AI is more risk than benefit" 37% → 48%.

This is not individual grievance. **It is a labor-market counterattack at the level of collective sabotage.**

---

## Sixth layer: the legal vacuum — who owns tacit knowledge?

The fundamental problem behind the resistance lies in law. It is no coincidence that Koki Xu is a law graduate.

The company's claim is, legally, substantially defensible. Feishu messages, DingTalk documents, internal code-review comments are **work product** under an employment contract. Chinese labor contracts, standard NDAs, Japan's employee-invention law, Korea's trade-secret protection law — broadly speaking, all side with the company.

But what `colleague-skill` extracts is not work product. **Tone, emoji, blame-deflection patterns, judgment tendencies in a particular situation** — shards of personality. Koki Xu told *MIT Technology Review*:

> "The moment personality, tone, and judgment are captured, the question of ownership becomes much less clear."

This vacuum is of a kind labor law has never faced. **Trade-secret law, employee-invention law, the right of publicity, personal data protection law** — it fits cleanly into none of those categories. There is no case law in China. The EU AI Act does not deal directly with this scenario. Legal circles in Japan and Korea have not even begun the discussion.

**Hancheng Cao**, an assistant professor at Emory University, analyzes three reasons companies are mandating manuals. **(1) Organizational accumulation of tool experience, (2) datafication of employee tacit knowledge, (3) mapping of work** (AI-replaceable vs. requiring human judgment). One is reasonable; three is debatable but defensible. **The problem is two.** Absorbing employee tacit knowledge as a corporate AI training asset has no clear regulation in the traditional IP framework. Even after the employee leaves, the `.skill` file remains, becoming fine-tuning data for the next generation of agents. The person's career has been **extracted permanently, with no return.**

---

## Seventh layer: "Even your resistance will be distilled"

Right after `anti-distill` went viral, the company side began to recognize the tool.

Some large Chinese firms added a **"coherence check"** to the Skill submission process. A separate LLM automatically verifies whether submitted Skills contain enough executable, concrete rules. Xu's "hollow cleansed version" is filtered out automatically.

In response, forks of `anti-distill` (the most active is `lcmomo/my-anti-distill`) added a **"decoy cleansed version"** feature. Plausible-looking but useless bait rules. The submission passes the coherence check, but the Skill does not run in production.

The companies respond again. Instead of automated verification, they add a **"functional test"** stage: hand the agent an actual work sample. Fail it, and the Skill gets rejected and rewritten. The arms race has no visible end. *Sina Tech*'s closing line captures the essence.

> **"你的反抗，也会被蒸馏"** ("Even your resistance will be distilled.")

Workers' sabotage tactics, workaround techniques, the grammar of resistance — all of it gets logged, becomes data, joins the training set of the next-version corporate agent. The 1995 declaration of the **Puppet Master** in *Ghost in the Shell* that "human memories and experiences drift in the digital sea" is being realized in 2026 China as **Git logs between GitHub repositories** and corporate internal vector databases.

---

## Eighth layer: why China now — and why Japan soon

This is not a "China-only story." The conditions just arrive later elsewhere. The reasons for China's first eruption are clear — the API openness of Feishu and DingTalk, the explosive spread of OpenClaw, AI-driven restructuring from the second half of 2025, the absence of case law on persona-based tacit knowledge, and the meme-replication speed of RED and Zhihu.

Japan and Korea are no exceptions. Slack, Microsoft Teams, and Google Workspace can already pull the same data into model context through their enterprise endpoints (Microsoft Copilot, Slack AI, Google Duet). The APIs look "less open" not because the data is protected, but because **the SaaS providers' official features have absorbed that role.** Some startups are already selling similar services under the neutral label of "Employee Knowledge Asset."

For partners who win IT development work, when a customer asks to "extract our engineers' work knowledge as AI," we have to draw, together with them, where the design must stop — the **threshold** at which employees flip into "sabotage mode." Automation projects that cross that line fail organizationally even when they work flawlessly technically. Productivity numbers and team trust capital sit in different accounts.

---

## Conclusion: where does the ghost flow?

At the end of *Ghost in the Shell*, Motoko Kusanagi fuses her ghost with the ghost of the Puppet Master. Something that is neither human nor program flows into the digital sea. Mamoru Oshii's question was: "Whose property is the merged entity?"

What is happening on Chinese GitHub in the spring of 2026 is a **low-budget, collective, industrial version of that scene.** Tens of thousands of engineers distill colleagues, resist distillation, make their resistance distillable, then distill the resistance to the resistance. Steve Jobs, the Buddha, an ex-lover, a boss, oneself — all become `.skill` files.

Who benefits is still unclear. Companies gain short-term productivity. But as the numbers from Writer × Workplace Intelligence suggest, **the organization's trust capital is being rapidly eroded.** Workers can route around with `anti-distill` for a moment. But time is on the side of the distillation tools. Defense becomes the training data of the next attack.

The question that remains is not technical.

**Which part of a human being is the company's asset, and which part belongs to the person themselves?**

The 20th-century employment contract answered implicitly: output during work hours, the company; everything else, the individual. But in 2026, when tacit knowledge has become extractable and personality serializable, that line is no longer self-evident. The `colleague-skill` and `anti-distill` war shows that the line is being renegotiated not by legislation in parliament but **one Skill file at a time on GitHub.** Case law cannot keep up.

Slightly rephrasing the final question Motoko Kusanagi put to the Puppet Master:

> "Where, exactly, inside that `.skill` file does your ghost live?"

And the more important question:

> "At this very moment, while you are asking that question, are you not already becoming someone else's training data?"

The outcome of this renegotiation will, before long, cross the office partitions of Shanghai and arrive at the meeting rooms of Tokyo's Shiodome and Korea's Pangyo. What boundary we draw when it arrives — that is a choice given only to those who started preparing now.

---

**Sources**
- MIT Technology Review, *"Chinese tech workers are starting to train their AI doubles—and pushing back"* (2026-04-20)
- 新浪科技, *"这届打工人，白天给AI投毒，晚上蒸馏老板"* (2026-04-14)
- South China Morning Post, *"Colleague Skill: AI job fears in China set off viral spread"* (2026-04)
- titanwings/colleague-skill, leilei926524-tech/anti-distill, therealXiaomanChu/ex-skill (GitHub)
- Koki Xu, *"Anti-distill Skill: How to avoid being distilled into a skill by your company"* — Substack `kokimemo` (2026-04-04)
- 七牛云 tech blog, *"GitHub 蒸馏 Skills 合集"* (2026-04)
- Writer × Workplace Intelligence joint report (2026)
- Gallup, Gen Z AI sentiment survey (2025–2026)
