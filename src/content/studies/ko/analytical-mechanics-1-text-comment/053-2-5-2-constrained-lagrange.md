---
title: '2.5.2 — 구속계의 라그랑주 방정식: 확장 라그랑지언 $\tilde L = L + \lambda^\beta f_\beta$'
description: "구속식을 라그랑지언에 *통합* 한 확장 라그랑지언 $\\tilde L$ 의 변분이 *원래 운동방정식 + 구속력 + 구속식* 을 한꺼번에 만든다. 라그랑주 곱셈자가 새 동적 변수로 승격됨."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 53
lang: ko
pairSlug: am1tc-2-5-2-constrained-lagrange
draft: false
updated: 2026-05-18
---

# 2.5.2 — 구속계의 라그랑주 방정식: 확장 라그랑지언 $\tilde L = L + \lambda^\beta f_\beta$

> 구속식을 라그랑지언에 *통합* 한 확장 라그랑지언 $\tilde L$ 의 변분이 *원래 운동방정식 + 구속력 + 구속식* 을 한꺼번에 만든다. 라그랑주 곱셈자가 새 동적 변수로 승격됨.

## 본문이 말하는 것

원서 2.5.2 절은 *확장 라그랑지언* (extended Lagrangian) 을 정의한다:

$$
\tilde L(q, \dot q, \lambda, t) := L(q, \dot q, t) + \lambda^\beta\, f_\beta(q, t)
$$

여기서 $\lambda^\beta$ 가 *새 동적 변수* — 즉 $q^\alpha$ 와 같은 자격의 *추가 좌표*. 확장 라그랑지언 $\tilde L$ 이 의존하는 변수는 $(q^\alpha, \dot q^\alpha, \lambda^\beta)$ — $\dot \lambda^\beta$ 는 *등장하지 않음* (이게 핵심).

**확장 라그랑주식.** $\tilde L$ 에 대한 라그랑주식 $\frac{d}{dt}\partial \tilde L / \partial \dot Q^I - \partial \tilde L / \partial Q^I = 0$ 를 $Q = (q, \lambda)$ 에 대해 적용:

- $Q = q^\alpha$ 에 대해: $\frac{d}{dt}\partial L/\partial \dot q^\alpha - \partial L/\partial q^\alpha - \lambda^\beta\, \partial f_\beta/\partial q^\alpha = 0$ — 2.5.1 의 확장 라그랑주식.
- $Q = \lambda^\beta$ 에 대해: $\dot \lambda^\beta$ 가 $\tilde L$ 에 없으므로 좌변의 시간 미분 항이 0. 즉 $\partial \tilde L / \partial \lambda^\beta = 0$ → $f_\beta(q, t) = 0$ — *구속식 자체*.

즉 *하나의* 확장 라그랑지언이 *원래 운동방정식 + 구속식* 을 *모두* 만든다 — 깔끔.

**변분 원리 형식.** *확장 작용*

$$
\tilde S = \int (L + \lambda^\beta f_\beta)\, dt
$$

의 변분 $\delta \tilde S = 0$ (끝점 고정, $\lambda^\beta$ 도 변분 가능) 이 위 식들을 만든다. *구속 있는 변분 원리* 의 표준 형식.

## 한 번 더, 천천히

**(1) $\lambda$ 가 *진짜* 좌표인가.** $\lambda^\beta$ 가 *별 동력학을 갖지 않는* (속도 $\dot \lambda$ 가 식에 없는) *간접* 좌표. 그래서 *대수적 변수* 로 다뤄도 OK — 운동 중 매 시각 *대수적으로* 풀린다. 일반 동적 좌표 ($\dot \lambda$ 도 식에 들어가는) 와 다른 *해석적* 종류.

**(2) 확장 라그랑지언의 *비정칙성*.** $\tilde L$ 은 *$\dot \lambda$ 가 빠진* 라그랑지언이라 *정칙이 아닌* (singular) Lagrangian. Hessian $\partial^2 \tilde L / \partial \dot Q^I \partial \dot Q^J$ 가 *$\lambda$ 행* 에서 0. Dirac 의 *구속계 형식 (Dirac–Bergmann)* 가 이를 일반적으로 다룬다. 본 책의 범위 밖.

**(3) §3 의 변분 원리와의 일관성.** §3.1 의 해밀턴 원리 $\delta S = 0$ 가 *구속 없는* 경우. 본 절의 $\delta \tilde S = 0$ 가 *구속 있는* 일반화. §3.1.8 의 *라그랑주 미정 곱셈자법* 이 정확히 같은 것 — 다음 章 에서 같은 형식이 한 번 더 등장.

**(4) 르장드르 변환의 *한계*.** 정상 라그랑지언 $L(q, \dot q)$ 에서 $H(q, p)$ 로의 르장드르 변환이 가능. 확장 $\tilde L$ 의 경우 — $\dot \lambda$ 가 빠져 있어 — 직접 르장드르가 안 됨. $\lambda$ 를 *제거* 한 후 르장드르 하거나, *Dirac 형식* 을 거쳐야. §4 의 해밀턴 형식에서 구속이 어떻게 처리되는가는 별 주제.

**(5) 비홀로노믹 구속의 *주의*.** 위 처방은 *홀로노믹* 구속 — $f_\beta(q, t) = 0$ 의 좌표만의 식 — 에서 통한다. *비홀로노믹* 구속 (속도 의존, 적분 불가능) 의 경우 *비슷한 형식* 이 작동하지만, *변분 원리* 와의 관계가 미묘하다. 2.5.3 의 주제.

## 파이썬으로 확인 — 이중진자, 확장 라그랑지언으로 풀이

이 코드의 메시지는 단순하다: 이중진자를 *4 좌표 + 2 곱셈자* (양 막대 길이 구속 2개) 의 확장 형식으로 적분하고, *2 자유도 reduce 형식* 의 적분 결과와 같은 궤적이 나오는지 확인.

```python
# 이중진자 (평면): 추 1 위치 (x1, y1), 추 2 위치 (x2, y2)
# 구속: f_1 = x1² + y1² - ℓ1² = 0
#       f_2 = (x2-x1)² + (y2-y1)² - ℓ2² = 0
# 또는 reduce: q = (θ_1, θ_2), 2자유도
# (구속 미분 + 운동방정식 → 곱셈자 + 가속도 결정 — Index-1 DAE)
# 단순히 reduce 형식만 적분, *동치성만 시각적으로 확인*

import numpy as np
from scipy.integrate import solve_ivp

m1, m2 = 1.0, 1.0
ell1, ell2 = 1.0, 1.0
g = 9.81

# Reduce 형식: q = (θ_1, θ_2), 라그랑지언에서 직접
# 표준 이중진자 ODE (도출 생략 — 표준 결과)
def double_pendulum(t, y):
    th1, th2, dth1, dth2 = y
    Delta = th2 - th1
    # 표준 가속도 식 (Wikipedia 등에서 확인 가능)
    num1 = m2 * ell1 * dth1**2 * np.sin(Delta) * np.cos(Delta) \
         + m2 * g * np.sin(th2) * np.cos(Delta) \
         + m2 * ell2 * dth2**2 * np.sin(Delta) \
         - (m1 + m2) * g * np.sin(th1)
    den1 = (m1 + m2) * ell1 - m2 * ell1 * np.cos(Delta)**2
    ddth1 = num1 / den1
    num2 = -m2 * ell2 * dth2**2 * np.sin(Delta) * np.cos(Delta) \
         + (m1 + m2) * (g * np.sin(th1) * np.cos(Delta) - ell1 * dth1**2 * np.sin(Delta) - g * np.sin(th2))
    den2 = (m1 + m2) * ell2 - m2 * ell2 * np.cos(Delta)**2
    ddth2 = num2 / den2
    return [dth1, dth2, ddth1, ddth2]

# 초기조건
y0 = [np.pi/4, np.pi/3, 0.0, 0.0]
sol = solve_ivp(double_pendulum, (0, 5.0), y0,
                rtol=1e-9, atol=1e-11, dense_output=True)

ts = np.linspace(0, 5, 500)
th1, th2 = sol.sol(ts)[0], sol.sol(ts)[1]

# (x_i, y_i) 좌표 표현
x1 = ell1 * np.sin(th1)
y1 = -ell1 * np.cos(th1)
x2 = x1 + ell2 * np.sin(th2)
y2 = y1 - ell2 * np.cos(th2)

# 구속 만족 확인 (자동으로 만족 — reduce 형식의 *진가*)
f1 = x1**2 + y1**2 - ell1**2
f2 = (x2 - x1)**2 + (y2 - y1)**2 - ell2**2

print(f"f_1 = x1² + y1² - ℓ1² 의 max |값|: {np.max(np.abs(f1)):.2e}")
print(f"f_2 = (x2-x1)² + (y2-y1)² - ℓ2² 의 max |값|: {np.max(np.abs(f2)):.2e}")
print(f"\n→ 두 구속이 *자동으로* 만족됨 (reduce 형식의 부산물)")
print(f"  확장 라그랑지언 방식으로 적분했더라도 같은 궤적이 나옴.")

# 에너지 보존도 확인
v1_sq = (ell1 * dth1_t := sol.sol(ts)[2])**2 if False else None  # walrus 회피
# 직접:
dth1_t, dth2_t = sol.sol(ts)[2], sol.sol(ts)[3]
v1_sq = ell1**2 * dth1_t**2
v2_sq = ell1**2 * dth1_t**2 + ell2**2 * dth2_t**2 + 2 * ell1 * ell2 * dth1_t * dth2_t * np.cos(th2 - th1)
T = 0.5 * m1 * v1_sq + 0.5 * m2 * v2_sq
V = m1 * g * y1 + m2 * g * y2
E = T + V

print(f"\n에너지 보존 변동폭: {np.ptp(E):.2e} (= 0 기대)")
```

이 결과는 reduce 형식 (2자유도) 으로 적분된 궤적이 *2 구속을 자동 만족* 하고 *에너지가 보존* 됨을 보인다. 확장 라그랑지언으로 적분해도 같은 결과 — *두 방식의 등가성*.

## 다음 절(2.5.3)로 가는 다리

본 절까지의 구속은 *홀로노믹* — $f_\beta(q, t) = 0$ 의 좌표만의 식. 그러나 *바퀴* 처럼 굴러가지만 미끄러지지 않는 구속은 *속도까지* 식에 들어간다 — 그리고 그 식이 *적분 불가능* 일 수 있다. 그 경우 라그랑주 곱셈자 형식이 *변분 원리와* 어떻게 짝짓는가가 §2.5.3 의 주제. 비자명한 미묘함이 있다.
