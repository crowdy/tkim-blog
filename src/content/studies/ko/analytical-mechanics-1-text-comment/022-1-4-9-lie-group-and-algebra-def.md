---
title: '1.4.9 — 리 군과 리 대수: 정의·구조'
description: '군이자 매끄러운 다양체이고, 곱·역원이 매끄러운 객체 — 리 군. 단위원에서의 접공간이 *리 대수* $\mathfrak g$, 좌평행이동이 그 구조를 모든 점으로 옮긴다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 22
lang: ko
pairSlug: am1tc-1-4-9-lie-group-and-algebra-def
draft: false
updated: 2026-05-17
---

# 1.4.9 — 리 군과 리 대수: 정의·구조

> 군이자 매끄러운 다양체이고, 곱·역원이 매끄러운 객체 — 리 군. 단위원에서의 접공간이 *리 대수* $\mathfrak g$, 좌평행이동이 그 구조를 모든 점으로 옮긴다.

## 본문이 말하는 것

**리 군** (Lie group) $G$ 는 다음 두 가지가 *호환되는* 객체:

- $G$ 가 *군*: 단위원 $e$, 곱 $\mu(g, h) = gh$, 역원 $\iota(g) = g^{-1}$.
- $G$ 가 *매끄러운 다양체*: 1.4.1 의 의미.
- 두 매핑 $\mu : G \times G \to G$ 와 $\iota : G \to G$ 가 *매끄럽다*.

**예시.** $\mathbb R^n$ (덧셈), $S^1 \subset \mathbb C^\times$ (곱셈), $GL(n, \mathbb R)$ (행렬 곱), $O(n)$, $SO(n)$, $U(n)$, $SU(n)$.

각 $g \in G$ 에 대해 **좌평행이동** (left translation) $L_g : G \to G$, $L_g(h) := gh$. 이게 매끄러운 미분동형사상 — 흐름의 어휘로 *전체 매니폴드 G 를 자기 자신으로 옮긴다*. 우평행이동 $R_g(h) := hg$ 도 마찬가지.

**리 대수** $\mathfrak g := T_e G$ — 단위원에서의 접공간. 차원은 $\dim G$.

리 대수의 구조 (= 리 괄호) 는 *좌불변 벡터장* 을 거쳐 정의되는데, 그 자세한 설명은 다음 1.4.10 의 주제다. 본 절은 *정의·구조* 의 첫 단계만 박는다.

## 한 번 더, 천천히

**(1) 행렬 군의 정체.** $GL(n, \mathbb R)$ 은 $n^2$ 차원 매끄러운 다양체 (행렬의 성분으로 매개화). 그 안의 $SO(n) = \{A : A^T A = I, \det A = 1\}$ 은 $n(n-1)/2$ 차원 부분다양체. 두 행렬 곱이 다항식이라 *매끄러움 자명*. 행렬 군이 *리 군의 가장 흔한 예*.

**(2) 단위원의 *특권*.** 임의 점 $g \in G$ 의 접공간 $T_g G$ 는 좌평행이동 $(L_g)_* : T_e G \to T_g G$ 로 단위원의 접공간 $T_e G = \mathfrak g$ 에서 *유도된다*. 즉 *전체 군의 접공간 구조가 단위원 하나에 *압축되어 있다*. 이게 리 군의 핵심 단순화.

**(3) $\mathfrak g$ 와 $\mathbb R^n$ 의 차이.** 벡터공간으로서 $\mathfrak g \cong \mathbb R^{\dim G}$, 그러나 *추가 구조* — 리 괄호 — 가 박혀 있다. 그 괄호가 *군 자체의 비가환성을 단위원 근방에서 인코딩*. 다음 1.4.10 이 그 인코딩을 명시한다.

**(4) 단위원 근방의 매개화.** $\mathfrak g$ 위의 벡터 $X$ 에 대응하는 *1-매개변수 부분군* $\exp(tX) \in G$ 가 단위원 근방을 매개화. 이 *지수사상* 이 1.4.11 의 주제.

## 파이썬으로 확인 — $SO(2)$ 의 리 대수

이 코드의 메시지는 단순하다: $SO(2) = \{R(\theta) : \theta \in [0, 2\pi)\}$ 의 단위원 ($\theta = 0$) 에서의 접공간 — 즉 회전행렬을 $\theta$ 로 미분해 $\theta=0$ 에 대입한 결과 — 가 *반대칭 행렬* 한 가족임을 본다.

```python
# SO(2) 의 매개화: R(θ) = [[cos θ, -sin θ], [sin θ, cos θ]]
# 리 대수 so(2) = dR/dθ |_{θ=0}
import sympy as sp

theta = sp.symbols('theta', real=True)
R = sp.Matrix([[sp.cos(theta), -sp.sin(theta)],
               [sp.sin(theta), sp.cos(theta)]])

# 생성자 X = dR/dθ |_{θ=0}
X = sp.diff(R, theta).subs(theta, 0)
print("so(2) 의 생성자 X = dR/dθ|_0:")
print(X)
# 결과: [[0, -1], [1, 0]] — 반대칭 행렬

# 검증: X 가 반대칭인가? (so(2) 정의에 의해 그래야 함)
print(f"X + X.T = 0?  {(X + X.T) == sp.zeros(2)}")  # True

# 지수사상 (1.4.11 의 미리보기): R(θ) = exp(θ X)?
exp_theta_X = (theta * X).exp()  # sympy 행렬 지수
print(f"\nexp(θ X) =")
print(sp.simplify(exp_theta_X))
print(f"\n원래 R(θ) 와 같은가? {sp.simplify(exp_theta_X - R) == sp.zeros(2)}")  # True
```

이 결과는 (a) $\mathfrak{so}(2)$ = 2×2 반대칭 행렬의 1차원 공간, (b) 그 지수사상이 $SO(2)$ 의 매개화 라는 사실을 모두 확인한다. 다음 1.4.10 이 이를 일반 $\mathfrak g$ 의 *좌불변* 벡터장 시점에서 다시 본다.

## 다음 절(1.4.10)로 가는 다리

리 대수 $\mathfrak g$ 가 *벡터공간* 임은 정의에서 즉시. 그러나 그 위의 *리 괄호* 가 어디서 오는가 — *좌불변 벡터장의 교환자* 가 답이다. 다음 1.4.10 은 좌불변 벡터장과 $\mathfrak g$ 의 동형, 그리고 그것이 구조 상수 $c^k_{ij}$ 를 통해 인코딩됨을 박는다.
