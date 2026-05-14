---
title: 'AI Goes Transparent — The Paradox Where Leaks Build Trust'
description: '"Claude Code''s source code leaked. Anthropic took down 8,000 repositories. But should they really have taken them down?"'
pubDate: 2026-04-03T05:27:56.476Z
lang: 'en'
pairSlug: 'ai-transparency-paradox'
draft: false
---
# AI Goes Transparent — The Paradox Where Leaks Build Trust

> "Claude Code's source code leaked. Anthropic took down 8,000 repositories. But should they really have taken them down?"

---

On 1 April 2026, April Fool's Day, but no joke. The full source code of Claude Code leaked onto GitHub. System prompts, internal tool-call structure, permission systems — the inner workings of the most carefully designed agent system Anthropic had ever shipped were laid bare. Anthropic responded with DMCA takedowns against more than 8,000 repositories and Gists. On Hacker News, "The Claude Code Leak" hit 189 points and produced a wave of active analysis. The takedowns were fast, but the internet does not remember takedowns. Thousands of people had already read the code, analyzed it, forked it.

In the same window, a project moving in an entirely different direction was thriving. asgeirtj's system_prompts_leaks repository was systematically collecting the system prompts of ChatGPT, Claude, Gemini, and Grok, and had passed 36,000 GitHub stars. Not a leak — an archive. The community was treating this not as a problem but as a resource. There was active discussion of how each model's system prompt had evolved over versions and analysis of the differences between models. The urge to see inside an AI system is not idle curiosity. It is a structural demand for the precondition of trust — wanting to know the principles by which the tool you depend on every day actually operates.

Place these two events side by side and a current emerges. The thesis of this essay is simple. The interiors of AI systems are going transparent. Companies try to stop it, but transparency is becoming the precondition of trust. The answer is not to prevent leaks, but to build a structure in which leaks are unnecessary.

---

## 1. What leaked — the record of April 2026

Start with the scale of the Claude Code source leak. What surfaced was not a stray fragment of code. The full system prompt was published — the complete text of the behavioral guidelines the model references in every conversation. The permission system governing reads and writes to files, the confirmation flow before executing dangerous commands, the exploration strategy used when analyzing a user's codebase were all exposed. The internal tool-call structure was visible too. Which tools are called in what order, the pipeline the agent's "thinking" passes through, the points at which safety guardrails intervene — all laid out. This was less a code leak than a leak of design philosophy. The full structure of how Anthropic balances safety and usefulness for AI agents — the trade-offs and decisions of years — became visible.

The system_prompts_leaks repository is a different kind of phenomenon. The project aims to archive the system prompts of major AI models. Not just collection — it also tracks how system prompts change across model updates. 36,000 stars are not the interest of a fringe. Developers, researchers, and technical leaders want to know "what instructions the AI is operating under." The system prompt determines the model's character. Even the same Claude Opus 4.6 behaves entirely differently under different system prompts. Without knowing this prompt, the user cannot understand the essence of the tool they are using. It is like gripping the steering wheel of a car without knowing the conditions under which the brakes engage.

In the same window, the capabilities of AI themselves became transparent. Claude wrote a complete FreeBSD remote kernel RCE. The fact that an AI generated the entire exploit code for the vulnerability registered as CVE-2026-4747 — vulnerability analysis, exploit code, root-shell acquisition — drew 267 points on Hacker News and significant controversy. Work that previously would have taken a skilled security researcher weeks was completed in a single session. As AI capabilities become transparent, so do the dangers. The incident posed a fundamental question: is it more dangerous to hide AI's offensive capabilities, or safer to disclose them so defense can be prepared? That question returns later in this discussion.

Then there was the community response. "Claude Code Unpacked: A visual guide," published at ccunpacked.dev, organized Claude Code's internals into diagrams and explanations. It hit 1,093 points on Hacker News. This was not a simple mirror of the leaked source. The community voluntarily analyzed the structure and reconstructed it in a visual form a non-specialist could understand. What the company tried to remove, the community remade in a more accessible form. The reaction matters more than the leak itself. The number 1,093 is evidence that people want to see inside the AI. Not to break security, but to understand the operating principles of the tool they depend on. This is not a threat — it is the sign of a healthy technical ecosystem.

---

## 2. Transparency vs. security — the unending tug of war

The corporate position is clear. A system prompt leak is a competitive leak. The product of hundreds of hours of prompt engineering, thousands of A/B tests, and red-team safety evaluations is handed to a competitor in a single breach. A single system prompt encodes the model's personality, safety standards, and tool-use strategy. If a competitor copies it directly, months of R&D investment go to waste. The security threat is real as well. Knowing the structure of the system prompt makes jailbreaks easier, exposes the exact trigger conditions of safety guardrails, and multiplies the attack vectors that circumvent them. Anthropic's takedown of 8,000 repositories is not overreaction but a rational decision to protect intellectual property and user safety. At least within the corporate frame.

The community's frame is fundamentally different. "You can trust it only if you can see the structure." Recall the sycophancy problem covered in the previous essay. To solve the structural flaw of AI flattering its users — the agreement bias produced by RLHF — you need defensive structure. Agent Harnesses are verifiable precisely because they expose their defensive structure transparently. SYCOPHANCY.md codifies the rules — cap of 5 affirmations per 5 exchanges, immediate flagging when opinion reversals are detected — and makes them publicly readable. Had those rules been secret, the community would have had no way to verify "is sycophancy actually being prevented?" There is a fundamental difference between "trust us" and "check for yourself." The transparency of the defensive structure was the foundation of trust.

We already have plenty of examples of trust collapse caused by opaque systems. The incident in which GitHub Copilot inserted product advertising into pull requests racked up 1,444 points on Hacker News and enraged the developer community. AI-generated code reviews were carrying product ads. Users had no advance knowledge of the feature. Code review is one of the most trust-critical activities in the development process. The model — like a colleague reviewing your code — analyzes your pull request and suggests improvements. And now there is an ad slipped in among that feedback. Commercial content was being injected as if it were technical advice, without the user's awareness. The essence of the problem was not the ad but the opaque decision structure. The core was that users could not know "what exactly this tool does in my code review." Had the insertion of ads been disclosed in advance, users could have chosen. The absence of transparency stripped them of choice.

The ChatGPT Cloudflare Turnstile incident has the same structure. An analysis that hit 938 points on Hacker News revealed that ChatGPT, through Cloudflare, was collecting 55 browser attributes from users. Data collection at the level of browser fingerprinting was happening in a way users could not perceive. Screen resolution, installed plugins, time zones, GPU information — combinations of such attributes allow individual users to be identified with high precision. Technically, Cloudflare Turnstile is a reasonable tool for bot detection. Protecting a service from automated attacks does require this kind of verification. The problem is that "what is being collected" was never explained to users. The justification — data collection for security — is understandable. But if users cannot know what those 55 attributes specifically are, how the collected data is used, or how long it is retained, then it is not security; it is indistinguishable from surveillance.

The common thread of the two incidents is simple. Opaque systems produce distrust regardless of intent. Even a well-intentioned feature, once discovered while still hidden, registers as betrayal. Copilot's ad insertion may have been an experiment to improve user experience. Cloudflare Turnstile may have been purely about security. But whether intent is benign or malicious, when execution is opaque, trust breaks. The cost of rebuilding trust once broken always exceeds the cost of running transparently from day one. By contrast, open protocols like superpowers or SYCOPHANCY.md do not hide their defensive structure. The skill code is fully published. Anyone can read it, fork it, improve it. Defensive transparency becomes a strength, not a vulnerability. This is the exact point where the corporate frame and the community frame collide.

---

## 3. Disclose the system prompt — defense works when it is transparent

Cryptography has Kerckhoffs's principle. Proposed in 1883, the core is simple. "The security of the system should rest on the secrecy of the key, not the secrecy of the algorithm." The cryptographic algorithm itself must be safe to publish. Secrecy must reside only in the key. Modern ciphers like AES and RSA all follow this principle. The algorithms are fully published; mathematicians and security researchers worldwide verify them. Safety comes from the secrecy of the key.

Apply this principle to AI systems and what conclusion follows? The system prompt corresponds to the algorithm. The AI's behavioral rules, safety guardrails, tool-call structure — these define "how the system operates." User context corresponds to the key. The individual user's conversation, codebase, project data — these define "what the system operates on." Following Kerckhoffs's principle, the system prompt (algorithm) can be public so long as the user context (key) is protected. No — it is safer when public. More eyes can verify it.

SYCOPHANCY.md is an instance of this principle. A cap of 5 affirmations per 5 exchanges, immediate flagging on detected opinion reversals, the instruction to independently verify a user's technical claims — all of it is public. Could anyone exploit these rules? It is possible. Knowing that "up to 5 affirmations are permitted," a malicious actor could manipulate questioning to stay within that bound. But because the rules are public, such abuse patterns can themselves be detected and addressed by the community. When abuse attempts are reported, the rules are updated. This is the self-correction capability of an open system. If the rules are secret, abuse can happen without anyone knowing. When defense is secret, the failure of defense is also secret. That is not security — it is vulnerability.

This is why the superpowers project has accumulated 132K stars on GitHub. The skill code is entirely public. The prompts used by the brainstorming skill, the criteria of the code-review skill, the sequence of analysis used by the debugging skill — anyone can read them. This is not a security vulnerability. It is the source of trust. The user can know exactly what the tool does to their code. If they dislike something, they can fork and fix it. If they have a better idea, they can send a PR. In fact, thousands of community contributions have been continuously improving superpowers' skills. The network effects produced by that openness are the substance of 132K stars.

The paradox closes here. The intuition of security is "hidden is safe." But 143 years ago Kerckhoffs proved it; modern cryptography demonstrates it; and the AI ecosystem is showing it once again — "shown is trusted." Hiding the system prompt is security through obscurity. It looks like it works, until it leaks and everything collapses. Publishing the system prompt is Kerckhoffs's principle. Building a system that is safe even when the algorithm is public. This is the harder road but also the only sustainable one.

---

## 4. Is the condition of trust control, or transparency?

Do you trust a tool that does not show you its interior?

The question reaches past technology into philosophy. When we trust something, we often do not ask what the basis of that trust is. Do you trust your bank? Not because you know its internal operations, but because there are transparency mechanisms — regulatory oversight and external audit. Financial institutions disclose financial statements, independent auditors verify them, regulators supervise. This layered transparency is the foundation of trust. Do you trust your doctor? Not because you understand the entire reasoning process of a physician, but because there are transparency mechanisms — medical education systems, peer verification, legal liability for malpractice. Trust does not come from control. It comes from verifiability. Demanding trust in something that cannot be verified is obedience to authority, not trust.

And yet most of the current AI industry is demanding exactly that. "Our AI is safe. We can't show you the inside, but please trust us." That is structurally equivalent to a bank saying, "We don't disclose financial statements, but we are sound."

Anthropic's dilemma is the dilemma of the entire AI industry. The harder you try to prevent leaks, the more distrust grows in the community. "What are they hiding that they delete so desperately?" Disclose and you lose competitive edge. Hundreds of hours of prompt engineering become a competitor's starting point. This is a real dilemma. Both sides have rational grounds, and neither can step back easily.

But the data points one way. Look at the achievements of the open-protocol camp. Superpowers published its skill code in full and recorded 132K stars. SYCOPHANCY.md transparently codified its defensive rules and built a virtuous cycle in which the community verifies and improves them. The "Claude Code Unpacked" visualization guide hit 1,093 points and democratized understanding of AI internals. Look at the other side. Copilot hid PR ad insertion and met a 1,444-point trust crisis. ChatGPT hid the collection of 55 attributes and faced a 938-point surveillance controversy. The pattern is consistent. Transparency creates growth; opacity creates crisis. This is not an emotional verdict but the collective intelligence of the community as expressed in the quantitative indicator of Hacker News scores.

Of course this cannot be simplified into a maxim. Publishing everything is not the answer. As CVE-2026-4747 shows, when AI capabilities become transparent, so do the dangers. Disclosing that an AI can write a full FreeBSD remote kernel RCE gives information to both defenders and attackers. Publishing model weights is a different level of risk than publishing the system prompt. The scope and method of transparency need careful design. "What" and "how far" must be decided with judgment. But the direction is clear. The era of debating "publish or not" is over. We are debating "what to publish."

When Claude Code's source leaked, Anthropic took down 8,000 repositories. But the visualization guide the community built scored 1,093 points on Hacker News. The community reconstructed what the company tried to erase — and made it more accessible. Who is building trust here? The takedowns, or the visualizations?

Leaks can be stopped. The demand for transparency cannot. And how a company responds to that demand — with deletion or with disclosure — is what ultimately decides whether that company is trusted.

---

## References

1. "The Claude Code Leak" — Hacker News discussion (189 points)
2. asgeirtj/system_prompts_leaks — GitHub (36K stars)
3. "Claude Code Unpacked: A visual guide" — ccunpacked.dev (Hacker News 1,093 points)
4. "Claude wrote a full FreeBSD remote kernel RCE with root shell" — CVE-2026-4747 (Hacker News 267 points)
5. GitHub Copilot PR ad insertion incident (Hacker News 1,444 points)
6. ChatGPT Cloudflare Turnstile analysis (Hacker News 938 points)
7. SYCOPHANCY.md Protocol v1.0 (2026)
8. Kerckhoffs's principle — Wikipedia
