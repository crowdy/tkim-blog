---
title: '1.2.2 — 가속도 벡터와 운동방정식: 곡면이 굽었음이 식에 남기는 흔적'
description: '곡면 위 입자의 가속도는 $\ddot u$, $\ddot v$ 만으로 끝나지 않는다. $\mathbf{r}_{uu}$, $\mathbf{r}_{uv}$, $\mathbf{r}_{vv}$ 라는 *2차 편미분* 항들이 등장한다 — 곡면이 *굽었다* 는 사실을 식이 처음으로 인지하는 자리.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 6
lang: ko
pairSlug: am1tc-1-2-2-acceleration-and-eom
draft: false
updated: 2026-05-17
---

# 1.2.2 — 가속도 벡터와 운동방정식: 곡면이 굽었음이 식에 남기는 흔적

> 곡면 위 입자의 가속도는 $\ddot u$, $\ddot v$ 만으로 끝나지 않는다. $\mathbf{r}_{uu}$, $\mathbf{r}_{uv}$, $\mathbf{r}_{vv}$ 라는 *2차 편미분* 항들이 등장한다 — 곡면이 *굽었다* 는 사실을 식이 처음으로 인지하는 자리.

## 본문이 말하는 것

원서 1.2.2 절은 곡면 위 곡선 $\mathbf{r}(t) = \mathbf{r}(u(t), v(t))$ 의 가속도를 정직하게 미분해 적는다. 속도는 1.2.1 에서

$$
\dot{\mathbf{r}} = \mathbf{r}_u\, \dot u + \mathbf{r}_v\, \dot v
$$

가속도는 한 번 더 시간 미분. 단, $\mathbf{r}_u$, $\mathbf{r}_v$ 가 *위치의 함수* 라는 점 — 즉 $\mathbf{r}_u = \mathbf{r}_u(u(t), v(t))$ — 을 잊으면 안 된다. 곱미분 + 연쇄율로

$$
\ddot{\mathbf{r}} = \mathbf{r}_u\, \ddot u + \mathbf{r}_v\, \ddot v + \mathbf{r}_{uu}\, \dot u^2 + 2\, \mathbf{r}_{uv}\, \dot u \dot v + \mathbf{r}_{vv}\, \dot v^2
$$

가 된다. 여기서 $\mathbf{r}_{uu} = \partial^2 \mathbf{r} / \partial u^2$, 등.

뉴턴식 $m \ddot{\mathbf{r}} = \mathbf{F}$ 를 이 표현으로 적으면

$$
m\, [\mathbf{r}_u \ddot u + \mathbf{r}_v \ddot v + \mathbf{r}_{uu} \dot u^2 + 2 \mathbf{r}_{uv} \dot u \dot v + \mathbf{r}_{vv} \dot v^2] = \mathbf{F}
$$

좌변에는 $(u, v, \dot u, \dot v, \ddot u, \ddot v)$ 가 들어있고, 우변의 $\mathbf{F}$ 는 외력 + 구속력 ($\mathbf{F} = \mathbf{F}^{\text{appl}} + \mathbf{R}$). 이 식이 곡면 위 운동의 *벡터 형식 운동방정식* 이다. 1.2.3 에서 이 식을 *접선 방향* 과 *법선 방향* 으로 쪼개, 法線 방향에서 구속력을, 접선 방향에서 운동방정식을 따로 뽑는다.

## 한 번 더, 천천히

**2차 편미분 항의 정체.** $\mathbf{r}_{uu}$, $\mathbf{r}_{uv}$, $\mathbf{r}_{vv}$ 는 *접공간 안의 벡터가 아니다*. 일반적으로 $\mathbf{r}_u$, $\mathbf{r}_v$ 가 만드는 평면에서 벗어난 방향 — *법선* 성분과 *접선* 성분 둘 다 가진다. 접선 성분은 좌표 변화에 따른 $\mathbf{r}_u$ 의 회전 (= 크리스토펠 기호) 을 담고, 법선 성분은 곡면이 굽은 정도 (= 제2기본형식) 를 담는다. 1.2.4 에서 분해해 본다.

**한 입자 가속도의 두 얼굴.** 가속도 $\ddot{\mathbf{r}}$ 의 *길이* 는 곡면이 평면이든 굽었든 같은 정의 — $\mathbb R^3$ 의 벡터 길이. 그러나 가속도의 *분해* (접선과 법선) 는 곡면 자체에 의존한다. 본 절은 분해 전의 *원초 가속도 식* 을 명시해 둔 것.

**스칼라식이 아니라 벡터식.** 위 등식은 $\mathbb R^3$ 의 *벡터* 식 — 세 성분 모두 동시에 성립. 1.2.3 이 이 벡터식을 *2 개의 접선 식 + 1 개의 법선 식* 으로 쪼개면, 접선 식 2 개가 우리가 결국 원하는 운동방정식이고, 법선 식 1 개가 구속력 크기를 결정해 준다.

## 파이썬으로 확인 — 구면 위 곡선의 가속도 분해

이 코드의 메시지는 단순하다: 구면 적도 ($\theta = \pi/2$) 를 일정 속도로 도는 입자의 가속도는 *접선 성분 0, 법선 성분 = $R \dot\phi^2$* 다. 직접 미분해 확인한다.

```python
# 구면 적도를 일정 속도로 도는 입자: θ(t) = π/2, φ(t) = ω*t
# r(t) = R(cos(ωt), sin(ωt), 0)
# 분석적으로 ddr = -R ω^2 (cos(ωt), sin(ωt), 0) = -ω^2 * r — 안쪽으로
import numpy as np

R, omega = 2.0, 0.5

# 임의의 시각
t = 1.3
r = R * np.array([np.cos(omega * t), np.sin(omega * t), 0.0])
v = R * omega * np.array([-np.sin(omega * t), np.cos(omega * t), 0.0])
a = R * omega**2 * np.array([-np.cos(omega * t), -np.sin(omega * t), 0.0])

# 가속도가 r 의 반대방향 (구심)
print(f"a 의 방향과 r 의 방향 내적 (단위) = {np.dot(a, r) / (np.linalg.norm(a) * np.linalg.norm(r)):.4f}")  # -1 기대
print(f"|a| = {np.linalg.norm(a):.4f},  R ω² = {R * omega**2:.4f}")

# 법선 방향 단위벡터 (구면이라 r/|r|)
n_hat = r / np.linalg.norm(r)
a_normal = np.dot(a, n_hat) * n_hat
a_tangent = a - a_normal

print(f"|a 법선| = {np.linalg.norm(a_normal):.4f}  (= R ω² 기대)")
print(f"|a 접선| = {np.linalg.norm(a_tangent):.2e}  (= 0 기대 — 일정 속도라)")
```

이 결과는 *일정 속도 곡선의 가속도는 순수 법선* 이라는 사실을 수치로 확인한다. 1.2.3 의 분해가 이 경우 *자동적으로* 작동하는 모습이다.

## 다음 절(1.2.3)로 가는 다리

가속도가 *접선 부분* 과 *법선 부분* 으로 쪼개진다는 것을 본 위 예시는, 일반 곡면에서도 같은 분해가 가능함을 시사한다. 1.2.3 은 그 분해를 형식적으로 수행해, 법선 성분 = 구속력 / m, 접선 성분 = 알짜 가속도 라는 관계를 박는다.
