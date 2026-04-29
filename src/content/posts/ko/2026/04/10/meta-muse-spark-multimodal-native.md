---
title: 'Meta가 ''Llama 노선''을 버렸다 — Muse Spark는 왜 multimodal-native 일체형 설계로 회귀했는가'
description: 'Llama는 텍스트로 먼저 태어나 나중에 이미지를 배웠다. Muse Spark는 태어날 때부터 이미지와 텍스트와 도구 호출을 같은 언어로 말한다. 이 차이가 무엇을 의미하는가? 그리고 왜 Meta가 자신의 가장 큰 자산이었던 Llama 가중치를 포기하면서까지 이 길로 회귀했는가?'
pubDate: 2026-04-10T00:56:52.938Z
lang: ko
pairSlug: 'meta-muse-spark-multimodal-native'
draft: false
---
# Meta가 'Llama 노선'을 버렸다 — Muse Spark는 왜 multimodal-native 일체형 설계로 회귀했는가

> Llama는 텍스트로 먼저 태어나 나중에 이미지를 배웠다. Muse Spark는 태어날 때부터 이미지와 텍스트와 도구 호출을 같은 언어로 말한다. 이 차이가 무엇을 의미하는가? 그리고 왜 Meta가 자신의 가장 큰 자산이었던 Llama 가중치를 포기하면서까지 이 길로 회귀했는가?

---

2026년 4월 8일, Meta Superintelligence Labs가 Muse 모델 패밀리의 첫 번째 모델인 **Muse Spark**를 공개했다. 발표 자체는 익숙한 빅테크 모델 릴리스의 모양을 하고 있었다. 새 이름, 새 벤치마크 숫자, 새 데모 영상. 그러나 그 안을 들여다본 사람들은 곧 알아챘다. 이것은 단순한 차세대 모델이 아니라, Meta가 2023년부터 5년 가까이 끌고 온 **"Llama 노선"의 종언**이라는 것을.

[TechCrunch는 이 발표를 "ground-up overhaul"이라고 불렀다](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/). 직역하면 "바닥부터의 전면 쇄신"이다. 이 표현이 우연이 아니다. Muse Spark는 기존 Llama 가중치를 한 줄도 재활용하지 않았다. 텍스트 LLM 위에 vision encoder를 얹는 bolt-on 방식 — 2020년부터 2025년까지 거의 모든 오픈모델이 따랐던 그 길 — 을 포기하고, 처음부터 텍스트와 이미지와 도구 호출을 단일 토큰 시퀀스로 훈련하는 **native multimodal** 아키텍처로 전환했다.

발표 다음 날인 4월 9일, [Meta AI 앱은 App Store 종합 순위에서 57위였다가 5위로 뛰어올랐다](https://techcrunch.com/2026/04/09/meta-ai-app-climbs-to-no-5-on-the-app-store-after-muse-spark-launch/). 단 하루 만에 52계단 상승. 일본의 GIGAZINE과 Gizmodo가 잇따라 기술 해설 기사를 냈고, 한국 트위터에서는 "Llama가 죽었다"는 격앙된 반응이 돌았다. 시장은 이 발표를 "Meta가 다시 AI 경쟁의 한복판으로 돌아왔다"는 신호로 읽었다.

그러나 이 글의 관심은 시장 반응이 아니다. App Store 순위도 아니고, 주가도 아니다. 이 글이 묻고 싶은 것은 단 하나다. **"multimodal-native 일체형 설계"라는 마케팅 용어 뒤에 있는 기술적 실체가 무엇이며, 왜 Meta는 자신의 가장 큰 자산이었던 Llama 가중치를 포기하면서까지 이 길로 가야 했는가?**

답을 미리 말하면 이렇다. Bolt-on 방식의 representation gap이 tool-use와 visual reasoning에서 더 이상 무시할 수 없는 병목이 되었고, GPT-4o, Gemini, 그리고 이제 Muse Spark까지 프론티어 모델 전체가 같은 결론에 수렴하고 있다. "Llama 오픈모델 진영"의 대표주자였던 Meta가 노선을 바꿨다는 것은, bolt-on 시대가 끝났다는 것을 의미한다.

---

## 1. Muse Spark가 발표된 주 — Meta가 무엇을 내놓았는가

먼저 사실 정리부터 하자.

**날짜와 발표 주체**: 2026년 4월 8일, Meta Superintelligence Labs(MSL). 이 조직은 2025년 후반에 Meta 내부에 새로 만들어진 AI 연구 조직으로, 전 Scale AI CEO인 Alexandr Wang이 이끌고 있다. Meta가 Scale AI에 대규모 투자를 단행하면서 동시에 Wang을 영입했고, 그를 중심으로 기존 FAIR(Fundamental AI Research)와는 별도의 조직을 세웠다. Llama 시리즈를 만들었던 GenAI 조직과도 분리되어 있다는 점이 중요하다. **조직의 분리는 노선의 분리를 미리 예고한 셈이다.**

**모델 패밀리**: Muse Spark는 "Muse" 패밀리의 첫 번째 모델이다. "패밀리"라는 표현이 의도적이다. 향후 Muse Pro, Muse Ultra 같은 후속작이 나올 것을 시사한다. Llama가 4세대(Llama 1~4)를 거치면서 한 계보를 이뤘다면, Muse는 새로운 계보의 출발점이다. 같은 회사가 두 개의 별도 모델 패밀리를 동시에 운영한다는 것은, 둘 사이에 근본적인 아키텍처 차이가 있다는 의미다.

**핵심 기능**: [GIGAZINE 해설](https://gigazine.net/news/20260409-meta-muse-spark/)에 따르면 Muse Spark의 세 가지 핵심 능력은 다음과 같다.

1. **Tool use** — 외부 도구(검색, 코드 실행, 이미지 생성 등) 호출을 모델 내부 추론의 일부로 자연스럽게 포함한다.
2. **Visual chain-of-thought** — 이미지를 본 뒤 그 이미지를 추론의 중간 단계로 사용한다. 단순히 이미지를 텍스트 캡션으로 변환하는 것이 아니라, 이미지 자체가 사고 과정의 노드가 된다.
3. **Contemplating mode** — 여러 에이전트가 병렬로 추론을 진행한 뒤 그 결과를 합치는 방식. 응답 품질을 끌어올리되 지연 시간이 비례적으로 늘어나지 않는다.

**벤치마크**: GIGAZINE 기사에 인용된 숫자 몇 개.

| 벤치마크 | Muse Spark |
|----------|-----------|
| Humanity's Last Exam | 58% |
| FrontierScience Research | 38% |
| 생물무기 관련 거부율 | 98.0% |

가장 충격적인 숫자는 벤치마크 점수가 아니라 효율성이다. GIGAZINE은 다음과 같이 보도했다. **"Llama 4 Maverick과 동일한 수준의 성능에 도달하기 위해 필요한 계산량을 10분의 1 이하로 줄였다."** 같은 성능을 1/10의 compute로 달성한다는 것은 단순히 더 효율적인 모델이 나왔다는 의미가 아니다. 아키텍처 자체가 다르다는 의미다.

**시장 반응**: 발표 직후 24시간 이내에 Meta AI 앱이 App Store 종합 순위 57위에서 5위로 점프했다. 일본 매체들의 분석 기사가 동시에 쏟아졌다. [Forbes Japan은 Meta 주가 급등을 보도하며 "AI 경쟁의 반격 카드"라고 표현했다](https://forbesjapan.com/articles/detail/95425?s=ns). 이 정도의 시장 반응은 Llama 4 출시 때도 나오지 않았던 것이다.

자, 사실 정리는 끝났다. 이제 진짜 질문으로 들어가자. 이 모델의 무엇이 다른가?

---

## 2. Llama 노선이란 무엇이었나 — 2023~2025년의 주류 설계

"Llama 노선"이라는 표현이 정확히 무엇을 가리키는지부터 명확히 해야 한다. 단순히 Meta가 만든 모델들을 의미하는 것이 아니라, **"먼저 텍스트 LLM을 만들고, 이후 멀티모달로 확장한다"는 설계 철학** 전체를 가리킨다. 그리고 이 철학은 2023~2025년에 오픈소스 진영의 사실상 표준이었다.

타임라인을 따라가 보자.

**2023년 — Llama 1, Llama 2**: Meta가 공개한 첫 번째 본격 오픈모델. 순수한 텍스트 LLM이었다. 이미지도, 오디오도 없었다. 핵심 가치 제안은 단 하나 — "GPT 수준의 언어 모델을 가중치까지 공개한다"는 것. 이 시점에서 Meta의 베팅은 명확했다. 텍스트 LLM이 AI의 본진이고, 다른 모달리티는 나중에 붙이면 된다.

**2023~2024년 — LLaVA, Flamingo, MiniGPT-4**: Llama를 기반으로 한 멀티모달 확장 모델들이 학계와 오픈소스 진영에서 우후죽순처럼 나왔다. 이들의 공통 구조는 동일했다.

```
[이미지] → [Vision Encoder (CLIP, ViT)] → [Projection Layer] → [LLM(Llama)]
```

먼저 별도의 vision encoder가 이미지를 임베딩 벡터로 바꾼다. 그 벡터를 projection layer가 LLM의 임베딩 공간으로 "번역"한다. 그러면 LLM은 그 벡터를 마치 하나의 텍스트 토큰처럼 받아들여서 처리한다. 매우 기발하고, 매우 효율적이고, 매우 빨리 만들 수 있는 방식이다.

이 방식의 장점은 명확했다.

- **재활용성**: 이미 훈련된 거대 LLM의 가중치를 그대로 쓸 수 있다. 처음부터 다시 훈련하지 않아도 된다.
- **모듈성**: Vision encoder와 LLM이 분리되어 있어서 각자 독립적으로 교체하고 업그레이드할 수 있다.
- **저비용**: 처음부터 멀티모달로 훈련하는 것에 비해 GPU 시간과 데이터가 훨씬 적게 든다. 학계 연구실 한 곳이 LLaVA 같은 모델을 만들 수 있었던 것이 이 덕분이다.

2024년 Meta가 Llama 3를 공개할 때까지도 이 구조는 거의 그대로 유지되었다. Llama 3 Vision 변종은 본질적으로 Llama 3 텍스트 모델 + 별도 vision encoder + projection의 조합이었다. Llama 4 Maverick에 이르러 이 구조는 절정을 찍었다 — 더 큰 텍스트 모델, 더 큰 vision encoder, 더 정교한 projection.

**그런데 문제가 있었다.** 그것도 점점 더 명확해지는, 그리고 점점 더 무시할 수 없는 문제가.

**Representation gap**. 이미지가 LLM 입장에서는 "외부에서 번역되어 들어온 이상한 토큰"이다. LLM은 그 이상한 토큰들이 정확히 무엇을 의미하는지 깊이 이해하지 못한다. 그저 "이런 패턴의 이상한 토큰이 들어오면 이런 식의 텍스트로 답하면 보상이 컸다"는 식의 얕은 매핑만 학습된다. 그래서 bolt-on 멀티모달 모델들은 단순한 "이미지에 무엇이 있는가?" 질문에는 잘 답하지만, 깊은 시각 추론(visual reasoning)이 필요한 작업 — 예를 들어 "이 다이어그램의 흐름을 따라가면서 단계별로 설명하라" 같은 것 — 에서는 뿌리가 얕다.

**Tool use의 어색함**. Tool use도 같은 문제다. 도구 호출은 보통 특수 토큰 시퀀스(`<tool_call>...</tool_call>` 같은)로 표현되는데, 이 토큰들은 텍스트 LLM이 사후에 학습한 "외부 인터페이스"다. 모델이 도구를 부를 때마다 일종의 "텍스트 → 도구 호출 → 텍스트" 변환을 거친다. 자연스럽지 않다. 그래서 long-horizon agent task — 즉 도구를 여러 번 부르며 긴 추론을 이어가는 작업 — 에서 bolt-on 모델은 자주 길을 잃는다.

진짜 문제는 사용자가 ChatGPT나 Claude와 차분히 대화하면서 이미지를 던져주고 도구를 부르게 시켰을 때 드러난다. 그 자리에서 "아, 이 모델은 이미지를 본 게 아니라 이미지에 대한 캡션을 본 것 같다"는 느낌이 분명히 든다. 그게 representation gap이다.

2025년 후반, Meta 내부에서도 이 문제가 점점 무시할 수 없게 되었을 것이다. Llama 4 Maverick까지 밀어붙였지만, GPT-4o의 visual reasoning이나 Gemini의 long-horizon agent 능력을 따라잡지 못한다는 것이 점점 명백해졌다. 그리고 그 격차는 모델 크기를 키운다고 메워지는 종류의 격차가 아니었다. **구조적 격차**였다.

여기서 Muse Spark의 결정이 나온다. "더 큰 Llama"가 답이 아니라면, 답은 다른 곳에 있을 수밖에 없다.

---

## 3. Native multimodal은 구체적으로 무엇이 다른가

이 섹션이 이 글의 핵심이다. "multimodal-native 일체형"이라는 표현이 마케팅 용어가 아니라 구체적인 기술적 실체라는 것을, 가능한 한 쉬운 언어로, 그러나 정확하게 풀어보자.

핵심은 세 가지다 — **토큰 공간(token vocabulary)**, **어텐션(attention)**, **훈련 목표(training objective)**. 이 세 가지가 동시에 바뀌어야 "native multimodal"이 된다. 하나만 바뀐 것은 native가 아니다.

### 3.1 토큰 공간의 통합 — "이미지가 1등 시민이 되었다"

먼저 토큰 vocabulary부터.

기존 텍스트 LLM의 토큰 사전(vocabulary)은 약 10만~30만 개의 텍스트 토큰으로 구성된다. "the", "안녕", "###", "}", "function" 같은 것들이다. 이미지는 이 사전 안에 없다.

Bolt-on 방식에서는 이미지 임베딩을 projection layer가 텍스트 토큰처럼 "흉내 내서" LLM에 밀어 넣는다. 모델 입장에서 이 이미지 토큰은 사전에 등록되어 있지 않은 임시 손님이다. 가능한 출력 토큰 중에 이미지 토큰은 없다. 즉 모델은 이미지를 "읽기"는 해도 "쓰지"는 못한다.

Native multimodal에서는 다르다. 토큰 vocabulary 자체가 텍스트, 이미지 patch, 도구 호출을 모두 포함하도록 처음부터 설계된다. 도식으로 그리면 이렇다.

```
[기존 Llama 노선 vocabulary]
┌───────────────────────────────┐
│  텍스트 토큰 (~128K)           │
└───────────────────────────────┘
   └ 이미지: 외부 encoder 출력 → projection → "흉내 내서" 입력
   └ 도구 호출: 특수 텍스트 토큰으로 표현 (<tool_call>)

[Native multimodal vocabulary (Muse Spark 추정 구조)]
┌───────────────────────────────┐
│  텍스트 토큰 (~128K)           │
│  이미지 patch 토큰 (~수만~수십만)│
│  오디오 토큰 (~수만)           │
│  도구 호출 토큰 (~수천)        │
│  특수 제어 토큰                │
└───────────────────────────────┘
   → 모두 같은 사전에 들어 있음
   → 입력에도, 출력에도 자유롭게 등장 가능
```

이미지가 더 이상 "번역되어 들어오는 손님"이 아니라 사전에 정식 등록된 1등 시민이 된다. 모델은 이미지 patch를 읽을 수 있을 뿐 아니라 이미지 patch를 **쓸 수도 있다.** 그래서 native multimodal 모델은 이미지 생성도 할 수 있다 — 별도의 diffusion 모델을 붙이지 않고도. 같은 사전에서 다음 토큰이 텍스트일 수도, 이미지 patch일 수도 있는 구조이기 때문이다.

도구 호출도 마찬가지다. 도구 호출은 더 이상 텍스트로 흉내 낸 특수 시퀀스가 아니라, 사전에 정식 등록된 별도 토큰 클래스다. 모델이 "이 시점에서 search 도구를 부른다"고 결정하는 것은 다음 단어를 결정하는 것과 본질적으로 같은 행위가 된다. 그래서 자연스럽다.

### 3.2 Cross-modal attention — "어텐션이 모달리티 경계를 모른다"

두 번째는 어텐션 마스크다.

Bolt-on 모델에서는 이미지 임베딩이 LLM에 들어간 뒤에도 어떤 식으로든 "이미지 영역"과 "텍스트 영역"이 구분된다. Projection layer가 만든 "이미지 토큰들"은 어텐션 입장에서 일종의 외래 손님이고, 모델은 그것을 별도 영역으로 처리하는 경향이 있다. 어텐션 패턴을 시각화해보면 이미지-텍스트 경계에서 어텐션 가중치가 약해지는 현상이 자주 관찰된다.

Native multimodal에서는 처음부터 통합 시퀀스로 훈련되기 때문에 이 경계가 사라진다. 어텐션 패턴에는 텍스트, 이미지 patch, 도구 호출 결과가 구분 없이 한 줄로 늘어서 있고, 어떤 토큰이든 어떤 토큰에든 자유롭게 어텐션을 줄 수 있다.

이게 왜 중요한가? **Visual chain-of-thought**가 가능해지기 때문이다.

전통적인 chain-of-thought는 텍스트 추론이다. "먼저 A를 계산하고, 그 다음 B를 계산하고, 그래서 C가 답이다" 같은 식으로 토큰을 한 줄로 이어가는 것. Visual chain-of-thought는 이 과정에 이미지가 끼어드는 것이다. "이 이미지를 보면 → 여기 부분을 확대하면 → 이런 패턴이 보이고 → 따라서 답은 ..." 이 과정의 "여기 부분을 확대하면" 단계에서 모델이 실제로 새로운 이미지 토큰을 생성한다. 그 새로 생성된 이미지가 다음 단계의 입력으로 다시 들어간다.

이게 가능하려면 어텐션이 모달리티 경계를 자유롭게 넘나들 수 있어야 한다. 텍스트 추론 토큰이 이전에 생성된 이미지 patch에 어텐션을 주고, 거기서 새로운 이미지 patch를 생성하고, 그 새 이미지를 다시 텍스트 추론에 활용하는 — 이런 흐름이 한 시퀀스 안에서 일어나야 한다. Bolt-on 구조에서는 거의 불가능한 일이다. 이미지가 출력될 수 없는 토큰이기 때문이다.

GIGAZINE 기사가 강조한 "사고 토큰의 사용을 최적화하는 구조"가 바로 이것이다. 추론 도중에 시각적 사고가 끼어들고, 그것이 텍스트 추론과 같은 시퀀스 안에서 매끄럽게 이어지는 것.

### 3.3 Cross-modal training objective — "다음 토큰이 무엇이 될지 미리 정해져 있지 않다"

세 번째는 훈련 목표다. 이게 사실 가장 중요하다.

기존 텍스트 LLM의 훈련 목표는 단순하다. **"주어진 이전 토큰들을 보고 다음 텍스트 토큰을 예측하라."** Cross-entropy loss로 정의된 단일 목표다. 모델은 다음에 올 것이 텍스트라는 것을 안다.

Bolt-on 멀티모달의 훈련 목표는 약간 더 복잡하다. 보통 두 단계로 나뉜다. 먼저 vision encoder를 contrastive learning(CLIP 방식) 등으로 별도 훈련하고, 그 다음에 projection layer를 LLM에 붙여서 vision-language 데이터로 fine-tune한다. 두 단계가 분리되어 있어서, vision encoder는 자기가 무엇에 쓰일지 모르는 채로 훈련된다.

Native multimodal의 훈련 목표는 단순하면서도 근본적으로 다르다. **"주어진 이전 토큰들을 보고, 다음 토큰이 무엇이든 그것을 예측하라."** 다음 토큰이 텍스트일 수도, 이미지 patch일 수도, 도구 호출일 수도 있다. 모델은 다음에 올 것이 무엇인지를 미리 알지 못한다.

수도 코드로 표현하면 이런 식이다.

```python
# 기존 텍스트 LLM (초기 Llama)
loss = cross_entropy(predicted_text_token, actual_text_token)

# Bolt-on multimodal (LLaVA)
# 1단계: vision encoder 별도 훈련 (CLIP loss)
# 2단계: projection + LLM fine-tune
loss = cross_entropy(
    predicted_text_token_after_image,
    actual_text_token
)

# Native multimodal (Muse Spark, GPT-4o, Gemini)
# 단일 단계, 단일 목표
loss = cross_entropy(
    predicted_next_token,  # text or image_patch or tool_call
    actual_next_token
)
```

차이는 표면적으로는 미묘하지만 결과는 거대하다. 모델이 "다음 토큰이 무엇이든 예측하라"는 목표 아래 훈련되면, 이미지와 텍스트와 도구 호출이 같은 통계 공간에 자리를 잡는다. 이미지 patch와 텍스트 토큰이 같은 임베딩 공간에서 의미적으로 가까이 위치하게 되고, 모델은 "고양이"라는 텍스트 토큰과 "고양이 이미지의 patch들"이 같은 개념의 다른 표현이라는 것을 자연스럽게 학습한다. 이것이 representation gap이 닫히는 메커니즘이다.

### 3.4 1/10의 compute라는 숫자가 의미하는 것

GIGAZINE이 인용한 핵심 숫자, **"Llama 4 Maverick과 같은 성능을 1/10의 compute로 달성한다"** 가 의미하는 바는 이 맥락에서 비로소 명확해진다.

같은 텍스트 task에서 native multimodal이 bolt-on보다 1/10의 compute로 같은 점수를 낸다는 것이 아니다. **멀티모달 task와 도구 사용이 섞인 종합 평가에서, native multimodal은 같은 능력을 훨씬 적은 compute로 달성한다**는 것이다. 왜냐하면 bolt-on 구조에서는 모델이 "이미지를 텍스트로 번역하기 → 그 텍스트로 추론하기 → 다시 출력 만들기"의 우회로를 거치는데, 이 우회로 자체가 막대한 compute 낭비이기 때문이다.

토큰 공간 통합, cross-modal attention, cross-modal training objective. 이 세 가지가 함께 작동할 때 우회로가 사라지고, 추론이 직진한다. 이것이 "일체형"이라는 단어가 가리키는 구조적 실체다.

---

## 4. "Ground-up overhaul"의 진짜 비용 — 왜 이것이 "쇄신"인가

[TechCrunch가 사용한 "ground-up overhaul"이라는 표현](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)이 왜 정확한지 이제 보일 것이다. Bolt-on에서 native로 가는 것은 "기존 모델을 개선한다"는 의미가 아니다. **기존에 만들어 놓은 것의 거의 전부를 버린다**는 의미다.

Meta가 이 결정으로 잃은 것을 하나씩 짚어보자.

**(1) Llama 가중치 — 가장 큰 자산을 포기**

Llama 1부터 Llama 4 Maverick까지, Meta는 최소한 수만에서 수십만 GPU-month의 compute를 투자했다. 그 결과물이 Llama 가중치다. 이 가중치는 Meta의 가장 값비싼 자산이었고, 동시에 Meta가 오픈소스 진영에서 영향력을 가지는 가장 큰 무기였다.

Native multimodal로 가는 순간 이 가중치는 재활용 불가능한 것이 된다. 토큰 vocabulary가 다르기 때문이다. 텍스트 토큰 사전이 다르고, 이미지 토큰 사전이 처음부터 새로 만들어진다. 어텐션 패턴도 처음부터 다시 학습되어야 한다. Llama 가중치를 부분적으로 옮겨 심을 수 있는 방법이 거의 없다.

Meta가 Muse Spark를 만들면서 Llama 가중치를 한 줄도 재활용하지 않았다는 것은, 그 자산을 사실상 폐기했다는 것을 의미한다. 5년에 걸쳐 쌓아 올린 자산을. 이것이 "ground-up"의 첫 번째 비용이다.

**(2) 훈련 데이터 파이프라인 — 처음부터 다시**

기존 Llama 훈련 데이터 파이프라인은 텍스트 중심으로 설계되어 있었다. 웹 크롤링, deduplication, 품질 필터링, instruction tuning 데이터셋 등이 모두 텍스트라는 가정 위에 만들어져 있었다.

Native multimodal은 이 파이프라인을 거의 처음부터 다시 만들어야 한다. 텍스트와 이미지가 정렬된 거대 데이터셋이 필요하다. 그것도 단순히 "이미지 + 캡션" 쌍이 아니라, 자연스러운 long-form 텍스트 안에 이미지가 끼어들어 있는 형태의 데이터. 그리고 도구 호출이 포함된 trajectory 데이터. 그리고 visual chain-of-thought 형태의 reasoning 데이터.

이런 데이터는 시중에 거의 존재하지 않는다. Meta가 Scale AI에 거액을 투자한 것이 이 맥락에서 비로소 이해된다. Scale AI는 데이터 라벨링과 합성 데이터 생성에서 압도적인 인프라를 가지고 있는 회사다. Alexandr Wang이 Meta Superintelligence Labs를 이끌게 된 것은 단순한 인재 영입이 아니라, "이 데이터 파이프라인을 처음부터 만들 수 있는 사람"을 데려왔다는 의미다.

**(3) GPU 인프라의 사용 방식 — 다른 패턴**

훈련의 GPU 패턴 자체가 다르다. 텍스트 LLM 훈련은 거대한 텍스트 배치를 일정한 시퀀스 길이로 처리하는 비교적 균일한 패턴이다. 멀티모달 훈련은 시퀀스 안에 이미지 patch가 끼어들면서 메모리 사용량과 연산 패턴이 훨씬 불규칙해진다. 기존 Llama 훈련 인프라가 그대로 쓸 수 있는 것이 아니다.

또한 native multimodal 모델은 학습 단계에서 cross-modal attention을 풀로 돌려야 하기 때문에, attention 메모리 사용량이 텍스트 전용 모델보다 훨씬 크다. KV 캐시 압축, sequence parallelism, expert parallelism 같은 인프라 기술이 모두 멀티모달 시퀀스에 맞게 재조정되어야 한다.

**(4) 조직 구조의 비용**

이미 언급했지만 다시 강조할 가치가 있다. Meta는 이 전환을 위해 새 조직을 만들었다. Meta Superintelligence Labs는 기존 GenAI(Llama를 만들었던 조직)와 별도로 운영된다. 이는 "Llama 노선과 native multimodal 노선을 같은 조직에서 동시에 굴리는 것이 불가능하다"는 판단의 결과다. 한 조직이 두 노선을 동시에 추구하면, 둘 다 어중간해진다. 그래서 분리한 것이다.

조직을 분리한다는 것은 정치적 비용을 의미한다. Llama 조직의 자존심, 예산 배분, 인재 이동, 책임 소재 — 이 모든 것이 흔들렸을 것이다. Meta가 이 정도의 내부 비용을 감수하면서까지 native multimodal로 갔다는 것은, "Llama 노선을 유지하면 미래가 없다"는 절박한 판단이 있었다는 것을 시사한다.

**이 네 가지 비용을 모두 합치면, "ground-up overhaul"이라는 표현이 결코 과장이 아니라는 것이 보인다.** 그리고 Meta가 이 비용을 감수했다는 사실 자체가, native multimodal이 단순한 트렌드가 아니라 구조적 필연이라는 가장 강력한 증거다.

---

## 5. GPT-4o, Gemini, Muse Spark — 프론티어가 수렴하는 방향

흥미로운 것은 Meta만이 이 전환을 한 것이 아니라는 점이다. 프론티어 모델 진영 전체가 같은 방향으로 수렴하고 있다.

**OpenAI GPT-4o**: 2024년 5월에 발표된 GPT-4o는 OpenAI가 처음으로 명시적으로 "natively multimodal"이라고 부른 모델이다. 텍스트, 이미지, 오디오를 같은 토큰 공간에서 처리한다는 것을 발표 자료에서 강조했다. 응답 지연 시간이 극적으로 짧아진 것이 가장 가시적인 신호였다 — 이전 GPT-4V는 음성 입력을 받으면 "음성 → 텍스트 → 텍스트 처리 → 텍스트 → 음성"의 우회로를 거쳤지만, GPT-4o는 그 우회로를 없앴다.

**Google Gemini**: Gemini는 처음부터(적어도 마케팅 차원에서) "natively multimodal"을 표방하고 출발한 모델이다. Gemini 1.0이 2023년 말에 발표되면서 Google이 강조한 것이 바로 "text와 image를 동일한 모델 안에서 동시에 학습한다"는 점이었다. Gemini 1.5와 Gemini 2.0을 거치며 이 노선은 강화되었고, long context와 멀티모달 reasoning에서 GPT-4o와 직접 경쟁하는 위치까지 올라왔다.

**Meta Muse Spark**: 그리고 이제 2026년 4월, Meta가 합류했다. 마지막 메이저 플레이어가 native multimodal로 노선을 바꾸면서, 프론티어 모델 진영의 수렴이 사실상 완료되었다.

이 수렴이 무엇을 의미하는가?

첫째, **bolt-on 시대가 끝났다는 것이다.** 적어도 프론티어급 모델에서는. Llama 5나 Llama 6가 나올 가능성은 없지 않지만, 그것이 다시 bolt-on 구조로 돌아갈 가능성은 거의 없어 보인다. 모든 메이저 연구 조직이 같은 결론에 도달한 상황에서 혼자 다른 길을 가는 것은 무모하다.

둘째, **오픈소스 진영에 던져진 무거운 질문이다.** Native multimodal의 훈련 비용은 bolt-on의 몇 배에 달한다. 데이터 파이프라인의 복잡도도 훨씬 높다. 이걸 학계 연구실이나 작은 오픈소스 그룹이 따라갈 수 있을까? Llama가 오픈모델 진영의 표준이 될 수 있었던 이유 중 하나는 bolt-on 구조의 저비용성이었다. 이 저비용성이 사라지면, 오픈모델 진영은 어떻게 프론티어와의 격차를 좁힐 것인가?

셋째, **Mistral, Qwen, DeepSeek 같은 후발 오픈모델 진영의 선택이다.** 이들 중 일부는 이미 native multimodal을 시도하고 있다. Qwen-VL의 후속작이나 DeepSeek-VL2는 단순한 bolt-on에서 벗어나려는 시도들이다. 그러나 GPT-4o, Gemini, Muse Spark급의 native multimodal에 도달하려면 훨씬 더 큰 투자가 필요하다. 이것이 가능한 진영은 결국 거대 자본을 가진 곳뿐일지도 모른다.

**프론티어가 수렴할수록, 그 프론티어에 닿는 비용은 올라간다.** 이것은 효율성의 역설이다. 모두가 같은 방향을 알고 있다는 것이, 그 방향으로 가는 것을 더 쉽게 만들어주지는 않는다. 오히려 표준이 수렴할수록 그 표준에 도달하기 위한 진입 장벽이 올라간다.

---

## 6. 무엇이 남는가 — 아직 답하지 못한 질문들

Native multimodal이 대세라는 것은 명확해졌다. 그러나 명확해진 만큼이나, 아직 답하지 못한 질문들이 있다.

**(1) Training compute의 한계**

Native multimodal은 정말 효율적인가? GIGAZINE이 인용한 "1/10 compute로 같은 성능"이라는 숫자는 fine-tuning 단계 이후의 inference 효율성에 가까운 비교일 가능성이 높다. 처음부터 native multimodal로 모델을 훈련하는 데 드는 총 compute는 bolt-on 모델 + fine-tuning의 합보다 결코 적지 않다. 오히려 더 많을 가능성이 높다. "더 적은 compute"는 같은 능력을 얻기 위한 inference 시점의 비용이지, 만들기 시점의 비용이 아니다.

**(2) 데이터 품질과 evaluation의 어려움**

Native multimodal의 evaluation은 텍스트 LLM의 evaluation보다 훨씬 어렵다. Visual chain-of-thought가 정확한지를 자동으로 채점하는 방법이 아직 표준화되어 있지 않다. Tool use trajectory의 품질도 마찬가지다. Humanity's Last Exam, FrontierScience Research 같은 벤치마크가 등장한 것은 이 어려움의 한 증상이다. 우리는 아직 native multimodal 모델을 어떻게 비교해야 하는지에 대한 합의된 답을 가지고 있지 않다.

**(3) 오픈소스 진영의 추격 가능성**

위에서 던진 질문이 가장 무겁다. Llama 노선이 끝났다면, 오픈모델 진영은 어디로 가는가? 두 가지 시나리오가 가능하다. 하나는 Mistral, Qwen, DeepSeek 같은 진영이 자체적으로 native multimodal을 만들어내며 추격하는 것. 다른 하나는 오픈모델 진영이 텍스트 전용 영역에 머물며 프론티어와의 격차가 점점 벌어지는 것. 어느 쪽이 일어날지는 아직 모른다.

**(4) Tool use의 표준화**

Native multimodal에서 도구 호출이 토큰 사전의 일부가 되었다는 것은, 모델이 어떤 도구를 어떤 형식으로 부르는지가 모델 가중치 안에 박혀 있다는 의미다. 즉 도구 호출 인터페이스가 모델별로 다를 수 있다. Anthropic의 MCP(Model Context Protocol) 같은 표준화 노력이 이 맥락에서 더 중요해진다. 그러나 표준이 모델 가중치에 종속되기 시작하면, 표준화의 동력 자체가 약해질 수도 있다.

**(5) Llama 가중치의 운명**

Meta가 Llama 가중치를 폐기했다고 했지만, 정확히는 "재활용하지 않았다"는 의미다. Llama 4 Maverick은 여전히 오픈소스로 살아있다. 그 가중치를 기반으로 한 수많은 파생 모델, fine-tune, 서비스가 작동 중이다. 이들이 갑자기 사라지지는 않는다. 오히려 Llama는 "frozen artifact"가 되어, 향후 몇 년간 오픈모델 진영의 기반으로 쓰일 가능성이 높다. **Meta가 Llama를 버린 것과, 세상이 Llama를 버리는 것은 다른 일이다.**

---

## 7. 질문들 — 당신이 쓰는 모델은 어떤 노선 위에 있는가

이제 글을 마무리할 시간이다. 그러나 결론을 내리는 대신 질문을 던지고 싶다.

당신이 지금 쓰는 모델은 어떤 노선 위에 있는가?

ChatGPT(GPT-4o 이후)나 Gemini, 혹은 Claude를 쓰고 있다면 당신은 이미 native multimodal의 사용자다. 이미지를 던지면 그 이미지를 "정말로" 보는 모델, 도구 호출이 어색하지 않은 모델, 추론이 모달리티 경계를 자유롭게 넘나드는 모델. 아마 명시적으로 의식해본 적은 없을 것이다. 그러나 그 매끄러움이 우연이 아니라, 토큰 vocabulary와 어텐션과 훈련 목표의 통합이라는 구조적 결정의 결과라는 것을 이제 안다.

당신이 회사에서 자체 모델을 운영한다면 — Llama 4 Maverick을 fine-tune해서 쓰고 있거나, LLaVA 변종을 사내에 배포했거나 — 한 가지 무거운 질문이 남는다. **이 모델은 얼마나 오래 갈 것인가?** Bolt-on 구조의 한계가 점점 명확해지는 가운데, 당신의 사용 사례가 그 한계 안에 있는지 밖에 있는지를 진지하게 따져봐야 한다. 단순한 텍스트 분류, 요약, RAG 정도라면 bolt-on 모델로 충분히 오래갈 수 있다. 그러나 visual reasoning이나 long-horizon agent task가 필요해지는 순간, native multimodal로의 전환을 고민해야 한다. 그리고 그 전환은 Meta가 보여줬듯이 "더 큰 모델로 바꾸는 것" 수준이 아니라 "전체 스택을 재검토하는 것"에 가깝다.

당신이 오픈모델 진영의 연구자나 개발자라면 — DeepSeek과 Qwen과 Mistral의 다음 행보를 주시하라. 그들이 native multimodal에 어떻게 도달할 것인지, 혹은 도달하지 못할 것인지가 향후 몇 년간 오픈AI 생태계의 향방을 결정할 것이다. 만약 그들이 도달하지 못한다면, "오픈모델"이라는 단어가 의미하는 바 자체가 바뀔지도 모른다. "텍스트는 오픈, 멀티모달은 폐쇄"라는 새로운 분단선이 그어질 수도 있다.

그리고 마지막으로, Meta 자신에 대한 질문. **Muse Spark는 시작일 뿐이다.** Muse Pro, Muse Ultra가 뒤따를 것이다. 그 패밀리가 GPT-5나 Gemini 3와 정면으로 경쟁할 수 있는 수준에 도달할 것인가? Meta가 Llama 가중치라는 거대한 자산을 폐기하면서까지 감행한 이 도박이 성공할 것인가, 아니면 "ground-up overhaul"이 결국 "ground-down failure"로 끝날 것인가?

답은 아직 모른다. 그러나 한 가지는 확실하다. 2026년 4월 8일, Meta는 자신의 이름값보다 더 큰 것을 걸었다. 그것이 무엇을 의미하는지를 보려면, App Store 순위나 주가가 아니라 토큰 vocabulary와 어텐션 마스크와 훈련 목표를 봐야 한다.

기술은 디테일에 산다. 그리고 Muse Spark의 디테일은 — Llama가 끝났다고 말하고 있다.

---

## 참고문헌

- [TechCrunch — Meta debuts the Muse Spark model in a ground-up overhaul of its AI](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)
- [TechCrunch — Meta AI app climbs to No. 5 on the App Store after Muse Spark launch](https://techcrunch.com/2026/04/09/meta-ai-app-climbs-to-no-5-on-the-app-store-after-muse-spark-launch/)
- [GIGAZINE — Meta가 네이티브 멀티모달 추론 모델 Muse Spark를 발표](https://gigazine.net/news/20260409-meta-muse-spark/)
- [Gizmodo Japan — Meta의 AI에 복권의 징조, Muse Spark](https://www.gizmodo.jp/2026/04/meta_muse_spark.html)
- [Forbes Japan — Meta 주가 급등, AI 경쟁의 반격 카드](https://forbesjapan.com/articles/detail/95425?s=ns)
- [Meta AI 공식 (X) — Muse Spark introduces tool use, visual chain-of-thought](https://twitter.com/AIatMeta/status/2041910285653737975)
- [Meta AI 공식 (X) — Muse Spark의 스케일링 특성 연구](https://twitter.com/AIatMeta/status/2041926291142930899)
