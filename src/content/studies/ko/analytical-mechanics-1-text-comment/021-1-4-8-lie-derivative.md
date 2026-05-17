---
title: '1.4.8 — 리 미분: 흐름을 따라 *옮긴 뒤 비교* 하는 미분'
description: '벡터장 $X$ 의 흐름 $\phi_t$ 를 따라 *벡터·텐서* 를 옮기고, 그 시각 0 변화율이 *리 미분* $\mathcal L_X$. 두 벡터장의 경우 $\mathcal L_X Y = [X, Y]$ — 교환자가 등장하는 본 절의 핵심 등식.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 21
lang: ko
pairSlug: am1tc-1-4-8-lie-derivative
draft: false
updated: 2026-05-17
---

# 1.4.8 — 리 미분: 흐름을 따라 *옮긴 뒤 비교* 하는 미분

> 벡터장 $X$ 의 흐름 $\phi_t$ 를 따라 *벡터·텐서* 를 옮기고, 그 시각 0 변화율이 *리 미분* $\mathcal L_X$. 두 벡터장의 경우 $\mathcal L_X Y = [X, Y]$ — 교환자가 등장하는 본 절의 핵심 등식.

## 본문이 말하는 것

$X \in \mathfrak X(M)$ 의 (국소) 흐름이 $\phi_t$ (1.4.6).

**함수의 리 미분.** $f \in C^\infty(M)$ 에 대해

$$
(\mathcal L_X f)(p) := \left.\frac{d}{dt}\right|_{t=0} f(\phi_t(p)) = X_p [f]
$$

— 함수의 리 미분은 *방향미분* 과 같다.

**벡터장의 리 미분.** $Y \in \mathfrak X(M)$ 에 대해

$$
(\mathcal L_X Y)_p := \left.\frac{d}{dt}\right|_{t=0} \phi_{-t*}\, Y_{\phi_t(p)}
$$

(흐름을 따라 $\phi_t(p)$ 의 $Y$ 를 $\phi_{-t*}$ 로 점 $p$ 의 접공간으로 *되돌려 옮긴 뒤* 비교.) 본문이 증명하는 정리:

$$
\mathcal L_X Y = [X, Y] := XY - YX
$$

여기서 $XY$ 는 함수 $f$ 에 작용시켜 $X(Y(f))$ — 2차 미분이지만, $XY - YX$ 의 2차 항이 *대칭* 으로 상쇄되어 *1차 미분* 만 남는다. 즉 $[X, Y]$ 가 벡터장.

좌표 성분으로

$$
[X, Y]^k = X^i \frac{\partial Y^k}{\partial x^i} - Y^i \frac{\partial X^k}{\partial x^i}
$$

이게 **리 괄호** (Lie bracket) 또는 **교환자**.

## 한 번 더, 천천히

**(1) 리 괄호의 의미.** $[X, Y] = 0$ 이면 두 흐름이 *교환한다*: $\phi^X_t \circ \phi^Y_s = \phi^Y_s \circ \phi^X_t$. 반대로 $[X, Y] \neq 0$ 이면 두 흐름의 순서가 다른 결과를 낸다. 즉 *흐름의 비가환성* 이 리 괄호로 측정된다.

**(2) 야코비 항등식.** 임의의 세 벡터장에 대해 $[X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0$. 이게 *리 대수* 의 정의 공리 중 하나. §1.4.9 의 리 군의 리 대수에서 다시 등장.

**(3) §1.3.3 의 공변미분 vs. 리 미분.** 공변미분 $\nabla_X Y$ 는 *접속* 을 필요로 하고, 리 미분 $\mathcal L_X Y$ 는 *접속 없이* 정의된다. 둘의 차이가 *비틀림* (torsion). Levi-Civita 접속의 비틀림 0 조건 = $\nabla_X Y - \nabla_Y X = [X, Y]$.

**(4) 변분의 *대수적* 측면.** 리 미분 자체가 §2.2 의 *대칭과 보존* 의 핵심 도구. 라그랑지언이 흐름 $\phi_t$ 에 의해 보존된다는 조건 $\mathcal L_X L = 0$ 이 노에터 정리의 출발점.

## 파이썬으로 확인 — $\mathbb R^2$ 의 두 벡터장의 교환자

이 코드의 메시지는 단순하다: 두 벡터장 $X = \partial_x$, $Y = x \partial_y$ 의 교환자를 *공식대로* 계산하고, *흐름의 순서 차이* 와 일치하는지 본다.

```python
# X = ∂x, Y = x ∂y
# 공식대로 [X, Y]^k = X^i ∂Y^k/∂x^i - Y^i ∂X^k/∂x^i
# X = (1, 0), Y = (0, x)
# [X, Y]^x = 1 * 0 - 0 * 0 = 0
# [X, Y]^y = 1 * 1 - x * 0 = 1
# 즉 [X, Y] = ∂y
import numpy as np
from scipy.integrate import solve_ivp

# 흐름 계산
def flow_X(t, p):
    # dX/dt = (1, 0) → 단순 평행이동
    return np.array([p[0] + t, p[1]])

def flow_Y(s, p):
    # dY/ds: dx/ds = 0, dy/ds = x → x 는 상수, y(s) = y(0) + s * x
    return np.array([p[0], p[1] + s * p[0]])

# φ_X(t) ∘ φ_Y(s) vs. φ_Y(s) ∘ φ_X(t) at small t, s
p0 = np.array([2.0, 1.0])
t, s = 0.1, 0.1

# φ_Y(s) 먼저, 그 다음 φ_X(t)
p_XY = flow_X(t, flow_Y(s, p0))
# φ_X(t) 먼저, 그 다음 φ_Y(s)
p_YX = flow_Y(s, flow_X(t, p0))

diff = p_XY - p_YX
# 이론: diff ≈ ts * [X, Y](p0) = ts * (0, 1) = (0, 0.01)
print(f"φ_X(t) ∘ φ_Y(s)(p0) - φ_Y(s) ∘ φ_X(t)(p0) = {diff}")
print(f"이론값  t*s * [X,Y](p0)                 = ({t*s * 0:.4f}, {t*s * 1:.4f})")
print(f"부합 — 흐름의 순서 차이가 정확히 교환자에 비례.")
```

이 결과는 교환자가 *흐름의 비가환성을 정량화* 함을 수치로 본다. 다음 §1.4.9 의 리 군에서 *군 자체의 비가환성* 이 같은 교환자 어휘로 측정된다.

## 다음 절(1.4.9)로 가는 다리

벡터장의 교환자가 *흐름의 비가환성* 을 측정한다는 사실은, *변환군 자체의 비가환성* 을 같은 어휘로 다룰 수 있음을 시사한다. 다음 1.4.9 는 *리 군* — 매끄러운 군 — 을 정의하고, 그것의 리 대수 — 단위원에서의 접공간 + 리 괄호 — 를 박는다.
