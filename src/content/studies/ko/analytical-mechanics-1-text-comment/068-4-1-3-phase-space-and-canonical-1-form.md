---
title: '4.1.3 — 상공간과 정준 1-형식: 해밀턴 역학의 무대'
description: "위상공간 $T^*M$ 의 좌표 $(q^\\alpha, p_\\alpha)$. 그 위에 자연스럽게 정의되는 *정준 1-형식* $\\theta = p_\\alpha dq^\\alpha$. 그 외미분 $\\omega = d\\theta = dp_\\alpha \\wedge dq^\\alpha$ 가 *심플렉틱 2-형식*."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 68
lang: ko
pairSlug: am1tc-4-1-3-phase-space-and-canonical-1-form
draft: false
updated: 2026-05-18
---

# 4.1.3 — 상공간과 정준 1-형식: 해밀턴 역학의 무대

> 위상공간 $T^*M$ 의 좌표 $(q^\alpha, p_\alpha)$. 그 위에 자연스럽게 정의되는 *정준 1-형식* $\theta = p_\alpha dq^\alpha$. 그 외미분 $\omega = d\theta = dp_\alpha \wedge dq^\alpha$ 가 *심플렉틱 2-형식*.

## 본문이 말하는 것

**상공간** (phase space) $T^*M$ — 배위공간 $M$ 의 *여접번들* (§1.6.1 회수). 점이 *위치 $q \in M$ + 그 점의 코벡터 $p \in T_q^*M$*. 한 점이 *역학 시스템의 상태* — 위치와 운동량의 결합.

차원: $\dim T^*M = 2 \dim M = 2n$.

차트 좌표: $M$ 의 차트 $(q^\alpha)$ 에 대응하는 $T^*M$ 의 차트는 $(q^\alpha, p_\alpha)$ — $p_\alpha$ 는 *기저 코벡터 $dq^\alpha$ 의 성분*. $\alpha = 1, \dots, n$ 이라 총 $2n$ 개의 좌표.

**정준 1-형식** (canonical 1-form, *tautological 1-form*) $\theta$ on $T^*M$:

$$
\theta := p_\alpha\, dq^\alpha
$$

— 좌표 표현. 의미: *위상공간의 한 점* $(q, p)$ 에서, *기저 다양체 $M$ 의 1-형식 $p \in T_q^*M$* 을 *그 점에서의 $T^*M$ 의 1-형식* 으로 *당겨 올린* 자연스러운 양.

**심플렉틱 2-형식** $\omega$ on $T^*M$:

$$
\omega := -d\theta = dq^\alpha \wedge dp_\alpha = -dp_\alpha \wedge dq^\alpha
$$

(부호는 본 책의 규약. 다른 책은 부호가 반대일 수도 있음.) $\omega$ 의 성질:

- *닫혀 있음*: $d\omega = -d^2 \theta = 0$.
- *비퇴화*: 모든 점에서 $\omega$ 가 비-degenerate (2-형식으로서 *짝지어 비-zero*).

이 두 성질이 *심플렉틱 구조* 의 정의 (§4.2.1).

## 한 번 더, 천천히

**(1) $\theta$ 의 *좌표 자유* 정의.** $T^*M$ 의 한 점 $(q, \omega_q)$ ($\omega_q \in T_q^*M$) 에 대해 사영 $\pi : T^*M \to M$. $\theta$ 의 *접벡터 $X$ 에 대한 작용* 은

$$
\theta(X) := \omega_q(\pi_*\, X)
$$

— 위상공간 접벡터 $X$ 를 *기저로 사영한 결과* 에 *$T^*M$ 점의 코벡터* 를 작용. *어떤 좌표를 잡든* 같은 정의. 좌표 표현 $\theta = p_\alpha dq^\alpha$ 가 이 추상적 정의의 *국소 표현*.

**(2) "정준" 의 의미.** *Canonical* — *공인된*, *표준의*. $T^*M$ 의 *모든* 추가 구조 (예: 미터, 접속) 와 *독립* 으로 정의됨. *번들 구조 자체에서 자연스럽게 떨어지는* 객체. *정준 1-형식* 이 그 대표.

**(3) §2.3.1 의 기본 1-형식 $\theta_L$ 과의 관계.** 라그랑주의 기본 1-형식 $\theta_L = (\partial L/\partial \dot q^\alpha) dq^\alpha = p_\alpha dq^\alpha$ on $TM$. *르장드르 변환* $TM \to T^*M$ 으로 옮기면 정확히 $\theta$. 두 형식이 *같은 객체의 다른 표현*.

**(4) 위상공간의 *방향성*.** $\omega$ 의 $n$ 제곱 $\omega^n = \omega \wedge \cdots \wedge \omega$ ($n$ 번) 이 *체적 형식* — *Liouville 측도*. $T^*M$ 이 *자동으로 방향성 있는* 다양체. §4.4.4 의 리우빌 정리의 출발점.

**(5) 양자역학으로의 다리.** 정준 양자화에서 *심플렉틱 형식 $\omega$* 가 *교환 관계 $[q, p] = i\hbar$* 로 옮겨진다. *Weyl 양자화* 가 이 옮김의 표준 형식. 양자역학의 *기본 대수* 가 *심플렉틱 기하학의 양자판*.

## 파이썬으로 확인 — 단진자의 상포트레이트

이 코드의 메시지는 단순하다: 단진자의 운동을 위상공간 $(q, p)$ 에서 시각화. *에너지 보존 곡선* 이 폐곡선 (작은 진폭) 또는 회전 (큰 진폭, separatrix 너머) 으로 나타난다.

```python
# 단진자 위상공간 도식
# H = p²/(2 m ℓ²) - m g ℓ cos θ
# 다양한 초기 에너지에서 궤적을 그리면 상포트레이트
import numpy as np
from scipy.integrate import solve_ivp

m, ell, g = 1.0, 1.0, 9.81

def hamilton(t, y):
    theta, p = y
    return [p / (m * ell**2), -m * g * ell * np.sin(theta)]

# 여러 초기 에너지에서 적분
initial_conditions = [
    (np.pi/6, 0.0, "작은 진동"),
    (np.pi/3, 0.0, "중간 진동"),
    (np.pi*0.9, 0.0, "큰 진동"),
    (0.0, 6.0, "회전 (separatrix 너머)"),
]

# 에너지 값 계산 (위상공간 H 보존 등고선)
for theta0, p0, name in initial_conditions:
    H0 = p0**2 / (2 * m * ell**2) - m * g * ell * np.cos(theta0)
    # 적분 (충분히 긴 시간 — 폐곡선 추적)
    sol = solve_ivp(hamilton, (0, 4.0), [theta0, p0],
                    rtol=1e-10, atol=1e-12, dense_output=True)
    ts = np.linspace(0, 4, 1000)
    theta_t, p_t = sol.sol(ts)
    # 에너지 보존 검증
    H_t = p_t**2 / (2 * m * ell**2) - m * g * ell * np.cos(theta_t)
    print(f"{name:<30}  E={H0:+.4f},  ΔH={np.ptp(H_t):.2e},  θ 범위 [{theta_t.min():+.2f}, {theta_t.max():+.2f}]")

# Separatrix 의 에너지: E_sep = m g ℓ (수직 위)
E_sep = m * g * ell
print(f"\nSeparatrix 에너지 E_sep = m g ℓ = {E_sep:.4f}")
print("→ E < E_sep: 진동 (폐곡선), E > E_sep: 회전 (열린 곡선)")
```

이 결과는 *위상공간이 운동을 시각화하는 자연스러운 무대* 임을 보인다. 단진자의 *상포트레이트* (작은 진동 → 큰 진동 → separatrix → 회전) 가 *에너지 등고선* 으로 자동 분류된다.

## 다음 절(4.1.4)로 가는 다리

상공간은 *심플렉틱 구조 $\omega$* 를 기본 구조로 가진다. 그러나 *추가* 로 *리만 계량* 을 박을 수도 있다 — 상공간 위에서 *거리* 를 정의하는 일. 4.1.4 가 이 *부가 구조* 의 의미를 짚는다.
