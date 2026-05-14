---
title: 'AI Native Is Not About Using More AI — Why You Have to Reinvent How You Work'
description: 'We rolled out Claude Code to the team. A month later, code output had tripled. Yet shipping speed had not changed. Meetings still happen five times a week, planning docs still pile up in Google Docs, code review is still the bottleneck. What went wrong?'
pubDate: 2026-03-23T08:28:40.313Z
lang: 'en'
pairSlug: 'ai-native-reinventing-how-we-work'
draft: false
---
# AI Native Is Not About Using More AI — Why You Have to Reinvent How You Work

> We rolled out Claude Code to the team. A month later, code output had tripled. Yet shipping speed had not changed. Meetings still happen five times a week, planning docs still pile up in Google Docs, code review is still the bottleneck. What went wrong?

---

## 1. We changed the tool — why did nothing change?

2025 was the year of AI coding tools. Cursor, Claude Code, GitHub Copilot, Windsurf — every team picked one. The early excitement was real. "The code writes itself!" "No more boilerplate!" Productivity metrics did go up. Lines of code generated, commit counts, PR throughput — by the numbers alone, it was a revolution.

But take a step back, and something strange comes into view.

If code goes out three times faster, why does shipping a feature still take two weeks? The answer is simple. **Writing code is just one slice of the development process.** Planning, design, review, QA, deployment, communication — every one of these stages is still running in the pre-AI mode. We swapped the pen for a word processor, but we are still writing the same report.

This is **the essential difference between "an organization that adopted AI" and "an AI Native organization."**

---

## 2. AI Enabled ≠ AI Native — the litmus test

IBM defines AI Native this way: **"A product, company, or workflow designed with AI as a core component from the start."** And it adds a decisive sentence: "Remove the AI and the product itself becomes meaningless."

That is the strongest litmus test available.

Take your team's current workflow and strip the AI out. Turn off Copilot, uninstall Claude Code, block ChatGPT access. If the team can still operate on the same process — just a bit slower, but fundamentally identical — that is not AI Native. That is **AI Enabled**.

The three terms tossed around interchangeably in the industry break down like this.

**AI Enabled** — AI bolted on top of an existing process. Add Copilot to Excel and writing formulas gets faster. But it is still Excel, still spreadsheet-based work. Remove the AI and the core functions still work.

**AI First** — Treating AI as the top strategic priority. When starting a new project, the first question is "can we do this with AI?" Google's 2016 declaration of an "AI First" strategy is the textbook example. But because the organization structure and processes stay the same while AI is prioritized, this stops short of fundamental redesign.

**AI Native** — AI sits at the core of the architecture. Without AI, the thing cannot exist. Process, organizational structure, and culture are **designed assuming AI**. Remove AI from Perplexity and you do not have a search engine — you have an empty shell. Remove AI from Claude Cowork and you have a blank screen. That is AI Native.

The Cloud Native analogy explains this better than anything. Lifting an existing server onto AWS is "using the cloud (Cloud Enabled)," not Cloud Native. Cloud Native means microservices, containers, autoscaling — redesigning the architecture from scratch on the assumption of cloud properties. The parallel holds: adding AI tools to existing work is not AI Native. **AI Native is redesigning the way of working itself on the assumption of AI's properties.**

---

## 3. "Things we could not do before" — the real value of AI Native

In August 2025, Anthropic ran an internal study covering 132 of its own engineers and researchers. It was a systematic investigation, including 53 in-depth interviews and analysis of Claude Code usage data.

The most striking number in the results was this: **27% of work done with Claude was "work that would not have been done before."**

Sit with that number for a moment. The usual way to measure AI's value is "efficiency" — doing existing work faster. But the real value of AI Native is not efficiency, it is **the expansion of what is possible**. Things that were not done before because there was no time, no headcount, no expertise — those become possible.

Concretely, what happened? A backend engineer started building UI directly. A researcher built their own data visualizations. One engineer, working with Claude, navigated a codebase outside their domain and finished alone what they would previously have escalated to another team. **The scope of an individual's role was being expanded by AI.**

Anthropic called this phenomenon **"full-stacking."** The boundaries of specialty melt under AI. Frontend engineers do backend work, backend engineers touch infrastructure, designers prototype in code — each person's expertise gets overlaid by AI, and the surface area one person can cover expands dramatically.

This is qualitatively different from "doing the same thing faster." It is **"doing things you could not do before."** And that is the real competitive edge of an AI Native organization.

---

## 4. Three AI Native workflow patterns

Pull the research together and the workflow patterns AI Native organizations are adopting converge into three.

### Pattern 1: Reverse-design — "design the process backward from value"

Mercari's approach is the canonical example. In May 2025, CEO Shintaro Yamada made a company-wide declaration: **"We will not be a company that adopts AI. We will be a company redesigned on the assumption of AI."** It was not just a slogan. A 100-person AI task force was launched, and the company began carving itself into 33 domains and redefining roughly 4,000 workflows from scratch.

The pivotal shift in framing is this. Existing organizations are designed around **the limits of being human**. Human attention is finite, the volume of information one can process at once is bounded, hours in a day are fixed. Every process, every meeting structure, every reporting chain rests on this assumption.

AI Native organizations invert the assumption. They **design backward from "the value to be delivered."** The question becomes "what is the optimal process to deliver this feature to users?" — asked without the constraint that "humans must do all of it."

Mercari turned this into a framework called **ASDD (Agent-Spec Driven Development)**. It is an implementation-oriented detailed-spec format that explicitly defines who does what task, in which file, in what code style. The spec is readable by humans, but **designed so AI agents can execute it directly**. Planning → spec writing → AI agent execution → human verification. This flow is fundamentally different from the traditional planning → design → coding → testing → review.

As of August 2025, Mercari's AI tool usage rate was 95% and AI generated 70% of its code. Per-engineer development output was up 64% year over year. And yet CTO Kimura said: **"We are still halfway. The reform of non-coding work processes is lagging."**

That one line cuts to the heart of AI Native. Generating code is just one slice of the work. Planning, decision-making, communication, QA — all of it has to be redesigned on the assumption of AI before you are truly AI Native.

### Pattern 2: Full-stack — "dissolve role boundaries and expand the individual's scope"

This is the pattern observed inside Anthropic. The "full-stacking" mentioned above lands here.

Traditional software organizations split roles. Frontend, backend, infrastructure, QA, design — each domain is clearly delineated, and crossing the line is considered inefficient. This separation rests on the premise that "one person cannot be good at everything."

AI shakes that premise. With Claude, a backend engineer can build a React component. It is not perfect, but it beats handing it to another team and waiting two weeks. A designer can implement a prototype in code. An architecture question that used to require a senior engineer can be put to Claude first.

Anthropic's survey found that employees were using Claude in 60% of their work and reporting a 50% productivity gain. But the more important shift was happening below the numbers. **"The first thing I ask is now Claude, not a colleague."** That was a double-edged change. One senior engineer put it this way: "Juniors do not ask as many questions anymore. It is a shame."

The core of the full-stack pattern is that the unit of the organization shifts from "teams by role" to **"AI-augmented individuals."** If work that took five specialists collaborating can be done by two people armed with AI tools, the organizational structure itself has to change. That is what makes this "changing how you work," not just "changing the tool."

### Pattern 3: Agent orchestration — "humans design, AI agent teams execute"

This is the future Deloitte sketched in its 2026 Tech Trends report. 78% of technology leaders said they plan to integrate AI agents into workflows within five years. More than two-thirds of organizations are already deploying AI agents.

In this pattern the human role is **orchestrator**. They design the overall process, assign tasks to AI agents, verify results, and handle exceptions. From writer of code to manager of code-writing agents. In Anthropic's framing, more than 70% of engineers are already moving from **author to reviewer**.

Sapphire Ventures picked up on the business-model implications of this shift. In the AI Native era, pricing moves from "per-seat" to **"outcome-based."** Price the result, not the headcount. In a world where agents execute, "how many people did you put on this" becomes a meaningless question.

---

## 5. The prerequisite — Knowledge Management comes first

All three patterns share one prerequisite. **Structuring knowledge.**

This is what Mercari's CTO emphasized above all else: **"The performance of an AI agent is proportional to the quality of the context you feed it."** No matter how powerful the model, without the organization's context — coding conventions, the reasons behind design decisions, postmortems on past incidents, the background to business logic — it cannot produce useful output.

Mercari designated Notion as its "Central Knowledge Base" and began with the work of consolidating scattered information. Automated meeting notes, structured decision logs, archived code review discussions — getting the organization's knowledge into a form an AI can consume was the first step of the AI Native transition.

This is the part many organizations overlook. When adopting AI tools they obsess over "which model should we use" or "which IDE plugin to install," but they do not ask **whether the context they will feed the AI is actually ready**. If the organization's knowledge is scattered across Slack messages, personal Notion pages, and someone's head, even the best model in the world is useless.

The first step of AI Native is not adopting AI tools. It is **structuring the organization's knowledge into a form the AI can consume.**

---

## 6. The counterargument — "there are things to change before you change how you work"

Here we cannot dodge the uncomfortable question.

### "If the people will not change, what good does changing the process do?"

A fair point. The biggest barrier to AI Native transition is not technology, it is **people**. Anthropic's internal survey exposed the ambivalence its engineers felt. "Short term, I am optimistic — AI makes me more productive. Long term? If AI replaces everything, do I become irrelevant?"

That anxiety is rational. And demanding "change the process" from someone who is anxious breeds resistance. "Let's redesign around AI" lands in their ears as "your role might disappear."

### The atrophy of deep expertise

Some of Anthropic's engineers voiced a related concern: **"Because output is easier, it is harder to invest the time to learn."** If AI generates the code, the motivation to deeply understand why that code works erodes. Eventually the very ability to verify the AI's output weakens. When the verifiers lose the ability to verify, the whole system collapses.

Ptacek — security legend and enthusiastic AI proponent — made a similar confession. "I forgot how to write table tests. AI does it all. And that is scary." Pursuing AI Native while simultaneously preserving the core competencies of humans. Nobody has solved this yet.

### The collapse of mentorship

The flip side of full-stacking is **the shrinking of collaboration and mentorship**. When the first thing you ask becomes the AI instead of a colleague, the channel of knowledge transfer between senior and junior is severed. If juniors lean on AI and skip the learning process, they cannot grow into seniors. Without growing juniors, eventually there are no seniors either. An AI Native organization needs an answer to this pipeline problem.

These counterarguments are valid. They are the reason AI Native transition is not finished by technical process redesign alone. **Organizational culture, psychological safety, learning systems** — unless these change in parallel, no matter how elegant the AI workflow, it will not be sustainable.

---

## 7. AI Native is not a technology shift, it is a culture shift

Looking back, the term "AI Native" is spreading like a buzzword as of 2026, but there is no agreed definition. IBM emphasizes architecture, Sapphire Ventures emphasizes business model, Deloitte emphasizes governance, Mercari emphasizes process redesign, Anthropic emphasizes role change. The World Economic Forum summarized it this way: "If 2025 was the year we learned how to build with AI, 2026 is the year we learn how to run as an AI Native organization."

The fact that definitions vary means the concept is still forming. And that is an opportunity. **It means you can define your organization's own AI Native, instead of borrowing someone else's.**

The provisional conclusion I arrived at while writing this piece is this.

The heart of AI Native lies in three questions.

**First, "Would this process exist without AI?"** If it is an existing process with AI layered on top, that is AI Enabled. Only a process designed from scratch on the assumption of AI is AI Native.

**Second, "Are we doing things that were previously impossible?"** Doing the same thing faster is efficiency. Doing what could not be done before is the real value of AI Native. As Anthropic's 27% shows, the differentiating edge of an AI Native organization lies in **the expansion of possibility**.

**Third, "How has the role of the person been redefined?"** If the tool changed but the role did not, you are not yet AI Native. From writer to reviewer, executor to orchestrator, specialist to full-stack talent — the role shift must happen. And the organizational culture and learning system that supports that shift must be in place.

In the end AI Native is not a question of technology, it is a question of **culture**. Which AI tool you use matters less than asking, "in a world with AI, how will we work?" And no one has finished that answer yet. Mercari called itself "halfway." Anthropic called itself "still exploring."

That no completed answer exists is unsettling, but it is also the most honest starting point. Becoming an AI Native organization is not about adopting some tool. It is about **asking "why and how do we work?" from scratch.** Standing humble before that question may be the first step of AI Native.

---

**References**
- IBM, ["What Is AI Native?"](https://www.ibm.com/think/topics/ai-native) — Definition of AI Native and contrast with AI Enabled
- Sapphire Ventures, ["AI-Native Applications: A Framework"](https://sapphireventures.com/blog/ai-native-applications/) — A 5-dimension evaluation framework (Design, Data, Domain, Dynamism, Distribution)
- Deloitte, ["The Great Rebuild: Architecting an AI-Native Tech Organization"](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/ai-future-it-function.html) — 2026 Tech Trends
- Anthropic, ["How AI Is Transforming Work at Anthropic"](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) — Internal study of 132 employees
- Mercari Engineering, ["AI-Nativeという選択"](https://engineering.mercari.com/blog/entry/20251225-mercari-ai-native-company/) — ASDD, AI Task Force, Knowledge Management
- World Economic Forum, ["How to Build an AI-Native Company"](https://www.weforum.org/stories/2026/01/how-leaders-can-build-ai-native-businesses-to-capture-value/) — A 2026 guide to AI Native transition
- CNBC, ["Anthropic Updates Claude Cowork"](https://www.cnbc.com/2026/02/24/anthropic-claude-cowork-office-worker.html) — Enterprise expansion of Claude Cowork
- PYMNTS, ["Anthropic Pushes Claude Beyond Chat Into Enterprise Workflows"](https://www.pymnts.com/artificial-intelligence-2/2026/anthropic-pushes-claude-beyond-chat-into-enterprise-workflows/) — Enterprise workflow integration strategy
