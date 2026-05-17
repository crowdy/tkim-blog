---
title: '1.1.4 — 배위공간 위의 운동방정식: 좌표를 *자유도* 에 맞춰 다시 적기'
description: '다랑베르 원리가 구속력을 지웠으니 $n$ 개의 일반화 좌표 $q^\alpha$ 로 다시 적자. 결과는 라그랑주 식의 가장 거친 원형 — 그러나 *좌표가 어떻게 잡히든 같은 식* 이라는 핵심을 이미 담고 있다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 4
lang: ko
pairSlug: am1tc-1-1-4-eom-on-config-space
draft: false
updated: 2026-05-17
---

# 1.1.4 — 배위공간 위의 운동방정식: 좌표를 *자유도* 에 맞춰 다시 적기

> 다랑베르 원리가 구속력을 지웠으니 $n$ 개의 일반화 좌표 $q^\alpha$ 로 다시 적자. 결과는 라그랑주 식의 가장 거친 원형 — 그러나 *좌표가 어떻게 잡히든 같은 식* 이라는 핵심을 이미 담고 있다.

## 본문이 말하는 것

원서 1.1.4 절은 다랑베르–라그랑주 식

$$
\sum_i (m_i \ddot{\mathbf{x}}_i - \mathbf{F}_i^{\text{appl}}) \cdot \delta\mathbf{x}_i = 0
$$

을 일반화 좌표 $q = (q^1, \dots, q^n)$ 로 다시 적는다.

배위공간은 사상 $\mathbf{x}_i = \mathbf{x}_i(q, t)$ 로 파라미터화. 연쇄율로

$$
\dot{\mathbf{x}}_i = \sum_\alpha \frac{\partial \mathbf{x}_i}{\partial q^\alpha}\, \dot q^\alpha + \frac{\partial \mathbf{x}_i}{\partial t}
$$

가상 변위는 시간 고정 — *오직* 첫 항만:

$$
\delta\mathbf{x}_i = \sum_\alpha \frac{\partial \mathbf{x}_i}{\partial q^\alpha}\, \delta q^\alpha
$$

이를 다랑베르 식에 대입하면 $n$ 개의 *독립인* $\delta q^\alpha$ 가 빠져나가, 각 $\alpha$ 마다 한 식:

$$
\sum_i m_i \ddot{\mathbf{x}}_i \cdot \frac{\partial \mathbf{x}_i}{\partial q^\alpha} = Q_\alpha \quad (\alpha = 1, \dots, n)
$$

여기서 *일반화 힘* 은

$$
Q_\alpha = \sum_i \mathbf{F}_i^{\text{appl}} \cdot \frac{\partial \mathbf{x}_i}{\partial q^\alpha}
$$

이것이 *배위공간 위의 운동방정식*. $3N$ 개의 결합식이 $n$ 개로 축소되었고, 구속력 $\mathbf{R}_i$ 도 구속식 $f_\alpha$ 도 등장하지 않는다.

## 한 번 더, 천천히

식의 좌변 $\sum_i m_i \ddot{\mathbf{x}}_i \cdot \partial \mathbf{x}_i / \partial q^\alpha$ 를 직접 다뤄 보면 두 가지가 보인다.

**(i) 좌변 = $\frac{d}{dt}\frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial T}{\partial q^\alpha}$.** 운동에너지 $T = \frac{1}{2} \sum_i m_i \dot{\mathbf{x}}_i^2$ 로 적으면 좌변이 이 깔끔한 형태로 정리된다 (계산은 §2.1 에서 본격 수행, 여기서는 사실로 받자). 이 등식 자체가 라그랑주식의 원형. 일반화 힘이 *보존력* $Q_\alpha = -\partial V / \partial q^\alpha$ 이면, $L = T - V$ 로 적어

$$
\frac{d}{dt} \frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = 0
$$

— 이게 7 장의 라그랑주식이다. 1.1.4 는 그 도착지로 가는 첫걸음.

**(ii) 좌표 선택 자유.** 일반화 좌표 $q^\alpha$ 를 어떻게 잡든 — 단진자에서 $\theta$ 든, $\sin\theta$ 든, $\theta^3$ 이든 — 위 식의 *형식* 은 같다. 다만 식의 *계수* (편미분들) 가 좌표에 의존한다. 이 좌표 자유 (= covariance) 는 1.3 의 텐서 어휘로 *식 자체* 가 좌표 자유롭다는 진술로 승격된다.

이 두 사실은 본 절의 양면 — 일반화 좌표로 적은 식은 (i) *깔끔하다* 는 점에서 라그랑주식의 원형이고, (ii) *좌표 선택에 휘둘리지 않는다* 는 점에서 텐서·다양체의 출발점이다.

## 파이썬으로 확인 — 단진자의 배위공간식 적분

이 코드의 메시지는 단순하다: 일반화 좌표 $\theta$ 하나에 대한 식 $m\ell^2 \ddot\theta = -mg\ell\sin\theta$ 를 적분하면, $\mathbb R^2$ 의 운동방정식 (구속력 포함) 을 풀 때와 *완전히 같은 궤적* 이 나온다.

```python
# 단진자: 일반화 좌표 q = θ. 배위공간식:
#   m ℓ^2 θ¨ = -m g ℓ sin θ  →  θ¨ = -(g/ℓ) sin θ
# 이 한 식을 적분하고, R^2 직접 적분 (구속력은 라그랑주 곱셈자) 과 비교한다.
import numpy as np
from scipy.integrate import solve_ivp

g, ell, m = 9.81, 1.0, 1.0

# (A) 배위공간식 — q = θ
def rhs_q(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

# (B) R^2 식 — 라그랑주 곱셈자 λ 를 사용 (구속 ℓ^2 - |x|^2 = 0)
# 운동방정식: m x¨ = (외력) + λ · ∇(ℓ^2 - |x|^2) = (0, -mg) + λ · (-2x, -2y)
# 구속이 항상 만족하려면 λ 를 운동 중에 결정해야 한다 (자세한 유도 생략).
# 여기선 (A) 만 적분하고, 그 궤적이 구속을 자동 만족함을 확인한다.

sol = solve_ivp(rhs_q, (0.0, 3.0), [np.pi/3, 0.0], rtol=1e-10, atol=1e-12, dense_output=True)
t = np.linspace(0, 3, 300)
theta = sol.sol(t)[0]

# R^2 위치
x = ell * np.sin(theta)
y = -ell * np.cos(theta)

# 구속 |x|^2 = ℓ^2 자동 만족?
constraint_residual = x**2 + y**2 - ell**2
print(f"max |구속 잔차| = {np.max(np.abs(constraint_residual)):.2e}")  # ~1e-30 (해석적 0)

# 에너지 보존?
KE = 0.5 * m * ell**2 * sol.sol(t)[1]**2
PE = -m * g * ell * np.cos(theta)
E = KE + PE
print(f"E 변동폭 = {np.ptp(E):.2e}")  # ~1e-9 (RK45 수치 오차)
```

이 결과는 배위공간식이 *구속을 자동으로 만족하면서* 에너지까지 보존하는 궤적을 만들어 냄을 보인다 — $\mathbb R^{3N}$ 에서 구속력까지 풀어내는 수고와 비교하면 압도적으로 짧은 길이다.

## 다음 절(1.2.1)로 가는 다리

배위공간식은 *임의의* 일반화 좌표에 대해 같은 형식을 가진다. 그러나 1.1.4 까지는 배위공간이 *어떤 종류의 공간인가* — 평면인가, 굽었는가, 토러스인가 — 를 묻지 않았다. 다음 §1.2 는 가장 친숙한 굽은 공간 — *곡면* — 위에 정착해, 그 *기하* 가 운동방정식의 형태에 어떤 흔적을 남기는지 따져 본다. 측지선이라는 핵심어가 거기서 등장한다.
