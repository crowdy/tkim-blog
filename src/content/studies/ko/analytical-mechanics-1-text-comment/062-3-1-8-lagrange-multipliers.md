---
title: '3.1.8 — 라그랑주의 미정 곱셈자법: 구속이 있는 변분 원리의 표준 처방'
description: "홀로노믹 구속 $f_\\beta(q, t) = 0$ 이 있을 때 변분 원리. 곱셈자 $\\lambda^\\beta(t)$ 를 도입해 확장 작용 $\\tilde S = \\int (L + \\lambda^\\beta f_\\beta) dt$ 의 자유 변분으로 만든다. §2.5 의 라그랑주식 형식의 변분 표현."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 62
lang: ko
pairSlug: am1tc-3-1-8-lagrange-multipliers
draft: false
updated: 2026-05-18
---

# 3.1.8 — 라그랑주의 미정 곱셈자법: 구속이 있는 변분 원리의 표준 처방

> 홀로노믹 구속 $f_\beta(q, t) = 0$ 이 있을 때 변분 원리. 곱셈자 $\lambda^\beta(t)$ 를 도입해 확장 작용 $\tilde S = \int (L + \lambda^\beta f_\beta) dt$ 의 자유 변분으로 만든다. §2.5 의 라그랑주식 형식의 변분 표현.

## 본문이 말하는 것

원서 3.1.8 절은 *홀로노믹 구속이 있는 변분 원리* 를 다룬다. $n$ 좌표 $q^\alpha$ 와 $k$ 개의 구속

$$
f_\beta(q, t) = 0 \quad (\beta = 1, \dots, k)
$$

해밀턴 원리를 적용할 때 변분 $\delta q^\alpha$ 가 *임의가 아니라 구속을 만족*:

$$
\frac{\partial f_\beta}{\partial q^\alpha}\, \delta q^\alpha = 0 \quad (\forall\, t \in [t_1, t_2])
$$

즉 *$n - k$ 차원의 부분공간* 만이 변분의 자유.

**미정 곱셈자법.** 각 구속마다 곱셈자 $\lambda^\beta(t)$ 도입. *확장 작용*

$$
\tilde S = \int_{t_1}^{t_2} \tilde L\, dt,\quad \tilde L = L + \lambda^\beta(t)\, f_\beta(q, t)
$$

이 확장 작용의 *자유 변분* ($\delta q^\alpha$, $\delta \lambda^\beta$ 모두 임의) 이 EL + 구속을 모두 만든다.

- $\delta q^\alpha$ 에 대한 변분: $\frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = \lambda^\beta\, \frac{\partial f_\beta}{\partial q^\alpha}$ (§2.5.1 의 확장 라그랑주식 재확인).
- $\delta \lambda^\beta$ 에 대한 변분: $f_\beta = 0$ (구속 자체).

곱셈자 $\lambda^\beta$ 가 *구속력의 크기* 의 변분 형식 표현. §2.5.1, §2.5.2 가 같은 결과 — 변분 원리 시점에서 자연스럽게 재정리.

## 한 번 더, 천천히

**(1) "미정" 의 의미.** 곱셈자 $\lambda^\beta$ 가 *사전에 결정되지 않은* — *변분과 함께 결정되는* — 양. 미정 → 결정 (변분 풀이로) → *물리적 구속력*. 일반화 좌표·일반화 운동량과 같은 *동적 변수*.

**(2) 변분에서의 *부분공간 자유* 의 미묘함.** 구속이 있을 때 변분 $\delta q$ 가 자유롭지 않다 — 구속 부분공간에 머물러야 한다. 미정 곱셈자 추가 변수 $\lambda^\beta$ 가 이 *제약을 자유* 로 풀어주는 *수학적 트릭*. 결과적으로 같은 운동.

**(3) §2.5.2 와의 정확한 일관성.** §2.5.2 의 확장 라그랑지언 $\tilde L = L + \lambda^\beta f_\beta$ 가 본 절의 미정 곱셈자법과 정확히 같은 객체. 두 절이 *같은 결과* 를 *다른 시점* (운동방정식의 직접 도출 vs 변분 원리) 에서 다룬다.

**(4) 비홀로노믹의 *예외 (회수)*.** 본 절의 미정 곱셈자법은 *홀로노믹 한정*. 비홀로노믹 구속 ($a^\beta_\alpha \dot q^\alpha = 0$, 적분 불가능) 에서는 *같은 형식의 변분 원리* 가 *vakonomic mechanics* — *실제 물리와 다른 운동* 을 만든다. §2.5.3 의 미묘함을 본 절에서도 *경계 사례* 로 인식해 둠.

**(5) 최적 제어로의 다리.** 미정 곱셈자법이 *최적 제어 이론* (optimal control) 의 *Pontryagin 최대 원리* 와 같은 형식. 제어 변수와 *상태 구속* 이 라그랑주 곱셈자로 결합. *역학·제어·경제학* 에 공통의 변분 어휘.

## 파이썬으로 확인 — 단진자의 변분 원리 + 미정 곱셈자

이 코드의 메시지는 단순하다: 단진자를 *2 자유도 (x, y) + 구속 $x^2 + y^2 = \ell^2$* 의 변분 원리로 다시 풀어, $\lambda(t)$ 가 *장력* 임을 본다 (§2.5.1 의 결과 재확인).

```python
# 단진자: q = (x, y), 구속 f = x² + y² - ℓ² = 0
# 확장 작용 S̃ = ∫ [ (1/2) m (ẋ² + ẏ²) + m g (-y) ] dt + ∫ λ(t) · (x²+y²-ℓ²) dt
# 변분 EL:
#   m ẍ = 2 λ x      (∂ f /∂x = 2x)
#   m ÿ + m g = 2 λ y (∂ f /∂y = 2y, ∂ L /∂y 의 위치에너지 부분)
# 구속: x² + y² = ℓ²
# 이미 §2.5.1 에서 분석 — λ 의 시간 변화 시각화
import numpy as np
from scipy.integrate import solve_ivp

m, ell, g = 1.0, 1.0, 9.81

def pendulum_with_lambda(t, state):
    x, y, vx, vy = state
    # 구속 가속도 조건에서 λ 결정 (§2.5.1 의 방법)
    lam = m * (g * y - (vx**2 + vy**2)) / (2 * ell**2)
    ax = 2 * lam * x / m
    ay = 2 * lam * y / m - g
    return [vx, vy, ax, ay]

x0, y0 = ell * np.sin(np.pi/4), -ell * np.cos(np.pi/4)
sol = solve_ivp(pendulum_with_lambda, (0, 3.0), [x0, y0, 0.0, 0.0],
                rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 3, 200)
x_t, y_t, vx_t, vy_t = sol.sol(ts)

# λ(t) 추출
lam_t = m * (g * y_t - (vx_t**2 + vy_t**2)) / (2 * ell**2)
# 장력 (구속력의 크기): T = 2 |λ| ℓ
T_t = 2 * np.abs(lam_t) * ell

print(f"단진자 변분 원리 + 미정 곱셈자 (§2.5 와 동치)")
print(f"λ 의 시간 평균: {np.mean(lam_t):.4f}")
print(f"장력 T = 2|λ|ℓ 범위: [{T_t.min():.4f}, {T_t.max():.4f}] N")
print(f"이론 (정지 시 θ=π/4): T_static = m g cos(π/4) = {m * g * np.cos(np.pi/4):.4f} N")
print(f"\n→ 변분 원리의 곱셈자 λ 가 §2.5.1 의 곱셈자와 같은 양.")

# 구속 만족 확인
constraint = x_t**2 + y_t**2 - ell**2
print(f"\n구속 잔차 max |x² + y² - ℓ²| = {np.max(np.abs(constraint)):.2e}")
```

이 결과는 *변분 원리의 미정 곱셈자* 와 *§2.5.1 의 라그랑주 곱셈자* 가 *같은 물리적 양* 임을 수치로 확인한다. 변분 원리가 §2.5 의 결과를 *다른 시점에서 재정리* 한 것.

## 다음 절(3.2.1)로 가는 다리

해밀턴의 원리 (§3.1) 까지는 *끝점이 고정* 된 변분. 다음 §3.2.1 의 *워이스의 원리* 는 *끝점이 자유롭게 움직일 수 있는* 변분으로 일반화. 경계 항이 *사라지지 않고* — 그 안에 *운동량과 에너지* 의 정보가 박힌다. 노에터 정리의 *강화된 형식* 이 그 결과로 떨어진다.
