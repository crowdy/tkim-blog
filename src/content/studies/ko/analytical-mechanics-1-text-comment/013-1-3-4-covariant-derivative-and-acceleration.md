---
title: '1.3.4 — 공변미분과 가속도: 1.2.4 의 운동방정식을 *좌표 자유* 로 다시 적기'
description: '곡선 위 속도 벡터의 공변미분 $D\dot{\mathbf{r}}/dt$ 가 곡면 위 가속도다. 1.2.4 의 운동방정식이 $m\, D\dot{\mathbf{r}}/dt = (\text{접선 외력})$ 형태로 깔끔히 다시 적힌다 — 좌표 표현이 어떻든 *같은* 식.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 13
lang: ko
pairSlug: am1tc-1-3-4-covariant-derivative-and-acceleration
draft: false
updated: 2026-05-17
---

# 1.3.4 — 공변미분과 가속도: 1.2.4 의 운동방정식을 *좌표 자유* 로 다시 적기

> 곡선 위 속도 벡터의 공변미분 $D\dot{\mathbf{r}}/dt$ 가 곡면 위 가속도다. 1.2.4 의 운동방정식이 $m\, D\dot{\mathbf{r}}/dt = (\text{접선 외력})$ 형태로 깔끔히 다시 적힌다 — 좌표 표현이 어떻든 *같은* 식.

## 본문이 말하는 것

곡선 $\gamma(t) = (u^1(t), u^2(t))$ 위 속도 벡터의 성분은 $V^k(t) = \dot u^k(t)$. 그 공변미분은 1.3.3 의 정의로

$$
\frac{D V^k}{dt} = \frac{d V^k}{dt} + \Gamma^k_{ij}\, \dot u^i\, V^j = \ddot u^k + \Gamma^k_{ij}\, \dot u^i \dot u^j
$$

이 등식 — *공변 가속도가 1.2.4 의 좌변과 정확히 같다* — 가 본 절의 핵심. 1.2.4 의 운동방정식

$$
\ddot u^k + \Gamma^k_{ij}\, \dot u^i \dot u^j = \frac{1}{m}\, g^{kl}\, F^{\text{appl}}_l
$$

은 좌표 자유 형식으로

$$
m\, \frac{D V^k}{dt} = g^{kl}\, F^{\text{appl}}_l \quad \text{또는} \quad m\, \frac{D \dot{\mathbf{r}}}{dt} = \mathbf{F}^{\text{appl}}_\parallel
$$

으로 적힌다 ($\mathbf{F}^{\text{appl}}_\parallel$ 은 접공간 성분만). 좌변이 *공변미분* 이라는 사실이 식의 *좌표 불변성* 을 명시한다 — 어떤 $(u^1, u^2)$ 좌표를 잡든 같은 형식.

측지선 ($\mathbf{F}^{\text{appl}} = 0$) 은

$$
\frac{D V}{dt} = 0
$$

— 속도가 평행이동되는 곡선. 가장 *직선스러운* 곡선이다.

## 한 번 더, 천천히

**(1) 좌표 자유의 의미.** 1.2.4 까지의 운동방정식은 $\ddot u^k$ 와 $\Gamma$ 두 부분으로 *나뉘어* 있었다. 좌표가 바뀌면 두 부분이 *각자* 변하지만 합 $D V^k / dt$ 는 *텐서* 처럼 변환된다 (좌표가 바뀐 새 좌표계에서의 $D V'^{k'} / dt$ 가 자코비안으로 결정됨). 식이 *형태* 뿐 아니라 *기하학적 의미* 까지 좌표 자유.

**(2) 1.4 의 *임베딩-없는* 정의.** 지금까지의 $\Gamma^k_{ij}$ 는 $g$ 에서 공식으로 정의됐다. 1.4 의 다양체에서는 $\Gamma$ 가 *접속의 성분 정의* 그 자체. 미터 없이도 (Levi-Civita 가 아니라 일반 접속) $D/dt$ 가 정의될 수 있다. 그 길은 일반상대론·게이지 이론으로 이어진다.

**(3) 다리: 라그랑주식.** 1.1.4 의 좌변 $\sum_i m_i \ddot{\mathbf{x}}_i \cdot \partial \mathbf{x}_i / \partial q^\alpha$ 는 — *각도 좌표를 일반화 좌표로 쓰는 한* — $m\, D V_\alpha / dt$ 와 같다. 즉 §2 의 라그랑주식 $\frac{d}{dt} \partial L / \partial \dot q^\alpha - \partial L / \partial q^\alpha$ 의 *기하학적 정체* 가 공변미분이다.

## 파이썬으로 확인 — 측지선이 공변 가속도 0 조건

이 코드의 메시지는 단순하다: 1.2.5 에서 본 구면 적도 측지선을 *공변미분 0 조건* 으로 적분해, 적도가 정말 측지선임을 다시 확인한다. 같은 ODE 의 다른 표현이다.

```python
# 구면 측지선: D V / dt = 0
#   dV^θ/dt + Γ^θ_φφ V^φ V^φ = 0  →  V_dot^θ = sinθ cosθ (V^φ)²
#   dV^φ/dt + 2 Γ^φ_θφ V^θ V^φ = 0  →  V_dot^φ = -2 cotθ V^θ V^φ
# 그리고 dθ/dt = V^θ, dφ/dt = V^φ.
# 1.2.5 의 ODE 와 *수학적으로 같음*, 표기만 D V / dt 시점.
import numpy as np
from scipy.integrate import solve_ivp

def covariant_zero(t, y):
    theta, phi, Vth, Vph = y
    dtheta = Vth
    dphi = Vph
    dVth = np.sin(theta) * np.cos(theta) * Vph**2
    dVph = -2 * (np.cos(theta) / np.sin(theta)) * Vth * Vph
    return [dtheta, dphi, dVth, dVph]

y0 = [np.pi / 2, 0.0, 0.0, 0.5]
sol = solve_ivp(covariant_zero, (0, 6.0), y0, rtol=1e-10, atol=1e-12, dense_output=True)

t = np.linspace(0, 6, 200)
theta_t = sol.sol(t)[0]
print(f"θ(t) 평균:  {np.mean(theta_t):.6f}  (= π/2 기대)")
print(f"θ(t) 편차:  {np.std(theta_t):.2e}  (= 0 기대)")

# 속도 크기 일정 (평행이동은 길이 보존)
Vth_t, Vph_t = sol.sol(t)[2], sol.sol(t)[3]
speed_sq = Vth_t**2 + np.sin(theta_t)**2 * Vph_t**2  # |V|² = g_ij V^i V^j
print(f"|V|² 평균 = {np.mean(speed_sq):.6f},  편차 = {np.std(speed_sq):.2e}")
```

이 결과는 측지선이 *속도의 평행이동* 임을 다시 확인한다 — 그리고 그 속도의 *크기가 보존* 된다는 사실 (Levi-Civita 의 미터 호환성) 까지 수치로 드러난다.

## 다음 절(1.4.1)로 가는 다리

§1.2 와 §1.3 는 *$\mathbb R^3$ 안의 곡면* 이라는 발판 위에서 텐서·공변미분·측지선을 정의했다. 그러나 본 절까지의 모든 양 — 미터, 크리스토펠, 공변미분, 측지선 — 은 *임베딩과 무관* 한 *내재적* 양이다. 즉 곡면을 $\mathbb R^3$ 에 *박지 않고도* 그 양들을 정의할 수 있어야 한다. §1.4 는 그 작업을 본격적으로 한다 — 다양체의 형식적 정의로 들어간다.
