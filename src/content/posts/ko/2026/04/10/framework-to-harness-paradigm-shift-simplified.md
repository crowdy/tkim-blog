---
title: '프레임워크에서 하네스로 — AI 코딩이 ''결정론''을 다시 발견하다'
description: '"같은 주에 트렌딩한 다섯 개의 레포가 스스로를 설명하는 단어가 달라졌다. framework가 아니라 harness, hooks, HUD. 이 단어의 이동이 가리키는 곳은 어디인가."'
pubDate: 2026-04-10T02:23:56.828Z
lang: ko
pairSlug: 'framework-to-harness-paradigm-shift-simplified'
draft: false
---
# 프레임워크에서 하네스로 — AI 코딩이 '결정론'을 다시 발견하다

> "같은 주에 트렌딩한 다섯 개의 레포가 스스로를 설명하는 단어가 달라졌다. framework가 아니라 harness, hooks, HUD. 이 단어의 이동이 가리키는 곳은 어디인가."

---

2026년 4월 10일, GitHub Trending의 일간 및 주간 차트를 훑으면 눈에 걸리는 것이 있다. AI 코딩 도구 카테고리에서 상위권을 점유한 레포들이 자신을 설명하는 단어다. [Archon](https://github.com/coleam00/Archon)은 14,411 스타에 일일 +185를 기록하며 이렇게 쓴다 — *"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* [hermes-agent](https://github.com/NousResearch/hermes-agent)는 주간 +19,765로 그 주의 최대 상승 레포인데, 부제가 *"The agent that grows with you"*다. [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)는 주간 +9,737로 2위 상승 레포이며, 설명이 *"Your codex is not alone. Add hooks, agent teams, HUDs"*다.

세 레포의 기술 스택은 다르다. Archon은 TypeScript, hermes-agent는 Python, oh-my-codex도 TypeScript다. 만든 사람도 다르다. 서로를 참조한 흔적도 없다. 그런데 이 세 레포가 사용하는 단어의 궤적이 놀라울 정도로 일치한다. Archon은 자신을 **harness builder**라고 부른다. hermes-agent의 *"grows with you"*는 에이전트가 사용자의 바깥에서 감싸며 따라오는 관계를 함의한다. oh-my-codex의 세 단어 — **hooks**, **teams**, **HUDs** — 는 각각 "기존 흐름에 끼워 넣는 것", "수평적 협업 단위", "조종석에서 현재 상태를 보여주는 계기판"을 뜻한다. 이 세 단어 중 어느 것도 framework의 어휘가 아니다. Override, pipeline, orchestrator — 이것이 2023~2025년의 AI 에이전트 프레임워크가 사용하던 단어였다. hooks, teams, HUDs는 다른 세계에서 온 단어다. 기존 시스템을 바꾸지 않고, 그 위에 덧씌우는 세계.

이 글은 이 단어의 이동을 추적한다. "framework에서 harness로"라는 어휘적 전환이 제품 마케팅의 유행이 아니라, AI 코딩 도구 생태계가 2년간의 프레임워크 시대에서 배운 구조적 교훈을 반영한다는 것이 핵심 논지다. 그리고 이 전환의 중심에는 하나의 단어가 있다 — **결정론(determinism)**.

---

## 1. Archon의 선언과 프레임워크 피로감의 배경

[Archon](https://github.com/coleam00/Archon)의 README 첫 줄이 이 에세이의 출발점이다. *"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* 첫 문장은 포지셔닝이고, 둘째 문장은 가치 제안이다.

Archon이 자신을 harness builder라고 부르는 것은 의식적 선택이다. 2024년이었다면 같은 기능을 가진 도구가 "AI coding framework"나 "agent orchestration platform"이라고 자신을 소개했을 것이다. 실제로 LangChain은 "framework for developing applications powered by large language models"라고 했고, CrewAI는 "framework for orchestrating role-playing, autonomous AI agents"라고 했다. Framework라는 단어는 2023~2025년 AI 에이전트 도구의 사실상 표준 자기소개였다.

Archon이 "the first"라고 주장하는 것은, 이 카테고리 자체가 새롭다는 인식을 전제한다. AI coding framework는 이미 수십 개가 있다. AI coding harness builder는 — Archon의 자기 인식에 따르면 — 아직 없었다. 카테고리를 새로 만들겠다는 선언이다. 14,411 스타와 일일 +185라는 수치가 이 메시지에 공동체가 반응하고 있음을 보여준다.

둘째 문장 *"Make AI coding deterministic and repeatable"*은 프레임워크의 언어가 아니다. 프레임워크의 가치 제안은 보통 "쉽게(easy)", "빠르게(fast)", "강력하게(powerful)" 같은 단어로 표현된다. 결정론적이고 반복 가능하다는 표현은 소프트웨어 테스팅과 품질 보증의 전통에서 온다. 테스트가 결정론적이어야 한다는 것은 같은 입력에 같은 출력이 나와야 한다는 뜻이다. 테스트가 반복 가능해야 한다는 것은 누가 어디서 몇 번을 돌려도 같은 결과가 나와야 한다는 뜻이다. Archon이 AI 코딩에 이 두 속성을 부여하겠다고 선언하는 것은, LLM의 확률적 성격이라는 본질적 문제를 도구 계층에서 통제하겠다는 의지의 표명이다. 프레임워크가 "더 많은 것을 할 수 있게 해준다"고 약속했다면, harness는 "같은 것을 확실하게 할 수 있게 해준다"고 약속한다. 확장(expansion) 대 수렴(convergence). 이것이 단어 차이 뒤에 있는 설계 철학의 차이다.

이 선택의 배경에는 2년간의 프레임워크 피로감이 있다. 2023년 [LangChain](https://github.com/langchain-ai/langchain)이 등장했을 때 개발자 커뮤니티의 반응은 열광적이었다. 이어서 [AutoGen](https://github.com/microsoft/autogen), [CrewAI](https://github.com/crewAIInc/crewAI), [LangGraph](https://github.com/langchain-ai/langgraph) 등이 뒤따랐다. 공통 패턴은 사용자의 작업을 프레임워크가 정의한 구조 안에 넣는 것 — "inversion of control"이었다.

문제는 표준을 벗어나는 순간 시작됐다. 에이전트가 복잡해지고, 도구 호출이 중첩되고, 프로덕션 환경의 요구사항(로깅, 모니터링, 비용 제어, 타임아웃)이 붙기 시작하면, 프레임워크의 추상화가 장벽이 됐다. LangChain의 Chain 안에서 비동기 에러를 잡으려면 LangChain의 내부 구현을 이해해야 했다. 추상화가 도와주는 것이 아니라 가로막는 것이 되었다. "LangChain is not needed", "Why I stopped using LangChain", "The case against AI frameworks" 같은 글이 2024년 내내 올라왔다. 비판의 핵심은 일관됐다 — **프레임워크가 해결해주는 문제보다 프레임워크 자체가 만드는 문제가 더 크다**. 추상화의 레이어가 너무 많아서 디버깅이 어렵고, 프레임워크가 숨기는 것(LLM API 호출의 세부사항, 프롬프트의 실제 내용, 토큰 사용량)을 보고 싶은데 볼 수가 없다.

이 피로감의 절정은 2025년 중반 Anthropic이 Claude Agent SDK를 발표하면서 나타났다. SDK의 에이전트 정의는 의도적으로 최소적이었다 — **model + tools + context management**. 오케스트레이션도, 워크플로도, 상태 머신도 없었다. "우리가 제공하는 것은 최소한의 빌딩 블록이다. 그것을 어떻게 조립할지는 당신이 결정한다." 프레임워크가 이미 풍부한 구조를 제공하면 외부 계층이 들어갈 자리가 없다. 반면 SDK가 최소한만 제공하면, 그 위에 결정론적 실행, 반복 가능한 워크플로, 품질 게이트 같은 것을 올릴 공간이 열린다. 비유하면, Claude Agent SDK는 말(모델)과 기본적인 고삐(도구 접근)를 제공하고, 마구(harness)는 커뮤니티가 만들도록 위임한 것이다. Archon은 정확히 이 공간에서 태어났다.

---

## 2. Harness vs Framework — 소프트웨어 공학사의 맥락과 말 마구의 비유

Archon이 선택한 "harness"라는 단어는 AI 코딩에서 새로운 것이지만, 소프트웨어 공학에서는 수십 년의 역사를 가진 용어다.

소프트웨어 테스팅에서 "test harness"는 테스트를 실행하기 위한 인프라를 뜻한다. JUnit의 runner, pytest의 fixture system, Selenium의 WebDriver. Test harness가 하는 일은 세 가지다 — 환경 준비(setup), 실행과 결과 수집(execution + collection), 정리(teardown). Harness는 테스트의 로직에 개입하지 않는다. 테스트가 올바른 조건에서 실행되도록 보장할 뿐이다. Framework는 테스트의 구조를 결정한다. Harness는 테스트의 실행만 관리한다. Framework가 "안으로 들어와라"라면, harness는 "밖에서 감싸겠다"다.

Test harness의 가장 중요한 속성은 **비침투적(non-invasive)**이라는 것이다. Harness를 교체해도 테스트 코드는 바뀌지 않는다. 이것을 AI 코딩 도구에 대입하면 의미가 선명해진다. LangChain의 Chain 안에서 작성한 에이전트 로직은 LangChain 밖에서 그대로 쓸 수 없다. CrewAI의 Crew-Task 구조로 설계한 워크플로는 CrewAI 없이는 작동하지 않는다. Archon이 harness를 표방하는 것은 이 결합을 피하겠다는 선언이다.

이 블로그의 이전 에세이 ["모델이 전부가 아니었다"](coding-agent-harness-anatomy.md)에서 Sebastian Raschka의 Agent Harness 개념을 다룬 바 있다. Raschka의 글이 학술적 분석이었다면, Archon은 그 분석을 제품으로 만든 것이다. 학술적 개념이 제품 카테고리로 전환된 순간이고, 그 전환이 GitHub Trending 상위에 올랐다는 것은 커뮤니티가 이 전환을 인정했다는 뜻이다.

**역사적 유비: EJB에서 Spring으로**

이 전환의 가장 교훈적인 선례는 1990년대 후반의 **EJB에서 Spring으로의 전환**이다. Enterprise JavaBeans(EJB)의 약속은 야심적이었다 — 분산 트랜잭션, 원격 호출, 보안, 동시성 관리를 프레임워크가 해결해준다. 그 대가는 침투적 결합이었다. 간단한 계산 로직 하나를 EJB로 만들려면 최소 네 개의 파일, 비즈니스 로직 10줄에 보일러플레이트 100줄이 필요했다. EJB는 애플리케이션 서버 안에서만 실행됐기 때문에 단위 테스트가 사실상 불가능했다. 2024년 LangChain의 상황과 정확히 오버랩된다.

2002년 Rod Johnson이 Spring을 제시하며 내세운 핵심 철학은 **POJO(Plain Old Java Object)를 존중하라**였다. Spring은 개발자의 코드를 바꾸지 않았다. Dependency Injection으로 객체 간의 의존관계를 외부에서 주입하되, 객체 자체는 자기가 Spring 안에서 돌아가는지조차 몰라도 됐다. 비침투적 감싸기. Harness의 정의 그 자체다. EJB는 졌고, harness(의 정신)가 이겼다.

**말 마구(horse harness)의 원래 뜻**

harness라는 영어 단어의 가장 오래된 뜻은 "말 마구(馬具)"다. 말의 몸에 씌워서 말의 힘을 마차나 쟁기에 전달하는 장치다. 이 비유가 놀라울 정도로 정확하다. 말 마구는 말의 능력을 바꾸지 않는다 — LLM의 추론 능력을 바꾸지 않지만 방향을 제어하는 agent harness와 같다. 말 없이는 쓸모없는 가죽과 쇠붙이다 — 모델 없이는 작동하지 않는 harness와 같다. 교체 가능하다 — 같은 모델에 다른 harness 설정을 적용하면 다른 종류의 작업을 한다. 그리고 가장 중요하게, **결정론을 부여한다** — 마구 없는 말은 어디로 뛸지 모르지만, 마구가 있으면 힘이 예측 가능한 방향으로 전달된다.

GPT-5, Claude Opus 4.6, Gemini 3.1 같은 프론티어 모델이 이미 강력한 추론 능력을 갖춘 시대에, 필요한 것은 더 강한 말이 아니라 더 좋은 마구다.

---

## 3. hermes-agent와 oh-my-codex — 같은 패러다임, 다른 어휘

Archon이 harness라는 단어를 명시적으로 사용한 유일한 레포라면, hermes-agent와 oh-my-codex는 같은 패러다임을 다른 어휘로 표현한다.

[hermes-agent](https://github.com/NousResearch/hermes-agent)의 부제 *"The agent that grows with you"*에서 핵심은 **"with you"**다. 프레임워크의 관계는 "안으로 들어오라"다 — 사용자가 프레임워크의 구조에 맞춘다. "grows with you"는 반대 방향이다. 사용자가 있는 자리에 에이전트가 온다. 사용자의 워크플로가 바뀌면 에이전트도 거기에 맞춘다. 에이전트가 사용자를 바깥에서 감싸는 관계 — 프레임워크가 아니라 harness의 관계다. 44,309 스타, 주간 +19,765라는 수치는 이 메시지가 커뮤니티에 반향을 일으키고 있음을 보여준다.

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)의 세 단어는 더 구체적이다. **Hooks** — 기존 시스템의 실행 흐름에 사용자 정의 코드를 끼워 넣는 진입점이다. Git hooks, React hooks와 같은 패턴. Override는 기존 행동을 대체하지만, hook은 기존 행동을 유지하면서 추가 행동을 끼워 넣는다. 비파괴적(non-destructive) 확장. **Teams** — 프레임워크 시대의 "orchestration"이 중앙 지휘자가 각 agent를 통제하는 위계적 모델이었다면, team은 각 구성원이 자율성을 가지고 협업하는 수평적 모델이다. **HUDs** — 전투기 조종사의 Heads-Up Display처럼, 현실을 가리지 않고 정보를 실시간으로 겹쳐 보여준다. 프레임워크의 dashboard가 내부 상태를 프레임워크의 용어로 보여준다면, HUD는 사용자의 시야 위에 정보를 올린다.

세 단어를 종합하면 oh-my-codex의 설계 철학이 드러난다. 기존 도구(Codex CLI)를 바꾸지 않는다. 바깥에서 진입점(hooks)을 만들고, 수평적 협업 구조(teams)를 올리고, 실시간 상태 표시(HUDs)를 덧씌운다. 이것은 harness다. 19,938 스타, 주간 +9,737의 상승이 이 접근에 대한 커뮤니티의 반응이다.

같은 주간 트렌딩에서 [obra/superpowers](https://github.com/obra/superpowers)(143,000 스타)는 "skills framework & software development methodology"로, [onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx)(26,000 스타, 주간 +5,556)는 "works with every LLM"으로 자신을 소개한다. 둘 다 기존 도구/모델을 바꾸지 않고 바깥에서 감싸는 방향을 공유한다.

---

## 4. 결정론이 왜 지금 화두가 되었나 — Agentic 실패의 교훈

Archon의 *"Make AI coding deterministic and repeatable"*이 2024년이 아니라 2026년에 나온 이유가 있다. 2024년의 관심사는 "AI가 어디까지 할 수 있는가"였다. 2026년에 결정론이 화두가 된 것은, 그 사이 2년간의 agentic 실패 경험이 축적되었기 때문이다.

**비결정론적 워크플로의 디버깅 불가능성.** 프로덕션에 배치한 팀들이 먼저 부딪힌 문제는, 같은 입력에 다른 결과가 나온다는 것이었다. 모델의 temperature, 프롬프트의 미세한 변화, 컨텍스트 윈도의 내용물, 도구 호출의 순서 — 이 모든 것이 확률적으로 변하기 때문에, 한 번 성공한 워크플로가 다음 번에 실패할 수 있다. 그리고 왜 실패했는지를 알 수 없다. 프레임워크가 중간의 상태를 추상화해버렸기 때문이다. 전통적 소프트웨어에서 디버깅이 가능한 이유는 결정론 때문이다. 같은 입력에 같은 출력이 나온다는 것이 보장되면, 입력을 바꿔가며 문제를 좁힐 수 있다. AI 에이전트에서 이 보장이 없으면, 디버깅은 "다시 돌려봤더니 이번에는 됐다" 수준으로 떨어진다.

**프레임워크가 숨긴 제어 흐름.** 에이전트의 제어 흐름을 이해할 수 없다는 것이 두 번째 문제였다. 어떤 순서로 도구를 호출하는지, 에러가 발생했을 때 어떻게 복구하는지 — 프레임워크의 추상화 뒤에 숨어 있었다. 이전 에세이에서 다뤘던 attribution 버그 — Claude Code가 자기 자신의 발언을 사용자의 발언으로 잘못 귀속시킨 사례 — 가 이 문제의 극단적 형태다.

**"작동하지만 왜 작동하는지 모른다."** ["모델이 전부가 아니었다"](coding-agent-harness-anatomy.md)에서 다룬 Maganti의 syntaqlite 경험이 전형이다. 500개 이상의 테스트가 통과했지만, 왜 작동하는지를 이해하지 못했다. 거짓된 안심감(false reassurance)이다.

세 가지 실패의 공통분모는 **제어의 상실**이다. Harness의 약속은 이 제어를 돌려주겠다는 것이다. 에이전트의 내부 — 모델의 추론 — 는 여전히 확률적이지만, 에이전트의 외부 — harness가 관리하는 실행 조건, 입력 구성, 출력 검증, 도구 호출 순서 — 는 결정론적으로 만들 수 있다. 내부는 통제할 수 없지만, 외부를 통제하면 내부의 불확실성이 전체 시스템의 불확실성으로 전파되는 것을 막을 수 있다.

Ruby 생태계의 Rails vs Sinatra, Python의 Django vs Flask에서도 같은 진자가 작동했다. 프레임워크가 먼저 시장을 장악하고, 복잡도가 임계점을 넘으면 가벼운 대안이 부상한다. AI 에이전트 생태계는 지금 정확히 이 진자가 harness 쪽으로 움직이는 구간에 있다. 다만 역사의 교훈은, Sinatra가 Rails를 대체하지 못했듯 harness가 프레임워크를 완전히 대체하지는 않을 것이라는 점이다. 표준적인 RAG 파이프라인이나 단순한 챗봇에서는 LangChain이나 그 후속이 여전히 효율적일 것이다. Harness가 빛나는 영역은 프로덕션, 커스터마이징, 결정론이 필요한 곳이다.

여기까지의 분석에서 실무자에게 도출되는 함의는 명확하다. 첫째, AI 에이전트 도구를 평가할 때 그 도구가 자신을 framework라고 하는지 harness라고 하는지 주의 깊게 보라. 단어는 설계 철학을 반영한다. 둘째, 당신의 코드와 도구 사이의 결합도(coupling)를 측정하라 — 그 도구를 떼어냈을 때 당신의 코드가 얼마나 살아남는가. 셋째, AI 에이전트가 프로덕션에 들어갈 때 harness 수준에서의 결정론 — 같은 프롬프트 구성, 같은 도구 호출 순서, 같은 검증 로직 — 을 요구하라. 이것이 있으면 디버깅이 가능하고, 없으면 불가능하다.

---

## 5. 열린 질문들 — 단어의 이동은 어디까지 갈 것인가

2026년 4월 10일의 GitHub Trending이 보여준 것은, AI 코딩 도구의 어휘가 이동하고 있다는 사실이다. Framework에서 harness로. Override에서 hooks로. Dashboard에서 HUD로. "안으로 들어와라"에서 "밖에서 감싸겠다"로.

이 이동이 일시적 유행인지, 구조적 전환인지는 시간이 답할 것이다. 다만 이 글이 추적한 증거들 — Archon의 명시적 "harness builder" 선언, hermes-agent의 "grows with you", oh-my-codex의 hooks/teams/HUDs, 2년간의 프레임워크 피로감, EJB에서 Spring으로의 역사적 선례, Claude Agent SDK의 최소주의가 열어준 공간 — 은 일시적 유행보다는 구조적 전환에 무게를 실어준다.

열린 질문은 여러 개다. Harness의 표준화는 어떻게 진행될 것인가 — Archon이 "first"를 주장하는 것은 이 표준을 선점하려는 시도로 읽을 수 있다. 프레임워크는 harness를 흡수할 것인가 — Spring이 처음에는 EJB의 대안이었지만 결국 거대한 프레임워크가 된 것처럼. 모델 자체가 harness를 내장할 것인가 — 모델이 자체적으로 tool validation과 context bloat 관리를 한다면 외부 harness의 역할은 축소된다. 결정론의 비용은 무엇인가 — 결정론을 강제하면 LLM의 확률적 탐색이 제한될 수 있다.

이 질문들에 대한 답은 아직 없다. 중요한 것은 질문의 방향이다. 2023~2025년의 질문이 "AI 에이전트로 무엇을 할 수 있는가"였다면, 2026년의 질문은 "AI 에이전트를 어떻게 제어할 수 있는가"다. 가능성에서 통제로. 확장에서 수렴으로. Framework에서 harness로.

Archon이 자신을 "the first open-source harness builder for AI coding"이라고 소개하면서, *"Make AI coding deterministic and repeatable"*이라고 덧붙인 그 두 문장은, 2026년 AI 코딩 도구 생태계의 전환을 압축한다. 프레임워크 시대에 우리는 AI에게 더 많은 것을 할 수 있는 자유를 주었다. Harness 시대에 우리는 AI가 한 것을 이해하고 재현할 수 있는 구조를 요구한다.

말은 마구를 씌워야 밭을 갈 수 있다. 마구가 말의 자유를 빼앗은 것인가? 아니다. 마구가 말의 힘에 목적을 부여한 것이다. 2026년의 AI 코딩이 결정론을 다시 발견한 것도 같은 이유다. 모델의 힘은 이미 충분하다. 이제 그 힘에 방향을 부여할 차례다.

---

## 출처

- [Archon — GitHub Repository](https://github.com/coleam00/Archon) — "The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable." TypeScript, 14,411 stars.
- [hermes-agent — GitHub Repository](https://github.com/NousResearch/hermes-agent) — "The agent that grows with you." Python, 44,309 stars, 주간 +19,765.
- [oh-my-codex — GitHub Repository](https://github.com/Yeachan-Heo/oh-my-codex) — "OmX - Oh My codeX: Your codex is not alone. Add hooks, agent teams, HUDs." TypeScript, 19,938 stars, 주간 +9,737.
- [obra/superpowers — GitHub Repository](https://github.com/obra/superpowers) — "Skills framework & software development methodology." 143,000 stars.
- [onyx-dot-app/onyx — GitHub Repository](https://github.com/onyx-dot-app/onyx) — AI chat platform, "works with every LLM." 26,000 stars, 주간 +5,556.
- [모델이 전부가 아니었다 — Coding Agent를 진짜로 작동시키는 것](coding-agent-harness-anatomy.md) — 이전 에세이, Agent Harness의 여섯 가지 구성 요소 해부.
- [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) — Sebastian Raschka (2026). Agent Harness 개념의 학술적 분석.
- [에이전트 런타임의 재발견](agent-runtime-rediscovery.md) — 이전 에세이, 2026년 4월 첫째 주 "같은 주에 동시 발표" 패턴 분석.
- [Claude Code $100 탈주극과 GLM-5.1의 반격](llm-lockin-cracks-48h.md) — 이전 에세이, LLM lock-in 피로감과 프레임워크 의존도 분석.
