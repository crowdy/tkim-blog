---
title: '1.3.3 — 접속과 평행이동: 다른 점의 벡터를 *비교* 하는 규칙'
description: '점 $p$ 의 접벡터와 점 $q$ 의 접벡터는 *다른 벡터공간* 에 산다. 그 둘을 잇는 규칙 — 접속 — 이 *평행이동* 을 정의하고, 그 미분이 *공변미분* 이다. 굽은 면의 폐곡선을 따라 평행이동하면 처음 벡터가 *돌아오지 않는다*.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 12
lang: ko
pairSlug: am1tc-1-3-3-connection-and-parallel-transport
draft: false
updated: 2026-05-17
---

# 1.3.3 — 접속과 평행이동: 다른 점의 벡터를 *비교* 하는 규칙

> 점 $p$ 의 접벡터와 점 $q$ 의 접벡터는 *다른 벡터공간* 에 산다. 그 둘을 잇는 규칙 — 접속 — 이 *평행이동* 을 정의하고, 그 미분이 *공변미분* 이다. 굽은 면의 폐곡선을 따라 평행이동하면 처음 벡터가 *돌아오지 않는다*.

## 본문이 말하는 것

곡면 $S$ 위의 곡선 $\gamma(t)$ 와 그를 따라 정의된 벡터장 $\mathbf{X}(t) \in T_{\gamma(t)} S$ 가 있다고 하자. $\mathbf{X}$ 가 *평행이동* (parallel transport) 되었다는 것은

$$
\frac{D \mathbf{X}}{dt} := \left( \frac{dX^k}{dt} + \Gamma^k_{ij}\, \dot u^i\, X^j \right) \mathbf{r}_k = 0
$$

을 만족한다는 뜻. 여기서 $D/dt$ 가 **공변미분** (covariant derivative along $\gamma$), $\Gamma^k_{ij}$ 는 1.2.4 의 크리스토펠 (이 자리에서 *접속의 성분* 이라는 새 정체성을 얻는다).

좌변이 0 이라는 조건은 좌표식

$$
\dot X^k + \Gamma^k_{ij}\, \dot u^i\, X^j = 0 \quad (k = 1, 2)
$$

2 개의 연결된 1차 ODE. 초기조건 $\mathbf{X}(0)$ 가 주어지면 곡선을 따라 *유일한* 평행이동이 결정된다.

평면 ($\Gamma = 0$) 에서는 평행이동이 *$\mathbb R^3$ 의 평행이동* 과 같다 — $\dot X^k = 0$, 즉 성분이 안 변한다. 굽은 면에서는 $\Gamma$ 항이 *방향 보정* 을 해 줘서 *벡터가 곡면에 머문다*.

## 한 번 더, 천천히

**(1) 폐곡선 평행이동 = 홀로노미.** 굽은 면의 한 점에서 출발해 *폐곡선* 을 따라 벡터를 평행이동하면, 원래 점에 돌아왔을 때 벡터가 *원래 방향과 다르다*. 회전각이 *홀로노미* (holonomy) — 그 면적이 둘러싼 영역의 *총 곡률* (Gauss–Bonnet). 평면에서는 0, 구면에서는 0 이 아니다.

**(2) 접속의 *기하학적* 의미.** $\Gamma^k_{ij}$ 는 "$\mathbf{r}_j$ 가 $u^i$ 방향으로 움직일 때 $\mathbf{r}_k$ 성분이 얼마나 끼어드는가" 를 측정한다. 즉 기저 벡터의 *위치-의존적 회전* 을 정량화. 평행이동은 그 회전을 *상쇄* 해 벡터가 면 위에 정렬되도록 한다.

**(3) Levi-Civita 접속의 유일성.** 미터 $g$ 가 주어진 곡면에는 두 조건 — (a) 미터와 호환 (parallel transport 가 길이·각도 보존), (b) 비틀림 (torsion) 0 — 을 만족하는 *유일한* 접속이 존재한다. 그것이 *Levi-Civita 접속*, 그 성분이 1.2.4 의 크리스토펠 공식. 다른 접속도 수학적으로 가능하지만, 미터에서 자연스럽게 떨어지는 것은 Levi-Civita 하나뿐.

## 파이썬으로 확인 — 구면 위 폐곡선의 홀로노미

이 코드의 메시지는 단순하다: 구면 위 *위도 $\theta_0$* 의 위도원을 따라 벡터를 평행이동하면, 한 바퀴 돌고 돌아왔을 때 벡터가 $2\pi \cos\theta_0$ 만큼 회전해 있다. ($\theta_0 = \pi/2$ 적도라면 회전 0, 북극으로 가까울수록 회전이 커진다.)

```python
# 구면 (R=1) 위도원 θ=θ_0 을 따라 동쪽으로 한 바퀴 평행이동
# 평행이동 ODE: dX^k/dt + Γ^k_ij (du^i/dt) X^j = 0
# 위도원: θ(t) = θ_0 (상수), φ(t) = t, 0 ≤ t ≤ 2π
# Γ^θ_φφ = -sinθ cosθ, Γ^φ_θφ = Γ^φ_φθ = cotθ. (1.2.4 에서)
import numpy as np
from scipy.integrate import solve_ivp

theta_0 = np.pi / 3  # 위도 (북극을 0, 적도를 π/2)

def parallel_transport(t, X):
    # X = (X^θ, X^φ)
    Xth, Xph = X
    # dφ/dt = 1, dθ/dt = 0
    # dX^θ/dt = - Γ^θ_φφ * 1 * X^φ = sin(θ_0) cos(θ_0) * X^φ
    dXth = np.sin(theta_0) * np.cos(theta_0) * Xph
    # dX^φ/dt = - 2 Γ^φ_θφ * 0 * X^φ - Γ^φ_φθ * 1 * X^θ = - cot(θ_0) * X^θ
    dXph = -(np.cos(theta_0) / np.sin(theta_0)) * Xth
    return [dXth, dXph]

# 초기 벡터: 동쪽 방향 (φ-방향 단위) → X^θ = 0, X^φ = 1/sin(θ_0)
# (단위벡터 normalisation 은 g_φφ = sin²θ 라 X^φ = 1/sinθ 가 단위)
X0 = [0.0, 1.0 / np.sin(theta_0)]
sol = solve_ivp(parallel_transport, (0, 2 * np.pi), X0, rtol=1e-10, atol=1e-12, dense_output=True)

X_final = sol.y[:, -1]
# 처음과 끝의 각도 차이
# 동쪽 단위벡터를 (sinθ_0, 0) 좌표로 (성분: (X^θ * 1, X^φ * sinθ_0))
def to_orthonormal(X):
    return np.array([X[0], X[1] * np.sin(theta_0)])

X0_orth = to_orthonormal(X0)
Xf_orth = to_orthonormal(X_final)
angle = np.arctan2(Xf_orth[1], Xf_orth[0]) - np.arctan2(X0_orth[1], X0_orth[0])
angle_expected = -2 * np.pi * (1 - np.cos(theta_0))  # 부호는 적분 방향에 따라
# (홀로노미 = 2π(1 - cosθ_0) 의 크기)
print(f"평행이동 후 회전각:        {np.degrees(angle):.4f}°")
print(f"이론값 2π(1 - cosθ_0):     {np.degrees(angle_expected):.4f}°")
print(f"적도 (θ_0=π/2) 라면 0,  극에 가까울수록 큼.")
```

이 결과는 굽음이 폐곡선 평행이동에 *측정 가능한 회전* 을 남긴다는 사실 — 즉 *접속의 곡률* — 을 수치로 보여 준다. 1.6 의 미분형식 어휘로 가면 이 회전이 *곡률 2-형식* 으로 깔끔히 적힌다.

## 다음 절(1.3.4)로 가는 다리

평행이동의 *시간 미분 0* 조건이 공변미분 $D/dt$ 의 정의를 박았다. 그 미분을 곡선 위 *임의의* 벡터장에 적용하면 가속도 $D\dot{\mathbf{r}}/dt$ 가 정의된다. 다음 1.3.4 는 그 가속도와 1.2.2 의 벡터 가속도가 같음 — 그래서 1.2.4 의 운동방정식이 *공변미분 = 외력* 형태로 다시 적힘 — 을 본다.
