---
title: '1.4.7 — 당김과 미분사상: 매끄러운 사상이 *함수·벡터* 를 옮기는 두 방향'
description: '두 다양체 사이 매끄러운 사상 $f : M \to N$ 이 (a) 함수 $g : N \to \mathbb R$ 를 *역방향* 으로 *당기고* (pullback), (b) 벡터 $X_p \in T_p M$ 을 *순방향* 으로 *밀어* (pushforward / differential). 방향의 차이가 공변과 반변의 차이.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 20
lang: ko
pairSlug: am1tc-1-4-7-pullback-and-differential
draft: false
updated: 2026-05-17
---

# 1.4.7 — 당김과 미분사상: 매끄러운 사상이 *함수·벡터* 를 옮기는 두 방향

> 두 다양체 사이 매끄러운 사상 $f : M \to N$ 이 (a) 함수 $g : N \to \mathbb R$ 를 *역방향* 으로 *당기고* (pullback), (b) 벡터 $X_p \in T_p M$ 을 *순방향* 으로 *밀어* (pushforward / differential). 방향의 차이가 공변과 반변의 차이.

## 본문이 말하는 것

$f : M \to N$ 이 매끄러운 사상이라 하자.

**당김** (pullback) $f^* : C^\infty(N) \to C^\infty(M)$:

$$
(f^* g)(p) := g(f(p)) \quad \text{for } g \in C^\infty(N),\, p \in M
$$

$g$ 는 $N$ 의 함수, $f^* g$ 는 $M$ 의 함수. 화살표 방향이 $f$ 의 *반대*. 함수가 *공변* (covariant) 인 까닭이 여기에 있다.

**미분사상** (differential / pushforward) $f_* = df : TM \to TN$, 점 $p$ 에서

$$
(f_* X_p)[g] := X_p[g \circ f] = X_p[f^* g] \quad \text{for } X_p \in T_p M,\, g \in C^\infty(N)
$$

$X_p$ 는 $T_p M$ 의 벡터, $f_* X_p$ 는 $T_{f(p)} N$ 의 벡터. 화살표 방향이 $f$ 와 *같음*. 벡터가 *반변* (contravariant) 인 까닭.

좌표 표현: $p$ 의 차트 $(x^i)$, $f(p)$ 의 차트 $(y^j)$ 에서 $f$ 가 $y^j = f^j(x^1, \dots, x^m)$ 로 적히면

$$
(f_* X_p)^j = \frac{\partial f^j}{\partial x^i}(p)\, X^i
$$

자코비안 행렬이 미분사상의 좌표 표현.

## 한 번 더, 천천히

도해를 그려 두면 — 두 다양체와 그 사이 사상이 만드는 *압축/펴기* 의 그림이다.

**(a) 평면 → 원기둥 사상.** $f : \mathbb R^2 \to S^1 \times \mathbb R$, $(u, v) \mapsto (e^{iu}, v)$. 이 사상에서 평면 위 함수 $g(\theta, z) = \cos\theta + z$ 를 *당기면* $(f^* g)(u, v) = \cos u + v$ — 함수의 좌표 표현이 바뀐다. 평면 위 벡터 $\partial_u$ 를 *미분사상* 으로 밀면 원기둥 위 $\partial_\theta$ — 각 좌표의 *시간 미분* 이 그대로 옮겨진다.

**(b) 곡선 → 다양체 사상.** $\gamma : I \to M$ 자체가 매끄러운 사상. 미분사상 $\gamma_* : T_t I = \mathbb R \to T_{\gamma(t)} M$ 가 *속도 벡터* $\dot\gamma(t)$. 즉 1.4.3 의 *방향미분* 이 사실 *미분사상의 특수 경우* — $\dot\gamma(t) = \gamma_*(d/dt)$.

**(c) 흐름의 미분사상.** $\phi_t : M \to M$ (1.4.6) 이라면 $\phi_{t*} : T_p M \to T_{\phi_t(p)} M$ 가 *흐름에 따라 벡터를 옮기는 사상*. 1.4.8 의 리 미분이 이 옮김의 시각 0 미분으로 정의된다.

**(d) 함수와 벡터의 *방향 비대칭*.** 함수는 *목적지를 평가* 하는 객체 — 사상의 반대로 끌려간다. 벡터는 *출발지에서 움직이는* 객체 — 사상의 방향으로 밀려간다. 이 비대칭이 §1.5 의 *코벡터/1-형식* 의 변환 규칙 (공변) 과 *벡터* 의 변환 규칙 (반변) 의 출처다.

**합성성.** 두 사상의 합성에서 당김·밀기 모두 합성성을 만족한다: $(g \circ f)^* = f^* \circ g^*$ (반대 순서!), $(g \circ f)_* = g_* \circ f_*$.

## 다음 절(1.4.8)로 가는 다리

흐름 $\phi_t$ 의 미분사상으로 *벡터를 옮긴 결과* 와 *원래 벡터* 의 차이의 시각 0 비율이 다음 1.4.8 의 *리 미분* $\mathcal L_X Y$. 두 벡터장의 *교환자* $[X, Y]$ 가 같은 값이라는 비자명한 사실 — 그게 리 미분의 본 정체.
