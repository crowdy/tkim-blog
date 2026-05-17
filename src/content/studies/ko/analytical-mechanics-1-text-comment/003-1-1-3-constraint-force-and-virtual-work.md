---
title: '1.1.3 — 구속력과 가상일: 보이지 않는 힘을 *풀지 않는* 길'
description: '단진자 막대가 추에 가하는 장력 $T$ 는 *얼마인가* — 식 한 줄로 적기 어려운 미지수다. 다랑베르의 처방은 그 미지수를 *풀지 않는다*. 가상 변위 위에서의 일이 0 이라는 조건만 박아 운동을 결정한다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 3
lang: ko
pairSlug: am1tc-1-1-3-constraint-force-and-virtual-work
draft: false
updated: 2026-05-17
---

# 1.1.3 — 구속력과 가상일: 보이지 않는 힘을 *풀지 않는* 길

> 단진자 막대가 추에 가하는 장력 $T$ 는 *얼마인가* — 식 한 줄로 적기 어려운 미지수다. 다랑베르의 처방은 그 미지수를 *풀지 않는다*. 가상 변위 위에서의 일이 0 이라는 조건만 박아 운동을 결정한다.

## 본문이 말하는 것

원서 1.1.3 절은 *구속력* 의 처리법을 정리한다. 구속이 있는 $N$ 입자 계에서 각 입자 $i$ 가 받는 힘은 두 종류:

- **가해진 힘** $\mathbf{F}_i^{\text{appl}}$ — 중력·스프링·전자기력 등 1.1.1 의 가정 (4) 가 말하는 *함수로 주어진* 힘.
- **구속력** $\mathbf{R}_i$ — 구속을 유지하기 위해 막대·철사·면이 가하는 *미지의* 힘. 사전에 함수로 주어지지 않는다.

뉴턴식은

$$
m_i \ddot{\mathbf{x}}_i = \mathbf{F}_i^{\text{appl}} + \mathbf{R}_i \quad (i = 1, \dots, N)
$$

문제는 $\mathbf{R}_i$ 가 미지라는 것. *얼마가 필요한지* 가 운동의 결과로만 정해진다 (단진자에서 장력은 추의 속력에 따라 변한다).

해결책은 **다랑베르의 원리** — 구속력은 *가상 변위* 에 대해 일을 하지 않는다.

가상 변위 $\delta\mathbf{x}_i$ 란 시각 $t$ 를 *고정한 채* 구속조건을 만족하도록 살짝 움직인 변위다. 홀로노믹 구속 $f_\alpha(\mathbf{x}, t) = 0$ 이면

$$
\sum_i \frac{\partial f_\alpha}{\partial \mathbf{x}_i} \cdot \delta\mathbf{x}_i = 0 \quad (\alpha = 1, \dots, k)
$$

이 가상 변위 전체에 대해 다랑베르가 요구하는 것은

$$
\sum_i \mathbf{R}_i \cdot \delta\mathbf{x}_i = 0
$$

이 식을 위 뉴턴식에 대입하면, 미지의 $\mathbf{R}_i$ 가 사라진 한 줄이 남는다:

$$
\sum_i (m_i \ddot{\mathbf{x}}_i - \mathbf{F}_i^{\text{appl}}) \cdot \delta\mathbf{x}_i = 0
$$

이게 다랑베르–라그랑주 식 — 1.1.4 가 일반화 좌표로 다시 쓸 출발점.

## 한 번 더, 천천히

세 가지를 풀어 쓸 가치가 있다.

**(1) 가상 변위는 *실제* 변위와 다르다.** 실제 변위 $d\mathbf{x}_i = \dot{\mathbf{x}}_i\, dt$ 는 시간이 흐르며 발생한다. 가상 변위 $\delta\mathbf{x}_i$ 는 시간이 *얼어붙은 채* 구속면 위를 따라 가는 가상의 변위. 레오노믹 구속에서는 둘이 명확히 다르다 — 시간이 흐르면 구속면 자체가 움직이기 때문.

**(2) 다랑베르 원리의 *물리* 는 무마찰 구속.** 매끄러운 면 위 입자라면 구속력 (수직항력) 은 면에 수직이고, 가상 변위는 면을 따라가니, 둘이 직각 → 일이 0. 거친 면이라면 마찰력 (면을 따라) 이 가상 변위와 평행 → 일을 한다. 이 책은 마찰 없는 구속만 다루므로 다랑베르 원리가 *공리* 처럼 통한다.

**(3) 식의 묘미는 "모든 $\delta\mathbf{x}_i$ 에 대해" 가 아니라는 점.** $\delta\mathbf{x}_i$ 는 *구속을 따르는 변위* 들만이다. 즉 임의 $3N$ 차원의 변위가 아니라, 구속면의 접공간 — $n$ 차원 — 안의 변위. 1.1.4 가 이 점을 좌표 변환으로 활용한다.

## 파이썬으로 확인 — 단진자의 가상일

이 코드의 메시지는 단순하다: 단진자에서 구속력 (장력) 의 방향과 가상 변위 (접선) 의 방향은 *직각이다* — 그래서 가상일이 항상 0 이다.

```python
# 단진자: 추의 위치 x = ell * (sin θ, -cos θ).
# 구속력 R 은 막대 방향 (radial), 가상 변위 δx 는 접선 방향.
# 둘의 내적이 0 임을 임의의 θ 에서 확인한다.
import numpy as np

ell = 1.0
thetas = np.linspace(0, 2 * np.pi, 17, endpoint=False)  # 17 개의 임의 위치

works = []
for theta in thetas:
    pos = np.array([ell * np.sin(theta), -ell * np.cos(theta)])
    # 구속력 방향: 피벗 → 추의 반대 방향 (안쪽으로 당김), 단위벡터화
    R_dir = -pos / np.linalg.norm(pos)
    T = 3.0 + 2.0 * np.cos(theta)  # 장력은 위치에 따라 변함 (임의 모델)
    R = T * R_dir

    # 가상 변위 δx: θ 의 작은 변화에 의한 접선 방향
    dtheta = 0.001
    delta_x = np.array([ell * np.cos(theta), ell * np.sin(theta)]) * dtheta

    W = np.dot(R, delta_x)
    works.append(W)

works = np.array(works)
print(f"가상일들의 최대 절댓값 = {np.max(np.abs(works)):.2e}")  # ~기계 엡실론
print(f"평균 = {np.mean(works):.2e}, 표준편차 = {np.std(works):.2e}")
```

이 결과는 가상일이 *위치에 무관하게* 0 임을 보인다 — 다랑베르 원리가 단진자에서 *공리가 아니라 기하* 라는 사실이다. 구속력이 면에 수직이라는 *기하학* 이 가상일 0 의 출처다.

## 다음 절(1.1.4)로 가는 다리

다랑베르 원리는 구속력을 식에서 *지운다*. 그러나 식은 여전히 $\mathbb R^{3N}$ 의 좌표 $\mathbf{x}_i$ 로 적혀 있다. 1.1.2 가 보인 그림은 — 진정한 운동 자유도는 $n = 3N - k$ 개의 일반화 좌표 $q^1, \dots, q^n$ — 라는 것이었다. 다음 1.1.4 는 다랑베르–라그랑주 식을 그 $n$ 개의 좌표로 다시 적는다. 그 결과가 라그랑주식의 가장 거친 원형이다.
