---
title: '고전 장론 — 스칼라장과 클라인–고든'
description: '시공간의 모든 점에 하나의 실수를 얹는다 — 가장 단순한 상대론적 파동방정식이 어떻게 작용 원리에서 떨어지는가.'
book: analytical-mechanics-2
bookTitle: 해석역학 II
chapter: 6
lang: ko
pairSlug: am2-classical-field-theory
draft: false
updated: 2026-05-14
---

# 고전 장론 — 스칼라장과 클라인–고든

> 시공간의 모든 점에 하나의 실수를 얹는다 — 가장 단순한 상대론적 파동방정식이 어떻게 작용 원리에서 떨어지는가.

## 들어가며

5장에서 우리는 라그랑지안 형식을 입자에서 장(field)으로 확장했다. 자유도가 셀 수 있는 집합 $\{q_i(t)\}$ 에서 시공간 위에 깔린 연속 함수 $\phi(t, \vec x)$ 로 바뀌었지만, "작용을 정류시키면 운동방정식이 떨어진다"는 골격은 똑같이 살아남는다. 이 장에서는 그 골격을 가장 단순한 사례 — **실 스칼라장(real scalar field)** — 에 적용해 본다. 이 장을 마치면 독자는 작용 한 줄에서 **클라인–고든 방정식(Klein–Gordon equation)** 을 직접 유도할 수 있고, 왜 이 방정식이 양자장론으로 가는 첫 디딤돌이 되는지 한 문장으로 말할 수 있다.

이 장에서는 **시공간 계량(metric)** 으로 **(+, -, -, -) 부호 규약**을 쓴다. 즉 $\eta_{\mu\nu} = \mathrm{diag}(+1, -1, -1, -1)$. 또한 본문 중반부터 자연 단위계 $c = 1$ 을 사용한다.

## 본론 1 — 4-벡터 셋업

시공간 위의 한 점을 4-벡터

$$
x^\mu = (ct,\ \vec x), \qquad \mu \in \{0, 1, 2, 3\}
$$

로 적는다. 그리스 첨자 $\mu$ (뮤, mu) 는 0부터 3까지 달린다. 0번째 성분이 시간 곱하기 광속, 1~3번째가 공간 좌표다.

계량 텐서(metric tensor) $\eta_{\mu\nu}$ 는 첨자 두 개를 한 번에 내리고 올리는 데 쓰는 대칭 행렬이다. 이 책에서는

$$
\eta_{\mu\nu} = \mathrm{diag}(+1, -1, -1, -1)
$$

로 잡는다 (이른바 mostly-minus 규약). 역행렬 $\eta^{\mu\nu}$ 도 같은 모양이다. 같은 첨자가 위·아래 한 번씩 나오면 0부터 3까지 합한다 — **아인슈타인 합 규칙(Einstein summation)**.

편미분 연산자를 4-벡터로 묶으면

$$
\partial_\mu = \frac{\partial}{\partial x^\mu} = \left( \frac{1}{c}\partial_t,\ \nabla \right), \qquad \partial^\mu = \eta^{\mu\nu}\partial_\nu = \left( \frac{1}{c}\partial_t,\ -\nabla \right).
$$

두 연산자를 한 번 더 축약하면 **달랑베르시안(d'Alembertian)** 이 나온다:

$$
\Box = \partial^\mu \partial_\mu = \frac{1}{c^2}\partial_t^2 - \nabla^2.
$$

이것이 4차원판 라플라시안이다. 지금부터는 표기를 줄이기 위해 $c = 1$ 로 놓는다. 시간과 공간이 같은 단위(길이 단위)를 가지게 되며, $\partial_0 = \partial_t$ 가 된다.

## 본론 2 — 스칼라장 라그랑지안과 클라인–고든

**실 스칼라장(real scalar field)** $\phi(t, \vec x)$ 은 시공간의 각 점에 하나의 실수를 부여하는 함수다. 회전이나 부스트로 좌표축을 돌려도 그 점에서의 값은 변하지 않는다 — 그래서 "스칼라"라 부른다.

가장 단순한 로런츠 불변 라그랑지안 밀도(Lagrangian density)는

$$
\mathcal{L} = \tfrac{1}{2}\partial^\mu \phi\, \partial_\mu \phi - \tfrac{1}{2} m^2 \phi^2.
$$

여기서 $m$ 은 장에 붙는 질량 모수(mass parameter)다. 첫 항은 시공간 미분 두 개를 묶어 만든 운동에너지 항, 두 번째는 퍼텐셜 항이다.

5장에서 얻은 **장에 대한 오일러–라그랑주 식**

$$
\partial_\mu \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)} = \frac{\partial \mathcal{L}}{\partial \phi}
$$

에 직접 대입해 보자. 좌변 안쪽은 $\partial \mathcal{L}/\partial(\partial_\mu \phi) = \partial^\mu \phi$, 우변은 $\partial \mathcal{L}/\partial \phi = -m^2 \phi$. 따라서

$$
(\Box + m^2)\, \phi = 0
$$

이것이 **클라인–고든 방정식(Klein–Gordon equation)** 이다.

평면파 시험해 $\phi = e^{-i(\omega t - \vec k \cdot \vec x)}$ 를 넣으면 $\omega^2 = |\vec k|^2 + m^2$, 즉 **상대론적 분산관계**가 떨어진다. 질량 $m$ 이 0이면 광선 분산 $\omega = |\vec k|$ 로 환원되고, $m \neq 0$ 이면 파장이 짧아질수록 군속도가 광속에 접근한다.

## 본론 3 — 왜 클라인–고든이 중요한가

클라인–고든은 **스핀 0인 보손(boson)** 을 기술하는 가장 낮은 차수의 상대론적 파동방정식이다. 1920년대 후반 슈뢰딩거 자신도 처음에는 이 식을 "상대론적 슈뢰딩거 방정식" 후보로 만들어 보았다. 그러나 곧 두 가지 문제에 부딪힌다.

첫째, 시간에 대해 **2차** 미분이라서, 초기 조건으로 $\phi$ 뿐 아니라 $\partial_t \phi$ 까지 줘야 한다. 슈뢰딩거 식은 1차 미분이어서 $\psi$ 만 주면 충분했다. 둘째, $\omega^2 = |\vec k|^2 + m^2$ 의 해 $\omega = \pm\sqrt{|\vec k|^2 + m^2}$ 에는 **음의 에너지 해**가 함께 나온다. 단일 입자 확률 해석을 강제로 입히려 하면 확률밀도가 음수가 될 수 있다.

해결은 한참 뒤에야 나왔다. 클라인–고든은 한 입자의 파동함수가 아니라, **양자화(quantization)** 를 거쳐 스핀 0 보손 — 예컨대 힉스 보손이나 파이온 — 을 만드는 *고전* 장방정식이라는 것이다. 음의 에너지 해는 반입자로 재해석된다.

이 장의 결과는 9장에서 한 번 더 만난다. 거기서는 작용 $S$ 를 가중치 $e^{iS/\hbar}$ 로 묶어 모든 경로에 대해 합하는 **경로적분(path integral)** 을 다루는데, $\hbar \to 0$ 극한에서 정류점이 살아남아 오일러–라그랑주 식이 복원된다. 클라인–고든은 그 정류점의 가장 깔끔한 예가 된다.

## 파이썬으로 확인

```python
# 1+1 차원 클라인-고든 방정식의 도약 (leapfrog) 적분.
# (∂_t^2 - ∂_x^2 + m^2) φ = 0
# 가우시안 초기 조건을 넣고 시간이 흐르며 파속이 분산하는 모습을 본다.
import numpy as np
import matplotlib.pyplot as plt

Nx, dx = 400, 0.1
x = np.linspace(-20, 20, Nx)
dt = 0.05
m = 1.0

# 초기 조건: 폭 1.5의 가우시안, 초기 속도는 0
phi_prev = np.exp(-(x / 1.5)**2)
phi = phi_prev.copy()  # ∂_t φ = 0 이므로 한 스텝 전도 동일

snapshots = {0.0: phi.copy()}
target_times = [5.0, 10.0, 15.0]

t, step = 0.0, 0
while t < target_times[-1] + dt:
    lap = np.zeros_like(phi)
    lap[1:-1] = (phi[2:] - 2*phi[1:-1] + phi[:-2]) / dx**2
    phi_next = 2*phi - phi_prev + dt**2 * (lap - m**2 * phi)
    phi_prev, phi = phi, phi_next
    t += dt; step += 1
    for tt in target_times:
        if abs(t - tt) < dt/2 and tt not in snapshots:
            snapshots[tt] = phi.copy()

for tt, snap in snapshots.items():
    plt.plot(x, snap, label=f"t = {tt:.0f}")
plt.xlabel("x"); plt.ylabel(r"$\phi(x, t)$")
plt.legend(); plt.title("1+1D Klein-Gordon — 분산하는 파속")
plt.show()
```

가우시안은 시간이 흐르면서 양쪽으로 갈라지지만, 광속만으로 진행하는 무질량 파동과 달리 봉우리가 점점 낮아지고 폭이 넓어진다. 이것은 $m^2$ 항 때문에 $k$ 성분마다 군속도 $v_g = k/\sqrt{k^2 + m^2}$ 가 달라지는 **분산(dispersion)** 의 결과다.

## 다음 장으로

[7장: 상대론적 역학](../07-relativistic-mechanics/)에서는 이 장에서 깔아둔 4-벡터 도구상자를 입자 쪽으로 되돌려, 자유 입자의 작용 $S = -m \int d\tau$ 에서 시작해 4-운동량, 4-가속도, 그리고 외력에서의 운동방정식을 정리한다. 장과 입자가 같은 변분 원리 아래 어떻게 한 폭의 그림으로 묶이는지를 보게 된다.
