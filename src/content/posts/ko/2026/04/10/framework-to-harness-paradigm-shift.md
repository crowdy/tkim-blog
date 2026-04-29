---
title: '프레임워크에서 하네스로 — AI 코딩이 ''결정론''을 다시 발견하다'
description: '"같은 주에 트렌딩한 다섯 개의 레포가 스스로를 설명하는 단어가 달라졌다. framework가 아니라 harness, hooks, HUD. 이 단어의 이동이 가리키는 곳은 어디인가."'
pubDate: 2026-04-10T01:26:13.639Z
lang: ko
pairSlug: 'framework-to-harness-paradigm-shift'
draft: false
---
# 프레임워크에서 하네스로 — AI 코딩이 '결정론'을 다시 발견하다

> "같은 주에 트렌딩한 다섯 개의 레포가 스스로를 설명하는 단어가 달라졌다. framework가 아니라 harness, hooks, HUD. 이 단어의 이동이 가리키는 곳은 어디인가."

---

2026년 4월 10일, GitHub Trending의 일간 및 주간 차트를 훑으면 눈에 걸리는 것이 있다. AI 코딩 도구 카테고리에서 상위권을 점유한 레포들이 자신을 설명하는 단어다. [Archon](https://github.com/coleam00/Archon)은 14,411 스타에 일일 +185를 기록하며 이렇게 쓴다 — *"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* [hermes-agent](https://github.com/NousResearch/hermes-agent)는 주간 +19,765로 그 주의 최대 상승 레포인데, 부제가 *"The agent that grows with you"*다. [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)는 주간 +9,737로 2위 상승 레포이며, 설명이 *"Your codex is not alone. Add hooks, agent teams, HUDs"*다.

세 레포의 기술 스택은 다르다. Archon은 TypeScript, hermes-agent는 Python, oh-my-codex도 TypeScript다. 만든 사람도 다르다. Archon은 개인 개발자 coleam00, hermes-agent는 NousResearch라는 오픈소스 AI 연구 조직, oh-my-codex는 한국 개발자 Yeachan-Heo다. 서로를 참조한 흔적도 없다. 그런데 이 세 레포가 사용하는 단어의 궤적이 놀라울 정도로 일치한다.

Archon은 자신을 **harness builder**라고 부른다. Framework builder가 아니다. hermes-agent의 *"grows with you"*는 사용자가 에이전트 안으로 들어가는 것이 아니라, 에이전트가 사용자의 바깥에서 감싸며 따라오는 관계를 함의한다. oh-my-codex의 세 단어 — **hooks**, **teams**, **HUDs** — 는 각각 소프트웨어 공학에서 "기존 흐름에 끼워 넣는 것(hook)", "수평적 협업 단위(team)", "조종석에서 현재 상태를 보여주는 계기판(HUD: Heads-Up Display)"을 뜻한다. 이 세 단어 중 어느 것도 framework의 어휘가 아니다. Override, pipeline, orchestrator — 이것이 2023~2025년의 AI 에이전트 프레임워크가 사용하던 단어였다. hooks, teams, HUDs는 다른 세계에서 온 단어다. 기존 시스템을 바꾸지 않고, 그 위에 덧씌우는 세계.

이 글은 이 단어의 이동을 추적한다. "framework에서 harness로"라는 어휘적 전환이 제품 마케팅의 유행이 아니라, AI 코딩 도구 생태계가 2년간의 프레임워크 시대에서 배운 구조적 교훈을 반영한다는 것이 핵심 논지다. 그리고 이 전환의 중심에는 하나의 단어가 있다 — **결정론(determinism)**.

---

## 1. Archon의 선언 — "The First Open-Source Harness Builder"

[Archon](https://github.com/coleam00/Archon)의 README 첫 줄이 이 에세이의 출발점이다. *"The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable."* 두 문장이다. 첫 문장은 포지셔닝이고, 둘째 문장은 가치 제안이다. 둘 다 뜯어볼 가치가 있다.

**"Harness builder"라는 자기 정의**

Archon이 자신을 harness builder라고 부르는 것은, 의식적 선택이다. 2024년이었다면 같은 기능을 가진 도구가 "AI coding framework"나 "agent orchestration platform"이라고 자신을 소개했을 것이다. 실제로 그 시기의 도구들은 그렇게 했다. LangChain은 "framework for developing applications powered by large language models"라고 했고, CrewAI는 "framework for orchestrating role-playing, autonomous AI agents"라고 했다. Framework라는 단어는 2023~2025년 AI 에이전트 도구의 사실상 표준 자기소개였다.

Archon은 그 단어를 의도적으로 피한다. Harness다. 이 선택이 단순한 마케팅 차별화인지, 아니면 실질적 설계 철학의 차이를 반영하는지가 관건이다.

답을 찾기 위해 Archon의 두 번째 문장을 보자. *"Make AI coding deterministic and repeatable."* 결정론적이고 반복 가능하게 만든다. 이 두 형용사는 프레임워크의 언어가 아니다. 프레임워크의 가치 제안은 보통 "쉽게(easy)", "빠르게(fast)", "강력하게(powerful)" 같은 단어로 표현된다. 결정론적이고 반복 가능하다는 표현은 다른 전통에서 온다 — 소프트웨어 테스팅과 품질 보증의 전통이다. 테스트가 결정론적이어야 한다는 것은, 같은 입력에 같은 출력이 나와야 한다는 뜻이다. 테스트가 반복 가능해야 한다는 것은, 누가 어디서 몇 번을 돌려도 같은 결과가 나와야 한다는 뜻이다.

Archon이 AI 코딩에 이 두 속성을 부여하겠다고 선언하는 것은, AI 코딩의 본질적 문제 — LLM의 확률적 성격 때문에 같은 프롬프트에 다른 결과가 나오는 것 — 를 도구 계층에서 통제하겠다는 의지의 표명이다. 프레임워크가 "더 많은 것을 할 수 있게 해준다"고 약속했다면, harness는 "같은 것을 확실하게 할 수 있게 해준다"고 약속한다. 확장(expansion) 대 수렴(convergence). 이것이 단어 차이 뒤에 있는 설계 철학의 차이다.

**"First"라는 수식어의 의미**

Archon이 "the first"라고 주장하는 것은, 이 카테고리 자체가 새롭다는 인식을 전제한다. AI coding framework는 이미 수십 개가 있다. AI coding harness builder는 — Archon의 자기 인식에 따르면 — 아직 없었다. 카테고리를 새로 만들겠다는 선언이다. 이것이 과장인지 아닌지는 시장이 판단할 일이지만, 적어도 이 개발자가 harness라는 단어를 framework와 구별되는 별개의 카테고리로 인식하고 있다는 사실은 분명하다.

14,411 스타와 일일 +185라는 수치가 이 인식에 공동체가 반응하고 있음을 보여준다. 물론 GitHub 스타가 제품의 품질을 보증하지는 않는다. 하지만 스타의 속도 — 일일 증가분 — 는 특정 시점에 특정 메시지가 공동체의 관심을 끌고 있다는 사실을 보여준다. 2026년 4월 10일 시점에서, "harness builder"라는 메시지가 관심을 끌고 있다.

---

## 2. LangChain 시대의 유산 — 프레임워크 피로감의 해부

Archon이 harness라는 단어를 선택한 배경을 이해하려면, 그 단어가 대체하려는 것 — framework — 의 역사를 먼저 봐야 한다. 2023년부터 2025년까지의 약 2년은 AI 에이전트 프레임워크의 전성기이자 피로의 시기였다.

**2023: 추상화의 봄**

[LangChain](https://github.com/langchain-ai/langchain)이 2022년 말에 등장했을 때, 개발자 커뮤니티의 반응은 열광적이었다. LLM을 호출하는 코드를 직접 쓰는 것은 반복적이고 지루했다. 프롬프트 템플릿을 관리하고, API 응답을 파싱하고, 여러 호출을 체이닝하고, 외부 도구를 연결하는 것 — 이 모든 보일러플레이트를 추상화해주는 프레임워크가 나왔으니, 당연히 환영받았다. 2023년 초 LangChain은 GitHub에서 가장 빠르게 성장하는 오픈소스 프로젝트 중 하나가 되었다.

이어서 [AutoGen](https://github.com/microsoft/autogen)(Microsoft), [CrewAI](https://github.com/crewAIInc/crewAI), [LangGraph](https://github.com/langchain-ai/langgraph)(LangChain 팀의 후속작) 등이 뒤따랐다. 각각의 접근은 달랐지만 공통 패턴이 있었다 — 사용자의 작업을 프레임워크가 정의한 구조 안에 넣는 것이다. LangChain의 Chain, AutoGen의 Agent-Agent 대화, CrewAI의 Crew-Task-Agent 위계. 사용자는 프레임워크의 멘탈 모델을 먼저 배우고, 자신의 문제를 그 모델에 맞춰 재구성해야 했다.

이것은 소프트웨어 공학에서 "inversion of control"이라고 불리는 패턴의 전형이다. 사용자의 코드가 라이브러리를 호출하는 것이 아니라, 프레임워크가 사용자의 코드를 호출한다. 제어의 주체가 뒤집힌다. Ruby on Rails가 이 패턴의 대표적 성공 사례다 — "convention over configuration"이라는 철학 아래, 개발자가 Rails의 방식에 맞추면 엄청난 생산성을 얻는다. 맞추지 않으면 고통받는다.

**2024-2025: 추상화의 겨울**

AI 에이전트 프레임워크에서도 같은 역학이 작동했다. 초기에는 프레임워크의 방식에 맞추는 것이 쉬웠다. 간단한 RAG 파이프라인, 단일 에이전트의 도구 호출, 정형화된 질의응답. 이런 표준적 사용 사례에서 LangChain은 훌륭했다.

문제는 표준을 벗어나는 순간 시작됐다. 에이전트가 복잡해지고, 도구 호출이 중첩되고, 에러 처리가 세밀해져야 하고, 프로덕션 환경의 요구사항(로깅, 모니터링, 비용 제어, 타임아웃)이 붙기 시작하면, 프레임워크의 추상화가 장벽이 됐다. LangChain의 Chain 안에서 비동기 에러를 잡으려면 LangChain의 내부 구현을 이해해야 했다. CrewAI의 Task 실행 순서를 커스터마이즈하려면 CrewAI의 내부 스케줄러를 우회해야 했다. 추상화가 도와주는 것이 아니라 가로막는 것이 되었다.

이 현상에 대한 Hacker News와 개발자 블로그의 반응은 점점 날카로워졌다. "LangChain is not needed", "Why I stopped using LangChain", "The case against AI frameworks" 같은 제목의 글이 2024년 내내 올라왔다. 비판의 핵심은 일관됐다 — **프레임워크가 해결해주는 문제보다 프레임워크 자체가 만드는 문제가 더 크다**. 추상화의 레이어가 너무 많아서 디버깅이 어렵고, 프레임워크의 업데이트가 사용자 코드를 깨뜨리고, 프레임워크가 숨기는 것(LLM API 호출의 세부사항, 프롬프트의 실제 내용, 토큰 사용량)을 보고 싶은데 볼 수가 없다.

이 피로감의 절정은 2025년 중반 Anthropic이 Claude Agent SDK를 발표하면서 나타났다. SDK의 설계 철학은 프레임워크와 정반대였다. Anthropic은 에이전트를 세 가지 요소의 조합으로 정의했다 — **model + tools + context management**. 그리고 이 세 요소를 조합하는 방식은 개발자에게 맡겼다. "우리가 제공하는 것은 최소한의 빌딩 블록이다. 그것을 어떻게 조립할지는 당신이 결정한다." 이것은 프레임워크의 접근이 아니다. SDK의 접근이다. 그리고 이 최소주의가 — 의도했든 아니든 — 커뮤니티에 하나의 빈 공간을 열어주었다. "모델과 도구 사이를 감싸는 외부 계층을 우리가 직접 만들 수 있다"는 가능성의 공간이다.

Archon은 정확히 이 공간에서 태어났다.

---

## 3. Harness vs Framework — 소프트웨어 공학사에서 이 단어가 의미해온 것

Archon이 선택한 "harness"라는 단어는 AI 코딩에서 새로운 것이지만, 소프트웨어 공학에서는 수십 년의 역사를 가진 용어다. 이 역사를 짚지 않으면, 단어의 이동이 왜 의미심장한지를 놓친다.

**Test harness: 단어의 기원**

소프트웨어 테스팅에서 "test harness"는 테스트를 실행하기 위한 인프라를 뜻한다. JUnit의 runner, pytest의 fixture system, Selenium의 WebDriver — 이것들이 test harness다. Test harness가 하는 일은 세 가지다. 첫째, 테스트가 실행될 환경을 준비한다(setup). 둘째, 테스트를 실행하고 결과를 수집한다(execution + collection). 셋째, 정리한다(teardown). Harness는 테스트 코드 자체를 작성하지 않는다. 테스트의 로직에 개입하지 않는다. 테스트가 올바른 조건에서 올바른 순서로 실행되도록 보장할 뿐이다.

이것을 test framework와 비교해보자. Test framework — 예를 들어 Ruby on Rails의 내장 테스트 프레임워크나 Django의 TestCase — 는 테스트가 어떻게 작성되어야 하는지를 규정한다. 어떤 클래스를 상속해야 하는지, 어떤 메서드 이름 규칙을 따라야 하는지, assertion은 어떤 API를 써야 하는지. Framework는 테스트의 구조를 결정한다. Harness는 테스트의 실행만 관리한다.

이 구분은 미묘하지만 중요하다. Framework의 세계에서는 사용자가 프레임워크의 규칙에 맞춰야 한다. Harness의 세계에서는 사용자의 코드가 어떤 형태든 상관없고, harness가 그 코드를 감싸서 실행한다. Framework가 "안으로 들어와라"라면, harness는 "밖에서 감싸겠다"다.

**Harness의 핵심 속성: 비침투적(non-invasive) 감싸기**

Test harness의 가장 중요한 속성은 비침투적이라는 것이다. Harness를 교체해도 테스트 코드는 바뀌지 않는다. JUnit의 runner를 TestNG의 runner로 바꿔도, 테스트 로직 자체는 동일하다. 이것은 framework와 근본적으로 다르다. Rails에서 Sinatra로 옮기면 코드를 다시 써야 한다. Django에서 Flask로 옮기면 코드를 다시 써야 한다. Framework는 사용자의 코드와 결합하고, harness는 사용자의 코드와 분리된다.

이 속성을 AI 코딩 도구에 대입하면 의미가 선명해진다. LangChain의 Chain 안에서 작성한 에이전트 로직은 LangChain 밖에서 그대로 쓸 수 없다. LangChain의 추상화에 의존하기 때문이다. CrewAI의 Crew-Task 구조로 설계한 워크플로는 CrewAI 없이는 작동하지 않는다. 이것이 framework의 결합(coupling)이다.

Archon이 harness를 표방하는 것은, 이 결합을 피하겠다는 선언이다. 사용자의 AI 코딩 워크플로가 어떤 형태든 — 어떤 모델을 쓰든, 어떤 도구를 쓰든, 어떤 프롬프트 전략을 쓰든 — Archon이 그것을 바깥에서 감싸서 결정론과 반복 가능성을 부여한다. 사용자의 코드를 바꾸지 않고. 이것이 harness의 약속이다.

**Test harness에서 agent harness로의 확장**

이 블로그의 이전 에세이 ["모델이 전부가 아니었다 — Coding Agent를 진짜로 작동시키는 것"](coding-agent-harness-anatomy.md)에서 Sebastian Raschka의 Agent Harness 개념을 다룬 바 있다. 그 글은 harness의 여섯 가지 구성 요소 — Live Repo Context, Prompt Shape, Tool Access, Context Bloat 최소화, Session Memory, Bounded Subagents — 를 해부했다. 이 글에서 그 해부를 반복하지는 않겠다. 다만 한 가지만 짚고 넘어간다.

Raschka가 harness라는 단어를 선택한 것과, 몇 달 뒤 Archon이 같은 단어를 선택한 것 사이에는 연결이 있다. Raschka의 글은 학술적 분석이었다 — "coding agent의 구조를 이렇게 이해할 수 있다"는 프레임워크(이번엔 분석적 의미에서의 프레임워크)의 제안이었다. Archon은 그 분석을 제품으로 만든 것이다 — "그 harness를 직접 만들 수 있게 해주겠다"는 도구의 제안이다. 학술적 개념이 제품 카테고리로 전환된 순간이고, 그 전환이 GitHub Trending 상위에 올랐다는 것은 커뮤니티가 이 전환을 인정했다는 뜻이다.

---

## 4. 역사적 유비 — EJB에서 Spring으로, 그리고 말 마구의 원래 뜻

단어의 이동이 왜 중요한지를 이해하기 위해, 소프트웨어 역사에서 비슷한 전환이 일어났던 순간을 깊게 들여다보자. 가장 교훈적인 사례는 1990년대 후반에서 2000년대 초반의 **EJB에서 Spring으로의 전환**이다.

**EJB: 프레임워크의 극단**

Enterprise JavaBeans(EJB)는 1998년 Sun Microsystems가 발표한 Java 엔터프라이즈 애플리케이션의 표준 프레임워크였다. EJB의 약속은 야심적이었다. 분산 트랜잭션, 원격 메서드 호출, 객체 영속성, 보안, 동시성 관리 — 엔터프라이즈 소프트웨어의 모든 어려운 문제를 프레임워크가 해결해준다는 것이었다.

그 대가는 침투적 결합(invasive coupling)이었다. EJB를 사용하려면 개발자의 비즈니스 객체가 특정 인터페이스를 구현하고, 특정 클래스를 상속하고, 특정 배포 기술자(deployment descriptor)를 XML로 작성해야 했다. 간단한 계산 로직 하나를 EJB로 만들려면 Home 인터페이스, Remote 인터페이스, Bean 구현 클래스, 배포 기술자 — 최소 네 개의 파일이 필요했다. 비즈니스 로직 10줄을 위해 보일러플레이트 100줄을 써야 했다.

더 심각한 문제는 테스트였다. EJB는 애플리케이션 서버 안에서만 실행됐다. 비즈니스 로직을 단위 테스트하려면 전체 애플리케이션 서버를 띄워야 했다. 이것은 테스트를 사실상 불가능하게 만들었다. 개발자의 코드가 프레임워크와 너무 깊이 결합되어 있어서, 프레임워크 없이는 코드가 존재할 수 없었다.

이 상황이 2024년의 LangChain과 오버랩되는가? 정확히 그렇다. LangChain의 Chain 안에서 작성한 에이전트 로직을 단독으로 테스트하려면 LangChain의 런타임이 필요했다. 에이전트의 행동을 디버깅하려면 LangChain의 추상화 계층을 뚫고 들어가야 했다. 프레임워크가 해결해주는 것보다 프레임워크 자체가 만드는 복잡도가 더 커지는 순간이 왔다. EJB가 1990년대 후반에 겪은 것과 같은 궤적이다.

**Spring: POJO를 감싸다**

2002년, Rod Johnson이 *Expert One-on-One J2EE Design and Development*라는 책을 출간하면서 EJB에 대한 체계적 비판과 함께 대안을 제시했다. 이것이 Spring Framework의 시작이었다. Spring의 핵심 철학은 하나였다 — **POJO(Plain Old Java Object)를 존중하라**.

POJO는 아무 프레임워크에도 의존하지 않는, 순수한 Java 객체다. 특정 인터페이스를 구현하지 않고, 특정 클래스를 상속하지 않는다. Spring은 이 POJO를 그대로 두고, 바깥에서 감싸는 방식을 택했다. Dependency Injection이라는 기법을 통해, 객체 간의 의존관계를 외부에서 주입했다. 객체 자체는 자기가 Spring 안에서 돌아가는지조차 몰라도 됐다.

이것은 정확히 **harness의 접근**이다. Spring은 개발자의 코드를 바꾸지 않았다. 개발자의 코드를 감싸서, 트랜잭션 관리, 보안, 원격 호출 같은 엔터프라이즈 기능을 외부에서 덧씌웠다. 개발자의 POJO는 프레임워크 없이도 테스트 가능했다. Spring을 떼어내도 비즈니스 로직은 온전했다. 비침투적 감싸기. Harness의 정의 그 자체다.

결과는 역사가 증명한다. EJB는 3.0에서 대폭 간소화되었지만 이미 전세는 역전된 뒤였다. Spring은 Java 생태계의 사실상 표준이 되었고, 20년이 지난 2026년 현재까지 그 지위를 유지하고 있다. 프레임워크가 졌고, harness(의 정신)가 이겼다.

**말 마구(horse harness)의 원래 뜻**

여기서 한 발 더 뒤로 물러나서, harness라는 영어 단어의 어원을 보자. 이 단어의 가장 오래된 뜻은 "말 마구(馬具)"다. 말의 몸에 씌워서 말의 힘을 마차나 쟁기에 전달하는 장치다.

말 마구의 핵심 특성을 보면, 소프트웨어 harness와의 유비가 놀라울 정도로 정확하다.

첫째, **말의 능력을 바꾸지 않는다**. 마구를 씌운다고 말이 더 빨라지거나 더 강해지지 않는다. 말의 힘은 그대로다. 마구가 하는 것은 그 힘의 방향을 정하는 것이다. — LLM의 추론 능력을 바꾸지 않지만, 그 추론이 어디로 향하는지를 제어하는 agent harness와 같다.

둘째, **말 없이는 의미가 없다**. 마구만 있고 말이 없으면 쓸모없는 가죽과 쇠붙이다. — 모델 없이는 작동하지 않는 harness와 같다. 반면 프레임워크는 자체적인 구조와 로직을 가지고 있어서, 사용자의 코드 없이도 "뭔가가 존재한다"는 느낌을 준다. 빈 Rails 프로젝트를 생성하면 디렉토리 구조와 설정 파일이 즉시 만들어진다. 빈 harness는 아무것도 없다.

셋째, **교체 가능하다**. 말에게 쟁기용 마구를 씌우면 밭을 갈고, 마차용 마구를 씌우면 짐을 나른다. 같은 말에 다른 마구. — 같은 모델에 다른 harness 설정을 적용하면 다른 종류의 작업을 한다. Archon이 "harness builder"를 표방하는 이유가 여기에 있다. 하나의 고정된 harness를 제공하는 것이 아니라, 사용자가 자신의 작업에 맞는 harness를 만들 수 있게 해주겠다는 것이다.

넷째, 그리고 이것이 가장 중요한데 — **결정론을 부여한다**. 마구 없는 말은 어디로 뛸지 모른다. 마구가 있으면 말의 힘이 예측 가능한 방향으로 전달된다. — LLM의 확률적 출력을 결정론적이고 반복 가능한 워크플로로 만들겠다는 Archon의 약속이 이것이다.

EJB에서 Spring으로의 전환과 말 마구의 비유를 겹쳐놓으면, 2026년 AI 코딩 도구에서 일어나고 있는 일의 윤곽이 잡힌다. 2023~2025년의 AI 에이전트 프레임워크는 EJB였다. 야심적이고, 포괄적이고, 침투적이었다. 2026년의 harness 접근은 Spring이다. 최소주의적이고, 비침투적이고, 사용자의 코드를 존중한다. 그리고 말이 이미 충분히 강해진 시대 — GPT-5, Claude Opus 4.6, Gemini 3.1 같은 프론티어 모델이 이미 강력한 추론 능력을 갖춘 시대 — 에, 필요한 것은 더 강한 말이 아니라 더 좋은 마구다.

---

## 5. hermes-agent와 oh-my-codex — "Hooks", "Grows with you"가 드러내는 패러다임

Archon이 harness라는 단어를 명시적으로 사용한 유일한 레포라면, hermes-agent와 oh-my-codex는 같은 패러다임을 다른 어휘로 표현한다. 이 두 레포의 언어를 해부하면, harness 패러다임이 단일 프로젝트의 마케팅이 아니라 더 넓은 흐름임을 확인할 수 있다.

**hermes-agent: "The agent that grows with you"**

[hermes-agent](https://github.com/NousResearch/hermes-agent)의 부제 *"The agent that grows with you"*에서 핵심은 **"with you"**다. 에이전트가 성장한다는 주장은 새로울 것 없다. 모든 AI 도구가 "더 똑똑해진다"고 말한다. 그러나 "with you" — 당신과 함께 — 라는 수식이 관계의 방향을 규정한다.

프레임워크의 관계는 "안으로 들어오라"다. 사용자가 프레임워크의 구조에 맞춘다. LangChain의 Chain에 자신의 로직을 끼워 넣고, CrewAI의 Crew에 자신의 에이전트를 등록하고, AutoGen의 대화 프로토콜에 맞춰 메시지를 설계한다. 사용자가 프레임워크로 이동한다.

"grows with you"는 반대 방향이다. 사용자가 있는 자리에 에이전트가 온다. 사용자가 성장하면 에이전트도 따라서 성장한다. 사용자의 워크플로가 바뀌면 에이전트도 거기에 맞춘다. 이것은 감싸는(wrapping) 관계다. 에이전트가 사용자를 바깥에서 감싸고, 사용자의 변화에 따라 감싸는 방식을 조정한다. 프레임워크가 아니라 harness의 관계다.

hermes-agent가 주간 +19,765로 그 주의 최대 상승 레포라는 사실은 주목할 만하다. NousResearch는 오픈소스 AI 연구에서 이미 인지도가 있는 조직이고, hermes 모델 시리즈의 브랜드 파워가 작용했을 것이다. 그러나 44,309 스타라는 절대 수치는 단순한 브랜드 효과를 넘어선다. "grows with you"라는 메시지가 개발자 커뮤니티에 반향을 일으키고 있다.

**oh-my-codex: Hooks, Teams, HUDs**

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)의 부제 *"Your codex is not alone. Add hooks, agent teams, HUDs"*는 세 개의 기술 용어를 전면에 내세운다. 이 세 단어가 어디서 온 것인지를 추적하면, oh-my-codex가 자신을 어떤 전통 안에 위치시키려 하는지가 드러난다.

**Hooks.** 소프트웨어 공학에서 hook은 "기존 시스템의 실행 흐름에 사용자 정의 코드를 끼워 넣는 진입점"이다. Git hooks, React hooks, WordPress hooks — 모두 같은 패턴이다. 기존 시스템을 수정하지 않고, 기존 시스템이 제공하는 진입점에 자신의 코드를 걸어둔다(hook). 이것은 프레임워크의 override 패턴과 다르다. Override는 기존 행동을 대체한다. Hook은 기존 행동을 유지하면서 추가 행동을 끼워 넣는다. 비파괴적(non-destructive) 확장. Harness의 특성과 정확히 일치한다.

oh-my-codex가 OpenAI의 Codex CLI에 hooks를 추가한다는 것은, Codex의 기존 동작을 바꾸지 않고, 특정 시점에 사용자 정의 동작을 끼워 넣겠다는 뜻이다. Codex가 코드를 생성하기 전에 검증 로직을 끼워 넣거나, 생성 후에 포매팅을 적용하거나, 특정 패턴이 감지되면 경고를 보내거나. 기존 도구를 감싸는 외부 계층이다.

**Teams.** 여기서 team은 AI 에이전트의 그룹을 의미하지만, 단어의 선택 자체가 시사적이다. 프레임워크 시대의 단어는 "orchestration"이었다. 오케스트레이션은 중앙 지휘자(conductor)가 각 악기(agent)를 통제하는 모델이다. 위계적이고, 중앙집권적이다. Team은 수평적이다. 각 구성원이 자율성을 가지고, 협업하되 중앙 지휘를 받지 않는다. CrewAI도 "crew(선원)"라는 비슷한 은유를 쓰지만, 그 내부 구현은 중앙 오케스트레이션에 가깝다. oh-my-codex가 "team"을 쓰면서 이를 hooks와 병치한다는 것은, 에이전트 간의 관계도 비침투적(각자의 코드를 바꾸지 않고 협업하는)이라는 함의를 준다.

**HUDs.** Heads-Up Display. 전투기 조종사의 헬멧 바이저에 비행 정보가 투사되는 것을 떠올려보자. HUD의 핵심 특성은 두 가지다. 첫째, 현실을 가리지 않는다. 조종사는 여전히 창밖을 본다. 정보가 현실 위에 겹쳐질 뿐이다. 둘째, 정보는 실시간이다. 과거의 데이터가 아니라 지금의 상태를 보여준다.

이것을 AI 코딩 도구의 맥락에 대입하면 — oh-my-codex의 HUD는 Codex가 무엇을 하고 있는지를 사용자에게 실시간으로 보여주되, Codex의 동작 자체를 가리거나 변경하지 않는다. 프레임워크의 "dashboard"와 비교해보자. Dashboard는 보통 프레임워크의 내부 상태를 프레임워크의 용어로 보여준다. HUD는 사용자의 시야 위에 정보를 올린다. 전자는 프레임워크 중심적이고, 후자는 사용자 중심적이다.

세 단어 — hooks, teams, HUDs — 를 종합하면, oh-my-codex의 설계 철학이 드러난다. 기존 도구(Codex CLI)를 바꾸지 않는다. 기존 도구의 바깥에서 진입점(hooks)을 만들고, 수평적 협업 구조(teams)를 올리고, 실시간 상태 표시(HUDs)를 덧씌운다. 이것은 harness다. Archon처럼 단어를 직접 쓰지는 않지만, 접근법은 동일하다.

주간 +9,737이라는 상승 수치는, 19,938이라는 총 스타와 함께, 이 접근이 커뮤니티에서 강한 반응을 얻고 있음을 보여준다. 한국 개발자가 만든 도구가 글로벌 GitHub Trending 주간 2위에 오른 것 자체도 주목할 사항이지만, 이 글의 관심사는 그것이 아니다. 관심사는 이 도구가 사용하는 단어 — hooks, teams, HUDs — 가 Archon의 harness, hermes-agent의 "grows with you"와 같은 방향을 가리킨다는 사실이다.

---

## 6. Claude Agent SDK와 최소주의 — 외부 wrapping 레이어를 초대한 방식

세 레포가 동시에 harness 패러다임을 향해 이동한 것이 우연이 아니라면, 무엇이 이 이동을 촉발했는가. 여러 요인이 있지만, 가장 직접적인 촉매는 **Anthropic의 Claude Agent SDK가 제시한 최소주의적 에이전트 정의**다.

**"Agent = Model + Tools + Context Management"**

Claude Agent SDK의 에이전트 정의는 의도적으로 최소적이다. 에이전트란 모델이 도구에 접근하고, 맥락을 관리하는 것이다. 이 정의에는 오케스트레이션이 없다. 워크플로가 없다. 상태 머신이 없다. 계획 수립이 없다. LangGraph가 에이전트를 "노드와 엣지로 이루어진 그래프"로 정의하고, CrewAI가 에이전트를 "역할과 작업의 위계"로 정의한 것과 대조적으로, Anthropic은 에이전트를 가장 낮은 수준의 빌딩 블록으로 환원했다.

이 최소주의가 harness 생태계를 가능하게 한 이유는 명확하다. 프레임워크가 이미 풍부한 구조를 제공하면, 외부 계층이 들어갈 자리가 없다. LangChain이 오케스트레이션, 메모리, 도구 관리를 전부 제공하는데, 그 위에 또 다른 계층을 올리면 중복과 충돌이 생긴다. 반면 SDK가 "모델 + 도구 + 맥락 관리"만 제공하면, 그 위에 결정론적 실행, 반복 가능한 워크플로, 품질 게이트, 모니터링 같은 것을 올릴 공간이 열린다. Archon이 정확히 이 공간에 들어갔다.

비유를 확장하면 이렇다. Claude Agent SDK는 말(모델)과 기본적인 고삐(도구 접근)를 제공한다. 마구(harness)는 커뮤니티가 만든다. Anthropic은 마구를 제공하지 않았다 — 의도적으로. 마구의 설계를 커뮤니티에 위임함으로써, 다양한 종류의 마구가 다양한 용도로 만들어질 수 있는 생태계를 열었다. 농경용 마구, 운송용 마구, 경주용 마구 — 각각 다른 사용자의 다른 요구에 맞춘 harness가 등장할 수 있다.

이 전략이 의도적이었는지 아닌지는 Anthropic만이 알 것이다. 결과적으로 일어난 것은, SDK의 최소주의가 harness builder(Archon), hooks 확장(oh-my-codex), 적응형 에이전트(hermes-agent) 같은 외부 프로젝트의 폭발적 성장을 가능하게 했다는 것이다.

**더 넓은 맥락: obra/superpowers와 onyx**

같은 주간 트렌딩에서 [obra/superpowers](https://github.com/obra/superpowers)는 143,000 스타로 압도적 존재감을 보인다. 이 프로젝트는 자신을 "skills framework & software development methodology"라고 소개한다. Framework라는 단어를 사용하면서도, "methodology"라는 보조 단어를 함께 놓는다. Methodology는 프레임워크보다 느슨한 개념이다. 코드 구조를 강제하는 것이 아니라, 작업 방법론을 제안하는 것이다. "이렇게 구조화하라"가 아니라 "이렇게 접근해보라". 이것은 framework와 harness 사이의 중간 지대다 — 구조를 제공하되 강제하지는 않는다.

[onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx)는 26,000 스타, 주간 +5,556의 AI 채팅 플랫폼이다. 부제는 "works with every LLM." 모든 LLM과 작동한다. 이것은 platform-agnostic 외부 계층이다. 특정 모델에 결합하지 않고, 어떤 모델이든 감싸서 채팅 인터페이스를 제공한다. Chat 계층에서의 harness 패턴이다.

superpowers와 onyx를 Archon, hermes-agent, oh-my-codex와 함께 놓으면, 같은 주간에 GitHub Trending을 점유한 AI 관련 프로젝트들이 하나의 방향 — **기존 도구/모델을 바꾸지 않고 바깥에서 감싸는 것** — 을 공유하고 있음이 더욱 선명해진다. 이것이 우연의 일치라고 하기에는, 일치하는 프로젝트가 너무 많다.

---

## 7. 결정론(Determinism)이 왜 지금 화두가 되었나 — Agentic 실패의 교훈

Archon의 두 번째 문장 — *"Make AI coding deterministic and repeatable"* — 으로 돌아가자. 이 문장이 2024년이 아니라 2026년에 나온 이유가 있다. 2024년에는 "AI 코딩을 결정론적으로 만든다"는 가치 제안이 공감을 얻기 어려웠을 것이다. 2024년의 관심사는 "AI 코딩이 가능한가", "AI가 어디까지 할 수 있는가"였다. 가능성의 확장이 최우선이었다. 결정론은 가능성을 제한하는 것처럼 들렸을 것이다.

2026년에 결정론이 화두가 된 것은, 그 사이 2년간의 agentic 실패 경험이 축적되었기 때문이다.

**실패 유형 1: 비결정론적 워크플로의 디버깅 불가능성**

AI 에이전트를 프로덕션에 배치한 팀들이 가장 먼저 부딪힌 문제는, 에이전트의 행동이 재현 불가능하다는 것이었다. 같은 입력을 주었는데 다른 결과가 나온다. 모델의 온도(temperature) 설정, 프롬프트의 미세한 변화, 컨텍스트 윈도의 내용물, 도구 호출의 순서 — 이 모든 것이 확률적으로 변하기 때문에, 한 번 성공한 워크플로가 다음 번에 실패할 수 있다. 그리고 왜 실패했는지를 알 수 없다. 프레임워크가 중간의 상태를 추상화해버렸기 때문이다.

전통적 소프트웨어에서 디버깅이 가능한 이유는 결정론 때문이다. 같은 입력에 같은 출력이 나온다는 것이 보장되면, 입력을 바꿔가며 문제를 좁힐 수 있다. AI 에이전트에서 이 보장이 없으면, 디버깅은 "다시 돌려봤더니 이번에는 됐다" 수준으로 떨어진다. 이것은 프로덕션 환경에서 받아들일 수 없는 상태다.

**실패 유형 2: 프레임워크가 숨긴 제어 흐름**

LangChain이나 CrewAI 같은 프레임워크를 사용한 팀들이 보고한 두 번째 문제는, 에이전트의 제어 흐름을 이해할 수 없다는 것이었다. 프레임워크가 내부적으로 어떤 순서로 도구를 호출하는지, 어떤 조건에서 재시도를 하는지, 에러가 발생했을 때 어떻게 복구하는지 — 이 모든 것이 프레임워크의 추상화 뒤에 숨어 있었다.

이전 에세이에서 다뤘던 attribution 버그 — Claude Code가 자기 자신의 발언을 사용자의 발언으로 잘못 귀속시킨 사례 — 가 이 문제의 극단적 형태다. Harness 계층에서 메시지 역할을 잘못 처리하면, 모델은 존재하지 않는 사용자 지시를 확신을 가지고 수행한다. 이런 문제가 프레임워크의 추상화 뒤에 숨어 있으면, 발견 자체가 어렵다. dwyer.co.za의 저자가 "파괴적 행동과 함께 나타날 때에만 눈에 띈다"고 말한 것이 이것이다.

**실패 유형 3: "작동하지만 왜 작동하는지 모른다"**

이 블로그의 이전 에세이 ["모델이 전부가 아니었다"](coding-agent-harness-anatomy.md)에서 다룬 Maganti의 syntaqlite 경험이 이 유형의 전형이다. 첫 번째 빌드에서 500개 이상의 테스트가 통과했다. "작동"했다. 그런데 왜 작동하는지를 Maganti 자신도 이해하지 못했다. AI가 생성한 코드의 구조를 파악할 수 없었다. 이것은 "false reassurance" — 거짓된 안심감 — 이다. 테스트가 통과한다는 사실이 시스템의 건강성을 보장하지 않는다.

이 경험이 harness 패러다임과 연결되는 지점은 여기다. Harness는 결정론과 반복 가능성을 약속한다. 결정론은 "같은 입력에 같은 출력"을 보장한다. 반복 가능성은 "같은 과정을 다시 실행할 수 있다"를 보장한다. 이 두 속성이 있으면, "왜 작동하는지"를 사후에 추적할 수 있다. 입력을 바꿔가며 출력의 변화를 관찰할 수 있다. 과정을 반복하면서 각 단계의 기여를 분리할 수 있다. 과학적 방법론의 기본 조건 — 통제된 변수와 반복 실험 — 이 AI 코딩에도 적용되는 것이다.

**세 가지 실패의 공통분모**

세 가지 실패 유형의 공통분모는 **제어의 상실**이다. 프레임워크가 제어를 가져간 결과, 개발자는 에이전트의 행동을 예측할 수도, 재현할 수도, 이해할 수도 없게 되었다. Harness의 약속은 이 제어를 돌려주겠다는 것이다. 에이전트의 내부 — 모델의 추론 — 는 여전히 확률적이지만, 에이전트의 외부 — harness가 관리하는 실행 조건, 입력 구성, 출력 검증, 도구 호출 순서 — 는 결정론적으로 만들 수 있다. 내부는 통제할 수 없지만, 외부는 통제할 수 있다. 그리고 외부를 통제하면 내부의 불확실성이 전체 시스템의 불확실성으로 전파되는 것을 막을 수 있다.

이것이 Archon이 "deterministic and repeatable"을 가치 제안의 핵심에 놓은 이유다. 2년간의 agentic 실패가 가르친 교훈은, "더 강한 모델"이 아니라 "더 결정론적인 실행 환경"이 필요하다는 것이었다. 그리고 결정론적 실행 환경은 프레임워크의 내부에서가 아니라, harness의 외부에서 더 자연스럽게 구현된다.

---

## 8. Rails에서 Sinatra로, 그리고 다시 — 무거움과 가벼움의 진자

역사적 유비를 하나 더 깊게 전개하면, 이 전환의 위치를 더 정확히 파악할 수 있다. Ruby 생태계의 **Rails vs Sinatra** 진자운동이다.

**Rails의 전성기와 반동**

Ruby on Rails는 2004년 등장했을 때 웹 개발의 판을 바꿨다. "Convention over Configuration" — 규약이 설정을 대체한다 — 이라는 철학 아래, 개발자가 결정해야 할 것을 프레임워크가 미리 정해주었다. 디렉토리 구조, 네이밍 규칙, 데이터베이스 매핑, 라우팅 — 모든 것이 "Rails 방식"으로 결정되어 있었다. 이 규약에 따르면 놀라운 생산성을 얻을 수 있었다. 15분 만에 블로그를 만드는 데모가 세상을 놀라게 했다.

그러나 Rails의 규약에서 벗어나야 하는 순간 — 비표준적인 데이터베이스 구조, 특수한 인증 로직, 마이크로서비스 아키텍처 — 이 오면, Rails는 도움이 아니라 장애물이 되었다. "Rails 방식"이 아닌 것을 하려면 "Rails를 우회하는 방식"을 배워야 했다. 프레임워크를 쓰면서 프레임워크와 싸우는 역설.

이에 대한 반동으로 2007년 Sinatra가 등장했다. Sinatra는 자신을 "micro-framework"라고 불렀지만, 실질적으로는 **라우팅 harness**에 가까웠다. HTTP 요청을 받아서 사용자의 코드에 전달하는 것, 딱 그것만 했다. 디렉토리 구조를 강제하지 않았다. ORM을 내장하지 않았다. 템플릿 엔진을 지정하지 않았다. 사용자가 원하는 것을 원하는 방식으로 쓰고, Sinatra는 그것을 HTTP 위에서 실행해주기만 했다.

Python 생태계에서도 같은 진자가 작동했다. Django(프레임워크) vs Flask(마이크로-harness). Django는 "배터리 포함(batteries included)"을 표방하며 인증, ORM, 관리자 패널, 폼 처리까지 제공했다. Flask는 WSGI 위의 라우팅과 템플릿 렌더링만 제공했다.

두 생태계 모두에서 같은 패턴이 관찰된다. 프레임워크가 먼저 시장을 장악하고, 복잡도가 임계점을 넘으면 가벼운 대안이 부상한다. 그리고 가벼운 대안 위에 필요한 기능이 하나둘 올라가면서, 결국 또 다른 형태의 "무거움"이 생긴다. 진자는 한 방향으로만 가지 않는다.

**AI 에이전트의 진자는 어디에 있는가**

이 진자의 관점에서 보면, AI 에이전트 생태계는 지금 정확히 **Rails에서 Sinatra로 이동하는 구간**에 있다. LangChain/CrewAI/AutoGen이 Rails였다면, Archon/hermes-agent/oh-my-codex 세대가 Sinatra다. 프레임워크의 규약에서 벗어나, 사용자의 코드를 존중하는 최소주의적 외부 계층으로의 이동.

그러나 역사의 교훈은 여기서 끝나지 않는다. Sinatra는 Rails를 대체하지 못했다. Flask도 Django를 대체하지 못했다. 시장은 양분되었다. 표준적 사용 사례에서는 프레임워크가 여전히 우세했고, 비표준적 사용 사례에서 가벼운 대안이 자리를 잡았다. 그리고 시간이 지나면서 가벼운 대안 위에도 생태계가 쌓이기 시작했다 — Flask 확장, Sinatra 미들웨어 — 결국 "가벼운 프레임워크"라는 모순어법이 현실이 되었다.

AI 에이전트 생태계에서도 같은 일이 일어날 가능성이 높다. Harness가 프레임워크를 완전히 대체하지는 않을 것이다. 표준적인 RAG 파이프라인, 단순한 챗봇, 정형화된 워크플로에서는 LangChain이나 그 후속이 여전히 효율적일 것이다. Harness가 빛나는 영역은 프로덕션, 커스터마이징, 결정론이 필요한 곳이다. 그리고 시간이 지나면 harness 위에도 생태계가 쌓이고, 그 생태계가 또 다른 형태의 "무거움"이 될 것이다.

중요한 것은 현재의 진자 위치를 아는 것이다. 2026년 4월 시점에서, 진자는 분명히 harness 쪽으로 움직이고 있다. GitHub Trending이 그 증거다.

---

## 9. 실무자에게 주는 의미 — 당신의 에이전트에 harness가 있는가

여기까지의 분석을 종합하면, 실무자에게 몇 가지 구체적 함의가 도출된다.

**첫째, 어휘를 점검하라.**

당신이 AI 에이전트 도구를 평가할 때, 그 도구가 스스로를 어떤 단어로 설명하는지 주의 깊게 보라. Framework라고 하는가, harness라고 하는가, 아니면 아예 카테고리를 정의하지 않는가. 단어는 설계 철학을 반영한다. Framework를 표방하는 도구는 사용자의 코드가 그 구조 안에 들어가야 한다. Harness를 표방하는 도구는 사용자의 코드를 바깥에서 감싼다. 이 차이가 당신의 코드베이스와 워크플로에 미치는 영향은 크다.

**둘째, 결합도를 측정하라.**

당신이 지금 사용하는 AI 에이전트 도구와 당신의 코드 사이의 결합도(coupling)를 측정해보라. 그 도구를 떼어냈을 때 당신의 코드가 얼마나 살아남는가? LangChain의 Chain 안에 있는 로직을 LangChain 없이 실행할 수 있는가? 결합도가 높을수록, 도구 교체의 비용이 크고, 도구의 문제가 당신의 문제가 된다. 낮은 결합도는 harness 접근의 핵심 약속이다.

**셋째, 결정론을 요구하라.**

AI 에이전트가 프로덕션에 들어갈 때, "같은 입력에 같은 출력"을 얼마나 보장할 수 있는지를 물어야 한다. 완전한 결정론은 LLM의 확률적 성격상 불가능하지만, harness 수준에서의 결정론 — 같은 프롬프트 구성, 같은 도구 호출 순서, 같은 검증 로직 — 은 가능하다. 이것이 있으면 디버깅이 가능하고, 없으면 디버깅이 불가능하다. Archon이 이것을 가치 제안의 핵심에 놓은 것은 우연이 아니다.

**넷째, 이전 에세이의 Harness 여섯 가지와 연결하라.**

["모델이 전부가 아니었다"](coding-agent-harness-anatomy.md)에서 다룬 harness의 여섯 가지 요소 — Live Repo Context, Prompt Shape, Tool Access, Context Bloat 최소화, Session Memory, Bounded Subagents — 는 harness의 해부학이었다. 이 에세이가 다루는 것은 harness의 역사적 위치와 생태계적 의미다. 둘을 합치면 이렇다 — 해부학적으로 harness가 무엇인지를 알고(이전 에세이), 생태계에서 harness가 왜 지금 부상하는지를 알면(이 에세이), 자신의 워크플로에 어떤 harness가 필요한지를 판단할 수 있다.

**다섯째, 진자의 위치를 기억하라.**

Harness가 만능이 아니라는 것도 알아야 한다. Rails에서 Sinatra로의 이동이 Sinatra의 승리를 의미하지 않았듯이, Framework에서 Harness로의 이동이 Harness의 절대적 우위를 의미하지는 않는다. 표준적 사용 사례에서는 프레임워크가 여전히 효율적이다. 비표준적, 프로덕션급, 결정론이 필요한 사용 사례에서 harness가 빛난다. 자신이 어떤 사용 사례에 있는지를 아는 것이 첫 번째다.

---

## 10. 열린 질문들 — 단어의 이동은 어디까지 갈 것인가

2026년 4월 10일의 GitHub Trending이 보여준 것은, AI 코딩 도구의 어휘가 이동하고 있다는 사실이다. Framework에서 harness로. Override에서 hooks로. Dashboard에서 HUD로. Orchestration에서 team으로. "안으로 들어와라"에서 "밖에서 감싸겠다"로.

이 이동이 일시적 유행인지, 구조적 전환인지는 시간이 답할 것이다. 다만 이 글이 추적한 증거들 — Archon의 명시적 "harness builder" 선언, hermes-agent의 "grows with you", oh-my-codex의 hooks/teams/HUDs, 2년간의 프레임워크 피로감, EJB에서 Spring으로의 역사적 선례, Claude Agent SDK의 최소주의가 열어준 공간, agentic 실패에서 학습된 결정론의 필요성 — 은 일시적 유행보다는 구조적 전환에 무게를 실어준다.

열린 질문은 여러 개다.

**첫째, harness의 표준화는 어떻게 진행될 것인가.** Test harness 영역에서는 JUnit이 사실상 표준이 되었고, 다른 언어의 test harness(pytest, RSpec, Jest)도 비슷한 인터페이스를 따르게 되었다. Agent harness에서도 비슷한 표준화가 일어날 것인가? Archon이 "first"를 주장하는 것은 이 표준을 선점하려는 시도로 읽을 수 있다.

**둘째, 프레임워크는 harness를 흡수할 것인가.** Spring이 처음에는 EJB의 대안이었지만, 시간이 지나면서 Spring 자체가 거대한 프레임워크가 되었다. Harness로 시작한 도구가 기능을 추가하면서 프레임워크가 되는 순환은 반복될 것인가? 아니면 이번에는 다를 것인가?

**셋째, 모델 자체가 harness를 내장할 것인가.** 현재의 harness는 모델 외부의 소프트웨어 계층이다. 그러나 모델이 더 강력해지면, 결정론적 실행과 반복 가능성이 모델 내부의 기능이 될 수도 있다. 모델이 자체적으로 tool validation을 하고, context bloat을 관리하고, session memory를 유지한다면, 외부 harness의 역할은 축소된다. 이 미래가 오면 harness 패러다임은 어떻게 진화할 것인가?

**넷째, 결정론의 비용은 무엇인가.** Archon이 약속하는 결정론과 반복 가능성에는 비용이 있을 것이다. 결정론을 강제하면, LLM의 확률적 탐색 — 때로는 예상치 못한 좋은 결과를 낳는 — 이 제한될 수 있다. 결정론과 창의성 사이의 트레이드오프를 harness가 어떻게 관리할 것인가?

이 질문들에 대한 답은 아직 없다. 있어야 할 필요도 없다. 중요한 것은 질문의 방향이다. 2023~2025년의 질문이 "AI 에이전트로 무엇을 할 수 있는가"였다면, 2026년의 질문은 "AI 에이전트를 어떻게 제어할 수 있는가"다. 가능성에서 통제로. 확장에서 수렴으로. Framework에서 harness로.

Archon이 자신을 "the first open-source harness builder for AI coding"이라고 소개하면서, *"Make AI coding deterministic and repeatable"*이라고 덧붙인 그 두 문장은, 2026년 AI 코딩 도구 생태계의 전환을 압축한다. 프레임워크 시대에 우리는 AI에게 더 많은 것을 할 수 있는 자유를 주었다. Harness 시대에 우리는 AI가 한 것을 이해하고 재현할 수 있는 구조를 요구한다. 자유에서 규율로. 그리고 소프트웨어 공학의 역사가 일관되게 보여주듯, 규율이 먼저 확립된 영역에서 진짜 생산적인 자유가 꽃핀다.

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
