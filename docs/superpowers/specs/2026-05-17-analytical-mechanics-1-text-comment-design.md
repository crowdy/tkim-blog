# Analytical Mechanics I — 본문 해설 (text comment) — Design

> 『解析力学 I』 原書의 모든 절(subsection: 1.1.1 … 5.5.4)을 차례로 따라가며, **한 절씩** 풀어 쓰는 한국어 본문 해설 시리즈. 가능한 곳마다 LaTeX 로 식을 다시 적고, 컴퓨터 사이언스의 시선으로 풀 수 있는 곳은 파이썬으로 확인한다.

## Motivation

`analytical-mechanics-1` (정통 노트)와 `analytical-mechanics-1-easy` (쉬운 풀이)는 둘 다 **장(章) 단위 13편**이다. 한 장이 한 호흡에 들어오는 사람에겐 충분하지만, 원서를 손에 들고 *절 번호를 따라가며* 한 절씩 곱씹어 읽는 독자에게는 입자가 너무 거칠다. 본 시리즈는 그 빈자리를 메운다 — **원서의 가장 작은 단위(절, subsection)** 와 1:1로 대응되는 한국어 해설을, 차례 그대로 일렬로 쌓는다.

기존 두 시리즈와의 위치 관계:

- `analytical-mechanics-1` — 장 단위 정통 학습 노트(축약·재구성)
- `analytical-mechanics-1-easy` — 장 단위 쉬운 풀이(같은 분할, 4배 분량)
- **`analytical-mechanics-1-text-comment` (本 设计)** — 절 단위 본문 해설(원서 차례 직주행, 한 절=한 편)

## Scope

새로운 책 1권, **한국어만**:

- `analytical-mechanics-1-text-comment` — 총 **104편** (원서 1.1.1 … 5.5.4)

### Out of scope

- 일본어 / 영어 번역 (별 plan 으로 미룸)
- 기존 `analytical-mechanics-1` / `analytical-mechanics-1-easy` 의 변경
- 새로운 코드·레이아웃·라우팅·콘텐츠 스키마 변경 (모두 既存 그대로)
- 「解析力学 II」 對應 시리즈 (별 prj 로 미룸)

### Scope decomposition

본 spec 은 **Phase 0 (책 메타 + 스타일 가이드 + 1편 샘플)** 만 정의한다. Phase 1–5 (각 章) 는 본 spec 의 청사진을 참조해 별도 spec → plan 사이클로 짠다.

| Phase | 산출물 | 포스트 수 | 본 spec 에서의 위치 |
|---|---|---:|---|
| **0** | book yaml + 스타일 가이드 + 샘플 1편 (1.1.1) | 1 | **이 spec 의 구현 대상** |
| 1 | 章 1 — 序章·数学の準備 (1.1.1 ~ 1.6.8) | 37 | 별 spec / 본 spec 의 청사진 준수 |
| 2 | 章 2 — ラグランジュ形式 (2.1.1 ~ 2.5.3) | 17 | 별 spec |
| 3 | 章 3 — 変分原理 (3.1.1 ~ 3.2.3) | 11 | 별 spec |
| 4 | 章 4 — ハミルトン形式 (4.1.1 ~ 4.4.5) | 21 | 별 spec |
| 5 | 章 5 — 正準変換 (5.1.1 ~ 5.5.4) | 18 | 별 spec |

合計 104 편. PR 단위는 **큰절(section, 例: 1.1) 단위 묶음 = 약 22 PR** 을 기본으로 한다.

## Architecture

콘텐츠 추가 only. 코드 변경 0.

### File layout

```
src/content/
  books/ko/
    analytical-mechanics-1-text-comment.yml         # 책 메타
  studies/ko/
    analytical-mechanics-1-text-comment/
      001-1-1-1-newtonian-mechanics.md              # Phase 0 의 샘플
      002-1-1-2-constraints-and-config-space.md     # Phase 1
      003-1-1-3-constraint-force-and-virtual-work.md
      ...
      104-5-5-4-liouville-theorem-revisited.md
```

- 3자리 시퀀스 (`001`–`104`) 로 파일시스템·라우팅 정렬 보장
- 시퀀스 뒤에 `章-節-小節-슬러그` 를 박아 본문 좌표를 기억하기 쉽게 만든다 (예: `001-1-1-1-newtonian-mechanics`)
- 슬러그(슬러그 끝의 영문) 는 원서의 일본어 제목을 영문 키워드로 옮긴 것. 검색 용이성과 다국어 페어링 대비.

### Routing

기존 `src/pages/[lang]/study/[book]/[...slug].astro` 가 그대로 처리한다. URL 은

```
https://crowdy.dev/ko/study/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics
```

가 된다. 코드 변경 없음.

### Math / Code rendering

- KaTeX 는 이미 셋업되어 있다 (`remark-math` + `rehype-katex`, `BaseLayout.astro` 에서 CSS 로드). 추가 작업 없음.
- 코드 펜스는 기존 Shiki 듀얼 테마 (github-light/dark) 가 그대로 작동. 추가 작업 없음.

### Content schema

기존 `studies` 컬렉션 스키마 (`src/content/config.ts`) 를 그대로 쓴다. 변경 없음.

## Book metadata

```yaml
# src/content/books/ko/analytical-mechanics-1-text-comment.yml
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
description: |
  『解析力学 I』 原書의 모든 절(1.1.1 … 5.5.4)을 차례로 따라가며 한 절씩 풀어 쓰는 본문 해설 시리즈.
  가능한 곳마다 LaTeX 로 식을 다시 적고, 파이썬으로 동작을 확인한다.
lang: ko
pairSlug: am1-text-comment
totalChapters: 104
draft: false
updated: 2026-05-17
```

## Post 표준 형식

각 편의 표준 골격. 절의 성격에 따라 일부 섹션은 생략 가능 (예외는 후술).

```markdown
---
title: '1.1.1 — 뉴턴 역학: 식 한 줄에 숨은 다섯 가지 가정'
description: '$\mathbf F = m\ddot{\mathbf x}$ 는 한 줄이지만, 그 한 줄을 성립시키는 무대...'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 1                          # 1 … 104 의 시퀀스 번호 (목차상의 章 아님)
lang: ko
pairSlug: am1tc-1-1-1-newtonian-mechanics
draft: false
updated: 2026-05-17
---

# 1.1.1 — 뉴턴 역학: 식 한 줄에 숨은 다섯 가지 가정

> $\mathbf F = m\ddot{\mathbf x}$ 는 한 줄이지만, …

## 본문이 말하는 것

(원서 1.1.1 절이 *무엇* 을 주장하는지 한두 단락으로 정리. 원서의 한 줄짜리 정의·식·핵심 명제를 가져와 LaTeX 로 다시 적는다.)

## 한 번 더, 천천히

(주장을 풀어 쓴다. 식의 변형 단계를 한 줄씩 보여 준다. 필요하면 도식 설명·비유.)

$$
\mathbf F_i = m_i \ddot{\mathbf x}_i \quad (i = 1, \dots, N)
$$

## 파이썬으로 확인 *(해당 절에 한해)*

```python
# 절의 핵심을 작은 수치 실험으로 확인한다.
import numpy as np
...
```

## 다음 절(1.1.2)로 가는 다리

(이 절의 결론이 *왜* 다음 절의 주제로 자연스럽게 넘어가는지 한 단락. 원서 차례가 가진 *서사*를 그대로 살린다.)
```

### 분량

- 한국어 **1,500–2,500자** 가 기본. 절의 길이·난이도에 따라 ±30% 허용.
- 파이썬 코드는 *가능한 곳만* — 추상적 정의의 절(예: 1.4.4 接ベクトルと接空間) 은 코드 대신 도해 설명. 본권 전체 약 60% 의 절에 코드가 들어갈 것으로 예상.

### LaTeX 규약

- 인라인 식은 `$ ... $`, 디스플레이는 `$$ ... $$`
- 벡터는 굵게 `\mathbf{x}`, 텐서는 `\mathbf{T}` 또는 인덱스 표기. 아인슈타인 합 규약을 일관 사용.
- 좌표 변환·미분형식이 등장하는 章 (1.5 / 1.6 / 5.x) 에서는 별도 기호 사전을 절 초입에 짧게 박는다.

### 1.4.9 / 1.4.10 의 동명(同名) 처리

원서 목차상 1.4.9 와 1.4.10 이 둘 다 「リー群とリー代数」 로 표기되어 있다. 인쇄 사고로 추정. 본 시리즈에서는 다음과 같이 *기능적으로 분할* 한다.

- **1.4.9** — 리 군의 정의 / 좌·우 평행이동 / 리 대수의 구성
- **1.4.10** — 좌불변 벡터장 / 구조 상수 / 자코비 항등식

(章 1 의 spec 작성 시 원서를 한 번 더 대조해 확정한다.)

## 진행 순서

```
Phase 0  (이 spec)        → book yaml + 스타일 가이드 + 1편 샘플(1.1.1) + PR
Phase 1  (별 spec → plan) → 章 1 (1.1.1 ~ 1.6.8) → 큰절 단위 PR 6 개
Phase 2  (별 spec → plan) → 章 2 (2.1.1 ~ 2.5.3) → PR 5 개
Phase 3  ...              → 章 3 → PR 2 개
Phase 4  ...              → 章 4 → PR 4 개
Phase 5  ...              → 章 5 → PR 5 개
```

각 章 spec 에는 (a) 해당 章 의 모든 절 제목 (원어 + 한국어) 표, (b) 어휘 사전(이미 정의된 기호의 누적), (c) 章 내부의 PR 분할 계획 을 담는다.

## Testing / verification

콘텐츠 추가만 있으므로 자동 테스트는 다음 둘로 충분:

1. `npm run check` — TypeScript + content schema (Zod) 검증. 프런트매터 누락·타입 어긋남을 잡는다.
2. `npm run build` — Astro 빌드 성공 = 라우팅 충돌 없음 = 마크다운 파싱 성공.

사람 눈 검증:

- `npm run dev` 후 `http://localhost:4321/ko/study/analytical-mechanics-1-text-comment/` 에서 책 색인 페이지가 보이고, 1편 샘플이 열리는지.
- KaTeX 식이 깨지지 않고, Shiki 코드 블록이 라이트·다크 양쪽에서 정상.

## Error handling / edge cases

- **빈 책 색인 페이지** — Phase 0 직후엔 1편만 있어도 책 색인은 정상 표시되어야 한다 (기존 라우팅이 이미 처리).
- **`draft: true` 사용 금지** — 본 시리즈는 한 번에 한 절을 끝까지 써서 commit. 도중 임시 commit 이 필요하면 별 branch.
- **번호 충돌** — 시퀀스 번호는 spec 의 [Architecture/File layout] 의 매핑을 단일 source of truth 로 한다. 章 1 spec 작성 시 1.1.1 ~ 1.6.8 에 시퀀스 1 ~ 37 을 배정하는 표를 박는다.

## Open questions (Phase 1 spec 작성 시 결정)

1. 1.4.9 / 1.4.10 분할 안 — 위에 제안한 「리 군 정의 vs. 좌불변·구조 상수」 가 적절한지 원서로 한 번 더 확인.
2. 章 1 의 큰절(1.1 / 1.2 / 1.3 / 1.4 / 1.5 / 1.6) 별 PR 묶음 안에 *어휘 사전 갱신* 을 함께 commit 할지, 별도 commit 으로 둘지.
3. 향후 ja/en 번역을 위한 `pairSlug` 명명 규약은 현재 안 (`am1tc-1-1-1-newtonian-mechanics`) 으로 충분한가, 아니면 시퀀스 번호 (`am1tc-001`) 만으로 충분한가.

---

## Phase 0 의 구체 산출물 (이 spec 의 implementation plan 대상)

1. `src/content/books/ko/analytical-mechanics-1-text-comment.yml` — 위의 [Book metadata] 그대로
2. `src/content/studies/ko/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics.md` — 위의 [Post 표준 형식] 을 따른 1편 샘플
3. `docs/superpowers/specs/2026-05-17-analytical-mechanics-1-text-comment-style-guide.md` — 본 spec 의 [Post 표준 형식] / [LaTeX 규약] 을 독립 문서로 분리. 章별 spec 이 참조할 단일 source.
4. 검증: `npm run check && npm run build` 통과, `npm run dev` 에서 책 색인 + 샘플 1편 가시.
