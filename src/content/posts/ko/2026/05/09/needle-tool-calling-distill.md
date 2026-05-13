---
title: "26M 파라미터에 갇힌 Gemini — Needle이 던진 라우터-스페셜리스트 시대의 신호탄"
description: "cactus-compute가 Gemini 3.1의 도구 호출 능력을 26M 모델로 증류해 MIT 라이선스로 공개했다. 이는 단순한 모바일 LLM이 아니라, 추론과 함수 호출을 분리하는 새로운 분업 구조의 가능성을 입증한 사건이다."
pubDate: 2026-05-09T00:00:00.000Z
lang: ko
pairSlug: needle-tool-calling-distill
draft: false
---

# 26M 파라미터에 갇힌 Gemini — Needle이 던진 라우터-스페셜리스트 시대의 신호탄

> 도구 호출이 정말 추론(reasoning)인가, 아니면 잘 위장된 구조화된 출력(structured output)인가. 만약 후자라면, 우리는 지난 2년간 너무 큰 모델에 너무 단순한 일을 시켜 온 것이 아닌가.

## 도입 — 14메가바이트짜리 손가락

2026년 5월 8일, cactus-compute라는 작은 스타트업이 Hacker News에 "Show HN: Needle — We Distilled Gemini Tool Calling into a 26M Model"이라는 제목의 글을 올렸다. 24시간 만에 415점을 모았고, 댓글은 144건이 붙었다. 첨부된 GitHub 리포지토리는 사흘 만에 700개 이상의 별을 받았다. 발표 시점 기준으로 모델 크기는 26,000,000 파라미터, FP16 가중치 파일은 약 14메가바이트, 라이선스는 MIT, 학습 출발점은 Google Gemini 3.1.

수치만 놓고 보면 이상한 발표다. 2026년 봄 시점의 프런티어 LLM이 1조 파라미터 단위로 진입한 지 1년이 넘었다. 같은 달에 공개된 GPT-5.5와 Claude Opus 4.6은 모두 long-horizon agent 워크플로에서의 도구 호출 정확도와 백트래킹을 핵심 지표로 내세웠다. 그 한복판에서 누군가가 26M 파라미터 — 즉 Phi-3 Mini의 약 150분의 1, Llama 3 8B의 약 300분의 1 — 짜리 모델로 "Gemini의 도구 호출을 그대로 따라 하게 했다"고 주장한 것이다.

처음 보면 농담처럼 보이는 이 발표가 진지하게 받아들여진 이유는 두 가지다. 첫째, cactus-compute는 이전부터 모바일/엣지용 추론 런타임을 만들어 온 팀이고, Needle은 그들의 자체 SDK 위에서 6,000 tokens/sec prefill, 1,200 tokens/sec decode라는 폰 친화적인 성능 수치를 들고 나왔다. 둘째, 이 발표는 지난 2년 동안 SLM(Small Language Model) 진영이 줄곧 부딪쳐 온 벽 — "작은 모델은 도구 호출에서 어이없는 환각을 본다" — 을 정확히 정조준하고 있다.

이 사건이 시사하는 바는 단순하지 않다. 모바일 디바이스에서 LLM이 동작한다는 이야기는 2024년 Apple Intelligence 발표 이후 진부한 주제가 됐지만, "에이전트가 모바일 디바이스에서 동작한다"는 이야기는 다르다. Needle이 하는 일은 결국 한 가지다. 사용자의 자연어 발화를 받아, 알맞은 함수 이름과 인자를 JSON으로 뱉는 것. 그 단순한 작업이 만약 26M 파라미터로 충분하다면, 우리가 지금까지 100B, 1T 모델에게 시키고 있던 일의 상당 부분은 비효율의 결과였다는 의미가 된다.

## 본문 1 — Needle은 무엇을 했는가, 그리고 무엇을 하지 못하는가

먼저 사실관계부터 정리하자. Needle의 GitHub README에 따르면, 이 모델은 "Simple Attention Network"라는 이름의 변형 트랜스포머 구조를 채택한다. 12개의 인코더 레이어와 8개의 디코더 레이어, 각 디코더 레이어에 8개의 어텐션 헤드와 4개의 KV(key-value) 헤드, 임베딩 차원 512, 어휘 크기 8,192 BPE 토큰. 가장 두드러진 특징은 인코더 레이어에 FFN(feed-forward network)이 없다는 점이다. 이 결정의 근거를 저자들은 README에 직접 적었다. "Cactus에서의 실험은 모델이 외부 지식 출처에 의존하기만 한다면, 트랜스포머 네트워크에서 MLP를 완전히 빼도 된다는 사실을 보여 주었다(Experiments at Cactus showed that MLPs can be completely dropped from transformer networks, as long as the model relies on external knowledge source)."

이 한 줄이 함의하는 바는 크다. 트랜스포머에서 FFN은 보통 "지식 저장소" 역할을 한다고 알려져 있다. 어텐션이 토큰 간 관계를 만든다면, FFN은 그 관계 위에 사실 정보를 올린다. Needle은 도구 호출이라는 작업이 "프롬프트 안에 이미 모든 정보(사용 가능한 도구의 이름과 시그니처)가 들어 있는" 작업이라는 점을 노리고, FFN을 통째로 들어냈다. 이것이 26M이라는 숫자가 나오는 핵심 비결이다.

Hacker News 댓글창에서 fizza_pizza라는 사용자가 정확히 이 부분을 짚었다. "검색 작업에서 FFN이 필요 없다는 관찰이 흥미롭다. 본질적으로, 지식이 컨텍스트 안에 있다면 FFN 가중치는 그 작업에 대해 잉여라는 주장이다. 이게 모델이 여러 호출에 걸쳐 상태를 추적해야 하는 멀티턴 도구 호출에도 일반화되는지, 아니면 거기에서는 무너지는지가 궁금하다(The 'no FFN for retrieval tasks' observation is interesting essentially arguing that if the knowledge is in the context, FFN weights are redundant for that task. Curious whether this generalizes to multi-turn tool calling where the model needs to track state across several calls, or if it breaks down there)." 이는 핵심을 찌르는 질문이다. 그리고 cactus-compute의 답은 README에 이미 들어 있다. Needle은 "single-shot function call"에 특화돼 있다고 명시했다. 즉, 한 번의 사용자 발화에 대해 한 번의 도구 호출을 골라 인자를 채우는 작업까지가 약속의 범위다.

성능 비교는 상대적인 형태로 제시됐다. 저자들은 "single-shot function call에서 FunctionGemma-270m, Qwen-0.6B, Granite-350m, LFM2.5-350m를 능가한다"고만 적었다. BFCL(Berkeley Function Calling Leaderboard) 같은 표준 벤치마크 점수는 발표 시점에 공개되지 않았다. 이 부분은 댓글에서 meander_water가 정확히 지적한 약점이다. "Gemma4 엣지 모델이 에이전트 용도에 좋다고 약속됐지만, 내 테스트에서는 가장 기본적인 도구 호출 시나리오에서도 실패했다. Needle에 대해 도구 사용 벤치마크를 돌렸거나 돌릴 계획이 있는가? 결과를 리포에 올려 주면 좋겠다(Have you run any tool-use benchmarks for Needle, or do you plan to? Would be great if you could add results to the repo)." 발표가 생산하는 흥분과 학술적 검증 사이의 시간차를 보여 주는 댓글이다.

또 하나 흥미로운 댓글은 varenc의 것이다. "Google이 이 작업에 어떻게 반응할지 걱정되지 않는가? Google은 증류 시도에 대해 학생 모델 성능을 저하시킬 수 있는 실시간 능동 방어로 대응한다고 보고됐다. 그래서 만약 그들이 너희를 탐지했다면, 의도적으로 더 멍청하지만 그럴듯한 변종 Gemini를 먹였을 수도 있다(Google reportedly reacts to distillation attempts with real-time proactive defenses that can degrade student model performance)." 이 발언은 Google의 공식 위협 인텔리전스 블로그 문구를 직접 인용한 것이다. 이 우려에 대해 cactus-compute 측은 직접 답하지 않았지만, 두 가지 점을 지적할 수 있다. 첫째, Needle은 도구 호출이라는 좁은 작업에 한정된 distill이라 Google의 비즈니스 핵심을 위협하지 않는다. 둘째, 도구 호출의 기대 출력은 JSON 스키마라는 외부 검증이 가능한 형식이다. 즉, "그럴듯하지만 미묘하게 망가진" 학습 데이터가 있었다면 학생 모델의 출력 자체가 컴파일되지 않았을 가능성이 높다. 도구 호출은 자연어 요약과 달리, 잘못됐을 때 그것이 잘못됐는지를 즉시 알 수 있는 작업이다.

학습 데이터 생성과 라이선스에 관해서는 미묘한 회색 지대가 남는다. 저자들은 자신들이 어떤 API 약관 아래서 Gemini의 출력을 받았는지 명시하지 않았고, 한국 시점에서 Google API 이용 약관은 "Google 모델과 경쟁하는 모델 학습 목적의 출력 사용"을 금지한다는 조항을 포함한다. Needle이 그 조항에 어떻게 부합하는지는 발표만 보면 불분명하다. 이것은 distill 진영 전반의 미해결 과제이며, Needle은 그 회색 지대 위에 발표된 첫 번째 의미 있는 도구 호출 모델이라는 위치에 놓인다.

요약하면, Needle은 "도구 호출이라는 좁은 작업"을 "프롬프트 의존적 구조화 출력"으로 재정의한 뒤, 그 정의에 맞춰 트랜스포머 구조 자체를 깎아내는 방식으로 모델 크기를 두 자릿수 메가바이트 단위까지 끌어내렸다. 멀티턴 추론과 신규 스키마 일반화는 약속하지 않는다. 그러나 그 좁은 약속 자체가 들고 있는 의미가 작지 않다.

## 본문 2 — 왜 도구 호출은 distill되는가, 추론은 왜 되지 않는가

Needle의 발표를 받아들이는 데 있어 가장 큰 정신적 장벽은, 우리가 지난 2년 동안 "도구 호출도 결국 추론의 일부"라고 가정해 왔다는 점이다. ReAct 패턴, ChatGPT의 function calling, Anthropic의 tool use, OpenAI Assistants API — 이 모든 인터페이스는 도구 호출을 모델의 사고(thought) 흐름 안에 깊숙이 박아 두었다. 결과적으로 도구를 잘 부르는 모델이 잘 추론하는 모델이고, 그 역도 성립한다는 직관이 굳어졌다.

Needle은 이 직관을 거꾸로 뒤집는다. 사용자의 발화 "What's the weather in San Francisco?"와 도구 시그니처 `get_weather(location: string)`이 주어졌을 때, 출력 `{"name":"get_weather","arguments":{"location":"San Francisco"}}`를 만드는 일은 추론이라기보다는 패턴 매칭이다. 더 정확히는, 자연어 슬롯에서 함수 인자 슬롯으로의 사상(mapping) 작업이다. 이 작업에서 모델이 풀어야 할 것은 "샌프란시스코의 오늘 날씨가 흐릴 것인가"가 아니라, "샌프란시스코"라는 토큰 시퀀스가 location 인자에 들어갈 적합한 값이라는 사실의 인지다.

여기에 도구 호출의 두 번째 특징이 결합된다. 출력의 형식이 엄격하게 정의돼 있다는 점이다. JSON 스키마는 모델 출력에 대한 외부 검증 함수를 제공한다. 잘못된 출력은 파싱 단계에서 즉시 잡힌다. 자연어 응답이 "그럴듯하지만 틀린" 답을 만들어 낼 수 있는 것과 달리, 도구 호출은 "구문적으로 올바르거나 틀리거나"라는 이진 판정을 받는다. 이런 작업에 대해 RLHF는 보상 신호가 깔끔하게 정의되고, 학습 효율이 비약적으로 높아진다. 이것이 결국 26M이라는 작은 파라미터 예산 안에 충분한 능력을 욱여넣을 수 있게 만든 두 번째 요인이다.

HN 댓글창의 jumploops가 이 점을 다른 각도에서 짚었다. "Sonnet은 종종 더 많은 컨텍스트를 모으기 위해 빠르게 도구를 호출하는 반면, Opus는 자기가 가진 컨텍스트로 문제를 풀려고 더 오래 추론한다. (...) 내 결론은, '더 멍청한'(즉 더 작은) 모델이 에이전트 하네스로 더 나을 수 있고, 적어도 큰 부류의 문제에 대해 실현 가능할 정도로 싸고 빠를 수 있다는 것이다(My takeaway was that 'dumber' (i.e. smaller) models might be better as an agentic harness, or at least feasibly cheaper/faster to run for a large swath of problems)." 이 관찰은 Needle의 가설과 정확히 일치한다. 큰 모델은 도구를 부르기 전에 너무 오래 생각하고, 그 결과 같은 함수를 두 번 정의하거나, 이미 호출한 도구를 다시 부르거나, 사용자가 묻지 않은 부수 작업을 하는 경향이 있다.

이 분리를 architecturally 표현하면 라우터-스페셜리스트(router-specialist) 구조가 된다. 작은 모델 — 라우터 — 이 사용자의 발화를 받아 "이건 코드 검색 도구로 처리하라"거나 "이건 캘린더 추가 도구로 처리하라"고 결정하면, 그 도구의 결과를 받아 자연어 응답을 생성하는 큰 모델이 따로 동작한다. 혹은 더 극단적으로는, 도구의 출력 자체가 사용자에게 직접 전달되는 형태도 가능하다. 이 분업 구조에서 라우터는 굳이 추론할 필요가 없다. 그리고 라우터가 추론할 필요가 없다면, 라우터는 모바일 디바이스에 들어갈 수 있다.

여기에서 Needle 발표가 진정으로 충격적인 이유가 드러난다. 26M이라는 숫자는 단순한 작은 모델이 아니라, "라우터는 진짜로 모바일 폰의 NPU에서 동작할 수 있다"는 명제의 첫 번째 실증이다. 6,000 tokens/sec prefill 수치는 1,000 토큰의 도구 시그니처 컨텍스트를 0.2초 안에 처리한다는 뜻이고, 1,200 tokens/sec decode 수치는 100토큰 짜리 JSON 출력을 0.1초 안에 뱉는다는 뜻이다. 사용자가 말하기를 끝낸 시점부터 함수 호출이 시작되기까지의 지연시간이 0.3초 이내라면, 그것은 사람이 인식하지 못하는 지연시간이다.

다만 이 그림에는 결정적 단서가 붙는다. 라우터가 잘못된 도구를 골랐을 때, 그 잘못을 알아차릴 수 있는 메타 인지 능력은 작은 모델에 존재하지 않는다. nl이라는 댓글 작성자가 정확히 이 점을 짚었다. "내 질문은 모호함 처리에 얼마나 효과적인가다. '내일 10시에 커피 마시며 따라잡자'는 문자 메시지와 '이거 저장해'라는 명령을 함께 보냈을 때, 수백 개(혹은 수십 개)의 가능한 도구 중에서 'add appointment' 액션을 고를 수 있는가(Can I send it something like a text message 'lets catch up at coffee tomorrow 10:00' and a command like 'save this' and have it choose a 'add appointment' action from hundreds (or even tens) of possible tools)?" 이 질문에 대한 정직한 답은 "Needle은 모른다"이다. 도구 풀의 크기가 커질수록, 그리고 사용자의 의도가 모호할수록, distill된 모델의 한계가 드러난다.

이 한계는 distill 일반의 본질적 약점이다. 학생 모델은 교사 모델이 본 분포 안에서만 신뢰할 만하게 동작한다. 새로운 도구 시그니처, 새로운 인자 타입, 새로운 호출 패턴 — 이 모든 것은 fine-tune이 추가로 필요하다. cactus-compute가 README에서 "테스트 후 자체 도구에 대해 fine-tune할 것을 추천한다"고 적은 부분은, 단순한 유저 가이드가 아니라 distill 모델 본질의 정직한 고지다.

## 본문 3 — 엣지 에이전트의 미래, 그리고 그것이 의미하는 분업

Needle 같은 모델이 정착하면 무엇이 바뀌는가. 세 가지 시나리오를 그려 볼 수 있다.

첫째, **온디바이스 어시스턴트의 진정한 의미 변화**다. 지금까지 모바일 어시스턴트(Siri, Google Assistant, Bixby)는 사실 클라우드 어시스턴트였다. 음성 인식과 의도 분류는 디바이스에서 이뤄질 수 있어도, 그 의도를 적절한 작업으로 사상하는 추론 단계는 클라우드에서 일어났다. Needle 부류의 모델은 그 사상 단계 자체를 디바이스에 가져온다. 결과적으로 "비행기 모드에서도 동작하는 어시스턴트", "대역폭이 0인 환경에서 캘린더에 약속을 추가하는 어시스턴트"가 가능해진다. 이는 애플의 Apple Intelligence가 2024년에 약속했지만 부분적으로만 달성한 미래다.

둘째, **CLI 도구의 새로운 인터페이스 계층**이다. 이는 ilaksh이라는 댓글 작성자가 흥미롭게 짚은 부분이다. "이건 어쩌면 자연어로 인자를 옵션으로 지정할 수 있는 명령줄 프로그램 같은 걸 만드는 일을 가능하게 만들 수 있다. (...) `> toolcli what can you do`가 `toolcli --help summary`를 실행하고, `toolcli add tom to teamfutz group`이 `toolcli --gadd teamfutz tom`이 되는 식이다(this might make it feasible to build something like a command line program where you can optionally just specify the arguments in natural language. E.g. '> toolcli what can you do' runs 'toolcli --help summary')." 이 시나리오는 14메가바이트의 모델을 모든 CLI 바이너리에 묶어 배포하는 일이 합리적이 되는 첫 시점을 가리킨다. 같은 댓글 작성자가 덧붙인 우려 — "모든 CLI가 그렇게 하기 시작하면 꽤 안 좋아질 수 있다" — 도 정당하다. 하지만 그 우려는 동시에, 이 모델이 진짜로 다양한 곳에 박혀 들어갈 만한 임계점에 도달했다는 신호이기도 하다.

셋째, **프라이버시와 에이전트의 화해**다. 지금까지 에이전트의 가장 큰 채택 장벽은 데이터 노출이었다. 코딩 에이전트가 코드를 본다는 것은 코드가 클라우드에 올라간다는 것이고, 개인 어시스턴트가 메시지를 본다는 것은 메시지가 다른 회사의 서버에서 처리된다는 것이었다. 라우터-스페셜리스트 구조는 이 문제를 부분적으로 해결한다. 라우터가 디바이스에 있다면, "어떤 도구를 부를지"라는 결정 자체는 외부로 나가지 않는다. 도구 자체가 클라우드 API를 호출해야 한다면 그 시점에 비로소 데이터가 외부로 나가지만, 적어도 사용자의 의도는 디바이스 안에 머문다.

다만 이 그림 전체에 대한 회의 또한 정직하게 짚어야 한다. binyang_qiu라는 댓글 작성자의 한 줄이 그 회의를 깔끔하게 표현한다. "많은 에이전트 워크플로는 사실상 도구 선택 + 인자 추출 + 구조화된 출력일 뿐이다. 워크플로가 멀티 스텝이 되고 호출 사이에 상태가 쌓이기 시작하면 어떻게 동작하는가(How does this behave once workflows become multi-step and state starts accumulating across calls)?" 이 질문은 Needle 같은 모델이 적합한 영역과 부적합한 영역을 구분하는 결정적 기준을 가리킨다. 적합한 영역은 "단일 발화 → 단일 도구 호출 → 사용자에게 결과 반환"이라는 짧은 루프다. 부적합한 영역은 "여러 도구를 연쇄적으로 부르며, 도구 출력이 다음 도구의 입력이 되는" 긴 루프다. 후자는 여전히 큰 모델의 영역으로 남는다.

기술적으로 이를 다시 표현하면, Needle은 에이전트 시스템의 "맨 앞단" — 사용자 의도를 도구 공간으로 매핑하는 첫 번째 홉(hop) — 에 들어가는 모델이다. 그 뒤에 무엇이 오는지는 시스템 설계자의 자유다. 또 다른 작은 모델일 수도 있고, 큰 클라우드 모델일 수도 있다. 중요한 것은 그 첫 홉이 디바이스 안에 들어왔다는 점이고, 그 결과 시스템 전체의 지연시간, 비용, 프라이버시 곡선이 다시 그려진다는 점이다.

## 결론

도구 호출이 정말 추론인가. Needle의 발표는 이 질문에 부정 답을 던진다. 적어도 도구 호출의 가장 기본 형태인 single-shot function call은 추론이 아니라 잘 위장된 구조화된 출력이다. 그것은 자연어 슬롯을 함수 인자 슬롯으로 사상하는 작업이고, 그 작업의 보상 함수는 JSON 파서 통과 여부라는 이진 신호로 깔끔하게 정의된다. 이런 작업에 대해 26M 파라미터는 충분한 예산이다.

이것이 의미하는 분업은 명확하다. 추론이 필요한 영역 — 멀티 스텝 계획, 모호한 의도 해석, 도구 풀이 동적으로 변하는 환경 — 은 여전히 큰 모델의 몫이다. 하지만 사용자 의도의 첫 번째 매핑, 도구 호출의 단일 홉, 인자 추출과 같은 작업은 이제 디바이스에서 실행될 수 있다. 우리는 지난 2년간 너무 큰 모델에 너무 단순한 일을 시켜 왔고, Needle은 그 비효율의 청구서를 드디어 가시화했다.

cactus-compute가 단독으로 이 미래를 만들지는 않을 것이다. Apple Intelligence의 차기 버전, Google의 차세대 Gemini Nano, 그리고 오픈소스 진영의 후속 distill 모델들이 같은 길을 따라올 가능성이 높다. 그러나 그 흐름의 첫 번째 의미 있는 좌표를 찍은 발표가 26M 파라미터, 14메가바이트, MIT 라이선스라는 조건으로 나왔다는 점은 기억할 가치가 있다. 거대 자본 없이도, 좁은 작업에 충분히 좁게 접근하면 frontier 모델의 한 능력을 폰 안으로 가져올 수 있다는 증명이다. 그리고 이는 LLM 시대 들어 처음으로 "스케일이 정답이 아닌" 첫 작업이 명시적으로 분리되는 순간이기도 하다.
