---
title: '4.3.2 — 상류와 불변 집합: 평형점·주기해·attractor 의 골격'
description: "상류 $\\phi_t : M \\to M$ 의 *불변 집합* 이 동력학의 *질적 골격*. 평형점 (0차원), 주기해 (1차원), 환·환의 attractor (고차원) 가 차례로 등장. 비-해밀턴 시스템의 *기억력 있는* 행동의 출처."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 75
lang: ko
pairSlug: am1tc-4-3-2-phase-flow-invariant-set
draft: false
updated: 2026-05-18
---

# 4.3.2 — 상류와 불변 집합: 평형점·주기해·attractor 의 골격

> 상류 $\phi_t : M \to M$ 의 *불변 집합* 이 동력학의 *질적 골격*. 평형점 (0차원), 주기해 (1차원), 환·환의 attractor (고차원) 가 차례로 등장. 비-해밀턴 시스템의 *기억력 있는* 행동의 출처.

## 본문이 말하는 것

**상류** (phase flow) $\phi_t : M \to M$, $\phi_t(x_0) = $ ODE $\dot x = f(x)$ 의 시각 $t$ 에서의 해 ($x(0) = x_0$). §1.4.6 의 1-매개변수 변환군 — 그러나 이번에는 해밀턴 시스템에 한정되지 않는다.

**불변 집합** (invariant set): 집합 $S \subseteq M$ 이 $\phi_t(S) = S$ 모든 $t$ — 흐름이 $S$ 밖으로 떠나지 않는다.

**기본 불변 집합 류.**

- **평형점** (equilibrium / fixed point): $f(x^*) = 0$ 인 점. $\phi_t(x^*) = x^*$ 모든 $t$.
- **주기해** (periodic orbit): 어떤 주기 $T > 0$ 에 대해 $\phi_T(x_0) = x_0$ 인 닫힌 곡선.
- **준주기 환** (quasi-periodic torus): $n$ 차원 환 $T^n$ — *조정 불가능한* 진동수 비.
- **카오스 attractor**: 위 의 어느 것도 아닌 *프랙탈* 구조.

**$\omega$-극한 집합.** 한 점 $x$ 의 *미래로의 극한* — $\omega(x) := \{y \in M : \phi_{t_n}(x) \to y, t_n \to \infty\}$. 운동의 *최종* 운명. 비-해밀턴 시스템에서는 *attractor* (수축하는 불변 집합) 로 수렴.

**$\alpha$-극한 집합.** 과거 극한 — 시간 반대 방향.

## 한 번 더, 천천히

**(1) 해밀턴 시스템의 *attractor 부재*.** 해밀턴 흐름은 *체적 보존* — 작은 영역이 *수축할 수 없다*. 그래서 *진정한 attractor 없음*. 모든 운동이 *에너지 등고면 위* — 그 위에서 *섞임* 만 가능 (KAM, 에르고드성).

**(2) Liapunov 함수의 *예고편*.** 비-해밀턴 시스템에서 *에너지가 단조 감소* 하는 함수 (= Liapunov 함수) 가 있으면 *attractor 로 수렴 보장*. §4.3.7 의 주제.

**(3) Poincaré–Bendixson 정리 (2D).** 2차원 동력학 시스템 (예: 마찰 진자, van der Pol) 의 *유계* 궤도의 $\omega$-극한 집합은 *평형점 또는 주기해* — 즉 2D 에서는 *카오스 불가*. 3D 이상에서 카오스가 가능한 *위상학적 이유*.

**(4) 카오스 attractor 의 *프랙탈* 본성.** Lorenz attractor, Rössler attractor — *측도 0* 이지만 *비-자명한* 프랙탈 차원 (예: Lorenz 의 2.06). *비-해밀턴 + 3D 이상* 의 시스템에서 자연스럽게 등장.

**(5) 헤테로클리닉·호모클리닉 궤도.** 평형점에서 시작해 다른 평형점으로 가는 궤도 = 헤테로클리닉; 같은 평형점으로 돌아오는 = 호모클리닉. 카오스 발생의 *유기적 종자*. 단진자의 *separatrix* 가 호모클리닉 궤도의 단순 예.

## 파이썬으로 확인 — 마찰 진자의 평형점 attractor

이 코드의 메시지는 단순하다: 마찰 진자에서 *모든 초기조건* 이 *아래 방향 평형점* $(\theta = 0, p = 0)$ 으로 수렴함을 본다. *위쪽 평형점* $(\theta = \pi, p = 0)$ 은 *불안정*, 그 *안정 다양체* (호모클리닉) 의 *경계 너머* 에서만 운동이 위쪽으로 못 간다.

```python
# 마찰 진자: θ¨ = -sin θ - γ θ̇
# 평형점 두 개: (0, 0) 안정, (π, 0) 불안정
# 다양한 초기조건에서 t → ∞ 행동
import numpy as np
from scipy.integrate import solve_ivp

gamma = 0.3

def damped_pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta) - gamma * p]

# 다양한 초기조건
initial_states = [
    (0.5, 0.0, "작은 변위"),
    (np.pi - 0.1, 0.0, "위쪽 부근"),
    (0.0, 3.0, "빠른 회전 (한 바퀴)"),
    (0.0, 1.5, "약한 회전 (못 넘김)"),
]

for theta0, p0, name in initial_states:
    sol = solve_ivp(damped_pendulum, (0, 50.0), [theta0, p0],
                    rtol=1e-9, atol=1e-11, dense_output=True)
    final = sol.sol(50.0)
    # 평형점 (0, 0) 또는 (2πn, 0) 으로 수렴
    theta_mod = final[0] - 2 * np.pi * np.round(final[0] / (2 * np.pi))
    print(f"{name:<25}  최종 (θ mod 2π, p) = ({theta_mod:+.4f}, {final[1]:+.4f})")

print("\n→ 모든 운동이 *평형점* (안정한 아래쪽) 으로 수렴.")
print("  (0, 0) 가 *attractor*, 그 *吸引권* (basin) 이 위쪽 평형점의 안정 다양체로 경계.")
```

이 결과는 비-해밀턴 시스템의 *attractor* 의 의미 — 모든 운동이 *몇 개의 특별한 집합* 으로 수렴 — 을 보여 준다.

## 다음 절(4.3.3)로 가는 다리

평형점과 주기해를 식별하는 일이 *동력학 분석의 첫 단계*. 그러나 *안정성* — 작은 perturbation 에 대해 그 상태가 유지되는가 — 이 운동의 *물리적 의미* 를 결정. §4.3.3 이 안정성의 정확한 정의 (Liapunov, 점근적, 구조적) 를 박는다.
