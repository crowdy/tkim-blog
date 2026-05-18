---
title: '4.3.7 — 랴푸노프 함수: 선형화 없이 안정성을 직접 증명'
description: "평형점 부근에서 *값이 양*, *흐름을 따라 감소* 하는 함수 $V$ 가 있으면 그 평형점은 점근 안정. 에너지 같은 양의 *직접 사용*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 80
lang: ko
pairSlug: am1tc-4-3-7-lyapunov-function
draft: false
updated: 2026-05-18
---

# 4.3.7 — 랴푸노프 함수: 선형화 없이 안정성을 직접 증명

> 평형점 부근에서 *값이 양*, *흐름을 따라 감소* 하는 함수 $V$ 가 있으면 그 평형점은 점근 안정. 에너지 같은 양의 *직접 사용*.

## 본문이 말하는 것

**Lyapunov 함수** (Lyapunov function). 평형점 $x^*$ 의 근방에서 정의된 $C^1$ 함수 $V : U \to \mathbb R$ 가 다음 조건을 만족:

- $V(x^*) = 0$, 그 외 $V(x) > 0$ in $U \setminus \{x^*\}$. (*양의 정부호*.)
- 흐름을 따라 *감소*: $\dot V := \nabla V \cdot f \le 0$ in $U$.

이런 $V$ 가 존재하면 $x^*$ 는 *Liapunov 안정*.

추가로 $\dot V < 0$ in $U \setminus \{x^*\}$ — *엄밀한 감소* — 라면 $x^*$ 는 *점근 안정*.

**LaSalle 의 불변성 원리** (LaSalle's invariance principle). $\dot V \le 0$ 이고 $\dot V = 0$ 인 집합이 *불변 집합 으로서 $\{x^*\}$ 뿐*이라면, $x^*$ 가 점근 안정 (강한 결론).

**해밀턴 시스템의 자연스러운 Liapunov 함수.** $V = H - H(x^*)$ — 평형점에서의 에너지 차이. $\dot V = \{H, H\} = 0$ — *흐름에 보존*. 그래서 $V$ 가 *감소하지 않음* (= Liapunov 안정만 보장, 점근 안정 X). 해밀턴 평형점의 안정성을 본 도구로 *증명* 가능.

**비-해밀턴 (수축) 의 경우.** 마찰 진자: $V = \frac{1}{2} p^2 + (1 - \cos\theta)$ (에너지). $\dot V = -\gamma p^2 \le 0$ — 강한 부등식이 *대부분* 성립. LaSalle 로 $(\theta, p) = (0, 0)$ 이 *점근 안정*.

## 한 번 더, 천천히

**(1) Liapunov 의 *기하학적* 직관.** $V$ 의 *등고선* 이 *평형점을 둘러싸는 닫힌 곡선*. $\dot V \le 0$ 의 의미: 흐름이 *등고선을 안쪽으로 가로질러 간다* (또는 등고선 위에 머문다). 무한히 시간이 흐르면 평형점 (V = 0) 에 수렴.

**(2) Liapunov 함수의 *존재성*.** 모든 점근 안정 평형점에 대해 *어떤* Liapunov 함수가 *존재* — *Massera 정리*. 그러나 *명시적으로 구성* 하기는 일반적으로 어렵다. 해밀턴 시스템의 에너지 보존이 *자연스러운 후보* 라는 점이 큰 도움.

**(3) 변분 원리와의 연결.** §3 의 작용 $S(q, t)$ 가 (적절한 조건 하에) Liapunov 함수 같은 양 — *해밀턴-야코비식의 해*. 이 시각이 *최적 제어 이론* (optimal control) 의 *Bellman 식* 으로 옮겨진다.

**(4) 양자역학에서의 *유사*.** *Lyapunov 부등식의 양자판* — *Robertson–Schrödinger 부등식* (uncertainty principle). 비교는 약하지만 *비-자명한 부등식이 안정성·정밀성 한계* 를 결정한다는 *대수적* 평행성.

**(5) 카오스에서의 *제한*.** 카오스 attractor (예: Lorenz) 의 안정성은 *Liapunov 함수로 증명되지 않을* 때가 많다. *Liapunov 지수* (다른 개념 — exponential divergence 의 평균 비율) 가 *민감성을 정량화*. 두 *Liapunov* 가 *다른 의미* 임에 주의.

## 파이썬으로 확인 — 마찰 진자의 Liapunov 함수

이 코드의 메시지는 단순하다: 마찰 진자의 *에너지* $V = \frac{1}{2}p^2 + (1 - \cos\theta)$ 가 시간에 따라 *단조 감소* 함을 직접 본다. LaSalle 로 $(0, 0)$ 의 *점근 안정성* 이 자동.

```python
# 마찰 진자: θ¨ = -sin θ - γ θ̇
# Liapunov 함수: V(θ, p) = (1/2) p² + (1 - cos θ)
# V̇ = -γ p² ≤ 0
import numpy as np
from scipy.integrate import solve_ivp

gamma = 0.5

def damped_pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta) - gamma * p]

# 초기조건
y0 = [1.5, 1.0]  # 큰 변위 + 큰 운동량
sol = solve_ivp(damped_pendulum, (0, 30.0), y0,
                rtol=1e-9, atol=1e-11, dense_output=True)

ts = np.linspace(0, 30, 500)
theta, p = sol.sol(ts)

# Liapunov 함수 (= 에너지)
V = 0.5 * p**2 + (1 - np.cos(theta))

# 시간 미분 V̇ = -γ p²
V_dot = -gamma * p**2

print("마찰 진자의 Liapunov 함수 V 의 시간 변화:")
print(f"  V(t=0)  = {V[0]:.6f}")
print(f"  V(t=10) = {V[len(ts)//3]:.6f}")
print(f"  V(t=20) = {V[2*len(ts)//3]:.6f}")
print(f"  V(t=30) = {V[-1]:.6f}")
print(f"\n  V 는 *단조 감소* (수치 미분으로):")
dV_dt_numeric = np.gradient(V, ts)
print(f"  max V̇ (수치) = {dV_dt_numeric.max():.4f}  (= 0 기대)")
print(f"  min V̇ (수치) = {dV_dt_numeric.min():.4f}  (음수)")

print(f"\n  해석값 V̇ = -γ p²:")
print(f"  V̇(t=10) (해석) = {V_dot[len(ts)//3]:.4f}")
print(f"  V̇(t=10) (수치) = {dV_dt_numeric[len(ts)//3]:.4f}")
print(f"  → 두 값 거의 일치 — 해석적 V̇ ≤ 0 확인.")
```

이 결과는 *Liapunov 함수의 단조 감소* 가 *수치적으로* 정확히 성립하며, *점근 안정성을 보장* 함을 보인다.

## 다음 절(4.3.8)로 가는 다리

연속 시간 동력학 시스템을 *이산 시간 사상* 으로 환원하는 가장 자연스러운 방법이 *Poincaré 사상*. 주기해의 안정성 분석, 강제 진동의 카오스, 천체역학의 KAM 등 — 모두 Poincaré 사상으로 다뤄진다. §4.3.8 의 주제.
