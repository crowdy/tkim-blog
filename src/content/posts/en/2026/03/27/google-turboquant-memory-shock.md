---
title: 'Google''s TurboQuant — A "DeepSeek Moment" for Memory, or the Prelude to the Next Rally?'
description: 'If AI eats only one-sixth of the memory, do memory chips sell only one-sixth as well? A single paper from Google researchers vaporized trillions of won in market cap at Samsung Electronics and SK hynix. But is the panic accurate, or is it déjà vu of the January 2025 DeepSeek shock?'
pubDate: 2026-03-27T01:53:39.604Z
lang: 'en'
pairSlug: 'google-turboquant-memory-shock'
draft: false
---
# Google's TurboQuant — A "DeepSeek Moment" for Memory, or the Prelude to the Next Rally?

> If AI eats only one-sixth of the memory, do memory chips sell only one-sixth as well? A single paper from Google researchers vaporized trillions of won in market cap at Samsung Electronics and SK hynix. But is the panic accurate, or is it déjà vu of the January 2025 DeepSeek shock?

---

## 1. The day a single paper shook the semiconductor market

On March 25, 2026, a post went up on the Google Research blog. The title: **"TurboQuant: Redefining AI Efficiency with Extreme Compression."**

The reaction was instant. The next day, as Asian markets opened, memory semiconductor stocks plunged in unison.

| Company | Decline | Notes |
|------|--------|------|
| SK hynix | **-6.23%** | Plunge right after HBM4 unveiling |
| Samsung Electronics | **-4.71%** | Drove KOSPI down -3.22% |
| Micron | **-3.40%** | Additional -1.38% after hours, -17.2% over five sessions |
| Kioxia | **-6%+** | Hard brake after 700% gain over eight months |
| SanDisk | **-3.50%** | Closed down in US trading |

The Korea Economic Daily called it **"memory's DeepSeek moment."** The Seoul Economic Daily described it as **"a megaton bombshell carpet-bombing Asian markets."** In the very same week that SK hynix unveiled physical HBM4 at SEDEX 2025 in COEX, a paper that questioned the very reason for HBM's existence dropped.

But is the panic accurate? How big is the gap between what the paper actually says and what the market read into it?

---

## 2. What exactly is TurboQuant?

The formal title of the TurboQuant paper is *"TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate"* (arXiv:2504.19874). It was developed by a team led by Google Research's Amir Zandieh (Research Scientist) and Vahab Mirrokni (VP & Google Fellow), and is scheduled for presentation at ICLR 2026.

### What is being compressed: the KV cache

The first crucial distinction is here. TurboQuant is not compressing **the AI model as a whole.** It targets only the **KV (Key-Value) cache** generated during inference.

What is the KV cache? When an LLM generates text, it is the temporary memory that stores information about previously processed tokens. Paste a long document into ChatGPT and ask a question, and the model keeps key-value pairs for every token of that document in memory. As context grows, this cache grows geometrically. A model handling a million-token context can consume tens of gigabytes of memory in the KV cache alone.

TurboQuant compresses this KV cache from the existing FP16 (16-bit) down to **3 bits**. Theoretically about 5.3x compression, but by completely eliminating the metadata overhead (scaling factors, etc.) that has been mandatory in prior quantization techniques, it achieves an **effective compression rate of more than 6x**.

### How it works: a two-stage pipeline

The core of TurboQuant is the combination of two independent algorithms.

**Stage 1 — PolarQuant (polar-coordinate quantization):**

It applies a random rotation to the data vector to simplify its geometric structure. The approach is analogous to converting Cartesian coordinates (X, Y, Z) into polar coordinates (radius + angle). The result is uniform information density, so a standard scalar quantizer can be applied independently to each coordinate without expensive data normalization. The scaling factor required per block in conventional block quantization — metadata that itself ate memory — becomes entirely unnecessary.

**Stage 2 — QJL (Quantized Johnson-Lindenstrauss):**

The residual error left from stage 1 is corrected with **a single bit.** Using a Johnson-Lindenstrauss transform, vectors are reduced to a sign bit (+1/-1), and bias is removed to produce more accurate attention scores.

### "6x savings, 8x speed" — what is the evidence?

Let's examine the basis for Google's claimed numbers.

**6x memory savings:**

In models including Llama-3.1-8B, Mistral-7B, and Gemma, **zero accuracy loss** was confirmed across the LongBench, Needle In A Haystack, ZeroSCROLLS, RULER, and L-Eval benchmarks. At 3-bit quantization (TQ3), MSE (mean squared error) was 0.034, with 4.9x compression versus FP16. Adding in the savings from eliminated metadata overhead yields an effective 6x or more.

**8x inference speedup:**

At 4-bit TurboQuant (TQ4), running on NVIDIA H100 GPUs, **up to 8x performance improvement on attention logit computation** was achieved versus 32-bit unquantized keys. The result of removing the memory bandwidth bottleneck via the compressed KV cache, increasing compute throughput.

### How is this different from existing quantization techniques?

This is the most important section for dispelling market confusion.

| Property | GPTQ/AWQ/GGUF | TurboQuant |
|------|---------------|------------|
| **Target** | Model weights | **KV cache (at inference)** |
| **Calibration** | Required (dataset-dependent) | **Not required (data-oblivious)** |
| **Training/fine-tuning** | Post-processing-based | **Not required at all** |
| **Metadata overhead** | Yes (per-block scale factor) | **None (zero overhead)** |
| **Effective bits at 4-bit** | ~4.5 bits | **Exactly 4 bits** |
| **Scope of application** | All GPU inference | **KV cache only** |

The core point: **GPTQ, AWQ, GGUF, and TurboQuant are not competitors — they are complementary.** It is possible to quantize model weights to 4 bits with AWQ and quantize the KV cache to 3 bits with TurboQuant. TurboQuant does not replace the existing quantization ecosystem; it is an additional optimization layer that goes on top.

Decisively, TurboQuant **has no impact on training workloads whatsoever.** The memory requirements of training GPU clusters — which account for a significant share of HBM demand — do not change by a single bit.

---

## 3. What the market misread

The Seoul Economic Daily's counterpoint cuts to the heart: **70 to 80% of real-world AI inference already runs in 8-bit (INT8) format.** TurboQuant's "6x savings" is against FP16 (16 bits). Given that 8-bit is already in practical use, the effective savings comes out to **roughly 2.6x**.

Morgan Stanley's analysis is more direct:

> "TurboQuant does not affect model weights (HBM usage in GPU/TPU) or training workloads. The technique enables 4-8x longer context windows or much larger batch sizes on the same hardware — it does not reduce the total amount of memory required."

In other words, what TurboQuant actually does is **"let the same GPU do more work."** It is not about buying fewer memory chips; it is about extracting more value from the chips already bought.

Samsung Securities analyst Lee Jong-wook offered analysis in the same vein:

> "As long as AI companies compete on performance rather than cost, optimization technology will not affect semiconductor demand."

Goldman Sachs characterized this episode as **"a reality check, not a panic."**

---

## 4. The Jevons paradox — the paradox of efficiency

In 1865, the English economist William Stanley Jevons made a paradoxical observation. Despite James Watt's steam engine dramatically improving coal efficiency, Britain's coal consumption did not fall — it **exploded**. Because the more efficient steam engine expanded coal's uses to factories, mines, trains, and ships. When technology saves a resource, the savings induce greater use. This is the **Jevons paradox**.

In the AI semiconductor market, this paradox has already been demonstrated once.

### The lesson of the DeepSeek shock

In January 2025, the Chinese AI startup DeepSeek shocked the market by delivering a chatbot with overwhelming performance using far fewer chips. NVIDIA stock evaporated **$589 billion (about 860 trillion won)** in a single day. The largest single-day market cap drop for a single company in history. The fear that "AI does not need expensive chips" took over the market.

What happened after?

The efficiency DeepSeek proved lowered the barrier to AI adoption. AI services that had required hundreds of millions of dollars in infrastructure could now be built by smaller companies. The base of demand expanded explosively. **NVIDIA stock fully recovered within two months and went on to set all-time highs.**

TurboQuant could follow the same trajectory.

What happens if AI inference cost falls to one-sixth? Companies that have been hesitating to adopt AI — there is Census Bureau data showing 95% of US companies do not yet use AI — enter the ecosystem. As million-token contexts become economically feasible, new use cases that were previously infeasible on cost grounds — AI that analyzes entire codebases, AI that processes tens of thousands of pages of legal documents at once, AI that analyzes real-time video around the clock — emerge in a wave.

**Efficiency does not kill demand. It creates demand.**

Morgan Stanley said as much directly:

> "If TurboQuant cuts AI operating cost to one-sixth, companies that have been hesitating on AI adoption will enter the ecosystem, expanding total market demand."

---

## 5. Hacker News — the temperature of the developer community

Between the academic paper and the market analysis, how did actual developers react? Right after the Google Research blog post went up, on Hacker News the post hit **538 points and 154 comments**, taking over the front page.

### Technical admiration and the ghost of Silicon Valley

According to TechCrunch's coverage, the most-repeated analogy across the internet was **Pied Piper from HBO's "Silicon Valley."** Jokes poured in about whether the show's plot — protagonist Richard Hendricks's revolutionary compression algorithm rocking the market — had finally come true.

Technical analysis was lively too. User **photon_lines** explained in detail: "Rotation transforms the data into a more predictable distribution, making the quantization bins more efficient, and bias correction through residual bits ensures accuracy." **kingstnap** focused on the phenomenon of deep networks producing "spikey activations," analyzing how TurboQuant's rotation normalizes them.

### Skepticism — missing citations and the absence of independent verification

But true to HN form, sharp skepticism coexisted. User **amitport** raised a key issue: rotation-based quantization techniques and bias correction were already introduced in the **2021 NeurIPS paper "DRIVE."** A missing prior-work citation is not something the academic community can dismiss.

**mskkm** voiced skepticism about GPU compatibility and criticized the absence of **wall-clock time benchmarks**. Theoretical FLOPS improvements and the speedup a user actually feels are different problems. Independent reproduction has not happened yet either.

**veunes** pointed out that polar-coordinate transforms can create computational overhead that hurts GPU parallelism. GPUs are optimized for normalized matrix operations, and polar transforms can disrupt that flow.

### llama.cpp — the open-source ecosystem's quick response

Meanwhile, on the open-source LLM inference engine llama.cpp, integration of TurboQuant support began **within hours** of the paper's release. The CPU implementation passed 18/18 tests, the CUDA kernel was complete, and GPU verification was pending. Drop-in compatibility with the existing inference stack was confirmed.

The implication is clear. TurboQuant is not a paper that stays in theory. It is technology immediately applicable in practice, and the open-source community is already proving it.

A post that went up around the same time, **"Quantization from the Ground Up"** (334 points, 58 comments), discussed the practical impact of quantization. One user explained that the Qwen 3.5 27B model needs 54GB in FP16 but shrinks to 16GB with Q4_K_M quantization, **making it runnable on a single used RTX 3090 (about 1.2 million won)**. Quantization technology is the front line of AI democratization.

---

## 6. The bigger picture — a new phase in the AI efficiency war

TurboQuant should not be read as an isolated event but as part of a larger trend. The 2025-2026 AI industry stands at an inflection point between **"the limits of the scaling laws"** and **"the efficiency revolution."**

### The era when inference surpasses training

OpenAI's Sam Altman predicted in early 2025 that "inference cost will soon exceed training cost." That is already becoming reality. Hundreds of millions of users of ChatGPT, Claude, and Gemini generate a KV cache with every question, and that cache occupies GPU memory. Training happens once; inference happens every day, every second.

In this context, the meaning of TurboQuant is not just memory savings. It is a **fundamental shift in the economics of inference.** Being able to handle 6x longer context, or 6x more concurrent users, on the same H100 GPU means a dramatic improvement in revenue per GPU for AI service providers.

### The competition has already begun

TurboQuant is not the only player. Microsoft's MXFP4, NVIDIA's Nemotron with native 4-8 bit training, DeepSeek's efficient architecture, and a host of academic research are simultaneously pushing the boundary of AI efficiency. TurboQuant is simply the most recent — and most dramatic — example in this stream.

---

## 7. So what happens to memory semiconductors?

Back to the central question of the panic. **Is TurboQuant a real threat to the memory semiconductor industry?**

### Short term: painful, but not fatal

The stock decline is real and it hurts. But when you look precisely at the scope of TurboQuant's impact:

- **Affected area:** KV cache memory at inference — primarily a slice of general DRAM
- **Unaffected areas:** All training workloads, model weight storage, the core of HBM demand
- **Still in research phase:** Broad commercial deployment will take time

Lynx Equity Strategies summarized:

> "AI providers will need to address bottlenecks from longer token context length during inference, but due to supply constraints, memory and flash demand will not decline over the next three to five years."

### Medium and long term: Jevons smiles

The historical pattern that efficiency improvements do not reduce demand but expand it has a high probability of repeating in AI semiconductors. The DeepSeek shock already demonstrated this. If TurboQuant dramatically lowers inference cost:

1. **The barrier to AI adoption falls** — the 95% of companies not yet using AI become potential customers
2. **New use cases explode** — once million-token contexts are routine, applications previously impossible emerge
3. **Total inference demand grows** — per-query cost drops, but query counts explode

In the end, when KV cache efficiency per GPU improves 6x, companies will not buy 6x fewer GPUs — **they will run 6x more services on the same number of GPUs.** And to run that 6x of services, they will need yet more memory, storage, and networking of different kinds.

---

## 8. Conclusion — sell fear, or buy context

TurboQuant is technically an impressive breakthrough. Quantizing the KV cache to 3 bits with zero accuracy loss, applicable immediately without calibration or training — that is a clear advance over prior quantization techniques. The fact that integration has already started in open-source ecosystems like llama.cpp proves this is practical, not theoretical.

But the fear in the semiconductor market is overdone.

What TurboQuant targets is only the KV cache; it is unrelated to model weights or training. With 8-bit inference already standard in practice, the effective savings is smaller than the headline number. And history says, repeatedly, that efficiency improvements lead not to demand contraction but to demand explosion.

The coal of 1865, the DeepSeek of 2025, the TurboQuant of 2026. The Jevons paradox has not been wrong once in 160 years.

**What the memory semiconductor industry needs right now is not fear but context.** Eyes that can read past the "6x less memory" headline to the technical reality, the market dynamics, the historical patterns. That sight is what separates short-term panic from medium-term opportunity.

---

**Sources:**
- [Google Research Blog — TurboQuant: Redefining AI Efficiency with Extreme Compression](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/)
- [arXiv:2504.19874 — TurboQuant paper](https://arxiv.org/abs/2504.19874)
- [TechCrunch — Google unveils TurboQuant](https://techcrunch.com/2026/03/25/google-turboquant-ai-memory-compression-silicon-valley-pied-piper/)
- [Tom's Hardware — TurboQuant KV cache compression](https://www.tomshardware.com/tech-industry/artificial-intelligence/googles-turboquant-compresses-llm-kv-caches-to-3-bits-with-no-accuracy-loss)
- [VentureBeat — TurboQuant algorithm speeds up AI memory 8x](https://venturebeat.com/infrastructure/googles-new-turboquant-algorithm-speeds-up-ai-memory-8x-cutting-costs-by-50)
- [CNBC — Memory stocks fall after Google TurboQuant](https://www.cnbc.com/2026/03/26/google-ai-turboquant-memory-chip-stocks-samsung-micron.html)
- [The Korea Economic Daily — Memory's DeepSeek moment](https://www.hankyung.com/article/202603267801i)
- [The Seoul Economic Daily — Google's TurboQuant semiconductor shock](https://www.sedaily.com/article/20024658)
- [TrendForce — Decoding TurboQuant: Headwind for Memory Players?](https://www.trendforce.com/news/2026/03/26/news-decoding-googles-turboquant-6x-kv-cache-cut-headwind-for-memory-players/)
- [Hacker News — TurboQuant discussion (538 points, 154 comments)](https://news.ycombinator.com/item?id=47513475)
- [Hacker News — Quantization from the Ground Up (334 points, 58 comments)](https://news.ycombinator.com/item?id=47519295)
- [llama.cpp — TurboQuant Integration Discussion](https://github.com/ggml-org/llama.cpp/discussions/20969)
- [Morgan Stanley, Goldman Sachs, Lynx Equity Strategies — analyst commentary (cited via Bloomberg, CNBC)](https://www.cnbc.com/2026/03/26/google-ai-turboquant-memory-chip-stocks-samsung-micron.html)
