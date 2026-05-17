---
title: '1.3.2 — 곡면 위의 텐서: 두 변환 규칙의 결합'
description: '벡터의 반변 + 1-형식의 공변. 두 규칙을 자유롭게 결합하면 $(p, q)$-텐서가 나온다. 미터 $g_{ij}$ 는 $(0, 2)$-텐서, 크리스토펠 $\Gamma^k_{ij}$ 는 *텐서가 아니다* — 이 차이가 1.3.3 의 접속 정의를 부른다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 11
lang: ko
pairSlug: am1tc-1-3-2-tensor-on-surface
draft: false
updated: 2026-05-17
---

# 1.3.2 — 곡면 위의 텐서: 두 변환 규칙의 결합

> 벡터의 반변 + 1-형식의 공변. 두 규칙을 자유롭게 결합하면 $(p, q)$-텐서가 나온다. 미터 $g_{ij}$ 는 $(0, 2)$-텐서, 크리스토펠 $\Gamma^k_{ij}$ 는 *텐서가 아니다* — 이 차이가 1.3.3 의 접속 정의를 부른다.

## 본문이 말하는 것

점 $p$ 위에 두 가지 종류의 일반화 벡터가 있다:

- **반변** (contravariant): 위 첨자 $X^i$. 좌표 변환 시 $X^{i'} = (\partial u^{i'} / \partial u^j) X^j$.
- **공변** (covariant): 아래 첨자 $\omega_i$. 좌표 변환 시 $\omega_{i'} = (\partial u^j / \partial u^{i'}) \omega_j$.

두 규칙을 결합한 **$(p, q)$-텐서** $T$ 는 *위 $p$ 인덱스 + 아래 $q$ 인덱스* 를 갖고, 각 위 인덱스는 반변, 각 아래 인덱스는 공변으로 변환:

$$
T^{i'_1 \dots i'_p}_{\quad\,\, j'_1 \dots j'_q} = \frac{\partial u^{i'_1}}{\partial u^{k_1}} \cdots \frac{\partial u^{k_p}}{\partial u^{j'_q}}\, T^{k_1 \dots k_p}_{\quad\,\, l_1 \dots l_q}
$$

이 변환 규칙을 *만족하는* 객체를 텐서라 부른다.

미터 $g_{ij} = \mathbf{r}_i \cdot \mathbf{r}_j$ 는 변환식

$$
g_{i'j'} = \frac{\partial u^k}{\partial u^{i'}} \frac{\partial u^l}{\partial u^{j'}} g_{kl}
$$

을 정직히 따른다 (1.2.1 의 정의에서 직접 따라 나옴) — $(0, 2)$-텐서다. 반면 크리스토펠 $\Gamma^k_{ij}$ 의 변환식에는 자코비안의 *이차 미분 항* 이 끼어들어, 텐서 변환 규칙을 *깨트린다*:

$$
\Gamma^{k'}_{i'j'} = \frac{\partial u^{k'}}{\partial u^m} \frac{\partial u^a}{\partial u^{i'}} \frac{\partial u^b}{\partial u^{j'}} \Gamma^m_{ab} + \frac{\partial u^{k'}}{\partial u^m} \frac{\partial^2 u^m}{\partial u^{i'} \partial u^{j'}}
$$

오른쪽의 두 번째 항이 *비텐서적* 부분. 좌표가 바뀌면 $\Gamma$ 의 *값* 자체가 비편미분의 영향을 받는다.

## 한 번 더, 천천히

**(1) 텐서의 *기하학적 의미*.** 텐서가 좌표 변환에 *명확한 규칙* 으로 변한다는 것은, 텐서가 *좌표와 독립적인 객체* 라는 뜻. 즉 $T^i_{\;j} \mathbf{r}_i \otimes \omega^j$ 같은 추상적 표현은 좌표를 바꿔도 같은 객체를 가리킨다. 미터 $g_{ij} du^i du^j$ 가 *길이* 라는 좌표 자유 양이듯이.

**(2) 크리스토펠이 텐서가 아닌 *까닭*.** $\Gamma^k_{ij}$ 는 *접속의 성분* — 접속 자체는 *기하학적 객체* 이지만 그 *성분* 표현이 좌표에 비텐서적으로 의존한다. 이는 다음 1.3.3 의 핵심 — 접속이 텐서가 아니라 *접속 1-형식* 이라는 별 종류의 대상이라는 사실을 가리킨다.

**(3) 텐서 연산.** 같은 종류의 텐서를 더할 수 있고, 다른 종류는 *외적* (텐서곱) 으로 곱한다: $(T \otimes S)^{ij}_{\quad k} = T^i_{\;k} S^j$. 또 *축약* (contraction) 으로 위·아래 한 쌍을 합산해 등급을 낮춘다: $T^i_{\;i} = \text{tr}(T)$. 미터의 역 $g^{ij}$ 도 텐서 — 인덱스 올리기·내리기에 쓰인다.

## 파이썬으로 확인 — 미터의 좌표변환

이 코드의 메시지는 단순하다: 구면을 $(\theta, \phi)$ 와 새 좌표 $(u, v) = (\theta, \phi - \theta)$ 로 적었을 때, 미터 $g$ 가 *텐서 변환 공식* 으로 정확히 변하는지 확인.

```python
# 구면 (반지름 1):
#   원좌표 (θ, φ) 에서 g = diag(1, sin²θ)
#   새 좌표 (u, v) = (θ, φ - θ)  →  θ = u, φ = u + v
#   자코비안 ∂(θ, φ)/∂(u, v) = [[1, 0], [1, 1]]
#   g'_{ij} = (∂θ/∂u^i) (∂θ/∂u^j) g_θθ + (∂φ/∂u^i) (∂φ/∂u^j) g_φφ
import numpy as np

theta = np.pi / 3  # 임의의 점
g = np.diag([1.0, np.sin(theta)**2])  # (θ, φ) 좌표

# 자코비안 ∂(θ, φ)/∂(u, v) at this point
J = np.array([[1.0, 0.0],
              [1.0, 1.0]])

# 텐서 변환 g'_{i'j'} = J^k_{i'} J^l_{j'} g_{kl}
g_new = J.T @ g @ J
print("새 좌표에서의 g':")
print(g_new)
print()
print("해석해:  g'_uu = 1 + sin²θ, g'_uv = g'_vu = sin²θ, g'_vv = sin²θ")
print(f"  = 1 + {np.sin(theta)**2:.4f}, {np.sin(theta)**2:.4f}, {np.sin(theta)**2:.4f}")
```

이 결과는 텐서 변환식이 *정확한* 새 미터를 계산해 줌을 보인다 — 미터를 좌표에 따라 다시 계산할 필요 없이 *변환 공식만* 적용하면 끝이다.

## 다음 절(1.3.3)로 가는 다리

크리스토펠이 *텐서가 아니라는* 사실은, 점 $p$ 의 벡터와 점 $q$ 의 벡터를 *비교하는* 작업이 좌표 자유가 아님을 의미한다. 두 점이 *어떻게 연결되어 있는가* — 즉 *접속* (connection) — 을 별도로 박아야 한다. 1.3.3 은 접속 + 평행이동 의 정의로 들어간다.
