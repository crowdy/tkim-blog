---
title: 'RAG Was Not the Silver Bullet — Why 72% Fail'
description: 'We believed that automating oncall response runbooks with RAG would change an engineer''s 3 a.m. We swapped models, swapped chunking strategies, invested months. Accuracy never reached 70%. The project was scrapped.'
pubDate: 2026-03-27T08:26:39.192Z
lang: 'en'
pairSlug: 'rag-not-silver-bullet'
draft: false
---
# RAG Was Not the Silver Bullet — Why 72% Fail

> We believed that automating oncall response runbooks with RAG would change an engineer's 3 a.m. We swapped models, swapped chunking strategies, invested months. Accuracy never reached 70%. The project was scrapped.

---

## 1. I failed too

There was a system that automatically paged an engineer whenever an incident occurred or a script needed inspection. It rings at 3 a.m. too. When the alarm fires, you wake up, dig through logs, and try to recall in your head the order in which you should respond. Especially when the incident type is one that keeps recurring. "The answer is already written down — why does a human have to look it up every time?"

That was how the RAG project started. The idea was to index the response runbook documents scattered around the company, and when an oncall alarm fires, deliver the relevant runbook alongside it. Classify the incident type, find the most similar document by embedding, paste it into the Slack message. Simple, clean.

But the hit ratio did not climb. I upgraded the model. Changed the chunking strategy. Increased overlap, restructured documents. Accuracy still did not pass 70%. The wrong runbook kept getting attached, or the system returned "no relevant document found."

It took months to see the underlying problem. The runbooks themselves were not maintained properly. Some incident types had two documents with different contents. Some types had no document at all. Many runbooks had been left to rot, out of sync with the actual environment. RAG is a tool for quickly retrieving good documents — but the documents to be retrieved were a mess.

The conclusion was clear. With limited resources, investing in cutting oncall response time was less correct than investing in cutting oncall itself. We shelved the project.

But was that experience peculiar to me? The industry data says otherwise.

---

## 2. 72% fail — what the numbers say

In a 2024 report, Gartner announced that by the end of 2025, more than 30% of GenAI projects will be abandoned after PoC (proof of concept). The cited causes are four: data quality issues, missing risk management, costs exceeding expectations, and unclear business value. Notably, "model performance" is not on the list of causes. Failure tends to come not from the technology itself but from the foundation that supports it.

According to one industry analysis, the situation is harsher. David Richards (ragaboutit.com), a former Principal Engineer at TikTok and Salesforce who works on RAG architecture, estimates that 72% of enterprise RAG projects either fail or fall short of expectations in the first year. Of course, this is a blog-based industry estimate, not peer-reviewed research. But it comes out of accumulated field experience, so it cannot be dismissed outright.

More intuitive than numbers are real implementations. Developer blog andros.dev has a post that pulled 292 points on Hacker News — a record of indexing 1TB of a decade's worth of internal technical documents into RAG. Stack: LlamaIndex + ChromaDB + Ollama (llama3.2:3b). The output was 738,470 vectors and a 54GB index. But before that, there was earlier work: filtering out 54% of all files — videos, images, executables, things that cannot be processed as text. A custom filtering pipeline was needed, and the conclusion arrived was that without checkpointing and monitoring infrastructure, large-scale indexing is itself impossible. GPU rental came to €184. The duration: two to three weeks.

In the Hacker News comment thread, experienced developers responded with one voice. "The idea that converting PDFs to markdown is the end is a fantasy." The point was repeated: vector similarity search alone cannot handle data where temporal order matters, images inside PDFs, or queries that need to reference multiple sources at once. One of the most-cited lines was this: "Data quality is 80%." Interestingly, in the same thread, the claim that "RAG is dead" was uniformly rebutted by experienced practitioners — on the grounds that plain vector search was never the real solution to begin with.

Gartner's 30%, the 72% estimate, andros.dev's two-to-three-week struggle — they all point in the same direction. RAG is not easy. So what was different about the places that succeeded?

---

## 3. What was different at places that succeeded

First, you have to face the cost reality. According to Stratagem Systems' analysis, the initial build cost of enterprise RAG over 100,000+ documents falls between $34,400 and $58,000. Monthly operating cost runs $14,000 to $27,000, and a dedicated engineer alone is $75,000 to $150,000 per year. The most underestimated line item is data cleaning and preprocessing, which accounts for 30 to 50% of total cost in most projects. Teams that have analyzed actual spend after the fact mostly report spending two to three times the initial estimate. The entry cost itself is already high.

Even so, there are successful cases. Look closely at the differences and a common pattern shows up.

UK financial services company NewDay handles 2.5 million customer service calls per year. Its RAG adoption was not ambitious. The target documents were limited to about 200 knowledge articles, and it put Claude 3 Haiku on top of an AWS serverless architecture. Monthly operating cost: under $400. The results were impressive — over 90% accuracy, agent search time cut from 90 seconds to 4 seconds.

But the road was not smooth from the start. When the system was opened up to 10 actual agents, accuracy plunged to 70%. The cause was unexpected. The agents naturally used internal abbreviations and acronyms, and the system understood none of them. Documents were written in formal terminology, while people queried in the language of the field. A small gap, but a fatal one.

The solution was inelegant — the abbreviation dictionary was injected statically into the LLM prompt. And iteratively optimized. 70% to 80%, 80% to 90%. Multiple feedback loops were needed before the numbers recovered. NewDay succeeded not because its technology was outstanding. It succeeded by narrowing document scope to 200 to control the domain, absorbing user feedback into the system, and committing to the work.

LinkedIn's case took a different approach altogether. A team of seven researchers designed a Knowledge Graph + RAG hybrid architecture. They combined four systems: Neo4j (graph DB), QDrant (vector DB), GPT-4, BERT/E5 embeddings. They extracted issue relationships from Jira tickets to build a two-level graph structure, and ran a hybrid parsing pipeline combining rule-based extraction with LLM parsing. Results: 77.6% improvement in MRR, 28.6% reduction in issue resolution time. This was not plain vector search — it was graph-based reasoning.

Back to andros.dev: the €184 GPU rental was "pocket change." One developer in the HN comments summed it up: "Infrastructure cost is pocket change. The real cost is labor." Three man-weeks of engineering labor was the body of the actual investment.

Lay the three cases side by side and a pattern emerges. The successful teams did not approach with "let's index first and see." NewDay controlled domain scope and built a loop that absorbed user feedback as data. LinkedIn acknowledged the problem could not be solved by plain vector search and designed an architecture to match. FAQ-style structured queries and queries that require complex domain judgment fundamentally need different systems. The shape of the problem decides success or failure.

> "A RAG demo takes a day. Production RAG is a different commitment."

The successful places built Knowledge Graphs, hybrid retrieval, feedback loops, dedicated engineers — that is, a "system that includes RAG," not RAG alone. And that fact points to why RAG structurally cannot be a silver bullet.

---

## 4. RAG's structural limits — why it cannot be a silver bullet

To understand why RAG so often disappoints, you have to go down to the floor of how it works.

The core mechanism of RAG is vector embedding. An entire paragraph gets compressed into a single array of numbers. With OpenAI's default model, one coordinate composed of 1,536 numbers — the so-called bi-encoder approach. Documents are encoded once and stored as vectors; queries are encoded the same way, and the cosine similarity between the two vectors decides whether they are semantically close. Fast and scalable. But the design is fundamentally lossy. A paragraph carrying complex multi-step reasoning and a single line of simple definition both end up as a single point in the same dimensional space. The context and structure of sentences are partially lost in the process. The premise that "close cosine similarity = semantically related" does not always hold — and yet everything is built on top of it.

There is also a gap between theoretical context window and the context window actually usable. An experience shared by a developer on Hacker News illustrates it well — pasting a 2,000-line React component into RAG as a single unit produced unusable results, but cutting it down to 200 lines made it work. The length a model "can process" and the length from which it can actually extract meaning well are different things. Being under the token limit does not mean there is no problem.

There are also fundamental vulnerabilities depending on data type. Time-series queries like "by what percent did Q3 2024 operating profit change versus the prior quarter" do not translate into the language of vector similarity search. Tables and graphs embedded as images in PDFs are not indexable as text at all. Cross-document queries that require referring to multiple documents simultaneously to produce an answer simply do not fit a structure that returns a single similar document. These queries are fundamentally areas where vector similarity does not perform well.

But in real-world deployments, the largest cause of RAG failure turns out not to be retrieval or generation. According to Analytics Vidhya's July 2025 analysis, 80% of RAG failures trace back to the chunking stage. Which model you use or how you retrieve matters less than how you cut the documents. Mechanically split chunks that ignore semantic units cannot be saved by even the best embedding model. The fight is decided at the input stage.

Back briefly to my oncall automation project — yes, the runbook documents were a mess. But there was a more fundamental problem. "Which runbook should be applied to this incident now" was a problem of situational judgment, not similarity calculation. The same alarm needed different runbooks depending on prerequisites. This was not a failure of RAG implementation but a mismatch with the RAG pattern itself — the shape of the problem was different from what RAG is good at.

Once you recognize these limits, the next question is natural — so what should you use?

---

## 5. So what should you use — the options in 2026

Confirming RAG's limits does not mean there is only one alternative. As of 2026, the options branch in four directions.

**Long context.** One vector search call costs around $0.00008. By contrast, pushing entire long documents through long-context inference comes out to about $0.1 per query. A common misunderstanding shows up here — RAG also follows retrieval with LLM generation, so simple comparison does not hold. What matters is the difference in fit. When you need "reasoning that moves across an entire bounded document" — contracts, reports, document comparison — long context shines. Drop the whole document in and let the model carry the context. With the caveat: when the relevant information sits in the middle of the document, accuracy drops by 10 to 20%. Models remember the front and the back better — primacy bias and recency bias.

**Hybrid (retrieval → reasoning).** Narrow candidates with vector search, then put the selected chunks through long-context reasoning together. A structure that practically balances cost and accuracy, and the formula that works most often in the field in 2025-2026. Look back at how LinkedIn and NewDay succeeded — they were already designing close to this pattern, even if no one called it "hybrid" at the time.

**Agentic RAG.** A direction where the model itself controls retrieval. Self-RAG (Asai et al., ICLR 2024) has the LLM generate retrieval queries directly, evaluate retrieval quality with reflection tokens, and re-retrieve when judged insufficient. Corrective RAG (CRAG) has a similar self-correcting mechanism. This moves beyond simple similarity matching — the model actively judges the quality of retrieval itself. Not yet mature, but a fundamentally different approach from "embed and search."

**Not using RAG is also an answer.** Changing the tool is not always the right answer. Sometimes redefining the shape of the problem is the better choice. When the oncall automation project was shelved, the team's conclusion was not "let's build a better retrieval system." We shifted energy toward reducing oncall frequency itself, and that was the right call. You fit the tool to the problem, not the problem to the tool.

The four options in one line: long context for document-level reasoning, hybrid when you need to balance cost and quality, Agentic RAG when retrieval quality itself is the variable. And when none of them matches the shape of the problem, looking at the problem again is the wisest move.

---

## 6. Look at the problem, not the tool

RAG is not dead. In areas like FAQ chatbots, knowledge search, and document Q&A, it is still the most realistic option. But it is not a panacea.

Before choosing a technology, the question to ask first is not "how do I implement it" but "does the shape of this problem fit RAG?" If it is FAQ-shaped, RAG fits. If it is reasoning that crosses entire documents, long context is better. If the quality of retrieval results itself is the issue, Agentic RAG is on the table. And if no tool fits, the right answer may be to shrink the problem itself.

The conclusion my team arrived at, in the end, was this — instead of cutting response time, cut oncall itself.

---

## References

- [Lack of AI-Ready Data Puts AI Projects at Risk](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk) — Gartner, 2025
- [Why 72% of Enterprise RAG Implementations Fail in the First Year](https://ragaboutit.com/why-72-of-enterprise-rag-implementations-fail-in-the-first-year-and-how-to-avoid-the-same-fate/) — David Richards, ragaboutit.com
- [From zero to a RAG system: successes and failures](https://en.andros.dev/blog/aa31d744/from-zero-to-a-rag-system-successes-and-failures/) — Andros Fenollosa
- [Hacker News discussion](https://news.ycombinator.com/item?id=47499356) — comment thread on the andros.dev post
- [RAG System Cost: 2026 Pricing, Build & Ops Guide](https://www.alphacorp.ai/blog/how-much-does-a-rag-system-cost-infrastructure-development-and-ongoing-expenses) — AlphaCorp
- [RAG Implementation Cost ROI Analysis](https://www.stratagem-systems.com/blog/rag-implementation-cost-roi-analysis) — Stratagem Systems (analysis of 89 production deployments)
- [NewDay builds a Generative AI based Customer Service Agent Assist with over 90% accuracy](https://aws.amazon.com/blogs/machine-learning/newday-builds-a-generative-ai-based-customer-service-agent-assist-with-over-90-accuracy/) — AWS Machine Learning Blog
- [Retrieval-Augmented Generation with Knowledge Graphs for Customer Service Question Answering](https://arxiv.org/html/2404.17723v1) — LinkedIn research team, arXiv 2024
- [Enterprise RAG Failures: The 5-Part Framework](https://www.analyticsvidhya.com/blog/2025/07/silent-killers-of-production-rag/) — Analytics Vidhya, 2025
- [Is RAG Still Relevant in 2026?](https://konstantinos.top/blog/37/) — RAG vs Long Context comparison
- [RAG vs Large Context Window: Real Trade-offs for AI Apps](https://redis.io/blog/rag-vs-large-context-window-ai-apps/) — Redis
- [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511) — Asai et al., ICLR 2024
