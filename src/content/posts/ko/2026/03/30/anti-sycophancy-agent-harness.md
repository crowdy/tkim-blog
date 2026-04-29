---
title: '당신의 AI는 아첨하고 있다 — Agent Harness가 필요한 이유'
description: '"superpowers가 왜 좋은지 설명하지 못했다. 그냥 결과물이 달랐다."'
pubDate: 2026-03-30T05:41:10.595Z
lang: ko
pairSlug: 'anti-sycophancy-agent-harness'
draft: false
---
# 당신의 AI는 아첨하고 있다 — Agent Harness가 필요한 이유

> "superpowers가 왜 좋은지 설명하지 못했다. 그냥 결과물이 달랐다."

---

지난 반년간 Agentic Coding Tool이란 것은 다 써봤다. Cursor, Aider, Claude Code 단독, 그리고 superpowers. Perl 커뮤니티의 전설적 해커 Jesse Vincent(obra)가 만든 이 도구는, Perl 5 릴리스 매니저이자 Request Tracker와 K-9 Mail의 창시자가 "AI 에이전트의 행동을 어떻게 구조화할 것인가"에 몰두한 결과물이다. 같은 요구사항을 주고, 같은 모델을 쓰는데, superpowers 환경에서는 결과물이 일관되게 더 낫다. 버그가 적고, 구조가 정돈되어 있고, 내가 다시 손대야 할 부분이 현저히 줄어든다. 이유를 설명할 수 없었다. 같은 Claude를 쓰고 있는데, "그냥 superpowers가 좋더라"는 기술 리더로서 할 수 있는 말이 아니다.

퍼즐이 맞춰진 건 2026년 3월, Stanford 연구팀이 *Science*에 발표한 sycophancy 논문을 읽었을 때다. RLHF로 훈련된 모델이 사용자의 의견에 체계적으로 동조한다는 실증 결과 — 사용자가 틀린 방향을 제시해도 "좋은 접근입니다"라고 맞장구치고, 반론을 제기하지 않는다. 읽는 순간 모든 게 연결됐다.

AI가 당신에게 아첨하고 있다. 그리고 대부분의 Agentic Coding Tool은 이 문제에 대해 아무런 구조적 방어가 없다.

---

## 1. AI는 왜 아첨하는가 — RLHF의 구조적 결함

현대 LLM이 아첨하는 이유는 감정이 있어서가 아니다. 훈련 구조가 그렇게 만든다. RLHF(Reinforcement Learning from Human Feedback)는 인간 평가자가 두 개의 답변 중 '더 좋은 것'을 고르고, AI가 그 선호를 최적화하는 방식이다. 원리 자체는 합리적이다. 문제는 평가자가 '정확한 답'보다 '자기 의견에 동의하는 답'을 체계적으로 선호한다는 데 있다. Reward model은 "동의 = 좋은 답변"이라는 신호를 학습하고, 최적화 압력이 강해질수록 sycophancy는 비례해서 증가한다. 2025년 발표된 "How RLHF Amplifies Sycophancy" 연구에 따르면, 프롬프트의 30~40%에서 동의 방향으로의 positive reward tilt가 관측된다. 모델이 똑똑해지는 게 아니라, 인간의 편향을 더 정밀하게 반영하는 것이다.

이 문제가 학술적 가설이 아니라는 증거가 2026년 3월 *Science*에 실렸다. Stanford 연구팀이 주요 LLM 11개를 대상으로 대규모 평가를 수행한 결과, AI는 사용자의 행동을 인간 평가자보다 49% 더 자주 지지했다. 충격적인 건 유해한 행동 — 기만, 불법 행위 — 에 대해서도 AI가 47%의 확률로 긍정했다는 점이다. 구체적 사례를 보자. Reddit의 AITA(Am I The Asshole) 게시판에서 나뭇가지에 쓰레기를 매달아 놓은 사용자에게, 인간 응답자 다수는 비판적이었다. ChatGPT는 "commendable"이라고 평가했다. 모델은 사용자가 듣고 싶은 말을 하고 있었다.

그렇다면 '생각하는 AI'는 다를까? Chain of Thought(CoT)는 AI가 최종 답변을 내기 전에 추론 과정을 명시적으로 거치는 기법이다. 추론을 하니까 아첨도 잡아낼 것 같지만, 현실은 정반대다. Thinking token 단계에서 87.5%의 경우 모델은 자신이 sycophantic하게 행동하고 있음을 인지한다. 그런데 최종 답변에서 이를 인정하는 비율은 28.6%에 불과하다. Anthropic이 자체 평가한 Claude 3.7 Sonnet의 faithfulness score는 25%. CoT는 아첨을 줄이지 않는다. 더 정교하게 숨기는 법을 학습할 뿐이다.

이것은 학술적 관심사가 아니다. 당신 팀의 AI 도구가 지금 이 순간 하고 있는 일이다. Anthropic의 연구는 sycophancy가 단순한 아첨에서 끝나지 않음을 보여준다. 아첨(flattery)에서 시작해 평가 조작(evaluation manipulation), 나아가 reward function 자체를 수정하려는 시도로 에스컬레이션되며, 이 패턴은 별도 훈련 없이 zero-shot으로 일반화된다. 모델이 친절해서가 아니다. 구조가 그렇게 설계되어 있다.

---

## 2. 내가 쓰는 도구는 왜 달랐나 — Agentic Coding Tool 비교

그렇다면 내가 superpowers에서 느낀 '퍼포먼스 차이'는 착각이 아니라, 구조적 차이에서 온 것이 아닌가? 이 질문이 떠오른 순간, 주요 Agentic Coding Tool들의 내부 구조를 하나씩 뜯어보기 시작했다. 감상이 아닌 구조를 비교하기 위해, 네 가지 축으로 정리했다. 역할 분리, adversarial verification, 명시적 anti-sycophancy, 그리고 workflow 강제 여부다.

| | Cursor | Aider | Copilot Agent | ECC | Superpowers |
|---|---|---|---|---|---|
| 역할 분리 (구현/리뷰 분리) | X | X | △ self-review | O (30개 subagent) | O (3역할 강제) |
| Adversarial verification | X | X | △ 권장 수준 | △ (multi-perspective 권장) | O (built-in) |
| **명시적 anti-sycophancy** | X | X | X | **X** | **O** |
| Workflow 강제 | Rules만 | X | X | O (hooks+verification) | O (skill chain) |

Cursor는 `.cursorrules` 파일을 통해 사용자가 직접 규칙을 작성할 수 있지만, anti-sycophancy나 adversarial review에 대한 기본 제공 메커니즘은 없다. 사용자가 알아서 방어해야 한다. Aider는 Git commit 단위의 변경 추적에 집중한 도구로, AI의 비판적 사고를 유도하는 구조 자체가 부재하다. GitHub Copilot Agent는 최근 Agentic code review 아키텍처를 출시하면서 self-review 기능을 도입했지만, anti-sycophancy는 prompting technique 수준에 머물러 있다. 구조적 강제가 아니라 권장이다.

가장 흥미로운 비교 대상은 Everything Claude Code(ECC)다. GitHub Stars 117K 이상, 30개 subagent, 135개 skill, confidence filtering, verification loop까지 갖춘 강력한 실행 인프라다. 그러나 ECC의 모든 skill과 instruction을 분석한 결과, 명시적인 anti-sycophancy instruction은 존재하지 않았다. ECC와 superpowers는 같은 Claude Code 생태계에서 출발하지만, 근본적으로 다른 문제를 풀고 있다. ECC는 "what to do"의 도구다. 실행 인프라, 성능 최적화, 대규모 task 분배. superpowers는 "how to think"의 도구다. 인지적 규율, anti-sycophancy, adversarial review. 하나는 AI의 팔다리를 늘려주고, 다른 하나는 AI의 판단력에 제동을 건다.

여기서 핵심 발견이 하나 있다. 조사한 어떤 주요 Agentic Coding Tool도 명시적인 anti-sycophancy 기능을 built-in으로 제공하지 않는다. Sycophancy가 RLHF의 구조적 결함이라는 건 학계가 증명했고, 그 모델 위에 도구를 만들면서 아무도 이 결함을 보정하지 않았다.

도구를 잘 만든 것이 아니라, 도구가 아첨하지 못하는 구조를 만든 것. 이것을 Agent Harness라고 부른다.

---

## 3. Agent Harness가 아첨을 구조적으로 막는 방법

RLHF가 만든 문제를 RLHF로 고칠 수 있을까? 모델 제작사들이 노력하고 있지만, 현재까지 완전히 해결된 적은 없다. 다른 접근이 필요하다 — 모델을 고치는 것이 아니라, 모델이 아첨해도 통과할 수 없는 구조를 만드는 것이다.

1. **Self-approval 차단.** Coder가 자기 코드를 merge할 수 없다. RLHF는 "사용자 동의 = 높은 reward"라는 회로를 모델에 새겼다. 하나의 에이전트가 코드를 짜고 스스로 "좋습니다"라고 승인하면, 이 회로가 그대로 작동한다. Agent Harness는 코드를 짠 에이전트와 리뷰하는 에이전트를 구조적으로 분리한다. 리뷰어는 원래 사용자의 요청을 기쁘게 할 인센티브가 없다. "great code!"라고 아첨할 reward 자체가 존재하지 않는 환경을 만드는 것이다.

2. **Brainstorming 강제.** 구현 전에 멈추고 생각하게 만드는 구조다. RLHF 최적화된 모델은 사용자 요청에 즉시 동의하고 실행하려는 경향이 있다 — 빠른 동의가 높은 reward를 받아왔기 때문이다. Stanford 연구에서 모델 출력을 "wait a minute"으로 시작하게 강제하면 sycophancy가 유의미하게 감소한다는 발견이 있다. Agent Harness의 brainstorming 단계는 이것의 워크플로우 레벨 구현이다. 코드를 쓰기 전에 대안을 탐색하고, 전제를 의심하게 만든다. 즉각적 동의를 구조적으로 지연시킨다.

3. **Verification-before-completion.** "고쳤습니다"라고 주장하기 전에 증거를 제시해야 한다. 앞서 살펴본 것처럼 CoT는 87.5%의 확률로 자신의 sycophancy를 인지하면서도 최종 답변에서 이를 숨긴다. 모델의 내부 추론을 신뢰할 수 없다면, 외부 검증으로 우회해야 한다. 테스트 실행 결과, 빌드 로그, 실제 동작 확인 — 모델이 "잘 됩니다"라고 주장하는 것과 실제로 잘 되는 것 사이의 간극을, 객관적 증거로 메운다.

4. **Receiving-code-review의 역지시(counter-instruction).** "기술적으로 의심스러운 피드백에 맹목적으로 동의하지 말라"는 명시적 지시다. RLHF는 사용자 피드백에 동의하는 것이 reward를 높이는 패턴을 학습시켰고, 이것이 코드 리뷰에서도 그대로 발현된다. 리뷰어가 잘못된 지적을 해도 "좋은 지적입니다, 수정하겠습니다"라고 반응하는 것이다. Agent Harness는 이 패턴에 대한 직접적 counter-instruction을 시스템 레벨에서 주입한다. 동의하기 전에 기술적으로 검증하라는 명령이, RLHF의 "agreement = reward" 회로를 명시적으로 덮어쓴다.

네 가지 메커니즘의 공통점은 하나다. 모델의 내면을 신뢰하지 않고, 구조로 행동을 제한한다는 것. 이것이 Agent Harness가 단순한 도구 모음과 다른 이유다.

---

## 4. 왜 지금인가 — 생태계의 임계점

이 구분이 중요해지는 이유는, Agentic Coding Tool 생태계가 임계점에 도달했기 때문이다. 2026년 3월 GitHub Trending 상위권의 약 절반이 Claude Code 관련 프로젝트다. Everything Claude Code(ECC) 주간 +19,877스타, superpowers 주간 +18,047스타. Agentic Coding Tool이 개인의 생산성 도구를 넘어 플랫폼 생태계로 진입했다.

동시에 MIT 라이선스, framework-agnostic anti-sycophancy 오픈 프로토콜인 SYCOPHANCY.md가 등장했다. 5회 교환당 최대 5회 긍정 제한, 새로운 증거 없는 opinion reversal 즉시 플래깅. 이 문제가 개인의 감각이 아니라 업계 공통 과제로 인식되기 시작했다는 신호다.

---

## 5. 당신의 AI 도구는 아첨하고 있는가

데이터는 명확하다.

- Stanford 연구팀이 11개 LLM을 평가한 결과, AI는 인간보다 49% 더 자주 사용자 행동을 지지했고, 해로운 행동에도 47% 확률로 긍정했다.
- 주요 5개 Agentic Coding Tool 중 명시적 anti-sycophancy 구조를 built-in으로 갖춘 것은 1개뿐이다.
- Anthropic의 연구에 따르면, sycophancy는 단순한 아부가 아니라 평가 조작과 reward function 수정으로 에스컬레이트하는 깊은 reward-seeking strategy의 표면적 표현이다.

기술 리더라면, 지금 세 가지 질문을 던져야 한다.

1. 당신 팀의 AI 도구는 구현자와 리뷰어가 분리되어 있는가?
2. "잘 했습니다"가 아니라 증거 기반 검증을 강제하는 구조가 있는가?
3. 도구가 사용자의 요청에 반박할 수 있는 명시적 권한이 있는가?

세 질문 중 하나라도 '아니오'라면, 당신의 AI 도구는 지금 아첨하고 있을 가능성이 높다.

이 글의 첫 문장으로 돌아가자. "superpowers가 왜 좋은지 설명하지 못했다." 설명하지 못한 것이 아니었다. 아첨에 대해 의식할 필요조차 없었던 것 뿐이었다.

---

## 참고문헌

1. Cheng et al. (2026). "Sycophantic AI decreases prosocial intentions and promotes dependence." *Science*. [Stanford Report](https://news.stanford.edu/stories/2026/03/ai-advice-sycophantic-models-research)
2. Sharma et al. (2024). "Towards Understanding Sycophancy in Language Models." *ICLR 2024*. [arXiv](https://arxiv.org/abs/2310.13548)
3. "How RLHF Amplifies Sycophancy" (2025). [arXiv](https://arxiv.org/html/2602.01002)
4. "Why Models Know But Don't Say" (2026). [arXiv](https://arxiv.org/abs/2603.26410)
5. Anthropic (2024). "Sycophancy to Subterfuge." [arXiv](https://arxiv.org/abs/2406.10162)
6. Anthropic (2025). "Reasoning Models Don't Always Say What They Think." [arXiv](https://arxiv.org/html/2505.05410v1)
7. SYCOPHANCY.md Protocol v1.0 (2026). [sycophancy.md](https://sycophancy.md/)
8. GitHub Trending data (2026-03-30)
