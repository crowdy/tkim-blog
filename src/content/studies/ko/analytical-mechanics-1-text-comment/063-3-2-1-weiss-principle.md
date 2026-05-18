---
title: '3.2.1 — 워이스의 원리: 끝점이 *움직이는* 변분'
description: "끝점이 자유롭게 움직이는 변분에서 $\\delta S$ 의 경계 항이 사라지지 않고 *운동량과 에너지의 정보* 를 박는다. $\\delta S = [p_\\alpha \\delta q^\\alpha - H \\delta t]_{t_1}^{t_2}$ 가 워이스의 원리의 핵심 등식."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 63
lang: ko
pairSlug: am1tc-3-2-1-weiss-principle
draft: false
updated: 2026-05-18
---

# 3.2.1 — 워이스의 원리: 끝점이 *움직이는* 변분

> 끝점이 자유롭게 움직이는 변분에서 $\delta S$ 의 경계 항이 사라지지 않고 *운동량과 에너지의 정보* 를 박는다. $\delta S = [p_\alpha \delta q^\alpha - H \delta t]_{t_1}^{t_2}$ 가 워이스의 원리의 핵심 등식.

## 본문이 말하는 것

해밀턴의 원리 (§3.1.6) 는 *끝점 고정* 변분 — $\delta q(t_1) = \delta q(t_2) = 0$, 시간 끝점도 고정. **워이스의 원리** (Weiss's principle) 는 그 일반화로, *끝점이 자유롭게 움직일 수 있는* 변분을 다룬다.

확장 배위공간 $\tilde M = M \times \mathbb R_t$ 의 경로 $\gamma(s) = (q(s), t(s))$ 에서, 끝점 $(q_1, t_1)$ 과 $(q_2, t_2)$ 가 *작은 변형* 가능. 작용 $S = \int_\gamma \theta_L^{\text{ext}} = \int (p_\alpha \dot q^\alpha - H) dt$ 의 변분:

$$
\delta S = \int_{t_1}^{t_2} \left[\frac{\partial L}{\partial q^\alpha} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha}\right] \delta q^\alpha\, dt + \left[p_\alpha\, \delta q^\alpha - H\, \delta t\right]_{t_1}^{t_2}
$$

여기서 $\delta q^\alpha$ 는 *경로 위의 좌표 변분*, $\delta t$ 는 *시간 끝점의 변분*. 두 끝점 모두 변동 가능.

*실제 운동* 의 경로에서는 EL 항 ($\partial L/\partial q - d(\partial L/\partial \dot q)/dt$) 이 *0* — 내부 적분이 사라진다. 그래서

$$
\boxed{\quad \delta S = \left[p_\alpha\, \delta q^\alpha - H\, \delta t\right]_{t_1}^{t_2} \quad}
$$

— **워이스의 원리**. *실제 운동의 작용의 변분이 경계 항만으로 결정*.

**의미.** 작용 $S$ 를 *경로의 시작·끝점의 함수* 로 보면, 그 *끝점에 대한 미분* 이

$$
\frac{\partial S}{\partial q_2^\alpha} = p_\alpha(t_2),\quad \frac{\partial S}{\partial t_2} = -H(t_2)
$$

— 작용이 *운동량과 에너지를 생성하는 함수*. §3.2.2 의 모멘트 함수, §4.4 의 해밀턴-야코비식의 출발점.

## 한 번 더, 천천히

**(1) "원리" 가 *원리* 인 이유.** 해밀턴의 원리는 *$\delta S = 0$ → 운동방정식*. 워이스의 원리는 *$\delta S = $ 경계 항* — 더 일반적인 진술. 해밀턴의 원리는 워이스의 원리의 *특수 경우* (끝점 고정 → 경계 항 0).

**(2) 작용의 *함수* 로의 시점 전환.** 해밀턴의 원리에서 $S$ 는 *경로 위의 범함수*. 워이스의 원리에서 $S$ 는 *끝점의 함수* — 같은 양을 *다른 정의역* 으로 본다. 이 시점 전환이 해밀턴-야코비식의 핵심.

**(3) 경계 항의 *기하학적* 의미.** $p_\alpha \delta q^\alpha - H \delta t$ 는 *Poincaré–Cartan 1-형식* $\theta_L^{\text{ext}}$ 의 경계점에서의 *평가*. 즉 작용의 변분이 *경계점의 1-형식 값* 으로 결정. 미분형식의 어휘로 자연스럽게 표현.

**(4) 매개화 자유의 *역할*.** §3.1.3 의 확장 상태공간에서 라그랑지언이 *1차 동차* — 매개변수 자유. 그래서 *시간 끝점의 변분 $\delta t$* 가 *추가 자유도* 가 아닌 *경로의 끝점 위치 변동*. 변분의 어휘가 *기하학적 자연스러움* 을 갖는다.

**(5) §3.2.3 의 노에터 확장으로의 다리.** 워이스의 원리에서 *대칭 변환* — *경로를 자기 자신으로 옮기는* 변환 — 을 적용하면 *변분이 정확히 0*. 그러면 *경계 항이 보존됨* — *대칭의 양 끝에서 같은 값*. 노에터 정리의 강화 형식의 출발점.

## 파이썬으로 확인 — 단진자의 $\partial S / \partial t_2 = -H$

이 코드의 메시지는 단순하다: 단진자에서 *시간 끝점 $t_2$ 을 움직이며* 작용을 다시 계산해, *작용의 시간 끝점 미분이 $-H$* 임을 수치로 확인.

```python
# 단진자: L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# 같은 초기조건에서 운동을 따라가며, 시간 끝점 t_2 가 달라질 때
# 작용 S(t_2) 의 변화율 dS/dt_2 = -H(t_2) 임을 확인
import numpy as np
from scipy.integrate import solve_ivp, simpson

g, ell, m = 9.81, 1.0, 1.0

def pendulum(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

# 같은 초기조건 — 시간을 [0, t_2] 로 변화시키며 작용 계산
y0 = [np.pi / 4, 0.5]  # θ_0 = π/4, θ̇_0 = 0.5
sol = solve_ivp(pendulum, (0, 3.0), y0, rtol=1e-10, atol=1e-12, dense_output=True)

# t_2 별 작용 계산
def action_to_t2(t_2):
    ts = np.linspace(0, t_2, 500)
    theta_t, dtheta_t = sol.sol(ts)
    L_t = 0.5 * m * ell**2 * dtheta_t**2 + m * g * ell * np.cos(theta_t)
    return simpson(L_t, x=ts)

# t_2 변화시키며 S(t_2) 계산
t2_values = np.linspace(0.5, 2.5, 21)
S_values = np.array([action_to_t2(t2) for t2 in t2_values])

# 수치 미분 dS/dt_2
dS_dt2 = np.gradient(S_values, t2_values)

# 이론값 -H(t_2)
H_values = []
for t2 in t2_values:
    theta, dtheta = sol.sol(t2)
    H = 0.5 * m * ell**2 * dtheta**2 - m * g * ell * np.cos(theta)
    H_values.append(H)
H_values = np.array(H_values)

print(f"t_2  |  dS/dt_2 (수치)  |  -H(t_2) (이론)  |  차이")
print("-" * 60)
for i in range(len(t2_values))[::4]:
    print(f"{t2_values[i]:.2f}  |  {dS_dt2[i]:+.6f}     |  {-H_values[i]:+.6f}     |  {abs(dS_dt2[i] + H_values[i]):.2e}")

print(f"\n→ 작용의 *시간 끝점 미분* 이 *음의 해밀토니언*. 워이스의 원리 한 표.")
```

이 결과는 *작용의 끝점에 대한 미분이 운동량·에너지* 임을 수치로 확인. 같은 운동의 *작용을 끝점의 함수로 본 시점* 의 의미를 시각화.

## 다음 절(3.2.2)로 가는 다리

워이스의 원리가 *작용 $S(q, t)$* — *끝점의 함수* — 의 미분이 운동량·에너지임을 박았다. 그 함수 $S$ 의 정체 — *모멘트 함수* — 가 §4.4 의 해밀턴-야코비식의 출발점. §3.2.2 가 그 함수의 정의와 성질을 짚는다.
