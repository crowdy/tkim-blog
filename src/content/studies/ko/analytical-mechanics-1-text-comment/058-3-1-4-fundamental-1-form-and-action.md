---
title: '3.1.4 — 기본 1-형식과 작용 적분: $S = \int_\gamma \theta_L^{\text{ext}}$ 의 한 줄'
description: "작용 적분이 확장 무대 위의 *1-형식* $\\theta_L^{\\text{ext}} = p_\\alpha dq^\\alpha - H\\, dt$ 의 곡선 적분. 변분 원리가 *1-형식의 적분이 정류* 라는 기하학적 형식으로 재정의."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 58
lang: ko
pairSlug: am1tc-3-1-4-fundamental-1-form-and-action
draft: false
updated: 2026-05-18
---

# 3.1.4 — 기본 1-형식과 작용 적분: $S = \int_\gamma \theta_L^{\text{ext}}$ 의 한 줄

> 작용 적분이 확장 무대 위의 *1-형식* $\theta_L^{\text{ext}} = p_\alpha dq^\alpha - H\, dt$ 의 곡선 적분. 변분 원리가 *1-형식의 적분이 정류* 라는 기하학적 형식으로 재정의.

## 본문이 말하는 것

§2.3.1 의 기본 1-형식 $\theta_L = p_\alpha dq^\alpha$ 를 확장 배위공간 $\tilde M$ 으로 확장:

$$
\theta_L^{\text{ext}} := p_\alpha\, dq^\alpha - H\, dt
$$

여기서 $H = p_\alpha \dot q^\alpha - L$ (§2.2.4 의 해밀토니언). 이게 *확장 기본 1-형식* (또는 *Poincaré–Cartan 1-form*).

**작용 = 1-형식의 곡선 적분.** 경로 $\gamma : [t_1, t_2] \to \tilde M$, $\gamma(t) = (q(t), t)$ 의 위에서

$$
\int_\gamma \theta_L^{\text{ext}} = \int_{t_1}^{t_2} \left[p_\alpha \dot q^\alpha - H\right] dt = \int_{t_1}^{t_2} L\, dt = S
$$

— 작용 적분이 *기본 1-형식의 곡선 적분*. 변분 원리는

$$
\delta \int_\gamma \theta_L^{\text{ext}} = 0
$$

— *1-형식의 적분이 정류* 라는 기하학적 진술.

§1.6.7 의 *미분형식의 적분* 이 *매개화 자유* — 작용이 좌표 자유 객체로 자연스럽게 정착.

## 한 번 더, 천천히

**(1) 1-형식과 르장드르 변환의 짝짓기.** $\theta_L = p_\alpha dq^\alpha$ 는 *접번들 $TM$ 위* — 라그랑주 형식. $p_\alpha dq^\alpha$ 가 *여접번들 $T^*M$* 의 정준 1-형식과 정확히 같은 모양. 르장드르 변환 $TM \to T^*M$ 가 두 무대 사이를 옮긴다. §4.1.3 의 정준 1-형식이 *이 자리의 거울*.

**(2) Maupertuis 의 원리와의 차이.** Maupertuis 의 *최소 작용 원리* ($\int p\, dq$ 의 변분) 는 *기본 1-형식의 공간 부분만*. 해밀턴 원리는 *시간 항 $-H\, dt$ 까지 포함한 완전한 형식*. 두 원리가 *서로 다른 변분 조건* — Maupertuis 는 *에너지 보존 위* 의 변분, 해밀턴은 *시간 고정* 의 변분.

**(3) Poincaré–Cartan 1-형식의 *기하학적* 정체.** $\theta_L^{\text{ext}}$ 가 정의된 곳은 *확장 접번들* 또는 *확장 여접번들*. 그 위의 *외미분* $\omega = -d\theta_L^{\text{ext}}$ 가 *심플렉틱 2-형식* (정확히는 *contact form*). 해밀턴 역학의 위상공간 구조의 *공간-시간 통합 형식*.

**(4) 경로 적분에서의 등장.** Feynman 의 경로적분 $\int \mathcal D q\, e^{iS/\hbar}$ 에서 위상이 *$S/\hbar$*. $S$ 가 1-형식의 적분이라는 사실이 *양자 진폭의 명시적 분해* 를 가능케 한다. 게이지 이론·Berry phase·Aharonov–Bohm 효과 모두 *1-형식의 위상학적 적분* 으로 설명.

## 파이썬으로 확인 — 단진자에서 $\int (p\, dq - H\, dt)$

이 코드의 메시지는 단순하다: 단진자에서 $\theta_L^{\text{ext}} = p\, dq - H\, dt$ 의 곡선 적분을 *시점 추적* 으로 계산하고, 이게 *작용* $\int L\, dt$ 와 정확히 같은 값임을 확인.

```python
# 단진자: L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# p = m ℓ² θ̇, H = p²/(2 m ℓ²) - m g ℓ cos θ
# θ_L^ext = p dθ - H dt
# 곡선 위 적분: ∫ p (dθ/dt) dt - ∫ H dt = ∫ (p θ̇ - H) dt = ∫ L dt = S
import numpy as np
from scipy.integrate import solve_ivp, simpson

g, ell, m = 9.81, 1.0, 1.0

def pendulum(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

sol = solve_ivp(pendulum, (0, 2.0), [np.pi/4, 0.0],
                rtol=1e-10, atol=1e-12, dense_output=True)
ts = np.linspace(0, 2.0, 500)
theta_t, dtheta_t = sol.sol(ts)

# 라그랑지언 계산
L_t = 0.5 * m * ell**2 * dtheta_t**2 + m * g * ell * np.cos(theta_t)
S_from_L = simpson(L_t, x=ts)
print(f"S = ∫ L dt = {S_from_L:.6f}")

# 1-형식 적분으로 다시 계산
# p = m ℓ² θ̇
p_t = m * ell**2 * dtheta_t
# H = p²/(2 m ℓ²) - m g ℓ cos θ
H_t = p_t**2 / (2 * m * ell**2) - m * g * ell * np.cos(theta_t)
# ∫ p dθ = ∫ p (dθ/dt) dt = ∫ p θ̇ dt
integrand_pdq = p_t * dtheta_t
S_from_form = simpson(integrand_pdq - H_t, x=ts)
print(f"S = ∫(p dθ - H dt) = {S_from_form:.6f}")
print(f"두 값 차이: {abs(S_from_L - S_from_form):.2e}")

# H 보존 확인 (1.6.5 회수)
print(f"\nH(t=0) = {H_t[0]:.6f}, H(t=2) = {H_t[-1]:.6f}, 변동폭 = {np.ptp(H_t):.2e}")
print("→ H 가 일정해서 ∫ H dt = H · (t_2 - t_1) 로 단순화 가능")
```

이 결과는 *Lagrangian 형식의 작용 적분* 과 *1-형식의 곡선 적분* 이 정확히 같은 값임을 수치로 확인한다. 두 형식의 동치성이 §4 의 해밀턴 형식으로 가는 길.

## 다음 절(3.1.5)로 가는 다리

작용이 *1-형식의 적분* 이라는 것이 박혔다. 그 적분의 *변분* — 경로를 작게 바꿨을 때의 1차 변화 — 을 본격적으로 계산한다. 결과가 *오일러–라그랑주 항* 과 *경계 항* 의 합. 3.1.5 의 주제.
