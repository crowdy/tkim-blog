---
title: '1.5.2 — 반변벡터와 공변벡터: 미터가 잇는 두 세계'
description: '벡터 (반변) 와 코벡터 (공변) 가 *별도의 객체* 이지만, 미터 $g_{ij}$ 가 둘을 정확히 *짝짓는다*. 인덱스 올리기·내리기로 표기되는 이 짝짓기가 일반상대론·라그랑주 역학의 기본 도구.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 26
lang: ko
pairSlug: am1tc-1-5-2-contravariant-vs-covariant
draft: false
updated: 2026-05-17
---

# 1.5.2 — 반변벡터와 공변벡터: 미터가 잇는 두 세계

> 벡터 (반변) 와 코벡터 (공변) 가 *별도의 객체* 이지만, 미터 $g_{ij}$ 가 둘을 정확히 *짝짓는다*. 인덱스 올리기·내리기로 표기되는 이 짝짓기가 일반상대론·라그랑주 역학의 기본 도구.

## 본문이 말하는 것

원서 1.5.2 절은 벡터와 코벡터 사이의 *짝짓기* 를 정리한다.

**미터** $g$ 는 $V$ 위의 대칭·비퇴화 쌍선형 형식 — $g : V \times V \to \mathbb R$, $g(\mathbf{v}, \mathbf{w}) = g_{ij} v^i w^j$. 좌표 기저로 $g_{ij} = g(\partial_i, \partial_j)$, $(0, 2)$-텐서 (1.3.2 의 의미).

미터로부터 **인덱스 내리기** (lowering):

$$
v_i := g_{ij}\, v^j
$$

벡터의 반변 성분 $v^i$ 에서 코벡터의 공변 성분 $v_i$ 를 만든다. 같은 *기하학적* 벡터의 *두 표기*. 마찬가지로 미터의 역 $g^{ij}$ ($g_{ij} g^{jk} = \delta_i^k$) 로 **인덱스 올리기**:

$$
\omega^i := g^{ij}\, \omega_j
$$

이 두 작업이 미터를 통해 $V$ 와 $V^*$ 사이의 *자연적 동형* 을 만든다.

**노름과 내적.** 같은 벡터의 두 성분으로 *제곱 노름* 을 적으면

$$
|\mathbf{v}|^2 = g_{ij}\, v^i v^j = v_i\, v^i
$$

(아인슈타인 합 — 위·아래 짝의 합). 두 벡터의 *내적* 은

$$
\langle \mathbf{v}, \mathbf{w} \rangle = g_{ij}\, v^i w^j = v_i\, w^i = v^i\, w_i
$$

세 표기가 *같은* 값.

좌표 변환 시:

- 반변 성분 $v^i$: $v^{i'} = (\partial x^{i'} / \partial x^j) v^j$
- 공변 성분 $v_i$: $v_{i'} = (\partial x^j / \partial x^{i'}) v_j$

미터 $g_{ij}$ 도 변환 (1.3.2 에서 이미 봤음).

## 한 번 더, 천천히

**(1) 인덱스 표기의 *기하학적* 의미.** 위 첨자 = 벡터 (반변), 아래 첨자 = 코벡터 (공변). 같은 *기하학적* 객체를 가리킨다면 미터로 변환 가능. 식 $v^i = g^{ij} v_j$ 의 의미는 "*같은 벡터* 를 두 가지 인덱스 형식으로 적는다".

**(2) 직교 좌표에서의 *간이화*.** 미터가 $g_{ij} = \delta_{ij}$ (Kronecker, 직교) 라면 $v_i = v^i$ — 인덱스 위·아래의 *수치적* 차이가 없다. 학부 물리에서 텐서 어휘를 생략할 수 있는 이유. 그러나 *곡면 좌표* 나 *일반상대론* 에서는 $g \neq \delta$ — 인덱스 위·아래의 구별이 *본질적*.

**(3) 라그랑주 역학에서의 등장.** 일반화 운동량 $p_i = \partial L / \partial \dot q^i$ 는 *공변* 인덱스 — 코벡터다. 반면 일반화 속도 $\dot q^i$ 는 *반변* 인덱스 — 벡터. 미터를 정의하는 *질량 행렬* $M_{ij} = \partial^2 T / \partial \dot q^i \partial \dot q^j$ 가 $p_i = M_{ij} \dot q^j$ 로 둘을 잇는다.

**(4) 일반상대론으로의 다리.** 4-벡터 $x^\mu = (ct, \mathbf{x})$ 는 반변. 미터 (민코프스키 또는 일반 시공간) $g_{\mu\nu}$ 로 내려 $x_\mu$ 를 만든다. $|x|^2 = g_{\mu\nu} x^\mu x^\nu$ 가 *고유 거리* (proper distance) 또는 *고유 시간* (proper time) 의 제곱.

## 파이썬으로 확인 — 구면 미터에서 인덱스 올리기·내리기

이 코드의 메시지는 단순하다: 구면 $(\theta, \phi)$ 좌표에서 $g = \text{diag}(1, \sin^2\theta)$. 반변 벡터 $(v^\theta, v^\phi)$ 를 *내려* 공변 $v_\theta, v_\phi$ 를 만들고, *올려* 다시 반변으로 돌아오는지 확인.

```python
# 구면 미터: g_ij = diag(1, sin² θ), g^ij = diag(1, 1/sin² θ)
# 벡터 v^θ = 0.5, v^φ = 0.3 at θ = π/3
import numpy as np

theta = np.pi / 3
g_down = np.diag([1.0, np.sin(theta)**2])      # g_{ij}
g_up = np.diag([1.0, 1.0 / np.sin(theta)**2])  # g^{ij}

# 검증: g_down @ g_up = I
print(f"g_down @ g_up = I 검증: max 오차 = {np.max(np.abs(g_down @ g_up - np.eye(2))):.2e}")

# 반변 벡터 (위 첨자)
v_up = np.array([0.5, 0.3])

# 인덱스 내리기: v_i = g_ij v^j
v_down = g_down @ v_up
print(f"v^i = {v_up}")
print(f"v_i = {v_down}  (= [v^θ, v^φ * sin² θ] = [0.5, 0.3 * {np.sin(theta)**2:.4f}])")

# 다시 올리기: v^i = g^ij v_j
v_up_again = g_up @ v_down
print(f"v^i (복원) = {v_up_again}")
print(f"max 오차 = {np.max(np.abs(v_up - v_up_again)):.2e}")

# 노름의 두 표기
norm_sq_a = v_up @ g_down @ v_up
norm_sq_b = v_up @ v_down  # v^i v_i
print(f"\n|v|² (= v^i g_ij v^j) = {norm_sq_a:.6f}")
print(f"|v|² (= v^i v_i)       = {norm_sq_b:.6f}")
```

이 결과는 *같은 벡터* 의 두 표기 사이의 미터 매개 변환을 수치로 확인 — 인덱스 위·아래가 *별개의 정보* 가 아니라 *같은 객체의 다른 표기* 임을 보인다.

## 다음 절(1.5.3)로 가는 다리

벡터·코벡터 (= (1, 0)·(0, 1) 텐서) 의 변환·짝짓기를 정리했다. 이제 일반화 — *여러 슬롯의 코벡터* 인 공변 텐서 $T_{i_1 \dots i_q}$ — 를 다룰 차례. 미터 자체가 (0, 2)-텐서의 대표적 예. 1.5.3 은 일반 공변 텐서의 정의와 텐서곱을 박는다.
