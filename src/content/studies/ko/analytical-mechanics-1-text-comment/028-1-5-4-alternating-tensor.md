---
title: '1.5.4 — 교대텐서와 벡터: 부호가 뒤집히는 텐서'
description: '벡터 순서가 바뀌면 부호가 *뒤집히는* 공변 텐서가 교대 텐서. 차원이 *$\binom{n}{p}$* — 즉 $\Lambda^p V^*$ 가 *작은* 부분공간. 미분형식·외적·체적의 출발점.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 28
lang: ko
pairSlug: am1tc-1-5-4-alternating-tensor
draft: false
updated: 2026-05-17
---

# 1.5.4 — 교대텐서와 벡터: 부호가 뒤집히는 텐서

> 벡터 순서가 바뀌면 부호가 *뒤집히는* 공변 텐서가 교대 텐서. 차원이 *$\binom{n}{p}$* — 즉 $\Lambda^p V^*$ 가 *작은* 부분공간. 미분형식·외적·체적의 출발점.

## 본문이 말하는 것

$(0, p)$-텐서 $\omega$ 가 **교대** (alternating) 이라는 것은: 두 슬롯의 *임의의 교환* 에 대해 부호가 뒤집힘:

$$
\omega(\mathbf{v}_1, \dots, \mathbf{v}_i, \dots, \mathbf{v}_j, \dots, \mathbf{v}_p) = -\omega(\mathbf{v}_1, \dots, \mathbf{v}_j, \dots, \mathbf{v}_i, \dots, \mathbf{v}_p)
$$

일반적인 순열 $\sigma \in S_p$ 에 대해:

$$
\omega(\mathbf{v}_{\sigma(1)}, \dots, \mathbf{v}_{\sigma(p)}) = \text{sgn}(\sigma)\, \omega(\mathbf{v}_1, \dots, \mathbf{v}_p)
$$

교대 $(0, p)$-텐서의 공간을 $\Lambda^p V^*$ ($V^*$ 의 *$p$-차 외대수*) 라 적는다. 그 원소가 **$p$-형식** (또는 1.6 의 *외미분형식*).

**중요 성질.** $p > n = \dim V$ 이면 $\Lambda^p V^* = 0$ (반복된 벡터로 항상 0 이 나옴). 즉 $n$-차원 공간에서 가능한 $p$-형식은 $p = 0, 1, \dots, n$ 만.

차원

$$
\dim \Lambda^p V^* = \binom{n}{p}
$$

— 일반 $V^{*\otimes p}$ 의 차원 $n^p$ 보다 *훨씬 작다*. 예: $n = 3$, $p = 2$ 라면 $\dim = 3$ (대신 $V^{*\otimes 2}$ 는 9). 차원의 감소가 *교대 조건* 의 강한 제약을 반영.

**기저.** $V^*$ 의 기저 $\{e^1, \dots, e^n\}$ 에서 $\Lambda^p V^*$ 의 기저는 *$p$-선택의 사전 순서*

$$
\{e^{i_1} \wedge e^{i_2} \wedge \cdots \wedge e^{i_p} : 1 \le i_1 < i_2 < \cdots < i_p \le n\}
$$

여기서 $\wedge$ 는 다음 1.5.5 의 *외적* (wedge product). $\binom{n}{p}$ 개.

## 한 번 더, 천천히

**(1) 면적의 *부호*.** $\mathbb R^2$ 의 면적 형식 $\omega = dx \wedge dy$ 가 두 벡터 $\mathbf{u} = (u_1, u_2)$, $\mathbf{v} = (v_1, v_2)$ 에 작용하면 $u_1 v_2 - u_2 v_1$ — *부호 있는* 면적 (방향에 의존). $\mathbf{u}$ 와 $\mathbf{v}$ 의 순서를 바꾸면 부호가 뒤집힌다.

**(2) 체적 — 3차원의 경우.** $\mathbb R^3$ 의 체적 형식 $\omega = dx \wedge dy \wedge dz$ 가 세 벡터에 작용하면 *행렬식* — 즉 $\det[\mathbf{u}, \mathbf{v}, \mathbf{w}]$. 평행육면체의 부호 있는 체적.

**(3) 자속·전류밀도의 교대 본성.** Maxwell 방정식의 *자속 $\mathbf{B}$* 는 사실 $\mathbb R^3$ 위의 2-형식, 전류밀도 $\mathbf{j}$ 는 *2-형식*. 외적·외미분 어휘로 적으면 Maxwell 식이 *4 개의 미분형식 식 2 개* 로 압축된다 (1.6 의 주제).

**(4) $n = p$ 일 때.** $\dim \Lambda^n V^* = 1$ — 1차원. *체적 형식의 공간*. 임의 두 체적 형식은 *스칼라 배수* 차이. 미터 $g$ 가 주어지면 자연 정규화로 *유일* 한 체적 형식 (음이 아닌 방향) 이 결정된다.

**(5) 교대화 작용소.** 일반 텐서 $T \in V^{*\otimes p}$ 의 *교대화* 는

$$
\text{Alt}(T)(\mathbf{v}_1, \dots, \mathbf{v}_p) := \frac{1}{p!} \sum_{\sigma \in S_p} \text{sgn}(\sigma)\, T(\mathbf{v}_{\sigma(1)}, \dots, \mathbf{v}_{\sigma(p)})
$$

— 모든 순열을 가중치 $\pm 1$ 로 평균. 결과는 항상 교대. 1.5.5 의 외적이 이 교대화로 정의된다.

## 파이썬으로 확인 — $\mathbb R^3$ 의 면적·체적

이 코드의 메시지는 단순하다: 면적 $dx \wedge dy$ 와 체적 $dx \wedge dy \wedge dz$ 가 *벡터 순서 교환에 부호 반전* 을 정확히 따르는지 수치로 확인.

```python
# Λ^p V* in R^3:
# Λ^1: 3-dim, basis dx, dy, dz
# Λ^2: 3-dim, basis dx∧dy, dy∧dz, dz∧dx
# Λ^3: 1-dim, basis dx∧dy∧dz
import numpy as np

# 2-form: ω(u, v) = u_x v_y - u_y v_x
def omega_xy(u, v):
    return u[0] * v[1] - u[1] * v[0]

u = np.array([2.0, 1.0, 0.5])
v = np.array([1.0, 3.0, -1.0])

# 부호 반전 검증
print(f"ω(u, v) = {omega_xy(u, v)}")
print(f"ω(v, u) = {omega_xy(v, u)}")
print(f"부호 반전: ω(u, v) + ω(v, u) = {omega_xy(u, v) + omega_xy(v, u):.2e}  (= 0 기대)")

# 3-form: 행렬식
def vol(u, v, w):
    M = np.array([u, v, w]).T  # 열벡터로
    return np.linalg.det(M)

w = np.array([0.5, -1.0, 2.0])
print(f"\nvol(u, v, w) = {vol(u, v, w):.4f}")
print(f"vol(v, u, w) = {vol(v, u, w):.4f}  (= -vol(u, v, w) 기대)")
print(f"vol(u, u, w) = {vol(u, u, w):.2e}  (= 0 기대 — 반복된 벡터)")
```

이 결과는 *교대 텐서의 두 핵심 성질* — (a) 임의 두 슬롯 교환 시 부호 반전, (b) 반복된 벡터에서 0 — 을 수치로 확인한다.

## 다음 절(1.5.5)로 가는 다리

교대 텐서가 정의됐지만, 두 교대 텐서를 결합해 새 교대 텐서를 만드는 *연산* 이 아직 박히지 않았다. 1.5.5 의 *외적* $\wedge$ 가 그 연산 — 텐서곱에 교대화를 합성한 것. 그 위에 1.6 의 외미분·푸앵카레 보조정리·스토크스 정리가 차례로 박힌다.
