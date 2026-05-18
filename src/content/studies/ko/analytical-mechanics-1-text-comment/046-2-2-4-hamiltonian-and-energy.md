---
title: '2.2.4 — 해밀토니언과 에너지 적분: 시간 변위 대칭이 만든 보존량'
description: "$H = p_\\alpha \\dot q^\\alpha - L$ — 라그랑지언의 *르장드르 변환*. $L$ 이 시간에 명시적 의존 안 하면 $H$ 가 보존. 스클레로노믹 + 보존력에서 $H = T + V$ (총 에너지)."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 46
lang: ko
pairSlug: am1tc-2-2-4-hamiltonian-and-energy
draft: false
updated: 2026-05-18
---

# 2.2.4 — 해밀토니언과 에너지 적분: 시간 변위 대칭이 만든 보존량

> $H = p_\alpha \dot q^\alpha - L$ — 라그랑지언의 *르장드르 변환*. $L$ 이 시간에 명시적 의존 안 하면 $H$ 가 보존. 스클레로노믹 + 보존력에서 $H = T + V$ (총 에너지).

## 본문이 말하는 것

**해밀토니언** (Hamiltonian) 의 정의

$$
H(q, \dot q, t) := p_\alpha\, \dot q^\alpha - L(q, \dot q, t), \quad p_\alpha = \frac{\partial L}{\partial \dot q^\alpha}
$$

(아인슈타인 합 규약). 운동방정식의 해를 따라가는 $H$ 의 시간 미분을 직접 계산:

$$
\frac{dH}{dt} = \dot p_\alpha \dot q^\alpha + p_\alpha \ddot q^\alpha - \frac{\partial L}{\partial q^\alpha} \dot q^\alpha - \frac{\partial L}{\partial \dot q^\alpha} \ddot q^\alpha - \frac{\partial L}{\partial t}
$$

운동방정식 ($\dot p_\alpha = \partial L / \partial q^\alpha$) 과 $p_\alpha = \partial L / \partial \dot q^\alpha$ 를 대입하면 *내부 항이 모두 상쇄*, 다음만 남는다:

$$
\boxed{\quad \frac{dH}{dt} = -\frac{\partial L}{\partial t} \quad}
$$

라그랑지언이 *시간에 명시적으로 의존하지 않으면* $\partial L / \partial t = 0$ → $dH/dt = 0$ → $H$ 는 *제1적분*.

**$H$ 의 명시적 형태.** 운동에너지의 분해 $T = T_2 + T_1 + T_0$ (2.1.2) 와 $L = T - V$ 를 대입:

$$
H = 2 T_2 + T_1 - L = T_2 - T_0 + V
$$

- **스클레로노믹 + 보존력**: $T_1 = T_0 = 0$, $T_2 = T$, $V = V(q)$. 그래서 $H = T + V$ — *총 에너지*.
- **레오노믹**: $H \neq T + V$ 일반적으로. 예: 회전 후프 위 구슬 (2.1.2) 에서 $H = T_2 - T_0 + V$ 가 *준-에너지* — 실제 에너지가 아니지만 *보존되는 양*.

## 한 번 더, 천천히

**(1) 르장드르 변환의 *역할*.** $H = p_\alpha \dot q^\alpha - L$ 은 *라그랑지언 $L(q, \dot q)$ 에서 해밀토니언 $H(q, p)$ 로의* 변수 교환. *속도* $\dot q$ 를 *운동량* $p$ 로 바꾸는 *르장드르 변환*. §5.1.2 의 정준 변환의 출발점.

**(2) *왜* 음의 부호 $-L$ 이 끼어드는가.** 노에터 처방 $J = p_\alpha \eta^\alpha - \Phi$ 에서 시간 변위 ($\eta^\alpha = \dot q^\alpha$, $\Phi = L$) 의 경우 $J = p_\alpha \dot q^\alpha - L = H$. 즉 $H$ 의 정의가 *노에터의 처방* 에서 자동으로 떨어진다.

**(3) 에너지의 *3 가지 정체*.**

- **운동에너지 + 위치에너지** $T + V$: 가장 친숙한 정의.
- **해밀토니언** $H$: 시간 변위 대칭의 보존량.
- **르장드르 변환** $p \dot q - L$: $L$ 을 $H$ 로 옮기는 변환.

세 정체가 *스클레로노믹 + 보존력* 에서만 *완전히 일치*. 일반적으로는 (b) 만 *보존되는 양*.

**(4) 일반화 포텐셜 (2.1.4) 의 경우.** 전자기장 안 전하 입자 라그랑지언 $L = \frac{1}{2} m v^2 + e\mathbf{A} \cdot \mathbf{v} - e\phi$ 에 대해 $\mathbf{p} = m\mathbf{v} + e\mathbf{A}$, $H = \mathbf{p} \cdot \mathbf{v} - L = \frac{1}{2} m v^2 + e\phi$ — *운동에너지 + 전기 위치에너지* (벡터 포텐셜 $\mathbf{A}$ 가 사라짐). 이게 *에너지의 정확한 정의*.

**(5) §4 의 해밀턴 형식의 시드.** $H(q, p, t)$ 의 정준 방정식

$$
\dot q^\alpha = \frac{\partial H}{\partial p_\alpha}, \quad \dot p_\alpha = -\frac{\partial H}{\partial q^\alpha}
$$

이 § 4 의 해밀턴 역학. 라그랑지언 $L(q, \dot q)$ 이 *2차 ODE* 였다면, $H(q, p)$ 가 만드는 식은 *대칭적인 1차 ODE 두 묶음* — 형식적으로 더 깔끔.

## 파이썬으로 확인 — 단진자의 $H$ vs $T + V$, 그리고 회전 후프의 $H \neq T + V$

이 코드의 메시지는 단순하다: (a) 스클레로노믹 단진자에서 $H = T + V$, (b) 레오노믹 회전 후프에서 $H \neq T + V$ 이지만 $H$ 가 *보존*. 두 경우 모두 수치 적분으로 확인.

```python
# (a) 단진자 (스클레로노믹): L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# p_θ = m ℓ² θ̇, H = p_θ θ̇ - L = (1/2) m ℓ² θ̇² - m g ℓ cos θ = T + V ✓
# (b) 회전 후프 (레오노믹): L = (1/2) m R² (θ̇² + Ω² sin² θ) + m g R cos θ
# p_θ = m R² θ̇, H = p_θ θ̇ - L = (1/2) m R² θ̇² - (1/2) m R² Ω² sin² θ - m g R cos θ
#   = T_2 - T_0 + V  ≠  T + V (= T_2 + T_0 + V) — 두 값이 다름
import numpy as np
from scipy.integrate import solve_ivp

g, ell, m, R = 9.81, 1.0, 1.0, 1.0
Omega = 2 * np.sqrt(g / R)  # > 임계, 회전 후프 (2.1.2 의 예)

# (a) 단진자
def pendulum(t, y):
    theta, dtheta = y
    return [dtheta, -(g / ell) * np.sin(theta)]

sol_a = solve_ivp(pendulum, (0, 5.0), [np.pi/3, 0.0],
                  rtol=1e-10, atol=1e-12, dense_output=True)
ts = np.linspace(0, 5, 200)
theta_a, dtheta_a = sol_a.sol(ts)
T_a = 0.5 * m * ell**2 * dtheta_a**2
V_a = -m * g * ell * np.cos(theta_a)
H_a = T_a + V_a  # 단진자에서 H = T + V

print("== 단진자 (스클레로노믹) ==")
print(f"H 의 변동폭:        {np.ptp(H_a):.2e}  (= 0 기대)")
print(f"T + V 의 변동폭:    {np.ptp(T_a + V_a):.2e}  (= H 와 같음)")

# (b) 회전 후프
def hoop(t, y):
    theta, dtheta = y
    ddtheta = (Omega**2 * np.cos(theta) - g / R) * np.sin(theta)
    return [dtheta, ddtheta]

# 임의의 초기조건 (회전 후프의 비적도 평형 부근에서)
theta_eq = np.arccos(g / (R * Omega**2))
sol_b = solve_ivp(hoop, (0, 5.0), [theta_eq + 0.2, 0.0],
                  rtol=1e-10, atol=1e-12, dense_output=True)
theta_b, dtheta_b = sol_b.sol(ts)

# T 와 V (실제)
T_b = 0.5 * m * R**2 * (dtheta_b**2 + Omega**2 * np.sin(theta_b)**2)
V_b = -m * g * R * np.cos(theta_b)
# H = T_2 - T_0 + V (보존됨)
T_2 = 0.5 * m * R**2 * dtheta_b**2
T_0 = 0.5 * m * R**2 * Omega**2 * np.sin(theta_b)**2
H_b = T_2 - T_0 + V_b

print("\n== 회전 후프 (레오노믹) ==")
print(f"T + V 의 변동폭:    {np.ptp(T_b + V_b):.4f}  (보존 안 됨)")
print(f"H 의 변동폭:        {np.ptp(H_b):.2e}        (보존됨 — '에너지의 자리' 의 진정한 정체)")
```

이 결과는 (a) 스클레로노믹에서 $H = T + V$ 가 *모두 보존*, (b) 레오노믹에서 $T + V$ 가 *보존되지 않고* $H = T_2 - T_0 + V$ 만 *보존* 임을 보인다. *에너지* 라는 단어의 *수학적 정확한 정의* 는 *해밀토니언*.

## 다음 절(2.2.5)로 가는 다리

순환 좌표와 노에터 정리가 *제1적분* 을 만들어 냈다. 그 제1적분들을 *활용* 해서 운동방정식의 차원을 *낮춘다* — *자유도 삭감*. 2.2.5 가 *Routhian* 같은 도구로 그 환원을 어떻게 박는지 설명한다.
