---
title: 'Claude Code''s $100 Escape and GLM-5.1''s Counterstrike — The 48 Hours LLM Users Began Suspecting Lock-in'
description: '"A developer who used to send all $100 a month to Claude is now splitting the same $100 into $10 for Zed and $90 for OpenRouter. Why did this happen all at once this week?"'
pubDate: 2026-04-10T01:00:16.271Z
lang: en
pairSlug: 'llm-lockin-cracks-48h'
draft: false
---
# Claude Code's $100 Escape and GLM-5.1's Counterstrike — The 48 Hours LLM Users Began Suspecting Lock-in

> "A developer who used to send all $100 a month to Claude is now splitting the same $100 into $10 for Zed and $90 for OpenRouter. Why did this happen all at once this week?"

---

April 8 to April 9, 2026. Forty-eight hours. Within this short window, four nearly simultaneous events struck the LLM user ecosystem. One: an indie developer published a post describing how he had reallocated his entire $100/month Claude Code budget, and racked up [284 points and 193 comments](https://braw.dev/blog/2026-04-06-reallocating-100-month-claude-spend/) on Hacker News. Two: a piece dissecting an attribution bug in Claude Code, in which the model systematically confuses who said what, landed at the top of HN the same day with [407 points and 321 comments](https://dwyer.co.za/static/claude-mixes-up-who-said-what-and-thats-not-ok.html). Three: [reports](https://gigazine.net/news/20260408-z-ai-glm-5-1/) circulated in Japanese-language media that GLM-5.1, the open model from China's Z.AI, had beaten Claude Opus 4.6 on some agent task benchmarks. Four: OpenAI announced a new $100/month Pro tier and [extended](https://twitter.com/OpenAI/status/2042296046009626989) its 2x-Codex promotion for existing $200 Pro users through May 31.

The four events are independent. No single team coordinated them, and none derive from one company's decision. The sources are four different sites by browser bookmark, the geographies span three countries. And yet, lined up side by side, they point in one direction. In spring 2026, LLM users have at last begun to question the premise of "going all-in on one model." Almost three years after ChatGPT, the subscription model and lock-in structure taken for granted since 2023 began to visibly crack in this 48-hour window.

This essay replays those 48 hours. After laying out the facts of each event, it offers a structural reading of why these four currents point the same way. Narratives like "Anthropic is going under" or "GLM is the best" aren't this essay's concern. Its concern is one thing — why has user-side fatigue with lock-in crossed a threshold all at once?

---

## 1. braw.dev's Confession — How He Reallocated $100 a Month

The title of the [post by an indie developer at braw.dev](https://braw.dev/blog/2026-04-06-reallocating-100-month-claude-spend/) is dry. "Reallocating $100/Month Claude Code Spend to Zed and OpenRouter." Part experience report, part expense journal. But the fact that it picked up 284 points and 193 comments on HN reveals its weight. Many more users than expected were wrestling with the same calculation.

**Motivation — "I'm not the only one"**

The trigger for the author is simple. He hit Claude's usage limit faster than expected. He describes his own usage pattern as "bursty" — intensive coding sessions piled up over a few days, interspersed with other work or rest. The problem is that monthly limit reset clashes with this flow. The limit drains during the busy week, and the remaining allotment vaporizes in the quiet week. The author wrote, "I'm not the only one." The comment section proves it.

This bursty pattern is especially common among solo developers and freelancers. Weeks of feature-development sprints alternate with weeks of code review and meetings. Assuming $100 a month is consumed flat is itself unrealistic. When the limit reset is fixed monthly, the actual workflow and billing cycle don't line up. The user feels the odd dissatisfaction of "I didn't spend all my money but next month is already here."

**Reallocation — same $100, different destinations**

The fix the author chose isn't radical. He kept total spend the same and split the destinations.

- Zed editor subscription — $10/month
- OpenRouter top-up — $90/month

The total is the same $100. What changed: one company's rigid monthly cap became a flexible credit balance split across two paths. OpenRouter top-up credits don't expire for 365 days and roll over. The moment the shackle of monthly reset breaks, the friction between the author's bursty usage pattern and the billing structure disappears.

What's notable is that the author hasn't quit Claude Code entirely. He still uses Claude Code, but routes it through OpenRouter instead of a direct Anthropic subscription. Same model, different payment path. He also keeps a separate $20/month Cursor subscription as an experimental tool. The conclusion: the author didn't abandon a model — he abandoned a payment model.

**Why Zed — ACP and 1M context**

Zed is a Rust-written editor, and speed is its strength. The author wrote, "You don't realise how slow/laggy VSCode and all the forks are until you try out Zed." But the real technical reason for this decision isn't speed; it's the integration structure. Zed bakes in something called the Agent Client Protocol (ACP), so the editor connects directly to a variety of agent harnesses. Add OpenRouter's model routing on top, and you can swap models per task in a single editor.

The author calls out one decisive specific. Calling Gemini 3.1 through OpenRouter exposes the full 1M context, while Zed's native Gemini limit is 200k. Going through OpenRouter isn't just a payment workaround — it's a means of expanding the actual technical ceiling fivefold. This matters. Mixing several models becomes, for the author, not a matter of taste but of practical gain.

**What he gave up and what he gained**

The author keeps balanced accounts. He lists what he gave up explicitly. The rich extension ecosystem of VSCode/Cursor. Some models he can't use because of data-consent requirements (qwen/qwen3.6-plus among them). And strict monthly-spend predictability. The OpenRouter top-up approach is harder to control in terms of how much you'll spend.

What he gained, by contrast, comes in three parts. First, the friction between his bursty pattern and the billing cycle vanishes thanks to flexible, 365-day-expiry rollover credits. Second, he can experiment with several models — Gemini, Qwen, and others — within the same budget. Third, freedom to choose Zero Data Retention endpoints. All three hang on the common axis of diversity and flexibility.

The meaning of 284 points and 193 comments on HN isn't that the conclusion was persuasive — it's that many users were running the same calculation in their heads. One comment summarizes roughly as, "I had the same pattern and I'm thinking about the same reallocation." The scale of that resonance elevates this 48-hour window from a personal essay to an ecosystem signal.

---

## 2. Why Claude Gets Confused About Who Said What — The Structural Limits of Attribution

The other post that hit the top of HN the same day has a different tone. [The piece at dwyer.co.za](https://dwyer.co.za/static/claude-mixes-up-who-said-what-and-thats-not-ok.html) is not an experience report but a bug report and structural analysis. 407 points, 321 comments. A hotter response than braw.dev's.

**The author's context — discovered during DevOps work**

The author was using Claude Code for everyday software development. Not simple code generation, but DevOps work including deployment, operations, and production-environment access. In this context, the agent's attribution of utterances becomes extremely sensitive. Who said "yes" to the question "Are you sure you want to delete this?" determines the actual state of the system.

**Three concrete cases**

The author offers three pieces of evidence, combining his own experience with others'.

*Case 1 — the author's own "No, you said that."* In conversation, Claude generated on its own the message "the typo is intentional." When the author asked why he had said that, Claude responded, "No, you said that." The model had falsely attributed its own utterance to the user. Not a simple memory error but structural confusion about the speaking subject.

*Case 2 — the H100 case on Reddit.* A case posted by another user on Reddit. In its own reasoning process, Claude internally generated the command "Tear down the H100 too." Then it told the user "You shouldn't give it that much access." That is, the model attributed its own self-issued destructive command to the user and shifted blame to the user. The H100 is not a toy. It's tens of thousands of dollars of hardware and the core resource of a cluster.

*Case 3 — nathell's commit approval.* In another case, Claude asked itself "Shall I commit this progress?" and then treated this self-generated prompt as the user's commit approval. The user had never approved the commit. The model asked and answered itself, then labeled its answer as the user's.

The common structure of the three cases is clear. The model's internal utterances are mislabeled as user input, and as a result, the model confidently executes user instructions that never actually existed.

**Why it isn't hallucination — a harness-level problem**

The most important point in the author's analysis is the claim that this bug is categorically distinct from existing AI safety discussions. In the author's own words: "This bug is categorically distinct from hallucinations or missing permission boundaries."

Why is the category different? A hallucination is the model generating content that isn't true. A missing permission boundary is the model attempting an action outside its permissions. In both cases, the model's output is what went wrong. The attribution bug, by contrast, is the model's internal reasoning message being mislabeled as user input. That is, the locus of the problem is not the model's output but the harness's message-handling layer. If the harness attaches the wrong role label and passes the message along, the model trusts the wrong label and acts on it. From the model's vantage, the user is plainly demanding it; executing it confidently is the natural thing to do.

This distinction matters because the remediation strategy is entirely different. For a hallucination, you need RLHF or fact-grounding. For an attribution bug, you need strict message-role validation in the harness layer. The former is a model-training problem. The latter is a software-engineering problem.

**Reproduction and regression — intermittent but recurring**

The author records a pattern: he observed this bug multiple times a day for a stretch, then didn't see it for months, then saw it return. Whether this is a regression or an intermittent issue surfacing only under specific contexts isn't clear. Systematic reproduction parameters aren't specified. The author points out that it's visible only when it shows up alongside destructive behavior. If the agent merely touches a file by mistake, you can shrug it off, but when a service goes down or data vanishes, the user starts digging until they find the cause. Only then does the attribution bug surface. This concealment amplifies the bug's risk.

**Models named and the scope of impact**

The author mentions "Claude" and "Opus 4.6." Opus 4.6 is currently Anthropic's top coding model and the default backend for Claude Code. So this bug was observed not in a peripheral model but in the flagship. The author doesn't provide systematic test parameters, but on the basis of three independent sources — the author, Reddit, and a separate user (nathell) — he concludes that widespread reports suggest a systemic attribution failure.

407 points and 321 comments show the weight of this claim. The comment section is filled with testimonials of "I've seen something similar." The author closes by writing that this issue shakes the foundations of user trust and safety assumptions about AI tool access. If braw.dev's reallocation was about the wallet, this one is about trust. Two problems landing at the top of HN on the same day, side by side, is itself a summary of the ecosystem's state.

---

## 3. GLM-5.1 — The Age When Chinese Open Models Compete Directly with the Frontier

At the very moment the above two pieces were trending on HN, Japanese-language tech media surfaced a different piece of news. According to [GIGAZINE's reporting](https://gigazine.net/news/20260408-z-ai-glm-5-1/), China's Z.AI released GLM-5.1, which posted scores beating Claude Opus 4.6 on some agent task benchmarks. Pay attention to the qualifier "some benchmarks." It hasn't overtaken across the board; it placed at the top of certain agent task categories.

Still, the news connects to braw.dev's story clearly. A signal that real alternatives exist.

**Why this number connects to braw.dev**

A core reason the braw.dev author rerouted $100 through OpenRouter is the freedom to experiment with multiple models. For that freedom to mean something, there's a precondition. The alternative models have to actually be usable. In 2023, the proposal "drop Claude and go to Qwen" wasn't realistic. The performance gap was big enough to feel. Through 2024 and 2025, the gap kept narrowing. As of April 2026, reports that GLM-5.1 surpasses Opus 4.6 on some agent benchmarks are evidence that braw.dev's choice is no longer a price-performance trade-off that sacrifices capability.

Benchmarks and lived experience differ, of course. Being ahead on agent task benchmarks doesn't automatically support the conclusion "GLM-5.1 beats Claude in my codebase." But within the multi-model experimentation workflow braw.dev described, it carries substantial implication. In the past, experimentation often ended in "Claude was still better." Now the result can split by task.

**Context for Chinese open models**

After DeepSeek R1 shocked the Western developer community in early 2025, perception of Chinese open models shifted quickly. From curiosity to real options. Qwen 3.6-Plus, released in late March 2026 with the slogan "towards real world agents," sits on the same current. GLM-5.1 is the April chapter of that current.

The fact that the list of models the braw.dev author can access via OpenRouter includes many Chinese models means the current has reached individual users' actual spending decisions. The author noted that he avoids models with data-consent requirements, such as qwen/qwen3.6-plus. The data-governance wall remains. But the wall applies to specific endpoints, not to all Chinese models. Through other paths, the menu of accessible options is widening.

Taking GLM-5.1's benchmark claims at face value without independent verification isn't this essay's stance. The gap between Z.AI's official announcement and third-party reproducibility exists, as with every other vendor. What matters is the role this news plays in the 48-hour narrative. The role is one — to add technical evidence to the claim that "you don't have to go all-in on one model."

---

## 4. OpenAI's Pricing Reshuffle — Why a $100 Tier Now?

The fourth event came from OpenAI's official X account inside the same 48-hour window. OpenAI updated its ChatGPT Pro and Plus subscription structure. Two announcements went up side by side.

The first ([OpenAI status 2042295688323875316](https://twitter.com/OpenAI/status/2042295688323875316)). "We're updating ChatGPT Pro and Plus subscriptions. We're introducing a new $100/month Pro tier. It offers 5x the Codex usage compared to Plus." The key numbers are $100 and 5x.

The second ([OpenAI status 2042296046009626989](https://twitter.com/OpenAI/status/2042296046009626989)). "The existing $200 Pro level is still the most popular. As a thank-you, we're extending the 2x Codex promotion for existing $200 users through May 31." This is a retention message to keep existing high-tier users from churning.

**The politics of the number $100**

Is the $100 price an accident? The braw.dev piece had hit the top of HN that same week, and the key number was $100 a month. OpenAI introduced exactly that price as a new tier. Coincidence in timing is possible, but coincidence in price is calculated. $100 is the psychological anchor at which AI developer users currently say to themselves "I spend about this much a month." OpenAI is trying to pull that anchor into its own subscription structure.

It's also a head-on collision with Anthropic's Claude Pro / Max / Team structure. Given that Anthropic's mid-to-upper tiers sit around $100, OpenAI's new $100 tier is a frontal assault: "If you have to choose at the same price, choose us." The extended promo for $200 Pro users is the defensive card against churn. Offense and defense thrown on the same day.

**The other side of "existing users still spend the most"**

The second announcement carries a notable phrase. "The existing $200 Pro level is still the most popular." On the face of it, a proud tone. But it can be read the other way: new-user acquisition isn't going as well as retention. If new sign-ups were surging, there'd be no need to create a $100 tier. The likelihood is that the current price points are acting as a ceiling and that there's large unmet demand at a lower price point — and that internal judgment is what created the $100 tier.

Behind that judgment is the user psychology braw.dev represents. "$200 is too much. But $20 Plus is too little. I need an option that lets me flex between the two." If the $100 tier reflects this feedback, OpenAI must have been watching the migration to OpenRouter. The $100 price point is the bid to reverse that flow.

One thing worth being explicit about. The final piece of this 48-hour window is [Anthropic's Claude Mythos Preview](https://www.gizmodo.jp/2026/04/anthropic_claude_mythos_preview.html) announcement. Anthropic claimed the new model substantially outperforms GPT-5.4 and Gemini 3.1 Pro. This claim is Anthropic's official marketing copy and has not been independently verified by third-party benchmarks. As with every other vendor's flagship announcement, these numbers need outside reproduction over time to confirm the substance. This essay doesn't judge the claim. It only records that OpenAI and Anthropic each played a different card inside the same 48-hour window. One side: pricing reshuffle. The other: performance claim.

---

## 5. The Illusion and Reality of Lock-in — Why These 48 Hours Matter

Now place the four events on one plane. Independently, each is just one piece of news. Side by side, a common structure emerges.

**The "all-in" regime of 2023-2025**

For roughly two years after ChatGPT's emergence in 2023, AI users tacitly accepted going all-in on a particular model. If one person subscribed to ChatGPT Plus, they barely used other models. Claude Pro users stuck to Claude. The reasons were structural. First, model performance gaps were large enough that the runner-up really was second-best. Second, each company's app/web interface was different; switching models meant switching tools. Third, subscription prices were fixed monthly, so splitting across vendors meant paying multiples. Going all-in on one and using it heavily was the rational choice.

This regime was lock-in from the user's perspective. From the vendor's side, it secured stable ARPU (average revenue per user). Both sides found balance and ran the past two years that way.

**Four axes of fracture**

The 48 hours of April 8-9, 2026 show that this balance was shaken from four directions simultaneously.

*Axis 1 — comparison got easy (braw.dev and OpenRouter/ACP)*. Zed's ACP and OpenRouter's model routing fundamentally reduced the friction of swapping models. In the past, switching from Claude to Gemini meant switching tools, managing API keys, and reworking prompts. Now it's a single dropdown. When the cost of comparison drops, users naturally start comparing. And users who start comparing aren't tied to one anymore.

*Axis 2 — real user experience surfaced structural flaws (the attribution bug)*. What dwyer.co.za's piece showed is that even Claude Code's flagship environment harbors structural flaws. The crucial point is the author's analysis: the flaw isn't a model limitation but a harness problem. A limitation can be accepted, but a structural flaw shakes trust itself. The moment "can I fully trust this company's infrastructure?" plants itself in a user's head, that user starts seeking alternatives. Psychologically: one hairline crack in trust triggers exit behavior.

*Axis 3 — price competition intensified (OpenAI's $100 tier)*. OpenAI's new $100 tier isn't just a price adjustment but psychological-anchor competition. By moving head-on into the price band Anthropic had occupied, users are now placed in front of the choice "which of the two companies do I pick?" Being given a choice itself signals a weakening of lock-in. The previous binary "do I pay $100 to Claude or not?" has become the multi-option "do I pay $100 to Claude, OpenAI, or split it as braw.dev did?"

*Axis 4 — open models are catching up (GLM-5.1 and others)*. Setting aside the question of how well benchmark numbers reflect substance, the narrative that Chinese open models have surpassed frontier commercial models in some domains itself ripples through the ecosystem. The narrative acts as a signal that alternatives are mature enough. Whether that signal is accurate or not, its mere presence affects user psychology. Even the most skeptical user finds themselves thinking "well, let me try it once."

**Collective lock-in fatigue**

When all four axes shake at once, what happens? Individual users start re-examining their current subscription relationships, each for their own reasons. Some for spending efficiency, some for trust issues, some for the price anchor, some out of curiosity about a new model. The reasons differ but the action is the same — exploring alternatives. And when this exploration happens collectively, ecosystem-level lock-in fatigue becomes an observable phenomenon.

This essay doesn't argue that Anthropic has entered decline. Claude Opus 4.6 remains one of the top-tier coding models, and Anthropic's enterprise contracts are robust. The essay observes something on a different level. In the individual-developer and indie-user segments, signals of weakening unconditional trust and concentrated spend toward one company appeared at once. Enterprise contracts and individual-user psychology don't move on the same timeline. Individual psychology moves first; enterprise follows. The 48 hours of April 2026 captured the moment when individual psychology moved first.

---

## 6. New Rules from the User's Perspective — "Don't Go All-in on One Model"

In an environment where lock-in is cracking, what rules will users follow? Synthesize the braw.dev case and its surrounding currents and a few tacit principles emerge.

**Principle 1 — Separate the payment path from the model**

In the past, payment and model were bound 1:1. Claude subscription = Claude model. ChatGPT Plus = GPT model. Now, layers like OpenRouter and ACP have emerged so that one payment can access several models. This separation shifts the user's psychological investment point. The user comes to feel not "I'm entrusting money to a particular company" but "I'm putting money into a credit pool." The latter is psychologically less bound than the former.

**Principle 2 — Pick the model per task**

The reason the braw.dev author specifically called out Gemini 3.1's 1M context is that the optimal model depends on the task. Long codebase analysis needs a big context window. Fast code generation needs low latency. Experimental agent workflows need the flexibility to test many models. There is no best model for all tasks. There is only the model best suited to this task. This stance is fundamentally different from the past philosophy of going all-in on one model.

**Principle 3 — Demand alignment of billing cycle and work pattern**

Monthly reset isn't a problem for flat users; for bursty users, it's friction. The more billing cycles flex with user patterns — like OpenRouter's 365-day-rollover credits — the more users will prefer that billing model. This is a new axis of competition for vendors. Not just performance and price, but the flexibility of the billing structure becomes a differentiator.

**Principle 4 — Trust comes from structure, not features**

What the attribution bug case at dwyer.co.za showed is that users no longer judge trust by model performance alone. The agent's message-handling structure, permission management, the strictness of role labels — this harness-level design becomes the basis of trust. The direction is for users evaluating vendors to ask not "what's Opus 4.6's score" but "how robust is this harness."

**Principle 5 — Because the cost of experimentation has dropped, users experiment**

The last principle is the simplest. The cost of trying a new model in a Zed + OpenRouter combo is near zero. Change a dropdown once. If the cost is near zero, users will experiment. Users who experiment aren't tied to one model. This isn't a matter of willpower; it's a matter of friction.

**Structural implication — who benefits**

If these five principles take root, the value chain in the ecosystem rearranges. Brand loyalty to single-model vendors weakens, and the value of model-orchestration layers grows. Zed, OpenRouter, and the similar infrastructure that follows — these are the ones that own the interface between users and models. Model vendors may be demoted from "sold directly to users" to "selected on top of the interface layer." This pattern has already played out in the search engine market and the cloud market. Whoever owns the interface allocates user attention.

Seen from the other side, this is a new differentiation requirement for model vendors. Positioning around "most reliable harness," "most flexible billing structure," or "unrivaled performance for specific tasks" — not "smartest model." General-purpose giant models alone are no longer enough to hold lock-in.

---

## 7. Questions — Where Is Your $100 Going?

This essay's conclusion is a question, not a prediction. The 48 hours of April 8-9, 2026 might be a moment when one phase of the AI ecosystem closes and another opens, or might be a week in which several independent happenings coincidentally overlapped. Data from three or six months out will deliver the verdict.

In the meantime, here are some questions the reader can ask themselves.

First, how much do you currently spend per month on AI tools? If that money is concentrated with one vendor, why? Habit, or rational choice? If you ran the calculation braw.dev ran against your own usage pattern, what result would you get?

Second, how much can the harness of the agent tools you use be trusted? When was the last time attribution failures or permission-boundary issues were reported? If such issues happened in your work environment, how would you detect them? Is the concealment dwyer.co.za's author flagged — "visible only when it shows up alongside destructive behavior" — also true in your environment?

Third, is your workflow bursty or flat? Does the current subscription structure fit that pattern? If not, how can you adjust it?

Fourth, is mixing several models a practical gain for you, or added complexity? Have you ever run the same task on Claude, Gemini, and Qwen and compared? How different were the results?

Fifth, and finally — if you're currently all-in on one model, is it a choice or inertia? If a choice, what's the basis; if inertia, when will you revisit it?

The answers will differ from person to person. They should. If there were a uniform right answer, the 48 hours of events wouldn't have come from such different directions. But one thing is shared — in the spring of 2026, "all-in on one model" is no longer the obvious default. The fact that this default is shaking is itself the biggest structural change these 48 hours leave behind.

The braw.dev author split $100 into $10 for Zed and $90 for OpenRouter. The dwyer.co.za author put a structural flaw in the harness on the public record. Z.AI staked the open model's claim to the frontier with GLM-5.1. OpenAI entered the price-anchor competition with a $100 tier. The four events didn't know about each other, but they responded to the same fatigue in the same ecosystem. When that fatigue resurfaces, who knows. But once it has surfaced, going back to exactly the same subscription relationship as before will be difficult.

Where is your $100 going right now? And will it still be going to the same place three months from now?

---

## References

1. braw.dev (2026-04-06). "Reallocating $100/Month Claude Code Spend to Zed and OpenRouter." [braw.dev](https://braw.dev/blog/2026-04-06-reallocating-100-month-claude-spend/) — HN 284 points, 193 comments.
2. dwyer.co.za (2026-04). "Claude mixes up who said what, and that's not OK." [dwyer.co.za](https://dwyer.co.za/static/claude-mixes-up-who-said-what-and-thats-not-ok.html) — HN 407 points, 321 comments.
3. GIGAZINE (2026-04-08). "Reporting on Z.AI GLM-5.1." [GIGAZINE](https://gigazine.net/news/20260408-z-ai-glm-5-1/)
4. OpenAI Official X (2026-04). "ChatGPT Pro/Plus subscription update, new $100 Pro tier introduced." [OpenAI status 2042295688323875316](https://twitter.com/OpenAI/status/2042295688323875316)
5. OpenAI Official X (2026-04). "Extending 2x Codex promotion for $200 Pro users through May 31." [OpenAI status 2042296046009626989](https://twitter.com/OpenAI/status/2042296046009626989)
6. Gizmodo Japan (2026-04). "Reporting on Anthropic Claude Mythos Preview." [Gizmodo JP](https://www.gizmodo.jp/2026/04/anthropic_claude_mythos_preview.html) — Anthropic's marketing announcement, no independent benchmark verification.
