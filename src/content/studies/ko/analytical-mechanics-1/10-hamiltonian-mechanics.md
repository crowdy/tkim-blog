---
title: '해밀턴 역학 — 위상공간으로의 전환'
description: '르장드르 변환이 라그랑지언을 해밀토니언으로 바꾸고, 무대는 배위공간 $M$ 에서 여접다발 $T^*M$ 로 옮겨가며, 운동은 $2n$ 개의 1계 ODE 인 해밀턴 방정식으로 다시 쓰인다.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 10
lang: ko
pairSlug: am1-hamiltonian-mechanics
draft: false
updated: 2026-05-14
---

# 해밀턴 역학 — 위상공간으로의 전환

> 르장드르 변환이 라그랑지언을 해밀토니언으로 바꾸고, 무대는 배위공간 $M$ 에서 여접다발 $T^*M$ 로 옮겨가며, 운동은 $2n$ 개의 1계 ODE 인 해밀턴 방정식으로 다시 쓰인다.

## 들어가며

지금까지 우리는 배위공간 $M$ 의 접다발 $TM$ 위에서, 즉 좌표와 *속도* $(q, \dot q)$ 를 변수로 하는 라그랑주 그림으로 운동을 그려왔다. 이 장은 그 무대를 바꾼다. 속도 $\dot q$ 대신 켤레운동량 $p$ 를 좌표로 삼아 *여접다발* $T^*M$ 위로 이동하면, 운동 방정식은 대칭적인 1계 시스템으로 다시 쓰인다. 이 한 번의 좌표 변경이 11장의 정준변환, 12장의 푸아송 괄호, 그리고 양자역학의 위상공간 직관까지 줄줄이 풀어내는 열쇠다.

## 본론 1 — 켤레운동량과 르장드르 변환

라그랑지언 $L(q, \dot q, t)$ 가 주어졌을 때, $i$ 번째 좌표 $q^i$ 에 대응하는 **켤레운동량(conjugate momentum)** 은

$$
p_i \;=\; \frac{\partial L}{\partial \dot q^i}
$$

으로 정의된다. 입자 하나에 $L = \tfrac12 m \dot q^2 - U(q)$ 면 $p = m\dot q$, 즉 익숙한 선운동량이지만 일반적으로는 좌표에 따라 의미가 달라진다 (각좌표면 각운동량, 회전좌표면 보정항이 끼는 식).

여기서 $p$ 를 $(q, \dot q)$ 의 함수가 아니라 $(q, p)$ 를 새 좌표로 쓰고 싶다. 그러려면 위 관계를 $\dot q$ 에 대해 풀 수 있어야 하고, 그 가능 조건이 **정칙성(regularity)** 이다. 즉 헤시안 행렬

$$
\frac{\partial^2 L}{\partial \dot q^i\, \partial \dot q^j}
$$

이 모든 점에서 가역이라는 조건. 이때 음함수 정리에 의해 $\dot q^i = \dot q^i(q, p, t)$ 가 유일하게 풀린다. 이 가정을 깔고 **해밀토니언(Hamiltonian)** 을

$$
H(q, p, t) \;=\; p_i\, \dot q^i(q, p, t) \;-\; L\bigl(q,\, \dot q(q, p, t),\, t\bigr)
$$

로 정의한다 (아인슈타인 합 규약). 이것이 $L$ 의 $\dot q$ 에 대한 **르장드르 변환(Legendre transform)** — 함수의 그래프 대신 접선의 기울기를 새 좌표로 삼는 고전적인 조작이다.

구체적으로 $L = \tfrac12 m\dot q^2 - U(q)$ 면 $p = m\dot q$, $\dot q = p/m$, 그리고

$$
H = p\cdot \frac{p}{m} - \Bigl(\frac12 m \frac{p^2}{m^2} - U\Bigr) = \frac{p^2}{2m} + U(q)
$$

즉 운동에너지와 위치에너지의 합 — 총 에너지가 된다. 단순한 경우 해밀토니언은 곧 에너지지만, 회전좌표나 자기장이 끼면 둘이 갈라진다는 점은 12장에서 다시 본다.

## 본론 2 — 해밀턴 방정식과 위상공간 $T^*M$

이제 운동 방정식을 새 좌표 $(q, p)$ 로 옮기자. 정의식과 오일러-라그랑주 방정식을 양변 미분해 정리하면, $H$ 의 편미분이 곧장 운동을 준다.

$$
\dot q^i = \frac{\partial H}{\partial p_i}, \qquad \dot p_i = -\frac{\partial H}{\partial q^i}
$$

이를 **해밀턴 방정식(Hamilton's equations)** 이라 부른다. 라그랑주 쪽의 $n$ 개 *2계* ODE 가 $2n$ 개의 *1계* ODE 로 바뀌었고, 좌표와 운동량이 부호 하나를 빼면 거의 대칭적으로 등장한다.

운동이 펼쳐지는 무대도 함께 바뀐다. 각 점 $q \in M$ 에서 접벡터 $\dot q$ 가 사는 곳이 접공간 $T_qM$ 이었다면, **여접공간(cotangent space)** $T_q^*M$ 은 그 쌍대공간 — 즉 접벡터에 실수를 돌려주는 선형범함수들의 공간이다. 켤레운동량 $p = p_i\, dq^i$ 는 자연스럽게 $T_q^*M$ 의 원소다. 모든 점의 여접공간을 모아 만든 다양체 $T^*M$ 을 **여접다발(cotangent bundle)** 이라 부르고, 이것이 해밀턴 역학의 **위상공간(phase space)** 이다. 차원은 $\dim M = n$ 일 때 $2n$.

$T^*M$ 이 단순히 $TM$ 의 쌍둥이가 아니라는 점은 11장에서 본격적으로 드러난다. 위상공간에는 좌표 선택과 무관한 자연 2-형식

$$
\omega \;=\; dq^i \wedge dp_i
$$

이 미리 새겨져 있고 (이를 **심플렉틱 형식(symplectic form)** 이라 한다), 해밀턴 방정식은 이 $\omega$ 와 함수 $H$ 가 만나서 만드는 벡터장의 흐름이다. 지금은 이름만 던져두고, 정준변환을 다루는 다음 장에서 이 형식이 왜 보존되는지를 보일 것이다.

## 본론 3 — 단진자의 위상초상

해밀턴 그림의 위력은 적분이 불가능한 비선형계에서도 *그림*은 그릴 수 있다는 점이다. 단진자를 예로 들자. 좌표는 각도 $\theta \in [-\pi, \pi]$ (양 끝을 동일시한 원), 켤레운동량은 $p = m\ell^2 \dot\theta$. 라그랑지언 $L = \tfrac12 m\ell^2 \dot\theta^2 + m g \ell \cos\theta$ 의 르장드르 변환은

$$
H(\theta, p) = \frac{p^2}{2 m \ell^2} - m g \ell \cos\theta
$$

이고, $H$ 자체가 보존량이므로 각 궤적은 $H = E$ 등고선 위에 산다. 에너지 $E$ 에 따라 세 가지 거동이 나뉜다.

- $E < m g \ell$: 원점(아래쪽 평형) 주변의 닫힌 곡선 — 진동.
- $E = m g \ell$: 위쪽 불안정 평형 $\theta = \pm\pi$ 에 점근하는 한 쌍의 곡선 — **분리선(separatrix)**. 도달까지 무한 시간이 걸린다.
- $E > m g \ell$: $\theta$ 를 한 방향으로 계속 감는 열린 곡선 — 회전.

분리선의 식은 $H = m g \ell$ 에서 $p$ 를 풀어 $p = \pm \sqrt{2 m^2 \ell^3 g\,(1 + \cos\theta)}$. 단위계 $m = \ell = g = 1$ 에서는 깔끔하게 $p = \pm\sqrt{2(1 + \cos\theta)}$ 가 된다. 라그랑주 좌표 $(\theta, \dot\theta)$ 에서 본 같은 그림과 비교하면, 위상공간 그림은 보존량의 등고선이 곧 궤적이라는 사실이 단번에 눈에 들어온다.

## 파이썬으로 확인

```python
# 단진자의 위상초상: 해밀턴 방정식을 손작성 RK4 로 적분하고
# (theta, p) 평면 위에 15 개 궤적을 그린다. 분리선 E=1 은 점선으로 비교.
import numpy as np
import matplotlib.pyplot as plt

def rhs(s):                                # 해밀턴 방정식 (m=l=g=1)
    th, p = s                              # dH/dp = p, -dH/dth = -sin(th)
    return np.array([p, -np.sin(th)])

def rk4_step(s, dt):
    k1 = rhs(s)
    k2 = rhs(s + 0.5 * dt * k1)
    k3 = rhs(s + 0.5 * dt * k2)
    k4 = rhs(s + dt * k3)
    return s + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

dt, T = 0.02, 20.0
N = int(T / dt)

fig, ax = plt.subplots(figsize=(7, 4))
for E in (0.2, 0.6, 1.0, 1.4, 1.8):        # 에너지를 격자처럼 훑고
    for th0 in (-2.0, 0.0, 2.0):           # 초기 각도 세 개
        val = 2 * (E + np.cos(th0))        # p0^2 = 2(E + cos th0)
        if val < 0:                        # 운동 불가 영역은 건너뛴다
            continue
        s = np.array([th0, np.sqrt(val)])
        traj = np.empty((N + 1, 2)); traj[0] = s
        for n in range(N):
            traj[n+1] = rk4_step(traj[n], dt)
        ax.plot(traj[:, 0], traj[:, 1], lw=0.7)

th = np.linspace(-np.pi, np.pi, 400)        # 분리선 E=1
ax.plot(th,  np.sqrt(2*(1 + np.cos(th))), "k--", lw=1)
ax.plot(th, -np.sqrt(2*(1 + np.cos(th))), "k--", lw=1)
ax.set_xlabel(r"$\theta$"); ax.set_ylabel(r"$p$"); plt.show()
```

진동 영역의 닫힌 곡선, 회전 영역의 위/아래로 흐르는 열린 곡선, 그리고 그 둘을 가르는 점선(분리선)이 한 화면에 들어오면 위상공간 그림이 손에 들어온 것이다.

## 다음 장으로

[11장: 정준변환과 심플렉틱 구조](../11-canonical-transformations/)에서는 본론 2 끝에서 이름만 던졌던 심플렉틱 형식 $\omega = dq^i \wedge dp_i$ 가 좌표 변환에 어떻게 반응하는지를 본다. $\omega$ 를 보존하는 변환을 **정준변환**이라 부르고, 이 한 클래스의 변환이 해밀턴 방정식의 모양을 그대로 보존한다는 사실이 12장의 푸아송 괄호와 13장의 해밀턴-야코비 방정식을 모두 떠받친다.
