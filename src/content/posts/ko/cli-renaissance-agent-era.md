---
title: 'CLI 르네상스 — AI 에이전트 시대, 터미널이 다시 세상의 중심이 된 이유'
description: 'GUI의 시대는 끝나지 않았다. 하지만 AI 에이전트에게 버튼을 클릭하라고 시킬 수는 없다. 2026년, 개발자들이 사랑해온 CLI 도구들이 AI 에이전트의 "손과 발"이 되면서, 터미널이 다시 소프트웨어 개발의 중심으로 돌아왔다.'
pubDate: 2026-03-07T13:38:19.735Z
lang: ko
pairSlug: 'cli-renaissance-agent-era'
draft: true
sourceDir: draft
---
# CLI 르네상스 — AI 에이전트 시대, 터미널이 다시 세상의 중심이 된 이유

> GUI의 시대는 끝나지 않았다. 하지만 AI 에이전트에게 버튼을 클릭하라고 시킬 수는 없다. 2026년, 개발자들이 사랑해온 CLI 도구들이 AI 에이전트의 "손과 발"이 되면서, 터미널이 다시 소프트웨어 개발의 중심으로 돌아왔다.

---

## 1. 왜 지금, CLI인가

CLI(Command Line Interface)는 컴퓨팅의 가장 오래된 인터페이스다. 1970년대 Unix 셸에서 시작해 반세기를 살아남았다. 그런데 2025년부터 기묘한 현상이 벌어지고 있다. **CLI가 단순히 살아남는 것이 아니라, 폭발적으로 성장하고 있다.**

The New Stack은 2025년 말 기사에서 이 현상을 **"Agentic CLI Era(에이전틱 CLI 시대)"**라고 명명했다. 2025년 Stack Overflow 설문에서 Vim/Neovim 사용률이 합산 38.3%로 전년 대비 상승한 것도, 개발자들이 터미널 기반 워크플로우로 회귀하고 있음을 보여주는 신호다.

이유는 단순하다. **AI 에이전트에게 CLI는 가장 자연스러운 인터페이스**이기 때문이다.

API를 직접 호출하려면 인증 헤더, 페이지네이션, 에러 핸들링, SDK 버전 관리 등의 보일러플레이트가 필요하다. MCP(Model Context Protocol) 서버를 사용하면 도구 스키마만으로 수만 토큰이 소비된다. 하지만 CLI는? LLM이 이미 수십억 줄의 터미널 상호작용 데이터로 훈련되어 있다. `git`, `docker`, `kubectl`, `gh` — **모델의 훈련 데이터 자체가 CLI의 문서**인 셈이다.

한 실무자의 말이 이 상황을 정확히 요약한다.

> "The model already knows how to use grep. It doesn't need a JSON schema to tell it."

모델은 이미 grep 사용법을 알고 있다. JSON 스키마로 설명해줄 필요가 없다.

---

## 2. 개발자가 사랑하는 CLI 도구들 — 카테고리별 정리

현재 개발자들이 일상적으로 사용하는 CLI 도구들을 카테고리별로 살펴보자. 이 도구들 각각이 AI 에이전트의 "스킬"이 되고 있다.

### 클라우드 CLI — 인프라를 터미널에서

| 도구 | 대상 | 킬러 피처 |
|------|------|----------|
| **aws** | AWS (200+ 서비스) | `--query` JMESPath로 출력 필터링, 가장 넓은 서비스 커버리지 |
| **gcloud** | Google Cloud | 가장 일관된 명령어 설계, `gcloud run deploy --source .` 한 줄 배포 |
| **az** | Microsoft Azure | Azure AD/Entra ID 통합, 엔터프라이즈 환경에 최적 |
| **vercel** | Vercel | `vercel` 한 단어로 프레임워크 감지→빌드→배포 완료 |
| **flyctl** | Fly.io | `fly launch --now`로 Docker 감지→글로벌 엣지 배포 |
| **railway** | Railway | `railway up`으로 Dockerfile 없이 배포, 월 1천만 배포 처리 |

이 중 `gcloud`는 3대 클라우드 CLI 중 가장 잘 설계되었다는 평가를 받는다. 모든 서비스가 `gcloud [서비스] [리소스] [동작]`이라는 일관된 패턴을 따른다. AI 에이전트가 새로운 서비스의 명령어를 **추론**하기 쉬운 구조다.

```bash
# gcloud: 일관된 패턴의 예
gcloud compute instances list
gcloud run services list
gcloud functions list
# 패턴이 동일하다 → 에이전트가 추론 가능
```

### Git 플랫폼 CLI — PR과 이슈를 터미널에서

**gh (GitHub CLI)** — 42,900 스타, v2.87.3 (2026년 2월)

GitHub의 공식 CLI는 Claude Code가 가장 많이 사용하는 외부 도구 중 하나다. PR 생성, 이슈 관리, Actions 확인, 코드 리뷰까지 브라우저를 열 필요가 없다.

```bash
# PR 생성부터 자동 머지까지 한 줄
gh pr create --fill && gh pr merge --auto --squash

# JSON 출력으로 필요한 필드만 추출
gh pr list --json number,title,state | jq '.[] | select(.state=="OPEN")'
```

`gh`의 `--json` 플래그는 AI 에이전트 시대에 특히 빛난다. 사람이 읽기 좋은 테이블 출력 대신, 기계가 파싱하기 쉬운 JSON을 반환한다. 필드 선택까지 가능해서 불필요한 토큰 소비를 최소화한다.

**glab (GitLab CLI)** — GitLab 공식 CLI

```bash
# MR 생성 + CI 상태 실시간 모니터링
glab mr create --fill --yes && glab ci status --live
```

`glab ci view`는 CI/CD 파이프라인 상태를 터미널에서 실시간으로 보여준다. GitLab UI를 열지 않고도 실패한 job의 로그를 즉시 확인할 수 있다.

### 컨테이너/인프라 CLI — 인프라를 코드로

| 도구 | GitHub 스타 | 킬러 피처 |
|------|------------|----------|
| **docker** | 71,500 | `docker compose up` — YAML 한 장으로 멀티서비스 환경 구축 |
| **kubectl** | 110,000+ | `kubectl apply -f` — 선언적 상태 관리의 표준 |
| **terraform** | 47,900 | `terraform plan` — 인프라 변경의 diff 미리보기 |
| **pulumi** | 21,000 | 실제 프로그래밍 언어(TS/Python/Go)로 IaC 작성 |

Terraform의 `plan` → `apply` 패턴은 AI 에이전트에게 특히 중요하다. 에이전트가 인프라를 변경하기 전에 **무엇이 바뀌는지 먼저 확인**할 수 있기 때문이다. gws의 `--dry-run`, `gh`의 `--dry-run` 등 많은 CLI 도구가 이 패턴을 채택하고 있다.

### 패키지/런타임 CLI — 빠르고, 더 빠르게

| 도구 | 특징 | 속도 |
|------|------|------|
| **npm** | 250만+ 패키지, Node.js 기본 탑재, `npx`로 설치 없이 실행 | 기준선 |
| **bun** | 올인원 런타임+번들러+테스트+패키지매니저 | npm 대비 20~40x 빠른 install |
| **cargo** | Rust 빌드시스템, 테스트·벤치마크·문서 통합 | 동급 최강 통합 경험 |
| **uv** | Rust 기반 Python 패키지매니저, pip 대체 | pip 대비 10~100x 빠른 install |

**uv**는 2024년 출시 이후 2025년에 폭발적으로 채택되었다. GitHub 스타 75,000개 이상. pip, pip-tools, virtualenv, pyenv, poetry를 **단일 바이너리 하나로 대체**한다. FastAPI, Pydantic 등 주요 Python 프로젝트가 uv를 채택했다.

```bash
# uv: Python 프로젝트 초기화부터 실행까지
uv init myproject && uv add fastapi uvicorn && uv run fastapi dev
```

**Bun**은 2025년 12월 Anthropic에 인수되었다 — Anthropic 역사상 첫 인수다. Claude Code가 Bun 실행 파일로 빌드되어 배포되기 때문이다. JavaScript 런타임이 AI 에이전트 인프라가 된 상징적 사건이다.

---

## 3. 2025~2026년, 새로 등장한 CLI 도구들

2025년부터 2026년 3월까지, CLI 도구 시장에 전례 없는 출시 러시가 벌어졌다. 특히 **AI 코딩 에이전트 CLI**가 새로운 카테고리를 형성했다.

### AI 코딩 에이전트 CLI — 터미널 위의 AI 전쟁

| 도구 | 출시 | GitHub 스타 | 핵심 특징 |
|------|------|------------|----------|
| **Claude Code** (Anthropic) | 2025.2 프리뷰, 2025.5 GA | 26,000+ | 가장 얇은 래퍼. Bash 도구로 기존 CLI 활용. $25억 연간 매출 |
| **Codex CLI** (OpenAI) | 2025.4 | 오픈소스(Rust) | 3단계 승인 모드(read-only/auto/full). 로컬 에이전트 |
| **Gemini CLI** (Google) | 2025.6 | 70,000+ | 가장 관대한 무료 티어. 100만 토큰 컨텍스트. 확장 마켓 |
| **Copilot CLI** (GitHub) | 2025.9 프리뷰, 2026.2 GA | 구독제 | 멀티모델(Claude/GPT/Gemini). Autopilot 모드 |
| **Goose** (Block/Square) | 2025.1 | 30,000+ | MCP 네이티브. Linux Foundation에 기부 |
| **OpenCode** | 2025 | 95,000+ | Go 기반, 75+ 모델 지원(Ollama 포함). 무료 |
| **Aider** | 2023~, 2025 대폭 업데이트 | 41,600 | Git-first 설계. AI 변경 = 자동 커밋 |

The New Stack의 2026년 가이드에 따르면 현재 **15개 이상의 진지한 AI 코딩 CLI 도구**가 경쟁 중이다. 1년 전만 해도 이 카테고리 자체가 존재하지 않았다.

**Claude Code의 성장세가 특히 주목할 만하다.** 2025년 5월 정식 출시 후 6개월 만에 연간 매출 10억 달러를 돌파했고, 현재는 약 25억 달러 수준이다. ChatGPT가 비슷한 매출에 도달하는 데 약 2년이 걸렸다는 점을 생각하면 놀라운 속도다. Netflix, Spotify(직원 2/3 채택), KPMG, L'Oreal, Salesforce가 사용 중이다.

### 생산성/플랫폼 CLI — "Agent First"의 물결

| 도구 | 출시 | 핵심 |
|------|------|------|
| **gws** (Google Workspace CLI) | 2026.3 | Drive·Gmail·Sheets·Calendar 통합, MCP 서버 내장, 100+ 에이전트 스킬 |
| **Jules Tools** (Google) | 2026.2 | Jules 비동기 에이전트의 CLI 동반자. 병렬 실행, diff 뷰어 |
| **Warp 2.0** | 2025.6 | "최초의 에이전틱 개발 환경." 터미널 자체에 AI 에이전트 통합 |

**gws(Google Workspace CLI)**는 출시 3일 만에 GitHub 스타 14,500개를 기록하며 Hacker News 1위에 올랐다. Google의 Discovery Service를 런타임에 읽어 명령어를 동적 생성하는 아키텍처가 핵심이다. Vercel CEO Guillermo Rauch는 이를 보고 **"2026 is the year of Skills & CLIs"**라고 선언했다.

---

## 4. CLI vs API vs MCP — 토큰 효율성의 냉정한 숫자

AI 에이전트가 CLI를 선호하는 가장 현실적인 이유는 **토큰 비용**이다. 벤치마크 데이터가 이를 명확히 보여준다.

### MCP의 숨겨진 비용

MCP 서버는 에이전트의 컨텍스트 윈도우에 도구 스키마를 로딩한다. 문제는 이 스키마가 **작업 시작 전에** 수만 토큰을 소비한다는 점이다.

| 시나리오 | MCP 토큰 소비 | CLI 토큰 소비 | 차이 |
|----------|-------------|-------------|------|
| GitHub 작업 (93개 도구 스키마) | ~55,000 | ~0 (훈련 데이터) | **275x** |
| 멀티서버 (GitHub+DB+Jira) | ~150,000+ | ~2,000 | **75x** |
| Intune 컴플라이언스 작업 | 82,300 | ~6,700 | **12x** |
| 파일 변환 작업 | 기준 | -40% | **1.4x** |

Jannik Reinhard의 벤치마크가 가장 극적이다. 동일한 Intune 컴플라이언스 작업을 수행할 때:

- **MCP 접근**: 시스템 프롬프트 + 스키마에 82,300 토큰 소비. 128K 윈도우 중 추론에 사용 가능한 토큰은 45,700개. 3~4번의 도구 호출 후 컨텍스트 고갈로 **에이전트 추론이 붕괴**.
- **CLI 접근**: 약 6,700 토큰만 소비. 121,300 토큰이 추론에 사용 가능. 단일 세션에서 엣지 케이스까지 **선제적으로 처리 완료**.

결과는 **35배의 토큰 사용량 차이**다. 토큰 효율성 점수(Token Efficiency Score)에서도 CLI(202점)가 MCP(152점)를 **33% 앞섰다.**

### 왜 이런 차이가 나는가

**1. 제로 스키마 오버헤드.** CLI는 도구 정의를 컨텍스트에 로딩할 필요가 없다. LLM이 이미 훈련 데이터에서 `git`, `docker`, `kubectl`, `aws`, `gh` 등의 사용법을 학습했기 때문이다. 컨텍스트 윈도우의 95%가 실제 추론에 사용 가능하다.

**2. 선택적 출력.** CLI는 파이프라인(`cmd1 | cmd2 | jq '.field'`)으로 셸 수준에서 출력을 필터링한다. 모델에 전달되는 것은 필요한 데이터만이다. API/MCP는 전체 구조화된 응답을 반환하고, 모델이 직접 파싱해야 한다.

**3. 조합 가능성.** CLI 파이프라인은 중간 토큰 소비 없이 여러 작업을 체이닝한다. MCP는 각 도구 호출마다 별도의 라운드트립이 필요하다.

**4. 출력 포맷의 효율.** 같은 데이터라도 포맷에 따라 토큰 소비가 크게 달라진다. Pretty 테이블은 동일 JSON 대비 **10배 더 많은 토큰**을 소비한다. `gh pr list --json number,title,state`처럼 필드를 지정하면 토큰 소비를 극적으로 줄일 수 있다.

### Anthropic의 해결책 — Tool Search

Anthropic도 MCP의 토큰 문제를 인식하고 **Tool Search Tool**을 개발했다. 모든 도구를 사전 로딩하는 대신, 필요한 도구만 검색해서 로딩하는 방식이다.

- 전체 로딩: ~77,000 토큰 소비
- Tool Search (지연 로딩): ~8,700 토큰 소비
- **결과: 컨텍스트 윈도우의 95% 보존**

정확도도 극적으로 개선되었다. Claude Opus 4의 MCP 평가 정확도가 49%에서 74%로 뛰었다. 이는 토큰 비용뿐 아니라, **컨텍스트 오염 자체가 모델 성능을 저하**시킨다는 증거다.

Claude Code는 도구 설명이 컨텍스트 윈도우의 10%를 초과하면 자동으로 사전 로딩에서 검색 기반 로딩으로 전환한다.

---

## 5. Claude Code는 어떻게 CLI를 활용하는가

Claude Code의 아키텍처는 Anthropic이 **"do the simple thing first(단순한 것부터 하라)"**라고 부르는 원칙 위에 서 있다. 정교한 커스텀 도구를 만드는 대신, **가장 얇은 래퍼로 Claude의 네이티브 능력을 살린다.**

핵심 도구는 사실상 셸 접근이다. Claude Code는 모델에게 Bash 도구, 파일 읽기/쓰기 도구를 제공하고, 환경에 설치된 모든 CLI 도구를 자유롭게 사용하게 한다.

```
사용자: "이 PR의 CI 실패 원인 찾아서 고쳐줘"

Claude Code의 실행 흐름:
1. gh pr view 123 --json statusCheckRollup    ← GitHub CLI
2. gh run view 456789 --log-failed            ← 실패 로그 확인
3. Read src/api/handler.ts                     ← 파일 읽기
4. Edit src/api/handler.ts                     ← 버그 수정
5. npm test                                    ← 테스트 실행
6. git add -p && git commit                    ← 커밋
7. gh pr comment 123 --body "Fixed..."         ← PR에 코멘트
```

이 전체 흐름에서 Claude Code가 GitHub API를 직접 호출하는 순간은 **한 번도 없다**. `gh` CLI가 이미 인증되어 있고, 페이지네이션, 에러 핸들링, 출력 포맷팅을 모두 처리하기 때문이다. API를 직접 호출하면 필요했을 인증 헤더, URL 구성, JSON 파싱 코드가 전부 불필요해진다.

이것이 바로 **"모든 CLI는 암묵적 MCP 서버다"**라는 철학이다. CLI 도구 하나하나가 이미 인증, 입력 검증, 출력 포맷팅, 에러 핸들링을 갖춘 완성된 인터페이스다. MCP 서버를 별도로 만들 필요가 없다 — CLI가 이미 그 역할을 하고 있다.

Alexis Gallagher는 2026년 1월 에세이 "Why Claude Code Won (for now)"에서 이렇게 분석했다.

> "Claude Code won *not despite but because of* the command line. The CLI is a uniquely flexible environment from another era of computing — the only preinstalled integration environment where two independently authored programs can easily combine and interact."

CLI라는 인터페이스가 바로 **승리의 원인**이라는 것이다. 두 개의 독립적 프로그램이 쉽게 결합하고 상호작용할 수 있는, 사전 설치된 유일한 통합 환경 — 그것이 커맨드라인이다.

---

## 6. MCP vs CLI — 양자택일이 아닌 공존

MCP를 버리고 CLI만 쓰라는 뜻은 아니다. **각각이 빛나는 영역이 다르다.**

### CLI가 유리한 경우
- 에이전트가 **이미 알고 있는** 도구를 사용할 때 (git, docker, aws, gh...)
- 토큰 효율성이 중요한 긴 작업에서
- Unix 파이프라인으로 **조합**이 필요한 경우
- 로컬 개발 환경에서

### MCP가 유리한 경우
- CLI가 **존재하지 않는** 서비스 (Figma, Notion, 커스텀 비즈니스 API)
- 세밀한 RBAC과 OAuth가 필요한 **엔터프라이즈** 환경
- 상태 유지가 필요한 **멀티스텝** 워크플로우
- 셸 접근이 없는 환경 (모바일, 챗 인터페이스)
- 에이전트의 환각된(hallucinated) 플래그를 **방지**해야 할 때

Sentry 공동 창업자 David Cramer의 정리가 현실적이다.

> "If skills teach you to cook, MCP provides the instruments that let you do it."

그의 실제 셋업은 MCP 서버 2개 + Skills 12개의 **하이브리드** 구성이다. 도구 광신은 금물이고, 상황에 맞는 최적의 조합을 찾는 것이 정답이다.

**Google Workspace CLI(gws)**는 이 공존의 모범 사례다. 동시에 세 가지 역할을 수행한다:
1. **인간용 CLI** — 터미널에서 직접 명령어 실행
2. **MCP 서버** — `gws mcp -s drive,gmail,calendar`로 MCP 호환 앱에 연결
3. **Skills 제공자** — 100+ 에이전트 스킬로 자연어 조작 지원

하나의 도구가 CLI, MCP, Skills 세 패러다임을 모두 지원하는 것 — 이것이 2026년 도구 설계의 방향이다.

---

## 7. 전략적 움직임들 — 빅테크의 CLI 베팅

CLI 르네상스가 단순한 유행이 아님을 보여주는 전략적 움직임들이 있다.

**Anthropic의 Bun 인수 (2025.12)** — Anthropic 역사상 첫 인수가 JavaScript 런타임이었다. Claude Code가 Bun으로 빌드되기 때문이다. AI 회사가 CLI 인프라에 투자하는 시대.

**Google의 이중 CLI 전략** — Gemini CLI(2025.6)로 AI 코딩 에이전트를, gws(2026.3)로 Workspace 에이전트를 각각 출시. 터미널을 Google 생태계의 통합 접점으로 만들고 있다.

**GitHub Copilot CLI GA (2026.2)** — Microsoft/GitHub도 터미널 네이티브 에이전트에 전면 진입. Claude Opus 4.6, GPT-5.3-Codex, Gemini 3 Pro를 동시 지원하는 멀티모델 전략.

**MCP의 Linux Foundation 기부 (2025.12)** — Anthropic이 만든 MCP가 OpenAI, Google, Microsoft, AWS, Block(Goose)의 참여 하에 벤더 중립 표준이 되었다. CLI와 MCP의 공존이 산업 표준으로 자리잡는 과정.

**Warp 2.0 (2025.6)** — "최초의 에이전틱 개발 환경." 터미널 자체에 AI 에이전트(Oz)를 통합. 2025년 한 해 동안 32억 줄의 코드가 Warp에서 편집되었다.

---

## 8. 개발자에게 — 지금 해야 할 것

CLI 르네상스는 개발자에게 구체적인 행동을 요구한다.

### 이미 사용 중인 CLI 도구를 깊이 알라

`gh`, `git`, `docker`, `kubectl`, `aws` — 이미 설치된 도구들의 **고급 기능**을 익혀야 한다. `gh pr list --json`의 필드 선택, `aws --query`의 JMESPath 필터, `kubectl`의 JSONPath — 이것들이 AI 에이전트의 효율성을 결정한다.

### 새로운 CLI 도구를 시도하라

- **uv** — Python 환경 관리를 하고 있다면 지금 당장 전환할 가치가 있다
- **bun** — npm 대비 20~40배 빠른 패키지 설치
- **gws** — Google Workspace를 터미널에서 관리 (아직 실험적이지만 방향성은 확실)

### AI 코딩 CLI를 하나 이상 채택하라

Claude Code, Gemini CLI, Codex CLI, Aider, OpenCode — 최소 하나는 일상 워크플로우에 통합해야 한다. 2026년 기준, AI 코딩 CLI 없이 개발하는 것은 IDE 없이 코딩하는 것과 같은 핸디캡이다.

### CLI를 만드는 사람이라면 — 에이전트를 고려하라

서비스 CLI를 만들거나 유지보수하고 있다면:
- `--json` 출력 옵션은 이제 선택이 아닌 필수다
- `--dry-run`으로 파괴적 작업의 미리보기를 제공하라
- 스키마 인트로스펙션(`schema` 서브커맨드)을 고려하라
- **에이전트가 사용한다고 가정하고 설계하라**

---

## 마무리 — 가장 오래된 인터페이스가 가장 새로운 인터페이스가 되다

CLI의 역사는 반세기다. 그 반세기 동안 CLI는 한 번도 죽지 않았다. GUI가 등장해도, 웹이 등장해도, 모바일이 등장해도, 노코드가 등장해도 — 터미널은 항상 거기 있었다.

하지만 2025~2026년에 일어나고 있는 것은 단순한 생존이 아니다. **CLI가 소프트웨어 인터페이스의 최전선으로 재배치되고 있다.** AI 에이전트라는 새로운 사용자가 등장했고, 이 사용자에게 가장 효율적인 인터페이스가 바로 CLI이기 때문이다.

Claude Code의 연간 매출 25억 달러. Gemini CLI의 70,000 스타. gws의 출시 3일 만에 14,500 스타. OpenCode의 95,000 스타. 숫자가 트렌드를 증명하고 있다.

**2026년, 터미널은 더 이상 "파워 유저의 도구"가 아니다. AI 에이전트와 인간이 공존하는 소프트웨어 개발의 중심 무대다.** 가장 오래된 인터페이스가, 가장 새로운 시대의 기본 인터페이스가 되었다.
