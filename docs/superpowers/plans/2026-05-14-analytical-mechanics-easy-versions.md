# Analytical Mechanics — 쉬운 풀이 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 두 개의 Korean-only study books (`analytical-mechanics-1-easy`, `analytical-mechanics-2-easy`)를 신설해, 기존 표준 트랙의 모든 정의·수식·섹션 구조를 유지하면서 각 챕터를 약 4배 분량으로 풀어 쓴 동반 노트를 발행한다.

**Architecture:** 콘텐츠 추가만 한다. 코드·라우팅·레이아웃은 그대로. `src/content/books/ko/{am1,am2}-easy.yml` 2개 + `src/content/studies/ko/{am1,am2}-easy/*.md` 23개 파일을 추가. 단일 언어이므로 `pairSlug` 를 `am1e-…` / `am2e-…` 네임스페이스로 두어 lang 토글이 자동으로 KO만 보이게 한다.

**Tech Stack:** Astro 5 content collections, Markdown + KaTeX, Node 22, GitHub Actions deploy. 검증은 `npm run check` (TS + content schema) 와 `npm run build`.

**Reference spec:** `docs/superpowers/specs/2026-05-14-analytical-mechanics-easy-versions-design.md`

---

## 사전 준비

- 작업 디렉터리: `/root/dev/crowdy/tkim-blog`
- 모든 작업은 `main` 브랜치에서 진행. 챕터 완성 commit은 push해도 좋다 (책 메타가 `draft: true` 이므로 프로덕션 빌드 출력엔 안 나타남).
- 작업 순서: AM1 13장 → AM1 publish → AM2 10장 → AM2 publish.

## 글자 수 측정 — 일관된 방식

이 플랜은 "≈ 17,000자" 같은 목표를 자주 쓴다. **항상 다음 명령으로 측정**한다:

```bash
LC_ALL=C.UTF-8 wc -m <file>
```

`wc -m` 은 UTF-8 로케일에서 multibyte character count를 반환한다. 프론트매터·수식·마크다운 기호까지 포함한 raw count다. 목표는 **본문 (프론트매터 제외) 16,500–18,500자**.

본문 글자 수만 보고 싶으면:

```bash
LC_ALL=C.UTF-8 awk '/^---$/{f=!f; next} !f {print}' <file> | wc -m
```

(프론트매터 두 `---` 사이 줄을 건너뛰고 본문만 카운트)

---

## 각 챕터 작성 절차 (이후 모든 챕터 태스크가 참조)

각 챕터 작성 태스크는 아래 절차를 따른다. 태스크별로 (a) 원본 경로, (b) 대상 경로, (c) 프론트매터 블록, (d) commit 메시지만 다르다.

### 단계 A — 원본 다시 읽기

```bash
cat <original-path>
LC_ALL=C.UTF-8 wc -m <original-path>
```

원본의 섹션 경계 (`## 들어가며`, `## 본론 1`, `## 본론 2`, …, `## 마무리`)와 모든 수식 위치를 파악한다.

### 단계 B — 새 파일 작성

대상 파일을 새로 쓴다. **이미 단계 0 (Task 1)에서 동일 경로에 스텁이 만들어져 있으므로 덮어쓴다.** 다음 네 가지 layer 를 원본의 각 섹션에 끼워 넣어 분량을 약 4배로 확장한다:

1. **"왜 지금 이게 필요한가" 도입** — 섹션이 풀려는 문제를 2–3문장으로 깔고 시작
2. **구체 예시·비유** — 정의/추상 개념 직후에 손에 잡히는 예 (예: $SO(3)$ → 책상 위 책을 두 번 회전; 일파라미터 흐름 → 시계 초침)
3. **중간계산 노출** — 원본이 "정리하면" 으로 건너뛴 식 한두 단계를 손계산으로 채움 (부호·전치·합 규약을 입으로 말하듯)
4. **자주 하는 오해 / 헷갈리는 표기** — 위/아래 첨자, 능동·수동 변환, $d/dt$ vs $\partial/\partial t$, 공변/반변 같은 함정을 짧게 짚기

**유지하는 것**: 모든 수식·정의·기호 (LaTeX 그대로), 섹션 제목·순서, 인덱스 규약, 마무리의 다음 장 예고, `title` / `description` 원본 그대로.

**바꾸는 것**: 첫 문장 ("이번 장은 이런 물음에 답한다 — …" 형태), "사실로 받아들이자" 식의 점프는 2–3줄 직관 증명으로 대체. 능동태·단문 우선.

**문체 톤**: 1인칭·격식체(~합니다) 금지. 평서 (~한다 / ~된다) 일관.

### 단계 C — 글자 수 확인

```bash
LC_ALL=C.UTF-8 awk '/^---$/{f=!f; next} !f {print}' <target-path> | wc -m
```

기대값: 16,500–18,500. 14,000 미만이면 단계 B로 돌아가 layer 보강. 20,000 초과면 군더더기 발견해 다듬기.

### 단계 D — 빌드 검증

```bash
npm run check
```

기대: `0 errors, 0 warnings, 0 hints`. (KaTeX 파싱 오류, 스키마 오류 검출용)

### 단계 E — 수식 누락 점검

원본의 모든 `$…$` 와 `$$…$$` 블록이 새 파일에도 포함됐는지 빠르게 확인:

```bash
diff <(grep -oE '\$[^$]+\$|\$\$' <original-path> | sort -u) \
     <(grep -oE '\$[^$]+\$|\$\$' <target-path> | sort -u) | head -40
```

이는 휴리스틱이다. 새 파일은 추가 수식이 있을 수 있으니 `<` (only in original) 표시된 줄만 본다. 원본에만 있는 수식이 있으면 누락이므로 본문에 채워 넣고 단계 D 재실행.

### 단계 F — commit

```bash
git add <target-path>
git commit -m "study(analytical-mechanics-N-easy): add ch.MM <slug>"
```

(N=1 또는 2, MM=두 자리 챕터 번호, slug=파일명에서 번호와 `.md`를 뺀 것)

---

## File Structure

| Path | Purpose |
|---|---|
| `src/content/books/ko/analytical-mechanics-1-easy.yml` | AM1-easy 책 메타데이터 |
| `src/content/books/ko/analytical-mechanics-2-easy.yml` | AM2-easy 책 메타데이터 |
| `src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md` | AM1-easy ch.0 |
| `src/content/studies/ko/analytical-mechanics-1-easy/01-equations-of-motion.md` | AM1-easy ch.1 |
| `… (총 13 파일, ch.0~12)` | |
| `src/content/studies/ko/analytical-mechanics-2-easy/01-hamilton-jacobi.md` | AM2-easy ch.1 |
| `… (총 10 파일, ch.1~10)` | |

**변경 없음**: 코드/라우팅/레이아웃 일체.

---

## Task 1 — 스캐폴드: 책 메타데이터 + 23개 챕터 스텁 생성

**Files:**
- Create: `src/content/books/ko/analytical-mechanics-1-easy.yml`
- Create: `src/content/books/ko/analytical-mechanics-2-easy.yml`
- Create: `src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md` ~ `12-poisson-brackets-and-integrability.md` (총 13개)
- Create: `src/content/studies/ko/analytical-mechanics-2-easy/01-hamilton-jacobi.md` ~ `10-where-to-next.md` (총 10개)

이 태스크가 끝나면 23개 스텁 모두 `draft: true` 상태로 존재하고 빌드는 통과한다. 본문은 단 한 줄 placeholder만 두며, 이후 챕터 태스크들이 각각 덮어쓴다.

- [ ] **Step 1: AM1-easy 책 메타 작성**

`src/content/books/ko/analytical-mechanics-1-easy.yml`:

```yaml
book: analytical-mechanics-1-easy
bookTitle: 해석역학 I — 쉬운 풀이
description: 해석역학 I 의 모든 정의와 수식을 유지하면서, 학부 1–2학년 독자가 손에 잡힐 때까지 풀어 쓴 동반 노트.
lang: ko
pairSlug: am1-easy
totalChapters: 13
draft: true
updated: 2026-05-14
```

- [ ] **Step 2: AM2-easy 책 메타 작성**

`src/content/books/ko/analytical-mechanics-2-easy.yml`:

```yaml
book: analytical-mechanics-2-easy
bookTitle: 해석역학 II — 쉬운 풀이
description: 해석역학 II 의 모든 정의와 수식을 유지하면서, 학부 1–2학년 독자가 손에 잡힐 때까지 풀어 쓴 동반 노트.
lang: ko
pairSlug: am2-easy
totalChapters: 10
draft: true
updated: 2026-05-14
```

- [ ] **Step 3: AM1-easy 13개 챕터 스텁 생성**

각 파일은 아래 형식을 따른다 (필드값은 챕터별 표 참조). 본문은 `(작성 예정)` 한 줄만 둔다.

```markdown
---
title: '<원본 title>'
description: '<원본 description>'
book: analytical-mechanics-1-easy
bookTitle: 해석역학 I — 쉬운 풀이
chapter: <N>
lang: ko
pairSlug: <am1e-…>
draft: true
updated: 2026-05-14
---

(작성 예정)
```

| 파일명 | chapter | pairSlug | title | description |
|---|---|---|---|---|
| `00-mathematical-preliminaries.md` | 0 | `am1e-mathematical-preliminaries` | `수학적 준비 — 다양체 역학을 위한 도구상자` | `뉴턴의 법칙을 평면 너머로 끌고 가려면 새 어휘가 필요하다 — 기저, 행렬 지수, 그리고 접벡터까지 가는 가장 짧은 길.` |
| `01-equations-of-motion.md` | 1 | `am1e-equations-of-motion` | `운동 방정식 — 뉴턴에서 일반좌표로` | `데카르트 좌표의 $m\ddot{\vec x} = \vec F$ 가 멈추는 자리에서, 일반좌표 $q^i$ 와 배위공간 $M$ 이라는 두 단어가 해석역학의 문을 연다.` |
| `02-constrained-motion-on-surfaces.md` | 2 | `am1e-constrained-motion` | `곡면 위의 운동 — 구속과 라그랑주 승수` | `구슬은 고리 위에서만 움직인다 — 구속조건이 자유도를 어떻게 줄이고, 라그랑주 승수가 어떻게 구속력의 정체를 알려주는가.` |
| `03-tensors-and-covariant-derivative.md` | 3 | `am1e-tensors` | `텐서와 공변 미분 — 좌표가 바뀌어도 식이 같으려면` | `텐서는 좌표가 아니라 다중선형 사상 그 자체이고, 공변 미분은 좌표가 휘어 있을 때 편미분을 텐서로 되돌려 놓는 보정 장치다.` |
| `04-manifolds.md` | 4 | `am1e-manifolds` | `다양체 — 국소적으로는 평탄한 공간` | `점 근방에서는 $\mathbb{R}^n$ 처럼 매끄럽게 좌표를 줄 수 있지만 전체로는 휘어 있을 수 있는 공간 — 차트와 아틀라스로 다양체를 정의하고, $S^2$ 의 입체사영으로 한 번에 만져 본다.` |
| `05-vector-fields.md` | 5 | `am1e-vector-fields` | `벡터장과 흐름 — 시간 발전을 그리는 도구` | `다양체 위의 매끄러운 벡터장 $X$ 가 ODE 의 우변이 되고, 그 흐름 $\phi^t$ 가 시간 발전을 그리며, 두 벡터장의 리 괄호 $[X, Y]$ 가 흐름의 비가환성을 잰다.` |
| `06-differential-forms.md` | 6 | `am1e-differential-forms` | `미분형식 — 적분의 진짜 주인공` | `벡터 미적분의 grad·curl·div와 네 개의 적분 정리는, 다양체 위의 $d$ 와 한 줄짜리 스토크스 정리로 통합된다.` |
| `07-lagrangian-mechanics.md` | 7 | `am1e-lagrangian-mechanics` | `라그랑주 역학 — $TM$ 위의 함수가 운동을 결정한다` | `운동방정식을 힘의 균형이 아니라 하나의 함수 $L: TM \to \mathbb{R}$ 에서 끌어내는 시점 전환 — 점과 속도의 짝 위에서 정의된 라그랑지안과 오일러–라그랑주 방정식.` |
| `08-variational-principle.md` | 8 | `am1e-variational-principle` | `변분 원리 — 작용을 정류시키는 경로` | `경로 $q(t)$ 에 수를 대응시키는 범함수 $S[q] = \int L\,dt$ — 그 정류점이 운동방정식이라는 한 줄이, 좌표를 잊고 장과 양자까지 가는 다리 전체를 떠받친다.` |
| `09-symmetry-and-conservation.md` | 9 | `am1e-symmetry-conservation` | `대칭성과 보존 — 뇌터 정리` | `라그랑지안이 어떤 연속 변환에 대해 불변이면, 그 변환 하나당 궤적을 따라 보존되는 양이 정확히 하나씩 떨어진다.` |
| `10-hamiltonian-mechanics.md` | 10 | `am1e-hamiltonian-mechanics` | `해밀턴 역학 — 위상공간으로의 전환` | `르장드르 변환이 라그랑지언을 해밀토니언으로 바꾸고, 무대는 배위공간 $M$ 에서 여접다발 $T^*M$ 로 옮겨가며, 운동은 $2n$ 개의 1계 ODE 인 해밀턴 방정식으로 다시 쓰인다.` |
| `11-canonical-transformations.md` | 11 | `am1e-canonical-transformations` | `정준 변환 — 좋은 좌표를 고르는 기술` | `해밀턴 방정식의 형태를 보존하는 좌표 변환, 그 변환을 통째로 적어 내는 생성함수, 그리고 위상공간 부피가 보존된다는 리우빌 정리.` |
| `12-poisson-brackets-and-integrability.md` | 12 | `am1e-poisson-integrability` | `푸아송 괄호와 적분가능성` | `위상공간 위 함수들 사이의 리 괄호 — 푸아송 괄호로 해밀턴 역학을 한 줄에 다시 적고, 그 그림에서 적분가능한 계와 작용–각 변수가 어떻게 떨어지는지를 본다.` |

⚠️ description 필드는 single-quoted YAML 문자열이다. 원본 description 안의 `'` 가 있으면 `''` 로 escape (현 원본 description에는 없음). LaTeX 백슬래시는 single-quote 문자열 안에서 그대로 둔다.

- [ ] **Step 4: AM2-easy 10개 챕터 스텁 생성**

각 파일은 Step 3과 같은 형식, 단 `book` 과 `bookTitle` 만 AM2 값:

```markdown
---
title: '<원본 title>'
description: '<원본 description>'
book: analytical-mechanics-2-easy
bookTitle: 해석역학 II — 쉬운 풀이
chapter: <N>
lang: ko
pairSlug: <am2e-…>
draft: true
updated: 2026-05-14
---

(작성 예정)
```

| 파일명 | chapter | pairSlug | title | description |
|---|---|---|---|---|
| `01-hamilton-jacobi.md` | 1 | `am2e-hamilton-jacobi` | `해밀턴-야코비 방정식 — 작용을 직접 푸는 길` | `$2n$개의 해밀턴 ODE를 하나의 비선형 1계 편미분방정식으로 압축하고, 그 해 $S(q, t)$ 자체가 운동을 모두 담는다 — 자유 입자로 절차를 처음부터 끝까지 한 번 밟아본다.` |
| `02-canonical-transformations-deepened.md` | 2 | `am2e-canonical-deepened` | `정준 변환 심화 — 흐름은 변환이고, 변환은 흐름이다` | `해밀턴 흐름은 그 자체가 정준 변환이며, 정준 변환은 어떤 함수가 만들어 내는 짧은 흐름이다 — 두 개념이 같은 것임을 심플렉틱 형식으로 묶어 본다.` |
| `03-integrable-systems.md` | 3 | `am2e-integrable-systems` | `적분 가능한 계 — 토러스 위의 운동` | `$n$개의 서로 가환하는 보존량이 있으면 운동은 $n$차원 토러스 위에 갇힌다 — 케플러 문제가 그렇게 닫힌 타원이 되는 이유.` |
| `04-perturbation-theory.md` | 4 | `am2e-perturbation-theory` | `섭동 이론 — KAM 정리와 공명` | `적분 가능한 해밀턴 계에 작은 섭동을 더하면 대부분의 불변 토러스는 살아남지만, 공명 토러스는 부서진다 — 적분 가능성이 깨지는 방식.` |
| `05-continuum-mechanics.md` | 5 | `am2e-continuum-mechanics` | `연속체 역학 — 무한 자유도로의 도약` | `용수철로 이어진 $N$개의 입자를 $N \to \infty$ 극한으로 보내면 한 줄의 라그랑지안 밀도와 한 줄의 파동방정식이 떨어진다 — 같은 변분원리가 무한 자유도를 가진 장(field)으로 확장되는 과정.` |
| `06-classical-field-theory.md` | 6 | `am2e-classical-field-theory` | `고전 장론 — 스칼라장과 클라인–고든` | `시공간의 모든 점에 하나의 실수를 얹는다 — 가장 단순한 상대론적 파동방정식이 어떻게 작용 원리에서 떨어지는가.` |
| `07-relativistic-mechanics.md` | 7 | `am2e-relativistic-mechanics` | `상대론적 역학 — 4-벡터와 자유 입자 라그랑지안` | `고유시간을 작용으로 잡으면 자유 입자의 라그랑지안이 한 줄로 떨어진다 — 그 한 줄에서 $E^2 = p^2 + m^2$ 와 뉴턴 역학이 동시에 굴러 나오는 과정을 따라간다.` |
| `08-noether-in-field-theory.md` | 8 | `am2e-noether-field-theory` | `장론에서의 뇌터 — 보존류와 에너지–운동량 텐서` | `연속 대칭이 있는 곳마다 보존류 $j^\mu$ 가 따라온다 — U(1) 회전 대칭이 만든 4-전류와, 시공간 평행이동이 만든 에너지–운동량 텐서 $T^{\mu\nu}$ 의 첫 만남.` |
| `09-classical-to-quantum.md` | 9 | `am2e-classical-to-quantum` | `고전에서 양자로 — 디랙 대응과 경로 적분` | `고전의 푸아송 괄호가 양자의 교환자로 옮겨가고, 모든 경로의 위상 합이 작은 $\hbar$ 극한에서 다시 고전 경로 하나만을 남긴다 — 두 다리로 같은 강을 건너는 이야기.` |
| `10-where-to-next.md` | 10 | `am2e-where-to-next` | `어디로 갈 것인가 — 다음 책장` | `두 권에 걸쳐 따라온 작용 원리라는 한 가닥 줄기를 한 화면에 모아두고, 그 줄기에서 갈라져 나가는 세 개의 문을 가리키는 닫음의 장.` |

- [ ] **Step 5: 빌드 검증**

```bash
npm run check
```

기대: `0 errors`. 스키마 위반이 있으면 (예: `chapter` 가 number가 아닌 string으로 들어감) 에러 메시지를 보고 수정.

```bash
npm run build
```

기대: 빌드 성공. `dist/` 안에는 `draft: true` 책·챕터의 페이지가 생성되지 않음 (즉 `/ko/study/analytical-mechanics-1-easy/` 경로는 `dist`에 없음). `npm run dev` 로는 보이지만, 이는 정상 동작이다.

- [ ] **Step 6: Commit**

```bash
git add src/content/books/ko/analytical-mechanics-1-easy.yml \
        src/content/books/ko/analytical-mechanics-2-easy.yml \
        src/content/studies/ko/analytical-mechanics-1-easy/ \
        src/content/studies/ko/analytical-mechanics-2-easy/
git commit -m "study(am-easy): scaffold AM1-easy + AM2-easy (23 chapter stubs, draft)"
```

---

## AM1-easy 본문 작성 — Task 2 ~ Task 14

각 태스크는 위의 **각 챕터 작성 절차 (단계 A–F)** 를 그대로 따른다. 태스크별로 다른 것은 4가지: 원본 경로, 대상 경로, 프론트매터(이미 Task 1 에서 작성됨; 단계 B에서 덮어쓸 때 그대로 복사), commit slug.

### Task 2: AM1-easy ch.0 (수학적 준비)

- 원본: `src/content/studies/ko/analytical-mechanics-1/00-mathematical-preliminaries.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md`
- 본문 길이 목표: 16,500–18,500자 (원본 ≈ 4,400자의 약 4배)

- [ ] **Step 1: 단계 A — 원본 다시 읽기**

```bash
cat src/content/studies/ko/analytical-mechanics-1/00-mathematical-preliminaries.md
LC_ALL=C.UTF-8 wc -m src/content/studies/ko/analytical-mechanics-1/00-mathematical-preliminaries.md
```

- [ ] **Step 2: 단계 B — 새 파일 작성**

`src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md` 를 다시 쓴다 (Task 1에서 만든 스텁 덮어쓰기). 프론트매터는 Task 1 표의 ch.0 행 그대로 유지하고, 본문을 4-layer 규칙으로 작성. 섹션 제목·순서·모든 수식 유지.

- [ ] **Step 3: 단계 C — 글자 수 확인**

```bash
LC_ALL=C.UTF-8 awk '/^---$/{f=!f; next} !f {print}' src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md | wc -m
```

기대: 16,500–18,500. 벗어나면 단계 B 재작업.

- [ ] **Step 4: 단계 D — 빌드 검증**

```bash
npm run check
```

기대: `0 errors`.

- [ ] **Step 5: 단계 E — 수식 누락 점검**

```bash
diff <(grep -oE '\$[^$]+\$|\$\$' src/content/studies/ko/analytical-mechanics-1/00-mathematical-preliminaries.md | sort -u) \
     <(grep -oE '\$[^$]+\$|\$\$' src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md | sort -u) | head -40
```

원본에만 있는 (`<` 표시) 수식이 있으면 본문에 추가하고 단계 D 재실행.

- [ ] **Step 6: 단계 F — commit**

```bash
git add src/content/studies/ko/analytical-mechanics-1-easy/00-mathematical-preliminaries.md
git commit -m "study(analytical-mechanics-1-easy): add ch.00 mathematical-preliminaries"
```

### Task 3: AM1-easy ch.1 (운동 방정식)

- 원본: `src/content/studies/ko/analytical-mechanics-1/01-equations-of-motion.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/01-equations-of-motion.md`

- [ ] **Step 1: 단계 A — 원본 다시 읽기**: `cat <원본>` + `wc -m <원본>`
- [ ] **Step 2: 단계 B — 새 파일 작성** (4-layer 규칙)
- [ ] **Step 3: 단계 C — 글자 수 확인** (16,500–18,500)
- [ ] **Step 4: 단계 D — `npm run check` 0 errors**
- [ ] **Step 5: 단계 E — 수식 누락 점검 (diff)**
- [ ] **Step 6: commit** — `study(analytical-mechanics-1-easy): add ch.01 equations-of-motion`

### Task 4: AM1-easy ch.2 (곡면 위의 운동)

- 원본: `src/content/studies/ko/analytical-mechanics-1/02-constrained-motion-on-surfaces.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/02-constrained-motion-on-surfaces.md`

- [ ] Step 1: 단계 A — 원본 다시 읽기
- [ ] Step 2: 단계 B — 새 파일 작성
- [ ] Step 3: 단계 C — 글자 수 확인 (16,500–18,500)
- [ ] Step 4: 단계 D — `npm run check`
- [ ] Step 5: 단계 E — 수식 누락 점검
- [ ] Step 6: commit — `study(analytical-mechanics-1-easy): add ch.02 constrained-motion-on-surfaces`

### Task 5: AM1-easy ch.3 (텐서와 공변 미분)

- 원본: `src/content/studies/ko/analytical-mechanics-1/03-tensors-and-covariant-derivative.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/03-tensors-and-covariant-derivative.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.03 tensors-and-covariant-derivative`

### Task 6: AM1-easy ch.4 (다양체)

- 원본: `src/content/studies/ko/analytical-mechanics-1/04-manifolds.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/04-manifolds.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.04 manifolds`

### Task 7: AM1-easy ch.5 (벡터장과 흐름)

- 원본: `src/content/studies/ko/analytical-mechanics-1/05-vector-fields.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/05-vector-fields.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.05 vector-fields`

### Task 8: AM1-easy ch.6 (미분형식)

- 원본: `src/content/studies/ko/analytical-mechanics-1/06-differential-forms.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/06-differential-forms.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.06 differential-forms`

### Task 9: AM1-easy ch.7 (라그랑주 역학)

- 원본: `src/content/studies/ko/analytical-mechanics-1/07-lagrangian-mechanics.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/07-lagrangian-mechanics.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.07 lagrangian-mechanics`

### Task 10: AM1-easy ch.8 (변분 원리)

- 원본: `src/content/studies/ko/analytical-mechanics-1/08-variational-principle.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/08-variational-principle.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.08 variational-principle`

### Task 11: AM1-easy ch.9 (대칭성과 보존)

- 원본: `src/content/studies/ko/analytical-mechanics-1/09-symmetry-and-conservation.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/09-symmetry-and-conservation.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.09 symmetry-and-conservation`

### Task 12: AM1-easy ch.10 (해밀턴 역학)

- 원본: `src/content/studies/ko/analytical-mechanics-1/10-hamiltonian-mechanics.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/10-hamiltonian-mechanics.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.10 hamiltonian-mechanics`

### Task 13: AM1-easy ch.11 (정준 변환)

- 원본: `src/content/studies/ko/analytical-mechanics-1/11-canonical-transformations.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/11-canonical-transformations.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.11 canonical-transformations`

### Task 14: AM1-easy ch.12 (푸아송 괄호와 적분가능성)

- 원본: `src/content/studies/ko/analytical-mechanics-1/12-poisson-brackets-and-integrability.md`
- 대상: `src/content/studies/ko/analytical-mechanics-1-easy/12-poisson-brackets-and-integrability.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-1-easy): add ch.12 poisson-brackets-and-integrability`

---

## Task 15 — AM1-easy 공개 (draft → false 일괄 전환)

**Files:** `src/content/books/ko/analytical-mechanics-1-easy.yml`, `src/content/studies/ko/analytical-mechanics-1-easy/*.md` (총 14 파일)

전제: Task 2~14 모두 완료. 이 태스크는 AM1-easy 13장이 모두 만족스러운 상태에서 한 commit으로 공개 전환한다.

- [ ] **Step 1: AM1-easy 책 메타 draft 해제**

`src/content/books/ko/analytical-mechanics-1-easy.yml` 의 `draft: true` 를 `draft: false` 로 변경하고, `updated` 를 오늘 날짜 (예: `2026-05-21`) 로 갱신.

- [ ] **Step 2: AM1-easy 챕터 13개 draft 일괄 해제**

```bash
sed -i 's/^draft: true$/draft: false/' src/content/studies/ko/analytical-mechanics-1-easy/*.md
```

⚠️ 이 sed는 `draft: true` 줄 전체가 정확히 일치할 때만 매치한다. 챕터 본문 안에 `draft: true` 라는 줄이 우연히 들어 있을 가능성은 없지만, sed 실행 후 `git diff -- src/content/studies/ko/analytical-mechanics-1-easy/` 로 변경이 14개 파일의 프론트매터에만 일어났는지 확인.

```bash
git diff --stat src/content/studies/ko/analytical-mechanics-1-easy/
git diff src/content/studies/ko/analytical-mechanics-1-easy/ | grep -E '^[+-]draft:'
```

기대: 13줄의 `-draft: true` 와 13줄의 `+draft: false`.

- [ ] **Step 3: `updated` 필드 일괄 갱신 (선택)**

원하면 13장의 `updated` 도 공개 날짜로 맞춤. 안 해도 무방 (작성일 그대로 두어도 됨).

- [ ] **Step 4: 빌드 검증**

```bash
npm run check && npm run build
```

기대: 빌드 성공. `dist/ko/study/analytical-mechanics-1-easy/index.html` 와 13개 챕터 HTML 이 생성됐는지 확인:

```bash
find dist/ko/study/analytical-mechanics-1-easy -type f -name '*.html' | sort
```

기대: 14개 (책 인덱스 1 + 챕터 13).

- [ ] **Step 5: 로컬 확인**

```bash
npm run dev
```

브라우저에서:
1. `http://localhost:4321/ko/study/` — AM1-easy 가 목록에 보이는지
2. `http://localhost:4321/ko/study/analytical-mechanics-1-easy/` — TOC 13장이 모두 나열되고 'draft' 표시가 없는지
3. 임의 챕터 — lang toggle 에 KO 만 보이는지, KaTeX 수식이 깨지지 않았는지, 이전/다음 챕터 nav가 동작하는지

- [ ] **Step 6: Commit**

```bash
git add src/content/books/ko/analytical-mechanics-1-easy.yml \
        src/content/studies/ko/analytical-mechanics-1-easy/
git commit -m "study(analytical-mechanics-1-easy): publish (draft → false, 13 chapters)"
```

- [ ] **Step 7: Push**

```bash
git push
```

GitHub Actions 가 deploy 한다. 약 2–3분 후 https://crowdy.dev/ko/study/analytical-mechanics-1-easy/ 가 접근 가능해야 한다.

---

## AM2-easy 본문 작성 — Task 16 ~ Task 25

AM1과 동일 구조. 본문 길이 목표 동일 (16,500–18,500자, 원본 ≈ 4,400–5,000자의 약 4배).

### Task 16: AM2-easy ch.1 (해밀턴-야코비)

- 원본: `src/content/studies/ko/analytical-mechanics-2/01-hamilton-jacobi.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/01-hamilton-jacobi.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.01 hamilton-jacobi`

### Task 17: AM2-easy ch.2 (정준 변환 심화)

- 원본: `src/content/studies/ko/analytical-mechanics-2/02-canonical-transformations-deepened.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/02-canonical-transformations-deepened.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.02 canonical-transformations-deepened`

### Task 18: AM2-easy ch.3 (적분 가능한 계)

- 원본: `src/content/studies/ko/analytical-mechanics-2/03-integrable-systems.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/03-integrable-systems.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.03 integrable-systems`

### Task 19: AM2-easy ch.4 (섭동 이론)

- 원본: `src/content/studies/ko/analytical-mechanics-2/04-perturbation-theory.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/04-perturbation-theory.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.04 perturbation-theory`

### Task 20: AM2-easy ch.5 (연속체 역학)

- 원본: `src/content/studies/ko/analytical-mechanics-2/05-continuum-mechanics.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/05-continuum-mechanics.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.05 continuum-mechanics`

### Task 21: AM2-easy ch.6 (고전 장론)

- 원본: `src/content/studies/ko/analytical-mechanics-2/06-classical-field-theory.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/06-classical-field-theory.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.06 classical-field-theory`

### Task 22: AM2-easy ch.7 (상대론적 역학)

- 원본: `src/content/studies/ko/analytical-mechanics-2/07-relativistic-mechanics.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/07-relativistic-mechanics.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.07 relativistic-mechanics`

### Task 23: AM2-easy ch.8 (장론에서의 뇌터)

- 원본: `src/content/studies/ko/analytical-mechanics-2/08-noether-in-field-theory.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/08-noether-in-field-theory.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.08 noether-in-field-theory`

### Task 24: AM2-easy ch.9 (고전에서 양자로)

- 원본: `src/content/studies/ko/analytical-mechanics-2/09-classical-to-quantum.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/09-classical-to-quantum.md`

- [ ] Step 1–6: 단계 A–F 적용
- commit: `study(analytical-mechanics-2-easy): add ch.09 classical-to-quantum`

### Task 25: AM2-easy ch.10 (어디로 갈 것인가)

- 원본: `src/content/studies/ko/analytical-mechanics-2/10-where-to-next.md`
- 대상: `src/content/studies/ko/analytical-mechanics-2-easy/10-where-to-next.md`
- ⚠️ 원본이 74줄로 다른 챕터보다 짧다. 본문 ≈ 3,300자 추정. 그래도 4배 목표 ≈ 13,000–14,000자로 잡되, 닫음의 장 성격상 layer 추가 어려우면 11,000자 정도까지 허용.

- [ ] Step 1–6: 단계 A–F 적용 (글자 수 목표만 11,000–14,000으로 변경)
- commit: `study(analytical-mechanics-2-easy): add ch.10 where-to-next`

---

## Task 26 — AM2-easy 공개 (draft → false 일괄 전환)

**Files:** `src/content/books/ko/analytical-mechanics-2-easy.yml`, `src/content/studies/ko/analytical-mechanics-2-easy/*.md` (총 11 파일)

전제: Task 16~25 모두 완료.

- [ ] **Step 1: AM2-easy 책 메타 draft 해제**

`src/content/books/ko/analytical-mechanics-2-easy.yml` 의 `draft: true` 를 `draft: false` 로 변경, `updated` 갱신.

- [ ] **Step 2: 챕터 10개 draft 일괄 해제**

```bash
sed -i 's/^draft: true$/draft: false/' src/content/studies/ko/analytical-mechanics-2-easy/*.md
git diff src/content/studies/ko/analytical-mechanics-2-easy/ | grep -E '^[+-]draft:'
```

기대: 10줄 `-draft: true` / 10줄 `+draft: false`.

- [ ] **Step 3: 빌드 검증**

```bash
npm run check && npm run build
find dist/ko/study/analytical-mechanics-2-easy -type f -name '*.html' | sort
```

기대: 11개 HTML (책 인덱스 1 + 챕터 10).

- [ ] **Step 4: 로컬 확인**

```bash
npm run dev
```

`http://localhost:4321/ko/study/` 에 AM2-easy 도 추가됐는지, `/ko/study/analytical-mechanics-2-easy/` TOC 가 10장 다 보이는지, 임의 챕터의 lang 토글이 KO 만인지 확인.

- [ ] **Step 5: Commit + push**

```bash
git add src/content/books/ko/analytical-mechanics-2-easy.yml \
        src/content/studies/ko/analytical-mechanics-2-easy/
git commit -m "study(analytical-mechanics-2-easy): publish (draft → false, 10 chapters)"
git push
```

GitHub Actions deploy → `https://crowdy.dev/ko/study/analytical-mechanics-2-easy/` 접근 가능.

---

## Done definition

- `https://crowdy.dev/ko/study/analytical-mechanics-1-easy/` 에 13장 TOC 가 공개되어 있고, 각 챕터 본문이 ≈ 17,000자, lang 토글은 KO 만.
- `https://crowdy.dev/ko/study/analytical-mechanics-2-easy/` 도 동일하게 10장 (단 ch.10은 ≈ 12,000자 허용).
- 원본 `analytical-mechanics-1/2` 책은 변경되지 않았다.
- 코드 변경 없음 (`git diff main^^^…main -- src/pages src/layouts src/components src/utils src/content/config.ts` 가 empty).
