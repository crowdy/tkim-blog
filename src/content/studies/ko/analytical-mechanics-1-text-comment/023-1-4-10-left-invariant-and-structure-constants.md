---
title: '1.4.10 — 리 군과 리 대수: 좌불변 벡터장·구조 상수'
description: '좌불변 벡터장과 $\mathfrak g$ 의 동형. 그 위의 교환자가 *구조 상수* $c^k_{ij}$ 를 정의하고, $c$ 는 *야코비 항등식* 을 만족한다 — 리 대수의 정의 공리 완성.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 23
lang: ko
pairSlug: am1tc-1-4-10-left-invariant-and-structure-constants
draft: false
updated: 2026-05-17
---

# 1.4.10 — 리 군과 리 대수: 좌불변 벡터장·구조 상수

> 좌불변 벡터장과 $\mathfrak g$ 의 동형. 그 위의 교환자가 *구조 상수* $c^k_{ij}$ 를 정의하고, $c$ 는 *야코비 항등식* 을 만족한다 — 리 대수의 정의 공리 완성.

## 본문이 말하는 것

리 군 $G$ 위의 벡터장 $X \in \mathfrak X(G)$ 가 **좌불변** (left-invariant) 이라는 것은

$$
(L_g)_*\, X_h = X_{gh} \quad \forall g, h \in G
$$

좌평행이동이 벡터장을 자기 자신으로 옮긴다. 좌불변 벡터장의 집합을 $\mathfrak X^L(G)$.

**동형 정리.** 사상 $\mathfrak g = T_e G \to \mathfrak X^L(G)$, $\xi \mapsto X_\xi$ 로 $X_\xi(g) := (L_g)_* \xi$. 이 사상이 벡터공간 동형. 즉 *좌불변 벡터장 ↔ $\mathfrak g$ 의 한 점*.

**리 괄호의 정의.** 두 좌불변 벡터장 $X_\xi$, $X_\eta$ 의 *교환자* (1.4.8) 도 좌불변. 그래서 다음이 잘 정의된다:

$$
[\xi, \eta]_{\mathfrak g} := [X_\xi, X_\eta]_e \in \mathfrak g
$$

이게 $\mathfrak g$ 위의 *리 괄호*. $\mathfrak g$ 의 기저 $\{e_1, \dots, e_n\}$ ($n = \dim G$) 에 대해

$$
[e_i, e_j] = c^k_{ij}\, e_k
$$

여기서 $c^k_{ij}$ 가 **구조 상수** (structure constants). 군의 비가환성을 완전히 인코딩하는 $n^3$ 개 수.

**야코비 항등식.** $\mathfrak g$ 의 리 괄호가 만족하는 항등식:

$$
[\xi, [\eta, \zeta]] + [\eta, [\zeta, \xi]] + [\zeta, [\xi, \eta]] = 0
$$

구조 상수로 적으면 $c^m_{i\ell} c^\ell_{jk} + (\text{cyclic in } i, j, k) = 0$. (1.4.8 의 야코비 항등식이 좌불변 벡터장에 적용된 결과.)

리 대수 $\mathfrak g$ 의 정식 정의 = 벡터공간 + 반대칭 쌍선형 괄호 $[\cdot, \cdot]$ + 야코비 항등식. 이 모든 구조가 *리 군의 단위원 근방* 에서 자연스럽게 떨어진다.

## 한 번 더, 천천히

**(1) $\mathfrak{so}(3)$ 의 구조 상수.** $SO(3)$ 의 리 대수는 3×3 반대칭 행렬 — 3차원. 기저 $L_1, L_2, L_3$ ($L_i$ 는 $i$-축 회전 발생자) 의 교환자

$$
[L_i, L_j] = \varepsilon_{ijk} L_k
$$

— 구조 상수가 *레비-치비타 기호* $\varepsilon_{ijk}$. 이게 *각운동량 대수* — 양자역학·역학에서 모두 등장하는 가장 유명한 리 대수.

**(2) 좌불변과 좌평행이동의 *기하학적* 의미.** 단위원에서의 벡터 $\xi$ 가 좌평행이동으로 *모든 점에 동일한 모양의 벡터* 를 만든다. 이 모양이 *군의 자기 대칭성* — 어떤 점에서든 *같은 방향* 이 의미 있다는 것.

**(3) 리 대수의 *분류*.** 야코비 항등식을 만족하는 $\mathfrak g$ 들은 1873년 Killing 의 작업 이후 *완전히 분류* 됐다 — Cartan 의 분류 정리. 단순 리 대수는 4 개 무한족 ($A_n, B_n, C_n, D_n$) + 5 개 예외형 ($E_6, E_7, E_8, F_4, G_2$). 물리에서는 주로 $\mathfrak{su}(n)$ (표준 모형 게이지 군) 과 $\mathfrak{so}(n)$ 등이 등장.

## 파이썬으로 확인 — $\mathfrak{so}(3)$ 의 구조 상수와 야코비 항등식

이 코드의 메시지는 단순하다: $\mathfrak{so}(3)$ 의 표준 기저 $L_1, L_2, L_3$ 의 교환자를 *행렬 곱* 으로 직접 계산해, 구조 상수가 $\varepsilon_{ijk}$ 임을 확인. 그리고 야코비 항등식이 정확히 0 임을 본다.

```python
# so(3) 기저: L_i = (i-축 회전 생성자), 즉 3×3 반대칭 행렬
import numpy as np

L1 = np.array([[ 0,  0,  0],
               [ 0,  0, -1],
               [ 0,  1,  0]], dtype=float)
L2 = np.array([[ 0,  0,  1],
               [ 0,  0,  0],
               [-1,  0,  0]], dtype=float)
L3 = np.array([[ 0, -1,  0],
               [ 1,  0,  0],
               [ 0,  0,  0]], dtype=float)
L = [L1, L2, L3]

# 구조 상수: [L_i, L_j] = c^k_ij L_k
print("교환자 표:")
for i in range(3):
    for j in range(3):
        bracket = L[i] @ L[j] - L[j] @ L[i]
        # bracket = c^k_ij L_k 의 계수 c^k_ij 를 추출
        coeffs = []
        for k in range(3):
            # L_k 의 가장 특징적 성분으로 c 추출
            # 예: L_1 의 (2, 1) 성분이 1 — bracket 의 (2, 1) 성분이 c^1_ij
            if k == 0:
                coeffs.append(bracket[2, 1])
            elif k == 1:
                coeffs.append(bracket[0, 2])
            else:
                coeffs.append(bracket[1, 0])
        print(f"[L_{i+1}, L_{j+1}] = ({coeffs[0]:+.0f}) L_1 + ({coeffs[1]:+.0f}) L_2 + ({coeffs[2]:+.0f}) L_3")

# 야코비 항등식: [L_1, [L_2, L_3]] + (cyclic) = 0?
def jac(A, B, C):
    return A @ (B @ C - C @ B) - (B @ C - C @ B) @ A
jac_sum = jac(L1, L2, L3) + jac(L2, L3, L1) + jac(L3, L1, L2)
print(f"\n야코비 항등식 잔차의 max abs: {np.max(np.abs(jac_sum)):.2e}")  # ~0
```

이 결과는 (a) $\mathfrak{so}(3)$ 의 구조 상수가 정확히 $\varepsilon_{ijk}$ 임 — $[L_i, L_j] = \varepsilon_{ijk} L_k$, (b) 야코비 항등식이 *정확히* 0 임을 확인한다. *각운동량 대수의 모든 것* 이 이 두 사실에 담겨 있다.

## 다음 절(1.4.11)로 가는 다리

리 대수의 한 점 $\xi \in \mathfrak g$ 가 단위원 근방의 1-매개변수 부분군 $\exp(t\xi) \in G$ 를 만든다. 1.4.6 의 1-매개변수 변환군이 *벡터장* 으로부터 만들어진 것과 같은 구조 — 그러나 무대가 *군 자체*. 다음 1.4.11 은 그 지수사상과 1-매개변수 부분군을 박는다.
