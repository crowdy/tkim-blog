---
title: '1.6.2 — 1-형식: 다양체 전체에 깐 코벡터의 *부드러운 흐름*'
description: '점마다 코벡터 하나를 매끄럽게 부여한 객체가 *1-형식*. 함수의 미분 $df$ 가 그 가장 자연스러운 예. 좌표로 $\omega = \omega_i(x)\, dx^i$ — *공변* 성분.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 31
lang: ko
pairSlug: am1tc-1-6-2-one-form
draft: false
updated: 2026-05-17
---

# 1.6.2 — 1-형식: 다양체 전체에 깐 코벡터의 *부드러운 흐름*

> 점마다 코벡터 하나를 매끄럽게 부여한 객체가 *1-형식*. 함수의 미분 $df$ 가 그 가장 자연스러운 예. 좌표로 $\omega = \omega_i(x)\, dx^i$ — *공변* 성분.

## 본문이 말하는 것

$M$ 의 **1-형식** (1-form, 1次 외미분형식) $\omega$ 는 매끄러운 사상

$$
\omega : M \to T^*M
$$

으로 $\pi \circ \omega = \text{id}_M$ (여접번들의 매끄러운 단면). 즉 각 점 $p$ 에 $T^*_p M$ 의 원소 $\omega_p$ 를 매끄럽게 부여.

차트 좌표 $(x^i)$ 에서

$$
\omega = \omega_i(x)\, dx^i \quad \text{with } \omega_i \in C^\infty(U)
$$

$\omega_i$ 는 좌표 함수, 공변 인덱스. 변환 규칙 (1.5.1): $\omega_{i'} = (\partial x^j / \partial x^{i'}) \omega_j$.

**함수의 미분** $df$ 가 가장 단순한 1-형식. 임의 $f \in C^\infty(M)$ 에 대해

$$
df = \frac{\partial f}{\partial x^i}\, dx^i
$$

— 점 $p$ 에서의 값이 $df_p$ (1.6.1). 모든 1-형식이 $df$ 형태는 *아니지만* (예: $\omega = y\, dx$ 는 어떤 함수의 미분도 아님 — 1.6.6 의 푸앵카레 보조정리 참조), *국소적* 으로 $\omega$ 가 *닫힌* ($d\omega = 0$) 이면 어떤 함수의 미분으로 적힌다.

**1-형식의 작용.** 벡터장 $X = X^i \partial_i$ 에 대해

$$
\omega(X) = \omega_i\, X^i \in C^\infty(M)
$$

— *함수*. 1-형식이 *벡터장을 함수로 옮기는 사상*. 라그랑주 역학에서 *일* (work) $\int \omega(X)\, dt$ 형태의 적분이 등장.

**1-형식의 당김.** 매끄러운 사상 $\phi : M \to N$ 과 $\omega \in \Omega^1(N)$ 에 대해 *당김* $\phi^* \omega \in \Omega^1(M)$:

$$
(\phi^* \omega)_p (X_p) := \omega_{\phi(p)}\, (\phi_* X_p)
$$

(1.4.7). 좌표로 $\phi^*(dy^j) = (\partial y^j / \partial x^i)\, dx^i$.

## 한 번 더, 천천히

**(1) 벡터장과 1-형식의 *비대칭*.** 벡터장은 *점에서의 화살표* — 흐름을 만든다 (1.4.6). 1-형식은 *점에서의 등고선 가족* — 함수의 *어디로 가야 값이 커지는가* 의 처방. 둘의 결합 $\omega(X)$ 가 *흐름이 등고선을 가로지르는 속도*.

**(2) 정확한 1-형식 vs. 닫힌 1-형식.** $\omega = df$ 인 $f$ 가 존재하면 $\omega$ 가 *정확* (exact). $d\omega = 0$ 이면 *닫힘* (closed). 1.6.5 의 외미분 $d$ 에서 둘의 정확한 정의가 박힌다. 정확 ⇒ 닫힘 (자동), 역은 1.6.6 의 푸앵카레 보조정리 (국소적으로만 성립).

**(3) 물리에서의 등장.** 라그랑주 역학의 *작용* $S = \int L\, dt$ — 곡선 위의 1-형식 $L\, dt$ 의 적분. 해밀턴 역학의 *심플렉틱 형식* $\omega = dp_i \wedge dq^i$ — 2-형식. 모든 변분 원리가 미분형식의 적분으로 정리된다.

**(4) $df = 0$ 의 의미.** 1-형식 $df$ 가 *전역적으로 0* 이면 $f$ 가 *상수* (각 연결 성분에서). 즉 $df$ 는 $f$ 의 *비-상수성* 을 완전히 인코딩.

## 파이썬으로 확인 — $\mathbb R^2$ 의 1-형식과 $df$

이 코드의 메시지는 단순하다: 함수 $f(x, y) = x^2 y$ 의 미분 $df = 2xy\, dx + x^2\, dy$ 를 정의대로 계산하고, 임의의 벡터장에 작용시킨 결과가 *방향미분* $X[f]$ 와 일치하는지 본다.

```python
# f(x, y) = x² y → df = 2xy dx + x² dy
# 벡터장 X = ∂x + 3 ∂y at point (1, 2)
# X[f] = ∂f/∂x + 3 ∂f/∂y = 2xy + 3 x²
# df(X) = 2xy * 1 + x² * 3 = 2xy + 3 x²  — 같아야 함
import sympy as sp

x, y = sp.symbols('x y', real=True)
f = x**2 * y

# df = ∂f/∂x dx + ∂f/∂y dy (성분만 추출)
df_x = sp.diff(f, x)  # 2 x y
df_y = sp.diff(f, y)  # x²
print(f"df = {df_x} dx + {df_y} dy")

# 점 p = (1, 2) 에서 벡터장 X = (X^x, X^y) = (1, 3)
p_x, p_y = 1, 2
X_x, X_y = 1, 3

# df(X) at p
df_X_at_p = df_x.subs({x: p_x, y: p_y}) * X_x + df_y.subs({x: p_x, y: p_y}) * X_y

# 비교: X[f] = X^i ∂_i f at p (정의대로)
X_f = X_x * sp.diff(f, x) + X_y * sp.diff(f, y)
X_f_at_p = X_f.subs({x: p_x, y: p_y})

print(f"df(X) at p = {df_X_at_p}")
print(f"X[f] at p = {X_f_at_p}")
print(f"두 값 같은가? {df_X_at_p == X_f_at_p}")
```

이 결과는 *함수의 미분이 정확히 방향미분과 같다* 는 사실 — 1-형식의 정의가 1.4.3 의 방향미분과 *동등* 함을 보인다.

## 다음 절(1.6.3)로 가는 다리

1-형식이 *공변 1-텐서장* 이다. 일반화 — *임의 종류 $(p, q)$ 의 텐서장* — 이 다음 1.6.3 의 주제. 그 위에 미터 $g$ 를 *추가 구조* 로 박으면 *리만 다양체* — 일반상대론·해석역학의 무대.
