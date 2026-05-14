---
title: '정준 변환 — 좋은 좌표를 고르는 기술'
description: '해밀턴 방정식의 형태를 보존하는 좌표 변환, 그 변환을 통째로 적어 내는 생성함수, 그리고 위상공간 부피가 보존된다는 리우빌 정리.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 11
lang: ko
pairSlug: am1-canonical-transformations
draft: false
updated: 2026-05-14
---

# 정준 변환 — 좋은 좌표를 고르는 기술

> 해밀턴 방정식의 형태를 보존하는 좌표 변환, 그 변환을 통째로 적어 내는 생성함수, 그리고 위상공간 부피가 보존된다는 리우빌 정리.

## 들어가며

해밀턴 형식의 위력은 운동방정식이 일차 ODE 두 개뿐이라는 데 있지만, 진짜 이득은 **"좋은 좌표를 고르면 그 두 줄이 더 풀기 쉬워진다"** 는 점에서 나온다. 이 장은 그 "좋은 좌표"를 어떻게 고르느냐의 문법을 다룬다. 끝나고 나면 독자는 한 변환이 정준(canonical) 인지 아닌지를 야코비안 한 줄로 판정할 수 있고, 생성함수 한 개를 잡아 변환 전체를 적어 내며, 위상공간의 작은 상자가 흐름을 따라가도 부피가 변하지 않는다는 리우빌의 그림을 잡고 다음 장의 푸아송 괄호로 넘어갈 수 있어야 한다.

## 본론 1 — 정준이라는 계약

10장에서 일반화 좌표 $q$ 와 그 켤레 운동량 $p$ 가 $\dot q = \partial H/\partial p$, $\dot p = -\partial H/\partial q$ 를 만족하는 것을 보았다. 이제 새 좌표 $(Q, P)$ 를 잡되, $(Q(q, p),\, P(q, p))$ 처럼 옛 좌표의 함수로 정의한다. 어떤 새 해밀토니안 $K(Q, P)$ 가 존재해서

$$
\dot Q = \frac{\partial K}{\partial P}, \qquad \dot P = -\frac{\partial K}{\partial Q}
$$

가 다시 성립할 때, 이 변환을 **정준 변환(canonical transformation)** 이라 부른다. 즉, 변수 이름만 바꾸는 것이 아니라 **방정식의 모양 자체가 같이 따라와야** 한다는 계약이다.

이 계약은 두 가지 동등한 형태로 다시 쓸 수 있다. 첫째, **심플렉틱 2-형식** $\omega = dq \wedge dp$ 가 보존된다:

$$
dQ \wedge dP = dq \wedge dp
$$

여기서 $\wedge$ (웨지) 는 6장에서 도입한 미분형식의 곱이다. 둘째, 야코비안 $M = \partial(Q, P)/\partial(q, p)$ 가 **심플렉틱 행렬** 이다:

$$
M^{T} J M = J, \qquad J = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix}
$$

$J$ 는 위치와 운동량의 "짝짓기"를 담은 $2n \times 2n$ 블록 행렬이고, $I$ 는 $n \times n$ 단위행렬이다. 자유도가 하나뿐인 경우 $J$ 는 단순히 $\begin{pmatrix}0 & 1 \\ -1 & 0\end{pmatrix}$ 이고, 위 조건은 $\det M = 1$ 과 같다 — 즉 **위상공간 면적이 보존된다**.

## 본론 2 — 생성함수

정준 변환은 무한히 많지만, 놀랍게도 그 모든 변환을 단 하나의 함수 — 옛 변수와 새 변수를 섞은 함수 — 로 적어 낼 수 있다. 이 함수를 **생성함수(generating function)** 라 한다. 어떤 변수쌍을 독립으로 고르느냐에 따라 네 가지 표준형이 있다.

- 1형 $F_1(q, Q)$: $\displaystyle p = \frac{\partial F_1}{\partial q}, \quad P = -\frac{\partial F_1}{\partial Q}$.
- 2형 $F_2(q, P)$: $\displaystyle p = \frac{\partial F_2}{\partial q}, \quad Q = \frac{\partial F_2}{\partial P}$.
- 3형 $F_3(p, Q)$, 4형 $F_4(p, P)$ 도 부호만 다른 같은 패턴.

가장 자주 쓰이는 것은 2형이다. 항등 변환부터 보자: $F_2 = qP$ 로 두면

$$
p = \frac{\partial F_2}{\partial q} = P, \qquad Q = \frac{\partial F_2}{\partial P} = q
$$

가 되어 $(Q, P) = (q, p)$, 즉 아무것도 바꾸지 않는다. 여기에 작은 항을 더해 보자. $F_2 = qP + \tfrac{\alpha}{2} q^{2}$, $\alpha$ (알파) 는 작은 상수다. 그러면

$$
Q = q, \qquad p = P + \alpha\, q
$$

위상공간에서 보면 운동량 축이 위치 축 쪽으로 기울어지는 **전단(shear)** 이다. 면적은 그대로지만 좌표축이 비스듬해진 셈이고, 이 변환은 그 자체로 정준이다. 생성함수 한 줄이 전체 변환을 압축하고 있다는 점이 핵심이다.

## 본론 3 — 리우빌 정리

해밀턴 흐름 자체를 시간 $t$ 만큼 적분한 사상

$$
\Phi_{t}: (q_0, p_0) \;\longmapsto\; (q(t), p(t))
$$

은 임의의 $t$ 에서 정준 변환이다. 그러면 위 본론 1의 마지막 등식 — 야코비안이 심플렉틱 — 이 매 순간 성립하므로, 위상공간의 **부피요소** $d^{n}q\, d^{n}p$ 가 흐름을 따라가도 변하지 않는다. 이것이 **리우빌의 정리(Liouville's theorem)** 다.

직관적으로는 이렇다. 초기 조건의 작은 상자 — 위치는 $q_0 \pm \Delta q$, 운동량은 $p_0 \pm \Delta p$ — 를 시간이 지남에 따라 따라가 보자. 이 상자는 늘어나고, 휘어지고, 가늘고 긴 띠로 변할 수 있다. 그러나 **부피만은 절대 늘지도 줄지도 않는다**. 통계역학에서 미시상태의 밀도가 "비압축성 흐름처럼" 흘러간다고 말하는 근거가 정확히 이 정리다. 동시에, 위상공간을 격자로 잘라 셈하는 모든 수치 적분기는 — 만약 정확하다면 — 부피를 보존해야 한다. 이 사실에서 **심플렉틱 적분기**라는 수치 기법의 한 갈래가 갈라져 나온다.

## 파이썬으로 확인

```python
# F_2 = q*P + (alpha/2) q^2 로 생성되는 전단 변환이 정준인지 수치로 확인.
# 격자에서 푸아송 괄호 {Q, P} = ∂q Q · ∂p P − ∂p Q · ∂q P 를 계산하면
# 정준 변환에서는 1이 나와야 한다.
import numpy as np

alpha = 0.3
N = 201
qs = np.linspace(-1.0, 1.0, N)
ps = np.linspace(-1.0, 1.0, N)
q, p = np.meshgrid(qs, ps, indexing="xy")   # q는 가로축, p는 세로축

# 새 좌표: Q = q,  P = p − α q
Q = q
P = p - alpha * q

# np.gradient는 (행, 열) 방향으로 미분을 돌려준다.
# 우리 격자에서 행 = p 방향, 열 = q 방향이므로 두 번째 반환값이 ∂/∂q.
dQ_dp, dQ_dq = np.gradient(Q, ps, qs)
dP_dp, dP_dq = np.gradient(P, ps, qs)

PB = dQ_dq * dP_dp - dQ_dp * dP_dq
print(f"{{Q, P}} mean = {PB.mean():.6f}")
print(f"{{Q, P}} std  = {PB.std():.2e}")
```

평균이 $1$, 표준편차가 $10^{-12}$ 수준이면 격자 전체에서 변환의 야코비안이 곧 $1$ 임을 손으로 확인한 셈이다 — 면적을 보존하는 정준 변환이다.

## 다음 장으로

[12장: 푸아송 괄호와 적분가능성](../12-poisson-brackets-and-integrability/)에서는 이 장 끝의 푸아송 괄호 $\{Q, P\}$ 를 정식으로 도입하고, "변환이 정준이다 $\iff$ 기본 괄호 $\{Q_i, P_j\} = \delta_{ij}$ 가 보존된다"를 보인다. 거기서부터 보존량들이 서로 괄호를 이루며 닫힌 대수를 만들 때 계가 **적분가능(integrable)** 하다는, 해석역학 1권 마무리 장의 그림으로 자연스럽게 이어진다.
