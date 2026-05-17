---
title: '1.2.1 — 곡면의 매개변수 표현: 두 좌표 $(u, v)$ 가 만든 무대'
description: '$\mathbb R^3$ 안의 굽은 무대를 *두 매개변수* 로 묘사한다. 그 두 매개변수의 편미분 $\mathbf{r}_u$, $\mathbf{r}_v$ 가 만드는 접공간, 그리고 그 위의 내적이 결정하는 *제1기본형식* — 곡면의 모든 기하학이 출발하는 자리.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 5
lang: ko
pairSlug: am1tc-1-2-1-parametrized-surface
draft: false
updated: 2026-05-17
---

# 1.2.1 — 곡면의 매개변수 표현: 두 좌표 $(u, v)$ 가 만든 무대

> $\mathbb R^3$ 안의 굽은 무대를 *두 매개변수* 로 묘사한다. 그 두 매개변수의 편미분 $\mathbf{r}_u$, $\mathbf{r}_v$ 가 만드는 접공간, 그리고 그 위의 내적이 결정하는 *제1기본형식* — 곡면의 모든 기하학이 출발하는 자리.

## 본문이 말하는 것

원서 1.2.1 절은 $\mathbb R^3$ 안의 곡면 $S$ 를 *두 매개변수* $(u, v)$ 로 적는다:

$$
\mathbf{r} = \mathbf{r}(u, v) = (x(u, v),\, y(u, v),\, z(u, v))
$$

이 사상이 매끄럽고 단사이며, 편미분 두 개 $\mathbf{r}_u := \partial \mathbf{r} / \partial u$, $\mathbf{r}_v := \partial \mathbf{r} / \partial v$ 가 *선형 독립* (cross product $\mathbf{r}_u \times \mathbf{r}_v \neq 0$) 이라고 가정한다. 두 벡터가 점 $\mathbf{r}(u, v)$ 에서의 **접공간** $T_p S$ 의 기저다.

곡면 위 곡선 $(u(t), v(t))$ 의 속도

$$
\dot{\mathbf{r}} = \mathbf{r}_u\, \dot u + \mathbf{r}_v\, \dot v
$$

는 항상 접공간 안의 벡터다. 그 크기의 제곱은

$$
|\dot{\mathbf{r}}|^2 = (\mathbf{r}_u \cdot \mathbf{r}_u)\, \dot u^2 + 2 (\mathbf{r}_u \cdot \mathbf{r}_v)\, \dot u \dot v + (\mathbf{r}_v \cdot \mathbf{r}_v)\, \dot v^2
$$

여기서 등장하는 세 양 $g_{uu} = \mathbf{r}_u \cdot \mathbf{r}_u$, $g_{uv} = \mathbf{r}_u \cdot \mathbf{r}_v$, $g_{vv} = \mathbf{r}_v \cdot \mathbf{r}_v$ 가 곡면의 **제1기본형식** (first fundamental form). 곡면 위 *모든 길이·각도·면적* 은 이 세 양에서 결정된다.

행렬로 적으면

$$
g = \begin{pmatrix} g_{uu} & g_{uv} \\ g_{uv} & g_{vv} \end{pmatrix},\quad ds^2 = g_{ij}\, du^i du^j \quad (i, j \in \{u, v\})
$$

(아인슈타인 합 규약 — 위·아래 인덱스가 반복되면 합산.)

## 한 번 더, 천천히

**(a) 구면 $S^2$ (반지름 $R$).** 매개변수 $(u, v) = (\theta, \phi)$, $\mathbf{r} = R(\sin\theta\cos\phi, \sin\theta\sin\phi, \cos\theta)$. 편미분 계산:

$$
\mathbf{r}_\theta = R(\cos\theta\cos\phi, \cos\theta\sin\phi, -\sin\theta),\quad \mathbf{r}_\phi = R(-\sin\theta\sin\phi, \sin\theta\cos\phi, 0)
$$

내적을 직접 계산하면 $g_{\theta\theta} = R^2$, $g_{\theta\phi} = 0$, $g_{\phi\phi} = R^2 \sin^2\theta$. 그래서

$$
ds^2 = R^2 (d\theta^2 + \sin^2\theta\, d\phi^2)
$$

— 익숙한 구면 미터. 비대각 항이 0 인 것은 $\theta$, $\phi$ 가 *직교* 좌표라는 의미.

**(b) 원기둥 $\mathbb R \times S^1$.** $\mathbf{r} = (R\cos u, R\sin u, v)$. $g_{uu} = R^2$, $g_{uv} = 0$, $g_{vv} = 1$. 평탄 ($g$ 가 상수). 원기둥은 *국소적으로는 평면* 임을 미터가 직접 말해 준다.

**(c) 토러스 $T^2$ (주반지름 $R$, 부반지름 $r$).** $\mathbf{r} = ((R + r\cos v)\cos u, (R + r\cos v)\sin u, r \sin v)$. $g_{uu} = (R + r\cos v)^2$, $g_{vv} = r^2$, $g_{uv} = 0$. 한 좌표 $v$ 에 명시적으로 의존 — 굽음 (Gauss 곡률) 이 위치에 따라 변한다.

미터 $g$ 는 곡면의 *내재적* 정보다 — $\mathbb R^3$ 안에서 어떻게 박혀 있는지 안 보고도 곡면 위에서 길이를 잴 수 있다. 1.4 의 다양체 정의가 미터를 *임베딩 없이* 정의하는 형식적 길이다.

## 파이썬으로 확인 — 구면의 제1기본형식

이 코드의 메시지는 단순하다: 임의의 $(\theta, \phi)$ 에서 $\mathbf{r}_\theta$, $\mathbf{r}_\phi$ 의 내적을 *직접* 계산하면 $g_{\theta\theta} = R^2$, $g_{\phi\phi} = R^2 \sin^2\theta$ 가 *해석해* 와 일치한다.

```python
# 구면: r(θ, φ) = R(sinθ cosφ, sinθ sinφ, cosθ)
# 임의 점에서 r_θ, r_φ 를 수치 편미분으로 구하고, g_ij = r_i · r_j 계산.
import numpy as np

R = 2.0
theta, phi = np.pi / 3, np.pi / 4  # 임의의 점

def r(th, ph):
    return R * np.array([np.sin(th) * np.cos(ph),
                         np.sin(th) * np.sin(ph),
                         np.cos(th)])

# 수치 편미분 (중심차분)
h = 1e-6
r_theta = (r(theta + h, phi) - r(theta - h, phi)) / (2 * h)
r_phi = (r(theta, phi + h) - r(theta, phi - h)) / (2 * h)

g_thth = np.dot(r_theta, r_theta)
g_thph = np.dot(r_theta, r_phi)
g_phph = np.dot(r_phi, r_phi)

# 해석해
g_thth_exact = R**2
g_phph_exact = R**2 * np.sin(theta)**2

print(f"g_θθ:  수치 {g_thth:.6f},  해석 {g_thth_exact:.6f}")
print(f"g_θφ:  수치 {g_thph:.2e}  (해석 0)")
print(f"g_φφ:  수치 {g_phph:.6f},  해석 {g_phph_exact:.6f}")
```

이 결과는 매개변수 표현이 *충실하게* 곡면의 기하를 담고 있음을 보인다. $g$ 가 알려진 뒤로는 길이·각도 계산이 모두 $(u, v)$ 만의 적분으로 환원된다 — $\mathbb R^3$ 의 임베딩은 더 이상 등장하지 않는다.

## 다음 절(1.2.2)로 가는 다리

매개변수 $(u, v)$ 가 곡면 위의 한 점을 적는 *위치 좌표* 라면, $\dot u$, $\dot v$ 는 그 점의 *속도 좌표* 다. 그러면 *가속도* 는? 단순히 $\ddot u$, $\ddot v$ 로 끝나지 않는다 — 곡면이 굽었다는 사실이 가속도 표현에 새로운 항을 끌고 들어온다. 다음 1.2.2 는 그 항을 직접 계산해 보인다.
