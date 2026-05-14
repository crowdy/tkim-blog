---
title: 'Building an AI Search System for a 1.2TB Multimedia Archive'
description: '"When does the term ''bubble economy'' first appear in this broadcaster''s archive? How does the editorial tone shift before and after?"'
pubDate: 2026-03-07T07:23:41.491Z
lang: en
pairSlug: 'multimedia-search-ai-system-2'
draft: false
---
# Building an AI Search System for a 1.2TB Multimedia Archive

> "When does the term 'bubble economy' first appear in this broadcaster's archive? How does the editorial tone shift before and after?"

Answering this question requires converting decades of broadcast recordings and newspaper scan images into text, sorting them chronologically, tracking keywords, and analyzing tonal shifts. You can't solve it by typing keywords into a Google search box.

There is a 1.2TB historical archive from a Japanese broadcaster. News broadcast recordings, newspaper clippings, documentary footage, radio recordings, photographs, blog archives — a tangle of different formats. Thirteen media researchers laid out the questions they might ask of this material. Keyword search, time-series analysis, person-photo search, place-photo search, translation, word-frequency analysis, compound-condition search — a scope that no single search engine can cover.

This piece organizes a methodology for turning that kind of multimedia archive into an AI search system on GCP. It covers architecture, technology selection, country-by-country precedents, cost, and build timeline.

---

## Why a simple search engine isn't enough

Look at a slice of the questions the researchers proposed.

- "Show me the year-by-year frequency of the term 'economic growth' in 1980s NHK news."
- "Find other news footage featuring the person in this photograph."
- "Analyze the change in editorial tone over the three months before and after the Great East Japan Earthquake."
- "Plot the place names mentioned in this documentary on a map."
- "Extract only the scenes from the news program where a particular anchor appears."

These questions have one thing in common: **a single search query won't answer them**. They cross multiple modalities (text, image, audio, video), require time-axis analysis, and sometimes demand multi-step reasoning. Throwing the text into Elasticsearch and running a BM25 search wouldn't handle even half of them.

What's needed is a **multimodal RAG (Retrieval-Augmented Generation) system** — a pipeline that ingests data in varied formats into a unified index, decomposes natural-language questions, searches and analyzes in stages, and then synthesizes a final answer.

---

## End-to-end system architecture

The system has four layers.

```
┌─────────────────────────────────────────────────────┐
│                  User Interface                      │
│       (Next.js + Cloud Run, visualizations, filters) │
├─────────────────────────────────────────────────────┤
│            Search & Q&A Layer                        │
│    (Multimodal RAG, hybrid search, GraphRAG,         │
│     Agentic RAG, re-ranking)                         │
├─────────────────────────────────────────────────────┤
│            Indexing & Storage Layer                  │
│    (PostgreSQL+pgvector, Elasticsearch, vector DB,   │
│     CLIP embeddings, GCS)                            │
├─────────────────────────────────────────────────────┤
│         Data Ingestion & Preprocessing Pipeline      │
│    (OCR, ASR, keyframe extraction, metadata)         │
└─────────────────────────────────────────────────────┘
```

### 1. Data ingestion and preprocessing pipeline

This is the stage that converts 1.2TB of mixed data into something an AI can search. **More than 60% of the total effort** goes here.

**Automatic file-format detection.** Use Apache Tika or python-magic to determine MIME type. Extensions are often wrong, so magic-byte detection is essential. The downstream pipeline branches based on the detected format.

**Image/PDF → OCR.** Newspaper scan images take the largest share. Three choices:

| OCR engine | Japanese/Korean support | Notes | Cost |
|----------|-----------------|------|------|
| GCP Document AI | Excellent (native Japanese/Korean) | Layout recognition, table extraction, GCP-native | $0.06/page (1,000+ pages) |
| Tesseract 5 | Moderate (Japanese/Korean models exist; accuracy low) | Open source, free, custom training possible | Free (GPU infra cost only) |
| Mistral OCR | Excellent (strong multilingual) | Latest model, API-based, strong on complex layouts | ~$0.05/page |

For complex layouts like newspaper scans, GCP Document AI is the most reliable. That said, no OCR holds up well on 1950s–60s newsprint with low resolution and dated typefaces. There you need a three-stage pipeline: **preprocessing (binarization, deskew, denoising) → OCR → postprocessing (spell correction, dictionary-based fix-up)**.

**Audio/video → ASR (Automatic Speech Recognition).** Converts news broadcasts, radio recordings, documentaries, and similar audio into text.

| ASR engine | Japanese accuracy | Notes |
|----------|------------|------|
| OpenAI Whisper (large-v3) | WER ~5% (standard Japanese) | Open source, locally executable, assumes high-quality audio |
| GCP Speech-to-Text v2 | WER ~4% (Japanese) | GCP-native, real-time support, speaker diarization |

Old broadcast recordings from the 1960s–70s have poor audio quality, and the vocabulary and speech patterns of the era differ from today. Announcer delivery styles have changed across decades as well. Whisper large-v3, being a general-purpose multilingual model, may struggle on historical audio. GCP Speech-to-Text faces the same problem. A realistic fix is **fine-tuning Whisper on broadcast audio samples from the relevant era**, or post-correcting ASR output with an LLM.

**Video keyframe extraction.** Use FFmpeg to extract keyframes via scene detection. For news footage, anchor handoffs and cuts are natural segmentation points. The extracted keyframes are embedded with CLIP for image search. Where subtitles exist, parse SRT/VTT files into text.

**Metadata extraction and structuring.** Structure metadata for every asset in YAML/JSON like so:

```yaml
source_id: "nhk-news-19950315-seg2"
source_type: "tv_broadcast"
title: "NHK News 1995-03-15 second segment"
date: "1995-03-15"
language: "ja"
media_type: "video/mp4"
ocr_engine: "whisper_large_v3"
ocr_confidence: 0.87
entities:
  - name: "阪神大震災"
    type: "event"
    mentions: 8
  - name: "神戸"
    type: "location"
    mentions: 5
  - name: "村山富市"
    type: "person"
    mentions: 3
file_path: "gs://archive-bucket/broadcasts/1995/nhk_0315_seg2.mp4"
text_path: "gs://archive-bucket/texts/1995/nhk_0315_seg2.txt"
```

### 2. Indexing and storage layer

The stage that stores the preprocessed data in a searchable form. **No single store can do it**, because different query types demand different search paradigms.

**Structured data: PostgreSQL + pgvector (or AlloyDB).** Holds metadata, dates, sources, entity information. SQL filters questions like "in 1980s NHK news…" by time and outlet. The pgvector extension also lets you do vector similarity search in the same DB. AlloyDB is GCP's managed PostgreSQL and delivers vector search up to 10× faster than vanilla pgvector.

**Vector store: Vertex AI Vector Search or Milvus.** Holds text and image embeddings. With over a million vectors needing millisecond-latency queries, you need a dedicated vector DB.

| Vector DB | Notes | GCP fit |
|---------|------|---------|
| Vertex AI Vector Search | GCP-native, managed, ScaNN-based | Optimal |
| Milvus | Open source, self-hostable, varied index types | Deploy on GKE |
| pgvector | PostgreSQL extension, no extra infra | Better performance on AlloyDB |

Under a million vectors, pgvector is enough. Above that, Vertex AI Vector Search is the most convenient on GCP.

**Full-text search: Elasticsearch.** Owns BM25 keyword search. Essential for queries seeking the exact word "economic growth", yearly frequency aggregations, and morphological analysis of Japanese/Korean. Elastic Cloud on GCP gives you a managed deployment. You can also implement hybrid search (BM25 + vector) in a single Elasticsearch system (8.x supports kNN search).

**Image embeddings: CLIP → vector DB.** OpenAI's CLIP maps images and text into the same vector space. **Text-to-image cross-modal search** becomes possible — a text query "photo of a protest in front of the National Diet Building" returns matching images. CLIP alone isn't enough for person-photo search. You need a face recognition model like **InsightFace (ArcFace)** to generate separate face embeddings and compare cosine similarity against reference photos of a specific person.

**Originals: GCS (Google Cloud Storage).** Keep the 1.2TB of original files in GCS. Search results link to the original so researchers can verify the source directly. Standard storage runs around $25/month.

### 3. Search and Q&A layer

This layer is the heart of the system. It takes a researcher's natural-language question, picks an appropriate search strategy, and synthesizes an answer.

**Multimodal RAG pipeline.** Searches text, images, and audio transcripts as one. Because Gemini 2.0 Flash/Pro natively accepts multimodal input, retrieved images and text can be passed together as context.

**Hybrid search + re-ranking.** Run BM25 (keyword) and vector search (semantic) in parallel, fuse results with RRF (Reciprocal Rank Fusion), then reorder the top results with a cross-encoder re-ranker. Enterprise deployments report **15–30% precision gains** from hybrid search alone, with re-ranking adding **another 10–25%**.

**GraphRAG (person–organization–event relationship graph).** Relationship-driven questions like "How did the political network around Kakuei Tanaka shift?" demand a knowledge graph. People, organizations, places, and events extracted from documents become nodes; their relationships become edges. Neo4j or JanusGraph serve as the graph DB.

```
[田中角栄] ─(took office)─→ [1972年 組閣]
[1972年 組閣] ─(location)─→ [National Diet Building]
[田中角栄] ─(related)─→ [日中国交正常化]
[日中国交正常化] ─(counterpart)─→ [中華人民共和国]
```

FalkorDB's benchmarks show standard RAG hitting **34%** accuracy on complex multi-hop reasoning questions, while GraphRAG hits **91%**. For a project where person–organization relationships are central, GraphRAG is mandatory, not optional.

**Agentic RAG (compound question decomposition).** "Analyze the change in editorial tone over the three months before and after the Great East Japan Earthquake (2011-03-11)" can't be answered by a single search. It needs to decompose like this:

```
Original question: "Editorial tone shift 3 months before/after the Great East Japan Earthquake"
    ↓ Agent decomposes
Step 1: Identify date of earthquake → 2011-03-11
Step 2: Retrieve articles and broadcasts for 2010-12 to 2011-06
Step 3: Sentiment analysis by period (positive/negative/neutral)
Step 4: Time-series visualization and tone-shift summary
```

LangGraph or Vertex AI Agent Builder is how you implement that agentic workflow. The agent decomposes the question, invokes the right tools (search, aggregation, analysis) for each sub-question, and synthesizes the results.

### 4. User interface

**Web UI (Next.js + Cloud Run).** An interface where researchers ask in natural language, view results, and apply filters (period, outlet, keyword). Deployed on Cloud Run, it scales automatically with usage.

**Visualization.** Most analyses the researchers ask for include visualization.
- **Time-series charts**: word-frequency shifts, coverage volume trends (D3.js or Chart.js)
- **Network graphs**: person–organization relationships (vis.js or Cytoscape.js)
- **Map visualizations**: geographic distribution of mentioned places (Mapbox or Google Maps)
- **Image galleries**: thumbnails of retrieved photos/keyframes plus links to originals

---

## Core technology choices, in detail

### LLM: Gemini 2.0 Flash / Pro

In a GCP-native environment, Gemini is the most natural choice. Flash for general queries that demand fast responses; Pro for complex analysis and summarization. Native multimodal input means images and text get processed together. The million-token context window also helps when analyzing long documents.

### Embedding models

| Model | Dim | Japanese/Korean performance | Notes |
|------|------|-----------|------|
| text-embedding-004 (Google) | 768 | Excellent | GCP-native, Vertex AI integrated |
| multilingual-e5-large | 1024 | Excellent | Open source, multilingual-focused |
| bge-m3 | 1024 | Excellent | Open source, sparse+dense hybrid |

On GCP, text-embedding-004 is a one-line API call away. If you need self-hosting, multilingual-e5-large or bge-m3 are alternatives. bge-m3 generates dense and sparse vectors simultaneously, which is especially handy for hybrid search.

### Graph DB: Neo4j vs JanusGraph

| | Neo4j | JanusGraph |
|---|-------|-----------|
| Query language | Cypher (intuitive) | Gremlin (general-purpose) |
| Performance | Optimal for small-to-medium graphs | Strong on large distributed graphs |
| Hosting | Neo4j AuraDB (managed) | Self-run on GKE |
| Community | Large, rich documentation | Comparatively smaller |

If the person–organization–event graph stays under a few million nodes, Neo4j has the edge on developer productivity. Cypher queries are intuitive, and LLMs generate Cypher more accurately than Gremlin.

### Face recognition: InsightFace / ArcFace

To handle "find other news footage with the person in this photo," face embeddings are needed. InsightFace (based on ArcFace) is currently the top open-source face-recognition model. Build a pipeline of face detection → alignment → 512-dim embedding generation → store in vector DB. Registering multiple reference photos of the same person improves recognition across angles and lighting.

That said, face recognition on 1950s–70s black-and-white newspaper photos drops sharply in accuracy. Resolution is low and print quality is uneven. A **super-resolution preprocessing → face recognition** pipeline helps but isn't a complete fix.

---

## Country-by-country precedents

Attempts to make large multimedia archives AI-searchable are underway worldwide.

### United States: Library of Congress — Chronicling America

The Library of Congress's Chronicling America project has digitized **more than 16 million pages of historical newspapers**. Large-scale OCR ran on Tesseract and NVIDIA GPU clusters. Recently, AI-based article segmentation and topic classification have been added. In 2024, an in-house-trained layout analysis model dramatically improved the accuracy of splitting newspaper pages into individual articles.

Lesson: **Article segmentation is a harder problem than OCR accuracy**. A newspaper page has many articles laid out in complex arrangements, and figuring out where one article ends and the next begins is the core challenge.

### United Kingdom: British Library Newspaper Archive

One of the world's largest newspaper archives, with **40 million pages digitized**. It uses ABBYY OCR (commercial) and Elasticsearch-based full-text search. Recently, the Living with Machines project added AI-driven Named Entity Recognition (NER) and time-series analysis, using newspaper text to track social change during the 19th-century Industrial Revolution.

Lesson: **The limits of crowdsourced OCR correction**. Early on, users were asked to correct OCR errors, but at 40 million pages it was unrealistic. The system has shifted to AI-based automatic correction.

### Australia: Trove (National Library of Australia)

Trove is the National Library of Australia's digital archive, holding **more than 300 million newspaper articles**. The most notable element is its **crowdsourced OCR correction system**. Ordinary citizens can correct OCR text on the web, and **over 400 million lines** have been corrected to date. It's considered the world's most successful crowdsourced digital archive.

Lesson: **Community participation can outperform AI**. Especially when domain experts (in this project, the 13 media researchers) participate in correction, accuracy on technical terminology and context surpasses AI. Building a correction interface into the system is strongly recommended.

### Europe: Europeana

Europeana unifies cultural heritage across Europe, holding **58 million items** (images, text, audio, video). Adopting the IIIF (International Image Interoperability Framework) standard, images from different institutions can be searched and displayed together. AI-driven metadata generation and multilingual search are both implemented.

Lesson: **The importance of standardized metadata schemas**. When pooling materials from multiple institutions, mismatched metadata formats tank search quality.

### Japan: National Diet Library digital archive

Japan's National Diet Library developed its own OCR model (NDL OCR), optimized for Japanese-specific challenges — vertical writing, mixed kanji/hiragana/katakana, historical typefaces. **Millions of pages** of old books and newspapers have been digitized, with AI-based full-text search introduced from 2023. An IIIF viewer lets you view source images alongside OCR text.

Lesson: **Domain-specific OCR models dominate general-purpose ones**. If you face conditions like historical Japanese typefaces or 1950s–60s print quality, fine-tuning is essential.

### Korea: National Archives, Academy of Korean Studies

The National Archives runs a digital archive of government records, and the Academy of Korean Studies is digitizing classical documents and genealogies. Many systems remain on traditional metadata-based search rather than AI. Recent advances in Korean-specialized LLMs and OCR are accelerating AI search adoption.

### Israel: National Library of Israel

A project to make Hebrew, Arabic, Yiddish, and other multilingual/multi-script materials AI-searchable is underway. Multilingual OCR and cross-lingual search are the core challenges — sharing the same difficulties as this project (Japanese/Korean mixing, varied period typefaces).

### France: INA (Institut national de l'audiovisuel)

INA is **the institution legally mandated to collect and preserve all French TV and radio broadcasts**, archiving everything aired since 1995. Its holdings reach **millions of hours**, and it actively uses AI-driven speech recognition, face recognition, and automated metadata generation. The system that automatically identifies people in broadcasts and transcribes speech to enable full-text search is structurally the closest analog to this project.

Lesson: **Large broadcast archives can't maintain metadata without automation**. INA ingests hundreds of new broadcast hours daily, making AI-based auto-tagging and indexing indispensable. Copyright management and access control are also broadcast-archive-specific challenges. Different access scopes apply to researchers, the general public, and broadcasters, so the search system needs fine-grained permission controls built in.

---

## Cost estimates

### Initial build cost (6–12 months)

| Item | Estimated cost | Basis |
|------|----------|----------|
| OCR processing | ~$60,000 | 1M pages × $0.06/page (Document AI) |
| ASR processing | ~$5,000 | Several hundred hours of video/audio |
| Embedding generation | ~$3,000 | Millions of chunks × text-embedding-004 |
| Face embedding generation | ~$2,000 | GPU instance cost (InsightFace processing) |
| Graph construction (NER + relation extraction) | ~$10,000 | LLM API cost (entity/relation extraction) |
| Infra setup + engineering labor | $150,000–300,000 | 2–3 full-time engineers × 6–9 months |
| **Total initial cost** | **$230,000–$380,000** | |

To trim OCR cost, a two-stage strategy works: first-pass Tesseract (free), then re-process only low-confidence pages with Document AI. Running Tesseract on the full corpus and sending only pages with confidence below 0.7 to Document AI can **cut cost by 40–60%**.

### Monthly operating cost

| Item | Monthly cost | Notes |
|------|--------|------|
| GCS storage (1.2TB) | ~$25 | Standard storage |
| Vertex AI Vector Search | $500–2,000 | Varies with index size and query volume |
| Elasticsearch (Elastic Cloud) | $500–1,000 | 3-node cluster |
| Cloud Run (API server + UI) | $100–300 | Usage-based |
| Neo4j AuraDB | $200–500 | Graph DB |
| LLM API (Gemini) | $500–2,000 | Varies with daily query volume |
| Monitoring + logging | $100–200 | Cloud Monitoring |
| **Total monthly cost** | **$1,900–$6,000** | |

If 13 researchers send roughly 20–50 queries per day on average, you can operate in the $2,000–3,000/month range. If query volume spikes, LLM API spend becomes the biggest variable. Defaulting to Gemini Flash and routing only complex analytical queries to Pro optimizes cost.

---

## Build timeline

```
Phase 1 (1–2 months): Data preprocessing pipeline
├── File-format detection + classification automation
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

Phase 3 (1–2 months): RAG + LLM Q&A
├── Multimodal RAG pipeline
├── Agentic RAG (question decomposition + staged retrieval)
├── GraphRAG query routing
└── Evaluation framework (RAGAS)

Phase 4 (1–2 months): UI + visualization + testing
├── Next.js web UI development
├── Visualization components (time series, network, map)
├── Researcher feedback incorporation
└── Performance optimization + load testing

Total estimate: 6–9 months
```

Phase 1 matters most. **OCR quality determines the precision of the whole system**. Text misread by OCR amplifies errors in embedding, retrieval, and generation. Invest enough time in Phase 1 and have researchers review samples of the OCR output with you.

Phase 2 and Phase 3 can run partially in parallel. Elasticsearch indexing and vector DB construction are independent and can proceed simultaneously.

---

## Key lessons

**1. Data preprocessing is 60% of the work.** Which LLM you pick or which vector DB you use matters less to final precision than OCR accuracy, metadata quality, and chunking strategy. As Gartner warned, "60% of AI projects with AI-unready data will be abandoned." Invest in the data pipeline first.

**2. Multimodal complicates the pipeline.** A RAG system handling only text grows 3–4× more complex once images, audio, and video are added. Each modality has its own preprocessing → embedding → indexing path. Don't try to ship every modality at once. Sequentially expand: **text search first → add image search → add audio/video search**.

**3. The researcher feedback loop determines precision.** Domain-expert feedback is essential for OCR correction, search-result evaluation, and entity validation. Like Trove's crowdsourced correction model, the interface for researchers to correct errors as they use the system must be built in from day one. With 13 researchers participating in correction, accuracy improves over time.

**4. Without evaluation, no improvement.** Run RAGAS-based automatic evaluation in parallel with subjective researcher evaluation. You need to continuously monitor Context Precision, Groundedness, and Answer Relevance to diagnose where the system fails.

**5. Cost varies sharply with query patterns.** With 13 researchers sending a few dozen queries a day, you can operate on $2,000–3,000/month. But heavy batch analyses (e.g., sentiment analysis across the entire archive) drive LLM API costs through the roof. Use Gemini Flash + batch API for batch work, and cache results for reuse.

Turning a 1.2TB multimedia archive into an AI search system is technically feasible in this era. OCR, ASR, multimodal embeddings, GraphRAG, Agentic RAG — every individual technology has matured. The real challenge is in the **engineering and operations** of integrating these into one coherent system and continuously improving precision.

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
- [INA — Institut national de l'audiovisuel](https://www.ina.fr/)
- [RAGAS Framework](https://docs.ragas.io/)
- [Neo4j](https://neo4j.com/)
- [Elasticsearch](https://www.elastic.co/)
