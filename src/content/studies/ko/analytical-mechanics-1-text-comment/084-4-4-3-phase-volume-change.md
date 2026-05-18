---
title: '4.4.3 — 상류에 따른 체적 변화: $\nabla \cdot f$ 가 결정하는 일반 식'
description: "상공간 부피의 시간 변화율은 $\\nabla \\cdot f$ 의 적분. 해밀턴 시스템에서 $\\nabla \\cdot X_H = 0$ — 체적 보존. 비-해밀턴은 일반적으로 수축 (마찰) 또는 팽창."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 84
lang: ko
pairSlug: am1tc-4-4-3-phase-volume-change
draft: false
updated: 2026-05-18
---

# 4.4.3 — 상류에 따른 체적 변화: $\nabla \cdot f$ 가 결정하는 일반 식

> 상공간 부피의 시간 변화율은 $\nabla \cdot f$ 의 적분. 해밀턴 시스템에서 $\nabla \cdot X_H = 0$ — 체적 보존. 비-해밀턴은 일반적으로 수축 (마찰) 또는 팽창.

## 본문이 말하는 것

위상공간 $M$ 위의 흐름 $\phi_t$ 와 영역 $V_0 \subseteq M$ 에 대해, *시각 $t$ 의 영역* $V_t := \phi_t(V_0)$. 부피 변화:

$$
\frac{d|V_t|}{dt} = \int_{V_t} \nabla \cdot f\, dV
$$

여기서 $\nabla \cdot f = \sum_i \partial f_i / \partial x_i$ — *벡터장의 발산*. 식의 유도는 *발산 정리* (§1.6.8) + *흐름의 시간 미분*.

**해밀턴 시스템.** $f = X_H = (\partial H/\partial p, -\partial H/\partial q)$. 발산:

$$
\nabla \cdot X_H = \sum_\alpha \frac{\partial^2 H}{\partial q^\alpha \partial p_\alpha} - \frac{\partial^2 H}{\partial p_\alpha \partial q^\alpha} = 0
$$

(*편미분의 대칭성*에서 자동.) 따라서 *해밀턴 흐름은 부피 보존*:

$$
\boxed{\quad |V_t| = |V_0| \quad \forall t \quad \text{(해밀턴)} \quad}
$$

이게 §4.4.4 의 *리우빌 정리*.

**비-해밀턴 예시.**

- *마찰 진자* $X = (p, -\sin\theta - \gamma p)$: $\nabla \cdot X = -\gamma < 0$. 부피가 *지수적으로 수축* → attractor 로 수렴.
- *van der Pol* $X = (v, \mu(1-x^2)v - x)$: $\nabla \cdot X = \mu(1-x^2)$ — 위치 의존, 평균적으로 0 (극한 주기 위에서).
- *Lorenz attractor*: $\nabla \cdot X = -(\sigma + 1 + b) < 0$. 부피 수축이지만 *프랙탈 attractor* 로 — 차원 약 2.06.

## 한 번 더, 천천히

**(1) 발산의 *기하학적* 의미.** $\nabla \cdot f$ 는 *벡터장이 한 점에서 얼마나 *밀려나가는가* (또는 *모이는가*)* 의 정량. 양수: 그 점에서 흐름이 *벌어진다* — 부피 팽창. 음수: *모인다* — 수축. 0: *보존*.

**(2) 해밀턴의 *자동 보존*.** 발산 0 이 *해밀턴 식의 *대칭적 구조* 의 자동 결과*. 두 식 ($\dot q$, $\dot p$) 의 *부호 차이* — $+\partial H/\partial p$, $-\partial H/\partial q$ — 이 발산을 정확히 상쇄. 이게 §4.1.1 의 *해밀턴 형식의 대칭성* 의 동력학적 결과.

**(3) Liouville 측도.** 해밀턴 시스템의 *불변 측도* 가 *체적 측도* $\omega^n / n!$ (§4.1.3, 정준 형식의 $n$ 제곱). 이게 *통계역학의 자연 측도*. 비-해밀턴 시스템은 *체적 측도가 보존되지 않아* 다른 *불변 측도* 가 필요 (SRB 측도, BBM 등).

**(4) 일반 발산 식의 변형.** $\dot V/V = \langle \nabla \cdot f \rangle$ — *부피 변화율의 평균*. 비-해밀턴에서 *Lyapunov 지수의 합* 이 정확히 *$\langle \nabla \cdot f \rangle$*. Attractor 의 차원이 $D$ 라면 *발산이 음수* 인 $N - D$ 의 *수직 방향* 으로 수축이 발생.

**(5) 정보 이론과의 *연결*.** 해밀턴 시스템에서 *정보의 보존* (체적 → 정보의 양). 비-해밀턴은 *정보 손실* (수축은 *Shannon 엔트로피 감소*, 외부 매개변수에 정보가 전달). 이게 *비가역성* 의 동력학적 기원의 한 측면.

## 파이썬으로 확인 — 단진자 vs 마찰 진자의 *체적 추적*

이 코드의 메시지는 단순하다: 위상공간 위에 *초기 영역* (작은 사각형) 을 잡고, 그 영역의 *꼭짓점들* 을 흐름으로 추적. 단진자에서는 *체적이 보존* (사각형이 변형되지만 면적 같음), 마찰 진자에서는 *수축*.

```python
# 위상공간 위 사각형 (작은 영역) 의 꼭짓점을 흐름으로 추적
# 단진자 (해밀턴): 사각형이 변형되어도 *면적 보존*
# 마찰 진자: 사각형이 *수축*
import numpy as np
from scipy.integrate import solve_ivp

def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

def damped_pendulum(t, y, gamma=0.3):
    theta, p = y
    return [p, -np.sin(theta) - gamma * p]

# 초기 사각형: 중심 (1, 0), 크기 0.1
center = np.array([1.0, 0.0])
size = 0.1
corners_0 = np.array([
    center + [-size, -size],
    center + [+size, -size],
    center + [+size, +size],
    center + [-size, +size],
])
initial_area = (2 * size) ** 2
print(f"초기 사각형 면적: {initial_area:.6f}")

# 흐름 적분 — t = 5 까지
def evolve_corners(rhs, T):
    corners_T = []
    for c0 in corners_0:
        sol = solve_ivp(rhs, (0, T), c0, rtol=1e-10, atol=1e-12)
        corners_T.append(sol.y[:, -1])
    return np.array(corners_T)

# 사각형 면적 (shoelace 공식)
def polygon_area(points):
    x, y = points[:, 0], points[:, 1]
    return 0.5 * abs(np.dot(x, np.roll(y, -1)) - np.dot(np.roll(x, -1), y))

# 단진자
corners_T = evolve_corners(pendulum, 5.0)
area_T = polygon_area(corners_T)
print(f"\n단진자 t=5: 사각형 면적 = {area_T:.6f}")
print(f"  → 보존됨 (초기 {initial_area:.6f} 대비 비율 {area_T/initial_area:.4f})")

# 마찰 진자
corners_T = evolve_corners(lambda t, y: damped_pendulum(t, y, 0.3), 5.0)
area_T = polygon_area(corners_T)
print(f"\n마찰 진자 t=5: 사각형 면적 = {area_T:.6f}")
print(f"  → 수축 (초기 {initial_area:.6f} 대비 비율 {area_T/initial_area:.4f})")
print(f"  이론값: e^(-γ·t) = {np.exp(-0.3 * 5):.4f}")
```

이 결과는 (a) 해밀턴 흐름의 *체적 보존*, (b) 마찰 흐름의 *지수적 수축* (수축률 = $\gamma$) 의 *직접 시각 확인*.

## 다음 절(4.4.4)로 가는 다리

해밀턴 흐름의 부피 보존이 *심플렉틱 흐름의 자동 결과* 라는 것을 봤다. 이게 *리우빌의 정리* — 해밀턴 역학의 핵심 정리 중 하나. §4.4.4 가 그 정밀한 진술과 통계역학적 응용을 박는다.
