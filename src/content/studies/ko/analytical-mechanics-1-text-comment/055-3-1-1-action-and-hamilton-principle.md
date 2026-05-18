---
title: '3.1.1 — 작용 적분과 해밀턴의 원리: 경로 전체의 *함수* 가 결정하는 운동'
description: "작용 $S[q(\\cdot)] = \\int_{t_1}^{t_2} L(q, \\dot q, t)\\, dt$ — 경로 전체에 정의되는 *함수의 함수*. 실제 운동은 *작용이 정류 (stationary)* 인 경로다. $\\delta S = 0$ 이 해밀턴의 원리."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 55
lang: ko
pairSlug: am1tc-3-1-1-action-and-hamilton-principle
draft: false
updated: 2026-05-18
---

# 3.1.1 — 작용 적분과 해밀턴의 원리: 경로 전체의 *함수* 가 결정하는 운동

> 작용 $S[q(\cdot)] = \int_{t_1}^{t_2} L(q, \dot q, t)\, dt$ — 경로 전체에 정의되는 *함수의 함수*. 실제 운동은 *작용이 정류 (stationary)* 인 경로다. $\delta S = 0$ 이 해밀턴의 원리.

## 본문이 말하는 것

원서 3.1.1 절은 *변분 원리* 의 시점에서 운동을 다시 본다.

배위공간 $M$ 의 두 점 $q_1, q_2$ 와 두 시각 $t_1 < t_2$ 가 주어졌다 하자. *경로* (path) 는 매끄러운 곡선

$$
q : [t_1, t_2] \to M,\quad q(t_1) = q_1,\quad q(t_2) = q_2
$$

— *끝점이 고정* 된 곡선들의 집합. 이 집합을 *경로공간* 이라 부를 수 있다 (무한 차원).

**작용** (action) 의 정의:

$$
S[q(\cdot)] := \int_{t_1}^{t_2} L(q(t), \dot q(t), t)\, dt
$$

— *경로 전체* 를 받아 *하나의 실수* 를 돌려주는 *범함수* (functional). 각 경로마다 다른 작용 값을 가진다.

**해밀턴의 원리** (Hamilton's principle): 두 끝점 $(q_1, t_1)$ 과 $(q_2, t_2)$ 를 잇는 *실제 운동 경로* 는, 그 경로의 *작은 변형* 에 대해 *작용 $S$ 가 정류* 인 경로다:

$$
\boxed{\quad \delta S = 0 \quad}
$$

— 변분 $\delta S$ 가 *모든* 변형에 대해 1차 항이 사라진다 (단, 끝점 고정).

해밀턴의 원리는 라그랑주 방정식과 *동치* (3.1.6 에서 증명). 즉 *미분 방정식의 형식* 과 *적분 형식* 이 같은 운동을 묘사한다.

## 한 번 더, 천천히

**(1) "정류" vs "최소".** 흔한 오해 — 실제 운동이 *작용을 최소화* 한다. 그러나 정확히는 *정류* (stationary) — 극소·극대·안장점 모두 가능. *단진자의 짧은 시간 운동* 은 작용 최소, *긴 시간 운동* 은 안장점. 그래서 "*최소 작용 원리*" 보다 *해밀턴의 원리* 가 더 정확한 이름.

**(2) 범함수의 *미적분*.** 보통 함수 $f(x)$ 의 극값은 $f'(x) = 0$. 범함수 $S[q(\cdot)]$ 의 극값은 *변분 미적분* (calculus of variations) 의 도구로 다룬다. *함수 자체의 작은 변형* $q \to q + \delta q$ ($\delta q(t_1) = \delta q(t_2) = 0$) 에 대해 $\delta S = 0$. 3.1.5 에서 본격적으로 계산.

**(3) 페르마의 빛의 원리 ↔ 해밀턴의 원리.** 빛의 경로는 *광학 경로 길이* 가 정류 — 페르마 원리. 입자의 경로는 *작용* 이 정류 — 해밀턴 원리. 같은 형식 (변분 원리) 가 두 다른 물리에 적용. *de Broglie* 와 *Schrödinger* 가 빛–파동의 유사로 양자역학을 구성한 출발점.

**(4) 양자역학과의 연결.** 파인만의 경로적분 (path integral) 형식은 *모든 경로* 가 *작용 / ℏ* 에 대한 위상으로 기여. 고전적 운동은 *작용이 정류* 인 경로 — 위상이 빠르게 변하지 않아 *건설적 간섭* 으로 도드라진다. 해밀턴 원리의 양자판이 *경로적분*.

**(5) 일반상대론으로의 다리.** 시공간의 측지선이 *고유 시간* (proper time) 을 *정류* — 일반상대론적 자유낙하 입자의 작용은 $-mc^2 \int d\tau$. 같은 *해밀턴 형식* 이 *시공간 위* 로 일반화.

## 파이썬으로 확인 — 단진자의 작용 시각화

이 코드의 메시지는 단순하다: 단진자에서 *실제 운동* 의 작용과 *작은 변형 경로* 의 작용을 직접 계산해 *실제 경로의 작용이 정류* 임을 본다.

```python
# 단진자 (작은 진폭): L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# 두 시점 t_1=0, t_2=T 와 두 끝점 θ_1, θ_2 고정
# 실제 운동: θ(t) = θ_0 sin(ω t + φ_0), ω = √(g/ℓ)
# 변형: θ_pert(t) = θ_real(t) + ε * (sin(π t / T))  (끝점 고정)
import numpy as np
from scipy.integrate import simpson, solve_ivp

g, ell, m = 9.81, 1.0, 1.0
omega = np.sqrt(g / ell)
T = np.pi / omega / 4  # 진동 주기의 1/4
ts = np.linspace(0, T, 200)

# 실제 운동 (작은 진폭 한정, 선형 근사)
theta_real = 0.1 * np.cos(omega * ts)  # θ_0 = 0.1 rad, 정지 시작

# 작용 계산 함수
def action(theta_t, dtheta_t):
    L_t = 0.5 * m * ell**2 * dtheta_t**2 + m * g * ell * np.cos(theta_t)
    return simpson(L_t, x=ts)

# 실제 운동의 dθ/dt
dtheta_real = -0.1 * omega * np.sin(omega * ts)
S_real = action(theta_real, dtheta_real)
print(f"실제 운동의 작용 S_real = {S_real:.6f}")

# 다양한 변형의 작용 (ε 변화)
print(f"\n변형 함수: θ_real(t) + ε · sin(π t / T)  (끝점 고정)")
print(f"   ε      S[변형 경로]    S - S_real")
for eps in [-0.05, -0.01, 0.0, 0.01, 0.05]:
    pert = eps * np.sin(np.pi * ts / T)
    dpert = eps * (np.pi / T) * np.cos(np.pi * ts / T)
    theta_p = theta_real + pert
    dtheta_p = dtheta_real + dpert
    S_p = action(theta_p, dtheta_p)
    print(f"  {eps:+.3f}    {S_p:.6f}    {S_p - S_real:+.6f}")

print(f"\n→ ε = 0 (실제 경로) 근방에서 S 가 *정류* (1차 변화 없음, 2차 변화만 보임)")
```

이 결과는 *실제 운동이 작용의 정류점* 임을 *수치 변분* 으로 확인한다. 변형의 1차 항이 사라지고, 2차 항만 남는 모습이 *변분 원리의 핵심*.

## 다음 절(3.1.2)로 가는 다리

해밀턴의 원리에서 *경로* 가 *시간을 포함한 객체* 라는 점이 본질적 — 단순한 *배위공간 $M$ 의 곡선* 이 아니라 *공간 + 시간* $M \times \mathbb R$ 위의 곡선. 그 *확장된 무대* 위에서 변분 원리를 재정리한 것이 다음 3.1.2 의 *확장 배위공간*.
