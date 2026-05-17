---
title: '1.4.2 — 다양체 위의 함수와 곡선: 매끄러움을 *국소 좌표를 통해* 정의'
description: '다양체 위 함수 $f: M \to \mathbb R$ 와 곡선 $\gamma: I \to M$ 의 *매끄러움* 을, 차트의 좌표 표현이 $C^\infty$ 임으로 정의한다. 좌표 선택에 의존하지 않음 (= well-defined) 이 핵심.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 15
lang: ko
pairSlug: am1tc-1-4-2-functions-and-curves
draft: false
updated: 2026-05-17
---

# 1.4.2 — 다양체 위의 함수와 곡선: 매끄러움을 *국소 좌표를 통해* 정의

> 다양체 위 함수 $f: M \to \mathbb R$ 와 곡선 $\gamma: I \to M$ 의 *매끄러움* 을, 차트의 좌표 표현이 $C^\infty$ 임으로 정의한다. 좌표 선택에 의존하지 않음 (= well-defined) 이 핵심.

## 본문이 말하는 것

$M$ 을 $n$ 차원 매끄러운 다양체라 하자.

**함수** $f : M \to \mathbb R$ 가 점 $p \in U \subset M$ 근방에서 *매끄럽다* (smooth) 는 것은, 차트 $\phi : U \to V \subset \mathbb R^n$ 에 대해 $f \circ \phi^{-1} : V \to \mathbb R$ 이 $\mathbb R^n$ 의 보통 의미로 $C^\infty$ 라는 것. 다른 차트 $\phi'$ 을 잡아도 $f \circ \phi'^{-1} = (f \circ \phi^{-1}) \circ (\phi \circ \phi'^{-1})$ — 전이함수 $\phi \circ \phi'^{-1}$ 이 $C^\infty$ (1.4.1 의 (c)) 라서 합성도 $C^\infty$. 즉 *매끄러움이 좌표 선택과 무관*.

매끄러운 함수의 집합을 $C^\infty(M)$ 이라 적는다.

**곡선** $\gamma : I \to M$ ($I \subset \mathbb R$ 열린 구간) 이 매끄럽다는 것은, 차트 $\phi$ 에 대해 $\phi \circ \gamma : I \to V \subset \mathbb R^n$ 이 $C^\infty$. 좌표로 적으면 $\gamma(t) = (x^1(t), \dots, x^n(t))$ 의 각 성분이 $C^\infty$.

이 두 정의는 미적분의 첫걸음을 다양체로 끌어올리는 출발점이다.

## 한 번 더, 천천히

**(1) 좌표 표현의 *복수성*.** $S^2$ 위 함수 $f(p) = z$ (높이) 를 stereographic 좌표 $(u, v)$ 로 적으면 $f(u, v) = (u^2 + v^2 - 1)/(u^2 + v^2 + 1)$ — 비자명한 매끄러운 함수. 같은 함수를 $(\theta, \phi)$ 좌표로 적으면 $\cos\theta$. 두 표현이 *다른 모양* 이지만 *같은 함수*.

**(2) 매끄러움의 좌표 자유.** 위의 모순 없는 검증: $(u, v) \to (\theta, \phi)$ 전이가 $C^\infty$ 이라 매끄러움이 차트 선택과 독립.

**(3) 곡선의 시각 0에서의 표현.** $\gamma(0) = p$ 라 하면, 좌표로 $\gamma(t) = (x^1(t), \dots, x^n(t))$, $x^i(0) = x^i_p$. 시각 0 의 *속도 성분* 은 $(\dot x^1(0), \dots, \dot x^n(0))$. 이 $n$ 개의 수가 1.4.4 의 *접벡터의 좌표 표현*. 1.4.3 이 그 수를 *방향미분 작용소* 와 동일시한다.

## 파이썬으로 확인 — $S^2$ 위 함수와 곡선의 매끄러움

이 코드의 메시지는 단순하다: 같은 함수 (높이 $z$) 와 같은 곡선 (적도) 을 두 차트에서 적었을 때, 좌표 표현이 모두 $C^\infty$ — 즉 도함수가 모든 차수에 잘 정의 — 임을 수치로 본다.

```python
# 함수 f(p) = z 와 곡선 γ(t) = (sin t cos 0, sin t sin 0, cos t) = (sin t, 0, cos t)
# 차트 A: (θ, φ),  차트 B: (u, v) = stereographic from south pole
# f 의 두 차트 표현:  f_A(θ, φ) = cos θ,   f_B(u, v) = (1 - u² - v²)/(1 + u² + v²)
# γ 의 두 차트 표현:  γ_A(t) = (t, 0),  γ_B(t) = (cos t / (1 + sin t), 0)  (적도라 sin t = sin θ)
# 잠깐: γ 는 적도가 아니라 자오선이다 (φ=0 고정). θ = t.
import numpy as np
import sympy as sp

t = sp.symbols('t', real=True)
# 차트 A: f∘γ_A(t) = cos t
f_A_along_gamma = sp.cos(t)
# 차트 B: 같은 점의 (u, v) 좌표 — south pole 기준 stereographic
# x = sin t, z = cos t  →  u = x/(1-z) = sin t / (1 - cos t), v = 0
u_t = sp.sin(t) / (1 - sp.cos(t))
# f 의 (u, v) 표현: f_B = (1 - u² - v²)/(1 + u² + v²)
f_B_along_gamma = sp.simplify((1 - u_t**2) / (1 + u_t**2))

print(f"차트 A 의 f(γ(t)):  {sp.simplify(f_A_along_gamma)}")
print(f"차트 B 의 f(γ(t)):  {f_B_along_gamma}")  # 같아야 함

# 두 차트에서의 1차 미분이 같은 값인가?
print(f"d/dt 차트 A:  {sp.diff(f_A_along_gamma, t)}")
print(f"d/dt 차트 B:  {sp.simplify(sp.diff(f_B_along_gamma, t))}")
```

이 결과는 두 차트가 *같은 함수* 를 *같은 매끄러운 모습* 으로 본다는 사실을 보인다. 매끄러움이 좌표 선택과 독립이라는 정의의 작은 증거.

## 다음 절(1.4.3)로 가는 다리

함수가 매끄럽다는 것이 박혔으니, 이제 *그 매끄러운 함수의 변화율* — 한 점에서 한 방향으로 — 을 잘 정의할 수 있다. 1.4.3 은 방향미분을 정의하고, 그것이 함수에 대한 *작용소* 라는 사실에서 접벡터의 새 정의가 떨어진다.
