---
title: '변분 원리 — 작용을 정류시키는 경로'
description: '경로 $q(t)$ 에 수를 대응시키는 범함수 $S[q] = \int L\,dt$ — 그 정류점이 운동방정식이라는 한 줄이, 좌표를 잊고 장과 양자까지 가는 다리 전체를 떠받친다.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 8
lang: ko
pairSlug: am1-variational-principle
draft: false
updated: 2026-05-14
---

# 변분 원리 — 작용을 정류시키는 경로

> 경로 $q(t)$ 에 수를 대응시키는 범함수 $S[q] = \int L\,dt$ — 그 정류점이 운동방정식이라는 한 줄이, 좌표를 잊고 장과 양자까지 가는 다리 전체를 떠받친다.

## 들어가며

7장까지 우리는 라그랑지언 $L(q, \dot q, t)$ 와 그 오일러–라그랑주(Euler–Lagrange) 방정식을 다양체 위의 벡터장과 미분형식의 언어로 다뤘다. 이번 장은 그 방정식이 어디에서 오는지를 한 번 더 거슬러 올라간다. 답은 **작용(action)** 이라는 단 하나의 수. 이 장이 끝나면 독자는 "물리적 궤적이란 작용을 정류(stationary) 시키는 경로다"라는 해밀턴 원리를 정확히 진술할 수 있어야 하고, $\delta S = 0$ 한 줄에서 EL 방정식을 손으로 굴려 낼 수 있어야 한다. 동시에, 왜 이 원리가 단순한 재포장이 아니라 — 좌표 변환에 무관하고, 부분계에 가산적이며, 장·게이지·경로적분으로 곧장 연장되는 — 역학 유일의 보편 언어인지도 한 문단으로 정리할 수 있어야 한다.

## 본론 1 — 범함수로서의 작용

**범함수(functional)** 란 *함수에 수를 대응시키는* 사상이다. 보통 함수 $q: \mathbb{R} \to \mathbb{R}^n$ 가 점 $t$ 에 점 $q(t)$ 를 주는 사상이라면, 범함수는 *함수 전체*에 수 하나를 준다. 예: 곡선의 길이 $\ell[\gamma] = \int |\dot\gamma|\,dt$, 어떤 영역 위 함수의 적분 $\int_\Omega f\, dV$. 모두 "함수가 들어가면 수가 나온다."

해석역학의 주인공은 **작용**이라는 범함수다. 시각 $t_1, t_2$ 와 그 사이의 매끄러운 경로 $q: [t_1, t_2] \to M$ 에 대해

$$
S[q] = \int_{t_1}^{t_2} L\bigl(q(t),\, \dot q(t),\, t\bigr)\, dt
$$

$S$ 의 단위는 $L$ 의 단위 곱하기 초, 즉 에너지·시간이며 SI 단위로 $\text{J}\cdot\text{s}$. 플랑크 상수 $\hbar$ (에이치바) 가 동일 단위라는 점은 양자역학에서 작용이 다시 등장할 때 의미가 살아난다.

**해밀턴 원리(principle of stationary action)** 는 다음 한 줄이다: 두 끝점 $q(t_1) = q_1$, $q(t_2) = q_2$ 를 고정한 모든 매끄러운 경로의 집합 위에서, 물리적으로 실현되는 경로는 $S$ 의 **정류점(stationary point)** 이다. 정류점이란 작은 변분 $q \to q + \delta q$ 에 대해 $S$ 의 일차 변화가 0 이라는 뜻 — 일반적으로 최소도, 최대도 아닌 안장점(saddle)일 수 있다. "최소 작용"이라는 표현이 흔하지만 정확하지 않다. 정류점이 맞는 표현이다.

여기서 변분 $\delta q$ 는 **끝점에서 사라지는** 임의의 매끄러운 함수다. 즉 $\delta q(t_1) = \delta q(t_2) = 0$. 끝점은 경계 조건으로 주어진 상수이지 변수가 아니다.

## 본론 2 — $\delta S = 0$ 에서 오일러–라그랑주

이제 변분을 직접 계산하자. $S[q + \delta q] - S[q]$ 를 $\delta q$ 의 일차까지 전개한다. 표기는 아인슈타인 합 규약을 그대로 쓰며, 자유도 인덱스 $i = 1, \ldots, n$.

$$
\delta S = \int_{t_1}^{t_2} \!\left( \frac{\partial L}{\partial q^i}\,\delta q^i + \frac{\partial L}{\partial \dot q^i}\,\delta \dot q^i \right) dt
$$

여기서 $\delta \dot q^i = \frac{d}{dt}(\delta q^i)$ 이다 (변분과 시간 미분은 가환). 둘째 항을 부분적분하면

$$
\int_{t_1}^{t_2} \frac{\partial L}{\partial \dot q^i}\, \frac{d}{dt}(\delta q^i)\, dt = \left[ \frac{\partial L}{\partial \dot q^i}\, \delta q^i \right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \frac{d}{dt}\!\left( \frac{\partial L}{\partial \dot q^i} \right) \delta q^i\, dt
$$

경계항은 $\delta q(t_1) = \delta q(t_2) = 0$ 에 의해 사라진다. 남은 양을 모으면

$$
\delta S = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q^i} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^i} \right) \delta q^i \, dt
$$

물리적 경로는 *임의의* 허용 가능한 $\delta q$ 에 대해 $\delta S = 0$ 이어야 한다. 여기서 **변분법의 기본 보조정리(fundamental lemma)** 가 필요하다: 연속함수 $f(t)$ 가 모든 매끄러운 $\delta q(t)$ — 단, $\delta q(t_1) = \delta q(t_2) = 0$ — 에 대해 $\int f\, \delta q\, dt = 0$ 을 만족한다면, $f \equiv 0$. 한 줄로 정당화하면: 만약 어떤 점에서 $f(t_*) > 0$ 이라면, 그 점 근방에서만 양수인 매끄러운 종모양 $\delta q$ 를 골라 $\int f \delta q\, dt > 0$ 을 만들 수 있어 가정에 모순이다.

따라서 괄호 안이 모든 $i$ 에 대해 0:

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^i} - \frac{\partial L}{\partial q^i} = 0
$$

이것이 오일러–라그랑주 방정식이다. 6, 7장에서 천하 명령으로 받았던 그 식이 단 하나의 범함수의 정류 조건이라는 사실이 여기서 비로소 보인다.

## 본론 3 — 왜 이것이 그저 대수가 아닌가

EL 방정식을 다른 방식으로 — 뉴턴 법칙에서 일반화 좌표로 변환해서, 또는 다양체 위의 측지선 방정식으로 — 유도할 수도 있다. 그런데도 변분 원리가 "역학의 진짜 출발점"으로 모셔지는 이유는 셋이다.

첫째, **좌표 자유성(coordinate-freedom)**. $S$ 는 스칼라 — 수 하나 — 다. 좌표를 어떻게 잡든 $S$ 의 값은 변하지 않는다. 따라서 정류점도 변하지 않는다. EL 방정식이 임의의 매끄러운 좌표 변환 아래 형태를 유지한다는 사실은, 변분 원리에서 보면 *증명할 필요조차 없는* 자명한 따름이다.

둘째, **가산성(additivity)**. 두 부분계 1, 2 가 있고 상호작용이 있다면 전체 라그랑지언은 $L = L_1 + L_2 + L_\mathrm{int}$, 따라서 $S = S_1 + S_2 + S_\mathrm{int}$. 변분도 합쳐진다. 뉴턴 법칙으로는 자유도가 늘 때마다 식을 새로 적어야 하지만, 변분 원리에서는 항을 더하는 것으로 끝난다. 이 가산성은 II권 5장에서 장의 라그랑지언 밀도 $\mathcal{L}$ 로 확장될 때 그대로 살아남는다.

셋째이자 가장 결정적으로, **확장성**. 작용 원리는 우리가 아는 한, 역학을 — 점 입자에서 — 장(field), 게이지 이론, 일반상대성, 그리고 양자역학의 경로적분(II권 9장)까지 **하나의 언어로** 끌고 가는 유일한 형식이다. 양자역학에서 $e^{iS/\hbar}$ 의 위상이 모든 경로에 대해 더해지면, 고전 극한 $\hbar \to 0$ 에서 $\delta S = 0$ 인 경로가 가장 큰 기여를 한다는 사실이 그대로 따라온다. "왜 자연이 정류 경로를 고르는가" 의 답이 양자역학에 있는 것이다.

## 파이썬으로 확인

```python
# 단진자의 이산 변분 적분(symplectic Verlet)으로 경로를 그리고
# 이산 에너지가 (소소한 진동은 있어도) 시간에 따라 표류하지 않음을 본다.
# 라그랑지언 L = (1/2) θ̇² + cos θ  (g/ℓ = 1).
import numpy as np
import matplotlib.pyplot as plt

dt = 0.05
N  = 200

theta    = np.empty(N + 1)
theta[0] = 0.5             # 초기 각도 [rad]
theta[1] = theta[0]        # 초기 속도 0  ⇒  q₁ ≈ q₀

# 이 라그랑지언에 대한 이산 EL = symplectic Verlet
for n in range(1, N):
    theta[n + 1] = 2 * theta[n] - theta[n - 1] - dt**2 * np.sin(theta[n])

# 이산 운동에너지 (중심차분)와 위치에너지로 이산 에너지 정의
v = (theta[2:] - theta[:-2]) / (2 * dt)
E = 0.5 * v**2 - np.cos(theta[1:-1])
t = np.arange(N + 1) * dt

fig, ax = plt.subplots(2, 1, figsize=(6, 4), sharex=True)
ax[0].plot(t, theta);        ax[0].set_ylabel("θ [rad]")
ax[1].plot(t[1:-1], E);      ax[1].set_ylabel("이산 에너지")
ax[1].set_xlabel("t");       plt.tight_layout(); plt.show()

print(f"E_min = {E.min():.6f},  E_max = {E.max():.6f}")
```

각도는 진폭이 거의 일정한 진동을 그리고, 이산 에너지는 작은 폭(약 $10^{-4}$ 이하) 안에서 출렁이기만 한다 — 표류하지 않는다는 사실이 변분 적분기의 특징이며, 작용 원리에서 출발한 시간 적분이 *왜* 보존량을 잘 지키는지는 다음 장의 주제다.

## 다음 장으로

[9장: 대칭과 보존량 — 뇌터 정리](../09-symmetry-and-conservation/)에서는 이 장에서 본 작용이 **연속 대칭** — 시간 평행이동, 공간 평행이동, 회전 — 아래 불변일 때, 그 대칭마다 정확히 하나의 보존량(에너지, 운동량, 각운동량) 이 자동으로 따라옴을 본다. 변분 원리가 그저 EL 방정식을 깔끔하게 적는 도구가 아니라 보존 법칙의 생성기라는 사실이 다음 장의 본문이다.
