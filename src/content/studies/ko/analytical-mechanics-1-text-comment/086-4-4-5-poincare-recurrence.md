---
title: '4.4.5 — 푸앵카레의 재귀 정리: *언젠가 거의 돌아온다*'
description: "콤팩트한 위상공간에서 체적 보존 흐름은 *거의 모든 초기점* 이 *언젠가 임의로 가까이* 돌아온다. 통계역학의 비가역성과의 *모순처럼 보이지만* 재귀 시간이 천문학적 — 실제로 결코 안 돌아옴."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 86
lang: ko
pairSlug: am1tc-4-4-5-poincare-recurrence
draft: false
updated: 2026-05-18
---

# 4.4.5 — 푸앵카레의 재귀 정리: *언젠가 거의 돌아온다*

> 콤팩트한 위상공간에서 체적 보존 흐름은 *거의 모든 초기점* 이 *언젠가 임의로 가까이* 돌아온다. 통계역학의 비가역성과의 *모순처럼 보이지만* 재귀 시간이 천문학적 — 실제로 결코 안 돌아옴.

## 본문이 말하는 것

**푸앵카레의 재귀 정리** (Poincaré recurrence theorem, 1890). $(M, \mu)$ 가 *유한 측도* (finite measure) 인 측도 공간, $\phi : M \to M$ 가 *측도 보존* 사상. 임의의 *측도가 양인 영역* $A \subseteq M$ 에 대해, *거의 모든 점* $x \in A$ 가 다음 성질을 가진다:

$$
\exists\, n \ge 1: \phi^n(x) \in A
$$

즉 *어떤 미래의 정수 $n$ 에서 $x$ 가 $A$ 로 돌아온다*.

**해밀턴 시스템에의 적용.** $M$ = 콤팩트한 *에너지 등에너지면* $\{H = E\}$, $\mu$ = 리우빌 측도 (체적 보존 § 4.4.4). 임의의 *작은 영역* $A$ 에 대해 *거의 모든 운동이 무한 번 $A$ 로 돌아온다*.

**증명 스케치.** 만약 $x \in A$ 가 *재귀하지 않는다* — 모든 $n$ 에 대해 $\phi^n(x) \notin A$ — 라면, 가족 $\{A, \phi^{-1}(A), \phi^{-2}(A), \dots\}$ 의 *측도가 양인 영역들이 서로 disjoint*. 그러나 측도 보존 → 모두 같은 측도 → *무한 합 측도가 유한 $M$ 의 측도 초과* — 모순. 그래서 *대부분의 점이 재귀*.

## 한 번 더, 천천히

**(1) "임의로 가까이" 의 의미.** 위 정리는 $\phi^n(x) \in A$ — *$A$ 의 어디에든 도달*. 같은 점으로 *정확히* 돌아오는 게 아니라 *$A$ 의 임의로 작은 근방* 으로. 더 정밀한 진술: 임의의 $\varepsilon > 0$ 에 대해 *어떤 $n$ 에서 $|\phi^n(x) - x| < \varepsilon$*.

**(2) Loschmidt 의 모순 (재논의).** Boltzmann 의 H-정리가 *비가역성* 을 예측했다면, 푸앵카레는 *가역성* (재귀) 을 예측. 두 정리가 *모순처럼 보임*. 해결:

- *재귀 시간이 천문학적*. 예: 1 cm³ 의 기체에서 분자가 한 모서리로 모이는 데 *우주 나이 $\times$ $10^{10^{20}}$*. 실제 *관측되지 않는다*.
- 거시 평균이 *세부 정보를 잃는다* — *Boltzmann 의 H-정리는 거시 평균에 대한 진술*.
- 두 진술이 *서로 다른 시간 스케일* — 미시 (재귀) vs 거시 (이완).

**(3) 콤팩트 조건의 *결정적* 역할.** $M$ 이 *비콤팩트* (예: $\mathbb R^{2n}$ 의 무한 영역) 이면 재귀 정리가 *깨질 수 있다*. 입자가 *무한대로 도망갈* 가능. 단진자의 경우 *에너지 등에너지면* 이 콤팩트 ($S^1$ 또는 $\mathbb R$, but 일정 에너지에서) 이라 재귀가 작동.

**(4) Birkhoff 의 에르고드 정리.** 재귀의 *정량적* 확장. 거의 모든 운동이 *시간 평균 = 공간 평균* (위상공간 측도) — *에르고드 가설*. 통계역학의 *근본 가정*. 그러나 *완전 에르고드성* 은 *모든 시스템에서 성립하지 않는다* — KAM 환 영역이 비-에르고드.

**(5) 양자 재귀.** 양자 시스템의 *Hilbert 공간이 유한 차원* 이면 *유니타리 진화* 가 자동으로 재귀 (이산 에너지 스펙트럼). *Quantum revival* — 양자 상태가 *원래 상태에 정확히 돌아오는 시간*. 고전 재귀의 *양자판*.

**(6) 우주론으로의 *추론*.** 우주 전체가 *닫힌 유한 시스템* 이라면 (어떤 우주 모델에서) 푸앵카레 재귀가 적용 — *우주의 무한 반복*. *영원회귀* (eternal recurrence) — Nietzsche 의 철학적 명제의 *물리학적 표현*. 그러나 우주가 *팽창* 한다면 (현대 우주론) *비콤팩트* 이라 재귀가 *깨질 수 있다*.

## 파이썬으로 확인 — 작은 콤팩트 시스템의 재귀

이 코드의 메시지는 단순하다: *2자유도 콤팩트 시스템* (이중진자 또는 작은 영역의 단진자 모음) 에서 *재귀 시간* 을 수치 측정. 작은 시스템에서는 *현실적인 시간* 안에 재귀가 관측되지만, 입자 수가 늘면 *재귀 시간이 폭발*.

```python
# 단진자의 작은 영역에서 시작한 운동의 *재귀 시간* 측정
# 초기 위치 (θ_0, p_0) 에서 시작, 시간이 흐르며 *원래 위치 가까이* 돌아오는 첫 시각
import numpy as np
from scipy.integrate import solve_ivp

def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

# 초기점
y0 = [0.5, 0.3]
y0_arr = np.array(y0)

# 매우 긴 시간 동안 적분, 임계 거리 ε 안에 들어오는 시점 추적
T_max = 100.0
sol = solve_ivp(pendulum, (0, T_max), y0, rtol=1e-9, atol=1e-11, dense_output=True)

ts = np.linspace(0.5, T_max, 10000)  # t > 0.5 부터 (시작점 자체 제외)
y_t = sol.sol(ts)
distances = np.sqrt((y_t[0] - y0_arr[0])**2 + (y_t[1] - y0_arr[1])**2)

epsilon = 0.01
recurrence_idx = np.where(distances < epsilon)[0]

if len(recurrence_idx) > 0:
    first_recurrence_t = ts[recurrence_idx[0]]
    print(f"초기점 (θ, p) = {y0}")
    print(f"임계 거리 ε = {epsilon}")
    print(f"첫 재귀 시각 (단진자, ε 안): t = {first_recurrence_t:.4f}")
    print(f"  → 단진자는 *주기 운동* — 매우 짧은 재귀 시간 (= 진동 주기)")
else:
    print(f"t ≤ {T_max} 안에 재귀 없음.")

# 비교: 2자유도 카오스 시스템의 재귀
# Henon-Heiles: H = (1/2)(p_x² + p_y²) + (1/2)(x² + y²) + x²y - y³/3
def henon_heiles(t, y):
    x, y_pos, px, py = y
    return [px, py, -x - 2 * x * y_pos, -y_pos - x**2 + y_pos**2]

y0_hh = [0.1, -0.15, 0.1, 0.2]
y0_hh_arr = np.array(y0_hh)
sol_hh = solve_ivp(henon_heiles, (0, T_max), y0_hh,
                   rtol=1e-9, atol=1e-11, dense_output=True)
y_t_hh = sol_hh.sol(ts)
distances_hh = np.linalg.norm(y_t_hh - y0_hh_arr[:, None], axis=0)
recurrence_hh = np.where(distances_hh < epsilon * 2)[0]  # ε 조금 키움

print(f"\n비교: Hénon-Heiles (2자유도 카오스 시스템)")
if len(recurrence_hh) > 0:
    print(f"  첫 재귀 시각: t = {ts[recurrence_hh[0]]:.4f}")
else:
    print(f"  t ≤ {T_max} 안에 재귀 없음 — 카오스라 재귀 시간 *훨씬 길다*")
print("  → 푸앵카레 정리는 재귀를 *보장* 하지만 *시간을 보장 안 함*.")
```

이 결과는 (a) *주기 시스템 (단진자) 의 재귀가 *주기 자체*, (b) *카오스 시스템 (Hénon-Heiles) 의 재귀가 *훨씬 길다* — 푸앵카레 재귀의 *정성적·정량적* 모습을 모두 보여 준다.

## 다음 章 (5 章) 로 가는 다리

§4 의 해밀턴 형식 (위상공간 + 심플렉틱 구조 + 정준 방정식 + 리우빌 + 푸앵카레 재귀) 가 모두 정리됐다. 다음 §5 는 그 위에서의 *변환 이론* — *정준 변환* (canonical transformation). 위상공간의 좌표를 *심플렉틱 구조를 보존하는* 사상으로 바꾸는 형식. 본권 *해석역학 I* 의 마지막 章 — 라그랑주·해밀턴 형식이 *변환의 자유* 에 의해 완전히 통합되는 자리.

§5 의 핵심: 정준 변환의 *생성 함수* 형식, 심플렉틱 사상, 정준 불변량 (작용 적분, 라그랑주 괄호, 사교 적분), 그리고 마지막으로 리우빌 정리의 *재논의* — 적분 가능 시스템의 *작용-각 변수* 시점에서.
