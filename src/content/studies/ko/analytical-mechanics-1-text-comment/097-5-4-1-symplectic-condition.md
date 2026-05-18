---
title: '5.4.1 — 심플렉틱 조건: 자코비안의 *대수적* 정준 조건'
description: "변환 $(q, p) \\to (Q, P)$ 의 자코비안 $J$ 가 $J^T \\Omega J = \\Omega$ 를 만족하면 정준 변환. *국소적* 으로 검증 가능한 *대수적* 조건. 동치적으로 포아송 괄호 $\\{Q^i, P_j\\} = \\delta^i_j$."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 97
lang: ko
pairSlug: am1tc-5-4-1-symplectic-condition
draft: false
updated: 2026-05-18
---

# 5.4.1 — 심플렉틱 조건: 자코비안의 *대수적* 정준 조건

> 변환 $(q, p) \to (Q, P)$ 의 자코비안 $J$ 가 $J^T \Omega J = \Omega$ 를 만족하면 정준 변환. *국소적* 으로 검증 가능한 *대수적* 조건. 동치적으로 포아송 괄호 $\{Q^i, P_j\} = \delta^i_j$.

## 본문이 말하는 것

위상공간 $T^*M$ ($\dim = 2n$) 의 변환 $\Phi : (q, p) \mapsto (Q, P) = \Phi(q, p)$ 의 *자코비안 행렬*

$$
J = \frac{\partial(Q, P)}{\partial(q, p)} \in \mathbb R^{2n \times 2n}
$$

**심플렉틱 조건** (symplectic condition): $\Phi$ 가 정준 변환 ↔

$$
\boxed{\quad J^T \Omega J = \Omega \quad}
$$

여기서

$$
\Omega = \begin{pmatrix} 0 & I_n \\ -I_n & 0 \end{pmatrix}
$$

— 심플렉틱 형식의 행렬 표현. 행렬 $J$ 가 *심플렉틱 행렬* — $J \in Sp(2n, \mathbb R)$ (심플렉틱 군).

**동치 조건들.**

- $J^T \Omega J = \Omega$ ↔ $J^{-1} = -\Omega J^T \Omega$ (심플렉틱 역행렬 공식).
- $\det J = \pm 1$ (사실 항상 $+1$ — 심플렉틱 군은 연결).
- *포아송 괄호*: $\{Q^i, Q^j\} = 0$, $\{P_i, P_j\} = 0$, $\{Q^i, P_j\} = \delta^i_j$.
- *심플렉틱 2-형식 보존*: $\Phi^* \omega = \omega$, 즉 $\sum_i dQ^i \wedge dP_i = \sum_i dq^i \wedge dp_i$.

## 한 번 더, 천천히

**(1) 심플렉틱 군 $Sp(2n, \mathbb R)$.** 정준 변환의 자코비안들이 *군* 을 이룬다 — 합성·역연산이 모두 정준성을 보존. 차원은 $n(2n+1)$. 직교군 $O(n)$ ($n(n-1)/2$ 차원) 보다 *훨씬 크다* — *위상공간 변환의 자유도* 가 *공간 회전 보다* 풍부.

**(2) 1자유도 ($n=1$) 의 경우.** $2 \times 2$ 자코비안. 심플렉틱 조건이 $\det J = 1$ 로 환원 ($\Omega = J$ 의 한 형식). 즉 *1자유도에서 정준 변환 = 면적 보존 변환* ($SL(2, \mathbb R)$).

**(3) 포아송 괄호의 정준 표준.** 정준 변환 후의 새 변수 $(Q, P)$ 가 *원래 포아송 괄호와 같은 정준 관계* 를 만족 — *위상공간의 기본 대수 구조 보존*. 양자역학의 *교환 관계* $[\hat Q, \hat P] = i\hbar$ 가 정확히 이 *고전 정준 관계의 양자판*.

**(4) 무한 차원으로의 *연결*.** 양자장 이론의 *Bogoliubov 변환*, 끈 이론의 *모듈러스 공간* 위의 변환 — 모두 *무한 차원 심플렉틱 변환*. 본 절의 *유한 차원 심플렉틱 조건* 의 자연 일반화.

**(5) §4.2.1 의 Darboux 정리와의 *대응*.** Darboux 정리: *모든 심플렉틱 다양체* 의 모든 점은 *근방에서* $T^*\mathbb R^n$ 과 *심플렉틱 동형*. 본 절의 심플렉틱 조건 = *Darboux 좌표 사이의 변환* 이 *심플렉틱 군에 속한다*.

## 파이썬으로 확인 — 다양한 변환의 심플렉틱 조건 검증

이 코드의 메시지는 단순하다: 여러 표본 변환 (회전·스케일·전단·작용-각 변수) 의 자코비안 행렬을 계산하고, $J^T \Omega J = \Omega$ 를 직접 검증. 정준 변환과 비정준 변환을 구별.

```python
# 다양한 변환의 심플렉틱 조건 검증
import numpy as np

# 심플렉틱 형식의 행렬 (1자유도)
Omega = np.array([[0.0, 1.0],
                  [-1.0, 0.0]])

def is_symplectic(J, tol=1e-10):
    """자코비안 J 가 심플렉틱인가? (1자유도)"""
    diff = J.T @ Omega @ J - Omega
    return np.max(np.abs(diff)) < tol

# 1. 회전 변환: Q = q cos α + p sin α, P = -q sin α + p cos α
alpha = np.pi / 4
J_rotate = np.array([[np.cos(alpha), np.sin(alpha)],
                     [-np.sin(alpha), np.cos(alpha)]])
print(f"1. 회전 변환 (α=π/4): 심플렉틱? {is_symplectic(J_rotate)}")

# 2. 스케일 변환 Q = aq, P = ap (a=2)
a = 2.0
J_scale = np.array([[a, 0],
                    [0, a]])
print(f"2. 스케일 Q=aq, P=ap (a=2): 심플렉틱? {is_symplectic(J_scale)}")
print(f"   J^T Ω J - Ω 의 norm: {np.linalg.norm(J_scale.T @ Omega @ J_scale - Omega):.4f}")

# 3. 반대 스케일 Q = aq, P = p/a
J_scale_inv = np.array([[a, 0],
                         [0, 1/a]])
print(f"3. 반대 스케일 Q=aq, P=p/a: 심플렉틱? {is_symplectic(J_scale_inv)}")

# 4. 전단 변환 Q = q + bp, P = p (b 임의)
b = 0.5
J_shear = np.array([[1, b],
                    [0, 1]])
print(f"4. 전단 Q=q+bp, P=p (b=0.5): 심플렉틱? {is_symplectic(J_shear)}")

# 5. 비정준 변환 Q = q+p, P = q
J_bad = np.array([[1, 1],
                  [1, 0]])
print(f"5. Q=q+p, P=q: 심플렉틱? {is_symplectic(J_bad)}")
print(f"   J^T Ω J - Ω 의 norm: {np.linalg.norm(J_bad.T @ Omega @ J_bad - Omega):.4f}")

# det J 확인
print(f"\n각 자코비안의 det:")
print(f"  회전:        {np.linalg.det(J_rotate):.4f}  (= 1)")
print(f"  스케일:      {np.linalg.det(J_scale):.4f}  (= a² ≠ 1)")
print(f"  반대 스케일: {np.linalg.det(J_scale_inv):.4f}  (= 1)")
print(f"  전단:        {np.linalg.det(J_shear):.4f}  (= 1)")
print(f"  Q=q+p, P=q:  {np.linalg.det(J_bad):.4f}  (= -1)")
print(f"\n→ 심플렉틱 변환은 *항상 det = 1*. det = -1 은 *비정준* (시간 반전 같은 *반정준*).")
```

이 결과는 *심플렉틱 조건* 을 다양한 표본에서 *수치 검증*. 직관적인 변환 (회전·반대 스케일·전단) 이 정준임을 확인.

## 다음 절(5.4.2)로 가는 다리

심플렉틱 조건은 *대수적* 정의. *생성 함수* (§5.3.2) 와 *심플렉틱 조건* 의 *동치성* — 즉 *모든 정준 변환이 어떤 $F$ 에서 나온다* — 가 §5.4.2 의 주제. 두 정의의 *일치* 가 정준 변환 이론의 핵심.
