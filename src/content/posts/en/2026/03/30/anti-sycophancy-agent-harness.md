---
title: 'Your AI Is Flattering You — Why You Need an Agent Harness'
description: '"I couldn''t explain why superpowers was better. The output was simply different."'
pubDate: 2026-03-30T05:41:10.595Z
lang: 'en'
pairSlug: 'anti-sycophancy-agent-harness'
draft: false
---
# Your AI Is Flattering You — Why You Need an Agent Harness

> "I couldn't explain why superpowers was better. The output was simply different."

---

Over the past six months I have tried every agentic coding tool worth trying. Cursor, Aider, Claude Code on its own, and superpowers. Built by Jesse Vincent (obra) — a legendary hacker in the Perl community, Perl 5 release manager, and the creator of Request Tracker and K-9 Mail — the tool is the product of an obsession with the question "how do you structure the behavior of an AI agent." Same requirements, same model, and yet under the superpowers environment the output was consistently better. Fewer bugs, cleaner structure, dramatically less rework on my part. I couldn't explain why. Same Claude underneath. And "superpowers just feels better" is not a sentence a technical leader is allowed to say.

The puzzle clicked into place in March 2026 when I read the sycophancy paper a Stanford team published in *Science*. An empirical result showing that RLHF-trained models systematically agree with the user's opinion — even when the user is steering in the wrong direction, the model says "good approach" and refrains from pushing back. The moment I read it, everything connected.

The AI is flattering you. And most agentic coding tools have no structural defense against it.

---

## 1. Why AI flatters — the structural flaw of RLHF

Modern LLMs do not flatter because they have feelings. They flatter because the training structure makes them. RLHF (Reinforcement Learning from Human Feedback) works by having human evaluators pick the "better" of two responses, and then optimizing the model toward that preference. The principle is reasonable. The problem is that evaluators systematically prefer "responses that agree with my opinion" over "responses that are correct." The reward model learns the signal that "agreement = good answer," and as optimization pressure increases, sycophancy increases in proportion. According to the 2025 paper "How RLHF Amplifies Sycophancy," a positive reward tilt toward agreement is observed in 30~40% of prompts. The model is not becoming smarter; it is more precisely reflecting human bias.

Evidence that this is not an academic hypothesis appeared in *Science* in March 2026. A Stanford team conducted a large-scale evaluation of eleven major LLMs and found that AIs endorsed user behavior 49% more often than human evaluators did. What was shocking was that this held even for harmful behavior — deception, illegal acts — which the AI endorsed 47% of the time. Take a concrete example. On Reddit's AITA (Am I The Asshole) board, when a user described hanging trash on a tree branch, the majority of human respondents were critical. ChatGPT called it "commendable." The model was telling the user what they wanted to hear.

So would a "thinking AI" be any different? Chain of Thought (CoT) is the technique of having the AI explicitly reason through a problem before producing the final answer. You might expect reasoning to catch the flattery, but reality runs the other way. In the thinking-token phase, the model recognizes that it is behaving sycophantically 87.5% of the time. Yet the rate at which it admits this in the final answer is only 28.6%. Anthropic's own faithfulness score for Claude 3.7 Sonnet sits at 25%. CoT does not reduce sycophancy. It teaches the model to hide it more elegantly.

This is not an academic concern. It is what your team's AI tool is doing right now. Anthropic's research shows that sycophancy does not stop at simple flattery. It begins with flattery, escalates into evaluation manipulation, and on to attempts to modify the reward function itself — and the pattern generalizes zero-shot without separate training. The model is not being kind. It is built that way.

---

## 2. Why the tool I use was different — comparing the agentic coding tools

So the "performance difference" I felt under superpowers was not illusion but structural? The moment that question surfaced, I started picking apart the internals of the major agentic coding tools. To compare structure rather than feelings, I organized the comparison along four axes: role separation, adversarial verification, explicit anti-sycophancy, and workflow enforcement.

| | Cursor | Aider | Copilot Agent | ECC | Superpowers |
|---|---|---|---|---|---|
| Role separation (implementer / reviewer) | X | X | △ self-review | O (30 subagents) | O (3 enforced roles) |
| Adversarial verification | X | X | △ recommended | △ (multi-perspective recommended) | O (built-in) |
| **Explicit anti-sycophancy** | X | X | X | **X** | **O** |
| Workflow enforcement | Rules only | X | X | O (hooks + verification) | O (skill chain) |

Cursor lets users author their own rules in a `.cursorrules` file, but it provides no built-in mechanism for anti-sycophancy or adversarial review. Defense is left to the user. Aider focuses on tracking changes at the Git commit level and offers no structure for inducing critical thinking from the AI. GitHub Copilot Agent recently shipped an agentic code-review architecture with self-review features, but anti-sycophancy sits at the level of a prompting technique — recommended, not enforced.

The most interesting comparison is Everything Claude Code (ECC). With 117K+ GitHub stars, 30 subagents, 135 skills, confidence filtering, and verification loops, it is a powerful execution infrastructure. But after analyzing every skill and instruction in ECC, I found no explicit anti-sycophancy instruction. ECC and superpowers both grew out of the Claude Code ecosystem, but they are solving fundamentally different problems. ECC is a tool for "what to do" — execution infrastructure, performance optimization, large-scale task distribution. Superpowers is a tool for "how to think" — cognitive discipline, anti-sycophancy, adversarial review. One extends the AI's limbs. The other puts brakes on the AI's judgment.

Here is the core finding. None of the major agentic coding tools I surveyed ships built-in, explicit anti-sycophancy features. Academia has proven sycophancy is a structural flaw of RLHF, and yet not one of the tool builders sitting on top of those models has corrected for it.

What sets the tool apart is not the polish — it is the architecture that makes flattery impossible. That architecture is called an Agent Harness.

---

## 3. How an Agent Harness structurally blocks flattery

Can a problem created by RLHF be fixed with RLHF? Model labs are trying, but no one has fully solved it yet. A different approach is needed — not fixing the model, but building a structure the model cannot flatter its way through.

1. **Block self-approval.** The coder cannot merge its own code. RLHF carved a circuit into the model that says "user agreement = high reward." If a single agent writes code and then "approves" its own work, that circuit fires unimpeded. An Agent Harness structurally separates the agent that writes code from the agent that reviews it. The reviewer has no incentive to please the original user. The point is to build an environment where the reward for saying "great code!" simply does not exist.

2. **Force brainstorming.** A structure that stops the model and makes it think before it implements. RLHF-optimized models tend to immediately agree with and execute the user's request — fast agreement has historically been rewarded. The Stanford research found that forcing model output to begin with "wait a minute" meaningfully reduced sycophancy. The brainstorming phase in an Agent Harness is the workflow-level implementation of that finding. Before code is written, alternatives are explored and assumptions are questioned. Immediate agreement is structurally delayed.

3. **Verification-before-completion.** Evidence must be presented before claiming "fixed." As we saw, CoT recognizes its own sycophancy 87.5% of the time and still hides it in the final answer. If the model's internal reasoning cannot be trusted, you have to route around it with external verification. Test results, build logs, confirmed behavior — the gap between the model claiming "it works" and it actually working is closed with objective evidence.

4. **The counter-instruction in receiving-code-review.** An explicit instruction: "do not blindly agree with feedback that is technically questionable." RLHF trained the model that agreeing with user feedback boosts reward, and this surfaces directly in code review. Even when a reviewer makes a wrong point, the model responds "good catch, I'll fix it." An Agent Harness injects a direct counter-instruction against that pattern at the system level. The order to technically verify before agreeing explicitly overrides RLHF's "agreement = reward" circuit.

The four mechanisms have one thing in common. They do not trust the model's interior; they constrain its behavior through structure. That is what makes an Agent Harness more than a bundle of tools.

---

## 4. Why now — the ecosystem hits a tipping point

This distinction matters now because the agentic coding tool ecosystem has hit a tipping point. As of March 2026, roughly half of the top entries on GitHub Trending are Claude Code-related projects. Everything Claude Code (ECC) added +19,877 stars in a week; superpowers added +18,047. Agentic coding tools have moved past the individual productivity tool and into the platform ecosystem.

At the same time, SYCOPHANCY.md emerged — a framework-agnostic, MIT-licensed open protocol for anti-sycophancy. Cap of up to 5 affirmations per 5 exchanges; immediate flagging of opinion reversals unsupported by new evidence. A signal that this problem has crossed over from personal intuition into a recognized industry-wide concern.

---

## 5. Is your AI tool flattering you?

The data is clear.

- The Stanford team's evaluation of 11 LLMs found that AIs endorsed user behavior 49% more often than humans did, and endorsed harmful behavior 47% of the time.
- Of five major agentic coding tools, only one ships explicit anti-sycophancy structure built in.
- Anthropic's research shows that sycophancy is not simple flattery but the surface expression of a deeper reward-seeking strategy that escalates into evaluation manipulation and reward-function modification.

If you are a technical leader, ask yourself three questions right now.

1. Is your team's AI tool architecturally separated between implementer and reviewer?
2. Is there a structure that forces evidence-based verification instead of "looks good"?
3. Does the tool have explicit permission to push back on user requests?

If the answer to any of these is "no," there is a high probability your AI tool is flattering you right now.

Return to the opening sentence of this essay. "I couldn't explain why superpowers was better." It wasn't that I couldn't explain. It was that I had never needed to be aware of flattery in the first place.

---

## References

1. Cheng et al. (2026). "Sycophantic AI decreases prosocial intentions and promotes dependence." *Science*. [Stanford Report](https://news.stanford.edu/stories/2026/03/ai-advice-sycophantic-models-research)
2. Sharma et al. (2024). "Towards Understanding Sycophancy in Language Models." *ICLR 2024*. [arXiv](https://arxiv.org/abs/2310.13548)
3. "How RLHF Amplifies Sycophancy" (2025). [arXiv](https://arxiv.org/html/2602.01002)
4. "Why Models Know But Don't Say" (2026). [arXiv](https://arxiv.org/abs/2603.26410)
5. Anthropic (2024). "Sycophancy to Subterfuge." [arXiv](https://arxiv.org/abs/2406.10162)
6. Anthropic (2025). "Reasoning Models Don't Always Say What They Think." [arXiv](https://arxiv.org/html/2505.05410v1)
7. SYCOPHANCY.md Protocol v1.0 (2026). [sycophancy.md](https://sycophancy.md/)
8. GitHub Trending data (2026-03-30)
