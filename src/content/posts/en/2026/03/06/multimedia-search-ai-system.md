---
title: 'Designing an AI Search System for a 1.2TB Multimedia Archive'
description: '"When does Kim Jong Un first appear in this newspaper? And how did the reporting tone shift before and after?"'
pubDate: 2026-03-06T08:51:01.466Z
lang: 'en'
pairSlug: 'multimedia-search-ai-system'
draft: false
---
# Designing an AI Search System for a 1.2TB Multimedia Archive

> "When does Kim Jong Un first appear in this newspaper? And how did the reporting tone shift before and after?"

To answer this question, you have to OCR decades of newspaper scans into text, align them on a timeline, identify the people involved, and analyze how tone changes. Plugging a keyword into Google's search bar does not solve it.

Imagine a 1.2TB archive of North Korea-related materials: newspaper scans, book PDFs, music files, video, blog archives — a tangle of formats. Suppose 13 researchers might ask any question against this archive. Keyword search, time-series analysis, person photo search, place photo search, translation, word frequency analysis, multi-condition search — these go well beyond what a single search engine can cover.

This article lays out a methodology for turning this kind of multimedia archive into an AI search system on GCP. It covers architecture design, technology choices, country-by-country precedents, costs, and build timelines.

---

## Why a simple search engine is not enough

Here are some of the questions the researchers anticipated:

- "Show me the year-over-year frequency of the word 'self-reliance' in *Rodong Sinmun* during the 1990s."
- "Find other articles in which the person in this photo appears."
- "Analyze how reporting tone shifted in the three months before and after Kim Jong Il's death."
- "Plot on a map the place names mentioned in this video."
- "Extract from KCNA news only the scenes in which a particular person appears."

These questions share something in common. **A single search query will not answer any of them.** They cross multiple modalities (text, image, audio, video), require temporal analysis, and sometimes demand multi-step reasoning. Loading text into Elasticsearch and running BM25 will not even get you halfway.

What is needed is a **multimodal RAG (Retrieval-Augmented Generation) system** — a pipeline that indexes diverse data formats in a unified way, decomposes a natural-language question into stages of retrieval and analysis, and generates the final answer.

---

## The overall system architecture

The full system is built in four layers.

```
┌─────────────────────────────────────────────────────┐
│                  User interface                      │
│          (Next.js + Cloud Run, visualization, filters) │
├─────────────────────────────────────────────────────┤
│              Retrieval and QA layer                  │
│    (Multimodal RAG, hybrid search, GraphRAG,         │
│     Agentic RAG, Re-ranking)                         │
├─────────────────────────────────────────────────────┤
│              Indexing and storage layer              │
│    (PostgreSQL+pgvector, Elasticsearch, vector DB,   │
│     CLIP embeddings, GCS)                            │
├─────────────────────────────────────────────────────┤
│            Data ingest and preprocessing pipeline    │
│    (OCR, ASR, keyframe extraction, metadata)         │
└─────────────────────────────────────────────────────┘
```

### 1. Data ingest and preprocessing pipeline

The stage that converts 1.2TB of mixed data into a form the AI can search. **Over 60% of the build effort** concentrates here.

**Automatic file-format detection.** Use Apache Tika or python-magic to determine MIME types. File extensions are frequently wrong, so magic-byte-based detection is mandatory. The detected format determines the downstream pipeline.

**Image / PDF → OCR.** Newspaper scans take the largest share. There are three options.

| OCR engine | Korean / Chosŏn-mal support | Characteristics | Cost |
|----------|-----------------|------|------|
| GCP Document AI | Excellent (native Korean) | Layout recognition, table extraction, GCP-native | $0.06/page (1,000+ pages) |
| Tesseract 5 | Moderate (Korean models exist, accuracy low) | Open source, free, custom training possible | Free (GPU infra cost only) |
| Mistral OCR | Excellent (multilingual strength) | Latest model, API-based, strong on complex layouts | ~$0.05/page |

For complex layouts like newspaper scans, GCP Document AI is the most stable. However, with low-resolution prints and old typefaces from the 1950s–60s, every OCR engine loses accuracy. In that case you need a three-stage pipeline: **preprocessing (binarization, skew correction, denoising) → OCR → postprocessing (spell correction, dictionary-based fix-ups)**.

**Audio / video → ASR (Automatic Speech Recognition).** Convert KCNA news, songs, speeches, and other audio into text.

| ASR engine | Korean accuracy | Characteristics |
|----------|------------|------|
| OpenAI Whisper (large-v3) | WER ~5% (standard Korean) | Open source, runs locally, weak on Chosŏn-mal accent |
| GCP Speech-to-Text v2 | WER ~4% (Korean) | GCP-native, real-time support, speaker diarization |

North Korean pronunciation and accent differ from South Korean. Whisper large-v3, as a general multilingual model, may lose accuracy on Chosŏn-mal. GCP Speech-to-Text is similar. The realistic remedies are **fine-tuning Whisper on Chosŏn-mal samples** or post-correcting ASR output with an LLM.

**Video keyframe extraction.** Use FFmpeg with scene-detection-based keyframe extraction. For news video, anchor changes and scene cuts are natural segmentation points. Extracted keyframes are embedded with CLIP for image search. If subtitles exist, parse SRT/VTT files into text.

**Metadata extraction and structuring.** All materials get metadata structured in YAML/JSON:

```yaml
source_id: "rodong-19950315-p2"
source_type: "newspaper_scan"
title: "로동신문 1995년 3월 15일 2면"
date: "1995-03-15"
language: "ko-KP"
media_type: "image/tiff"
ocr_engine: "document_ai"
ocr_confidence: 0.87
entities:
  - name: "김정일"
    type: "person"
    mentions: 12
  - name: "평양"
    type: "location"
    mentions: 5
file_path: "gs://archive-bucket/newspapers/1995/0315_p2.tiff"
text_path: "gs://archive-bucket/texts/1995/0315_p2.txt"
```

### 2. Indexing and storage layer

The stage that turns preprocessed data into searchable form. **A single store does not suffice.** Different query patterns demand different retrieval methods.

**Structured data: PostgreSQL + pgvector (or AlloyDB).** Store metadata, dates, sources, and entity information. SQL queries handle filters like "in 1990s *Rodong Sinmun*…" — period and outlet filtering. With the pgvector extension, the same database also supports vector similarity search. AlloyDB, GCP's managed PostgreSQL, is up to 10x faster than vanilla pgvector for vector search.

**Vector store: Vertex AI Vector Search or Milvus.** Store text and image embeddings. With more than a million vectors, you need a dedicated vector DB for millisecond retrieval.

| Vector DB | Characteristics | GCP compatibility |
|---------|------|---------|
| Vertex AI Vector Search | GCP-native, managed, ScaNN-based | Best |
| Milvus | Open source, self-hosted, varied indexes | Deploy on GKE |
| pgvector | PostgreSQL extension, no separate infrastructure | Better performance on AlloyDB |

Under a million vectors, pgvector is enough. Beyond that, Vertex AI Vector Search is the most convenient option in a GCP environment.

**Full-text search: Elasticsearch.** Handles BM25-based keyword search. It is essential for queries that need exact words like "self-reliance," for year-over-year frequency aggregations, and for morphological-analysis-based Korean search. Elastic Cloud on GCP provides a managed option. Hybrid search (BM25 + vector) can also be implemented entirely within Elasticsearch (Elasticsearch 8.x supports kNN search).

**Image embeddings: CLIP → vector DB.** OpenAI's CLIP model maps images and text into the same vector space. A text query like "photos of a military parade" can return the matching images — **cross-modal text-to-image retrieval**. CLIP alone is not enough for person-photo search. You need a separate face embedding via a model like **InsightFace (ArcFace)**, comparing cosine similarity to a reference photo of the specific person.

**Original files: GCS (Google Cloud Storage).** Keep the 1.2TB of original files in GCS. Search results link back to the originals so researchers can verify the source material directly. Standard storage runs around $25 per month.

### 3. Retrieval and QA layer

This layer is the heart of the system. It takes the researcher's natural-language question, chooses the right retrieval strategy, and synthesizes the result into an answer.

**Multimodal RAG pipeline.** Integrate text, images, and audio transcripts into a unified search. Gemini 2.0 Flash/Pro supports multimodal input natively, so retrieved images and text can be passed together as context.

**Hybrid search + Re-ranking.** Run BM25 (keyword) and vector search (semantic) in parallel, fuse the results via RRF (Reciprocal Rank Fusion), and re-rank the top results with a Cross-Encoder reranker. Enterprise deployment cases consistently report **15–30% precision improvements** from hybrid search alone, and **another 10–25%** from re-ranking.

**GraphRAG (people-organization-event relationship graph).** Relation-based questions like "how did the cast of people frequently appearing alongside Kim Jong Un change over time?" require a knowledge graph. Extract people, organizations, places, and events as nodes, and their relationships as edges. Use Neo4j or JanusGraph as the graph DB.

```
[김정일] ─(후계자)─→ [김정은]
[김정은] ─(참석)─→ [2012년 열병식]
[2012년 열병식] ─(장소)─→ [평양 김일성광장]
[리설주] ─(동반출석)─→ [2012년 열병식]
```

FalkorDB's benchmark shows accuracy on complex multi-hop reasoning questions of **34%** for standard RAG versus **91%** for GraphRAG. In a project where people-organization relationships are central, GraphRAG is not optional — it is required.

**Agentic RAG (decomposing complex questions).** "Analyze the change in reporting tone in the three months before and after Kim Jong Il's death" cannot be answered by a single search. The question has to be decomposed:

```
Original question: "shift in reporting tone, 3 months before and after Kim Jong Il's death"
    ↓ Agent decomposes
Step 1: identify Kim Jong Il's date of death → December 17, 2011
Step 2: retrieve articles for 2011.09–2012.03
Step 3: sentiment-analyze articles by period (positive / negative / neutral)
Step 4: visualize the time series and summarize the tonal shift
```

Implement these agentic workflows with LangGraph or Vertex AI Agent Builder. The agent decomposes the question, calls the appropriate tool (search, aggregation, analysis) for each sub-question, and synthesizes the result.

### 4. User interface

**Web UI (Next.js + Cloud Run).** An interface where researchers ask in natural language, inspect results, and apply filters (period, outlet, keyword). Deployed on Cloud Run, it auto-scales with usage.

**Visualization.** Most of the analyses researchers want include visualization.
- **Time-series charts:** word frequency, reporting volume trends (D3.js or Chart.js)
- **Network graphs:** people-organization relationship visualization (vis.js or Cytoscape.js)
- **Map visualization:** geographic distribution of mentioned place names (Mapbox or Google Maps)
- **Image gallery:** thumbnails of retrieved photos / keyframes + links to originals

---

## Core technology choices in detail

### LLM: Gemini 2.0 Flash / Pro

In a GCP-native environment, Gemini is the most natural choice. Flash for general queries that need fast responses, Pro for complex analysis and summarization. Native multimodal input means images and text can be handled together. The 1M-token context window is also useful for long-document analysis.

### Embedding models

| Model | Dimensions | Korean performance | Characteristics |
|------|------|-----------|------|
| text-embedding-004 (Google) | 768 | Excellent | GCP-native, Vertex AI integration |
| multilingual-e5-large | 1024 | Excellent | Open source, multilingual specialization |
| bge-m3 | 1024 | Excellent | Open source, sparse + dense hybrid |

In a GCP environment, text-embedding-004 is a single API call away. If self-hosting is required, multilingual-e5-large or bge-m3 are alternatives. bge-m3 generates both dense and sparse vectors simultaneously, which is especially useful for hybrid search.

### Graph DB: Neo4j vs. JanusGraph

| | Neo4j | JanusGraph |
|---|-------|-----------|
| Query language | Cypher (intuitive) | Gremlin (general-purpose) |
| Performance | Optimal for small to mid-size graphs | Strong at large distributed graphs |
| Hosting | Neo4j AuraDB (managed) | Self-operated on GKE |
| Community | Large, rich documentation | Relatively small |

If the people-organization-event graph has fewer than a few million nodes, Neo4j wins on developer productivity. Cypher is intuitive, and an LLM generating Cypher is generally more accurate than generating Gremlin.

### Face recognition: InsightFace / ArcFace

Answering "find other articles in which the person in this photo appears" requires face embeddings. InsightFace (ArcFace-based) is currently the best open-source face recognition stack available. Build a pipeline of face detection → alignment → 512-dimensional embedding → vector DB storage. Registering multiple reference photos of the same person from various angles and lighting conditions improves recognition rates.

That said, recognition accuracy degrades badly on black-and-white newspaper photos from the 1950s–70s. Resolution is low and print quality is uneven. **Image super-resolution preprocessing → face recognition** can help, but it is not a complete fix.

---

## Country-by-country precedents

Large multimedia archives are being made AI-searchable around the world.

### United States: Library of Congress — Chronicling America

The Library of Congress's Chronicling America project has digitized **more than 16 million pages of historical newspapers**. It used Tesseract OCR and NVIDIA GPU clusters for large-scale OCR. More recently it has added AI-based article segmentation and topic classification. In 2024, a custom-trained layout analysis model substantially improved accuracy at dividing newspaper pages into individual articles.

Lesson: **Article segmentation is a harder problem than OCR accuracy.** Newspapers pack multiple articles into a single page in complex arrangements, and figuring out where one article ends and the next begins is the core challenge.

### United Kingdom: British Library Newspaper Archive

One of the world's largest newspaper archives, with **40 million digitized pages**. It uses ABBYY OCR (commercial) and Elasticsearch-based full-text search. The recent Living with Machines project added AI-based Named Entity Recognition (NER) and time-series analysis, tracing the social changes of the 19th-century industrial revolution through newspaper text.

Lesson: **The limits of crowdsourced OCR correction.** Early on, users could correct OCR errors, but at 40 million pages that proved unrealistic. The project shifted to AI-based automatic correction.

### Australia: Trove (National Library of Australia)

Trove, run by the National Library of Australia, holds more than **300 million newspaper articles**. The most striking feature is its **crowdsourced OCR correction system**. Ordinary citizens can correct OCR text on the web, and to date **over 400 million lines** have been corrected. It is regarded as the most successful crowdsourced digital archive case in the world.

Lesson: **Community participation can be more effective than AI.** Particularly when domain experts (in this project's case, 13 North Korea researchers) join the correction process, the accuracy of specialized terms and context exceeds AI's. Including a correction interface in the system is recommended.

### Europe: Europeana

Europeana, which unifies cultural heritage across Europe, holds **58 million items** (images, text, audio, video). It adopted the IIIF (International Image Interoperability Framework) standard, allowing images from different institutions to be searched and displayed in a unified way. It has implemented AI-based automatic metadata generation and multilingual search.

Lesson: **The importance of a standardized metadata schema.** When integrating materials from many institutions, mismatched metadata formats crater search quality.

### Japan: National Diet Library digital archive

Japan's National Diet Library developed its own OCR model (NDL OCR), optimized for the peculiarities of Japanese text — vertical writing, mixed kanji/hiragana/katakana, and historical typefaces. **Millions of pages** of old books and newspapers have been digitized, and since 2023 AI-based full-text search has been introduced. The IIIF viewer presents original images and OCR text side by side.

Lesson: **A domain-specialized OCR model overwhelms a general one.** When you have special conditions — Chosŏn-mal typefaces, 1950s–60s print quality — fine-tuning is required.

### Korea: National Archives of Korea, the Academy of Korean Studies

The National Archives of Korea runs a digital archive of government records, and the Academy of Korean Studies is digitizing Korean studies materials such as old documents and clan genealogies. In many cases they still rely on traditional metadata-based search rather than AI search. Recent advances in Korean-specialized LLMs and OCR are accelerating AI search adoption.

### Israel: National Library of Israel

Working on AI-based searchability for multilingual, multi-script materials in Hebrew, Arabic, Yiddish, and other languages. Multilingual OCR and crosslingual search are central challenges, sharing many of the difficulties this project faces (mixed Korean/Chosŏn-mal, printing of different eras).

### Ukraine: Osavul

Osavul is an **AI system that monitors and analyzes propaganda media from authoritarian states, including North Korea, in real time**. It collects text, images, and video, detects propaganda patterns, and tracks narrative shifts. It is the case most directly comparable in purpose to this project.

Lesson: **Real-time monitoring and archive analysis need different architectures.** Osavul is centered on streaming pipelines; this project is centered on batch processing plus search. But the propaganda-analysis methodology — narrative extraction, sentiment analysis, person-network analysis — is well worth referencing.

---

## Cost estimate

### Initial build cost (6–12 months)

| Item | Estimated cost | Basis |
|------|----------|----------|
| OCR processing | ~$60,000 | 1M pages × $0.06/page (Document AI) |
| ASR processing | ~$5,000 | Several hundred hours of video/audio |
| Embedding generation | ~$3,000 | Millions of chunks × text-embedding-004 |
| Face embedding generation | ~$2,000 | GPU instance costs (InsightFace) |
| Graph construction (NER + relation extraction) | ~$10,000 | LLM API costs (entity / relation extraction) |
| Infrastructure setup + development labor | $150,000–300,000 | Full-time engineers 2–3 × 6–9 months |
| **Total initial cost** | **$230,000–$380,000** | |

To cut OCR costs, a two-stage strategy is feasible: Tesseract (free) first → reprocess only low-confidence pages with Document AI. Running Tesseract over everything and sending only pages with OCR confidence below 0.7 to Document AI can cut costs by **40–60%**.

### Monthly operating cost

| Item | Monthly cost | Notes |
|------|--------|------|
| GCS storage (1.2TB) | ~$25 | Standard storage |
| Vertex AI Vector Search | $500–2,000 | Varies with index size and query volume |
| Elasticsearch (Elastic Cloud) | $500–1,000 | Based on a 3-node cluster |
| Cloud Run (API server + UI) | $100–300 | Usage-based billing |
| Neo4j AuraDB | $200–500 | Graph DB |
| LLM API (Gemini) | $500–2,000 | Varies with daily query count |
| Monitoring + logging | $100–200 | Cloud Monitoring |
| **Total monthly cost** | **$1,900–$6,000** | |

If 13 researchers issue 20–50 queries each per day on average, monthly costs land in the $2,000–3,000 range. As query volume grows, LLM API spend becomes the dominant variable. Using Gemini Flash by default and routing only complex analytical queries to Pro is a good way to optimize cost.

---

## Build timeline

```
Phase 1 (1–2 months): Data preprocessing pipeline
├── File-format detection + automatic classification
├── OCR pipeline (Document AI + Tesseract)
├── ASR pipeline (Whisper)
├── Keyframe extraction pipeline
└── Metadata schema design + extraction

Phase 2 (2–3 months): Indexing + search engine
├── PostgreSQL + pgvector setup
├── Elasticsearch index design + data loading
├── Vector embedding generation + Vertex AI Vector Search
├── CLIP image embeddings + face embeddings
├── Neo4j graph construction (NER + relation extraction)
└── Hybrid search + re-ranking pipeline

Phase 3 (1–2 months): RAG + LLM QA
├── Implement multimodal RAG pipeline
├── Agentic RAG (question decomposition + multi-step retrieval)
├── GraphRAG query routing
└── Evaluation framework (RAGAS)

Phase 4 (1–2 months): UI + visualization + testing
├── Next.js web UI development
├── Visualization components (time series, network, map)
├── Incorporate researcher feedback
└── Performance optimization + load testing

Total estimate: 6–9 months
```

Phase 1 is the most important. **OCR quality determines the precision of the entire system.** Text the OCR misread amplifies errors in every later stage — embedding, retrieval, answer generation. Invest enough time in Phase 1, and run sample audits of the OCR output together with the researchers.

Phases 2 and 3 can partially run in parallel. Elasticsearch indexing and vector DB construction are independent and can proceed simultaneously.

---

## Key lessons

**1. Data preprocessing is 60% of the work.** Which LLM you use and which vector DB you pick matter less than OCR accuracy, metadata quality, and chunking strategy when it comes to final precision. As Gartner warned, "60% of AI projects with AI-unready data will be abandoned." Invest in the data pipeline first.

**2. Multimodal means a more complex pipeline.** A RAG that handles only text becomes 3–4x more complex once images, audio, and video are added. Each modality has its own preprocessing → embedding → indexing path. Don't try to build all modalities at once; **finish text search first → add image search → add audio / video search** is a more realistic, incremental approach.

**3. The researcher feedback loop determines precision.** Domain experts are essential for OCR correction, search result evaluation, and entity verification. As with Trove's crowdsourced correction model, the system should include a correction interface from the start, so researchers can fix errors as they use it. With 13 researchers participating in correction, system accuracy will improve over time.

**4. No evaluation, no improvement.** Combine automated RAGAS-based evaluation with subjective evaluation by researchers. Continuously monitor retrieval precision (Context Precision), answer groundedness (Groundedness), and answer relevance (Answer Relevance) — that is how you diagnose at which stage the system is failing.

**5. Cost varies sharply by query pattern.** If 13 researchers each send a few dozen queries a day, $2,000–3,000 per month is plenty. But if you frequently run large batch analyses — sentiment analysis over the entire archive, for instance — LLM API costs spike. Optimize batch analyses with Gemini Flash + batch APIs, and cache results for reuse.

The era when turning a 1.2TB multimedia archive into an AI search system is technically feasible has arrived. OCR, ASR, multimodal embeddings, GraphRAG, Agentic RAG — every individual technology is mature. The real challenge is integrating them into a single system and continuously improving precision — **engineering and operations** are where the difficulty really lives.

---

### References

- [GCP Document AI](https://cloud.google.com/document-ai)
- [Vertex AI Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/overview)
- [OpenAI Whisper](https://github.com/openai/whisper)
- [InsightFace / ArcFace](https://github.com/deepinsight/insightface)
- [OpenAI CLIP](https://github.com/openai/CLIP)
- [Microsoft GraphRAG](https://www.microsoft.com/en-us/research/project/graphrag/)
- [FalkorDB GraphRAG Benchmark](https://www.falkordb.com/blog/graphrag-accuracy-diffbot-falkordb/)
- [Anthropic Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Library of Congress Chronicling America](https://chroniclingamerica.loc.gov/)
- [British Library Newspaper Archive](https://www.bl.uk/collection-guides/newspaper-collections)
- [Trove — National Library of Australia](https://trove.nla.gov.au/)
- [Europeana](https://www.europeana.eu/)
- [国立国会図書館デジタルコレクション](https://dl.ndl.go.jp/)
- [Osavul — Propaganda Analysis](https://osavul.cloud/)
- [RAGAS Framework](https://docs.ragas.io/)
- [Neo4j](https://neo4j.com/)
- [Elasticsearch](https://www.elastic.co/)
