---
title: '1.5.5 — 텐서의 교대화와 외적: $\wedge$ 의 정의'
description: '교대화 Alt 와 텐서곱 $\otimes$ 를 조합해 *외적* $\wedge$ 를 정의한다. $dx^i \wedge dx^j = -dx^j \wedge dx^i$, $dx^i \wedge dx^i = 0$ 같은 핵심 등식이 모두 정의에서 따라 나온다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 29
lang: ko
pairSlug: am1tc-1-5-5-alternation-and-wedge
draft: false
updated: 2026-05-17
---

# 1.5.5 — 텐서의 교대화와 외적: $\wedge$ 의 정의

> 교대화 Alt 와 텐서곱 $\otimes$ 를 조합해 *외적* $\wedge$ 를 정의한다. $dx^i \wedge dx^j = -dx^j \wedge dx^i$, $dx^i \wedge dx^i = 0$ 같은 핵심 등식이 모두 정의에서 따라 나온다.

## 본문이 말하는 것

$\alpha \in \Lambda^p V^*$, $\beta \in \Lambda^q V^*$ 의 **외적** (wedge product, exterior product) 은

$$
\alpha \wedge \beta := \frac{(p + q)!}{p!\, q!}\, \text{Alt}(\alpha \otimes \beta) \in \Lambda^{p+q} V^*
$$

여기서 Alt 는 1.5.4 의 교대화 작용소. 정의에 등장한 계수 $(p+q)!/(p! q!)$ 는 *표준 규약* (다른 책은 다른 계수를 쓰기도 — 본 책은 이 규약).

**기본 등식.**

$$
\alpha \wedge \beta = (-1)^{pq}\, \beta \wedge \alpha
$$

(*반가환* — $p$, $q$ 의 *곱* 의 부호.) 특히 $\alpha \in \Lambda^1$ 라면 $\alpha \wedge \alpha = 0$.

**결합 법칙.**

$$
(\alpha \wedge \beta) \wedge \gamma = \alpha \wedge (\beta \wedge \gamma)
$$

**좌표 표현.** $V^*$ 의 기저 $\{dx^1, \dots, dx^n\}$ 에서

$$
dx^i \wedge dx^j (\partial_k, \partial_l) = \delta^i_k \delta^j_l - \delta^i_l \delta^j_k
$$

(2 × 2 행렬식). 마찬가지로 $dx^{i_1} \wedge \cdots \wedge dx^{i_p}$ 가 $p \times p$ 행렬식 형식으로 작용. 임의 $p$-형식

$$
\omega = \sum_{i_1 < \cdots < i_p} \omega_{i_1 \dots i_p}\, dx^{i_1} \wedge \cdots \wedge dx^{i_p}
$$

— *사전 순서* 인덱스로 인해 *중복 없는* 표현.

## 한 번 더, 천천히

**(1) $dx^i \wedge dx^j$ 의 *행렬식* 성격.** 정의 $dx^i \wedge dx^j (\mathbf{u}, \mathbf{v}) = u^i v^j - u^j v^i = \det \begin{pmatrix} u^i & u^j \\ v^i & v^j \end{pmatrix}$. 두 벡터의 *$i$-$j$ 평면에의 사영* 의 부호 있는 면적. 외적이 *부호 있는 부피의 일반화* 라는 정체가 여기서 명확.

**(2) $\wedge$ 의 반가환성에서 $\alpha \wedge \alpha = 0$ 이 따라 나옴.** $\alpha \in \Lambda^p$ 가 *홀수* 차수면 $\alpha \wedge \alpha = -\alpha \wedge \alpha$ → $\alpha \wedge \alpha = 0$. *짝수* 차수면 $\alpha \wedge \alpha$ 가 0 일 수도 아닐 수도 있다 (예: $\mathbb R^4$ 의 $\omega = dx^1 \wedge dx^2 + dx^3 \wedge dx^4$ 는 $\omega \wedge \omega = 2 dx^1 \wedge dx^2 \wedge dx^3 \wedge dx^4 \neq 0$).

**(3) Vector calculus 와의 연결.** $\mathbb R^3$ 에서 두 1-형식의 외적이 *벡터 외적* 과 대응. $\alpha = a_1 dx + a_2 dy + a_3 dz$, $\beta = b_1 dx + b_2 dy + b_3 dz$ 에 대해

$$
\alpha \wedge \beta = (a_2 b_3 - a_3 b_2)\, dy \wedge dz + (a_3 b_1 - a_1 b_3)\, dz \wedge dx + (a_1 b_2 - a_2 b_1)\, dx \wedge dy
$$

— 정확히 $\mathbf{a} \times \mathbf{b}$ 의 성분. 외적이 *3차원 한정* 인 이유는 $\Lambda^2 \mathbb R^{3*} \cong \mathbb R^3$ 이라는 *우연*. 4차원 이상에서는 외적 대신 *2-형식* 자체를 사용해야 한다.

**(4) 외대수의 계산.** $p$-형식 + $q$-형식 = $(p, q)$ 정보. 외적의 결과는 $(p+q)$-형식. $n$-차원 공간에서 $\Lambda^* V^* = \bigoplus_p \Lambda^p V^*$ 가 *외대수* (exterior algebra) — 총 차원 $2^n$. $\mathbb R^4$ 라면 $1 + 4 + 6 + 4 + 1 = 16 = 2^4$.

## 파이썬으로 확인 — $\mathbb R^4$ 위 외적 계산

이 코드의 메시지는 단순하다: $\mathbb R^4$ 의 두 1-형식 $\alpha, \beta$ 의 외적 $\alpha \wedge \beta$ 가 2-형식 (6차원, $\binom{4}{2} = 6$) 임을 *행렬식 형식* 으로 직접 계산. 그 위에 $(\alpha \wedge \beta)(\mathbf{u}, \mathbf{v}) = -(\alpha \wedge \beta)(\mathbf{v}, \mathbf{u})$ 와 $\alpha \wedge \alpha = 0$ 을 수치로 본다.

```python
# R^4 위 1-형식 α, β. α ∧ β 의 6 성분 (i<j) 을 계산.
import numpy as np

# α = (1, 2, -1, 0.5) → α(v) = 1*v1 + 2*v2 - 1*v3 + 0.5*v4
alpha = np.array([1.0, 2.0, -1.0, 0.5])
beta = np.array([0.5, -1.0, 2.0, 1.0])

# α ∧ β 의 성분: (α ∧ β)_ij = α_i β_j - α_j β_i for i < j
# 6 인덱스 쌍: (1,2), (1,3), (1,4), (2,3), (2,4), (3,4)
pairs = [(0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3)]
labels = ['dx1∧dx2', 'dx1∧dx3', 'dx1∧dx4', 'dx2∧dx3', 'dx2∧dx4', 'dx3∧dx4']
ab_components = []
for (i, j), name in zip(pairs, labels):
    c = alpha[i] * beta[j] - alpha[j] * beta[i]
    ab_components.append(c)
    print(f"(α ∧ β)_{name} = {c:.4f}")

# α ∧ α = 0 검증 (자기 자신과의 외적)
aa = [alpha[i] * alpha[j] - alpha[j] * alpha[i] for (i, j) in pairs]
print(f"\nα ∧ α 의 모든 성분: {aa}  (= 0 기대)")

# (α ∧ β)(u, v) 와 (α ∧ β)(v, u) 의 부호 검증
u = np.array([1.0, 0.5, -0.5, 1.0])
v = np.array([-0.5, 1.0, 1.0, 0.0])

def wedge_eval(alpha, beta, u, v):
    return (alpha @ u) * (beta @ v) - (alpha @ v) * (beta @ u)

ab_uv = wedge_eval(alpha, beta, u, v)
ab_vu = wedge_eval(alpha, beta, v, u)
print(f"\n(α∧β)(u, v) = {ab_uv:.4f}")
print(f"(α∧β)(v, u) = {ab_vu:.4f}  (= -(α∧β)(u, v) 기대)")
print(f"합 = {ab_uv + ab_vu:.2e}  (= 0 기대)")
```

이 결과는 외적의 *반대칭성* 과 *행렬식 형식* 을 명시적으로 확인한다. 1.6 의 미분형식이 이 같은 *대수* 위에서 *점마다* 정의된다는 그림이 자연스럽다.

## 다음 절(1.6.1)로 가는 다리

§1.5 까지의 텐서·외적 어휘는 *벡터공간 한 점* 의 대수 — 점-별. 다음 §1.6 은 그 대수를 *다양체 전체 위에 부드럽게* 깐다 — 코탄젠트 공간·1-형식·$p$-형식 그리고 그 위의 외미분. 여기서 푸앵카레 보조정리·스토크스 정리가 핵심 결과로 등장.
