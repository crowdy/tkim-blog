---
title: "MAI-Code-1-Flash 와 MAI-Thinking-1 — Microsoft 가 Claude Code 를 끊은 자리에 무엇을 깔았는가"
description: "2026-06-03, Microsoft 가 MAI-Code-1-Flash 와 MAI-Thinking-1 두 모델을 동시에 발표했다. 5월 22일의 'Microsoft 가 사내 Claude Code 라이선스를 6월 30일자로 종료한다' 는 The Verge 보도의 정확히 6주 뒤다. Code-1-Flash 는 GitHub Copilot 의 디폴트 모델로 즉시 롤아웃됐고, SWE-Bench Pro 에서 Claude Haiku 4.5 를 16 점 차로 앞선다고 주장한다. Thinking-1 은 35B active / 1T total 의 MoE 추론 모델이고, AIME 2026 에서 94.5 %, Claude Sonnet 4.6 과 SWE-Bench Pro 에서 동률, blind 인간 평가에서 우세라고 주장한다. 'Claude 의존' 의 다음 챕터인가, 마케팅의 첫 발자국인가."
pubDate: 2026-06-03T00:00:00.000Z
lang: ko
pairSlug: microsoft-mai-coding-pivot
draft: false
---

# MAI-Code-1-Flash 와 MAI-Thinking-1 — Microsoft 가 Claude Code 를 끊은 자리에 무엇을 깔았는가

> 2026 년 6 월 3 일, Microsoft 가 MAI-Code-1-Flash 와 MAI-Thinking-1 두 모델을 동시에 발표했다. 두 발표가 HN 에 올라 각각 375 점·176 코멘트, 171 점·72 코멘트를 모았다. 5 월 22 일의 The Verge 보도 — Microsoft 가 사내 Claude Code 라이선스를 6 월 30 일자로 끝낸다는 — 의 정확히 6 주 뒤다. Code-1-Flash 는 GitHub Copilot 의 디폴트 모델로 즉시 롤아웃됐고, SWE-Bench Pro 에서 Claude Haiku 4.5 를 16 점 차로 앞선다고 주장한다. Thinking-1 은 35B active / 1T total 의 MoE 추론 모델로, Claude Sonnet 4.6 과 동률, Opus 4.6 과 SWE-Bench Pro 에서 맞먹는다고 주장한다. 5/23 의 사내 단가 위기의 답이 6 주 만에 도착한 것인가, 아니면 마케팅의 첫 발자국인가.

## 도입 — 6 주 만에 도착한 답의 무게

먼저 시간선을 정리한다. 2026 년 5 월 22 일, The Verge 가 Microsoft 의 사내 Claude Code 라이선스 종료를 보도했다. 그 보도 직후 HN 의 227 코멘트가 짚은 두 사실 — '개발자가 발로 투표해 자사 Copilot 대신 Claude Code 를 골랐다' 와 'Claude 의 사용 강도가 회사의 12 개월 AI 예산을 몇 달에 소진했다' — 가 5/23 의 본 블로그 분석의 출발점이었다. 그 분석의 결론은 단순했다 — Microsoft 의 결정은 '자사 도구의 우위 회복' 이 아니라 '단위경제학의 통제 회복' 이고, 그 통제를 위해서는 호출의 진입점을 자사 게이트웨이로 옮기는 작업이 필요하다.

6 월 3 일의 두 발표는 그 게이트웨이 뒤에 무엇이 깔리는지의 첫 공개 그림이다. 두 모델은 명백히 같은 시리즈 ('MAI') 의 두 슬롯이다 — Code-1-Flash 는 '빠른 코딩 슬롯', Thinking-1 은 '깊은 추론 슬롯'. 두 슬롯 외에 MAI-Image-2.5, MAI-Transcribe-1.5 가 같은 시리즈에서 이미 발표됐다. 이 슬롯 분리는 Anthropic 의 Haiku / Sonnet / Opus 또는 OpenAI 의 GPT-4o-mini / GPT-4o / o-series 의 표준 패턴을 그대로 따른다.

두 발표가 강조하는 한 줄이 두 모델의 공통 디자인 철학을 요약한다 — "clean and appropriately licensed data" (깨끗하고 적절히 라이선스된 데이터) 와 "third-party distillation 없이 직접 학습". 첫 줄은 OpenAI / Anthropic 의 학습 데이터 출처 논쟁 (저작권 소송, NYT 사건) 위에서 Microsoft 의 차별화 메시지다. 둘째 줄은 '경쟁사 모델로부터의 출력 학습' 의 흔적이 없다는 주장으로, MAI 가 독립 모델 가족이라는 점을 강조한다. 두 메시지가 합쳐지면 Microsoft 의 위치가 분명해진다 — '경쟁사보다 깨끗한 데이터 위에서 만들어진 독립 모델 가족' 이다.

이 진술이 정확히 5/23 의 진단과 만나는 지점이 있다. 그 진단에서 짚은 '진입점 통제' 의 끝은 '다른 모델로의 가격 비교 라우팅' 이었다. 그러나 라우팅의 목적지가 자사 모델이 아니면 라우팅은 매출의 외부 유출만 의미한다. Microsoft 가 라우팅의 목적지를 자사 모델로 두려면, 그 자사 모델이 Claude / GPT 와 경쟁할 수 있어야 한다. MAI 두 모델은 정확히 그 경쟁 조건의 첫 측정값이다.

## 본문 1 — Code-1-Flash 의 벤치마크와 'Haiku 비교' 라는 단일 카드

Code-1-Flash 의 발표가 가장 강조하는 숫자를 정렬한다.

```
벤치마크                     MAI-Code-1-Flash    Claude Haiku 4.5
SWE-Bench Pro               +16.0               (baseline)
SWE-Bench Verified          -60% tokens         (baseline)
IF Bench instruction        +28.9               (baseline)
Advanced IF                 +14.5               (baseline)
Robust IF                   higher              (baseline)
```

이 표가 가리키는 메시지는 두 갈래다. 첫째, **SWE-Bench Pro 에서 16 점 우위** 와 SWE-Bench Verified 에서 60 % 적은 토큰. 코딩 작업의 두 핵심 측정값 (정확도 + 효율) 모두에서 같은 가격대 모델인 Claude Haiku 4.5 를 앞선다는 주장이다. 둘째, **명령 따라가기 (instruction following)** 의 세 종류 벤치마크 (IF Bench, Advanced IF, Robust IF) 모두에서 우위다. 이는 단순한 코드 생성 능력이 아니라 '복잡한 다단계 지시를 정확히 수행' 하는 능력의 측정이다.

여기서 가장 무거운 디자인 결정 — 그리고 가장 미묘한 마케팅 결정 — 이 등장한다. 발표가 비교 대상으로 Claude Haiku 4.5 만을 골랐고, GPT, Codex, 또는 Claude 의 더 큰 모델 (Sonnet, Opus) 과의 비교를 의도적으로 제외했다. 이 선택의 의미를 풀어 보면 두 가지다. 첫째, Code-1-Flash 가 가격 / 성능 측면에서 자기 위치를 명시한다 — 'Haiku 와 같은 빠른 / 저렴한 슬롯이고, 그 슬롯 안에서 Haiku 를 이긴다'. 둘째, Sonnet / Opus 와 비교했을 때 Code-1-Flash 가 어떤 위치에 있는지를 마케팅이 의도적으로 비워 둔다. Code-1-Flash 가 Sonnet 을 따라잡았다는 주장은 하지 않는다. 같은 가격대 안에서의 우위가 단일 카드다.

이 마케팅 선택이 정확한 이유는 5/23 의 분석으로 다시 돌아가면 보인다. 그 분석의 핵심은 'Claude Code 의 자연스러운 사용 강도가 예산화 가정을 넘는다' 였다. 그 자연스러운 사용 강도의 대부분은 '간단한 PR 리뷰, 빠른 버그 수정, 작은 리팩토링' 같은 작업이고, 그 작업의 모델 슬롯은 Haiku 또는 Code-1-Flash 다. 즉 Microsoft 의 게이트웨이가 일일 호출의 80 ~ 90 % 를 Code-1-Flash 로 라우팅할 수 있다면, 그것만으로 단위경제학의 통제가 회복된다. 깊은 추론이 필요한 10 ~ 20 % 의 작업에는 여전히 Claude Sonnet / Opus 또는 Microsoft 의 MAI-Thinking-1 으로 라우팅한다. 슬롯 분리 + 라우팅 패턴이 5/23 의 단위경제학 위기에 대한 정확한 답이다.

또 한 가지 미묘한 결정이 발표의 한 줄에 있다 — "trained and designed for GitHub Copilot harness" (GitHub Copilot 하니스를 위해 학습되고 디자인됐다). 'harness' 는 모델 + 도구 통합 + UI 의 결합을 의미한다. 5/23 의 분석에서 짚은 'Claude Code 의 사용자 경험은 모델만이 아니라 모델 + UI + 도구 통합의 결합' 이라는 점이 여기서 다시 등장한다. Code-1-Flash 가 단순히 모델 가중치가 아니라 'Copilot 하니스 안에서 학습된' 모델이라면, 모델 자체의 벤치마크 점수보다 하니스 안에서의 실제 작업 효율이 더 의미 있는 측정이 된다. 다음 분기의 실측 데이터가 마케팅 카드보다 더 무거운 검증이 될 것이다.

## 본문 2 — MAI-Thinking-1 의 'Sonnet 4.6 동률' 주장과 두 가지 검증 필요

Thinking-1 의 숫자는 다른 종류의 무게를 가진다. 발표가 강조하는 핵심 비교는 세 갈래다.

첫째 — **Claude Sonnet 4.6 과 SWE-Bench Pro 에서 '동률 (toe-to-toe)'** + **1,276 개 작업의 blind 인간 평가에서 우세**. 이 주장이 사실이면 Thinking-1 은 Microsoft 의 가장 강한 자사 모델이고, 5/23 의 사내 Claude Code 사용자가 '발로 투표' 한 모델 (Claude Sonnet 4.6) 의 대체로 즉시 작동 가능하다. blind 인간 평가의 결과는 자기 회사 발표의 단점 — 평가 데이터의 cherry-picking 가능성 — 이 있지만, 1,276 작업이라는 규모는 단순한 cherry-pick 보다는 큰 표본이다.

둘째 — **Claude Opus 4.6 과 SWE-Bench Pro 에서 '맞먹는다 (matches)'**. Opus 는 Claude 의 가장 큰 모델이고, Sonnet 의 2 ~ 3 배의 가격을 가진다. Thinking-1 이 Opus 와 같은 작업에서 동률이라면 가격 / 성능 측면에서 단순한 동률 이상의 의미다. 그러나 발표가 '동률' 의 정확한 정의 (정답률의 정확한 차이, 통계적 유의성) 를 명시하지 않은 점이 첫 검증 필요다.

셋째 — **AIME 2025 에서 97.0 %, AIME 2026 에서 94.5 %**. 수학적 추론의 가장 표준화된 벤치마크에서 매우 높은 점수다. 비교 컨텍스트로, GPT-o3 의 AIME 2024 점수가 92 ~ 95 %, Claude 의 Sonnet 4.5 가 AIME 2025 에서 약 88 %. Thinking-1 의 점수는 카테고리의 가장 높은 수준이다. 그러나 AIME 같은 폐쇄형 시험 점수는 학습 데이터 누설의 위험이 크고, 발표가 '데이터 정화 (decontamination)' 의 정도를 명시하지 않은 점이 두 번째 검증 필요다.

모델의 기술적 디자인은 다음과 같다. 35B active parameters / ~1T total parameters 의 sparse Mixture-of-Experts. 이 구조는 DeepSeek-V3, Mistral 8x22B 와 같은 패밀리고, OpenAI 의 GPT-4 도 비슷한 패턴이라는 추측이 있다. Sparse MoE 의 장점은 추론 시 메모리 / 컴퓨트가 active 파라미터에 비례한다는 점 — 즉 추론은 35B 모델의 속도지만, 표현력은 1T 모델의 폭이다. 이 패턴이 'medium-weight' 라는 자기 분류의 근거다.

발표의 흥미로운 한 줄이 더 있다 — "Hill-Climbing Machine ... capabilities improve continually and reliably over time" (능력이 시간이 지나면서 지속적이고 신뢰성 있게 향상되는 hill-climbing 머신). 이 표현이 가리키는 것은 단일 모델이 아니라 학습 / 평가 / 개선의 파이프라인이다. MAI 시리즈가 단일 모델 발표가 아니라 6 ~ 12 개월 단위의 지속적 개선의 첫 측정값이라는 메시지다. 이는 Anthropic 의 Claude 3 → 3.5 → 4 → 4.6 → 4.8 의 6 개월 사이클, OpenAI 의 GPT-4 → 4o → o1 → o3 의 8 ~ 10 개월 사이클의 패턴을 직접 의식한 메시지다. Microsoft 가 같은 사이클을 시작했다는 선언이다.

HN 의 코멘트에서 가장 공감을 받은 정서가 이 사이클 메시지의 신뢰성에 대한 회의다 — 정서 요약 — "Microsoft 가 자체 모델 시리즈를 시작했다고 발표한 적이 이미 여러 번 있다. Phi 시리즈, Orca, ... 그리고 매번 한 두 발표 뒤에 사라졌다. MAI 가 다른지는 6 개월 뒤에 보자". 회의의 근거는 분명하다. Microsoft 가 자체 모델 시도를 여러 번 했고, 그 가운데 다수가 단일 발표로 끝났다. 이번 발표의 차이는 '게이트웨이 통합 (Copilot 의 디폴트 모델로 즉시 롤아웃)' 과 'Hill-Climbing 사이클 약속' 의 두 카드다. 두 카드의 진짜 검증은 9 ~ 12 월에 도착할 다음 버전 — MAI-Code-2 또는 MAI-Thinking-2 — 의 실제 출시와 그 모델의 성능 변화다.

## 본문 3 — '게이트웨이 + 자사 모델' 패턴의 산업 함의

이 사건이 단일 회사의 모델 가족 발표를 넘어 카테고리 전체에 던지는 함의를 세 갈래로 정리한다.

첫째 갈래는 **'프론티어 모델 회사 vs 게이트웨이 회사' 의 분기** 다. 지난 3 년 동안 AI 모델 시장은 사실상 두 카테고리의 회사가 운영했다 — 모델을 만드는 회사 (Anthropic, OpenAI, DeepMind 등) 와 그것을 호스팅 / 게이트웨이 / 통합으로 가져다 쓰는 회사 (AWS, GCP, Microsoft Azure). Microsoft 의 MAI 시리즈는 이 두 카테고리의 경계가 무너지는 신호다. 게이트웨이 회사가 자체 모델을 가지면, 외부 모델은 '기본 옵션' 이 아니라 '선택적 라우팅 대상' 으로 격하된다. 외부 모델 회사 (Anthropic, OpenAI) 의 단가 협상력이 떨어진다.

이 분기의 첫 시그널은 가격 협상이다. 2026 년 하반기에 Anthropic 과 Microsoft 의 Azure 위 Claude 호스팅 계약 갱신이 있다면, Microsoft 의 협상 카드가 'Claude 가 없으면 Sonnet 의 자리에 MAI-Thinking-1 을 직접 쓴다' 가 된다. 같은 카드가 OpenAI 와의 협상 (이미 Microsoft 의 OpenAI 지분 관계로 복잡하지만) 에서도 작동한다. 모델 회사들의 가격 협상력이 게이트웨이 회사의 자체 모델 등장으로 직접 압력받는다.

둘째 갈래는 **'모델 회사의 매출 채널 분기'** 다. 모델 회사가 직접 사용자에게 라이선스를 파는 채널 (Anthropic 의 Claude.ai, Claude API) 과 게이트웨이 회사를 통한 간접 채널 (Bedrock, Azure AI) 의 두 갈래다. 5/23 의 분석에서 짚었듯, 게이트웨이 채널의 매출이 외부 모델 회사의 가장 큰 채널이다. 그 채널이 게이트웨이 회사의 자체 모델로 부분 대체되면, 모델 회사의 매출 구조가 직접 채널 의존으로 이동한다. 그러나 직접 채널의 사용자 풀은 한정적이고 (개발자 / 소비자 중심), 기업 매출의 대부분은 여전히 게이트웨이를 거친다. 모델 회사가 기업 매출을 회복하려면 직접 기업 영업 채널을 갖춰야 한다. Anthropic 의 기업 영업팀 확장 (2026 년 1 분기 발표) 이 이 신호의 첫 측정값이다.

셋째 갈래는 **'다극 모델 시장' 의 형성** 이다. 2025 년까지 AI 모델의 진짜 프론티어는 사실상 3 ~ 4 개 회사 (OpenAI, Anthropic, Google DeepMind, xAI) 의 경쟁이었다. Microsoft 의 MAI 시리즈가 5 번째 회사로 합류하고, Meta 의 Llama 4, DeepSeek 의 V4, Mistral 의 Large 3 가 같은 시기에 발표되면 시장은 7 ~ 8 개 회사의 다극 경쟁으로 바뀐다. 다극 경쟁의 결과는 모델 가격의 추가 압력 (good) 과 함께 각 모델의 특화 (specialization) 다. 한 모델이 모든 작업을 잘하기보다, 슬롯별로 (코딩 / 추론 / 비전 / 음성) 다른 모델이 우위를 갖는 패턴이 강해진다. Microsoft 의 MAI 시리즈가 슬롯별로 분리된 발표 (Code, Thinking, Image, Transcribe) 인 것이 이 패턴의 직접 표현이다.

세 갈래가 합쳐지면, 다음 12 개월의 AI 산업의 가장 큰 단일 변수는 '외부 모델 회사들의 매출 채널이 어디로 옮겨지는가' 다. 그리고 그 변수의 답이 모델 회사들의 다음 라운드 자금 조달, 인재 채용, 모델 개발 사이클의 단가에 직접 영향을 준다.

## 결론 — '6 주 만에 도착한 답' 의 진짜 무게

6 월 3 일의 두 발표가 HN 의 합산 546 점을 모은 진짜 이유는, 그것이 5 월 22 일의 사건에 대한 '6 주 만의 답' 이라는 사실 자체다. Microsoft 는 사내 Claude Code 단위경제학의 위기를 게이트웨이 통제로 풀었고, 그 게이트웨이 뒤에 자사 모델 두 개를 즉시 깔았다. 위기의 진단 → 게이트웨이 결정 → 자사 모델 출시의 세 단계가 6 주 안에 끝난 것은 — 만약 진짜 검증을 통과한다면 — 산업 사이클의 가장 빠른 응답 중 하나다.

이 진단이 실무자에게 던지는 메시지는 두 갈래다. 첫째, AI 코딩 도구 채택 결정을 6 개월 이상의 시간 단위로 계획하지 말라. 도구의 기본 모델이 6 주 안에 자사 모델로 교체될 수 있고, 그 교체가 단순한 백엔드 변경이 아니라 사용 강도 / 단가 / 품질의 분포 전체에 영향을 준다. 도구 평가는 분기 단위로 다시 수행되는 것이 정상이다.

둘째, 외부 모델 회사에 깊은 의존도를 가진 제품 / 비즈니스를 운영 중이라면, 게이트웨이 회사의 자사 모델 출시 패턴을 직접 모니터링한다. AWS Bedrock 위의 자체 모델 (Amazon Nova), Google Cloud 위의 자체 모델 (Gemini), Azure 위의 MAI 시리즈 — 세 게이트웨이가 모두 자사 모델 슬롯을 깔고 있다. 외부 모델의 디폴트 위치가 6 ~ 12 개월 안에 다시 협상될 가능성이 매우 높다.

마지막으로 한 가지 질문을 던지면서 닫는다. 우리가 외부 모델 (Claude, GPT) 위에 만든 제품이 그 외부 모델 회사의 우위가 게이트웨이 회사의 자사 모델에 의해 부분 대체되는 시나리오에서 어떻게 작동하는가. 그 시나리오를 미리 시뮬레이션하지 않은 상태에서 게이트웨이 회사의 디폴트 변경이 일어나면, 우리의 제품 단가 / 품질 / 사용 패턴이 한 주 안에 바뀐다. 6 월 3 일의 발표는 그 시나리오의 첫 큰 측정값이다.

---
출처:
- https://microsoft.ai/news/introducingmai-code-1-flash/
- https://microsoft.ai/news/introducing-mai-thinking-1/
- HN discussion: https://news.ycombinator.com/item?id=48374466
- HN discussion: https://news.ycombinator.com/item?id=48374362
