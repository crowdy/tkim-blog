---
title: '2.2.5 — 배위공간의 구속과 자유도의 삭감: 제1적분이 *차원을 줄인다*'
description: "순환 좌표가 만든 보존량 $p_\\alpha = C_\\alpha$ 를 이용해 자유도를 줄이는 *Routhian* 방법. 보존 식 한 줄이 자유도 하나를 *지운다* — 케플러 문제가 1차원 ODE 로 환원되는 자리."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 47
lang: ko
pairSlug: am1tc-2-2-5-reduction-of-freedom
draft: false
updated: 2026-05-18
---

# 2.2.5 — 배위공간의 구속과 자유도의 삭감: 제1적분이 *차원을 줄인다*

> 순환 좌표가 만든 보존량 $p_\alpha = C_\alpha$ 를 이용해 자유도를 줄이는 *Routhian* 방법. 보존 식 한 줄이 자유도 하나를 *지운다* — 케플러 문제가 1차원 ODE 로 환원되는 자리.

## 본문이 말하는 것

$n$ 자유도 계에서 순환 좌표 $q^\alpha$ ($\alpha = 1, \dots, k$) 가 있다고 하자. 일반화 운동량 $p_\alpha = \partial L / \partial \dot q^\alpha = C_\alpha$ (상수). 이 식 $k$ 개를 *해서* $\dot q^\alpha$ 를 *남은 자유도* 의 함수로 표현:

$$
\dot q^\alpha = \dot q^\alpha(q^\beta, \dot q^\beta, t; C_\alpha) \quad (\alpha: \text{순환}, \beta: \text{비순환})
$$

이걸 라그랑지언에 대입하면 *효과적 라그랑지언* (Routhian) 이 만들어진다:

$$
R(q^\beta, \dot q^\beta, t; C_\alpha) := L - \sum_{\alpha: \text{cyclic}} p_\alpha \dot q^\alpha = L - C_\alpha \dot q^\alpha
$$

(라그랑지언에서 순환 좌표의 *르장드르 변환* 만 수행.) $R$ 에 대한 라그랑주식 $\frac{d}{dt}\frac{\partial R}{\partial \dot q^\beta} - \frac{\partial R}{\partial q^\beta} = 0$ 가 *비순환 자유도* $q^\beta$ 만의 운동방정식 — *$k$ 자유도가 줄어든* $n - k$ 자유도 계.

**예시: 케플러 운동.** $L = \frac{1}{2} m (\dot r^2 + r^2 \dot\phi^2) + GMm/r$. $\phi$ 가 순환 → $p_\phi = m r^2 \dot\phi = \ell$ (상수). 풀면 $\dot\phi = \ell / (m r^2)$. Routhian:

$$
R = L - \ell \dot\phi = \frac{1}{2} m \dot r^2 + \frac{1}{2} \frac{\ell^2}{m r^2} + \frac{GMm}{r} - \frac{\ell^2}{m r^2} = \frac{1}{2} m \dot r^2 - \frac{\ell^2}{2 m r^2} + \frac{GMm}{r}
$$

— *$r$ 만의 1자유도 라그랑지언*. 효과적 위치에너지 $V_{\text{eff}}(r) = \ell^2 / (2 m r^2) - GMm/r$ 의 *원심 장벽* 이 자연스럽게 등장.

## 한 번 더, 천천히

**(1) 보존량 1개가 자유도 1개를 *지우는* 메커니즘.** $n$ 자유도 → $2n$ 차원 위상공간. 보존량 $f = C$ 한 식이 $(2n - 1)$ 차원 *부분다양체* 위에서만 운동을 허용. 거기에 *연속 대칭* 의 *흐름 방향* 까지 잘라내면 *2 차원 줄여서* $2(n - 1) = 2n - 2$ 차원의 *환원된 위상공간*. 그래서 *1 자유도 감소*.

**(2) Routhian 의 *반쪽 르장드르* 성격.** 모든 좌표에 대해 르장드르하면 *해밀토니언* (2.2.4). 순환 좌표에 대해서만 르장드르하면 *Routhian*. 즉 Routhian = *비순환 좌표의 라그랑지언 + 순환 좌표의 해밀토니언*. 라그랑지언과 해밀토니언 *사이의 중간 단계*.

**(3) 케플러의 *실용적 의미*.** 원래 2 자유도 (평면 운동) → 4 차원 위상공간. 각운동량 보존 + 에너지 보존 (= 2 자유도 → 1 자유도 → 0 자유도, 즉 *완전 적분 가능*). 케플러 궤도 (원·타원·포물선·쌍곡선) 가 *모두* 적분 가능한 이유. 일반 3-체 문제는 *적분 가능하지 않다* — 카오스 가능.

**(4) *환원된* 위상공간의 기하학.** 위 (1) 의 환원 절차는 *오일러-아놀드 환원* (Marsden–Weinstein) 의 학부 표본. *대칭 군 $G$* (예: $SO(2)$ — 회전군) 의 작용 아래 위상공간을 quotient 해 *환원 위상공간* $T^*M/G$ 를 만든다. 일반상대론·게이지 이론의 *모듈러 공간* 의 발상.

**(5) 비순환 좌표의 *유효 위치에너지*.** Routhian 으로 환원하면 *유효 위치에너지* $V_{\text{eff}}(q^\beta; C_\alpha)$ 가 등장 — 보존량 $C_\alpha$ 의 *값* 에 의존. 케플러의 *원심 장벽* $\ell^2 / (2 m r^2)$ 이 그것 — 각운동량이 클수록 *작은 $r$ 로 가기 어렵다* 는 *유효 척력*.

## 파이썬으로 확인 — 케플러: 2자유도 vs Routhian 1자유도

이 코드의 메시지는 단순하다: 케플러 운동을 (a) 2자유도 $(r, \phi)$ 의 직접 적분과 (b) Routhian 으로 *1자유도 $r$* 만 적분 — 둘이 같은 $r(t)$ 를 만들고, $\phi(t) = \int \ell/(m r^2)\, dt$ 로 $\phi$ 가 *후처리* 됨을 본다.

```python
# 케플러 (평면): L = (1/2) m (ṙ² + r² φ̇²) + GMm/r
# φ 순환 → p_φ = m r² φ̇ = ℓ 보존
# Routhian: R(r, ṙ) = (1/2) m ṙ² - ℓ²/(2 m r²) + GMm/r
# R 에 대한 EL: m r̈ = ℓ²/(m r³) - GMm/r²  →  r̈ = ℓ²/(m² r³) - GM/r²
import numpy as np
from scipy.integrate import solve_ivp

m, GM = 1.0, 1.0
ell = 1.2  # 각운동량 (보존)

# (a) 2자유도 직접
def kepler_2dof(t, y):
    r, phi, dr, dphi = y
    ddr = r * dphi**2 - GM / r**2
    ddphi = -2 * dr * dphi / r
    return [dr, dphi, ddr, ddphi]

y0_a = [1.0, 0.0, 0.0, 1.2]  # 위 와 일치: ℓ = m r² φ̇ = 1·1·1.2 = 1.2
sol_a = solve_ivp(kepler_2dof, (0, 20.0), y0_a,
                  rtol=1e-10, atol=1e-12, dense_output=True)

# (b) Routhian 1자유도
def kepler_routhian(t, y):
    r, dr = y
    ddr = ell**2 / (m**2 * r**3) - GM / r**2
    return [dr, ddr]

y0_b = [1.0, 0.0]
sol_b = solve_ivp(kepler_routhian, (0, 20.0), y0_b,
                  rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 20, 500)
r_a = sol_a.sol(ts)[0]
r_b = sol_b.sol(ts)[0]

# 두 r(t) 가 같은가?
diff = np.max(np.abs(r_a - r_b))
print(f"2자유도 vs Routhian 의 max |r 차이|: {diff:.2e}")

# 후처리로 φ(t) 복원: dφ/dt = ℓ/(m r²)
from scipy.integrate import cumulative_trapezoid
dphi_b = ell / (m * r_b**2)
phi_b = cumulative_trapezoid(dphi_b, ts, initial=0.0)

phi_a = sol_a.sol(ts)[1]
diff_phi = np.max(np.abs(phi_a - phi_b))
print(f"2자유도 vs Routhian+후처리 의 max |φ 차이|: {diff_phi:.2e}")
print(f"\n→ Routhian 방법이 *완전히* 같은 운동을 만든다 (1차원 ODE 로 환원).")
```

이 결과는 *2 차원의 결합된 ODE 가 1 차원의 ODE + 1 번의 적분* 으로 환원됨을 보인다. *제1적분 한 개 = 자유도 한 개 감소* 의 정량적 의미.

## 다음 절(2.3.1)로 가는 다리

§2.1 에서 §2.2 까지의 라그랑주 역학은 *좌표 표현* 에 의존했다. *좌표 자유* 한 기하학적 표현으로 다시 적을 수 있을까? §1.6 에서 깐 *미분형식 + 외미분* 어휘로 답한다. 2.3.1 의 *기본 1-형식과 기본 2-형식* 이 라그랑주 역학을 *좌표 없는 기하학적* 객체로 박는 출발점.
