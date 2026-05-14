---
title: 'What Lets an Agent Survive Being Copied'
description: 'A competitor cloned your agent. Same prompts, same model, same features. The users did not leave. Why?'
pubDate: 2026-03-24T08:54:38.197Z
lang: 'en'
pairSlug: 'unreplicable-agent-moat'
draft: false
---
# What Lets an Agent Survive Being Copied

> A competitor cloned your agent. Same prompts, same model, same features. The users did not leave. Why?

---

## 1. Stopping the copy is the wrong question

Prompt cloning in the agent market is shockingly easy. Techniques for extracting system prompts are well known, and calling the same model API has no barrier to entry. The time it takes for a competitor to analyze your agent, write a similar prompt, and put it on top of the same model is at most a few days. Ship one feature and within two weeks three similar ones appear.

So a lot of people fixate on "how do I stop the copy?" Encrypt the prompt, fine-tune a proprietary model, file a patent. But the question itself is a trap. The energy spent building defensive walls is large, and in the end the walls get breached. Software history has demonstrated this on repeat — **features get copied.**

The real question lies elsewhere. Not "how do I stop the copy" but **"why do users stick around even after they have been copied?"**

The reason feature differentiation cannot be a moat is simple. An agent's features are ultimately a combination of prompts, models, and tool calls, and all three are open materials. When ChatGPT plugins launched, hundreds of "PDF summary agents" flooded the market. The features were identical. The difference between what survived and what disappeared was not the features.

So what makes the difference? Where does the gap users feel between the original and the clone come from? This piece digs into that structure. The conclusion up front: **stop trying to prevent the copy. Build a structure where copying you is useless.**

---

## 2. "Because it already fits me"

You have a regular café. You walk in, the barista looks up and asks, "Iced Americano today?" You nod. You do not need to look at the menu, say the size, or explain how much ice. What that one line saves is not five seconds. It is the sense that **"this is a place that knows me."**

Imagine a new café opens near home. Clean interior, same coffee brand, similar price. The menu is essentially identical. But when you actually go, it is subtly inconvenient. You have to explain what you want from scratch. "Iced Americano, tall, light ice." Not wrong. But the fact that you have to repeat it every time becomes a fatigue. Eventually your feet take you back to the regular. Not because the coffee tastes better — **because there is more comfortable.**

The same thing happens with agents.

A competitor clones your agent. They took your prompt structure, they use the same model, they matched the feature list line by line. From the outside you cannot tell them apart. But once a user actually uses it, something is off. The original agent, when asked for a code review, drilled into the diff and pointed at the essentials. The clone opens with a long-winded explanation. The original already knew to keep things short without being told to. The clone does not.

This gap does not come from the prompt. It comes from **the accumulation of context.**

Things accumulate as an agent interacts with a user. Whether this user prefers bullet points or full sentences. Whether they get irritated by long explanations, or prefer more detail. Whether they want comments on the code or just clean code. These things are not written explicitly in any prompt. The user themselves cannot precisely articulate their preferences. But over time the patterns accumulate on the agent's side.

Take Claude Code. The first time I used it I had to spell everything out. "Reply in Korean." "Don't dump the whole file, just show me the part to change." "Commit messages in English." After about a month these preferences were sitting in `CLAUDE.md`, and the agent moved my way before I said anything. Someone could copy my `CLAUDE.md`. But the trial and error that produced that file — the dozens of times I said "no, not that" and confirmed "yes, this is better" — that cannot be taken. The file copies; what makes the file fit me does not.

This is the core of the first moat. **Prompts can be copied. Context cannot.**

Context is not just static data like a "user profile." It is a living record of adaptation. Which mistakes this user made last week and what to double-check this week, the pattern they repeat when using a particular library so similar requests should suggest it first. Context like this only accumulates with time and only forms through interaction. A competitor can lift the whole codebase and this part stays blank.

The new agent does not know me. With the same engine under the hood, a tool that does not know me has no choice but to behave generically. Generic means not wrong, but also not exactly right. The moment a user feels "this is my tool" is not when it fails to be wrong — it is when **it fits.**

In the end the first reason a user does not leave is plain. Not because there is no reason to leave, but **because explaining myself again is annoying.** The switching cost of teaching a new agent who I am — from scratch — is bigger than it looks. And that cost grows the longer the original is used. Time becomes the moat.

---

## 3. The feedback flywheel — the moat time builds

We confirmed above that context cannot be copied. So how does that context actually accumulate? It does not appear on its own. There is a structure beneath it. That structure is called a flywheel.

The loop of the flywheel is simple. **The agent produces an output → the user reacts (edits, approves, or ignores) → the agent learns the pattern from that reaction → the next output improves.** Each rotation of the cycle makes the agent slightly more accurate, and the user has to explain slightly less. The faster the wheel spins, the less friction. That is why we say a flywheel has "inertia."

There is a common confusion here. Conversation history and a feedback flywheel are different things. Conversation history is bound to a session. Close the window and it is gone. Open a new chat next time and the agent is back to a blank slate. The accumulation a flywheel produces, in contrast, lives across sessions. Yesterday's feedback changes today's output, last month's failure pattern corrects this month's judgment. If history is short-term memory, what the flywheel builds is long-term memory.

Concretely, what shape does this accumulation take? There is a per-user preference model — this person likes concise answers, that one wants the reasoning attached. There is a record of domain judgment — in this codebase the team convention is raw SQL over an ORM, error handling always follows the early-return pattern. There is a pattern database of failures and successes — that approach broke the tests last time, this one passed review the time before. Pulled together, these are no longer just "settings." They become a profile — a judgment system optimized for that user, that team, that domain.

Three concrete cases to see how this works in the wild.

**Claude Code's memory.** Say once: "Don't mock the DB in tests, use a real test DB." Every session after that, the agent treats a real DB connection as the default when writing tests. You never say it again. Add "commit messages in English," "type-check at TypeScript strict mode," "in PR descriptions put the reason for the change first." A hundred of these accumulate and the file is no longer a config. It is that user's personal development-style profile. It captures how they structure code, which patterns they hate, what they care about in review. A new competitor can show up and say "we have a memory feature too." The feature may be identical. But an empty memory and a memory with six months of feedback are entirely different objects.

**Spotify's Discover Weekly.** Every Monday Spotify drops a 30-track playlist per user. The recommendation algorithm itself has been published in papers, and implementing comparable collaborative filtering is not hard. Apple Music, YouTube Music, Tidal all have similar recommendation features. And yet people who switched away from Spotify keep saying the same thing: "the recommendations got obvious." Not because the algorithm is worse. Because seven-plus years of listening history — which tracks you skipped in 30 seconds, which you replayed, which genre only on Friday nights — is absent. The new service's recommendations reset to "newcomer level." Technology copies. Data built over time does not.

**GitHub Copilot's codebase learning.** Six months of a team using Copilot accumulate things. That this repo uses `ky` instead of `axios`. That error types always extend a custom `AppError` class. That test files are named `*.test.ts` not `*.spec.ts`. Copilot serves suggestions after learning the codebase's patterns and the team's conventions. Now a competing tool shows up claiming "95% code completion accuracy." When the team actually tries to switch, the suggestions are subtly off-key. It imports `axios`, throws raw `Error`, names files `.spec.ts`. You can fix each one. But the prospect of doing this for another six months is exactly what makes a team hesitate to switch. It is not relative quality of features that holds the user — it is the difference in accumulation.

The common thread across the three is visible. Claude Code accumulates an individual developer's style, Spotify accumulates a consumer's taste, Copilot accumulates a team's conventions. Different domains, identical structure. **Output → reaction → learning → improvement** — the more this loop repeats, the higher the replacement cost.

Even if a competitor builds the same thing today, six months of accumulated data cannot be bought. More servers, a bigger model, more engineers — there is no way to compress time. The flywheel starts slow but accelerates once it gets going, and that inertia itself becomes the moat. Features clone overnight; the inertia a flywheel produces does not.

---

## 4. Deep integration — the moat the pain of replacement builds

If the flywheel is the moat "time" builds, what we discuss here is the moat "depth" builds. Different character. The moat of time is built by accumulation, the moat of depth by connection.

Imagine an agent that exists as a single tool. You drop a question in a chat box and an answer comes out. Useful. One day a better agent appears. What do you do? Change the bookmark. Close the old chat window, open a new one. Done. The switching cost is close to zero. There is no data, no connection, nothing to disconnect. Tools exist independently and are replaced independently.

Now picture something different. The agent is no longer a chat window. It has become the **connective tissue** of the workflow.

Here is a concrete scenario. A teammate leaves a message in Slack — "Intermittent timeout errors in the payment module." The agent detects the message. It parses the content and auto-files a bug ticket in Jira. Priority is set to P2 based on patterns in similar past issues. It identifies the related code area and triggers a code review for the responsible developer. When the developer files a fix PR, the agent summarizes the changes and replies in the original Slack thread alongside the test results — "Fix complete. Timeout threshold adjusted from 3s to 10s. Tests passed." That flow is not one feature. It is one pipeline running through Slack, Jira, GitHub, and CI/CD. The agent sits at the center, the glue connecting each system.

In this state, suppose "a better agent" appears. Natural language understanding 20% sharper, response time twice as fast. You want to replace it. But what does replacing entail? Reconfigure the Slack integration. Redefine the ticket-creation rules per Jira project. Move the code-review triggers. Reconstruct the link with CI/CD. Remap the notification channels and mention rules. And verify all of it works as smoothly as before. During verification the team's workflow is destabilized. Tickets get missed, notifications go to the wrong place, reviews fail to fire — gaps appear.

The cost of replacement is no longer "inconvenient" — it is "operational paralysis." So you do not switch. Even with an agent that is 20% smarter, ripping out the glue that runs through four systems and holds the team's daily life together hurts more.

The distinction between tool and glue snaps into focus. A tool produces value at a single point. "Ask a question, get an answer." "Drop in code, get a review." Glue produces value between points. It converts system A's output into system B's input, then forwards the result to system C. A tool's value depends on the quality of the tool itself; glue's value depends on the number and depth of systems it connects. A tool gets swapped when a better tool arrives. Glue is hard to peel off even when better glue arrives — the surface area it sticks to is too wide.

So the most practical piece of advice for someone building an agent product is this. **Build glue, not features.** Building an agent that does one thing well is just the beginning. That agent has to lodge itself between the user's existing systems, becoming something that breaks the flow when removed. The deeper the connections, the higher the replacement cost grows — exponentially. If the replacement cost of an agent connected to one system is 1, the replacement cost of an agent running through four systems is not 4 but closer to 4 squared — because the dependencies between connections move with it.

If the flywheel holds the individual user's context to prevent churn, deep integration wraps around the organization's workflow to prevent churn. One side cannot leave "because I do not want to teach it me again," the other side cannot leave "because I do not want to reconnect all this." When both moats operate at once, the copy truly loses meaning.

---

## 5. When two moats meet — the completion of the un-copyable

So far we have looked at two moats separately. The time-based moat of the feedback flywheel, the depth-based moat of deep integration. Either alone is powerful. But there is a fundamental difference between them existing as separate things and them combining inside one system.

The structure of the combination is this. The more the flywheel spins, the more deeply the agent understands the user's workflow. Which situations route to which systems, where the bottlenecks appear, what patterns the team's communication flows in. Once this understanding accumulates, the agent can move beyond being merely "connected" and propose "deeper integration." Suggestions like: "When this kind of Slack message arrives, instead of creating a Jira ticket, check first whether there is a related PR — and if a fix is already in progress, reply in Slack with the status." A suggestion like that is only available to an agent that has observed the workflow for a long time. A new tool cannot make it.

The reverse direction also works. The deeper the integration, the richer the context data the agent encounters. An agent that observes the user only inside a chat window knows "what this person asks." But an agent that runs through multiple systems as glue knows "how this person works." When this data feeds the flywheel, both the speed and precision of learning go up. The flywheel accelerates.

Put together it is a cycle. **Flywheel → deeper understanding of the workflow → suggestions for deeper integration → richer context collection → flywheel acceleration.** A virtuous cycle. The more time passes, the wider the moat grows. Here a critical asymmetry emerges — even if a competitor shows up today with a better model and faster response, catching up to the accumulation this cycle has produced requires **investing the same amount of time.** A technology gap can be closed with capital. A time gap can only be closed with time.

So what happens with only one of the two moats? Look at the real counterexamples.

**Data without integration — Notion AI.** Notion holds a massive amount of user data. Meeting notes, project documents, personal memos, team wikis. The AI feature works fairly smartly on top of this data. The more a user writes in Notion, the more accurate the AI's answers.

The problem is the absence of integration. Notion AI operates only inside Notion. You ask inside a document, you get an answer inside the document. The agent does not send Slack notifications, file Jira tickets, or trigger GitHub PRs. It is not workflow glue. It is a sidekick locked inside one app. So if a user decides to migrate their Notion documents to Confluence, an export button alone gets the data out. The context the AI accumulated? Gone with it. Nothing breaks outside of Notion, because there are no connections to break. With nothing connected, there is nothing to disconnect. However rich the data, if that data does not run through multiple points of the workflow, the force pulling the user in is weak.

**Integration without learning — early Zapier AI.** Zapier is the king of integration. Thousands of apps connected, and few services have gone this deep into workflow automation. "When an email with a specific subject arrives in Gmail → notify a Slack channel → log to Google Sheets → create a Trello card." A team running tens of such pipelines feels real pain trying to rip Zapier out. The depth moat is clearly there.

But early Zapier AI had no flywheel. There was no per-user learning. No matter how many times you set up the same kind of automation, the AI never suggested "you did it this way last time, want the same pattern?" Every time it was from scratch. So when smarter automation tools arrived — make.com and n8n's AI features — users had a reason to swallow the pain of migration and switch. The integration moat made transition hard, but the realization "this thing does not get better the longer I use it" made the decision to migrate possible. Loyalty to a tool that does not get better with use has a limit.

What the two cases show is clear. Data alone cannot lock users in — without integration, data exits easily. Integration alone cannot hold users — without learning, the pain of switching becomes worth bearing in front of a better alternative. For a moat to truly be a moat, both axes are necessary. Learning that gets more accurate with time, and integration that lets that learning seep into every corner of the workflow so it cannot be torn out. Only when those two combine is the un-copyable structure complete.

---

## 6. Stop trying to prevent the copy

Back to the opening question. A competitor cloned your agent. Same prompt, same model, same features. The users did not leave. Why?

The answer is one sentence. **Because the clone has no time and no connections.**

A prompt is a text file. Copying it takes one second. A model is an API. Anyone with a key can call it. A feature is code. With enough engineers, it gets reproduced. But the judgment system shaped by six months of feedback exchanged with a user cannot be copied. The connective tissue running through four systems, embedded in the team's daily life, cannot be replaced with a single key. The clone is functionally identical but structurally empty. An empty shell beating six months of inertia does not happen.

So we arrive at the paradoxical conclusion. Do not spend energy preventing the copy. The hours poured into encrypting prompts, obfuscating code, and filing patents do not build a moat. Spend that energy elsewhere. Design a flywheel that gets more accurate the more it is used. Widen the depth of integration until the agent is the glue of the workflow. The wall built to stop the copy will eventually be breached, but a structure where the copy is useless does not need to be breached at all. The attacker scaled the wall and found nothing inside the keep — the real value is not the objects within the walls but the time and relationships flowing through them.

Whether you are a developer or a founder, if you are building an agent product, there is one question to put to yourself. **Does your agent get better the more it is used? Has it seeped into the user's workflow?** If neither, you do not have a moat.
