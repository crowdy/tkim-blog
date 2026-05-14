---
title: 'The Week GitHub Trending Was Taken Over by "Skills" — A Signal of OSS Power Shift, or a Passing Bubble?'
description: 'In the fourth week of April 2026, 5–7 of the top 15 repositories on GitHub Trending Weekly are "Claude Skills" repos. The most striking, forrestchang/andrej-karpathy-skills, added 29,944 stars in a single week to reach a cumulative 91,572. It contains not a single line of code — just a bundle of Markdown files. Is this…'
pubDate: 2026-04-27T00:00:00.000Z
lang: en
pairSlug: 'github-trending-skills-takeover'
draft: false
---
# The Week GitHub Trending Was Taken Over by "Skills" — A Signal of OSS Power Shift, or a Passing Bubble?

> In the fourth week of April 2026, 5–7 of the top 15 repositories on GitHub Trending Weekly are "Claude Skills" repos. The most striking, forrestchang/andrej-karpathy-skills, added 29,944 stars in a single week to reach a cumulative 91,572. It contains not a single line of code — just a bundle of Markdown files. Is this scene a full-fledged signal that the unit of OSS power is shifting from libraries to prompts, or a temporary bubble produced by LLM fashion?

## Introduction: A Markdown Bundle That Picked Up Roughly 30,000 Stars in a Week

If you look quietly at the top of GitHub Trending Weekly between April 21 and April 27, 2026, an unusual landscape unfolds. Sorted by new stars added during the week, the top spot belongs to forrestchang/andrej-karpathy-skills (29,944), the second to Fincept-Corporation/FinceptTerminal (10,070), the third to Z4nzu/hackingtool (6,488), followed by mattpocock/skills (5,013) and multica-ai/multica (4,882). Regroup the top 15 by category, and 5 to 7 of them fall into "Claude Skills or its adjacent infrastructure."

This pattern is meaningful because of what the No. 1 repository actually is. The README of forrestchang/andrej-karpathy-skills describes itself in a single sentence: "A single CLAUDE.md file to improve Claude Code behavior." It is a single Markdown file. There is no code that compiles, no binary to install via a package manager, no executable script. A curator named forrestchang has organized, into one file, the "traps LLM coding agents fall into" that Andrej Karpathy scattered across talks and tweets. That is the whole thing.

The number means more when set against a comparison group. deepseek-ai/DeepGEMM, which implements FP8 GEMM on top of CUDA, received 438 stars during the same week. On one side, the crystallization of GPU kernel optimization; on the other, Markdown text. The ratio of stars is roughly 68:1. This is not a simple popularity comparison; it is a cross-section showing that the definition of "what counts as an asset in OSS" is in flux.

Back to the lede question. Is this a signal of power shift or a passing bubble? It is too early to be definitive, but at least one thing is certain. **As of April 2026, it is possible to be No. 1 on GitHub Trending without writing a single line of code.** And that fact itself is rippling, in turn, into the client-vendor relationship, outsourcing evaluation criteria, and the way internal know-how is managed.

## Section 1: The Phenomenon — Skills, Context, and Agent Rising Together

Break down this week's Trending data by category and a pattern emerges beyond "there are a lot of Skills repos." Three currents are surging at once.

**First, "Skills" themselves.** mattpocock/skills (weekly 5,013, cumulative 25,107) is a curated collection of "agent skills for professional engineers" by the well-known British TypeScript educator Matt Pocock. SimoneAvogadro/android-reverse-engineering-skill (weekly 1,685, cumulative 5,186) is a Claude Code skill specialized for the narrow domain of Android app reverse engineering. What forrestchang/andrej-karpathy-skills and these two share is that their main language is Markdown or Shell. README and skill definition files are the body; shell scripts are auxiliary glue code.

**Second, context management infrastructure.** zilliztech/claude-context (weekly 3,537, cumulative 9,688) is an MCP server that lets coding agents such as Claude Code use entire enormous codebases as context. mksglu/context-mode (weekly 2,504, cumulative 10,480) is a TypeScript tool that automatically optimizes the context window of AI coding agents. Neither repo "makes a new model" or "makes a new agent." They merely "polish the interface where the agent meets the code." They create value at one level of abstraction above.

**Third, the proliferation of agent platforms and infrastructure.** multica-ai/multica (weekly 4,882, cumulative 21,615) advertises itself as "an open-source managed agent platform." HKUDS/RAG-Anything (weekly 2,639, cumulative 18,882) is an "all-in-one RAG framework." lsdefine/GenericAgent (weekly 2,936, cumulative 7,480) advertises a "self-evolving agent that starts from a minimal seed and acquires control of the entire system." thunderbird/thunderbolt (weekly 2,244, cumulative 4,204) is an "AI platform that lets users choose their own model," and Tracer-Cloud/opensre (weekly 1,511, cumulative 3,433) is a "tool to build your own AI SRE agent."

These three currents reduce to a single line: **on the premise that the model comes from outside, what context and skills are laid on top of it, and on what platform are they operated, has become the new front of OSS competition.** Repositories that build the model itself (e.g., GPU kernels like DeepGEMM) still appear in trending, but at a share comparable to that of non-AI categories (Z4nzu/hackingtool, Fincept-Corporation/FinceptTerminal).

The contrast with non-AI trending is itself telling. hackingtool received 6,488 stars but its cumulative is 65,925, so the growth rate (about 10%) is unremarkable. FinceptTerminal is explosive (10,070 weekly on a 15,746 cumulative), but its domain is strictly limited to financial terminals. By comparison, the Skills category does not confine itself by domain. The Karpathy skills cover general coding, Pocock's cover professional engineering, and Avogadro's covers Android reverse engineering. **The breadth of domains suggests that this format may be settling in not as a passing fad but as a generalizable package unit.**

## Section 2: Depth — Why "Skill" Is Becoming the Unit of Packaging Now

The phenomenon is clear. So why has this current crossed its threshold in April 2026? Four structural factors are interlocking simultaneously.

**(1) Anthropic created a standard format.**

From late 2025, Anthropic introduced a Claude Skills format. The structure is simple: YAML frontmatter plus Markdown body. A skill consists of metadata (name, description, trigger conditions) and natural-language body (procedure for Claude to follow). Separately, the MCP (Model Context Protocol) server standard unified the interface for connecting external tools to LLMs.

The effect of this standardization is analogous to the role that package.json played in the early npm ecosystem. Before package.json existed, Node.js modules expressed dependencies in disparate ways, and the rate at which reusable assets accumulated was slow. Once the package.json standard took hold, the vast ecosystem of npm exploded. The Skills surge of April 2026 can be read as an early-stage instance of the same pattern. Because there is a standard, anyone can make one, and what anyone makes can be picked up by anyone.

**(2) The barrier to entry has effectively converged to zero.**

forrestchang/andrej-karpathy-skills's ascent to No. 1 is the most dramatic case in this current. forrestchang did nothing more than collect advice scattered across Karpathy's talks, tweets, and interviews into one file. They did not train a new model, did not write a framework. And yet that single file received about 30,000 stars in a week — a figure that ranks among the highest in GitHub's history.

This fact cuts both ways. On one side, **the barrier to OSS contribution has at last dropped to the level of writing**, opening participation to domain experts who do not write code. On the other side, **the criterion for what counts as "contribution" is in flux**. Compiling someone else's lectures is curation, not creation, the critique goes. Both positions have merit, and the matter will not be resolved in the short term.

**(3) The rise of person-centric OSS — call it the "Karpathy effect."**

In the previous era of GitHub, the stars went to giant frameworks. React got them. Kubernetes got them. TensorFlow got them. In 2026 the stars are going to small prompt sets bearing a person's name. forrestchang/andrej-karpathy-skills is one such case; mattpocock/skills is another. A structure in which a person's authority converts directly into OSS value.

Two cautions apply. First, andrej-karpathy-skills is forrestchang's curation, not Karpathy's own project. The "Karpathy authority," in other words, accrues to forrestchang. Second, person-centric OSS exposes its asset value directly to changes in that person's reputation, because there is less verifiable code behavior than in a framework. This structure favors rapid spread but leaves the question of long-term stability open.

**(4) The practical consensus that context makes more difference than the model.**

We have reached the point where GPT-4, Claude Opus 4.7, and Gemini produce roughly comparable quality on the same task. At that point, the difference in output is made not by the model but by the context and instructions placed on top of it. The experience that the same Claude Code, when stacked with forrestchang's CLAUDE.md, produces different results, has been shared by tens of thousands of people and made visible in the form of stars.

This shift also explains why context-infrastructure repositories like zilliztech/claude-context and mksglu/context-mode are surging side by side. **Context is a resource, and the efficient use of that resource is a separate engineering area.** What to put into a limited token window, which parts of an enormous codebase to extract as context, how to stitch context across sessions — these questions do not disappear when models get better; they get sharper.

The possibility of a bubble cannot be ruled out. The number "about 30,000 stars in a week" undeniably mixes in curiosity, fashion, and social-media word of mouth. No one knows what share of those repositories will actually be used in six months. But **independent of the longevity of individual repositories, the addition of "Skill" as a package unit to the OSS vocabulary appears to be a change that is hard to reverse.** Once a vocabulary exists, assets to fill it continue to be made.

## Section 3: Implications — The Criteria for IT Outsourcing Evaluation Are Changing

Where does this current touch the day-to-day of an IT manager at a client firm? It can be organized into three scenarios.

**Scenario A: When the vendor says "we use Claude Skills."**

In 2026, more vendors are pitching at the quote stage that "our company has a standard workflow based on Claude Skills, so we can handle the same work 30% faster." This can be taken at face value, or it can be dismissed. From the client side, the questions worth examining are:

- Which Skills are used under which triggers? Is there a company-wide standard, or is it at the discretion of individual engineers?
- How are Skills version-controlled? Is there a Git repository? Are change histories tracked?
- Can the client's coding conventions and architectural principles be reflected in the Skills? In other words, is customizing the Skills for the client included in the quote?

If a vendor answers these questions naturally, the Skills adoption has substance. If a vendor stumbles, it is more likely marketing language. **This is less about whether Skills themselves are good or bad and more about a litmus test for whether that vendor has actually absorbed the OSS current into its operating system.**

**Scenario B: Considering the "Skillification" of Internal Know-How.**

Teams that operate systems in-house have reached a point of considering whether to externalize their operational know-how in Skill format. Procedural knowledge such as "the verification steps that must be followed when modifying the payment module" or "the checklist to follow during customer-data migration" is a natural fit for expression as Skills.

The benefits of introducing this are clear. New hires, outsourced staff, and shift workers can follow the same procedure at the same quality, and AI agents can assist with the same procedure. But there are not only benefits. Scenario C is the shadow side.

**Scenario C: The Double Edge of IP Externalization.**

The essence of the Skill format is to **express internal procedures in natural-language Markdown**. This is a powerful asset for internal sharing, but it also means that **know-how is being standardized into a form that flows out of the organization more easily than before**. Code is often buried inside build artifacts, but a Skill file is human-readable text itself.

The boundary between client and vendor also becomes subtle. If a vendor engineer publishes a Skill that interacted with client code on their own GitHub, whether that constitutes general knowledge or client IP can become ambiguous. As of 2026, there is no industry-standard contract clause for this. We can expect a gradual emergence of firms that add clauses specifying "the ownership of Skill artifacts and the scope of permissible disclosure." It is not mandatory, but it is a change worth examining.

Taking the three scenarios together, the Skills current is not simply a matter of "should we adopt a new technology." **It affects three layers: outsourcing evaluation criteria, internal know-how management, and contract clauses.** And this effect penetrates practice faster than the model itself does. Models can be bought from outside; Skills must be made yourself.

## Conclusion: Bubble and Vocabulary Are Different

Back to the lede question. Was this week's takeover of GitHub Trending by Skills a signal of power shift or a passing bubble?

The data suggests "both." There is undeniably a bubble in the roughly 30,000 stars that forrestchang/andrej-karpathy-skills received. Six months from now, the share of people who use that repository routinely will be far smaller than today's star count. This is the historical pattern of OSS trending, and there is no reason the Skills category alone would be exempt.

But something remains after the bubble deflates. **"Skill" as a package unit, "context infrastructure" as a distinct engineering area, and "MCP" as a standard interface** have been added to the OSS vocabulary. Once vocabulary is added, thoughts about what to make with it are produced, and those thoughts produce artifacts. Vocabulary, unlike bubbles, does not deflate.

The practical question this week's Trending poses to a client-side IT manager is simple. **"Does our vendor know how to handle Skills, and how have we defined the ownership of Skills toward our vendor?"** Having an answer to this question within the next quarter is likely to be a reference point that does not waver whatever the model is replaced by.

We live in an era where a Markdown file with no code can receive about 30,000 stars in a week. The fact is striking, but the real change is on its reverse side. **The form in which know-how converts into an asset has been wholly renewed.** An understanding of that form will likely make small but decisive differences in both outsourcing decisions and internal operations going forward.

## Sources

- GitHub Trending Weekly (collected April 21–27, 2026)
- forrestchang/andrej-karpathy-skills: https://github.com/forrestchang/andrej-karpathy-skills
- mattpocock/skills: https://github.com/mattpocock/skills
- zilliztech/claude-context: https://github.com/zilliztech/claude-context
- mksglu/context-mode: https://github.com/mksglu/context-mode
- SimoneAvogadro/android-reverse-engineering-skill: https://github.com/SimoneAvogadro/android-reverse-engineering-skill
- multica-ai/multica: https://github.com/multica-ai/multica
- HKUDS/RAG-Anything: https://github.com/HKUDS/RAG-Anything
- Anthropic Model Context Protocol official documentation: https://modelcontextprotocol.io
