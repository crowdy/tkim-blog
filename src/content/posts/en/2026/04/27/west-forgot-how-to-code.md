---
title: "The West Forgot How to Make Things, and Now It Is Forgetting How to Code — Testing the Software Hollowing-Out Thesis"
description: 'Manufacturing optimized itself for cost until it lost its know-how entirely. Is software engineering walking the same path, or is the analogy an overdrawn narrative born of one generation''s anxiety?'
pubDate: 2026-04-27T00:00:00.000Z
lang: 'en'
pairSlug: 'west-forgot-how-to-code'
draft: false
---
# The West Forgot How to Make Things, and Now It Is Forgetting How to Code — Testing the Software Hollowing-Out Thesis

> Manufacturing optimized itself for cost until it lost its know-how entirely. Is software engineering walking the same path, or is the analogy an overdrawn narrative born of one generation's anxiety?

## Introduction: What 1,113 Points Are Pointing At

On April 23, 2026, Denis Stetskov's essay "The West Forgot How to Make Things, Now It's Forgetting How to Code," published on techtrenches.dev, reached 1,113 points and 795 comments on Hacker News. It is the top story of the week in the tech community. Numbers like this do not usually attach to a generic "AI is taking our jobs" piece. Open the comments and you find two reactions running in parallel. One says, "this is exactly the pattern my company is seeing." The other says, "is this not just nostalgia from a veteran on the verge of retirement?"

Stetskov's central argument is not a simple metaphor. He notes that U.S. manufacturing optimized for cost in the 1990s, outsourcing core capabilities, and then discovered in 2022, when it tried to support Ukraine, that it no longer had engineers who knew how to make the Stinger missile. He argues that something structurally identical is happening now in software. The sharp contraction in junior hiring, growing dependence on AI code assistants, and the concentration of load on veteran seniors. The data he marshals is striking, but it is also a claim that needs verification.

The purpose of this piece is neither to endorse Stetskov nor to dismiss him as overreaching. From the perspective of an IT manager at an enterprise that contracts out development work, I aim to lay out how far his hypothesis is testable, and which signals it is worth monitoring.

## Body 1: What Is Happening — Two Industries Running in Parallel

First, the manufacturing cases Stetskov cites. The irreversibility of know-how loss is sharp.

**Stinger missile.** Lockheed Martin's Raytheon subsidiary did not produce the Stinger man-portable air-defense missile for 20 years. New orders came in for Ukraine in 2022, but delivery is scheduled for 2026. Four years, and not because production facilities are simply absent. Raytheon is bringing back veteran engineers in their seventies to train younger personnel. The know-how lives only in people's heads, and when those people retire, it leaves with them.

**EU artillery shells.** The EU pledged a million artillery shells to Ukraine within twelve months. Actual production capacity came in at just 230,000 per year. The pledge was delayed by nine months. France stopped producing propellant domestically in 2007, creating a 17-year gap. There are reports that the German military's shell reserves stood at just two days' worth.

**Fogbank.** Production of Fogbank, a core material for nuclear weapons, was halted in 1989. When the W76 warhead refresh project needed it again in the late 2000s, the U.S. spent $69 million and several years reconstituting it. The most interesting discovery came at the end: the original Fogbank contained an unintended impurity, and that impurity turned out to be a key driver of performance. It was nowhere in the documentation. It existed only in the memories of retired engineers.

**Pentagon consolidation.** In 1993, the U.S. Department of Defense consolidated 51 defense contractors into 5. The industrial workforce went from 3.2 million to 1.1 million, a 65% reduction. As a result, a single facility in California became the lone producer of 155mm shell casings — a single point of failure.

The pattern these cases point to is simple. At the moment a cost optimization is signed off — outsource, consolidate, halt production — the know-how does not vanish. It departs slowly, with the people, and by the time it is needed again, it is often too late. Critically, there are domains where documented knowledge is insufficient to reconstruct what was lost. Fogbank's "unintended impurity" is the emblem.

Now turn to the data Stetskov draws as a parallel line in software.

**Salesforce hires zero new SWEs in 2025.** Salesforce reportedly halted new software engineer hires for 2025. CEO Marc Benioff said the company had achieved a 30% productivity gain from AI.

**54% of engineering leaders expect junior hiring to decline.** In a late-2025 industry survey, 54% of engineering leaders said they planned to reduce junior hiring going forward as AI adoption grew.

**62% drop in university computing enrollments.** Some major U.S. universities have reported a 62% year-over-year drop in new enrollments in computer science and computing programs. (Statistics vary by school; national averages may differ.) That is a signal that students are absorbing the message that "SWE has no future in the AI era."

**METR's AI productivity paradox.** A study by the nonprofit research institute METR found that experienced open-source developers working in their own familiar codebases were 19% slower when using AI coding assistants than when not. The same developers' prior expectation was that AI would make them 24% faster. The perception-versus-reality gap was 43 points. METR reads this not simply as "AI is bad" but as "in a familiar environment, the cost of verifying and correcting AI output can exceed the cost of writing the code directly."

**Stetskov's own hiring data.** Stetskov reports that out of 2,253 people he interviewed, 4 made it through. A pass rate of 0.18%. The ability he is looking for is "the technical judgment to notice when AI is wrong," and he asserts that such people "barely exist on the market."

Lined up side by side, the data from the two industries does read like two verses of the same song. That is Stetskov's rhetorical strength. But an analytical reader needs to go one step further.

## Body 2: Same and Different — Is Software Really Like Manufacturing?

Stetskov's analogy is powerful because it identifies a shared mechanism: the loss of tacit knowledge. But the two industries are not identical in every respect. Analytically, the same and the different have to be separated.

**Same 1: Apprenticeship and multigenerational transmission.**
Manufacturing know-how was transferred through master–apprentice relationships. A 50-year-old engineer trained a 30-year-old, who trained a 20-year-old. The ability to look at a cross-section and know intuitively, "this was machined wrong," cannot be picked up from a book. Software is fundamentally the same. A senior's ability to point out in code review, "this lock ordering looks dangerous," or the ability to look at a single log line during a 3 a.m. outage and hypothesize, "the DB connection pool is exhausted" — these are built on 5 to 10 years of trial and error.

**Same 2: The irreversibility of outsourcing.**
Once work is moved outside and internal headcount is drawn down, bringing it back is very hard. The cost of re-learning is greater than the cost of first-time learning. Why? Because during first-time learning, contemporary seniors were standing next to you; at the moment of re-learning, those seniors are no longer there. The Fogbank case in manufacturing makes this stark.

**Same 3: Single-point-of-failure risk.**
That a single facility in California produces 155mm casings is a military single point of failure. The same thing repeats in software. The maintenance of a critical system depending on a single senior — commonly called a "bus factor of 1" — is a familiar landscape for any buyer.

**Different 1: Code persists as text.**
The decisive difference of software is that the artifact is text. If the seventy-year-old engineer retires, the way to build a Stinger missile is lost; code, however, remains in the Git repository. In principle, anyone can read it again and understand it. But there is a trap here. Why was the lock order chosen this way? Why are there two indexes on this table? Why is this timeout 27 seconds rather than 30? Those are not written in the code. This is exactly the same category of problem as manufacturing's "Fogbank impurity." The artifact survived; the context for the judgment behind it did not.

**Different 2: AI can save or kill the apprenticeship system.**
The variable that manufacturing did not have and software does is AI. It opens both scenarios.

The saving scenario: if AI plays the role of a well-designed mentor — the junior writes the code and the AI instantly responds, "have you thought about the concurrency issue here?" — the learning curve might in fact steepen. Some educational institutions are reporting experiments in this direction.

The killing scenario: but the data is currently pointing more toward the second. If junior roles disappear in the first place, an AI mentor has no stage. And a junior who delegates debugging to AI never builds intuition for why a bug happened. Simulation is not the real thing.

The implication of METR's research is worth reading in this context. The finding that seniors get slower with AI in their own familiar domain points to a paradox: **AI is most expensive for people who know what they are doing, and most dangerous for people who do not.**

**Different 3: Is it compressible?**
Stetskov argues that technical mastery cannot be compressed. Three to five years to mid-level; five to eight to senior; over ten to principal. These numbers are industry consensus, but some counter that "AI will accelerate the learning curve." The core counter-rebuttal, however, is not about time but about the type of experience. A person who has lived through thirty 3 a.m. outages sees the thirty-first differently. AI cannot simulate a 3 a.m. outage.

Putting the same and the different together: Stetskov's analogy is not a perfect one-to-one correspondence, but the core mechanisms — loss of tacit knowledge, irreversibility, accumulation of single points of failure — are clearly shared. Software simply has, on top, the safety net of code and the two-sided variable of AI.

## Body 3: Signals Buyers Should Be Watching

Back to the IT manager's vantage point at the buyer side. If this hypothesis is even partially right, what signals are likely to become visible over the next one to three years?

**Signal 1: Market price for senior engineers.**
If juniors shrink and mid-levels do not mature, the senior pool naturally contracts. That is likely to show up in asymmetrically rising senior hourly rates. As of 2026, this looks visible only in certain domains (SRE, distributed systems, security), but the trend is worth monitoring.

**Signal 2: The absence of mid-levels.**
Under conditions of "zero junior hiring plus senior scarcity," something odd happens. The quality bar for mid-level positions rises abnormally. From a buyer's perspective, this is felt as "calling for a five-year engineer now costs what a seven-year engineer used to cost." Trends in vendor labor cost quotes can offer clues.

**Signal 3: Distribution of AI output verification skill.**
The "ability to notice when AI is wrong" that Stetskov emphasizes has begun to show up explicitly as an item in hiring interviews. When buyers evaluate vendors, it has become meaningful to ask not just "does your team use AI?" but "how does your team verify AI output?"

**Signal 4: Mean Time To Recovery (MTTR).**
When the senior pool thins, the first metric to react is MTTR. When the absolute number of people who can identify root causes at 3 a.m. falls, the same class of outage takes longer to recover. If the outsourcing contract has SLAs, trends in this metric are a clue.

**Signal 5: The particularities of the Japanese market.**
For Japanese readers, this discussion may land more heavily. The Japanese IT industry already faces a structural shortage of veteran engineers, and demographics make it likely to worsen over the next ten years. In East Asian markets including Korea and Japan, it is worth considering that Stetskov's hypothesis may become visible faster than in the U.S.

**What buyers can review**
While monitoring these signals, buyers can consider the following. First, include "junior development pipeline" in vendor evaluation criteria. Short-term it costs more, but medium-to-long-term it selects for vendors that contribute to the senior pool. Next, deliberately document the know-how of critical systems. An ADR (Architecture Decision Record) format that captures "why this decision was made" is one example. Finally, ask explicitly whether the vendor has people capable of verifying AI output — not as coercion but as information-gathering.

The common thread across these proposals is that they spend slightly more today to reduce single points of failure tomorrow. The $69 million spent to reconstitute Fogbank dwarfed the savings made in 1989.

## Conclusion: Not a Determined Future but a Possible Scenario

Stetskov's piece is powerful because it draws a clean parallel between two industries. Analytically, however, two reservations are needed. First, his 0.18% pass rate is from his own sample, not an industry-wide statistic. Second, manufacturing and software have core differences — the textual persistence of code and the two-sided nature of AI.

Even so, the core mechanisms — irreversible loss of tacit knowledge, the risk of an apprenticeship pipeline collapse, the accumulation of single points of failure — are shared. And it is hard to ignore that objective signals — the METR study, junior hiring data, university enrollment statistics — point in one direction.

The provisional answer of this piece to the opening question — "is software hollowing-out a determined future or one generation's overdrawn narrative?" — is "neither." It is one possible scenario, and which way it tilts depends on the industrial choices made over the next three to five years.

For both buyers and vendors, this is a moment when it is worth pausing the familiar instinct to cost-optimize and reviewing the picture. When U.S. manufacturing made its cost-optimization decisions in the 1990s, almost no one predicted the Stinger shortage of 2022. Depletion of the senior SRE pool, too, will sound like an abstract hypothesis until it becomes visible. What this piece offers is not an answer but a list of signals to monitor.

## Sources

- Denis Stetskov, "The West Forgot How to Make Things, Now It's Forgetting How to Code", techtrenches.dev, 2026-04-23: https://techtrenches.dev/p/the-west-forgot-how-to-make-things
- Hacker News discussion: 1,113 points, 795 comments (2026-04-23 to 24)
- METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"
- Reuters reporting on Raytheon Stinger production resumption (2022)
- W76-1 Fogbank reconstitution report (US DOE/NNSA)
- US DoD defense industry consolidation statistics (1993)
