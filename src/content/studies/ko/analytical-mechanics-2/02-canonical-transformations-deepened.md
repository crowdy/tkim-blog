---
title: '정준 변환 심화 — 흐름은 변환이고, 변환은 흐름이다'
description: '해밀턴 흐름은 그 자체가 정준 변환이며, 정준 변환은 어떤 함수가 만들어 내는 짧은 흐름이다 — 두 개념이 같은 것임을 심플렉틱 형식으로 묶어 본다.'
book: analytical-mechanics-2
bookTitle: 해석역학 II
chapter: 2
lang: ko
pairSlug: am2-canonical-deepened
draft: false
updated: 2026-05-14
---

# 정준 변환 심화 — 흐름은 변환이고, 변환은 흐름이다

> 해밀턴 흐름은 그 자체가 정준 변환이며, 정준 변환은 어떤 함수가 만들어 내는 짧은 흐름이다 — 두 개념이 같은 것임을 심플렉틱 형식으로 묶어 본다.

## 들어가며

I권 11장에서 우리는 정준 변환(canonical transformation, 이하 CT)을 생성함수 $F_1, F_2, F_3, F_4$ 의 관점에서 정의했다. 이 장은 같은 대상에 **기하학적** 옷을 입힌다. 핵심 주장은 두 줄이다. 첫째, 모든 해밀턴 흐름은 CT이다. 둘째, 모든 무한소 CT는 어떤 함수 $G(q,p)$ 가 만들어 내는 해밀턴 흐름이다. 이 장을 끝내면 독자는 "$Sp(2n)$ 의 생성자가 곧 해밀토니안이다"라는 한 줄을 자기 언어로 풀어 말할 수 있을 것이다.

## 본론 1 — 복습과 시점 전환

I권에서 CT란 새 좌표 $(Q,P)$ 가 다시 해밀턴 형식을 따르도록 하는 좌표 변환이었다. 이번에는 같은 대상을 **심플렉틱 형식(symplectic form)** $\omega = dq^i \wedge dp_i$ 의 보존으로 다시 정의한다. $\omega$ 는 위상공간의 각 점에서 두 벡터에 면적을 부여하는 반대칭 2-형식이다 — 직관적으로는 "$(q,p)$ 평면 위의 미소 평행사변형 넓이"의 일반화이다.

CT는 다음 두 동치 조건 중 어느 쪽으로 잡아도 된다.

(a) 야코비안 행렬 $M = \partial(Q,P)/\partial(q,p)$ 가 심플렉틱이다:

$$
M^T J M = J, \qquad J = \begin{pmatrix} 0 & I_n \\ -I_n & 0 \end{pmatrix}
$$

(b) 푸아송 괄호가 옛 변수로 계산해도 정준 관계를 유지한다:

$$
\{Q_i, Q_j\}_{q,p} = 0, \quad \{P_i, P_j\}_{q,p} = 0, \quad \{Q_i, P_j\}_{q,p} = \delta_{ij}
$$

두 조건은 같은 사실의 행렬판과 미분판이다. 이제 흐름이라는 대상에 이 잣대를 들이댄다.

## 본론 2 — 흐름은 그 자체로 CT다

해밀토니안 $H$ 가 정의하는 해밀턴 벡터장 $X_H$ 는 $\iota_{X_H} \omega = -dH$ 라는 한 줄로 정의된다. 여기서 $\iota$ 는 **내부곱(interior product)** — 2-형식에 벡터를 하나 끼워 넣어 1-형식으로 줄이는 연산이다. 그 흐름 $\phi^t_H$ 가 $(q,p)$ 를 시간 $t$ 후의 $(Q(t), P(t))$ 로 보낸다.

주장: $\phi^t_H$ 는 모든 $t$ 에 대해 CT이다.

증명의 골격은 **리 미분(Lie derivative)** — 벡터장을 따라 흐를 때 텐서가 어떻게 변하는지 재는 미분 — 의 카르탕 공식이다.

$$
\mathcal{L}_{X_H} \omega = d(\iota_{X_H}\omega) + \iota_{X_H}(d\omega) = d(-dH) + 0 = 0
$$

$d^2 = 0$ 이라서 첫 항이 사라지고, $\omega$ 자체가 닫혀 있어서 $d\omega = 0$ 이므로 둘째 항도 사라진다. 따라서 $\omega$ 는 흐름을 따라 보존된다. 보존되는 $\omega$ 의 야코비안은 자동으로 심플렉틱이고, 본론 1의 조건 (a)에 의해 $\phi^t_H$ 는 CT이다. 진자의 시간 발전이든 케플러 궤도의 전 구간 적분이든, 그 자체가 위상공간 위의 정준 변환의 1-매개변수 가족이라는 뜻이다.

## 본론 3 — 무한소 CT와 $Sp(2n)$

거꾸로 가 보자. 위상공간 위의 매끄러운 함수 $G(q,p)$ 를 하나 고른다. 작은 매개변수 $\varepsilon$ (epsilon)을 써서

$$
\delta q^i = \varepsilon \{q^i, G\} = \varepsilon\, \frac{\partial G}{\partial p_i}, \qquad
\delta p_i = \varepsilon \{p_i, G\} = -\varepsilon\, \frac{\partial G}{\partial q^i}
$$

라고 정의하면, 이 변환은 $O(\varepsilon^2)$ 까지 심플렉틱 조건을 만족한다. 즉 $G$ 는 **무한소 CT의 생성자**이다. 운동량은 평행이동의 생성자이고, 각운동량은 회전의 생성자라는 익숙한 그림이 그대로 위상공간 전체로 확장된다.

심플렉틱 조건을 만족하는 $2n \times 2n$ 실행렬 전체는 군을 이루며, 이를 **심플렉틱 군** $Sp(2n, \mathbb{R})$ 이라 부른다. 그 리 대수는 정확히 위상공간 위의 **이차 함수** $G(q,p) = \tfrac{1}{2} z^T S z$ ($S$ 는 대칭, $z = (q,p)$)들이 푸아송 괄호 아래 닫혀 있는 공간이다.

가장 깔끔한 예 하나. $G = (q^2 + p^2)/2$ 를 잡으면 무한소 CT는

$$
\delta q = \varepsilon\, p, \qquad \delta p = -\varepsilon\, q
$$

이고, 이는 $(q,p)$ 평면 위의 각도 $\varepsilon$ 회전이다. 그런데 이 $G$ 는 정확히 단위 각진동수 조화진동자의 해밀토니안 $H_{\text{HO}}$ 이다. 즉, "조화진동자의 시간 발전이 위상공간 회전"이라는 그림은 우연이 아니라 *흐름과 CT의 동치성*의 가장 단순한 사례이다. 다음 장에서 다룰 작용·각변수도 정확히 같은 시점을 다차원으로 일반화한 것이다.

## 파이썬으로 확인

단진자의 흐름이 위상공간 면적을 보존하는지 손으로 확인한다. 작은 직사각형 경계를 200개 점으로 표본화해 흐름을 따라 보내고, 1초 간격으로 다각형 넓이를 출력한다.

```python
import numpy as np

# H = p^2/2 - cos q  (단진자), 해밀턴 방정식
def f(state):
    q, p = state[..., 0], state[..., 1]
    return np.stack([p, -np.sin(q)], axis=-1)

# 작은 직사각형 경계 위에 200개 점 (변마다 50개)
def rect_boundary(q0, q1, p0, p1, n_per_side=50):
    s = np.linspace(0, 1, n_per_side, endpoint=False)
    side1 = np.stack([q0 + (q1-q0)*s, np.full_like(s, p0)], axis=-1)
    side2 = np.stack([np.full_like(s, q1), p0 + (p1-p0)*s], axis=-1)
    side3 = np.stack([q1 + (q0-q1)*s, np.full_like(s, p1)], axis=-1)
    side4 = np.stack([np.full_like(s, q0), p1 + (p0-p1)*s], axis=-1)
    return np.concatenate([side1, side2, side3, side4], axis=0)

def shoelace(pts):
    x, y = pts[:, 0], pts[:, 1]
    return 0.5 * np.abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1)))

pts = rect_boundary(0.5, 0.7, 0.0, 0.3)
dt, n_steps = 0.01, 500
print(f"t=0.0  area = {shoelace(pts):.6f}")
for step in range(1, n_steps + 1):
    k1 = f(pts)
    k2 = f(pts + 0.5*dt*k1)
    k3 = f(pts + 0.5*dt*k2)
    k4 = f(pts + dt*k3)
    pts = pts + (dt/6.0) * (k1 + 2*k2 + 2*k3 + k4)
    if step % 100 == 0:
        print(f"t={step*dt:.1f}  area = {shoelace(pts):.6f}")
```

직사각형은 점점 길게 늘어지고 휘어지지만, 출력되는 넓이는 모든 시각에서 $0.06$ 근방 — 첫 자리 이하 차이가 $10^{-4}$ 수준에 묶인다. 흐름이 정준 변환이라는 본론 2의 주장이 숫자로 확인된 것이다.

## 다음 장으로

[3장: 적분가능계와 작용·각변수](../03-integrable-systems/)에서는 이 장의 시점을 한 걸음 더 밀어붙인다. $n$ 개의 서로 푸아송 가환인 보존량이 있는 계라면, 그 흐름이 만드는 CT는 위상공간을 토러스로 잘라 그 위의 회전으로 정리할 수 있다. 조화진동자가 원 위의 회전이었듯이, 적분가능계는 $n$ 차원 토러스 위의 회전이 된다.
