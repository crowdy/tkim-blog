---
title: '2.5.1 — 구속력: 라그랑주 곱셈자가 *직접* 박는 미지의 힘'
description: "§1.1.3 의 구속력을 라그랑주 형식으로 다시 본다. 구속식 $f_\\alpha = 0$ 마다 곱셈자 $\\lambda^\\alpha$ 를 도입해 *확장된 라그랑주식* 을 적고, $\\lambda^\\alpha$ 가 그대로 *구속력의 크기*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 52
lang: ko
pairSlug: am1tc-2-5-1-constraint-force
draft: false
updated: 2026-05-18
---

# 2.5.1 — 구속력: 라그랑주 곱셈자가 *직접* 박는 미지의 힘

> §1.1.3 의 구속력을 라그랑주 형식으로 다시 본다. 구속식 $f_\alpha = 0$ 마다 곱셈자 $\lambda^\alpha$ 를 도입해 *확장된 라그랑주식* 을 적고, $\lambda^\alpha$ 가 그대로 *구속력의 크기*.

## 본문이 말하는 것

원서 2.5.1 절은 §1.1.3 의 *다랑베르 + 구속력* 의 그림을 *라그랑주 곱셈자* 의 형식으로 다시 정리한다.

배위공간 $M$ 의 $n$ 개 일반화 좌표 $q^\alpha$ 가 *기본 좌표*. 그 위에 *추가* 구속식 $k$ 개:

$$
f_\beta(q, t) = 0 \quad (\beta = 1, \dots, k)
$$

이 식들이 *물리적 구속* — 무대 자체에는 박혀 있지 않은 *외부 강제*. 자유도가 *$n - k$* 로 줄어든다.

**라그랑주 곱셈자 형식.** 각 구속식 $f_\beta$ 마다 *미지의 함수* $\lambda^\beta(t)$ 를 도입. *확장된 라그랑주식*

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = \lambda^\beta\, \frac{\partial f_\beta}{\partial q^\alpha}
$$

이 식 $n$ 개 + 구속식 $f_\beta = 0$ 의 $k$ 개 = 총 $n + k$ 식이, 미지의 $n$ 개 좌표 $q^\alpha(t)$ + $k$ 개 곱셈자 $\lambda^\beta(t)$ 를 결정한다.

우변의 $\lambda^\beta\, \partial f_\beta / \partial q^\alpha$ 가 *구속력의 일반화 좌표 표현*. 곱셈자 $\lambda^\beta$ 가 그대로 *구속력의 크기* (또는 그에 비례하는 양).

## 한 번 더, 천천히

**(1) 두 가지 처리 방식.** 구속이 있는 계의 라그랑주식은 두 가지 길로 적을 수 있다.

- **방식 A**: *구속을 풀어* 자유도가 $n - k$ 개인 새 좌표 $q'^a$ 로 *재매개화*. 그러면 구속식이 *자동 만족*, 라그랑주식이 *그대로*. (§1.1.4 + §2.1 의 표준 길) 구속력은 *사라짐* — 풀고 싶다면 별도로 사후 계산.
- **방식 B**: 원래 좌표 $q^\alpha$ 를 유지하면서 *곱셈자* $\lambda^\beta$ 도 미지수로 추가. 구속식이 *식의 일부*. 구속력 $\lambda^\beta$ 가 *해의 일부*. (본 절)

방식 A 가 *식이 짧고* 방식 B 가 *구속력 까지 구해서 좋음*. 상황에 따라 선택.

**(2) 단진자에서의 비교.** 단진자에서 $\mathbf{x} \in \mathbb R^2$ + 구속 $|\mathbf{x}|^2 - \ell^2 = 0$.

- 방식 A ($q = \theta$): $L = \frac{1}{2} m\ell^2 \dot\theta^2 + mg\ell\cos\theta$, 라그랑주식 $\ddot\theta + (g/\ell)\sin\theta = 0$ — 1자유도.
- 방식 B ($q = (x, y)$): $L = \frac{1}{2} m (\dot x^2 + \dot y^2) - mgy$. $f = x^2 + y^2 - \ell^2$. 확장 식:

$$
m\ddot x = \lambda\, 2x, \quad m\ddot y + mg = \lambda\, 2y
$$

세 식 + 구속식이 $(x, y, \lambda)$ 를 결정. *장력* $T = -2\ell\lambda$ (음의 곱셈자 부호 정리).

두 방식이 *같은 운동* 을 만든다. *장력* 정보는 방식 B 만이 직접 준다.

**(3) §1.2.3 의 곱셈자 정리.** §1.2.3 에서 곡면 위 운동의 곱셈자가 *법선 방향 사영* 으로 결정됨을 봤다. 본 절의 곱셈자가 정확히 같은 양 — 단, 무대가 *추상적 배위공간* 까지 일반화됨.

**(4) §1.1.3 의 다랑베르 원리와의 일관성.** 곱셈자 형식이 다랑베르 원리 (*구속력은 가상 변위에 일을 하지 않음*) 를 만족함을 확인할 수 있다. 가상 변위 $\delta q^\alpha$ 는 구속 *접공간* 안에서만 — $(\partial f_\beta / \partial q^\alpha) \delta q^\alpha = 0$. 그러면 구속력 $\lambda^\beta (\partial f_\beta / \partial q^\alpha)$ 가 그 가상 변위와 *내적 0*. 일관성 OK.

**(5) 다중 구속의 *비축약*.** 구속이 *서로 독립* 이라면 ($\det (\partial f_\beta / \partial q^\alpha) \neq 0$ 의 부분 영역) 곱셈자가 *유일하게* 결정. *비독립* 구속이라면 곱셈자 결정에 *축약* — 게이지 자유.

## 파이썬으로 확인 — 단진자, 방식 A vs 방식 B + 곱셈자 추출

이 코드의 메시지는 단순하다: 단진자 운동을 (a) 1자유도 방식 A, (b) 2자유도 + 곱셈자 방식 B 둘로 적분해 *궤적이 같고*, 방식 B 에서 *곱셈자 $\lambda(t)$* 가 단진자의 *장력* 임을 본다.

```python
# 단진자: m = ℓ = 1, g = 9.81
# (A) q = θ:  θ̈ + (g/ℓ) sin θ = 0
# (B) q = (x, y), f = x² + y² - ℓ², λ from 운동방정식의 일관성:
#     m ẍ = 2 λ x, m ÿ + m g = 2 λ y, x² + y² = ℓ², ẋ x + ẏ y = 0
#     → λ = m (ẋ² + ẏ² + g·y / ℓ²)·... — 더 깔끔하게: 가속도식 + 구속을 두 번 미분
import numpy as np
from scipy.integrate import solve_ivp

m, ell, g = 1.0, 1.0, 9.81

# (A) 1자유도
def pendulum_A(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

sol_a = solve_ivp(pendulum_A, (0, 3.0), [np.pi/3, 0.0],
                  rtol=1e-10, atol=1e-12, dense_output=True)

# (B) 2자유도 + 곱셈자 — 라그랑주 곱셈자 ODE 직접 풀이
# 구속 ẍ x + ẏ y + ẋ² + ẏ² = 0 (구속의 두 번 시간 미분)
# 운동방정식 m ẍ = 2 λ x, m ÿ = 2 λ y - m g 대입
# → (2λx/m) x + (2λy/m - g) y + ẋ² + ẏ² = 0
# → 2 λ (x² + y²) / m = m g·y - m (ẋ² + ẏ²)
# → λ = m² (g·y - (ẋ² + ẏ²)) / (2 m (x² + y²))
#       = m (g·y - (ẋ² + ẏ²)) / (2 ℓ²)  (since x²+y² = ℓ²)

def pendulum_B(t, state):
    x, y, vx, vy = state
    lam = m * (g * y - (vx**2 + vy**2)) / (2 * ell**2)
    ax = 2 * lam * x / m
    ay = 2 * lam * y / m - g
    return [vx, vy, ax, ay]

x0, y0 = ell * np.sin(np.pi/3), -ell * np.cos(np.pi/3)
sol_b = solve_ivp(pendulum_B, (0, 3.0), [x0, y0, 0.0, 0.0],
                  rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 3, 200)
theta_a = sol_a.sol(ts)[0]
x_a, y_a = ell * np.sin(theta_a), -ell * np.cos(theta_a)
x_b, y_b = sol_b.sol(ts)[0], sol_b.sol(ts)[1]

diff = np.max(np.abs(x_a - x_b) + np.abs(y_a - y_b))
print(f"방식 A vs 방식 B 의 max |좌표 차이|: {diff:.2e}")

# 방식 B 에서 λ(t) 추출
def compute_lambda(t):
    x, y, vx, vy = sol_b.sol(t)
    return m * (g * y - (vx**2 + vy**2)) / (2 * ell**2)

lambdas = np.array([compute_lambda(t) for t in ts])
# 장력 T = -2 ℓ · λ · 부호 정리... 좀 더 명료하게 r 방향 힘:
# 구속력 = (2 λ x, 2 λ y), 그 크기 = 2 |λ| ℓ
T_magnitudes = 2 * np.abs(lambdas) * ell

print(f"\n장력의 범위: {T_magnitudes.min():.4f} ~ {T_magnitudes.max():.4f} N")
print(f"비교: θ=π/3 정지 시 cos(π/3)·m·g = {np.cos(np.pi/3) * m * g:.4f} N (이론)")
print(f"방식 A 에서는 *장력 정보가 없음* — 방식 B 만 제공")
```

이 결과는 (a) 두 방식이 *완전히 같은 궤적*, (b) 방식 B 만이 *곱셈자 = 구속력* 의 시계열 정보를 *직접* 준다는 사실을 보인다.

## 다음 절(2.5.2)로 가는 다리

구속력의 라그랑주 곱셈자 형식이 박혔다. 그 위에 *확장 라그랑지언* $\tilde L = L + \lambda^\beta f_\beta$ 라는 통합 객체로 식을 *깔끔히* 다시 적을 수 있다. 2.5.2 가 *확장 라그랑지언* 의 변분 원리 형식과 구속계의 표준 처리법을 정리한다.
