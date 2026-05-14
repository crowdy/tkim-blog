---
title: 'Meta abandons the Llama line — why Muse Spark returned to a multimodal-native unified design'
description: 'Llama was born as text first and learned images later. Muse Spark speaks images, text, and tool calls in the same language from birth. What does that difference mean? And why did Meta walk this road, even at the cost of giving up Llama weights — its single largest asset?'
pubDate: 2026-04-10T00:56:52.938Z
lang: 'en'
pairSlug: 'meta-muse-spark-multimodal-native'
draft: false
---
# Meta abandons the Llama line — why Muse Spark returned to a multimodal-native unified design

> Llama was born as text first and learned images later. Muse Spark speaks images, text, and tool calls in the same language from birth. What does that difference mean? And why did Meta walk this road, even at the cost of giving up Llama weights — its single largest asset?

---

On April 8, 2026, Meta Superintelligence Labs unveiled the first model in the Muse family: **Muse Spark**. The announcement itself wore the familiar shape of a big-tech model release. A new name, new benchmark numbers, new demo footage. But anyone who looked inside quickly recognized this for what it was — not just a next-generation model, but the **end of the "Llama line"** that Meta had pushed for nearly five years since 2023.

[TechCrunch called the announcement a "ground-up overhaul"](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/). That phrasing was no accident. Muse Spark reused not a single line of existing Llama weights. The bolt-on approach — putting a vision encoder on top of a text LLM, the path nearly every open model followed from 2020 to 2025 — was abandoned. In its place came a **native multimodal** architecture trained from scratch to handle text, images, and tool calls as one unified token sequence.

The day after the announcement, on April 9, [the Meta AI app jumped from #57 to #5 on the App Store overall rankings](https://techcrunch.com/2026/04/09/meta-ai-app-climbs-to-no-5-on-the-app-store-after-muse-spark-launch/). A 52-rank climb in a single day. GIGAZINE and Gizmodo Japan ran technical explainers back to back, and Korean Twitter buzzed with heated reactions like "Llama is dead." The market read the announcement as a signal that "Meta is back in the center of the AI race."

But the market reaction is not what this essay cares about. Not App Store rankings, not the stock price. The question this essay wants to ask is just one. **What is the technical reality behind the marketing phrase "multimodal-native unified design," and why did Meta have to take this road, even at the cost of giving up Llama weights — its single largest asset?**

To preview the answer: the representation gap of the bolt-on approach has become a bottleneck that can no longer be ignored in tool use and visual reasoning, and the entire frontier model lineup — GPT-4o, Gemini, and now Muse Spark — is converging on the same conclusion. The fact that Meta, the standard-bearer of the "Llama open-model camp," has changed course means the bolt-on era is over.

---

## 1. The week Muse Spark was announced — what did Meta put on the table

First, the facts.

**Date and announcer**: April 8, 2026, Meta Superintelligence Labs (MSL). This is a new AI research organization built inside Meta in late 2025, led by former Scale AI CEO Alexandr Wang. Meta made a large investment in Scale AI and simultaneously brought Wang on board, building around him a separate organization from the existing FAIR (Fundamental AI Research). Critically, it is also separate from the GenAI organization that built the Llama series. **The organizational split foreshadowed the line split.**

**Model family**: Muse Spark is the first model in the "Muse" family. The word "family" is intentional. It implies that Muse Pro and Muse Ultra will follow. Where Llama traced one lineage across four generations (Llama 1 through 4), Muse is the starting point of a new lineage. When one company runs two separate model families in parallel, it means there is a fundamental architectural difference between them.

**Core capabilities**: According to [GIGAZINE's explainer](https://gigazine.net/news/20260409-meta-muse-spark/), Muse Spark's three core capabilities are:

1. **Tool use** — invoking external tools (search, code execution, image generation, etc.) is folded naturally into the model's internal reasoning.
2. **Visual chain-of-thought** — the model uses images as intermediate steps in its reasoning, not by converting them to text captions but by making the image itself a node in the thought process.
3. **Contemplating mode** — multiple agents reason in parallel and combine their results. Response quality rises without latency scaling proportionally.

**Benchmarks**: A few numbers cited in the GIGAZINE article.

| Benchmark | Muse Spark |
|----------|-----------|
| Humanity's Last Exam | 58% |
| FrontierScience Research | 38% |
| Bioweapon-related refusal rate | 98.0% |

The most striking number isn't a benchmark score; it's efficiency. GIGAZINE reported: **"the compute needed to reach the same performance level as Llama 4 Maverick has been reduced to less than one tenth."** Reaching the same performance with 1/10 the compute doesn't just mean a more efficient model. It means the architecture itself is different.

**Market reaction**: Within 24 hours of the announcement, the Meta AI app jumped from #57 to #5 on the overall App Store rankings. Japanese outlets poured out analytical pieces simultaneously. [Forbes Japan reported on Meta's stock surge and called it "the counter-card in the AI race"](https://forbesjapan.com/articles/detail/95425?s=ns). The Llama 4 launch never produced this level of market response.

That covers the facts. Now to the real question. What is different about this model?

---

## 2. What was the Llama line — the mainstream design of 2023~2025

We need to be clear about what "Llama line" actually refers to. It doesn't just mean the models Meta built. It refers to the entire **design philosophy of "build a text LLM first, then extend to multimodal."** And that philosophy was the de facto standard in the open-source camp from 2023 to 2025.

Walk the timeline.

**2023 — Llama 1, Llama 2**: Meta's first serious open models. They were pure text LLMs. No images, no audio. The single value proposition was clear — "publish the weights of a GPT-level language model." Meta's bet at this point was unambiguous: text LLMs are the main front of AI, and other modalities can be bolted on later.

**2023~2024 — LLaVA, Flamingo, MiniGPT-4**: Multimodal extensions on top of Llama sprouted in academia and the open-source camp like weeds. Their structure was identical:

```
[image] → [Vision Encoder (CLIP, ViT)] → [Projection Layer] → [LLM (Llama)]
```

A separate vision encoder first turns the image into an embedding vector. A projection layer "translates" that vector into the LLM's embedding space. The LLM then accepts the vector as if it were a single text token and processes it. Clever, efficient, and very fast to build.

The advantages were obvious.

- **Reuse**: you can use existing weights of a large LLM as-is. No need to retrain from scratch.
- **Modularity**: vision encoder and LLM are decoupled, so each can be swapped or upgraded independently.
- **Low cost**: dramatically less GPU time and data than training a multimodal model from scratch. That's why a single university lab could build something like LLaVA.

This structure remained largely intact through Meta's 2024 release of Llama 3. The Llama 3 Vision variants were essentially Llama 3 text + separate vision encoder + projection. With Llama 4 Maverick, the structure reached its peak — bigger text model, bigger vision encoder, more elaborate projection.

**But there was a problem.** One that became increasingly clear and increasingly impossible to ignore.

**The representation gap.** From the LLM's standpoint, an image is "a strange token that was translated and pushed in from outside." The LLM doesn't deeply understand what those strange tokens mean. It only learns a shallow mapping along the lines of "when these patterned strange tokens come in, the reward is high if I respond with this kind of text." Bolt-on multimodal models answer simple "what is in this image?" questions well, but their roots are shallow in tasks that require deep visual reasoning — something like "follow the flow of this diagram and explain it step by step."

**The awkwardness of tool use.** Tool use suffers from the same problem. Tool calls are typically expressed as special token sequences (like `<tool_call>...</tool_call>`), and these tokens are an "external interface" that the text LLM learned after the fact. Every time the model calls a tool, it goes through a "text → tool call → text" conversion. It isn't natural. So in long-horizon agent tasks — chaining many tool calls across extended reasoning — bolt-on models frequently lose their way.

The real problem reveals itself when a user has a calm conversation with ChatGPT or Claude, hands over an image, and asks the model to call tools. In that moment, you can plainly feel: "this model didn't actually see the image; it saw a caption of the image." That is the representation gap.

By late 2025, this problem must have grown impossible to ignore inside Meta. They pushed all the way to Llama 4 Maverick, but it was becoming increasingly obvious that they could not match GPT-4o's visual reasoning or Gemini's long-horizon agent capabilities. And that gap was not the kind that could be closed by making the model bigger. It was a **structural gap**.

This is where the Muse Spark decision comes in. If "bigger Llama" is not the answer, then the answer has to lie elsewhere.

---

## 3. What is concretely different about native multimodal

This section is the heart of the essay. Let's unpack — in the simplest language possible, but precisely — what makes "multimodal-native unified" not marketing jargon but a concrete technical reality.

There are three pieces — **token vocabulary**, **attention**, and **training objective**. All three must change simultaneously to count as "native multimodal." Changing just one is not native.

### 3.1 Unifying the token space — "images became first-class citizens"

Start with the token vocabulary.

A standard text LLM's token vocabulary is around 100K to 300K text tokens. "the", "안녕", "###", "}", "function" — that sort of thing. Images don't exist in this vocabulary.

In the bolt-on approach, a projection layer "imitates" text tokens out of image embeddings and shoves them into the LLM. From the model's perspective, the image token is a temporary guest not registered in the vocabulary. There is no image token among the possible output tokens. The model can "read" images but cannot "write" them.

Native multimodal is different. The token vocabulary is designed from the start to include text, image patches, and tool calls all together. Drawn out:

```
[Legacy Llama-line vocabulary]
┌───────────────────────────────┐
│  Text tokens (~128K)           │
└───────────────────────────────┘
   └ Images: external encoder output → projection → "imitated" input
   └ Tool calls: expressed as special text tokens (<tool_call>)

[Native multimodal vocabulary (estimated Muse Spark structure)]
┌───────────────────────────────┐
│  Text tokens (~128K)           │
│  Image patch tokens (tens of thousands~hundreds of thousands)│
│  Audio tokens (~tens of thousands)│
│  Tool-call tokens (~thousands)        │
│  Special control tokens                │
└───────────────────────────────┘
   → all live in the same vocabulary
   → can appear freely in input and output
```

Images are no longer "guests translated in from outside." They are formally registered first-class citizens in the vocabulary. The model can not only read image patches; it can **write them too.** That's why native multimodal models can also generate images — without bolting on a separate diffusion model. Because in this structure, the next token in the same vocabulary can be text or an image patch.

The same goes for tool calls. A tool call is no longer a special sequence mimicked in text; it's a separate, formally registered token class in the vocabulary. The model's decision to "invoke the search tool at this point" becomes structurally the same act as deciding the next word. Hence the naturalness.

### 3.2 Cross-modal attention — "attention doesn't know modality boundaries"

The second piece is the attention mask.

In a bolt-on model, even after image embeddings enter the LLM, there's some sense in which the "image region" and "text region" stay separated. The "image tokens" produced by the projection layer behave as foreign guests to the attention mechanism, and the model tends to handle them as a separate zone. Visualizing the attention patterns, you frequently observe weakened attention weights at the image-text boundary.

In native multimodal, that boundary disappears, because training happens on a unified sequence from the start. Text, image patches, and tool-call results line up indistinguishably in attention patterns, and any token can attend freely to any other token.

Why does this matter? Because **visual chain-of-thought** becomes possible.

Traditional chain-of-thought is text reasoning. Tokens line up in a row like "first compute A, then compute B, therefore the answer is C." Visual chain-of-thought interleaves images into this process. "Looking at this image → zooming into this region → I see this pattern → therefore the answer is..." In the "zooming into this region" step, the model actually generates new image tokens. That newly generated image then becomes input to the next step.

For this to be possible, attention must move freely across modality boundaries. A text reasoning token attending to a previously generated image patch, generating a new image patch from there, and feeding that new image back into text reasoning — this flow has to happen inside a single sequence. It's nearly impossible in a bolt-on structure, because images aren't tokens that can be emitted as output.

That's exactly what the GIGAZINE article emphasized as "the structure that optimizes the use of thought tokens." Visual thought is interleaved into reasoning, and it flows seamlessly within the same sequence as text reasoning.

### 3.3 Cross-modal training objective — "what the next token will be isn't decided in advance"

The third piece is the training objective. This is actually the most important.

The training objective of a standard text LLM is simple. **"Given previous tokens, predict the next text token."** A single objective defined by cross-entropy loss. The model knows that what comes next is text.

The training objective for bolt-on multimodal is slightly more complex. It typically splits into two phases. First, the vision encoder is trained separately with contrastive learning (the CLIP approach). Then a projection layer is attached to the LLM and fine-tuned on vision-language data. The two phases are separated, so the vision encoder is trained without knowing what it will be used for.

The training objective for native multimodal is simple yet fundamentally different. **"Given previous tokens, predict the next token, whatever it is."** The next token could be text, an image patch, or a tool call. The model does not know in advance what is coming next.

In pseudocode:

```python
# Legacy text LLM (early Llama)
loss = cross_entropy(predicted_text_token, actual_text_token)

# Bolt-on multimodal (LLaVA)
# Phase 1: train vision encoder separately (CLIP loss)
# Phase 2: projection + LLM fine-tune
loss = cross_entropy(
    predicted_text_token_after_image,
    actual_text_token
)

# Native multimodal (Muse Spark, GPT-4o, Gemini)
# single phase, single objective
loss = cross_entropy(
    predicted_next_token,  # text or image_patch or tool_call
    actual_next_token
)
```

The surface difference is subtle, but the consequences are enormous. When a model is trained under the objective of "predict whatever the next token is," images, text, and tool calls take up positions in the same statistical space. Image patches and text tokens come to sit semantically near each other in the same embedding space, and the model naturally learns that the text token "cat" and "the patches of a cat image" are different expressions of the same concept. That is the mechanism by which the representation gap closes.

### 3.4 What the 1/10-compute number actually means

In this context, the key number GIGAZINE cited — **"achieving Llama 4 Maverick-level performance with 1/10 the compute"** — finally becomes clear.

It does not mean that on the same text task, native multimodal hits the same score with 1/10 the compute as bolt-on. It means that **on integrated evaluations that mix multimodal tasks and tool use, native multimodal achieves the same capabilities with much less compute.** Because in a bolt-on structure, the model takes a detour: "translate image to text → reason in that text → produce output again." That detour itself is a massive waste of compute.

Unifying the token space, cross-modal attention, and a cross-modal training objective — when these three operate together, the detour disappears and reasoning goes straight. That is the structural reality the word "unified" points to.

---

## 4. The real cost of "ground-up overhaul" — why this is "overhaul"

It should now be clear why the phrase ["ground-up overhaul" used by TechCrunch](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/) is precise. Going from bolt-on to native does not mean "improving an existing model." It means **throwing away nearly everything that was built before.**

Let's go through what Meta lost with this decision, one item at a time.

**(1) Llama weights — abandoning the largest asset**

From Llama 1 through Llama 4 Maverick, Meta invested at least tens of thousands to hundreds of thousands of GPU-months of compute. The result was the Llama weights. They were Meta's most expensive asset, and simultaneously its largest lever for influence in the open-source camp.

The moment one moves to native multimodal, these weights become unrecyclable. The token vocabulary is different. The text token vocabulary is different, and the image token vocabulary is built from scratch. Attention patterns have to be learned again from zero. There is essentially no way to partially transplant Llama weights.

The fact that Meta built Muse Spark without reusing a single line of Llama weights means it effectively scrapped that asset. An asset built up over five years. That is the first cost of "ground-up."

**(2) Training data pipeline — from scratch again**

The existing Llama training data pipeline was designed text-first. Web crawling, deduplication, quality filtering, instruction tuning datasets — all of it sat on the assumption that the input was text.

Native multimodal requires rebuilding this pipeline almost from scratch. You need enormous datasets where text and images are aligned. Not just "image + caption" pairs, but data shaped like natural long-form text with images embedded inside it. And trajectory data with tool calls. And reasoning data shaped as visual chain-of-thought.

This kind of data essentially does not exist on the market. Meta's enormous investment in Scale AI finally makes sense in this context. Scale AI is a company with overwhelming infrastructure in data labeling and synthetic data generation. Alexandr Wang taking the helm of Meta Superintelligence Labs is not simply a talent acquisition; it means bringing in "the person who can build this data pipeline from scratch."

**(3) GPU infrastructure usage patterns — different rhythms**

The GPU pattern of training itself is different. Text LLM training is a relatively uniform pattern that processes huge text batches at constant sequence lengths. Multimodal training inserts image patches inside sequences, which makes memory usage and computation patterns far more irregular. The existing Llama training infrastructure cannot be reused as-is.

Also, native multimodal models have to run cross-modal attention at full bore during training, which makes attention memory usage far larger than for text-only models. Infrastructure techniques like KV cache compression, sequence parallelism, and expert parallelism all have to be re-tuned for multimodal sequences.

**(4) Organizational cost**

I mentioned this earlier but it bears emphasizing. Meta built a new organization to make this transition. Meta Superintelligence Labs operates separately from the existing GenAI organization (the one that built Llama). This reflects the judgment that "running the Llama line and the native multimodal line side by side inside the same organization is impossible." If one organization pursues both lines simultaneously, both end up half-baked. So they split them.

Splitting an organization means political cost. The Llama org's pride, budget allocation, talent migration, accountability — all of it would have been shaken. The fact that Meta absorbed that level of internal cost to go to native multimodal suggests an urgent judgment that "there is no future if we keep the Llama line."

**Add up these four costs, and you can see "ground-up overhaul" is no exaggeration.** And the very fact that Meta swallowed those costs is the strongest evidence that native multimodal is not a fad but a structural inevitability.

---

## 5. GPT-4o, Gemini, Muse Spark — the direction the frontier is converging in

What's interesting is that Meta isn't the only one making this transition. The entire frontier model camp is converging in the same direction.

**OpenAI GPT-4o**: Announced in May 2024, GPT-4o was the first model OpenAI explicitly called "natively multimodal." Their announcement materials emphasized that text, image, and audio are processed within the same token space. The dramatic reduction in response latency was the most visible signal — the earlier GPT-4V took the detour of "voice → text → text processing → text → voice" for voice input, but GPT-4o eliminated that detour.

**Google Gemini**: Gemini was a model that, at least in marketing terms, started out claiming "natively multimodal." When Gemini 1.0 was announced in late 2023, Google emphasized "learning text and image simultaneously within the same model." That line strengthened through Gemini 1.5 and Gemini 2.0, and the model climbed to a position where it now competes directly with GPT-4o on long context and multimodal reasoning.

**Meta Muse Spark**: And now, in April 2026, Meta has joined them. With the last major player switching tracks to native multimodal, the convergence of the frontier model camp is effectively complete.

What does this convergence mean?

First, **the bolt-on era is over.** At least at the frontier tier. Llama 5 or Llama 6 is not impossible, but the chance of either reverting to bolt-on structure looks close to zero. When every major research organization has reached the same conclusion, walking another path alone is reckless.

Second, **a heavy question gets thrown at the open-source camp.** Native multimodal's training cost is several times that of bolt-on. The data pipeline's complexity is also much higher. Can university labs or small open-source groups catch up? One reason Llama could become the standard of the open-model camp was the low cost of the bolt-on structure. If that low cost disappears, how does the open-model camp narrow the gap with the frontier?

Third, **the choices of latecomer open-model camps like Mistral, Qwen, and DeepSeek.** Some of them are already attempting native multimodal. Qwen-VL's successor and DeepSeek-VL2 are attempts to break away from simple bolt-on. But reaching native multimodal at the level of GPT-4o, Gemini, and Muse Spark requires much larger investment. The camps capable of this may, in the end, only be those with massive capital.

**The more the frontier converges, the higher the cost of reaching it.** This is the paradox of efficiency. Everyone knowing the same direction doesn't make it easier to go in that direction. If anything, the more the standard converges, the higher the barrier to entry to meet that standard.

---

## 6. What remains — questions not yet answered

It's clear that native multimodal is the trend. But to the same degree that it's clear, there are questions that remain unanswered.

**(1) The limits of training compute**

Is native multimodal really efficient? The "same performance with 1/10 the compute" number GIGAZINE cited is more likely a comparison of inference efficiency after the fine-tuning phase. The total compute it takes to train a model as native multimodal from scratch is by no means less than the sum of building a bolt-on model plus its fine-tuning. If anything, it's likely more. "Less compute" is the inference-time cost of getting the same capability, not the cost of building it.

**(2) Data quality and the difficulty of evaluation**

Evaluating native multimodal is much harder than evaluating a text LLM. There is no standardized way yet to automatically grade whether a visual chain-of-thought is correct. The same goes for the quality of tool use trajectories. The emergence of benchmarks like Humanity's Last Exam and FrontierScience Research is a symptom of this difficulty. We do not yet have an agreed-upon answer for how to compare native multimodal models.

**(3) The open-source camp's chances of catching up**

The question I raised above is the heaviest. If the Llama line is over, where does the open-model camp go? Two scenarios are possible. One is that camps like Mistral, Qwen, and DeepSeek build their own native multimodal models and catch up. The other is that the open-model camp stays in the text-only zone while the gap with the frontier widens. Which one happens, we do not yet know.

**(4) Standardization of tool use**

That tool calls have become part of the token vocabulary in native multimodal means that which tools the model calls and in what format are baked into the model weights. That is, the tool-call interface can vary by model. Standardization efforts like Anthropic's MCP (Model Context Protocol) become more important in this context. But if the standard starts being subordinated to model weights, the energy behind standardization itself may weaken.

**(5) The fate of Llama weights**

I said Meta scrapped Llama weights, but more precisely, it means "did not reuse them." Llama 4 Maverick is still alive as open source. Countless derivative models, fine-tunes, and services built on those weights remain in operation. They do not suddenly vanish. If anything, Llama is likely to become a "frozen artifact," used as the foundation of the open-model camp for years to come. **Meta abandoning Llama and the world abandoning Llama are not the same thing.**

---

## 7. Questions — what line is the model you use sitting on

Time to wrap up. But instead of drawing a conclusion, I want to leave questions.

What line is the model you use sitting on?

If you use ChatGPT (post-GPT-4o), Gemini, or Claude, you are already a user of native multimodal. A model that "really" sees the image you hand it, a model where tool calls are not awkward, a model where reasoning moves freely across modality boundaries. You probably never consciously noticed it. But you now know that the smoothness is not a coincidence — it is the result of a structural decision to unify token vocabulary, attention, and training objective.

If you run an in-house model at work — fine-tuning Llama 4 Maverick, or deploying a LLaVA variant internally — one heavy question remains. **How long will this model last?** As the limits of the bolt-on structure become clearer, you have to seriously consider whether your use case sits inside or outside those limits. Simple text classification, summarization, RAG-level work can run on a bolt-on model long enough. But the moment you need visual reasoning or long-horizon agent tasks, you have to start thinking about the transition to native multimodal. And that transition, as Meta has shown, is not at the "swap in a bigger model" level. It's closer to "rethink the entire stack."

If you are a researcher or developer in the open-model camp — watch the next moves of DeepSeek, Qwen, and Mistral. Whether and how they reach native multimodal will decide the trajectory of the open-AI ecosystem for years. If they fail to reach it, the meaning of "open model" itself may shift. A new fault line of "text is open, multimodal is closed" might get drawn.

And finally, a question for Meta itself. **Muse Spark is only the beginning.** Muse Pro and Muse Ultra will follow. Will that family reach a level where it can compete head-on with GPT-5 or Gemini 3? Will this gamble — taken at the cost of scrapping the enormous asset of Llama weights — pay off, or will "ground-up overhaul" end as "ground-down failure"?

We don't know yet. But one thing is certain. On April 8, 2026, Meta put more on the table than its name was worth. To see what that means, you have to look not at App Store rankings or stock prices but at token vocabularies, attention masks, and training objectives.

Technology lives in the details. And Muse Spark's details are telling us — Llama is over.

---

## References

- [TechCrunch — Meta debuts the Muse Spark model in a ground-up overhaul of its AI](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)
- [TechCrunch — Meta AI app climbs to No. 5 on the App Store after Muse Spark launch](https://techcrunch.com/2026/04/09/meta-ai-app-climbs-to-no-5-on-the-app-store-after-muse-spark-launch/)
- [GIGAZINE — Meta announces native multimodal reasoning model Muse Spark](https://gigazine.net/news/20260409-meta-muse-spark/)
- [Gizmodo Japan — Signs of a comeback for Meta's AI, Muse Spark](https://www.gizmodo.jp/2026/04/meta_muse_spark.html)
- [Forbes Japan — Meta stock surges, the counter-card in the AI race](https://forbesjapan.com/articles/detail/95425?s=ns)
- [Meta AI official (X) — Muse Spark introduces tool use, visual chain-of-thought](https://twitter.com/AIatMeta/status/2041910285653737975)
- [Meta AI official (X) — Studies on Muse Spark's scaling properties](https://twitter.com/AIatMeta/status/2041926291142930899)
