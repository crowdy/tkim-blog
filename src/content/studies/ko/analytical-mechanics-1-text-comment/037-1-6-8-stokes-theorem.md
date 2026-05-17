---
title: '1.6.8 — 스토크스 정리: $\int_M d\omega = \int_{\partial M} \omega$ 라는 한 줄의 통합'
description: '벡터 미적분의 모든 적분 정리 — 그라디언트·발산·회전 — 가 *한 줄* 의 스토크스 정리로 통합. $d$ 가 *경계* 와 *동등한 차수* 임을 박는 다양체 미적분의 정점.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 37
lang: ko
pairSlug: am1tc-1-6-8-stokes-theorem
draft: false
updated: 2026-05-17
---

# 1.6.8 — 스토크스 정리: $\int_M d\omega = \int_{\partial M} \omega$ 라는 한 줄의 통합

> 벡터 미적분의 모든 적분 정리 — 그라디언트·발산·회전 — 가 *한 줄* 의 스토크스 정리로 통합. $d$ 가 *경계* 와 *동등한 차수* 임을 박는 다양체 미적분의 정점.

## 본문이 말하는 것

**스토크스 정리** (Stokes' theorem). $M$ 이 *경계가 있는* $n$-차원 방향 있는 매끄러운 다양체, $\omega \in \Omega^{n-1}(M)$ 이 *콤팩트 지지* $(n-1)$-형식이라면:

$$
\int_M d\omega = \int_{\partial M} \omega
$$

여기서 $\partial M$ 은 $M$ 의 *경계* ($M$ 으로부터 유도된 *방향* 으로 적분). 즉 *외미분의 적분 = 경계 위 형식의 적분*.

**특수 경우 ($\mathbb R^3$).**

- $n = 1$ (구간 $[a, b]$): $\omega = f$ (0-형식), $d\omega = df = f' dx$.

$$
\int_a^b f'\, dx = f(b) - f(a)
$$

— *미적분의 기본 정리*.

- $n = 2$ (평면 영역): $\omega = P\, dx + Q\, dy$, $d\omega = (\partial_x Q - \partial_y P)\, dx \wedge dy$.

$$
\int_D (\partial_x Q - \partial_y P)\, dx\, dy = \oint_{\partial D} P\, dx + Q\, dy
$$

— *그린 정리*.

- $n = 2$ (3D 의 곡면 $S$): $\omega$ 는 1-형식, $d\omega$ 는 2-형식.

$$
\int_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \oint_{\partial S} \mathbf{F} \cdot d\mathbf{r}
$$

— *고전 스토크스 정리* (회전 정리).

- $n = 3$ (3D 영역 $V$): $\omega$ 는 2-형식, $d\omega$ 는 3-형식.

$$
\int_V \nabla \cdot \mathbf{B}\, dV = \oint_{\partial V} \mathbf{B} \cdot d\mathbf{S}
$$

— *발산 정리* (Gauss).

네 정리가 모두 $\int_M d\omega = \int_{\partial M} \omega$ 의 차원별 *복사*. 형식 어휘의 *압축력*.

## 한 번 더, 천천히

**(1) 두 작용소 $d$ 와 $\partial$ 의 *쌍대성*.** 형식의 외미분 $d$ 와 다양체의 경계 $\partial$ 가 적분을 통해 *쌍대*. 둘 모두 *제곱이 0*: $d^2 = 0$, $\partial^2 M = \emptyset$ (경계의 경계는 비어 있음). 이 쌍대성이 *드람 코호몰로지* (형식 측) 와 *특이 호몰로지* (공간 측) 의 *드람 정리* — 두 코호몰로지 이론이 정확히 같다 — 의 핵심.

**(2) 푸앵카레 보조정리와의 결합.** $M$ 이 별 모양 영역이라면 임의의 닫힌 $(n-1)$-형식이 정확. 그래서 *경계 위 적분이 내부 미분의 적분으로 환원* 됨. 자연·물리법칙의 *경계와 부피의 관계* 가 이 정리의 본질.

**(3) 방향의 *유도*.** $\partial M$ 의 방향은 $M$ 의 방향에서 유도된다. 평면 영역의 경계는 *반시계 방향* 이 양 (외부 법선이 시각 부호와 일치). $\mathbb R^3$ 의 체적 경계는 *외향 법선* 이 양. 이 *유도된 방향* 이 부호의 자연스러운 결정.

**(4) 라그랑주 역학의 *해석학적* 응용.** 변분 원리 $\delta S = 0$ 에서 *경계 항* 이 사라져야 한다 (고정된 끝점). 그 사라짐이 스토크스 정리의 *내부 = 경계* 관계 — 변분 항을 *경계 적분으로* 변형하는 *적분 by parts* 의 일반화.

**(5) 4 章 의 해밀턴 역학에서 사용되는 형태.** 정준 1-형식 $\theta = p_i dq^i$ 의 외미분 $d\theta = dp_i \wedge dq^i = \omega$ 가 심플렉틱 2-형식. 위상공간 위의 면적 적분 — *Liouville 정리* — 이 $\int_\Sigma \omega = \int_\Sigma d\theta = \int_{\partial \Sigma} \theta$. 즉 작용 적분이 위상공간 표면 적분으로 변환.

## 파이썬으로 확인 — 그린 정리 수치 검증

이 코드의 메시지는 단순하다: $\mathbb R^2$ 의 단위 디스크 $D$ 위에서 $\omega = -y\, dx + x\, dy$ 의 *경계 적분* 과 *내부 미분 적분* 이 같음을 수치로 확인. 둘 다 *디스크 면적의 2배* = $2\pi$.

```python
# ω = -y dx + x dy → dω = 2 dx ∧ dy (since d(-y dx) = -dy ∧ dx = dx ∧ dy, d(x dy) = dx ∧ dy)
# 좌변 (∫_D dω) = ∫∫_D 2 dx dy = 2 · 면적 = 2π
# 우변 (∮_∂D ω) = ∮ (-y dx + x dy) on unit circle = 2π
import numpy as np
from scipy.integrate import dblquad, quad

# 좌변: ∫_D dω = ∫∫_D 2 dx dy = 2 · π = 2π
lhs, _ = dblquad(lambda y, x: 2.0,
                 -1.0, 1.0,
                 lambda x: -np.sqrt(1 - x**2),
                 lambda x: np.sqrt(1 - x**2))

# 우변: ∮ ω, parametrize circle θ ∈ [0, 2π], x = cos θ, y = sin θ
# dx = -sin θ dθ, dy = cos θ dθ
# ω = -y dx + x dy = -sin θ · (-sin θ) dθ + cos θ · cos θ dθ = (sin² θ + cos² θ) dθ = dθ
rhs, _ = quad(lambda theta: 1.0, 0, 2 * np.pi)

print(f"좌변 ∫_D dω = {lhs:.6f}")
print(f"우변 ∮_∂D ω = {rhs:.6f}")
print(f"이론 2π = {2 * np.pi:.6f}")
print(f"스토크스 정리 잔차 = {abs(lhs - rhs):.2e}")
```

이 결과는 그린 정리 — 스토크스 정리의 2차원 표본 — 가 수치적으로 정확히 만족됨을 보인다. *경계 적분 = 내부 적분* 의 등식이 분석역학·전자기학·유체역학의 모든 적분 정리의 통합 형태.

## 다음 章 (2 章) 로 가는 다리

§1 의 *수학적 준비* 가 모두 끝났다. 다양체·접공간·텐서·미분형식·계량 — 이 어휘들이 §2 부터의 *라그랑주 형식의 역학* 의 *문법*. §2.1 에서 라그랑주 방정식이 어떻게 *배위공간 위의 자연스러운 식* — 이미 §1.1.4 에서 *원형* 을 본 식 — 으로 유도되는지가 시작이다. 1.3 의 공변미분, 1.4 의 벡터장, 1.5–1.6 의 미분형식 모두 §2 ~ §5 에서 *각자의 역할로* 다시 등장한다. §1 은 단순한 *수학 보충* 이 아니라 *역학을 다시 읽는 새로운 어휘* 였다는 사실이 다음 章 들에서 본격적으로 드러난다.
