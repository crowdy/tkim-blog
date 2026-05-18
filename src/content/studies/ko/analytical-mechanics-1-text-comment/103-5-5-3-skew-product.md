---
title: '5.5.3 — 사교적: 위상공간 두 점의 *심플렉틱 페어링*'
description: "두 접벡터 사이의 비대칭 페어링 $\\omega(X, Y)$ — *사교적* (斜交積). §1.5.5 의 외적 (wedge) 의 점-별 평가 형식. 정준 변환에서 *불변*. 라그랑주·포아송 괄호의 *연속 형식*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 103
lang: ko
pairSlug: am1tc-5-5-3-skew-product
draft: false
updated: 2026-05-18
---

# 5.5.3 — 사교적: 위상공간 두 점의 *심플렉틱 페어링*

> 두 접벡터 사이의 비대칭 페어링 $\omega(X, Y)$ — *사교적* (斜交積). §1.5.5 의 외적 (wedge) 의 점-별 평가 형식. 정준 변환에서 *불변*. 라그랑주·포아송 괄호의 *연속 형식*.

## 본문이 말하는 것

**사교적** (skew product, symplectic pairing). 위상공간 한 점에서 두 접벡터 $X, Y \in T_p (T^*M)$ 의 *비대칭 페어링*:

$$
\omega(X, Y) := \sum_\alpha (X^{q^\alpha} Y^{p_\alpha} - Y^{q^\alpha} X^{p_\alpha})
$$

여기서 $X = X^{q^\alpha} \partial_{q^\alpha} + X^{p_\alpha} \partial_{p_\alpha}$ 의 좌표 분해.

**§1.5.5 의 외적 와의 관계.** $\omega = \sum_\alpha dq^\alpha \wedge dp_\alpha$ 의 *2-형식* — 두 접벡터에 *대수적으로 평가* 한 결과가 *사교적*. 사교적은 *점-별 외적 평가의 한 이름*.

**기본 성질.**

- *비대칭*: $\omega(X, Y) = -\omega(Y, X)$.
- *양선형*: $\omega(aX + bX', Y) = a\omega(X, Y) + b\omega(X', Y)$.
- *비퇴화*: $\omega(X, Y) = 0$ for all $Y$ → $X = 0$.

**정준 변환에서의 불변성.** 정준 변환 $\Phi$ 에 의해 $X, Y$ 가 옮겨지면 $\omega(\Phi_* X, \Phi_* Y) = \omega(X, Y)$ — *심플렉틱 형식 보존* (§5.4.1).

**라그랑주·포아송 괄호와의 연결.** 두 함수 $f, g$ 에 대해 *해밀턴 벡터장* $X_f, X_g$. 그러면

$$
\omega(X_f, X_g) = \{f, g\}
$$

— *사교적이 포아송 괄호*. 라그랑주 괄호도 *듀얼* 관계로 사교적에서 떨어짐.

## 한 번 더, 천천히

**(1) 외적·사교적·포아송·라그랑주 — *한 형식의 4 가지 시점*.**

| 표현 | 무대 | 변수 |
|---|---|---|
| 외적 $\omega = dq \wedge dp$ | 미분형식의 대수 | (점 의존) |
| 사교적 $\omega(X, Y)$ | 한 점의 접벡터 | $(X, Y)$ |
| 포아송 $\{f, g\}$ | 함수의 결합 | $(f, g)$ |
| 라그랑주 $[u, v]$ | 좌표의 자코비안 | $(u, v)$ |

모두 *심플렉틱 형식 $\omega$ 의 *다른 시점* 의 표현*.

**(2) "사교" 의 어원.** *斜交* (japanese sakkō, "비스듬한 교차") — *직교가 아닌* 페어링. *외적이 직교 페어링 (gauge) 이라면 사교적이 *심플렉틱 페어링** 의 일본어 학술 용어. 한국어 *사교적* 도 같은 음역.

**(3) 사교적 vs 내적의 *대조*.**

| 페어링 | 대칭성 | 비퇴화 | 무대 |
|---|---|---|---|
| 내적 (리만 계량) | 대칭 | 양의 정부호 | 길이·각도 |
| 사교적 (심플렉틱) | *반대칭* | 비퇴화 | *부피의 부호* |

*같은 비퇴화 페어링* 이지만 *대칭성이 정반대*. 두 *기본* 기하학.

**(4) §1.6.7 의 미분형식 적분 회수.** 사교적은 *점-별* 평가 — *적분* 하면 *적분 불변식* (§5.5.1). 두 시점이 *국소 vs 전역*.

**(5) 양자역학에서의 *교환자*.** $[\hat f, \hat g] = i\hbar \widehat{\{f, g\}}$ — 사교적의 양자판. *비가환의 정량적 측정*. 그래서 양자 측정 *해상도 한계* (불확정성) 가 *사교적 의 양자 형식*.

## 파이썬으로 확인 — 사교적 = 포아송 괄호 검증

이 코드의 메시지는 단순하다: 1자유도에서 두 함수의 *해밀턴 벡터장* 을 만들고, 그 사교적이 *포아송 괄호와 같은 값* 임을 직접 검증.

```python
# 1자유도에서 두 함수 f(q, p), g(q, p) 의 X_f, X_g 사교적 계산
# 그게 포아송 {f, g} 와 같은 값
import sympy as sp

q, p = sp.symbols('q p', real=True)

# 두 함수: f = q² + p², g = q p
f = q**2 + p**2
g = q * p

# 해밀턴 벡터장: X_f = (∂f/∂p, -∂f/∂q)
X_f = (sp.diff(f, p), -sp.diff(f, q))
X_g = (sp.diff(g, p), -sp.diff(g, q))

print(f"f = {f}")
print(f"X_f = (∂f/∂p, -∂f/∂q) = {X_f}")
print(f"\ng = {g}")
print(f"X_g = (∂g/∂p, -∂g/∂q) = {X_g}")

# 사교적: ω(X_f, X_g) = X_f^q · X_g^p - X_f^p · X_g^q
# (1자유도: q-성분과 p-성분만)
omega_value = X_f[0] * X_g[1] - X_f[1] * X_g[0]
omega_value = sp.simplify(omega_value)

# 포아송 괄호: {f, g} = ∂f/∂q ∂g/∂p - ∂f/∂p ∂g/∂q
poisson_fg = sp.diff(f, q) * sp.diff(g, p) - sp.diff(f, p) * sp.diff(g, q)
poisson_fg = sp.simplify(poisson_fg)

print(f"\n사교적 ω(X_f, X_g) = {omega_value}")
print(f"포아송 {{f, g}}      = {poisson_fg}")
print(f"두 값이 같은가? {omega_value == poisson_fg}")

# 비대칭 검증
omega_value_swap = X_g[0] * X_f[1] - X_g[1] * X_f[0]
print(f"\nω(X_g, X_f) = {sp.simplify(omega_value_swap)}")
print(f"ω(X_f, X_g) + ω(X_g, X_f) = {sp.simplify(omega_value + omega_value_swap)}  (= 0 기대)")
print(f"→ 사교적은 *반대칭* (심플렉틱 형식의 기본 성질)")
```

이 결과는 *사교적 = 포아송 괄호* 라는 핵심 등식을 sympy 로 확인. *심플렉틱 형식의 다양한 표현이 모두 같은 객체* 임을 보여 준다.

## 다음 절(5.5.4)로 가는 다리

본 책의 *마지막 한 절* — §5.5.4 의 *리우빌의 정리 재논의*. §4.4.4 의 정리를 *작용-각 변수 시점* 에서 다시 본다. 본권 전체의 *마지막 종합* — 적분 가능 시스템의 위상공간 부피가 *작용 변수의 곱* 으로 깔끔히 떨어진다.
