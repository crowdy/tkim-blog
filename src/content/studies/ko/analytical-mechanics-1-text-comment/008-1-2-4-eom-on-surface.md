---
title: '1.2.4 — 곡면 위의 운동방정식: 크리스토펠 기호의 등장'
description: '접선 방향 사영이 구속력을 지운다. 남은 식은 $(u, v)$ 만의 2 결합 ODE — 그러나 가속도 자리에 *크리스토펠 기호* $\Gamma^k_{ij}$ 가 끼어든다. 좌표를 바꾸면 식의 *계수* 가 바뀌지만, *형식* 은 그대로다.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 8
lang: ko
pairSlug: am1tc-1-2-4-eom-on-surface
draft: false
updated: 2026-05-17
---

# 1.2.4 — 곡면 위의 운동방정식: 크리스토펠 기호의 등장

> 접선 방향 사영이 구속력을 지운다. 남은 식은 $(u, v)$ 만의 2 결합 ODE — 그러나 가속도 자리에 *크리스토펠 기호* $\Gamma^k_{ij}$ 가 끼어든다. 좌표를 바꾸면 식의 *계수* 가 바뀌지만, *형식* 은 그대로다.

## 본문이 말하는 것

원서 1.2.4 절은 운동방정식을 접공간 기저 $\{\mathbf{r}_u, \mathbf{r}_v\}$ 로 사영해 *접선 식 2 개* 를 뽑는다. 1.2.2 의 가속도 식을 $\mathbf{r}_u$ 와 내적하면

$$
m\, (\mathbf{r}_u \cdot \mathbf{r}_u\, \ddot u + \mathbf{r}_u \cdot \mathbf{r}_v\, \ddot v + \mathbf{r}_u \cdot \mathbf{r}_{uu}\, \dot u^2 + 2\, \mathbf{r}_u \cdot \mathbf{r}_{uv}\, \dot u \dot v + \mathbf{r}_u \cdot \mathbf{r}_{vv}\, \dot v^2) = \mathbf{F}^{\text{appl}} \cdot \mathbf{r}_u
$$

(구속력 $\lambda \hat{\mathbf{n}}$ 은 $\mathbf{r}_u$ 와 직각이라 사라진다.) $\mathbf{r}_v$ 사영도 같은 모양. 이 둘이 *접선 방향 운동방정식*.

내적들이 곡면의 기하 정보를 모두 담는다:

$$
g_{ij} = \mathbf{r}_i \cdot \mathbf{r}_j,\qquad \Gamma_{kij} = \mathbf{r}_k \cdot \mathbf{r}_{ij} = \frac{1}{2} (\partial_i g_{jk} + \partial_j g_{ki} - \partial_k g_{ij})
$$

(증명은 본문 — $\mathbf{r}_i \cdot \mathbf{r}_j = g_{ij}$ 의 양변을 $\partial_k$ 로 미분해 좌변을 정리하면 위 등식이 나옴.) **크리스토펠 기호** (1종) 다. 첨자를 올려 2종

$$
\Gamma^k_{ij} = g^{kl}\, \Gamma_{lij}
$$

으로 적으면 (여기서 $g^{kl}$ 은 $g_{ij}$ 의 역행렬), 운동방정식은 깔끔히

$$
\ddot u^k + \Gamma^k_{ij}\, \dot u^i \dot u^j = \frac{1}{m}\, g^{kl}\, F^{\text{appl}}_l \quad (k = 1, 2)
$$

여기서 $u^1 = u$, $u^2 = v$, $F^{\text{appl}}_l = \mathbf{F}^{\text{appl}} \cdot \mathbf{r}_l$ 은 접선 성분 외력 (= 일반화 힘). 이게 *곡면 위의 운동방정식*. 좌변은 *공변 가속도* — 1.3 의 공변미분과 같은 객체.

## 한 번 더, 천천히

**(1) 평면 한정 시 $\Gamma = 0$.** 평면 $\mathbf{r} = (u, v, 0)$ 이라면 $g_{ij}$ 가 상수 ($\delta_{ij}$), 그래서 모든 $\Gamma$ 가 0. 운동방정식은 $\ddot u = F_u / m$, $\ddot v = F_v / m$ — 익숙한 평면 뉴턴식. *곡면의 굽음이 $\Gamma$ 항으로 정확히 측정* 된다.

**(2) 좌표 불변성.** 같은 운동을 $(u, v)$ 대신 $(u', v') = (u'(u, v), v'(u, v))$ 로 적으면, $g_{ij}$ 도 $\Gamma^k_{ij}$ 도 모두 변환되지만, 식 *형식* — $\ddot u^k + \Gamma^k_{ij} \dot u^i \dot u^j = (\text{외력 항})$ — 은 그대로다. 1.3 의 *공변미분* 정의가 이 사실을 정밀히 박는다.

**(3) 비선형성의 출처.** 평면의 자유 입자 ($\mathbf{F}^{\text{appl}} = 0$) 는 $\ddot u^k = 0$ — 직선. 굽은 면에서는 $\ddot u^k = -\Gamma^k_{ij} \dot u^i \dot u^j$ — 속도의 이차식이 가속도에 끼어든다. 이 비선형성이 *측지선* 의 본질. 1.2.5 가 그 식을 본격적으로 다룬다.

## 파이썬으로 확인 — 구면의 크리스토펠 기호

이 코드의 메시지는 단순하다: $g$ 가 알려진 곡면 (구면) 에서 $\Gamma^k_{ij}$ 를 *공식대로* 계산한다. 결과를 표준 문헌의 값과 비교해 검증.

```python
# 구면 S^2 (반지름 R): g = diag(R^2, R^2 sin^2 θ).
# 크리스토펠: Γ^θ_φφ = -sinθ cosθ,  Γ^φ_θφ = Γ^φ_φθ = cotθ.
# 그 외는 0.
import sympy as sp

th, ph, R = sp.symbols('theta phi R', positive=True)

# 미터 (대각)
g = sp.Matrix([[R**2, 0],
               [0, R**2 * sp.sin(th)**2]])
g_inv = g.inv()
coords = [th, ph]

def christoffel(k, i, j):
    # Γ^k_ij = (1/2) g^kl (∂_i g_jl + ∂_j g_il - ∂_l g_ij)
    total = 0
    for l in range(2):
        total += g_inv[k, l] * (
            sp.diff(g[j, l], coords[i]) +
            sp.diff(g[i, l], coords[j]) -
            sp.diff(g[i, j], coords[l])
        )
    return sp.simplify(total / 2)

# 모든 Γ 계산
names = ['θ', 'φ']
for k in range(2):
    for i in range(2):
        for j in range(2):
            val = christoffel(k, i, j)
            if val != 0:
                print(f"Γ^{names[k]}_{names[i]}{names[j]} = {val}")
```

이 결과는 표준 결과 — $\Gamma^\theta_{\phi\phi} = -\sin\theta\cos\theta$, $\Gamma^\phi_{\theta\phi} = \Gamma^\phi_{\phi\theta} = \cot\theta$ — 와 일치한다. 미터로부터 운동방정식의 *모든 계수* 가 자동으로 떨어진다는 사실의 작은 증거다.

## 다음 절(1.2.5)로 가는 다리

곡면 위 운동방정식 $\ddot u^k + \Gamma^k_{ij} \dot u^i \dot u^j = F^k / m$ 의 *우변이 0* 인 경우 — 외력 없는 *자유 운동* — 이 어떤 곡선을 만들어 내는가? 그것이 측지선이다. 다음 1.2.5 는 측지선을 정의하고, 그것이 곡면의 "직선" 임을 본다.
