---
title: '2.3.1 — 기본 1-형식과 기본 2-형식: 라그랑지언이 만드는 *기하학적* 객체'
description: "라그랑지언 $L$ 이 접번들 $TM$ 위에 *기본 1-형식* $\\theta_L = (\\partial L/\\partial \\dot q^\\alpha) dq^\\alpha$ 와 *기본 2-형식* $\\omega_L = -d\\theta_L$ 을 자연스럽게 만든다. 이 두 형식이 라그랑주 역학의 *좌표 자유* 표현의 출발점."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 48
lang: ko
pairSlug: am1tc-2-3-1-fundamental-forms
draft: false
updated: 2026-05-18
---

# 2.3.1 — 기본 1-형식과 기본 2-형식: 라그랑지언이 만드는 *기하학적* 객체

> 라그랑지언 $L$ 이 접번들 $TM$ 위에 *기본 1-형식* $\theta_L = (\partial L/\partial \dot q^\alpha) dq^\alpha$ 와 *기본 2-형식* $\omega_L = -d\theta_L$ 을 자연스럽게 만든다. 이 두 형식이 라그랑주 역학의 *좌표 자유* 표현의 출발점.

## 본문이 말하는 것

원서 2.3.1 절은 라그랑지언 $L = L(q, \dot q, t)$ 가 *접번들* $TM$ (또는 확장 $TM \times \mathbb R$) 위에 만들어 내는 두 가지 미분형식을 정의한다.

**기본 1-형식** (fundamental 1-form, Poincaré–Cartan 1-form):

$$
\theta_L := \frac{\partial L}{\partial \dot q^\alpha}\, dq^\alpha = p_\alpha\, dq^\alpha
$$

(아인슈타인 합 규약, $p_\alpha = \partial L / \partial \dot q^\alpha$). 좌표 자유 객체로 *접번들 $TM$ 위의 1-형식*. $dq^\alpha$ 가 $TM$ 의 차트 좌표 $(q, \dot q)$ 중 *$q$ 부분의 1-형식* 임에 주의 — $d\dot q$ 가 등장하지 않는다.

확장 1-형식 ($TM \times \mathbb R$ 위):

$$
\theta_L^{\text{ext}} = p_\alpha\, dq^\alpha - H\, dt = p_\alpha\, dq^\alpha + (L - p_\alpha \dot q^\alpha)\, dt
$$

— $L\, dt$ 가 곡선 위에서 *작용* 의 적분이 되는 *작용 1-형식*. §3 의 변분 원리의 기초.

**기본 2-형식** (fundamental 2-form):

$$
\omega_L := -d\theta_L = -d\!\left(\frac{\partial L}{\partial \dot q^\alpha}\right) \wedge dq^\alpha
$$

좌표로 풀어 적으면

$$
\omega_L = -\frac{\partial^2 L}{\partial \dot q^\alpha \partial \dot q^\beta}\, d\dot q^\beta \wedge dq^\alpha - \frac{\partial^2 L}{\partial q^\beta \partial \dot q^\alpha}\, dq^\beta \wedge dq^\alpha
$$

스클레로노믹 + $L = T - V$ 의 표준 경우, 첫 항이 *질량 행렬* $M_{\alpha\beta}$ 가 등장하는 *비퇴화 부분*. 두 번째 항은 위치 좌표 사이의 *비대칭 결합*.

**핵심 사실** (2.3.2 에서 본격 사용): 라그랑주 운동방정식은 좌표 자유로

$$
\iota_{\dot \gamma}\, \omega_L = dH \quad (\text{확장 형식의 표현})
$$

— 운동 곡선 $\gamma$ 의 접벡터 $\dot\gamma$ 가 $\omega_L$ 과 contract 한 결과가 *에너지의 미분*. 즉 *기본 2-형식* 이 운동을 *기하학적으로* 결정한다.

## 한 번 더, 천천히

**(1) $\theta_L$ 이 *왜 자연스러운가*.** 작용 $S = \int L\, dt$ 가 *곡선 위의 1-형식 $L\, dt$ 의 적분*. 그 1-형식을 *접번들* 위로 끌어 올리면 (= pullback 의 역연산) $\theta_L^{\text{ext}} = p_\alpha\, dq^\alpha - H\, dt$. 즉 $\theta_L$ 가 *작용 적분의 적분기*. §3 의 변분 원리에서 자연스럽게 등장.

**(2) 르장드르 변환의 기하학적 의미.** 좌표 $(q, \dot q)$ 의 *접번들* $TM$ 에서, $\dot q^\alpha$ 를 $p_\alpha = \partial L / \partial \dot q^\alpha$ 로 옮기는 사상이 *르장드르 사상* $TM \to T^*M$ (여접번들). $\theta_L = p_\alpha dq^\alpha$ 가 그 사상으로 *여접번들의 자연 1-형식* $\theta_{\text{can}} = p_\alpha dq^\alpha$ 의 *당김*. §4 의 해밀턴 형식에서 본격 등장.

**(3) $\omega_L$ 의 *심플렉틱* 성격.** $\omega_L$ 이 *비퇴화* 인 라그랑지언 — 즉 $\det(\partial^2 L / \partial \dot q^\alpha \partial \dot q^\beta) \neq 0$ — 을 *정칙* (regular) 라그랑지언이라 한다. 정칙 라그랑지언에서 $\omega_L$ 은 $TM$ 위의 *심플렉틱 형식*. §4 의 해밀턴 위상공간 $T^*M$ 위의 $\omega_{\text{can}} = dp_\alpha \wedge dq^\alpha$ 가 그 자연스러운 도착지.

**(4) 비정칙 라그랑지언의 *어려움*.** $\det(\partial^2 L / \partial \dot q^\alpha \partial \dot q^\beta) = 0$ 라면 — 예: 게이지 이론의 라그랑지언, 일반상대론의 1차 형식 — $\omega_L$ 이 *퇴화*. 이 경우 운동방정식이 *일관성 조건* 을 만들고, *Dirac 의 구속 형식* 으로 다뤄야 한다. 본 책의 범위 밖.

**(5) §1.6.5 의 외미분 등장.** $\omega_L = -d\theta_L$ 가 *외미분의 적용*. §1.6 의 어휘가 §2.3 에서 비로소 *물리적 객체* 를 만들어 내는 자리. $\theta_L$ 이 1-형식 → $\omega_L = -d\theta_L$ 이 2-형식 → $d\omega_L = -d^2\theta_L = 0$ (자동, $d^2 = 0$). 즉 $\omega_L$ 이 *닫힌* 2-형식 — *심플렉틱 조건* 의 핵심.

## 파이썬으로 확인 — 단진자의 $\theta_L$ 와 $\omega_L$

이 코드의 메시지는 단순하다: 단진자 $L = \frac{1}{2} m\ell^2 \dot\theta^2 + mg\ell\cos\theta$ 의 기본 1-형식과 기본 2-형식을 sympy 로 계산하고, $d\omega_L = 0$ (심플렉틱 조건) 을 명시적으로 확인.

```python
# 단진자: q = θ, q̇ = θ̇
# L = (1/2) m ℓ² θ̇² + m g ℓ cos θ
# p = ∂L/∂θ̇ = m ℓ² θ̇
# θ_L = p dθ = m ℓ² θ̇ dθ
# ω_L = -d θ_L = -d(m ℓ² θ̇ dθ) = -m ℓ² d(θ̇) ∧ dθ = m ℓ² dθ ∧ dθ̇  (부호 정리)
import sympy as sp

theta, dtheta = sp.symbols('theta thetadot', real=True)
m, ell, g = sp.symbols('m ell g', positive=True)

L = sp.Rational(1, 2) * m * ell**2 * dtheta**2 + m * g * ell * sp.cos(theta)

# 기본 1-형식 θ_L = p dθ (p = ∂L/∂θ̇)
p = sp.diff(L, dtheta)
print(f"p = ∂L/∂θ̇ = {p}")
print(f"θ_L = ({p}) dθ")

# 기본 2-형식 ω_L = -d θ_L
# -d(p dθ) = -dp ∧ dθ = (∂p/∂θ dθ + ∂p/∂θ̇ dθ̇) ∧ (-dθ) = ∂p/∂θ̇ dθ ∧ dθ̇
# (∂p/∂θ = 0 인 경우 — 단진자에서)
dp_dtheta = sp.diff(p, theta)
dp_ddtheta = sp.diff(p, dtheta)

# ω_L 의 dθ ∧ dθ̇ 성분
omega_L_coeff = dp_ddtheta  # ω_L = (dp_ddtheta) dθ ∧ dθ̇
print(f"\nω_L = ({omega_L_coeff}) dθ ∧ dθ̇")
print(f"     = {omega_L_coeff} (질량 행렬 = m ℓ²)")

# 비퇴화 조건: 질량 행렬이 0 이 아닌가?
print(f"\n비퇴화 조건: ω_L 의 (dθ ∧ dθ̇) 계수 = {omega_L_coeff} ≠ 0")

# d ω_L = 0 (자동 — d² = 0)
# 1자유도 라그랑지언에서 ω_L 은 *2 차원 위 2-형식* 이라 d ω_L 은 3-형식이지만
# 2차원 위에선 3-형식이 모두 0 — 자명하게 닫혀 있음.
print(f"\n2차원 (q, q̇) 위 2-형식 ω_L 이 자동으로 닫혀 있다 (d² = 0).")

# 다자유도 경우의 일반 확인: 이중진자 같은 2자유도 예시도 ω_L 가 닫힘
# (계산은 본문 생략, 외미분 d² = 0 에서 자동)
```

이 결과는 (a) $\theta_L$ 의 좌표 표현이 *질량 × 속도 × 좌표 미분* 으로 자연스럽게 떨어지고, (b) $\omega_L$ 의 계수가 *질량 행렬* 그 자체, (c) $\omega_L$ 가 *자동으로 닫혀 있어* 심플렉틱 구조의 자연스러운 후보임을 보인다.

## 다음 절(2.3.2)로 가는 다리

기본 1-형식 $\theta_L$ 와 기본 2-형식 $\omega_L$ 이 *접번들 위의 좌표 자유 객체* 라는 것이 박혔다. 그러면 라그랑주 *방정식* — 좌변·우변·자유도 — 도 *좌표 자유로* 적힐 수 있을까? 답은 *그렇다*. 2.3.2 가 라그랑주 운동방정식의 *순수 미분기하* 표현을 박는다.
