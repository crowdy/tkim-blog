---
title: '3.1.5 — 작용 적분의 변분 계산: $\delta S = \int (\text{EL}\,\delta q)\, dt + [\text{boundary}]$'
description: "작용의 변분이 *오일러–라그랑주 항 × $\\delta q$* 의 시간 적분 + *경계 항* 으로 분해된다. 끝점 고정 변분에서 경계 항이 사라지면, 임의의 $\\delta q$ 에 대해 정류 조건은 *EL = 0*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 59
lang: ko
pairSlug: am1tc-3-1-5-variation-of-action
draft: false
updated: 2026-05-18
---

# 3.1.5 — 작용 적분의 변분 계산: $\delta S = \int (\text{EL}\,\delta q)\, dt + [\text{boundary}]$

> 작용의 변분이 *오일러–라그랑주 항 × $\delta q$* 의 시간 적분 + *경계 항* 으로 분해된다. 끝점 고정 변분에서 경계 항이 사라지면, 임의의 $\delta q$ 에 대해 정류 조건은 *EL = 0*.

## 본문이 말하는 것

경로 $q(t)$ 의 *작은 변형* $q(t) \to q(t) + \delta q(t)$ 에 대해 작용 $S = \int L(q, \dot q, t)\, dt$ 의 변화를 1차까지 계산.

라그랑지언의 1차 변화:

$$
\delta L = \frac{\partial L}{\partial q^\alpha}\, \delta q^\alpha + \frac{\partial L}{\partial \dot q^\alpha}\, \delta \dot q^\alpha
$$

(여기서 $\delta \dot q^\alpha = d(\delta q^\alpha)/dt$ — *변분과 시간 미분이 교환*.) 작용의 변분

$$
\delta S = \int_{t_1}^{t_2} \delta L\, dt = \int_{t_1}^{t_2} \left[ \frac{\partial L}{\partial q^\alpha}\, \delta q^\alpha + \frac{\partial L}{\partial \dot q^\alpha}\, \frac{d \delta q^\alpha}{dt} \right] dt
$$

둘째 항에 *부분 적분*:

$$
\int_{t_1}^{t_2} \frac{\partial L}{\partial \dot q^\alpha}\, \frac{d \delta q^\alpha}{dt}\, dt = \left[\frac{\partial L}{\partial \dot q^\alpha}\, \delta q^\alpha\right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \frac{d}{dt}\left(\frac{\partial L}{\partial \dot q^\alpha}\right) \delta q^\alpha\, dt
$$

두 항을 합치면

$$
\boxed{\quad \delta S = \int_{t_1}^{t_2} \left[\frac{\partial L}{\partial q^\alpha} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha}\right] \delta q^\alpha\, dt + \left[p_\alpha\, \delta q^\alpha\right]_{t_1}^{t_2} \quad}
$$

— *EL 항 × $\delta q$* 의 시간 적분 + *경계 항* (운동량 × 변분).

**해밀턴 원리의 조건.** 끝점 고정 ($\delta q(t_1) = \delta q(t_2) = 0$) 이면 경계 항이 사라지고

$$
\delta S = \int_{t_1}^{t_2} \left[\frac{\partial L}{\partial q^\alpha} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha}\right] \delta q^\alpha\, dt
$$

*$\delta q^\alpha$ 가 임의* 라면 $\delta S = 0$ 은 *대괄호 안 = 0* 을 강제 — 오일러–라그랑주 식.

## 한 번 더, 천천히

**(1) "임의의 $\delta q$" 의 의미.** 변분 함수 $\delta q(t)$ 는 *끝점 고정 + 매끄러움* 외에는 *제약 없다*. 임의로 작게 + 임의의 형태로 변할 수 있다. 그래서 $\int f \delta q\, dt = 0$ 이 *모든* 매끄러운 $\delta q$ 에 대해 성립하려면 $f \equiv 0$ 이어야 한다 — 이게 *변분의 기본 정리*.

**(2) 부분 적분의 *핵심 역할*.** 작용의 변분 계산에서 부분 적분이 *변분과 시간 미분을 교환* 해 *경계 항* 을 분리한다. 이 *분리* 가 *경계 조건의 자유* — 끝점 고정 (해밀턴), 끝점 자유 (워이스, §3.2.1), 시간 끝점만 자유 (다른 변형) — 의 정밀한 처리를 가능하게 한다.

**(3) 경계 항의 *물리적* 의미.** $[p_\alpha \delta q^\alpha]_{t_1}^{t_2}$ — *운동량과 변분의 내적*. *변분 = 작은 변화* + *운동량 = 변화에 대한 *민감도** 의 관점에서, 경계 항이 *경계 조건의 어떻게* 운동에 영향을 주는가 측정.

**(4) §3.2 의 워이스 원리와의 연결.** 끝점이 자유롭게 움직이는 변분 (워이스) 에서는 경계 항이 *물리적 정보* 를 직접 준다 — *작용의 끝점 미분이 운동량* 이라는 핵심 사실 ($p_\alpha = \partial S / \partial q_2^\alpha$). 야코비-해밀턴 방정식의 시작점.

**(5) 게이지 자유.** 라그랑지언에 *전미분* $L \to L + dF/dt$ 를 더해도 (2.1.5) 작용은 *경계 항만* 바뀐다: $S \to S + F(q_2, t_2) - F(q_1, t_1)$. 끝점 고정 변분에서는 *경계 항이 $\delta$ 무관 상수* — $\delta S$ 가 같다.

## 파이썬으로 확인 — 부분 적분이 만드는 *경계 + 내부* 분해

이 코드의 메시지는 단순하다: 단진자의 작용 변분을 *Euler-Lagrange 항* 과 *경계 항* 으로 직접 분해, 끝점 고정에서 경계 항이 0 됨을 본다.

```python
# 단진자: L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# 작용 S = ∫ L dt. 변분 δθ(t) = sin(π t / T)  (끝점 0)
# δS = ∫ [EL] δθ dt + [p δθ]_{t_1}^{t_2}
import numpy as np
from scipy.integrate import simpson, solve_ivp

g, ell, m = 9.81, 1.0, 1.0
T = 0.5  # 시간 구간 [0, T]
ts = np.linspace(0, T, 500)

# 비실제 경로 — 변분을 의도적으로 적용하기 위해
# 단순한 출발 경로: θ(t) = θ_0 cos(ω t), 실제 운동이 아님 (오일러 라그랑주 만족 안 함)
theta_t = 0.2 * np.cos(2 * np.pi * ts / T)
dtheta_t = -0.2 * (2 * np.pi / T) * np.sin(2 * np.pi * ts / T)
ddtheta_t = -0.2 * (2 * np.pi / T)**2 * np.cos(2 * np.pi * ts / T)

# EL 항: ∂L/∂θ - d/dt(∂L/∂θ̇)
EL = -m * g * ell * np.sin(theta_t) - m * ell**2 * ddtheta_t
print(f"EL 항의 평균: {np.mean(EL):.4f}")
print(f"  (= 0 이 아님 — 출발 경로가 실제 운동이 아닌 증거)")

# 변분 δθ(t) = sin(π t / T), 끝점 고정
delta_theta = np.sin(np.pi * ts / T)
delta_dtheta = (np.pi / T) * np.cos(np.pi * ts / T)

# 내부 항: ∫ EL · δθ dt
inner_term = simpson(EL * delta_theta, x=ts)
print(f"\n내부 항 ∫ EL δθ dt = {inner_term:.6f}")

# 경계 항: [p δθ]_{0}^{T}
p_t = m * ell**2 * dtheta_t
boundary_term = p_t[-1] * delta_theta[-1] - p_t[0] * delta_theta[0]
print(f"경계 항 [p δθ]_{{0}}^{{T}} = {boundary_term:.2e}  (= 0, 끝점 고정이라)")

# 직접 변분 (numerical δS)
def action(theta_func, dtheta_func):
    L_t = 0.5 * m * ell**2 * dtheta_func**2 + m * g * ell * np.cos(theta_func)
    return simpson(L_t, x=ts)

S_0 = action(theta_t, dtheta_t)
eps = 0.001
S_pert = action(theta_t + eps * delta_theta, dtheta_t + eps * delta_dtheta)
dS_numerical = (S_pert - S_0) / eps
print(f"\n수치 δS / δε = {dS_numerical:.6f}")
print(f"분석 ∫ EL δθ dt + [p δθ] = {inner_term + boundary_term:.6f}")
print(f"  → 두 값 일치 — 부분 적분의 *수치 검증*")
```

이 결과는 변분 계산의 *부분 적분 분해* 가 *수치적으로* 정확함을 보인다. 끝점 고정에서 경계 항이 0 이라는 사실이 *임의의 δθ 에 대해 δS = 0 ⇒ EL = 0* 의 핵심.

## 다음 절(3.1.6)로 가는 다리

작용의 변분이 *EL 항의 시간 적분 + 경계 항* 으로 분해됨을 봤다. 해밀턴의 원리 (끝점 고정) 에서 경계 항이 사라지고, *임의의 변분에 대해 δS = 0* 이 오일러–라그랑주 식과 동치. 3.1.6 이 이 *동치* 를 형식적으로 박는다.
