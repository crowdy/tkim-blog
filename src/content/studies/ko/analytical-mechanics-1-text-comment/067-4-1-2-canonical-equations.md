---
title: '4.1.2 — 정준 방정식: $\dot q = \partial H/\partial p$, $\dot p = -\partial H/\partial q$ 의 대칭적 1차 ODE'
description: "르장드르 변환 $H(q, p, t) = p_\\alpha \\dot q^\\alpha - L$ 로 라그랑주의 2차 ODE 가 *대칭적 1차 ODE 두 묶음* 으로 변한다. 해밀턴 역학의 시작."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 67
lang: ko
pairSlug: am1tc-4-1-2-canonical-equations
draft: false
updated: 2026-05-18
---

# 4.1.2 — 정준 방정식: $\dot q = \partial H/\partial p$, $\dot p = -\partial H/\partial q$ 의 대칭적 1차 ODE

> 르장드르 변환 $H(q, p, t) = p_\alpha \dot q^\alpha - L$ 로 라그랑주의 2차 ODE 가 *대칭적 1차 ODE 두 묶음* 으로 변한다. 해밀턴 역학의 시작.

## 본문이 말하는 것

라그랑지언 $L(q, \dot q, t)$ 가 *정칙* — $\det(\partial^2 L/\partial \dot q^\alpha \partial \dot q^\beta) \neq 0$ — 이라 하자. 그러면 $p_\alpha = \partial L/\partial \dot q^\alpha$ 가 $\dot q^\alpha$ 에 대해 *비퇴화* — *$\dot q^\alpha = \dot q^\alpha(q, p, t)$ 로 *역해* 가능.

**해밀토니언** (Hamiltonian) 의 정의:

$$
H(q, p, t) := p_\alpha\, \dot q^\alpha(q, p, t) - L(q, \dot q(q, p, t), t)
$$

— *르장드르 변환*. $H$ 는 *$(q, p, t)$ 의 함수* — 더 이상 $\dot q$ 가 안 들어감.

**정준 방정식** (canonical equations, Hamilton's equations):

$$
\boxed{\quad \dot q^\alpha = \frac{\partial H}{\partial p_\alpha}, \quad \dot p_\alpha = -\frac{\partial H}{\partial q^\alpha} \quad}
$$

— *대칭적인 1차 ODE 짝*. *위치와 운동량의 같은 자격* 이 식에서 드러난다.

증명 스케치 (본문): 라그랑주식 $dp/dt = \partial L/\partial q$ + 르장드르 변환의 미분 관계 ($\partial H/\partial p = \dot q$, $\partial H/\partial q = -\partial L/\partial q$) 에서 직접 따라 나온다.

**부호의 *역학적* 의미.** 두 식의 *부호 차이* — $\dot q$ 는 *$+\partial H/\partial p$*, $\dot p$ 는 *$-\partial H/\partial q$* — 이 *심플렉틱 구조* (§4.2.1) 의 표현. 운동량이 *위치에너지의 그라디언트의 음의 방향* 으로 변하는 자연스러운 *물리적* 부호.

## 한 번 더, 천천히

**(1) 르장드르 변환의 *기하학적* 의미.** $L(q, \dot q)$ 의 *$\dot q$ 그라디언트* 가 $p$. 르장드르 변환은 *$(q, \dot q) \in TM$ 의 점* 을 *$(q, p) \in T^*M$ 의 점* 으로 옮기는 *번들 사상*. $TM \to T^*M$ — *접번들과 여접번들 사이의 사상*. §1.6.1 의 여접공간 어휘 회수.

**(2) 단진자 예시.** $L = \frac{1}{2} m \ell^2 \dot\theta^2 + m g \ell \cos\theta$. $p = \partial L/\partial \dot\theta = m \ell^2 \dot\theta$ → $\dot\theta = p / (m\ell^2)$. 해밀토니언

$$
H = p \dot\theta - L = \frac{p^2}{m\ell^2} - \left[\frac{p^2}{2 m \ell^2} + m g \ell \cos\theta\right] = \frac{p^2}{2 m \ell^2} - m g \ell \cos\theta
$$

정준 방정식: $\dot\theta = p / (m\ell^2)$, $\dot p = -m g \ell \sin\theta$. 첫 식과 둘째 식을 결합하면 $\ddot\theta = \dot p / (m\ell^2) = -(g/\ell) \sin\theta$ — 익숙한 단진자 식.

**(3) 르장드르 변환의 *가역성*.** $L$ 이 정칙이면 르장드르가 *가역* — $H$ 의 르장드르 변환이 다시 $L$. $L \leftrightarrow H$ 가 *동치인 두 표현*. 두 형식이 같은 운동을 다른 시점에서 봄.

**(4) 비정칙 라그랑지언의 *Dirac 형식*.** $L$ 이 비정칙 — $\det(\partial^2 L/\partial \dot q^\alpha \partial \dot q^\beta) = 0$ — 인 경우 르장드르 가역이 깨진다. *Dirac 의 구속 시스템* (게이지 이론, 일반상대론) 의 표준 처리. 본 책의 범위 밖.

**(5) 위상공간 흐름.** $(q, p)$ 가 *위상공간 $T^*M$ 의 좌표*. 정준 방정식이 위상공간 위의 *벡터장* 을 정의 — *해밀토니언 벡터장* (§4.2.3). 운동은 그 벡터장의 *적분곡선*. 1.4.6 의 1-매개변수 변환군의 *해밀턴판*.

## 파이썬으로 확인 — 단진자, 라그랑주 vs 해밀턴 형식의 적분

이 코드의 메시지는 단순하다: 단진자를 (a) 라그랑주식 $\ddot\theta = -(g/\ell)\sin\theta$ 의 2차 ODE 와 (b) 정준 방정식 $\dot\theta = p/(m\ell^2)$, $\dot p = -mg\ell\sin\theta$ 의 1차 ODE 짝 두 방식으로 적분. 같은 궤적이 나오는지 확인.

```python
# 단진자: m = ℓ = 1, g = 9.81
# (a) Lagrange: θ̈ = -(g/ℓ) sin θ — 2차 ODE
# (b) Hamilton: θ̇ = p/(m ℓ²), ṗ = -m g ℓ sin θ — 1차 ODE × 2
import numpy as np
from scipy.integrate import solve_ivp

m, ell, g = 1.0, 1.0, 9.81

# (a) 라그랑주
def lagrange(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

# (b) 해밀턴 — 같은 초기조건이지만 (θ, p) 로 변환
def hamilton(t, state):
    theta, p = state
    dtheta = p / (m * ell**2)
    dp = -m * g * ell * np.sin(theta)
    return [dtheta, dp]

# 초기조건: θ_0 = π/4, θ̇_0 = 0 → p_0 = m ℓ² · 0 = 0
y0_lag = [np.pi/4, 0.0]
y0_ham = [np.pi/4, 0.0]  # p = m ℓ² θ̇ = 0

sol_a = solve_ivp(lagrange, (0, 5.0), y0_lag, rtol=1e-10, atol=1e-12, dense_output=True)
sol_b = solve_ivp(hamilton, (0, 5.0), y0_ham, rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 5, 200)
theta_a = sol_a.sol(ts)[0]
theta_b = sol_b.sol(ts)[0]
p_b = sol_b.sol(ts)[1]

# θ 의 차이
diff = np.max(np.abs(theta_a - theta_b))
print(f"라그랑주 vs 해밀턴 의 max |θ 차이|: {diff:.2e}")

# 해밀턴 형식의 운동량 보존 확인 (단진자라 보존 안 되지만 에너지는 보존)
# H = p²/(2 m ℓ²) - m g ℓ cos θ
H_t = p_b**2 / (2 * m * ell**2) - m * g * ell * np.cos(theta_b)
print(f"\nH 의 변동폭: {np.ptp(H_t):.2e}  (= 0 기대 — 에너지 보존)")
print(f"H 의 초기값: {H_t[0]:.6f}")
print(f"H 의 평균:   {H_t.mean():.6f}")
```

이 결과는 (a) 두 형식이 *같은 궤적* 을 만들고, (b) 해밀토니언 $H$ 가 *기계 엡실론 수준으로 보존* 됨을 보인다. *르장드르 변환의 동치성* + *에너지 보존* 모두 확인.

## 다음 절(4.1.3)로 가는 다리

정준 방정식이 *위상공간 $(q, p)$* 위의 1차 ODE 시스템. 그 위상공간의 *기하학적* 구조 — *정준 1-형식 $\theta = p_\alpha dq^\alpha$* — 이 §4.1.3 의 주제. 이게 §4.2 의 심플렉틱 형식 $\omega = -d\theta = dp_\alpha \wedge dq^\alpha$ 의 출발점.
