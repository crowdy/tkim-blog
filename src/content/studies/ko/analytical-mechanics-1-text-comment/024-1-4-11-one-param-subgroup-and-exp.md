---
title: '1.4.11 — 1-매개변수 부분군과 지수사상: $\mathfrak g$ 와 $G$ 를 잇는 다리'
description: '리 대수의 한 점 $\xi$ 가 *지수사상* $\exp : \mathfrak g \to G$ 로 군의 한 점을 만든다. $\mathfrak{so}(n)$ → $SO(n)$ 의 경우 행렬 지수와 일치 — 단위원 근방의 미적분과 군의 매끄러운 구조가 정확히 맞물리는 자리.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 24
lang: ko
pairSlug: am1tc-1-4-11-one-param-subgroup-and-exp
draft: false
updated: 2026-05-17
---

# 1.4.11 — 1-매개변수 부분군과 지수사상: $\mathfrak g$ 와 $G$ 를 잇는 다리

> 리 대수의 한 점 $\xi$ 가 *지수사상* $\exp : \mathfrak g \to G$ 로 군의 한 점을 만든다. $\mathfrak{so}(n)$ → $SO(n)$ 의 경우 행렬 지수와 일치 — 단위원 근방의 미적분과 군의 매끄러운 구조가 정확히 맞물리는 자리.

## 본문이 말하는 것

리 군 $G$ 의 **1-매개변수 부분군** (one-parameter subgroup) 은 매끄러운 군 준동형사상

$$
\gamma : \mathbb R \to G,\quad \gamma(s + t) = \gamma(s) \gamma(t),\quad \gamma(0) = e
$$

각 $\xi \in \mathfrak g$ 에 대해 *유일한* 1-매개변수 부분군 $\gamma_\xi$ 가 존재하여 $\dot\gamma_\xi(0) = \xi$. 그 부분군이 좌불변 벡터장 $X_\xi$ 의 (단위원 출발) 적분곡선 (1.4.6).

**지수사상** (exponential map) $\exp : \mathfrak g \to G$:

$$
\exp(\xi) := \gamma_\xi(1)
$$

즉 $\xi$ 방향으로 단위 시간만큼 흐른 결과. 일반적으로

$$
\exp(t \xi) = \gamma_\xi(t)
$$

**행렬 군의 경우.** $G = GL(n, \mathbb R), SO(n), U(n), \dots$ 의 리 대수는 $n \times n$ 행렬의 부분공간. 지수사상은 *행렬 지수*

$$
\exp(A) = I + A + \frac{A^2}{2!} + \frac{A^3}{3!} + \cdots = \sum_{k=0}^\infty \frac{A^k}{k!}
$$

수렴은 모든 행렬에서 절대수렴. 이 급수가 *추상적* 지수사상의 *명시적* 형태.

**기본 성질.**

- $\exp : \mathfrak g \to G$ 가 단위원 근방에서 미분동형사상 ($d\exp_0 = \text{id}$).
- $[\xi, \eta] = 0$ 이면 $\exp(\xi + \eta) = \exp(\xi)\exp(\eta)$ (가환의 경우만).
- $[\xi, \eta] \neq 0$ 이면 BCH (Baker–Campbell–Hausdorff) 공식: $\exp(\xi)\exp(\eta) = \exp(\xi + \eta + \frac{1}{2}[\xi, \eta] + \cdots)$.

## 한 번 더, 천천히

**(1) 지수사상의 *국소* 성격.** $\exp : \mathfrak g \to G$ 는 단위원 근방에서는 *전단사* 이지만, 전역적으로는 그렇지 않다. 예: $\mathfrak{so}(2) = \mathbb R$ (반대칭 1×1 행렬은 0 만이지만 2×2 일 때 1차원), $SO(2) = S^1$ 이라 $\exp$ 가 $2\pi$ 주기로 *전사가 아닌 다단사*. $\exp(2\pi X) = \exp(0) = I$.

**(2) 군의 *국소* 구조 ↔ $\mathfrak g$.** 단위원 근방에서 $G$ 와 $\mathfrak g$ 가 *동등한 정보* 를 갖는다. 그래서 군 곱의 *국소* 비가환성 ($g h g^{-1} h^{-1}$ 의 단위원과의 거리) 이 $\mathfrak g$ 의 리 괄호로 측정됨. 1.4.10 의 구조 상수가 *전역 군 구조* 까지 결정하지는 않지만 *국소 구조* 는 완전히 결정.

**(3) 1.4.6 과의 정확한 일치.** 1.4.6 의 1-매개변수 변환군이 *임의의 벡터장 흐름*. 1.4.11 의 1-매개변수 부분군은 *리 군 위의 좌불변 벡터장 흐름*. 후자가 *군 구조* 와의 호환성이라는 추가 조건을 가질 뿐, 기하학적 정체는 같다.

**(4) 물리에서의 출현.** 양자역학의 시간 발전 $U(t) = \exp(-iHt/\hbar)$, 회전 표현 $R(\hat n, \theta) = \exp(-i\theta \hat n \cdot \vec L)$, 게이지 변환 $U = \exp(i \alpha^a T^a)$. 모두 같은 *리 대수 → 리 군 → 변환 작용* 의 구조.

## 파이썬으로 확인 — $\mathfrak{so}(3)$ 의 지수사상 = $SO(3)$ 회전

이 코드의 메시지는 단순하다: $\mathfrak{so}(3)$ 의 한 원소 $X = \theta \hat n \cdot \vec L$ 를 지수화하면 $\hat n$ 축으로 각도 $\theta$ 만큼 회전하는 $SO(3)$ 원소가 나온다 — Rodrigues 공식과 일치.

```python
# X = θ (n_x L_1 + n_y L_2 + n_z L_3), |n| = 1
# exp(X) 가 (n, θ) 축·각 회전이어야 함 — Rodrigues 공식
import numpy as np
from scipy.linalg import expm

# so(3) 기저
L1 = np.array([[0, 0, 0], [0, 0, -1], [0, 1, 0]], dtype=float)
L2 = np.array([[0, 0, 1], [0, 0, 0], [-1, 0, 0]], dtype=float)
L3 = np.array([[0, -1, 0], [1, 0, 0], [0, 0, 0]], dtype=float)

# 회전축, 각도
n = np.array([1, 1, 1]) / np.sqrt(3)
theta = np.pi / 3  # 60°

# X = θ (n·L)
X = theta * (n[0] * L1 + n[1] * L2 + n[2] * L3)
R = expm(X)

print("exp(X) =")
print(R)
print(f"\n행렬식: {np.linalg.det(R):.6f}  (= 1 기대 — SO(3) 원소)")
print(f"R @ R.T = I 의 max 오차: {np.max(np.abs(R @ R.T - np.eye(3))):.2e}")

# Rodrigues 공식 검증: R = I + sinθ K + (1 - cosθ) K²,  K = n·L
K = n[0] * L1 + n[1] * L2 + n[2] * L3
R_rodrigues = np.eye(3) + np.sin(theta) * K + (1 - np.cos(theta)) * (K @ K)
print(f"\nRodrigues 공식과의 max 오차: {np.max(np.abs(R - R_rodrigues)):.2e}")

# 회전축 $\hat n$ 이 R 의 고유벡터 (고윳값 1) 인가?
print(f"R @ n - n 의 max 오차: {np.max(np.abs(R @ n - n)):.2e}")
```

이 결과는 *추상적 지수사상* $\exp : \mathfrak{so}(3) \to SO(3)$ 이 *명시적* Rodrigues 공식과 정확히 일치함을 보인다. 단위원 근방의 미적분 ($\mathfrak g$) 이 전역 군 ($G$) 의 모습을 완전히 결정하는 — 본 §1.4 의 핵심 메시지를 마무리.

## 다음 절(1.5.1)로 가는 다리

§1.4 까지의 모든 도구 — 차트, 함수, 벡터장, 흐름, 리 군 — 가 *공간 위의 객체* 였다. 다음 §1.5 는 그 공간의 *쌍대* — 함수에 작용하는 *선형* 객체 — 를 박는다. 벡터의 쌍대인 *코벡터*, 그리고 그 텐서곱이 *미분형식* 의 출발점.
