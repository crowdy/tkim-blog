---
title: '2.2.3 — 계의 대칭성과 보존법칙: 노에터 정리의 학부판'
description: "라그랑지언을 *불변* 으로 두는 (또는 전미분만큼 바꾸는) *연속* 변환 한 가족마다 하나의 *제1적분*. 평행이동 → 운동량, 회전 → 각운동량, 시간 변위 → 에너지 — 모든 보존법칙이 한 정리로 정리된다."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 45
lang: ko
pairSlug: am1tc-2-2-3-symmetry-and-conservation
draft: false
updated: 2026-05-18
---

# 2.2.3 — 계의 대칭성과 보존법칙: 노에터 정리의 학부판

> 라그랑지언을 *불변* 으로 두는 (또는 전미분만큼 바꾸는) *연속* 변환 한 가족마다 하나의 *제1적분*. 평행이동 → 운동량, 회전 → 각운동량, 시간 변위 → 에너지 — 모든 보존법칙이 한 정리로 정리된다.

## 본문이 말하는 것

매개변수 $\varepsilon$ 의 *연속 변환* 가족 $q^\alpha \to q^\alpha + \varepsilon\, \eta^\alpha(q, t) + O(\varepsilon^2)$ (시간이 함께 변환되는 더 일반적인 형태는 생략) 가 *라그랑지언의 대칭* 이라는 것은:

$$
L(q + \varepsilon \eta, \dot q + \varepsilon \dot\eta, t) = L(q, \dot q, t) + \varepsilon \frac{d \Phi}{dt}(q, t) + O(\varepsilon^2)
$$

즉 *최대 전미분 항* $d\Phi/dt$ 만큼 차이가 나는 *준-불변* (quasi-invariant). $\Phi = 0$ 이면 *엄밀 불변*, $\Phi \neq 0$ 이면 *준-불변* — 2.1.5 의 게이지 자유로 같은 운동.

**노에터 정리** (Noether's theorem). 위 대칭에 대응하는 *제1적분*

$$
J(q, \dot q, t) = p_\alpha\, \eta^\alpha - \Phi
$$

가 운동방정식의 해를 따라 *상수*. 즉 $dJ/dt = 0$.

증명 스케치 (본문 참조): $L$ 의 변환 식에서 $\varepsilon$ 의 1차 항을 정리하면 라그랑주식 좌변과 $d(p_\alpha \eta^\alpha - \Phi)/dt$ 가 만난다. 운동방정식의 해에서 라그랑주식 좌변 = 0 이라 $dJ/dt = 0$.

**대표 예시 매핑.**

| 대칭 | $\eta^\alpha$ | $\Phi$ | 보존량 $J$ |
|---|---|---|---|
| 시간 변위 ($t \to t + \varepsilon$) | $\dot q^\alpha$ (속도) | $L$ 자체 | $H = p_\alpha \dot q^\alpha - L$ (해밀토니언, 2.2.4) |
| 공간 평행이동 ($\mathbf{x} \to \mathbf{x} + \varepsilon \hat{\mathbf{n}}$) | $\hat{\mathbf{n}}$ | 0 | $\mathbf{p} \cdot \hat{\mathbf{n}}$ (운동량 성분) |
| 회전 ($\mathbf{x} \to R \mathbf{x}$) | $\hat{\mathbf{n}} \times \mathbf{x}$ | 0 | $\mathbf{L} \cdot \hat{\mathbf{n}}$ (각운동량 성분) |

## 한 번 더, 천천히

**(1) "연속" 의 의미.** 변환이 *매개변수 $\varepsilon$* 로 1-매개변수 군 (1.4.6) 을 이룬다는 뜻. *이산* 대칭 (시간 반전, 패리티) 은 노에터 정리의 대상이 아니다 — 그것들은 *이산 보존법칙* (예: 패리티 보존) 을 만들지만 미분 형식의 정리로 정리되지 않는다.

**(2) 준-불변이 *결정적*.** $\Phi = 0$ 인 엄밀 대칭만 다루면 *유용한 대칭 가족이 좁아진다*. 예: 갈릴레오 변환 $\mathbf{x} \to \mathbf{x} + \mathbf{V} t$ 가 자유 입자 라그랑지언에 *전미분 항* 을 더한다 — 엄밀 불변이 아니지만 준-불변이라 보존량 (질량 중심의 균일 운동) 을 만든다. 노에터의 핵심 일반화.

**(3) 대칭이 *어디서 오는가*.** 두 가지 출처가 있다. (a) *공간 자체의 대칭* — 시공간이 평행이동·회전 대칭 → 운동량·각운동량 보존. (b) *상호작용의 대칭* — 게이지 대칭, 시간 보존 등.

**(4) 노에터 정리의 *역*.** *모든* 제1적분이 *어떤* 대칭에 대응하는가? 답은 *일반적으로 그렇다* (가역적 노에터 정리). 단, *적분 불가능* 한 계에서는 *대칭 없는 제1적분* 이 존재할 수 있어 정밀한 진술은 까다롭다.

**(5) 양자역학에의 일반화.** 노에터의 *연속 대칭과 보존량 대응* 이 양자역학에서 *유니타리 변환과 자기-수반 작용소* 의 대응으로 직접 옮겨진다. 회전 → 각운동량 작용소, 시간 변위 → 해밀토니안, 위상 변위 → 전하 작용소 — 모두 노에터 정리의 *양자판*.

## 파이썬으로 확인 — 케플러 운동의 회전 대칭 → 각운동량

이 코드의 메시지는 단순하다: 케플러 라그랑지언 $L = \frac{1}{2} m (\dot x^2 + \dot y^2) + GMm/\sqrt{x^2 + y^2}$ 가 *회전 변환* 에 *엄밀 불변*. 노에터 처방으로 보존량을 *기계적* 으로 계산해, 그것이 각운동량 $L_z = m(x\dot y - y\dot x)$ 와 일치함을 sympy 로 확인.

```python
# L = (1/2) m (ẋ² + ẏ²) + GMm / √(x² + y²)
# 회전 변환: x → x cos ε - y sin ε, y → x sin ε + y cos ε
# 1차: η^x = -y, η^y = x
# Φ = 0 (엄밀 불변)
# 노에터 처방: J = p_α η^α = m ẋ · (-y) + m ẏ · (x) = m (x ẏ - y ẋ) = L_z
import sympy as sp

t = sp.symbols('t', real=True)
x = sp.Function('x')(t)
y = sp.Function('y')(t)
dx, dy = sp.diff(x, t), sp.diff(y, t)

m, GM = sp.symbols('m GM', positive=True)

# 라그랑지언
L = sp.Rational(1, 2) * m * (dx**2 + dy**2) + GM * m / sp.sqrt(x**2 + y**2)

# 일반화 운동량
p_x = sp.diff(L, dx)
p_y = sp.diff(L, dy)
print(f"p_x = {p_x}")
print(f"p_y = {p_y}")

# 회전 변환의 생성자: η^x = -y, η^y = x
eta_x, eta_y = -y, x

# 노에터 보존량
J = p_x * eta_x + p_y * eta_y
print(f"\n노에터 보존량 J = {sp.simplify(J)}")
print(f"          = m (x ẏ - y ẋ) = L_z (각운동량) ✓")

# 운동방정식을 적용해 dJ/dt = 0 확인
# EL_x: d/dt(p_x) - ∂L/∂x = 0  →  m ẍ + GM m x / (x²+y²)^(3/2) = 0  →  ẍ = -GM x / r³
# 같이 ÿ = -GM y / r³
# dJ/dt 직접 계산
dJ_dt = sp.diff(J, t)
# 운동방정식 대입
ddx = -GM * x / (x**2 + y**2)**sp.Rational(3, 2)
ddy = -GM * y / (x**2 + y**2)**sp.Rational(3, 2)
dJ_dt_substituted = dJ_dt.subs([(sp.diff(x, t, 2), ddx),
                                  (sp.diff(y, t, 2), ddy)])
print(f"\ndJ/dt 운동방정식 적용 후: {sp.simplify(dJ_dt_substituted)}")
print(f"= 0 ?  ✓ — 각운동량이 보존됨")
```

이 결과는 노에터 처방이 *기계적으로* 각운동량을 만들어 냄을 보인다. 회전 대칭이라는 *기하학적* 사실에서 각운동량 보존이 *대수적 자동* 으로 떨어진다.

## 다음 절(2.2.4)로 가는 다리

노에터 정리의 *시간 변위 대칭* 의 경우가 특별하다. 보존량이 *해밀토니언* $H = p_\alpha \dot q^\alpha - L$ — 라그랑지언에서 *르장드르 변환* 으로 얻어지는 양. 스클레로노믹 + 보존력에서는 $H = T + V$ (총 에너지). 이게 §4 의 해밀턴 형식 의 출발점이기도 하다. 2.2.4 가 해밀토니언의 정의와 *에너지 적분* 의 의미를 본격적으로 박는다.
