---
title: "SWE-bench Verified Is Over — The Real Reason OpenAI Retired Its Own Benchmark"
description: '80.9% and 45.9%. What does the gap between two scores recorded on the same model in the same week actually mean? And when OpenAI itself puts down its own evaluation metric, is it merely a benchmark swap, or a signal that the paradigm for measuring AI coding ability is collapsing?'
pubDate: 2026-04-27T00:00:00.000Z
lang: 'en'
pairSlug: 'swe-bench-verified-deprecation'
draft: false
---
# SWE-bench Verified Is Over — The Real Reason OpenAI Retired Its Own Benchmark

> 80.9% and 45.9%. What does the gap between two scores recorded on the same model in the same week actually mean? And when OpenAI itself puts down its own evaluation metric, is it merely a benchmark swap, or a signal that the paradigm for measuring AI coding ability is collapsing?

## OpenAI Walks Away From Its Own Benchmark

On February 23, 2026, OpenAI published a short post on its official blog titled "Why we no longer evaluate SWE-bench Verified." Its one-line summary: "The standard for frontier coding evals is changing with model maturity." An X post from the OpenAI Devs account that same day broadcast the same message.

The announcement drew 281 points and 158 comments on Hacker News. The interesting part is that two months later, in April, the discussion has resurfaced on X timelines and engineering communities. The reason is simple. The metric that had decorated the first slide of nearly every LLM launch since 2024 had been effectively pronounced dead by the company that had most aggressively used it.

SWE-bench Verified is a derivative benchmark that OpenAI itself verified and refined back in 2024. When the original SWE-bench was criticized for being noisy, OpenAI brought in human annotators and curated 500 Python issues. Hence the "Verified" in the name. For about a year and a half after that, every frontier model — the GPT-5 series, the Claude Opus series, the Gemini series — competed on scores against this metric. Headlines about breaking 80% piled up; even some outsourcing RFPs began to specify "SWE-bench Verified at X% or higher" as a procurement condition.

Now the very company that built the benchmark has declared, "we no longer use this to evaluate our models." This piece looks at the data underlying that decision and lays out what enterprise buyers and decision-makers should actually be looking at when they evaluate AI coding tools.

## What Happened — Two Defects

OpenAI's announcement gave two main reasons for retiring the benchmark: defects in the test cases themselves, and data contamination.

### Defect 1. 59.4% of Test Cases Were Broken

According to OpenAI, when it audited the SWE-bench Verified problems internally, **59.4% of them contained flawed test cases**. What is the flaw? The most frequent pattern is "the automated grader rejects functionally correct answers." That is, false negatives.

Concretely, it looks like this. A patch that actually fixes a given GitHub issue is rejected by the grading script because the script accepts only code that matches the original PR token-for-token as correct. Name a variable differently, or implement the same behavior with a different function signature, and the answer scores zero. The obvious truth that code has no single canonical answer simply does not hold inside the grader.

This creates a perverse outcome. The smarter the model, the wider the variety of expressions it produces for an answer. A model that has memorized the same PR from training data, on the other hand, reproduces the answer token-for-token. The result is a structural paradox: **"the model that actually solves the problem better gets a lower score."** That is a fatal flaw for an evaluation metric.

### Defect 2. Every Frontier Model Had Memorized the Answers

The second issue is contamination. OpenAI states explicitly that "all major frontier models are capable of reproducing verbatim gold patches." GPT-5.2, Claude Opus 4.5, Gemini 3 Flash — every model in the lineup can emit the "correct patches" from SWE-bench Verified token-for-token.

The reason is obvious in hindsight. SWE-bench was built on top of public GitHub PRs. Public PRs are included in the training data of every LLM. So the "problems and answers" of SWE-bench Verified are effectively already inside every model's pretraining corpus. It is the equivalent of showing the answer sheet to a student right before the exam.

OpenAI used its own analogy, but in plain English, this is close to "taking an exam where both the final's questions and the official solutions are printed in the student's textbook." In that condition, the fact that scores have crossed 80% is evidence of exposure, not capability.

### A Snapshot That Shows the Gap

When these two defects compound, what does the contradiction look like? The cleanest example is Claude Opus 4.5.

- SWE-bench Verified: **80.9%**
- SWE-bench Pro: **45.9%**

Two scores measured on the same model at the same moment. What is different? Verified consists of 500 Python-only tasks and carries both of the defects above. Pro, built by Scale AI, is a collection of 1,865 multi-language tasks and adopts a partially private test set to defend against contamination.

The model's capability did not get cut in half. **The ruler** changed, so the reading on the scale changed. And which of the two rulers is closer to true length is answered, decisively, by the two defects above.

## Why It Happened — A Textbook Case of Goodhart's Law

The most apt academic concept for summarizing this episode in one line is Goodhart's law. Formalized in 1975 by British economist Charles Goodhart, its most-quoted form runs:

> "When a measure becomes a target, it ceases to be a good measure."

The rise and fall of SWE-bench Verified is nearly a textbook case. It began as a tool for gauging model capability. Then it was elevated to a centerpiece of LLM marketing. Training data and evaluation pipelines were optimized to push the score upward, and the field entered a phase where "the score keeps rising but its correlation with real capability weakens." Importantly, OpenAI itself was part of that pipeline.

### The Structural Limits of Automated Graders

Code is different from natural language, but it carries an evaluation problem harder than natural language. A human can read natural language and judge meaning directly. Code has to compile and execute first. Which means automated graders are unavoidable.

There are two flavors of automated grader:
1. **Test pass/fail**: does the model's patch pass the unit tests included in the PR?
2. **Reference-patch similarity**: how close is the model's patch to the human-authored gold patch?

(1) is vulnerable to false positives. A model that produces code that merely circumvents the tests will pass. (2) is vulnerable to false negatives, as shown above. SWE-bench-style benchmarks rely mostly on (1), but the tests themselves are often thin or environment-dependent, which drives up the defect rate.

Fundamentally, the absence of a single canonical answer in code clashes with the design of any grader. The more diverse the solutions a model can produce, the wider the gap between the grader and the model.

### Trade-offs in a New Evaluation Standard

OpenAI has recommended migrating to SWE-bench Pro. But Pro is not a panacea either. The conditions a new coding benchmark needs to satisfy, in summary, are:

- **Multi-language coverage**: Java, Go, C++, TypeScript, and others. Python-only evaluation does not reflect the real-world distribution of work.
- **Proximity to real PR environments**: tasks that go beyond function-signature matching to handle multi-file, multi-module, and existing-codebase context.
- **Contamination defense**: private test sets or regular refreshes. The moment the data goes public, it gets contaminated in the next training cycle.
- **Reproducibility**: anyone needs to be able to measure the score the same way for comparisons to mean anything.

The trouble is that these requirements collide. Reproducibility demands public release; contamination defense demands the opposite. Proximity to real PR environments raises evaluation cost; running 1,865 multi-language, multi-module tasks every time is not cheap. OpenAI's reference to "stronger coding eval standards" being developed across the industry implies that consensus is being built on top of these trade-offs.

### The End of Benchmark Inflation

The standard LLM marketing pattern since 2024 has been clear. New model launches → new SWE-bench Verified high score → "coding SOTA" headlines. This pattern penetrated not only tech press but also RFPs and contracts. It is not rare to see clauses like "vendors must use tools with a benchmark score of X% or higher."

But the data above is unambiguous. In the upper 80s, a 1–2 point gap more often reflects differences in the concentration of contamination than differences in model capability. The "noise floor" of the score has grown larger than the real gap between models. At that point, score comparison can no longer function as a basis for decision-making.

## What This Means for Decision-Makers

The deprecation of SWE-bench Verified is not an academic event. It carries direct implications for decision-makers adopting AI coding tools, evaluating outsourcing vendors, or measuring internal developer productivity.

### Implication 1. Tool Selection by "Benchmark Score" Alone Has Entered Hazardous Territory

When a CTO or engineering manager compares coding assistants or AI code-review tools, the first page of every vendor deck almost invariably features a SWE-bench-class score. Once the meaning of that score is destabilized, **it is worth revisiting the decision process of selecting a tool from vendor materials alone.**

The alternative is not novel: pilot the tool on your own codebase. Let it open real PRs against your own repository for a week, and have senior engineers track actual metrics like merge rate, rollback rate, and the number of review comments. It costs money, but the cost is smaller than "the wrong tool for a year."

### Implication 2. Multi-Language, Multi-Module, and Legacy Codebases Need Separate Evaluation

SWE-bench Verified's Python-only composition was a decision to simplify evaluation, but it is far from the work distribution found in, say, the Japanese market. Buyer codebases typically contain a mix of Java, PHP, Ruby, Go, TypeScript, C#, and even COBOL. Layer on top of that internal frameworks, decade-old legacy modules, and dependencies on in-house libraries.

In that environment, the actual performance of an AI coding tool is likely uncorrelated with a Python-only benchmark score. The multi-language tasks in SWE-bench Pro are a closer approximation, but even Pro is not a substitute for your own environment. **"Does it work in our environment?"** is a question no external benchmark can answer for you automatically.

### Implication 3. The Value of Private Evaluation Sets

Some larger enterprises already operate parts of their own codebase as private evaluation sets. When commissioning an outsourcing vendor or a tool vendor, they can stipulate: "produce mergeable PRs at X% or higher on these 50 private tasks."

This approach has two advantages. First, contamination is structurally blocked. Private code is not in public training data. Second, the company's own domain, coding conventions, and legacy dependencies are all reflected in the evaluation. The downside is the cost of building and maintaining the evaluation set, but that cost can be absorbed as a natural extension of the RFP-writing process.

### Implication 4. Contracts That Assume the "Time Depreciation" of Scores

The half-life of benchmark scores is shortening. A metric reading 80% today may mean something different on the same model next year. As a result, more contracts include a clause stating that **"the metric will be re-evaluated when the standard is updated."** This is not a clause that erodes trust with the tool vendor; it is a reasonable design that prepares both sides for a moving evaluation landscape.

## Conclusion — Decision-Making in an Era of Shifting Rulers

Return to the question that opened this piece. What does the difference between 80.9% and 45.9% mean? The answer is clear. Not that the model's capability was halved, but that the credibility of the evaluation tool was. And OpenAI's retirement of SWE-bench Verified is the starting signal for the industry-wide work of building a more credible ruler.

This shift carries two implications for those adopting, evaluating, or procuring AI coding tools. First, the era when the absolute value of an external benchmark score could be the sole basis for a decision is over. Second, an evaluation regime that combines real-world measurement on your own codebase, private evaluation sets, and multi-language testing is becoming the standard.

What is interesting is that this trend is not particularly pessimistic. It is closer to a normalization — a return to the pre-"benchmark inflation" era, when buyers verified tools in their own environments. The only difference is that the subject of evaluation is now an LLM, and there is room to make the methodology more sophisticated.

Open questions remain. Once SWE-bench Pro is public, time will likely deliver it the same fate. More fundamentally, the very definition of "good code" varies by environment — how will automated graders absorb that fact? The answer the industry finds will determine the shape of AI coding tool evaluation for years to come.

---

## Sources

- OpenAI, "Why we no longer evaluate SWE-bench Verified" (2026-02-23): https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/
- OpenAI Devs X post (2026-02-23)
- SWE-Bench Pro Leaderboard (Scale AI)
- Hacker News discussion (2026-02-23, 281 points, 158 comments)
- Goodhart, C. (1975). "Problems of Monetary Management: The U.K. Experience"
