---
title: 'The Speciation of Foundation Models — The Alternative to GPT May Not Be GPT'
description: '"In the same week, a model that reads the language of financial markets, a model that forecasts time series, and a model that speaks without a tokenizer all trended on GitHub at once. All three called themselves ''foundation models.'' None of them were LLMs."'
pubDate: 2026-04-10T02:27:51.139Z
lang: en
pairSlug: 'foundation-model-speciation-simplified'
draft: false
---
# The Speciation of Foundation Models — The Alternative to GPT May Not Be GPT

> "In the same week, a model that reads the language of financial markets, a model that forecasts time series, and a model that speaks without a tokenizer all trended on GitHub at once. All three called themselves 'foundation models.' None of them were LLMs."

---

Open GitHub Trending as of April 10, 2026, and you see a strange landscape.

[shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) is climbing past 12,180 stars at +245 per day. Its subtitle reads "A Foundation Model for the Language of Financial Markets." It treats financial-market order flow and price action as a "language" and applies a transformer architecture to learn the patterns of that language. The project comes out of a Chinese university research group.

[google-research/timesfm](https://github.com/google-research/timesfm) sits in the same week's trending list at 15,985 stars, +3,095 weekly. It is Google Research's pretrained time-series foundation model. Retail, weather, energy — across domains, it performs time-series forecasting zero-shot. The positioning is "the GPT of time series."

And [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) is at 7,644 stars, +496 per day. It performs multilingual speech synthesis and voice cloning, but it carries one defining technical choice — **tokenizer-free**. It does not use a tokenizer. Splitting text into tokens is the most basic preprocessing step in an LLM, and VoxCPM throws it out entirely. The judgment is that the very concept of tokenization is unsuited to the audio domain.

The three models share two things. First, all three call themselves "foundation models." Second, none of them are LLMs. They are not models that take text in and produce text out; they are specialized models for entirely different data domains — financial order flow, time-series numbers, and speech waveforms. Different research groups from different continents, in the same week, pinned the same word to specialized models in their own domains and released them.

This essay argues that the simultaneity is not coincidence but the visible surface of a structural trend. The narrative dominating AI discourse for the past three years has been "a bigger, more general LLM solves everything." GPT-5, Claude Opus 4.6, Gemini 3.1 — every quarter brought a larger model, and unificationism became the assumption. Yet in April 2026, that same research community — fully capable of building general-purpose FMs — is also building domain-specific FMs and shipping them. Why?

This piece dissects that "why" across three layers — data, architecture, economics — and contrasts the phenomenon with a historical precedent that already played out three decades ago: the speciation of databases. Along the way, it asks how the meaning of the term "foundation model" is shifting.

---

## 1. Why the Three Models Walked a Different Path from General-Purpose LLMs

**Kronos — A model that reads the "language" of financial markets.** What makes [Kronos](https://github.com/shiyu-coder/Kronos) interesting is the framing. "Language" is not a metaphor; it is the rationale for the architecture. Financial-market order flow — buys, sells, fills, cancellations — is treated not as a time series but as a **sequence**. Just as words in natural language line up to form sentences, order events line up to form the market's "sentences."

There are two reasons you cannot just feed this data to a general-purpose LLM. First, **format mismatch**. Price (continuous reals), quantity (integers), order type (categorical), and timestamp (temporal) make up a multidimensional structured dataset; convert it into text and "buy 500 shares at 101.35" loses the numerical continuity and magnitude relations of (101.35, 500, BUY) inside discrete token embeddings. Second, **absence of training data**. Exchange microstructure data, Level 2 order books, and tick-level fill records are paid, license-restricted, and excluded from any general-purpose LLM's pretraining corpus. However large GPT-5 grows, it can do only so much with a data distribution it has never seen. The number 12,180 stars shows the level of community interest in this approach. In financial engineering, a GitHub project crossing 10,000 stars is genuinely rare.

**TimesFM — The GPT of time series.** [TimesFM](https://github.com/google-research/timesfm) is more explicit. It declares: "What GPT did for text, we do for time series." Pretrain on large-scale time-series data and then perform zero-shot forecasting on a given domain without fine-tuning. Retail demand prediction, weather-station temperature forecasts, power-grid load forecasts — domain-agnostic. Until now, time-series forecasting meant choosing among ARIMA, Prophet, N-BEATS, and the like, configuring a model per domain. TimesFM inverts that workflow.

The decisive difference from a general-purpose LLM is **inductive bias**. Temporal locality, periodicity, trend — the structures intrinsic to time series are baked into the architecture: positional encoding specialized for the time axis, multi-resolution input handling, decoding strategies optimized for forecast horizons. At a given parameter count, these enable more accurate predictions than a general model can produce. That Google Research, capable of building Gemini, took the trouble to build a separate domain FM is in itself an admission that general-purpose LLMs are bounded when it comes to time-series processing.

**VoxCPM — A model that dropped the tokenizer.** [VoxCPM](https://github.com/OpenBMB/VoxCPM) makes the most radical design choice of the three. **Tokenizer-free.** In the LLM world, tokenizers are like air. Every major LLM, from GPT's BPE to SentencePiece, uses a tokenizer in some form. VoxCPM removed it entirely.

Why is the tokenizer a problem for speech? Text is discrete data. There are clear boundaries between words, and it reduces to a finite vocabulary. Speech is continuous data. The waveform flows smoothly; tokenize it and you throw away fine acoustic information like prosody, emotion, and speaker identity. VoxCPM can market voice cloning as a core capability because, by dropping the tokenizer, it preserves speaker-identity information. OpenBMB grew out of Tsinghua University and has built large language models (the CPM series). For a team this fluent in LLM architecture to discard the tokenizer in the speech domain is closer to a self-declaration by LLM specialists that LLM architecture is not universal.

---

## 2. The Shifting Meaning of "Foundation Model"

The term "foundation model" was defined academically in 2021 by Stanford CRFM, in "[On the Opportunities and Risks of Foundation Models](https://arxiv.org/abs/2108.07258)" (Bommasani et al.). "A model pretrained on broad data that can be adapted to a variety of downstream tasks." Notice what the definition does not require: the word "general-purpose." "A variety of downstream tasks" can include sub-tasks inside a domain. Retail forecasting, weather forecasting, and energy forecasting are themselves "a variety of downstream tasks" within time-series forecasting. TimesFM meets the definition precisely.

After ChatGPT (November 2022), however, "foundation model" became synonymous with massive general-purpose LLMs like GPT-4, Claude, and Gemini in popular discourse. Scaling laws — bigger model, better performance across more areas — provided the theoretical justification, and domain-specific approaches were treated as "a fallback for resource-constrained labs."

The wind shifted from late 2025. General-purpose LLMs continued to advance at a startling pace, yet in specific domains, domain-specific models began to clearly outperform them. AlphaFold did so in protein-structure prediction; GraphCast and Pangu-Weather did so in weather forecasting. None of them were LLMs, but in their respective domains they earned the status of "foundation model." Kronos, TimesFM, and VoxCPM in April 2026 extend that thread, with one decisive difference: **all three trended in the same week**. When AlphaFold or GraphCast each made news on their own, the reaction was "a big domain model has arrived" — an isolated event. Now different research groups in different domains are moving in the same direction at the same time. This is not an isolated event but a trend.

The word "foundation model" is sliding back to its original definition. Only this time, "a variety of downstream tasks" refers to within-domain variety rather than cross-domain variety. Not a nickname for general-purpose models, but a return to the literal meaning — a model that is the foundation of a particular domain.

---

## 3. A Historical Analogy — Thirty Years of Database Speciation

The closest historical analogy to this phenomenon is the history of databases. The same forces (economic pressure, diversification of data, workload specialization) produced the same outcome (the dissolution of general-purpose systems and the rise of specialized ones); the structural isomorphism is real.

**The 1980s: The heyday of general-purpose RDBMSs.** The era of Oracle and IBM DB2. Relational databases carried the ambition to solve every data problem with one technology. Financial data, HR records, inventory, analytics reports — all RDBMS. The structure is exactly that of "GPT-4 can code, translate, and analyze, all in one" from 2023–2025. "Maintain expertise in a single system; staff a single operations team" was the operating logic.

**The 1990s–2000s: First cracks and acceleration.** It became increasingly clear that enterprise data workloads split into two camps. OLTP (Online Transaction Processing) — bank transfers, order intake, inventory decrements. Small amounts of data read and written very fast. OLAP (Online Analytical Processing) — monthly sales trends, regional comparisons, customer segmentation. Large data read but with complex aggregations and joins. The problem is that OLTP wants row-oriented access and write performance, while OLAP wants column-oriented access and read performance. A single engine can do both adequately, but pushing optimization for one to the extreme sacrifices the other. The dedicated OLAP data warehouse was born.

In the 2000s, columnar stores like Vertica and Greenplum delivered 10–100× performance gains over row-based RDBMSs on OLAP. It was a victory of inductive bias, encoded into storage design via the prior assumption that "analytical queries access only a small number of columns."

**The 2010s: The Cambrian explosion.** It became the industry consensus that an optimal engine existed for each data type and workload. Neo4j (graphs — constant-time relationship traversal), InfluxDB (time series — built-in time-range queries and downsampling), Elasticsearch (full-text search — millisecond search via inverted indices), MongoDB (documents — fluid schemas), Cassandra (distributed writes — large-scale event streaming), and in the 2020s, Pinecone (vectors — high-dimensional similarity search). Oracle did not die. It still runs the core systems of large enterprises. But the era of "solving every data problem with Oracle alone" is over. Choosing the optimal tool for each workload — **polyglot persistence** — became the new standard.

**Mapping to the FM world.** Vertica beating Oracle in OLAP was the right inductive bias winning the right workload against a general-purpose system. TimesFM beating GPT in time-series forecasting is the same mechanism. Neo4j abandoning the very concept of a table for the entirely different abstraction of nodes and edges is the same kind of decision VoxCPM made by abandoning the tokenizer. Trading compatibility for performance that the general-purpose system cannot reach in your domain.

---

## 4. The Three Forces of Speciation

### Data moat — The world LLMs have not seen

A general-purpose LLM's pretraining corpus can be summarized in a single phrase: **things humans wrote in text and put on the internet**. Common Crawl, Wikipedia, code repositories, academic papers, social media — combined into trillions of tokens of training data.

The financial order flow Kronos handles is not in that corpus. It is machine-generated data produced by an exchange's matching engine on millisecond timescales — paid, license-restricted, real-time streamed. However large GPT-5 grows, if it has never trained on this data, it cannot understand its distribution. GPT's knowledge of finance comes from human interpretation of markets — news articles, reports, blogs. That is secondary information about markets, not the market itself. Kronos trains on the market's own data. The difference is fundamental.

The same goes for the time-series data TimesFM handles. Sensor-level temperature, humidity, and power-consumption measurements at the second scale are not text. Most time-series data lives inside factory SCADA systems, hospital patient monitors, and utility smart meters. The speech VoxCPM handles is even further from text. The emotion, accent, rhythm, and breathing in a human voice cannot be reduced to a textual transcription. What an LLM knows about speech is what it knows about the text that comes after the speech has been transcribed. Not the speech itself.

The database history parallel is the diversification of data types. In the 1980s, almost every enterprise dataset reduced to structured tables. In the 2010s, JSON documents, graphs, time series, full-text, high-dimensional vectors — irreducible data types proliferated, and the row-column model of a general-purpose RDBMS could not handle the diversity efficiently.

### Inductive bias — The value of structural priors

A general-purpose transformer's strength is handling almost any sequence data with minimal assumptions. But minimal assumptions are a double-edged sword. Time series have the strong prior that "nearby timesteps matter more than distant ones." Financial data has qualitatively different normal and crisis regimes. Speech has frequency-domain structure — formant structure and fundamental frequency (F0). A general-purpose transformer has to learn these structures from data, while domain FMs encode them directly into the architecture. Result: at the same parameter count, less data and less compute yield more accurate results. It is the same mechanism by which inverted indices overwhelm B-trees in full-text search, or R-trees beat general-purpose indices in spatial queries. Each data structure encodes a prior over a particular access pattern, and on the workload where that prior fits, it beats the generalist.

### Compute economics — The point at which 1B beats 1T

General-purpose LLMs run to hundreds of billions of parameters and more; domain FMs are on the order of hundreds of millions. Inference cost is roughly proportional to parameter count. Concretely: suppose a company must run one million time-series forecasts per day. Sending data to a GPT-5 API as text (at $10/1M input tokens, $30/1M output tokens) costs about $8,000/day, or roughly $240,000/month (about KRW 320M). Self-hosting TimesFM on two A100 GPUs costs about $6,000/month (about KRW 8M). Roughly a 40× cost gap, and the domain FM is more accurate. Cheaper and better is not a matter of will; it is arithmetic.

The dynamic mirrors enterprises in the 2010s paying hundreds of thousands of dollars for Oracle RAC licenses leaving as soon as open-source Cassandra could handle the same workload at a tenth of the cost. Oracle's technical excellence lost to economic rationality. Of course, domain FMs carry costs that general-purpose LLM APIs do not: the engineering burden of deployment and operations, ongoing costs of model updates and fine-tuning, incident response and monitoring infrastructure. Even accounting for those, total cost of ownership (TCO) on high-volume workloads is lower than that of general-purpose LLM APIs. Just as enterprises crossed the tipping point at which "Oracle alone" became more expensive than a PostgreSQL+Elasticsearch combination and started peeling away, the same transition is approaching in the FM world.

---

## 5. The Meaning of Tokenizer-Free — Physical Evidence of Speciation

VoxCPM's tokenizer-free design deserves its own discussion. The choice is not just a technical decision; it is the clearest physical evidence of FM speciation.

The tokenizer is the first layer of LLM architecture, and every input has to pass through it. Text is inherently discrete — there are natural splitting units in alphabets, syllables, and words — so algorithms like BPE work naturally. But continuous data like speech, images, and time series have no such natural splitting unit. Cutting a speech waveform into 20ms frames is convention, not physical necessity. VoxCPM's decision to abandon the tokenizer is a declaration that "forcibly applying LLM data-processing pipelines to the speech domain is inappropriate."

In biological speciation, the core criterion for whether two populations are the same species is reproductive compatibility. Models with and without tokenizers are incompatible at the data-pipeline level. They cannot accept the same inputs, produce the same output formats, or be compared under the same evaluation framework. Kronos and TimesFM still perform some form of tokenization (discretization) and retain traces of common ancestry with LLMs. VoxCPM dropped even that last commonality. The same kind of decision Neo4j made when it discarded the very concept of a table for an entirely different abstraction of nodes and edges, and built Cypher instead of using SQL — trading RDBMS compatibility for performance unreachable on graph data.

---

## 6. The Polyglot FM Era and Conclusion

Polyglot persistence took about a decade to take hold in databases. The first specialized DBs appeared around 2005; by 2015, "pick the best DB for each workload" was industry common sense. Oracle did not die. But Oracle's position shifted from "the only choice" to "one of several choices."

The FM world is on the same trajectory. General-purpose LLMs like GPT-5, Claude, and Gemini will remain the best choice for general-purpose, text-based tasks. But the era of "solving every AI problem with GPT" is ending. The enterprise AI stack is shaping up to look like this.

- **Text generation / general reasoning**: Claude, GPT, Gemini (general-purpose LLMs)
- **Time-series forecasting**: TimesFM or its successors
- **Financial analysis**: Kronos or its successors
- **Speech synthesis / processing**: VoxCPM or its successors
- **Search / embeddings**: search-specialized embedding models

In this structure, the direction of value migration is clear. Individual FMs become commoditized, and **the orchestration layer** — which FM to route which task to, and how — rises in value. Just as individual DBs were commoditized in the database world and value migrated to data-pipeline tools (Airflow, dbt, Fivetran), the same will happen here. Interestingly, this orchestration itself may become a new role for general-purpose LLMs. A shift from "the model that answers everything directly" to "the router that finds the right specialist." A trajectory similar to Oracle eventually offering connectivity with other DBs (Oracle Data Integrator, GoldenGate) as core products.

FM speciation is not a failure of general-purpose LLMs. It is the marker of technological maturation. In biology, speciation does not happen because a common ancestor fails; it happens because variants more fit for different environments are selected. Just as Darwin's finches diverged in beak shape across the Galapagos islands as they adapted to different food sources, FMs are diverging in architecture as they adapt to the data characteristics of each domain. TimesFM did not arise because GPT-5 cannot forecast time series. It arose because time-series forecasting is important enough and idiosyncratic enough that a dedicated FM can offer a better solution than a general-purpose LLM.

This is where this essay's subtitle — "The Alternative to GPT May Not Be GPT" — earns its weight. The alternative to GPT may be "a better GPT" (a larger general-purpose LLM), but increasingly, in more domains, the alternative to GPT is "not GPT" (a domain-specific FM). These alternatives are smaller, narrower, and cheaper than GPT. But within their domains, they are better.

The April 10, 2026 GitHub Trending poses one question. "Should the foundation model be one giant general-purpose model, or should there be a foundation model for each domain?" This essay's answer is the latter. Kronos reads the language of financial markets directly, TimesFM bakes the structure of time series into its architecture, and VoxCPM dropped the tokenizer. Three models trending in the same week is not coincidence. The same structural forces — data moat, the edge from inductive bias, compute economics — pulled research groups on different continents in the same direction. Not an isolated event but a trend. FM speciation has begun.

The message to practitioners is one. Diversify your options. Reexamine the equation "our company's AI = GPT API." Identify your core workloads and check whether a domain FM optimized for them exists. If one does, run the cost-performance comparison against a general-purpose LLM. If one does not, design your architecture to leave space for one to emerge within two years. Choosing a general-purpose LLM API by inertia, without that review, may be the same kind of mistake as deciding in 2015 to "put all the data in Oracle." What database history teaches is that the transition from general-purpose to specialized does not happen overnight, but the gap between companies that recognize when it has begun and companies that do not is enormous a decade later. April 10, 2026 on GitHub Trending is one of the signals announcing the start. The alternative to GPT may not be GPT.

---

Sources:
- [shiyu-coder/Kronos — A Foundation Model for the Language of Financial Markets](https://github.com/shiyu-coder/Kronos)
- [google-research/timesfm — Pretrained time-series foundation model for forecasting](https://github.com/google-research/timesfm)
- [OpenBMB/VoxCPM — Tokenizer-Free TTS for multilingual speech generation with voice cloning](https://github.com/OpenBMB/VoxCPM)
- [NVIDIA/personaplex — AI persona/personalization](https://github.com/NVIDIA/personaplex)
- [Bommasani et al. (2021). "On the Opportunities and Risks of Foundation Models." Stanford CRFM](https://arxiv.org/abs/2108.07258)
- [The Open Model Wars of 2026 — Why Google, AMD, and Alibaba Are Giving It Away](/draft/open-model-war-2026.md)
