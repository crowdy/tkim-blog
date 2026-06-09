---
title: "Apple, Siri 의 두뇌를 Google Gemini 에 맡기다 — Apple Intelligence 의 1 년, 자체 모델 전략의 항복인가"
description: "WWDC 2026 에서 Apple 은 새 Siri 를 Google 과 공동 개발한 Foundation Models 위에 올렸다. 1 년 전 'Apple Intelligence' 라는 이름으로 자체 모델을 약속한 회사의 가장 큰 전략 전환이다."
pubDate: 2026-06-09T00:00:00.000Z
lang: ko
pairSlug: apple-siri-gemini-pivot
draft: false
---

# Apple, Siri 의 두뇌를 Google Gemini 에 맡기다 — Apple Intelligence 의 1 년, 자체 모델 전략의 항복인가

> Apple Silicon 의 회사가 Google 의 Gemini 위에 자기 음성 비서를 다시 올렸다. 이것은 자체 모델 전략의 항복인가, 아니면 모델을 상품으로 다루겠다는 새 전략의 시작인가.

## 도입 — WWDC 2026 의 발표가 의미하는 1 년

2026 년 6 월 8 일 (현지 시각), Apple 은 WWDC 2026 의 키노트에서 Siri 와 Apple Intelligence 의 새로운 아키텍처를 공개했다. 핵심은 한 문장으로 정리된다. Siri 의 두뇌는 이제 Apple 이 Google 과 "공동 개발한 (co-developed)" Foundation Models 위에서 작동하며, 이 모델군에는 Google Gemini 의 클라우드 변종이 포함된다. Apple 의 발표문은 신중한 단어로 채워져 있다. 모델은 "on-device 와 server 모두에서 작동" 하고, 서버 처리는 Private Cloud Compute 인프라를 거치며, 사용자 데이터는 Apple 도 제3자도 접근할 수 없다고 명시되어 있다. 그러나 핵심 사실은 그 신중한 어휘 아래에 분명히 적혀 있다. Apple 의 음성 비서가 출시 39 년 만에 외부 회사의 모델 위에서 돌게 되었다는 사실이다.

이 한 줄이 만들어내는 파장은 단순한 제품 발표를 넘어선다. 정확히 1 년 전, Apple 은 WWDC 2025 에서 "Apple Intelligence" 라는 이름으로 자체 LLM 전략을 야심차게 공개했다. on-device 의 작은 모델과 Private Cloud Compute 의 큰 모델 두 층을 모두 Apple 이 자체 개발한다는 그림이었다. 그 그림에서 1 년 만에 가장 무거운 한 칸 — frontier 급 클라우드 모델 — 이 Google 의 Gemini 로 채워졌다. 이것이 항복인가, 전략 전환인가, 아니면 두 단어 모두인가. Hacker News 에서 326 개의 댓글이 이 발표를 두고 논쟁한 것은 우연이 아니다.

## 발표의 구조 — 다섯 개의 모델과 한 개의 오케스트레이터

Apple 이 공개한 새 아키텍처는 다섯 개의 모델을 다섯 가지 상황에 분산한다. Hacker News 사용자 bensyverson 이 자세히 정리한 바에 따르면, 그 다섯은 (1) on-device 의 Apple Foundation Model Core, (2) on-device 의 Apple Foundation Model Core Advanced, (3) 서버의 Apple Foundation Model Server 변종 두 개, (4) frontier 급 작업을 위한 Cloud Pro 변종이다. 가장 중요한 사실은 이 가운데 Cloud Pro 변종이 "Gemini frontier-급의 wrapped 모델" 이라는 점이다. 즉 Apple 이 Google 의 Gemini Pro 를 Apple 의 Private Cloud Compute 인프라 위에 감싸 돌린다는 의미다. 나머지 네 모델 — on-device 두 개, server 두 개 — 도 Apple 의 표현으로는 "Google Gemini 를 사용해 refined" 되었다고 밝혀졌다. 즉 다섯 모델 모두가 Google 의 가중치 또는 distillation 의 흔적을 품은 셈이다.

이 모델들을 묶는 새 추상화가 "system orchestrator" 다. Apple 의 표현에 따르면 이 오케스트레이터는 "Apple Intelligence 의 중앙에 자리하며, 현재 활성화된 앱과 사용자의 작업을 인지하면서 안전하게 기능들을 조정한다." 정확히 어떤 알고리즘으로 모델을 선택하는가는 공개되지 않았다. 그러나 발표의 어휘에서 두 가지 패턴이 읽힌다. 첫째, 가벼운 질의는 on-device 모델로 처리되고, 무거운 추론은 Private Cloud Compute 로 흘러가며, frontier 급 작업은 Cloud Pro (Gemini) 로 라우팅된다. 둘째, 라우팅 결정 자체는 Apple Silicon 위에서 일어나며 사용자 데이터의 일부만 적절히 떨어져서 클라우드로 흐른다는 그림이다.

Private Cloud Compute 의 신뢰 사슬에 관한 분석은 HN 사용자 nl 의 댓글이 가장 정확하다. "Apple 의 PCC 는 Apple 이 서명한 root key 를 사용한다. 그래서 Apple 과 해당 사법권을 모두 신뢰해야 한다. Gemini Cloud Pro 변종은 Google 의 클라우드에서 Nvidia GPU 위에 돈다. 결국 신뢰 사슬에 여러 당사자가 끼게 된다." 이 다층 신뢰 사슬은 Apple 의 기존 PCC 모델 (Apple 만 신뢰하면 충분) 에서 한 단계 후퇴한 것이다. 사용자가 Apple 에 위임한 신뢰가, Google 과 Nvidia 라는 두 추가 당사자에게 분산되었기 때문이다.

WWDC 와 같은 날 Apple 은 Apple Core AI Framework 라는 새 개발자 API 도 공개했다. 이는 Apple Foundation Models 의 일부를 개발자에게 노출시켜, 서드파티 앱이 같은 모델들 위에 자기 기능을 짤 수 있게 해 준다. 개발자 측의 환영은 명확하지만, 다섯 모델 가운데 어디까지가 이 API 의 표면 위에 노출되는가, Cloud Pro 의 Gemini 호출이 개발자 비용 측에 어떻게 전가되는가 같은 질문은 아직 답이 없다.

## 자체 모델 전략은 왜 1 년 만에 휘었는가

Apple 의 자체 frontier 모델 시도가 결국 외주로 향한 이유에 관한 가장 단단한 분석은 HN 사용자 bensyverson 의 한 줄에 들어 있다. "Apple 은 모델을 commodity 로 다루기로 선택했다." 이 한 줄이 함축하는 의미는 단순한 항복이 아니다. Apple 의 역사를 떠올리면 같은 패턴이 반복된 적이 있다. iPhone 의 디스플레이는 오랫동안 Samsung 이 만들었다. iPhone 의 메모리는 Hynix 와 Micron 이 만들었다. Apple 은 시간을 두고 그것들을 점진적으로 내재화했다. HN 사용자 Danox 의 정리가 이 패턴을 환기시킨다. "Apple 은 보통 외부 의존을 시간을 두고 대체해 간다. Samsung 의 화면처럼. Gemini 도 Apple Silicon GPU 가 자체 frontier 모델 수준의 성능을 안정적으로 낼 때까지의 임시 방편일 가능성이 있다."

이 견해를 그대로 받아들이기는 쉽지 않다. 디스플레이와 LLM 모델 사이에는 본질적 차이가 있다. 디스플레이는 한 번 내재화하면 그 후 더 큰 패널, 더 높은 PPI 를 자기 페이스로 개선해 가면 된다. LLM 은 다르다. frontier 모델은 18 개월마다 한 세대씩 바뀌고, 그 변화의 속도는 1.7 trillion 파라미터 모델을 학습할 GPU 클러스터의 규모에 직결된다. Apple 이 자체 GPU 클러스터로 OpenAI · Anthropic · Google 의 학습 인프라를 따라잡기까지 걸리는 시간은 디스플레이 사례보다 훨씬 길거나, 영원히 따라잡지 못할 가능성도 있다. 그 가능성을 진지하게 본 회사가 commodity 전략을 택한 것이다. Samsung Galaxy 시리즈가 Gemini 를 채택한 이후, Apple 이 같은 Google 의 모델 위에서 자기 비서를 돌리게 된 것은 시장의 한 끝까지 commodity 화가 진행되었다는 신호다.

자체 모델을 포기한 두 번째 이유는 비용이다. OpenAI 가 frontier 모델 학습에 50 억 달러를 쓴다는 분기 보고가 2025 년 말에 알려졌다. Anthropic 의 Claude 4 학습 비용은 비공개지만 비슷한 규모로 추정된다. Apple 의 R&D 예산은 거대하지만, frontier 모델만을 위한 50 억 달러 분기 지출은 다른 R&D 우선순위 (Apple Silicon 차세대, AR 헤드셋, 자동차 잔존 프로젝트) 와의 자원 경쟁을 만든다. Tim Cook 의 입장에서 Gemini 의 라이센스 비용은 자체 학습의 분기 50 억 달러보다 작을 가능성이 높다. 비용의 비대칭이 commodity 전략을 정당화한다.

세 번째 이유는 시간이다. Apple Intelligence 발표 후 1 년간 Siri 의 새 기능은 대부분 지연되었다. Bloomberg 가 2025 년 가을에 보도한 Apple 사내 갈등 — Apple Foundation Model 팀이 외부 OpenAI · Anthropic 모델을 사용한 데모를 만들어 임원진에 보였더니, 결과의 차이가 너무 컸다는 보고 — 은 이번 전략 전환의 직접 배경에 가깝다. Apple 은 자체 모델을 계속 굴리면서 사용자 경험에서 분기마다 뒤처지든지, 외부 모델 위에 올라타 즉시 따라잡든지의 선택지만 남아 있었다. 1 년 만에 후자를 골랐다는 것이 이 발표의 한 줄 요약이다.

마지막으로, EU 의 Digital Markets Act 와의 관계도 무시할 수 없다. HN 사용자 sterlind 의 댓글이 이 갈래를 짚는다. "Apple 은 DMA 가 서드파티 앱에도 Siri 와 같은 iOS 권한을 부여하라고 요구한다고 본다. 이게 진짜 보안 우려를 만든다고 주장한다." DMA 가 강제하는 개방성은 Apple 이 Siri 의 권한 모델을 처음부터 다시 설계하게 만들었고, 다시 설계할 바엔 Google 의 frontier 모델 위에 올리는 편이 시간 비용에서 합리적이라는 계산이 작용했을 가능성이 있다.

## 산업 시사점 — Apple-Google 시대의 세 변곡점

이 발표가 시작시킨 새 시대에는 세 개의 변곡점이 따라온다.

**첫째, 모델 commoditization 의 가속.** Apple 의 결정은 frontier 모델 자체가 이제 commodity 라는 명제를 가장 강력하게 증명한 사건이다. Samsung Galaxy 시리즈가 Gemini 를 깐 시점부터 사실상 시작된 흐름이지만, Apple 의 합류는 그 흐름이 임계점을 넘었다는 신호다. 이제 frontier 모델 자체로는 차별화가 어렵다. 차별화는 (a) 모델을 어떻게 라우팅하는가 (Apple 의 system orchestrator), (b) 어떤 신뢰 사슬 위에 올리는가 (Apple 의 PCC), (c) 어떤 hardware 와 결합하는가 (Apple Silicon) 의 세 층에서 일어난다. 모델은 commodity, 그 위의 통합은 차별화 — 이것이 새 패러다임이다.

**둘째, Google 의 B2B 가격 협상력 강화.** Apple 이 Gemini Pro 를 채택했다는 사실은, Google 이 LLM B2B 시장의 가격 협상에서 OpenAI 와 Anthropic 보다 한 단계 위에 올라설 수 있게 만든다. Samsung 에 이어 Apple, 즉 모바일 시장의 양대 플레이어가 모두 Gemini 를 깔았다. 이는 Google 의 Gemini 가격을 사실상 산업 표준의 anchor 로 만든다. OpenAI 는 Microsoft 의 클라우드와 묶여 있고, Anthropic 은 AWS Bedrock 과 묶여 있다. Google 만이 자체 클라우드, 자체 모델, 자체 모바일 OS (Android), 그리고 이제 Apple iOS 의 frontier 추론까지 한 손에 쥔다.

**셋째, 자체 모델 회사들의 전략 재정렬.** Apple 의 commodity 전략은 다른 자체 모델 회사들 — Meta 의 Llama, Mistral, Cohere — 에게 두 가지 신호를 준다. 하나는 frontier 모델로 직접 경쟁하지 말고 open weights 의 도구화 (즉 Hugging Face · Together AI 같은 인프라 회사의 입장) 로 방향을 틀어야 한다는 신호다. 다른 하나는 frontier 모델을 비공개로 운용하더라도, 그것을 사용자에게 직접 노출하는 제품 (Llama-powered Meta AI) 으로 풀어 모델 자체보다 사용자 경험에서 차별화해야 한다는 신호다. xAI 가 같은 날 발표한 datacenter REIT 전략 (외부 분석 martinalderson.com 의 표현으로 "xAI 는 frontier lab 이 아니라 datacenter REIT 처럼 보인다") 도 같은 산업 흐름의 일부다.

## 결론 — 항복인가 새 전략인가

WWDC 2026 의 발표는 Apple Intelligence 라는 이름의 자체 모델 전략의 항복인가, 아니면 commodity 전략의 시작인가. 두 답 모두 부분적으로 옳다. Apple 의 1 년 전 약속 — "Apple 의 frontier 모델 위에서 Siri 가 작동한다" — 은 1 년 만에 깨졌다. 그 의미에서 항복이다. 그러나 Apple 은 그 모델을 단순히 OpenAI · Anthropic · Google 가운데 하나로 대체하지 않았다. 다섯 모델, 하나의 system orchestrator, 두 단계의 신뢰 사슬 (Apple + Google) 이라는 정교한 아키텍처를 만들고 그 안에서 Gemini 를 한 칸으로 다루었다. 그 의미에서는 새 전략의 시작이다.

진짜 질문은 그다음이다. Apple 의 다음 발표 — 2027 년 6 월, 또는 2028 년 6 월의 WWDC — 에서 Cloud Pro 변종은 여전히 Gemini 일까, 아니면 Apple 의 자체 frontier 모델로 다시 갈아끼워질까. Danox 의 정리대로 Apple 의 외부 의존이 일시적이었다면, 다음 발표에서 Apple Foundation Model Pro 의 새 변종이 Gemini 를 대체할 것이다. bensyverson 의 정리대로 Apple 이 모델을 commodity 로 다루기로 진짜 결심했다면, 그날의 발표는 Gemini Pro 가 Anthropic 의 Claude 으로, 또는 OpenAI 의 GPT-5 로 갈아 끼워지는 모습일 것이다. 어느 쪽이든 Siri 의 뇌가 누구의 모델인가는 사용자 입장에서는 점차 더 보이지 않게 된다. 그것이 commodity 화의 진짜 의미다.

---
출처:
- https://www.macrumors.com/2026/06/08/apple-reveals-new-ai-architecture/
- https://news.ycombinator.com/item?id=48450142
- https://news.ycombinator.com/item?id=48449084
- https://martinalderson.com/posts/xais-new-rental-business/
