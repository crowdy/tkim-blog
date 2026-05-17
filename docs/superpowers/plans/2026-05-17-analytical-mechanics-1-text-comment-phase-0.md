# Analytical Mechanics I — 본문 해설 — Phase 0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 책 메타·스타일 가이드·1편 샘플(1.1.1) 을 박아 `analytical-mechanics-1-text-comment` 시리즈의 토대를 세운다. 章 1–5 의 본격 집필은 별 spec/plan 으로 미룬다.

**Architecture:** 콘텐츠 추가 only. 코드 변경 0. 기존 `studies` 컬렉션 스키마·`[lang]/study/[book]/[...slug].astro` 라우팅·KaTeX·Shiki 설정을 그대로 사용. 산출물 3개 + 검증.

**Tech Stack:** Astro 5 / TypeScript / Markdown + KaTeX (`remark-math`, `rehype-katex`) / Shiki dual theme / Astro content collections (Zod).

**Reference spec:** `docs/superpowers/specs/2026-05-17-analytical-mechanics-1-text-comment-design.md`

---

## File Structure (Phase 0)

| File | Action | Responsibility |
|---|---|---|
| `src/content/books/ko/analytical-mechanics-1-text-comment.yml` | Create | 책 메타 (제목·설명·총 편 수 = 104·언어=ko) |
| `docs/superpowers/specs/2026-05-17-analytical-mechanics-1-text-comment-style-guide.md` | Create | 章별 spec 이 참조할 단일 스타일·표기 source |
| `src/content/studies/ko/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics.md` | Create | 1.1.1 절의 한국어 본문 해설 — 샘플이자 章 1 의 첫 편 |

검증은 `npm run check` (Zod + TypeScript) + `npm run build` (Astro 빌드) + `npm run dev` (수동 가시 확인) 의 3 단계.

---

## Task 1: 책 메타 생성 (`books/ko/analytical-mechanics-1-text-comment.yml`)

**Files:**
- Create: `src/content/books/ko/analytical-mechanics-1-text-comment.yml`

- [ ] **Step 1: 파일 생성**

내용 (그대로 복사):

```yaml
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
description: '『解析力学 I』 原書의 모든 절(1.1.1 … 5.5.4)을 차례로 따라가며 한 절씩 풀어 쓰는 본문 해설 시리즈. 가능한 곳마다 LaTeX 로 식을 다시 적고, 파이썬으로 동작을 확인한다.'
lang: ko
pairSlug: am1-text-comment
totalChapters: 104
draft: false
updated: 2026-05-17
```

검증 포인트:
- `book` 값이 파일명 stem 과 일치한다 (`analytical-mechanics-1-text-comment`).
- `lang: ko` 가 디렉터리 (`books/ko/`) 와 일치한다.
- `description` 은 1줄 문자열이라 YAML 의 `>` 또는 `|` 가 필요 없다. 작은따옴표로 감싼다.

- [ ] **Step 2: 스키마 검증**

Run: `cd /root/dev/crowdy/tkim-blog && npm run check`
Expected: `0 errors, 0 warnings, 0 hints` (또는 동등한 통과 메시지). YAML 이 `books` 컬렉션의 Zod 스키마 (`src/content/config.ts:15-29`) 를 만족하면 통과.

만약 실패하면 `books` Zod 스키마와 위 yaml 의 필드를 한 줄씩 대조해 보정한다.

- [ ] **Step 3: Commit**

```bash
git add src/content/books/ko/analytical-mechanics-1-text-comment.yml
git commit -m "$(cat <<'EOF'
study(book): add analytical-mechanics-1-text-comment metadata

Phase 0 of the subsection-level Korean commentary series for 解析力学 I.
totalChapters=104 reflects the target post count (1.1.1 … 5.5.4); only the
first post lands in this phase.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: 스타일 가이드 작성 (`specs/.../style-guide.md`)

**Files:**
- Create: `docs/superpowers/specs/2026-05-17-analytical-mechanics-1-text-comment-style-guide.md`

이 문서는 章 1–5 의 각 spec 이 *유일한 source* 로 참조한다. 본문을 *그대로* 박는다 — 章 spec 에서 풀어 쓰지 말 것.

- [ ] **Step 1: 파일 생성**

내용 (그대로 복사):

````markdown
# Analytical Mechanics I — 본문 해설 — Style Guide

> 본 시리즈 (`analytical-mechanics-1-text-comment`) 의 모든 포스트가 따라야 하는 형식·문체·표기 규약. 章별 spec 은 이 문서를 *유일한 source* 로 참조한다.

## 1. 한 편의 분량

- 한국어 본문 **1,500–2,500 자** 가 기본 (공백 포함).
- 절의 난이도·중요도에 따라 ±30% 까지 허용 (1,000 자 이하나 3,500 자 이상으로는 가지 않는다).
- 짧은 절(예: 1.4.7 引き戻しと微分写像) 이라도 *왜 다음 절로 넘어가는가* 의 다리는 반드시 포함한다.

## 2. 포스트 표준 골격

```markdown
---
title: '<章.節.小節> — <한국어 제목>: <부제>'
description: '<2–3 문장의 요약. 첫 LaTeX 식 한 줄을 포함하면 좋다.>'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: <1 … 104 의 시퀀스 번호>
lang: ko
pairSlug: am1tc-<章>-<節>-<小節>-<영문-슬러그>
draft: false
updated: <YYYY-MM-DD>
---

# <章.節.小節> — <한국어 제목>: <부제>

> <description 과 동일한 한 줄(또는 두 줄) 의 인용블록>

## 본문이 말하는 것

(1–2 단락. 원서가 그 절에서 무엇을 *주장* 하는지 정리. 핵심 식·정의는 LaTeX 로 다시 적는다.)

## 한 번 더, 천천히

(주장을 풀어 쓴다. 식의 변형 단계를 한 줄씩. 필요하면 하위 H3 로 나눈다.)

## 파이썬으로 확인 — <간단 제목>

(코드가 적절한 절일 때만. 코드 직전·직후에 짧은 해설 문단.)

## 다음 절(<N.M.K>)로 가는 다리

(이 절의 결론 → 다음 절의 첫 줄 사이의 *서사적* 연결. 한 단락.)
```

각 H2 의 사용은 다음과 같다.

| H2 | 용도 | 생략 가능? |
|---|---|---|
| 본문이 말하는 것 | 원서의 주장 요약 | ✗ 必須 |
| 한 번 더, 천천히 | 풀이 본체 | ✗ 必須 |
| 파이썬으로 확인 — … | 작은 수치 실험 | ✓ (절의 성격에 따라) |
| 다음 절로 가는 다리 | 서사 잇기 | ✗ 必須 (마지막 절 5.5.4 만 예외 — 책 전체 회수로 대체) |

## 3. 톤·인칭

- 인칭은 *비인칭* 을 기본 ("...이다." "...로 적힌다."). "우리는" 같은 1인칭 복수도 OK, 단 남발하지 않는다.
- 원서 인용은 "원서 X.Y.Z 절은 ... 라고 적는다." 로 통일.
- 한국어/한자어 어휘 우선. 일본어 그대로 두는 경우는 *원서의 핵심어* 가 한국어 정확한 짝이 없을 때 (예: 配位空間, 拘束) — 첫 등장 시 한자 + (한국어 직역) 병기.

## 4. LaTeX 표기 규약

- 인라인: `$ ... $`, 디스플레이: `$$ ... $$`
- 벡터: `\mathbf{x}`, `\mathbf{F}`. 단위벡터: `\hat{\mathbf x}`, `\hat{\mathbf n}`.
- 시간 미분: 뉴턴 점 표기 `\dot x`, `\ddot x`. 일반 미분: `\frac{df}{dx}`, 편미분: `\frac{\partial f}{\partial x}`.
- 인덱스: 아인슈타인 합 규약. 반변(위) + 공변(아래) 의 짝. 합 기호 `\sum` 는 *규약을 깨야 할 때* 만 명시.
- 좌표 변환·미분형식이 등장하는 章 (1.3 / 1.5 / 1.6 / 5.x) 에서는 절 초입에 *이 절에서 새로 등장한 기호* 만 한두 줄 모은다.

## 5. 코드 규약

- 언어: **Python 3.10+**. 표준 도구: NumPy, SciPy, Matplotlib. 그 외는 *절의 본질이 요구할 때* 만.
- 한 절의 코드는 **30 ~ 60 줄** 이 기본. 그보다 길어지면 *코어 함수만* 보이고 구성 함수는 본문에서 말로 설명한다.
- 모든 코드는 *복붙해서 그대로 실행* 되어야 한다 — `import` 부터 결과 출력까지.
- 그래프는 코드 본문에 명령은 적되 *블로그 본문에는 이미지를 박지 않는다* (Astro 의 정적 그림 의존을 피해, 코드 + 기대 출력 문장으로 대체).
- 코드 직전에 "이 코드의 메시지는 …" 한 줄, 직후에 "이 결과는 … 임을 보인다" 한 줄을 둔다.

## 6. 코드가 적절하지 않은 절

순수 정의·동치성·범주적 추상의 절은 코드 대신 *도해 설명* 으로 간다. 후보(章 1 기준):

- 1.4.1 微分可能多様体
- 1.4.4 接ベクトルと接空間
- 1.4.7 引き戻しと微分写像
- 1.5.1 双対空間と1ベクトル
- 1.6.6 ボアンカレの補題

이 외의 절은 *기본적으로 코드 포함* 으로 시작한다.

## 7. 어휘 사전 (cumulative)

각 章 spec 의 첫 단락에 *그 章 까지 누적된* 한·일·영 어휘 사전을 박는다. 본 시리즈의 한국어 어휘 결정의 *유일한* source 이며, 章 진행 중 새 어휘는 같은 표에 행을 더해 commit 한다.

| 일본어 | 한국어 | 영어 | 등장 절 |
|---|---|---|---|
| 拘束条件 | 구속조건 | constraint | 1.1.2 |
| 配位空間 | 배위공간 | configuration space | 1.1.2 |
| 仮想仕事 | 가상일 | virtual work | 1.1.3 |

(章 1 spec 에서 본 표를 1.1.1 ~ 1.6.8 의 어휘로 채운다.)

## 8. 파일·시퀀스 번호 매핑

전체 104 편의 시퀀스 매핑은 별표로 두지 않고, 章 spec 의 시작 부분에 該 章 의 매핑 (시퀀스 → 章.節.小節 → 영문 슬러그) 만 박는다. 1.1.1 의 매핑은 다음과 같다.

| 시퀀스 | 章.節.小節 | 영문 슬러그 | 파일명 |
|---:|---|---|---|
| 001 | 1.1.1 | newtonian-mechanics | `001-1-1-1-newtonian-mechanics.md` |

(章 1 spec 에서 002 ~ 037 의 매핑을 이어 채운다.)
````

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-05-17-analytical-mechanics-1-text-comment-style-guide.md
git commit -m "$(cat <<'EOF'
study(spec): style guide for analytical-mechanics-1-text-comment

Single source of post format, LaTeX/code conventions, and cumulative
glossary referenced by per-chapter specs in Phases 1–5.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: 1편 샘플 작성 (`studies/.../001-1-1-1-newtonian-mechanics.md`)

**Files:**
- Create: `src/content/studies/ko/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics.md`

- [ ] **Step 1: 디렉터리 + 파일 생성**

내용 (그대로 복사):

````markdown
---
title: '1.1.1 — 뉴턴 역학: 한 줄 방정식이 깔고 앉은 다섯 가지 가정'
description: '$\mathbf F = m\ddot{\mathbf x}$ 는 한 줄이지만, 이 한 줄을 문장으로 풀면 다섯 개의 가정이 줄줄이 끌려 나온다. 그 가정들을 한 번 더 직시하면, 책이 1.1.2 부터 손대는 拘束이 어디서 등장하는지가 보인다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 1
lang: ko
pairSlug: am1tc-1-1-1-newtonian-mechanics
draft: false
updated: 2026-05-17
---

# 1.1.1 — 뉴턴 역학: 한 줄 방정식이 깔고 앉은 다섯 가지 가정

> $\mathbf F = m\ddot{\mathbf x}$ 는 한 줄이지만, 이 한 줄을 문장으로 풀면 다섯 개의 가정이 줄줄이 끌려 나온다. 그 가정들을 한 번 더 직시하면, 책이 1.1.2 부터 손대는 拘束이 어디서 등장하는지가 보인다.

## 본문이 말하는 것

원서 1.1.1 절은 $N$ 개의 질점(point particle)으로 이루어진 계의 운동방정식

$$
m_i \ddot{\mathbf x}_i = \mathbf F_i \quad (i = 1, 2, \dots, N)
$$

를 *전제* 로 깔고 시작한다. 여기서 $\mathbf x_i \in \mathbb R^3$ 은 $i$ 번째 질점의 위치벡터, $m_i > 0$ 은 그 질점의 질량, $\mathbf F_i$ 는 그 질점에 작용하는 합력이다. 우변의 힘은 시간과 모든 질점의 위치·속도의 함수, 즉 $\mathbf F_i = \mathbf F_i(t, \mathbf x_1, \dots, \mathbf x_N, \dot{\mathbf x}_1, \dots, \dot{\mathbf x}_N)$ 로 적힌다. 본문은 이 식을 *증명* 의 대상이 아니라 *출발점* 으로 둔다 — 뉴턴 역학의 공리다.

핵심은 한 줄 더 있다. 위 식이 결정하는 것은 **2차 상미분방정식의 초기치 문제** 다. 시각 $t_0$ 에서의 위치 $\mathbf x_i(t_0)$ 와 속도 $\dot{\mathbf x}_i(t_0)$ 를 주면, 그 뒤의 운동 $\mathbf x_i(t)$ 가 유일하게 결정된다 (충분한 정칙성 가정 하에).

## 한 번 더, 천천히

식을 문장으로 풀어 보면 다섯 개의 가정이 줄줄이 끌려 나온다.

**(1) 위치공간은 $\mathbb R^3$ 이다.** 모든 질점의 위치는 같은 *3차원 유클리드 공간* 의 점이다. 거리·각도가 정의되고, 좌표를 잡으면 $(x, y, z)$ 의 세 실수로 적힌다. 곡면 위의 운동이나 회전체의 자세는 이 가정으로는 적기 어색하다 — 이 사실이 1.1.2 의 *拘束* 이 등장하는 자리다.

**(2) 시간은 한 줄의 매개변수 $t \in \mathbb R$ 이다.** 절대 시간이라는 뉴턴의 가정이 여기에 숨어 있다. 좌변의 $\ddot{\mathbf x}_i$ 는 $t$ 에 대한 두 번 미분이고, 모든 관성계 관측자가 같은 $t$ 를 공유한다고 본다. 이 가정의 한계를 본격적으로 마주하는 곳은 解析力学 II 의 상대론적 역학이다.

**(3) "질점" 의 정의가 있다.** 부피 0, 회전 자유도 0 인 추상적 점이다. 실제 입자(예: 야구공)는 부피·자세·내부 자유도를 가지지만, 1.1.1 은 그 모두를 *없다고* 친다. 강체(rigid body)·연속체로의 일반화는 본권 후반부의 과제다.

**(4) 힘 $\mathbf F_i$ 는 *주어진* 함수다.** 위 식 우변은 좌변과 *독립적* 으로 주어졌다고 가정한다. 마찰력처럼 운동에 의존하는 힘도 함수 형태로 명시되면 OK. 단 — 1.1.3 에서 등장할 *拘束力* (constraint force) 은 미리 주어지지 않는다. 운동의 결과로 *결정되어야 하는* 미지의 힘이다. 이 차이가 분석역학의 핵심 동기다.

**(5) 좌표계는 관성계(inertial frame)다.** 회전·가속하는 좌표계에서는 좌변·우변에 *겉보기 힘* (코리올리·원심력) 이 끼어든다. 책의 뒷부분은 이 가정도 좌표 자유로운 형식 — 다양체와 공변미분 — 으로 풀어버리지만, 1.1.1 시점에서는 그저 *고정된 관성좌표계* 에서 본 그림이다.

이 다섯을 정리해 두면, 다음 절 1.1.2 의 *拘束条件と配位空間* 이 왜 *바로 다음에 등장해야 하는가* 가 자연스러워진다. **(1) 의 가정 — 위치공간이 평면이다 — 이 깨지는 순간**, 우리는 拘束 의 언어를 빌려야만 한다.

### 한 입자의 경우로 다시

식이 추상적이라면 $N = 1$ 의 경우로 환원해 보자. 한 입자의 운동은

$$
m \ddot{\mathbf x} = \mathbf F(t, \mathbf x, \dot{\mathbf x})
$$

이 한 줄이다. 위치 $\mathbf x = (x, y, z)$ 의 각 성분으로 풀어 적으면

$$
m \ddot x = F_x, \quad m \ddot y = F_y, \quad m \ddot z = F_z
$$

세 개의 결합된 2차 ODE 다. 초기조건 6개 ($\mathbf x(t_0)$ 와 $\dot{\mathbf x}(t_0)$, 각 3개) 가 주어지면 해 $\mathbf x(t)$ 가 유일하게 정해진다.

## 파이썬으로 확인 — 중력장 아래 입자

이 코드의 메시지는 단순하다: 뉴턴 식은 "지금" 의 6개 숫자를 "미래의 모든 순간" 의 위치로 옮기는 *함수* 다. 균일 중력장 ($\mathbf F = -m g \hat{\mathbf z}$) 아래에서 비스듬히 던진 입자의 궤도를, 수치 적분 결과와 해석해를 나란히 두고 확인한다.

```python
# 균일 중력장 아래 입자: m*x_ddot = F = -m*g*z_hat
# 초기조건 6개 (위치 3 + 속도 3) → 궤도가 유일하게 결정됨을 확인한다.
import numpy as np
from scipy.integrate import solve_ivp

g = 9.81
m = 1.0  # 결과는 m 에 의존하지 않는다 — 갈릴레오 동치원리의 한 얼굴

def rhs(t, state):
    # state = [x, y, z, vx, vy, vz]
    x, y, z, vx, vy, vz = state
    ax, ay, az = 0.0, 0.0, -g
    return [vx, vy, vz, ax, ay, az]

# 초기조건: 원점에서 (10, 0, 10) m/s 로 발사
state0 = [0.0, 0.0, 0.0, 10.0, 0.0, 10.0]
sol = solve_ivp(rhs, (0.0, 2.5), state0, dense_output=True,
                rtol=1e-9, atol=1e-12)

t = np.linspace(0, 2.5, 200)
x, _, z, _, _, _ = sol.sol(t)

# 해석해와 비교: x(t) = vx0 * t, z(t) = vz0 * t - 0.5 g t^2
x_exact = 10.0 * t
z_exact = 10.0 * t - 0.5 * g * t**2
print(f"max |x_numeric - x_exact| = {np.max(np.abs(x - x_exact)):.2e}")
print(f"max |z_numeric - z_exact| = {np.max(np.abs(z - z_exact)):.2e}")
# 기대 출력 (수치 미세 차이 가능):
#   max |x_numeric - x_exact| = ~1e-9
#   max |z_numeric - z_exact| = ~1e-7
```

이 결과는 scipy 의 RK45 가 뉴턴 식에 충실하다 — 즉 *식이 결정* 하는 그 궤도를 그대로 따라간다 — 는 사실의 작은 증거다. 분석역학이 손대는 것은 이 *결정성* 자체가 아니라, *결정성을 가장 짧은 식* 으로 적기 위한 좌표·구조의 선택이다.

## 다음 절(1.1.2)로 가는 다리

위 가정 (1) — 위치공간이 $\mathbb R^3$ 이다 — 이 깨지는 가장 흔한 경우가 *拘束* 이다. 단진자의 추는 길이 $\ell$ 인 막대에 매달려 있어 $|\mathbf x| = \ell$ 을 항상 만족한다. 비드는 굽은 철사 위에서만 움직인다. 강체는 모든 점 사이 거리를 보존한다. 이런 경우 $\mathbf x \in \mathbb R^3$ 의 *모든* 점이 가능한 것이 아니라, 일부 부분집합 — *配位空間* (configuration space) — 만이 허용된다. 1.1.2 는 그 부분집합이 어떻게 정의되는지, 그리고 그 공간 위에서 운동을 적으려면 어떤 어휘가 필요한지를 묻는다.
````

검증 포인트:
- 프런트매터 8개 필드가 모두 채워져 있다. `prerequisites` 는 옵션이라 생략.
- `chapter: 1` (정수). `updated: 2026-05-17` (YYYY-MM-DD).
- 첫 H1 (`# 1.1.1 — …`) 의 문구가 `title` 과 정확히 같다.
- `description` 의 문구가 인용 블록 (`> …`) 과 정확히 같다.
- 코드 블록의 펜스 열림·닫힘이 짝지어져 있다 (` ``` ` 4 묶음).

- [ ] **Step 2: 스키마 + 빌드 검증**

Run:

```bash
cd /root/dev/crowdy/tkim-blog && npm run check
```

Expected: `0 errors`. `studies` 컬렉션의 Zod 스키마 (`src/content/config.ts:31-45`) 와 프런트매터가 일치해야 통과.

이어서

```bash
cd /root/dev/crowdy/tkim-blog && npm run build
```

Expected: `Complete!` 로 끝나는 Astro 빌드 성공. `dist/ko/study/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics/index.html` 이 생성되어야 한다.

```bash
ls -la dist/ko/study/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics/
```

Expected: `index.html` 한 개가 존재.

빌드 실패 시 자주 보이는 원인:
- KaTeX 가 `\R` 같은 사용자 정의 매크로를 거부한다 → 본 plan 은 `\mathbb R` 만 사용했으므로 문제 없음.
- 백슬래시 인덱스 표기에서 펜스 안의 \(...\) 가 코드로 해석된다 → 본 plan 은 디스플레이는 `$$ ... $$`, 인라인은 `$ ... $` 만 사용.
- 디렉터리 이름과 `book` 필드 mismatch → 디렉터리 `analytical-mechanics-1-text-comment` 와 yaml 의 `book` 값이 동일해야 함.

- [ ] **Step 3: Commit**

```bash
git add src/content/studies/ko/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics.md
git commit -m "$(cat <<'EOF'
study(am1-text-comment): 1.1.1 — Newtonian mechanics (sample post)

First post of the subsection-level commentary series, doubling as the
canonical template for chapters 1–5.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: 수동 가시 확인 (dev server smoke test)

**Files:** (없음 — 확인 only)

이 task 는 commit 을 만들지 않는다. 빌드 산출물이 *눈* 으로도 정상인지 확인하기 위한 단계.

- [ ] **Step 1: dev 서버 기동**

Run (백그라운드 권장):

```bash
cd /root/dev/crowdy/tkim-blog && npm run dev
```

Expected: `Local: http://localhost:4321/` 로 시작하는 로그. 포트는 환경에 따라 다를 수 있음.

- [ ] **Step 2: 책 색인 페이지 확인**

브라우저로 `http://localhost:4321/ko/study/` 열기.

기대:
- 기존 책 카드 목록 (해석역학 I, 해석역학 I — 쉬운 풀이, 해석역학 II, 양자화학 14장, 난류 기초) 사이에 **"해석역학 I — 본문 해설"** 카드가 새로 보인다.
- 진행도 표시가 `1 / 104` (또는 `0.96%`) 부근.

이어서 `http://localhost:4321/ko/study/analytical-mechanics-1-text-comment/` 열기.

기대:
- 페이지 제목 = "해석역학 I — 본문 해설".
- 절 목록에 `1.1.1 — 뉴턴 역학: 한 줄 방정식이 깔고 앉은 다섯 가지 가정` 한 항목.

- [ ] **Step 3: 샘플 포스트 가시 확인**

브라우저로 `http://localhost:4321/ko/study/analytical-mechanics-1-text-comment/001-1-1-1-newtonian-mechanics` 열기.

기대:
- 제목·인용블록·H2 헤더 4개 (본문이 말하는 것 / 한 번 더, 천천히 / 파이썬으로 확인 — 중력장 아래 입자 / 다음 절(1.1.2)로 가는 다리) 가 순서대로 보인다.
- LaTeX 식 ($\mathbf F = m\ddot{\mathbf x}$, $m_i \ddot{\mathbf x}_i = \mathbf F_i$ 등) 이 깨지지 않고 KaTeX 로 렌더링된다.
- Python 코드 블록이 Shiki 의 듀얼 테마로 렌더된다 (라이트·다크 둘 다 확인).
- 페이지 상단에 다크모드 토글이 보이고, 토글했을 때 코드 블록·본문이 같이 전환된다.

문제 발생 시 (예: KaTeX 미렌더링) `BaseLayout.astro:79` 의 KaTeX CSS 링크와 `astro.config.mjs` 의 `rehype-katex` 등록이 그대로인지 확인. 코드는 변경하지 않음 — 변경이 필요하면 본 plan 의 스코프 밖이라 별 task 로 빠뜨리고 사용자에게 알린다.

- [ ] **Step 4: dev 서버 종료**

백그라운드로 띄웠다면 `Ctrl+C` 또는 해당 프로세스 종료. commit 없음.

---

## Self-Review Checklist (plan 작성 직후)

(작성자 자가 검토용. executor 는 무시 가능.)

**1. Spec coverage:**
- Spec 의 [Phase 0 의 구체 산출물] 4개 항목 → Task 1 (book yaml), Task 2 (style guide), Task 3 (sample post), Task 3 Step 2 + Task 4 (검증). ✓
- Spec 의 [Post 표준 형식] · [LaTeX 규약] → Task 2 의 스타일 가이드에 그대로 박힘. ✓
- Spec 의 [File layout] → Task 1·2·3 의 파일 경로가 정확히 일치. ✓
- Spec 의 [Routing] → Task 4 의 dev 서버 가시 확인이 URL 형식을 직접 검증. ✓

**2. Placeholder scan:**
- "TBD" / "TODO" / "구현하세요" / "추가하세요" → 없음. ✓
- 모든 코드·내용 블록이 *그대로 복사* 가능한 완성형. ✓

**3. Type consistency:**
- `book` 값 (`analytical-mechanics-1-text-comment`) 이 Task 1·3 양쪽에서 동일. ✓
- `pairSlug` 의 prefix (`am1tc-`) 가 style guide · 샘플 포스트 양쪽 동일. ✓
- `chapter` 의 의미 (1 ~ 104 의 시퀀스 번호, 원서 章 번호 ≠) 가 spec · style guide · 샘플 포스트 모두 일관. ✓
- 시퀀스 표기 (`001` 등 3자리 0-pad) 가 spec · style guide · 샘플 파일명 일관. ✓

**4. Open question 처리:**
- spec 의 Open question 3개 (1.4.9/10 분할, 어휘 사전 commit 단위, pairSlug 명명) → 모두 *章 1 spec 작성 시 결정* 으로 명시. Phase 0 의 작업과는 무관. ✓
