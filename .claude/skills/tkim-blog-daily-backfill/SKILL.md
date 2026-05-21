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

이 스킬은 본 리포지토리 (`crowdy.dev` 의 소스) 에서만 활성화되는 프로젝트 전용 스킬이다. 현재 디렉터리가 `tkim-blog` 가 아니면 즉시 종료한다. 기준 일자는 `date +%Y-%m-%d` 의 출력값 (오늘) 이다.

워크플로 한눈에:
```
[1] 갭 탐지 → [2] 소스 수집 → [3] 토픽 선정 → [4] 한국어 집필 → [5] 일본어 번역
                                                                              ↓
                              [9] 푸시 ← [8] 단일 커밋 ← [7] 빌드 검증 ← [6] 파일 쓰기
```

기존 사용자 스킬 `tech-blog-pipeline` 과 별개로 운용한다. 본 스킬은 (a) 소스가 다르고 (HN + GitHub Trending + Qiita, Slack 없음), (b) 출력이 frontmatter 유효 형태로 리포지토리에 직접 들어가며, (c) 갭 탐지 → 자동 진행이라는 점이 차이다.

## Workflow

### Step 1: 갭 탐지

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

### Step 2: 소스 수집

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

### Step 3: 토픽 선정

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

### Step 4: 한국어 집필

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

### Step 5: 일본어 번역

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

### Step 6: 파일 쓰기

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

### Step 7: 빌드 검증

모든 파일을 쓴 후, 리포 루트에서:
```bash
npm run check && npm run build
```
- `check` 가 실패하면 어느 파일이 zod 스키마 위반인지 메시지에서 파싱해 사용자에게 보고하고 **커밋하지 않는다.**
- `build` 가 실패하면 어떤 markdown 파싱 에러인지 보고하고 **커밋하지 않는다.**
- 둘 다 통과해야 Step 8 로 진행.

### Step 8: 단일 커밋

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

### Step 9: 푸시

```bash
git push
git status   # nothing to commit, working tree clean 확인
```
원격이 거부 (앞섬) 하면 사용자에게 보고하고 자동 rebase 는 하지 않는다.

## 에러 처리

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

## 명시적 비범위 (YAGNI)

다음은 의도적으로 지원하지 않는다. 사용자가 요청해도 별도 작업으로 분리할 것:

- `en` 번역 (현재 패턴은 ko + ja 만)
- 하루 다건 작성
- 토픽 큐 / 후보 캐시 (실행마다 새로 수집)
- cron 자동 실행 (사용자가 별도로 `/schedule` 로 구성)
- 드래프트 프리뷰 (`draft: true` 단계 거치지 않음)
- Slack 脳内同期 통합 (`tech-blog-pipeline` 의 영역)
- 이미지 삽입·자동 다이어그램 생성
- 댓글/공유 카운트 기반 SEO 최적화

## 트리거 키워드 및 사용 예

- "메인 블로그 5/18 에서 멈춰 있다. 19, 20 채워줘"
- "백필 돌려줘"
- "오늘 포스트 써줘"
- "blog backfill"
- "HN GitHub Qiita 분석해서 포스트 만들어줘"

명시적인 일자 인자가 있으면 해당 일자만 채운다. 인자가 없으면 갭 탐지로 자동 결정.
