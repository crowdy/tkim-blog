---
title: '2.1.2 — 일반적 경우로의 확장: 레오노믹 + $T_2 + T_1 + T_0$ 의 분해'
description: '구속이 시간에 의존하면 $\mathbf{x}_i(q, t)$, 그리고 운동에너지는 $T_2 + T_1 + T_0$ 의 세 종류로 나뉜다. 그러나 라그랑주 방정식의 *형식* 은 그대로 — 시간 의존 구속도 같은 한 줄.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 39
lang: ko
pairSlug: am1tc-2-1-2-general-case
draft: false
updated: 2026-05-18
---

# 2.1.2 — 일반적 경우로의 확장: 레오노믹 + $T_2 + T_1 + T_0$ 의 분해

> 구속이 시간에 의존하면 $\mathbf{x}_i(q, t)$, 그리고 운동에너지는 $T_2 + T_1 + T_0$ 의 세 종류로 나뉜다. 그러나 라그랑주 방정식의 *형식* 은 그대로 — 시간 의존 구속도 같은 한 줄.

## 본문이 말하는 것

**레오노믹** (rheonomic) 경우: $\mathbf{x}_i = \mathbf{x}_i(q^1, \dots, q^n, t)$ — 시간이 *명시적* 으로 들어간다. 예: 회전하는 후프 위의 구슬, 가속하는 차 안의 진자.

속도

$$
\dot{\mathbf{x}}_i = \frac{\partial \mathbf{x}_i}{\partial q^\alpha}\, \dot q^\alpha + \frac{\partial \mathbf{x}_i}{\partial t}
$$

— 첫 항은 자유 좌표 변화에서, 둘째 항은 *시간 변화 자체* 에서.

운동에너지 $T = \frac{1}{2} \sum_i m_i |\dot{\mathbf{x}}_i|^2$ 를 전개:

$$
T = T_2 + T_1 + T_0
$$

여기서

- $T_2 = \frac{1}{2} M_{\alpha\beta}(q, t)\, \dot q^\alpha \dot q^\beta$ — 속도에 *이차*.
- $T_1 = N_\alpha(q, t)\, \dot q^\alpha$ — 속도에 *일차*.
- $T_0 = \frac{1}{2} \sum_i m_i |\partial \mathbf{x}_i / \partial t|^2$ — 속도에 *무관* (시간 의존 무대의 *위치에너지 같은* 항).

스클레로노믹에서는 $\mathbf{x}_i$ 가 $t$ 에 의존 안 하므로 $T_1 = T_0 = 0$ — 2.1.1 의 단순 경우.

**라그랑주 방정식의 형식 보존.** §1.1.4 의 좌변 정리 (2.1.1) 이 *시간 의존* 의 경우에도 그대로 통한다:

$$
\sum_i m_i \ddot{\mathbf{x}}_i \cdot \frac{\partial \mathbf{x}_i}{\partial q^\alpha} = \frac{d}{dt} \frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial T}{\partial q^\alpha}
$$

(증명은 본문 — $\mathbf{x}_i$ 의 시간 의존성이 *시간 미분* 단계에서 추가 항을 만들지만, 그 항들이 라그랑주식 좌변에 결국 일관되게 흡수된다.) 그래서

$$
\frac{d}{dt} \frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = 0
$$

가 *그대로* — 외력이 보존력 ($V = V(q, t)$ 시간 의존 허용) 이면.

## 한 번 더, 천천히

**(1) $T_0$ 의 *위치에너지 같은* 의미.** $T_0$ 가 *위치만의* 함수 (속도 없음). $L = T_2 + T_1 + T_0 - V$ 에서 $T_0 - V$ 가 *유효 위치에너지* $V_{\text{eff}}$ 역할을 할 수 있다. 회전 무대의 *원심 위치에너지* 가 이 자리에서 등장.

**(2) $T_1$ 의 *코리올리* 같은 의미.** 속도에 *일차* — *코리올리 힘* 의 라그랑지언 표현. $\partial T_1 / \partial \dot q^\alpha = N_\alpha$, $\frac{d}{dt} N_\alpha - \partial T_1 / \partial q^\alpha$ 가 *코리올리식* 의 일반화. 회전 좌표계가 본질적으로 *레오노믹* 인 것은 그 자리에서 코리올리·원심력이 자연스럽게 나오는 이유.

**(3) 시간 의존 위치에너지.** $V = V(q, t)$ 도 허용. 단진자의 피벗이 시간에 따라 흔들리면 ($x_{\text{piv}}(t) = A \sin(\Omega t)$, Kapitza 진자), 위치에너지가 *명시적 $t$ 의존*. 동력학이 *parametric* — 단진자 안정성 이론의 시작.

**(4) 비보존력의 경우.** 마찰 같은 *비보존력* 이 있으면 일반화 힘 $Q_\alpha$ 가 *위치에너지* 에서 안 나온다. 그 경우 라그랑주 방정식이

$$
\frac{d}{dt} \frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial T}{\partial q^\alpha} = Q_\alpha
$$

— *$L$ 없이* $T$ 만 쓰는 형식. 라그랑지언 형식의 *완전성* 은 보존력 한정.

## 파이썬으로 확인 — 회전하는 후프 위 구슬

이 코드의 메시지는 단순하다: 회전 각속도 $\Omega$ 로 도는 후프 위 구슬의 운동을 *레오노믹 라그랑지언* 으로 적고, 적분된 궤적이 *고정점* (적도) 과 *진동* (비적도) 모두 보여 줌을 확인.

```python
# 회전 후프 위 구슬: 후프가 z 축을 중심으로 각속도 Ω 로 도는데,
# 구슬은 후프 위에서만 움직일 수 있다. 구슬의 위치 = 후프 반지름 R, 후프 위 각도 θ.
# 회전 좌표계에서 구슬 위치 (R sin θ, 0, -R cos θ) (회전 안에 정착)
# 실험실 좌표계로 옮기면 (R sin θ cos(Ω t), R sin θ sin(Ω t), -R cos θ)
# 운동에너지 T = (1/2) m [R² θ̇² + R² Ω² sin² θ]   ← T_2 + T_0
# 위치에너지 V = -m g R cos θ
# L = T - V
# 라그랑주식: m R² θ¨ = m R² Ω² sin θ cos θ - m g R sin θ
#          → θ¨ = (Ω² cos θ - g/R) sin θ
import numpy as np
from scipy.integrate import solve_ivp

g, R, m = 9.81, 1.0, 1.0

def rotating_hoop(t, y, Omega):
    theta, dtheta = y
    ddtheta = (Omega**2 * np.cos(theta) - g / R) * np.sin(theta)
    return [dtheta, ddtheta]

# Ω² > g/R 이면 적도가 *불안정*, 비적도 평형이 나타남.
# Ω₀² = g/R 가 임계 회전속도.
Omega_critical = np.sqrt(g / R)
print(f"임계 각속도 Ω₀ = √(g/R) = {Omega_critical:.4f} rad/s")

# (a) Ω = 0.5 Ω₀ — 적도 부근에서 진동
sol_a = solve_ivp(rotating_hoop, (0, 5.0), [0.1, 0.0],
                  args=(0.5 * Omega_critical,),
                  rtol=1e-10, atol=1e-12, dense_output=True)

# (b) Ω = 2 Ω₀ — 적도가 불안정, 비적도 평형 cos θ_e = g/(R Ω²) 부근 진동
Omega_b = 2 * Omega_critical
theta_eq = np.arccos(g / (R * Omega_b**2))
print(f"Ω = 2 Ω₀ 일 때 평형: θ_e = {np.degrees(theta_eq):.2f}°")

sol_b = solve_ivp(rotating_hoop, (0, 5.0), [theta_eq + 0.1, 0.0],
                  args=(Omega_b,),
                  rtol=1e-10, atol=1e-12, dense_output=True)

t = np.linspace(0, 5, 200)
print(f"\n(a) Ω = 0.5 Ω₀: θ 범위 = [{sol_a.sol(t)[0].min():.4f}, {sol_a.sol(t)[0].max():.4f}]  — 적도 부근")
print(f"(b) Ω = 2 Ω₀: θ 범위 = [{sol_b.sol(t)[0].min():.4f}, {sol_b.sol(t)[0].max():.4f}]  — θ_e = {theta_eq:.4f} 부근")
```

이 결과는 *레오노믹 라그랑지언* 이 *분기* (bifurcation) — 적도 평형의 안정성이 회전속도에 따라 뒤집힘 — 을 정확히 예측함을 보인다. $T_0$ 항이 *유효 위치에너지에 곱해진 회전 원심 항* 의 정체.

## 다음 절(2.1.3)로 가는 다리

지금까지의 라그랑주식은 *특정* 일반화 좌표 $q^\alpha$ 로 적은 식. 좌표를 $q' = q'(q, t)$ 로 바꿔도 식이 *같은 형식* 으로 유지될까? 2.1.3 의 공변성이 그 답 — *예*, 라그랑주식은 좌표 자유로운 *기하학적* 형식.
