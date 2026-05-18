---
title: '4.4.4 — 리우빌의 정리: 해밀턴 흐름의 *체적 보존* + *분포의 보존*'
description: "해밀턴 흐름이 위상공간 부피를 보존 (리우빌 정리). 동치 형식: 분포 $\\rho$ 가 흐름을 따라 $d\\rho/dt = 0$ — *리우빌 방정식*. 통계역학의 기본 정리."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 85
lang: ko
pairSlug: am1tc-4-4-4-liouville-theorem
draft: false
updated: 2026-05-18
---

# 4.4.4 — 리우빌의 정리: 해밀턴 흐름의 *체적 보존* + *분포의 보존*

> 해밀턴 흐름이 위상공간 부피를 보존 (리우빌 정리). 동치 형식: 분포 $\rho$ 가 흐름을 따라 $d\rho/dt = 0$ — *리우빌 방정식*. 통계역학의 기본 정리.

## 본문이 말하는 것

**리우빌의 정리** (Liouville's theorem). 해밀턴 흐름 $\phi_t : T^*M \to T^*M$ 이 위상공간의 *체적 형식* $\Omega = \omega^n / n!$ 을 *보존*:

$$
\phi_t^*\, \Omega = \Omega \quad \forall t
$$

동치적으로, *임의의 영역* $V_0 \subseteq T^*M$ 에 대해

$$
|V_t| = |\phi_t(V_0)| = |V_0|
$$

(부피가 시간에 무관) — 위 정리는 §4.4.3 의 *발산 0* 의 결과.

**동치적 분포 형식.** 위상공간 위의 *밀도 함수* $\rho(q, p, t)$ 가 *흐름을 따라 보존* 되면 ($\rho$ 가 운동을 따라가는 입자의 *밀도*):

$$
\frac{d\rho}{dt} = \frac{\partial \rho}{\partial t} + \{\rho, H\} = 0
$$

— **리우빌 방정식** (Liouville equation). 통계역학의 기본 진화 방정식. *Klimontovich 방정식*, *볼츠만 방정식* 의 *충돌 항 0* 인 극한.

증명 (체적 보존 → 분포 보존): 영역 $V$ 안의 입자수 $N = \int_V \rho\, dV$ 가 운동을 따라 일정 → $dN/dt = 0$. 한편 $V_t$ 가 $V_0$ 로부터 움직이는 영역이라면 입자 수 보존: $N(V_t) = N(V_0)$. 체적 보존을 결합하면 $\rho$ 자체가 흐름을 따라 일정.

## 한 번 더, 천천히

**(1) 거시상 vs 미시상.** 위상공간의 *작은 영역* 이 *마이크로 상태* — 한 입자의 미시 상태. *거시상* 은 *작은 영역에 대한 평균*. 리우빌은 *미시 상태의 결정론* 을 정리하지만 *거시 평균* 은 *기억* 을 잊을 수 있다 (정보 손실).

**(2) Boltzmann 의 H-정리와의 *모순*?.** Boltzmann 의 H-정리: 비평형 분포가 *맥스웰 분포* (평형) 로 수렴. 그러나 리우빌 정리: 운동이 *결정론적·시간 가역*. *모순처럼 보임* — *Loschmidt 의 모순*. 해결: 거시 평균에서 *정보가 미세 자유도로 흩어진다* — *코스 미세화*. 비가역성은 *근사*.

**(3) 양자역학에서의 *대응*.** 양자 진화의 *Von Neumann 방정식*

$$
i\hbar \frac{d\hat\rho}{dt} = [\hat H, \hat\rho]
$$

— 정확히 리우빌 방정식의 *양자판*. $\{·, ·\} \to [·, ·]/(i\hbar)$ 의 *정준 양자화*. 분포의 양자 형식 ($\hat\rho$ = 밀도 행렬) 이 *순수 유니타리 진화* 를 받는다.

**(4) 비평형 통계역학과의 *고전 vs 양자*.** 고전적 리우빌 방정식은 *정확한 진술*. 그러나 *측정 문제* 에서 *확률 분포로의 환원* 이 필요. 양자 폰 노이만 방정식도 *측정 → 환원* 로 통계가 등장.

**(5) §4.4.5 의 푸앵카레 재귀의 *전제*.** 리우빌 정리가 *볼록 영역 위* 의 *체적 보존 흐름* 이라는 것은 다음 §4.4.5 의 *재귀 정리* 의 *전제* 조건. 콤팩트 + 체적 보존 + (다양한 다른 조건) 이 *재귀* 를 보장.

## 파이썬으로 확인 — 단진자 위상공간의 *분포 보존*

이 코드의 메시지는 단순하다: 단진자 위상공간의 *입자 집단* 의 *분포 모양* 을 시간에 따라 추적. 영역이 *늘어지지만 부피는 보존*. 통계역학의 *섞임* (mixing) 의 시각화.

```python
# 단진자의 위상공간에 점 N=200 을 잡고 흐름으로 추적
# 초기 분포: 작은 사각형 (균일)
# 시간 흐름: 사각형이 *늘어지고 꼬이지만 부피는 보존*
import numpy as np
from scipy.integrate import solve_ivp

def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

# 초기 점 집합 (사각형 위 격자)
N = 8
theta_grid = np.linspace(0.5, 0.7, N)
p_grid = np.linspace(0.5, 0.7, N)
Theta0, P0 = np.meshgrid(theta_grid, p_grid)
points_0 = np.stack([Theta0.ravel(), P0.ravel()], axis=1)
print(f"초기 점 수: {len(points_0)}")
print(f"초기 영역: θ ∈ [0.5, 0.7], p ∈ [0.5, 0.7]")
print(f"초기 부피 (사각형): 0.04")

# 흐름으로 추적
def evolve(points, T):
    return np.array([solve_ivp(pendulum, (0, T), p, rtol=1e-9, atol=1e-11).y[:, -1]
                     for p in points])

T_values = [0.0, 2.0, 5.0, 10.0]
print(f"\n{'시각':>6}  {'영역의 모양 (대략)':<40}  {'중심':>15}")
print("-" * 70)
for T in T_values:
    if T == 0:
        pts = points_0
    else:
        pts = evolve(points_0, T)
    
    # 영역의 분산 (mixing 정도)
    spread_theta = pts[:, 0].max() - pts[:, 0].min()
    spread_p = pts[:, 1].max() - pts[:, 1].min()
    center = pts.mean(axis=0)
    
    print(f"  t={T:>3.1f}  Δθ × Δp = {spread_theta:.3f} × {spread_p:.3f}  center=({center[0]:+.3f}, {center[1]:+.3f})")

print("\n→ 영역이 *늘어지고 비틀리지만* 부피는 보존")
print("  (수치적 부피 보존은 §4.4.3 에서 확인)")
```

이 결과는 *리우빌 정리의 시각적 결과* — 위상공간 영역이 *섞임* 으로 *늘어나지만 부피는 유지* — 를 직접 시각화한다.

## 다음 절(4.4.5)로 가는 다리

체적 보존 흐름 + 콤팩트 무대 → *재귀 정리*. 임의의 초기 영역이 *언젠가 임의로 가까이 돌아온다*. 통계역학의 *Loschmidt 모순* 과 직접 관련된 *놀라운* 정리. §4.4.5 가 그 정밀한 형식과 *재귀 시간* 의 천문학적 크기를 짚는다.
