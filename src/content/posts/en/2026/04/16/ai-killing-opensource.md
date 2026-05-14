---
title: 'Is AI killing open source? — Three shadows over the open-source camp, spring 2026'
description: 'Companies closing their source citing security, tools that fly the open-source flag while drifting toward closed, and research arguing AI is reshaping cybersecurity itself. Five stories that lit up Hacker News in the second week of April 2026 share one question: can open source really survive the AI era?'
pubDate: 2026-04-16T00:00:00.000Z
lang: 'en'
pairSlug: 'ai-killing-opensource'
draft: false
---
# Is AI killing open source? — Three shadows over the open-source camp, spring 2026

> Companies closing their source citing security, tools that fly the open-source flag while drifting toward closed, and research arguing AI is reshaping cybersecurity itself. Five stories that lit up Hacker News in the second week of April 2026 share one question: can open source really survive the AI era?

## Introduction: Cal.com closed its source

In mid-April 2026, Cal.com — the scheduling platform widely known as open source — announced on its official blog that it was going closed source. The Hacker News post recorded 296 points and 217 comments and triggered a fierce debate. The argument Cal.com offered for the switch was simple and provocative: "If you point AI at an open-source codebase, you can systematically scan for vulnerabilities. That is essentially handing the schematics of the vault to attackers." Cases in which AI surfaces vulnerabilities — sitting hidden in major open-source projects for decades — within hours were cited as supporting evidence.

But this announcement was not an isolated incident. The same week, several stories that simultaneously claimed the Hacker News front page formed a single large current. A scathing critique of Ollama's closed trajectory scored 363 points. An analysis arguing that AI is fundamentally changing the paradigm of cybersecurity scored 380 points. News of an Anna's Archive ruling that laid bare the legal risk of the open-access movement scored 401 — the week's top — and an immediate rebuttal of Cal.com's decision titled "Open source isn't dead" scored 325, balancing the debate. These were not isolated news items. The signs of one large structural shift surfaced together.

This essay tries to find a balanced answer to the provocative question "Is AI killing open source?" by reading these five events against each other. To preview the conclusion: open source isn't dying. But the shape we knew open source in is changing.

## 1. The closing wave: Cal.com, Ollama, and the era of "open-washing"

**Cal.com — a sudden switch on the pretext of "AI security threat"**

Read Cal.com's official blog post carefully and you'll see a fairly concrete, elaborate scenario. Now that LLMs can analyze codebases tens of thousands of lines long in one pass, attackers can perform automated vulnerability discovery at unprecedented scale and speed. In the past, an experienced security researcher needed weeks to months of manual work to read code, identify patterns, form and verify hypotheses. Today's AI combines static analysis, pattern matching, and context-aware inference, and identifies potential attack vectors in hours. Cal.com compared the situation to "publishing the schematics of your vault to the internet and hoping nobody exploits it," and argued that going closed source is an unavoidable, responsible choice to protect paying customers' data.

At the same time, Cal.com said it would publish a separate open-source project called Cal.diy for developers and hobbyists. A compromise: "close the commercial core product, but don't abandon the community entirely." But here Hacker News reactions split sharply. Critics pointed out that "closing the fully-featured product and tossing out a stripped-down separate version is a gesture far removed from the spirit of open source." Sharper voices called it "the classic bait-and-switch — grow on community contributions, then close the door once you reach a certain scale." Supporters countered that "a company deciding how widely to expose its code is a business judgment; open-source licensing does not impose a permanent obligation of disclosure."

Cal.com's decision is especially contentious because many feel it broke a "social contract" that has long operated implicitly in open-source communities. When you publish code, the community catches bugs, proposes features, sometimes contributes directly. That virtuous loop has been the core engine of project growth, and closing the door after growing effectively turns past contributors into unpaid laborers.

**Ollama — the problem with tools that wave the open-source flag while being functionally closed**

Around the same time, the Hacker News post "Stop Using Ollama" pointed out structural problems inside the open-source ecosystem from a different angle than Cal.com. Ollama is a wrapper around llama.cpp that makes it easy to run LLMs locally, and it exploded in popularity for that reason. The core appeal was that you could download and run a model with one terminal command. The author of the post laid out three core problems in detail.

First, performance. The benchmark cited shows that inference through Ollama is 1.8x slower than using llama.cpp directly. The overhead added by the wrapper layer is substantial. A 1.8x speed difference in LLM inference is not negligible. Especially in batch processing or repetitive workloads, the gap accumulates and meaningfully affects perceived performance.

Second, deceptive model-naming practices. Ollama re-packages original model names and version information into its own naming scheme, which makes it hard for users to know exactly which model and which quantization they're actually using. A specialist might check, but for Ollama's core demographic — "people who just want to easily run LLMs locally" — that opacity is a serious problem.

Third, and the central critique of the post, Ollama is gradually moving toward closed-source components and cloud services. After gathering users on the "local-first" banner, the actual development direction tilts toward a centralized service. That contradiction structurally rhymes with Cal.com. The pattern of using values like open source and local-first as marketing, then switching to closed once scale is reached.

The author recommended alternatives like using llama.cpp directly, LM Studio, Jan, Msty, koboldcpp. The post drew 363 points and 80 comments, and most comments empathized with the critique while also countering that "Ollama's contribution to popularizing local LLMs cannot be denied entirely." That tension is actually the core dilemma of the debate. Will we accept a certain amount of abstraction and centralization for convenience and mass adoption, or will we hold to pure open-source philosophy at the cost of a higher entry barrier?

Combine the two cases and a worrying pattern emerges. Use open source to acquire users and grow, then once a certain scale and commercial maturity are reached, switch to closed — or already contain closed elements in practice. Whether the cause really lies in AI, or in the structural limits of the open-source business model (you have to make money eventually, and pure open source is unsustainable), is the real heart of the debate.

## 2. "Hidden source is safer" vs "collective scrutiny is safer" — two logics that seem incompatible

**Cal.com's logic, dissected: the asymmetric assumption hidden in the premise**

Cal.com's argument can be broken down logically into this inference structure. (1) AI analyzes code overwhelmingly faster than human reviewers. (2) If the code is public, attackers leveraging AI will always find vulnerabilities before defenders. (3) Therefore going closed source is a rational security strategy.

Step (1) is true. AI's code analysis capability is already confirmed by multiple studies and real-world cases. The problem is in (2). There is a decisive premise hidden here. "Attackers actively use AI, but defenders do not (or can't use it effectively)." That asymmetric assumption is what's needed to reach the conclusion "the attacker always finds it first." But the reality in 2026 is not that.

**Anthropic's Mythos research and the "cybersecurity is proof of work" thesis**

The most direct counter to Cal.com's logic is Drew Breunig's analysis, which scored 380 points on Hacker News the same week. It builds on the results of Anthropic's LLM-based security research called Mythos, and the core thesis is this: "Vulnerability discovery is now a problem of 'pour enough compute (tokens) in.'" In other words, cybersecurity has entered a paradigm structurally similar to blockchain's proof of work.

What this thesis implies for open source collides head-on with Cal.com's conclusion. Breunig draws three core takeaways.

First, open source matters more, not less. If security has become a game of "who pours in more tokens," then open source — where collective scrutiny is possible — is structurally advantaged. When code is public, thousands or tens of thousands of developers and security researchers around the world (and the AI tools they use) can simultaneously search for vulnerabilities and submit patches. A closed-source company has only its internal security team's capacity to rely on. In the total volume of tokens poured in, the distributed community is likely to overwhelm any single firm.

Second, the software development process splits into three phases: development, review, and hardening. With AI deployed at each phase in earnest, the traditional pipeline of "write code, test, deploy, done" extends into the triple structure of "AI-assisted code authoring, AI-assisted code review, AI-assisted vulnerability hardening." In the hardening phase, AI simulates known attack patterns against the whole codebase and proactively identifies and patches potential vulnerabilities — that becomes standard process. This pipeline works most effectively when code is public so external parties can also participate in hardening.

Third, security takes on a full-fledged budgetary arms-race character. If the tokens defenders pour in exceed what attackers pour in, you're safe; the reverse and you get breached. In this arms race the open-source community can pool resources distributed across the world, forming a defense network at a scale even the largest single corporation cannot match alone. That is one of the structural reasons Linux kernel security has been maintained for decades.

So which side is right — Cal.com's logic or Breunig's analysis? The honest answer is probably "it depends on context." For a B2B SaaS product like Cal.com that directly handles sensitive scheduling data and personal information, a single vulnerability can cascade into a major data breach, so a defensive, conservative strategy can be business-rational. Infrastructure-level software (the Linux kernel, OpenSSL, PostgreSQL, etc.), in contrast, is so widely used that closing the source is practically impossible, and collective scrutiny is the more effective defense. The problem is that Cal.com extended its product-specific situation into the universal, overblown claim that "AI has made open source itself fundamentally dangerous."

**The Anna's Archive ruling — the legal boundary of open access**

Meanwhile, in a different domain entirely from software, an event exposed the danger of the "open access" value starkly. Anna's Archive, which has offered scholarly materials, books, and music for free, received a $322 million judgment (about ₩430 billion) in a copyright infringement suit brought by Spotify. Anna's Archive did not appear at trial; it was effectively a default judgment.

The case is not directly tied to open-source software. But it is important as an example of what happens when the ideology of "open access" collides head-on with existing legal frameworks and intellectual property regimes. The overwhelming response of 401 points and 402 comments is evidence of that symbolism.

Hacker News reactions split predictably and complexly. The open-access camp's view that "access to knowledge and culture is a basic human right" clashed sharply with the IP camp's view that "without legitimate compensation for creators and rights holders, the creative ecosystem itself collapses." That tension extends directly into the open-source software world. Is it legal for AI companies to include large amounts of open-source code in training data? Can open-source licenses be interpreted to permit even AI training? These questions still lack settled legal answers, and the Anna's Archive ruling is a reminder that courts may still side with "property" over "open."

**"Open source isn't dead" — the structure of the rebuttal**

The rebuttal that appeared almost immediately after Cal.com's announcement, on strix.ai, scored 325 points and balanced the debate. Its logic is worth noting because it is not emotional open-source advocacy but a systematic rebuttal of Cal.com's inference chain.

The core counterpoints. First, AI-assisted vulnerability discovery is not a new threat at all. Even before AI, automated fuzzing tools, static analyzers, and symbolic execution tools were used to find vulnerabilities. AI has made the process faster and more refined, but the category of threat has not changed. Second, closed source is not safe. Reverse engineering, binary analysis, and decompilation techniques are already highly developed, and serious vulnerabilities continue to be found in closed-source software. The fact that hundreds of security patches are released every year for products that have never published their source — Microsoft Windows, Adobe's product suite — proves this. Third, Linus's Law — "given enough eyeballs, all bugs are shallow" — still holds in the AI era. If AI can be used to find vulnerabilities, it can of course be used to fix them, and that fix's speed and reach are maximized when code is public.

The most important point in this rebuttal is that it identifies the flaw in the equation "AI + open source = danger." The more accurate equation is "AI + all software = (newly elevated) risk." Regardless of openness, AI can search for vulnerabilities through many vectors: binary analysis, fuzzing, API probing, network scanning. The marginal security benefit of closing the source may not be as dramatic as Cal.com claims. If anything, closing the source can cut off the community's security contributions and ultimately lower overall security posture.

## 3. Three scenarios practitioners should watch, with concrete implications

Step back from the debate and look at it from the perspective of people who actually design, ship, and operate systems. The path forward roughly splits into three scenarios.

**Scenario 1: Open-source contraction (pessimistic)**

Cal.com's move becomes an industry precedent, and more companies cite "AI security threats" to close their source. Like Ollama, "open-washing" — formally claiming open source while functionally being closed — becomes common. As a result, application-level open-source projects (outside core infrastructure like Linux and Kubernetes) drop sharply, and the software ecosystem as a whole grows more dependent on vendors. If this scenario plays out, the direct hit lands on development teams that build their own solutions or take on projects that require customization. With fewer open-source options to choose from, commercial license costs rise and vendor lock-in risk grows.

**Scenario 2: AI-strengthened open source (optimistic)**

As Breunig's analysis suggests, AI develops in a direction that dramatically strengthens open source's collective scrutiny. Security review features in GitHub Copilot, AI-based automated code audit tools, and automated vulnerability-patching systems get widely applied to open-source projects, and defenders' AI usage structurally overwhelms attackers'. Major tech companies contribute AI security tools to the open-source community, and security gets re-established as a core strength of open source. The realization of this scenario depends on large open-source governance bodies — the Linux Foundation, the Apache Foundation, the CNCF — systematically adopting and operating AI security tooling.

**Scenario 3: A two-tier structure settles in (most realistic)**

Infrastructure-level software (operating systems, databases, frameworks, libraries) stays open source or even strengthens, while application-level software (SaaS products, business logic, services that handle customer data directly) shifts to a closed model. Cal.com's decision is an instance of the latter; the Linux kernel and PostgreSQL continue as instances of the former. In this structure, open-source projects' licensing strategy gets more sophisticated. Middle-ground licenses that "publish source but place conditions on commercial use" — AGPL (Affero GPL), SSPL (Server Side Public License), BSL (Business Source License) — become more widespread, and the spectrum between "fully open" and "fully closed" subdivides further.

**What practitioners should track across all three**

What the three scenarios have in common is that the criterion for choosing software in the AI era moves from the binary "open source or closed source" to "how mature is this software's security governance and maintenance pipeline?" Source can be public without an active security review community, and that is dangerous. Source can be closed and still safe if the internal security process is well-organized. As Ollama shows, you must scrutinize the operational structure behind the "open source" label rather than the label itself.

For customer organizations commissioning system builds in particular, several things matter more. Is the SBOM (Software Bill of Materials) for open-source components in the delivered system systematically managed? What is the security update status of each component? Is there a migration plan ready in case of a license change like Cal.com's? Because AI is rapidly changing the security landscape, working with technical partners who have these management systems in place becomes the core of risk management.

## Conclusion: Open source isn't dying — it's transforming

Back to the original question. Is AI killing open source?

The answer the five Hacker News events of this week give is closest to "No, but the form and operation of open source are definitely changing." Cal.com closed its source, but the rebuttal to that decision drew more support. Ollama's closed trajectory was met with immediate criticism and concrete alternatives. Breunig's analysis of AI and security re-confirmed the structural strengths of open source.

That does not mean there are no threats. As the Anna's Archive ruling shows, "open" and "legal" do not always point the same direction, and the legal environment surrounding open-source licensing keeps shifting in tandem with the AI training data problem. The lack of legal and ethical consensus on AI companies' use of open-source code in training remains a major source of uncertainty.

But these threats are more likely to act as selection pressure that evolves open source rather than extinguishes it. The shift to more sophisticated licensing, more systematic security governance, and a new paradigm of using AI actively for defense has already begun.

The crux is not the binary choice "open or closed" but the design question "what level of transparency and security do we combine, and how?" In an era where AI reads and analyzes code, each project and each company has to find its own optimum between the strategy of "publish source but harden the security pipeline" and the strategy of "close source but lose the community's trust and contribution." Open source isn't dying. It is simply evolving into a new shape fit for the AI era.

---
Sources:
- [Cal.com goes closed source](https://cal.com/blog/cal-com-goes-closed-source-why)
- [Open Source Isn't Dead](https://www.strix.ai/blog/cal-com-is-closing-its-code-due-to-ai-threats)
- [Stop Using Ollama](https://sleepingrobots.com/dreams/stop-using-ollama/)
- [Cybersecurity looks like proof of work now](https://www.dbreunig.com/2026/04/14/cybersecurity-is-proof-of-work-now.html)
- [Anna's Archive loses $322M Spotify piracy case](https://torrentfreak.com/annas-archive-loses-322-million-spotify-piracy-case-without-a-fight/)
