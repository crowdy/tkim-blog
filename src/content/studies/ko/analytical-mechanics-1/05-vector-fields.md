---
title: '벡터장과 흐름 — 시간 발전을 그리는 도구'
description: '다양체 위의 매끄러운 벡터장 $X$ 가 ODE 의 우변이 되고, 그 흐름 $\phi^t$ 가 시간 발전을 그리며, 두 벡터장의 리 괄호 $[X, Y]$ 가 흐름의 비가환성을 잰다.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 5
lang: ko
pairSlug: am1-vector-fields
draft: false
updated: 2026-05-14
---

# 벡터장과 흐름 — 시간 발전을 그리는 도구

> 다양체 위의 매끄러운 벡터장 $X$ 가 ODE 의 우변이 되고, 그 흐름 $\phi^t$ 가 시간 발전을 그리며, 두 벡터장의 리 괄호 $[X, Y]$ 가 흐름의 비가환성을 잰다.

## 들어가며

지난 장까지 우리는 배위공간 $M$ 위의 한 점에서 접벡터(tangent vector)가 무엇인지를 보았다. 이번 장은 그 접벡터를 **모든 점에서 한꺼번에** 지정하는 양 — 벡터장(vector field) — 으로 시야를 넓힌다. 벡터장은 그 자체로 운동 방정식의 우변이며, 그 적분곡선은 해석역학의 모든 궤적이고, 두 벡터장 사이의 비가환성은 다음 장에서 만날 미분형식과 리 도함수의 토대다. 이 장이 끝나면 독자는 ODE 한 줄을 "다양체 위의 흐름"이라는 그림으로 곧장 옮길 수 있어야 한다.

## 본론 1 — 벡터장: 점마다 방향을 주는 양

매끄러운 다양체 $M$ 위의 **벡터장(vector field)** $X$ 란, 각 점 $q \in M$ 에 그 점에서의 접벡터 $X(q)$ 를 매끄럽게 대응시키는 양이다. 좌표 $q = (q^1, \ldots, q^n)$ 에서 표준 기저 $\partial_i := \partial / \partial q^i$ 를 쓰면

$$
X = X^i(q)\, \partial_i
$$

(아인슈타인 합 규약을 계속 쓴다.) 여기서 $X^i: M \to \mathbb{R}$ 는 매끄러운 함수, 즉 **성분함수**다. 점 $q$ 마다 화살표가 한 개씩 꽂혀 있는 그림을 떠올리면 충분하다.

벡터장의 진짜 역할은 ODE 의 우변이 된다는 것이다. 곡선 $q(t) \in M$ 이 다음을 만족할 때, 우리는 그 곡선이 벡터장 $X$ 를 "따라간다"고 말한다.

$$
\dot q^i(t) = X^i(q(t))
$$

좌표를 떼고 다양체 위에서 쓰면 단순히 $\dot\gamma = X(\gamma)$. **벡터장 = 운동 방정식의 우변**이다.

가장 친근한 예: 평면 단진자. 위상공간 $TS^1 \ni (\theta, \dot\theta)$ 위에 벡터장

$$
X(\theta, \dot\theta) = \Bigl(\dot\theta,\; -\tfrac{g}{\ell}\sin\theta\Bigr)
$$

를 두면, 이 벡터장의 흐름이 그대로 진자의 궤적이다. 좌변 첫 성분은 "$\theta$ 가 $\dot\theta$ 만큼 변한다"는 자명한 관계, 둘째 성분이 진짜 운동 방정식 $\ddot\theta = -(g/\ell)\sin\theta$.

## 본론 2 — 적분곡선과 흐름

초기점 $q_0 \in M$ 을 주면, ODE 의 존재·유일성(이 장에서는 사실로 받아들인다)에 의해 $\dot\gamma = X(\gamma)$, $\gamma(0) = q_0$ 를 만족하는 곡선 $\gamma_{q_0}(t)$ 가 (적어도 짧은 시간 동안) 유일하게 존재한다. 이를 $X$ 의 **적분곡선(integral curve)** 이라 부른다.

여기서 초기점을 변수로 보고, 시간 $t$ 를 고정하자. 그러면 사상

$$
\phi^t: M \to M, \quad \phi^t(q_0) := \gamma_{q_0}(t)
$$

가 정의된다. 이 사상의 모임 $\{\phi^t\}_{t \in \mathbb{R}}$ 을 벡터장 $X$ 의 **흐름(flow)** 이라 부른다. 흐름은 정의에 의해 다음 군 성질을 만족한다.

$$
\phi^{t+s} = \phi^t \circ \phi^s, \qquad \phi^0 = \mathrm{id}_M
$$

즉 "$s$ 초 흘러간 다음 $t$ 초 흘러간 결과"는 "$t+s$ 초 한 번에 흘러간 결과"와 같다. 이 성질은 $X$ 가 시간에 의존하지 않는 한 자명하다.

선형의 경우를 보면 모든 게 또렷해진다. $M = \mathbb{R}^n$ 위에서 $X(x) = A x$ ($A$ 는 $n \times n$ 행렬)라면, ODE $\dot x = Ax$ 의 해는 잘 알려진 대로

$$
\phi^t(x_0) = e^{tA} x_0
$$

즉 흐름이 행렬 지수다. 군 성질 $e^{(t+s)A} = e^{tA}e^{sA}$ 도 자동으로 따른다. 0장에서 미리 던졌던 "ODE 가 어디로 가는지를 알려면 결국 행렬 지수다"라는 예고가 여기서 일반 다양체 버전으로 옷을 갈아입었다.

## 본론 3 — 리 괄호: 두 흐름은 가환인가?

이제 벡터장 두 개 $X, Y$ 가 같은 다양체 위에 있다고 하자. 자연스러운 질문: 두 흐름은 가환인가? 즉 $\phi^t_X \circ \phi^s_Y$ 와 $\phi^s_Y \circ \phi^t_X$ 가 같은가?

답을 재는 양이 **리 괄호(Lie bracket)** $[X, Y]$ 다. 좌표 성분으로는

$$
[X, Y]^k = X^i\, \partial_i Y^k - Y^i\, \partial_i X^k
$$

좌표를 떼면, 임의의 매끄러운 함수 $f: M \to \mathbb{R}$ 에 대해

$$
[X, Y] f = X(Y f) - Y(X f)
$$

여기서 $X f := X^i \partial_i f$ 는 벡터장이 함수에 작용해 만든 또 하나의 매끄러운 함수다. 즉 벡터장은 1차 미분 연산자로도 볼 수 있고, 두 미분 연산자의 교환자(commutator)가 다시 1차 미분 연산자가 된다는 사실이 리 괄호의 정체다.

작은 예 하나로 손에 익히자. $\mathbb{R}^2$ 위에서

$$
X = \partial_x, \qquad Y = x\, \partial_y
$$

성분으로는 $X = (1, 0)$, $Y = (0, x)$. 공식을 그대로 두드리면 $[X, Y]^1 = 1\cdot \partial_x 0 - 0 \cdot \partial_x 1 = 0$, $[X, Y]^2 = 1 \cdot \partial_x x - 0 \cdot \partial_x 0 = 1$. 따라서

$$
[X, Y] = \partial_y
$$

기하적 의미: 한 점에서 시작해 $X$ 를 따라 시간 $\epsilon$ 만큼 흘러가고, 거기서 $Y$ 를 따라 다시 $\epsilon$ 만큼 흘러간 뒤, $X$ 를 역방향으로 $\epsilon$, 마지막으로 $Y$ 를 역방향으로 $\epsilon$ 만큼 되돌아온다. 시작점으로 정확히 돌아왔다면 두 흐름은 가환이다. 일반적으로는 시작점에서

$$
\phi^{-\epsilon}_Y \circ \phi^{-\epsilon}_X \circ \phi^{\epsilon}_Y \circ \phi^{\epsilon}_X (q_0) \;=\; q_0 + \epsilon^2 [X, Y](q_0) + O(\epsilon^3)
$$

만큼 벗어난다. **리 괄호가 0이 아니라는 것 = 두 흐름이 가환이 아니라는 것**. 이 한 줄이 다음 장에서 만날 미분형식의 외미분(exterior derivative)과 리 도함수(Lie derivative)의 모든 식을 떠받친다.

## 파이썬으로 확인

```python
# 2차원 벡터장 X(x,y) = (-y, x) (회전 생성자)의 적분곡선을
# 손으로 작성한 RK4 로 적분하고, 그 위에 plt.streamplot 을 겹쳐
# 적분곡선과 스트림라인이 일치함을 눈으로 확인한다.
import numpy as np
import matplotlib.pyplot as plt

def X(p):                                 # 벡터장: 회전 생성자
    x, y = p
    return np.array([-y, x])

def rk4_step(p, dt):                      # 표준 4차 룽게-쿠타
    k1 = X(p)
    k2 = X(p + 0.5 * dt * k1)
    k3 = X(p + 0.5 * dt * k2)
    k4 = X(p + dt * k3)
    return p + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

dt, T = 0.02, 6.0
N = int(T / dt)
initials = [(1.0, 0.0), (1.5, 0.0), (2.0, 0.0), (0.0, 1.2)]
curves = []
for q0 in initials:                       # 초기점마다 적분곡선을 모은다
    traj = np.empty((N + 1, 2))
    traj[0] = q0
    for n in range(N):
        traj[n+1] = rk4_step(traj[n], dt)
    curves.append(traj)

# 벡터장의 스트림라인을 배경으로 깔고, 적분곡선을 위에 겹친다
gx, gy = np.meshgrid(np.linspace(-2.5, 2.5, 25), np.linspace(-2.5, 2.5, 25))
plt.streamplot(gx, gy, -gy, gx, density=1.0, color="0.7")
for c in curves:
    plt.plot(c[:, 0], c[:, 1])
plt.gca().set_aspect("equal"); plt.xlabel("x"); plt.ylabel("y"); plt.show()
```

회전 생성자의 적분곡선은 원이어야 하고, 스트림라인 위에 겹쳐 그린 RK4 궤적이 정확히 원을 따라간다면 "벡터장 = 흐름"의 그림이 손에 들어온 것이다.

## 다음 장으로

[6장: 미분형식과 외미분](../06-differential-forms/)에서는 이 장에서 본 벡터장의 쌍대 대상 — 1-형식과 그 외미분 — 을 도입한다. 리 괄호 $[X, Y]$ 가 흐름의 비가환성을 잰다면, 외미분 $d\alpha$ 는 1-형식이 작은 사각형 위에서 얼마나 "닫혀 있지 않은가"를 잰다. 두 양 사이를 잇는 카르탕 마법공식이 다음 장의 도착점이다.
