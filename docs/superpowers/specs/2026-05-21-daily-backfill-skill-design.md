# Daily Backfill Skill — Design Spec

- 작성일: 2026-05-21
- 대상 산출물: `.claude/skills/tkim-blog-daily-backfill/SKILL.md` (project scope)
- 관련 기존 스킬: `tech-blog-pipeline` (user scope, 별개 유지)

## 1. 목적

`crowdy.dev` 의 최근 포스트 일자와 오늘 사이에 비어 있는 날을 자동으로 채우는 프로젝트 전용 스킬을 만든다. 본 리포지토리에서 작업할 때만 활성화되며, Hacker News · GitHub Trending · Qiita 세 소스에서 후보를 모으고, 누락된 날짜마다 한국어(분석적 저널리즘 스타일, 6000자 이상) 본문과 일본어 번역본을 `src/content/posts/{ko,ja}/YYYY/MM/DD/<slug>.md` 에 직접 작성한 뒤, 단일 커밋으로 푸시한다.

수동 백필(commit `b4a2d13`, 2026-05-14 ~ 2026-05-18, 5일치)의 패턴을 재현 가능한 워크플로로 굳히는 것이 목표다.

## 2. 사용 시나리오

- "메인 블로그가 5/18 에서 멈춰 있다. 19, 20 채워줘" — 가장 일반적인 케이스
- "오늘 포스트 써줘" — 마지막 포스트가 어제이면 오늘 한 건만 채운다
- "백필 돌려줘" — 인자 없이도 자동으로 갭을 탐지해서 채운다

## 3. 기존 스킬과의 관계

`tech-blog-pipeline` (user scope) 은 그대로 둔다. 두 스킬의 역할이 다르다:

| 항목 | `tech-blog-pipeline` | `tkim-blog-daily-backfill` (신규) |
|---|---|---|
| 소스 | HN + GMO Slack 脳内同期 | HN + GitHub Trending + Qiita |
| 출력 | `~/blog-drafts/*.md` (frontmatter 없음) | `src/content/posts/{ko,ja}/YYYY/MM/DD/<slug>.md` (스키마 준수) |
| 인터랙티브성 | 5단계 사용자 승인 | 갭 탐지 → 자동 진행 (5일 초과 시만 확인) |
| 스코프 | 어디서나 호출 가능 | 본 리포지토리 한정 |

한국어 분석 저널리즘 스타일 규칙은 두 스킬이 동일하지만, 본 스킬에서 인라인으로 다시 명시한다. (스킬 체이닝 회피)

## 4. 워크플로

```
[1] 갭 탐지 → [2] 소스 수집 → [3] 토픽 선정 → [4] 한국어 집필 → [5] 일본어 번역
                                                                              ↓
                              [9] 푸시 ← [8] 단일 커밋 ← [7] 빌드 검증 ← [6] 파일 쓰기
```

### Step 1 — 갭 탐지

- `src/content/posts/ko/` 트리에서 가장 최신의 `YYYY/MM/DD` 디렉터리를 찾는다.
- 그 다음 날부터 오늘(`date +%Y-%m-%d`) 까지의 누락 일자 목록을 만든다.
- 누락이 0일이면 "갭 없음" 으로 즉시 종료.
- 누락이 5일 초과면 `AskUserQuestion` 으로 확인 후 진행.

### Step 2 — 소스 수집 (병렬)

**Hacker News**
```bash
curl -s https://hacker-news.firebaseio.com/v0/topstories.json | jq '.[0:50]'
# 각 ID 에 대해
curl -s https://hacker-news.firebaseio.com/v0/item/<ID>.json
```
필터: score ≥ 100, descendants ≥ 50, `time` 이 백필 대상 일자 범위 ±1일.

**GitHub Trending**
- `https://github.com/trending?since=daily` 와 `?since=weekly` 를 WebFetch 로 가져와 상위 ~25개 리포 추출.
- 백필 대상 일자에 맞춰 daily 우선, 갭이 길면 weekly 도 사용.

**Qiita**
```bash
curl -s 'https://qiita.com/api/v2/items?page=1&per_page=40&query=stocks:>10'
```
필터: `likes_count ≥ 20`, `created_at` 이 백필 대상 일자 범위.

각 후보 항목은 다음을 갖춘다: `{source, title, url, score/likes/stars, comments_url, summary, raw_date}`.

### Step 3 — 토픽 선정

선정 규칙:

1. **하루 한 건.** 누락된 날마다 한 토픽씩 매칭.
2. **분석 깊이 우선.** 단순 릴리스/속보보다 트레이드오프·전략·논쟁이 있는 주제.
3. **소스 다양성.** 백필 윈도에서 같은 소스가 연속되지 않도록 분산. 2일 백필이면 가급적 다른 소스에서 한 건씩.
4. **중복 회피.** 최근 14일치 포스트 슬러그·주제를 훑어 동일/유사 주제 배제.
5. **날짜 매칭.** 후보의 `raw_date` 가 누락된 날과 일치하는 것을 우선 배정.

선정 결과는 다음 형태로 정리한다:
```
2026-05-19  [GitHub Trending] uv-pip-disruption       — uv가 pip을 대체할 것인가
2026-05-20  [Qiita]           rust-in-jp-enterprise   — 일본 대기업 Rust 도입 사례
```

5일 초과 백필이거나 후보가 모호하면 사용자에게 확인을 받는다. 그 외에는 자율 진행.

### Step 4 — 한국어 집필

`tech-blog-pipeline` 의 분석적 저널리즘 스타일을 그대로 사용한다.

**문체:** `である`체 한국어 (분석체). 6000자 이상.

**구성:**
```
[리드 질문]            — 본문 위 blockquote 1-2 문장 (frontmatter description 의 소스)
## 도입                — 500-800자, 배경과 맥락, 구체 사건/데이터로 시작
## 본문 1 (현상 분석)   — 1500-2000자, 무엇이 일어나는가, 데이터·인용
## 본문 2 (심층 분석)   — 1500-2000자, 왜 일어나는가, 트레이드오프·반론
## 본문 3 (전망)        — 1000-1500자, 의미와 시사점
## 결론                — 500-800자, 리드 질문에 대한 답 또는 열린 결론
---
출처:
- <url1>
- <url2>
```

**규칙:**
- 리드 질문은 단순 정의형이 아닌 분석적 질문 ("X는 Y인가, Z인가" 형태 권장).
- 팩트와 분석을 명확히 분리.
- 추상 서술 지양, 구체 수치·사례·코멘트 인용 포함.
- 본문 첫 줄의 `# Title` 은 frontmatter `title` 과 정확히 일치 (CSS 가 숨김 처리).

### Step 5 — 일본어 번역

**문체:** `である` 체. 기술 용어는 일본 커뮤니티 표기 (`Kubernetes`, `Docker` 등 영어 유지; `컨테이너` → `コンテナ`). 리드 질문은 의문형 유지. 한국어판 본문 구조를 1:1 로 유지.

### Step 6 — 파일 쓰기

각 날짜·각 언어마다 다음 형식의 파일을 작성한다:

```yaml
---
title: '한국어판 제목 (또는 일본어판 제목)'
description: '리드 질문 또는 1-2문장 훅. 리스트와 RSS 에 노출됨.'
pubDate: 2026-05-19T00:00:00.000Z
lang: ko        # 또는 ja
pairSlug: <slug>
draft: false
---

# 본문 제목 (frontmatter title 과 정확히 일치)

> 리드 질문

## 도입

...
```

**Frontmatter 주의사항:**
- `description` 에 백슬래시·작은따옴표가 들어가면 **double-quoted YAML** 사용 (백슬래시 이스케이프). (memory `feedback-am1tc-authoring` 의 컨벤션과 동일)
- `pubDate` 는 해당 날짜 자정 UTC.
- `pairSlug` 는 ko/ja 가 동일한 값을 공유.
- `draft: false` (백필은 즉시 배포).

**경로:** `src/content/posts/<lang>/YYYY/MM/DD/<slug>.md`

### Step 7 — 빌드 검증

리포지토리 루트에서:
```bash
npm run check && npm run build
```
실패 시 커밋하지 않고 어느 파일이 스키마 위반인지 보고하고 종료.

### Step 8 — 단일 커밋

`b4a2d13` 의 메시지 패턴을 따른다:

```
post: backfill YYYY-MM-DD ~ YYYY-MM-DD (N days, ko/ja)

<한 줄 요약>

- M/D <slug> — <한 줄 앵글>
- ...
```

`git add src/content/posts` 로 한정 스테이징 후 `git commit`. `--no-verify` 사용 금지.

### Step 9 — 푸시

`git push` 한 번. 푸시 후 `git status` 로 클린 상태 확인.

## 5. 에러 처리

| 상황 | 동작 |
|---|---|
| 갭 0일 | "최신 상태입니다" 보고하고 종료 |
| 누락 > 5일 | `AskUserQuestion` 으로 진행 여부 확인 |
| HN/GH/Qiita 접근 실패 | 즉시 실패. 무음 폴백 금지 |
| `pairSlug` 가 기존 포스트와 충돌 | 즉시 실패, 사용자 확인 |
| `npm run check` 실패 | 커밋하지 않고 위반 파일 보고 |
| 푸시 거부 (원격 앞섬) | 사용자에게 보고, 자동 rebase 금지 |

## 6. 명시적 비범위 (YAGNI)

- `en` 번역
- 하루 다건 작성
- 토픽 큐/캐시 (실행마다 새로 수집)
- cron 자동 실행 (사용자가 별도로 `/schedule` 로 구성)
- 드래프트 프리뷰 (`draft: true` 단계 거치지 않음)
- Slack 脳内同期 통합 (`tech-blog-pipeline` 의 영역)

## 7. 산출물

- `.claude/skills/tkim-blog-daily-backfill/SKILL.md`
- `docs/superpowers/specs/2026-05-21-daily-backfill-skill-design.md` (이 문서)

스킬은 본 문서의 §3–§4 를 인용 형태로 참조하여 SKILL.md 자체는 스캔 가능한 짧은 분량으로 유지한다.

## 8. 허용 도구 (skill frontmatter)

```yaml
allowed-tools: Bash, Read, Write, Edit, WebFetch, AskUserQuestion
```

## 9. 트리거 키워드

`백필`, `backfill`, `오늘 포스트`, `today's post`, `missing days`, `블로그 빈 날`, `메인 블로그 채워줘`, `HN GitHub Qiita 분석` 등.

## 10. 검증 기준

스킬 도입 후, 다음이 충족되어야 완료로 본다:

- [ ] 갭이 없는 상태에서 호출 시 정확히 "갭 없음" 으로 종료
- [ ] 갭 2일 (오늘 기준 2026-05-19 ~ 2026-05-20) 호출 시 한국어·일본어 2쌍 4파일 생성
- [ ] 생성된 파일이 `src/content/config.ts` 의 zod 스키마를 모두 통과
- [ ] `npm run check && npm run build` 가 통과
- [ ] 단일 커밋 메시지가 `post: backfill ... (N days, ko/ja)` 패턴
- [ ] 푸시 후 GitHub Actions 빌드 성공
