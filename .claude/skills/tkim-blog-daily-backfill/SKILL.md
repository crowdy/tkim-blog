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

> **다일 백필의 제1 규칙:** HN 소재는 날짜별 Algolia `search_by_date` 로 모은다. `topstories.json` 단일 스냅샷으로 여러 날을 채우면 최신 스토리가 과거 날짜에 소급 배정된다 (Step 2-A 참조).

기존 사용자 스킬 `tech-blog-pipeline` 과 별개로 운용한다. 본 스킬은 (a) 소스가 다르고 (HN + GitHub Trending + Qiita, Slack 없음), (b) 출력이 frontmatter 유효 형태로 리포지토리에 직접 들어가며, (c) 갭 탐지 → 자동 진행이라는 점이 차이다.

## Workflow

### Step 1: 갭 탐지

1. 현재 위치 확인:
   ```bash
   pwd
   # 경로에 'tkim-blog' 가 포함되어야 진행. 그 외에는 즉시 종료.
   # 하위 디렉터리 (예: /root/dev/crowdy/tkim-blog/src) 는 허용.
   [[ "$(pwd)" == *"tkim-blog"* ]] || { echo "wrong repo: $(pwd)"; exit 1; }
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

**⚠️ 핵심 규칙: 날짜별 수집은 반드시 Algolia `search_by_date` 로 한다.**

`topstories.json` 은 **호출 시점의 현재 상위 50 건 스냅샷**이다. 이걸로 여러 날을 백필하면, 실행 시점에 살아 있는 최신 스토리가 과거 날짜에 소급 배정된다 (예: 6/26 에 실행하면서 6/22 자리에 6/25 스토리를 넣는 사고). **백필 대상이 2 일 이상이면 `topstories.json` 을 토픽 배정에 쓰지 말 것.** 대신 누락된 **각 날짜마다** Algolia HN Search 의 날짜 구간 질의를 돈다.

**각 백필 대상 날짜 `D` (KST) 마다:**

1. 그 날의 UTC 타임스탬프 구간을 계산한다 (KST 자정 = 전날 UTC 15:00):
   ```bash
   start=$(TZ=UTC date -d "${D}T00:00:00+09:00" +%s)
   end=$(TZ=UTC date -d "${D}T23:59:59+09:00" +%s)
   ```
2. 그 구간의 스토리를 점수순으로 가져온다. **`curl` 이 이 호스트에서 막히면 (sandbox/DNS) 즉시 `WebFetch` 로 폴백**한다 — 이번 검증에서 `curl` 은 `hn.algolia.com` 에 대해 exit 5, `WebFetch` 는 정상이었다:
   ```
   https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i%3E%3D<start>%2Ccreated_at_i%3C%3D<end>%2Cpoints%3E%3D150&hitsPerPage=20
   ```
   - 반드시 `search_by_date` 엔드포인트를 쓴다. (`search` 엔드포인트는 동일 `numericFilters` 에 400 을 반환하는 경우가 있다.)
   - 인코딩: 쉼표 `%2C`, `>=` `%3E%3D`, `<=` `%3C%3D`.
   - `WebFetch` prompt: `"Return all hits with title, url, points, num_comments, objectID, sorted by points descending."`
   - 후보가 적으면 `points%3E%3D150` 을 `100` 으로 낮춰 재질의.

3. HN 토론을 인용하거나 `objectID` (= HN item id) 가 필요하면 `https://news.ycombinator.com/item?id=<objectID>` 를 `WebFetch`. **출처의 HN 링크에는 반드시 이 실제 `objectID` 를 박는다 — placeholder ID 금지** (이번에 합성 ID 가 새어 들어가 사후 보정이 필요했다).

**토픽 배정 시 제외:**
- **부고·단순 속보·가격 변동 헤드라인** (예: "X has died", "Apple raises prices"): 점수는 높아도 분석 포스트로 부적합. Step 3 의 "분석 깊이" 규칙에서 걸러낸다.
- `url` 이 외부 사이트면 채택 후보에 한해 `WebFetch` 로 본문 요약을 가져온다.

**단일 날(오늘 하루)만 백필**하는 경우에 한해 `topstories.json` 스냅샷을 써도 된다 (소급 배정 위험이 없으므로):
```bash
curl -s https://hacker-news.firebaseio.com/v0/topstories.json | jq '.[0:50]'
curl -s https://hacker-news.firebaseio.com/v0/item/<ID>.json | jq '{title, url, score, descendants, by, time}'
```
이때도 `time` 을 KST 로 변환해 (`TZ=Asia/Seoul date -d "@<time>" +%Y-%m-%d`) 오늘 ±1 일인지 확인한다.

#### 2-B: GitHub Trending

`WebFetch` 로 다음 두 URL 의 HTML 을 가져온다 (daily 우선, 갭이 길면 weekly 도):
- `https://github.com/trending?since=daily`
- `https://github.com/trending?since=weekly`

WebFetch prompt 에 다음을 지정한다:
> "Extract the top 25 trending repositories. For each, return: full name (owner/repo), one-line description, primary language, and 'stars today' count (the number next to the star icon at the bottom of each row). Output as a JSON array."

페이지 구조 단서: 각 리포는 `<article class="Box-row">` 이고, stars-today 는 행 하단의 `<span class="d-inline-block float-sm-right">` 안에 있다 (선택자 변경 가능성 있으므로 WebFetch 의 LLM 파싱에 의존).

단순 알고리즘 라이브러리보다 **트레이드오프가 명확한 도구** (예: pip 대체, ORM 대체, k8s 대안) 를 우선 후보로 표시.

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
5. **날짜 매칭 (엄격).** 각 누락 날짜에는 **그 날(KST) 구간 질의에서 나온 후보만** 배정한다. 다른 날 후보를 빈자리 메우기로 끌어다 쓰지 않는다 — 부득이 그 날 적합 후보가 없으면 GitHub Trending/Qiita 의 같은 날 후보로 대체하고, 그래도 없으면 사용자에게 보고한다. (HN `search_by_date` 를 날짜별로 돌면 이 매칭은 자동으로 보장된다.)

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
| `curl` 이 `hn.algolia.com` 차단 (exit 5 등) | `WebFetch` 로 폴백. 같은 질의를 `search_by_date` 로 재시도 |
| 2 일 이상 백필인데 `topstories.json` 만 씀 | 금지. 날짜별 `search_by_date` 로 재수집 (소급 배정 사고) |
| 출처 HN 링크에 placeholder ID | 금지. 실제 `objectID` 로 교체 후에만 커밋 |
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
