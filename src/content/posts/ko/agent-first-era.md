---
title: '인간인지 Agent인지 알 수 없는 시대 — "API First"의 다음, "Agent First"의 세계'
description: '우리 웹사이트의 "고객"이 바뀌고 있다. 2025년, 전체 웹 트래픽의 과반이 봇이 된 지금, 다음 고객은 브라우저를 든 인간이 아니라 API를 호출하는 AI Agent일 수 있다.'
pubDate: 2026-03-04T00:00:00.000Z
lang: ko
pairSlug: 'agent-first-era'
draft: false
sourceDir: posted
---
# 인간인지 Agent인지 알 수 없는 시대 — "API First"의 다음, "Agent First"의 세계

> 우리 웹사이트의 "고객"이 바뀌고 있다. 2025년, 전체 웹 트래픽의 과반이 봇이 된 지금, 다음 고객은 브라우저를 든 인간이 아니라 API를 호출하는 AI Agent일 수 있다.

---

## 1. 이미 변했다 — 트래픽의 과반이 봇인 시대

숫자부터 보자.

- **전체 웹 트래픽의 51%가 봇** — Imperva 2025 Bad Bot Report에 따르면, 2024년 기준으로 자동화된 봇 트래픽이 인간 트래픽을 처음으로 추월했다.
- **GPTBot 트래픽 305% 증가** — Cloudflare 2025 Year in Review는 AI 학습용 크롤러의 폭발적 증가를 보고했다.
- **사용자 대행 AI Agent 트래픽 15배 증가** — 단순 크롤링이 아니라, 인간 대신 웹을 *사용하는* Agent가 급증하고 있다.

불과 2~3년 전만 해도 "봇 트래픽"이라 하면 스팸 봇이나 스크래퍼를 떠올렸다. 하지만 지금의 봇은 다르다. ChatGPT가 사용자의 질문에 답하기 위해 실시간으로 웹을 검색하고, OpenAI Operator가 사용자 대신 항공권을 예매하며, Google의 Project Mariner가 쇼핑 비교를 대행한다. **웹사이트의 "고객"이 근본적으로 변하고 있다.**

---

## 2. AI Agent가 웹을 사용하는 3가지 방식

AI Agent의 웹 접근은 세 가지 카테고리로 나뉜다.

### (a) 학습/스크래핑 크롤러
GPTBot, ClaudeBot, Google-Extended 등이 LLM 학습 데이터를 수집한다. robots.txt로 제어 가능하지만, 이를 무시하는 크롤러도 증가 추세다. Akamai의 2025년 보고서에 따르면 AI 봇넷은 기존 WAF를 우회하는 새로운 패턴을 보이고 있다.

### (b) 검색/추론 봇
Perplexity, Google AI Overview, Bing Copilot 등이 사용자 질문에 답하기 위해 실시간으로 웹 콘텐츠를 읽고 요약한다. 이들이 생성하는 답변이 원본 사이트의 트래픽을 대체하면서, **Zero-click 검색이 약 60%에 달한다** (SparkToro 2024).

### (c) 사용자 대행 Agent
OpenAI Operator, Google Project Mariner, Anthropic Computer Use가 사용자를 대신해 웹에서 작업을 수행한다. 로그인하고, 폼을 채우고, 결제까지 진행한다.

**카테고리 (c)가 가장 빠르게 성장하고 있으며, 비즈니스 임팩트도 가장 크다.** 이 Agent들은 단순히 정보를 읽는 것이 아니라 *거래*를 수행한다. Salesforce의 Cyber Week 2025 데이터에 따르면 AI Agent가 전체 주문의 약 20%에 영향을 미쳤으며, 이는 약 670억 달러 규모의 매출에 해당한다.

---

## 3. "API First"에서 "Agent First"로 — 세계의 움직임

이 변화에 대응하는 움직임은 이미 전 세계적으로 가속화되고 있다.

### GMO Internet Group — "GMO API First"
일본 GMO Internet Group은 API First 전략을 내걸고 전사적 전환을 추진 중이다. 결제 서비스 fincode byGMO는 **일본 최초의 PSP(Payment Service Provider)로서 MCP(Model Context Protocol)를 지원**(2025년 6월)하여, AI Agent가 결제 기능에 직접 접근할 수 있게 했다. MCP 서버는 GitHub에 오픈소스로 공개되어 있다.

### Shopify — Universal Commerce Protocol (UCP)
Shopify는 Google과 공동으로 UCP를 발표했다. AI Agent가 상품 검색부터 결제까지 전 과정을 자동화할 수 있는 표준 프로토콜이다. 수백만 Shopify 스토어가 한 번에 Agent-ready가 되는 셈이다.

### Stripe + OpenAI — Agentic Commerce Protocol (ACP)
Stripe와 OpenAI가 공동 개발한 ACP는 ChatGPT 내에서 즉시 결제를 가능하게 한다. 사용자가 "이 제품 구매해줘"라고 말하면 Agent가 결제까지 완료하는 세계다.

### Cloudflare — 이중 인터페이스 전략
Cloudflare는 가장 실용적인 접근을 취했다. 같은 URL에 대해 **인간에게는 HTML을, Agent에게는 Markdown을 반환**하는 Content Negotiation을 지원한다(`Accept: text/markdown`). 동시에 AI 크롤러의 무단 스크래핑에는 **기본 차단**으로 대응하고(2025년 7월~), 정당한 접근에는 HTTP 402 + Pay-Per-Crawl 마켓플레이스를 통해 과금 모델을 제시했다.

### Microsoft — "Open Agentic Web" 선언
Microsoft는 Build 2025에서 "오픈 에이전틱 웹(Open Agentic Web)"을 선언하며, Azure AI Foundry Agent Service를 통해 에이전트 인프라 플랫폼을 제공하기 시작했다.

### Google — A2A + WebMCP
Google은 Agent 간 통신 표준인 A2A(Agent-to-Agent) 프로토콜을 발표하고 Linux Foundation에 기부했다. Chrome 146 Canary에는 WebMCP가 탑재되어 브라우저 자체가 Agent의 도구가 된다.

### Anthropic — MCP의 사실상 표준화
Anthropic이 만든 MCP(Model Context Protocol)는 Agent가 외부 도구와 데이터에 연결하는 사실상의 표준이 되었다. 2025년 12월 Linux Foundation의 AAIF(Agentic AI Foundation)에 기부되면서 벤더 중립적 표준으로 자리잡았다.

### 일본 디지털청 — Base Registry API화
일본 디지털청은 2026년 3월을 목표로 Base Registry(법인번호, 주소 등 기초 데이터)의 API화를 추진 중이다. 정부 데이터도 Agent가 접근할 수 있는 시대가 열리고 있다.

---

## 4. 준비해야 할 것 — 기술편

### 4-1. 프로토콜과 표준 대응

현재 Agent 관련 프로토콜은 난립 상태이지만, 2026년 들어 통합 추세가 뚜렷하다. 각 프로토콜의 역할과 우선도를 정리하면 다음과 같다.

| 프로토콜 | 역할 | 우선도 |
|----------|------|--------|
| **MCP** (Anthropic → AAIF) | Agent ↔ Tool/Data 연결 | ★★★ 필수 |
| **A2A** (Google → Linux Foundation) | Agent ↔ Agent 통신 | ★★☆ 주시 |
| **WebMCP** (W3C) | Agent ↔ Browser 통합 | ★☆☆ 관망 |
| **llms.txt** | AI 발견용 사이트맵 | ★★☆ 도입 용이 |
| **Schema.org / JSON-LD** | 구조화 데이터 | ★★★ 필수 |

MCP는 이미 사실상 표준이 되었고, Schema.org/JSON-LD는 기존 SEO 인프라 위에 구축할 수 있어 즉시 도입 가능하다. llms.txt는 구현이 간단하면서도 AI 크롤러의 콘텐츠 이해도를 크게 높일 수 있다.

### 4-2. 인프라 변화

**Content Negotiation 대응**
`Accept: text/markdown` 헤더를 보내는 Agent에게 구조화된 Markdown을 반환한다. Cloudflare를 사용하고 있다면 자동 변환 기능을 활성화할 수 있다. 같은 URL에서 인간과 Agent에게 각각 최적화된 콘텐츠를 제공하는 것이 핵심이다.

**API Gateway → Agent Gateway**
기존 API Gateway에 Agent 전용 라우팅, 속도 제한, 과금 로직을 추가한다. 인간의 브라우저 요청과 Agent의 API 요청을 구분하여 각각에 최적화된 응답을 제공한다.

**인증 체계의 진화**
OAuth 2.1에 Agent 위임(delegation) 확장이 IETF 드래프트로 진행 중이다. Agent가 사용자를 대신해 인증하고, 위임 체인을 추적할 수 있는 체계가 필요하다. W3C에서는 AI Agent Protocol Community Group이 설립되어 표준화 논의를 시작했다.

**Headless Architecture**
UI 레이어와 데이터/비즈니스 로직을 분리하는 Headless Architecture가 Agent 시대에 더욱 중요해진다. Agent는 UI가 필요 없다. 데이터에 직접, 구조화된 형태로 접근할 수 있어야 한다.

### 4-3. 보안 대응

**Prompt Injection 방어**
OWASP LLM Top 10의 1위 취약점이다. 웹 콘텐츠에 삽입된 악의적 프롬프트가 Agent의 행동을 조작할 수 있다. 출력 데이터의 샌드박싱과 Agent 입력의 검증이 필수다.

**Web Bot Auth — 신뢰할 수 있는 Agent 식별**
Cloudflare가 제안한 Web Bot Auth는 암호학적 서명으로 Agent의 신원을 검증한다. "이 요청은 OpenAI Operator가 김철수 사용자를 대신해 보낸 것"임을 증명할 수 있는 체계다.

**Zero Trust for Agents**
Agent에게도 Zero Trust 원칙을 적용한다. 최소 권한(Least Privilege), 단기 토큰(Short-lived Token), 위임 체인 추적(Delegation Chain Tracking)이 핵심이다.

---

## 5. 준비해야 할 것 — 비즈니스편

### 5-1. SEO에서 GEO(Generative Engine Optimization)로

> "AI가 100ms 안에 데이터 구조를 이해하지 못하면, 미래 검색에서 당신의 브랜드는 존재하지 않는다."

전통적인 SEO는 검색 결과 페이지에서의 순위 싸움이었다. 하지만 AI가 답변을 직접 생성하는 시대에는 **AI에 의해 인용(citation)되는 것**이 새로운 SEO다. Zero-click 검색이 약 60%에 달하면서, 사용자가 원본 사이트를 방문하지 않아도 AI가 정보를 전달하는 구조가 정착되고 있다.

GEO를 위한 핵심 전략:
- **구조화된 데이터**: Schema.org, JSON-LD로 AI가 파싱하기 쉬운 형태로 콘텐츠 제공
- **llms.txt**: AI 크롤러 전용 사이트맵으로 핵심 콘텐츠의 발견성 향상
- **권위 있는 인용**: 신뢰할 수 있는 출처로부터의 인용이 AI 답변에 포함될 확률을 높임

### 5-2. 수익 모델의 재설계

AI Agent는 광고를 보지 않는다. 기존 광고 기반 수익 모델이 근본적으로 흔들린다.

**새로운 수익 모델들**:
- **Crawl Licensing**: 콘텐츠 접근권을 라이선스로 판매 (Cloudflare의 Pay-Per-Crawl이 대표적)
- **Agent Access 과금**: API 형태로 데이터를 제공하고 호출량에 따라 과금
- **프로토콜 기반 커머스**: Shopify UCP, Stripe ACP처럼 Agent가 직접 거래를 수행하는 새로운 커머스 채널

AI 검색 광고 시장은 2025년 약 11억 달러에서 2029년 260억 달러로 급성장이 예측된다. 새로운 광고 형태가 등장할 것이지만, 그 전에 콘텐츠 사업자는 대안적 수익원을 확보해야 한다.

### 5-3. "에이전틱 커머스" 대비

숫자가 말해준다:
- **Salesforce**: AI Agent가 2025년 Cyber Week 주문의 약 20%에 영향, 670억 달러 매출 규모
- **Bain & Company**: 2030년까지 미국 이커머스 매출의 15~25%를 에이전틱 AI가 담당 전망 (3,000~5,000억 달러 규모)
- **Gartner**: 2028년까지 AI Agent가 인간 영업사원 수의 10배에 달할 것으로 예측

에이전틱 커머스에서 승리하려면:
1. **Agent-friendly한 상품 데이터**: 구조화된 카탈로그, 명확한 가격/재고 API
2. **프로토콜 지원**: MCP, UCP, ACP 등을 통한 Agent 직접 거래 지원
3. **Agent 전용 UX**: 인간용 UI와 별도로 Agent가 효율적으로 탐색/비교/구매할 수 있는 인터페이스

---

## 6. 결론: "Agent-Responsive Design"의 시대

2010년대, 모바일 혁명은 **Mobile-Responsive Design**을 필수로 만들었다. 웹사이트는 작은 화면에도 최적화되어야 했다.

2020년대 중반, AI Agent 혁명은 **Agent-Responsive Design**을 요구하고 있다. 웹사이트는 이제 "인간이 읽는 매거진"이 아니라 **"Agent가 참조하는 데이터 노드"**이기도 하다. 같은 콘텐츠를 인간에게는 아름다운 UI로, Agent에게는 구조화된 데이터로 제공하는 이중 인터페이스가 기본이 된다.

GMO Internet Group의 API First 전략은 이 시대의 정확한 방향을 짚고 있다. API가 있어야 Agent가 접근할 수 있고, Agent가 접근할 수 있어야 미래의 고객을 만날 수 있다.

### 지금 당장 할 수 있는 3가지

| 순서 | 액션 | 난이도 | 효과 |
|------|------|--------|------|
| 1 | **llms.txt 배포 + Schema.org 구조화 데이터 강화** | 낮음 | AI 검색 노출 즉시 향상 |
| 2 | **핵심 서비스의 MCP Server 제공 검토** | 중간 | Agent 생태계 진입 |
| 3 | **Content Negotiation 대응** (Markdown for Agents) | 중간 | 인간/Agent 이중 대응 |

"Mobile-First"가 늦었던 기업이 모바일 시대에 뒤처졌듯, "Agent-First"가 늦으면 AI Agent 시대에 보이지 않는 존재가 된다. **지금이 준비할 때다.**

---

## 참고 자료

- [Imperva, *2025 Bad Bot Report*](https://www.imperva.com/blog/2025-imperva-bad-bot-report-how-ai-is-supercharging-the-bot-threat/)
- [Cloudflare, *"From Googlebot to GPTBot: Who's Crawling Your Site in 2025"*](https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/)
- [Cloudflare, *Radar 2025 Year in Review*](https://blog.cloudflare.com/radar-2025-year-in-review/)
- [Cloudflare, *"Content Independence Day"*](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/)
- [Salesforce, *Cyber Week 2025 Press Release*](https://www.salesforce.com/news/press-releases/2025/12/05/cyber-week-ai-agents-sales/)
- [McKinsey, *"The Agentic Commerce Opportunity"*](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants)
- [Bain & Company, *"2030 Forecast: How Agentic AI Will Reshape US Retail"*](https://www.bain.com/insights/2030-forecast-how-agentic-ai-will-reshape-us-retail-snap-chart/)
- [Gartner, *AI Agents Will Outnumber Sellers by 10x by 2028*](https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-predicts-by-2028-ai-agents-will-outnumber-sellers-by-10x)
- [eMarketer, *GenAI Search Advertising Trends 2025*](https://www.emarketer.com/content/genai-search-advertising-trends-2025)
- [SparkToro, *2024 Zero-Click Search Study*](https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/)
- [Shopify Engineering, *"Building the Universal Commerce Protocol"*](https://shopify.engineering/ucp)
- [Stripe, *"Developing an Open Standard for Agentic Commerce"*](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- [Microsoft, *"Build 2025: The Age of AI Agents and Building the Open Agentic Web"*](https://blogs.microsoft.com/blog/2025/05/19/microsoft-build-2025-the-age-of-ai-agents-and-building-the-open-agentic-web/)
- [Linux Foundation, *Agentic AI Foundation 설립*](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [W3C, *AI Agent Protocol Community Group*](https://www.w3.org/community/agentprotocol/)
- [GMO-PG, *fincode byGMO MCP 지원*](https://www.gmo-pg.com/en/news/press/gmo-paymentgateway/2025/0619.html)
