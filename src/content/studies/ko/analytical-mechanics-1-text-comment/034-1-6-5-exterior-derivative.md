---
title: '1.6.5 — 외미분: $d^2 = 0$ 이라는 한 줄짜리 핵심 등식'
description: '$d : \Omega^p \to \Omega^{p+1}$ — 함수의 미분을 일반화한 연산자. 라이프니츠 + $d^2 = 0$ 두 공리로 *유일하게* 정의된다. 푸앵카레 보조정리·스토크스 정리의 전제.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 34
lang: ko
pairSlug: am1tc-1-6-5-exterior-derivative
draft: false
updated: 2026-05-17
---

# 1.6.5 — 외미분: $d^2 = 0$ 이라는 한 줄짜리 핵심 등식

> $d : \Omega^p \to \Omega^{p+1}$ — 함수의 미분을 일반화한 연산자. 라이프니츠 + $d^2 = 0$ 두 공리로 *유일하게* 정의된다. 푸앵카레 보조정리·스토크스 정리의 전제.

## 본문이 말하는 것

**외미분** (exterior derivative) $d : \Omega^p(M) \to \Omega^{p+1}(M)$ 은 다음 *유일한* 선형 작용소:

**(1)** $0$-형식 (함수) $f$ 에 대해 $df$ 는 1.6.1 의 함수의 미분.

**(2) 라이프니츠** (graded Leibniz, 분차 라이프니츠): $\omega \in \Omega^p$, $\eta \in \Omega^q$ 에 대해

$$
d(\omega \wedge \eta) = d\omega \wedge \eta + (-1)^p\, \omega \wedge d\eta
$$

**(3)** $d^2 = 0$, 즉 $d(d\omega) = 0$ for all $\omega$.

이 세 공리가 $d$ 를 *유일하게* 결정 (본문 정리). 좌표 표현으로

$$
d \omega = d\!\left(\sum_{i_1 < \cdots < i_p} \omega_{i_1 \dots i_p}\, dx^{i_1} \wedge \cdots \wedge dx^{i_p}\right) = \sum \frac{\partial \omega_{i_1 \dots i_p}}{\partial x^j}\, dx^j \wedge dx^{i_1} \wedge \cdots \wedge dx^{i_p}
$$

— *함수 계수의 미분을 새 차원으로 쐐기곱*.

**유용한 등식.**

- $df = (\partial f / \partial x^i)\, dx^i$.
- $d(dx^i) = 0$ (좌표 함수의 미분의 미분은 0).
- $d(f\, \omega) = df \wedge \omega + f\, d\omega$.
- $d^2 f = 0$ 은 편미분의 *대칭* ($\partial_i \partial_j = \partial_j \partial_i$) 으로 해석됨: $d^2 f = (\partial_i \partial_j f)\, dx^i \wedge dx^j = 0$ — $\partial_i \partial_j$ 가 대칭이고 $dx^i \wedge dx^j$ 가 반대칭이라 합이 자동으로 0.

**Vector calculus 와의 대응 ($\mathbb R^3$ 한정).**

- $df$ ↔ $\nabla f$ (그라디언트)
- $d \omega^1$ ↔ $\nabla \times \mathbf{F}$ (회전 / 컬)
- $d \omega^2$ ↔ $\nabla \cdot \mathbf{B}$ (발산)

그리고 $d^2 = 0$ 은 *$\nabla \times \nabla f = 0$* 과 *$\nabla \cdot (\nabla \times \mathbf{F}) = 0$* 의 통합.

## 한 번 더, 천천히

**(1) $d^2 = 0$ 의 *위상학적* 의미.** *닫힌* ($d\omega = 0$) 미분형식과 *정확한* ($\omega = d\alpha$) 미분형식 사이의 차이가 *다양체의 위상* 을 측정한다 (드람 코호몰로지 $H^p_{dR}(M) = \ker d / \text{im } d$). $\mathbb R^n$ 같은 *위상학적으로 평탄한* 공간에서는 모두 같지만, 토러스나 $S^n$ 같은 곳에서는 다르다.

**(2) 라이프니츠의 *분차* 부호.** 일반 라이프니츠 $d(\omega \eta) = (d\omega) \eta + \omega (d\eta)$ 에 *$(-1)^{\deg \omega}$* 부호가 끼어든다. $\omega$ 가 $\eta$ 를 *통과해 미분* 하려면 반가환 부호를 지불해야 한다. 외대수의 *분차 가환성* 의 자연스러운 결과.

**(3) $d$ 가 *좌표 자유*.** 좌표로 정의됐지만 좌표 변환에 대해 *불변*. 즉 좌표를 바꿔 다시 $d$ 를 계산해도 *같은 형식* 이 나온다. (본문이 증명하는 정리.) 이 좌표 자유성이 미분형식 어휘의 *깔끔함* 의 핵심.

**(4) Maxwell 방정식의 미분형식 형태.** 전자기 텐서 $F = dA$ (벡터 포텐셜 $A$ 의 외미분). 그러면 자동으로 $dF = d^2 A = 0$ — 이게 *동차 Maxwell* 의 두 식 ($\nabla \cdot \mathbf{B} = 0$, $\nabla \times \mathbf{E} = -\partial_t \mathbf{B}$). 남은 두 식은 *호지 쌍대* 와 *원천*: $d \star F = J$.

## 파이썬으로 확인 — $d^2 = 0$ 수치 검증

이 코드의 메시지는 단순하다: $\mathbb R^3$ 의 임의의 함수 $f$ 에 대해 $d(df) = 0$ 임을 sympy 로 직접 계산해 본다. 이게 *편미분의 대칭성* 의 미분형식 어휘 변환.

```python
# f(x, y, z) = x³ + 2 x y² + z sin(x y) — 임의의 함수
# d(df) = 0 ?  좌표 계산: d² f = (∂_i ∂_j f) dx^i ∧ dx^j 의 모든 성분이 0
import sympy as sp

x, y, z = sp.symbols('x y z', real=True)
f = x**3 + 2 * x * y**2 + z * sp.sin(x * y)

# df 의 성분
df_x = sp.diff(f, x)
df_y = sp.diff(f, y)
df_z = sp.diff(f, z)

# d(df) 의 성분: ∂_i (df_j) - ∂_j (df_i) for i < j
ddf_xy = sp.simplify(sp.diff(df_y, x) - sp.diff(df_x, y))
ddf_xz = sp.simplify(sp.diff(df_z, x) - sp.diff(df_x, z))
ddf_yz = sp.simplify(sp.diff(df_z, y) - sp.diff(df_y, z))

print(f"d²f 의 (xy) 성분 = {ddf_xy}")
print(f"d²f 의 (xz) 성분 = {ddf_xz}")
print(f"d²f 의 (yz) 성분 = {ddf_yz}")

# 일반 1-형식에 대해서도: ω = P dx + Q dy + R dz → dω = (Q_x - P_y) dx∧dy + ...
# 그리고 d(dω) = 0 ? (자동 — 위와 같은 메커니즘)
P, Q, R = x**2 + y, y * z, x * z + sp.sin(y)
omega = (P, Q, R)
dw_xy = sp.diff(omega[1], x) - sp.diff(omega[0], y)
dw_xz = sp.diff(omega[2], x) - sp.diff(omega[0], z)
dw_yz = sp.diff(omega[2], y) - sp.diff(omega[1], z)
print(f"\n1-형식 ω = ({P}) dx + ({Q}) dy + ({R}) dz")
print(f"dω = ({dw_xy}) dx∧dy + ({dw_xz}) dx∧dz + ({dw_yz}) dy∧dz")

# d(dω): dω 는 2-형식, d(dω) 는 3-형식 (= 1차원 R^3 의 체적 성분)
# (∂_z dw_xy - ∂_y dw_xz + ∂_x dw_yz) — sign 주의
ddw = sp.simplify(sp.diff(dw_xy, z) - sp.diff(dw_xz, y) + sp.diff(dw_yz, x))
print(f"d²ω 의 dx∧dy∧dz 계수 = {ddw}  (= 0 기대)")
```

이 결과는 *임의의* 매끄러운 형식에 대해 $d^2 = 0$ 이 정확히 0 임을 확인한다 — 즉 *위상학적* 항등식 $d^2 = 0$ 의 수치적 발현.

## 다음 절(1.6.6)로 가는 다리

$d^2 = 0$ 은 *정확 ⇒ 닫힘* ($\omega = d\alpha \Rightarrow d\omega = 0$) 을 자동으로 준다. 그러나 *역* 은 일반적으로 거짓 — *닫힘 ≠ 정확*. 다음 1.6.6 의 푸앵카레 보조정리는 *국소적으로는 역도 참* 이라는 사실. 이게 미분형식 위상학의 시작.
