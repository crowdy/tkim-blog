---
title: 'The Token-Count Era — We Are Measuring AI Usage Wrong'
description: '"You consumed 210 billion tokens this quarter." That was the report one OpenAI engineer received. Meta has begun folding employees'' AI consumption into performance reviews. The same week, Anthropic published research saying the opposite — the more skilled the user, the less they delegate to AI.'
pubDate: 2026-03-27T00:57:54.253Z
lang: 'en'
pairSlug: 'token-count-trap-measuring-ai-wrong'
draft: false
---
# The Token-Count Era — We Are Measuring AI Usage Wrong

> "You consumed 210 billion tokens this quarter." That was the report one OpenAI engineer received. Meta has begun folding employees' AI consumption into performance reviews. The same week, Anthropic published research saying the opposite — the more skilled the user, the less they delegate to AI.

---

## 1. The era of counting tokens

In March 2026, Gizmodo broke a striking story. Meta had started tracking employees' AI token consumption and folding it into performance reviews. OpenAI was also circulating internal token-usage reports for its engineers. One engineer's consumption clocked in at 210 billion tokens — the equivalent of 33 Wikipedias. Greg Brockman boasted that within a week of the GPT-5.4 launch, daily processing hit 5 trillion tokens, and that this translated into an annual new revenue line of one billion dollars.

Numbers are easy. Easy to count, easy to compare, easy to plot. So organizations love them.

The trend is not confined to tech companies. According to a survey by the American Medical Association (AMA), 80% of U.S. physicians already use AI in clinical practice. When one of the most conservative professions on earth has gone that far, the writing is on the wall for everyone else. Legal, finance, education — across every white-collar profession, AI usage is no longer a choice but an expectation. "You're not using AI yet?" now carries the same weight as "You're not using email yet?" once did.

The organizational logic is intuitive. AI is a productivity tool. Employees who use the tool a lot produce a lot. Therefore, employees with high token consumption are more productive. QED.

Is that really how it works?

---

## 2. Why the skilled users use less

In March 2026, Anthropic published a new report from its Economic Index titled *"Learning Curves."* The most striking finding in this long-running analysis of Claude usage data was this:

**Long-term users — those with more than six months of use — had a conversation success rate four percentage points higher than new users.**

Four percentage points may not sound dramatic. But once you remember that this gap **held even after controlling for every usage context** rather than for a specific task, it points to a structural difference. Given the same model, the same features, and the same task, the user with more experience gets better results.

How?

The report captures several patterns. Long-term users' prompts scored **6% higher in education level**. Here "education level" does not refer to vocabulary difficulty or sentence length. It is a measure of how structured the requirements are — how clearly the user conveys what they want, what the constraints are, and what shape the output should take. For each additional year of usage, prompt-education-level rose by roughly one year's worth.

More interesting is the shift in delegation patterns. Long-term users' **directive usage — handing the AI full autonomy — went down.** "Just do it" gave way to "Within this scope, with these constraints, in this format." At the same time, **task iteration and validation** — the loop of checking outputs and issuing correction instructions — went up.

In plain terms: novices delegate a lot and use the output as-is. The experienced direct the AI precisely, verify the result, and direct it again. **By token volume, novices may actually consume more.** Long, ambiguous prompts pull back long, rambling answers. The experienced send short, precise prompts and get short, precise answers. Fewer tokens, better results.

The report offers another number. Long-term users' **personal-purpose usage drops by 10%** while work-related usage rises by 7 percentage points. The more skilled they become, the more AI shifts from "play" to "tool." But this also means experienced users narrow the territory in which they apply AI. Rather than trying every possible task, **they identify the domains where they wield AI well and concentrate their use there.**

Place this data next to Meta's token-tracking policy, and the irony sharpens. Meta rewards employees who burn through tokens. Anthropic's data says people who use tokens wisely — and often sparingly — produce better results. **The behavior the organization rewards and the behavior that actually delivers results are pointing in opposite directions.**

---

## 3. The bigger the usage, the longer the shadow

The skilled user's restraint is not only a question of efficiency. **They also see the risks.**

On 29 January 2026, Japan's Information-technology Promotion Agency (IPA) published its annual *Top 10 Information Security Threats* with an unprecedented result. **"Cybersecurity risk from AI usage" appeared on the list for the first time and immediately ranked third.** Just below ransomware at #1 and supply-chain attacks at #2 — threats that have held the top of the rankings for years. For a brand-new entry to debut at #3 speaks to its urgency.

IPA's warning is concrete. When an employee feeds confidential information into a cloud-based AI, that data may be used for model training or exposed to the provider. According to IPA's 2024 survey of corporate trade-secret management, **the share of companies aware of confidential information leaks reached 35.5%** — a **roughly sevenfold increase** from 5.2% in 2020. Leaks tied to cyberattacks jumped from 8.0% to 36.6%.

Corporate responses are polarizing. **26.2% of companies have outright banned the use of generative AI** — 16.3% through internal policy, 9.8% through technical blocking. On the other side, a movement to allow AI use but build it on in-house infrastructure rather than the public cloud is accelerating. Security firm Secom has begun standing up AI infrastructure in its own data centers, and in January 2026 KDDI brought the "Osaka Sakai Data Center" online, providing an environment where companies can use AI without sending confidential data outside their walls.

A Breached.Company survey is more direct. **77% of employees are leaking corporate data outside the company through AI tools.** Not maliciously. They feed data to AI to do their jobs better and faster. The organizational pressure to "use more AI" is opening unintended security holes.

Another paradox piles on top. The same week, Forbes Japan ran a piece arguing that "AI is taking creative work away and adding chores." The promise of AI adoption was to "automate repetitive drudgery so humans can focus on creative work." Reality is inverted. AI now handles writing, design, planning — the creative work — while humans inherit **a new class of drudgery**: reviewing AI outputs, tuning prompts, cleaning up data.

Organizations standing on the premise that "more AI is better" are simultaneously growing three shadows: security risk, declining work quality, and distorted measurement.

---

## 4. Measure design, not volume

The critique Gizmodo cited goes straight to the heart of it. **"It's like judging the quality of a paint job by how much paint was used."**

Did the painter who used a lot of paint produce a great painting? Was the painter who used little paint lazy? A master of ink-wash painting draws a single stroke. A novice paints over it ten times. By volume of ink, the novice is the clear winner.

It is the same with AI usage. The question is not how many tokens are counted but **what structure the AI is being used inside of.**

The same week, Anthropic published another blog post — a technical piece on how their engineering team uses a **multi-agent harness** to do frontend design and long-horizon autonomous software engineering. What stands out is the approach. Rather than telling the AI "go write the code," they **design roles among agents, insert verification loops, and explicitly place human-in-the-loop checkpoints.** AI autonomy is raised, but the perimeter inside which that autonomy operates is designed by humans.

The Anthropic Science Blog, launched in the same window, shows similar philosophy. AI is deployed in scientific research, but the framing is not "give the research to the AI" — it is "let a researcher use AI to accelerate specific steps." The AI reads papers and suggests hypotheses; the human researcher evaluates those hypotheses and designs the experiments. Not autonomy, but **collaboration.**

The direction these examples point to is unmistakable. The quality of AI use lies not in the token count but in **the design of the workflow.** Not how much was used, but inside what structure. Is there a verification step? Are the points where human judgment must intervene named explicitly? Is the AI's output used as-is, or reviewed and revised?

If so, what should an organization measure? Instead of token counts, here are the questions worth asking.

**First, is AI structurally integrated into the process?** An individual lobbing ad-hoc questions at ChatGPT is fundamentally different from a team where an AI agent occupies an explicit role in the workflow. The former is AI-Enabled; the latter is AI-Native. What should be measured is not tokens but **the rate of process redesign.**

**Second, is the AI's output being verified?** Compare the fraction of AI-generated code, documents, and analyses used as-is against the fraction reviewed by humans before use. If the former is high, the organization is accumulating risk. If the latter is high, AI is being controlled as a tool. What should be measured is **the presence and density of verification loops.**

**Third, has something that was impossible before AI become possible?** Anthropic's own internal research found that 27% of work done with Claude was "work that would not have been done otherwise." Not efficiency gain, but possibility expansion. An organization burning through tokens is not necessarily generating new value. Replacing existing work with AI and starting new work because of AI are completely different dimensions.

---

## 5. What you measure shapes what people do

Economics has Goodhart's Law. **"When a measure becomes a target, it ceases to be a good measure."** Posited in 1975 by the British economist Charles Goodhart, the law is replaying with eerie precision in the AI era half a century later.

Set token consumption as a KPI, and the organization moves in the direction of consuming more tokens. People write long, ambiguous prompts instead of short, precise ones; they fire more questions instead of verifying results; they cram AI into tasks that do not need AI. Tokens go up; productivity stays flat or even drops. More confidential data flows outside the company. Creative work transfers to the AI. Humans are buried in the new drudgery of managing AI.

The portrait of skilled users in Anthropic's data is the inverse. They use AI less and use it better. More refined prompts, narrower scope, stricter verification. Measured by token count, they look average or even low. But the quality of their output is consistently high.

A Swedish software engineer was reported to be spending more on Claude Code than his own annual salary. Is this person using AI well, or overusing it? Token counts alone cannot answer. You have to look at what they produced with AI, and what structure surrounded that process.

If organizations truly want to drive AI adoption, instead of counting tokens, they should be asking:

- Does AI occupy an **explicit role** in our team's workflow?
- Is a **verification step** built into the process for AI outputs?
- Since adopting AI, have we started doing **work that was previously impossible**?
- Are we **classifying the sensitivity** of data being fed to AI?
- Do we have evidence that AI use is improving our team's **decision quality**?

These questions are harder to measure than token counts. That is precisely why they matter. Counting the easily countable is convenient, but that convenience steers the organization in the wrong direction.

No art museum evaluates painters by paint consumption. No taxi company evaluates drivers by mileage. An organization that evaluates AI competence by token volume is an organization that has not yet understood AI.

**Being good at AI is not about using a lot of AI. It is about being able to design the structure within which AI operates.** And that design capability does not show up on any token report.

---

*References:*
- *Anthropic, "Economic Index: Learning Curves" (March 2026)*
- *Gizmodo Japan, "AI使うほど人事評価が上がる？テック企業が従業員の「消費トークン」をカウントし始める" (March 2026)*
- *IPA, "情報セキュリティ10大脅威 2026" (January 2026)*
- *IPA, "企業における営業秘密管理に関する実態調査 2024" (August 2025)*
- *Forbes Japan, "生成AIの機密漏洩リスクにIPAが警告" (March 2026)*
- *Forbes Japan, "AIが生み出した皮肉な現実──創造的業務を奪い、雑務を増やす" (March 2026)*
- *Anthropic Engineering Blog, "Multi-Agent Harness for Frontend Design and Long-Horizon Software Engineering" (March 2026)*
- *AMA Survey on Physician AI Usage (2026)*
