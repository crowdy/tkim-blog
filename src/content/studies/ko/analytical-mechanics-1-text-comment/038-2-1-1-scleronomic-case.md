---
title: '2.1.1 — 스클레로노믹의 경우: $T - V$ 가 *왜* 자연스러운 양인가'
description: '시간에 의존하지 않는 구속에서, §1.1.4 의 배위공간식 좌변이 정확히 $\frac{d}{dt}\partial T/\partial\dot q - \partial T/\partial q$ 로 정리된다. 보존력에 대해 $L = T - V$ 가 등장하고, 라그랑주 방정식이 한 줄로 적힌다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 38
lang: ko
pairSlug: am1tc-2-1-1-scleronomic-case
draft: false
updated: 2026-05-18
---

# 2.1.1 — 스클레로노믹의 경우: $T - V$ 가 *왜* 자연스러운 양인가

> 시간에 의존하지 않는 구속에서, §1.1.4 의 배위공간식 좌변이 정확히 $\frac{d}{dt}\partial T/\partial\dot q - \partial T/\partial q$ 로 정리된다. 보존력에 대해 $L = T - V$ 가 등장하고, 라그랑주 방정식이 한 줄로 적힌다.

## 본문이 말하는 것

원서 2.1.1 절은 *스클레로노믹* (scleronomic — 구속이 시간에 의존하지 않음) 인 경우, §1.1.4 의 배위공간 위 운동방정식

$$
\sum_i m_i \ddot{\mathbf{x}}_i \cdot \frac{\partial \mathbf{x}_i}{\partial q^\alpha} = Q_\alpha
$$

의 좌변이 *운동에너지* $T$ 의 미분 형태로 깔끔히 정리된다는 것을 보인다. 스클레로노믹: $\mathbf{x}_i = \mathbf{x}_i(q^1, \dots, q^n)$ — $t$ 명시적 의존 없음.

운동에너지

$$
T = \frac{1}{2} \sum_i m_i\, |\dot{\mathbf{x}}_i|^2 = \frac{1}{2} M_{\alpha\beta}(q)\, \dot q^\alpha \dot q^\beta
$$

여기서 *질량 행렬* $M_{\alpha\beta}(q) = \sum_i m_i\, (\partial \mathbf{x}_i / \partial q^\alpha) \cdot (\partial \mathbf{x}_i / \partial q^\beta)$. 좌표만의 함수.

본문이 증명하는 핵심 등식 (편미분 + 곱 미분 + 인덱스 교환):

$$
\sum_i m_i \ddot{\mathbf{x}}_i \cdot \frac{\partial \mathbf{x}_i}{\partial q^\alpha} = \frac{d}{dt} \frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial T}{\partial q^\alpha}
$$

대입하면 운동방정식이

$$
\frac{d}{dt} \frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial T}{\partial q^\alpha} = Q_\alpha
$$

일반화 힘 $Q_\alpha$ 가 *보존력* — 즉 $Q_\alpha = -\partial V / \partial q^\alpha$ 인 함수 $V(q)$ 가 있다면, **라그랑지언** $L := T - V$ 를 도입해

$$
\boxed{\quad \frac{d}{dt} \frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = 0 \quad}
$$

— **라그랑주 방정식** (Euler–Lagrange equation). 운동 전체가 *하나의 함수* $L(q, \dot q)$ 에서 결정된다.

## 한 번 더, 천천히

**(1) $L = T - V$ 의 *부호* 가 어색해 보이지만…** 학부 처음 만나면 "왜 $T + V$ 가 아니라 $T - V$ 인가" 의심이 든다. 이유는 *부호 차이가 미분 형태에서 정확히 일반화 힘을 만들기 때문*. $\partial L / \partial q^\alpha = \partial T/\partial q^\alpha - \partial V/\partial q^\alpha$ — 두 번째 항이 *바깥으로 끌어내려진* 보존력. 식 형태가 깔끔히 떨어지는 것이 $T - V$ 의 *수학적* 정당성.

**(2) 단진자 예시.** 길이 $\ell$, 질량 $m$, 일반화 좌표 $q = \theta$. $\mathbf{x} = \ell (\sin\theta, -\cos\theta)$, $\dot{\mathbf{x}} = \ell \dot\theta (\cos\theta, \sin\theta)$. $T = \frac{1}{2} m \ell^2 \dot\theta^2$. 중력 위치에너지 $V = -m g \ell \cos\theta$ (피벗 기준). 라그랑지언

$$
L = \frac{1}{2} m \ell^2 \dot\theta^2 + m g \ell \cos\theta
$$

라그랑주 방정식

$$
\frac{d}{dt}(m \ell^2 \dot\theta) - (-m g \ell \sin\theta) = 0 \implies \ddot\theta + \frac{g}{\ell}\sin\theta = 0
$$

— 1.1.4 의 결과 재확인.

**(3) 좌표 자유의 첫 사례.** 라그랑주 방정식은 *어떤 일반화 좌표를 잡든* 같은 형식. 단진자에서 $q = \theta$ 든 $q = \sin\theta$ 든 라그랑주식 형태는 그대로 — *식의 계수* 만 좌표 표현에 따라 바뀐다. 이 형식 불변성이 §2.1.3 의 공변성으로 정식화된다.

**(4) $T$ 의 *이차형* 성격.** $T = \frac{1}{2} M_{\alpha\beta} \dot q^\alpha \dot q^\beta$ — 속도에 *이차*. 이는 §1.6.3 의 *리만 계량* 과 같은 형식 — $M_{\alpha\beta}$ 가 배위공간 위의 *미터*. 즉 *운동에너지가 미터를 정의* — 라그랑주 역학과 리만 기하의 연결.

## 파이썬으로 확인 — 단진자, 뉴턴식 vs 라그랑주식

이 코드의 메시지는 단순하다: 같은 단진자를 (a) 뉴턴식 $m \ddot{\mathbf{x}} = \mathbf{F}$ 의 직접 좌표 적분 (구속력 라그랑주 곱셈자 포함) 과 (b) 라그랑주식 $\ddot\theta + (g/\ell) \sin\theta = 0$ 적분 으로 풀어, 두 궤적이 정확히 일치함을 확인.

```python
# (a) 라그랑주식 (1자유도, q = θ)
# (b) R^2 좌표 + 라그랑주 곱셈자 (구속력) — 비교용
import numpy as np
from scipy.integrate import solve_ivp

g, ell, m = 9.81, 1.0, 1.0

# (a) 라그랑주식: θ¨ = -(g/ℓ) sin θ
def lagrange(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

sol_a = solve_ivp(lagrange, (0, 3.0), [np.pi / 3, 0.0],
                  rtol=1e-10, atol=1e-12, dense_output=True)

# (b) R^2 좌표: m x¨ = (0, -mg) + λ · (-2x, -2y) 의 구속 |x|² = ℓ²
# 구속 미분 + 2차 미분 → λ 결정 (라그랑주 곱셈자 방법):
# λ = (m |ẋ|² - m g·x) / (2|x|²) = (m ℓ² θ̇² + m g ℓ cos θ) / (2 ℓ²)
# 운동방정식을 직접 적분: 6차원 (x, y, vx, vy) 가 아닌 4차원 (x, y, vx, vy)
def newton_with_lambda(t, state):
    x, y, vx, vy = state
    r2 = x**2 + y**2  # = ℓ² 이어야 함
    # λ 결정 (구속 가속도 조건): d²(x² + y²)/dt² = 0
    # 2(vx² + vy²) + 2(x x¨ + y y¨) = 0
    # x¨ = (F_x - 2λx)/m = -2λx/m (외력 F_x = 0)
    # y¨ = (F_y - 2λy)/m = (-mg - 2λy)/m = -g - 2λy/m
    # 대입: (vx² + vy²) + x(-2λx/m) + y(-g - 2λy/m) = 0
    # → (vx² + vy²) - 2λ(x² + y²)/m - g y = 0
    # → λ = m * (vx² + vy² - g y) / (2 (x² + y²))
    lam = m * (vx**2 + vy**2 - g * y) / (2 * r2)
    ax = -2 * lam * x / m
    ay = -g - 2 * lam * y / m
    return [vx, vy, ax, ay]

# 초기조건 R^2: θ(0) = π/3 → x = ℓ sin(π/3), y = -ℓ cos(π/3); v=0
x0 = ell * np.sin(np.pi / 3)
y0 = -ell * np.cos(np.pi / 3)
sol_b = solve_ivp(newton_with_lambda, (0, 3.0), [x0, y0, 0.0, 0.0],
                  rtol=1e-10, atol=1e-12, dense_output=True)

# 비교: 두 해의 (x, y) 가 같은가?
ts = np.linspace(0, 3, 200)
theta_a = sol_a.sol(ts)[0]
x_a = ell * np.sin(theta_a)
y_a = -ell * np.cos(theta_a)

x_b, y_b = sol_b.sol(ts)[0], sol_b.sol(ts)[1]

diff = np.max(np.abs(x_a - x_b) + np.abs(y_a - y_b))
print(f"라그랑주식 vs 뉴턴+λ 의 max 좌표 차이: {diff:.2e}")
print(f"기대: ~ 1e-8 (둘 다 RK45, 같은 tol)")
```

이 결과는 *1자유도 라그랑주식* 이 *3자유도 뉴턴식 + 라그랑주 곱셈자* 와 정확히 같은 궤적을 만들어 냄을 보인다. 라그랑주식의 *축소력* — 자유도 차원만으로 끝나는 — 의 작은 증거.

## 다음 절(2.1.2)로 가는 다리

스클레로노믹 — 구속이 시간 무관 — 가정 하에 라그랑주식이 깔끔히 떨어졌다. 그런데 *움직이는 구속* (예: 회전하는 후프 위의 구슬, 가속하는 차 안의 진자) 의 경우에는 $\mathbf{x}_i(q, t)$ 에 시간이 명시적으로 들어간다. 운동에너지의 *세 종류* — $T_2 + T_1 + T_0$ — 가 등장하지만, 라그랑주식 형식 자체는 그대로 유지된다. 2.1.2 가 그 일반화를 박는다.
