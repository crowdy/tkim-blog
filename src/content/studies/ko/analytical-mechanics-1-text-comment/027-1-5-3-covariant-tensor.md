---
title: '1.5.3 — 공변텐서: 여러 벡터를 한꺼번에 받아 *수* 로 옮기는 함수'
description: '$(0, q)$-텐서는 $q$ 개의 벡터를 받아 *실수* 를 돌려주는 $q$-선형 함수. 미터·면적·체적 같은 양들이 모두 공변 텐서의 옷을 입고 있다. 텐서곱 $\otimes$ 가 등장하는 자리.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 27
lang: ko
pairSlug: am1tc-1-5-3-covariant-tensor
draft: false
updated: 2026-05-17
---

# 1.5.3 — 공변텐서: 여러 벡터를 한꺼번에 받아 *수* 로 옮기는 함수

> $(0, q)$-텐서는 $q$ 개의 벡터를 받아 *실수* 를 돌려주는 $q$-선형 함수. 미터·면적·체적 같은 양들이 모두 공변 텐서의 옷을 입고 있다. 텐서곱 $\otimes$ 가 등장하는 자리.

## 본문이 말하는 것

**$(0, q)$-텐서** (또는 *공변 $q$-텐서*) $T$ 는 $V$ 의 *$q$ 개 복사본의 곱* 을 정의역으로 하는 $q$-선형 함수:

$$
T : \underbrace{V \times \cdots \times V}_{q\, \text{개}} \to \mathbb R
$$

각 슬롯에 *선형* — 즉 $T(\dots, a\mathbf{v} + b\mathbf{w}, \dots) = a T(\dots, \mathbf{v}, \dots) + b T(\dots, \mathbf{w}, \dots)$.

좌표 기저 $\{\partial_i\}$ 의 *성분* 표현은

$$
T_{i_1 \dots i_q} := T(\partial_{i_1}, \dots, \partial_{i_q})
$$

이게 *공변* 인덱스 $q$ 개. 텐서 자체는

$$
T = T_{i_1 \dots i_q}\, dx^{i_1} \otimes \cdots \otimes dx^{i_q}
$$

— 여기서 $\otimes$ 가 **텐서곱** (tensor product).

좌표 변환 시 각 인덱스가 공변 (1.5.1) 으로 변환:

$$
T_{i'_1 \dots i'_q} = \frac{\partial x^{j_1}}{\partial x^{i'_1}} \cdots \frac{\partial x^{j_q}}{\partial x^{i'_q}}\, T_{j_1 \dots j_q}
$$

**예시.** $q = 0$: 스칼라 (= 함수). $q = 1$: 코벡터. $q = 2$: 미터 $g_{ij}$, 면적 형식 $\omega_{ij} = -\omega_{ji}$, 응력 텐서.

## 한 번 더, 천천히

도해를 그려 두면 — 텐서곱의 *기능적* 그림이 도움이 된다.

**(a) $\alpha \otimes \beta$ 란?** 두 코벡터 $\alpha, \beta \in V^*$ 의 텐서곱은 $(0, 2)$-텐서

$$
(\alpha \otimes \beta)(\mathbf{v}, \mathbf{w}) := \alpha(\mathbf{v})\, \beta(\mathbf{w})
$$

— 첫 슬롯에 $\alpha$, 둘째 슬롯에 $\beta$ 를 평가. 일반 텐서는 이런 $\otimes$ 형식의 *선형결합*. 차원 $\dim (V^* \otimes V^*) = n^2$ — 모든 가능한 $dx^i \otimes dx^j$ 의 선형결합.

**(b) 미터가 (0, 2)-텐서인 이유.** 미터 $g$ 는 두 벡터를 받아 내적이라는 *수* 를 돌려준다 — $g(\mathbf{v}, \mathbf{w}) = \langle \mathbf{v}, \mathbf{w}\rangle$. 각 슬롯에 선형 → 정의대로 (0, 2)-텐서. 추가 *대칭* 성질 ($g(\mathbf{v}, \mathbf{w}) = g(\mathbf{w}, \mathbf{v})$) 이 *내적의 조건*.

**(c) 면적과 비대칭.** $\mathbb R^2$ 위의 면적 $A(\mathbf{v}, \mathbf{w}) = v_1 w_2 - v_2 w_1$ 은 (0, 2)-텐서, 단 *비대칭* — $A(\mathbf{v}, \mathbf{w}) = -A(\mathbf{w}, \mathbf{v})$. 이 비대칭이 1.5.4 의 *교대 텐서* 와 미분형식의 출발점.

**(d) 텐서곱의 *결합법칙*.** $(\alpha \otimes \beta) \otimes \gamma = \alpha \otimes (\beta \otimes \gamma)$ — 양 표현이 같은 (0, 3)-텐서. 즉 $V^* \otimes V^* \otimes V^*$ 가 *단순히* 결합적으로 정의된다.

**(e) 비가환성.** 일반적으로 $\alpha \otimes \beta \neq \beta \otimes \alpha$. 슬롯 순서가 *의미가 있다*. 이 비가환성을 *상쇄* 하려면 1.5.5 의 *교대화* + *외적* 으로 가야 한다.

## 다음 절(1.5.4)로 가는 다리

공변 텐서 일반이 박혔으니, 이제 *물리적으로 자주 등장하는* 부분류 — *교대 텐서* (또는 미분형식) — 를 따로 다룬다. 면적·체적·자속·전류밀도 같은 양은 모두 *방향이 있는 양* — 두 벡터 (또는 $p$ 개 벡터) 의 순서를 바꿀 때 부호가 뒤집힌다. 1.5.4 가 이 *교대* 라는 추가 구조를 박는다.
