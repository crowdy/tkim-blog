---
title: 'The Return of the CLI — Google Workspace CLI (gws) and the Dawn of the "Agent First CLI" Era'
description: 'In 2026, Google unified Gmail, Drive, Sheets, and Calendar into a single command line. But the real users of this CLI are not humans — they are AI agents. 14,500 GitHub stars in three days and a #1 Hacker News slot — the CLI is back, but for entirely different reasons than before.'
pubDate: 2026-03-07T13:25:58.368Z
lang: 'en'
pairSlug: 'google-workspace-cli-agent-era'
draft: false
---
# The Return of the CLI — Google Workspace CLI (gws) and the Dawn of the "Agent First CLI" Era

> In 2026, Google unified Gmail, Drive, Sheets, and Calendar into a single command line. But the real users of this CLI are not humans — they are AI agents. 14,500 GitHub stars in three days and a #1 Hacker News slot — the CLI is back, but for entirely different reasons than before.

---

## 1. The CLI Is Back — Only This Time, It's Different

The CLI (Command Line Interface) didn't die. It's having a resurgence.

In the early 2020s, during the heyday of no-code and low-code platforms, the CLI was treated as "the developers' rusty tool." In a world where Zapier and Make built workflows via drag-and-drop, where Notion and Airtable solved everything through a GUI, typing commands into a terminal looked like an anachronism.

Then the AI agent era opened, and the situation flipped completely. **For an AI agent, the GUI is the peak of inefficiency.** Agents have no need to click buttons or drag and drop. They put in structured input and receive structured output — that is the most natural interface for an agent. And that is exactly what a CLI is.

Right after gws shipped, Vercel CEO Guillermo Rauch declared on X (Twitter):

> **"2026 is the year of Skills & CLIs"**

It's a declaration that the CLI is becoming the **default interface** for both human operators and AI agents interacting with cloud services. And Google has jumped right into the middle of this current.

---

## 2. What gws Is — One CLI for All of Google Workspace

On March 5, 2026, under Google's `googleworkspace` GitHub organization, the **Google Workspace CLI (command: `gws`)** went public. Written in Rust, distributed via npm, open source under Apache 2.0.

```bash
npm install -g @googleworkspace/cli
```

That one line is the entire install. And the list of services this single CLI reaches is staggering.

| Service | What You Can Do |
|--------|--------------|
| **Google Drive** | File/folder CRUD, permission management, search |
| **Gmail** | Read/send messages, label management, thread search |
| **Google Calendar** | Create/edit events, calendar management |
| **Google Sheets** | Create spreadsheets, read/write cells, range operations |
| **Google Docs** | Create/edit documents |
| **Google Chat** | Manage spaces, send messages |
| **Admin Console** | Manage users, groups, devices |
| **+ 20 more** | YouTube, Forms, Classroom, and others |

The crucial point here is that **these commands are not statically coded**. gws reads Google's Discovery Service at runtime to **dynamically generate** its command surface. When Google adds a new API, gws picks it up automatically after its 24-hour cache refresh, with no code changes required. This is a fundamentally different approach from existing CLI tools.

**All output is JSON.** Not a human-friendly table format — structured data the machine can parse, by default. The designer's own words capture the philosophy starkly:

> "Humans hate writing nested JSON in the terminal. Agents prefer it."

gws is a CLI built for agents.

There's an important caveat. gws is **not an official Google product.** The GitHub repository states "Not an officially supported Google product," and GIGAZINE described it as a "hobby-oriented project run by certain employees." The current version is 0.4.4 — still early-stage.

---

## 3. Real Usage — Driving Workspace from the Terminal

Let's see what gws feels like in practice. Start with authentication.

```bash
# One-time: create Google Cloud project + enable APIs (automated)
gws auth setup

# OAuth login
gws auth login
```

After that, all of Workspace is inside the terminal.

### Drive — File Management

```bash
# List the 10 most recent files
gws drive files list --params '{"pageSize": 10}'

# Upload a file
gws drive files create --json '{"name": "report.pdf"}' --upload ./report.pdf

# Stream all files (automatic pagination)
gws drive files list --params '{"pageSize": 100}' --page-all | jq -r '.files[].name'
```

### Sheets — Spreadsheet Operations

```bash
# Create a new spreadsheet
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'

# Read a cell range
gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1:C10"}'

# Append data
gws sheets spreadsheets values append \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1", "valueInputOption": "USER_ENTERED"}' \
  --json '{"values": [["Name", "Score"], ["Alice", 95]]}'
```

### Chat — Send Messages (with dry-run support)

```bash
# Preview before actually sending
gws chat spaces messages create \
  --params '{"parent": "spaces/xyz"}' \
  --json '{"text": "Deploy complete."}' \
  --dry-run
```

### Checking the API Schema

```bash
# Inspect parameter structure for a specific API method
gws schema drive.files.list
```

`--dry-run` lets you preview the request before execution, `--page-all` handles pagination automatically, and `gws schema` introspects API structure on demand. `--dry-run` in particular doubles as a safety guard for AI agents about to perform destructive operations — a particularly useful feature in the agent era.

---

## 4. AI Agent Skills — gws's Real Weapon

The CLI features alone are impressive enough, but **the real differentiator is the 100+ AI agent skills**. Covering Gmail, Drive, Sheets, Docs, Calendar, Chat, and Admin, these skills let AI agents operate Google Workspace through natural language.

### Installing the Skills

```bash
# Install all skills
npx skills add https://github.com/googleworkspace/cli

# Install only the skills for specific services
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-drive
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-gmail
```

### Embedded MCP Server

gws ships with an **embedded MCP (Model Context Protocol) server**. It connects directly to MCP-compatible applications such as Claude Desktop, VS Code, and Gemini CLI. The implication is significant — say to Claude Code, "Find this month's sales report in Drive and summarize it," and Claude, via the gws MCP server, can search Drive, read the file, and produce the summary.

### Major AI Agent Integrations

| Agent Platform | Integration |
|----------------|----------|
| **Claude Desktop / Claude Code** | Direct MCP server connection |
| **Gemini CLI** | `gemini extensions install` |
| **OpenClaw** | Symlink-based skills |
| **VS Code (Copilot)** | MCP protocol |

The Gemini CLI integration is particularly interesting.

```bash
gws auth setup
gemini extensions install https://github.com/googleworkspace/cli
```

Two lines, and Gemini has access to all of Google Workspace. From Google's vantage point, this is also strategic groundwork: one CLI threading its own AI through its own productivity suite.

A Hacker News comment summed up the efficiency of this approach:

> "MCPs are bloated, insecure token hogs. CLIs are easy to write."

The argument: CLI-based access is more token-efficient and easier to maintain than building a separate MCP server. gws plays both sides — embedding an MCP server while letting the CLI itself function as an agent tool.

---

## 5. What's Different from gcloud — A Fundamental Difference in Design Philosophy

"There's already gcloud — why build another CLI?" — the question that comes up most often. The answer is simple. **The targets themselves are different.**

| Item | gws | gcloud |
|------|-----|--------|
| **Target services** | Google Workspace (Drive, Gmail, Sheets, etc.) | Google Cloud Platform (Compute, Storage, BigQuery, etc.) |
| **API coverage** | Dynamically generated from Discovery Service → auto-updated | Static command set → manual updates |
| **Design philosophy** | **Agent First** — JSON I/O by default | **Human First** — flag-based, readable output |
| **Agent skills** | 100+ built in | None |
| **MCP support** | Built in | None |
| **Authentication** | Own OAuth + can link to gcloud | Google Cloud SDK auth |
| **Language** | Rust | Python |
| **Distribution** | npm | standalone installer |

gcloud is a tool for human DevOps engineers managing cloud infrastructure. Type `gcloud compute instances list` and a human-readable table appears. gws, by contrast, was designed from the start as a tool for AI agents to manipulate Google Workspace data. Every input is structured via `--json` and `--params`, and every output is parseable JSON.

**The architectural choice of dynamic API generation is also pivotal.** With gcloud, whenever a new GCP service ships, the CLI team has to implement the commands by hand. Because gws reads Google's Discovery Service at runtime, additions to Google Workspace surface automatically. In an agent ecosystem this is decisive — the agent can always reach the latest API.

In a line: **gcloud is the Cloud CLI for humans; gws is the Workspace CLI for agents.** Not competitors, but complements.

---

## 6. A Zapier/Make Killer? — The Competitive Field and the Cost Math

A question raised the moment gws launched: "Isn't this a Zapier/Make replacement?"

The short answer: **not a direct replacement, but in specific usage scenarios, definitively threatening.**

| Item | gws CLI | Zapier | Make |
|------|---------|--------|------|
| **Cost** | Free (open source) | From $49/month (Pro) | From $16/month (Core) |
| **Integration style** | CLI + JSON, direct API calls | GUI workflow builder | Visual scenario builder |
| **Target users** | Developers, AI agents | Non-technical to technical | Non-technical to technical |
| **Integration breadth** | Google Workspace only | 7,000+ apps | 2,000+ apps |
| **AI agent integration** | Embedded MCP server, 100+ skills | Separate AI plugin | AI module available |
| **Automation approach** | Natural-language prompt → CLI command | Trigger-action chains | Visual scenarios |

**Scenarios where gws wins:**
- Automations that complete inside Google Workspace (Gmail → Sheets → Calendar)
- Workflows driven by an AI agent
- Cost-sensitive startups or solo developers
- When you want to do a complex job with a single prompt line

**Scenarios where Zapier/Make remain strong:**
- Integration with non-Google apps such as Salesforce, Slack, HubSpot
- Cases where non-developers need to build the automation
- When enterprise-grade error handling and monitoring are required

The workflow-automation SaaS market is forecast to grow from roughly $13.8B in 2023 to $26.5B by 2028. Rather than directly eating into that market, gws will more likely **open a new category — automation driven by AI agents** — and force a strategic rethink from incumbents.

The cost-structure gap is particularly worth flagging. Zapier Pro is $49/month, Make Core $16/month; gws is fully free. For teams whose primary stack is Google Workspace, the combination of an AI agent plus gws can save tens or hundreds of dollars a month in automation cost. With "end-to-end workflow orchestration in a single system prompt" becoming feasible, the need to route through a third-party platform is starting to evaporate in some scenarios.

---

## 7. Community Reception and Limits — Between Hype and Reality

### Explosive Response

The community reception to gws was exceptional.

- **Hacker News #1** — 936 points, 289 comments
- **GitHub stars** — over **14,500** within three days of release
- **Vercel CEO Guillermo Rauch** personally recommended it on X
- **VentureBeat, Ars Technica, PCWorld, MarkTechPost** and other major tech outlets covered it in unison

One Hacker News comment likened gws this way:

> "This is like terraform, but for Google Drive files."

In the same way infrastructure is managed as code, the era of managing Google Workspace data via CLI has arrived.

### The Cold Reality — The OAuth Setup Wall

But behind the enthusiasm is a hard reality. **The most-discussed issue is the complexity of OAuth setup.**

To use gws you first have to create a project in the Google Cloud Console, configure the OAuth consent screen, and create client IDs. `gws auth setup` tries to automate this, but reality bites.

**Major issues:**

1. **Google Cloud project creation required** — the first hurdle that non-technical users struggle to clear. One Hacker News user put it bluntly: *"All of that went away when I realized you need to create an app in GCP."*

2. **Scope-bloat problem** — the default recommended scope set requests 85 permissions. Unverified apps are limited to roughly 25 scopes, so auth failures are frequent. The fix is to specify only the services you need via `gws auth login --scopes drive,gmail,sheets`.

3. **Advanced Protection users blocked** — accounts enrolled in Google's Advanced Protection Program are completely blocked with a `policy_enforced` error.

4. **Setup time** — one user reported that following the official docs to a baseline setup took **45 minutes**.

5. **OAuth client type caveat** — you must create a "Desktop app" type client; otherwise `redirect_uri_mismatch` errors appear.

### Structural Risk — The Limits of Not Being an Official Product

The biggest structural risk to gws is that **it is not an official Google product**. It's a project from developers in Google's internal DevRel team, not owned by a formal product team. That raises two concerns.

- **Long-term maintenance uncertainty** — Google's "Google Graveyard" is famous. If even official products get killed regularly at Google, what guarantees the lifespan of an unofficial project?
- **Production-dependency risk** — if you hang core operational automation on this tool, maintenance could quit on you one day.

The current version, 0.4.4, says it all. The potential is overwhelming; production dependency is still premature.

---

## 8. Implications — What the "Agent First CLI" Trend Means

gws's significance reaches beyond the product itself, into being **a signal flare for a much larger trend**.

### Trend 1: CLI Is the Language of Agents

A pattern became clear in late 2025. **Major SaaS players are racing to ship CLIs or CLI-like interfaces.** The reason is the same — the most efficient way to expose a service to an AI agent is via the CLI.

The GUI is optimized for human visual and motor capabilities. APIs require developers to write code. The CLI sits in between — **a command system close to natural language, while remaining fully structured**. It is the form AI agents can use most naturally.

### Trend 2: Discovery-Based Architecture

gws's dynamic API generation is a pattern many CLI tools are about to follow. Instead of updating the CLI every time the API shifts, **read the API schema at runtime and generate the CLI automatically**. In agent ecosystems this matters particularly — agents must always reach the latest tools.

### Trend 3: Inversion of the Cost Structure

Zapier at $49/month versus gws at free. The cost gap is telling. **Once platform companies start offering integration tools for free to raise their ecosystem's agent accessibility**, the business model of third-party automation platforms is in for a fundamental challenge.

This isn't just a Google story. Microsoft raising the agent accessibility of Graph API, Salesforce launching an AI-agent CLI — it's only a matter of time. Gartner has forecast that by 2028, 75% of enterprises will operationalize AI agents. Platform wars are now being fought over who supplies the tools these agents will use.

### What It Means for Developers

The message gws's release sends to developers is clear.

1. **Re-evaluate your CLI competence.** In the agent era, the CLI is not "old-school" — it's a core interface paradigm. Shell scripting, JSON processing, and pipeline construction matter again.

2. **Understand MCP.** That gws ships with an embedded MCP server is no accident. MCP has become the de facto standard for connecting AI agents to external tools. Consider providing an MCP interface for the services you build.

3. **Start "Agent First" design.** When designing an API, treat AI agents as first-class citizens alongside human developers. JSON I/O, schema introspection, dry-run mode — the design patterns shown by gws will become the baseline.

4. **Solve auth UX.** The sharpest criticism of gws targeted OAuth complexity. However good the tool, if setup takes 45 minutes, adoption stalls. Auth UX in the agent era remains an unsolved problem.

---

## Closing — The CLI Didn't Die, It Evolved

The launch of the Google Workspace CLI carries weight beyond a single product release. It is **a signal that the paradigm of software interfaces is shifting**.

GUI → API → CLI. This isn't a cyclic return. **A dual interface — GUI (for humans) + CLI (for agents) — is becoming the new standard.** Humans still click pretty screens; agents do the real work behind them through the CLI.

gws is, today, an experimental 0.4.4 project. OAuth setup is fiddly, and it's not an official product. But 14,500 GitHub stars and a #1 Hacker News slot show that the developer community agrees with the direction.

**In 2026, the CLI is back — this time, with AI agents riding along.**

A world where Google Workspace's 3 billion accounts open with a single terminal command. The key is still a bit stiff in the lock, but the door is unmistakably open.
