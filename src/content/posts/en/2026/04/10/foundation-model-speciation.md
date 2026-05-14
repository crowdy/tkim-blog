---
title: 'The Speciation of Foundation Models — The Alternative to GPT May Not Be GPT'
description: '"In the same week, a model that reads the language of financial markets, a model that forecasts time series, and a model that speaks without a tokenizer all trended on GitHub at once. All three called themselves ''foundation models.'' None of them were LLMs."'
pubDate: 2026-04-10T01:26:15.521Z
lang: en
pairSlug: 'foundation-model-speciation'
draft: false
---
# The Speciation of Foundation Models — The Alternative to GPT May Not Be GPT

> "In the same week, a model that reads the language of financial markets, a model that forecasts time series, and a model that speaks without a tokenizer all trended on GitHub at once. All three called themselves 'foundation models.' None of them were LLMs."

---

Open GitHub Trending as of April 10, 2026, and you see a strange landscape.

[shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) is climbing past 12,180 stars at +245 per day. Its subtitle reads "A Foundation Model for the Language of Financial Markets." It treats financial-market order flow and price action as a "language" and applies a transformer architecture to learn the patterns of that language. The project comes out of a Chinese university research group.

[google-research/timesfm](https://github.com/google-research/timesfm) sits in the same week's trending list at 15,985 stars, +3,095 weekly. It is Google Research's pretrained time-series foundation model. Retail, weather, energy — across domains, it performs time-series forecasting zero-shot. The positioning is "the GPT of time series."

And [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) is at 7,644 stars, +496 per day. It performs multilingual speech synthesis and voice cloning, but it carries one defining technical choice — **tokenizer-free**. It does not use a tokenizer. Splitting text into tokens is the most basic preprocessing step in an LLM, and VoxCPM throws it out entirely. The judgment is that the very concept of tokenization is unsuited to the audio domain.

The three models share two things. First, all three call themselves "foundation models." Second, none of them are LLMs. They are not models that take text in and produce text out; they are specialized models for entirely different data domains — financial order flow, time-series numbers, and speech waveforms. Different research groups on different continents (a Chinese university, Google Research, OpenBMB), in the same week, pinned the same word — foundation model — to specialized models in their own domains and released them.

This essay argues that the simultaneity is not coincidence but the visible surface of a structural trend. The narrative dominating AI discourse for the past three years has been "a bigger, more general LLM solves everything." GPT-5, Claude Opus 4.6, Gemini 3.1 — every quarter brought a larger model covering more ground, and unificationism — "one giant general-purpose FM solves problems across every domain" — became the assumption. Yet in April 2026, that same research community — fully capable of building general-purpose FMs — is also building domain-specific FMs and shipping them. Why?

This piece dissects that "why" across three layers — data, architecture, economics — and contrasts the phenomenon with a historical precedent that already played out three decades ago: the speciation of databases. Along the way, it asks how the meaning of the term "foundation model" is shifting and what that shift means for practitioners.

The earlier essay "[The Open Model Wars of 2026](/draft/open-model-war-2026.md)" analyzed the open-versus-closed axis of AI models. Google releasing Gemma 4 under Apache 2.0, AMD open-sourcing Lemonade, Alibaba publishing Qwen 3.6-Plus — that war was about the **access modality** of models. This essay deals with a different axis, orthogonal to that one. **General-purpose vs. specialization.** Open or closed, should every model aim for general-purpose, or should they fork by domain? The second fault line in the same market.

---

## 1. Dissecting the Three Models — What Each Designed Differently

It is not enough to simply lump these three as "domain-specific models." You have to look at why, and through which design choices, each of them walked a different path from general-purpose LLMs to see the substance of this speciation.

### Kronos — A model that reads the "language" of financial markets

What is most interesting about [Kronos](https://github.com/shiyu-coder/Kronos) is the framing. "A Foundation Model for the Language of Financial Markets." Here, "language" is not metaphor but the rationale for the architecture. The order flow of financial markets — buy orders, sell orders, fills, cancellations, modifications — is treated not as a time series but as a **sequence**. Just as words in natural language line up to form sentences, order events line up to form the market's "sentences."

Once you adopt that view, applying transformer architecture becomes a natural choice. Attention mechanisms are strong at capturing long-range dependencies within a sequence, and long-range dependencies are real in financial order flow. A large buy order at 9:30 AM influences price moves at 2:00 PM. Treating this as structurally isomorphic to contextual dependencies in natural language is Kronos's core insight.

But why not just feed order-flow data into GPT-5 or Claude Opus 4.6? Two reasons.

First, **format mismatch**. General-purpose LLMs take text tokens as input. Order-flow data is not text. Price (continuous reals), quantity (integers), order type (categorical), timestamp (temporal) — it is multidimensional structured data. You can convert it to text and feed it to the LLM, but information is lost in the conversion. The text "buy 500 shares at 101.35" and the vector (101.35, 500, BUY) carry the same information, but the moment you tokenize the former, the numerical continuity and magnitude relations dissolve inside discrete token embeddings.

Second, **absence of training data**. The pretraining corpus of a general-purpose LLM is internet text. Financial-market order-flow data does not get uploaded to the internet. Exchange microstructure data, Level 2 order books, tick-level fill records — these are paid, license-restricted, and unreachable by ordinary web crawlers. However large GPT-5 grows, it can do only so much with a data distribution it has never seen. Kronos is a model pretrained directly on this data.

The number 12,180 stars shows the level of community interest in this approach. In financial engineering, a GitHub project crossing 10,000 stars is genuinely rare.

### TimesFM — The GPT of time series

[TimesFM](https://github.com/google-research/timesfm) is a Google Research project with a more explicit approach. The declaration: "We do for time series what GPT did for text." Pretrain on large-scale time-series data and then perform zero-shot forecasting on a given domain without fine-tuning. Retail-store demand forecasting, weather-station temperature forecasting, power-grid load forecasting — domain-agnostic.

15,985 stars, +3,095 weekly. What these numbers say is the size of the problem space called time-series forecasting. Time-series forecasting exists across industries, but until now it required training a separate model per domain. ARIMA, Prophet, N-BEATS — choosing the right one and fitting it to each domain's data was the standard workflow. TimesFM inverts that workflow. Pretrain once, apply zero-shot to a new domain.

What makes TimesFM decisively different from a general-purpose LLM is **inductive bias**. Time-series data has structural properties text does not. Temporal locality — nearby timesteps matter more than distant ones. Periodicity — daily, weekly, annual patterns recur. Trend — long-term direction. A general-purpose transformer has to learn these from data, but TimesFM's architecture bakes them in: positional encoding specialized for the time axis, multi-resolution input handling, decoding strategies optimized for forecast horizons. These choices let the model, at the same parameter count, outperform a general model on time-series forecasting.

The name Google Research matters too. This is not a small lab's experiment. The world's largest AI research organization, capable of building general-purpose LLMs (Gemini), still chose to build and release a domain-specific FM. If they could have "sufficiently" solved time-series problems with a general model, there would be no reason for this project. The fact that Google built TimesFM is itself Google's own admission that general-purpose LLMs have limits in time-series processing.

### VoxCPM — The model that dropped the tokenizer

[VoxCPM](https://github.com/OpenBMB/VoxCPM) makes the most radical design choice of the three. **Tokenizer-free.** In the LLM world, tokenizers are like air. The first step that converts input text to the discrete tokens the model can process; from GPT's BPE (Byte Pair Encoding) to SentencePiece, every major LLM uses a tokenizer in some form. VoxCPM removes it entirely.

Why is the tokenizer a problem for speech synthesis? Text is discrete data. There are clear boundaries between words, and it reduces to a finite vocabulary. Speech is continuous data. The waveform flows smoothly and where you cut it changes the meaning. Tokenizing speech means forcibly slicing a continuous signal into discrete units, and information is inevitably lost in the process — especially fine acoustic features like prosody, emotion, and speaker identity. VoxCPM can market voice cloning as a core capability because, by dropping the tokenizer, it preserves speaker-identity information.

7,644 stars, +496 per day. OpenBMB grew out of Tsinghua University and has already published multiple projects in large language models (the CPM series). For a team this fluent in LLM architecture to deliberately discard one of the LLM's core components (the tokenizer) in the speech domain is telling. It is close to LLM specialists declaring on their own that LLM architecture is not universal.

The choice to be tokenizer-free is more than a technical decision; it is a **marker of speciation**. In biology, speciation is the process by which populations derived from a common ancestor diverge under adaptation to different environments until they can no longer interbreed. LLMs and VoxCPM start from a common ancestor in deep learning, but the moment VoxCPM dropped the tokenizer — the moment it became incompatible with the LLM's most basic data pipeline — the two became different "species."

---

## 2. The Shifting Meaning of "Foundation Model"

Where does the word "foundation model," used in common across the three models, come from? And how did its meaning change between 2021 and 2026?

### 2021: Stanford CRFM's definition

The term "foundation model" was defined academically in 2021, by Stanford's Center for Research on Foundation Models (CRFM), in "[On the Opportunities and Risks of Foundation Models](https://arxiv.org/abs/2108.07258)" (Bommasani et al.). In that paper, a foundation model is defined as: "a model pretrained on broad data that can be adapted to a variety of downstream tasks." The core is **transferability**. Train once, use across many tasks.

What stands out is that "general-purpose" is not part of the definition. Bommasani et al. did not say a foundation model has to be general-purpose. They said "adaptable to a variety of downstream tasks." A variety of downstream tasks can include sub-tasks inside a domain. Retail forecasting, weather forecasting, energy forecasting within time-series forecasting are themselves "a variety of downstream tasks." TimesFM meets the definition precisely.

But discourse after 2021 ran past that original definition.

### 2022–2024: Convergence on "foundation model = giant general-purpose LLM"

The arrival of ChatGPT (November 2022) effectively redefined the term. In popular discourse, foundation model became synonymous with **giant general-purpose LLMs** like GPT-4, Claude, and Gemini. Scaling laws — bigger models, better performance across more areas — provided the theoretical basis, and the belief that "make the model big enough and it covers every domain" came to dominate the industry.

In this period, domain-specific approaches were treated as "legacy" or "naive." "A finance-only model? Surely GPT-5 does finance fine — why?" "Time-series-only model? Just feed numeric data to the LLM." That reaction was mainstream. Domain-specific models were assumed to be the fallback for resource-constrained labs unable to build general-purpose ones.

### 2025–2026: The start of speciation

But the wind began to shift from late 2025. Despite the remarkable pace of general-purpose LLMs, in specific domains, domain-specific models began to clearly outperform general-purpose ones. AlphaFold did so in protein-structure prediction. GraphCast and Pangu-Weather did so in weather forecasting. None of these were LLMs, but in their respective domains they earned the status of "foundation model."

Kronos, TimesFM, and VoxCPM in April 2026 extend that thread, with one decisive difference. **All three trended in the same week.** When AlphaFold or GraphCast each made news alone, the reaction was "a big domain model has arrived" — an isolated event. Now different research groups in different domains are moving in the same direction at the same time. This is not an isolated event but a trend.

The meaning of "foundation model" is sliding back to its original definition — Bommasani et al.'s "a model pretrained on broad data that can be adapted to a variety of downstream tasks." Only this time, "a variety of downstream tasks" refers to within-domain variety rather than cross-domain variety. The foundation model is no longer a nickname for general-purpose models; it returns to its literal meaning — a model that is the foundation of a particular domain.

---

## 3. A Historical Analogy — Thirty Years of Database Speciation

The closest historical analogy to this phenomenon is the history of databases. The evolution of databases over roughly forty years, from the 1980s into the 2020s, is almost a perfect precedent for the speciation foundation models are about to undergo. The reason I use this analogy as the essay's central axis is that the structural isomorphism is real, not merely metaphorical. The same forces (economic pressure, diversification of data, workload specialization) produce the same outcome (the dissolution of general-purpose systems and the rise of specialized ones).

### The 1980s: The heyday of general-purpose RDBMSs

The 1980s database market was dominated by Oracle and IBM DB2. Relational database management systems (RDBMSs) carried the ambition to solve every data problem with one technology. Financial data, RDBMS. HR records, RDBMS. Inventory, RDBMS. Analytics reports, RDBMS. Edgar Codd's relational model, proposed in 1970, was a "universal representation" of data, and SQL was a "universal query language" for that representation.

Oracle in that era occupied structurally the same position GPT-4 or Claude Opus 4.6 occupies now. "One system handles every workload." Enterprises bought one Oracle, dumped all data into it, and ran every query. Of course performance varied by workload, but the argument that "the TCO of unifying on Oracle is lower than the TCO of buying separate systems" carried the day. You maintain expertise in a single system, staff a single operations team, define a single backup-and-recovery procedure.

This is structurally identical to the AI discourse of 2023–2025. "GPT-4 can code, translate, and analyze. The TCO of managing one model is lower than managing separate models per domain." Maintain expertise in a single API, master one set of prompt-engineering patterns, build a single evaluation pipeline.

### The 1990s: OLAP separates — The first speciation

In the 1990s, cracks began appearing in the assumption that one RDBMS handles every workload. The cause was the differentiation of workloads. It became increasingly clear that enterprise data workloads split into two camps. **OLTP** (Online Transaction Processing) — handle individual transactions quickly. Bank transfers, order intake, inventory decrements. Small amounts of data read and written very fast. **OLAP** (Online Analytical Processing) — aggregate large data sets for analysis. Monthly sales trends, regional comparisons, customer segmentation. Large data read but with complex aggregations and joins.

The problem is that OLTP and OLAP want the opposite things from a database. OLTP wants fast row-level access, sophisticated concurrency control, good write performance. OLAP wants fast column-level access, strong large-scan performance, read optimization. A single engine can do both adequately, but pushing one to the extreme sacrifices the other. The general-purpose RDBMS was "okay" at both workloads but "best" at neither.

This led to the birth of the data warehouse. Build a separate system just for OLAP. Keep OLTP in the existing RDBMS and move analytical data to the warehouse to query separately. Teradata and Sybase IQ opened the market. The first crack in the assumption that "general-purpose is universal."

The corresponding stage in the FM world is the crack in the assumption that a general-purpose LLM must do both text generation (OLTP-equivalent — fast individual responses) and large-scale data analysis (OLAP-equivalent — extracting patterns from large data) well at the same time. Coding-agent workloads need fast responses and accurate tool use; research-analysis workloads need long context and deep reasoning. Claude's split into Opus (high-performance analysis) and Sonnet/Haiku (fast responses) is already an early sign of this differentiation.

### The 2000s: The columnar revolution — Vertica and Greenplum

In the 2000s, speciation accelerated. Vertica (2005) and Greenplum (2005) emerged with **columnar stores**. Unlike traditional RDBMSs that store data row by row, columnar stores save each column as a contiguous block. Because OLAP queries typically scan only specific columns rather than entire rows, this storage layout delivered 10–100× performance gains over row-based RDBMSs on OLAP workloads.

This was a victory of **inductive bias**. Columnar stores encoded the prior assumption that "analytical queries access only a few columns" directly into the storage-engine design. General-purpose RDBMSs make no such assumption. They apply to any workload but cannot extract peak performance on any specific one. Columnar stores overwhelmingly beat general-purpose RDBMSs on the narrow region of analytical workloads.

The corresponding stage in the FM world is TimesFM. A general-purpose transformer can process time-series data. But TimesFM, which bakes time series' temporal locality and periodicity into its architecture, dominates time-series forecasting at the same parameter count. Same mechanism as Vertica beating Oracle on OLAP. The right inductive bias wins the right workload against the generalist.

### The 2010s: The Cambrian explosion — Neo4j, InfluxDB, Elasticsearch, MongoDB, Cassandra

The 2010s were a Cambrian explosion in databases. One sentence: **for each data type and workload pattern, the optimal engine is a separate one**, and the industry agreed on that.

- **Neo4j** (started 2007, prominent in the 2010s) — Graph database. Specialized for data where relationships are central. Social networks, recommendation systems, fraud detection. JOINing dozens of times in an RDBMS makes performance fall exponentially, but relationship traversal in a graph DB is near constant time.
- **InfluxDB** (2013) — Time-series database. Sensor data, monitoring metrics, IoT-device data. Specialized for data generated continuously along a time axis. Time-range queries, downsampling, and retention policies are built in.
- **Elasticsearch** (2010) — Search engine. Specialized for full-text search. Built around an inverted index, a data structure entirely different from RDBMSs. Searching with LIKE '%keyword%' in an RDBMS scans the full table; Elasticsearch returns results in milliseconds thanks to the inverted index.
- **MongoDB** (2009) — Document database. Specialized for fluid schemas and semi-structured data. Stores and queries JSON documents as-is. Adopted on workloads where an RDBMS's strict schema gets in the way.
- **Cassandra** (2008) — Distributed wide-column store. Specialized for large-scale write throughput. Fit for workloads where write performance matters more than read performance (log collection, event streaming).
- **Pinecone** (2021, an additional speciation in the 2020s) — Vector database. Specialized for high-dimensional similarity search. The most recent speciation event, born as embedding-based search exploded with AI.

Each of these databases embedded a deep understanding of a particular data type and workload pattern into its design. And each overwhelmed the general-purpose RDBMS in its own area. Did Oracle die? No. Oracle is still a giant company, and the RDBMS still runs the core systems of large enterprises. But the era of "solving every data problem with Oracle alone" is over. Enterprises in the 2020s use PostgreSQL for OLTP, BigQuery for OLAP, Elasticsearch for search, Redis for cache, Pinecone for vectors. They pick the optimal tool for each workload. This is called **polyglot persistence**.

Now map this analogy onto the FM world.

---

## 4. The Dynamics of Speciation — Why a General-Purpose LLM Cannot Cover Every Domain

Three forces drove the speciation of databases. Diversification of data types, differentiation of workload patterns, economic pressure. The same three forces are driving the speciation of foundation models.

### Data moat — The world LLMs have not seen

A general-purpose LLM's pretraining corpus is internet text. Common Crawl, Wikipedia, code repositories, academic papers, social media — combined into trillions of tokens. Summarize the corpus in one phrase and it becomes: **things humans wrote in text and put on the internet**.

The financial-market order-flow data Kronos handles is not something humans wrote in text. It is machine data the exchange's matching engine produces on millisecond timescales. The data does not get uploaded to the internet (it is paid, license-restricted, and real-time streamed). However large GPT-5 grows, if it has never trained on this data, it cannot understand its distribution. GPT's knowledge of financial markets comes from text humans wrote about finance — news articles, reports, textbooks, blogs. That is not the market itself; it is human interpretation of the market. Kronos trains on the market's own data. The difference is fundamental.

The same is true for the time-series data TimesFM handles. Sensor-level temperature, humidity, and power-consumption measurements at the second scale are not text. Time-series data uploaded to the internet is only a tiny fraction of the whole. Most of it lives inside factory SCADA systems, hospital patient monitors, and utility smart meters. Data the LLM cannot reach.

The speech data VoxCPM handles is perhaps the furthest from text. Speech is a waveform. The emotion, accent, rhythm, and breathing in a human voice cannot be reduced to a textual transcription. What an LLM knows about speech is what it knows about the text that comes after the speech has been transcribed. Not the speech itself.

The corresponding move in database history is the **diversification of data types**. In the 1980s, almost every enterprise dataset reduced to structured tables (rows and columns). In the 2010s, JSON documents, graphs, time series, full-text, high-dimensional vectors — irreducible data types proliferated. Each had its own storage method and access pattern, and the row-column model of a general-purpose RDBMS could not handle the diversity efficiently.

In the FM world, the diversification of data is already underway. Text, order flow, time series, speech, protein sequences, weather observations, satellite imagery, genomics — each is a data domain with its own structure and distribution, and none of these domains' data sits in the internet text corpus. A general-purpose LLM can process all of them by "converting them to text," but information loss in the conversion is unavoidable, and performance lags a domain FM trained on the raw data.

### Inductive bias — The value of structural priors

A general-purpose transformer's strength is being able to process almost any sequence data with **minimal assumptions**. The attention mechanism lets any element in the sequence interact directly with any other, and this universality makes transformers universal approximators.

But minimal assumptions are a double-edged sword. Time-series data has a strong prior — "nearby timesteps matter more than distant ones." A general-purpose transformer has to learn that prior from data. TimesFM bakes it directly into the architecture. The consequence is that TimesFM, at the same parameter count, outperforms a general-purpose transformer on time-series forecasting. It learns faster on less data and produces more accurate predictions with less compute.

Financial data has **regime structure**. Markets switch between qualitatively different states — normal and crisis — and the data distribution differs entirely across states. Price-move patterns during the 2008 financial crisis and during normal times do not come from the same probability distribution. Kronos's architecture explicitly models such regime transitions. A general-purpose LLM has no such mechanism.

Speech data has **phase coherence**. The physical properties of a speech waveform have meaning not only in the time domain but in the frequency domain. Formant structure, fundamental-frequency (F0) movement, harmonic structure — these are kinds of structure entirely different from the order relations of text tokens. VoxCPM's discarding of the tokenizer is a design choice for handling this structure directly.

The corresponding move in database history is the **differentiation of data structures**. B-trees are strong at range queries, hash indices at exact matches, inverted indices at full-text search, R-trees at spatial queries. Each data structure implements a prior over a particular access pattern, and on the workload where that prior fits, it dominates the general-purpose structure (B-tree). Elasticsearch beats Oracle in full-text search by the force of a specialized data structure, the inverted index. TimesFM beats GPT in time-series forecasting by the force of a time-series-specific inductive bias. Same mechanism.

### Compute economics — The point at which 1B beats 1T

The third force is economics. The most immediate and most persuasive argument.

General-purpose LLMs are large. A GPT-4-class model is hundreds of billions of parameters and more, and inference requires dozens of expensive GPUs. API calls are priced per input and per output token, and high-volume processing produces monthly bills in the millions to tens of millions of KRW.

Domain-specific FMs are small. TimesFM is on the order of hundreds of millions of parameters, runnable on a single GPU. So is Kronos. VoxCPM may be even smaller. These models match or exceed general-purpose LLMs on their domains while costing a fraction of the compute.

Concretely. Suppose a company must run one million time-series forecasts per day. Method 1: send the time series as text to a GPT-5 API and receive the prediction as text. If each request averages 500 tokens of input and 100 tokens of output, that is 500M input tokens and 100M output tokens per day. Depending on rates, monthly costs can run from millions to tens of millions of KRW. Method 2: deploy TimesFM on your own servers and run inference directly. One or two A100 GPUs suffice, and monthly cloud costs are in the low hundreds of thousands of KRW.

A 10×–100× cost gap. And Method 2's accuracy is higher than Method 1's. Cheaper and better leaves the choice self-evident.

This mirrors **the NoSQL-displacing-RDBMS dynamic** of the database world. The core reason MongoDB and Cassandra rose in the early 2010s was not performance but cost. Handling large-scale write workloads in Oracle meant paying hundreds of thousands of dollars for RAC (Real Application Clusters) licenses. Cassandra was open-source and scaled horizontally on commodity hardware. Once the same workload could be handled at a tenth of the cost, Oracle's technical excellence lost to economic rationality.

The same force is at work in the FM world. If the API cost of a general-purpose LLM is overwhelmingly higher than the self-operating cost of a domain FM, and the domain FM's performance equals or exceeds the LLM's, enterprises pick the domain FM. This is not a matter of will but of arithmetic.

---

## 5. The Meaning of Tokenizer-Free — Symbol of Departure from LLM-Architecture Assumptions

Of the three models, VoxCPM's "tokenizer-free" choice deserves a separate, deeper discussion. The choice is not just a technical decision; it is the **clearest physical evidence of FM speciation**.

The tokenizer is the first layer of LLM architecture. Every input has to pass through it to reach the model. The tokenizer converts continuous text into a sequence of discrete tokens and defines the model's vocabulary. GPT's tiktoken, LLaMA's SentencePiece, Claude's own tokenizer — implementations differ but the principle is the same. Slice the text.

This "slicing" is natural for text. Text is inherently discrete. Alphabets, syllables, and words are natural splitting units. Algorithms like BPE are statistical optimizations of those natural splits.

But continuous data like speech, images, and time series have no such natural splitting unit. Slicing a speech waveform into 20ms frames is convention, not physical necessity. Slicing an image into 16×16 patches (ViT) is the same. These artificial splits are for convenience, not reflections of the data's essence.

VoxCPM's discarding of the tokenizer is a declaration that "forcibly applying LLM data-processing pipelines to the speech domain is inappropriate." Speech is not text, and a pipeline designed for text is not suited to speech. This is not merely a technical judgment but an **acknowledgment of the uniqueness of the domain**.

In biological speciation, the central criterion for distinguishing one species from another is reproductive compatibility. Models with and without tokenizers are incompatible at the data-pipeline level. They cannot accept the same inputs, produce the same output formats, or be evaluated under the same framework. That incompatibility means the two models belong to different "species."

From this angle, VoxCPM's tokenizer-free design is a more radical speciation than Kronos's finance specialization or TimesFM's time-series specialization. Kronos and TimesFM still use variations of the transformer architecture and perform some form of tokenization (discretization). The presence of a discretization step at the first layer means they still share the trace of a common ancestor with LLMs. VoxCPM gave up even that final commonality. That makes VoxCPM the most extreme speciation case of the three.

The corresponding move in database history is **the arrival of Neo4j**. Columnar stores (Vertica) and document stores (MongoDB) still retained the concept of a table in modified form. Neo4j threw out the concept of a table entirely and introduced an entirely different abstraction: nodes and edges. It built a new query language, Cypher, instead of SQL. In exchange for giving up RDBMS compatibility, it gained performance and expressivity for graph data that an RDBMS cannot reach. VoxCPM's discarding of the tokenizer is the same kind of decision Neo4j made when it discarded tables.

---

## 6. The West and China Walk the Same Path — The Meaning of Simultaneity

Look at the geographic distribution of the three models. TimesFM is Google Research (United States); Kronos comes from a Chinese university research group; VoxCPM comes from OpenBMB / Tsinghua University (China). Different continents, different organizations, in the same week, moving in the same direction (domain-specific FMs).

There are two possible readings of the simultaneity. The optimistic reading is "coincidence." Each group was solving its own problem, and the results happened to come out around the same time; there is no basis for calling it a structural trend. The pessimistic reading — which this essay argues — is "independent responses to the same structural pressure." Data moat, the edge of inductive bias, economic rationality — these three forces are acting globally and simultaneously, so research groups that never coordinated have arrived at the same conclusion.

The latter is more persuasive because the pattern recurs throughout the history of technology. Alexander Graham Bell and Elisha Gray filed telephone patents on the same day. Newton and Leibniz independently discovered calculus. "When the time is ripe, the same discovery emerges in parallel" is a constant of the history of science. The same is true for FM domain-specialization. The time is ripe.

As "The Open Model Wars of 2026" argued, Google, AMD, and Alibaba releasing open models in the same week was a signal of "war." This week, Google Research, a Chinese university, and OpenBMB pushing domain FMs into trending at the same time is a signal of "speciation." Two signals from different fault lines in the same ecosystem.

Add [NVIDIA/personaplex](https://github.com/NVIDIA/personaplex) as a supplementary data point. In the same week it recorded 8,745 stars at +2,745 weekly, a project specialized in AI persona/personalization. That a giant like NVIDIA shipped a project focused on a vertical (personalization) rather than general-purpose AI is another expression of the same speciation trend.

The geographic distribution of the simultaneity is itself telling. In an environment of intensifying US-China technology competition, both sides are moving in the same direction (domain FMs) at the same time. This is not a strategic peculiarity of one side or the other but closer to a trend of technological inevitability. If the US were pushing only general-purpose LLMs and China were pushing only domain FMs, you could read it as strategic divergence. The fact that both sides are moving in the same direction suggests an internal direction in the development of the technology.

---

## 7. Economics: When 1B Specialists Beat a 1T Generalist

The economics of speciation deserve a closer look. Beyond the intuitive claim that "domain FMs are cheaper," we need to analyze precisely under what conditions a specialized model wins economically against a general-purpose one.

### The nonlinear relation between model size and performance

The scaling law for general-purpose LLMs is roughly: increase model size by 10× and performance improves by a fixed fraction. This is an "average" performance improvement across all domains. Performance improvement in any specific domain may diverge from that average. In domains well represented in internet text (general knowledge, coding, document writing), the gains from scaling are large. In domains poorly represented (financial microstructure, sensor time series, speech synthesis), the gains from scaling are small.

This means diminishing returns hit at different rates by domain. If a general-purpose LLM can grow to one trillion parameters and barely improve at financial order-flow forecasting, it is no surprise at all that a 10-billion-parameter Kronos beats it in that domain.

### The structural difference in inference cost

Inference cost is roughly proportional to parameter count. A 1T-parameter model's inference cost is roughly 1,000× a 1B-parameter model's. GPU memory requirement, compute, and power consumption all scale with parameter count.

Concrete comparison.

**General-purpose LLM path**: assume a GPT-5-class API price. $10/1M input tokens, $30/1M output tokens (a 2026 estimate). To do time-series forecasting, encode the data as text. Suppose one million predictions per day require 500M input tokens and 100M output tokens. Daily cost = $5,000 (input) + $3,000 (output) = $8,000. Monthly cost roughly $240,000 (about KRW 320M).

**Domain FM path**: deploy TimesFM on your own servers. Assume two A100 GPUs suffice. Cloud-priced, an A100's monthly cost is about $3,000. Two GPUs = $6,000/month (about KRW 8M). Add engineering costs and you still stay under $10,000/month (about KRW 13M).

Cost difference: about 24×. And the domain FM's prediction accuracy is higher.

That is "the point at which 1B beats 1T." The region where a domain-specific FM matches or exceeds a general-purpose LLM in performance while costing tens of times less. This region already exists for finance, time series, and speech today, and it will expand to more domains.

### TCO analysis of domain FMs

Of course, domain FMs carry costs that general-purpose LLM APIs do not. Engineering burdens of deployment and operations, ongoing costs of model updates and fine-tuning, the cost of building incident response and monitoring infrastructure. General-purpose LLM APIs bear all of this for the provider.

But even accounting for those costs, on large-scale workloads the total cost of ownership (TCO) of domain FMs is lower than that of general-purpose LLM APIs. Same dynamic as the database-world transition from Oracle to PostgreSQL+Elasticsearch combinations. Oracle offered the convenience of "one license for everything," but past a certain workload scale, specialized DB combinations' TCO fell below Oracle's. Enterprises crossing that tipping point peeled away one by one — the "NoSQL movement" of the 2010s.

The same tipping point is approaching in the FM world. Enterprises with sufficient-scale domain-specific workloads will start switching from general-purpose LLM APIs to self-operating domain FMs. The GitHub star counts of Kronos, TimesFM, and VoxCPM are leading indicators of that transition.

---

## 8. Polyglot FM — When "Foundation Model" Comes to Mean "Verticalized FM"

In databases, polyglot persistence took about a decade to settle in. The first specialized DBs began to appear around 2005; by 2015, "pick the optimal DB for each workload" was industry common sense. Oracle did not die during that decade. It was still the largest DB company. But Oracle's position shifted from "the only choice" to "one of several."

The same trajectory is predictable in the FM world. GPT-5, Claude, Gemini and other general-purpose LLMs will not die. They will remain the best choice for general text-based work. But the era of "solving every AI problem with GPT" is ending. Within two or three years, "foundation model" will, by default, mean **verticalized FM, with the general-purpose LLM as one vertical (text/general knowledge) within it** — that perception will settle in.

Call this the "Polyglot FM" era. An enterprise AI stack of this shape.

- **Text generation / general reasoning**: Claude, GPT, Gemini (general-purpose LLMs)
- **Time-series forecasting**: TimesFM or its successors
- **Financial analysis**: Kronos or its successors
- **Speech synthesis / processing**: VoxCPM or its successors
- **Image / vision**: domain-specific vision FMs
- **Code generation**: code-specialized FMs (a flow already started by Codex)
- **Search / embeddings**: search-specialized embedding models

Pick the best FM per domain; an orchestration layer combines them.

In this structure, the direction of value migration is clear. The value of individual FMs commoditizes, and **the orchestration layer** — which FM to route which task to, and how — rises in value. Same dynamic as the database world, where the value of individual DBs commoditized while data pipelines and ETL tools (Airflow, dbt, Fivetran) rose.

The forecast in "The Open Model Wars of 2026" — "Scenario 2: dispersion, no one wins" — connects directly here. That essay argued the most likely scenario was that "open models commoditize and no single company dominates the model layer." Polyglot FM is the extension of that scenario. Not only the commoditization among general-purpose models but the **diversification of the entire FM ecosystem, including domain FMs**.

### The rise of orchestration

The pivotal technology layer of the Polyglot FM era is FM orchestration. A layer that analyzes the user's request, routes it to an appropriate domain FM, and composes the final response from the outputs of multiple FMs.

What is interesting is that this orchestration layer is itself a plausible new role for general-purpose LLMs. General-purpose LLMs are strong at natural-language understanding. Parsing user intent and distributing the request to the right specialist model is itself a natural-language-understanding problem. A question like "what's tomorrow's max temperature in Seoul?" gets classified by a general-purpose LLM as a time-series forecasting problem and delegated to TimesFM.

Under that arrangement, the general-purpose LLM's role shifts from "the model that answers everything directly" to "the router that finds the right specialist." A trajectory similar to Oracle's evolution from "the system that manages all data directly" into "a hub that connects to other specialist systems." Oracle Data Integrator, Oracle GoldenGate — Oracle's pivot to making connectivity with other DBs a core product was an admission that its general-purpose DB does not handle every workload directly.

---

## 9. Speciation Is Not Failure — It Is the Marker of Technological Maturation

An important distinction here. FM speciation is **not the failure of general-purpose LLMs**. It is the marker of technological maturation.

Biological speciation is the result of adaptation to the environment. Speciation does not occur because the common ancestor fails; it occurs because variants more fit for different environments are selected. Darwin's finches in the Galapagos developed different beak shapes as they adapted to different food sources on each island. The original finch did not "fail." Optimization happened to match the environment's diversity.

The same is true for database speciation. The rise of NoSQL was not the failure of RDBMSs. As data became more diverse, workloads grew, and economic pressure increased, regions emerged where specialized systems beat general-purpose ones. This is healthy differentiation in a technology ecosystem.

FM speciation should be understood in the same way. TimesFM did not emerge because GPT-5 cannot forecast time series. It emerged because time-series forecasting is important enough and idiosyncratic enough that a dedicated FM can offer a better solution than a general-purpose LLM. That is evidence that the FM as a technology paradigm has matured. It starts as one shape early on, and as it matures, it differentiates to fit its environments.

This is where this essay's subtitle — "The Alternative to GPT May Not Be GPT" — earns its weight. The alternative to GPT may be "a better GPT" (a larger general-purpose LLM), but increasingly, in more domains, the alternative to GPT is "not GPT" (a domain-specific FM). In finance the alternative is Kronos, in time series TimesFM, in speech VoxCPM. These alternatives are smaller, narrower, and cheaper than GPT. But within their domains, they are better.

---

## 10. Implications for Practitioners — Diversify Your Options

What does this analysis mean for practitioners?

### Implication 1: Re-examine the "everything-on-GPT/Claude" strategy

Many companies today equate "adopting AI" with "adopting a general-purpose LLM API." Run every AI workload through the GPT-5 or Claude API. The strategy is simple and quick to start. But if your workloads concentrate in a particular domain — a manufacturer where time-series forecasting is the core workload, an investment firm where financial-data analysis is the core, a contact center where speech processing is the core — a general-purpose LLM API may not be the optimal choice.

Step one is to check whether a domain-specific FM exists, whether it outperforms a general-purpose LLM, and whether its TCO is lower. Choosing a general-purpose LLM API by inertia without that review may be the same kind of mistake as deciding in 2015 to "put all the data in Oracle."

### Implication 2: Build polyglot-FM capability

Just as polyglot persistence made "knowing multiple databases" a requirement for DBAs, Polyglot FM will make "knowing multiple FMs" a requirement for AI engineers. Prompt engineering of a general-purpose LLM alone will not suffice. TimesFM's input format, Kronos's data pipeline, VoxCPM's speech-processing API — you will need an understanding of each.

This is not only a threat; it is also an opportunity. General-purpose LLMs are accessible to anyone, and everyone uses the same API. Differentiation is hard. Domain-specific FMs require domain expertise and model-operations capability. Companies that build this capability gain structural advantage over competitors limited to general-purpose LLM APIs.

### Implication 3: Invest in the orchestration layer

The orchestration layer that combines multiple FMs will become a core layer in the AI stack going forward. Tools like LangChain and LlamaIndex are heading in that direction, but their designs are still general-purpose-LLM-centric. True polyglot orchestration that includes domain FMs is still in early stages. Investing in this area early pays off long-term.

### Implication 4: Redefine your data strategy

The data strategy of a company using a general-purpose LLM revolves around "building good prompts and good RAG." The data strategy of a company using domain FMs is different. The core is collecting, cleaning, and using your domain's unique data for fine-tuning or further training of the domain FM. Data becomes the differentiator against general-purpose LLMs.

This is an extension of "The Open Model Wars of 2026," which argued that "the model is the bait; the real value is in the ecosystem." In the Polyglot FM era, that expands to "models are commodities; the real value is in domain data and orchestration capability."

---

## 11. Outlook — What Comes Next in Speciation

Kronos, TimesFM, and VoxCPM in April 2026 are the first visible wave of FM speciation. What comes next?

### Short term (2026–2027): More domain FMs

The domains where domain FMs have appeared so far are finance, time series, and speech. But there are countless other "data domains poorly represented in internet text." Medical imaging, satellite/remote-sensing imagery, genomics, molecular structure, weather observation, industrial IoT sensors, robotic control signals — each will see a model claiming to be a foundation model.

Open source is the accelerator of this wave. It is no coincidence that Kronos, TimesFM, and VoxCPM are all open-source on GitHub. Open source provides the community with evidence that "this approach works" and prompts subsequent researchers to apply the same methodology to other domains. Success in one domain begets attempts in another, which propagate to yet another. A self-reinforcing loop will form.

### Mid term (2027–2028): Maturation of the domain-FM ecosystem

As more domain FMs appear, demand for infrastructure that manages and combines them explodes. FM registries (which domain FM lives where), FM routers (which FM to send incoming requests to), FM monitoring (whether each FM is maintaining expected performance) — these layers will form a market on their own.

Same trajectory as the database world, where dbt, Airbyte, and Fivetran rose as polyglot persistence settled in. The polyglot era of FMs will open the era of FM-pipeline tools.

### Long term (2028–2029): The shift in "foundation model" semantics completes

By this point, "foundation model" will by default mean "the foundation model of a particular domain." When someone says "foundation model," the first question becomes "of which domain?" "General-purpose FM" becomes a special case that must be explicitly qualified by the word "general-purpose." Much as "database" today invites the question "what kind?", and "general-purpose RDBMS" is the explicit qualifier.

This is a return to the 2021 Stanford CRFM definition — "a model pretrained on broad data that can be adapted to a variety of downstream tasks" — but the center of gravity of the meaning has changed. In 2021, the definition was meant to describe a model like GPT-3. In 2028, it will be meant to describe models like TimesFM, Kronos, and VoxCPM. Same words, different referents. The language has not changed, but the world has.

---

## 12. Conclusion

The April 10, 2026 GitHub Trending poses one question. "Should the foundation model be one giant general-purpose model, or should there be a foundation model for each domain?"

This essay's answer is the latter. And the basis for that answer was already provided thirty years ago by databases. The 1980s Oracle held the vision of "every datum in a single RDBMS," but as data types diversified and workloads differentiated, graph DBs, time-series DBs, search engines, document DBs, and vector DBs each beat the general-purpose RDBMS in their domains. Oracle did not die, but the world of Oracle alone ended.

The same is happening to FMs. Kronos reads the language of financial markets directly — a different order of understanding than reading text humans wrote about finance. TimesFM bakes the structural characteristics of time series into its architecture — more efficient than waiting for a general-purpose transformer to learn that structure from data. VoxCPM dropped the tokenizer — an acknowledgment that the essence of speech is fundamentally different from text.

That these three models trended in the same week is no coincidence. The same structural forces — data moat, the edge of inductive bias, compute economics — pulled research groups on different continents in the same direction. This is not an isolated event but a trend. FM speciation has begun.

The assumption that GPT-5's alternative will be GPT-6 is too narrow. In financial analysis the alternative to GPT-5 may be Kronos, in time-series forecasting it may be TimesFM, in speech synthesis it may be VoxCPM. The alternative to GPT may not be GPT.

The message to practitioners is one. Diversify your options. Reexamine the equation "our company's AI = GPT API." Identify your core workloads, check whether a domain FM optimized for them exists, and if so, run the cost-performance comparison against a general-purpose LLM. If one does not exist, design your architecture to leave room for one to emerge within two years.

What database history teaches is that the transition from general-purpose to specialized does not happen overnight. It took a decade. But the gap between companies that recognize when the transition has begun and companies that do not is enormous a decade later. April 10, 2026 on GitHub Trending is one of the signals announcing the start.

---

Sources:
- [shiyu-coder/Kronos — A Foundation Model for the Language of Financial Markets](https://github.com/shiyu-coder/Kronos)
- [google-research/timesfm — Pretrained time-series foundation model for forecasting](https://github.com/google-research/timesfm)
- [OpenBMB/VoxCPM — Tokenizer-Free TTS for multilingual speech generation with voice cloning](https://github.com/OpenBMB/VoxCPM)
- [NVIDIA/personaplex — AI persona/personalization](https://github.com/NVIDIA/personaplex)
- [Bommasani et al. (2021). "On the Opportunities and Risks of Foundation Models." Stanford CRFM](https://arxiv.org/abs/2108.07258)
- [The Open Model Wars of 2026 — Why Google, AMD, and Alibaba Are Giving It Away](/draft/open-model-war-2026.md)
