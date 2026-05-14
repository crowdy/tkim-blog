---
title: 'The Rediscovery of the Agent Runtime — Why, in April 2026, Everyone Is Solving the Same Problem Again'
description: 'If an agent runs for days, for weeks — where exactly is that agent living? Who restarts it, who preserves its state, who wakes it when it dies?'
pubDate: 2026-04-10T01:00:28.212Z
lang: en
pairSlug: 'agent-runtime-rediscovery'
draft: false
---
# The Rediscovery of the Agent Runtime — Why, in April 2026, Everyone Is Solving the Same Problem Again

> If an agent runs for days, for weeks — where exactly is that agent living? Who restarts it, who preserves its state, who wakes it when it dies?

---

Laying the 48 hours between April 8 and April 9, 2026 on a timeline makes one strange fact clear: something unusual happened.

In the early hours of Wednesday, [Anthropic's official Twitter](https://twitter.com/AnthropicAI/status/2041929199976640948) posted a short sentence. One line: "Managed Agents is about a classic problem in computing — 'how do you safely run something that has not yet been thought.'" The same day, [GIGAZINE published a Japanese explainer](https://gigazine.net/news/20260409-claude-managed-agents/) with the headline "Claude Managed Agents Arrives." That same week, [the SkyPilot blog](https://blog.skypilot.co/research-driven-agents/) published "Research-Driven Agents," articulating a design philosophy that the agent must "read" before it writes code, hitting 113 points and 40 comments on Hacker News. Also that week, [InstantDB 1.0 launched](https://www.instantdb.com/essays/architecture) with the subtitle "a backend for AI-coded apps" (HN 56 points, 32 comments). And on April 8, [TechCrunch reported on Astropad Workbench](https://techcrunch.com/2026/04/08/astropads-workbench-reimagines-remote-desktop-for-ai-agents-not-it-support/), launching as "remote desktop for AI agents, not IT support." On top of that, [Relvy (YC F24)](https://www.relvy.ai) posted a Launch HN with the copy "On-call runbooks, automated," earning 37 points.

Different companies, different fields, different tech stacks. Anthropic is an LLM provider, SkyPilot is a cluster orchestration company, InstantDB is backend-as-a-service, Astropad started as an iPad graphics tool company, and Relvy is an SRE automation startup. What is the common denominator of the products they announced in the same week? In one line — **how to host long-running agents**.

This is not coincidence. As the agent shifts from a "request-response function" to a "long-running process," the old distributed-systems problem that application servers tried to solve in the 1990s and FaaS tried to escape in the 2010s is coming back — in new clothing. This essay dissects that signal across seven slices.

---

## 1. The Moment the Agent Migrates From "Function" to "Process"

From 2023 through early 2025, the basic shape of code that called an LLM was simple. A user sends a message, the model responds, the session ends. One ChatGPT conversation. One Cursor code suggestion. A slightly more complex case was the multi-turn agent loop, which iterates between calling tools and receiving results, but it usually ended within the time unit of a session. Tens of minutes at most.

This is essentially a **function**. There is input, there is output, and the time between them is short. While the function executes it must live somewhere, but once it ends it can disappear with no consequence. If state is needed, the caller hands it over again next time. Stateless. This was the natural shape an LLM API could take from the start. The picture is exactly the same as when AWS Lambda first appeared and tried to reduce all backend workloads to stateless functions.

The change in 2026 is that this picture no longer fits.

Today's coding agents run for hours at a time. Background research agents run for days. On-call agents — like what Relvy aims for — effectively run **all the time**. They must run while the user is asleep, and while the user has left the company. Some agents poll an external system once an hour, others wake when an alarm fires, debug for 30 minutes, and go back to sleep, while others run a multi-day codebase migration that pauses for human approval in the middle.

This is no longer a function. It is a **process**. Once turned on, it stays alive until explicitly turned off. It holds memory, holds file descriptors, maintains external connections. When it dies, someone must wake it, and when it is woken, it must know where to resume.

The difference between function and process is not a word — it is a difference in infrastructure requirements. A function can spin up a container on demand and tear it down. A process cannot. When a function runs out of memory, OOM-kill it and spin up the next call fresh. Kill a process that way and you lose days of work. Observing a function is satisfied by one log line per call. Observing a process requires tracking the change of state along the time axis.

Every announcement of April 2026 is a response to this migration.

---

## 2. Anthropic Managed Agents — "An Old Computing Problem Returns"

The sentence used by the [official Anthropic account](https://twitter.com/AnthropicAI/status/2041929199976640948) to announce Managed Agents is deliberately abstract. "Managed Agents, a hosting service for long-running agents, is about a classic problem in computing — how do you safely run something that has not yet been thought."

What makes this interesting is that Anthropic frames this not as "a new AI feature" but as "a new case of an old computing problem." The phrase "something not yet thought" recalls — intentionally or not — what Edsger Dijkstra said in his 1972 Turing Award lecture: that handling "programs not yet written" is the essence of computer science. Compilers and type systems have been solving exactly the problem of reasoning about and guaranteeing the safety of code before it runs.

For agents, this goes a step further. The agent's code is not fixed at compile time. The model decides the next action at runtime, and the system calls, external API calls, or file modifications it makes are produced fresh each time. The host must therefore safely execute "code that does not yet exist." The 1972 problem has returned in 2026 in a new shape.

[GIGAZINE's article](https://gigazine.net/news/20260409-claude-managed-agents/) summarized the announcement for Japanese readers as "trustworthy hosting of long-running processes." Three keywords: **long-running**, **trustworthy**, **hosting**. These three words pin the core of this episode precisely. Not an API that simply calls a model, but infrastructure that gives the agent-as-object a lifespan and takes responsibility for sustaining that lifespan whether it is days or weeks.

What Managed Agents handles concretely was not fully revealed at the time of announcement, but the meaning of the word "managed" is clear. Across the cloud industry the prefix is consistent — the user defines only the essence of the workload, and the infrastructure (scaling, restart, failure recovery, observability) is the host's responsibility. Managed Kubernetes (EKS, GKE), Managed Redis (ElastiCache), Managed Postgres (RDS) all share the pattern. Managed Agents is the first attempt to apply that pattern to the new object called the agent.

---

## 3. SkyPilot Research-Driven Agents — Runtime Design Changes Agent Behavior

[SkyPilot's "Research-Driven Agents" post](https://blog.skypilot.co/research-driven-agents/) appeared in the same week as Anthropic's announcement but approaches the same problem from the opposite direction. If Anthropic addresses the infrastructure side — "how do we host the agent?" — SkyPilot addresses the behavior side — "how can a hosted agent behave differently?"

The core claim is simple. A coding agent must first **read** before it writes code. The "research" stage SkyPilot describes is different from search. Exploring the codebase, identifying relevant files, tracing dependencies, understanding existing patterns — the proposal is to make this an explicit stage separated from code writing.

Why now? In the era of functional agents, this proposal would have been a luxury. You could not tell an agent that had to finish within a single session, "first read the codebase for a few days." Token costs are a problem, user patience is a problem, and above all there was no guarantee the session would stay alive that long. There was no guarantee the context gathered in the read stage would be safely transferred to the write stage.

The moment long-running agent runtimes appear, this constraint dissolves. If the agent can stay alive for days, those days can be spent reading. If the read results can be safely stored in persistent storage even when the session disconnects, the write stage can trust them. **The runtime determines behavior.** The shape of work the agent can do depends not only on the model's capability but on the time unit allowed by the runtime that wraps it.

This insight is not new. We have seen the same logic in the database world. The queries possible in the era of single-machine RDBMS and the queries possible in the era of distributed OLAP engines are fundamentally different kinds. Infrastructure widened the horizon of behavior. SkyPilot's proposal applies the same dynamic to agents. Once hosting becomes possible, the way an agent works can be redesigned.

---

## 4. InstantDB 1.0 — A Backend for AI-Coded Apps Appears

[InstantDB's 1.0 announcement](https://www.instantdb.com/essays/architecture) is yet another angle. If Anthropic handles the agent's host and SkyPilot handles the agent's behavior, InstantDB handles where the artifacts of the agent — apps coded by AI — live.

The subtitle is provocative: "a backend for AI-coded apps." The implication is that existing backends were designed assuming apps built by humans. How is a human-built app different? Human-built apps decide their schema in advance. Migrations are intentional and slow. API design goes through multiple rounds of review. Staging and tests sit between code and production. The backend operates on all of these assumptions.

AI-coded apps overturn all of these. The agent can change the schema five times an hour. It does not "migrate" — it just builds the next version. The API may not consider backward compatibility with existing clients. The boundary between staging and production blurs. Traditional backends break quickly in this environment. ORM migration files accumulate, API versioning collapses, and the synchronization between schema and client drifts.

InstantDB's answer is to redesign the backend itself as a model where "schema and clients are synchronized in real time." The client automatically follows schema changes, and the synchronization layer takes responsibility for consistency. Whatever the agent changes and however it changes it, the backend absorbs it. It provides an environment where an AI-coded app can stay alive.

What is interesting here is how this idea connects to the agent runtime problem. If the agent is a long-running process, so is the app it produces. If the agent evolves the app over many days, the app must be alive for those days. Not dying and being revived but constantly changing while staying on. This requirement does not belong to an era of backends designed around "the human deployment cycle." A new backend, scaled to the agent's time scale, is needed.

InstantDB 1.0 is that attempt. And the fact that it appears in the same week as Anthropic and SkyPilot is evidence that the same structural pressure is forcing different companies to solve the same problem in different layers.

---

## 5. Astropad Workbench and Relvy — When the Agent Becomes the "User"

[TechCrunch's report on Astropad Workbench](https://techcrunch.com/2026/04/08/astropads-workbench-reimagines-remote-desktop-for-ai-agents-not-it-support/) compresses the shift into its headline: "for AI agents, not IT support." Remote desktop, a category created in the 1990s and built around the same user — IT support personnel — for more than 30 years, is for the first time changing that assumption.

The design of existing remote desktops (VNC, RDP, TeamViewer) is consistent. A person watches another person's screen. A person borrows another person's mouse and keyboard. The screen has resolution and refresh rate tuned to human vision. Input events assume human finger speed. The permission model assumes the scenario "this person is borrowing that machine for a while."

Astropad Workbench rebuilds this from the foundation. Per TechCrunch's summary, the product is a platform for monitoring and controlling an agent running on a Mac mini from a mobile device. Low-latency streaming, mobile-first access, and UI automation compatibility are presented as core axes. What changes when the user shifts from human to agent? The screen is no longer for a person but for the agent's visual processing pipeline. Input is no longer at human finger speed but at the speed at which the agent makes decisions. The permission model must handle the scenario "the agent occupies this machine for days." And the human role is no longer direct user but — peering at what the agent is doing from a mobile device — supervisor.

[Relvy's Launch HN](https://www.relvy.ai) is another facet. On-call response automation — agents executing SRE runbooks. What makes this area interesting is the time scale of the work. The agent is asleep until an alarm fires, wakes up to diagnose, pages a human if needed, recovers automatically if possible, and goes back to sleep. This is not a function. This is a daemon — the concept that arose in 1970s Unix systems. A process that lives endlessly in the background and responds to events.

An agent like Relvy cannot exist without hosting infrastructure. Someone must keep the agent alive 24 hours a day, route alarms, wake it when it dies, and store the history of its actions in an auditable form. This is precisely the shape of problem that Anthropic Managed Agents aims to solve.

Place Astropad and Relvy side by side and one thing becomes clear. The domains where the agent plays the "user" role are expanding explosively. And in every interface where the user shifts from human to agent — remote desktop, on-call systems, and everything that will follow — existing assumptions are breaking all at once.

---

## 6. New Variations on an Old Problem — Application Server, FaaS, and Agent Runtime

Step back here and view this on a longer time scale, and you are watching the same problem return for 30 years in different shapes.

**1990s: application servers.** Java's WebLogic, WebSphere, JBoss. .NET's IIS and COM+. The core problem of this era was "how do you safely host stateful, long-running processes?" Transactions, sessions, connection pools, object lifecycles, distributed locks. The category called application server bundled answers to these problems in one package. The promise was that the developer writes only the application's business logic and the runtime handles the rest.

The promise was only partially kept. Application servers were heavy, hard to debug, vendor-locked, and the model of one instance per machine did not match the cloud era's horizontal scaling. So the next generation went in the opposite direction.

**2010s: FaaS and the enforcement of statelessness.** AWS Lambda, Google Cloud Functions, Azure Functions. The answer in this era was "let's abandon the concept of long-running processes altogether." Reduce every workload to a short function call, and push state out to external storage (DynamoDB, S3, Redis). Functions must be stateless. The price of accepting this constraint was that most operational responsibility could be pushed to the cloud provider. The developer writes only the function logic; scaling and availability are automatic.

This too only partly worked. Not every workload reduces to stateless. Machine learning training, batch processing, workflow orchestration, game servers, and — what we are seeing now — agents. The stateful nature of these workloads is too strong to be feasibly externalized. As a result, FaaS stayed in the domain of "simple workloads," while complex long-running workloads remained in the world of containers and VMs.

**Mid-2020s: the emergence of agent runtimes.** What we are seeing now is the synthesis of the two eras. Agents have the stateful, long-running nature that application servers handled. At the same time they want the operational outsourcing that FaaS promised. Agent developers want to define only the agent's behavior, not manage the infrastructure that keeps it alive for days.

A new category that satisfies both demands is needed. Anthropic's Managed Agents is one answer. The long-running agent on top of SkyPilot's cluster is another. InstantDB receiving the agent's apps is another. Astropad taking responsibility for the agent's GUI environment is another. No single company solves all of it. Multiple companies solve different cross-sections of the same problem in their own layers.

If this landscape feels familiar, your intuition is right. In the 1990s application server era, no one company solved everything either. BEA built transaction monitors, IBM built message queues, Oracle built databases, Sun built the JVM. When a new category is born, multiple companies always occupy adjacent areas at the same time. The picture of the first week of April 2026 looks closer to a reprise of that era.

---

## 7. Questions — Where Is Your Agent Living?

The analysis up to here is retrospective. More interesting are the questions ahead.

**First, which abstractions survive?** The 1990s application servers tried heavy abstractions like EJB and eventually yielded to lighter alternatives like Spring. The 2010s FaaS started with the light abstraction of a function but then stacked heavier orchestration abstractions on top — Step Functions, Temporal. Which way will agent runtime go? Will it begin with a heavy abstraction and grow lighter, or will it begin with light functions and accumulate heavier orchestration on top?

**Second, how is host lock-in avoided?** The inherent problem of managed services is vendor lock-in. If Managed Agents becomes the standard, whose asset is the definition and state of the agent running on top? Is it possible to move an agent from one host to another, or does it become like the application server era, where once tied to one vendor it is hard to escape? The answer to this question will — eventually — determine the structure of the agent runtime market.

**Third, where is observability?** Observing a stateless function was satisfied with one log line per call. Observing a long-running agent demands different tooling. Humans must be able to audit after the fact what the agent did over days, and they must be able to monitor in real time what the agent is doing. Astropad Workbench's idea of peering at the agent from a mobile device is a first attempt in this area. But one company's one product cannot answer the whole category. It is reasonable to expect that an agent-grade Datadog, an agent-grade Grafana, and an agent-grade Sentry will follow in turn.

**Fourth, where is the human?** In the era of functions, the human was the caller. In the era of processes, where is the human? Supervisor, collaborator, auditor, or simply an outsider to the loop? Relvy's on-call agent must be able to page a human. Managed Agents must be able to wait for human approval. While the agent runs for days, what is the human doing? The answer to this question — not technical but social and organizational — will be the real differentiator for agent runtimes.

---

Return to the original question. If an agent runs for days, where is that agent living?

Before the first week of April 2026, the answer was unclear. Some put it on their laptops, some put it on EC2 instances, some operated it manually. There was no hosting category fit for the object called agent.

In the same week, five places put forward five answers simultaneously. Anthropic with managed hosting, SkyPilot with research-driven workflows on top of cluster orchestration, InstantDB with a backend that receives the agent's apps, Astropad with a redefinition of the GUI environment, Relvy with an on-call daemon. Each occupied a different layer, but they are all answering the same structural pressure — the migration from function to process — that much is clear.

The problem the 1990s application servers tried to solve, the problem the 2010s FaaS escaped from, has returned — in the form of agents. And this time there is nowhere to escape. The agent is essentially stateful and long-running. Someone has to host it. That is why five places raised their hands in the same week.

The next question I want to pose to the reader. The agent you are building right now — or about to build — where is it living? Does its host guarantee days, weeks, or eternity? Who wakes it when it dies? Who audits the traces it left behind? If you have no answer to these questions, the agent you are building is still in the function era. Only with answers — whatever shape they take — can it cross over to the process era.

The first week of April 2026 will likely be remembered as the moment when the industry simultaneously recognized that this answer had to be found.

---

## References

- [Anthropic — Building Managed Agents (official Twitter)](https://twitter.com/AnthropicAI/status/2041929199976640948)
- [GIGAZINE — Claude Managed Agents Arrives](https://gigazine.net/news/20260409-claude-managed-agents/)
- [SkyPilot — Research-Driven Agents](https://blog.skypilot.co/research-driven-agents/)
- [InstantDB — Instant 1.0: a backend for AI-coded apps (Architecture essay)](https://www.instantdb.com/essays/architecture)
- [TechCrunch — Astropad's Workbench reimagines remote desktop for AI agents, not IT support](https://techcrunch.com/2026/04/08/astropads-workbench-reimagines-remote-desktop-for-ai-agents-not-it-support/)
- [Relvy (YC F24) — On-call runbooks, automated](https://www.relvy.ai)
