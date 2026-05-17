---
title: '1.6.7 — 미분형식의 적분: 방향이 있는 다양체 위의 $n$-형식 적분'
description: '*$n$-차원 다양체* 위의 *$n$-형식* 만이 자연스럽게 적분 가능. 방향 (orientation) 이 부호를 결정. 좌표 변환 시 자코비안의 *부호 있는 행렬식* 이 적분의 일관성을 보장.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 36
lang: ko
pairSlug: am1tc-1-6-7-integration-of-forms
draft: false
updated: 2026-05-17
---

# 1.6.7 — 미분형식의 적분: 방향이 있는 다양체 위의 $n$-형식 적분

> *$n$-차원 다양체* 위의 *$n$-형식* 만이 자연스럽게 적분 가능. 방향 (orientation) 이 부호를 결정. 좌표 변환 시 자코비안의 *부호 있는 행렬식* 이 적분의 일관성을 보장.

## 본문이 말하는 것

$M$ 을 $n$-차원 방향 있는 매끄러운 다양체, $\omega \in \Omega^n(M)$ 을 $n$-형식 (체적 형식 차원) 이라 하자. *지지* (support) 가 콤팩트한 $\omega$ 의 **적분**

$$
\int_M \omega
$$

은 다음 두 단계로 정의:

**(a) 단일 차트의 경우.** 차트 $\phi : U \to V \subset \mathbb R^n$ 에서 $\omega = f(x) \, dx^1 \wedge \cdots \wedge dx^n$ ($f$ 는 좌표 함수) 라면

$$
\int_U \omega := \int_V f(x^1, \dots, x^n)\, dx^1 \cdots dx^n
$$

— 평면 적분.

**(b) 일반.** *분할 분담 함수* (partition of unity) $\{\rho_\alpha\}$ 가 있는 차트 덮개 $\{U_\alpha\}$ 로 $\omega = \sum_\alpha \rho_\alpha \omega$ 분해, 각 항을 (a) 로 적분한 뒤 합산.

**좌표 변환의 일관성.** 다른 차트 $\phi' : U \to V'$ 로 적분해도 같은 값. 이유: $\omega$ 의 변환 규칙

$$
f'(x') = f(x(x'))\, \det\left(\frac{\partial x^i}{\partial x'^j}\right)
$$

(자코비안의 *부호 있는* 행렬식). 보통 다변수 미적분의 *변수 변환* 정리 ($dx = |J|\, dx'$, *절댓값*) 와 차이는 *방향*. 미분형식 적분은 *방향에 민감* — 좌표 방향이 같으면 같은 부호, 반대면 부호 반전.

**방향 (orientation).** 다양체 $M$ 의 *방향 있음* (orientability) 이란, 모든 차트의 자코비안이 *양* 인 *방향 일치 아틀라스* 가 존재. $S^n$, 토러스, $\mathbb R^n$ 모두 방향 있음. 뫼비우스 띠, 클라인 병은 *방향 없음* — $n$-형식의 적분이 *부호 변동* 으로 불가능.

## 한 번 더, 천천히

**(1) *왜 $n$-형식만* 적분되는가.** $p$-형식 ($p < n$) 은 *$p$-차원 부다양체* 에 *제한 후 적분*. 예: 1-형식 $\omega$ 는 곡선 위에서 적분 ($\int_\gamma \omega$), 2-형식은 곡면 위에서 적분. *동일 차원* 의 다양체와 형식만이 직접 결합 — 그래야 행렬식 형태가 만들어지고 적분이 *방향과 차원 모두 호환*.

**(2) $\mathbb R^3$ 예시.**

- 1-형식 $\omega = F_x dx + F_y dy + F_z dz$ 의 곡선 $\gamma$ 위 적분 = *선적분* $\int_\gamma \mathbf{F} \cdot d\mathbf{r}$.
- 2-형식 $\omega = B_x dy \wedge dz + \cdots$ 의 곡면 $S$ 위 적분 = *면적분* $\int_S \mathbf{B} \cdot d\mathbf{S}$.
- 3-형식 $\omega = \rho\, dx \wedge dy \wedge dz$ 의 영역 적분 = *체적분* $\int_V \rho\, dV$.

세 경우 모두 *부호가 있는* 적분 — 곡선·곡면·체적의 *방향* 에 의존.

**(3) 변수 변환 정리의 *재해석*.** 보통 미적분의 $\int f(x)\, dx = \int f(x(y))\, |J|\, dy$ 의 *절댓값* $|J|$ 는 사실 *부호 없는 양 = 측도*. 미분형식 적분은 *부호 있는 양* $f(x(y))\, \det J\, dy$ 를 다룬다. *방향이 일치* 하는 좌표 변환에서는 $\det J > 0$ — 두 정의가 같다. *방향이 반대* 면 $\det J < 0$ — 형식 적분은 부호가 뒤집힌다.

**(4) 라그랑주 작용의 적분.** 작용 $S = \int_\gamma L\, dt$ 는 곡선 $\gamma$ 위 1-형식 $L\, dt$ 의 적분. *시간 매개변수의 방향* 이 작용의 부호를 결정. 변분 원리에서 *방향이 바뀐* 곡선의 작용은 부호가 반대 — 자연스러운 결과.

## 파이썬으로 확인 — 디스크 위 면적 적분

이 코드의 메시지는 단순하다: 단위 디스크 $D = \{x^2 + y^2 \le 1\}$ 위의 면적 형식 $\omega = dx \wedge dy$ 를 (a) 직교 좌표, (b) 극 좌표 두 방식으로 적분해 두 결과가 같음을 확인.

```python
# 단위 디스크 D 위 면적 형식 ω = dx ∧ dy 의 적분 = 디스크 면적 = π
# (a) 직교 좌표: ∫∫ dx dy
# (b) 극 좌표:   ∫∫ r dr dθ  (자코비안 |∂(x,y)/∂(r,θ)| = r)
import numpy as np
from scipy.integrate import dblquad

# (a) 직교 좌표
area_xy, _ = dblquad(lambda y, x: 1.0,
                     -1.0, 1.0,
                     lambda x: -np.sqrt(1 - x**2),
                     lambda x: np.sqrt(1 - x**2))

# (b) 극 좌표: ∫_0^{2π} ∫_0^1 r dr dθ
area_rt, _ = dblquad(lambda r, theta: r,
                     0.0, 2 * np.pi,
                     0.0, 1.0)

print(f"디스크 면적 (직교):  {area_xy:.6f}")
print(f"디스크 면적 (극):    {area_rt:.6f}")
print(f"이론 π = {np.pi:.6f}")

# 방향 반전 검증: y 의 적분 범위를 뒤집으면 부호가 뒤집힘
# scipy 의 dblquad 는 부호 있는 적분을 알아서 처리.
area_reversed, _ = dblquad(lambda y, x: 1.0,
                           1.0, -1.0,  # x 범위 역방향
                           lambda x: -np.sqrt(1 - x**2),
                           lambda x: np.sqrt(1 - x**2))
print(f"\n방향 반전 시:        {area_reversed:.6f}  (= -π 기대)")
```

이 결과는 (a) 좌표 변환에서 적분이 *불변* 임 — 자코비안 $r$ 의 등장이 *극 좌표의 부피 측도* 가 직교 좌표와 호환되도록 함을, (b) *방향이 뒤집히면 부호가 뒤집힘* 을 모두 확인한다.

## 다음 절(1.6.8)로 가는 다리

$n$-형식의 *내부* 적분이 박혔다. 그 적분이 *경계* 와 어떻게 통신하는가 — *스토크스 정리* 가 박힌다. $\int_M d\omega = \int_{\partial M} \omega$ 라는 한 줄의 정리가 그라디언트·발산·회전 정리를 모두 *하나의 식* 으로 통합한다.
