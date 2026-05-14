# Analytical Mechanics — 쉬운 풀이 (easy versions) — Design

> Two new Korean-only study books that mirror the existing `analytical-mechanics-1` and `analytical-mechanics-2`, with each chapter expanded ~4× in length and pitched at undergrad 1–2 year readers who know calculus and linear algebra but meet manifolds/tensors/Lagrangians for the first time.

## Motivation

The existing series at `/ko/study/analytical-mechanics-1/` and `/ko/study/analytical-mechanics-2/` is dense — terse paragraphs, jumps in derivation, vocabulary (manifold, covariant derivative, Poisson bracket) introduced without much runway. Readers without graduate-level preparation hit a wall. The user wants a parallel "쉬운 풀이" track that keeps every equation, definition, and section ordering of the original but slows down the prose enough to actually carry a less-prepared reader through.

## Scope

Two new books, Korean only:

- **`analytical-mechanics-1-easy`** — 13 chapters (0–12), mirroring `analytical-mechanics-1`
- **`analytical-mechanics-2-easy`** — 10 chapters (1–10), mirroring `analytical-mechanics-2`

Total: 23 chapters, each ≈ 17,000–18,000 Korean characters (4× the originals' ≈ 4,400).

Out of scope:
- Japanese / English translations of the easy versions
- Any change to the existing standard-track books
- New code, routing, layouts, or content schema

## Architecture

Content-only addition. No code changes.

### File layout

```
src/content/
  books/ko/
    analytical-mechanics-1-easy.yml
    analytical-mechanics-2-easy.yml
  studies/ko/
    analytical-mechanics-1-easy/
      00-mathematical-preliminaries.md
      01-equations-of-motion.md
      02-constrained-motion-on-surfaces.md
      03-tensors-and-covariant-derivative.md
      04-manifolds.md
      05-vector-fields.md
      06-differential-forms.md
      07-lagrangian-mechanics.md
      08-variational-principle.md
      09-symmetry-and-conservation.md
      10-hamiltonian-mechanics.md
      11-canonical-transformations.md
      12-poisson-brackets-and-integrability.md
    analytical-mechanics-2-easy/
      01-hamilton-jacobi.md
      02-canonical-transformations-deepened.md
      03-integrable-systems.md
      04-perturbation-theory.md
      05-continuum-mechanics.md
      06-classical-field-theory.md
      07-relativistic-mechanics.md
      08-noether-in-field-theory.md
      09-classical-to-quantum.md
      10-where-to-next.md
```

Filenames, chapter numbers, and titles are 1:1 with the originals so a reader can switch tracks chapter-by-chapter.

### URL

- Book index: `/ko/study/analytical-mechanics-1-easy/`, `/ko/study/analytical-mechanics-2-easy/`
- Chapter: `/ko/study/analytical-mechanics-1-easy/00-mathematical-preliminaries/` etc.

Routing is automatic — `src/pages/[lang]/study/[book]/index.astro` and `.../[book]/[...slug].astro` already cover both based on the new content files.

### Book metadata

```yaml
# src/content/books/ko/analytical-mechanics-1-easy.yml
book: analytical-mechanics-1-easy
bookTitle: 해석역학 I — 쉬운 풀이
description: 해석역학 I 의 모든 정의와 수식을 유지하면서, 학부 1–2학년 독자가 손에 잡힐 때까지 풀어 쓴 동반 노트.
lang: ko
pairSlug: am1-easy
totalChapters: 13
draft: true        # 책 1권 전체가 완성될 때까지 true. 완성 직전 false 로 일괄 전환.
updated: 2026-05-14
```

```yaml
# src/content/books/ko/analytical-mechanics-2-easy.yml
book: analytical-mechanics-2-easy
bookTitle: 해석역학 II — 쉬운 풀이
description: 해석역학 II 의 모든 정의와 수식을 유지하면서, 학부 1–2학년 독자가 손에 잡힐 때까지 풀어 쓴 동반 노트.
lang: ko
pairSlug: am2-easy
totalChapters: 10
draft: true
updated: 2026-05-14
```

### Chapter frontmatter

Each chapter follows the existing schema in `src/content/config.ts`:

```yaml
---
title: '수학적 준비 — 다양체 역학을 위한 도구상자'   # 원본과 동일
description: '뉴턴의 법칙을 평면 너머로 ...'           # 원본과 동일
book: analytical-mechanics-1-easy
bookTitle: 해석역학 I — 쉬운 풀이
chapter: 0
lang: ko
pairSlug: am1e-mathematical-preliminaries              # 원본의 'am1-…' 와 다른 네임스페이스
draft: true
updated: 2026-05-14
---
```

`pairSlug` namespace conventions:

- AM1-easy 챕터: `am1e-<chapter-slug>` (원본 `am1-<chapter-slug>` 과 충돌하지 않음)
- AM2-easy 챕터: `am2e-<chapter-slug>` (원본 `am2-<chapter-slug>` 과 충돌하지 않음)

Single-language by design: since no `ja` / `en` siblings exist with these slugs, `getBookPairs` / `getChapterPairs` return only `ko`, so the `<nav class="lang-toggle">` renders just the `KO` button. No code changes required — this matches how the existing components already handle missing siblings.

## Content style guide

### Target reader

- 학부 1–2학년 (혹은 그에 준하는 수학·물리 배경).
- 가정: 미적분(다변수 포함), 선형대수(행렬·고윳값) 익숙. 상미분방정식 한 학기 들었음.
- 비가정: 다양체, 텐서 인덱스 표기, 라그랑주/해밀턴 형식, 변분원리는 처음 듣는 단어.

### Length target

각 챕터 ≈ 17,000–18,000 한국어 문자 (수식 마크업 포함). 원본의 약 4배.

### Section-level rule

원본의 섹션 제목과 순서를 그대로 유지한다 (`## 들어가며`, `## 본론 1`, `## 본론 2`, …, `## 마무리`). 각 섹션 안에서 다음 네 가지 layer 를 추가하여 분량을 채운다:

1. **"왜 지금 이게 필요한가" 도입** — 섹션이 풀려는 문제를 2–3문장으로 깔고 시작
2. **구체 예시·비유** — 정의/추상 개념 직후에 손에 잡히는 예 (예: $SO(3)$ → 책상 위 책을 두 번 회전시키는 실험; 일파라미터 흐름 → 시계 초침)
3. **중간계산 노출** — 원본이 "정리하면" 으로 건너뛴 식 한두 단계를 손계산으로 채움. 부호·전치·합 규약을 입으로 말하듯이
4. **자주 하는 오해 / 헷갈리는 표기** — 위/아래 첨자, 능동·수동 변환, $d/dt$ vs $\partial/\partial t$, 공변/반변 같은 함정을 짧게 짚기

### 유지하는 것

- 모든 수식·정의·기호 — LaTeX/KaTeX 표기 그대로 (KaTeX 가 이미 `BaseLayout` 에서 로드됨)
- 섹션 제목 (들어가며 / 본론 N / 마무리) — 원본과 1:1 대응
- 인덱스·아인슈타인 합 규약 등 표기 컨벤션
- 마무리 문단의 다음 장 예고

### 바꾸는 것

- 첫 문장의 강도. 원본은 압축적이라 무겁다. 쉬운 버전은 *"이번 장은 이런 물음에 답한다 — …"* 형태로 시작
- "증명은 사실로 받아들이자" 같은 줄은, 가능한 경우 2–3줄짜리 직관적 증명으로 대체. 진짜 어려운 곳만 *"여기는 표준 트랙 N장을 참조 — 결과만 받아쓴다"* 식으로 명시
- 능동태·평이한 문장. 한 문장당 한 가지 일만.

### 문체 톤

- 쓰는 사람의 1인칭은 등장 안 함. 독자에게 직접 말하지도 않음 (원본 톤 유지). 다만 "여기서 손이 미끄러지기 쉽다" 처럼 학습 경험을 짚는 메타 문장은 허용.
- "~한다", "~된다" 의 평서·서술 일관. 격식체 (~합니다) 는 쓰지 않음.

## Workflow

### Drafting order

1. **AM1-easy 전체** (13장) — draft 로 추가 → 한 장씩 완성 → 13장 모두 끝나면 책 + 챕터 일괄 `draft: false` 전환 → push
2. 위가 끝난 뒤 **AM2-easy 전체** (10장) 동일 절차

각 챕터의 작성 자체는 별도 commit. 책 전체 공개는 별도 "publish" commit 으로 분리.

### Per-chapter checklist

- 원본 챕터를 다시 읽고 섹션 경계를 파악
- 각 섹션 4× 풀어쓰기 (4-layer 규칙 적용)
- 모든 수식을 원본과 비교해 누락 없음 확인
- `npm run check && npm run build` 통과
- commit message: `study(analytical-mechanics-1-easy): add ch.NN <slug>` 등

### Publish

AM1-easy 13장이 모두 완성된 시점에 다음 한 commit 으로 공개:

```
study(analytical-mechanics-1-easy): publish (draft → false, 13 chapters)
```

AM2-easy 도 동일하게.

## 주의사항

- 챕터 파일명·번호·title 은 원본과 1:1 유지 (독자가 트랙 간 점프할 때 안내자 역할)
- `description` 도 원본과 동일하게 — 단행본 인덱스에서 두 책을 구분하는 신호는 책 타이틀의 "— 쉬운 풀이" 접미사가 담당
- `pairSlug` 는 반드시 `am1e-…` / `am2e-…` 네임스페이스 사용 — 원본과 같은 값 쓰면 `getChapterPairs` 가 두 챕터를 같은 글의 번역으로 오인하여 lang 토글이 깨짐
- 한 책의 13장(또는 10장)이 모두 완성될 때까지 책 메타·챕터 모두 `draft: true`. 프로덕션 빌드에서는 자동 제외됨 (`getStaticPaths` 가 `c.data.draft` 인 항목을 빌드에서 빼냄)

## Files changed

- **추가**:
  - `src/content/books/ko/analytical-mechanics-1-easy.yml`
  - `src/content/books/ko/analytical-mechanics-2-easy.yml`
  - `src/content/studies/ko/analytical-mechanics-1-easy/*.md` (13 files)
  - `src/content/studies/ko/analytical-mechanics-2-easy/*.md` (10 files)

- **변경**: 없음 (코드·라우팅·레이아웃 그대로)

## Open questions

없음. 모든 핵심 결정은 brainstorming 단계에서 정해짐.
