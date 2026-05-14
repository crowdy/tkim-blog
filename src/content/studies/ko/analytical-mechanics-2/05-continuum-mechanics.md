---
title: '연속체 역학 — 무한 자유도로의 도약'
description: '용수철로 이어진 $N$개의 입자를 $N \to \infty$ 극한으로 보내면 한 줄의 라그랑지안 밀도와 한 줄의 파동방정식이 떨어진다 — 같은 변분원리가 무한 자유도를 가진 장(field)으로 확장되는 과정.'
book: analytical-mechanics-2
bookTitle: 해석역학 II
chapter: 5
lang: ko
pairSlug: am2-continuum-mechanics
draft: false
updated: 2026-05-14
---

# 연속체 역학 — 무한 자유도로의 도약

> 용수철로 이어진 $N$개의 입자를 $N \to \infty$ 극한으로 보내면 한 줄의 라그랑지안 밀도와 한 줄의 파동방정식이 떨어진다 — 같은 변분원리가 무한 자유도를 가진 장(field)으로 확장되는 과정.

## 들어가며

지금까지는 자유도(degrees of freedom)가 유한한 계 — 입자 몇 개, 강체, 결합진동자 — 만 다뤘다. 이 장은 그 사다리에서 한 단을 더 오른다. 격자 위의 입자 수 $N$ 을 무한대로 보내면 좌표의 집합 $\{q_n(t)\}$ 은 시공간 위의 **장(field)** $\phi(t, x)$ 로 바뀌고, 라그랑지안은 시공간 적분 형태의 작용으로 일반화된다. 이 장을 끝내면 "왜 전자기학·일반상대론·양자장론이 모두 같은 변분원리를 쓰는가" 라는 질문에 대한 첫 답을 손에 쥐게 된다.

## 본론 1 — $N$개의 입자에서 연속체로

질량 $m$ 인 입자 $N$ 개가 용수철 상수 $K$ 인 용수철로 일직선 위에 묶여 있다고 하자. 각 입자의 평형 위치에서의 변위를 $q_n(t)$ 라 두면 라그랑지안은

$$
L = \sum_n \tfrac{1}{2} m \dot q_n^2 - \sum_n \tfrac{1}{2} K (q_{n+1} - q_n)^2.
$$

이제 두 가지를 동시에 한다 — 인접 입자 간격을 $a$ 라 두고 $a \to 0$, 동시에 입자 수 $N \to \infty$. 단, 다음 세 양은 고정한다: 전체 길이 $L_0 = N a$, 단위 길이당 질량 $\rho = m/a$ (rho, **선밀도**, 단위 kg/m), 그리고 장력 $T = K a$ (단위 N). 변위 $q_n(t)$ 는 위치 $x = n a$ 위의 값 $\phi(t, x)$ 로 본다. 유한 차분은 도함수가 된다 — $q_{n+1} - q_n \to a\, \partial_x \phi$. 합은 적분이 된다 — $\sum_n \to \int dx / a$. 두 운동에너지·퍼텐셜에너지 항을 동시에 정리하면

$$
L \to \int dx \left[ \tfrac{1}{2}\rho \dot\phi^2 - \tfrac{1}{2} T (\partial_x \phi)^2 \right].
$$

대괄호 안의 양을 **라그랑지안 밀도** $\mathcal{L}$ (caligraphic L) 이라 부른다.

$$
\mathcal{L} = \tfrac{1}{2}\rho \dot\phi^2 - \tfrac{1}{2} T (\partial_x \phi)^2.
$$

작용은 시간과 공간 모두에 대한 적분이다.

$$
S = \int dt\, dx\, \mathcal{L}\!\left(\phi, \partial_t \phi, \partial_x \phi\right).
$$

3+1차원으로 일반화하면 $S = \int \mathcal{L}\, d^4 x$ 로 적는다. 장 $\phi(t, x)$ 는 점 $x$ 마다 독립된 자유도를 가지므로 — 즉 무한 자유도를 가진 동역학계다.

## 본론 2 — 장 형식의 오일러–라그랑주 방정식

이산계에서 작용을 변분해 오일러–라그랑주 방정식을 유도했던 것과 같은 절차를 장에 적용한다. 시공간 영역 안에서 변분 $\phi \to \phi + \delta\phi$ 를 주되, 영역의 경계에서는 $\delta\phi = 0$ 으로 둔다. $\delta S = 0$ 의 결과는

$$
\frac{\partial}{\partial t}\!\left(\frac{\partial \mathcal{L}}{\partial \dot\phi}\right) + \partial_x\!\left(\frac{\partial \mathcal{L}}{\partial(\partial_x \phi)}\right) - \frac{\partial \mathcal{L}}{\partial \phi} = 0.
$$

이산계의 라그랑주 방정식과 모양이 동일하다 — 시간 도함수 한 개가 시간 + 공간 도함수의 합으로 바뀌었을 뿐이다. 본론 1에서 적은 탄성 끈의 $\mathcal{L}$ 에 대해 각 항을 계산하면 $\partial \mathcal{L}/\partial \dot\phi = \rho \dot\phi$, $\partial \mathcal{L}/\partial(\partial_x \phi) = -T\, \partial_x \phi$, $\partial \mathcal{L}/\partial \phi = 0$ 이므로

$$
\rho \ddot\phi - T\, \phi'' = 0
$$

곧 **파동방정식**

$$
\ddot\phi = c^2\, \phi'', \qquad c = \sqrt{T/\rho}
$$

가 떨어진다. 양끝이 고정된 끈 ($\phi(0, t) = \phi(L_0, t) = 0$) 위에서는 변수분리로 정상파 모드

$$
\phi_n(t, x) = \sin(n\pi x/L_0)\cos(\omega_n t), \qquad \omega_n = n\pi c / L_0
$$

가 얻어진다. 이산 격자의 결합진동 모드가 $N \to \infty$ 극한에서 정수 $n$ 으로 라벨링되는 무한히 많은 정상파로 매끄럽게 이어진다.

## 본론 3 — 왜 이 한 걸음이 중요한가

같은 변분원리, 같은 노이터(Noether) 논리가 이제 무한 자유도를 가진 장에 그대로 적용된다. 다음 장(고전 장론)에서 보게 되겠지만, 라그랑지안 밀도라는 한 개의 양만 적으면 — 운동방정식, 보존되는 양, 대칭성이 자동으로 떨어진다. 이 틀이 강력한 이유는, 적는 대상 $\mathcal{L}$ 만 바꿔도 전혀 다른 물리가 같은 기계 위에서 돌아간다는 점이다.

전자기학의 라그랑지안 밀도 $\mathcal{L} = -\tfrac{1}{4} F_{\mu\nu} F^{\mu\nu}$ (여기서 $F_{\mu\nu}$ 는 **전자기 장세기 텐서**, 4차원 시공간에서 전기장과 자기장을 한 묶음으로 적은 반대칭 2-텐서다), 게이지 이론, 일반상대론, 양자장론 모두가 이 한 식 위에 얹혀 있다. 6장에서는 이 틀을 상대론적 스칼라 장으로 확장해, 클라인–고든 방정식으로 한 걸음 더 나아간다.

## 파이썬으로 확인

```python
# 양끝 고정 1차원 탄성 끈의 파동방정식을 유한차분 leapfrog으로 적분.
# 초기 가우스 펄스가 양쪽으로 갈라져 끝에서 반사되는 모습을 다섯 시점에서 본다.
import numpy as np
import matplotlib.pyplot as plt

L, c = 1.0, 1.0               # 끈 길이와 파속
N = 200                       # 격자 점 수
dx = L / (N - 1)
dt = 0.5 * dx / c             # CFL 안정조건
Nt = 2000
x = np.linspace(0, L, N)
r2 = (c * dt / dx) ** 2       # leapfrog 계수의 제곱

# 초기 조건: 중앙의 가우스, 초기 속도 0
phi_prev = np.exp(-((x - L / 2) ** 2) / (2 * 0.05 ** 2))
phi_prev[0] = phi_prev[-1] = 0.0
phi = phi_prev.copy()         # 초기 속도가 0이므로 한 스텝 앞도 같다

snap_steps = np.linspace(0, Nt - 1, 5, dtype=int)
snapshots = []
for n in range(Nt):
    phi_next = np.zeros_like(phi)
    phi_next[1:-1] = (2 * phi[1:-1] - phi_prev[1:-1]
                      + r2 * (phi[2:] - 2 * phi[1:-1] + phi[:-2]))
    phi_prev, phi = phi, phi_next
    if n in snap_steps:
        snapshots.append((n, phi.copy()))

fig, ax = plt.subplots(figsize=(7, 3))
for n, snap in snapshots:
    ax.plot(x, snap, label=f"t = {n*dt:.2f}")
ax.set(xlabel="x", ylabel="phi(t, x)", title="끈 위의 파동: 다섯 시점")
ax.legend(fontsize=8)
plt.tight_layout()
```

펄스가 좌우로 갈라지고, 양끝에서 부호가 뒤집혀 반사되는 모습이 보이면 — 무한 자유도 계의 운동방정식을 직접 풀어본 셈이다.

## 다음 장으로

[6장: 고전 장론](../06-classical-field-theory/) 에서는 이 장의 스칼라 장을 상대론적으로 확장해 클라인–고든 방정식과 라그랑지안 밀도의 로런츠 불변성, 그리고 장에 대한 노이터 정리까지 한 번에 다룬다. 이 장의 끈 방정식이 그대로 시공간 위에서 회전 대칭과 만나는 그림이 펼쳐질 것이다.
