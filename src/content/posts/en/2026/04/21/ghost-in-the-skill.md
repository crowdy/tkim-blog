---
title: 'Ghost in the Skill: The Class Struggle of Distillation and Counter-Distillation on Chinese GitHub'
description: 'In April 2026, a 24-year-old engineer in Shanghai spent four hours after work building a GitHub repository that struck at the heart of China''s tech industry. What it targeted was not code but a colleague''s **soul**. In an era when companies demand that employees "design their own replacements," how are developers fighting back — and is even that resistance fated to be distilled?'
pubDate: 2026-04-21T00:00:00.000Z
lang: 'en'
pairSlug: 'ghost-in-the-skill'
draft: false
---
# Ghost in the Skill: The Class Struggle of Distillation and Counter-Distillation on Chinese GitHub

> In April 2026, a 24-year-old engineer in Shanghai spent four hours after work building a GitHub repository that struck at the heart of China's tech industry. What it targeted was not code but a colleague's **soul**. In an era when companies demand that employees "design their own replacements," how are developers fighting back — and is even that resistance fated to be distilled?

## Introduction: Turning a cold farewell into a warm token

In early April 2026, a 24-year-old engineer at the Shanghai Artificial Intelligence Laboratory, **Zhou Tianyi (周天一)**, spent four hours after work pushing a hobby project to GitHub. The repository was called `colleague-skill`. The slogan was nearly poetic.

> **"将冰冷的离别化为温暖的 Skill，欢迎加入数字生命1.0."**
> ("Turn cold farewells into warm Skills. Welcome to Digital Life 1.0.")

The usage is unsettlingly simple. Enter the name and profile of the colleague you want to distill. The script reaches into the APIs of the Chinese workplace communication tools **Feishu (飞书)** and **DingTalk (钉钉)** to collect that person's chat logs, documents, emails, and WeChat messages. A few minutes later, two files drop out.

The first is `Work Skill` — a markdown manual that systematizes the colleague's coding style, design norms, and decision patterns. The second is `Persona` — a persona layer that captures their tone of voice, their use of emoji, even the idiosyncratic habit of subtly dodging responsibility in meetings (the repository's original phrasing is "blame-deflection"). Attach those two files to the **AgentSkills** open standard, plug them into **Claude Code** or into **OpenClaw** — the agent framework that has been spreading explosively in China — and you get an agent that does that person's job for them. The repository's sample directory includes Steve Jobs and the Buddha rendered as `.skill` files.

Zhou Tianyi called the project a **"stunt."** In an interview with *Southern Metropolis Daily* (南方都市报), he explained, "It's for when a colleague leaves and dumps a mountain of un-maintained documents on your desk on the way out. It's black humor about AI-driven layoffs and corporate practices that demand employees automate themselves."

But after one week, the repository had **15,900 stars**. Chinese-language outlets, counting forks and mirrors, put it at close to **70,000 stars in five days**. Remember that in the Chinese GitHub ecosystem, reaching 10,000 stars in a year is enough to be classified as a "successful open source project," and you can see this was more than a meme. The stunt was no longer a stunt.

---

## First layer: the mechanism of distillation, or the externalization of the ghost

In *Ghost in the Shell*, what Motoko Kusanagi pointed to with the word "ghost" was not mere memory. Experience, judgment, biases, habits — the **surplus** that makes a given human exactly that human. The concept that Masamune Shirow first laid out in his 1989 manga and that Mamoru Oshii rendered in his 1995 film became the most important metaphor of 21st-century cyberpunk.

What `colleague-skill` does is precisely **extracting that surplus into a file.**

In technical terms, this tool automates the process of **externalizing tacit knowledge (暗默知) into explicit knowledge (形式知)**. The framework was set out by the Hungarian-born philosopher Michael Polanyi in his 1966 book *The Tacit Dimension*, and formalized in the 1990s by the Japanese management scholar Ikujiro Nonaka (野中郁次郎) as the SECI model. Polanyi's famous line is:

> "We can know more than we can tell."

The sense of a master craftsman, the senior engineer's intuition that "something feels off here," the SRE who can diagnose the root cause at 3am just by hearing the tone of an alarm — these have traditionally been extremely hard to externalize. That very difficulty was why veterans were valuable, and why organizations fought to keep them.

Colleague Skill brute-forces past that difficulty. Pour years of Slack threads, code-review comments, meeting-note drafts, and PR discussions into an LLM's context window, and a large model can reconstruct implicit judgments into **explicit rules**. A concrete rule like "always set a TTL on Redis keys, and reject any PR without one immediately" is the intuition a senior engineer earned through repeated memory-leak incidents over many years. It now becomes a single line in `work-skill.md`.

The repository's directory structure makes its ambition plain. It is not just `colleague/`. Right next to it sit `relationship/` (lovers, family, friends) and `celebrity/` (public figures, creators, fictional characters). The declaration is that **any human relationship, any persona, can be reduced to a distillable skill.** The architecture itself has already become a philosophical claim.

**Amber Li (27, Shanghai)** described her own experiment to *MIT Technology Review*:

> "Surprisingly good. It catches even the tiny habits."

The timing of reaction emoji, the use of punctuation in specific contexts, the unique way of trailing off in meetings to defer a decision — every detail of the former colleague's "ghost" was alive. After the experiment was done, she said, she could not shake the unease for some time. **Because proof that a single person can be compressed into a single file is also a preview that the same can happen to you.**

---

## Second layer: the order to "automate yourself"

The real reason `colleague-skill` went viral was not the novelty of the code. **It was that the code lampooned the early-2026 reality of the Chinese tech industry with brutal accuracy.**

*MIT Technology Review* published the testimony of a software engineer who requested anonymity for job security. His company had ordered engineers to document their workflows in the AgentSkills format and refine the documents until they could be executed as agents. He said he tried, and then said this:

> "It felt as if my work was being flattened — reduced to easily replaceable modules."

This is a precise reproduction of the work decomposition and standardization that Frederick Taylor attempted in American factories a hundred years ago. The difference is that 20th-century Taylorism measured the worker's **physical motion**, while the 2026 version of self-automation measures the worker's **judgment and persona**. And this time the measurer is not an external human manager — it is **the person being measured**. The demand is to install the apparatus of self-surveillance with your own hands.

A self-deprecating slogan spread quickly among Chinese engineers:

> **"先蒸馏同事"** ("Distill your colleagues first.")

It is a metaphor borrowed from deep learning's **knowledge distillation**, the technique of compressing the knowledge of a large teacher model into a small student model. In this slogan, the meaning is cruelly inverted. "Before I get replaced, may the colleague at the next desk get distilled first, so that their layoff buys me a little more survival time." On China's emotionally-toned social platform **RED (小红书, Xiaohongshu)**, a comment ran:

> **"冰冷的告别可以变成温暖的 token"**
> ("A cold farewell can be turned into a warm token.")

The cynicism that accelerating a colleague's exit is the only way for me to survive. The line could sit comfortably as an episode title for *Ghost in the Shell*, but this is not fiction. Feishu and DingTalk exist, the GitHub repository has tens of thousands of stars, and a derivative project called `女娲(Nuwa).skill` — which we will get to in a moment — has already racked up thousands of downloads.

---

## Third layer: the counterattack begins — Koki Xu's one hour

Exactly four days after `colleague-skill` went viral, on April 4, 2026, a GitHub repository pointing in precisely the opposite direction appeared. Its name was `anti-distill`.

**Xu Keke (徐可可, Koki Xu), 26, AI product manager in Beijing.** Bachelor's and master's in law. The time it took her to design the tool, write the code, and publish it was **roughly one hour.** The repository's slogan reads less like a lawyer's prose and more like a strike chant painted on a factory wall.

> **"公司让你写 Skill？跑一遍，交差用。核心知识留给自己。"**
> ("Company wants you to write a Skill? Run it once, submit it for the record. Keep the core knowledge for yourself.")

The mechanics of `anti-distill` are surprisingly precise. Feed in the Skill file the employee was forced to write, and the tool automatically scores each section for **"replaceability"** — the higher the score, the easier it is for an AI to reproduce that section as-is, and the more "dangerous" the section becomes. Two output files are then generated.

- **清洗版 (qīngxǐ-bǎn, "cleansed version")**: For submission to the company. The structure is complete and the terminology is precise. There is nothing wrong with it on the surface. **But all the real know-how is hollowed out.**
- **私人备份 (sīrén-bèifèn, "personal backup")**: The extracted experience, intuition, internal network of contacts, meta-knowledge such as "this senior will buy in if you pitch it in this tone" — the genuinely valuable parts are hidden here.

The user can choose between three intensity options. If the company's review is expected to be strict: **"light" (preserves 80%)**. For a typical situation: **"medium" (60%)**. If only a perfunctory submission is being checked: **"heavy" (40%)**. A risk-management slider, in effect.

Concrete conversion examples are published in the repository's sample section, side by side. These two rows are the political statement of `anti-distill`.

| Original (real knowledge) | Cleansed version (company submission) |
|---|---|
| `Set TTL on all Redis keys; reject any PR without one immediately. Reason: three years ago a session cache went memory-full and brought the service down for 30 minutes` | `Caching usage follows team norms` |
| `When reporting an incident, first sweep external vendor APIs for issues; dig into internal causes second. Purpose: save time when facing executives` | `Identify root cause after grasping the full background` |

Place the two side by side and the latter reads like **an empty declaration that could sit unchanged in any large company's architecture-guide document**. That very emptiness is the point of the tool. An AI agent can execute the former rule, but with the latter it cannot prevent a single incident. A document filled with "correct-sounding language" is, in fact, **an encrypted manifesto of resistance.**

Koki Xu's declaration on her Substack `kokimemo` does not hide the project's political position.

> "This is **modern capitalist alienation**. Your labor is no longer yours — it is instantly converted into company property. And in the AI era, the company does not use that asset once and discard it. It accumulates it as permanent training data."

> "At first I thought about writing an op-ed. In the end I decided that building a counter-tool would be more useful."

Her GitHub post received **over five million likes**. The repository accumulated 2,000 stars and 243 forks in a week. A single line of code written by a law graduate detonated, on a GitHub timeline in a week, a debate that would have taken ten years in court.

---

## Fourth layer: the ecosystem — everyone distilled, everyone a distiller

Once it began, the class struggle on GitHub became complex quickly. Derivative projects inheriting the DNA of `colleague-skill` lined up in rapid succession, and the targets of distillation expanded.

### `ex-skill` — distilling your ex

A developer who goes by the handle **the real Xiaoman Chu** released `ex-skill`, which extends the category to lovers. Star count: **4,700**. The slogan is too sentimental to belong to a technical tool.

> **"我会为了你一万次回到那个夏天"**
> ("I would return to that summer ten thousand times for you.")

Trained on WeChat and QQ chat logs, the metadata of dating photos (location and time), and social media posts, the tool reconstructs the ex-lover as a **five-layer personality structure (rules → identity → tone → emotion → relational behavior)**. Restaurants you visited together, the patterns of past fights, the way reconciliations worked — all are integrated as "relational memory."

At the top of the repository sits an explicit ethical warning.

> ⚠️ **本项目仅用于个人回忆与情感疗愈，不用于骚扰、跟踪或侵犯他人隐私**
> ("This project is intended only for personal remembrance and emotional healing. It must not be used for harassment, stalking, or violation of privacy.")

But the very fact that the warning is engraved on the page means **the worrying use cases are already being imagined**. No one yet knows where someone will end up, mentally, who spends every night talking to the digital ghost of a former lover. The question *Ghost in the Shell* kept asking for twenty years — "where does the ghost live, is it an extension of the original or a copy or a separate entity?" — has become a problem on a GitHub README.

### `女娲(Nuwa).skill` — distilling your boss

The most subversive derivative is **`女娲(Nuwa).skill`**. Here the target of distillation is not the colleague or the lover but **the boss**.

"Nuwa" (女娲) is the name of the creator goddess in Chinese mythology who shaped humans from clay. The naming says everything. The user of this Skill seeks to **generate** their boss. The boss's emails, Slack messages, statements in meetings, the past proposals they approved — gathered from over forty different information sources — are used to build a "**cognitive operating system.**"

The usage is an elegant inversion of power. Before submitting a proposal to the boss, you first present it to your boss's AI. You simulate in advance whether they'll approve, what counterarguments they'll raise, which expressions they like and which words they distrust. **It is a demonstration that the panopticon can run in reverse.** While the company datafies its employees' work patterns, the employee datafies the company's decision-making patterns. The asymmetry, not the symmetry, is the point. The boss does not know they are being converted into data; the employee knows they are being converted.

### `DistillHub`, `mentor.skill`, and "distill everything"

Beyond these, there is `DistillHub` (which advertises itself as "distill everything"), `mentor.skill` (for teachers and mentors), and even an example that has rendered the YouTube educator Zhang Xuefeng (张雪峰) as a skill. According to a tally by the Chinese IT outlet 七牛云, by mid-April there were already **21 specific skills** grouped under "the four distillation scenarios."

`colleague-skill` was no longer a single repository. It had become a **genre.**

---

## Fifth layer: "Poison the AI" — the numbers behind macro resistance

On April 14, 2026, *Sina Tech* (新浪科技) summarized the whole flow in a single line.

> **"The 打工人 (dǎgōngrén, wage slave) of this era poisons the AI by day (给AI投毒), and distills the boss by night (蒸馏老板)."**

"Poisoning the AI" (给AI投毒) is an informal term for an intentional sabotage strategy. A joint report by Writer and Workplace Intelligence reveals the scale of the phenomenon in shocking numbers.

- **30% of workers are intentionally sabotaging their company's AI strategy**
- For Gen Z alone, the figure jumps to **44%**
- **76% of executives perceive this as a "serious threat"**
- **67% of executives have already experienced data leakage through unsanctioned AI tools**

The specific tactics read like black humor, but every one of them is a measured behavior.

1. **Data poisoning**: deliberately entering company confidential data into ChatGPT or public LLMs to break data-governance policy. Most internal reports it as "user error"; some of it is intentional.
2. **Shadow IT expansion**: doing work with unsanctioned third-party AI tools, diverting production processes outside IT's reach.
3. **Submitting low-quality output as-is**: pasting AI-generated nonsense into reports without revision, in order to degrade the "AI metric" in performance evaluation systems.
4. **Performance-measurement sandbagging**: deliberately lowering AI usage during the evaluation measurement window, or polluting the measurement itself.

A Gallup survey shows that Gen Z's emotional indicators about AI shifted dramatically in just one year. The share finding AI "interesting" plunged from 36% to 22%. Those who said they felt "anger" rose from 22% to 31%. Those who saw AI in the workplace as "carrying more risk than benefit" reached 48%, up from 37%.

This is not the personal grumbling of individual engineers. **It is a labor-market counterattack that has reached the level of collective sabotage.**

---

## Sixth layer: the legal vacuum — who owns tacit knowledge?

The fundamental problem running through all the resistance lies in the law. It is no coincidence that Koki Xu is a law graduate.

The company's claim is, legally, substantially defensible. Feishu messages, DingTalk documents, internal code-review comments — all of them are **work product** generated under an employment contract. Chinese labor contracts and standard NDAs spell out that the ownership of that work product belongs to the company. Japan's law on employee inventions and Korea's trade-secret protection law sit roughly on the same line.

But what `colleague-skill` extracts is not simple work product. **Tone of voice, use of emoji, blame-deflection patterns, judgment tendencies in a particular organizational atmosphere** — these are shards of personality. Koki Xu told *MIT Technology Review*:

> "The moment personality, tone, and judgment are captured, the question of ownership becomes much less clear."

This vacuum is of a kind that labor law has never had to face. **Trade-secret law, employee-invention law, the right of publicity, personal data protection law** — each addresses a different domain, and each was built in the 20th century. But "an agent trained on an employee's tacit knowledge" does not fit cleanly into any of those categories. There is no relevant case law in China, and no full-blown lawsuit has been reported in the US either. The EU AI Act does not deal directly with this specific scenario. Discussion has not even begun in legal circles in Japan or Korea.

**Hancheng Cao (Assistant Professor)** of Emory University is a scholar studying the intersection of AI and work. In his *MIT Technology Review* commentary, he analyzes why companies are mandating manuals of this kind in three ways.

1. **Organizational accumulation of tool experience** — a company-level learning curve about which work can be automated by agents
2. **Datafication of employee tacit knowledge** — securing workflows and decision patterns as training data
3. **Mapping of the work** — drawing the boundary between "work an agent can replace" and "work that still requires human judgment"

Number one is reasonable innovation. Number three is debatable but defensible. **The problem is number two.** Absorbing employee tacit knowledge as a corporate AI training asset has no clear regulation anywhere in the traditional IP framework. Even after the employee leaves, the `.skill` file remains on company servers, and that file becomes fine-tuning data for the next generation of agents. The person's career and judgment have been **extracted, permanently, with no return.**

---

## Seventh layer: "Even your resistance will be distilled"

Right after `anti-distill` went viral, an interesting twist started. Companies began to register the existence of the tool.

Some large Chinese firms added a **"coherence check"** to the Skill submission process. A separate LLM automatically verifies whether submitted Skills contain enough executable rules, concrete thresholds, and concrete commands. The "hollow cleansed version" Xu's `anti-distill` produces is filtered out automatically.

In response, forks of `anti-distill` — the most active is `lcmomo/my-anti-distill` — added a **"decoy cleansed version"** feature. Rather than simply emptying the content, it fills the file with bait rules that look plausible but have no actual value. The submission passes the coherence check, but the Skill does not work in production.

The companies respond again. Instead of automated verification, they add a **"functional test"** stage, in which the agent is given an actual work sample. If the agent fails the test, the Skill is rejected and the employee is told to write it again.

The arms race has no visible end. The closing line of the *Sina Tech* piece captures the essence of the stalemate.

> **"你的反抗，也会被蒸馏."**
> ("Even your resistance will be distilled.")

Workers' sabotage tactics, workaround techniques, the grammar of resistance — all of it gets logged, becomes data, and joins the training set of the next version of corporate agents. The scene in *Ghost in the Shell* (1995) where the **Puppet Master** declares that "human memories and experiences drift in the digital sea" is being realized, in 2026 China, in the Git logs between GitHub repositories and in corporate internal vector databases.

And the digital sea is not neutral. In China, the big tech firms manage its seabed. In the US, OpenAI, Anthropic, and Microsoft. In Europe, Mistral and SAP. The drifting ghosts must eventually sink to someone's seabed, and there they are sampled again.

---

## Eighth layer: why China now — and why Japan and Korea soon

One misreading needs to be avoided. **This is not a "Chinese-particular story."** The conditions arrive a little later elsewhere, but the technical ingredients are already largely the same.

There are several overlapping reasons China went first.

- **The API openness of Feishu and DingTalk**: internal communication records can be collected programmatically.
- **The explosive spread of OpenClaw**: a Chinese-localized agent framework akin to Claude Code has already reached national-phenomenon scale.
- **The collapse of employment stability**: AI-driven restructuring in the Chinese tech industry kicked into high gear in the second half of 2025.
- **The legal vacuum**: the principle that work records belong to the company is clear, but no precedent addresses persona-based tacit knowledge.
- **The meme-replication speed of RED and Zhihu (知乎)**: a discourse can scale to nationwide proportions within 48 hours.

These conditions reach Japan and Korea with a time lag. Slack, Microsoft Teams, and Google Workspace are designed to pull the same data into model context directly through their enterprise endpoints (Microsoft Copilot, Slack AI, Google Duet). The "openness" of those APIs looks lower not because the data is protected, but because **the SaaS providers' official features have absorbed that role themselves**. A tool that does the same job as `colleague-skill` could be shipped soon as an official "onboarding automation" feature inside Slack or Teams. Some startups are already selling similar services under the neutral label of "Employee Knowledge Asset."

For partners who win IT development contracts and co-design customer systems, this phenomenon has two faces.

**First, the problem of interpreting customer requests.** Going forward, customers are likely to come asking "extract our engineers' work knowledge as AI agents." That is a reasonable request, and in the short term it offers a powerful productivity lever. But where the design should stop, and which boundaries are dangerous from the perspective of contracts, privacy, and organizational motivation, is a map that has to be drawn together before the project begins. What the Koki Xu phenomenon shows is that **the threshold at which employees flip into "sabotage mode" is real.** Automation projects that cross that line fail organizationally even when they work flawlessly technically. Productivity numbers and the team's trust capital sit in different accounts.

**Second, the assessment we owe to our own organizations.** If the engineers on our team become next quarter's `colleague-skill` targets, which contracts, processes, and culture will steer that journey toward a healthy direction rather than a destructive one? This is not a technology problem — it is a **governance problem.**

---

## Conclusion: where does the ghost flow?

In the final scene of Mamoru Oshii's 1995 film, Motoko Kusanagi fuses her ghost with the ghost of the Puppet Master. Something that is neither human nor program flows into the digital sea. The question Oshii asked was: "Whose property is the merged entity? Is it an extension of the original, an entirely new being, or does it belong to everyone?"

What is happening on Chinese GitHub in the spring of 2026 is a **low-budget, collective, industrial version of that scene.** Tens of thousands of engineers are distilling their colleagues, resisting being distilled, making their resistance distillable, and distilling the resistance to that resistance. Steve Jobs, the Buddha, an ex-girlfriend, a boss, the teammate at the next desk, and ultimately oneself — all become `.skill` files. A single directory structure has become the taxonomy of human relationships.

Who benefits from this process remains unclear. Companies gain short-term productivity. But as the figures from Writer and Workplace Intelligence suggest, **the organization's trust capital is being rapidly eroded.** Workers can temporarily route around with `anti-distill`. But time is on the side of the distillation tools. Defense techniques become the training data for the next attack.

The question that remains is not technical.

**Which part of a human being is the company's asset, and which part belongs to the person themselves?**

The 20th-century employment contract answered this question implicitly: output produced during work hours belongs to the company, the rest belongs to the individual. But in 2026, when tacit knowledge has become extractable and personality serializable, that line is no longer self-evident. The `colleague-skill` and `anti-distill` war shows that this line is being renegotiated not by legislation in parliament, but **one Skill file at a time on GitHub.** Case law cannot keep up with that speed.

Slightly rephrasing the final question Motoko Kusanagi put to the Puppet Master:

> "Where, exactly, inside that `.skill` file does your ghost live?"

And the more important question:

> "At this very moment, while you are asking that question, are you not already becoming someone else's training data?"

The result of this renegotiation will, before long, cross the office partitions of Shanghai and reach the meeting rooms of Tokyo's Shiodome and Seoul's Pangyo. What boundary we draw at that meeting will be a choice given only to those who started preparing now.

---

**Sources**
- MIT Technology Review, *"Chinese tech workers are starting to train their AI doubles—and pushing back"* (2026-04-20)
- 新浪科技, *"这届打工人，白天给AI投毒，晚上蒸馏老板"* (2026-04-14)
- South China Morning Post, *"Colleague Skill: AI job fears in China set off viral spread"* (2026-04)
- MIT Technology Review Japanese edition (2026-04)
- titanwings/colleague-skill (original GitHub repository)
- leilei926524-tech/anti-distill (GitHub)
- therealXiaomanChu/ex-skill (GitHub)
- Koki Xu, *"Anti-distill Skill: How to avoid being distilled into a skill by your company"* — Substack, `kokimemo` (2026-04-04)
- 七牛云 tech blog, *"GitHub 蒸馏 Skills 合集, 四大场景 21 个 skills"* (2026-04)
- Writer × Workplace Intelligence joint report (2026)
- Gallup, Gen Z AI sentiment survey (2025–2026)
