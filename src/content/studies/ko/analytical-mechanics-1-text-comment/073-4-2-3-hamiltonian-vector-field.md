---
title: '4.2.3 — 해밀토니언 벡터장: 위상공간 위의 *대칭적* 흐름'
description: "$X_H$ 의 흐름이 심플렉틱 형식을 보존. 두 해밀턴 벡터장의 Lie 괄호 $[X_f, X_g] = -X_{\\{f, g\\}}$ 가 Poisson 괄호 $\\{f, g\\} = \\omega(X_f, X_g)$ 와 짝짓는다. 위상공간 위 흐름의 *대수 구조*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 73
lang: ko
pairSlug: am1tc-4-2-3-hamiltonian-vector-field
draft: false
updated: 2026-05-18
---

# 4.2.3 — 해밀토니언 벡터장: 위상공간 위의 *대칭적* 흐름

> $X_H$ 의 흐름이 심플렉틱 형식을 보존. 두 해밀턴 벡터장의 Lie 괄호 $[X_f, X_g] = -X_{\{f, g\}}$ 가 Poisson 괄호 $\{f, g\} = \omega(X_f, X_g)$ 와 짝짓는다. 위상공간 위 흐름의 *대수 구조*.

## 본문이 말하는 것

§4.2.2 의 해밀턴 벡터장 $X_H$ 가 위상공간에서 가지는 *기본 성질*:

**(1) 심플렉틱 형식 보존.** $X_H$ 의 흐름 $\phi_t^H$ 가 $\omega$ 를 보존:

$$
\phi_t^{H*}\, \omega = \omega \quad \text{또는 동치적으로} \quad \mathcal L_{X_H}\, \omega = 0
$$

증명: $\mathcal L_{X_H} \omega = d(\iota_{X_H} \omega) + \iota_{X_H} (d\omega) = d(dH) + 0 = 0$ (Cartan 공식, $d\omega = 0$, $d^2 = 0$).

**(2) 해밀토니언 보존 (에너지 보존).** $X_H[H] = \iota_{X_H} (dH) = \iota_{X_H} (\iota_{X_H} \omega) = \omega(X_H, X_H) = 0$ ($\omega$ 의 반대칭성). 즉 $H$ 가 $X_H$ 의 흐름을 따라 *상수*.

**(3) 일반 함수의 시간 변화.** 임의의 함수 $f : P \to \mathbb R$ 의 운동을 따라가는 시간 미분:

$$
\dot f = X_H[f] = \omega(X_H, X_f) = \{f, H\}
$$

여기서 **포아송 괄호** (Poisson bracket) 의 정의

$$
\{f, g\} := \omega(X_f, X_g) = -X_g[f] = X_f[g]
$$

(부호는 본 책의 규약). $\{f, g\}$ 가 *두 함수 사이의 자연스러운 결합 연산*.

**(4) Lie 괄호와의 관계.** 두 해밀턴 벡터장의 Lie 괄호 (§1.4.8 회수):

$$
[X_f, X_g] = -X_{\{f, g\}}
$$

즉 *해밀턴 벡터장의 집합이 Lie 대수* — 포아송 괄호가 그 대수 구조. 양자역학의 *교환자 대수* $[\hat f, \hat g] = i\hbar \widehat{\{f, g\}}$ 의 고전 한계.

## 한 번 더, 천천히

**(1) 포아송 괄호의 *대수적* 성질.**

- 반대칭: $\{f, g\} = -\{g, f\}$.
- 양선형: $\{af + b\tilde f, g\} = a\{f, g\} + b\{\tilde f, g\}$.
- Leibniz: $\{fg, h\} = f\{g, h\} + g\{f, h\}$.
- Jacobi: $\{f, \{g, h\}\} + \{g, \{h, f\}\} + \{h, \{f, g\}\} = 0$.

마지막 야코비 항등식이 *심플렉틱 형식이 닫혀 있음* ($d\omega = 0$) 의 결과 — *닫혀 있음이 야코비를 강제*.

**(2) 좌표 표현.** Darboux 좌표에서

$$
\{f, g\} = \frac{\partial f}{\partial q^\alpha} \frac{\partial g}{\partial p_\alpha} - \frac{\partial f}{\partial p_\alpha} \frac{\partial g}{\partial q^\alpha}
$$

가장 익숙한 형식. $\{q^\alpha, p_\beta\} = \delta^\alpha_\beta$, $\{q^\alpha, q^\beta\} = 0$, $\{p_\alpha, p_\beta\} = 0$ — *정준 교환 관계*.

**(3) 노에터 정리의 *해밀턴 형식*.** $f$ 가 *제1적분* ($\{f, H\} = 0$) 이면 $X_f$ 의 흐름이 *대칭 변환* — 그 흐름이 $H$ 를 보존. 즉 *제1적분 ↔ 대칭* 의 일대일 대응이 *심플렉틱 자동*. §2.2.3 의 노에터 정리가 *심플렉틱 형식의 자명한 결과* 가 된다.

**(4) 양자역학의 *씨앗*.** Dirac 의 *고전 → 양자 대응*: $\{f, g\}_{\text{classical}} \leftrightarrow \frac{1}{i\hbar} [\hat f, \hat g]_{\text{quantum}}$. 포아송 괄호가 그대로 *교환자 대수* 로 옮겨진다. 양자 해밀턴 식 $i\hbar \dot{\hat f} = [\hat f, \hat H]$ 의 *고전 한계* 가 본 절의 $\dot f = \{f, H\}$.

**(5) §5.1 의 정준 변환 의 자연스러움.** 두 좌표계 $(q, p)$ 와 $(Q, P)$ 가 *심플렉틱 동형* — 즉 $\omega_{(q,p)} = \omega_{(Q,P)}$ 라면, *정준 변환*. 본 절의 *심플렉틱 보존* 이 §5 의 정준 변환의 정의로 직접 옮겨진다.

## 파이썬으로 확인 — 단진자 해밀턴 벡터장의 시각화

이 코드의 메시지는 단순하다: 단진자의 해밀턴 벡터장 $X_H = (\partial H/\partial p, -\partial H/\partial q)$ 를 위상공간 위에서 *벡터장으로* 그려 본다. 적분곡선은 *에너지 등고선* 을 따른다.

```python
# 단진자: H = p²/(2 m ℓ²) - m g ℓ cos θ
# X_H = (∂H/∂p, -∂H/∂q) = (p/(m ℓ²), -m g ℓ sin θ)
import numpy as np

m, ell, g = 1.0, 1.0, 9.81

# 위상공간 격자
theta = np.linspace(-np.pi, np.pi, 21)
p = np.linspace(-5, 5, 21)
Theta, P = np.meshgrid(theta, p)

# 해밀턴 벡터장 성분
dtheta = P / (m * ell**2)
dp = -m * g * ell * np.sin(Theta)

# 벡터장의 *발산* 이 0 임을 확인 (심플렉틱 보존)
# div X_H = ∂/∂q (∂H/∂p) + ∂/∂p (-∂H/∂q) = 0 (자동)
# 수치적으로 격자 위에서 검증
dtheta_dq = np.gradient(dtheta, theta, axis=1)
dp_dp = np.gradient(dp, p, axis=0)
divergence = dtheta_dq + dp_dp

print(f"해밀턴 벡터장의 발산 (수치):")
print(f"  max |div X_H| = {np.max(np.abs(divergence)):.2e}")
print(f"  (해석적으로 0 — 심플렉틱 형식 보존의 결과)")

# 에너지 등고선과 해밀턴 벡터장의 *직교성 vs 평행성*
# X_H 가 H 의 등고선 *을 따라* 흐름 — X_H · ∇H = 0
H_values = P**2 / (2 * m * ell**2) - m * g * ell * np.cos(Theta)
# ∇H 와 X_H 의 내적이 0?
grad_H_q = np.gradient(H_values, theta, axis=1)
grad_H_p = np.gradient(H_values, p, axis=0)
dot_product = dtheta * grad_H_q + dp * grad_H_p
print(f"\n∇H · X_H 의 max |값| = {np.max(np.abs(dot_product)):.2e}")
print("→ X_H 가 H 의 등고선을 *따라* 흐름 (에너지 보존)")
```

이 결과는 (a) 해밀턴 벡터장의 *발산 = 0* (심플렉틱 보존), (b) 벡터장이 *에너지 등고선을 따라* 흐름 (에너지 보존) — 두 *기하학적* 성질이 *자동 수치 확인* 됨을 보인다.

## 다음 절(4.3.1)로 가는 다리

§4.2 에서 해밀턴 역학을 *위상공간 + 심플렉틱 형식 + 해밀턴 벡터장* 으로 기하학적으로 재구성. 다음 §4.3 은 더 *일반적인* 동력학 시스템 — *해밀턴 형식이 아닌* 시스템 (산일 시스템, 발진기, 카오스 등) 까지 포함한 *동력학 시스템 이론* 으로 시야 확장. 평형해·안정성·분기·푸앵카레 사상이 차례로 등장한다.
