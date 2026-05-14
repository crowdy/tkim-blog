---
title: 'The Great Exodus from OpenClaw: Why Hermes Agent Pulled 53,000 Stars in a Single Week'
description: 'When developers switch agents not because "the new one has more features" but because "they can no longer trust the old one," the question is no longer about technical competition. It is about a crisis of trust. What is actually happening inside the AI agent ecosystem?'
pubDate: 2026-04-16T00:00:00.000Z
lang: 'en'
pairSlug: 'hermes-agent-trust-migration'
draft: false
---
# The Great Exodus from OpenClaw: Why Hermes Agent Pulled 53,000 Stars in a Single Week

> When developers switch agents not because "the new one has more features" but because "they can no longer trust the old one," the question is no longer about technical competition. It is about a crisis of trust. What is actually happening inside the AI agent ecosystem?

## Introduction

During the second week of April 2026, an unusual number surfaced on GitHub Trending. `hermes-agent`, an AI agent framework built by Nous Research, picked up more than 53,000 stars in a single week. The number two project that week was Andrej Karpathy's Claude Code skill files at 30,000 stars, meaning hermes-agent nearly doubled the runner-up.

GitHub stars are not, of course, a direct proxy for quality. Viral effects, bots, and fleeting curiosity can all distort them. But hermes-agent's case is hard to explain by virality alone. After a quiet v0.1.0 release on February 25, the repo amassed over 90,000 cumulative stars in less than two months, and a fork count of 12,400 signals that this project has crossed from "things people look at" into "things people actually use."

Behind that explosive growth is a single event that shook the AI agent ecosystem during the same period.

## OpenClaw in March: 138 CVEs and 824 Malicious Skills

To understand Hermes Agent's rise, you have to understand what happened to OpenClaw.

As of early April 2026, OpenClaw held over 345,000 GitHub stars and was the de facto standard in the AI agent space. Built around the vision of "connect AI to everything," it shipped with a sprawling integration ecosystem and a skill marketplace called ClawHub. In March 2026, that same OpenClaw walked into an unprecedented security crisis.

From March 18 to March 21, in just four days, nine CVEs were disclosed. Among them, CVE-2026-32922 received a CVSS score of 9.9 out of 10, a critical rating. The vulnerability surfaced in OpenClaw's device token refresh flow: a token with restricted privileges could be used to mint a full administrator token. A fundamental flaw in the permission design.

The real shock, however, was not the CVEs. When the security firm Koi audited the ClawHub marketplace, 341 of the initial 2,857 registered skills contained malicious code. 335 of these were linked to a single campaign called "ClawHavoc," designed to siphon credentials from cryptocurrency wallets including MetaMask, Phantom, and Trust Wallet. As the marketplace grew past 10,700 skills, the number of confirmed malicious entries climbed to 824.

Consider the scale. There were more than 135,000 OpenClaw instances exposed on the internet across 82 countries, and 63 percent of them operated without authentication. Anyone with network access could send a pairing request.

This was not a routine bug. It was a structural event that exposed how fragile supply-chain security has become for agent infrastructure. ClawHub replayed, almost line for line, the supply-chain attack problems that npm and PyPI have wrestled with for years. The structural contradiction in which "installing a convenient skill" is also "handing unverified code to an agent that has execution privileges" finally manifested as real-world damage.

## Developers Looking for the Exit

It was a natural reaction for developers to start hunting for alternatives. On X (Twitter), Reddit, Hacker News, and Discord servers, declarations of leaving OpenClaw piled up. The most frequently mentioned destination was Hermes Agent.

The interesting part is why developers picked Hermes. It was not because it had more features. OpenClaw still outclasses Hermes on raw capability: 345,000 stars, a skill ecosystem of more than 10,700 entries, native multi-agent support. On a pure feature checklist, Hermes loses.

The keyword developers kept repeating was **trust**.

"Finally, a trustworthy alternative to OpenClaw. The deciding factor was that this is the same team behind the excellent Hermes model series." Comments of this shape kept reappearing across communities. The technical credibility Nous Research had accumulated over years of open-source LLM fine-tuning carried over into a wholly different decision: which agent framework to adopt.

OpenRouter confirmed that Hermes "trended all week and made multiple leaderboards." A hackathon hosted by Nous Research drew 187 submissions. These were signals that community interest had moved beyond curiosity into actual use and contribution.

## What Hermes Agent Actually Is: What Does a "Growing Agent" Mean?

Trust and timing carried a lot of weight in Hermes's rise, but a project does not grow this fast without technical substance. It is worth examining what genuinely separates Hermes Agent from the existing crop of agent frameworks.

### Closed Learning Loop

Hermes Agent's central differentiator is its "closed learning loop." Most AI agents are static. Give them tools and they use those tools; give them instructions and they follow them, but they cannot generate new capabilities from experience. Each session ends and they start over from zero.

Hermes operates differently. After completing a complex task, it analyzes the experience and automatically generates a reusable "skill document." That skill is stored in persistent memory and is invoked automatically the next time a similar task appears. The skill itself improves through use.

According to benchmarks, Hermes instances using self-generated skills complete research tasks **40 percent faster** than instances starting from scratch. The claim of "an agent that speeds up the more you use it" is, in other words, not just marketing copy but measured behavior.

### Cross-Session Recall

The second pillar is the memory system. Hermes uses FTS5 (SQLite full-text search) to index every past session, and combines it with LLM-based summarization to recall conversations from weeks ago. It also supports Honcho dialectical user modeling to incrementally learn a user's working patterns, preferences, and context.

This matters because the most common complaint about AI agents is "I have to explain everything from scratch every single time." Hermes attempts to solve that at the architectural level. Through `SOUL.md` (the agent persona), `MEMORY.md` (persistent memory), and `USER.md` (the user profile), context survives across sessions.

### Extreme Flexibility: From a $5 VPS to a GPU Cluster

The third differentiator is deployment flexibility. Hermes supports six terminal backends (local, Docker, SSH, Daytona, Singularity, Modal) and runs on the same codebase from a $5 VPS to a GPU cluster. With Modal or Daytona, a serverless deployment incurs almost no cost while idle.

There is also no model lock-in. A single line, `hermes model`, switches between Nous Portal, OpenRouter (more than 200 models), OpenAI, MiniMax, Hugging Face, and others without code changes. Contrast that with Claude Code, which is tied to Anthropic's models, or OpenClaw, which is tuned for specific model combinations.

Layered on top is multi-platform accessibility through a single gateway: Telegram, Discord, Slack, WhatsApp, Signal, Email, and Home Assistant. That breadth indicates Hermes is reaching past "developer tool" toward "personal AI assistant."

## So What Can You Actually Do With It: A Practical Hermes Agent Guide

The architecture is impressive, but how do you actually use it, and what is genuinely possible? Let us look at concrete usage and automation scenarios.

### Getting Started in Five Minutes

Installation and bootstrap are surprisingly simple.

```bash
# One-line install
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# Start a conversation
hermes

# Pick a model (200+ available)
hermes model

# Inspect tool configuration
hermes tools
```

After installation, a single `hermes` command opens a conversation in your terminal. The initial setup asks you to choose an LLM provider: Nous Portal (their own), OpenRouter, OpenAI, MiniMax, all switchable without code changes. If budget is tight, you can start with a free model through OpenRouter.

### Core Usage Scenarios: Beyond a Coding Agent

The fundamental difference between Hermes Agent and Claude Code or other coding agents is that **Hermes is not specialized for coding**. As a general-purpose autonomous agent, it covers the following scenarios with a single tool.

**Daily automation: built-in cron scheduler**

```bash
# "Every morning at 8 AM, summarize tech news and post it to Slack."
# "Every Friday evening, compile this week's GitHub commits into a report."
# "Every night at midnight, analyze server logs and ping me on Telegram if something looks off."
```

The built-in cron scheduler lets you describe recurring tasks to the agent in natural language. The configured automations push their output to any connected messaging platform (Slack, Telegram, Discord, etc.).

**Multi-platform assistant: one agent, eight surfaces**

```bash
# Start the gateway. Connects every messaging platform at once.
hermes gateway
```

A single Hermes instance handles Telegram, Discord, Slack, WhatsApp, Signal, Email, and Home Assistant simultaneously. You can start a thread on Slack and continue it on Telegram. Thanks to cross-session recall, "that thing we talked about on Slack earlier" still resolves correctly inside the agent's context.

**Research automation: sub-agent delegation**

```
"Read each of these three papers and summarize them. Then compare and contrast their findings."
```

Hermes can spawn independent sub-agents to parallelize work, summarizing three papers concurrently and then aggregating the result. Each sub-agent runs in an isolated environment, so the context cost is near zero.

**Server management and DevOps**

```
"Check disk usage on the production server, and if any partition is above 80 percent, clean out unnecessary logs."
"Inspect the state of Docker containers, and if any service is down, restart it."
```

Through the SSH terminal backend, Hermes connects directly to remote servers and runs commands. Using Modal or Daytona backends, you can run a serverless setup that costs almost nothing at idle while still being able to execute work immediately when needed.

### What Changes Once Skills Accumulate

The scenarios above might look doable with existing agents. The difference shows up **in the repetition**.

Suppose you first ask, "Analyze this week's commits in this GitHub repository and produce a weekly report." Hermes finishes the task through trial and error. In the process, it auto-saves skills like "how to pull commit lists via the GitHub API," "report format," and "prompt structures that work well for summarization."

Next week, when you make the same request, the agent loads the stored skills and executes without the trial and error. The 40 percent speedup in the benchmark numbers comes from exactly this dynamic. Repeated workloads handled by the agent get faster over time, by design.

This is fundamentally different from OpenClaw's "pull skills from a marketplace" approach. A skill you produce is tuned to your environment, and because no external code is executed, the supply-chain attack risk is structurally lower.

### Cost Scenarios: How Small Can the Setup Go?

| Configuration | Monthly cost | Suitable use |
|---|---|---|
| Local (laptop) + free model | $0 | Testing, personal use |
| $5 VPS + cheap OpenRouter model | ~$10/mo | Personal automation, messaging bots |
| ConoHa VPS + Nous Portal | ~$20/mo | Team automation, research |
| Modal (serverless) + GPT-4o | Usage-based | Intermittent high-quality tasks |

Install Hermes on a $5 VPS, plug in a cheap OpenRouter model, and you can run a 24/7 personal AI assistant for under $10 a month. Switch to Modal during idle and the cost drops further. That kind of accessibility is one of the main reasons real-world adoption took off among developers.

## A Trust Crisis Inside a Trust-Driven Project

So far Hermes Agent might look like a flawless savior. But look more closely at the community and you find cracks in the project that are hard to dismiss.

### The Evolver Plagiarism Scandal: "Delete the Account"

In April 2026, the Chinese tech outlet 36kr dropped a bombshell report. The "self-evolution" module at the core of Hermes Agent allegedly cloned the architecture of an open-source engine called Evolver, built by a Chinese team known as EvoMap.

The evidence is concrete. Evolver's self-evolution algorithm has a ten-step loop structure, and Hermes's self-evolution module uses precisely the same ten-step loop. The programming languages differ (Evolver is Python, Hermes is Node.js). But the ordering and logical structure of the steps match. More damningly, twelve core terms have been swapped one-to-one. Same structure, only the variable names and concept labels changed.

The timing is suspicious. Evolver was made public on February 1, 2026. The Hermes self-evolution module was created on GitHub on March 9, 2026. A 36-day gap. And across seven official Nous Research documents, there is not a single mention of Evolver.

Nous Research's response made things worse. They replied, "Our repository was created in July 2025. We are the team that pioneered core technologies like YaRN in modern agent frameworks. Delete your account." But the main repo was private at the time, so independent verification was not possible, and the commit history of the self-evolution module clearly pointed to March 9. There was no direct rebuttal of the ten-step structural match or the twelve-term substitution.

The uncomfortable question this raises: if developers who fled OpenClaw's security catastrophe in search of a "trustworthy alternative" find that their alternative's core technology was lifted from someone else's code without proper attribution, what exactly is the standard for "trust"?

### Are 53,000 Stars All Real? The Bot Farm Question

There are also questions about the integrity of the star count. Several Reddit users flagged a pattern of days-old new accounts posting boilerplate-shaped Hermes promotion threads. The suspicion: organized marketing.

A look at community sentiment is also revealing. Positive comments tend toward emotional and generic phrasing such as "magical," "spooked me," and "the future," while negative comments are concrete and technical. That alone is not proof of bot activity. But for a team that emerged from a Web3 background and raised $70 million in total via token-based funding, it is difficult to fully rule out the possibility that resources were put into community marketing.

It is also worth pausing over the fact that the day the Hermes thread topped Hacker News with 1,064 points and 811 comments was the same day Anthropic blocked OpenClaw's access to Claude. The timing is too neat to wave off as coincidence.

### Technical Critique from the Field: The Real Limits of a "Growing Agent"

The technical critiques from actual users deserve attention too. Three problems keep recurring.

**First, the reliability of self-evaluation.** When Hermes evaluates its own task completion, it nearly always reports a positive result. One user reported a case where the data collection process had an obvious error, yet the agent self-graded the task as "successfully completed." The concern is that the much-touted learning loop is stacking skills on top of misplaced self-confidence.

**Second, automatic learning overwriting manual edits.** Experienced users have reported cases in which carefully tuned configurations were silently overwritten by the auto-learning system. The "growing agent" design ends up, paradoxically, disregarding the very domain expertise that advanced users bring.

**Third, an immature release history.** OpenClaw has been validated through 82 releases. Hermes Agent has shipped only six. Cranking out seven major releases in five weeks is evidence of development speed, but it also means long-term stability has not been proven.

## Structural Realignment in the AI Agent Market

If you take all this light and shadow and pull back, Hermes's rise looks like a signal that the AI agent market is transitioning from a feature contest to a trust contest. And ironically, the same shift is exposing just how complex and layered "trust" itself is.

Through 2025, the dominant axis of competition in the agent market was "what can it do?" More integrations, more tools, more model support. OpenClaw collected 345,000 stars precisely because that strategy worked.

But starting in March 2026, the question changed. From "what can it do?" to **"can I trust this?"** Once agents could touch the file system, run code, call APIs, and process payments, security and trust stopped being optional add-ons and became core requirements.

If you map the current positioning of the major agent frameworks, the picture looks like this.

Claude Code keeps both the model and the client under one company's control, which makes it closed but gives it a clear chain of security responsibility. Its benchmarks as a specialized coding agent are also the strongest.

OpenClaw has the broadest ecosystem, but that openness became the attack surface. The ClawHub malicious-skill crisis was the dark side of "anyone can contribute."

Hermes Agent stakes out an unusual middle position: open source, but reducing external dependency through self-learning. Having the agent build its own skills, rather than pulling them from a marketplace, structurally lowers supply-chain attack risk. But the Evolver plagiarism allegations and the bot-farm suspicions show how a project that wields "trust" as its main weapon can also damage that trust itself.

## Conclusion

The Hermes Agent story is not a simple success narrative. It is a case study in how complicated, how quickly manufactured, and how easily questioned "trust" can be in the agent era.

On one side, OpenClaw's security collapse: 138 CVEs, 824 malicious skills, 135,000 unprotected instances. On the other, Hermes Agent's explosive growth: 90,000 stars in two months, a closed learning loop that gets faster with use, and accessibility that runs on a $5 VPS.

But Hermes has its shadows too. Nous Research's "delete your account" response to allegations of uncredited reuse of a Chinese team's open-source code. The murky community dynamics behind 53,000 stars. The irony of a "growing agent" whose self-evaluation almost always gives itself a passing grade.

What this case ultimately tells us is one thing. In the agent era, **there is no easy answer to "who can I trust?"** Developers leapt from OpenClaw to Hermes because they could no longer trust OpenClaw, but Hermes is not a fully trustworthy destination either. The real lesson may be less about which project to believe in and more about never letting your guard down at the moment you hand over the keys to your system to any agent.

Those 53,000 stars may not have been the weight of trust. They may have been the weight of anxiety.

---

Sources:
- [NousResearch/hermes-agent — GitHub](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.4.0: What 300 PRs Signal for Agent Infrastructure](https://www.buildmvpfast.com/blog/hermes-agent-v04-open-source-agent-infrastructure-2026)
- [Nine CVEs in Four Days: Inside OpenClaw's March 2026 Vulnerability Flood](https://openclawai.io/blog/openclaw-cve-flood-nine-vulnerabilities-four-days-march-2026)
- [OpenClaw Security Risks: From Vulnerabilities to Supply Chain Abuse — Sangfor](https://www.sangfor.com/blog/cybersecurity/openclaw-ai-agent-security-risks-2026)
- [Hermes Agent Gains Momentum as Developers Compare It with OpenClaw](https://www.openpr.com/news/4465122/hermes-agent-gains-momentum-as-developers-compare-it-with)
- [Persistent AI Agents Compared — The New Stack](https://thenewstack.io/persistent-ai-agents-compared/)
- [The State of Hermes Agent — April 2026](https://hermesatlas.com/reports/state-of-hermes-april-2026)
- [Hermes Agent Caught Copying Chinese Team's Code — 36kr](https://eu.36kr.com/en/p/3767967755371011)
- [OpenClaw vs Hermes Agent: What Reddit Actually Says — Kilo](https://kilo.ai/articles/openclaw-vs-hermes-what-reddit-says)
- [Hermes Agent Hits 47,000 Stars in Two Months — 36kr](https://eu.36kr.com/en/p/3760771429958403)
