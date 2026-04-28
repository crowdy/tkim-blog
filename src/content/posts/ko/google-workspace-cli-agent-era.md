---
title: 'CLI의 귀환 — Google Workspace CLI(gws)가 보여주는 "Agent First CLI" 시대'
description: '2026년, Google이 Gmail·Drive·Sheets·Calendar를 하나의 커맨드라인으로 통합했다. 그런데 이 CLI의 진짜 사용자는 인간이 아니라 AI 에이전트다. 출시 3일 만에 GitHub 스타 14,500개, Hacker News 1위 — CLI가 돌아왔다. 다만, 예전과는 완전히 다른 이유로.'
pubDate: 2026-03-07T13:25:58.000Z
lang: ko
pairSlug: 'google-workspace-cli-agent-era'
draft: false
sourceDir: posted
---
# CLI의 귀환 — Google Workspace CLI(gws)가 보여주는 "Agent First CLI" 시대

> 2026년, Google이 Gmail·Drive·Sheets·Calendar를 하나의 커맨드라인으로 통합했다. 그런데 이 CLI의 진짜 사용자는 인간이 아니라 AI 에이전트다. 출시 3일 만에 GitHub 스타 14,500개, Hacker News 1위 — CLI가 돌아왔다. 다만, 예전과는 완전히 다른 이유로.

---

## 1. CLI가 다시 돌아왔다 — 그런데 이번엔 좀 다르다

CLI(Command Line Interface)는 죽지 않았다. 오히려 부활하고 있다.

2020년대 초반, 노코드·로코드 플랫폼의 전성기에 CLI는 "개발자들의 낡은 도구" 취급을 받았다. Zapier와 Make가 드래그 앤 드롭으로 워크플로우를 만들고, Notion과 Airtable이 GUI로 모든 걸 해결하는 세상에서, 터미널에 명령어를 치는 행위는 시대착오적으로 보였다.

그런데 AI 에이전트 시대가 열리면서 상황이 완전히 뒤집어졌다. **AI 에이전트에게 GUI는 비효율의 극치다.** 에이전트는 버튼을 클릭하거나 드래그 앤 드롭을 할 필요가 없다. 구조화된 입력을 넣고, 구조화된 출력을 받는 것 — 그것이 에이전트에게 가장 자연스러운 인터페이스다. 그리고 그것이 바로 CLI다.

Vercel CEO Guillermo Rauch는 gws 출시 직후 X(Twitter)에 이렇게 선언했다.

> **"2026 is the year of Skills & CLIs"**

CLI가 인간 운영자와 AI 에이전트 모두의 클라우드 서비스 상호작용 **기본 인터페이스**가 되고 있다는 선언이다. 그리고 Google이 이 흐름의 한가운데에 뛰어들었다.

---

## 2. gws란 무엇인가 — 하나의 CLI로 Google Workspace 전체를

2026년 3월 5일, Google의 `googleworkspace` GitHub 조직 아래에서 **Google Workspace CLI(명령어: `gws`)**가 공개되었다. Rust로 작성되고, npm으로 배포되며, Apache 2.0 라이선스의 오픈소스다.

```bash
npm install -g @googleworkspace/cli
```

이 한 줄이면 설치가 끝난다. 그리고 이 하나의 CLI로 접근할 수 있는 서비스 목록이 압도적이다.

| 서비스 | 할 수 있는 일 |
|--------|--------------|
| **Google Drive** | 파일·폴더 CRUD, 권한 관리, 검색 |
| **Gmail** | 메시지 읽기·전송, 라벨 관리, 스레드 검색 |
| **Google Calendar** | 이벤트 생성·수정, 캘린더 관리 |
| **Google Sheets** | 스프레드시트 생성, 셀 읽기·쓰기, 범위 조작 |
| **Google Docs** | 문서 생성·편집 |
| **Google Chat** | 스페이스 관리, 메시지 전송 |
| **Admin Console** | 사용자·그룹·디바이스 관리 |
| **+ 20개 이상** | YouTube, Forms, Classroom 등 |

여기서 핵심은 **이 명령어들이 정적으로 코딩된 것이 아니라는 점**이다. gws는 Google의 Discovery Service를 런타임에 읽어서 명령어 표면(command surface)을 **동적으로 생성**한다. Google이 새로운 API를 추가하면, gws는 코드 변경 없이 24시간 캐시 갱신 후 자동으로 해당 API를 지원한다. 이것은 기존 CLI 도구들과 근본적으로 다른 접근법이다.

**모든 출력은 JSON이다.** 인간 친화적인 테이블 포맷이 아니라, 기계가 파싱하기 쉬운 구조화된 데이터가 기본이다. gws의 설계자가 직접 밝힌 철학이 이것을 단적으로 보여준다.

> "Humans hate writing nested JSON in the terminal. Agents prefer it."

인간은 터미널에서 중첩된 JSON 쓰기를 싫어한다. 에이전트는 그걸 선호한다. gws는 에이전트를 위해 만들어진 CLI다.

단, 중요한 주의사항이 있다. gws는 **공식 Google 제품이 아니다.** GitHub 저장소에 "Not an officially supported Google product"라고 명시되어 있으며, GIGAZINE은 이를 "특정 직원들이 운영하는 취미 지향 프로젝트(hobby-oriented project run by certain employees)"라고 묘사했다. 현재 버전은 0.4.4로, 아직 초기 단계다.

---

## 3. 실제 사용 예시 — 터미널에서 Workspace를 조종하다

gws의 실제 사용감을 살펴보자. 먼저 인증 설정부터 시작한다.

```bash
# 최초 1회: Google Cloud 프로젝트 생성 + API 활성화 (자동)
gws auth setup

# OAuth 로그인
gws auth login
```

이후부터는 Workspace 전체가 터미널 안에 들어온다.

### Drive — 파일 관리

```bash
# 최근 파일 10개 조회
gws drive files list --params '{"pageSize": 10}'

# 파일 업로드
gws drive files create --json '{"name": "report.pdf"}' --upload ./report.pdf

# 전체 파일 스트리밍 (자동 페이지네이션)
gws drive files list --params '{"pageSize": 100}' --page-all | jq -r '.files[].name'
```

### Sheets — 스프레드시트 조작

```bash
# 새 스프레드시트 생성
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'

# 셀 범위 읽기
gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1:C10"}'

# 데이터 추가
gws sheets spreadsheets values append \
  --params '{"spreadsheetId": "ID", "range": "Sheet1!A1", "valueInputOption": "USER_ENTERED"}' \
  --json '{"values": [["Name", "Score"], ["Alice", 95]]}'
```

### Chat — 메시지 전송 (dry-run 지원)

```bash
# 실제 전송 전 미리보기
gws chat spaces messages create \
  --params '{"parent": "spaces/xyz"}' \
  --json '{"text": "Deploy complete."}' \
  --dry-run
```

### API 스키마 확인

```bash
# 특정 API 메서드의 파라미터 구조 확인
gws schema drive.files.list
```

`--dry-run`으로 실제 실행 전 요청을 미리 확인할 수 있고, `--page-all`로 페이지네이션을 자동 처리하며, `gws schema`로 API 구조를 즉시 인트로스펙션할 수 있다. 특히 `--dry-run`은 AI 에이전트가 파괴적 작업을 수행하기 전 안전장치로 활용할 수 있어, 에이전트 시대에 특히 유용한 기능이다.

---

## 4. AI 에이전트 스킬 — gws의 진짜 무기

gws의 CLI 기능만으로도 충분히 인상적이지만, **진짜 차별점은 100개 이상의 AI 에이전트 스킬**에 있다. Gmail, Drive, Sheets, Docs, Calendar, Chat, Admin을 커버하는 이 스킬들은 AI 에이전트가 Google Workspace를 자연어로 조작할 수 있게 해준다.

### 스킬 설치

```bash
# 전체 스킬 설치
npx skills add https://github.com/googleworkspace/cli

# 특정 서비스 스킬만 설치
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-drive
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-gmail
```

### MCP 서버 내장

gws에는 **MCP(Model Context Protocol) 서버가 내장**되어 있다. Claude Desktop, VS Code, Gemini CLI 등 MCP 호환 애플리케이션과 직접 연결이 가능하다. 이것이 의미하는 바는 크다 — Claude Code에서 "이번 달 영업 보고서 Drive에서 찾아서 요약해줘"라고 말하면, Claude가 gws MCP 서버를 통해 Drive를 검색하고, 파일을 읽고, 요약을 생성할 수 있다는 뜻이다.

### 주요 AI 에이전트 연동

| 에이전트 플랫폼 | 연동 방식 |
|----------------|----------|
| **Claude Desktop / Claude Code** | MCP 서버 직접 연결 |
| **Gemini CLI** | `gemini extensions install` |
| **OpenClaw** | 스킬 심볼릭 링크 |
| **VS Code (Copilot)** | MCP 프로토콜 |

Gemini CLI와의 연동은 특히 흥미롭다.

```bash
gws auth setup
gemini extensions install https://github.com/googleworkspace/cli
```

이 두 줄이면 Gemini가 Google Workspace 전체에 접근할 수 있게 된다. Google 입장에서는 자사 AI와 자사 생산성 도구를 CLI 하나로 연결하는 전략적 포석이기도 하다.

Hacker News의 한 댓글은 이 접근법의 효율성을 이렇게 평가했다.

> "MCPs are bloated, insecure token hogs. CLIs are easy to write."

MCP 서버를 별도로 구축하는 것보다 CLI 기반 접근이 토큰 효율적이고 유지보수가 쉽다는 주장이다. gws는 MCP 서버를 내장하면서도, CLI 자체가 에이전트의 도구로 기능하는 이중 구조를 취하고 있다.

---

## 5. gcloud와 뭐가 다른가 — 설계 철학의 근본적 차이

"이미 gcloud가 있는데 왜 또 CLI를 만들었나?" — 가장 자주 나오는 질문이다. 답은 단순하다. **대상 자체가 다르다.**

| 항목 | gws | gcloud |
|------|-----|--------|
| **대상 서비스** | Google Workspace (Drive, Gmail, Sheets 등) | Google Cloud Platform (Compute, Storage, BigQuery 등) |
| **API 커버리지** | Discovery Service에서 동적 생성 → 자동 업데이트 | 정적 명령어 세트 → 수동 업데이트 |
| **설계 철학** | **Agent First** — JSON 입출력 기본 | **Human First** — 플래그 기반, 읽기 쉬운 출력 |
| **에이전트 스킬** | 100+ 내장 | 없음 |
| **MCP 지원** | 내장 | 없음 |
| **인증** | 자체 OAuth + gcloud 연동 가능 | Google Cloud SDK 인증 |
| **언어** | Rust | Python |
| **배포** | npm | 독립 설치 프로그램 |

gcloud는 인간 DevOps 엔지니어가 클라우드 인프라를 관리하기 위한 도구다. `gcloud compute instances list`를 치면 사람이 읽기 좋은 테이블이 나온다. 반면 gws는 처음부터 AI 에이전트가 Google Workspace 데이터를 조작하기 위한 도구로 설계되었다. 모든 입력은 `--json`과 `--params`로 구조화되어 있고, 모든 출력은 파싱 가능한 JSON이다.

**동적 API 생성이라는 아키텍처 선택도 핵심적이다.** gcloud는 새로운 GCP 서비스가 추가될 때마다 CLI 팀이 명령어를 수동으로 구현해야 한다. gws는 Google의 Discovery Service를 런타임에 읽기 때문에, Google Workspace에 새 API가 추가되면 자동으로 반영된다. 이 차이는 에이전트 생태계에서 결정적이다 — 에이전트는 항상 최신 API에 접근할 수 있다.

한 마디로 정리하면: **gcloud는 인간을 위한 Cloud CLI이고, gws는 에이전트를 위한 Workspace CLI다.** 경쟁이 아니라 보완 관계다.

---

## 6. Zapier/Make 킬러인가? — 경쟁 구도와 비용 방정식

gws 출시 후 즉각적으로 제기된 질문이 있다. "이거 Zapier/Make 대체하는 거 아닌가?"

결론부터 말하면, **직접적 대체재는 아니지만, 특정 사용 시나리오에서는 확실히 위협적**이다.

| 항목 | gws CLI | Zapier | Make |
|------|---------|--------|------|
| **비용** | 무료 (오픈소스) | 월 $49~ (Pro) | 월 $16~ (Core) |
| **통합 방식** | CLI + JSON, 직접 API 호출 | GUI 워크플로우 빌더 | 시각적 시나리오 빌더 |
| **대상 사용자** | 개발자, AI 에이전트 | 비기술~기술 사용자 모두 | 비기술~기술 사용자 모두 |
| **연동 범위** | Google Workspace만 | 7,000+ 앱 | 2,000+ 앱 |
| **AI 에이전트 연동** | MCP 서버 내장, 100+ 스킬 | 별도 AI 플러그인 | AI 모듈 제공 |
| **자동화 방식** | 자연어 프롬프트 → CLI 명령 | 트리거-액션 체인 | 시각적 시나리오 |

**gws가 유리한 시나리오:**
- Google Workspace 내부에서 완결되는 자동화 (Gmail → Sheets → Calendar)
- AI 에이전트가 주도하는 워크플로우
- 비용에 민감한 스타트업이나 개인 개발자
- 프롬프트 한 줄로 복잡한 작업을 수행하고 싶은 경우

**Zapier/Make가 여전히 강한 시나리오:**
- Salesforce, Slack, HubSpot 등 Google 외부 앱과의 연동
- 비개발자가 자동화를 구축해야 하는 경우
- 엔터프라이즈급 에러 핸들링과 모니터링이 필요한 경우

워크플로우 자동화 SaaS 시장은 2023년 약 138억 달러에서 2028년 265억 달러로 성장할 전망이다. gws가 이 시장을 직접 잠식하기보다는, **AI 에이전트를 통한 자동화라는 새로운 카테고리를 열면서** 기존 플레이어들의 전략 수정을 강제하는 역할을 할 것이다.

특히 주목할 점은 비용 구조의 차이다. Zapier Pro가 월 49달러, Make Core가 월 16달러인 반면, gws는 완전 무료다. Google Workspace를 주로 사용하는 팀이라면, AI 에이전트 + gws 조합이 월 수십~수백 달러의 자동화 비용을 절감할 수 있다. "단일 시스템 프롬프트로 엔드투엔드 워크플로우 오케스트레이션"이 가능해지면서, 서드파티 라우터를 거칠 필요가 사라지는 시나리오가 현실화되고 있다.

---

## 7. 커뮤니티 반응과 한계 — 열광과 현실 사이

### 폭발적 반응

gws의 커뮤니티 반응은 이례적이었다.

- **Hacker News #1** — 936포인트, 289개 댓글
- **GitHub 스타** — 출시 3일 만에 **14,500개** 돌파
- **Vercel CEO Guillermo Rauch**가 직접 X에서 추천
- **VentureBeat, Ars Technica, PCWorld, MarkTechPost** 등 주요 테크 미디어 일제히 보도

Hacker News의 한 댓글은 gws를 이렇게 비유했다.

> "This is like terraform, but for Google Drive files."

인프라를 코드로 관리하듯, Google Workspace 데이터를 CLI로 관리하는 시대가 왔다는 것이다.

### 냉정한 현실 — OAuth 설정의 벽

그러나 열광 뒤에는 냉정한 현실이 있다. **가장 많이 논의된 이슈는 OAuth 인증 설정의 복잡성**이다.

gws를 사용하려면 먼저 Google Cloud Console에서 프로젝트를 생성하고, OAuth 동의 화면을 설정하고, 클라이언트 ID를 만들어야 한다. `gws auth setup`이 이 과정을 자동화하려 하지만, 현실은 녹록지 않다.

**주요 이슈들:**

1. **Google Cloud 프로젝트 생성 필요** — 비기술 사용자에게는 넘기 어려운 첫 번째 장벽이다. Hacker News의 한 사용자는 이렇게 토로했다. *"All of that went away when I realized you need to create an app in GCP."*

2. **스코프 과다 문제** — 기본 추천 스코프가 85개 권한을 요청한다. 미검증 앱은 약 25개 스코프로 제한되어 인증 실패가 빈발한다. 해결책은 `gws auth login --scopes drive,gmail,sheets`로 필요한 서비스만 지정하는 것이다.

3. **Advanced Protection 사용자 차단** — Google의 고급 보호 프로그램을 사용하는 계정은 `policy_enforced` 오류로 완전히 차단된다.

4. **설정 소요 시간** — 한 사용자가 공식 문서를 따라가며 기본 설정에 **45분이 소요**되었다고 보고했다.

5. **OAuth 클라이언트 유형 주의** — 반드시 "Desktop app" 유형으로 생성해야 하며, 그렇지 않으면 `redirect_uri_mismatch` 오류가 발생한다.

### 구조적 리스크 — 공식 제품이 아닌 한계

gws의 가장 큰 구조적 리스크는 **공식 Google 제품이 아니라는 점**이다. Google 내부의 DevRel 팀 소속 개발자들의 프로젝트로, 정식 제품팀의 소유가 아니다. 이는 두 가지 우려를 낳는다.

- **장기 유지보수 불확실성** — Google의 "프로젝트 묘지(Google Graveyard)"는 유명하다. 공식 제품도 자주 중단되는 Google에서, 비공식 프로젝트의 수명을 어떻게 보장할 수 있는가?
- **프로덕션 의존성 위험** — 핵심 업무 자동화를 이 도구에 의존했다가, 어느 날 갑자기 유지보수가 중단될 수 있다.

현재 버전 0.4.4라는 숫자가 이 상태를 잘 말해준다. 가능성은 압도적이지만, 프로덕션 의존은 아직 시기상조다.

---

## 8. 시사점 — "Agent First CLI" 트렌드가 의미하는 것

gws는 단독 제품으로서의 의미를 넘어, **더 큰 트렌드의 신호탄**이다.

### 트렌드 1: CLI는 에이전트의 언어다

2025년 후반부터 뚜렷해진 패턴이 있다. **주요 SaaS가 앞다투어 CLI 또는 CLI 유사 인터페이스를 출시**하고 있다. 그 이유는 동일하다 — AI 에이전트에게 서비스를 노출하는 가장 효율적인 방법이 CLI이기 때문이다.

GUI는 인간의 시각·운동 능력에 최적화되어 있다. API는 개발자가 코드를 작성해야 한다. CLI는 그 중간 — **자연어에 가까운 명령 체계이면서, 동시에 완전히 구조화된 인터페이스**다. AI 에이전트가 가장 자연스럽게 사용할 수 있는 형태다.

### 트렌드 2: Discovery-based Architecture

gws의 동적 API 생성 방식은 앞으로 많은 CLI 도구가 따라할 패턴이다. API가 바뀔 때마다 CLI를 업데이트하는 것이 아니라, **API 스키마를 런타임에 읽어서 CLI를 자동 생성**한다. 이것은 에이전트 생태계에서 특히 중요하다 — 에이전트는 항상 최신 상태의 도구에 접근해야 하기 때문이다.

### 트렌드 3: 비용 구조의 전복

Zapier 월 49달러 vs gws 무료. 이 비용 차이가 시사하는 바는 크다. **플랫폼 기업들이 자사 생태계의 에이전트 접근성을 높이기 위해 통합 도구를 무료로 제공**하기 시작하면, 서드파티 자동화 플랫폼의 사업 모델이 근본적으로 도전받게 된다.

Google만의 이야기가 아니다. Microsoft가 Graph API의 에이전트 접근성을 높이고, Salesforce가 AI 에이전트용 CLI를 출시하는 것은 시간 문제다. Gartner는 2028년까지 기업 75%가 AI 에이전트를 운영화할 것으로 예측했다. 이 에이전트들이 사용할 도구의 제공자가 누구냐를 두고, 플랫폼 전쟁이 벌어지고 있다.

### 개발자에게 의미하는 것

gws의 출시가 개발자에게 던지는 메시지는 명확하다.

1. **CLI 역량을 재평가하라.** 에이전트 시대에 CLI는 "올드스쿨" 기술이 아니라 핵심 인터페이스 패러다임이다. 셸 스크립팅, JSON 처리, 파이프라인 구성 능력이 다시 중요해지고 있다.

2. **MCP를 이해하라.** gws의 MCP 서버 내장은 우연이 아니다. MCP는 AI 에이전트와 외부 도구를 연결하는 사실상의 표준이 되었다. 자신이 만드는 서비스에도 MCP 인터페이스를 제공하는 것을 고려해야 한다.

3. **"Agent First" 설계를 시작하라.** API를 설계할 때, 인간 개발자뿐 아니라 AI 에이전트를 일급 사용자(first-class citizen)로 고려하라. JSON 입출력, 스키마 인트로스펙션, dry-run 모드 — gws가 보여준 설계 패턴들이 기준이 될 것이다.

4. **인증 UX를 해결하라.** gws가 가장 크게 비판받은 지점이 OAuth 설정의 복잡성이었다. 아무리 좋은 도구도 설정에 45분이 걸리면 채택이 더뎌진다. 에이전트 시대의 인증 UX는 아직 미해결 과제다.

---

## 마무리 — CLI는 죽지 않았다, 진화했다

Google Workspace CLI의 출시는 하나의 도구 출시 이상의 의미를 가진다. 이것은 **소프트웨어 인터페이스의 패러다임이 전환되고 있다는 신호**다.

GUI → API → CLI. 이 순환이 다시 돌아온 것이 아니다. **GUI(인간용) + CLI(에이전트용)의 이중 인터페이스**가 새로운 표준이 되고 있다. 인간은 여전히 예쁜 화면에서 클릭하고, 에이전트는 그 뒤에서 CLI를 통해 실제 작업을 수행한다.

gws는 현재 버전 0.4.4의 실험적 프로젝트다. OAuth 설정은 복잡하고, 공식 제품도 아니다. 하지만 14,500개의 GitHub 스타와 Hacker News 1위라는 반응은 개발자 커뮤니티가 이 방향성에 동의하고 있음을 보여준다.

**2026년, CLI가 돌아왔다. 이번에는 AI 에이전트를 태우고.**

Google Workspace 30억 계정이 하나의 터미널 명령어로 열리는 세상. 그 열쇠가 아직은 좀 뻑뻑하지만, 문은 확실히 열렸다.
