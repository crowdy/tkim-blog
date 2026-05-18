---
title: '2.1.5 — 라그랑지언의 게이지 변환: $L \to L + \frac{dF}{dt}$ 가 운동을 바꾸지 않는다'
description: "함수 $F(q, t)$ 의 전미분 $dF/dt$ 를 라그랑지언에 더해도 라그랑주 방정식이 같다 — 즉 *운동이 같다*. 라그랑지언이 유일하지 않고, 한 *동치류* 만이 의미를 갖는다는 사실."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 42
lang: ko
pairSlug: am1tc-2-1-5-lagrangian-gauge
draft: false
updated: 2026-05-18
---

# 2.1.5 — 라그랑지언의 게이지 변환: $L \to L + \frac{dF}{dt}$ 가 운동을 바꾸지 않는다

> 함수 $F(q, t)$ 의 전미분 $dF/dt$ 를 라그랑지언에 더해도 라그랑주 방정식이 같다 — 즉 *운동이 같다*. 라그랑지언이 유일하지 않고, 한 *동치류* 만이 의미를 갖는다는 사실.

## 본문이 말하는 것

**정리.** 함수 $F = F(q, t)$ 가 매끄럽다면, 라그랑지언

$$
L'(q, \dot q, t) := L(q, \dot q, t) + \frac{dF}{dt}(q, \dot q, t)
$$

(여기서 $dF/dt = (\partial F/\partial q^\alpha) \dot q^\alpha + \partial F/\partial t$) 가 *원래와 같은* 라그랑주 방정식을 만든다.

**증명.** $L'$ 에 라그랑주 작용소를 적용:

$$
\frac{d}{dt}\frac{\partial L'}{\partial \dot q^\alpha} - \frac{\partial L'}{\partial q^\alpha} = \left[\frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha}\right] + \left[\frac{d}{dt}\frac{\partial (dF/dt)}{\partial \dot q^\alpha} - \frac{\partial (dF/dt)}{\partial q^\alpha}\right]
$$

두 번째 대괄호를 정리. $\partial (dF/dt) / \partial \dot q^\alpha = \partial F / \partial q^\alpha$ (전미분 정의), $\partial (dF/dt) / \partial q^\alpha = (\partial^2 F / \partial q^\alpha \partial q^\beta) \dot q^\beta + \partial^2 F / \partial q^\alpha \partial t$. 한편 $\frac{d}{dt}(\partial F / \partial q^\alpha) = (\partial^2 F / \partial q^\alpha \partial q^\beta) \dot q^\beta + \partial^2 F / \partial q^\alpha \partial t$. 두 표현이 *같다* — 그래서 두 번째 대괄호 = 0.

결론: $L'$ 의 라그랑주식 좌변 = $L$ 의 라그랑주식 좌변. 같은 운동.

**작용 표현.** $L \to L + dF/dt$ 는 작용 $S = \int L\, dt$ 에 *경계 항* 만 더함:

$$
S' = S + F(q_f, t_f) - F(q_i, t_i)
$$

— 끝점이 고정된 변분에서 *경계 항* 은 변분에 기여 안 함. 그래서 변분 원리 $\delta S = 0$ 가 $\delta S' = 0$ 와 동치.

## 한 번 더, 천천히

**(1) "게이지" 의 어원.** *Gauge* 는 원래 "측정 기준" 을 의미. 라그랑지언의 *측정 기준* 이 *전미분 항* 만큼 임의 — 즉 *측정의 영점* 을 자유롭게 옮길 수 있다. 전자기 게이지 변환 ($\mathbf{A} \to \mathbf{A} + \nabla \chi$) 의 학부 표본이 바로 이것.

**(2) 전자기 게이지의 라그랑지언 표현.** 2.1.4 의 라그랑지언 $L = \frac{1}{2} m |\mathbf{v}|^2 - e\phi + e \mathbf{A} \cdot \mathbf{v}$. 게이지 변환 $\mathbf{A} \to \mathbf{A} + \nabla \chi(\mathbf{x}, t)$, $\phi \to \phi - \partial \chi / \partial t$ 가 라그랑지언에

$$
\Delta L = e\, (\partial \chi / \partial t) + e\, (\nabla \chi) \cdot \mathbf{v} = e\, \frac{d \chi}{dt}
$$

— 정확히 *함수 $e\chi$ 의 전미분*. 운동 불변.

**(3) 라그랑지언의 *동치류*.** 두 라그랑지언 $L$, $L'$ 가 *동치* 라는 것은 $L' = L + dF/dt$ 인 $F$ 가 존재한다는 것. 같은 운동을 만드는 라그랑지언들이 *동치류* 를 이룬다. 물리적으로 의미 있는 양은 *동치류 자체*, 한 라그랑지언이 아니다.

**(4) 노에터 정리에의 영향.** 2.2.3 의 노에터 정리는 *대칭이 보존량을 만든다* — 그런데 *어떤* 대칭? 라그랑지언을 *불변* 으로 두는 변환 + *전미분만큼 바꾸는* 변환 모두 보존량을 만든다. 게이지 변환의 자유가 노에터의 *준-대칭* (quasi-symmetry) 으로 확장됨.

**(5) 라그랑지언의 형태 결정의 *불완전성*.** "어떤 라그랑지언이 *맞는*가" 라는 질문은 *부분적으로만* 답할 수 있다. 운동이 같다면 어느 라그랑지언을 써도 좋다. 그러나 *양자화* 단계에서는 같은 운동을 만드는 두 라그랑지언이 *다른 양자 이론* 을 만들 수 있다 — 작용 적분의 *경로 적분* 형식 (Feynman) 이 *작용 자체에 의존* 하기 때문. 게이지 자유가 양자화에서 *모듈로* 가 되는 부분.

## 파이썬으로 확인 — 단진자, $L$ vs $L + dF/dt$

이 코드의 메시지는 단순하다: 단진자에 임의 함수 $F = \theta^2 \cdot \sin(t)$ 의 전미분을 더한 *변형 라그랑지언* 으로 운동을 적분해, *원래와 같은 궤적* 이 나오는지 확인.

```python
# L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# F(θ, t) = θ² sin(t) — 임의의 함수
# dF/dt = 2θ θ̇ sin(t) + θ² cos(t)
# L' = L + dF/dt
# L 의 라그랑주식:  m ℓ² θ̈ + m g ℓ sin θ = 0
# L' 의 라그랑주식: 더 복잡한 식이지만, 정리하면 *같은 식*
# (수동으로 정리하기 귀찮으므로 sympy 로 확인)
import sympy as sp

t = sp.symbols('t', real=True)
theta = sp.Function('theta')(t)
dtheta = sp.diff(theta, t)
ddtheta = sp.diff(theta, t, 2)

m, ell, g = sp.symbols('m ell g', positive=True)

# 원 라그랑지언
L = sp.Rational(1, 2) * m * ell**2 * dtheta**2 + m * g * ell * sp.cos(theta)

# 게이지 추가 함수 F = θ² sin t
F = theta**2 * sp.sin(t)
dF_dt = sp.diff(F, t)

L_prime = L + dF_dt

def euler_lagrange(L_expr):
    """라그랑주식 좌변: d/dt ∂L/∂θ̇ - ∂L/∂θ"""
    dL_ddtheta = sp.diff(L_expr, dtheta)
    return sp.simplify(sp.diff(dL_ddtheta, t) - sp.diff(L_expr, theta))

EL = euler_lagrange(L)
EL_prime = euler_lagrange(L_prime)

print(f"원 라그랑주식 좌변:   {sp.simplify(EL)}")
print(f"변형 라그랑주식 좌변: {sp.simplify(EL_prime)}")
print(f"두 식이 같은가? {sp.simplify(EL - EL_prime) == 0}")
```

이 결과는 *전미분만큼 다른 두 라그랑지언이 정확히 같은 운동방정식을 만든다* 는 게이지 정리를 sympy 로 직접 확인한다 — 한 줄짜리 *대수적* 정체.

## 다음 절(2.2.1)로 가는 다리

라그랑지언이 *형태가 동치류 자유* 라는 사실은, 운동의 *비자명한* 정보가 *라그랑지언의 어떤 구조* 에 있는지 묻게 한다. 답은 *대칭과 보존량*. 라그랑지언이 *어떤 변환에 불변* 이라면 (게이지를 모듈로) 그에 대응하는 *보존되는 양* 이 존재 — 노에터 정리. §2.2 가 그 정리와 *제1적분*, *해밀토니언*, *자유도 삭감* 까지 차례로 박는다.
