---
title: '"내 AI 회의론자 친구들은 다 미쳤다" — 2,826개의 댓글이 보여주는 개발자 사회의 균열'
description: '2025년 6월, 보안 업계의 전설이 Hacker News에 수류탄을 던졌다. "AI에 회의적인 내 친구들은 다 미쳤다." 2,356포인트, 2,826개의 댓글. 개발자 사회는 둘로 쪼개졌다. 그리고 그 균열은 아직도 벌어지고 있다.'
pubDate: 2026-03-09T00:00:00.000Z
lang: ko
pairSlug: 'ai-skeptic-friends-nuts-debate'
draft: true
sourceDir: draft
---
# "내 AI 회의론자 친구들은 다 미쳤다" — 2,826개의 댓글이 보여주는 개발자 사회의 균열

> 2025년 6월, 보안 업계의 전설이 Hacker News에 수류탄을 던졌다. "AI에 회의적인 내 친구들은 다 미쳤다." 2,356포인트, 2,826개의 댓글. 개발자 사회는 둘로 쪼개졌다. 그리고 그 균열은 아직도 벌어지고 있다.

---

## 1. Hacker News를 뒤흔든 한 편의 글

2025년 6월 2일, Fly.io의 블로그에 한 편의 글이 올라왔다. 제목은 **"My AI Skeptic Friends Are All Nuts"** — "내 AI 회의론자 친구들은 다 미쳤다."

이 글이 다른 "AI 찬양론"과 근본적으로 달랐던 이유는 저자 때문이다.

**Thomas Ptacek(@tqbf)**. 미국 최대 소프트웨어 보안 회사 중 하나인 Matasano Security의 공동 창업자. 이후 Latacora를 설립했고, 현재는 Fly.io에서 일한다. 1990년대 중반부터 C, C++, Ruby, Python, Go, Rust로 소프트웨어를 만들어 온 30년 경력의 베테랑이다. Black Hat 컨퍼런스 연사이자, Hacker News에서 가장 존경받는 커뮤니티 멤버 중 한 명이다.

핵심은 이것이다. **그는 "AI bro"가 아니다.** AI 스타트업을 운영하지도, AI 제품을 팔지도 않는다. 보안 전문가라는 직업 특성상 본능적으로 회의적인 사람이다. 그런 사람이 "AI 회의론자들이 미쳤다"고 선언한 것이다.

글은 올라간 지 2시간 만에 695개의 댓글이 달렸고, 최종적으로 **2,356포인트와 2,826개의 댓글**을 기록했다. Hacker News 역사상 가장 뜨거운 기술 논쟁 중 하나가 되었다.

---

## 2. 기사는 무엇을 말하는가

Ptacek의 글은 도발적이지만 체계적이다. 10개 이상의 논점을 전개하며, 비속어를 섞어가며 AI 회의론자들의 주장을 하나씩 해체한다. 핵심 주장을 정리하면 이렇다.

### "LLM은 내 커리어에서 두 번째로 중요한 기술이다"

> *"All progress on LLMs could halt today, and LLMs would remain the 2nd most important thing to happen over the course of my career."*

"LLM의 모든 발전이 오늘 멈춘다 해도, LLM은 내 커리어에서 두 번째로 중요한 사건으로 남을 것이다." 30년 커리어를 가진 사람의 이 선언은 무겁다. 첫 번째가 무엇인지는 밝히지 않았지만, 인터넷의 등장일 것이라는 추측이 지배적이다.

### "당신이 비판하는 것은 2023년의 AI다"

> *"If you're making requests on a ChatGPT page...you're not doing what the AI boosters are doing."*

Ptacek의 가장 날카로운 지적이다. 많은 회의론자들이 비판하는 것은 ChatGPT 웹페이지에 질문을 복붙하는 방식 — 2023년의 사용법이다. 2025년의 AI 코딩은 **에이전트(agent)**가 코드베이스를 자율적으로 탐색하고, 도구를 실행하고, 컴파일하고, 테스트하고, 오류를 수정하는 방식이다. 완전히 다른 경험이라는 것이다.

### "환각은 해결된 문제다"

> *"If hallucination matters to you, your programming language has let you down."*

"환각이 문제라면, 그건 당신의 프로그래밍 언어가 실패한 것이다." LLM 에이전트는 린터, 컴파일러, 테스트를 스스로 실행한다. 잘못된 코드를 생성하면 에러 피드백을 받고 자체 수정한다. 타입 시스템이 강한 Go 같은 언어에서 특히 잘 작동한다. (반면 Rust는 아직 어렵다고 인정한다.)

### "$20/월짜리 인턴"

> *"Does an intern cost $20/month? Because that's what Cursor.ai costs."*

Cursor가 월 $20이다. 인턴 하나 고용하는 비용과 비교해보라는 것이다. 대화가 잘 안 되면 새 세션을 열면 그만이다. 피드백을 주면 불쾌해하지 않고, 피곤해하지 않고, 반복 작업에 불평하지 않는다.

### "우리는 장인이 아니라 문제 해결사다"

> *"Professional software developers are in the business of solving practical problems for people with code. We are not...artisans."*

Ptacek은 자신의 지하실에 목공 작업장이 있다고 말한다. 하지만 사무실 책상은 직접 만들지 않고 산다. 목공이라는 취미와 가구를 구매하는 실용성은 충돌하지 않는다. 코딩도 마찬가지라는 것이다. 코딩의 미학적 가치를 인정하면서도, 프로페셔널한 영역에서는 도구를 쓰는 것이 합리적이다.

### "우리는 남의 직업을 자동화하는 분야에 있다"

> *"We're a field premised on automating other people's jobs away."*

가장 불편한 한 방이다. 소프트웨어 개발자는 본질적으로 다른 사람의 업무를 자동화하는 직업이다. 회계사, 은행원, 교환원, 물류 담당자 — 우리가 만든 소프트웨어가 수많은 직업을 대체해왔다. 그런 우리가 "AI가 개발자를 대체할 수 있다"는 가능성에 분노하는 것은 위선이라는 지적이다.

---

## 3. 댓글 전쟁 — 2,826개의 목소리

Hacker News의 댓글창은 그 자체로 하나의 전쟁터가 되었다. 찬반이 팽팽하게 갈렸고, 양쪽 모두 설득력 있는 논점을 내놓았다.

### 찬성 진영 — "써봤더니 진짜 된다"

가장 많은 공감을 받은 댓글은 **matthewsinclair**의 것이었다. 그는 처음에 AI에 회의적이었지만, Claude Code를 쓰기 시작하면서 생각이 바뀌었다고 고백했다. 그의 비유가 인상적이다.

> LLM 코딩은 **"mech suit(메카닉 슈트)"**과 같다. 강력하지만 확실한 조종이 필요하다.

자율 주행이 아니라 파워 슈트라는 것이다. 에이전트에게 완전한 자율성을 주면 실패하지만, 명확한 가이던스와 테스트, 문서를 함께 제공하면 생산성이 폭발한다.

**kentonv**는 Claude Code의 학습 곡선이 **"사실상 제로"**라고 주장하며, 비판자들이 실제로 써보지 않고 이론만으로 판단하고 있다고 비판했다.

역사적 선례를 드는 댓글도 많았다. 계산기가 등장했을 때 수학 교육이 끝난다고 했고, 검색 엔진이 등장했을 때 기억력이 파괴된다고 했다. 고수준 프로그래밍 언어가 등장했을 때도 "진짜 프로그래밍은 어셈블리"라는 저항이 있었다. 매번 틀렸다.

### 반대 진영 — "hype cycle을 잊었나"

**wpietri**는 가장 체계적인 반론을 제시했다. Gartner의 hype cycle에서 **"생산성의 고원(plateau of productivity)"**에 도달할 때까지 기다리는 것이 합리적이라는 것이다. 암호화폐 때도 "안 쓰면 뒤처진다"는 사회적 압박이 있었고, 결과는 우리 모두 알고 있다.

**raxxorraxor**는 실사용 경험을 공유했다. LLM이 생성하는 코드가 초기에는 **"충격적으로 나쁘다(shockingly bad)"**고 말했다. 보일러플레이트, 문서화, 새 언어 학습에는 유용하지만, 핵심 문제 해결에는 부족하다는 것이다.

**chinchilla2020**의 관찰도 날카로웠다. LLM은 구글 검색을 대체하는 데는 탁월하지만, 생성하는 코드는 **"설득력 있지만 틀린(convincing but wrong)"** 경우가 많다. 엔지니어링 분야에서 "설득력 있게 틀린" 코드는 바로 틀린 코드보다 더 위험하다.

### 가장 불편한 순간 — 저자의 자기 고백

논쟁의 가장 불편한 순간은, Ptacek 본인이 후속 HN 토론에서 한 고백이었다.

> **"I forgot how to write table tests because I generate all that. And it's frightening."**

"테이블 테스트 작성법을 잊어버렸다. AI가 다 생성해주니까. 그리고 이건 무섭다." AI의 가장 열렬한 옹호자가, AI가 자신의 기술을 퇴화시키고 있다는 사실을 인정한 것이다. 이 한 문장은 어떤 반론보다 강력했다.

### 시스템적 우려

**soraminazuki**는 개인의 선택을 넘어서는 시스템적 문제를 제기했다. 경영진은 AI 코드의 품질과 무관하게, **비용 절감을 위해 AI를 밀어붙일 것**이다. 개별 개발자가 "AI는 아직 부족하다"고 판단해도, 조직의 의사 결정은 다른 논리로 움직인다.

---

## 4. 반격 — "그 끔찍한 기사에 반론한다"

Ptacek의 글은 HN 댓글창을 넘어, 여러 편의 반론 기사를 낳았다.

### Ludicity — "Contra Ptacek's Terrible Article On AI"

가장 직접적인 반론은 기술 블로그 Ludicity에서 나왔다. 제목부터 공격적이다. **"Ptacek의 끔찍한 AI 기사에 반론한다."**

핵심 비판은 이렇다. Ptacek이 2025년 6월에 한 주장과 동일한 주장을 몇 달 전에 한 사람들이 있었다. 그때는 아무도 주목하지 않았다. Ptacek의 글이 폭발적인 반응을 얻은 것은 논증의 품질 때문이 아니라, **저자의 명성과 도발적인 제목** 때문이라는 것이다. "당신의 친구들이 미쳤다"는 프레이밍은 토론을 촉진하는 것이 아니라, 토론을 적대적으로 만든다고 비판했다.

### Skarlso — 주니어 개발자 파이프라인의 소멸

개발자 Skarlso의 반론은 Ptacek이 다루지 않은 가장 큰 문제를 정면으로 겨냥했다. **주니어 개발자 육성 문제**다.

LLM은 **"절대적 확신을 가지고 추론한다(reasons with absolute conviction)."** 시니어 개발자는 이 확신이 환각인지 아닌지 구분할 수 있다. 하지만 초보자는 구분할 수 없다. 그리고 초보자가 AI에 의존하여 학습 과정을 건너뛰면, 언젠가 시니어 개발자가 될 수 없게 된다. **주니어를 키우지 않으면, 결국 시니어도 소멸한다.**

이것은 Ptacek의 글에서 가장 큰 맹점이었고, 댓글에서도 가장 많이 반복된 우려였다.

### Niko Heikkila — "My AI Agents Are All Nuts"

핀란드 개발자 Niko Heikkila는 패러디로 응수했다. 제목은 **"My AI Agents Are All Nuts"** — "내 AI 에이전트들이 다 미쳤다." Ptacek의 에이전트 예찬에 대한 우아한 뒤집기였다.

### 선행 논쟁 — Casey Newton vs Ed Zitron

사실 이 논쟁에는 선행 기사가 있었다. 2024년 12월, Platformer의 **Casey Newton**은 "The Phony Comforts of AI Skepticism(AI 회의론의 가짜 위안)"이라는 글에서, AI 회의론자들이 **증거에 면역**이 되었다고 비판했다. 이에 대해 **Ed Zitron**은 "The Phony Comforts of AI Optimism(AI 낙관론의 가짜 위안)"으로 정확히 같은 프레임을 뒤집어 반론했다. Ptacek의 글은 이 기존 논쟁에 기름을 부은 격이었다.

---

## 5. 숫자가 말하는 현실 — 찬반 모두에게 불편한 진실

이 논쟁을 숫자로 보면, 양쪽 모두 불편해진다.

### 낙관론자에게 불편한 숫자

| 지표 | 수치 | 출처 |
|------|------|------|
| AI 프로젝트 실패율 | 70-85% | MIT / RAND |
| AI에서 "zero value" 보고한 기업 | 95% | MIT Media Lab / NANDA |
| 2027년까지 폐기될 에이전틱 AI 프로젝트 | 40%+ | Gartner 예측 |
| AI 도입 3년 후 고용 영향 | 90%+ 기업 "변화 없음" | NBER (2026.2) |

2025년에 AI에 투입된 투자금은 **$202.3B(약 280조 원)**이다. 그런데 95%의 기업이 "가치 없음"을 보고했다. 이 숫자가 사실이라면, 이것은 역사상 가장 큰 규모의 기업 투자 실패 중 하나다.

### 회의론자에게 불편한 숫자

| 지표 | 수치 | 출처 |
|------|------|------|
| AI를 채택한 기업 비율 | 78% | 2025년 기준 |
| AI 도구를 정기적으로 사용하는 개발자 | 85% | 2025년 말 |
| AI 생산성 향상 ROI | $3.70/달러 투자 | 성공 보고 기업 기준 |
| 2025년 AI 투자 증가율 | 75% YoY | 전년 대비 |

78%의 기업이 채택하고, 85%의 개발자가 사용하고, 투자가 75% 증가하는 기술을 "버블"이라고 일축하기는 어렵다. 설령 대부분의 프로젝트가 실패한다 해도, 성공한 소수의 프로젝트가 만드는 가치가 전체 투자를 정당화할 수 있다.

Gary Marcus는 2025년을 **"peak bubble(버블의 정점)"**이라 선언했고, Marc Andreessen은 AI를 **"역사상 가장 강력한 기술"**이라 불렀다. MIT Technology Review는 2025년을 **"the great AI hype correction(거대한 AI 과대평가 교정의 해)"**라고 명명했다.

진실은 아마 이 사이 어딘가에 있다.

---

## 6. 생각해볼 점 — 그래서 우리는 어떻게 할 것인가

이 논쟁에서 가장 인상적이었던 것은, Simon Willison(Django 공동 창시자)이 밝힌 Ptacek의 진짜 의도였다.

> Ptacek의 목표는 회의론자를 설득하는 것이 아니었다. **"정적이고 비생산적인 균형 상태 — 이 기술이 어떻게 작동하는지에 대한 무지한 논쟁의 평형"을 깨뜨리는 것**이었다.

이것이 이 기사의 진짜 가치다. "AI가 좋다/나쁘다"의 이분법이 아니라, **정보에 기반한 논쟁**을 요구한 것이다.

### 써보지 않고 비판하는 것에 대하여

Ptacek의 가장 유효한 비판은 "에이전트를 써보지 않은 사람이 에이전트를 비판한다"는 것이다. 2023년의 ChatGPT 경험으로 2025년의 Claude Code를 판단하는 것은, 2007년의 피처폰 경험으로 2010년의 스마트폰을 판단하는 것과 같다. 기술은 그 사이에 질적 도약을 했다.

### 아무도 답하지 못하는 질문

하지만 AI 낙관론자들에게도 답하지 못하는 질문이 있다. **주니어 개발자 파이프라인 문제**다.

AI가 보일러플레이트 코딩을 대체하면, 주니어 개발자는 무엇으로 배우는가? 한 HN 댓글이 덴마크 학교의 사례를 들었다 — 교사가 LLM 사용을 요구하면서 LLM으로 채점하는 상황. 학습이라는 과정 자체가 우회되는 것이다. 의사가 수술을 AI에 맡기더라도, 수술을 배우는 과정은 여전히 필요하다. 코딩도 마찬가지 아닌가?

### 결론: 회의론이 문제가 아니라, 무지한 회의론이 문제다

이 글을 읽고 나서 내가 내린 결론은 이렇다.

AI에 대한 회의론 자체는 건강하다. 기술에 대한 비판적 시각은 버블을 방지하고, 위험을 사전에 식별하고, 윤리적 사용을 촉진한다. 문제는 **정보에 기반하지 않은 회의론**이다. "stochastic parrot"이라는 2021년의 프레임으로 2025년의 에이전트를 판단하는 것. ChatGPT 복붙 경험으로 Claude Code의 자율 코딩을 평가하는 것. 써보지 않고 안다고 말하는 것.

동시에, 낙관론도 마찬가지다. "AI가 모든 것을 바꿀 것"이라는 선언은 70-85%의 프로젝트 실패율 앞에서 겸허해져야 한다. Ptacek 본인조차 테이블 테스트 작성법을 잊었다고 고백하지 않았나.

2,826개의 댓글이 보여주는 것은, 개발자 사회가 이 질문에 대해 아직 답을 찾지 못했다는 사실이다. 그리고 그것은 괜찮다. 답을 찾는 과정에서 중요한 것은, 적어도 **정직하게 써보고, 정직하게 평가하는 것**이다. Ptacek이 도발적인 제목 아래 진짜로 요구한 것은 바로 그것이었다.

---

## 참고 자료

- Thomas Ptacek, ["My AI Skeptic Friends Are All Nuts"](https://fly.io/blog/youre-all-nuts/) (Fly.io, 2025.6.2)
- [Hacker News 토론 (2,356pt / 2,826댓글)](https://news.ycombinator.com/item?id=44163063)
- [Hacker News 후속 토론](https://news.ycombinator.com/item?id=44214889)
- Ludicity, ["Contra Ptacek's Terrible Article On AI"](https://ludic.mataroa.blog/blog/contra-ptaceks-terrible-article-on-ai/)
- Skarlso, ["Re: My AI Skeptic Friends Are All Nuts"](https://skarlso.github.io/2025/06/07/re-my-ai-skeptic-friends-are-all-nuts/)
- Niko Heikkila, ["My AI Agents Are All Nuts"](https://nikoheikkila.fi/blog/my-ai-agents-are-all-nuts/)
- Simon Willison, [Commentary](https://simonwillison.net/2025/Jun/2/my-ai-skeptic-friends-are-all-nuts/)
- Casey Newton, ["The Phony Comforts of AI Skepticism"](https://www.platformer.news/ai-skeptics-gary-marcus-curve-conference/) (Platformer, 2024.12)
- MIT Technology Review, ["The Great AI Hype Correction of 2025"](https://www.technologyreview.com/2025/12/15/1129174/the-great-ai-hype-correction-of-2025/)
- Gary Marcus, ["Six Predictions for AI 2026"](https://garymarcus.substack.com/p/six-or-seven-predictions-for-ai-2026)
