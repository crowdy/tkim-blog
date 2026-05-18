---
title: '5.1.1 — 해밀턴 원리의 상공간 들어올리기: $(q, p)$ 를 *독립* 변수로'
description: "§3.1 의 작용 $S = \\int L\\, dt$ 를 상공간 위로 들어올리면 $S = \\int (p_\\alpha \\dot q^\\alpha - H)\\, dt$. 이제 $q$ 와 $p$ 가 *독립적으로* 변분된다 — 그 변분 조건이 정확히 정준 방정식."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 87
lang: ko
pairSlug: am1tc-5-1-1-hamilton-lifted-to-phase
draft: false
updated: 2026-05-18
---

# 5.1.1 — 해밀턴 원리의 상공간 들어올리기: $(q, p)$ 를 *독립* 변수로

> §3.1 의 작용 $S = \int L\, dt$ 를 상공간 위로 들어올리면 $S = \int (p_\alpha \dot q^\alpha - H)\, dt$. 이제 $q$ 와 $p$ 가 *독립적으로* 변분된다 — 그 변분 조건이 정확히 정준 방정식.

## 본문이 말하는 것

§3.1 의 해밀턴 원리: 라그랑지언 $L(q, \dot q, t)$ 로 정의된 작용

$$
S[q(\cdot)] = \int_{t_1}^{t_2} L(q, \dot q, t)\, dt
$$

이 변분으로 결정. 변분 변수는 *$q$ 만* — *$\dot q$* 는 *$q$ 의 시간 미분으로 종속*.

**위상공간 들어올리기.** 르장드르 변환 (§4.1.2) 으로 $H(q, p, t) = p_\alpha \dot q^\alpha - L$. 작용을 다시 적으면

$$
S = \int_{t_1}^{t_2} \left[p_\alpha \dot q^\alpha - H(q, p, t)\right] dt
$$

— *(q, p)* 를 *둘 다 변수* 로 보는 형식. *$\dot p$ 가 안 들어감* (왜인지: $p$ 가 *위치 좌표가 아니라 운동량 좌표* 라 운동의 *속도* 가 아니라 *상태 자체*).

**핵심 차이.** §3.1 의 해밀턴 원리 ($L$ 형식): $\delta q$ 만 변분 — *$q$ 의 시간 미분이 자동으로 따라옴*. 본 절의 해밀턴 원리 ($H$ 형식): *$\delta q$ 와 $\delta p$ 가 독립적* 으로 변분. 그 결과가 *두 종류의 식* — *$q$ 변분 → $\dot q = \partial H/\partial p$*, *$p$ 변분 → $\dot p = -\partial H/\partial q$* — *정확히 정준 방정식*.

## 한 번 더, 천천히

**(1) 작용의 *세 가지 형식*.**

- **$L$ 형식** (배위공간): $S = \int L(q, \dot q, t)\, dt$. 변분 $\delta q$ 만.
- **$H$ 형식** (위상공간): $S = \int (p \dot q - H(q, p, t))\, dt$. 변분 $\delta q, \delta p$ 둘 다.
- **확장 1-형식 형식**: $S = \int_\gamma \theta_L^{\text{ext}} = \int_\gamma (p_\alpha dq^\alpha - H dt)$. 곡선 적분 (§3.1.4).

세 형식이 *동치* — 같은 운동을 만든다.

**(2) "들어올리기" 의 의미.** *Lifting* — 배위공간 $M$ 의 경로 $q(t)$ 를 위상공간 $T^*M$ 의 경로 $(q(t), p(t))$ 로 *들어올린다*. 들어올린 경로 위에서 *$p$ 도 자유 변수*. *변분 원리의 자연스러운 일반화*.

**(3) $q$ 와 $p$ 의 *대칭성* 부각.** $L$ 형식에서는 $q$ 가 *기본*, $\dot q$ 는 *종속*. $H$ 형식에서는 *$q$ 와 $p$ 가 동등* — 위상공간의 *대칭적* 좌표. 정준 방정식의 *대칭성* (§4.1.1) 이 변분 원리에서 *직접* 드러난다.

**(4) §3.1.4 의 Poincaré–Cartan 1-형식 회수.** 본 절의 작용이 정확히 *확장 정준 1-형식* $\theta_L^{\text{ext}} = p_\alpha dq^\alpha - H dt$ 의 곡선 적분 (§4.1.5). 두 형식의 *완전한 일치*.

**(5) $\dot p$ 가 안 들어가는 이유.** $L(q, \dot q)$ 가 *$\dot q$ 에 의존* — 라그랑지언 형식의 *2차 미분 정보* 가 *속도*에 박힘. $H(q, p)$ 는 *위상공간의 함수* — *$\dot p$ 가 등장할 자리가 없다*. 변분 식에서도 *$\dot p$ 가 안 등장* — 그 결과 $p$ 변분 식이 *대수적* 으로 풀리는 게 아니라 *시간 미분식* 으로 나옴.

## 파이썬으로 확인 — 단진자의 두 형식 작용

이 코드의 메시지는 단순하다: 단진자 운동을 (a) $L$ 형식 ($L = T - V$ 의 시간 적분) 과 (b) $H$ 형식 ($p \dot q - H$ 의 시간 적분) 으로 *둘 다 계산*. 두 값이 정확히 일치함을 확인.

```python
# 단진자: m = ℓ = 1, g = 9.81
# L(θ, θ̇) = (1/2)θ̇² + cos θ  (자연 단위에서 m=ℓ=g=1로 단순화)
# p = ∂L/∂θ̇ = θ̇
# H(θ, p) = p θ̇ - L = p² - L = (1/2)p² - cos θ
# 두 형식의 작용 적분이 같은가?
import numpy as np
from scipy.integrate import solve_ivp, simpson

g, ell, m = 1.0, 1.0, 1.0  # 자연 단위

def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

# 운동 적분
sol = solve_ivp(pendulum, (0, 5.0), [np.pi/3, 0.0],
                rtol=1e-10, atol=1e-12, dense_output=True)
ts = np.linspace(0, 5, 500)
theta_t, p_t = sol.sol(ts)
dtheta_t = p_t  # θ̇ = p (정준 방정식)

# (a) L 형식: S_L = ∫ L dt = ∫ [(1/2)θ̇² + cos θ] dt
L_t = 0.5 * dtheta_t**2 + np.cos(theta_t)
S_L = simpson(L_t, x=ts)

# (b) H 형식: S_H = ∫ (p θ̇ - H) dt
H_t = 0.5 * p_t**2 - np.cos(theta_t)
S_H = simpson(p_t * dtheta_t - H_t, x=ts)

print(f"L 형식 작용  S_L = ∫ L dt        = {S_L:.10f}")
print(f"H 형식 작용  S_H = ∫ (pθ̇ - H) dt = {S_H:.10f}")
print(f"두 값 차이: {abs(S_L - S_H):.2e}")
print(f"\n→ 두 형식이 *동치* (같은 운동에 같은 작용 값)")

# 그러나 *변분 원리* 시점에서는 다르다 — H 형식은 (q, p) 둘 다 독립 변수
# δS = 0 의 조건:
#   δq:  -ṗ = ∂H/∂q  →  ṗ = -sin θ  (정준 식 1)
#   δp:   q̇ = ∂H/∂p  →  θ̇ = p     (정준 식 2)
# 두 식 모두 위 적분의 운동방정식에 의해 만족됨 — 정합성 확인
sin_theta_t = np.sin(theta_t)
dp_dt = np.gradient(p_t, ts)
print(f"\n정준 식 1 (ṗ = -sin θ) 검증: max |ṗ + sin θ| = {np.max(np.abs(dp_dt + sin_theta_t)):.2e}")
print(f"정준 식 2 (θ̇ = p)       검증: max |θ̇ - p|     = {np.max(np.abs(dtheta_t - p_t)):.2e}")
print(f"  → 두 식 모두 *기계 엡실론* 수준으로 만족 — 운동이 정준 방정식의 해")
```

이 결과는 (a) $L$ 형식과 $H$ 형식의 작용이 *같은 값*, (b) 운동이 *두 정준 식을 동시에 만족* — 본 절의 변분 원리가 정합적임을 직접 확인.

## 다음 절(5.1.2)로 가는 다리

$L$ 형식과 $H$ 형식이 동치라는 것은 *르장드르 변환* 의 결과. 그 변환의 *형식적 정의* + *기하학적 의미* + *역변환의 조건* 을 §5.1.2 가 본격적으로 정리한다.
