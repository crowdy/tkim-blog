---
title: '4.3.4 — 선형화 방정식: 평형점에서의 *고유값 분석*'
description: "평형점 $x^*$ 에서 $\\dot x = f(x)$ 를 1차 Taylor 전개하면 $\\dot \\xi = A \\xi$ 의 선형 시스템. $A = Df(x^*)$ 의 고유값이 국소 안정성을 결정 — *Hartman–Grobman 정리*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 77
lang: ko
pairSlug: am1tc-4-3-4-linearization
draft: false
updated: 2026-05-18
---

# 4.3.4 — 선형화 방정식: 평형점에서의 *고유값 분석*

> 평형점 $x^*$ 에서 $\dot x = f(x)$ 를 1차 Taylor 전개하면 $\dot \xi = A \xi$ 의 선형 시스템. $A = Df(x^*)$ 의 고유값이 국소 안정성을 결정 — *Hartman–Grobman 정리*.

## 본문이 말하는 것

**선형화** (linearization). 평형점 $x^*$ 의 근방 $x = x^* + \xi$ ($\xi$ 작음) 에서

$$
\dot \xi = f(x^* + \xi) = f(x^*) + Df(x^*) \xi + O(\|\xi\|^2) = A \xi + O(\|\xi\|^2)
$$

여기서 $A = Df(x^*)$ (자코비안 행렬). 1차 항만 두면 *선형 시스템*

$$
\dot \xi = A \xi
$$

해는 $\xi(t) = e^{At} \xi_0$.

**고유값 분류.** $A$ 의 고유값 $\lambda_i \in \mathbb C$ ($i = 1, \dots, N$) 에 대해:

- 모든 $\text{Re}(\lambda_i) < 0$: 평형점이 *점근 안정* (모든 방향에서 수축).
- 어떤 $\lambda_i$ 에 대해 $\text{Re}(\lambda_i) > 0$: 평형점이 *불안정* (그 방향으로 발산).
- 모든 $\text{Re}(\lambda_i) \le 0$ 이고 어떤 $\lambda_j$ 에 대해 $\text{Re}(\lambda_j) = 0$: *중립* — 비선형 항이 결정.

**Hartman–Grobman 정리.** 평형점이 *하이퍼볼릭* (모든 $\text{Re}(\lambda_i) \neq 0$) 이면, 비선형 시스템의 흐름이 *국소적으로* 선형화 시스템의 흐름과 *위상 동형* (homeomorphism). 즉 *선형화로 국소 행동을 정확히 결정*.

해밀턴 시스템 (1자유도, 2D) 의 경우: 보존성으로 *trace of $A$ = 0* 이라 고유값이 $\pm i\omega$ (중심) 또는 $\pm \lambda$ (안장점). 점근 안정 평형점이 없는 이유.

## 한 번 더, 천천히

**(1) 단진자 평형점의 선형화.** $f(\theta, p) = (p, -\sin\theta)$. 

- $(\theta = 0, p = 0)$: $A = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$. 고유값 $\pm i$. *중심* (center) — Liapunov 안정.
- $(\theta = \pi, p = 0)$: $A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$. 고유값 $\pm 1$. *안장점* (saddle) — 불안정.

**(2) 마찰 진자.** $(\theta = 0, p = 0)$ 의 선형화 $A = \begin{pmatrix} 0 & 1 \\ -1 & -\gamma \end{pmatrix}$. 고유값 $\lambda = (-\gamma \pm \sqrt{\gamma^2 - 4})/2$. $\gamma < 2$: 복소 (감쇠 진동), $\gamma > 2$: 실수 (과감쇠). 두 경우 모두 *점근 안정*.

**(3) 비-하이퍼볼릭의 *주의*.** 어떤 $\text{Re}(\lambda) = 0$ 이면 선형화로 결론이 안 난다. 해밀턴 시스템의 *중심* 이 정확히 이 경우 — *비선형 항* 이 결정. KAM 정리가 이런 경우의 안정성 분석 도구.

**(4) 안정 / 불안정 다양체.** 안장점에서 *안정 다양체* (stable manifold) — $t \to +\infty$ 에서 평형점으로 가는 방향, *불안정 다양체* (unstable manifold) — $t \to -\infty$ 에서 가는 방향. 선형화에서는 *고유벡터의 부분공간*, 비선형에서는 *접한 매끄러운 곡면*.

**(5) §1.4.11 의 지수사상 회수.** 선형 시스템 $\dot \xi = A \xi$ 의 해 $\xi(t) = e^{At} \xi_0$. 지수사상이 행렬 형식으로 직접 등장. *리 군 $GL(n)$ 의 리 대수에서 군으로의 사상* 의 학부 표본.

## 파이썬으로 확인 — 단진자의 두 평형점 선형화

이 코드의 메시지는 단순하다: 단진자 두 평형점에서 자코비안을 계산하고 고유값을 분석. 선형 흐름의 *고유 모드* 가 비선형 운동의 *국소 행동* 과 일치.

```python
# 단진자: f(θ, p) = (p, -sin θ)
# Df = [[0, 1], [-cos θ, 0]]
import numpy as np
from scipy.integrate import solve_ivp

# 두 평형점의 자코비안과 고유값
def jacobian_at(theta_eq):
    return np.array([[0.0, 1.0],
                     [-np.cos(theta_eq), 0.0]])

print("(a) 안정 평형 (θ=0):")
A = jacobian_at(0.0)
eigs = np.linalg.eigvals(A)
print(f"  Jacobian A = \n{A}")
print(f"  고유값: {eigs}")
print(f"  → 순수 허수 ±i — *중심*, Liapunov 안정")

print("\n(b) 불안정 평형 (θ=π):")
A = jacobian_at(np.pi)
eigs = np.linalg.eigvals(A)
print(f"  Jacobian A = \n{A}")
print(f"  고유값: {eigs}")
print(f"  → 실수 ±1 — *안장점*, 불안정")

# 비선형 vs 선형 비교
def pendulum_nonlinear(t, y):
    return [y[1], -np.sin(y[0])]

def pendulum_linear_around_0(t, y):
    return [y[1], -y[0]]  # cos(0) = 1

y0 = [0.05, 0.0]
t_max = 5.0
ts = np.linspace(0, t_max, 200)

sol_nl = solve_ivp(pendulum_nonlinear, (0, t_max), y0, rtol=1e-9, atol=1e-11, dense_output=True)
sol_lin = solve_ivp(pendulum_linear_around_0, (0, t_max), y0, rtol=1e-9, atol=1e-11, dense_output=True)

theta_nl = sol_nl.sol(ts)[0]
theta_lin = sol_lin.sol(ts)[0]
diff = np.max(np.abs(theta_nl - theta_lin))
print(f"\n작은 변위 (ε=0.05) 의 비선형 vs 선형 차이: max |Δθ| = {diff:.2e}")
print("→ Hartman–Grobman: 하이퍼볼릭 평형점이라면 *국소적으로 동일*")
print("  (단, θ=0 은 하이퍼볼릭이 아님 — 중심이라 정확한 동치는 깨질 수 있음)")
```

이 결과는 *선형화 분석* 의 위력 — 비선형 시스템의 *국소 행동을 한 행렬의 고유값* 으로 결정 — 을 보여 준다.

## 다음 절(4.3.5)로 가는 다리

평형점의 *2 차원* 분석 — 가장 흔하고 *시각적* 인 경우. 위상평면의 *고유값 다이어그램* — saddle, node, focus, center — 으로 모든 2D 평형점이 분류. §4.3.5 가 그 분류를 정리.
