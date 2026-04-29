---
title: '클로드 코드 메타 생태계의 폭발 — 에이전트의 진짜 moat은 모델이 아니라 ''운영 지식 층''이다'
description: '"다섯 개의 레포가 같은 주에 GitHub Trending을 점령했다. 전부 Claude Code를 ''더 잘 쓰는 법''에 관한 것이었다. 이 현상의 이름은 아직 없다."'
pubDate: 2026-04-10T02:25:30.111Z
lang: ko
pairSlug: 'claude-code-meta-ecosystem-moat-simplified'
draft: false
---
# 클로드 코드 메타 생태계의 폭발 — 에이전트의 진짜 moat은 모델이 아니라 '운영 지식 층'이다

> "다섯 개의 레포가 같은 주에 GitHub Trending을 점령했다. 전부 Claude Code를 '더 잘 쓰는 법'에 관한 것이었다. 이 현상의 이름은 아직 없다."

---

2026년 4월 10일 주간, GitHub Trending 페이지에 이례적인 풍경이 펼쳐졌다. 일간과 주간 랭킹을 합산했을 때, 상위권에 올라 있는 레포 다섯 개가 하나의 공통점을 가지고 있었다. 전부 Claude Code — 또는 그와 유사한 coding agent — 를 "더 잘 쓰기 위한" 도구였다는 것이다.

[obra/superpowers](https://github.com/obra/superpowers)는 143,712 스타에 하루 +2,299를 기록했다. "An agentic skills framework & software development methodology that works"라는 설명이 붙은 Shell 프로젝트다. [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)는 10,441 스타, 일간 +1,364, 주간 +2,230. 이 레포의 핵심 산출물은 CLAUDE.md 파일 하나다. [luongnv89/claude-howto](https://github.com/luongnv89/claude-howto)는 24,002 스타에 주간 +7,342. 복사해서 붙여넣을 수 있는 템플릿과 가이드 모음이다. [YishenTu/claudian](https://github.com/YishenTu/claudian)은 6,815 스타, 일간 +200. Obsidian vault 안에 Claude Code를 심는 플러그인이다. 그리고 [Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)는 19,938 스타에 주간 +9,737 — 이번 주 GitHub 전체에서 두 번째로 빠르게 성장한 레포다. 이것은 Claude Code가 아니라 OpenAI의 Codex를 대상으로 한 도구이지만, 패턴은 동일하다.

다섯 레포의 누적 스타 합계는 204,908개. 이번 주에만 더해진 스타 수를 보수적으로 합산해도 2만 개를 넘는다. VS Code 확장 생태계 전성기에도, 프롬프트 엔지니어링 붐이 일던 2023~2024년에도, 한 주에 다섯 개의 메타 도구가 동시에 트렌딩에 오른 적은 없었다.

무슨 일이 일어나고 있는 것인가?

이 글의 주장은 이것이다 — **개인의 맥락을 넘어, 집단의 운영 지식(operational knowledge)이 모델 위에 새로운 층(layer)을 형성하고 있으며, 이 층 자체가 새로운 종류의 해자가 된다.**

---

## 1. 다섯 개의 레포 — 하나의 패턴

다섯 레포는 같은 현상의 다섯 가지 표현이다. 하지만 각각의 성격은 뚜렷하게 다르다.

**obra/superpowers**는 이번 주 현상의 플래그십이다. Claude Code에 브레인스토밍, 플랜 작성, 코드 리뷰, 디버깅 등 소프트웨어 개발 각 단계에 해당하는 skills를 주입하고, 에이전트가 상황에 따라 적절한 skill을 호출하도록 구조화한다. 더 중요한 것은 methodology라는 단어다. "brainstorming 단계를 반드시 거칠 것", "plan을 먼저 작성하고 subagent로 실행할 것", "완료를 주장하기 전에 반드시 verification을 돌릴 것" — 시니어 개발자의 암묵지가 Shell 스크립트와 Markdown 파일로 결정화된 것이다. 143,712 스타는 이 방법론에 대한 수요가 거대하다는 뜻이다.

**forrestchang/andrej-karpathy-skills**는 가장 순수한 형태의 사례다. 핵심 산출물은 CLAUDE.md 파일 단 하나. Karpathy가 LLM 코딩의 함정에 대해 관찰한 내용을 정리한 것이다. GitHub에서 10,000 스타 이상의 레포는 전체의 상위 0.01%에 해당한다. 코드가 아니다. 바이너리가 아니다. 설치할 것도, 빌드할 것도, 실행할 것도 없다. 텍스트 파일을 복사해서 자기 프로젝트의 루트 디렉토리에 놓으면 끝이다. 그럼에도 10,000명 이상이 스타를 눌렀다. **CLAUDE.md라는 파일 형식 자체가 제품 카테고리가 되었다.** 과거에는 `.vimrc`나 `.emacs` 설정 파일을 dotfiles 레포에 공유하는 문화가 있었지만, dotfiles 레포가 10,000 스타를 받는 경우는 mathiasbynens/dotfiles (30k) 같은 극소수의 전설적 레포뿐이었고, 그마저도 수년에 걸쳐 축적된 숫자다. andrej-karpathy-skills는 한 주 만에 2,230 스타를 추가했다.

**luongnv89/claude-howto**는 24,002 스타에 주간 +7,342. "Visual, example-driven guide to Claude Code with copy-paste templates"라는 설명이 이 레포의 성격을 정확히 요약한다. 전통적으로 소프트웨어 문서는 제품에 부속되는 것이었다. 제품이 먼저 있고, 문서가 뒤따른다. claude-howto는 이 관계를 뒤집는다. 문서 자체가 제품이다. Claude Code라는 원본 제품은 Anthropic이 만들었지만, "Claude Code를 효과적으로 사용하는 법"이라는 지식 제품은 커뮤니티가 만들고 있다. 주간 +7,342는 이번 주 GitHub 전체 상위 10위 안에 드는 성장 속도다. 기업이 만든 오픈소스 프레임워크, 새로운 프로그래밍 언어와 어깨를 나란히 하는 것이 "복사해서 붙여넣는 가이드"라는 사실. 현재 개발자 생태계가 갈증을 느끼는 것은 더 좋은 모델이 아니라, 지금 있는 모델을 더 잘 쓰는 방법이다.

**YishenTu/claudian**은 6,815 스타. Claude Code의 물리적 표면(surface area)을 확장하는 도구다. Obsidian vault 안에 Claude Code를 삽입해서, 에이전트가 코드 에디터에만 살지 않고 사용자의 사고 공간(thinking space)까지 진입한다. 에이전트가 터미널에만 있을 때의 교체 비용과, 에디터+터미널+지식관리 도구를 관통할 때의 교체 비용은 차원이 다르다.

**Yeachan-Heo/oh-my-codex**는 이번 주의 가장 중요한 데이터 포인트다. 19,938 스타, 주간 +9,737 — GitHub 전체에서 두 번째로 빠른 성장. 그런데 이 레포는 Claude Code가 아니라 OpenAI의 Codex를 위한 것이다. 이름부터 의미심장하다. "Oh My"라는 접두사는 [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)에서 왔다. 자신이 "Codex 위의 사용자 지식 층"이라는 정체성을 선언한 것이다.

한국인 개발자 Yeachan-Heo가 메인테이너이며, 세 가지 핵심 기능을 제공한다. hooks는 에이전트가 특정 행동을 수행하기 전이나 후에 사용자 정의 로직을 실행하는 메커니즘이다 — 사실상 에이전트에 대한 거버넌스(governance)다. agent teams는 단일 에이전트가 아니라 설계, 구현, 테스트를 각각 담당하는 여러 에이전트를 조율하는 구조를 만든다. HUD는 에이전트 시스템의 상태를 실시간으로 관찰할 수 있게 하는 인터페이스다. 이 조합은 coding agent의 사용 패러다임이 "나와 에이전트의 1:1 대화"에서 "내가 에이전트 팀을 운영하는 관리자"로 진화하고 있음을 시사한다.

만약 superpowers, andrej-karpathy-skills, claude-howto, claudian만 트렌딩에 올랐다면, 이 현상을 "Claude Code 특수 현상"으로 해석할 수 있었을 것이다. oh-my-codex가 이 해석을 불가능하게 만든다. **같은 패턴이 다른 모델로 전이됐다.** 이것은 특정 제품의 현상이 아니라 카테고리 수준의 현상이다. coding agent라는 도구 범주 전체에서 "운영 지식 층"이 형성되고 있다는 증거다.

---

## 2. CLAUDE.md — 자연어 설정 파일이 만든 폭발

다섯 레포를 관통하는 가장 놀라운 사실은, 핵심 산출물이 코드가 아니라 텍스트라는 것이다.

소프트웨어 역사에서 "도구의 행동을 사용자가 정의하는 파일"은 항상 존재했다. Unix의 `.profile`, Emacs의 `.emacs`, Vim의 `.vimrc`, Zsh의 `.zshrc`. 하지만 이전 세대의 설정 파일은 전용 문법이나 프로그래밍 언어를 요구했다. Emacs Lisp을 모르면 다른 사람의 `.emacs`를 이해할 수 없었고, 복사해 와도 충돌이 나거나 원치 않는 동작이 발생했다.

CLAUDE.md는 이 전통에서 결정적으로 도약했다. 자연어로 작성된다. "커밋 메시지는 영어로 작성할 것", "테스트를 먼저 작성하고 구현할 것" — 프로그래밍 언어를 모르는 사람도 읽고, 수정하고, 공유할 수 있다. 진입 장벽이 사실상 사라졌다. 이것이 andrej-karpathy-skills의 폭발적 성장을 설명한다. `.emacs` 파일이 10,000 스타를 받으려면 수년이 걸렸지만, CLAUDE.md는 한 주에 2,230 스타를 추가했다.

더 결정적인 차이는 영향 반경이다. `.vimrc`는 키 바인딩, 탭 크기 같은 기계적 동작의 파라미터를 조정한다. CLAUDE.md는 에이전트의 판단 체계를 변경한다. "코드가 길어질 때는 함수로 분리할 것", "바로 구현하지 말고 먼저 설계를 확인할 것" — 이것은 파라미터가 아니라 가치관이다. 같은 요청에 대해 완전히 다른 산출물이 나올 수 있다. 이전 글에서 다룬 harness 개념으로 해석하면, CLAUDE.md는 harness의 가장 바깥 층이다. harness가 에이전트의 "어떻게(how)"를 구조화한다면, CLAUDE.md는 에이전트의 "무엇을(what)"과 "왜(why)"를 규정한다.

이 파일의 경제적 레버리지도 주목할 만하다. andrej-karpathy-skills의 CLAUDE.md를 적용한 세션에서 에이전트가 흔한 실수를 한 번 덜 저지르고, 그 디버깅에 30분이 절약된다면 — 10,000명이 주당 한 번씩 그 혜택을 받을 때 연간 절약되는 개발자 시간의 가치는 막대하다. 전통적인 라이브러리가 "코드의 재사용"을 가능하게 했다면, CLAUDE.md 생태계는 "운영 지식의 재사용"을 가능하게 한다.

[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)(180,000+ 스타)가 Zsh 위에 커뮤니티 지식 층을 올린 것처럼, superpowers는 Claude Code 위에, oh-my-codex는 Codex 위에 같은 층을 올리고 있다. 구조를 비교하면 이렇다.

| | Zsh + oh-my-zsh | Claude Code + superpowers |
|---|---|---|
| 기반 도구 | Zsh 셸 | Claude Code |
| 지식 층 | oh-my-zsh 플러그인/테마/설정 | superpowers skills/methodology |
| 설정 파일 | .zshrc | CLAUDE.md |
| 핵심 가치 | 셸을 더 잘 쓰는 법의 결정화 | 에이전트를 더 잘 쓰는 법의 결정화 |

차이는 두 가지다. 첫째, 속도. oh-my-zsh가 180,000 스타에 17년 걸렸다. superpowers는 이미 143,712이고 하루 2,299씩 늘고 있다. 둘째, 레버리지. `.zshrc`가 바꾸는 것은 프롬프트 모양과 자동완성이다. CLAUDE.md가 바꾸는 것은 에이전트의 의사결정 체계다.

이 흐름을 넓은 역사에 놓으면 세 번의 질적 전환이 보인다. 시대 1은 IDE 플러그인(2010년대 VS Code extensions) — 도구에 기능을 부착하는 것이었다. 시대 2는 프롬프트 엔지니어링(2023~2024년) — "어떻게 질문해야 좋은 답이 나오는가"를 탐구했지만, 지식이 일회성이었다. 세션이 끝나면 증발했다. 시대 3이 지금이다. 사용자의 운영 지식이 파일에 담기고, 그 파일이 에이전트의 행동을 지속적으로 규정한다. 한 번 CLAUDE.md에 적으면 모든 세션에서 작동한다. 지식이 증발하지 않는다. 결정화(crystallize)된다.

| | 시대 1: 플러그인 | 시대 2: 프롬프트 | 시대 3: 운영 지식 |
|---|---|---|---|
| 시기 | 2010s | 2023~2024 | 2026~ |
| 대상 | 에디터 | LLM | Coding Agent |
| 확장의 형태 | 코드(확장 프로그램) | 텍스트(일회성 프롬프트) | 텍스트(지속적 지침) |
| 도구의 성격 | 중립적(사용자 입력 반영) | 반응적(질문에 답변) | 자율적(지침에 따라 판단) |

핵심 차이는 도구가 자율적이라는 것이다. IDE는 사용자가 시킨 대로 한다. LLM은 물어본 것에 답한다. Coding agent는 목표를 주면 스스로 판단하고 행동한다. 자율적인 도구에게는 "기능"이 아니라 "판단 기준"을 주어야 한다. 그래서 운영 지식의 형태가 코드 플러그인도, 일회성 프롬프트도 아닌, 지속적 지침 파일이 된 것이다.

---

## 3. 기존 moat 논의의 확장 — 개인 맥락에서 집단 운영 지식으로

지난번 글 "복제당해도 살아남는 에이전트의 조건"에서 나는 세 가지 해자를 논했다. 맥락의 축적, 피드백 플라이휠, 깊은 통합. 이 세 해자는 여전히 유효하다. 그런데 2026년 4월의 현상은, 이 프레임워크가 놓치고 있는 새로운 층을 드러낸다.

**이전 글의 해자는 모두 개인 수준에서 작동한다.** 내 CLAUDE.md에 쌓인 맥락, 내 플라이휠의 관성, 내 워크플로우의 통합. 강력한 lock-in이지만, A라는 개발자의 맥락은 B라는 개발자에게 전이되지 않는다.

그런데 superpowers, andrej-karpathy-skills, claude-howto, oh-my-codex가 보여주는 것은 다른 차원이다. 개인의 운영 지식이 파일로 결정화되고, GitHub을 통해 공유되고, 수천 명의 사용자에게 즉시 적용된다. 개인의 맥락이 집단의 지식이 되는 과정이다.

| 층위 | 이전 글의 moat | 이번 글의 새로운 moat |
|---|---|---|
| 단위 | 개인/팀 | 커뮤니티/생태계 |
| 형태 | 암묵지(tacit knowledge) | 형식지(explicit knowledge) |
| 저장 매체 | 사용자 프로필, 대화 히스토리 | CLAUDE.md, skills, templates |
| 전이 가능성 | 불가능 (해자의 핵심) | 가능 (지식의 결정화) |
| 축적 속도 | 개인의 사용 시간에 비례 | 커뮤니티의 기여 속도에 비례 |

2026년 4월 현재, GitHub에서 관찰되는 현상을 하나의 개념으로 요약하면 **"집단 운영 지식 층(collective operational knowledge layer)"**이 된다.

```
[개인 사용자의 맥락] ← 이전 글의 moat
        ↑
[집단 운영 지식 층: superpowers, karpathy-skills, claude-howto, oh-my-codex] ← 이번 글의 주제
        ↑
[Harness/Agent 소프트웨어: Claude Code, Codex CLI]
        ↑
[Foundation Model: Opus 4.6, GPT-5.x 등]
```

두 층은 대립하는 것이 아니라 보완한다. 집단 운영 지식이 "기본 수준(baseline)"을 끌어올리고, 개인 맥락이 그 위에서 개인화를 추가한다.

구체적으로 설명하자. 한 개발자가 Claude Code를 쓰기 시작한다. 먼저 superpowers를 설치하고, andrej-karpathy-skills의 CLAUDE.md를 프로젝트에 복사한다. 이것으로 "커뮤니티가 검증한 모범 사례"가 즉시 적용된다. 몇 주간 사용하면서 개인 맥락이 쌓인다 — "이 프로젝트에서는 이 패턴을 쓰지 않는다", "이 팀은 리뷰 코멘트를 한국어로 단다" 같은 것들. 동시에 이 개발자가 발견한 새로운 모범 사례가 있다면, GitHub에 PR로 올리거나 자체 skills 레포를 만들어 공유한다.

이 순환이 돌수록 세 가지가 동시에 강화된다. Claude Code라는 제품의 가치, 개인 사용자의 switching cost, 그리고 커뮤니티 전체의 지식 수준. 세 바퀴가 맞물려 돌아가는 복합 플라이휠이다.

---

## 4. 양면 해석: 네트워크 효과 vs 모범사례의 상품화

여기까지 읽으면 "결국 Anthropic이 가장 큰 수혜자 아닌가"라는 결론으로 흐를 수 있다. 맞다. 하지만 이야기의 절반만 맞다.

**해석 A — Anthropic의 네트워크 효과.** superpowers가 Claude Code를 더 잘 작동하게 만들수록 실질적 성능은 올라간다. andrej-karpathy-skills가 LLM 코딩의 함정을 교정해줄수록 만족도는 높아진다. claude-howto가 진입 장벽을 낮출수록 신규 사용자 확보가 용이해진다. claudian이 Obsidian으로 표면을 확장할수록 서식지가 넓어진다. 이 모든 것은 Anthropic이 직접 만들지 않은 것들이다. npm 패키지가 Node.js의 가치를 높인 것과 같은 구조다. CLAUDE.md라는 이름 자체가 사실상의 표준(de facto standard)이 되면서 생태계를 선점하고 있다. andrej-karpathy-skills의 핵심 산출물이 CLAUDE.md라는 이름을 달고 있다는 사실 자체가, Anthropic의 브랜드가 이 생태계의 기본값(default)이 되었음을 보여준다.

**해석 B — 모범사례의 상품화(commoditization of best practices).** 반대 방향의 해석도 성립한다. 과거에 "Claude Code를 잘 쓰는 법"은 파워 유저만이 가진 경쟁 우위였다. 수백 시간의 시행착오를 거쳐 CLAUDE.md를 다듬고, skills를 정의하고, 워크플로를 최적화한 사람들. 이들은 같은 모델을 써도 초보자보다 현저히 나은 결과를 얻었다. 지금 일어나고 있는 일은 이 경쟁 우위의 민주화다. andrej-karpathy-skills를 복사해서 붙여넣으면 어제 처음 쓰기 시작한 사람도 파워 유저의 지침을 즉시 적용할 수 있다. 이전에 희소했던 운영 지식이 무료로 배포되면서 희소성을 잃는다. 모든 사람이 "잘 쓰는 법"을 알게 되면, "잘 쓰는 법"은 더 이상 차별화 요소가 아니라 기본값이 된다.

더 중요한 것은 이 부분이다 — 운영 지식이 상품화되면, 그 지식은 플랫폼에 종속되지 않는다. oh-my-codex가 증명하듯, 같은 패턴이 Codex에도 적용된다. superpowers의 방법론 — brainstorming 먼저, plan 먼저, verification 필수 — 은 어떤 coding agent에든 적용 가능한 범용 지식이다. 운영 지식이 모델에 종속되지 않는 이상, 그 축적이 특정 모델의 lock-in을 강화하지 않을 수 있다.

이것이 Anthropic에 어떤 의미를 갖는가? 긍정적 방향에서, 기본값의 수준이 올라가면 제품 전체의 만족도가 올라가고 불만족 이탈이 줄어든다. 부정적 방향에서, 사용자가 범용 운영 지식을 체화하면 Claude Code에서 Codex로, 또는 아직 등장하지 않은 새로운 agent로 이동하는 마찰이 줄어든다.

**현실은 해석 A와 B가 동시에 작동한다.** 네트워크 효과와 상품화는 모순되지 않는다. 같은 현상의 두 면이다. 단기적으로는 해석 A가 우세하다 — CLAUDE.md라는 이름이 생태계에 고착됐고, skills가 Claude Code에 최적화돼 있으며, 이 생태계에서 다른 agent로 이동하려면 지금까지 쌓인 skills와 templates를 전부 새 환경에 맞게 변환해야 한다. 장기적으로는 해석 B가 부상할 가능성이 있다. oh-my-codex가 이미 그 방향의 첫 번째 신호다. "모든 coding agent를 위한 superpowers"가 등장하는 것은 시간 문제일 수 있다. 어느 쪽이 우세해질지는 지금 판단할 수 없다. 3개월 뒤, 6개월 뒤의 데이터가 필요하다.

---

## 5. 왜 지금, 왜 동시에 — 그리고 열린 질문들

다섯 레포가 같은 주에 동시 트렌딩한 것은 우연이 아니다. 세 가지 구조적 조건이 동시에 충족됐다.

**첫째, coding agent 사용자 인구의 임계점 도달.** 메타 도구가 필요해지려면 기반 도구의 사용자가 충분히 많아야 한다. oh-my-zsh가 등장한 것도 Zsh 사용자가 일정 규모 이상이 된 후였다. superpowers의 143,712 스타는 이 도구를 사용해본 사람이 최소 수십만 명은 된다는 것을 시사한다.

**둘째, "잘 쓰는 법"의 격차가 가시화됐다.** coding agent를 처음 쓰는 사람과 6개월간 써온 사람의 생산성 격차는 체감될 수준으로 크다. 이전 글에서 다룬 Maganti의 사례 — 같은 사람이, 같은 모델로, 같은 프로젝트를 만들었는데, 첫 번째 시도(운영 지식 없음)는 전량 폐기, 두 번째 시도(운영 지식 축적 후)는 성공적 출시 — 가 이를 보여준다.

**셋째, 공유 마찰의 제거.** GitHub는 이미 20년 넘게 코드 공유의 인프라로 기능해왔지만, CLAUDE.md라는 파일 형식의 등장은 새로운 종류의 공유를 가능하게 했다. 코드가 아니라 지식을 공유하는 것이다. 기존에 운영 지식을 공유하려면 블로그 글을 쓰고, 읽고, 해석하고, 수동으로 적용해야 했다. 마찰이 컸다. CLAUDE.md는 이 마찰을 제거했다. "읽고 이해하고 적용하는" 3단계가 "복사해서 붙여넣는" 1단계로 축약되었다. 이 마찰의 제거가 공유의 속도를 폭발적으로 높인 것이다.

이 현상이 매일 코드를 쓰는 개발자에게 주는 실무적 시사점도 있다. CLAUDE.md에 투자하라 — 빈 CLAUDE.md로 Claude Code를 쓰고 있다면, 성능의 상당 부분을 낭비하고 있는 것이다. andrej-karpathy-skills를 포크해서 프로젝트의 맥락에 맞게 수정하고, 에이전트와의 상호작용에서 "이건 아니었다"는 순간이 생기면 그 교훈을 반영하라. CLAUDE.md를 Git에 커밋하고 변경 이유를 기록하라 — 이 이력이 쌓이면, 그 자체로 팀의 에이전트 운영 히스토리가 된다. 그리고 에이전트가 강력해질수록 hooks를 설정해서 에이전트의 행동을 제한하는 메커니즘도 강화하라. 이것은 권한 관리이자 리스크 관리다.

이 정리 위에서, 열린 질문을 던진다.

**질문 1 — 운영 지식 층은 모델에 종속될 것인가, 범용화될 것인가?** 현재 superpowers는 Claude Code에, oh-my-codex는 Codex에 최적화돼 있다. "모든 coding agent에 적용 가능한 범용 운영 지식 프레임워크"가 등장할 것인가? 범용화되면 lock-in이 약화되고, 분리가 유지되면 각 생태계의 lock-in이 강화된다.

**질문 2 — CLAUDE.md는 표준이 될 것인가?** Claude Code는 CLAUDE.md를, Codex는 AGENTS.md를 사용한다. HTML이 웹의 표준이 된 것처럼, 에이전트 지침 파일의 표준 형식이 등장할 것인가?

**질문 3 — 운영 지식의 "생성"을 자동화할 수 있는가?** 에이전트 자체가 자기의 운영을 관찰하고, 실패 패턴을 감지하고, 최적의 지침을 자동으로 제안한다면? 현재의 정적 지식을 동적 학습으로 전환하는 것이다. superpowers 다음 세대의 도구가 이 방향을 탐색할 가능성이 있다.

**질문 4 — 당신은 이 생태계에 참여하고 있는가?** 당신의 CLAUDE.md는 비어 있는가, 아니면 수개월간 다듬어진 운영 지식이 담겨 있는가? 당신은 남들이 만든 skills를 소비만 하고 있는가, 아니면 당신의 발견을 환원하고 있는가? 이 생태계는 사용자의 기여로 성장한다. 생태계의 수준이 올라가면, 그 생태계에서 당신이 받는 도구와 지식의 품질도 올라간다.

이전 글의 결론이 "당신의 에이전트는 사용할수록 나아지는가?"였다면, 이번 글의 결론은 하나 더 추가된다. **"당신의 운영 지식은 결정화되고 있는가? 그리고 그 결정체는 다른 사람에게 도달하고 있는가?"**

에이전트의 moat은 모델에 있지 않다. 모델 위에 쌓이는 운영 지식 — 개인의 맥락과 집단의 지식이 결합된 층 — 에 있다. 2026년 4월 10일 주간, 다섯 개의 레포가 동시에 그 사실을 가리켰다. 이 방향이 어디까지 갈지는 아직 알 수 없다. 다만 한 가지는 확실하다 — 모델을 잘 만드는 것과 모델을 잘 쓰는 법을 아는 것은 완전히 다른 역량이고, 후자에 대한 시장이 지금 폭발하고 있다.

---

출처:
- [obra/superpowers](https://github.com/obra/superpowers) — GitHub, 143,712 stars, +2,299/day (2026-04-10 기준)
- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) — GitHub, 10,441 stars, +1,364/day, +2,230/week
- [luongnv89/claude-howto](https://github.com/luongnv89/claude-howto) — GitHub, 24,002 stars, +7,342/week
- [YishenTu/claudian](https://github.com/YishenTu/claudian) — GitHub, 6,815 stars, +200/day
- [Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) — GitHub, 19,938 stars, +9,737/week
- [ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) — GitHub, 180,000+ stars (비교 참조)
- Sebastian Raschka, [Components of a Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent) — 이전 글에서 인용한 harness 프레임워크
- Lalit Maganti, [Building syntaqlite with AI](https://lalitm.com/post/building-syntaqlite-ai/) — 이전 글에서 인용한 운영 사례
