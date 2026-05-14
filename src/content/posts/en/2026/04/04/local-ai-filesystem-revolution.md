---
title: 'The Quiet Revolution of Local AI — The Filesystem That Replaced RAG, and Gemma 4 Running on My Laptop'
description: 'During the first week of April 2026, three events broke at once. Mintlify ripped out RAG and replaced it with a virtual filesystem; Google released Gemma 4 under Apache 2.0; Ollama embraced Apple MLX and doubled inference speed. Each is independent news. But lined up together, one direction emerges — AI is coming down from the cloud.'
pubDate: 2026-04-04T01:41:42.186Z
lang: en
pairSlug: 'local-ai-filesystem-revolution'
draft: false
---
# The Quiet Revolution of Local AI — The Filesystem That Replaced RAG, and Gemma 4 Running on My Laptop

> During the first week of April 2026, three events broke at once. Mintlify ripped out RAG and replaced it with a virtual filesystem; Google released Gemma 4 under Apache 2.0; Ollama embraced Apple MLX and doubled inference speed. Each is independent news. But lined up together, one direction emerges — AI is coming down from the cloud.

---

## 1. The Company That Ripped Out RAG — Mintlify's Experiment

Mintlify is a developer documentation platform. It hosts API documentation for thousands of companies and layers an AI assistant on top so users can question the docs in natural language. More than 30,000 conversations happen daily. At this scale, RAG (Retrieval-Augmented Generation) was the obvious choice. They did indeed start with RAG.

The problem was not that RAG "did not work well," but that it "pretended to work well." RAG retrieves the top-K chunks semantically close to the query and hands them to the model. It works well at the level of FAQs. Ask "how to set up OAuth" and the relevant chunks come up. But the way developers actually use documentation is different. They look for the exact code construct, weave context across many pages, and follow the directory structure to reach the information they want. Embedding cosine similarity cannot capture this workflow. If the answer is not in top-K, you are done.

The Mintlify team asked a fundamental question. "Instead of handing chunks to the agent, what if we let the agent navigate the docs itself?" The tools developers use to explore a codebase — `ls`, `cat`, `grep`, `find` — could be used to explore documentation too. That was the starting point of ChromaFs.

---

## 2. ChromaFs — A Vector DB Shaped Like a Filesystem

ChromaFs is not a "real" filesystem. It is a virtualization layer that intercepts UNIX commands and converts them into Chroma vector DB calls. From the agent's perspective it looks like a normal filesystem, but underneath the calls turn into vector DB queries.

The core idea is simple. Each page of documentation maps to a file, each section to a directory. When the agent runs `ls /auth/`, it gets a list of authentication-related docs; running `cat /auth/oauth.mdx` returns the full content of that document. Running `grep -r "rate limit" /api-reference/` searches the entire API reference for rate limit related phrases.

The technically interesting part is the layered implementation. ChromaFs is built on top of Vercel Labs' [just-bash](https://github.com/nicholasgasior/just-bash). just-bash is bash reimplemented in TypeScript, where the filesystem interface (`IFileSystem`) can be swapped via plugins. ChromaFs intercepts this interface to translate all filesystem calls into vector DB queries.

The directory structure is stored gzip-compressed as JSON inside a Chroma collection:

```json
{
  "auth/oauth": { "isPublic": true, "groups": [] },
  "api-reference/users": { "isPublic": true, "groups": [] },
  "internal/billing": { "isPublic": false, "groups": ["admin", "billing"] }
}
```

At initialization, this tree is expanded in memory and held as a `Set<string>` (file paths) and a `Map<string, string[]>` (directory → children). Thanks to this, structural traversal commands like `ls`, `cd`, and `find` are processed locally without network calls. Actual DB queries are only needed for `cat` (read a file) and `grep` (search content).

The optimization for `grep` is also worth noting. Recursive grep is handled with two-stage filtering. Stage one parses grep flags and converts them into Chroma queries (fixed strings as `$contains`, patterns as `$regex`) to narrow the candidate files. Stage two batch-prefetches the matched chunks via Redis and then rewrites the grep command to target only those files, executing in-memory. Recursive search across tens of thousands of documents completes in milliseconds.

The performance difference is dramatic:

| Metric | Existing Sandbox | ChromaFs |
|------|-------------|----------|
| P90 session creation | ~46 seconds | ~100ms |
| Marginal cost per conversation | ~$0.0137 | ~$0 (reuse existing DB) |
| Search method | Disk linear scan | DB metadata query |
| Annual cost (850K conversations) | $70,000+ | Absorbed into existing infra cost |

Session creation went from 46 seconds to 100 milliseconds — 460x faster. Marginal cost effectively became zero. This is not a simple performance improvement; it is the result of an architectural shift.

---

## 3. "Isn't That Still RAG?" — The HN Counterargument

When this post hit 217 points on Hacker News, [a lively debate](https://news.ycombinator.com/item?id=47618223) followed. The sharpest critique was this: "ChromaFs still queries Chroma DB. Did it really 'replace' RAG, or did it merely layer an abstraction on top of RAG?"

A fair point. A vector DB still runs behind ChromaFs. What has changed is not the retrieval engine but the **interface between the agent and the data**. RAG is the pattern of "automatically delivering semantically close chunks." ChromaFs is the pattern of "providing a structure the agent can navigate directly." Even using the same DB, the agent's level of autonomy is fundamentally different.

One HN comment captured this well: in a codebase of more than 400 Python files, replacing embedding-based RAG with filesystem navigation produced this outcome — "the agent figured out the module structure in 30 seconds, and started requesting the necessary files by path directly."

Why is this possible? LLMs were trained extensively on GitHub and UNIX environments. `grep`, `ls`, `cat` are tools the model already understands deeply. Providing a filesystem interface is a design that maximizes the model's existing capabilities. By contrast, RAG's top-K retrieval is a structure where the model is "passively spoon-fed." The model cannot control what gets surfaced.

Of course, the counterargument is also valid. This approach only works when documentation is already well structured. Mintlify is a developer documentation platform — its docs are neatly organized into directories and pages. This method does not apply to unstructured data, conversation logs, or piles of PDFs. One HN skeptic put it accurately: "Trying to apply this method to data that isn't hierarchical or partitionable becomes a very hard fight."

Even so, the question this experiment raises is important. **Will we hand the answer to the agent, or let it find one itself?** The LLMs of 2026 have become smart enough to find on their own. The question is whether we are providing interfaces that match that capability.

---

## 4. Gemma 4 — A Five-Minute Briefing for the Uninitiated

In the same week as the debate over RAG's future, Google DeepMind [released Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/). Gemma is Google's open model brand. If Gemini is Google's commercial AI, Gemma is the channel through which that technology flows down as open source. Gemma 4 is built with the same technology as Gemini 3.

For those unfamiliar, here are the essentials.

**Four-model lineup:**

| Model | Active params | Total params | Context Window | Input modalities |
|------|-------------|-------------|----------------|-------------|
| E2B | 2.3B | 5.1B | 128K | Text, image, audio |
| E4B | 4.5B | 8B | 128K | Text, image, audio |
| 26B-A4B (MoE) | 3.8B | 25.2B | 256K | Text, image, video |
| 31B (Dense) | 30.7B | 30.7B | 256K | Text, image, video |

"Active parameters" is the key. 26B-A4B has 25.2B total parameters, but only 3.8B are actually used per inference. This is thanks to the Mixture-of-Experts (MoE) architecture. Multiple experts are kept around, and only those needed for the input are activated. It achieves 97% of the quality of the 31B Dense model with far less computation.

The smaller models cannot be dismissed either. E2B, with 2.3B active parameters, generates 7.6 tokens per second on a Raspberry Pi 5 when 2-bit quantized. It runs on smartphones too.

**Architectural innovation:** Gemma 4 introduced a structure called Alternating Attention. Layers alternate between local sliding-window attention (512–1024 tokens) and global full-context attention. The design says: handle nearby context efficiently, distant context accurately. Add Dual RoPE — standard rotary position embedding for sliding-window layers and proportional RoPE for global layers — and it works without quality degradation even at a 256K context window.

**Benchmarks:** On the 31B Dense, [AIME 2026](https://wavespeed.ai/blog/posts/what-is-google-gemma-4/) sits at 89.2%, LiveCodeBench v6 at 80.0%, and Codeforces ELO at 2,150. Third in the world among open models. With this level of math reasoning and coding, a locally hosted coding assistant becomes practically usable.

**And most important: the Apache 2.0 license.** Previous Gemma versions used Google's own license, with restrictions on commercial use. Starting with Gemma 4, Google switched to Apache 2.0. This is not a technical change but a strategic shift. Apache 2.0 is essentially unrestricted. No monthly active user cap. No enforced acceptable use policy. Full freedom for commercial deployment. Contrast this with Meta's Llama 4, which still requires a separate negotiation above 700 million MAU under its community license.

[VentureBeat's analysis](https://venturebeat.com/technology/google-releases-gemma-4-under-apache-2-0-and-that-license-change-may-matter-more-than-benchmarks) hit the bullseye: "This license change may matter more than the benchmarks." The value of an open model is not determined by performance alone. How freely it can be used drives adoption.

---

## 5. The Big Bang of the Local AI Ecosystem — Ollama MLX + mesh-llm

In the same week Gemma 4 was released, the infrastructure to actually run the model locally was also being assembled. The timing is too perfect to call coincidence.

### Ollama 0.19: Inference on Mac Doubled

[Ollama](https://ollama.com/blog/mlx) is the de facto standard for running local LLMs. One line — `ollama run gemma4:26b` — pulls the model and starts a conversation. That Ollama, in version 0.19, began natively supporting Apple's MLX (Machine Learning eXtensions) framework.

The performance gains are quantified:

| Metric | Ollama 0.18 | Ollama 0.19 (MLX) | Improvement |
|------|-------------|-------------------|------|
| Prefill (tokens/sec) | 1,154 | 1,810 | 1.6x |
| Decode (tokens/sec) | 58 | 112 | 1.9x |

Decode speed went from 58 to 112 — nearly double. The numbers are possible because MLX directly leverages Apple Silicon's unified memory architecture. The characteristic of Apple Silicon — GPU and CPU sharing the same memory pool — is used far more efficiently than llama.cpp's Metal backend manages.

On M5, M5 Pro, and M5 Max chips, the GPU Neural Accelerator is also engaged, further accelerating both time to first token (TTFT) and generated tokens per second. That said, the Ollama team explicitly recommends "32GB or more of unified memory" — practically the minimum spec for running a 26B model without quantization.

### mesh-llm: Bundling Multiple Machines Into One

One laptop not enough? [mesh-llm](https://github.com/michaelneale/mesh-llm) is the answer. A tool that bundles GPU resources distributed across multiple machines into a single OpenAI-compatible API.

Installation is simple:

```bash
curl -fsSL https://raw.githubusercontent.com/michaelneale/mesh-llm/main/install.sh | bash
mesh-llm --auto
```

With `--auto`, it auto-detects hardware, downloads the model, joins the mesh network, and launches a web console. Running the same command on another machine on the same network automatically adds it to the mesh.

The distribution strategy is clever:

- **If the model fits on one machine** → local execution with no network overhead
- **If a Dense model does not fit on one machine** → pipeline parallelism partitions the layers
- **If an MoE model does not fit on one machine** → expert sharding, zero cross-node inference traffic

The combination of Gemma 4's 26B-A4B MoE model and mesh-llm is especially attractive. MoE partitions naturally at the expert level, and mesh-llm natively supports expert sharding for MoE. If you have two Mac minis at home, you can run a 26B model with no quality loss using just 16GB of memory each.

All nodes expose the same endpoint: `http://localhost:9337/v1`. Since it is OpenAI SDK compatible, existing code that uses `openai.chat.completions.create()` only needs the base_url changed:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:9337/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="gemma-4-26b-a4b",
    messages=[{"role": "user", "content": "Please review this code"}]
)
```

The code is identical to using a cloud API. Only the infrastructure changed.

---

## 6. Snapping the Puzzle Together — The 2026 Local AI Stack

Line up the three pieces and a single stack emerges.

```
┌─────────────────────────────────────────────┐
│            Application Layer                │
│   (agents, coding assistants, doc nav)      │
├─────────────────────────────────────────────┤
│            Interface Layer                  │
│   ChromaFs (filesystem interface)            │
│   → agent "exploration" instead of RAG       │
├─────────────────────────────────────────────┤
│            Model Layer                      │
│   Gemma 4 (Apache 2.0, MoE, 256K context)  │
│   → open, high-performance, commercial-free │
├─────────────────────────────────────────────┤
│            Runtime Layer                    │
│   Ollama 0.19 (MLX) + mesh-llm             │
│   → local exec, distributed inference, API │
├─────────────────────────────────────────────┤
│            Hardware Layer                   │
│   Apple Silicon / NVIDIA GPU / multi-node   │
└─────────────────────────────────────────────┘
```

Each layer evolves independently while reinforcing the others. Gemma 4's MoE architecture is a perfect fit for mesh-llm's expert sharding. Ollama's MLX support maximizes Apple Silicon's unified memory. ChromaFs's filesystem interface serves data in the form LLMs understand best.

The meaning of this stack, in one sentence: **a level of AI workflow you can actually use in production is now possible on my laptop, without any cloud API.**

A year ago, local LLMs were "fun experiments." 7B models were the mainstream, quality fell far short of GPT-3.5, and inference was sluggish. Now it is different. A 31B model is third in the world among open models, a 26B MoE reproduces 97% of that quality with just 3.8B in active computation, Mac inference has doubled in speed, and you can lash several machines together for even bigger models.

---

## 7. So What Actually Changes

Technical possibility alone is meaningless. Here is what actually changes, from three perspectives.

**First, the cost structure changes.** OpenAI's GPT-4.5 API runs at $2 per million tokens input, $8 per million tokens output. A service handling 10,000 queries a day runs to thousands of dollars a month. Running Gemma 4 26B locally adds only the electricity bill. Mac mini M4 Pro draws around 40W even under full load — less than $5 a month even at 24-hour usage. There is initial hardware investment, of course, but on a service where API costs accumulate, the crossover happens within months.

**Second, data stays local.** The biggest barrier to AI adoption in medical, legal, and financial domains is not technology but regulation. Most of those environments cannot send sensitive data to an external API. The local AI stack sidesteps that barrier. Because the data never leaves the network, compliance issues fundamentally do not arise. The Apache 2.0 license frees the model itself for commercial use, so there is no legal barrier even to embedding it in an enterprise's own service.

**Third, agent autonomy rises.** What ChromaFs demonstrated is part of a trend larger than the RAG-to-filesystem swap itself. The pattern of "giving the agent tools and letting it explore" instead of "delivering results to the agent" is spreading. Claude Code exploring a codebase directly, Devin operating a browser directly, and ChromaFs serving documents as a filesystem — all point in the same direction. A consensus is forming that agentic approaches are more effective than passive retrieval.

---

## 8. Limits and Boundaries — What This Is Not, Yet

Closing only on optimism would be dishonest. This stack has clear limits.

**The quality ceiling of local models.** No matter how good Gemma 4 31B is, it does not replace the full capability of Claude Opus 4.6 or GPT-4.5. There is still a gap with frontier models on complex multi-step reasoning, precise analysis of long documents, and subtle nuance. Local models shine in "good enough" use cases; for "highest possible quality" use cases, cloud APIs are still the answer.

**The applicability range of ChromaFs.** As mentioned, this approach only works on well-structured data. The filesystem metaphor does not fit unstructured data — Slack logs, email archives, scanned PDFs. For those, RAG, or Agentic RAG, is still the more appropriate choice.

**The maturity of mesh-llm.** With 503 GitHub stars and active development, it is too early to call it production-ready. The classic problems of distributed systems — network latency, recovery from node failure, security — are not fully solved.

**The wall of memory.** There is a reason Ollama recommends 32GB unified memory. Running a 26B model on a 16GB Mac requires aggressive quantization, and quantization carries quality cost. Framing this as "use AI for free" without hardware investment is overstated.

---

## 9. AI Is Coming Down

The three events that broke in the first week of April 2026 are, taken independently, no more than news items. Mintlify changed its architecture, Google released a model, Ollama shipped an update. But laid side by side, one flow emerges.

The center of gravity of AI is moving from cloud to local. Models are evolving smaller and more efficient (MoE), licenses are becoming freer (Apache 2.0), runtimes are accelerating (MLX), infrastructure for bundling machines is appearing (mesh-llm), and even how agents handle data is being optimized for local exploration (ChromaFs).

In an [earlier piece on RAG](rag-not-silver-bullet.md), I argued "look at the problem, not the tool." The same principle applies here. "Cloud vs local" is a question of tool selection. The real question is "which stack fits the shape of my problem." For a medical startup handling sensitive data, the local AI stack is not optional but required. For a large-scale service handling real-time requests from millions, cloud is still right. Most cases fall somewhere in between — sensitive data local, high-quality reasoning in the cloud.

One thing is certain. A year ago, "running AI locally" meant a hobby project. Now it is one of the options in a production architecture. And the movement is accelerating.

---

## References

- [How we built a virtual filesystem for our Assistant](https://www.mintlify.com/blog/how-we-built-a-virtual-filesystem-for-our-assistant) — Mintlify blog
- [Hacker News: ChromaFs discussion](https://news.ycombinator.com/item?id=47618223) — 217 points, 96 comments
- [Gemma 4: Byte for byte, the most capable open models](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) — Google announcement
- [What Is Google Gemma 4? Architecture, Benchmarks](https://wavespeed.ai/blog/posts/what-is-google-gemma-4/) — WaveSpeedAI technical analysis
- [Google releases Gemma 4 under Apache 2.0 — and that license change may matter more than benchmarks](https://venturebeat.com/technology/google-releases-gemma-4-under-apache-2-0-and-that-license-change-may-matter-more-than-benchmarks) — VentureBeat
- [Ollama is now powered by MLX on Apple Silicon](https://ollama.com/blog/mlx) — Ollama official blog
- [Ollama adopts MLX for faster AI performance on Apple Silicon](https://9to5mac.com/2026/03/31/ollama-adopts-mlx-for-faster-ai-performance-on-apple-silicon-macs/) — 9to5Mac
- [mesh-llm: Pool compute to run powerful open models](https://github.com/michaelneale/mesh-llm) — GitHub
- [Gemma 4 Model Card](https://ai.google.dev/gemma/docs/core/model_card_4) — Google AI for Developers
