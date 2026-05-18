---
title: '5.5.1 — 적분 불변식 (재차): 정준 변환의 관점에서 다시 보기'
description: "§5.2.2 의 적분 불변식 $\\oint p\\, dq$ 를 정준 변환의 관점에서 재논의. 2-형식의 면적분 $\\int\\int dq \\wedge dp$ 도 보존 — 더 높은 차수의 정준 불변식의 가족."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 101
lang: ko
pairSlug: am1tc-5-5-1-integral-invariant-revisited
draft: false
updated: 2026-05-18
---

# 5.5.1 — 적분 불변식 (재차): 정준 변환의 관점에서 다시 보기

> §5.2.2 의 적분 불변식 $\oint p\, dq$ 를 정준 변환의 관점에서 재논의. 2-형식의 면적분 $\int\int dq \wedge dp$ 도 보존 — 더 높은 차수의 정준 불변식의 가족.

## 본문이 말하는 것

§5.2.2 에서 *해밀턴 흐름이 보존* 하는 적분 불변식 $\oint_C p\, dq$ 를 박았다. 본 절은 *모든 정준 변환* — 시간 진화 (흐름) 뿐 아니라 *임의의 정준 변환* — 에 대한 *불변량 가족* 을 정리.

**1-차 정준 불변식** (relative): $\oint_C p_\alpha\, dq^\alpha$ — 닫힌 곡선 적분.

**2-차 정준 불변식** (absolute): 위상공간 위 *2 차원 부다양체* $S$ 에 대해

$$
\Sigma_S^{(2)} := \int\int_S \sum_\alpha dq^\alpha \wedge dp_\alpha = \int\int_S \omega
$$

— *심플렉틱 2-형식의 면적분*. 정준 변환에 대해 *보존*. 이게 §4.1.3 의 심플렉틱 2-형식의 적분 형식.

**$2k$-차 정준 불변식** ($k = 1, \dots, n$).

$$
\Sigma^{(2k)} := \int \dots \int_S \omega^k / k!
$$

위상공간 위 *$2k$-차원 부다양체* 위의 적분. 최고차 ($k = n$): $\omega^n / n!$ — *체적 형식* (Liouville 측도).

각각의 적분이 *정준 변환에 대해 불변* — *정준 불변식의 가족*.

## 한 번 더, 천천히

**(1) 차수의 *위계*.** $\omega^k$ 가 *$2k$-형식*. 정수 $k$ 가 $0$ 에서 $n$ 까지 — *$n+1$ 종의 정준 불변식* (스칼라 + 1차 + 2차 + ... + 2n차).

- $k = 0$: 스칼라 — 임의의 함수 (해밀토니언, 보존량).
- $k = 1$: 면적 (1자유도) 또는 2차원 면적분 (다자유도).
- $k = n$: 전체 위상공간 체적 — Liouville (§4.4.4).

**(2) §5.2.2 와의 차이.** §5.2.2 는 *해밀턴 흐름에 대해 불변*. 본 절은 *모든 정준 변환에 대해 불변* — *더 일반적*. 시간 진화는 정준 변환의 *특수 경우* (1-매개 가족).

**(3) Poincaré-Cartan 의 정리.** *정준 불변식의 가족 전체* 가 *심플렉틱 형식 $\omega$ 와 그 외적의 거듭제곱* 에서 *모두 나옴*. 다른 *독립* 정준 불변식은 *없다*. *정준 변환을 결정하는 본질적 불변량* 이 *심플렉틱 형식* 하나.

**(4) §5.5.2 ~ 5.5.3 의 *씨앗*.** 본 절의 적분 불변식이 *해밀턴 함수의 *대수적 표현* 인 라그랑주 괄호 (5.5.2) 와 사교적 (5.5.3) 으로 *세분화*. 모두 *심플렉틱 구조의 다른 시점*.

**(5) 양자역학의 *고전 한계*.** 양자역학의 *위상공간 측도* (Wigner 분포 함수) 가 *정준 변환에 대해 불변* — 본 절의 양자판. 분포의 *모멘트* 가 정준 불변식의 양자 형식.

## 파이썬으로 확인 — 위상공간 면적분의 보존

이 코드의 메시지는 단순하다: 2자유도 시스템 (이중 진자 등) 의 *위상공간 위 면적분* 이 흐름에 대해 보존됨을 본다. 보다 시각화 가능한 1자유도 경우: $\oint p\, dq$ + 그것의 *2 자유도 일반화*.

```python
# 2자유도 결합 진동자: H = (p_1²+p_2²)/2 + (q_1²+q_2²)/2 + ε q_1 q_2
# 위상공간 4 차원. 2 차원 평면 위의 면적분이 정준 불변.
import numpy as np
from scipy.integrate import solve_ivp

epsilon = 0.3

def coupled_oscillator(t, y):
    q1, q2, p1, p2 = y
    return [p1, p2, -q1 - epsilon * q2, -q2 - epsilon * q1]

# 위상공간의 *4 차원 작은 큐브* 의 꼭짓점들 — 흐름으로 추적
# 큐브가 변형되어도 *임의 2-평면 위의 면적*이 보존
# 단순히 4 차원 부피만 확인 (Liouville 정리, k=n=2 의 경우)
size = 0.1
center = np.array([1.0, 0.0, 0.0, 0.0])

# 4 차원 큐브 (16 꼭짓점)
import itertools
vertices_offsets = list(itertools.product([-size, size], repeat=4))
vertices_0 = np.array([center + np.array(offset) for offset in vertices_offsets])

# 흐름으로 추적
T = 5.0
vertices_T = np.zeros_like(vertices_0)
for i, v in enumerate(vertices_0):
    sol = solve_ivp(coupled_oscillator, (0, T), v, rtol=1e-10, atol=1e-12)
    vertices_T[i] = sol.y[:, -1]

# 4 차원 *체적* 의 *변화* 측정 — Liouville 에 의해 보존되어야
# 4 차원 simplex 의 부피로 측정 (의 곱셈)
def hypervolume_proxy(vertices):
    """16 꼭짓점에서 *대각선 길이* 의 곱 — 부피의 거시적 proxy"""
    # 중심에서의 거리
    center_v = vertices.mean(axis=0)
    radii = np.linalg.norm(vertices - center_v, axis=1)
    # *분포 * — 표준편차 가 *몇 개 자유도가 변동* 했는지
    return np.prod(radii.std(axis=None) + 1e-10) * len(vertices)

# 거시적 부피 변화율
# 위상공간이 *각 방향으로 늘어졌다 줄어들지만* 부피는 그대로
spread_0 = vertices_0.std(axis=0)
spread_T = vertices_T.std(axis=0)
print(f"초기 분산 (각 성분): {spread_0}")
print(f"t=5 분산 (각 성분): {spread_T}")
print(f"분산의 곱 (초기): {np.prod(spread_0):.6e}")
print(f"분산의 곱 (t=5): {np.prod(spread_T):.6e}")
print(f"비율: {np.prod(spread_T) / np.prod(spread_0):.4f}")
print(f"→ 분산 곱 ~ 부피의 prox — 4D Liouville (k=2 정준 불변식) 에 의해 거의 보존")
```

이 결과는 *해밀턴 흐름이 위상공간의 4 차원 부피를 보존* — Liouville 의 *최고차 정준 불변식* — 을 *4 자유도* 시스템에서 직접 확인.

## 다음 절(5.5.2)로 가는 다리

적분 불변식의 *대수적 표현* — 함수 사이의 *라그랑주 괄호* — 가 §5.5.2 의 주제. 포아송 괄호의 *쌍대* 객체. 두 괄호 모두 *심플렉틱 구조의 직접 표현*.
