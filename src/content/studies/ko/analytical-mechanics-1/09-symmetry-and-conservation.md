---
title: '대칭성과 보존 — 뇌터 정리'
description: '라그랑지안이 어떤 연속 변환에 대해 불변이면, 그 변환 하나당 궤적을 따라 보존되는 양이 정확히 하나씩 떨어진다.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 9
lang: ko
pairSlug: am1-symmetry-conservation
draft: false
updated: 2026-05-14
---

# 대칭성과 보존 — 뇌터 정리

> 라그랑지안이 어떤 연속 변환에 대해 불변이면, 그 변환 하나당 궤적을 따라 보존되는 양이 정확히 하나씩 떨어진다.

## 들어가며

지금까지 우리는 라그랑지안 $L(q, \dot q, t)$ 에서 오일러–라그랑주 방정식을 뽑고, 그것이 다양체 위 벡터장의 흐름이라는 사실을 보았다. 이번 장은 그 라그랑지안이 가진 **대칭성**이 곧 **보존량**을 낳는다는 한 줄의 정리 — 에미 뇌터(Emmy Noether, 1882–1935)의 1918년 결과 — 를 다룬다. 이 장을 끝내면 독자는 운동량·각운동량·에너지 보존이 모두 같은 기계장치에서 떨어져 나오는 한 가족이라는 사실을 한 단락으로 설명할 수 있어야 하고, 중심력 문제의 평면성처럼 "왜 그렇게 되는지" 답하기 어려웠던 사실들이 대칭성이라는 한 단어로 정리되는 경험을 하게 된다.

## 본론 1 — 뇌터 정리

배위공간 좌표 $q = (q^1, \ldots, q^n)$ 위에서, **한 매개변수 변환(one-parameter transformation)** 을

$$
q^i \to q^i + \epsilon\, \xi^i(q)
$$

으로 둔다. 여기서 $\epsilon$ (epsilon) 은 작은 실수 매개변수, $\xi^i(q)$ (xi) 는 매끄러운 성분함수다. 이 변환이 라그랑지안의 **대칭(symmetry)** 이라는 뜻은, 일차항까지

$$
\delta L = L(q + \epsilon\xi, \dot q + \epsilon\dot\xi, t) - L(q, \dot q, t) = 0 + O(\epsilon^2)
$$

가 성립한다는 것이다. 여기서 $\dot\xi^i = (\partial \xi^i / \partial q^j)\, \dot q^j$.

**뇌터 정리**: 이때 다음 양

$$
J = \frac{\partial L}{\partial \dot q^i}\, \xi^i(q)
$$

는 오일러–라그랑주 방정식의 해 위에서 시간에 대해 상수다. 즉 $dJ/dt = 0$.

증명 스케치는 한 문단이면 충분하다. $\delta L$ 을 일차까지 전개하면

$$
\delta L = \frac{\partial L}{\partial q^i}\, \epsilon \xi^i + \frac{\partial L}{\partial \dot q^i}\, \epsilon \dot\xi^i
$$

가설에 의해 좌변은 0. 우변의 첫 항에서 오일러–라그랑주 방정식 $\partial L / \partial q^i = d/dt(\partial L / \partial \dot q^i)$ 을 궤적 위(on-shell)에서 대입하고, 두 번째 항과 합치면 곱의 미분이 된다. 정리하면 $\epsilon \cdot dJ/dt = 0$, 즉 $J$ 는 보존된다. **대칭 → 보존**의 기계는 이 한 줄이 전부다.

## 본론 2 — 세 가지 고전적 예

같은 정리가 익숙한 보존법칙들을 한꺼번에 떨어뜨린다.

**(a) 공간 병진 $\vec x \to \vec x + \epsilon \hat n$.** 자유입자나 닫힌 다입자계처럼 라그랑지안이 절대 위치 $\vec x$ 에 의존하지 않는 경우, $\xi^i = \hat n^i$. 뇌터의 $J$ 는 $J = (\partial L / \partial \dot x^i)\, \hat n^i = \vec p \cdot \hat n$, 즉 $\hat n$ 방향 **선운동량(linear momentum)** 이 보존된다. 세 독립 방향을 잡으면 $\vec p$ 전체가 보존된다.

**(b) $\hat n$ 축 둘레의 회전.** 작은 회전은 $\delta \vec r = \epsilon\, \hat n \times \vec r$, 즉 $\xi^i = (\hat n \times \vec r)^i$. 뇌터의 $J$ 는

$$
J = \vec p \cdot (\hat n \times \vec r) = \hat n \cdot (\vec r \times \vec p) = \vec L \cdot \hat n
$$

여기서 $\vec L = \vec r \times \vec p$ 가 **각운동량(angular momentum)**. 라그랑지안이 $\hat n$ 축 둘레의 회전에 대해 불변이면 $\vec L \cdot \hat n$ 이 보존된다.

**(c) 시간 병진 $t \to t + \epsilon$.** 라그랑지안이 시간에 명시적으로 의존하지 않으면 ($\partial L / \partial t = 0$), 정확히 동일한 논리는 안 되지만 같은 정신을 따라 가면

$$
H = \frac{\partial L}{\partial \dot q^i}\, \dot q^i - L
$$

가 보존됨을 얻는다. 이 $H$ 가 **해밀토니안(Hamiltonian)**, 표준적인 경우 입자의 에너지다. 이 경우는 변환이 좌표가 아니라 시간 매개변수를 바꾸기 때문에 "라그랑지안의 대칭"이라기보다 **작용 범함수(action functional)** 의 대칭으로 다루는 편이 깔끔하다. 정식 처리는 다음 장(해밀턴 역학)으로 미룬다.

## 본론 3 — 중심력과 $SO(3)$ 대칭

3차원 입자가 중심력장 안에서 움직이는 라그랑지안

$$
L = \tfrac{1}{2}\, m\, |\dot{\vec r}|^2 - U(|\vec r|)
$$

을 보자. $U$ 가 $|\vec r|$ 에만 의존하므로, $\vec r$ 을 어떤 회전 $R \in SO(3)$ 으로 돌려도 $|\vec r|$ 과 $|\dot{\vec r}|^2$ 이 그대로다. 즉 $L$ 은 **임의의** 회전에 대해 불변이다. 본론 2 의 (b) 를 $\hat n$ 의 세 독립 선택에 대해 적용하면, 각운동량 세 성분이 모두 보존된다.

$$
\frac{d\vec L}{dt} = 0, \qquad \vec L = \vec r \times m \vec v
$$

이 한 줄에서 케플러 궤도의 평면성이 따라온다. $\vec L$ 은 일정한 벡터이므로, 모든 시각 $t$ 에 대해 $\vec r(t) \cdot \vec L = 0$ — 즉 운동은 $\vec L$ 에 수직인 한 평면 안에 갇힌다. 행성 궤도가 타원이라는 사실보다도 먼저, **평면 운동이라는 사실 자체가 회전 대칭의 직접 결과**다.

## 파이썬으로 확인

```python
# 케플러 문제 (m=1, U=-1/r) 에서 각운동량 L = r × v 가 보존되는지를
# 손으로 작성한 RK4 로 적분하면서 확인한다. 상대 표류가 1e-6 미만이면 합격.
import numpy as np

def accel(r):                                  # 만유인력 가속도 (GM=1)
    return -r / np.linalg.norm(r)**3

def rhs(state):                                # 상태 = (r, v) 6차원
    r, v = state[:3], state[3:]
    return np.concatenate([v, accel(r)])

def rk4_step(s, dt):                           # 표준 4차 룽게-쿠타
    k1 = rhs(s)
    k2 = rhs(s + 0.5 * dt * k1)
    k3 = rhs(s + 0.5 * dt * k2)
    k4 = rhs(s + dt * k3)
    return s + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

r0 = np.array([1.0, 0.0, 0.0])                 # 초기 위치
v0 = np.array([0.0, 0.9, 0.0])                 # 초기 속도 → 타원 궤도
state = np.concatenate([r0, v0])

dt, T = 0.005, 10.0
N = int(round(T / dt))
checkpoints = {int(round(t / dt)): t for t in (0.0, 2.5, 5.0, 7.5, 10.0)}
L0 = np.linalg.norm(np.cross(r0, v0))          # 초기 |L|

for n in range(N + 1):
    if n in checkpoints:                       # 다섯 지점에서 |L| 출력
        r, v = state[:3], state[3:]
        L = np.linalg.norm(np.cross(r, v))
        drift = abs(L - L0) / L0
        print(f"t={checkpoints[n]:4.1f}  |L|={L:.10f}  rel.drift={drift:.2e}")
    state = rk4_step(state, dt)
```

다섯 시각 모두에서 $|\vec L|$ 이 초기값과 소수점 여섯 자리 이상 일치한다면, 회전 대칭이 보존법칙으로 옮겨 가는 뇌터의 기계가 컴퓨터 위에서도 정확히 같은 답을 낸다는 뜻이다.

## 다음 장으로

[10장: 해밀턴 역학](../10-hamiltonian-mechanics/)에서는 본론 2 (c) 에서 미뤄 둔 시간 병진 대칭과 에너지 보존을 정식으로 다룬다. 라그랑지안에서 해밀토니안으로 넘어가는 르장드르 변환을 도입하면, 위상공간 위의 흐름과 보존량의 그림이 한 번에 깨끗해진다. 뇌터 정리는 거기서 푸아송 괄호와 다시 만난다.
