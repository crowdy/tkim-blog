---
title: '4.4.1 — 정준 방정식의 선형화: 고유값이 *짝지어* 나오는 자동 구조'
description: "해밀턴 시스템의 평형점 선형화. 자코비안이 *심플렉틱* 이라 고유값이 항상 *$\\pm\\lambda$ 또는 $\\pm i\\omega$* 의 쌍. 일반 동력학 시스템에는 없는 특별한 제약."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 82
lang: ko
pairSlug: am1tc-4-4-1-canonical-linearization
draft: false
updated: 2026-05-18
---

# 4.4.1 — 정준 방정식의 선형화: 고유값이 *짝지어* 나오는 자동 구조

> 해밀턴 시스템의 평형점 선형화. 자코비안이 *심플렉틱* 이라 고유값이 항상 *$\pm\lambda$ 또는 $\pm i\omega$* 의 쌍. 일반 동력학 시스템에는 없는 특별한 제약.

## 본문이 말하는 것

해밀턴 시스템 $\dot x = X_H(x)$ ($x \in T^*M$) 의 평형점 $x^* = (q^*, p^*)$ 에서 선형화 $\dot \xi = A \xi$ 의 자코비안 $A$ 가 특별한 구조를 가진다.

**핵심 정리.** $A$ 가 *심플렉틱 (또는 Hamiltonian) 행렬*. 즉

$$
A^T J + J A = 0, \quad J = \begin{pmatrix} 0 & I_n \\ -I_n & 0 \end{pmatrix}
$$

여기서 $J$ 는 *심플렉틱 형식의 행렬 표현* ($2n \times 2n$). 위 등식의 의미: *$A$ 의 흐름 $e^{tA}$ 가 심플렉틱 형식을 보존*.

**고유값의 *짝짓기*.** Hamiltonian 행렬 $A$ 의 고유값 $\lambda$ 가 있다면 $-\lambda$, $\bar\lambda$, $-\bar\lambda$ 도 모두 고유값. 즉:

- *실수 고유값* $\lambda \in \mathbb R$: 짝 $-\lambda$ 와 함께. 안장점 방향.
- *순수 허수* $i\omega$: 짝 $-i\omega$ 와 함께. 중심 (안정).
- *복소 일반* $\alpha + i\beta$: 짝 $-\alpha + i\beta$, $-\alpha - i\beta$, $\alpha - i\beta$ — *4개의 quadruple*.

**결과: 점근 안정 평형점 없음.** $\text{Re}(\lambda) < 0$ 인 고유값이 있으면 *반드시* $-\lambda$ 도 고유값, $\text{Re}(-\lambda) > 0$. 그래서 *모든 고유값이 $\text{Re} < 0$* 이 불가능. 해밀턴 시스템의 평형점은 *Liapunov 안정 (중심)* 또는 *불안정* (안장 포함). *점근 안정 불가* — 체적 보존의 직접적 결과.

## 한 번 더, 천천히

**(1) 단진자의 *분류*.** 자코비안

- $(0, 0)$: $A = \begin{pmatrix} 0 & 1 \\ -\cos 0 & 0 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$. 고유값 $\pm i$. *중심*.
- $(\pi, 0)$: $A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$. 고유값 $\pm 1$. *안장점*.

두 경우 모두 고유값이 *반대 부호의 쌍* — 정확히 Hamiltonian 행렬의 짝짓기.

**(2) 일반 동력학 시스템과의 *극명한 차이*.** 비-해밀턴 시스템에서는 평형점 고유값에 *제약이 없다*. 안정 노드 ($\lambda_1, \lambda_2 < 0$), 안정 focus ($\text{Re} < 0$ 복소) 등 *점근 안정* 평형점이 자연스럽게 나타난다. 해밀턴에서는 *불가*.

**(3) §1.4.10 의 리 대수 회수.** Hamiltonian 행렬의 집합이 *리 대수* $\mathfrak{sp}(2n, \mathbb R)$ — *심플렉틱 군 $Sp(2n, \mathbb R)$* 의 리 대수. $A \in \mathfrak{sp}(2n, \mathbb R)$, $e^{tA} \in Sp(2n, \mathbb R)$. *심플렉틱 보존 흐름의 일반 성질*.

**(4) KAM 정리의 *씨앗*.** 해밀턴 시스템의 *중심* 평형점 — 고유값이 순수 허수. 비-해밀턴이라면 *비-하이퍼볼릭* 으로 분기에 *민감*. 해밀턴에서는 *심플렉틱 구조 덕분에* *비선형 안정성* 까지 *대부분 보존*. KAM 정리가 이 *대부분* 의 정밀한 진술.

**(5) 양자역학에서의 *대응*.** *조화 진동자* 의 양자화 — 평형점 근방의 선형화는 *양자 조화 진동자*. 고유값 $\pm i\omega$ 의 *$\omega$* 가 양자 에너지 레벨 간격 $\hbar\omega$ 의 *고전 한계*. 양자역학에서 *심플렉틱 구조가 정준 양자화* 로 직결.

## 파이썬으로 확인 — 단진자 자코비안의 *심플렉틱 검증*

이 코드의 메시지는 단순하다: 단진자 두 평형점의 자코비안 $A$ 가 *Hamiltonian 행렬 조건* $A^T J + J A = 0$ 을 만족함을 직접 확인. 고유값 짝짓기도 본다.

```python
# 단진자: H = p²/2 - cos θ
# X_H = (p, -sin θ). 평형점에서 선형화 A = (∂X_H/∂(θ, p))
import numpy as np

J = np.array([[0.0, 1.0],
              [-1.0, 0.0]])  # 심플렉틱 형식 (1자유도)

def jacobian_pendulum(theta_eq):
    """단진자 X_H 의 자코비안. cos θ 만 평형점에서 다름."""
    return np.array([[0.0, 1.0],
                     [-np.cos(theta_eq), 0.0]])

# (a) 안정 평형 (0, 0)
A = jacobian_pendulum(0.0)
sympl_check = A.T @ J + J @ A
print(f"(a) (θ=0):")
print(f"  자코비안 A =\n{A}")
print(f"  Hamiltonian 검증 A^T J + J A =\n{sympl_check}")
print(f"  (= 0 기대 — 단진자가 해밀턴이라)")
print(f"  고유값: {np.linalg.eigvals(A)}")
print(f"  → ±i (순수 허수 쌍 — 중심)")

# (b) 불안정 평형 (π, 0)
A = jacobian_pendulum(np.pi)
sympl_check = A.T @ J + J @ A
print(f"\n(b) (θ=π):")
print(f"  Hamiltonian 검증 A^T J + J A =\n{sympl_check}  (= 0)")
print(f"  고유값: {np.linalg.eigvals(A)}")
print(f"  → ±1 (실수 쌍 — 안장점)")

# 검증: 마찰 진자 (비-해밀턴) 의 자코비안은 Hamiltonian 조건을 *깨야 한다*
A_friction = np.array([[0.0, 1.0],
                       [-1.0, -0.3]])  # 마찰 추가
sympl_check_friction = A_friction.T @ J + J @ A_friction
print(f"\n(c) 마찰 진자 (비-해밀턴) 의 자코비안:")
print(f"  A^T J + J A =\n{sympl_check_friction}")
print(f"  (≠ 0 — 비-해밀턴이라 심플렉틱 보존 안 함)")
print(f"  고유값: {np.linalg.eigvals(A_friction)}")
print(f"  → 복소이며 실수부 음수 — 안정 focus (해밀턴 불가능한 분류)")
```

이 결과는 (a) 해밀턴 시스템의 자코비안이 *자동으로* Hamiltonian 행렬, (b) 고유값이 *반드시 쌍* 으로 나옴, (c) 비-해밀턴은 이 *심플렉틱 제약을 깬다* — 세 사실의 *수치 검증*.

## 다음 절(4.4.2)로 가는 다리

해밀턴 시스템의 평형점이 *심플렉틱 구조* 때문에 *제한된 분류* 만 가진다는 것이 분기 이론에도 영향을 준다. 그러나 *구조 안정성* — 작은 perturbation 에 대한 질적 행동의 보존 — 의 관점에서 *해밀턴 시스템은 일반적으로 구조 안정이 아니다*. §4.4.2 가 이 *특별한 약점* 을 짚는다.
