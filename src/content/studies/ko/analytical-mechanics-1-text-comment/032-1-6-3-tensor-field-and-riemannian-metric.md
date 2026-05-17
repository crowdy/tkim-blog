---
title: '1.6.3 — 텐서장과 리만 계량: 다양체 위에 *길이* 를 박는 구조'
description: '$(p, q)$-텐서장은 각 점에 $(p, q)$-텐서를 매끄럽게 깐 것. 그 중 *양의 정부호 대칭* $(0, 2)$-텐서장이 *리만 계량* $g$. 미터로 길이·각도·체적이 정의되는 *리만 다양체* 의 정체.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 32
lang: ko
pairSlug: am1tc-1-6-3-tensor-field-and-riemannian-metric
draft: false
updated: 2026-05-17
---

# 1.6.3 — 텐서장과 리만 계량: 다양체 위에 *길이* 를 박는 구조

> $(p, q)$-텐서장은 각 점에 $(p, q)$-텐서를 매끄럽게 깐 것. 그 중 *양의 정부호 대칭* $(0, 2)$-텐서장이 *리만 계량* $g$. 미터로 길이·각도·체적이 정의되는 *리만 다양체* 의 정체.

## 본문이 말하는 것

**텐서장** (tensor field) $T$ of type $(p, q)$ on $M$ 은 매끄러운 사상

$$
T : M \to T^p_q M
$$

이 각 점에 $(p, q)$-텐서를 부여 (매끄럽게). $T^p_q M = T^{\otimes p} M \otimes T^{*\otimes q} M$ 이 *텐서 번들*. 좌표로

$$
T = T^{i_1 \dots i_p}_{\quad\, j_1 \dots j_q}(x)\, \partial_{i_1} \otimes \cdots \otimes \partial_{i_p} \otimes dx^{j_1} \otimes \cdots \otimes dx^{j_q}
$$

성분 $T^{\dots}_{\dots}(x)$ 가 *매끄러운 좌표 함수*.

**리만 계량** (Riemannian metric) $g$ 는 다음 세 조건을 만족하는 $(0, 2)$-텐서장:

- **대칭:** $g(X, Y) = g(Y, X)$ ($g_{ij} = g_{ji}$).
- **양의 정부호** (positive definite): $g(X, X) > 0$ for all $X \neq 0$.
- **매끄럽다.**

미터가 주어진 다양체 $(M, g)$ 를 **리만 다양체** (Riemannian manifold). 길이·각도·체적 모두 $g$ 로 정의:

- 곡선 길이: $L(\gamma) = \int \sqrt{g(\dot\gamma, \dot\gamma)}\, dt$.
- 각도: $\cos\theta = g(X, Y) / (\|X\|\, \|Y\|)$.
- 체적 형식: $\sqrt{|\det g|}\, dx^1 \wedge \cdots \wedge dx^n$.

§1.2 의 곡면의 제1기본형식이 *리만 계량* 의 가장 간단한 예. 임베딩이 *부산물* 로 미터를 주지만, 1.6.3 에서는 미터를 *추가 구조* 로 박는다.

## 한 번 더, 천천히

**(1) 텐서장 vs. 텐서.** *텐서* 는 한 점의 객체, *텐서장* 은 모든 점에 텐서를 깐 것. 영문에서 "tensor" 가 둘 다 의미할 수 있어 혼동되지만, 다양체 위에서는 *항상 텐서장* 을 본다. 단일 텐서는 *국소 표현* 의 도구.

**(2) 미터의 *비유클리드성*.** $g_{ij}(x) = \delta_{ij}$ (모든 점에서 직교) 라면 *평탄* — 본질적으로 $\mathbb R^n$. 일반적으로 $g_{ij}(x)$ 가 *위치에 의존* 하면 *곡률* 이 생긴다. 1.2.4 의 크리스토펠 $\Gamma$ 가 $g$ 의 미분으로 결정되었듯, 곡률 텐서도 $g$ 의 2차 미분으로 정의된다.

**(3) 일반상대론으로의 다리.** 4차원 시공간이 *(3+1)-부호 미터* 를 가진다 (Lorentzian: $g_{00} < 0$, $g_{ii} > 0$). 양의 정부호 ≠ 비퇴화 (non-degenerate) — Riemann vs. semi-Riemann 의 차이. 본 책은 양의 정부호 Riemann 만 다룬다.

**(4) *내재적* vs. *외재적* 미터.** §1.2 의 미터는 $\mathbb R^3$ 안의 임베딩에서 *유도된* (외재적) 미터. 1.6.3 의 미터는 다양체 위에 *처음부터 박혀 있는* (내재적) 미터. 두 경우 모두 *수학적으로 같은 객체* — 차이는 *어디서 왔는가* 의 출처.

## 파이썬으로 확인 — 토러스의 리만 미터

이 코드의 메시지는 단순하다: 토러스 $T^2$ (주반지름 $R$, 부반지름 $r$) 의 미터를 좌표로 적고, 임의의 두 점 사이의 *짧은 곡선* 의 *길이* 가 좌표 직선 거리와 다르다는 사실 — 즉 *내재적 기하* 의 존재 — 을 본다.

```python
# 토러스: r(u, v) = ((R + r cos v) cos u, (R + r cos v) sin u, r sin v)
# 미터 (1.2.1 에서 계산): g_uu = (R + r cos v)², g_vv = r², g_uv = 0
import numpy as np

R, r = 2.0, 0.5

def g(u, v):
    return np.array([[(R + r * np.cos(v))**2, 0.0],
                     [0.0, r**2]])

# 곡선 γ(t) = (u(t), v(t)), t ∈ [0, 1]
# γ(0) = (0, 0), γ(1) = (π/2, π/4)
# 비교 (a): 좌표 직선 — u(t) = t π/2, v(t) = t π/4
# 비교 (b): 같은 시작·끝점이지만 v 부터 움직이고 u 를 움직임
def curve_length(curve_uv):
    """curve_uv: t → (u, v) 사상 (numpy 벡터화)"""
    ts = np.linspace(0, 1, 500)
    dt = ts[1] - ts[0]
    L = 0.0
    for i in range(len(ts) - 1):
        u, v = curve_uv(ts[i])
        u_next, v_next = curve_uv(ts[i + 1])
        du, dv = (u_next - u), (v_next - v)
        # ds² = g_uu du² + g_vv dv² (g_uv = 0)
        ds_sq = g(u, v)[0, 0] * du**2 + g(u, v)[1, 1] * dv**2
        L += np.sqrt(ds_sq)
    return L

# (a) 직선 좌표 곡선
L_a = curve_length(lambda t: (t * np.pi/2, t * np.pi/4))
# (b) L 자 곡선: 먼저 v 만 (u=0), 그 다음 u 만 (v=π/4)
def L_curve(t):
    if t < 0.5:
        return (0.0, t * 2 * np.pi/4)  # v: 0 → π/4
    else:
        return ((t - 0.5) * 2 * np.pi/2, np.pi/4)  # u: 0 → π/2
L_b = curve_length(L_curve)

print(f"(a) 좌표 직선 곡선 길이 = {L_a:.4f}")
print(f"(b) L자 곡선 길이      = {L_b:.4f}")
print(f"두 경로의 길이 차이 — *곡면이 평면이 아니다* 는 흔적.")
```

이 결과는 *같은 두 점을 잇는 두 다른 경로* 의 길이가 *미터에 의존* 함을 보인다 — 미터가 다양체의 *내재적* 기하 정보임을 수치로 확인.

## 다음 절(1.6.4)로 가는 다리

리만 계량은 *대칭* $(0, 2)$-텐서장. 그 *반대* — *교대* (0, p)-텐서장 — 이 1.6.4 의 *p-형식*. 1.5.4 의 점-별 교대 텐서가 *다양체 전체* 위에 깔린 형태. 외적 $\wedge$ 가 자연스럽게 따라온다.
