---
title: '2.2.2 — 일반화 운동량과 그 보존: 순환 좌표가 만든 가장 단순한 보존법칙'
description: "일반화 운동량 $p_\\alpha = \\partial L/\\partial \\dot q^\\alpha$. 라그랑지언이 좌표 $q^\\alpha$ 에 명시적으로 의존하지 않으면 (= *순환 좌표*) $p_\\alpha$ 가 *제1적분*. 노에터 정리의 가장 단순한 표본."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 44
lang: ko
pairSlug: am1tc-2-2-2-generalized-momentum
draft: false
updated: 2026-05-18
---

# 2.2.2 — 일반화 운동량과 그 보존: 순환 좌표가 만든 가장 단순한 보존법칙

> 일반화 운동량 $p_\alpha = \partial L/\partial \dot q^\alpha$. 라그랑지언이 좌표 $q^\alpha$ 에 명시적으로 의존하지 않으면 (= *순환 좌표*) $p_\alpha$ 가 *제1적분*. 노에터 정리의 가장 단순한 표본.

## 본문이 말하는 것

**일반화 운동량** (generalized momentum, conjugate momentum) 의 정의:

$$
p_\alpha := \frac{\partial L}{\partial \dot q^\alpha} \quad (\alpha = 1, \dots, n)
$$

라그랑주 방정식은

$$
\frac{dp_\alpha}{dt} = \frac{\partial L}{\partial q^\alpha}
$$

— 운동량의 변화율 = 좌표의 *공변* 편미분.

**순환 좌표** (cyclic coordinate). $L$ 이 좌표 $q^\alpha$ 에 *명시적으로 의존하지 않으면* ($\partial L / \partial q^\alpha = 0$), 위 식에서 $dp_\alpha/dt = 0$. 즉 $p_\alpha$ 가 *제1적분*.

(*순환* 이라는 이름은 그 좌표가 회전 각도처럼 *주기적* 변환이 자연스러운 경우가 많아서. 하지만 정의 자체는 라그랑지언에서 *명시적으로 빠진* 좌표.)

**대표 예시.**

- 자유 입자 $L = \frac{1}{2} m |\mathbf{v}|^2$ — $\mathbf{x}$ 가 *모든 좌표가 순환적*. $\mathbf{p} = m\mathbf{v}$ 보존.
- 중심력 $L = \frac{1}{2} m (\dot r^2 + r^2 \dot\phi^2) - V(r)$ — $\phi$ 가 순환적 ($L$ 에 명시적 의존 없음). $p_\phi = m r^2 \dot\phi$ (각운동량) 보존.
- 일정 중력장 $L = \frac{1}{2} m(\dot x^2 + \dot z^2) - mgz$ — $x$ 가 순환적. $p_x = m\dot x$ (수평 운동량) 보존.

## 한 번 더, 천천히

**(1) 일반화 운동량의 *공변 인덱스*.** $p_\alpha$ 는 *공변* 1-텐서 (1.5.1). 1.5.2 의 인덱스 내리기 — 직교 좌표에서는 $p_\alpha = m \delta_{\alpha\beta} \dot q^\beta = m \dot q_\alpha$ — 가 자연스러운 결과. 일반 좌표에서는 *질량 행렬* 이 인덱스 내리기를 한다: $p_\alpha = M_{\alpha\beta}(q)\, \dot q^\beta$ (스클레로노믹 + $T_1 = 0$ 경우).

**(2) 보통 운동량 vs 정준 운동량.** 직교 좌표에서 $L = T - V$ 라면 $p = m\dot x$ — *보통 운동량*. 그러나 일반화 포텐셜 (2.1.4) 이 있으면 $p$ 가 *보통 운동량과 다름*. 전자기장 안 전하 입자: $L = \frac{1}{2} m v^2 + e \mathbf{A} \cdot \mathbf{v} - e\phi$ → $\mathbf{p} = m\mathbf{v} + e\mathbf{A}$ — *정준 운동량* 이 *운동학적 운동량* $+ e\mathbf{A}$. 양자역학의 *최소 결합* (minimal coupling) 의 출처.

**(3) 순환 좌표가 *시각화* 하는 대칭.** $L$ 이 $q^\alpha$ 에 의존 안 함 ↔ *$q^\alpha$ 를 임의로 옮겨도 $L$ 이 같다* ↔ *$q^\alpha$ 방향 평행이동이 대칭*. 즉 *대칭 → 보존* 의 첫 사례. 2.2.3 의 노에터 정리가 이를 *어떤 대칭이든* 으로 일반화.

**(4) 자유도 1 감소.** 순환 좌표 $q^\alpha$ 가 있으면 $p_\alpha = C_\alpha$ (상수) — 즉 *식 한 줄* 이 자유도에서 빠진다. $n$ 자유도가 *효과적으로 $n - 1$ 자유도*. 2.2.5 의 *자유도 삭감* 의 가장 단순한 방법.

**(5) 좌표 선택의 *전략*.** 라그랑지언 $L(q^1, q^2)$ 가 어떤 좌표 선택에서는 순환이 없지만, 좌표를 잘 바꾸면 순환이 나타날 수 있다. 예: 2차원 중심력에서 직교 $(x, y)$ 는 순환 없음, 극 $(r, \phi)$ 는 $\phi$ 순환. *좋은 좌표 선택* 이 라그랑주 역학의 *기술*.

## 파이썬으로 확인 — 중심력의 각운동량 보존

이 코드의 메시지는 단순하다: 케플러 운동 (중심력) 에서 라그랑지언이 $\phi$ 에 의존 안 함을 활용. $p_\phi = m r^2 \dot\phi$ (각운동량) 가 보존됨을 수치로 확인.

```python
# 케플러 운동: L = (1/2) m (ṙ² + r² φ̇²) + GMm/r
# φ 가 순환 좌표 (∂L/∂φ = 0) → p_φ = m r² φ̇ 보존
# r 의 운동: m r̈ - m r φ̇² + GMm/r² = 0
import numpy as np
from scipy.integrate import solve_ivp

m, GM = 1.0, 1.0

def kepler(t, y):
    r, phi, dr, dphi = y
    ddr = r * dphi**2 - GM / r**2
    ddphi = -2 * dr * dphi / r  # φ̈ = -2 ṙ φ̇ / r (라그랑주식 또는 각운동량 보존)
    return [dr, dphi, ddr, ddphi]

# 타원 궤도: 근일점 r=1, 속도 (반지름) 0, 각속도 적당히
y0 = [1.0, 0.0, 0.0, 1.2]  # r₀=1, φ₀=0, ṙ₀=0, φ̇₀=1.2 (탈출속도 < √2)
sol = solve_ivp(kepler, (0, 20.0), y0,
                rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 20, 500)
r_t, phi_t, dr_t, dphi_t = sol.sol(ts)

# 각운동량 p_φ = m r² φ̇
L_z = m * r_t**2 * dphi_t
print(f"p_φ 의 초기값:  {L_z[0]:.10f}")
print(f"p_φ 의 끝값:    {L_z[-1]:.10f}")
print(f"p_φ 의 변동폭: {np.ptp(L_z):.2e}")

# 에너지도 같이: E = (1/2) m (ṙ² + r² φ̇²) - GMm/r
E = 0.5 * m * (dr_t**2 + r_t**2 * dphi_t**2) - GM * m / r_t
print(f"\nE 의 변동폭: {np.ptp(E):.2e}  (= 둘 다 보존)")

# 비교: 직교 좌표로 풀었더라면 p_x = m ẋ, p_y = m ẏ — 둘 다 *보존되지 않음*
x_t, y_t = r_t * np.cos(phi_t), r_t * np.sin(phi_t)
vx_t = dr_t * np.cos(phi_t) - r_t * dphi_t * np.sin(phi_t)
vy_t = dr_t * np.sin(phi_t) + r_t * dphi_t * np.cos(phi_t)
p_x = m * vx_t
p_y = m * vy_t
print(f"\n직교 좌표에서:")
print(f"p_x 의 변동폭: {np.ptp(p_x):.4f}  (보존 안 됨)")
print(f"p_y 의 변동폭: {np.ptp(p_y):.4f}  (보존 안 됨)")
print(f"하지만 √(p_x² + p_y²) 와 무관한 *각운동량* L_z = x p_y - y p_x 는 보존:")
print(f"L_z 의 변동폭: {np.ptp(x_t * p_y - y_t * p_x):.2e}")
```

이 결과는 (a) *극 좌표* 의 $\phi$ 가 순환이라 $p_\phi$ 가 보존, (b) *직교 좌표* 에서는 $p_x$, $p_y$ 가 *개별적* 으로는 보존 안 되지만 *각운동량 $L_z = x p_y - y p_x$* 는 보존됨을 보인다. 좌표 선택이 보존량의 *모습* 을 결정하지만, *기하학적* 보존은 좌표 자유.

## 다음 절(2.2.3)로 가는 다리

순환 좌표 = *평행이동 대칭* 의 가장 단순한 형태. 그러나 대칭은 *임의의 매끄러운 변환* 에 대해 정의할 수 있다 — 회전, 확장, 시간 변위, …. 2.2.3 의 *노에터 정리* 가 *연속 대칭과 보존량의 일반적 대응* 을 박는다. 이게 분석 역학의 가장 깊은 정리 중 하나.
