# tkim-blog Daily Backfill Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** crowdy.dev 의 마지막 포스트 일자와 오늘 사이의 갭을 HN + GitHub Trending + Qiita 소재로 자동 채우는 프로젝트 전용 Claude Code 스킬을 만든다.

**Architecture:** `.claude/skills/tkim-blog-daily-backfill/SKILL.md` 단일 파일을 작성한다. 스킬은 본문에 명시된 워크플로(갭 탐지 → 소스 수집 → 토픽 선정 → 한국어 집필 → 일본어 번역 → 파일 쓰기 → 빌드 검증 → 단일 커밋 → 푸시)를 실행하는 모델에게 정확한 명령·규칙·템플릿을 제공한다. 마지막 작업은 빌드된 스킬을 실제 5/19~5/20 갭에 적용하는 통합 검증이다.

**Tech Stack:** Astro 5 (콘텐츠 스키마: zod), Node 22, Pretendard, GitHub Pages. 스킬 도구: Bash, Read, Write, Edit, WebFetch, AskUserQuestion. 외부 API: Hacker News firebaseio, github.com/trending HTML, qiita.com API v2.

---

## 파일 구조

| 경로 | 목적 | 작업 |
|---|---|---|
| `.claude/skills/tkim-blog-daily-backfill/SKILL.md` | 스킬 본체 | 신규 생성 (Task 1-5) |
| `src/content/posts/{ko,ja}/2026/05/19/<slug>.md` | 5/19 백필 포스트 4개 | 통합 검증에서 생성 (Task 6) |
| `src/content/posts/{ko,ja}/2026/05/20/<slug>.md` | 5/20 백필 포스트 4개 | 통합 검증에서 생성 (Task 6) |
| 기존 `docs/superpowers/specs/2026-05-21-daily-backfill-skill-design.md` | 디자인 스펙 | 변경 없음, 참조용 |

스킬 파일 한 개에 모든 워크플로·규칙·템플릿을 인라인으로 담는다. SKILL.md 안에서 spec 문서로의 외부 참조는 두지 않는다 — 스킬은 자체적으로 완결되어야 모델이 호출 시 추가 파일 읽기 없이 작업할 수 있다.

---

## Task 1: 스킬 디렉터리 및 스켈레톤 작성

**Files:**
- Create: `.claude/skills/tkim-blog-daily-backfill/SKILL.md`

- [ ] **Step 1: 디렉터리 존재 확인**

Run:
```bash
ls -la /root/dev/crowdy/tkim-blog/.claude/
```
Expected: `worktrees/` 디렉터리는 보이지만 `skills/` 는 없음. 다음 Step 에서 `mkdir -p` 한다.

- [ ] **Step 2: 디렉터리 생성**

Run:
```bash
mkdir -p /root/dev/crowdy/tkim-blog/.claude/skills/tkim-blog-daily-backfill
```
Expected: 에러 없이 종료.

- [ ] **Step 3: SKILL.md 스켈레톤 작성**

Write `/root/dev/crowdy/tkim-blog/.claude/skills/tkim-blog-daily-backfill/SKILL.md`:

````markdown
---
name: tkim-blog-daily-backfill
description: >
  crowdy.dev (이 리포지토리) 의 마지막 포스트 일자와 오늘 사이의 빈 날을
  Hacker News + GitHub Trending + Qiita 소재로 자동 백필한다. 한국어
  분석적 저널리즘 스타일(6000자 이상) + 일본어 번역본을 frontmatter
  유효한 형태로 src/content/posts/{ko,ja}/YYYY/MM/DD/<slug>.md 에
  직접 쓰고, npm run check && npm run build 로 검증한 뒤, 단일 커밋으로
  푸시한다. "백필", "backfill", "오늘 포스트", "today's post",
  "missing days", "블로그 빈 날 채워줘", "HN GitHub Qiita 분석"
  등의 키워드로 트리거한다.
allowed-tools: Bash, Read, Write, Edit, WebFetch, AskUserQuestion
---

# tkim-blog Daily Backfill

## Overview

(다음 Task 에서 채움)

## Workflow

### Step 1: 갭 탐지

(Task 2)

### Step 2: 소스 수집

(Task 2)

### Step 3: 토픽 선정

(Task 2)

### Step 4: 한국어 집필

(Task 3)

### Step 5: 일본어 번역

(Task 3)

### Step 6: 파일 쓰기

(Task 3)

### Step 7: 빌드 검증

(Task 2)

### Step 8: 단일 커밋

(Task 2)

### Step 9: 푸시

(Task 2)

## 에러 처리

(Task 4)

## 명시적 비범위 (YAGNI)

(Task 4)
````

- [ ] **Step 4: 스킬이 발견되는지 확인**

Claude Code 가 프로젝트 스킬을 자동 로드하는지 검증한다. `Skill` 툴로는 새 세션에서만 보이므로, 본 세션에서는 frontmatter 의 YAML 유효성만 검사한다:
```bash
cd /root/dev/crowdy/tkim-blog && python3 -c "
import yaml, re
content = open('.claude/skills/tkim-blog-daily-backfill/SKILL.md').read()
fm = re.match(r'^---\n(.*?)\n---', content, re.DOTALL).group(1)
data = yaml.safe_load(fm)
assert data['name'] == 'tkim-blog-daily-backfill'
assert 'description' in data
assert 'allowed-tools' in data
print('OK:', data['name'])
"
```
Expected: `OK: tkim-blog-daily-backfill`

- [ ] **Step 5: 커밋하지 않음 (마지막 Task 5 에서 한 번에 커밋)**

스킬은 한 파일이므로 빌드가 끝날 때까지 staging 만 보류. `git status` 로 변경사항만 확인:
```bash
git -C /root/dev/crowdy/tkim-blog status -s .claude/
```
Expected: `?? .claude/skills/tkim-blog-daily-backfill/SKILL.md`

---

## Task 2: 워크플로 Step 1-3, 7-9 채우기

**Files:**
- Modify: `.claude/skills/tkim-blog-daily-backfill/SKILL.md`

이 Task 에서 갭 탐지·소스 수집·토픽 선정·빌드 검증·커밋·푸시 섹션을 작성한다. (집필 관련 Step 4-6 은 Task 3.)

- [ ] **Step 1: Overview 섹션 채우기**

`## Overview` 아래에 다음을 삽입:

```markdown
이 스킬은 본 리포지토리 (`crowdy.dev` 의 소스) 에서만 활성화되는 프로젝트 전용 스킬이다. 현재 디렉터리가 `tkim-blog` 가 아니면 즉시 종료한다. 기준 일자는 `date +%Y-%m-%d` 의 출력값 (오늘) 이다.

워크플로 한눈에:
```
[1] 갭 탐지 → [2] 소스 수집 → [3] 토픽 선정 → [4] 한국어 집필 → [5] 일본어 번역
                                                                              ↓
                              [9] 푸시 ← [8] 단일 커밋 ← [7] 빌드 검증 ← [6] 파일 쓰기
```

기존 사용자 스킬 `tech-blog-pipeline` 과 별개로 운용한다. 본 스킬은 (a) 소스가 다르고 (HN + GitHub Trending + Qiita, Slack 없음), (b) 출력이 frontmatter 유효 형태로 리포지토리에 직접 들어가며, (c) 갭 탐지 → 자동 진행이라는 점이 차이다.
```

- [ ] **Step 2: Step 1 (갭 탐지) 채우기**

`### Step 1: 갭 탐지` 아래에 다음을 삽입:

````markdown
1. 현재 위치 확인:
   ```bash
   pwd
   # /root/dev/crowdy/tkim-blog 가 아니면 즉시 종료
   ```
2. 한국어 트리에서 최신 일자 찾기:
   ```bash
   find src/content/posts/ko -type d -regex '.*/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]$' \
     | sort | tail -1
   # 출력 예: src/content/posts/ko/2026/05/18
   ```
3. 오늘 일자:
   ```bash
   date +%Y-%m-%d
   ```
4. 마지막 일자 다음 날부터 오늘까지의 누락 일자 목록을 만든다 (예: 마지막 = 2026-05-18, 오늘 = 2026-05-21 → `[2026-05-19, 2026-05-20, 2026-05-21]`).
5. 누락이 0 일이면 "최신 상태입니다" 로 보고하고 즉시 종료.
6. 누락이 5 일 초과면 `AskUserQuestion` 으로 진행 여부 확인 후 진행.
````

- [ ] **Step 3: Step 2 (소스 수집) 채우기**

`### Step 2: 소스 수집` 아래에 다음을 삽입:

````markdown
세 소스를 병렬로 수집한다. 각 후보는 `{source, title, url, score, raw_date, summary}` 구조로 메모리에 보관한다.

#### 2-A: Hacker News

```bash
# 상위 50 건 ID
curl -s https://hacker-news.firebaseio.com/v0/topstories.json | jq '.[0:50]'

# 각 ID 의 상세
curl -s https://hacker-news.firebaseio.com/v0/item/<ID>.json \
  | jq '{title, url, score, descendants, by, time}'
```

필터:
- `score >= 100`
- `descendants >= 50`
- `time` (UNIX 초) 을 KST 일자로 변환했을 때 백필 대상 일자 범위 ±1 일

`url` 이 외부 사이트면 `WebFetch` 로 본문 요약을 가져온다. HN 토론을 인용하려면 `https://news.ycombinator.com/item?id=<ID>` 도 WebFetch.

#### 2-B: GitHub Trending

```bash
# WebFetch 사용 (HTML 직접 파싱)
# daily 와 weekly 둘 다 가져와 daily 우선
```
- `https://github.com/trending?since=daily`
- `https://github.com/trending?since=weekly`

각 페이지에서 상위 ~25 개 리포지토리의 이름·설명·언어·`Stars today` 를 추출한다. 단순 알고리즘 라이브러리보다 **트레이드오프가 명확한 도구** (예: pip 대체, ORM 대체, k8s 대안) 를 우선 후보로 표시.

#### 2-C: Qiita

```bash
curl -s 'https://qiita.com/api/v2/items?page=1&per_page=40&query=stocks:%3E10'
```
필터:
- `likes_count >= 20`
- `created_at` 이 백필 대상 일자 범위
- 일본 엔지니어 커뮤니티 특유의 관점 (운용 사례, 회사 도입 후기) 우선
````

- [ ] **Step 4: Step 3 (토픽 선정) 채우기**

`### Step 3: 토픽 선정` 아래에 다음을 삽입:

````markdown
선정 규칙 (우선순위 순):
1. **하루 한 건.** 누락된 날마다 한 토픽씩 배정.
2. **분석 깊이.** 단순 릴리스/속보보다 트레이드오프·전략·논쟁이 있는 주제.
3. **소스 다양성.** 백필 윈도에서 같은 소스가 연속되지 않도록 분산. 2 일 백필이면 가급적 다른 소스에서 한 건씩.
4. **중복 회피.** 최근 14 일치 포스트 슬러그·주제를 훑어 동일/유사 주제 배제:
   ```bash
   find src/content/posts/ko -type d -mtime -14 -path '*/2026/*' | sort
   ```
5. **날짜 매칭.** 후보의 `raw_date` 가 누락된 날과 일치하는 것을 우선 배정.

선정 결과를 다음 형태로 명시:
```
2026-05-19  [GitHub Trending] uv-pip-disruption       — uv 가 pip 을 대체할 것인가
2026-05-20  [Qiita]           rust-in-jp-enterprise   — 일본 대기업 Rust 도입 사례
```

5 일 초과 백필이거나 후보가 모호하면 `AskUserQuestion` 으로 사용자 확인. 그 외에는 자율 진행.
````

- [ ] **Step 5: Step 7 (빌드 검증) 채우기**

`### Step 7: 빌드 검증` 아래에 다음을 삽입:

````markdown
모든 파일을 쓴 후, 리포 루트에서:
```bash
npm run check && npm run build
```
- `check` 가 실패하면 어느 파일이 zod 스키마 위반인지 메시지에서 파싱해 사용자에게 보고하고 **커밋하지 않는다.**
- `build` 가 실패하면 어떤 markdown 파싱 에러인지 보고하고 **커밋하지 않는다.**
- 둘 다 통과해야 Step 8 로 진행.
````

- [ ] **Step 6: Step 8 (단일 커밋) 채우기**

`### Step 8: 단일 커밋` 아래에 다음을 삽입:

````markdown
`src/content/posts` 만 스테이징:
```bash
git add src/content/posts
```

커밋 메시지 패턴 (commit `b4a2d13` 의 양식):
```
post: backfill YYYY-MM-DD ~ YYYY-MM-DD (N days, ko/ja)

<백필 기간 전체를 관통하는 한 줄 요약>

- M/D <slug> — <한 줄 앵글>
- M/D <slug> — <한 줄 앵글>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

규칙:
- `--no-verify` 사용 금지
- N 일이 1 일이면 `(1 day, ko/ja)`, 2 일 이상이면 복수형
- HEREDOC 으로 메시지 전달
````

- [ ] **Step 7: Step 9 (푸시) 채우기**

`### Step 9: 푸시` 아래에 다음을 삽입:

````markdown
```bash
git push
git status   # nothing to commit, working tree clean 확인
```
원격이 거부 (앞섬) 하면 사용자에게 보고하고 자동 rebase 는 하지 않는다.
````

- [ ] **Step 8: YAML frontmatter 재검증**

Step 1-3, 7-9 를 추가한 뒤 파일이 여전히 유효한 markdown 인지 확인:
```bash
cd /root/dev/crowdy/tkim-blog && python3 -c "
import yaml, re
content = open('.claude/skills/tkim-blog-daily-backfill/SKILL.md').read()
fm = re.match(r'^---\n(.*?)\n---', content, re.DOTALL).group(1)
yaml.safe_load(fm)
# H2 섹션 카운트
h2_count = len(re.findall(r'^## ', content, re.MULTILINE))
h3_count = len(re.findall(r'^### Step ', content, re.MULTILINE))
print(f'H2: {h2_count}, Step sections: {h3_count}')
"
```
Expected: `H2: >= 4, Step sections: 9` 정도. (정확한 숫자는 Task 4 까지 진행 후 확정.)

---

## Task 3: 집필 규칙 (Step 4-6) 채우기

**Files:**
- Modify: `.claude/skills/tkim-blog-daily-backfill/SKILL.md`

- [ ] **Step 1: Step 4 (한국어 집필) 채우기**

`### Step 4: 한국어 집필` 아래에 다음을 삽입:

````markdown
**문체:** `である` 체의 한국어 분석체 (요지: 신문 논설보다 조금 더 길고, 트레이드오프가 명시적이며, 1인칭 감상문이 아닌 톤). 6000자 이상.

**구성 (필수 5 섹션):**
```markdown
# <기사 제목 — frontmatter title 과 정확히 일치>

> <리드 질문 1-2 문장. "X 는 Y 인가, Z 인가" 형식 권장>

## 도입

500-800 자. 배경과 맥락. 구체 사건/데이터/발표를 기점으로 시작.

## <본문 1 제목 — 현상 분석>

1500-2000 자. 무엇이 일어나고 있는가. 기술적 사실과 데이터.
관련 기업/프로젝트/커뮤니티의 동향. 출처가 있는 인용 포함.

## <본문 2 제목 — 심층 분석>

1500-2000 자. 왜 이런 일이 일어나는가. 구조적 원인과 배경.
기존 접근법과의 비교, 기술적 트레이드오프 분석.
HN 댓글이나 전문가 의견을 직접 인용.

## <본문 3 제목 — 전망과 시사점>

1000-1500 자. 이것이 의미하는 바. 실무자/엔지니어에게 주는 시사점.
향후 전개 시나리오 (낙관/비관/현실적).

## 결론

500-800 자. 리드 질문에 대한 답변 또는 열린 결론.
독자에게 던지는 후속 질문이나 행동 제안.

---
출처:
- <url 1>
- <url 2>
```

**집필 체크리스트:**
1. 리드 질문이 분석적 질문인가 (단순 정의형 X)
2. 팩트와 분석이 명확히 분리되는가
3. 구체 수치·코드·인용이 본문에 들어가는가
4. 글자 수가 6000자 이상인가 (한국어 공백 포함):
   ```bash
   wc -m <file> | awk '{print $1}'
   ```
5. 첫 줄 `# Title` 이 frontmatter `title` 과 완전히 동일한가
````

- [ ] **Step 2: Step 5 (일본어 번역) 채우기**

`### Step 5: 일본어 번역` 아래에 다음을 삽입:

````markdown
한국어 원고를 완성한 뒤에 일본어로 변환한다. 직역이 아닌 의역.

**규칙:**
- 문체: `である` 조. 분석 기사에 어울리는 단단한 톤.
- 기술 용어: 일본 엔지니어 커뮤니티 표기를 우선
  - 例: `쿠버네티스` → `Kubernetes`, `컨테이너` → `コンテナ`, `오픈소스` → `オープンソース`
- 고유 명사: 영어 표기 유지 (`OpenAI`, `Docker`, `Kubernetes`, `Anthropic` 등)
- 리드 질문: 의문형 유지, 독자를 끌어들이는 효과 보존
- `~ですます` 체는 사용 금지, `である` 로 통일
- 한국어판에 없는 일본 독자용 보충이 필요하면 본문에 자연스럽게 끼워넣는다 (각주 사용 금지)
- 구조 (H1, 리드 질문 blockquote, 5 개 H2) 는 1:1 유지
- 본문 첫 줄 `# Title` 은 일본어판 `title` 과 정확히 일치
````

- [ ] **Step 3: Step 6 (파일 쓰기) 채우기**

`### Step 6: 파일 쓰기` 아래에 다음을 삽입:

````markdown
각 날짜마다 ko/ja 두 파일을 쓴다. 경로:
```
src/content/posts/<lang>/YYYY/MM/DD/<slug>.md
```

**Frontmatter 템플릿 (한국어):**
```yaml
---
title: '한국어판 제목'
description: '리드 질문 또는 1-2 문장 훅. 리스트와 RSS 에 노출됨.'
pubDate: 2026-05-19T00:00:00.000Z
lang: ko
pairSlug: <slug>
draft: false
---
```

**Frontmatter 템플릿 (일본어):** 동일 구조, `title`/`description` 일본어로 교체, `lang: ja`.

**주의사항:**
1. **백슬래시·작은따옴표가 들어가면 double-quoted YAML.** 예:
   ```yaml
   title: "Qwen 3.7 Preview — 오픈 가중치의 정체성과 'Arena 점수' 라는 통화"
   description: "..."
   ```
   single-quoted 안에서는 single-quote 를 `''` 로 이스케이프해야 하므로, 따옴표·백슬래시가 있으면 항상 double-quoted 사용 (이 컨벤션은 본 리포의 다른 시리즈에서 검증됨).
2. **pubDate 는 해당 날짜의 UTC 자정:** `2026-05-19T00:00:00.000Z`. 오늘 시각이 아님.
3. **pairSlug 는 ko/ja 동일.** 슬러그는 kebab-case 영문 (예: `uv-pip-disruption`).
4. **draft: false** 로 즉시 배포.
5. **slug 충돌 검사:**
   ```bash
   find src/content/posts -name '<slug>.md' | head
   ```
   결과가 있으면 즉시 실패하고 사용자에게 보고.
6. 본문 첫 줄 `# Title` 이 frontmatter `title` 과 정확히 동일.

**파일 쓰기 순서:**
1. ko 파일 작성 → 글자 수 확인 (`wc -m`) → 6000자 미달이면 본문 보강
2. ja 파일 작성
3. 모든 날짜·언어 파일이 완성된 뒤 Step 7 (빌드 검증) 로 진행
````

- [ ] **Step 4: YAML 재검증**

Task 2 의 Step 8 과 같은 명령으로 frontmatter 가 여전히 유효한지 확인:
```bash
cd /root/dev/crowdy/tkim-blog && python3 -c "
import yaml, re
content = open('.claude/skills/tkim-blog-daily-backfill/SKILL.md').read()
fm = re.match(r'^---\n(.*?)\n---', content, re.DOTALL).group(1)
yaml.safe_load(fm)
print('OK')
"
```
Expected: `OK`

---

## Task 4: 에러 처리, YAGNI, 트리거 키워드 채우기

**Files:**
- Modify: `.claude/skills/tkim-blog-daily-backfill/SKILL.md`

- [ ] **Step 1: 에러 처리 섹션 채우기**

`## 에러 처리` 아래에 다음을 삽입:

````markdown
| 상황 | 동작 |
|---|---|
| 갭 0 일 | "최신 상태입니다 (마지막 포스트: YYYY-MM-DD)" 보고 후 종료 |
| 누락 > 5 일 | `AskUserQuestion` 으로 진행 여부 확인 |
| HN/GH/Qiita 접근 실패 | 즉시 실패. 무음 폴백 금지. 어느 소스가 죽었는지 보고 |
| `pairSlug` 가 기존 포스트와 충돌 | 즉시 실패, 사용자에게 슬러그 변경 요청 |
| 본문 6000 자 미달 | 본문 보강 후 재검사 (Step 4 의 글자 수 체크에 걸려야 함) |
| 첫 줄 `# Title` ≠ frontmatter `title` | 자동 정렬 후 재확인 |
| `npm run check` 실패 | 커밋하지 않고 위반 파일·필드 보고 |
| `npm run build` 실패 | 커밋하지 않고 markdown 파싱 에러 보고 |
| 푸시 거부 (원격 앞섬) | 사용자에게 보고. 자동 rebase 금지 |
````

- [ ] **Step 2: YAGNI 섹션 채우기**

`## 명시적 비범위 (YAGNI)` 아래에 다음을 삽입:

````markdown
다음은 의도적으로 지원하지 않는다. 사용자가 요청해도 별도 작업으로 분리할 것:

- `en` 번역 (현재 패턴은 ko + ja 만)
- 하루 다건 작성
- 토픽 큐 / 후보 캐시 (실행마다 새로 수집)
- cron 자동 실행 (사용자가 별도로 `/schedule` 로 구성)
- 드래프트 프리뷰 (`draft: true` 단계 거치지 않음)
- Slack 脳内同期 통합 (`tech-blog-pipeline` 의 영역)
- 이미지 삽입·자동 다이어그램 생성
- 댓글/공유 카운트 기반 SEO 최적화
````

- [ ] **Step 3: 트리거 키워드 섹션 추가**

파일 맨 아래에 다음 H2 섹션을 추가:

````markdown
## 트리거 키워드 및 사용 예

- "메인 블로그 5/18 에서 멈춰 있다. 19, 20 채워줘"
- "백필 돌려줘"
- "오늘 포스트 써줘"
- "blog backfill"
- "HN GitHub Qiita 분석해서 포스트 만들어줘"

명시적인 일자 인자가 있으면 해당 일자만 채운다. 인자가 없으면 갭 탐지로 자동 결정.
````

- [ ] **Step 4: Self-check — 플레이스홀더 없음**

```bash
cd /root/dev/crowdy/tkim-blog && \
  grep -nE 'TBD|TODO|FIXME|XXX|\(채움\)|\(Task ' \
  .claude/skills/tkim-blog-daily-backfill/SKILL.md
```
Expected: 매치 없음 (exit code 1). 매치가 있으면 해당 부분을 즉시 채워 넣는다.

- [ ] **Step 5: Self-check — Step 1~9 모두 존재**

```bash
cd /root/dev/crowdy/tkim-blog && \
  grep -c '^### Step [1-9]: ' .claude/skills/tkim-blog-daily-backfill/SKILL.md
```
Expected: `9`

- [ ] **Step 6: Self-check — frontmatter 유효**

```bash
cd /root/dev/crowdy/tkim-blog && python3 -c "
import yaml, re
content = open('.claude/skills/tkim-blog-daily-backfill/SKILL.md').read()
fm = re.match(r'^---\n(.*?)\n---', content, re.DOTALL).group(1)
data = yaml.safe_load(fm)
assert data['name'] == 'tkim-blog-daily-backfill'
assert 'description' in data and len(data['description']) > 80
assert data['allowed-tools'] == 'Bash, Read, Write, Edit, WebFetch, AskUserQuestion'
print('OK')
"
```
Expected: `OK`

---

## Task 5: 스킬 파일 커밋

**Files:**
- Stage: `.claude/skills/tkim-blog-daily-backfill/SKILL.md`

- [ ] **Step 1: 변경 사항 미리보기**

Run:
```bash
git -C /root/dev/crowdy/tkim-blog status -s
```
Expected: `?? .claude/skills/tkim-blog-daily-backfill/SKILL.md` (외 없음).

- [ ] **Step 2: 스테이징**

```bash
git -C /root/dev/crowdy/tkim-blog add .claude/skills/tkim-blog-daily-backfill/SKILL.md
```
Expected: 에러 없이 종료.

- [ ] **Step 3: 커밋**

```bash
git -C /root/dev/crowdy/tkim-blog commit -m "$(cat <<'EOF'
feat: add tkim-blog-daily-backfill skill (project-scoped)

Project-scoped Claude Code skill that detects the gap between the latest
crowdy.dev post and today, gathers candidates from HN + GitHub Trending +
Qiita, writes ko + ja siblings with valid frontmatter, verifies via
npm run check && npm run build, and pushes a single bundled commit
matching the b4a2d13 pattern.

Design spec: docs/superpowers/specs/2026-05-21-daily-backfill-skill-design.md
Plan: docs/superpowers/plans/2026-05-21-daily-backfill-skill.md

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```
Expected: `1 file changed, ... insertions(+)`.

- [ ] **Step 4: 푸시 보류**

지금은 푸시하지 않는다 (Task 6 의 통합 검증 결과까지 묶어서 푸시할지, 따로 푸시할지는 사용자에게 확인).

---

## Task 6: 통합 검증 — 실제 5/19~5/20 백필

**Files (생성 예상):**
- Create: `src/content/posts/ko/2026/05/19/<slug>.md`
- Create: `src/content/posts/ja/2026/05/19/<slug>.md`
- Create: `src/content/posts/ko/2026/05/20/<slug>.md`
- Create: `src/content/posts/ja/2026/05/20/<slug>.md`

이 Task 는 방금 작성한 스킬을 그대로 실행해서 실제 갭 (5/19, 5/20) 을 채우는 것이다. 사용자의 원래 요청 — "5/19 부터 5/20 까지 포스트가 필요하다" — 의 충족이기도 하다.

- [ ] **Step 1: 갭 확인**

```bash
cd /root/dev/crowdy/tkim-blog && \
  find src/content/posts/ko -type d -regex '.*/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]$' \
  | sort | tail -1 && date +%Y-%m-%d
```
Expected: 마지막 디렉터리 `src/content/posts/ko/2026/05/18`, 오늘 `2026-05-21`. → 갭 = `[2026-05-19, 2026-05-20]` 2 일.

(주: 오늘 5/21 분도 같이 쓸지는 Step 2 에서 후보 매칭을 보고 판단. 사용자의 원래 요청은 19~20 만이지만 마지막 일자가 오늘 미만이면 스킬 동작상 오늘까지 채우는 게 기본. 사용자 요청을 우선해 5/19, 5/20 만 채운다.)

- [ ] **Step 2: 소스 수집 실행**

스킬 Step 2-A, 2-B, 2-C 의 명령을 그대로 실행해 후보 리스트를 얻는다. 각 소스에서 5/19, 5/20 날짜에 매칭되거나 그날 화제였던 항목을 추출.

```bash
# HN
curl -s 'https://hacker-news.firebaseio.com/v0/topstories.json' | jq '.[0:50]' > /tmp/hn_ids.json
# GitHub Trending → WebFetch 로 처리
# Qiita
curl -s 'https://qiita.com/api/v2/items?page=1&per_page=40&query=stocks:%3E10' > /tmp/qiita.json
```

- [ ] **Step 3: 토픽 선정**

5/19 와 5/20 에 한 건씩, 가급적 다른 소스에서 배정. 사용자에게 선정 결과를 한 줄 요약으로 보고 (자율 진행이므로 차단성 질문은 안 함).

- [ ] **Step 4: 한국어 본문 작성 (5/19)**

스킬 Step 4 의 구성 템플릿대로 작성. `src/content/posts/ko/2026/05/19/<slug>.md` 에 쓴 뒤 글자 수 확인:
```bash
wc -m src/content/posts/ko/2026/05/19/<slug>.md
```
Expected: `>= 6000`. 미달이면 본문 보강 후 재확인.

- [ ] **Step 5: 일본어 번역 (5/19)**

스킬 Step 5 의 번역 규칙 적용. `src/content/posts/ja/2026/05/19/<slug>.md` 에 작성. 구조 (H1 + 리드 질문 + 5 H2) 가 1:1 유지되는지 확인:
```bash
grep -c '^## ' src/content/posts/ko/2026/05/19/<slug>.md \
  && grep -c '^## ' src/content/posts/ja/2026/05/19/<slug>.md
```
Expected: 양쪽 5 (도입 + 본문 1/2/3 + 결론).

- [ ] **Step 6: 한국어 + 일본어 (5/20) — Step 4-5 반복**

5/20 분도 동일하게 작성. 슬러그가 5/19 와 겹치지 않는지 확인.

- [ ] **Step 7: 빌드 검증**

```bash
cd /root/dev/crowdy/tkim-blog && npm run check && npm run build
```
Expected: 두 명령 모두 exit 0. 실패 시 보고하고 해당 파일을 고친 뒤 재검증. 통과 전까지 다음 Step 로 가지 않는다.

- [ ] **Step 8: 단일 커밋**

스킬 Step 8 의 패턴을 그대로 사용:
```bash
git -C /root/dev/crowdy/tkim-blog add src/content/posts
git -C /root/dev/crowdy/tkim-blog commit -m "$(cat <<'EOF'
post: backfill 2026-05-19 ~ 2026-05-20 (2 days, ko/ja)

<백필 기간 한 줄 요약>

- 5/19 <slug> — <한 줄 앵글>
- 5/20 <slug> — <한 줄 앵글>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```
Expected: `4 files changed, ... insertions(+)`.

- [ ] **Step 9: 푸시 보류 후 사용자 확인**

```bash
git -C /root/dev/crowdy/tkim-blog log --oneline -5
```
세 커밋이 보여야 한다:
- Task 5 의 `feat: add tkim-blog-daily-backfill skill (project-scoped)`
- 기 작성된 `spec: daily-backfill skill (project-scoped)` (ebdd61a)
- Task 6 의 `post: backfill 2026-05-19 ~ 2026-05-20 (2 days, ko/ja)`

사용자에게 "세 커밋을 한 번에 푸시할까요?" 라고 확인 후 푸시:
```bash
git -C /root/dev/crowdy/tkim-blog push
git -C /root/dev/crowdy/tkim-blog status
```
Expected: `Your branch is up to date with 'origin/main'.`, `nothing to commit, working tree clean`.

- [ ] **Step 10: 배포 확인**

```bash
gh -R t-kim/tkim-blog run list --workflow=deploy.yml --limit 3
```
Expected: 가장 최근 워크플로가 `in_progress` 또는 `success`. 실패 시 로그 확인.

---

## Self-Review

### 스펙 커버리지 점검

스펙 §1-§10 의 각 항목이 어느 Task 에서 다뤄지는지:

- §1 목적 → 전체 (Task 1-6 의 결과로 충족)
- §2 사용 시나리오 → Task 4 의 트리거 키워드 섹션
- §3 기존 스킬과의 관계 → Task 2 의 Overview 섹션
- §4 워크플로
  - Step 1 (갭 탐지) → Task 2 Step 2
  - Step 2 (소스 수집) → Task 2 Step 3
  - Step 3 (토픽 선정) → Task 2 Step 4
  - Step 4 (한국어 집필) → Task 3 Step 1
  - Step 5 (일본어 번역) → Task 3 Step 2
  - Step 6 (파일 쓰기) → Task 3 Step 3
  - Step 7 (빌드 검증) → Task 2 Step 5
  - Step 8 (단일 커밋) → Task 2 Step 6
  - Step 9 (푸시) → Task 2 Step 7
- §5 에러 처리 → Task 4 Step 1
- §6 명시적 비범위 → Task 4 Step 2
- §7 산출물 → Task 1 (디렉터리/파일), Task 6 (백필 결과물)
- §8 허용 도구 → Task 1 Step 3 의 frontmatter
- §9 트리거 키워드 → Task 4 Step 3
- §10 검증 기준 → Task 6 의 통합 검증이 §10 의 6 개 체크박스를 모두 충족

### 플레이스홀더 스캔

`<slug>`, `<lang>`, `<url 1>` 등은 의도된 템플릿 표기 (스킬 본문 안의 양식). 미해결 TODO 없음.

### 타입/이름 일관성

- 스킬 이름: `tkim-blog-daily-backfill` (모든 Task 에서 동일)
- 디렉터리: `.claude/skills/tkim-blog-daily-backfill/` (동일)
- 커밋 메시지 패턴: `post: backfill YYYY-MM-DD ~ YYYY-MM-DD (N days, ko/ja)` (Task 2, Task 6 일치)
- frontmatter 필드: `title`, `description`, `pubDate`, `lang`, `pairSlug`, `draft` 6 개 (Task 3, Task 6 일치)
- 한국어 본문 구조: H1 + blockquote + 5 H2 (도입/본문1/본문2/본문3/결론) (Task 3, Task 6 일치)

---

## Execution Handoff

본 플랜은 실제 콘텐츠 생성 (Task 6 의 본문 6000자) 작업이 포함되어 있어 한 세션에서 길게 진행될 수 있다. 두 가지 실행 옵션:

**1. Subagent-Driven (권장)** — 각 Task 마다 fresh subagent 를 띄워서 처리, Task 간 검토. Task 4 ~ Task 6 의 본문 작성을 분리 subagent 로 돌리면 메인 컨텍스트가 깨끗하게 유지된다.

**2. Inline Execution** — 본 세션에서 그대로 진행. 본문 작성으로 컨텍스트가 길어지지만, 사용자가 중간에 끼어들기 쉽다.
