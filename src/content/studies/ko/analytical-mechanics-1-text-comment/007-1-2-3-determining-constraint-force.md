---
title: '1.2.3 — 구속력의 결정: 법선 방향이 곱셈자 $\lambda$ 를 묶어 준다'
description: '곡면 위 운동방정식의 *법선 방향* 으로 사영하면 구속력 크기 — 라그랑주 곱셈자 $\lambda$ — 가 운동의 함수로 결정된다. 다랑베르 원리가 *왜* 구속력 식을 따로 풀지 않아도 되는지를 형식적으로 보이는 자리.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 7
lang: ko
pairSlug: am1tc-1-2-3-determining-constraint-force
draft: false
updated: 2026-05-17
---

# 1.2.3 — 구속력의 결정: 법선 방향이 곱셈자 $\lambda$ 를 묶어 준다

> 곡면 위 운동방정식의 *법선 방향* 으로 사영하면 구속력 크기 — 라그랑주 곱셈자 $\lambda$ — 가 운동의 함수로 결정된다. 다랑베르 원리가 *왜* 구속력 식을 따로 풀지 않아도 되는지를 형식적으로 보이는 자리.

## 본문이 말하는 것

원서 1.2.3 절은 1.2.2 의 벡터식

$$
m \ddot{\mathbf r} = \mathbf F^{\text{appl}} + \mathbf R
$$

을 *접선 방향* 과 *법선 방향* 으로 분해한다. 접공간 기저 $\{\mathbf r_u, \mathbf r_v\}$ 와 단위 법선 벡터

$$
\hat{\mathbf n} = \frac{\mathbf r_u \times \mathbf r_v}{|\mathbf r_u \times \mathbf r_v|}
$$

세 벡터가 $\mathbb R^3$ 의 기저. 다랑베르 가정 — 매끄러운 구속 — 으로 구속력은 *법선 성분만* 갖는다:

$$
\mathbf R = \lambda\, \hat{\mathbf n}
$$

여기서 $\lambda \in \mathbb R$ 가 라그랑주 곱셈자 (Lagrange multiplier). 미지수다.

벡터식을 $\hat{\mathbf n}$ 으로 사영 (내적) 하면

$$
m\, \ddot{\mathbf r} \cdot \hat{\mathbf n} = \mathbf F^{\text{appl}} \cdot \hat{\mathbf n} + \lambda
$$

좌변은 가속도의 법선 성분 (1.2.2 에서 본 *굽은 부분*). 따라서

$$
\lambda = m\, \ddot{\mathbf r} \cdot \hat{\mathbf n} - \mathbf F^{\text{appl}} \cdot \hat{\mathbf n}
$$

$\lambda$ 가 $(u, v, \dot u, \dot v, \ddot u, \ddot v)$ 와 외력의 함수로 *결정* 되었다. 그러나 이 식 자체는 운동을 풀지 않는다 — 운동이 결정된 *뒤* 에 구속력 크기를 *읽어내는* 식.

운동을 결정하는 식은 다음 1.2.4 의 *접선 방향* 사영이다.

## 한 번 더, 천천히

**(1) 라그랑주 곱셈자의 두 얼굴.** $\lambda$ 는 (i) 라그랑주식의 부산물 (구속을 미정 곱셈자로 다루는 형식적 도구) 이자 (ii) 물리적 *구속력의 크기* (단진자의 장력 = $\lambda$, 비드의 수직항력 = $\lambda$). 단진자의 $\lambda$ 가 추의 속력에 따라 변하는 까닭은, 위 식의 우변에 $\ddot{\mathbf r} \cdot \hat{\mathbf n}$ 이 들어가 있기 때문 — *원심 가속도* 가 그 정체.

**(2) 다랑베르의 영리함.** 위 분해의 핵심은, 운동방정식의 *접선 부분* 이 $\lambda$ 와 *독립* 이라는 것. 즉 운동을 풀기 위해 $\lambda$ 를 미리 알 필요가 없다. $\lambda$ 는 운동이 풀린 뒤 위 식으로 *사후에* 구해진다. 1.1.3 의 다랑베르 원리를 곡면의 언어로 다시 적은 셈.

**(3) 정밀히 — 단위 법선의 존재.** $\mathbf r_u \times \mathbf r_v \neq 0$ 의 가정 (1.2.1) 이 깨지지 않는 한 $\hat{\mathbf n}$ 이 잘 정의된다. 곡면의 *특이점* (예: 원뿔 꼭짓점) 에서는 위 분해가 무너지고, 그 점에서의 운동은 더 정교한 처리가 필요하다.

## 파이썬으로 확인 — 단진자의 장력 $\lambda$ 결정

이 코드의 메시지는 단순하다: 단진자에서 막대 장력 $\lambda$ 가 *운동 상태* 에 따라 어떻게 변하는지 직접 계산한다. 추의 각도와 각속도가 주어졌을 때 $\lambda$ 의 값이 어떻게 나오는지 본다.

```python
# 단진자: 추의 위치 r = ell * (sinθ, -cosθ).
# n_hat = -r/|r| (구속면 안쪽 = 피벗 방향).
# 운동방정식의 법선 사영:  λ = m * a · n_hat - F^appl · n_hat
import numpy as np
ell, m, g = 1.0, 1.0, 9.81

def constraint_lambda(theta, dtheta, ddtheta):
    # 위치
    r = ell * np.array([np.sin(theta), -np.cos(theta)])
    # 가속도 (해석적)
    a_x = ell * (np.cos(theta) * ddtheta - np.sin(theta) * dtheta**2)
    a_y = ell * (np.sin(theta) * ddtheta + np.cos(theta) * dtheta**2)
    a = np.array([a_x, a_y])
    # 법선 단위벡터 (피벗 방향, 즉 -r 방향)
    n_hat = -r / np.linalg.norm(r)
    # 외력 (중력)
    F_app = np.array([0.0, -m * g])
    # λ = m * a · n_hat - F_app · n_hat
    lam = m * np.dot(a, n_hat) - np.dot(F_app, n_hat)
    return lam

# 정상상태 (θ_dot = 0, θ_ddot = -g/ℓ * sinθ) 에서의 장력
for theta in [0.0, np.pi/6, np.pi/4, np.pi/3, np.pi/2]:
    dtheta = 0.0
    ddtheta = -(g / ell) * np.sin(theta)
    lam = constraint_lambda(theta, dtheta, ddtheta)
    print(f"θ = {theta:.4f} rad,  정지 시 장력 λ = {lam:.4f} N  (cosθ * m g = {m*g*np.cos(theta):.4f})")
```

이 결과는 정지점 ($\dot\theta = 0$) 에서 $\lambda = m g \cos\theta$ 가 나옴을 보인다 — 익숙한 단진자 장력 공식. 일반적인 $\dot\theta \neq 0$ 에서는 *원심 항* $m\ell\dot\theta^2$ 가 더해진다.

## 다음 절(1.2.4)로 가는 다리

법선 방향 사영이 구속력을 *결정* 했다. 운동을 *결정* 하는 식은 같은 분해의 *접선 방향* 사영이다. 다음 1.2.4 는 그 접선 사영을 직접 수행해, 구속력이 사라지고 $(u, v)$ 만으로 적힌 *2 개의 결합 ODE* 가 나오는 모습을 본다. 크리스토펠 기호가 처음으로 명시적으로 등장한다.
