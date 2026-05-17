---
title: '1.4.6 — 적분곡선과 1-매개변수 변환군: 벡터장이 흐름을 낳는다'
description: '벡터장 $X$ 가 만드는 ODE $\dot\gamma = X(\gamma)$ 의 해 — 적분곡선. 시각 $t$ 만큼 *흘려보내는* 사상 $\phi_t$ 들이 모여 1-매개변수 변환군 $\phi_t \circ \phi_s = \phi_{t+s}$ 를 이룬다. 가장 작은 동력학 시스템.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 19
lang: ko
pairSlug: am1tc-1-4-6-integral-curve-and-flow
draft: false
updated: 2026-05-17
---

# 1.4.6 — 적분곡선과 1-매개변수 변환군: 벡터장이 흐름을 낳는다

> 벡터장 $X$ 가 만드는 ODE $\dot\gamma = X(\gamma)$ 의 해 — 적분곡선. 시각 $t$ 만큼 *흘려보내는* 사상 $\phi_t$ 들이 모여 1-매개변수 변환군 $\phi_t \circ \phi_s = \phi_{t+s}$ 를 이룬다. 가장 작은 동력학 시스템.

## 본문이 말하는 것

$X \in \mathfrak X(M)$ 이 매끄러운 벡터장. 곡선 $\gamma : I \to M$ 가 $X$ 의 **적분곡선** (integral curve) 이라는 것은

$$
\dot\gamma(t) = X(\gamma(t)) \quad \forall t \in I
$$

차트 좌표로 적으면 $\dot x^i(t) = X^i(x(t))$ — $n$ 개의 연결된 1차 ODE.

ODE 의 존재·유일성 (해석학) 정리: 매끄러운 $X$ 와 임의의 초기점 $p$ 에 대해, $\gamma(0) = p$ 인 적분곡선이 *국소적으로 유일* 하게 존재.

이를 모든 점에 대해 모으면 **국소 흐름** (local flow)

$$
\phi : (-\varepsilon, \varepsilon) \times M \to M, \quad \phi(t, p) := \gamma_p(t)
$$

(여기서 $\gamma_p$ 는 $\gamma_p(0) = p$ 인 적분곡선). $\phi_t := \phi(t, \cdot)$ 로 적으면, $\phi_t : M \to M$ 가 *시각 $t$ 만큼의 흐름*. 다음 군 성질이 성립한다:

$$
\phi_0 = \text{id}_M,\qquad \phi_t \circ \phi_s = \phi_{t+s},\qquad \phi_{-t} = \phi_t^{-1}
$$

이게 **국소 1-매개변수 변환군** (local one-parameter group of transformations). 콤팩트 다양체나 *완전한* 벡터장에서는 $\varepsilon = \infty$ 로 전역 1-매개변수 군이 된다.

## 한 번 더, 천천히

**(1) 벡터장 ↔ 흐름의 대응.** 본 절의 핵심 — 매끄러운 벡터장과 매끄러운 (국소) 1-매개변수 변환군 사이의 일대일 대응. 벡터장에서 흐름은 ODE 적분, 흐름에서 벡터장은 시각 0 의 미분: $X(p) = (d/dt)|_0 \phi_t(p)$. 이 대응이 §2 의 *대칭과 보존* (Noether) 에서 본격적으로 활용된다.

**(2) 자동변환의 한 예.** 회전 흐름 $\phi_t(x, y) = (\cos t \cdot x - \sin t \cdot y, \sin t \cdot x + \cos t \cdot y)$ 는 $SO(2)$ 작용. 1.4.11 의 *지수사상* 이 이 흐름의 정체를 명시적으로 푼다 — $\phi_t = \exp(t X)$.

**(3) 1-매개변수의 의미.** 매개변수 $t \in \mathbb R$ 는 *시간* 이라는 1차원 매개변수. 위 군 성질은 *덧셈군* $(\mathbb R, +)$ 의 작용. 다음 §1.4.9 의 리 군은 이 1차원 매개변수를 일반화한다 — $G$ 의 매개변수가 $n$-차원 다양체.

## 파이썬으로 확인 — 군 성질 $\phi_t \circ \phi_s = \phi_{t+s}$

이 코드의 메시지는 단순하다: 회전 벡터장의 흐름이 *덧셈의 군 성질* 을 만족하는지 수치로 확인.

```python
# 벡터장 X = -y ∂x + x ∂y, 흐름 φ_t.
# 군 성질: φ_t(φ_s(p)) == φ_{t+s}(p)
import numpy as np
from scipy.integrate import solve_ivp

def vf(t, p):
    x, y = p
    return [-y, x]

def flow(t, p):
    sol = solve_ivp(vf, (0, t), p, rtol=1e-10, atol=1e-12)
    return sol.y[:, -1]

p0 = np.array([1.0, 0.5])
s, t = 0.3, 0.7

# φ_t(φ_s(p))
p1 = flow(s, p0)
p_left = flow(t, p1)

# φ_{t+s}(p)
p_right = flow(t + s, p0)

err = np.linalg.norm(p_left - p_right)
print(f"φ_t(φ_s(p))  = {p_left}")
print(f"φ_{{t+s}}(p) = {p_right}")
print(f"오차 = {err:.2e}  (~ 1e-9 기대)")
```

이 결과는 적분곡선이 *덧셈군의 작용* 을 정의함을 수치로 확인한다 — 벡터장이 *추상적인 회전군 $SO(2)$* 와 같은 것을 만들어 낸다는 사실의 1차원 표본.

## 다음 절(1.4.7)로 가는 다리

흐름이 다양체 위 사상이라는 사실은, *다른 다양체 사이의 매끄러운 사상* 이 벡터·함수에 *어떻게 작용하는가* 의 일반 질문으로 자연스럽게 이어진다. 1.4.7 은 그 작용을 *당김 (pullback)* 과 *미분사상 (pushforward)* 으로 박는다 — 함수는 *역방향*, 벡터는 *순방향*.
