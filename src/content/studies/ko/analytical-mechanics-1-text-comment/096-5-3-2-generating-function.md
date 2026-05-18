---
title: '5.3.2 — 변환의 생성 함수: 4 가지 형식 $F_1, F_2, F_3, F_4$ 의 체계'
description: "함수 $F$ 의 *부분 미분* 으로 정준 변환을 자동 생성. $F_1(q, Q)$, $F_2(q, P)$, $F_3(p, Q)$, $F_4(p, P)$ — *어떤 두 변수* 를 독립으로 잡는가에 따라 4 가지. 항등·교환·작용-각 변수 등이 표준 예시."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 96
lang: ko
pairSlug: am1tc-5-3-2-generating-function
draft: false
updated: 2026-05-18
---

# 5.3.2 — 변환의 생성 함수: 4 가지 형식 $F_1, F_2, F_3, F_4$ 의 체계

> 함수 $F$ 의 *부분 미분* 으로 정준 변환을 자동 생성. $F_1(q, Q)$, $F_2(q, P)$, $F_3(p, Q)$, $F_4(p, P)$ — *어떤 두 변수* 를 독립으로 잡는가에 따라 4 가지. 항등·교환·작용-각 변수 등이 표준 예시.

## 본문이 말하는 것

§5.3.1 의 정준 변환 조건

$$
\Phi^*(P_\alpha\, dQ^\alpha) - p_\alpha\, dq^\alpha = dF
$$

(닫힌 적분 → 정확함, §1.6.6) 에서 $F$ 가 *변환의 생성 함수* (generating function, 모함수). $(q, p)$ 와 $(Q, P)$ 가 *4 자유 변수* 인데 *2n 자유* (정준 변환의 자유도) — 그래서 *2 개의 변수* 만 *독립* 으로 잡을 수 있다. 4 가지 조합:

**Type 1: $F_1(q, Q, t)$.**

$$
p_\alpha = \frac{\partial F_1}{\partial q^\alpha},\quad P_\alpha = -\frac{\partial F_1}{\partial Q^\alpha},\quad K = H + \frac{\partial F_1}{\partial t}
$$

**Type 2: $F_2(q, P, t) = F_1 + P_\alpha Q^\alpha$.**

$$
p_\alpha = \frac{\partial F_2}{\partial q^\alpha},\quad Q^\alpha = \frac{\partial F_2}{\partial P_\alpha},\quad K = H + \frac{\partial F_2}{\partial t}
$$

**Type 3: $F_3(p, Q, t) = F_1 - p_\alpha q^\alpha$.**

$$
q^\alpha = -\frac{\partial F_3}{\partial p_\alpha},\quad P_\alpha = -\frac{\partial F_3}{\partial Q^\alpha}
$$

**Type 4: $F_4(p, P, t) = F_2 - p_\alpha q^\alpha$.**

$$
q^\alpha = -\frac{\partial F_4}{\partial p_\alpha},\quad Q^\alpha = \frac{\partial F_4}{\partial P_\alpha}
$$

**대표 예시.**

- $F_2 = q^\alpha P_\alpha$ (Type 2): $p_\alpha = P_\alpha$, $Q^\alpha = q^\alpha$ — *항등 변환*.
- $F_1 = q^\alpha Q_\alpha$ (Type 1): $p_\alpha = Q_\alpha$, $P_\alpha = -q^\alpha$ — *$q \leftrightarrow p$ 교환* (부호 차이).
- $F_2 = (q + P)^2/2$ (Type 2): $p = q + P$, $Q = q + P$ — *평행이동·전단* 의 결합.

## 한 번 더, 천천히

**(1) "왜 4 가지" 의 *기하학*.** $(q, p, Q, P)$ 의 *4 변수 중 2 독립* 자유. *접번들·여접번들* 의 *부분공간* 4 가지 — 각각이 *Lagrangian submanifold* (심플렉틱 기하학). 본 절의 4 형식이 그 4 부분공간의 *생성 함수*.

**(2) 르장드르 변환 (§5.1.2) 의 자연스러운 확장.** $F_1 \to F_2$ 의 변환 $F_2 = F_1 + PQ$ 가 *르장드르 변환* — $Q \leftrightarrow P$ 의 *역할 교환*. 즉 4 형식이 *르장드르 변환의 가족*. 열역학의 $U, F, H, G$ 의 4 함수와 *완전히 같은 형식*.

**(3) 조화 진동자의 *작용-각 변수*.** $H = (p^2 + \omega^2 q^2)/2$. Type 1 생성 함수 $F_1(q, Q) = \frac{1}{2}\omega q^2 \cot Q$ 로 변환 $(q, p) \to (Q, P) = (\phi, J)$:

$$
J = \frac{p^2 + \omega^2 q^2}{2\omega} = \frac{H}{\omega},\quad \phi = \arctan(\omega q / p)
$$

새 해밀토니언 $K = \omega J$ — $J$ 만의 함수. 정준 방정식: $\dot J = 0$, $\dot \phi = \omega$. *완전히 풀린다*.

**(4) HJ 식의 *생성 함수* 정체.** Hamilton 의 주함수 $S(q, P, t)$ 가 Type 2 생성 함수. HJ 식 $\partial S/\partial t + H(q, \partial S/\partial q, t) = 0$ 의 의미: *새 해밀토니언 $K = 0$* — 변환된 좌표에서 *운동이 정지* — 따라서 $Q, P$ 가 *시간 상수* (초기 위치·운동량 의 역할). 운동의 *완전 해결*.

**(5) §5.4 의 정준 변환군과의 다리.** 생성 함수 가족이 *연결된 정준 변환 군* 의 *Lie 대수 같은 매개화*. 모든 작은 정준 변환이 *적당한 $F$* 로 표현된다 — *국소적 완전 매개화*.

**(6) 양자역학의 *유니타리 변환*.** $\hat U(F)$ — *생성 함수 $F$ 에 의해 결정되는 유니타리 변환*. *Glauber 변환*, *Bogoliubov 변환* 등이 정준 변환의 양자판. *Wigner 변환* + *Moyal 곱* 이 이 두 무대의 *형식적 다리*.

## 파이썬으로 확인 — 조화 진동자의 작용-각 변수

이 코드의 메시지는 단순하다: 1D 조화 진동자 $(q, p)$ 에서 작용-각 변수 $(\phi, J)$ 로 변환. 새 해밀토니언이 $H = \omega J$ — *각도 $\phi$ 에 무관*. 운동이 *각도의 균일 회전*.

```python
# 조화 진동자: H = (p² + ω² q²) / 2
# 생성 함수 F_1(q, φ) = (1/2) ω q² cot φ  (Type 1)
# 결과: J = (p² + ω² q²)/(2 ω) = H/ω, φ = arctan(ω q / p)
# 새 해밀토니언 K(J) = ω J — 균일 회전
import numpy as np
from scipy.integrate import solve_ivp

omega = 1.5  # 진동 각속도

# 원 좌표에서의 운동
def harmonic_qp(t, y):
    q, p = y
    return [p, -omega**2 * q]

# 작용-각 변수 변환
def to_action_angle(q, p):
    J = (p**2 + omega**2 * q**2) / (2 * omega)
    phi = np.arctan2(omega * q, p)  # 결정적인 분기로 [-π, π]
    return J, phi

def from_action_angle(J, phi):
    q = np.sqrt(2 * J / omega) * np.sin(phi)
    p = np.sqrt(2 * J * omega) * np.cos(phi)
    return q, p

# 초기조건: q_0 = 1, p_0 = 0
y0 = [1.0, 0.0]
sol = solve_ivp(harmonic_qp, (0, 10.0), y0, rtol=1e-10, atol=1e-12, dense_output=True)
ts = np.linspace(0, 10, 200)
q_t, p_t = sol.sol(ts)

# 작용-각 변수 계산
J_t = (p_t**2 + omega**2 * q_t**2) / (2 * omega)
phi_t = np.arctan2(omega * q_t, p_t)

print(f"조화 진동자, ω = {omega}")
print(f"\n원 좌표 (q, p) 의 시간 변화 — 진동")
print(f"  q(0) = {q_t[0]:.4f}, q(t=5) = {q_t[len(ts)//2]:.4f}, q(t=10) = {q_t[-1]:.4f}")

print(f"\n작용-각 변수 (J, φ) 의 시간 변화:")
print(f"  J 의 평균: {J_t.mean():.6f}, 변동폭: {np.ptp(J_t):.2e}")
print(f"  → J 는 *상수* (= H/ω = {omega/2:.4f})")
# φ 는 [-π, π] 안에서 균일 회전
# unwrap 하여 진짜 각도 측정
phi_unwrapped = np.unwrap(phi_t)
print(f"\n  φ(t) 의 변화율 (수치): {(phi_unwrapped[-1] - phi_unwrapped[0]) / (ts[-1] - ts[0]):.4f}")
print(f"  이론값 ω = {omega:.4f}")
print(f"  → 균일 회전 — 완전 적분된 운동")
```

이 결과는 *조화 진동자가 정준 변환에 의해 완전히 풀린다* 는 사실을 직접 확인. *작용-각 변수가 적분 가능 시스템의 표준 좌표* 라는 §5.2.4 의 결과의 가장 단순한 표본.

## 다음 절(5.4.1)로 가는 다리

지금까지의 정준 변환 정의는 *적분 불변식의 보존* 또는 *생성 함수* 의 존재. §5.4 가 더 정밀한 *심플렉틱 조건* — *자코비안 행렬 의 대수적 조건* — 으로 변환의 정준성을 *국소적으로* 검증하는 방법을 박는다.
