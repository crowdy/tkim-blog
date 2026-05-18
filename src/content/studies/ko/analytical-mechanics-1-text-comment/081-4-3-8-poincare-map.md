---
title: '4.3.8 — 푸앵카레 사상: 연속 시스템을 *이산 사상* 으로 환원'
description: "주기해를 *횡단하는 단면* 에서 다음 회귀까지의 사상 $P : \\Sigma \\to \\Sigma$. 주기해의 *고정점*, 안정성 분석, 카오스 측정 — 모두 이 사상 위에서. 수치 시뮬레이션의 표준 도구."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 81
lang: ko
pairSlug: am1tc-4-3-8-poincare-map
draft: false
updated: 2026-05-18
---

# 4.3.8 — 푸앵카레 사상: 연속 시스템을 *이산 사상* 으로 환원

> 주기해를 *횡단하는 단면* 에서 다음 회귀까지의 사상 $P : \Sigma \to \Sigma$. 주기해의 *고정점*, 안정성 분석, 카오스 측정 — 모두 이 사상 위에서. 수치 시뮬레이션의 표준 도구.

## 본문이 말하는 것

**푸앵카레 단면** (Poincaré section): 상공간 $M$ 위의 *부분공간* $\Sigma$ (차원 $\dim M - 1$) 으로, 흐름이 *횡단* 하는 — 즉 흐름의 벡터장 $f$ 가 $\Sigma$ 의 법선과 *0 이 아닌 성분* 을 가짐.

**푸앵카레 사상** (Poincaré map): 단면의 한 점 $p \in \Sigma$ 에서 *흐름을 따라가다* 다시 $\Sigma$ 에 *처음 돌아오는 점* $P(p)$. 이 *회귀 사상* $P : \Sigma \to \Sigma$ 가 푸앵카레 사상.

연속 시간 $\dot x = f(x)$ 의 운동을 *이산 시간 사상* $p_{n+1} = P(p_n)$ 으로 환원. 차원 $N - 1$ 의 더 단순한 시스템.

**용도.**

- **주기해의 고정점**: 주기해 $\gamma$ 가 $\Sigma$ 와 한 번 만난다면 $P$ 의 *고정점*. 주기해의 *안정성* = $P$ 의 *고정점 안정성* — 자코비안 $DP$ 의 고유값.
- **카오스 측정**: 단면 위의 *분포* 의 발산을 Poincaré 사상의 *이터레이트* 로 추적. *Lyapunov 지수의 수치 측정* 의 표준 형식.
- **준주기 vs 카오스 구별**: 단면 위의 점이 *원* (준주기 환) 인가, *조각난 점들* (카오스) 인가로 구별.

## 한 번 더, 천천히

**(1) "단면" 의 *선택*.** $\Sigma$ 의 선택은 *어느 정도 자유* — 단, 흐름의 *법선 성분이 0 이 아니어야* 한다. 좋은 선택은 (a) 주기해가 *한 번만* 만나는 단면, (b) *수치적으로 안정한* 단면 (예: 평면).

**(2) 강제 진동의 *시각화*.** 외부에서 *주기적으로* 강제되는 시스템 — $\ddot x + f(x) = F\cos(\omega t)$. 시간을 $T = 2\pi/\omega$ 단위로 *모듈로* 다루면 외부 시간 매개변수가 *원형*. *시간 모듈로 $T$* 가 자연스러운 단면. *주기마다 점 찍기* — *stroboscope* (스트로보) 단면.

**(3) 강제 단진자의 표본 시뮬레이션.** $\ddot \theta + \gamma \dot\theta + \sin\theta = A \cos(\omega t)$ (마찰 + 외력). 매개변수에 따라 (a) 단일 주기 운동, (b) 주기 *배가* (period doubling), (c) *카오스*. 각각 Poincaré 단면 위에서 *한 점*, *두 점*, *프랙탈 분포* 로 보임.

**(4) 천체역학의 *제 3 체* 문제.** 두 별 + 작은 입자 = 3-체 문제. 작은 입자의 운동을 *Poincaré 단면 위 사상* 으로 환원하면, *KAM 환 영역* (준주기, 안정) 과 *카오스 영역* (확률적 행동) 이 명확히 구별된다. *태양계 안정성* 의 핵심 도구.

**(5) §5 의 정준 변환과 *연결*.** 해밀턴 시스템의 Poincaré 사상은 *정준 사상* (= 심플렉틱 사상) — *체적 보존*. 카오스 영역도 *체적 보존* 하면서 *섞임* — *해밀턴 카오스* 의 특징. 비-해밀턴 카오스와는 *질적으로 다른 카오스*.

## 파이썬으로 확인 — 강제 마찰 진자의 Poincaré 사상

이 코드의 메시지는 단순하다: 강제 마찰 진자 $\ddot\theta + \gamma\dot\theta + \sin\theta = A\cos(\omega t)$ 의 *시간 모듈로 $T = 2\pi/\omega$* 단면 위 점을 추출. 매개변수에 따라 단일 주기 (한 점), 주기 2 (두 점), 또는 카오스 (분포).

```python
# 강제 마찰 진자
import numpy as np
from scipy.integrate import solve_ivp

omega = 2/3  # 강제 진동수
T = 2 * np.pi / omega  # 주기

def forced_pendulum(t, y, A, gamma):
    theta, p = y
    return [p, -np.sin(theta) - gamma * p + A * np.cos(omega * t)]

# 단진자, 마찰 + 외력 — 세 매개변수 경우
cases = [
    (0.5, 0.2, "약한 외력 → 주기 1"),
    (1.07, 0.2, "임계 부근 → 주기 2 또는 더"),
    (1.5, 0.2, "강한 외력 → 카오스 가능"),
]

for A, gamma, name in cases:
    # 초기 transient 제거를 위해 길게 적분
    sol = solve_ivp(forced_pendulum, (0, 200 * T), [1.0, 0.0],
                    args=(A, gamma),
                    rtol=1e-8, atol=1e-10, dense_output=True)
    
    # Poincaré 단면: t = nT 의 점
    poincare_times = np.arange(150 * T, 200 * T, T)  # transient 후
    poincare_points = sol.sol(poincare_times)
    
    # θ 를 [-π, π] 범위로
    theta_mod = ((poincare_points[0] + np.pi) % (2 * np.pi)) - np.pi
    p_at_section = poincare_points[1]
    
    # 점의 *분산* 으로 카오스 측정
    theta_std = np.std(theta_mod)
    p_std = np.std(p_at_section)
    
    print(f"A = {A}, γ = {gamma}, {name}")
    print(f"  Poincaré 단면 위 50 점의 (θ, p) 분산: ({theta_std:.4f}, {p_std:.4f})")
    print(f"  → {'한 점에 수렴 (주기 1)' if theta_std < 0.01 else '여러 점 또는 분산 (주기 배가/카오스)'}")
    print()
```

이 결과는 *Poincaré 사상이 강제 진동의 *질적* 행동을 한눈에 분류* 함을 보여 준다. 카오스의 *수치적 인식 방법* 의 핵심 표본.

## 다음 절(4.4.1)로 가는 다리

지금까지 §4.3 의 일반 동력학 시스템 이론은 *해밀턴·비-해밀턴 공통* 의 어휘. §4.4 는 *해밀턴 시스템에 한정* 한 더 정밀한 결과 — *체적 보존*, *Liouville 정리*, *Poincaré 재귀 정리* — 로 돌아간다. *심플렉틱 구조가 만드는 특별한 동력학적 성질*.
