---
title: '1.4.3 — 방향미분과 미분작용소: 함수에 작용하는 *벡터*'
description: '곡선 $\gamma$ 의 시각 0 속도가 함수 $f$ 에 작용해 *방향미분* $\dot\gamma(0) f := (d/dt)|_0 (f \circ \gamma)$ 를 만든다. 이 작용소가 라이프니츠 규칙을 만족하는 *도함수* (derivation) — 이게 1.4.4 의 접벡터 정의로 직결된다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 16
lang: ko
pairSlug: am1tc-1-4-3-directional-derivative
draft: false
updated: 2026-05-17
---

# 1.4.3 — 방향미분과 미분작용소: 함수에 작용하는 *벡터*

> 곡선 $\gamma$ 의 시각 0 속도가 함수 $f$ 에 작용해 *방향미분* $\dot\gamma(0) f := (d/dt)|_0 (f \circ \gamma)$ 를 만든다. 이 작용소가 라이프니츠 규칙을 만족하는 *도함수* (derivation) — 이게 1.4.4 의 접벡터 정의로 직결된다.

## 본문이 말하는 것

$\gamma : I \to M$ 가 $p = \gamma(0)$ 을 지나는 매끄러운 곡선, $f \in C^\infty(M)$ 가 $p$ 근방에서 매끄러운 함수라 하자. *방향미분* 은

$$
\dot\gamma(0) [f] := \left.\frac{d}{dt}\right|_{t=0} (f \circ \gamma)(t)
$$

이건 *실수*. 좌표 $\phi(p) = (x^1, \dots, x^n)$ 에서 $\gamma(t) = (x^1(t), \dots, x^n(t))$, 그러면 연쇄율로

$$
\dot\gamma(0)[f] = \sum_i \dot x^i(0)\, \frac{\partial f}{\partial x^i}(p) = \dot x^i\, \partial_i f \big|_p
$$

(아인슈타인 합 규약). 즉 방향미분은 *작용소* $\dot\gamma(0) = \dot x^i \partial_i$ 가 함수 $f$ 에 작용한 결과.

이 작용소 $X := \dot\gamma(0)$ 는 다음 두 성질을 갖는다:

**선형성:** $X[a f + b g] = a X[f] + b X[g]$.

**라이프니츠 (곱) 규칙:** $X[f g] = X[f]\, g(p) + f(p)\, X[g]$.

이 두 성질을 만족하는 $C^\infty(M) \to \mathbb R$ 의 선형 작용소가 **도함수** (derivation) at $p$. 1.4.4 가 *도함수 = 접벡터* 를 박는다.

## 한 번 더, 천천히

**(1) 작용소로서의 벡터.** 화살표 (geometric arrow) 와 작용소 ($f \mapsto X[f]$) 가 *같은 것* 이라는 발상이 본 절의 핵심. 화살표는 *기하학적 상* — 작용소는 *기능적 정체*. 두 시선이 정확히 일치.

**(2) 좌표 기저 $\partial_i$ 의 정체.** 좌표 곡선 $\gamma_i(t) = (x^1, \dots, x^i + t, \dots, x^n)$ 의 시각 0 방향미분이 $\partial_i$. 즉 $\partial_i$ 는 *$i$-번째 좌표가 1 만큼 증가하는 곡선의 속도 작용소*. 1.4.4 의 접공간 기저가 이 $\{\partial_i\}_{i=1}^n$.

**(3) 라이프니츠가 *벡터* 의 정의에 들어가는 이유.** 라이프니츠 없는 선형 작용소는 단순한 *함수의 보통 미분 사상* 일 수도 있다 (예: 2차 미분 $\partial_i \partial_j$). 라이프니츠가 *벡터* 의 정체를 *1차 미분만* 으로 묶어 준다. 1.4.4 의 정의 — *도함수 ↔ 접벡터* — 가 이 묶음을 정밀히 박는다.

## 파이썬으로 확인 — 평면 위 방향미분

이 코드의 메시지는 단순하다: $\mathbb R^2$ 위 함수 $f(x, y) = x^2 + 3 y^2$ 의 방향미분을 (a) 정의대로 $(d/dt) f(\gamma(t))$ 계산, (b) 작용소 형식 $\dot x \partial_x f + \dot y \partial_y f$ 계산. 둘이 같음을 확인.

```python
# f(x, y) = x² + 3y²
# 곡선 γ(t) = (1 + 2t, 0.5 - t)  →  γ(0) = (1, 0.5), γ̇(0) = (2, -1)
import sympy as sp

t, x, y = sp.symbols('t x y', real=True)
f = x**2 + 3 * y**2

# (a) 정의대로: (d/dt) f(γ(t))
gamma_x = 1 + 2 * t
gamma_y = sp.Rational(1, 2) - t
f_along_gamma = f.subs({x: gamma_x, y: gamma_y})
deriv_def = sp.diff(f_along_gamma, t).subs(t, 0)

# (b) 작용소 형식
df_dx_at_p = sp.diff(f, x).subs({x: 1, y: sp.Rational(1, 2)})
df_dy_at_p = sp.diff(f, y).subs({x: 1, y: sp.Rational(1, 2)})
xdot, ydot = 2, -1
deriv_op = xdot * df_dx_at_p + ydot * df_dy_at_p

print(f"(a) 정의 (d/dt) f(γ(t))|0:  {deriv_def}")
print(f"(b) 작용소 ẋ ∂x f + ẏ ∂y f:  {deriv_op}")
print(f"두 값이 같은가? {deriv_def == deriv_op}")
```

이 결과는 *작용소 표현* 이 *기하학적 정의* 와 정확히 일치함을 보인다. 1.4.4 가 이 동일성을 *정의* 로 승격한다.

## 다음 절(1.4.4)로 가는 다리

방향미분 작용소가 라이프니츠를 만족한다는 것을 본 위 결과는, *벡터를 작용소로 다시 정의해도 충분하다* 는 신호다. 1.4.4 는 그 정의 — *점 $p$ 의 접벡터 = $p$ 에서의 도함수* — 를 형식적으로 박는다. 화살표 없이도 접공간이 정의되는 길이 열린다.
