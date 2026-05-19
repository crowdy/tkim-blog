---
title: "Anthropic이 Stainless를 산 이유 — LLM 회사가 SDK 생성기를 사 들이는 시대"
description: "Stainless의 호스트형 SDK 생성기는 5월 18일자로 단종된다. Anthropic은 회사 자체보다 alex Rattray 와 엔지니어 팀을 샀다. 'agents are only as useful as what they can connect to' 한 줄이 가리키는 새 경쟁축은 모델이 아니라 SDK·도구·MCP 의 두께다."
pubDate: 2026-05-14T00:00:00.000Z
lang: ko
pairSlug: anthropic-stainless-acquisition
draft: false
---

# Anthropic이 Stainless를 산 이유 — LLM 회사가 SDK 생성기를 사 들이는 시대

> Anthropic은 왜 자기 API SDK를 줄곧 만들어 온 외주 회사를 통째로 사 들였는가. 그리고 그 회사의 핵심 제품인 호스트형 SDK 생성기를 같은 날 단종시킨 결정은 무엇을 말하는가.

## 도입 — "acquihire" 라는 단어가 부족한 거래

5월 18일, Anthropic 은 짤막한 블로그 글 하나로 Stainless 인수를 발표했다. Stainless 는 2022년에 창업한 작은 회사로, TypeScript·Python·Go·Java·Kotlin SDK 와 MCP 서버를 OpenAPI 사양으로부터 생성해 주는 서비스를 팔아 왔다. 발표문은 두 줄로 요약된다. 첫째, Stainless 는 Anthropic 의 첫 SDK 부터 줄곧 그 SDK 를 생성해 왔다. 둘째, "에이전트는 그것이 연결할 수 있는 것만큼만 유용하다(agents are only as useful as what they can connect to)". 인수 조건은 공개되지 않았다.

24시간 안에 Hacker News 의 인수 발표 스레드는 332점, 232 코멘트를 기록했다. 거기에 진짜 뉴스가 있었다. 별도의 공지에 짧게 적힌 한 줄, "Stainless 의 호스트형 제품은 SDK 생성기를 포함해 단종된다. 오늘부터 신규 가입과 신규 프로젝트, 새 SDK 발급은 중단된다(we'll be winding down all hosted Stainless products, including our SDK generator. Starting today, new signups, projects, and SDKs will not be available)". HN의 한 사용자 drewda 는 한 줄로 요약했다. "결국 acquihire 다." 다른 사용자 kristjansson 은 더 날카로웠다. "이건 OpenAI 의 정문을 사 들여서 EOL 시킨다는 발표처럼 읽힌다."

여기에 진짜 분석 거리가 있다. Anthropic 이 산 것은 회사가 아니라 엔지니어 팀과 그 팀이 들고 있던 패턴이고, 자기가 산 그 회사의 핵심 제품을 같은 날 단종시켰다. 이런 거래에는 보통 두 가지 해석이 있다. 하나는 단순한 인재 인수다. 다른 하나는 자신의 경쟁 인프라가 외부에 묶여 있는 위험을 안에서 내재화하는 작업이다. 이번 거래는 두 번째에 훨씬 가깝다. 그리고 그 배경에는 5월 들어 누구나 OpenAPI 사양 한 장으로 SDK 를 "vibe coding" 할 수 있게 된 시장 변화가 깔려 있다.

이 글은 그 배경을 세 단계로 따져 본다. 먼저 Stainless 의 제품이 정확히 무엇이었는가. 다음에 왜 LLM 모델 회사가 SDK 생성기를 사야 했는가. 마지막으로 이 거래가 LLM 시장의 새 경쟁축이 무엇으로 이동했는지를 무엇으로 보여 주는가.

## 본문 1 — Stainless 는 정확히 무엇을 팔았는가

Stainless 는 2022년 Alex Rattray 가 창업한 회사다. 같은 해 OpenAI 가 ChatGPT API 를 공개하기 직전이었다. Rattray 가 발표문에서 내놓은 한 줄은 단순하지만 본질적이다. "SDK 는 그것이 감싸는 API 만큼의 정성을 들일 가치가 있다(SDKs deserve as much care as the APIs they wrap)." 이 문장은 2022년에는 비주류 관점이었다. 그 시점에 API 회사 대부분은 OpenAPI 사양만 잘 적어 두면 SDK 는 부수 산출물이라고 봤다. swagger-codegen 이나 openapi-generator 같은 오픈소스가 있었고, 마음에 들지 않으면 자기 손으로 다듬으면 된다고 생각했다.

Stainless 는 그 통념에 정확히 반대로 베팅했다. SDK 는 사용자가 API 를 처음 만나는 표면이고, 그 표면의 품질이 그 API 의 채택률을 결정한다는 것이다. 이 회사가 만든 생성기는 단순한 변환기가 아니었다. 같은 OpenAPI 사양에서 출발해 각 언어의 관용구에 맞춘 SDK 를 자동 생성하면서, 페이지네이션·재시도·스트리밍·타입 추론·async/sync 변형·에러 계층까지 언어별로 다르게 다듬어 주는 도구였다. Mux 의 GeneticGenesis 는 HN 코멘트에서 "초기부터 그들의 Node SDK 생성기를 썼고, 그 다음에 TypeScript 생성기도 썼고, 제품은 잘 동작했다(was an early adopter of their Node SDK generator at Mux, and the product worked great)"고 적었다.

가장 중요한 고객은 OpenAI 였다. OpenAI 의 공식 Python SDK 와 Node SDK 는 Stainless 의 생성기로 만들어졌다. 그래서 HN 의 kristjansson 이 "OpenAI 의 정문을 사 들였다"고 표현한 것이다. Anthropic 의 공식 SDK 역시 처음부터 Stainless 가 만들었다. Cloudflare, Plaid, Mux 같은 회사들도 같은 도구를 썼다. 즉 Stainless 는 "AI 시대 API 의 SDK 인프라"를 사실상 독점하다시피 한 회사였다.

이 회사가 Anthropic 에 팔리기 직전에 시장에 무슨 일이 일어나고 있었는가. 2025년 후반부터 OpenAPI 사양만 있으면 Claude Code, Cursor, GitHub Copilot 같은 도구가 깔끔한 SDK 를 한두 시간 안에 토해 내기 시작했다. HN 의 GeneticGenesis 는 같은 코멘트에서 이 흐름을 짚는다. "지금은 OpenAPI 사양에서 SDK 를 'vibe coding' 하는 게 너무 쉽고 매력적이다. 많은 팀이 그 방향으로 갈 것이다(it's very tempting and easy to vibe code SDKs from a OpenAPI spec files right now. I would think a lot of teams will just go in that direction)." Stainless 가 깔아 둔 디테일 — 재시도 정책, 페이지네이션 헬퍼, 타입 안전성 — 가운데 상당 부분이 LLM 코드 생성으로 충분히 대체 가능한 수준까지 떨어졌다는 뜻이다.

여기에 Stainless 의 사업적 위기가 있었다. 호스트형 SDK 생성기를 SaaS 로 팔아 온 회사 입장에서, 같은 결과물을 LLM 이 무료로 토해 내기 시작하면 가격 압력이 가파르게 떨어진다. 회사로서의 성장 곡선이 꺾일 위험이 있는 시점에, 시장에서 가장 큰 고객이 자기를 통째로 사겠다고 했다. 그 거래는 회사 입장에서도 합리적이다.

## 본문 2 — 왜 LLM 회사가 SDK 생성기를 사야 했는가

Anthropic 의 발표문에서 가장 묵직한 한 줄은 짧다. "Agents are only as useful as what they can connect to." 이 문장은 Anthropic 의 미래 전략 한 가운데를 정확히 가리킨다. 모델이 아무리 똑똑해져도, 그 모델이 호출할 수 있는 도구와 API 와 데이터 소스의 두께가 얇으면 실용 가치가 굳어지지 않는다. 2025년 11월에 발표한 MCP(Model Context Protocol)와 그 위에 깔린 도구 생태계는 이 두께를 직접 늘리는 시도였다. 5월의 Stainless 인수는 그 시도의 다음 분기다.

Anthropic 의 입장에서 보면, SDK 는 이제 부산물이 아니라 전략 자산이다. 이유는 세 가지로 나뉜다.

첫째, Claude 의 도구 호출 사양과 MCP 인터페이스가 사실상 산업 표준으로 굳어지고 있다는 점이다. 5월 들어 Microsoft 의 Copilot Studio 가 MCP 를 받아들였고, Google 의 Gemini Code Assist 도 MCP 호환을 발표했다. 이 흐름이 굳으면, 어떤 회사가 자기 API 를 LLM 에이전트에서 호출하게 만들고 싶을 때, MCP 서버를 만들지 SDK 만 만들지를 선택해야 한다. 그리고 그 양쪽을 한 번에 생성해 주는 도구가 Stainless 의 생성기였다. Anthropic 입장에서는 자신이 정의한 표준에 가장 잘 맞춰 SDK 와 MCP 서버를 토해 내는 도구가 외부 회사 손에 있다는 사실 자체가 불안 요소다.

둘째, 경쟁사 OpenAI 의 공식 SDK 도 같은 회사가 만들고 있었다. 이 사실은 Anthropic 입장에서는 미묘한 약점이었다. 자기 SDK 의 품질을 외부 회사에 의지하면서, 그 외부 회사가 경쟁사의 SDK 도 같이 만들고 있다는 구조다. HN 의 pplante 는 코멘트에서 "agentic 코딩 도구가 walled garden 으로 변하는 흐름을 보고 있는 것 같다(I feel like we are seeing agentic coding tools morph into walled gardens with these acquisitions)"고 적었다. 이번 거래는 그 흐름의 한 사례다. Anthropic 은 자기 SDK 인프라를 자기 안으로 끌어들이고, 그 인프라의 디테일을 자기 표준에 맞춰 최적화할 수 있는 위치로 옮겼다. 부수 효과로 OpenAI 의 공식 SDK 가 같은 도구 위에서 만들어진다는 비대칭이 해소된다.

셋째, "에이전트가 연결할 수 있는 것"의 두께가 모델 성능보다 결정적인 변수가 되는 시점이 다가오고 있다. Anthropic 의 Claude Code 가 OpenAI 의 Codex 와 Google 의 Gemini Code Assist 를 비교 우위로 앞서는 영역은 모델 자체의 추론력이 아니라, 셸 명령·파일 도구·MCP 서버·shell 권한 모델 같은 운영 디테일이다. 이 비교 우위를 굳히려면, 외부 회사가 SDK 를 만들 때 Anthropic 의 패턴을 따르게 하는 것만으로는 부족하다. 직접 그 SDK 를 만들고, 외부 회사들이 자기 API 를 빠르게 Claude 에 연결할 수 있게 도와주는 인프라를 자기 손에 쥐고 있어야 한다. Stainless 의 엔지니어 팀과 코드 자산이 그 인프라의 핵심이다.

다만 이번 거래의 가시적 비용도 또렷하다. HN 코멘트에서 가장 자주 등장한 단어는 "petty and pointless" 였다. 기존 고객들의 SDK 가 갑자기 단종 발표를 받았다는 사실이 그 정서를 만들었다. kristjansson 의 코멘트는 그 정서를 정확히 적는다. "기존 사용자·SDK 에 대한 명확한 정보를 좀 더 줘야 했다. 그게 없으면 이 발표는 '우리가 OpenAI 의 정문을 사서 EOL 시킨다, 부디 앞으로 안 쓰길 바란다' 같이 읽힌다." Anthropic 은 인수 가치를 짧게는 인재로, 길게는 패턴과 표준의 내재화로 회수할 것이다. 하지만 단기적으로는 Stainless 의 호스트형 제품을 쓰던 수백 곳의 회사들이 새 SDK 도구를 찾아야 한다. 5월 5월 6월 사이에 이들이 어디로 옮겨 가는가가 시장의 균형을 다시 한 번 흔들 것이다.

## 본문 3 — 새 경쟁축: 모델이 아니라 SDK·도구·MCP 의 두께

여기서 한 발 물러서 LLM 시장 전체를 보자. 2023년부터 2025년 초까지 모델 회사들의 경쟁축은 단순했다. 누가 더 좋은 모델을 더 빨리 내놓는가. GPT-4 와 Claude 3 와 Gemini 1.5 가 차례로 자기 차례를 가져가던 시기였다. 그 시기의 인수·합병은 주로 GPU·데이터·연구자에 몰렸다. Anthropic 이 Stainless 를 산 거래는 그 패턴에 들어맞지 않는다. 이 거래는 모델 회사가 SDK 인프라를 자기 안에 끌어들인 첫 사례다.

이 변화의 배경에는 모델 성능 곡선이 평탄해지고 있다는 인식이 있다. 5월 들어 Anthropic, OpenAI, Google 모두 새 모델을 발표했지만, 벤치마크 점수의 분포는 점점 좁아지고 있다. Qwen 3.7 Preview 가 Arena 에서 Anthropic 의 모델과 견줄 만한 위치에 들어왔다. 사용자 입장에서 모델 한 단계 더 좋아진다는 것이 결정적 변수가 아니게 되는 시점이 다가오고 있다. 그러면 회사들의 경쟁축은 모델이 아니라 그 모델을 둘러싼 인프라, 즉 도구 호출 사양, MCP 생태계의 두께, SDK 품질, 권한 모델의 안전성, 비용 가시화의 정밀함 같은 것으로 이동한다.

이 이동을 Anthropic 은 가장 빨리 인지하고 행동에 옮긴 회사다. 작년 11월에 MCP 를 풀어 외부 회사들이 자기 API 를 Claude 에 연결할 수 있는 표준 통로를 깔았다. 5월의 Stainless 인수는 그 통로의 시공 능력을 자기 안에 가져오는 결정이다. 외부 회사가 자기 API 를 MCP 서버로 노출하고 싶을 때, Anthropic 이 직접 만든 도구로 SDK 와 MCP 서버를 동시에 토해 내 줄 수 있다면, Anthropic 의 도구 생태계는 단숨에 가장 두꺼워진다. OpenAI 의 Codex 가 같은 작업을 하려면 외부 도구에 의존하거나, 비슷한 인수를 따로 해야 한다. 시간은 Anthropic 쪽이 먼저 벌어 놓은 셈이다.

그렇다고 이 결정에 위험이 없는 것은 아니다. SDK 생성을 한 회사에 집중시킨다는 것은 그 회사가 패턴을 정의하게 된다는 뜻이고, 패턴이 자기 쪽 에이전트 인터페이스에 너무 깊게 묶이면 다른 모델 회사들이 그 패턴을 모방하기를 꺼리게 된다. 그러면 결국 자기만 쓰는 좁은 인터페이스로 갇힐 수 있다. 표준이 되려면 일정한 개방성이 필요하다. MCP 가 그동안 빠르게 채택된 것은 인터페이스가 충분히 단순하고 열려 있었기 때문이다. Stainless 의 자산을 흡수한 다음에도 그 자산을 자사 SDK 만이 아니라 외부 회사의 SDK 와 MCP 서버 생성에도 계속 열어 둔다면, 새 표준의 게이트키퍼가 되는 자리는 굳어진다. 닫아 버리면 그 자리도 무너진다.

다른 LLM 회사들이 이번 거래를 보고 비슷한 결정을 내릴 가능성도 높다. OpenAI 는 자기 공식 SDK 를 다른 도구로 옮기는 작업을 빠르게 해야 한다. 자체 인수를 할지, 내부에서 새로 만들지의 선택이 곧 결정될 것이다. Google 의 Gemini 팀도 자체 SDK 인프라 쪽으로 손을 댈 가능성이 크다. Cohere, Mistral, Together AI 같은 회사들은 외부 SDK 생성기에 더 강하게 의지해 왔는데, 이 시장이 갑자기 비어 버리면 작은 회사들이 그 자리를 메우려고 들어올 것이다. HN 의 한 코멘터가 "이건 sdks-as-a-service 시장이 통째로 재편되는 신호"라고 적은 이유다.

## 결론 — SDK 가 모델 회사의 전략 자산이 된 순간

처음의 두 질문으로 돌아가자. Anthropic 은 왜 Stainless 를 사 들였는가. 그리고 같은 날 그 회사의 호스트형 제품을 단종시킨 결정은 무엇을 말하는가.

첫 번째 질문에 대한 답은 단순한 acquihire 가 아니다. 인재만 필요했다면 개별 채용으로 충분했을 것이다. Anthropic 이 산 것은 Alex Rattray 와 엔지니어 팀, 그리고 그 팀이 4년 동안 OpenAI·Anthropic·Cloudflare 같은 회사의 SDK 를 만들면서 굳혀 온 패턴이다. 이 패턴이 자기 안에 들어오는 것과 외부에 묶여 있는 것 사이에는 큰 차이가 있다. 자기 안에 두면, MCP 와 도구 호출 사양과 권한 모델을 자기 표준으로 빠르게 통합할 수 있다. 외부에 두면, 그 회사가 OpenAI 의 SDK 도 같은 패턴으로 만들면서 표준이 분산된다.

두 번째 질문에 대한 답은 더 단순하다. 호스트형 SDK 생성기 자체는 이제 LLM 코드 생성이 잠식해 가는 시장이라, 사업으로서의 수명이 길지 않다. Anthropic 은 그 사업의 미래보다 그 사업을 만든 사람들과 그 사람들의 패턴을 사고 싶었다. 그래서 사업은 단종시키고 사람과 패턴만 가져왔다. 기존 고객들 입장에서는 불쾌한 결정이지만, 시장 흐름을 보면 어차피 한두 분기 안에 같은 결과에 도달했을 결정이기도 하다.

이 거래가 남기는 메시지는 한 줄로 요약된다. **모델 회사의 진짜 경쟁축이 모델에서 그 모델을 둘러싼 SDK·도구·MCP 의 두께로 이동했다.** 5월의 Anthropic-Stainless 거래는 그 이동의 첫 가시적 신호다. 다음 분기에 OpenAI 와 Google 이 어떤 카드를 꺼내는지를 보면, 이 이동이 일시적인지 영구적인지 더 분명해질 것이다. 그 사이에 SDK 와 MCP 를 만들어 자기 API 를 Claude 에 연결하고 싶은 작은 회사들은, 5월 18일을 자기 일정표에 표시해 두는 게 좋다. 인프라의 풍경이 그날부터 바뀐다.

---
출처:
- [Anthropic acquires Stainless](https://www.anthropic.com/news/anthropic-acquires-stainless)
- [HN: Anthropic acquires Stainless](https://news.ycombinator.com/item?id=48182281)
