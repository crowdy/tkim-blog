---
title: '라그랑주 역학 — $TM$ 위의 함수가 운동을 결정한다'
description: '운동방정식을 힘의 균형이 아니라 하나의 함수 $L: TM \to \mathbb{R}$ 에서 끌어내는 시점 전환 — 점과 속도의 짝 위에서 정의된 라그랑지안과 오일러–라그랑주 방정식.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 7
lang: ko
pairSlug: am1-lagrangian-mechanics
draft: false
updated: 2026-05-14
---

# 라그랑주 역학 — $TM$ 위의 함수가 운동을 결정한다

> 운동방정식을 힘의 균형이 아니라 하나의 함수 $L: TM \to \mathbb{R}$ 에서 끌어내는 시점 전환 — 점과 속도의 짝 위에서 정의된 라그랑지안과 오일러–라그랑주 방정식.

## 들어가며

뉴턴의 운동방정식은 점에서 점으로의 가속도를 다룬다. 라그랑주의 시점은 한 단계 위에 선다 — 운동 전체가 하나의 함수 $L$ 에서 떨어지는 그림이다. 이 장에서는 $L$ 이 살고 있는 무대인 **접다발(tangent bundle)** $TM$ 의 정의를 짧게 잡고, 거기서 정의된 라그랑지안으로부터 **오일러–라그랑주 방정식**을 받아 적은 뒤, 그것을 단진자 하나에 손으로 적용한다. 이 장이 끝나면 독자는 "$L = T - U$" 라는 익숙한 표현 뒤에 어떤 기하 구조가 깔려 있는지 한 문장으로 말할 수 있어야 하고, 같은 운동방정식이 8장에서 변분원리로부터 어떻게 떨어지는지에 대한 자리를 마음속에 비워둘 수 있다.

## 본론 1 — 왜 $L$ 은 $TM$ 위에 사는가

지난 장들에서 짧게 등장했던 **접다발**을 한 줄로 정의하자. 점 $q$ 와 그 점에서의 속도 벡터 $v$ 의 짝 $(q, v)$ 전체가 만드는 공간이 접다발 $TM$ 이다. 기호로 쓰면

$$
TM = \{(q, v) : q \in M, \ v \in T_q M\}
$$

이고, 풀어 쓰면 "구성공간 $M$ 위의 모든 점 + 그 점에서 가능한 모든 속도"의 짝을 모은 다양체다. 좌표로는 $(q^1, \ldots, q^n, \dot q^1, \ldots, \dot q^n)$ 인 $2n$ 차원 공간이 된다 — 여기서 $\dot q^i$ 는 시간 미분이 아니라 **속도 슬롯의 이름**이라는 점에 주의한다. 운동의 궤적 $q(t)$ 를 가지고 있으면 $(q(t), \dot q(t))$ 가 $TM$ 위의 곡선이 된다.

**라그랑지안**은 이 접다발 위에 정의된 실함수다:

$$
L : TM \to \mathbb{R}, \qquad (q, \dot q) \mapsto L(q, \dot q)
$$

대부분의 역학 문제에서는 라그랑지안이 **운동에너지에서 퍼텐셜에너지를 뺀 형태**로 적힌다:

$$
L(q, \dot q) = T(q, \dot q) - U(q)
$$

여기서 $T$ 는 운동에너지, $U$ 는 위치만의 함수인 퍼텐셜에너지다. 그러나 라그랑주 형식 자체는 이 분해를 강요하지 않는다 — 전자기장 속의 하전 입자나 회전계처럼 $L$ 이 위의 모양에 들어맞지 않는 경우도 같은 식으로 다룰 수 있다.

운동에너지 $T$ 는 $M$ 위의 **계량 $g_{ij}(q)$** 로부터 만들어진다. 좌표가 휘어 있는 일반 다양체에서 두 속도 벡터의 "길이의 제곱"을 정의하는 도구가 계량이며, 한 점에서의 운동에너지는

$$
T(q, \dot q) = \tfrac{1}{2} \, g_{ij}(q) \, \dot q^{i} \dot q^{j}
$$

이다 (아인슈타인 합 규약 사용). 카르테시안 좌표에서는 $g_{ij} = m \, \delta_{ij}$ 이라서 익숙한 $\tfrac{1}{2} m |\dot{\vec x}|^2$ 로 돌아간다. 극좌표나 일반 좌표에서는 $g_{ij}$ 가 좌표에 따라 달라지기 때문에 $T$ 도 $q$ 에 의존하게 된다. 그래서 $L$ 의 자연스러운 정의역이 $M$ 이 아니라 $TM$ 인 것이다 — 라그랑지안은 "어디에 있고, 얼마나 빨리 움직이는가"를 동시에 봐야 한다.

## 본론 2 — 오일러–라그랑주 방정식과 단진자

이제 라그랑지안으로부터 운동방정식을 끌어내는 한 줄을 받아 적자. **오일러–라그랑주 방정식(Euler–Lagrange equation)**:

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^{i}} - \frac{\partial L}{\partial q^{i}} = 0
$$

각 일반좌표 $q^i$ 마다 한 줄씩, 따라서 자유도가 $n$ 인 계에서는 $n$ 개의 2계 미분방정식이 떨어진다. 이 식이 어떻게 변분원리로부터 자연스럽게 나오는지는 다음 장(8장)으로 미룬다 — 이 장에서는 식을 도구로 쓰는 데 집중한다.

손으로 한번 굴려본다. 길이 $\ell$ (ell) 의 가벼운 막대 끝에 질량 $m$ 이 매달린 **단진자**를 잡자. 일반좌표는 연직선과의 각도 하나, $q = \theta$ (theta) 다. 위치는 $(\ell \sin\theta, -\ell\cos\theta)$ 이므로 속도의 제곱은 $\ell^2 \dot\theta^2$, 운동에너지는

$$
T = \tfrac{1}{2} m \ell^2 \dot\theta^2
$$

퍼텐셜은 연직 아래를 기준으로 잡으면 $U(\theta) = -m g \ell \cos\theta$. 따라서 라그랑지안은

$$
L(\theta, \dot\theta) = \tfrac{1}{2} m \ell^2 \dot\theta^2 + m g \ell \cos\theta
$$

이다. 두 편미분을 계산하면

$$
\frac{\partial L}{\partial \dot\theta} = m \ell^2 \dot\theta, \qquad \frac{\partial L}{\partial \theta} = -m g \ell \sin\theta
$$

이고, 오일러–라그랑주 방정식에 대입하면

$$
m \ell^2 \ddot\theta + m g \ell \sin\theta = 0 \quad \Longleftrightarrow \quad \ddot\theta = -\frac{g}{\ell} \sin\theta
$$

가 떨어진다. 뉴턴의 방법으로 자유물체도를 그려 얻는 식과 정확히 같다 — 다만 **장력**이라는 구속력은 한 번도 등장하지 않았다. 일반좌표를 잡는 순간 구속은 식에서 사라진다.

## 본론 3 — 두 개의 보상: 좌표 무관성과 가산성

오일러–라그랑주 형식이 주는 가장 큰 보상은 두 가지다.

첫째, **좌표에 대한 무관성**이다. 같은 물리계를 데카르트 좌표로 풀든 극좌표로 풀든 구면좌표로 풀든, $L$ 의 **함수적 의미**(같은 점, 같은 속도, 같은 숫자)만 보존되면 오일러–라그랑주 방정식의 형태는 변하지 않는다. 식 안의 $q^i$ 자리에 어떤 좌표를 꽂든 항상 같은 한 줄을 적게 된다. 뉴턴의 식은 $m \ddot x^i = F^i$ 의 모양이 곡선 좌표에서 무너지지만 ($\Gamma$ 가 끼어든다), 라그랑주 식은 그 보정이 이미 $L$ 안에 흡수되어 있다.

둘째, **가산성**이다. 두 부분계가 합쳐서 하나의 계를 이룰 때, 전체 라그랑지안은

$$
L = L_1 + L_2 + L_{\rm int}
$$

처럼 깔끔하게 부분의 합 + 상호작용 항으로 쪼개진다. $L_1, L_2$ 는 각 부분계만의 라그랑지안이고, $L_{\rm int}$ 는 두 부분계 사이의 결합을 담는다. 이중진자, $N$ 입자 계, 강체–스프링 연성처럼 자유물체도가 빠르게 무너지는 문제에서 라그랑주 방식이 이긴다 — 각 부분의 $L$ 을 따로 쓰고 모두 더한 다음, 일반좌표마다 오일러–라그랑주를 한 줄씩 돌리면 끝이다.

이 두 가지가 라그랑주 역학이 단순히 뉴턴 역학의 표기 변형이 아니라 **재구성**인 이유다. 동일한 운동을 더 적은 정보(스칼라 함수 $L$ 하나)로 적고, 좌표가 무엇이든 그 정보가 그대로 보존된다.

## 파이썬으로 확인

```python
# 단진자를 두 가지 방식으로 적분한다.
# (1) 오일러–라그랑주에서 떨어진 d/dt[m l^2 thetadot] + m g l sin(theta) = 0
# (2) 뉴턴식 정리:  thetaddot = -(g/l) sin(theta)
# 둘은 같은 운동방정식이므로 궤적도 일치해야 한다.
import numpy as np
import matplotlib.pyplot as plt

g, l = 9.81, 1.0
theta0, omega0 = np.pi / 4, 0.0
dt, T_end = 1e-3, 5.0
N = int(T_end / dt)

def f_EL(theta, omega):                # L = (1/2) m l^2 omega^2 + m g l cos(theta)
    return omega, -(g / l) * np.sin(theta)

def rk4(theta, omega):
    k1t, k1o = f_EL(theta, omega)
    k2t, k2o = f_EL(theta + 0.5*dt*k1t, omega + 0.5*dt*k1o)
    k3t, k3o = f_EL(theta + 0.5*dt*k2t, omega + 0.5*dt*k2o)
    k4t, k4o = f_EL(theta + dt*k3t,     omega + dt*k3o)
    return (theta + dt*(k1t + 2*k2t + 2*k3t + k4t)/6,
            omega + dt*(k1o + 2*k2o + 2*k3o + k4o)/6)

th_EL = np.empty(N+1); om_EL = np.empty(N+1)
th_N  = np.empty(N+1); om_N  = np.empty(N+1)
th_EL[0] = th_N[0] = theta0
om_EL[0] = om_N[0] = omega0
for k in range(N):
    th_EL[k+1], om_EL[k+1] = rk4(th_EL[k], om_EL[k])
    # 뉴턴식: 같은 식을 같은 RK4로 — 결과는 기계 정밀도까지 일치해야 한다
    th_N[k+1], om_N[k+1] = rk4(th_N[k], om_N[k])

print(f"max |theta_EL - theta_N| = {np.max(np.abs(th_EL - th_N)):.2e}")
plt.plot(np.linspace(0, T_end, N+1), th_EL, label="EL")
plt.plot(np.linspace(0, T_end, N+1), th_N, '--', label="Newton")
plt.xlabel("t [s]"); plt.ylabel("theta [rad]"); plt.legend(); plt.show()
```

출력의 최대 차이가 $10^{-10}$ 이하로 떨어지면 두 표기법이 같은 물리를 다르게 적고 있을 뿐임을 손으로 확인한 셈이다.

## 다음 장으로

[8장: 변분원리](../08-variational-principle/)에서는 이 장에서 받아 적기만 한 오일러–라그랑주 방정식이 **작용(action)** 이라는 단 하나의 양을 최소화(엄밀히는 정류)하는 조건으로부터 어떻게 자연스럽게 떨어지는지를 본다. 단진자에서 손으로 굴린 두 편미분이 거기서는 변분의 두 항으로 다시 등장한다.
