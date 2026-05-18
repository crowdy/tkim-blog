---
title: '5.2.2 — 적분 불변식: 흐름이 *보존* 하는 곡선·면적분'
description: "푸앵카레의 적분 불변식 $\\oint_C p_\\alpha dq^\\alpha$ — 위상공간의 닫힌 곡선이 흐름에 의해 옮겨질 때도 적분값이 보존. 정준 변환과 심플렉틱 사상의 대수적 도구."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 92
lang: ko
pairSlug: am1tc-5-2-2-integral-invariant
draft: false
updated: 2026-05-18
---

# 5.2.2 — 적분 불변식: 흐름이 *보존* 하는 곡선·면적분

> 푸앵카레의 적분 불변식 $\oint_C p_\alpha dq^\alpha$ — 위상공간의 닫힌 곡선이 흐름에 의해 옮겨질 때도 적분값이 보존. 정준 변환과 심플렉틱 사상의 대수적 도구.

## 본문이 말하는 것

**적분 불변식** (integral invariant). 위상공간 $T^*M$ (또는 확장 $T^*M \times \mathbb R$) 위의 $p$-형식 $\omega$ 와 $p$-차원 부다양체 (또는 *체인*) $C$ 에 대해, *해밀턴 흐름* $\phi_t$ 에 의해 $C$ 가 $\phi_t(C)$ 로 옮겨져도

$$
\int_{\phi_t(C)} \omega = \int_C \omega \quad \forall t
$$

— *적분이 시간 무관*. 이런 $\omega$ 가 *적분 불변식*.

**푸앵카레의 적분 불변식.** 위상공간의 *닫힌 곡선* $C$ 에 대해

$$
\boxed{\quad I = \oint_C p_\alpha\, dq^\alpha = \oint_C \theta \quad \text{(상대적 적분 불변식)} \quad}
$$

가 해밀턴 흐름에 대해 *보존* — $I(\phi_t(C)) = I(C)$.

**카르탕의 절대적 적분 불변식** (확장 상공간 형식). 시간이 포함된 닫힌 곡선 $\tilde C$ 에 대해

$$
\tilde I = \oint_{\tilde C} \left[p_\alpha\, dq^\alpha - H\, dt\right] = \oint_{\tilde C} \theta_H^{\text{ext}}
$$

가 *모든 닫힌 곡선* 에 대해 보존 (정준 변환의 출발점).

**증명 (스토크스 + $L_X \omega = 0$).** $\oint_C \theta = \int_S d\theta = \int_S \omega$ (스토크스, $S$ = 둘러싼 면적). 해밀턴 흐름이 *$\omega$ 보존* (§4.2.3, $L_{X_H} \omega = 0$) → *면적분 보존* → *경계 적분 보존*.

## 한 번 더, 천천히

**(1) "상대적" vs "절대적".** 

- **상대적 (relative)**: *닫힌 곡선* 위 적분만 보존. $\oint_C \theta$.
- **절대적 (absolute)**: *임의 곡선* 위 적분 보존. 본 절의 $\theta$ 는 *상대적*. 확장 형식 $\theta_H^{\text{ext}}$ 는 *절대적*.

차이의 이유: $\theta$ 가 *정확* 형식이 아니라 *닫힌 곡선* 에서만 보존. $\theta_H^{\text{ext}}$ 는 더 정밀한 *완전 정의*.

**(2) 푸앵카레 적분 불변식의 *의미*.** $\oint p\, dq$ 는 *위상공간 위의 닫힌 곡선이 둘러싼 *면적*. 단진자의 위상공간 *진동* 의 둘러싼 면적이 *진동 사이클의 작용* — *조화 진동자에서 $\oint p\, dq = 2\pi J$* ($J$ = 작용 변수).

**(3) 양자화와의 *연결*.** 옛 양자역학의 *Bohr–Sommerfeld 양자화 조건*

$$
\oint p\, dq = n h \quad (n \in \mathbb Z_+)
$$

— *적분 불변식이 정수 배수의 플랑크 상수*. 적분 가능 시스템의 에너지 양자화. *적분 불변식이 양자수의 정체* 라는 사실의 시작점.

**(4) §1.6.7 의 미분형식 적분 회수.** 본 절의 적분은 *위상공간 위 1-형식의 *곡선* 적분* — §1.6.7 의 자연스러운 응용. 좌표 자유로 정의되어 *모든 좌표계에서 같은 값*. 정준 변환의 핵심 양.

**(5) §4.4.4 의 리우빌 정리와의 관계.** 리우빌이 *체적 (n-차원 적분)*, 본 절이 *1-차원 적분*. 둘 다 *심플렉틱 흐름의 자동 보존 양*. §5.5.1 ~ 5.5.4 에서 더 일반화 (라그랑주 괄호, 사교적, 작용-각 변수 시점의 리우빌 재논의).

## 파이썬으로 확인 — 단진자 위상공간의 적분 불변식

이 코드의 메시지는 단순하다: 단진자 위상공간에 *닫힌 곡선* (작은 원) 을 잡고, 해밀턴 흐름으로 곡선이 변형됨에도 *둘러싼 면적* $\oint p\, dq$ 가 보존됨을 본다. 시간을 따라가며 *원이 늘어지고 비틀리지만 면적은 일정*.

```python
# 단진자 위상공간의 닫힌 곡선의 *면적* 추적
# 닫힌 곡선이 해밀턴 흐름에 의해 변형되어도 면적은 보존 (적분 불변식)
import numpy as np
from scipy.integrate import solve_ivp

def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

# 초기 닫힌 곡선: 중심 (1.0, 0.0) 의 작은 원
N_points = 30
center = np.array([1.0, 0.0])
radius = 0.2
angles = np.linspace(0, 2*np.pi, N_points, endpoint=False)
curve_0 = center + radius * np.stack([np.cos(angles), np.sin(angles)], axis=1)

# 초기 면적: π r²
initial_area = np.pi * radius**2
print(f"초기 면적 (= π r²): {initial_area:.6f}")

# 곡선의 닫힌 적분 ∮ p dq 계산 (사다리꼴 공식)
def loop_integral(curve):
    # ∮ p dq ≈ Σ p_i (q_{i+1} - q_i), 닫힌 경로 (모듈로 N)
    q = curve[:, 0]
    p = curve[:, 1]
    integral = 0.0
    for i in range(len(curve)):
        j = (i + 1) % len(curve)
        integral += 0.5 * (p[i] + p[j]) * (q[j] - q[i])
    return integral

I_0 = loop_integral(curve_0)
print(f"초기 ∮ p dq = {I_0:.6f}  (≈ π r² 와 유사 — 작은 원에서 면적과 거의 같음)")

# 흐름으로 곡선 추적
def evolve(curve, T):
    result = np.zeros_like(curve)
    for i, point in enumerate(curve):
        sol = solve_ivp(pendulum, (0, T), point, rtol=1e-10, atol=1e-12)
        result[i] = sol.y[:, -1]
    return result

# 시간 T 별 적분 값 추적
T_values = [0.0, 1.0, 2.0, 5.0]
for T in T_values:
    if T == 0:
        curve = curve_0
    else:
        curve = evolve(curve_0, T)
    I = loop_integral(curve)
    print(f"t = {T:>4.1f}:  ∮ p dq = {I:.6f}  (변화율 {(I - I_0) / I_0 * 100:+.4f}%)")

print(f"\n→ 적분 불변식 — 곡선의 모양은 변해도 ∮ p dq 는 *일정*")
```

이 결과는 *적분 불변식의 직접 수치 확인*. 곡선이 *늘어지고 비틀려도* 그 *닫힌 적분이 보존* — 정준 변환의 *대수적 핵심*.

## 다음 절(5.2.3)로 가는 다리

적분 불변식의 *기하학적* 정체는 *카르탕의 원리* — 위상공간 위의 *닫힌 곡선의 곡선 적분이 변환에 대해 불변* 이라는 *대수적 정밀화*. §5.2.3 이 그 카르탕 원리의 형식을 박는다.
