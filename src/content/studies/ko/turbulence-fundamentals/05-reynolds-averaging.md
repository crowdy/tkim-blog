---
title: '레이놀즈 평균과 RANS 방정식'
description: '나비에-스토크스를 평균 내면 방정식 수는 그대로인데 미지수가 늘어난다 — 난류 모델링 전체의 출발점인 폐쇄 문제를 도입한다.'
book: turbulence-fundamentals
bookTitle: 난류해석의 기초
chapter: 5
lang: ko
pairSlug: turbulence-reynolds-averaging
draft: false
updated: 2026-05-14
---

# 레이놀즈 평균과 RANS 방정식

> 나비에-스토크스를 평균 내면 방정식 수는 그대로인데 미지수가 늘어난다 — 난류 모델링 전체의 출발점인 폐쇄 문제를 도입한다.

## 들어가며

3장에서 본 나비에-스토크스 방정식은 원리적으로 모든 흐름을 기술하지만, 난류에서는 모든 와동 스케일을 다 풀어야 해서 산업용 해석에는 너무 비싸다. 그래서 1894년 오스본 레이놀즈는 **시간 평균**을 취하는 우회로를 제안했다. 본 장이 끝나면 독자는 평균 작업이 왜 방정식 수보다 미지수를 더 빨리 늘리는지, 그리고 왜 6장에서 "난류 점성 모델"이 필요한지를 한 줄로 설명할 수 있다.

## 본론 1 — 레이놀즈 분해: 신호를 평균과 변동으로 나눈다

핵심 아이디어는 단순하다. 난류 속 한 점의 속도 $u_i$는 빠르게 흔들리지만, 충분히 긴 시간 동안 평균을 내면 **평균값** $\bar{u}_i$ (위에 막대를 그은 기호, "u바"로 읽는다)와 **변동분** $u'_i$ ("u 프라임")으로 나눌 수 있다.

$$
u_i = \bar{u}_i + u'_i, \qquad \overline{u'_i} = 0
$$

말로 풀면 "신호를 평균 내고, 남은 잔여를 난류 노이즈라고 정의한다. 정의상 노이즈의 평균은 0이다." 두 번째 식은 새로운 가정이 아니라 분해 그 자체의 결과다 — 평균을 빼고 남은 것을 평균하면 0이 될 수밖에 없기 때문이다.

압력 $p$, 온도 $T$, 농도 $c$ 등 모든 흐름 변수를 같은 방식으로 분해한다. 이 분해를 **레이놀즈 분해(Reynolds decomposition)**라고 부른다.

## 본론 2 — 평균이 만들어내는 새로운 항

레이놀즈 분해를 3장의 비압축 나비에-스토크스 운동량 방정식에 대입하고 양변을 평균 낸다. 평균 연산은 미분과 교환되므로 ($\overline{\partial f / \partial t} = \partial \bar{f} / \partial t$), 시간 미분·압력 구배·점성 항은 모두 평균 기호가 안으로 들어간 형태로 그대로 살아남는다.

문제는 **대류항** $u_j \partial u_i / \partial x_j$ 다. 두 속도의 곱이므로 분해 후에는

$$
\overline{(\bar{u}_j + u'_j)\,\frac{\partial (\bar{u}_i + u'_i)}{\partial x_j}}
$$

이 되고, 교차항 중 한 번만 프라임이 들어간 항은 $\overline{u'_i} = 0$ 때문에 사라진다. 두 프라임이 모두 들어간 항 $\overline{u'_j \, \partial u'_i / \partial x_j}$ 는 **남는다**. 연속방정식 ($\partial u'_j / \partial x_j = 0$)을 이용해 미분의 곱으로 다시 쓰면 이 항은 $\partial \overline{u'_i u'_j} / \partial x_j$ 형태로 정리된다.

평균을 모두 끝낸 최종형이 **RANS 방정식(Reynolds-Averaged Navier–Stokes)**이다:

$$
\frac{\partial \bar{u}_i}{\partial t} + \bar{u}_j \frac{\partial \bar{u}_i}{\partial x_j} = -\frac{1}{\rho}\frac{\partial \bar{p}}{\partial x_i} + \nu \frac{\partial^2 \bar{u}_i}{\partial x_j \partial x_j} - \frac{\partial \overline{u'_i u'_j}}{\partial x_j}
$$

여기서 $\rho$ (rho, 밀도)와 $\nu$ (nu, 동점성계수)는 3장과 같다. 형태는 원래의 나비에-스토크스와 거의 같은데, 우변 마지막에 **새 항** $-\partial \overline{u'_i u'_j} / \partial x_j$ 가 추가됐다.

## 본론 3 — 레이놀즈 응력과 폐쇄 문제

이 새 항 안의 $\overline{u'_i u'_j}$ 를 **레이놀즈 응력 텐서(Reynolds stress tensor)**라고 부른다. 이름이 "응력"인 이유는 점성 응력처럼 운동량을 수송하는 역할을 하기 때문이지, 실제 분자 응력은 아니다 — 거시적 와동이 운반하는 평균적 운동량 교환이다.

레이놀즈 응력은 대칭 텐서이므로 9개 성분 중 **독립 성분이 6개**다 ($\overline{u'_1 u'_1}, \overline{u'_2 u'_2}, \overline{u'_3 u'_3}, \overline{u'_1 u'_2}, \overline{u'_1 u'_3}, \overline{u'_2 u'_3}$).

이제 미지수를 세어 보자.

| | 원래 나비에-스토크스 | RANS |
|---|---|---|
| 방정식 | 3 (운동량) + 1 (연속) = 4 | 그대로 4 |
| 미지수 | $u_1, u_2, u_3, p$ → 4 | $\bar{u}_1, \bar{u}_2, \bar{u}_3, \bar{p}$ + 레이놀즈 응력 6개 = **10** |

원래는 4개 방정식으로 4개 미지수를 풀 수 있었는데, 평균을 한 번 취하자 같은 4개 방정식에 미지수만 10개로 늘어났다. 이를 **폐쇄 문제(closure problem)**라고 부른다 — 방정식 시스템이 닫혀 있지 않다는 뜻이다.

6장에서는 레이놀즈 응력 6개를 평균 속도장 $\bar{u}_i$만의 함수로 **모델링**해서 시스템을 강제로 닫는 여러 방법(mixing length, k-ε, k-ω)을 다룬다. RANS가 산업 CFD의 주력인 이유는 이 모델링이 잘 되기 때문이지, RANS 자체가 정확한 방정식이라서가 아니다.

## 파이썬으로 확인

레이놀즈 분해 자체는 1차원 합성 신호 하나만 있으면 즉시 확인된다. 평균을 빼면 변동의 평균은 0에 가깝고, 변동의 제곱 평균은 양수(=레이놀즈 응력 성분에 해당)다.

```python
import numpy as np

rng = np.random.default_rng(0)

# 1차원 합성 난류 신호: 평균 1.0 + 결정론적 진동 + 가우시안 노이즈
t = np.linspace(0, 10, 1000)
u = 1.0 + 0.3 * np.sin(t) + 0.1 * rng.standard_normal(1000)

# 레이놀즈 분해: 평균과 변동으로 나눈다
u_mean = np.mean(u)
u_prime = u - u_mean

# 검증
mean_of_prime = np.mean(u_prime)         # 정의상 0 (부동소수점 오차 범위)
reynolds_stress = np.mean(u_prime ** 2)  # 분산 = 1성분 레이놀즈 응력 u'u'

print(f"평균 속도         u_bar      = {u_mean:.6f}")
print(f"변동분의 평균      <u'>       = {mean_of_prime:.2e}")
print(f"레이놀즈 응력 성분 <u'u'>     = {reynolds_stress:.6f}")
```

출력에서 `<u'>` 는 $10^{-17}$ 정도의 부동소수점 노이즈로 사실상 0이고, `<u'u'>` 는 0.05 안팎으로 명확히 양수다. 만약 이 신호가 실제 3차원 흐름의 한 성분이었다면 이 값이 바로 레이놀즈 응력 텐서의 한 대각 성분이다.

## 다음 장으로

폐쇄 문제는 1894년부터 지금까지 풀리지 않은 미해결 문제다. 대신 공학은 "정확한 해 대신 충분히 쓸 만한 근사 모델"이라는 우회로를 택했다. [6장: 난류 점성 모델](../06-turbulence-viscosity-models/)에서는 mixing length, k-ε, k-ω 세 가지 대표 모델을 차례로 보고, 각 모델이 어떤 가정으로 6개의 레이놀즈 응력을 평균 속도장의 함수로 표현하는지를 따라간다.
