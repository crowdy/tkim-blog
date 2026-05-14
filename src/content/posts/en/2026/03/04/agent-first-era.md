---
title: 'When You Can No Longer Tell Whether It Is a Human or an Agent — Life After "API First," Into the "Agent First" World'
description: 'The "customer" visiting your website is changing. In 2025, with bots already accounting for the majority of web traffic, your next customer may not be a human holding a browser but an AI Agent calling an API.'
pubDate: 2026-03-04T14:24:01.218Z
lang: 'en'
pairSlug: 'agent-first-era'
draft: false
---
# When You Can No Longer Tell Whether It Is a Human or an Agent — Life After "API First," Into the "Agent First" World

> The "customer" visiting your website is changing. In 2025, with bots already accounting for the majority of web traffic, your next customer may not be a human holding a browser but an AI Agent calling an API.

---

## 1. It Has Already Changed — An Era Where the Majority of Traffic Is Bots

Start with the numbers.

- **51% of all web traffic is now bots** — According to Imperva's 2025 Bad Bot Report, automated bot traffic surpassed human traffic for the first time in 2024.
- **GPTBot traffic up 305%** — Cloudflare's 2025 Year in Review documented an explosive rise in crawlers harvesting AI training data.
- **A 15x increase in user-delegated AI Agent traffic** — Not simple crawling: Agents that *use* the web on behalf of humans are surging.

Even two or three years ago, "bot traffic" meant spam bots or scrapers. Today's bots are different. ChatGPT searches the web in real time to answer user questions, OpenAI's Operator books flights on a user's behalf, and Google's Project Mariner handles shopping comparisons. **The "customer" visiting your website is being redefined at the root.**

---

## 2. Three Ways AI Agents Use the Web

AI Agent access to the web falls into three categories.

### (a) Training and scraping crawlers
GPTBot, ClaudeBot, Google-Extended and others harvest data for LLM training. They are controllable via robots.txt, but the number of crawlers that ignore those signals keeps growing. Akamai's 2025 report notes that AI botnets are evolving new patterns that bypass conventional WAFs.

### (b) Search and reasoning bots
Perplexity, Google AI Overview, Bing Copilot and others read and summarize web content in real time to answer user questions. The answers they generate displace traffic to the source sites, and **zero-click search now accounts for roughly 60%** (SparkToro, 2024).

### (c) User-delegated Agents
OpenAI Operator, Google Project Mariner, and Anthropic Computer Use carry out tasks on the user's behalf. They sign in, fill forms, and complete payments.

**Category (c) is the fastest-growing and carries the largest business impact.** These Agents do not merely read information; they *transact*. Salesforce's Cyber Week 2025 data shows AI Agents influenced roughly 20% of all orders — about $67 billion in sales.

---

## 3. From "API First" to "Agent First" — How the World Is Moving

The response to this shift is already accelerating globally.

### GMO Internet Group — "GMO API First"
Japan's GMO Internet Group has put API First at the center of a group-wide transformation. fincode byGMO, its payments arm, **became the first PSP (Payment Service Provider) in Japan to support MCP (Model Context Protocol)** in June 2025, giving AI Agents direct access to payment functionality. The MCP server is open source on GitHub.

### Shopify — Universal Commerce Protocol (UCP)
Shopify, jointly with Google, announced UCP — a standard protocol that lets AI Agents automate the entire flow from product search to checkout. Millions of Shopify stores become Agent-ready in one stroke.

### Stripe + OpenAI — Agentic Commerce Protocol (ACP)
ACP, co-developed by Stripe and OpenAI, enables instant payments inside ChatGPT. Say "buy this for me," and the Agent completes the transaction.

### Cloudflare — A Dual-Interface Strategy
Cloudflare has taken the most pragmatic stance. For the same URL it supports Content Negotiation that **returns HTML to humans and Markdown to Agents** (`Accept: text/markdown`). At the same time it **blocks unauthorized AI scraping by default** (from July 2025) and meters legitimate access via HTTP 402 plus a Pay-Per-Crawl marketplace.

### Microsoft — Declaring the "Open Agentic Web"
At Build 2025, Microsoft declared an "Open Agentic Web" and began offering Agent infrastructure through Azure AI Foundry Agent Service.

### Google — A2A + WebMCP
Google published A2A (Agent-to-Agent), a protocol for Agent-to-Agent communication, and donated it to the Linux Foundation. Chrome 146 Canary ships WebMCP, turning the browser itself into a tool for Agents.

### Anthropic — MCP Becomes the De Facto Standard
MCP (Model Context Protocol), created by Anthropic, has become the de facto standard for connecting Agents to external tools and data. Its donation to the Linux Foundation's AAIF (Agentic AI Foundation) in December 2025 cemented its vendor-neutral status.

### Japan's Digital Agency — Base Registry as APIs
Japan's Digital Agency is targeting March 2026 for an API-first Base Registry (corporate numbers, addresses, and other foundational data). Government data, too, is entering an era where Agents can query it directly.

---

## 4. What to Prepare — The Technical Side

### 4-1. Protocols and Standards

The Agent protocol landscape remains fragmented, but consolidation is clearly underway entering 2026. Here is how the roles and priorities stack up.

| Protocol | Role | Priority |
|----------|------|----------|
| **MCP** (Anthropic → AAIF) | Agent ↔ Tool/Data | ★★★ Essential |
| **A2A** (Google → Linux Foundation) | Agent ↔ Agent | ★★☆ Watch |
| **WebMCP** (W3C) | Agent ↔ Browser | ★☆☆ Observe |
| **llms.txt** | Sitemap for AI discovery | ★★☆ Easy to adopt |
| **Schema.org / JSON-LD** | Structured data | ★★★ Essential |

MCP is already the de facto standard, and Schema.org/JSON-LD can be layered on top of existing SEO infrastructure for immediate adoption. llms.txt is trivial to implement yet meaningfully raises AI crawler comprehension of your content.

### 4-2. Infrastructure Shifts

**Content Negotiation**
Return structured Markdown to Agents that send `Accept: text/markdown`. If you are on Cloudflare you can enable automatic conversion. The point is to serve the same URL with content tuned for each audience — humans and Agents.

**API Gateway → Agent Gateway**
Bolt Agent-aware routing, rate limits, and metering onto your existing API Gateway. Distinguish human browser requests from Agent API calls and optimize the response for each.

**Authentication Evolves**
An OAuth 2.1 extension for Agent delegation is currently progressing as an IETF draft. You will need a system that lets Agents authenticate on behalf of users and traces the chain of delegation. The W3C has stood up an AI Agent Protocol Community Group to begin formal standardization work.

**Headless Architecture**
Separating the UI layer from data and business logic — the classic Headless Architecture — matters even more in the Agent era. Agents do not need a UI; they need structured, direct access to the data.

### 4-3. Security

**Defending Against Prompt Injection**
This sits at the top of the OWASP LLM Top 10. Malicious prompts buried in web content can manipulate an Agent's behavior. Sandboxing of output data and validation of Agent inputs are non-negotiable.

**Web Bot Auth — Identifying Trustworthy Agents**
Cloudflare's proposed Web Bot Auth verifies an Agent's identity through cryptographic signatures. It is the mechanism that lets you prove "this request was sent by OpenAI Operator on behalf of user Cheolsu Kim."

**Zero Trust for Agents**
Apply Zero Trust principles to Agents too. Least privilege, short-lived tokens, and delegation-chain tracking are the core controls.

---

## 5. What to Prepare — The Business Side

### 5-1. From SEO to GEO (Generative Engine Optimization)

> "If AI cannot parse your data structure within 100ms, your brand does not exist in future search."

Traditional SEO was a fight for rank on a search results page. In an era where AI generates the answer itself, the new SEO is **being cited by AI**. With zero-click searches at roughly 60%, a model where AI delivers the information without users ever visiting the source site has taken hold.

The core GEO strategies:
- **Structured data**: deliver content in forms AI can parse — Schema.org, JSON-LD.
- **llms.txt**: an AI-crawler-specific sitemap that raises discoverability of your highest-value content.
- **Authoritative citations**: citations from trusted sources increase the odds of being quoted in AI answers.

### 5-2. Redesigning Revenue Models

AI Agents do not look at ads. The advertising-funded revenue model is being shaken at its foundation.

**New revenue models:**
- **Crawl licensing**: selling content access as a licensed product (Cloudflare's Pay-Per-Crawl is the headline example).
- **Agent access metering**: providing data through APIs and charging based on call volume.
- **Protocol-based commerce**: new commerce channels where Agents transact directly — Shopify UCP, Stripe ACP, and the like.

The AI search advertising market is projected to grow from roughly $1.1 billion in 2025 to $26 billion by 2029. New ad formats will emerge — but in the meantime, content businesses need to lock in alternative revenue.

### 5-3. Preparing for "Agentic Commerce"

The numbers speak for themselves:
- **Salesforce**: AI Agents influenced about 20% of Cyber Week 2025 orders — $67 billion in sales.
- **Bain & Company**: agentic AI is projected to handle 15–25% of US e-commerce revenue by 2030 ($300–500 billion).
- **Gartner**: by 2028, AI Agents are forecast to outnumber human sellers by 10x.

To win in agentic commerce:
1. **Agent-friendly product data**: structured catalogs, clear pricing and inventory APIs.
2. **Protocol support**: enable Agents to transact directly via MCP, UCP, ACP, and so on.
3. **Agent-native UX**: interfaces — separate from your human-facing UI — that let Agents browse, compare, and purchase efficiently.

---

## 6. Conclusion: The Era of "Agent-Responsive Design"

In the 2010s the mobile revolution made **Mobile-Responsive Design** mandatory. Websites had to optimize for small screens.

In the mid-2020s the AI Agent revolution is demanding **Agent-Responsive Design**. A website is no longer just "a magazine humans read"; it is also **"a data node Agents reference."** A dual interface — the same content served as beautiful UI to humans and structured data to Agents — becomes the new baseline.

GMO Internet Group's API First strategy points at exactly this direction. Without an API, Agents cannot access you; without access, you cannot meet the customer of the future.

### Three Things You Can Do Right Now

| Order | Action | Difficulty | Impact |
|-------|--------|------------|--------|
| 1 | **Ship llms.txt and tighten Schema.org structured data** | Low | Immediate lift in AI search visibility |
| 2 | **Evaluate offering an MCP Server for your core service** | Medium | Entry into the Agent ecosystem |
| 3 | **Add Content Negotiation** (Markdown for Agents) | Medium | Dual-track human/Agent support |

Just as companies that were late to "Mobile-First" fell behind in the mobile era, organizations late to "Agent-First" will become invisible in the AI Agent era. **The time to prepare is now.**

---

## References

- [Imperva, *2025 Bad Bot Report*](https://www.imperva.com/blog/2025-imperva-bad-bot-report-how-ai-is-supercharging-the-bot-threat/)
- [Cloudflare, *"From Googlebot to GPTBot: Who's Crawling Your Site in 2025"*](https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/)
- [Cloudflare, *Radar 2025 Year in Review*](https://blog.cloudflare.com/radar-2025-year-in-review/)
- [Cloudflare, *"Content Independence Day"*](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/)
- [Salesforce, *Cyber Week 2025 Press Release*](https://www.salesforce.com/news/press-releases/2025/12/05/cyber-week-ai-agents-sales/)
- [McKinsey, *"The Agentic Commerce Opportunity"*](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants)
- [Bain & Company, *"2030 Forecast: How Agentic AI Will Reshape US Retail"*](https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/)
- [Gartner, *AI Agents Will Outnumber Sellers by 10x by 2028*](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-predicts-by-2028-ai-agents-will-outnumber-sellers-by-10x)
- [eMarketer, *GenAI Search Advertising Trends 2025*](https://www.emarketer.com/content/genai-search-advertising-trends-2025)
- [SparkToro, *2024 Zero-Click Search Study*](https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/)
- [Shopify Engineering, *"Building the Universal Commerce Protocol"*](https://shopify.engineering/ucp)
- [Stripe, *"Developing an Open Standard for Agentic Commerce"*](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- [Microsoft, *"Build 2025: The Age of AI Agents and Building the Open Agentic Web"*](https://blogs.microsoft.com/blog/2025/05/19/microsoft-build-2025-the-age-of-ai-agents-and-building-the-open-agentic-web/)
- [Linux Foundation, *Formation of the Agentic AI Foundation*](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [W3C, *AI Agent Protocol Community Group*](https://www.w3.org/community/agentprotocol/)
- [GMO-PG, *fincode byGMO MCP Support*](https://www.gmo-pg.com/en/news/press/gmo-paymentgateway/2025/0619.html)
