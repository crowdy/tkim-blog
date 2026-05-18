# Analytical Mechanics I — 본문 해설 — Phase 3 (章 3: 変分原理) — Design

> 章 1 ~ 2 의 라그랑주 형식이 *작용 적분의 극값 조건* 으로 다시 정리된다 — 변분 원리. 11 편 (시퀀스 055 ~ 065), 한국어 한정, **章 3 끝 단일 push**.

**Reference**: [Phase 0 design](2026-05-17-analytical-mechanics-1-text-comment-design.md), [Chapter 1 design](2026-05-17-am1tc-chapter-1.md), [Chapter 2 design](2026-05-17-am1tc-chapter-2.md), [Style guide](2026-05-17-analytical-mechanics-1-text-comment-style-guide.md).

## Motivation

§2 의 라그랑주 방정식은 *미분 방정식의 한 줄* 로 운동을 결정했다. 章 3 은 같은 운동을 *변분 원리* — "*경로 전체의 함수 (작용) 가 극값을 가질 때 그 경로가 실제 운동이다*" — 의 시점에서 다시 본다. 이 시점이 §4 의 해밀턴 형식, §5 의 정준 변환, 그리고 일반상대론·게이지 이론·양자장 이론의 *통합 어휘* 의 출발점.

§3.1 의 해밀턴의 원리가 *고정된 끝점* 의 변분, §3.2 의 워이스의 원리가 *끝점이 움직이는* 일반화 + 노에터 정리의 강화 형식. 두 원리가 *변분의 일반 형식* 을 박는다.

## Scope

- **In:** 시퀀스 055 ~ 065 의 11 편 한국어 본문 해설 작성.
- **Out:** 章 4 ~ 5 (별 spec/plan), ja/en 번역.
- **Deploy 단위:** 11 편 끝나면 단 한 번 push.

## Architecture

章 1·2 와 동일. 같은 디렉터리, 같은 frontmatter 규약, 같은 표준 골격.

### 2 plan 분할

| Plan | 큰절 | 제목 | 절 수 | 시퀀스 |
|---|---|---|---:|---|
| **Plan-3.1** | §3.1 | ハミルトンの原理 | 8 | 055-062 |
| **Plan-3.2** | §3.2 | ワイスの原理とネーターの定理 | 3 | 063-065 |
| 합계 | | | **11** | |

각 plan 의 마지막 commit 은 glossary 누적 갱신.

## Resolved open questions

### Q1: 워이스의 원리 (Weiss principle) 한국어

원서의 "ワイスの原理" 는 Otto Weiss 의 1933 년 변분 원리 — *끝점이 움직이는 변분* 의 일반화. 한국어 학술 명칭이 통일되어 있지 않으므로 *워이스의 원리* (Weiss principle) 로 음역 통일. 첫 등장 (3.2.1) 에서 영문 + 의미 설명 병기.

### Q2: 비홀로노믹과 변분 원리

§2.5.3 에서 *vakonomic vs nonholonomic* 의 미묘함을 다뤘다. §3 의 미정 곱셈자법 (3.1.8) 은 *홀로노믹 한정* 으로 다루고, 비홀로노믹의 변분 원리 어려움은 *§2.5.3 회수* 로 한 줄만 언급. 깊이 들어가지 않음.

### Q3: 코드 비중

章 3 은 추상적 (변분 원리, 작용 적분, 노에터 일반화) 이라 章 1·2 의 ~80% 코드 비율보다 낮춰 *6 코드 / 5 도해 = 55%* 로 잡는다. 도해 비중이 높은 이유는 *변분 자체가 함수 공간의 개념* 으로 numpy/sympy 로 잡기 어렵기 때문.

## 11 편 매핑 표 (시퀀스 055 ~ 065)

| Seq | 章.節.小節 | 일본어 원제 | 한국어 제목 | 코드 | 파일명 |
|---:|---|---|---|:---:|---|
| 055 | 3.1.1 | 作用積分とハミルトンの原理 | 작용 적분과 해밀턴의 원리 | ✓ | `055-3-1-1-action-and-hamilton-principle.md` |
| 056 | 3.1.2 | 拡大配位空間 | 확장 배위공간 | — | `056-3-1-2-extended-config-space.md` |
| 057 | 3.1.3 | 拡大状態空間 | 확장 상태공간 | — | `057-3-1-3-extended-state-space.md` |
| 058 | 3.1.4 | 基本1形式と作用積分 | 기본 1-형식과 작용 적분 | ✓ | `058-3-1-4-fundamental-1-form-and-action.md` |
| 059 | 3.1.5 | 作用積分の変分計算 | 작용 적분의 변분 계산 | ✓ | `059-3-1-5-variation-of-action.md` |
| 060 | 3.1.6 | ハミルトンの原理とラグランジュ方程式 | 해밀턴의 원리와 라그랑주 방정식 | — | `060-3-1-6-hamilton-to-lagrange.md` |
| 061 | 3.1.7 | ラグランジュ方程式の拡大配位空間上の表現 | 라그랑주 방정식의 확장 배위공간 표현 | — | `061-3-1-7-lagrange-on-extended.md` |
| 062 | 3.1.8 | ラグランジュの未定乗数法 | 라그랑주의 미정 곱셈자법 | ✓ | `062-3-1-8-lagrange-multipliers.md` |
| 063 | 3.2.1 | ワイスの原理 | 워이스의 원리 | ✓ | `063-3-2-1-weiss-principle.md` |
| 064 | 3.2.2 | 拡大配位空間のモーメント関数 | 확장 배위공간의 모멘트 함수 | — | `064-3-2-2-momentum-function.md` |
| 065 | 3.2.3 | ネーターの定理の拡張 | 노에터 정리의 확장 | ✓ | `065-3-2-3-noether-extended.md` |

코드 비중: 6 / 11 = 55%.

## 章 3 에서 새로 등장할 어휘 (glossary 추가 예정)

| 일본어 | 한국어 | 영어 | 등장 절 |
|---|---|---|---|
| 作用積分 | 작용 적분 | action integral | 3.1.1 |
| ハミルトンの原理 | 해밀턴의 원리 | Hamilton's principle | 3.1.1 |
| 拡大配位空間 | 확장 배위공간 | extended configuration space | 3.1.2 |
| 拡大状態空間 | 확장 상태공간 | extended state space | 3.1.3 |
| 変分 | 변분 | variation | 3.1.5 |
| ラグランジュの未定乗数法 | 라그랑주의 미정 곱셈자법 | method of Lagrange multipliers | 3.1.8 |
| ワイスの原理 | 워이스의 원리 | Weiss's principle | 3.2.1 |
| モーメント関数 | 모멘트 함수 | momentum function | 3.2.2 |

총 8 항목 추가 — §2.5 종료 시점 67 항목 + 8 = 75 항목.

## 분량·코드 비중 추정

- 11 편 × 평균 1,800 자 = **약 19,800 자** 의 한국어 본문 (章 3 전체).
- 코드 적절 6 편 / 도해 only 5 편 = 55% / 45%.

## Testing / verification

각 plan 의 마지막 단계에서:

- `npm run check` — 0 errors.
- `npm run build` — 성공.
- 章 3 마지막 (Plan-3.2 끝) 에서:
  - `dist/ko/study/analytical-mechanics-1-text-comment/index.html` 의 list 가 65 편 모두 표시 확인.
  - 章 2 마지막 (054) 의 *다음 章 다리* 가 §3.1 으로 자연스럽게 이어지는지 spot check.

## Error handling / edge cases

- **`draft: true` 금지**.
- **YAML description** 에 LaTeX 백슬래시·아포스트로피 들어가면 *double-quoted YAML string* 사용.
- **`\mathbf{}` always braced**.

## Open questions for chapter 4 spec

- §3 의 기본 1-형식 $\theta_L$ 와 §4.1 의 정준 1-형식 $\theta_{\text{can}} = p_i dq^i$ 의 관계 — 르장드르 변환을 통한 정확한 짝짓기를 §4 spec 에서 명확히.
- §3.1.3 의 확장 상태공간이 §4.1.5 의 확장 상공간 (확장 상태 공간 with energy/time) 과 어떻게 이어지는지.
- 작용 적분의 두 표현 — *라그랑주 형식의 $\int L\, dt$* vs *Poincaré–Cartan 형식의 $\int (p \cdot dq - H dt)$* — 둘의 동치성을 §4 spec 에서 다시 짚을 것.

---

## Phase 3 의 다음 동작

1. 본 spec 승인 → commit.
2. **Plan-3.1** 작성 — 8 편 (055 ~ 062).
3. Plan-3.1 실행 → 9 commit (8 본문 + 1 glossary).
4. Plan-3.2 작성 → 실행 (3 편 + 1 glossary).
5. Plan-3.2 끝나면 검증 후 단 한 번 push.
