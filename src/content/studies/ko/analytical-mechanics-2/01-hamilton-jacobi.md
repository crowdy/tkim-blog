---
title: '해밀턴-야코비 방정식 — 작용을 직접 푸는 길'
description: '$2n$개의 해밀턴 ODE를 하나의 비선형 1계 편미분방정식으로 압축하고, 그 해 $S(q, t)$ 자체가 운동을 모두 담는다 — 자유 입자로 절차를 처음부터 끝까지 한 번 밟아본다.'
book: analytical-mechanics-2
bookTitle: 해석역학 II
chapter: 1
lang: ko
pairSlug: am2-hamilton-jacobi
draft: false
updated: 2026-05-14
---

# 해밀턴-야코비 방정식 — 작용을 직접 푸는 길

> $2n$개의 해밀턴 ODE를 하나의 비선형 1계 편미분방정식으로 압축하고, 그 해 $S(q, t)$ 자체가 운동을 모두 담는다 — 자유 입자로 절차를 처음부터 끝까지 한 번 밟아본다.

## 들어가며

I권에서 우리는 라그랑지안에서 해밀토니안으로, 라그랑주 방정식에서 해밀턴 방정식으로 한 단계씩 추상화의 사다리를 올라왔다. 이 장은 그 사다리의 다음 칸이다 — 좌표와 운동량의 짝 $2n$개를 따라가는 대신, 작용 $S$ 라는 **하나의 함수**를 풀고, 그 도함수에서 운동을 통째로 읽어낸다. 끝낼 무렵엔 해밀턴-야코비(Hamilton–Jacobi, HJ) 방정식이 왜 양자역학의 슈뢰딩거 방정식과 식 모양이 닮았는지에 대한 첫 단서도 손에 잡힐 것이다.

## 본론 1 — HJ 방정식의 무대 설치

I권에서 작용은 경로의 범함수였다. 즉 두 끝점을 잇는 경로 $q(\cdot)$ 하나에 실수 하나를 대응시키는 양 $S[q(\cdot)] = \int L\,dt$. 이번에는 시점을 바꾼다. 고정된 초기점 $(q_0, t_0)$ 에서 출발해 **실제 고전 해**를 따라 $(q, t)$ 까지 갔을 때 그 경로 위에서 계산한 작용의 값을 함수 $S(q, t)$ 라 부른다. 즉 $S$ 는 더 이상 경로의 함수가 아니라 도착점의 좌표와 시간의 함수다.

해밀턴은 이 $S(q, t)$ 가 다음 편미분방정식을 만족함을 보였다.

$$
\frac{\partial S}{\partial t} + H\!\left(q, \frac{\partial S}{\partial q}, t\right) = 0
$$

여기서 핵심 관찰은 **운동량과 작용의 공간 도함수가 같다**는 것이다.

$$
p_i = \frac{\partial S}{\partial q^i}
$$

해석학적으로 보면, $2n$개의 해밀턴 상미분방정식이 좌표 $n$ 차원만의 함수 $S$ 에 대한 1계 비선형 편미분방정식 **단 하나**로 압축된 셈이다. PDE의 특성곡선(characteristic curves) — 즉 1계 PDE를 풀 때 자연스럽게 떠오르는 ODE 시스템 — 은 정확히 해밀턴 흐름과 일치한다. 작용은 위상공간의 흐름 전체를 자기 그래프 안에 품고 있다.

## 본론 2 — 시간이 빠지면 변수가 분리된다

$H$ 가 시간에 양함수적으로 의존하지 않을 때, 즉 $H = H(q, p)$ 일 때는 보존되는 양 — 에너지 — 가 한 개 등장한다. 이 사실을 PDE 풀이의 출발점으로 삼는다. 시간과 공간을 분리해

$$
S(q, t) = -E\, t + W(q)
$$

라 두면 $\partial S/\partial t = -E$ 이고, HJ 방정식은 시간이 사라진 형태로 줄어든다.

$$
H\!\left(q, \frac{\partial W}{\partial q}\right) = E
$$

이를 **시간 독립 HJ 방정식** 또는 **해밀턴의 특성함수 방정식**이라 부르고, $W(q)$ 를 **특성함수(characteristic function)** 라 부른다. 보존되는 상수 $E$ 가 **분리상수(separation constant)** 의 역할을 한다.

다변수 계에서 HJ가 위력을 발휘하는 이유가 여기에 있다 — 각 보존량이 분리상수 하나씩을 풀어주고, 운 좋게 $n$ 개의 독립 분리상수를 얻으면 $W(q)$ 는 적분만으로 구해진다. 이런 계를 **완전적분 가능(completely integrable)** 하다 한다. 케플러 문제, 단진동, 강체 회전이 모두 이 부류에 속한다.

## 본론 3 — 자유 입자로 처음부터 끝까지

가장 단순한 예 — 1차원 자유 입자 — 로 절차를 한 번 다 밟아본다. $H = p^2/(2m)$, 그러므로

$$
\frac{\partial S}{\partial t} + \frac{1}{2m}\left(\frac{\partial S}{\partial x}\right)^2 = 0
$$

이 PDE에 $S = -E t + W(x)$ 를 대입하면 $W'(x)^2/(2m) = E$, 따라서

$$
W(x) = \sqrt{2mE}\, x = p\, x
$$

(여기서 $p = \sqrt{2mE}$ 는 에너지 $E$ 에 대응하는 일정한 운동량이다.) 곧

$$
S(x, t; E) = p\, x - E\, t
$$

이제 자코비(Jacobi)의 처방을 쓴다 — **작용을 분리상수에 대해 미분한 양은 또 다른 상수다**.

$$
\frac{\partial S}{\partial E} = \frac{m}{p}\, x - t = \text{const} = -t_0
$$

정리하면

$$
x(t) = \frac{p}{m}(t - t_0)
$$

이것이 우리가 이미 아는 자유 입자의 직선 운동이다. 자유 입자 한 마리에 HJ를 들이대는 것은 분명히 과잉이지만, 이 예에서 절차의 다섯 단계 — PDE를 적는다, 변수를 분리한다, $W$ 를 구한다, $\partial S/\partial(\text{분리상수})$ 를 또 다른 상수와 같다 놓는다, 시간의 함수로 풀어낸다 — 가 가장 깨끗하게 드러난다. 이 흐름이 다음 장의 정준변환과 만나면 비로소 HJ의 본격적인 효용이 시작된다.

## 파이썬으로 확인

```python
# 자유 입자의 HJ 풀이: W(x) = p x 를 그리고,
# 자코비 처방으로 얻은 x(t) 가 직접 적분과 일치하는지 확인한다.
import numpy as np
import matplotlib.pyplot as plt

m, E = 1.0, 0.5
p = np.sqrt(2 * m * E)        # 일정한 운동량

# 1) 특성함수 W(x) = p x
x_grid = np.linspace(0, 10, 200)
W = p * x_grid

# 2) 자코비 처방: ∂S/∂E = m x / p - t = -t0  →  x(t) = (p/m)(t - t0)
t = np.linspace(0, 10, 200)
t0 = 0.0
x_hj = (p / m) * (t - t0)

# 3) 비교군: ẋ = p/m 을 직접 적분 (Euler 충분)
dt = t[1] - t[0]
x_dir = np.zeros_like(t)
for i in range(1, len(t)):
    x_dir[i] = x_dir[i-1] + (p / m) * dt

err = np.max(np.abs(x_hj - x_dir))
print(f"HJ 경로와 직접 적분의 최대 오차 = {err:.2e}")

fig, ax = plt.subplots(1, 2, figsize=(8, 3))
ax[0].plot(x_grid, W); ax[0].set(xlabel="x", ylabel="W(x)", title="특성함수")
ax[1].plot(t, x_hj, label="HJ"); ax[1].plot(t, x_dir, "--", label="직접 적분")
ax[1].set(xlabel="t", ylabel="x(t)"); ax[1].legend()
plt.tight_layout()
```

오차가 부동소수점 한계인 $10^{-14}$ 수준으로 떨어지면, 두 경로 — PDE를 풀어 얻은 경로와 ODE를 적분해 얻은 경로 — 가 같은 운동을 가리키고 있음을 손으로 확인한 셈이다.

## 다음 장으로

[2장: 정준변환의 심화](../02-canonical-transformations-deepened/)에서는 이 장에서 본 작용 $S$ 가 자연스럽게 **생성함수**의 자격을 얻으며, HJ 방정식이 "해밀토니안을 0으로 보내는 정준변환을 찾는다"는 절묘한 한 줄로 다시 읽히는 과정을 본다. 이 시점에서 HJ는 더 이상 자유 입자에 쓰기 아까운 도구가 아니라, 적분 가능계의 작용–각 변수를 자동으로 길어 올리는 기계가 된다.
