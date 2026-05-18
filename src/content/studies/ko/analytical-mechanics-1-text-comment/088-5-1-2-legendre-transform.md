---
title: '5.1.2 — 르장드르 변환: $L(q, \dot q) \to H(q, p)$ 의 *대칭적* 사상'
description: "변수 $\\dot q$ 를 *그 켤레* $p = \\partial L/\\partial \\dot q$ 로 옮기는 변환. 가역 (정칙 조건 하). 열역학·기하학·전자기학 등 *변환 어휘* 의 통일."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 88
lang: ko
pairSlug: am1tc-5-1-2-legendre-transform
draft: false
updated: 2026-05-18
---

# 5.1.2 — 르장드르 변환: $L(q, \dot q) \to H(q, p)$ 의 *대칭적* 사상

> 변수 $\dot q$ 를 *그 켤레* $p = \partial L/\partial \dot q$ 로 옮기는 변환. 가역 (정칙 조건 하). 열역학·기하학·전자기학 등 *변환 어휘* 의 통일.

## 본문이 말하는 것

**르장드르 변환** (Legendre transform). $L : \mathbb R^n \to \mathbb R$ 이 *엄밀 볼록* (strictly convex) 함수라 하자. 새 변수 $p = \nabla L(\dot q)$, 즉 $p_\alpha = \partial L / \partial \dot q^\alpha$ 가 *비퇴화* 사상 $\dot q \mapsto p$. 이 사상은 *전단사* (역가능).

새 함수

$$
H(p) := p_\alpha \dot q^\alpha(p) - L(\dot q(p)) = \sup_{\dot q} [p_\alpha \dot q^\alpha - L(\dot q)]
$$

— *르장드르 변환*. (다변수 + 매개변수 $q$ 포함 일반 형식 : $H(q, p) = p_\alpha \dot q^\alpha - L(q, \dot q)$, $\dot q$ 는 $p$ 의 함수.)

**기본 성질.**

- **가역성**: $L^{**} = L$ (이중 르장드르가 원래 함수). 즉 *대칭적 변환*.
- **켤레 관계**: $p = \partial L/\partial \dot q$ ↔ $\dot q = \partial H/\partial p$.
- **합동**: $L + H = p \cdot \dot q$ (점-별).

**좌표 변환의 본질.** 변수 *$\dot q$* 가 라그랑지언 형식의 자연 변수, *$p$* 가 해밀턴 형식의 자연 변수. 르장드르가 *두 무대 (접번들·여접번들) 사이의 자연 동형*.

## 한 번 더, 천천히

**(1) 단진자의 르장드르.** $L(\theta, \dot\theta) = \frac{1}{2} m\ell^2 \dot\theta^2 + mg\ell\cos\theta$. $p = m\ell^2 \dot\theta$ → $\dot\theta = p/(m\ell^2)$. $H = p \dot\theta - L = \frac{p^2}{2m\ell^2} - mg\ell\cos\theta$ — 익숙한 해밀토니언.

**(2) 자유 입자의 르장드르.** $L = \frac{1}{2} m \dot x^2$. $p = m\dot x$. $H = p^2 / (2m)$. *Newton 운동량* $p = m v$ + *Newton 운동에너지* $H = mv^2/2$.

**(3) 르장드르 변환의 *기하학적 해석*.** $L(\dot q)$ 의 *접선* — 기울기 $p$ 와 *y-축 절편* $-H$. 즉 *기울기 $p$ 의 접선이 함수 위로 그어질 때, $H$ 는 그 접선의 *y-절편의 음의 값*. *볼록 함수와 그 접선 가족* 의 *듀얼 표현*.

**(4) 열역학에서의 *동일 변환*.**

- 내부 에너지 $U(S, V)$ → 자유에너지 $F(T, V) = U - TS$ (르장드르 in $S$).
- 내부 에너지 $U(S, V)$ → 엔탈피 $H(S, p) = U + pV$ (르장드르 in $V$, 부호 약속).
- 자유에너지 $F(T, V)$ → Gibbs 자유에너지 $G(T, p) = F + pV$.

*변수 쌍 (예: 부피 ↔ 압력, 엔트로피 ↔ 온도) 의 르장드르 교환* 이 *열역학 함수 가족* 의 핵심 구조. 해석역학과 동일한 변환.

**(5) 정칙성 조건의 *필요성*.** $L$ 이 *엄밀 볼록* — Hessian $\partial^2 L / \partial \dot q^\alpha \partial \dot q^\beta$ 가 *양의 정부호* — 이라야 $p \mapsto \dot q$ 가 *전단사*. 비-정칙 라그랑지언 (게이지 이론, 일반상대론) 에서는 *Dirac 제약 처리* 가 필요 — *주표* 의 르장드르 가능성에만 한정.

**(6) 양자역학으로의 *불가능성*.** 양자역학에서 $\hat q$ 와 $\hat p$ 가 *비가환* — *동시 측정 불가*. 르장드르 변환은 *고전적 가환 변수의 변환*, *양자 등가물 없다*. 그러나 *Wigner 변환* 같은 *위상공간 분포의 양자판* 이 르장드르의 양자 변형.

## 파이썬으로 확인 — 단진자 르장드르의 *가역성*

이 코드의 메시지는 단순하다: 단진자 $L$ 에서 르장드르로 $H$ 를 만들고, *다시* 르장드르로 *원래 $L$* 을 복원. 가역성을 sympy 로 직접 확인.

```python
# 단진자: L(θ, θ̇) = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# 르장드르: H(θ, p) = p θ̇ - L,  p = ∂L/∂θ̇ = m ℓ² θ̇ → θ̇ = p/(m ℓ²)
# 역르장드르: L(θ, θ̇) = θ̇ p - H,  θ̇ = ∂H/∂p
import sympy as sp

theta, dtheta, p = sp.symbols('theta thetadot p', real=True)
m, ell, g = sp.symbols('m ell g', positive=True)

# 원 라그랑지언
L = sp.Rational(1, 2) * m * ell**2 * dtheta**2 + m * g * ell * sp.cos(theta)
print(f"L = {L}")

# 르장드르 변환 (한 번)
p_expr = sp.diff(L, dtheta)  # m ℓ² θ̇
print(f"\np = ∂L/∂θ̇ = {p_expr}")
dtheta_of_p = sp.solve(p_expr - p, dtheta)[0]
print(f"θ̇(p) = {dtheta_of_p}")

H = p * dtheta_of_p - L.subs(dtheta, dtheta_of_p)
H = sp.simplify(H)
print(f"\nH(θ, p) = {H}")
print(f"        = p²/(2 m ℓ²) - m g ℓ cos θ ✓")

# 역르장드르: H 에서 L 을 복원
# θ̇ = ∂H/∂p (정준 방정식 1 회수)
dtheta_recovered = sp.diff(H, p)
print(f"\n역르장드르: ∂H/∂p = {sp.simplify(dtheta_recovered)}")

# L̃ = θ̇·p - H, 위에서 θ̇ = p/(m ℓ²)
L_recovered = dtheta_recovered * p - H
L_recovered = sp.simplify(L_recovered)
print(f"L̃ (복원) = {L_recovered}")

# 원 L 과 비교 — θ̇ 를 p/(m ℓ²) 로 옮긴 표현이 같아야 함
L_in_p = L.subs(dtheta, p / (m * ell**2))
L_in_p = sp.simplify(L_in_p)
print(f"L (p 변수로) = {L_in_p}")
print(f"\n두 값 일치 ↔ 르장드르 변환의 가역성")
print(f"  L̃ - L = {sp.simplify(L_recovered - L_in_p)}  (= 0 기대)")
```

이 결과는 르장드르 변환이 *완전 가역* — $L \to H \to L$ 의 순환이 *원래 함수를 복원* 함을 sympy 로 직접 확인.

## 다음 절(5.1.3)로 가는 다리

§5.1.1 의 *작용을 위상공간 위로 들어올린 형식* 과 §5.1.2 의 *르장드르 변환* 이 결합되면, *상공간 위의 해밀턴 원리* 의 정식 형식이 완성된다. §5.1.3 이 그 변분 원리의 정밀한 진술과 *정준 방정식 도출* 을 박는다.
