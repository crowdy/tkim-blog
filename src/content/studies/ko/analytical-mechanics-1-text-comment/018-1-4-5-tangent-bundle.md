---
title: '1.4.5 — 접번들과 벡터장: 모든 접공간을 한 자리에 모은 다양체'
description: '점마다 따로 살던 접공간 $T_p M$ 을 *한 다양체* 로 묶은 것이 접번들 $TM$. 그 위의 매끄러운 단면이 *벡터장* — 다양체 위에 흐름의 *처방* 을 깐 객체.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 18
lang: ko
pairSlug: am1tc-1-4-5-tangent-bundle
draft: false
updated: 2026-05-17
---

# 1.4.5 — 접번들과 벡터장: 모든 접공간을 한 자리에 모은 다양체

> 점마다 따로 살던 접공간 $T_p M$ 을 *한 다양체* 로 묶은 것이 접번들 $TM$. 그 위의 매끄러운 단면이 *벡터장* — 다양체 위에 흐름의 *처방* 을 깐 객체.

## 본문이 말하는 것

**접번들** (tangent bundle) $TM$ 은 모든 접공간의 *disjoint union*:

$$
TM = \bigsqcup_{p \in M} T_p M = \{(p, X_p) : p \in M,\, X_p \in T_p M\}
$$

*사영* $\pi : TM \to M$ 은 $(p, X_p) \mapsto p$.

$TM$ 자체가 $2n$ 차원 매끄러운 다양체. 차트는 $M$ 의 차트 $\phi : U \to V \subset \mathbb R^n$ 로부터 자동으로 유도된다: $(p, X^i \partial_i|_p) \mapsto (\phi(p), X^1, \dots, X^n) \in V \times \mathbb R^n$. 즉 *국소적으로* $TM$ 은 $M$ 의 차트 × $\mathbb R^n$ 의 모양. 그러나 *전역적* 으로는 그렇지 않을 수 있다 (위상이 비자명).

**벡터장** (vector field) $X$ 는 매끄러운 사상 $X : M \to TM$ 으로 $\pi \circ X = \text{id}_M$ — 즉 각 점 $p$ 에 *그 점의* 접벡터 $X(p) \in T_p M$ 을 매끄럽게 부여한 것. 차트 좌표로

$$
X = X^i(x)\, \partial_i
$$

여기서 $X^i(x)$ 는 점의 좌표 함수. 매끄러움 조건이 $X^i \in C^\infty(U)$.

벡터장 전체의 집합을 $\mathfrak X(M)$ 이라 적는다. $C^\infty(M)$-모듈 (스칼라곱은 함수가 가능).

## 한 번 더, 천천히

**(1) 접번들의 위상.** $T \mathbb R^n \cong \mathbb R^n \times \mathbb R^n$ (자명) 이지만 $T S^2$ 는 자명하지 않다 (헤어리 볼 정리: $S^2$ 위에 *비자명한* 영이 아닌 매끄러운 벡터장이 없음). 위상이 *전역적으로 평면 곱이 아닌* 번들의 첫 예.

**(2) 벡터장 = 흐름의 처방.** $X(p) \in T_p M$ 은 *그 점에서의 속도 화살표*. 다양체 위에 *방향 + 속력* 을 깐 것. 그 처방을 따라 입자를 움직이면 *적분곡선* (1.4.6). 동력학 시스템 $\dot p = X(p)$ 의 일반 형식.

**(3) $\mathfrak X(M)$ 의 대수 구조.** 두 벡터장의 *합* $(X + Y)(p) = X(p) + Y(p)$ 는 벡터장. *교환자* (commutator / Lie bracket) $[X, Y] = XY - YX$ 도 벡터장 (1.4.8 에서 본격적으로). 단순 곱 $XY$ 는 2차 미분이라 벡터장이 *아니지만*, $XY - YX$ 의 2차 항이 *상쇄* 되어 1차 미분만 남는다.

## 파이썬으로 확인 — $\mathbb R^2$ 위 벡터장과 그 흐름

이 코드의 메시지는 단순하다: 회전 벡터장 $X = -y \partial_x + x \partial_y$ 의 적분곡선 — 시각 $t$ 의 흐름 — 이 *원* 임을 본다. 다음 1.4.6 의 적분곡선·흐름의 정의를 미리 맛본다.

```python
# 벡터장 X = -y ∂x + x ∂y (회전 발생자)
# 적분곡선 ODE:  dx/dt = -y,  dy/dt = x
# 초기조건 (1, 0) → 해는 (cos t, sin t) — 단위원
import numpy as np
from scipy.integrate import solve_ivp

def rotation_vf(t, p):
    x, y = p
    return [-y, x]

sol = solve_ivp(rotation_vf, (0, 2 * np.pi), [1.0, 0.0],
                rtol=1e-10, atol=1e-12, dense_output=True)
t = np.linspace(0, 2 * np.pi, 200)
x, y = sol.sol(t)

# 원 위에 있는지: x² + y² = 1
r_squared = x**2 + y**2
print(f"max |r² - 1| = {np.max(np.abs(r_squared - 1)):.2e}")  # ~1e-9
print(f"x(π/2) = {sol.sol(np.pi/2)[0]:.6f}  (= 0 기대)")
print(f"y(π/2) = {sol.sol(np.pi/2)[1]:.6f}  (= 1 기대)")
```

이 결과는 벡터장이 *흐름의 처방* 이라는 직관을 — 회전 벡터장이 회전 흐름을 만들어 낸다 — 수치로 확인한다.

## 다음 절(1.4.6)로 가는 다리

벡터장이 *흐름* 을 정의한다는 관찰이 다음 1.4.6 의 *적분곡선* + *1-매개변수 변환군* 의 형식적 정의로 이어진다. 매끄러운 벡터장에서 *국소적으로* 유일한 흐름이 떨어진다 (ODE 의 존재·유일성 정리). 그 흐름이 변환군 구조를 갖는다.
