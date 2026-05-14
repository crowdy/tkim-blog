---
title: 'For Companies Wrestling with RAG Precision'
description: '"We tried RAG too… it was less impressive than we expected."'
pubDate: 2026-03-05T00:15:32.679Z
lang: 'en'
pairSlug: 'rag-precision-problem'
draft: false
---
# For Companies Wrestling with RAG Precision

> "We tried RAG too… it was less impressive than we expected."

You hear it more and more often in the conference rooms of companies considering AI adoption. When LLMs first appeared, many companies treated RAG (Retrieval-Augmented Generation) as a magical solution. Put internal documents into a vector DB, retrieve relevant chunks when a question comes in, hand them to an LLM. The concept is simple, the demos impressive. So a PoC is built. Executives are dazzled. Budget is allocated. Then the moment it goes into actual operation, the problems begin. Accuracy falls short of expectations, and users start to drift away from the system one by one.

This is not the story of one company. It is happening simultaneously across the globe.

---

## Between rosy expectations and a cold reality

Start with the numbers.

The "GenAI Divide: State of AI in Business" report published in 2025 by the MIT NANDA initiative is striking. **95% of corporate GenAI pilot projects are producing no measurable business outcomes.** The conclusion is drawn from interviews with 150 executives, surveys of 350 employees, and an analysis of 300 public AI deployment cases. The report explicitly names "inadequate data preparation and poor RAG pipeline integration" as the core causes of failure.

Gartner sounded the alarm in July 2024: **30% of GenAI projects will be abandoned at the PoC stage by the end of 2025.** The reasons cited were low data quality, insufficient risk management, rising costs, and unclear business value. In February 2025, the firm added an even stronger prediction: **60% of AI projects built on AI-unready data will be abandoned by 2026.** In Gartner's survey of 248 data management leaders, **63% said their organization either lacks the data management capabilities needed for AI, or does not know whether they have them.** The prerequisite for RAG — "well-organized data" — is missing in most companies.

NTT DATA's 2024 global GenAI report is more blunt: **70% to 85% of GenAI deployment efforts are failing to meet ROI targets.** S&P Global Market Intelligence surveyed more than 1,000 companies and found that the share of organizations abandoning most of their AI initiatives **jumped from 17% in 2024 to 42% in 2025**. A 2.5x increase in under two years.

McKinsey's 2025 State of AI report shows another facet. **78% of organizations now use AI in at least one business function.** But only **39%** report that AI has had a measurable impact on enterprise EBIT — and even there, it is mostly less than 5% of EBIT. PoCs abound; tangible results are rare.

Narrow it to RAG systems and the picture is the same. According to multiple industry analyses, **73% of enterprise RAG systems fail to deliver the expected outcomes in production.** The failure rate within the first year reaches 72%. To reach the 98%+ accuracy that enterprise users demand, even systems starting from 90% require months of dedicated engineering.

---

## Concrete cases that companies around the world are living through

### Legal AI: the broken promise of "no hallucinations"

Both Thomson Reuters' Westlaw AI-Assisted Research and LexisNexis' Lexis+ AI are RAG-based and were aggressively marketed as "hallucination-free" AI. The logic: it's retrieval-based, therefore accurate.

In 2024, Stanford's RegLab and HAI research team verified the claim through a pre-registered empirical study. The result was bleak.

- **Westlaw AI-Assisted Research**: accuracy **42%**, hallucination rate **33%**
- **Lexis+ AI**: accuracy **65%**, hallucination rate **17%**
- General-purpose LLMs (ChatGPT, Llama, Claude): hallucination rate on legal queries **58–80%**

RAG did reduce hallucinations. But it was a long way from the "no hallucinations" the marketing claimed. The Stanford team put a question mark in their paper title: "Hallucination-Free?" There was a more troubling finding. Even when the retrieved documents could not actually answer the question, instead of saying "I don't know," the model **confidently produced an even more incorrect answer**. The mere fact that documents had been retrieved was enough to boost the model's confidence. A Google research team described the same phenomenon as the "insufficient context" problem.

The case of DoNotPay was more extreme. The startup pitched itself as "the world's first robot lawyer," claiming that its AI could produce perfect legal documents and help with lawsuits without an attorney. In February 2025 the FTC finalized its order: the company had **never tested** whether its AI actually operated at the level of a human lawyer, nor was it trained on federal or state legal databases. The result was a **$193,000 penalty** and a prohibition on marketing the product as an AI lawyer.

### Customer service: the Klarna lesson

The story of Swedish fintech Klarna has become a textbook example of AI overconfidence.

In early 2024, CEO Sebastian Siemiatkowski announced that the company's AI chatbot was **doing the work of 700 full-time human agents**. He went so far as to say, "AI can already do every job that humans do." The press treated it as a starting gun for the AI revolution.

Less than a year later, the company resumed hiring human agents. The CEO admitted it himself:

> "Cost became too dominant a measure, and what we ended up with was lower quality. We went too far."

The documented problems: response delays of up to **20 seconds** even for simple FAQ questions, generic responses far removed from brand voice ("Sorry for the confusion"), and an inability to handle complex or emotionally charged customer situations. The chatbot's eventual job was to route users to a human agent. The cost savings did not arrive; only the customer experience deteriorated.

### Airlines: when a wrong answer becomes legal liability

Air Canada's AI chatbot told customer Jake Moffatt that he could apply for a bereavement fare retroactively, even after his flight. That was the opposite of the actual policy. In court, Air Canada argued that "the chatbot is a separate legal entity." The B.C. Civil Resolution Tribunal called this a "remarkable submission," rejected it, and held Air Canada liable.

The case has become a landmark precedent for AI chatbot liability. When a chatbot says something wrong, the company is fully responsible.

### Internal corporate knowledge management: stories of companies that gave up

Kapa.ai, which provides RAG-based document assistants to more than 200 technology firms including Cloudflare and Stripe, published an analysis of its customer base.

- **A large telecom**: spent a year and a half developing an AI document assistant and **abandoned it entirely**
- **An enterprise software company**: invested six months but **scrapped the project after failing to bring the hallucination rate below 7%** (the internal threshold)
- **A Fortune 500 technology firm**: one engineer maintained the system part-time, and after a year of neglect, the system **naturally decayed** as documentation changed underneath it

Kapa.ai's core conclusion: most companies that build their own RAG knowledge bases internally **abandon or replace them within 6 to 18 months**. Moving from 90% accuracy to the 98%+ that enterprises demand requires months of dedicated engineering — and most teams do not know this going in.

Copilot Studio, which uses Microsoft SharePoint as a knowledge source, is running into similar problems. Microsoft's official Q&A forums are stacked with complaints about "consistently low-quality responses" and "inaccurate answers that don't directly address the query." The causes are URL depth limits, content filters stripping out needed material, and permission mismatches that break retrieval.

### Medical and healthcare: precision tied to lives

A 2024 Mayo Clinic study reported that ChatGPT, Microsoft Bing Chat, and Google Bard answered clinical questions on kidney disease with **less than 40% accuracy**. A survey of 43 major U.S. health systems found that **77% cited immature AI tools as the single biggest barrier to deployment**. The ECRI Institute's 2026 Health Technology Hazards report designated **AI chatbot misuse in healthcare as the number one patient safety hazard of the year**.

A 2025 Mount Sinai study identified a more serious problem. When documents containing incorrect medical information enter a RAG-based system, the system does not correct the misinformation — it **confidently amplifies it**.

### Financial services: an environment that does not tolerate a single error

In June 2024, Goldman Sachs published a report titled "Gen AI: Too Much Spend, Too Little Benefit?" Lead equity research analyst Jim Covello wrote:

> "AI technology is exceptionally expensive. To justify those costs, the technology must be able to solve complex problems, which it isn't designed to do."

In financial compliance, a RAG hallucination is not a mere inconvenience. A compliance chatbot incorrectly stating that "this transaction type does not trigger an AML reporting obligation," or a market analysis tool reporting that a particular bank missed earnings based on a press release that never existed — these translate directly into legal risk. The Financial Stability Board (FSB), the U.S. GAO, and FINOS have all issued formal warnings about the specific risks RAG hallucinations pose to financial services.

---

## "Can't we just stuff the entire document into the context?"

Some companies confronted with the RAG precision problem reach for an alternative: drop entire documents into a large-context-window model such as Gemini's 1M tokens or Claude's 200K tokens. The idea is to abolish retrieval altogether. It is conceptually appealing.

The problem is cost.

### A realistic cost calculation

According to a CopilotKit analysis, for the same question:
- **Large Context** (full document in context): roughly **$3.00 per query**
- **RAG** (relevant chunks only): roughly **$0.03 per query**
- **A 100x cost gap**

Redis's enterprise-scale simulation:
- 1,000 employees, five queries each per day
- Large Context: **$15,000 per day** (about ₩5.4B per year)
- RAG: **$150 per day** (about ₩54M per year)

The difference shows up in measured workloads too. Comparing the same enterprise workload, RAG averages 62,000 tokens per query and Long Context averages 400,000 tokens (about 26x). Response time is about **1 second** for RAG versus **30–60 seconds** for Long Context.

For a company with millions of documents, Large Context is simply infeasible. Even models that technically support 1M tokens degrade in performance well before reaching that limit. According to Databricks' research, Llama-3.1-405B begins degrading beyond 32K tokens, and GPT-4 beyond 64K. This is the so-called **"Lost in the Middle" phenomenon** — information placed in the middle of the context is missed far more often than information at the beginning or end, and accuracy can drop by 10 to 20 points or more.

Prompt caching (90% discount on Claude, 75% on Gemini) can significantly reduce cost when the same document is queried repeatedly. But if documents change frequently or query patterns vary, the caching effect is limited. In the end, Large Context is a realistic option only in the narrow case of static, small corpora and infrequent queries.

---

## This problem is not exclusive to Korea or Asia

ITWorld Korea published a 2025 deep dive titled "Why Enterprise RAG Fails." It pointed out why Korean companies face particular difficulty:

Commercial RAG package software does not adequately handle Korea's complex legacy data environment. Inconsistent document naming, unstructured Korean legacy documents, and encoding errors distort embeddings. And the most crucial point: **the real difficulty lies not in prompt design or model selection, but in data ingestion and cleaning, retrieval optimization, metadata management, version control, indexing, performance evaluation, and long-term governance.** Most teams spend their time choosing models and neglect the data pipeline.

SK hynix shared its internal RAG platform evaluation results through the AWS Korea technical blog. It found that adding a RAG inference layer (embedding + knowledge retrieval) **increased Time to First Token (TTFT) by 30–40%**. In latency-sensitive production environments, this is not a variable to ignore.

KT Cloud's technical blog offered a more direct case. A chatbot that used uncleaned logs as a RAG source returned completely wrong answers. The blog stressed that preprocessing — fixing encoding errors and stripping out advertisements, footnotes, and other extraneous text — is mandatory. One global company that left customer-support document parsing errors in place saw **customer satisfaction drop by 27%** after deploying a RAG chatbot before finally fixing its data pipeline.

Samsung SDS showcased an enterprise-tailored RAG case at its internal GenAI hackathon, and Skelter Labs noted that while RAG adoption jumped from 31% in 2023 to 51% in 2024, actual deployment success rates fell far short of expectations.

Looking across Asia, the same pattern emerges. According to Deloitte's 2024 Asia-Pacific GenAI survey, **roughly 75% of companies are failing to meet their own employees' expectations for GenAI.** Japan looks worse still. Despite aggressive government AI investment, **only 33% of companies report measurable ROI in the early adoption phase.** Some analysts argue that Asia-Pacific's biggest problem is not AI itself: **fragmentation** — divergent regulations across countries, non-standardized legacy systems, mismatched data formats — makes RAG deployment markedly harder.

---

## Why RAG breaks in production

The arxiv paper "Seven Failure Points When Engineering a Retrieval Augmented Generation System" (2024, IEEE/ACM), which analyzed hundreds of enterprise deployment cases, classifies RAG failures into seven categories.

1. **Missing content** — the document corpus does not cover the query
2. **Retrieval failure** — relevant documents exist but retrieval misses them
3. **Context window limits** — too much or too little retrieved content
4. **The LLM generates a wrong answer** — even when given the right documents
5. **Format errors** — failure to respond in the desired format
6. **Ambiguous answers** — vague, incomplete responses
7. **Incomplete answers** — responses that miss the key point

The most important point this paper emphasizes is this: **a RAG system can only be truly validated in operation.** A system that showed 0.95 recall in staging can fall to 0.71 in production once the corpus is 50x larger and concurrent writes are happening. And no alarm goes off, because latency looks normal. The team is **monitoring latency but not retrieval quality**.

There is also the data quality problem. Over 80% of corporate internal data exists as unstructured formats — PDFs, images, spreadsheets. Converting it to text introduces quality loss. As documents accumulate, retrieval precision often falls in a "pollution" effect. And corporate knowledge keeps changing: product specs, regulations, organizational structures shift, and when the RAG index falls behind, the system confidently answers with outdated information.

---

## Solutions that actually work

There is hopeful news. Some companies are getting results, and the methods they use are clear. Sorted by ROI, here they are.

### Step 1: hybrid retrieval — what to do first

RAG retrieval splits broadly into two methods.

**Vector search (semantic)** converts text to numeric vectors via an embedding model and finds related documents by cosine similarity between the query vector and document vectors. Its strength is recognizing that "puppy" and "dog" mean similar things. Its weakness is exact numbers, product codes, and proper nouns — keywords that must not be rewritten.

**BM25 (keyword-based sparse retrieval)** is a traditional statistical text retrieval algorithm. In plain terms, it works on three principles. First, the more often the search term appears in the document, the higher the score. Second, longer documents (which naturally contain more words) are adjusted for by a length normalization. Third, words that appear across all documents — function words like "the," "of," "a" — are weighted lower. Because it searches by keyword rather than embedding, it dominates vector search on queries where exact numbers and dates matter, such as "Q3 2024 operating profit."

The two methods complement each other's weaknesses. Running them in parallel and combining the results via RRF (Reciprocal Rank Fusion) is **hybrid retrieval**. RRF uses rank position rather than raw scores, so it works without separate score normalization.

Enterprise deployment cases consistently report **a 15–30% precision improvement**. Anthropic's own experiments show that the embedding + BM25 combination consistently beat embeddings alone. Given the implementation cost-to-benefit ratio, this is the first technique to apply.

### Step 2: re-ranking — add a second filter

After the initial search (including hybrid) returns the top 20–100 candidates, a separate re-ranking model such as a Cross-Encoder or ColBERT scores query–document pairs together to re-rank by relevance. If initial retrieval is "grab a lot," re-ranking is "keep only what is actually needed."

**"Doesn't it add latency?"** Yes, but the amount is acceptable. Once initial hybrid retrieval narrows the candidates in tens of milliseconds, the re-ranker only operates on that narrowed set, adding **50–200ms**. The full pipeline still completes in 1–2 seconds. Conversely, skipping the re-ranker and handing the raw initial results to the LLM means the LLM has to chew through irrelevant documents, **consuming more tokens and producing worse answers**. The few hundred ms of re-ranking is much shorter than the LLM's processing time (multiple seconds), so the perceptible speed is hardly affected.

The measured gains are striking. On the SQuAD benchmark, **81.22% → 92.35%** (+11 points). On Llama2 review data, hit-rate goes **58.63% → 75.00%** (+16 points). Azure AI combined query rewriting with a semantic ranker to achieve a **+22-point** improvement in NDCG@3 (about 2x the previous production ranker). Re-ranking typically delivers an additional **10–25% precision improvement**.

Re-rankers commonly used in production include TinyBERT-based Cross-encoders (fast, cheap), the Cohere Rerank API (high accuracy), and ColBERT (a balance of latency and accuracy).

### Step 3: redesign the chunking strategy

In NVIDIA's measurements across five document datasets, **the chunking strategy alone produced up to 9 points of recall difference**, with everything else held constant.

The problem with fixed-length chunking is that it cuts in the middle of paragraphs or sentences. Cutting a unit of meaning degrades embedding quality. Semantic chunking looks at cosine distances between sentence embeddings and cuts at semantic boundaries. In a clinical decision support study, fixed chunking scored **50%** versus **87%** for semantic chunking — a **+37-point** accuracy gap.

Hierarchical chunking is also effective. Retrieval uses smaller child chunks (100–500 tokens) for precision, while the LLM is handed larger parent chunks (500–2,000 tokens) for sufficient context. LangChain's ParentDocumentRetriever implements this pattern.

Anthropic's **Contextual Retrieval**, announced in late 2024, goes one step further. Before embedding each chunk, an LLM generates a roughly 100-token summary describing where the chunk sits within the overall document, prepends it to the chunk, and **embeds the combined summary + original chunk as a single text**.

For example:

> **[Context summary]** "This paragraph is from the Q3 2024 earnings release report, explaining the year-over-year change in operating profit."
> **[Original chunk]** "Q3 operating profit was ₩45.0B, up 12% year over year..."

The summary is not stored separately or processed separately. The two texts are concatenated and **embedded as a single vector**. If only the original chunk were embedded, the vector would have no idea which company or year "Q3 operating profit up 12%" refers to. With the context summary prepended, the embedding incorporates "where this chunk sits in the full document," and retrieval precision rises.

The results were clear. Contextual Embeddings alone reduced retrieval failures by **35%**; combined with BM25 and re-ranking, by **67%**.

### Step 4: transform the query with HyDE

Users ask short, vague questions. Documents are long and specific. Comparing the two directly inevitably creates a mismatch.

HyDE (Hypothetical Document Embeddings) sidesteps this problem. The flow is easiest to grasp visually.

```
1. User query: "What is your refund policy?"
        ↓
2. LLM generates a hypothetical answer document:
   "Refunds are available within 30 days of purchase and
    can be requested through customer support. Processing
    takes 5 business days..."
        ↓
3. Embed the hypothetical document → run vector search
        ↓
4. Real document chunks are returned
        ↓
5. Pass the real retrieved documents to the LLM → final answer
```

The key is that **retrieval uses the vector of the hypothetical document, while the LLM is given the real retrieved documents.** The hypothetical document is never the final answer. It is only "bait" used to find the real documents that actually match the question.

Why does it work? Because the hypothetical document bridges the vocabulary, length, and style mismatch between a short user query ("refund policy") and a document chunk ("Refunds are available within 30 days of purchase…"). The effect is especially strong for languages like Korean with high expression variability.

Benchmark result: **+14 points** in accuracy over "use the query directly." Without fine-tuning, in zero-shot mode, it can compete with domain-specialized retrievers.

### Step 5: GraphRAG — for queries where relationships matter

"How did our company's Q3 operating profit change year over year?" is the kind of question vector search handles poorly. It requires finding numbers across multiple documents and performing a calculation.

Standard RAG chops documents into chunks and stores each chunk independently. "Samsung Electronics Q3 2024 results" and "Galaxy S24 launch announcement" sit as separate chunks with no link.

GraphRAG works differently. Microsoft's 2024 open-source release reads documents and **extracts entities (people, companies, products, concepts) and the relationships among them, building a knowledge graph**.

```
Document analysis process:
1. Entity extraction: "Samsung Electronics", "Galaxy S24", "Q3 operating profit"
2. Relationship extraction: "Samsung Electronics → launched → Galaxy S24"
                              "Samsung Electronics → Q3 operating profit → ₩45.0B"
3. Group densely connected entities into communities (clusters)
4. Generate and store a summary for each community
```

When a query comes in, the graph is traversed. The question "the relationship between Samsung Electronics' Q3 results and its new product launch" can only be answered by standard RAG if it happens to retrieve both independent chunks. GraphRAG can structurally compose the answer by following the "Samsung Electronics" node and its connected entities through the knowledge graph.

FalkorDB's 2025 benchmark results are dramatic.

| Query type | Standard RAG | GraphRAG |
|---|---|---|
| Simple factual question | 94% | 95% |
| Complex multi-hop reasoning | 34% | 91% |
| Schema-based (KPIs, projections) | **0%** | **90%+** |
| Numeric reasoning | ~50% | 100% |
| Temporal reasoning | 50% | 83% |

The decisive point is the schema-based category: standard RAG scores **0%** while GraphRAG hits **over 90%**. Many of the questions enterprises actually care about live in exactly this space.

**Is GraphRAG still relevant in 2026?** Yes. But it is not "the default tool to use everywhere." Building the graph itself costs money, and query latency is about **2.4x** higher than standard RAG. Since 2025, lighter, faster variants such as HippoRAG and LightRAG have appeared. The realistic choice is a hybrid architecture: route simple factual questions to standard RAG and route relational, multi-hop questions to GraphRAG.

| Situation | Recommendation |
|---|---|
| Simple FAQ, fast response | Standard RAG |
| KPI comparison, numeric analysis, cross-document linking | GraphRAG |
| Graph construction cost is a concern | HippoRAG (10–20x cheaper than GraphRAG) |

### Step 6: domain-specific embedding fine-tuning

General-purpose embedding models (e.g., OpenAI's text-embedding-ada-002) were trained on general internet text. They may not distinguish whether the medical abbreviation "MI" means Myocardial Infarction or Machine Intelligence. In specialized domains such as law, finance, and manufacturing, this is a serious problem.

A clarification: this **is not training a new embedding model from scratch**. It is taking an existing general-purpose embedding model such as bge-base or E5 and "fine-tuning" it on domain data to produce a domain-specific model.

```
[Step 1] Use an LLM to generate synthetic QA pairs from domain documents
         e.g., "Generate 5 questions about this paragraph"
         → produce thousands of (question, chunk-with-answer) pairs

[Step 2] Fine-tune the general embedding model on those QA pairs
         → the model learns the domain's vocabulary, abbreviations, relationships

[Step 3] Re-embed the existing vector DB with the fine-tuned model
         → retrieval precision improves
```

Because it is not built from scratch, the data and cost required are relatively small. With **as few as 6,300 synthetic training samples, a ~7% retrieval improvement** is achievable.

Databricks' Instructed Retriever, using this approach, achieved **up to a 70% improvement** over traditional RAG (in finance, e-commerce, and healthcare). The more domain data you have, the larger the gain.

### Step 7: no evaluation, no improvement

The biggest difference between teams that get results and those that do not is **continuous evaluation**.

RAGAS (Retrieval Augmented Generation Assessment) is now the de facto standard for RAG evaluation. Without references, an LLM judge automatically scores four dimensions: **Faithfulness** (is the answer grounded in retrieved content?), **Answer Relevance** (does the answer address the question?), **Context Precision** (is the retrieved context relevant?), and **Context Recall** (was all the needed information retrieved?).

TruLens is useful for production monitoring. The **"RAG Triad"** defined by TruLens evaluates three relationships independently.

```
            User question
                ↓           ← ① Contextual Relevance
    [Retrieval] → Context chunks
                ↓           ← ② Groundedness
    [Generation] → Final answer
                ↑
                └─── ③ Answer Relevance ──→ User question
```

- **① Contextual Relevance**: evaluates the "question ↔ retrieved context" relationship. Did the retriever fetch the documents actually needed? When this score is low, fix the chunking, embedding, or retrieval method.

- **② Groundedness**: evaluates the "retrieved context ↔ final answer" relationship. Is the answer grounded only in the retrieved content, or did the model invent things? Low scores here mean hallucination.

- **③ Answer Relevance**: evaluates the "question ↔ final answer" relationship. Does the answer actually address the question? Low scores here mean the context was found correctly but the LLM is generating off-topic content.

Looking at all three together helps **diagnose which stage is failing**. Groundedness high but Answer Relevance low? It's a prompt design problem. Contextual Relevance low and the rest low in tandem? Retrieval itself needs to be fixed.

Production thresholds: regulated domains (legal, medical, financial) ≥ 0.85, general knowledge work ≥ 0.75. Without these numbers, you are operating without even knowing how bad your system is.

---

## The actual stories of companies that got results

### Morgan Stanley: searchable documents from 7,000 to 100,000

Morgan Stanley needed a system that could answer advisor questions across more than 100,000 proprietary financial documents. The initial system was effective for only about 7,000 documents, and document recall was **20%**. Advisors did not trust the system.

Together with OpenAI, the team iterated through evaluation-driven optimization. The core moves were summary evaluation, prompt engineering, and chunking strategy improvements. Result: document recall improved to **80%**, covering the full 100,000-document corpus, and **over 98% of the advisor team now actively uses the system**.

### FalkorDB: schema query accuracy from 0% to 90%+

Per the 2023 Diffbot benchmark, the overall accuracy of standard vector RAG was 56.2%. On schema-based queries (KPIs, projections, etc.) it was **0%**. Applying FalkorDB's GraphRAG SDK in 2025 brought the overall figure to **90%+**.

### Droptica: 40% accuracy improvement via two-stage evaluation

The initial version of a specialized knowledge management RAG chatbot for ProjektMagazin lost user trust through "plausible but wrong answers." After introducing a two-stage document evaluation in which an LLM re-evaluated each retrieved chunk's relevance after a broad search, accuracy improved by **40%**.

---

## Conclusion: RAG is not wrong, but it is harder than it looks

The honest answer to "why is RAG so hard?" is this: **RAG is not one technology but a system of interlocking components.** Embedding model, chunking strategy, retrieval method, re-ranking, data quality, index freshness, evaluation framework — if any one of these is wrong, the precision of the whole collapses.

And the heart of failure is almost always in the same place. Data. RAND Corporation research lists "applying AI to a problem too difficult for AI to solve" as one of the reasons 80% of AI projects fail. But corporate internal data is rarely clean and tidy. It is inconsistent, duplicated, scattered. "Garbage in, garbage out" applies just as fully to RAG.

Globally, the same pattern keeps repeating. The demo goes well. The PoC is impressive. Then real production, real users, and vast real data arrive, and the trouble begins. Korea, Japan, the United States — it is the same everywhere.

But it is too soon to give up. The direction is clear. Start with hybrid retrieval, add re-ranking, refine the chunking strategy, and measure continuously with RAGAS. If you have domain-specific data, fine-tune the embeddings; if you have many relational queries, evaluate GraphRAG. And above all, clean the data first.

As at Morgan Stanley, a system that began at 20% can become one that 98% of the team uses daily. The road to getting there is simply longer and rougher than expected.

---

### References

- [MIT NANDA "GenAI Divide" Report — Fortune (2025)](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- [Gartner: 30% of GenAI Projects Will Be Abandoned After PoC (2024)](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025)
- [Gartner: Lack of AI-Ready Data Puts AI Projects at Risk (2025)](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk)
- [NTT DATA: 70-85% of GenAI Deployments Failing to Meet ROI (2024)](https://www.nttdata.com/global/en/insights/focus/2024/between-70-85p-of-genai-deployment-efforts-are-failing)
- [McKinsey: The State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value)
- [Stanford HAI: Legal Models Hallucinate 1 in 6 Queries (2024)](https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries)
- [FTC Finalizes Order with DoNotPay (2025)](https://www.ftc.gov/news-events/news/press-releases/2025/02/ftc-finalizes-order-donotpay-prohibits-deceptive-ai-lawyer-claims-imposes-monetary-relief-requires)
- [Klarna CEO Admits Aggressive AI Cuts Went Too Far](https://mlq.ai/news/klarna-ceo-admits-aggressive-ai-job-cuts-went-too-far-starts-hiring-again-after-us-ipo/)
- [Air Canada Liable for Chatbot Misinformation — CBC News (2024)](https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416)
- [kapa.ai: Why You Shouldn't Build Your Own AI Knowledge Base](https://www.kapa.ai/blog/why-you-shouldnt-build-your-own-ai-knowledge-base)
- [Goldman Sachs: Gen AI — Too Much Spend, Too Little Benefit? (2024)](https://www.goldmansachs.com/pdfs/insights/pages/top-of-mind/generative-ai-hype-or-truly-transformative/report.pdf)
- [Anthropic: Contextual Retrieval (2024)](https://www.anthropic.com/news/contextual-retrieval)
- [Microsoft GraphRAG Research](https://www.microsoft.com/en-us/research/project/graphrag/)
- [FalkorDB: GraphRAG Accuracy Benchmark (2025)](https://www.falkordb.com/blog/graphrag-accuracy-diffbot-falkordb/)
- [Databricks: Instructed Retriever +70% (VentureBeat)](https://venturebeat.com/data/databricks-instructed-retriever-beats-traditional-rag-data-retrieval-by-70)
- [OpenAI: Morgan Stanley Case Study](https://openai.com/index/morgan-stanley/)
- [Redis: RAG vs Large Context Window — Real Trade-offs](https://redis.io/blog/rag-vs-large-context-window-ai-apps/)
- [Databricks: Long Context RAG Performance of LLMs](https://www.databricks.com/blog/long-context-rag-performance-llms)
- [arxiv: Seven Failure Points When Engineering a RAG System (2024)](https://arxiv.org/abs/2401.05856)
- [VentureBeat: Why Enterprise RAG Systems Fail (Google Study)](https://venturebeat.com/ai/why-enterprise-rag-systems-fail-google-study-introduces-sufficient-context-solution)
- [ITWorld Korea: Why Enterprise RAG Fails (2025)](https://www.itworld.co.kr/article/4112593/)
- [AWS Korea: SK hynix RAG Platform Build and Evaluation Case](https://aws.amazon.com/ko/blogs/tech/sk-hynix-rag-platfrom-analysis-evaluate/)
- [Deloitte: Generative AI in Asia Pacific (2024)](https://www.deloitte.com/us/en/insights/topics/emerging-technologies/generative-ai-adoption-asia-pacific-region.html)
- [Azure AI: Query Rewriting +22 NDCG@3](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/raising-the-bar-for-rag-excellence-query-rewriting-and-new-semantic-ranker/4302729)
- [RAND Corporation: Root Causes of Failure for AI Projects](https://www.rand.org/pubs/research_reports/RRA2680-1.html)
- [S&P Global: AI Rapid Adoption But Mixed Outcomes (2025)](https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning)
