---
title: '4.3.1 — 동력학 시스템이란: $\dot x = f(x)$ 의 일반 형식'
description: "위상공간 $M$ 위의 매끄러운 벡터장 $f$ 가 만드는 ODE $\\dot x = f(x)$ 가 *동력학 시스템*. 해밀턴 시스템은 특수 경우. 평형해·주기해·카오스 등 *질적 행동* 의 연구가 동력학 시스템 이론."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 74
lang: ko
pairSlug: am1tc-4-3-1-what-is-dynamical-system
draft: false
updated: 2026-05-18
---

# 4.3.1 — 동력학 시스템이란: $\dot x = f(x)$ 의 일반 형식

> 위상공간 $M$ 위의 매끄러운 벡터장 $f$ 가 만드는 ODE $\dot x = f(x)$ 가 *동력학 시스템*. 해밀턴 시스템은 특수 경우. 평형해·주기해·카오스 등 *질적 행동* 의 연구가 동력학 시스템 이론.

## 본문이 말하는 것

**동력학 시스템** (dynamical system) 의 일반 정의: 매끄러운 다양체 $M$ ($\dim M = N$) 와 매끄러운 벡터장 $f : M \to TM$ 의 쌍. 운동방정식

$$
\dot x = f(x), \quad x \in M
$$

또는 시간 의존 $\dot x = f(x, t)$.

해밀턴 시스템 ($M = T^*Q$, $f = X_H$) 은 *특수 경우*. 그러나 일반 동력학 시스템은 *비-해밀턴* 도 허용 — 마찰이 있는 진자, 화학 반응의 농도 변화, 생태계 모델, 회로의 전류 등.

**핵심 질문.** ODE 의 *해를 명시적으로 구하기* 보다 *행동의 정성적* 분석:

- 평형해 ($f(x^*) = 0$ 의 점) 가 어디 있는가?
- 그 평형해 주변에서 운동이 *안정* 한가, *불안정* 한가?
- *주기해* (periodic orbit) 가 존재하는가?
- *극한* 행동 (attractor) 은 무엇인가?
- 매개변수가 변할 때 *질적 변화* (분기) 가 어디서 일어나는가?

이 모든 질문이 §4.3 의 주제.

## 한 번 더, 천천히

**(1) 해밀턴 vs 비-해밀턴.** 해밀턴 시스템은 *체적 보존* (Liouville) 과 *에너지 보존* — 매우 *제한된* 클래스. 일반 동력학 시스템은 *수축 / 팽창* (예: 마찰) 이 있어 *attractor* 가 가능. 해밀턴 시스템에는 *진정한 attractor 가 없다* — 모든 운동이 *체적 보존*.

**(2) 차원의 *질적* 영향.** 

- $N = 1$: 평형해만 있을 수 있음. 주기해 불가능 (1차원 단조).
- $N = 2$: 평형해 + 주기해 (limit cycle) 가능. *Poincaré–Bendixson 정리* 가 행동을 제약.
- $N \ge 3$: *카오스* 가능. 예측 불가능한 행동.

해밀턴 시스템은 *항상 짝수 차원* — 가장 단순한 경우가 $N = 2$ (1자유도).

**(3) 흐름과 사상의 *동치*.** 연속 시간 동력학 시스템 $\dot x = f(x)$ 의 흐름 $\phi_t$ 가 *1-매개변수 변환군*. 이산 시간 동력학 시스템 *사상* $x_{n+1} = T(x_n)$ 와 *동치적* 으로 다룬다 — Poincaré 사상 (§4.3.8) 이 이 동치를 명시적으로 한다.

**(4) "카오스" 의 정의.** *결정적* (deterministic) ODE 가 *민감한 초기조건 의존성* (sensitive dependence on initial conditions) 을 가질 때 *카오스적*. 정확한 정의는 *양의 Lyapunov 지수* + *섞임* (mixing) — *예측 불가* 의 수학적 정체.

## 파이썬으로 확인 — 세 가지 표본 시스템

이 코드의 메시지는 단순하다: (a) 단진자 (해밀턴, 보존), (b) 마찰 진자 (비-해밀턴, 수축), (c) van der Pol 발진기 (비-해밀턴, 극한 주기) — 세 종류의 *질적으로 다른* 동력학을 한 자리에서 시각화.

```python
# 세 표본 시스템 비교
import numpy as np
from scipy.integrate import solve_ivp

# (a) 단진자 — 해밀턴, 에너지 보존
def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

# (b) 마찰 진자 — 비-해밀턴, 에너지 감소 → 평형으로 수축
def damped_pendulum(t, y, gamma=0.5):
    theta, p = y
    return [p, -np.sin(theta) - gamma * p]

# (c) van der Pol — 비-해밀턴, 극한 주기로 수렴
def van_der_pol(t, y, mu=1.0):
    x, v = y
    return [v, mu * (1 - x**2) * v - x]

systems = [
    ("(a) 단진자", pendulum, [1.0, 0.0]),
    ("(b) 마찰 진자", lambda t, y: damped_pendulum(t, y, 0.3), [2.0, 0.0]),
    ("(c) van der Pol", lambda t, y: van_der_pol(t, y, 1.0), [0.1, 0.0]),
]

for name, rhs, y0 in systems:
    sol = solve_ivp(rhs, (0, 30.0), y0, rtol=1e-8, atol=1e-10, dense_output=True)
    ts = np.linspace(0, 30, 500)
    y = sol.sol(ts)
    # 위상공간의 *체적* 변화 ~ trace of Jacobian
    # 단진자: trace = 0 (보존)
    # 마찰: trace = -γ < 0 (수축)
    # van der Pol: trace = μ(1-x²) (위치 의존)
    print(f"{name}: t=30 의 위치 = ({y[0, -1]:.3f}, {y[1, -1]:.3f})")

print("\n→ 세 시스템이 *질적으로 다른* 장기 행동을 보임:")
print("  (a) 무한히 진동 (보존)")
print("  (b) 평형점으로 수축")
print("  (c) 극한 주기 (limit cycle) 로 수렴")
```

이 결과는 *동력학 시스템 이론의 핵심 시야* — *질적으로 다른 행동* 의 분류 — 의 출발점을 보여 준다.

## 다음 절(4.3.2)로 가는 다리

동력학 시스템의 *흐름* 을 형식적으로 박는다 — *상류* (phase flow). 그 흐름에 대해 *불변* 인 집합 (평형점, 주기해, attractor) 이 *질적 행동의 골격*. 4.3.2 가 그 정의를 정리.
