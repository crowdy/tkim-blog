---
title: 'The Open-Model War of 2026 — Why Google, AMD, and Alibaba Are Giving It Away'
description: '"Google released Gemma 4 under Apache 2.0. This is not charity. This is war."'
pubDate: 2026-04-03T05:27:51.855Z
lang: 'en'
pairSlug: 'open-model-war-2026'
draft: false
---
# The Open-Model War of 2026 — Why Google, AMD, and Alibaba Are Giving It Away

> "Google released Gemma 4 under Apache 2.0. This is not charity. This is war."

---

From the last week of March 2026 into the first week of April, something unusual happened in the AI industry. Within a single week, three of the world's biggest tech companies simultaneously open-sourced their latest AI models. Google DeepMind released Gemma 4 under the Apache 2.0 license (1,242 points on Hacker News). The same week, AMD shipped Lemonade, a local LLM server that uses both GPU and NPU together, as fully open source (HN 469). Alibaba published Qwen 3.6-Plus under the provocative subtitle "towards real world agents" (HN 462).

And that was only the start. Ollama 0.19 announced native support for Apple MLX, fundamentally improving the local AI execution environment on Mac. Microsoft simultaneously released three models — MAI-Voice-1, MAI-Transcribe-1, MAI-Image-2 — sending the signal "we are entering this war too."

Meanwhile cracks began to show in the closed-model camp. Bloomberg ran a piece titled "Anthropic Demand Surges vs. OpenAI Secondary Market Demand Falls," and Forbes ran a biting article titled "The OpenAI Graveyard — a collection of products announced but never shipped," questioning OpenAI's execution head-on (HN 239). The offensive of open models and the wobble of closed models became visible in the same week.

All of this in one week. Not coincidence. Open models are not charity but strategy. And this strategy is fundamentally rewriting the structure of the AI industry. This essay analyzes why these companies are giving away models that cost billions of dollars to build, and projects three scenarios for where the open-model war is headed.

---

## 1. What happened the first week of April 2026

A timeline makes the abnormal density of this week clear. Major AI-model announcements from big tech are usually spaced weeks or months apart. This time, companies on different continents moved almost simultaneously.

**Google Gemma 4** — DeepMind's next-generation open model. The first thing that stands out is the license. Apache 2.0. Not a "for research only" release. Commercial use, modification, and redistribution are all permitted. A startup can take the model, integrate it into a product, and sell that product without owing Google a cent. Fine-tuning is open. Distributing derivative models separately is allowed.

It hit 1,242 points on Hacker News and became the week's top story. The developer community split into two extremes. One side asked, in pure astonishment, "this is really free?" The other took a wary tone — "what is Google up to here?" The analysis that "Google is trying to lock the developer ecosystem onto its cloud" drew considerable support. Spoiler: that analysis is correct.

**AMD Lemonade** — AMD's local LLM inference server. The core differentiation is that it uses not only the GPU but also the NPU (Neural Processing Unit). In a market where NVIDIA effectively monopolizes GPU inference through the CUDA software ecosystem, AMD chose an entirely different approach. Release the software as fully open source (public on GitHub) and put AMD hardware's distinctive strength — hybrid GPU+NPU inference — front and center. HN 469. The reason AMD must give away the software is plain — this company's revenue comes from hardware, not software.

**Alibaba Qwen 3.6-Plus** — the slogan "towards real world agents" is telling. Rather than another benchmark race, the positioning leads with practical use in real agent tasks. The fact that a Chinese-built AI model scored 462 points on Hacker News is itself significant. Two years ago, Western developers paid little attention to Chinese AI models. DeepSeek R1 began to flip that perception in early 2025, and Qwen 3.6-Plus extends that line. Chinese open AI models are no longer "objects of curiosity" but "real options."

**Ollama 0.19** — added native support for the Apple MLX backend. Until this version, Ollama ran LLMs on the Mac through llama.cpp; with this update it can use MLX, Apple's own machine-learning framework, directly. With native access to Apple Silicon's Metal GPU when running LLMs locally on a Mac, inference speeds improved substantially, by reports streaming in from the community. The usability barrier for local AI dropped one level.

**Microsoft MAI trio** — released MAI-Voice-1 (speech synthesis), MAI-Transcribe-1 (speech recognition), and MAI-Image-2 (image generation) simultaneously. Notably, these are not text-based LLMs but voice and image models. Releasing three models at once is Microsoft's strong signal: "we are not falling behind in the open-model race." Naturally, tight integration with the Azure ecosystem is the central value proposition.

And precisely in this week, Bloomberg and Forbes simultaneously reported cracks in the closed-model camp. According to Bloomberg, secondary-market demand for OpenAI shares is visibly declining, while investor interest in Anthropic is surging (HN 137). Forbes went a step further with "The OpenAI Graveyard," cataloging the products and features OpenAI announced but never shipped (HN 239). At the moment the open-model offensive intensified, the front-runner of the closed-model camp wobbled in the same week. This is not coincidence — it is the consequence of the same structural force.

---

## 2. Why give it away — three strategic motives

"Why publish for free a model that cost billions to build?" From outside the tech industry the behavior is hard to parse. But understanding the answer reveals the structure of the AI industry. The answer differs by company. But they share one thing in common. None of the three companies makes its direct revenue from the model itself. They make money from the ecosystem around the model.

**Google's strategy: free bait to seize the platform**

When Google released Gemma 4 under Apache 2.0, the most direct beneficiaries were startups and developers. They could now pick up a state-of-the-art AI model for free. But think it through: when those developers build a product on Gemma 4, where will they train and serve it? A large share will choose Google Cloud Platform and TPUs. Gemma is optimized for TPU, and integration with Google Cloud's Vertex AI is the smoothest path.

The Apache 2.0 license makes commercial use entirely free. This is a strategy designed to collide head-on with the paid API models of OpenAI and Anthropic. "Do you pay millions per month in API fees to use GPT or Claude, or do you run Gemma yourself on Google Cloud for free?" Faced with that question, a cost-sensitive startup has every incentive to choose the latter.

Google's calculus is plain. Give the model away to secure the developer ecosystem and make that ecosystem run on Google Cloud. This is the strategy Google has repeated through history. The reason Android was free, exactly. Android was given away to dominate the smartphone market, and revenue followed from Google services (search, ads, Play Store) running on top. Chrome browser is the same. Distributed for free to dominate the web's standards and to protect search ad revenue. Gemma 4 is the AI-era version of this strategy. The model is free; the cloud is paid. The bait is best when it is big and beautiful.

**AMD's strategy: free software to sell hardware**

The reason AMD's Lemonade is open source is more intuitive. In today's AI inference and training market, NVIDIA wields overwhelming dominance through the CUDA software ecosystem. Developers are fluent in CUDA — code is locked to CUDA — and so the migration to AMD GPUs simply does not happen. Even when hardware performance is comparable, NVIDIA keeps winning on software compatibility. AMD's counter? Remove the software switching cost entirely.

Release Lemonade as fully open source and offer a differentiated inference pipeline that uses not only the GPU but also the NPU. Pitch developers: "There is no cost to using our software, and you can do GPU+NPU hybrid inference that you cannot do on NVIDIA." For AMD, software is not a cost center but a strategic investment to drive hardware revenue. The better Lemonade works, the more attractive AMD Ryzen AI processors and Radeon GPUs become.

This is an old pattern in tech. Red Hat distributed Linux for free and built revenue through enterprise support contracts. Sun Microsystems gave Java away while selling server hardware. Same structure. The textbook application of the economic principle that "commoditizing complements increases demand for the core product."

**Alibaba's strategy: the only weapon of a latecomer**

Alibaba's situation differs fundamentally from Google's or AMD's. The biggest difference is geopolitics. It is regulatorily near-impossible for a Chinese company to sell AI services directly in the U.S. and European markets. Cloud service contracts? Government procurement? Enterprise AI solutions? All blocked by geopolitical barriers. U.S. tech restrictions on China are tightening, and Europe similarly distrusts Chinese services on data-sovereignty grounds.

In that environment, the only path for Alibaba to gain influence in the global AI market is open source. Release Qwen as open source, and developers worldwide download and use it directly. Regulators have no real way to stop that. The code and weights spread globally through GitHub and Hugging Face. Through this process, recognition of Alibaba's technical capability accumulates, and in markets with lower geopolitical barriers — Southeast Asia, the Middle East — Alibaba Cloud's competitiveness rises. When open-source models are widely used, demand also grows for Alibaba's AI tech ecosystem (training infrastructure, inference optimization tools, development platforms).

As DeepSeek R1 demonstrated in early 2025, open source is the most legitimate and effective way for Chinese AI companies to project global influence while routing around regulation. Qwen 3.6-Plus's "towards real world agents" positioning is an expression of the intent to prove value in actual business use cases beyond simple benchmark competition.

The strategic contexts of the three companies differ, but the structure is identical. The model is the bait; the real revenue lives in the ecosystem stacked on top — cloud infrastructure, hardware sales, developer tools. Releasing the model for free is not a loss but an advance investment to claim a larger market.

---

## 3. Local AI — between promise and reality

The explosion of open models is deeply intertwined with the "local AI" surge. Running LLMs on my laptop, on my workstation, without depending on the cloud — privacy, cost savings, offline use. An appealing vision built on three promises. But there is a gap between promise and reality that cannot be ignored.

**Ollama MLX: the local AI experience on Mac**

Ollama 0.19's Apple MLX support is a practical milestone for Mac users. Until now, Ollama ran on llama.cpp and could not extract 100% of Apple Silicon's performance. With native MLX support, Apple Silicon's unified memory architecture can be exploited fully, and perceived speed has improved considerably.

On M3 Pro and above, running a mid-sized model on the order of Gemma 4 (12B~27B parameters) yields generation speeds of 20~30 tokens per second. For everyday use as a coding assistant, document summarizer, or email draft helper, that is comfortably practical. Responses start within 1~2 seconds; short answers complete almost instantly.

But limits are also clear. On an M3 Pro with 36GB of unified memory, running models larger than 30B parameters noticeably slows the entire system. Because the LLM consumes most of the memory, comfortably running a local LLM while also keeping dozens of browser tabs and an IDE open is still impractical. The model formats MLX supports are also still limited, so not every open model can be run on MLX immediately — that must be factored in.

**AMD Lemonade: the practical value of the NPU**

That AMD Lemonade uses the NPU is technically interesting, but NPU performance today is quite limited compared to GPUs. The NPUs in the Ryzen AI series are mainly effective for small models (7B parameters and below); for large models, the GPU is still the workhorse. Running a large model on the NPU alone is unrealistic on current-generation hardware.

So where does the NPU's real value lie? Power efficiency. When running LLMs on battery-powered laptops, NPUs show significantly lower power consumption than GPUs. In a scenario where you open the laptop during a meeting and use a local AI assistant, running the GPU at full tilt drains the battery in 30 minutes, while the NPU can keep going for 2~3 hours. With GPU+NPU used together, you can also distribute workloads — small models on the NPU, large models on the GPU. But it is still early to declare that "because we have NPUs, local AI is now practical."

**DRAM prices: the physical barrier of local AI**

In the same week, hardware reviewer Jeff Geerling's analysis "DRAM price spikes are killing the hobbyist SBC market" hit 605 points on Hacker News. The timing is no accident. Local AI requires large amounts of memory, and the price of that memory is spiking.

The numbers make the reality vivid. To run an LLM locally you must load the model weights into memory. A 30B-parameter model 4-bit quantized requires about 16GB; a 70B model needs 35~40GB. Account for the OS and other applications, and 64GB is the "minimum comfortable" tier and 128GB+ is "comfortable." A workstation with 64GB of memory now costs 20~30% more than in 2025. The Mac Studio with 192GB of unified memory still costs more than 6 million won.

The claim that "local AI saves cloud API costs" is not so simple a calculation once you factor in upfront hardware investment. A developer spending 100,000 won a month on the Claude API would need 5 years for a 6-million-won Mac Studio bought as a local AI rig to break even. Of course there are non-monetary benefits — privacy, offline use — but on pure cost terms, the cloud API is still often the more rational choice.

**The shifting dynamics inside closed models**

While discussing the reality of local AI and open models, we cannot miss the dynamic shift happening inside the closed-model market. According to Bloomberg, Anthropic's popularity is surging while OpenAI's secondary-market demand is in decline. This phenomenon is not explained by open-model pressure alone. It means that even among closed models, "execution" and "developer experience" are now decisive battlegrounds.

Claude has shown standout strength in coding agents and long-form analysis, and the customer migration of software development firms and professional-services firms in particular is accelerating, by various analyses. As tools like Claude Code embed deeply into developers' real workflows, the basis of model selection is shifting from "numbers on a benchmark sheet" to "felt value in actual work." Forbes's "OpenAI Graveyard" article should be read in this context — when announcements are glossy but do not translate into shipped products, trust from developers and enterprise customers erodes — slowly, but surely.

The reality check: local AI is possible. For developers with an M3 Pro or better Mac, or a high-spec PC with Ryzen AI, it has already reached a practical level. But it is not yet "local for everyone." Memory prices, model sizes, power consumption — unless these three constraints are solved at once, local AI remains the tool of early adopters and technical specialists. For the vast majority of users, AI will continue to be delivered through the cloud for the foreseeable future.

---

## 4. Who wins — three scenarios

Predicting the final outcome of the open-model war precisely is impossible. Too many variables, and the pace of technical progress can invalidate any prediction. But it is possible to structure plausible scenarios. And preparing for each is what a leader should be doing.

**Scenario 1: Google wins — platform domination**

The Gemma ecosystem becomes the de facto industry standard. Most developers build products on Gemma models, and for fine-tuning and serving they naturally converge on Google Cloud and TPUs. As Gemma-compatible tools and libraries become the richest, network effects kick in, and later open models are forced to emphasize "compatibility with Gemma."

In this scenario OpenAI and Anthropic are pushed into the "premium niche" — a market serving enterprise customers who absolutely require best-in-class performance and finance/medical institutions where regulatory compliance is paramount. For this scenario to materialize, Gemma's performance must dramatically close the gap with closed models. A gap exists today, but the real power of Apache 2.0 is that history is full of cases in which "good enough" beat "best." Linux beat Unix. MySQL ate into Oracle's market share. The disruptive force of "free and good enough" is proven by history.

**Scenario 2: Fragmentation — no one wins**

Open models commoditize and no single company dominates the model layer. Gemma, Qwen, Llama, Mistral all reach the "good enough" tier, and developers swap models freely depending on use case and context. Qwen is strong on translation, Gemma on coding, Llama on reasoning — model specialization emerges and no single model dominates.

In this scenario, value moves up one layer above the model — agent harnesses, the skill layer, orchestration frameworks become core value. Models become commodities, and "which model is combined with which task and how it is controlled" becomes the differentiator. This dovetails precisely with the "Skill as a Product" concept covered in an earlier essay. When the model is free, what you build on top of the model becomes the product. A company's AI capability is determined not by "which model you use" but by "how you use the model."

Personally, I see this scenario as the most likely. In the history of the tech industry, whenever a particular layer commoditized, value always moved up to the layer above it. When hardware commoditized, the operating system held the value. When operating systems commoditized, applications held the value. When applications commoditized, platforms and data held the value. AI models are likely to walk the same path.

**Scenario 3: Closed-model counterattack — performance gap holds**

OpenAI and Anthropic maintain — or widen — a performance gap that "open models cannot reach." The leak of Claude Mythos on Slack (per Gigazine's reporting) could be a starter pistol. If next-generation closed models show clear gaps with open models in agent-task autonomy, complex multi-step reasoning, and long-term memory and context retention, enterprise customers will still gladly pay premium API rates.

In this scenario, open models stay in "education, prototyping, and extremely cost-sensitive cases," while business-critical workloads — customer-facing services, decision support, complex automation — go to closed models. This resembles the configuration in which "Linux dominated the server, but the desktop stayed on Windows and macOS." Open and closed coexist in different territories.

The critical variable for this scenario is "whether the performance gap holds." Because open models advance at startling speed, closed models can maintain the gap only by pouring enormous research investment in continuously. Only companies with a revenue structure that can sustain that investment will survive this race.

Whichever of the three scenarios materializes, one thing is clear. Now that the open-model war has begun, the price of AI models converges to zero over the long run. Value migrates from the model itself to the methods of using the model — infrastructure, tools, workflows, accumulated experience. What companies must prepare for now is not "which model to choose" but "what to stack on top of the model."

When Google released Gemma 4 under Apache 2.0, many people were grateful. But the side handing out free weapons in a war is the side that chose the battlefield. And right now, the battlefield is already set.

---

## References

1. Google Gemma 4 release — DeepMind blog (HN 1,242 points)
2. AMD Lemonade — GitHub repository (HN 469 points)
3. Alibaba Qwen 3.6-Plus — "Towards real world agents" (HN 462 points)
4. Ollama 0.19 MLX support announcement
5. "DRAM pricing is killing the hobbyist SBC market" — Jeff Geerling (HN 605 points)
6. "OpenAI demand sinks on secondary market as Anthropic runs hot" — Bloomberg (HN 137 points)
7. "The OpenAI graveyard" — Forbes (HN 239 points)
8. Claude Mythos leak — Gigazine report
9. Microsoft MAI model releases — TechCrunch
