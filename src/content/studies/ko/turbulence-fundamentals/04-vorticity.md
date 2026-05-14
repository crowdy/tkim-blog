---
title: '와도와 와도 방정식 — 난류는 왜 반드시 3차원인가'
description: '와도(vorticity)의 정의에서 시작해 와도 방정식의 네 항을 한 줄씩 읽고, 와도 신장 항이 사라지는 2차원 흐름은 왜 난류가 될 수 없는지를 따라간다.'
book: turbulence-fundamentals
bookTitle: 난류해석의 기초
chapter: 4
lang: ko
pairSlug: turbulence-vorticity
draft: false
updated: 2026-05-14
---

# 와도와 와도 방정식 — 난류는 왜 반드시 3차원인가

> 와도(vorticity)의 정의에서 시작해 와도 방정식의 네 항을 한 줄씩 읽고, 와도 신장 항이 사라지는 2차원 흐름은 왜 난류가 될 수 없는지를 따라간다.

## 들어가며

3장에서 나비에-스토크스 방정식을 속도 $\vec{u}$에 대해 적었다. 이번 장에서는 같은 방정식을 **와도** $\vec{\omega}$ (오메가)에 대한 형태로 다시 쓴다. 왜 굳이 그러느냐 — 와도 방정식에는 압력 항이 사라지고, 대신 **와도 신장(vortex stretching)** 이라는 항이 나타나기 때문이다. 이 항 하나가 1장에서 본 난류의 다섯 가지 특성 중 "3차원 와도 변동"과 "작은 스케일로의 에너지 전달"을 동시에 설명한다. 이 장을 끝낸 독자는 "왜 난류는 반드시 3차원이어야 하는가"를 한 줄의 수식으로 말할 수 있어야 한다.

## 본론 1 — 와도란 무엇인가

와도는 속도장의 회전(curl)이다. $\nabla$ (나블라, 기울기·회전 연산자)를 사용해

$$
\vec{\omega} = \nabla \times \vec{u}
$$

로 정의한다. 직관적으로는 "유체 입자가 자기 자신을 축으로 얼마나 빠르게 도는가"의 두 배에 해당한다. 강체처럼 회전하는 흐름이면 $\vec{\omega}$는 회전축 방향의 일정한 벡터, 직선으로 흐르는 균일 흐름이면 $\vec{\omega} = 0$이다.

텐서 표기(2장)로는

$$
\omega_i = \epsilon_{ijk} \frac{\partial u_k}{\partial x_j}
$$

이다. 여기서 $\epsilon_{ijk}$ (엡실론 ijk)는 **레비-치비타 기호(Levi-Civita symbol)** 로, 다음 규칙을 따른다.

- 순환 순서(123, 231, 312)이면 $+1$
- 반순환 순서(132, 213, 321)이면 $-1$
- 두 첨자가 겹치면 $0$

여섯 가지 경우를 외울 필요는 없다. 중요한 것은 **이 기호 하나가 외적(cross product)을 첨자 표기로 깔끔하게 포장한다**는 점이다. 예컨대 $\omega_1 = \partial u_3/\partial x_2 - \partial u_2/\partial x_3$이 $\epsilon_{123}=+1, \epsilon_{132}=-1$에서 자동으로 나온다.

## 본론 2 — 와도 방정식

비압축성(밀도가 일정한)·외력이 없는 흐름의 나비에-스토크스 방정식 양변에 회전을 취하면 압력 항이 소거되고, 다음 식을 얻는다.

$$
\frac{\partial \omega_i}{\partial t} + u_j \frac{\partial \omega_i}{\partial x_j} = \omega_j \frac{\partial u_i}{\partial x_j} + \nu \frac{\partial^2 \omega_i}{\partial x_j \partial x_j}
$$

네 항을 왼쪽에서 오른쪽으로 한 줄씩 읽는다.

- $\partial \omega_i / \partial t$ — 와도의 시간 변화
- $u_j \, \partial \omega_i / \partial x_j$ — 흐름을 따라 와도가 운반되는 **이류(convection)**
- $\omega_j \, \partial u_i / \partial x_j$ — **와도 신장(vortex stretching)**
- $\nu \, \partial^2 \omega_i / \partial x_j \partial x_j$ — 점성에 의한 **확산(viscous diffusion)**, 여기서 $\nu$ (뉴)는 동점성계수(m²/s)

세 번째 항이 이번 장의 주인공이다. 와도 벡터 $\vec{\omega}$ 방향으로 속도가 늘어나면(즉 그 방향의 $\partial u_i/\partial x_j$가 양수이면) 와도 자체가 증폭된다 — 마치 회전하는 피겨스케이터가 팔을 모아 더 빨리 도는 것과 같다. 이 메커니즘이 큰 와류를 잡아 늘여 가늘게 만들고, 그 결과 더 작은 스케일에 와도 에너지가 쌓인다. 9장에서 다룰 에너지 캐스케이드의 미시적 정체가 바로 이것이다.

## 본론 3 — 2차원에서는 와도 신장이 사라진다

이제 강제로 2차원인 흐름을 생각해 보자. $\vec{u} = (u_x, u_y, 0)$이고 모든 변수는 $z$에 무관하다. 와도를 계산하면 $x$, $y$ 성분이 모두 0이 되어

$$
\vec{\omega} = (0, 0, \omega_z)
$$

뿐이다. 와도 신장 항 $\omega_j \, \partial u_i / \partial x_j$에서 $\omega_j$는 $j=3$ 성분만 살아 있으므로

$$
\omega_j \frac{\partial u_i}{\partial x_j} = \omega_z \frac{\partial u_i}{\partial z} = 0
$$

이 된다. $z$로 아무것도 변하지 않기 때문이다.

결과는 결정적이다.

> **2차원 흐름에서는 와도 신장이 0이므로, 작은 스케일로의 에너지 캐스케이드가 일어나지 않고, 따라서 1장에서 정의한 다섯 가지 의미의 "난류"가 성립하지 않는다.**

2차원 흐름도 불규칙하고 확산성이 있을 수 있지만(이를 "2D turbulence"라고 부르는 문헌도 있다), 그 동역학은 작은 스케일이 큰 스케일로 합쳐지는 **역캐스케이드(inverse cascade)** 이며, 3차원 난류와는 본질적으로 다른 현상이다. 산업 CFD가 항상 3차원 메쉬를 쓰는 이유가 여기 있다.

## 파이썬으로 확인

가장 간단한 2차원 흐름 $\vec{u}(x, y) = (y, 0)$ (균일 전단)에서 $\omega_z$를 수치로 계산해 본다. 정답은 $\omega_z = \partial u_y/\partial x - \partial u_x/\partial y = 0 - 1 = -1$로, 영역 전체에서 상수다.

```python
import numpy as np

# 100×100 격자, [0, 1]^2 영역
N = 100
x = np.linspace(0.0, 1.0, N)
y = np.linspace(0.0, 1.0, N)
X, Y = np.meshgrid(x, y, indexing="xy")

# 균일 전단 흐름: u_x = y, u_y = 0
u_x = Y
u_y = np.zeros_like(X)

# np.gradient는 (행=y, 열=x) 순서로 미분을 반환
dux_dy, dux_dx = np.gradient(u_x, y, x)
duy_dy, duy_dx = np.gradient(u_y, y, x)

# 와도의 z 성분
omega_z = duy_dx - dux_dy

print(f"omega_z 최솟값 = {omega_z.min():.6f}")
print(f"omega_z 최댓값 = {omega_z.max():.6f}")
print(f"omega_z 평균   = {omega_z.mean():.6f}")
```

세 값이 모두 $-1$에 가깝게 출력된다. 영역 전체에서 $\omega_z$가 상수라는 사실은 "전단이 균일하므로 회전의 강도도 어디서나 같다"는 것을 그대로 반영한다. 이 흐름은 와도가 있지만 와도 신장이 없고, 따라서 난류로 진화할 수 없다.

## 다음 장으로

[5장: 레이놀즈 평균과 RANS 방정식](../05-reynolds-averaging/)에서는 시점을 바꾼다. 지금까지는 순간 속도장 $\vec{u}(\vec{x}, t)$를 다뤘지만, 실제 산업 응용에서는 평균 흐름과 변동의 분리가 더 유용하다. 와도 신장이 만든 변동을 어떻게 평균 방정식에 다시 집어넣을지 — 이른바 폐쇄 문제(closure problem)의 입구로 들어간다.
