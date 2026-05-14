---
title: 'CLI Renaissance — Why the Terminal Became the Center of the World Again in the Age of AI Agents'
description: 'The GUI era is not over. But you cannot tell an AI agent to click a button. In 2026, the CLI tools developers have loved for decades are becoming the hands and feet of AI agents — and the terminal has returned to the center of software development.'
pubDate: 2026-03-07T13:38:19.735Z
lang: 'en'
pairSlug: 'cli-renaissance-agent-era'
draft: false
---
# CLI Renaissance — Why the Terminal Became the Center of the World Again in the Age of AI Agents

> The GUI era is not over. But you cannot tell an AI agent to click a button. In 2026, the CLI tools developers have loved for decades are becoming the hands and feet of AI agents — and the terminal has returned to the center of software development.

---

## 1. Why CLI, Why Now

The CLI (Command Line Interface) is the oldest interface in computing. It began in the Unix shells of the 1970s and has survived half a century. And yet, beginning in 2025, something strange has been happening. **The CLI isn't merely surviving — it's growing explosively.**

In a late-2025 piece, The New Stack named the phenomenon the **"Agentic CLI Era."** In the 2025 Stack Overflow survey, combined Vim/Neovim usage rose to 38.3% — another signal that developers are migrating back to terminal-based workflows.

The reason is simple. **For AI agents, the CLI is the most natural interface.**

Calling an API directly requires authentication headers, pagination, error handling, SDK version management — boilerplate. Using an MCP (Model Context Protocol) server means tool schemas alone burn tens of thousands of tokens. But the CLI? LLMs have already been trained on billions of lines of terminal interactions. `git`, `docker`, `kubectl`, `gh` — **the model's training data is itself the CLI's documentation.**

A practitioner's line nails the situation:

> "The model already knows how to use grep. It doesn't need a JSON schema to tell it."

---

## 2. The CLI Tools Developers Love — By Category

Let's walk through the CLI tools developers use day to day, organized by category. Each of them is becoming a "skill" in the AI-agent sense.

### Cloud CLIs — Infrastructure from the Terminal

| Tool | Target | Killer Feature |
|------|--------|----------|
| **aws** | AWS (200+ services) | `--query` JMESPath output filtering, the widest service coverage |
| **gcloud** | Google Cloud | The most consistent command design; `gcloud run deploy --source .` deploys in one line |
| **az** | Microsoft Azure | Azure AD/Entra ID integration, optimal for enterprise |
| **vercel** | Vercel | The single word `vercel` detects the framework, builds, and deploys |
| **flyctl** | Fly.io | `fly launch --now` detects Docker and deploys to the global edge |
| **railway** | Railway | `railway up` deploys without a Dockerfile; handles ~10M deploys/month |

Among these, `gcloud` is widely regarded as the best-designed of the three major cloud CLIs. Every service follows the consistent pattern `gcloud [service] [resource] [verb]`. That structure makes it easy for an AI agent to **infer** the commands for a new service.

```bash
# gcloud: consistent-pattern example
gcloud compute instances list
gcloud run services list
gcloud functions list
# Same pattern → an agent can infer it
```

### Git Platform CLIs — PRs and Issues from the Terminal

**gh (GitHub CLI)** — 42,900 stars, v2.87.3 (February 2026)

GitHub's official CLI is one of the external tools Claude Code uses most. PR creation, issue management, Actions status, code review — no browser required.

```bash
# From PR creation to auto-merge in one line
gh pr create --fill && gh pr merge --auto --squash

# JSON output to extract only the fields you need
gh pr list --json number,title,state | jq '.[] | select(.state=="OPEN")'
```

`gh`'s `--json` flag shines particularly in the AI-agent era. Instead of a human-readable table, it returns JSON the machine can parse easily. Field selection minimizes wasted token consumption.

**glab (GitLab CLI)** — GitLab's official CLI

```bash
# Create an MR + watch CI status live
glab mr create --fill --yes && glab ci status --live
```

`glab ci view` displays CI/CD pipeline status live in the terminal. You can pull logs for a failed job instantly without opening the GitLab UI.

### Container/Infrastructure CLIs — Infrastructure as Code

| Tool | GitHub Stars | Killer Feature |
|------|------------|----------|
| **docker** | 71,500 | `docker compose up` — a single YAML brings up a multi-service stack |
| **kubectl** | 110,000+ | `kubectl apply -f` — the standard for declarative state management |
| **terraform** | 47,900 | `terraform plan` — a diff preview of infrastructure changes |
| **pulumi** | 21,000 | IaC in real programming languages (TS/Python/Go) |

Terraform's `plan` → `apply` pattern is especially important for AI agents. Before the agent modifies infrastructure, it can **see what will change first**. The same pattern is being adopted by `--dry-run` in gws, `--dry-run` in gh, and many other CLI tools.

### Package/Runtime CLIs — Fast, and Faster

| Tool | Trait | Speed |
|------|------|------|
| **npm** | 2.5M+ packages, bundled with Node.js, `npx` runs without install | Baseline |
| **bun** | All-in-one runtime + bundler + tester + package manager | 20–40× faster install than npm |
| **cargo** | Rust build system, integrated tests / benchmarks / docs | Best-in-class integrated experience |
| **uv** | Rust-based Python package manager, a pip replacement | 10–100× faster install than pip |

**uv**, released in 2024, was adopted explosively through 2025. Over 75,000 GitHub stars. It replaces pip, pip-tools, virtualenv, pyenv, and poetry **with a single binary**. Major Python projects including FastAPI and Pydantic have adopted uv.

```bash
# uv: from Python project init to run
uv init myproject && uv add fastapi uvicorn && uv run fastapi dev
```

**Bun** was acquired by Anthropic in December 2025 — Anthropic's first acquisition ever. Claude Code ships as a Bun-built executable. A JavaScript runtime becoming AI-agent infrastructure is a symbolically loaded event.

---

## 3. New CLI Tools Released in 2025–2026

From 2025 through March 2026, the CLI market saw an unprecedented release rush. In particular, **AI coding-agent CLIs** formed a new category.

### AI Coding-Agent CLIs — The AI War on the Terminal

| Tool | Released | GitHub Stars | Defining Trait |
|------|------|------------|----------|
| **Claude Code** (Anthropic) | Preview 2025.2, GA 2025.5 | 26,000+ | The thinnest wrapper. Leverages existing CLIs via the Bash tool. $2.5B annual revenue |
| **Codex CLI** (OpenAI) | 2025.4 | Open source (Rust) | Three approval modes (read-only/auto/full). Local agent |
| **Gemini CLI** (Google) | 2025.6 | 70,000+ | The most generous free tier. 1M-token context. Extension marketplace |
| **Copilot CLI** (GitHub) | Preview 2025.9, GA 2026.2 | Subscription | Multi-model (Claude/GPT/Gemini). Autopilot mode |
| **Goose** (Block/Square) | 2025.1 | 30,000+ | MCP-native. Donated to the Linux Foundation |
| **OpenCode** | 2025 | 95,000+ | Go-based, 75+ model support (including Ollama). Free |
| **Aider** | 2023~, major 2025 update | 41,600 | Git-first design. AI change = automatic commit |

According to The New Stack's 2026 guide, **more than 15 serious AI coding CLIs** are now competing. A year ago, the category didn't exist.

**Claude Code's growth curve is particularly worth pausing on.** Six months after its May 2025 GA, it crossed $1B in annual revenue; today it runs at around $2.5B. Given that ChatGPT took about two years to reach a comparable run rate, the velocity is striking. Netflix, Spotify (two-thirds of staff adoption), KPMG, L'Oréal, and Salesforce are users.

### Productivity / Platform CLIs — The "Agent First" Wave

| Tool | Released | Core |
|------|------|------|
| **gws** (Google Workspace CLI) | 2026.3 | Drive·Gmail·Sheets·Calendar integration, embedded MCP server, 100+ agent skills |
| **Jules Tools** (Google) | 2026.2 | CLI companion to the Jules async agent. Parallel execution, diff viewer |
| **Warp 2.0** | 2025.6 | "The first agentic development environment." AI agent integrated into the terminal itself |

**gws (Google Workspace CLI)** hit 14,500 GitHub stars within three days of release and reached #1 on Hacker News. Its core architecture reads Google's Discovery Service at runtime to generate commands dynamically. Vercel CEO Guillermo Rauch, after seeing it, declared **"2026 is the year of Skills & CLIs."**

---

## 4. CLI vs API vs MCP — The Hard Numbers on Token Efficiency

The most concrete reason AI agents prefer CLI is **token cost**. The benchmark data is plain.

### MCP's Hidden Cost

An MCP server loads tool schemas into the agent's context window. The problem is that these schemas burn tens of thousands of tokens **before any work even begins**.

| Scenario | MCP Token Use | CLI Token Use | Delta |
|----------|-------------|-------------|------|
| GitHub workload (93 tool schemas) | ~55,000 | ~0 (training data) | **275×** |
| Multi-server (GitHub+DB+Jira) | ~150,000+ | ~2,000 | **75×** |
| Intune compliance task | 82,300 | ~6,700 | **12×** |
| File conversion task | Baseline | −40% | **1.4×** |

Jannik Reinhard's benchmark is the most dramatic. On the same Intune compliance task:

- **MCP approach**: System prompt + schemas consume 82,300 tokens. Of the 128K window, only 45,700 are available for reasoning. After three or four tool calls, context exhaustion makes **agent reasoning collapse**.
- **CLI approach**: Only about 6,700 tokens consumed. 121,300 tokens remain available for reasoning. In a single session, **edge cases are handled preemptively, end to end**.

The result: **a 35× difference in token usage**. On the Token Efficiency Score, CLI (202) beat MCP (152) by **33%**.

### Why the Gap

**1. Zero schema overhead.** The CLI doesn't need tool definitions loaded into context. The LLM has already learned `git`, `docker`, `kubectl`, `aws`, `gh`, and friends from training data. 95% of the context window remains for actual reasoning.

**2. Selective output.** CLI uses pipelines (`cmd1 | cmd2 | jq '.field'`) to filter output at the shell level. What reaches the model is only the data needed. APIs/MCP return entire structured responses that the model has to parse.

**3. Composability.** CLI pipelines chain operations without intermediate token consumption. MCP requires a round-trip per tool call.

**4. Output-format efficiency.** Token consumption varies sharply by format, even for the same data. Pretty tables consume **about 10× more tokens** than the equivalent JSON. Specifying fields like `gh pr list --json number,title,state` drives token consumption down sharply.

### Anthropic's Solution — Tool Search

Anthropic also recognized the MCP token problem and built the **Tool Search Tool**. Instead of preloading every tool, it searches for and loads only the tools needed.

- Full preload: ~77,000 tokens consumed
- Tool Search (lazy load): ~8,700 tokens consumed
- **Result: 95% of the context window preserved**

Accuracy improved dramatically too. Claude Opus 4's MCP-evaluation accuracy jumped from 49% to 74%. This is evidence that beyond token cost, **context pollution itself degrades model performance**.

Claude Code automatically switches from preloading to search-based loading when tool descriptions exceed 10% of the context window.

---

## 5. How Claude Code Uses the CLI

Claude Code's architecture stands on the principle Anthropic calls **"do the simple thing first."** Rather than building elaborate custom tools, it **uses the thinnest possible wrapper to surface Claude's native abilities.**

The core tool is, effectively, shell access. Claude Code gives the model a Bash tool and file read/write tools, then lets it freely use every CLI installed in the environment.

```
User: "Find why CI is failing on this PR and fix it"

Claude Code's execution flow:
1. gh pr view 123 --json statusCheckRollup    ← GitHub CLI
2. gh run view 456789 --log-failed            ← Inspect failure logs
3. Read src/api/handler.ts                     ← Read file
4. Edit src/api/handler.ts                     ← Fix bug
5. npm test                                    ← Run tests
6. git add -p && git commit                    ← Commit
7. gh pr comment 123 --body "Fixed..."         ← Comment on PR
```

In this entire flow, Claude Code calls the GitHub API directly **not even once**. The `gh` CLI is already authenticated and handles pagination, error handling, and output formatting. The authentication headers, URL construction, and JSON parsing code you'd need to write for a direct API call become unnecessary.

This is the philosophy of **"every CLI is an implicit MCP server."** Each CLI tool is already a complete interface with authentication, input validation, output formatting, and error handling baked in. You don't need to build a separate MCP server — the CLI already plays that role.

Alexis Gallagher, in his January 2026 essay "Why Claude Code Won (for now)," put it this way:

> "Claude Code won *not despite but because of* the command line. The CLI is a uniquely flexible environment from another era of computing — the only preinstalled integration environment where two independently authored programs can easily combine and interact."

The CLI as an interface is **the very cause of the win**. The only preinstalled integration environment where two independently authored programs can combine and interact easily — that's the command line.

---

## 6. MCP vs CLI — Not Either/Or, But Coexistence

This isn't an argument to drop MCP and use only the CLI. **Each shines in different territory.**

### When CLI Wins
- Using tools the agent **already knows** (git, docker, aws, gh...)
- Long tasks where token efficiency matters
- When **composition** via Unix pipelines is needed
- Local development environments

### When MCP Wins
- Services that **have no CLI** (Figma, Notion, custom business APIs)
- **Enterprise** settings that need fine-grained RBAC and OAuth
- **Multi-step** workflows requiring state
- Environments without shell access (mobile, chat interfaces)
- When you need to **prevent** the agent from hallucinating flags

Sentry co-founder David Cramer captures it pragmatically:

> "If skills teach you to cook, MCP provides the instruments that let you do it."

His actual setup is a **hybrid**: 2 MCP servers + 12 Skills. Tool zealotry is unhelpful; the right answer is the best mix for the situation.

**Google Workspace CLI (gws)** is the model case of this coexistence. It plays three roles at once:
1. **Human-facing CLI** — direct command execution in the terminal
2. **MCP server** — `gws mcp -s drive,gmail,calendar` connects to MCP-compatible apps
3. **Skills provider** — 100+ agent skills support natural-language operation

One tool spanning all three paradigms — CLI, MCP, Skills — is the direction of tool design in 2026.

---

## 7. Strategic Moves — Big Tech's CLI Bets

There are strategic moves that show the CLI renaissance isn't just a passing trend.

**Anthropic's acquisition of Bun (Dec 2025)** — Anthropic's first-ever acquisition was a JavaScript runtime, because Claude Code is built on Bun. We're in an era where an AI company invests in CLI infrastructure.

**Google's dual-CLI strategy** — Gemini CLI (2025.6) for AI coding agents, gws (2026.3) for Workspace agents. Google is turning the terminal into the integrated touchpoint of its ecosystem.

**GitHub Copilot CLI GA (Feb 2026)** — Microsoft/GitHub also entered terminal-native agents fully. A multi-model strategy supporting Claude Opus 4.6, GPT-5.3-Codex, and Gemini 3 Pro concurrently.

**MCP donated to the Linux Foundation (Dec 2025)** — Anthropic's MCP, with participation from OpenAI, Google, Microsoft, AWS, and Block (Goose), has become a vendor-neutral standard. The coexistence of CLI and MCP is being codified as industry standard.

**Warp 2.0 (Jun 2025)** — "The first agentic development environment." An AI agent (Oz) integrated into the terminal itself. Over the course of 2025, 3.2 billion lines of code were edited in Warp.

---

## 8. For Developers — What to Do Now

The CLI renaissance demands concrete action from developers.

### Go Deeper on the CLIs You Already Use

`gh`, `git`, `docker`, `kubectl`, `aws` — learn the **advanced features** of tools already on your machine. Field selection in `gh pr list --json`, JMESPath filtering in `aws --query`, JSONPath in `kubectl` — these decide the efficiency of your AI agent.

### Try the New CLIs

- **uv** — if you're managing Python environments, it's worth switching today
- **bun** — 20–40× faster package install than npm
- **gws** — manage Google Workspace from the terminal (still experimental, but the direction is clear)

### Adopt at Least One AI Coding CLI

Claude Code, Gemini CLI, Codex CLI, Aider, OpenCode — integrate at least one into your daily workflow. As of 2026, developing without an AI coding CLI is the same kind of handicap as coding without an IDE.

### If You Build CLIs — Design for Agents

If you maintain or build a service CLI:
- A `--json` output option is no longer optional; it's required
- Provide `--dry-run` previews for destructive operations
- Consider schema introspection (a `schema` subcommand)
- **Design assuming an agent will use it**

---

## Closing — The Oldest Interface Becomes the Newest

The CLI's history runs half a century. In all that time, the CLI never died. The GUI arrived, the web arrived, mobile arrived, no-code arrived — and the terminal was always still there.

But what's happening in 2025–2026 is not mere survival. **The CLI is being repositioned at the front line of software interfaces.** A new kind of user, the AI agent, has appeared, and for that user the most efficient interface is the CLI.

Claude Code at $2.5B in annual revenue. Gemini CLI at 70,000 stars. gws at 14,500 stars three days post-launch. OpenCode at 95,000 stars. The numbers attest to the trend.

**In 2026, the terminal is no longer "a power user's tool." It is the center stage of software development where AI agents and humans coexist.** The oldest interface has become the default interface of the newest era.
