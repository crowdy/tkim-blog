---
title: '2.1.4 — 일반화 포텐셜: 속도에 의존하는 힘도 라그랑주 형식으로'
description: "$U(q, \\dot q, t)$ 의 일반화 포텐셜 — 속도에 의존하는 힘을 라그랑주식 안에 흡수하는 형식. 로렌츠 힘이 가장 중요한 예시로, 전자기 벡터 포텐셜이 일반화 포텐셜로 등장."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 41
lang: ko
pairSlug: am1tc-2-1-4-generalized-potential
draft: false
updated: 2026-05-18
---

# 2.1.4 — 일반화 포텐셜: 속도에 의존하는 힘도 라그랑주 형식으로

> $U(q, \dot q, t)$ 의 일반화 포텐셜 — 속도에 의존하는 힘을 라그랑주식 안에 흡수하는 형식. 로렌츠 힘이 가장 중요한 예시로, 전자기 벡터 포텐셜이 일반화 포텐셜로 등장.

## 본문이 말하는 것

지금까지의 위치에너지 $V(q, t)$ 는 *속도와 무관*. 그러나 일반화 힘이 *속도에 의존* 하더라도, 다음 형식의 함수 $U(q, \dot q, t)$ 가 존재해

$$
Q_\alpha = -\frac{\partial U}{\partial q^\alpha} + \frac{d}{dt} \frac{\partial U}{\partial \dot q^\alpha}
$$

라면 *라그랑주식* 의 보존력 처리에 자연스럽게 끼어들 수 있다. 이 $U$ 가 **일반화 포텐셜** (generalized potential).

$L = T - U$ 로 정의하면

$$
\frac{d}{dt} \frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = \frac{d}{dt}\left(\frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial U}{\partial \dot q^\alpha}\right) - \frac{\partial T}{\partial q^\alpha} + \frac{\partial U}{\partial q^\alpha} = 0
$$

이게 정리되면

$$
\frac{d}{dt}\frac{\partial T}{\partial \dot q^\alpha} - \frac{\partial T}{\partial q^\alpha} = -\frac{\partial U}{\partial q^\alpha} + \frac{d}{dt}\frac{\partial U}{\partial \dot q^\alpha} = Q_\alpha
$$

— 정확히 위 일반화 힘 식.

**로렌츠 힘.** 전하 $e$ 인 입자가 전자기장 $(\mathbf{E}, \mathbf{B})$ 안에서 받는 힘

$$
\mathbf{F} = e\, (\mathbf{E} + \mathbf{v} \times \mathbf{B})
$$

— 속도 $\mathbf{v}$ 에 *명시적* 으로 의존. 스칼라·벡터 포텐셜 $(\phi, \mathbf{A})$ 로 $\mathbf{E} = -\nabla \phi - \partial \mathbf{A}/\partial t$, $\mathbf{B} = \nabla \times \mathbf{A}$. 일반화 포텐셜

$$
U = e\, \phi - e\, \mathbf{A} \cdot \mathbf{v}
$$

이게 위 일반화 힘 정의를 만족함 (계산은 본문). 그래서 *전하의 라그랑지언*

$$
L = \frac{1}{2} m\, |\mathbf{v}|^2 - e\, \phi + e\, \mathbf{A} \cdot \mathbf{v}
$$

라그랑주식이 자동으로 로렌츠 힘을 만든다.

## 한 번 더, 천천히

**(1) 위치에너지의 *일반화*.** 보통 $V(q)$ 는 *시간·속도 무관*. $V(q, t)$ 가 시간 의존 허용 (2.1.2). $U(q, \dot q, t)$ 가 *속도까지* 허용 — 한 단계 더 일반화. 라그랑지언 형식의 *수용 범위* 가 확장.

**(2) 일반화 포텐셜의 *조건*.** 임의의 속도 의존 힘이 일반화 포텐셜을 갖는 것은 *아니다*. 마찰력 $\mathbf{F} = -\gamma \mathbf{v}$ 는 일반화 포텐셜이 없다 (Rayleigh dissipation function 같은 *별* 도구 필요). 일반화 포텐셜의 *존재 조건* 은 힘이 일종의 *닫힌 형식* (1-형식 측면) 일 것 — 본문은 명시적으로 다루지 않으나, 게이지 이론에서 자연스럽게 등장.

**(3) 로렌츠 힘의 *기하학적* 정체.** $L$ 의 추가 항 $e \mathbf{A} \cdot \mathbf{v}$ 는 *시공간 위의 1-형식* $e\, A$ 의 곡선 위 적분 (작용에서). 이게 *게이지 이론의 작용 형식* — Yang–Mills 의 학부 표본. 게이지 변환 $\mathbf{A} \to \mathbf{A} + \nabla \chi$ 이 라그랑지언에 *전미분* 만 더하므로 운동 무관 (2.1.5 의 결과).

**(4) 일반 상대론으로의 다리.** 일반상대론의 자유낙하 입자의 라그랑지언

$$
L = -m c^2 \sqrt{-g_{\mu\nu} \dot x^\mu \dot x^\nu}
$$

도 *일종의 일반화 포텐셜* — 미터 $g_{\mu\nu}$ 가 위치+속도 결합 양으로 들어감. 라그랑지언 형식의 *깊이* 가 *시공간 기하* 의 일반화를 자연스럽게 수용.

## 파이썬으로 확인 — 균일 자기장 안 전하 입자의 *원운동*

이 코드의 메시지는 단순하다: 균일 자기장 $\mathbf{B} = B \hat{\mathbf{z}}$ 안에서 일반화 포텐셜 라그랑지언 $L = \frac{1}{2}m|\mathbf{v}|^2 + e \mathbf{A} \cdot \mathbf{v}$ 가 만드는 운동이 *사이클로트론 주파수* $\omega = eB/m$ 의 원운동임을 본다.

```python
# 균일 B = B z_hat, 벡터 포텐셜 A = (-By/2, Bx/2, 0) (대칭 게이지)
# 라그랑주식이 만드는 운동: 사이클로트론 원운동, 주파수 ω = eB/m
import numpy as np
from scipy.integrate import solve_ivp

m, e, B = 1.0, 1.0, 2.0  # 입자 질량, 전하, 자기장 강도

# 로렌츠 힘의 좌표 표현: F = e (v × B) = e B (vy, -vx, 0)
# 라그랑주식 직접 적분 — 사실 뉴턴식과 같음
def lorentz_orbit(t, state):
    x, y, z, vx, vy, vz = state
    # F = e v × B = e (vy*B - vz*0, vz*0 - vx*B, vx*0 - vy*0) = (e B vy, -e B vx, 0)
    Fx = e * B * vy
    Fy = -e * B * vx
    Fz = 0.0
    return [vx, vy, vz, Fx/m, Fy/m, Fz/m]

# 초기조건: x=1, y=0, vx=0, vy=1
sol = solve_ivp(lorentz_orbit, (0, 4 * np.pi), [1.0, 0.0, 0.0, 0.0, 1.0, 0.0],
                rtol=1e-10, atol=1e-12, dense_output=True)

ts = np.linspace(0, 4 * np.pi, 200)
x, y = sol.sol(ts)[0], sol.sol(ts)[1]

# 사이클로트론 주파수
omega_c = e * B / m
print(f"사이클로트론 주파수 ω_c = eB/m = {omega_c:.4f} rad/s")
print(f"기대 주기 = 2π/ω_c = {2 * np.pi / omega_c:.4f} s")

# 궤도 반지름 = v_⊥/ω_c
v_perp = np.sqrt(0.0**2 + 1.0**2)
r_expected = v_perp / omega_c
print(f"기대 반지름 = v_⊥/ω_c = {r_expected:.4f}")
print(f"실제 궤도 반지름 (평균) = {np.mean(np.sqrt((x - np.mean(x))**2 + (y - np.mean(y))**2)):.4f}")

# 에너지 보존 확인 (일반화 포텐셜은 시간 무관이라 H 가 보존)
vx_t, vy_t = sol.sol(ts)[3], sol.sol(ts)[4]
KE = 0.5 * m * (vx_t**2 + vy_t**2)
print(f"\n운동에너지 변동: ptp = {np.ptp(KE):.2e}  (= 0 기대 — 자기장은 일 안 함)")
```

이 결과는 (a) 운동이 *사이클로트론 원운동*, (b) 자기장이 *일을 하지 않아 운동에너지 보존* — 일반화 포텐셜의 *시간 무관성* 의 결과 — 임을 수치로 확인한다.

## 다음 절(2.1.5)로 가는 다리

같은 자기장은 *서로 다른 벡터 포텐셜* 로 표현 가능 — 게이지 자유도가 있다. 벡터 포텐셜이 바뀌면 라그랑지언도 바뀌지만, *운동은 같다*. 그 *라그랑지언의 자유* 가 2.1.5 의 **게이지 변환** — *전미분만큼 더해진 라그랑지언이 같은 운동을 만든다* 는 핵심 정리.
