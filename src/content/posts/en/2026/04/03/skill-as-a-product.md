---
title: 'When Skills Become Products — The New Economics of the AI Agent Ecosystem'
description: '"last30days-skill hit 17,000 stars. This is not a tool being sold — it is a capability."'
pubDate: 2026-04-03T05:29:04.786Z
lang: en
pairSlug: 'skill-as-a-product'
draft: false
---
# When Skills Become Products — The New Economics of the AI Agent Ecosystem

> "last30days-skill hit 17,000 stars. This is not a tool being sold — it is a capability."

---

Throughout software history, the unit of "product" has kept shrinking. From mainframes to PCs, from PCs to web apps, from web apps to SaaS, from SaaS to APIs, from APIs to microservices. Every time the product unit shrank, the number of producers exploded. The organizations capable of building mainframes could be counted on one hand, but startups built SaaS, and teams built APIs. Right now, inside the Agentic Coding Tool ecosystem, the product unit is shrinking one more step. A unit called "skill" is emerging. It is small enough that a single individual can build one.

I first felt this the day I applied superpowers' brainstorming skill. That day I was working on the design of a new API endpoint. The moment I was about to ask Claude Code to implement a feature as usual, the agent stopped and asked back: "Before implementing, let me organize the requirements. There are three possible approaches — would you like to see the trade-offs of each first?" Normally it would have generated code immediately. I had taken it for granted that an agent receiving a request would produce code. But this day was different. The agent first proposed design alternatives, analyzed the pros and cons of each, and only began writing code after I had made a choice. It was making the agent *think* before writing code. The tool had not changed. Claude Code was the same. The model was the same, the interface was the same, the commands I used were the same. What had changed was the agent's behavioral pattern. A single skill had been injected, and the entire workflow had shifted. As a result, the API design I wrote that day was far cleaner than usual. There was less to fix later. In that moment I realized this: this is not a simple configuration change. The agent's way of thinking had been swapped out.

I have kept observing since that experience. I have monitored GitHub Trending, tracked community responses, and applied various skills myself. And a pattern began to surface. In the AI agent ecosystem, the unit of value is shifting from "tool" to "skill (capability)." This is the smallest-unit productization of software since SaaS. And the shift is important enough that tech leaders should reconsider their teams' AI strategies.

---

## 1. What a Skill Is — The Decisive Difference From Plugins

The word "skill" still has no agreed industry definition. But observing how it is actually used, the outline emerges. A skill is a reusable behavioral pattern that runs on top of an Agent Harness. The key part is "behavioral pattern." It is not adding a feature; it changes the way the agent itself thinks and acts.

This is the fundamental departure from existing plugins or extensions. To make the difference clear, let me use a concrete analogy. A plugin puts a new tool into the agent's toolbox. Install a Slack plugin and the agent can send Slack messages. Install a database plugin and it can execute SQL queries. A capability the agent did not have appears. The scope of what the agent can do widens.

A skill, on the other hand, redefines *how* the agent does what it can already do. Even when writing the same code, an agent injected with a TDD skill will always write the test before the implementation. This is not adding a test framework. The agent was already capable of writing tests. It simply was not making the judgment "I will write the test first." What the TDD skill does is enforce that order of judgment. It injects behavioral discipline.

In human terms: teaching a new programming language to a junior developer is a plugin. The set of things they can do grows. By contrast, when a senior developer teaches "always sketch the design before writing the code" or "do a self-review before opening a PR," that is a skill. Capability itself does not grow; the way existing capability is exercised changes. Any experienced engineer will know intuitively that the latter makes a far greater difference in practice.

Look more closely at the brainstorming skill. What this skill does is "a cognitive brake before implementation." It does not grant the agent any new capability. It changes the order and the criteria by which the agent exercises capabilities it already has. The ability to write code was already there. The ability to analyze requirements was already there. The ability to compare alternatives was already there. What was missing was a methodology that said "before writing code, compare three alternatives." The skill injects that methodology. It is exactly like a seasoned consultant resetting a team at a project kickoff: "Don't jump to implementation — let's start with problem definition."

The core distinction comes down to this: a plugin extends "what to do." A skill injects "how to think." A plugin increases the physical capability of the tool. A skill changes the cognitive strategy of the tool. The difference can look small, but the resulting gap in work quality is substantial. With the same agent, the same model, and the same prompt, the level of the output changes depending on which skill is active.

Take verification-before-completion as an example. This skill forces the agent to run verification commands and confirm results before it declares "the work is done." It does not add a new tool. It plants a behavioral principle: "do not claim completion without evidence." It is exactly the same effect as a senior developer drilling habits into a junior: "Did you run the tests before committing?" Without this skill, the agent writes code and says "done" — even if the build is broken. With this skill, the agent runs its own tests, checks the build, shows the result, and only then declares completion. It is not a difference in functionality. It is a difference in attitude. A skill is discipline, not technology — methodology, not feature.

---

## 2. What the Numbers Say — GitHub Trending, April 2026

Let me confirm the phenomenon with data rather than intuition. Looking at GitHub Trending as of April 3, 2026, an interesting pattern emerges. It is not merely that AI-related projects are plentiful. What matters is *what kind* of project is rising.

The most striking feature is the composition of the top. everything-claude-code is at 134,000 stars, with a weekly increase of +23,845. superpowers follows closely at 132,000 stars with +17,089 weekly. Both are projects that extend the ecosystem of the Agentic Coding Tool called Claude Code. This much is within expected range. The popularity of agent tools themselves is already well known. everything-claude-code is a hub that curates Claude Code resources, and superpowers is an Agent Harness that loads various skills on top of Claude Code. The fact that these two projects have crossed 130,000 stars means the developer community is paying explosive attention to the "ecosystem infrastructure" of agent tooling.

But what really deserves attention is the performance of individual skill projects. last30days-skill is at 17,000 stars. What this project does is clear. It is a skill that crosses major platforms — Reddit, X (Twitter), YouTube, Hacker News, Polymarket — to search and summarize trends over the last 30 days. It is not a standalone application. By itself it does not even run. It is a pure skill that operates only on top of an Agent Harness. You cannot open it in a web browser, you cannot execute it standalone in a CLI. At its center is a markdown file that injects a behavioral pattern — "search this way, organize that way" — into the agent. And it has 17,000 stars. A single skill is attracting more attention than many open source libraries or frameworks. The meaning of this number should not be underestimated.

The case of Korean developer Yeachan-Heo is even more interesting. oh-my-claudecode is a multi-agent orchestration framework for Claude Code, and it is recording +9,761 stars weekly. It is a project that defines, in skill form, the structure of multiple agents collaborating. At the same time, the same developer is hitting +2,867 daily stars with oh-my-codex, an extension project for the OpenAI Codex CLI. What matters is the fact that a single individual developer is running two trending projects simultaneously. Without the resources of a large team or company, this level of influence is achievable. It is empirical proof that the skill ecosystem is providing individual developers with leverage that was previously impossible.

ByteDance's deer-flow is also worth noting. It was originally a workflow automation tool, but recently rebranded itself as a "SuperAgent harness." Even large enterprises are redefining their product identity as "Agent Harness." What does it mean for a company at ByteDance's scale to position itself as "we are a harness"? When harnesses become standardized, the market for the skills that run on top of them grows too. This is the same structure as Android or iOS becoming standardized opening the app market. When the platform stabilizes, the content market opens. The Agent Harness is being stabilized now, and the skill market is starting to open.

Synthesizing this data, one picture emerges. At the top of the ecosystem sit hubs and harnesses like everything-claude-code and superpowers; on top of them individual skills like last30days-skill exist as independent products; and on top of that structure individual developers like the one behind oh-my-claudecode are rapidly building influence. Large enterprises like ByteDance are entering the harness layer and making the ecosystem more robust.

What the data points to is clear. A single skill receiving 17,000 stars is evidence that the developer community is recognizing skills as independent products in their own right. They are no longer "accessories of the agent" or "a kind of configuration file." Skills are now discovered, evaluated, compared, and adopted as products. In GitHub Stars — the most primitive form of developer vote — skills are receiving votes as products.

---

## 3. Why Now — Three Structural Conditions

The phenomenon of skills becoming products did not appear out of thin air. It is happening because three structural conditions are being met simultaneously. No single one explains it. The three are interlocked, which is why we are seeing this happen now.

**First, the standardization of the Agent Harness.** superpowers, everything-claude-code, and deer-flow are each building skill interfaces in their own way. There is no single standard yet. But common patterns are converging. The way of defining a skill (a markdown file describing trigger conditions and behavioral instructions), the way of loading it (directory-based auto-discovery), the way of describing trigger conditions (keyword matching or context detection) are becoming increasingly similar. It is reminiscent of early web browsers diverging on HTML rendering and then converging on the standard. This is the same stage as smartphone OSes stabilizing before the app store appeared. The harness provides the runtime environment for skills, and as that environment stabilizes, distributing and sharing skills independently becomes realistic. Without a platform, there is no content market. The Agent Harness is becoming that platform.

**Second, the paradox of replication.** A skill is essentially a text file. It is closer to a behavioral guideline written in markdown. Replicating it takes less than a minute. One `git clone` does it. By the conventional logic of business, this is a condition under which something cannot be a product. Easy to copy means no moat. "A text file anyone can copy is a product?" That is a reasonable doubt.

But the opposite is happening in practice. *Because* replication is easy, it spreads quickly. Because spread is fast, more users validate it. Because more validation happens, trust accumulates. Because trust accumulates, it becomes a de facto standard. Recall the history of open source software. The Linux kernel source is visible to anyone and copyable by anyone. But Linux became the server OS standard not because it was non-copyable, but because enough people used the same thing and accumulated validation and improvement. Skills follow the same dynamic.

In an earlier essay, I described a structure I called "copyable but the context is not." Exactly the same logic applies to skills. The text of a skill is copyable, but the context in which that skill is woven into a particular team's workflow is not. You can copy the brainstorming skill. But the state in which our team has used it for three months, adjusted it to say "in our domain it is better to compare five alternatives instead of three," added an exception "for certain types of requests, brainstorming can be skipped," and where team members have adapted to that way of working — this cannot be reproduced by copying the original. The text is the same; the context is different.

**Third, the network effect.** The more people use the same skill, the stronger that skill's validation. GitHub Stars effectively serve as a quality certification for skills. last30days-skill, with 17,000 stars, sends the signal "17,000 developers discovered this skill and took interest." That signal drives further adoption, further adoption produces further feedback, further feedback drives quality improvements, quality improvements drive further adoption. A textbook network effect.

What is interesting here is that the network effect of skills takes a different form than that of traditional software. The network effect of messengers like Slack or KakaoTalk is a direct one: "many people use it, so I have to use it to communicate." The network effect of skills, by contrast, is closer to a trust-based effect: "many people have used it, so this is a sufficiently validated methodology." The skill works even when I use it alone. But there is a trust gap between a skill used by 17,000 people and a skill used by ten. As a result, skills that succeed in early diffusion gain an asset — "validation data" — that gives them an edge over later entrants. Even with identical functionality, the skill with more stars gets adopted. Trust is a stronger differentiator than feature.

These three conditions — harness standardization, the paradox of replication, the network effect — operating together, are converting skills from "fun experiments" to "serious products." It also matters that each condition reinforces the other two. As harnesses standardize, replication and diffusion of skills become easier; as diffusion accelerates, the network effect strengthens; as the network effect strengthens, more developers build skills on the harness, accelerating standardization. A self-reinforcing loop.

And this transition is still in its early stage. Recall the early app store era when "flashlight apps" recorded millions of downloads. The skill ecosystem is at that stage. General-purpose skills like last30days-skill or brainstorming are getting attention now, but skills specialized to specific industries, specific domains, and specific workflows will explode in number. When skills carrying domain methodology — financial data analysis skills, medical document review skills, legal contract review skills — appear, the real value of this market will be revealed.

---

## 4. A Question for Tech Leaders — Where Do You Stand in the Skill Economy

For tech leaders reading this far, I want to propose a framework. Two axes for understanding where your organization sits in the skill economy.

The first axis is your relationship with skills. **Are you a "consumer" or a "producer"?** If your team is only using skills built by superpowers or other people, you are a consumer. If you are distilling your team's unique workflow into skills and sharing them internally or externally, you are a producer. Being a consumer is not bad. Quickly adopting good skills is a competitive edge in itself. But if you stay in the consumer position, you become dependent on the pace of evolution of the skill ecosystem.

The second axis is the dependency target of your AI workflow. **Is it "tool-dependent" or "skill-dependent"?** If you are judging the agent's value by "which tool we use," that is tool-dependent. If team meetings only discuss "should we use Claude Code or Cursor?", you are in that state. By contrast, if your judgment is based on "how the agent behaves," that is skill-dependent. If you are discussing "how do we improve our code review skill?" or "should we build a skill for onboarding new team members?", you are in that position.

Crossing the two axes produces four positions.

**Tool-dependent + Consumer** is the most fragile position. When a better tool appears, you must switch immediately, and switching leaves nothing accumulated. Every time the tool changes, you start over. The experience from last month's tool does not carry over to this month's new one. Unfortunately, most organizations sit here right now.

**Tool-dependent + Producer** is building its own tools or plugins, but missing the new value layer called skills. There are many internal automation scripts, but they do not define the behavior of the agent. The capability to build tools exists, so the potential for transition is high, but a shift in perspective is required.

**Skill-dependent + Consumer** is picking and using good skills well. By adopting brainstorming, TDD, and verification skills from superpowers, the team's level of agent usage is high. You probably feel a productivity lift. But there is no differentiation that belongs to your organization. Competitors can adopt the same skills.

**Skill-dependent + Producer** is the strongest position. You build skills optimized for your domain, those skills define your team's behavior, and over time the team's unique context accumulates inside those skills. Organizations in this position can migrate skills even when the agent tool changes. What has accumulated is not the tool but the methodology.

What Yeachan-Heo demonstrated is that even individuals can be skill producers. This is not the exclusive privilege of large organizations. By the nature of skills, small teams and individuals can move faster. A skill is a text file; deployment is one `git push`; the feedback loop runs through the community. If the product launch cycle of a large enterprise is quarterly, the release cycle of a skill is daily.

Ask your team: "Among our team's ways of working, what would be valuable to other teams?" Is there a checklist you always run through during code review? Is there a protocol you follow during incident response? Is there a verification step you always pass through when designing a new service? Is there a list of things never to miss before a data migration? Is there a sequence of steps you repeatedly explain to junior developers? Until now, those things were transmitted verbally or buried somewhere in a wiki. But if you distill them into a skill, you can make the agent behave the same way. Your team's tacit knowledge becomes the agent's behavioral rule. That could be your first skill.

SaaS turned software into a service. The skill economy is turning methodology into a product. The product unit became smaller, and as a result more people can be producers. In the history of the software industry, every time the product unit shrank, the industry grew explosively. PCs created the software industry, the web created the SaaS industry, smartphones created the app industry. The Agent Harness is now creating the skill industry. A 17,000-star text file is the proof. The product of the agent era is not code but methodology, not feature but behavior. And this change has already begun.

---

## References

- GitHub Trending data (2026-04-03)
- obra/superpowers GitHub repository
- affaan-m/everything-claude-code GitHub repository
- Yeachan-Heo/oh-my-claudecode GitHub repository
- mvanhorn/last30days-skill GitHub repository
- bytedance/deer-flow GitHub repository
