---
title: '미분형식 — 적분의 진짜 주인공'
description: '벡터 미적분의 grad·curl·div와 네 개의 적분 정리는, 다양체 위의 $d$ 와 한 줄짜리 스토크스 정리로 통합된다.'
book: analytical-mechanics-1
bookTitle: 해석역학 I
chapter: 6
lang: ko
pairSlug: am1-differential-forms
draft: false
updated: 2026-05-14
---

# 미분형식 — 적분의 진짜 주인공

> 벡터 미적분의 grad·curl·div와 네 개의 적분 정리는, 다양체 위의 $d$ 와 한 줄짜리 스토크스 정리로 통합된다.

## 들어가며

학부 벡터 미적분에서 우리는 grad, curl, div 세 가지 미분 연산과, 미적분의 기본정리·그린 정리·켈빈–스토크스 정리·가우스 발산 정리 네 가지 적분 정리를 따로따로 외운다. 이 장은 그 네 개의 정리가 사실은 한 줄의 같은 식 $\int_M d\omega = \int_{\partial M} \omega$ 라는 사실을 보이는 장이다. 등장 도구는 **1-형식**, **쐐기곱**(wedge product), **외미분**(exterior derivative) $d$ 단 세 가지. 이 장을 끝내면 독자는 "벡터장으로 쓰여 있던 식을 1-형식으로 옮겨 적으면 차원에 상관없이 같은 정리가 적용된다"는 시각을 갖게 된다. 7장의 라그랑주 역학에서 작용 적분과 변분을 다룰 때 이 언어가 곧바로 필요해진다.

## 본론 1 — 1-형식, 벡터의 짝

**1-형식**(1-form) $\omega$ 는 한 점에서 벡터 하나를 받아 실수 하나를 돌려주는 선형 사상이다. 즉 벡터의 **쌍대**(dual) 다. 좌표계 $x^1, \ldots, x^n$ 에서 미분 $dx^i$ 는 "벡터의 $i$-번째 성분을 뽑아내는 기계"로 정의되고, 임의의 1-형식은 이 기저의 선형결합으로

$$
\omega = \omega_i \, dx^i
$$

처럼 적힌다 (아인슈타인 합 규약). $\omega_i$ 가 위치의 함수면 1-형식 **장**(field) 이 된다.

가장 익숙한 예가 함수 $f(x, y, z)$ 의 **전미분**(exact differential):

$$
df = \frac{\partial f}{\partial x}\, dx + \frac{\partial f}{\partial y}\, dy + \frac{\partial f}{\partial z}\, dz
$$

물리에서 "$df$ 는 작은 변위 $d\vec r$ 에 대한 $f$ 의 변화량"이라고 배운 그 식이다. 이제 보면 $df$ 는 단순한 표기가 아니라 **그 자체가 1-형식**이다. 변위 벡터를 꽂으면 함수값의 1차 변화가 나오는 기계.

## 본론 2 — 쐐기곱과 더 높은 차수의 형식

면적·부피처럼 방향을 가진 양을 다루려면 1-형식 두 개를 곱해 2-형식을 만들 도구가 필요하다. **쐐기곱**(wedge product) $\wedge$ 는 다음 규칙으로 정의되는 반대칭 곱이다:

$$
dx \wedge dy = -\, dy \wedge dx, \qquad dx \wedge dx = 0
$$

반대칭이라는 한 줄 규칙으로부터 모든 것이 따라 나온다. 3차원에서 일반적인 **2-형식**은

$$
\omega = P\, dy \wedge dz + Q\, dz \wedge dx + R\, dx \wedge dy
$$

꼴이고, 두 벡터 $\vec u, \vec v$ 를 꽂으면 그 두 벡터가 만든 평행사변형의 부호 있는 넓이(에 가중치 $P, Q, R$ 을 곱한 합)를 돌려준다. $n$-차원 다양체 위에서 **최고 차수**인 $n$-형식이 곧 부피요소다. **방향**(orientation) 이란 "어디서도 0이 되지 않는 최고차 형식 하나를 고르는 것"으로 정의된다 — 좌표 없이도 부호 있는 부피를 정할 수 있는 가장 깔끔한 방법이다.

## 본론 3 — 외미분 $d$ 와 grad·curl·div 통합

**외미분**(exterior derivative) $d$ 는 $k$-형식을 받아 $(k+1)$-형식을 돌려주는 선형 연산이다. 0-형식(함수) $f$ 에 대해서는 본론 1에서 이미 봤다: $df = \partial_i f\, dx^i$. 1-형식 $\omega = \omega_i\, dx^i$ 에 대해서는

$$
d\omega = (\partial_i \omega_j)\, dx^i \wedge dx^j = \tfrac{1}{2}\,(\partial_i \omega_j - \partial_j \omega_i)\, dx^i \wedge dx^j
$$

쐐기곱의 반대칭성이 자동으로 회전을 잡아낸다. $d$ 의 가장 중요한 성질 한 줄은

$$
d^2 = 0
$$

(편미분의 교환성에서 직접 따라 나온다.) 3차원에서 이 한 연산이 벡터 미적분의 세 연산을 통합한다:

- 0-형식 $f$ 에 $d$ 를 작용하면 1-형식 $df$ — 성분이 곧 **그래디언트** $\nabla f$.
- 1-형식 $\omega = A_x dx + A_y dy + A_z dz$ 에 $d$ 를 작용하면 2-형식 — 그 성분이 곧 **컬** $\nabla \times \vec A$.
- 2-형식에 $d$ 를 작용하면 3-형식 — 그 계수가 곧 **다이버전스** $\nabla \cdot \vec B$.

그리고 $d^2 = 0$ 은 곧 항등식 $\nabla \times \nabla f = 0$, $\nabla \cdot (\nabla \times \vec A) = 0$ 두 줄을 한 번에 말한 것이다.

## 본론 4 — 스토크스 정리 한 줄

이제 본론. 콤팩트하고 방향이 정해진 다양체 $M$ 과 그 경계 $\partial M$ 에 대해, 임의의 $(\dim M - 1)$-형식 $\omega$ 는

$$
\int_M d\omega = \int_{\partial M} \omega
$$

이 한 줄이 학부에서 따로 외웠던 네 정리를 모두 포함한다.

- $M$ 이 1차원 구간 $[a, b]$, $\omega = f$ 일 때 → **미적분의 기본정리** $\int_a^b f'\, dx = f(b) - f(a)$.
- $M$ 이 평면 영역, $\omega = P\, dx + Q\, dy$ 일 때 → **그린 정리** $\iint_M (\partial_x Q - \partial_y P)\, dx\, dy = \oint_{\partial M} (P\, dx + Q\, dy)$.
- $M$ 이 3차원 공간의 2-곡면, $\omega = \vec A \cdot d\vec r$ 일 때 → **켈빈–스토크스 정리** $\iint_M (\nabla \times \vec A) \cdot d\vec S = \oint_{\partial M} \vec A \cdot d\vec r$.
- $M$ 이 3차원 입체, $\omega$ 가 2-형식일 때 → **가우스 발산 정리** $\iiint_M \nabla \cdot \vec B\, dV = \iint_{\partial M} \vec B \cdot d\vec S$.

같은 식을 차원과 형식의 차수만 바꿔 가며 네 번 적은 것이다. "한 번 외워서 네 군데 쓰는" 식이 만들어지는 순간, 벡터 미적분이 갑자기 작아진다.

## 파이썬으로 확인

```python
# 단위 원판 위에서 그린 정리를 수치로 확인.
# omega = -y dx + x dy  →  d omega = 2 dx ^ dy
# 경계 적분과 영역 적분이 모두 2π 근방이어야 한다.
import numpy as np

# (a) 경계 적분: 단위원을 t in [0, 2π] 로 매개변수화
N = 20000
t = np.linspace(0.0, 2.0 * np.pi, N, endpoint=False)
dt = (2.0 * np.pi) / N
x, y = np.cos(t), np.sin(t)
dxdt, dydt = -np.sin(t), np.cos(t)

# omega(γ'(t)) = (-y)·x'(t) + x·y'(t) = sin^2 t + cos^2 t = 1
integrand_boundary = (-y) * dxdt + x * dydt
line_integral = np.sum(integrand_boundary) * dt

# (b) 영역 적분: d omega = 2 dx ^ dy, 단위 원판 위에서 2·면적 = 2π
M = 2000
xs = np.linspace(-1.0, 1.0, M)
ys = np.linspace(-1.0, 1.0, M)
X, Y = np.meshgrid(xs, ys, indexing="xy")
inside = (X * X + Y * Y) <= 1.0
cell_area = (xs[1] - xs[0]) * (ys[1] - ys[0])
area_integral = 2.0 * np.sum(inside) * cell_area

print(f"∫∂M ω   = {line_integral:.6f}")
print(f"∫M  dω  = {area_integral:.6f}")
print(f"이론값 2π = {2.0 * np.pi:.6f}")
```

두 값이 모두 $2\pi \approx 6.2832$ 근방에 떨어지면, 스토크스 정리의 가장 단순한 사례를 손으로 만져본 셈이다. 격자를 조밀하게 할수록 영역 적분 쪽이 천천히 수렴한다.

## 다음 장으로

[7장: 라그랑주 역학](../07-lagrangian-mechanics/)에서는 이 장의 1-형식과 외미분이 작용 적분 $S = \int L\, dt$ 의 변분을 다루는 데 곧장 쓰인다. 운동방정식의 좌변 $\frac{d}{dt}\frac{\partial L}{\partial \dot q} - \frac{\partial L}{\partial q} = 0$ 도, 결국은 위상공간의 어떤 1-형식이 닫힌 형식이 된다는 조건의 성분 표현이다. 형식 언어가 머릿속에 있으면, 라그랑지안에서 해밀토니안으로 넘어가는 다음 장도 한 줄짜리 르장드르 변환으로 보이게 된다.
