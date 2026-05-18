---
title: '2.4.2 — 비푸앵카레 방정식: 준좌표 위의 라그랑주식과 구조 상수의 등장'
description: "준좌표 $\\omega^i$ 위에서의 운동방정식 (Boltzmann–Hamel 식). 적분 불가능의 대가로 *구조 상수* $\\gamma^k_{ij}$ 항이 등장하고, 강체의 경우 정확히 Euler 의 회전 방정식이 떨어진다."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 51
lang: ko
pairSlug: am1tc-2-4-2-non-poincare-equation
draft: false
updated: 2026-05-18
---

# 2.4.2 — 비푸앵카레 방정식: 준좌표 위의 라그랑주식과 구조 상수의 등장

> 준좌표 $\omega^i$ 위에서의 운동방정식 (Boltzmann–Hamel 식). 적분 불가능의 대가로 *구조 상수* $\gamma^k_{ij}$ 항이 등장하고, 강체의 경우 정확히 Euler 의 회전 방정식이 떨어진다.

## 본문이 말하는 것

준좌표 $\omega^i$ 와 그 *적분 불가능* 한 1-형식 $\sigma^i$ 사이의 외미분에서 *구조 상수* 가 정의된다:

$$
d\sigma^k = -\frac{1}{2}\, \gamma^k_{\;ij}\, \sigma^i \wedge \sigma^j
$$

(아인슈타인 합 규약, $\gamma^k_{ij} = -\gamma^k_{ji}$.) 적분 가능한 경우 $d\sigma^k = 0$ 이라 $\gamma^k_{ij} = 0$. 적분 불가능이면 $\gamma^k_{ij} \neq 0$ — *비가환성의 정량적 측정*.

**Boltzmann–Hamel 방정식** (또는 비푸앵카레식, 원서: 非ボアンカレ方程式). 라그랑지언을 $L = L(q, \omega, t)$ 로 적고 (준좌표 위에서), 운동방정식은

$$
\frac{d}{dt} \frac{\partial L}{\partial \omega^k} - \frac{\partial L}{\partial \omega^k}\bigg|_{\text{shift}} + \gamma^l_{\;ki}\, \omega^i\, \frac{\partial L}{\partial \omega^l} - \frac{\partial L}{\partial q^\alpha}\, b_k^{\;\alpha} = 0
$$

여기서 두 번째 항은 *준좌표 미분으로 옮긴 좌표 미분*, $b_k^{\;\alpha}$ 는 $a^i_{\;\alpha}$ 의 역행렬. 라그랑주식과 다른 점이 *셋째 항* — *구조 상수가 만드는 추가 결합*. 적분 가능 경우 ($\gamma = 0$) 면 보통 라그랑주식.

**강체 회전의 경우.** 자유 회전 강체의 라그랑지언 (외력 없음, 회전만)

$$
L = T = \frac{1}{2} (I_1 \omega_1^2 + I_2 \omega_2^2 + I_3 \omega_3^2)
$$

($I_i$ 는 주관성 모멘트). $SO(3)$ 의 구조 상수 $\gamma^k_{ij} = \varepsilon_{ijk}$ (§1.4.10). Boltzmann–Hamel 식이 정확히

$$
I_1 \dot\omega_1 = (I_2 - I_3) \omega_2 \omega_3, \quad I_2 \dot\omega_2 = (I_3 - I_1) \omega_3 \omega_1, \quad I_3 \dot\omega_3 = (I_1 - I_2) \omega_1 \omega_2
$$

— *Euler 의 회전 방정식*. 강체 역학의 가장 유명한 방정식이 *준좌표 위 라그랑주식의 특수 경우*.

## 한 번 더, 천천히

**(1) 구조 상수의 *기하학* 출처.** §1.4.10 의 *좌불변 벡터장의 리 괄호 구조 상수* 와 본 절의 $\gamma^k_{ij}$ 가 *같은 것*. 강체의 경우 $SO(3)$ 의 리 대수 $\mathfrak{so}(3)$ 의 구조 상수가 *Euler 식의 비선형 항* 으로 직접 들어간다.

**(2) Euler 식의 *물리적* 의미.** 강체가 *비대칭* ($I_1 \neq I_2 \neq I_3$) 이면 회전축이 *시간에 따라 움직인다*. 예: 펜을 공중에 던지면 *흔들리는 회전*. 안정한 회전축은 *가장 큰* 와 *가장 작은* 주관성 모멘트 축 — *중간* 축은 *불안정*. 이게 "Dzhanibekov 효과" 또는 "테니스 라켓 정리".

**(3) 비푸앵카레식이 *비푸앵카레* 인 이유.** Henri Poincaré 가 1901년 *적분 가능 좌표* 위의 (보통) 라그랑주식의 일반화를 *Poincaré 방정식* 으로 처음 적었다. *비푸앵카레식* 은 그 적분 불가능 일반화 — Boltzmann (1902) 과 Hamel (1903) 의 작업. 일본어 원서가 *非ボアンカレ* 라 적은 것은 이 역사적 명명을 따르는 것.

**(4) 게이지 이론과의 연결.** Yang–Mills 이론의 *공변 도함수* 가 비푸앵카레식의 구조 상수 부분과 정확히 같은 형식. 즉 *비가환 게이지 이론* = *준좌표 위의 라그랑주식의 시공간 일반화*. 학부 해석역학에서 *현대 입자 물리* 로 가는 다리.

**(5) 실용적 활용.** 위성 자세 제어, 휴머노이드 로봇의 다리·팔 동력학, 자이로스코프 — 모두 *몸체 좌표계의 각속도* 를 일차 변수로 다루는 *준좌표 방식*. 좌표 잡기의 자유로움이 *계산의 단순함* 으로 이어진다.

## 파이썬으로 확인 — 자유 회전 강체의 Euler 식 + Dzhanibekov 효과

이 코드의 메시지는 단순하다: 비대칭 강체 ($I_1 = 1, I_2 = 2, I_3 = 3$) 의 자유 회전을 Euler 식으로 적분, *중간 축* 회전의 *불안정성* (Dzhanibekov 효과) 을 보인다.

```python
# Euler 식 (자유 회전): I_i ω̇_i = (I_j - I_k) ω_j ω_k (cyclic)
# I_1 < I_2 < I_3 로 설정
# 초기조건 (a): ω = (0, 1, 0.001) — 중간 축 (I_2) 회전 + 작은 perturbation
# 결과: ω 가 *큰 진폭* 으로 흔들림 — 불안정
import numpy as np
from scipy.integrate import solve_ivp

I1, I2, I3 = 1.0, 2.0, 3.0  # 비대칭 강체

def euler_rotation(t, w):
    w1, w2, w3 = w
    dw1 = (I2 - I3) * w2 * w3 / I1
    dw2 = (I3 - I1) * w3 * w1 / I2
    dw3 = (I1 - I2) * w1 * w2 / I3
    return [dw1, dw2, dw3]

# (a) 중간 축 회전 — 불안정
w0_mid = [0.001, 1.0, 0.001]
sol_a = solve_ivp(euler_rotation, (0, 20.0), w0_mid,
                  rtol=1e-10, atol=1e-12, dense_output=True)

# (b) 큰 축 (I_3) 회전 — 안정
w0_large = [0.001, 0.001, 1.0]
sol_b = solve_ivp(euler_rotation, (0, 20.0), w0_large,
                  rtol=1e-10, atol=1e-12, dense_output=True)

# (c) 작은 축 (I_1) 회전 — 안정
w0_small = [1.0, 0.001, 0.001]
sol_c = solve_ivp(euler_rotation, (0, 20.0), w0_small,
                  rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 20, 500)

# 각 축에서 ω 의 범위 (perturbation 이 *시간이 지나도 작게 유지되는가*)
def report_stability(sol, name, main_axis):
    w = sol.sol(ts)
    other = [i for i in range(3) if i != main_axis]
    perturb_size = np.max(np.abs(w[other[0]])) + np.max(np.abs(w[other[1]]))
    print(f"{name}: ω_perturb_max = {perturb_size:.4f}")

report_stability(sol_a, "(a) 중간 축 I_2 회전", main_axis=1)
report_stability(sol_b, "(b) 큰 축   I_3 회전", main_axis=2)
report_stability(sol_c, "(c) 작은 축 I_1 회전", main_axis=0)

# 보존량 확인:
# 에너지 E = (1/2)(I_1 ω_1² + I_2 ω_2² + I_3 ω_3²)
# 각운동량 제곱 L² = (I_1 ω_1)² + (I_2 ω_2)² + (I_3 ω_3)²
def energy_and_Lsq(w_history):
    E = 0.5 * (I1 * w_history[0]**2 + I2 * w_history[1]**2 + I3 * w_history[2]**2)
    Lsq = (I1 * w_history[0])**2 + (I2 * w_history[1])**2 + (I3 * w_history[2])**2
    return np.ptp(E), np.ptp(Lsq)

E_a, L_a = energy_and_Lsq(sol_a.sol(ts))
print(f"\n중간 축 회전: E 변동 = {E_a:.2e}, L² 변동 = {L_a:.2e} (둘 다 보존)")
```

이 결과는 (a) 중간 축 회전이 *큰 perturbation* 으로 발산 (불안정), (b)/(c) 양 끝 축 회전은 *작은 perturbation* 으로 안정함을 보인다. Euler 식 — *비푸앵카레식의 가장 유명한 특수 경우* — 의 비선형성이 만드는 비자명한 안정성 분기.

## 다음 절(2.5.1)로 가는 다리

§2.4 의 준좌표는 *자유* 좌표의 비적분 가능 결합이었다 — 자유도 수는 그대로. 그러나 *물리적 구속 자체* 가 적분 불가능한 경우 — 굴러가지만 미끄러지지 않는 동전, 스케이트 날 — 가 있다. 그 자리에 등장하는 새 형식이 §2.5 의 *비홀로노믹 구속* + 라그랑주 곱셈자. 다음 §2.5 가 *구속력 의 라그랑주 표현* 부터 시작.
