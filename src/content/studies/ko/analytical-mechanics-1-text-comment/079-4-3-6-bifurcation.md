---
title: '4.3.6 — 평형해의 안정·불안정과 분기: 매개변수 변화의 *질적 변환*'
description: "매개변수가 임계값을 넘을 때 평형점이 *생성·소멸·교환* 한다 — 분기. saddle-node, transcritical, pitchfork, Hopf — 4 가지 표준 분기의 정체."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 79
lang: ko
pairSlug: am1tc-4-3-6-bifurcation
draft: false
updated: 2026-05-18
---

# 4.3.6 — 평형해의 안정·불안정과 분기: 매개변수 변화의 *질적 변환*

> 매개변수가 임계값을 넘을 때 평형점이 *생성·소멸·교환* 한다 — 분기. saddle-node, transcritical, pitchfork, Hopf — 4 가지 표준 분기의 정체.

## 본문이 말하는 것

**분기** (bifurcation): 매개변수 $\mu$ 를 갖는 시스템 $\dot x = f(x, \mu)$ 에서, *어떤 임계값* $\mu = \mu_c$ 에서 평형점·주기해의 *질적 구조* 가 변하는 현상.

**대표 4 종 분기** (1차원 매개변수 + 1자유도 정규형).

**(1) Saddle-node**: $\dot x = \mu - x^2$. 

- $\mu > 0$: 두 평형점 $\pm \sqrt\mu$ (안정·불안정 쌍).
- $\mu = 0$: 한 평형점 (degenerate).
- $\mu < 0$: 평형점 없음.

*평형점의 생성·소멸*.

**(2) Transcritical**: $\dot x = \mu x - x^2$. 두 평형점 ($x = 0$ 과 $x = \mu$) 가 $\mu = 0$ 에서 *교환* — 안정성이 바뀜.

**(3) Pitchfork**: $\dot x = \mu x - x^3$. $\mu < 0$: 안정 평형 1 개 ($x = 0$). $\mu > 0$: 불안정 평형 ($x = 0$) + 안정 평형 2 개 ($\pm\sqrt\mu$). 대칭 깨짐의 표본.

**(4) Hopf**: 2차원 시스템에서 *고유값이 복소* 인 평형점이, 매개변수 변화로 고유값의 *실수 부분이 부호* 변할 때. *극한 주기 발생* (super-critical) 또는 *불안정 주기 소멸* (sub-critical).

각 분기는 *정규형* (normal form) — 위 식의 형태 — 의 *변형* 으로 모든 유사 분기가 다 표현. 이게 *분기 이론의 핵심 정리*.

## 한 번 더, 천천히

**(1) "정규형" 의 *위력*.** 임의의 매끄러운 함수 $f(x, \mu)$ 가 분기 점에서 어떤 *국소 좌표 변환* 으로 *4 종 정규형 중 하나* 와 동등 (universally). 즉 *모든 분기는 4 종 중 하나*. 매개변수 1 개의 경우.

**(2) 매개변수 2 개 이상.** *Cusp 분기*, *Bogdanov–Takens 분기* 등 더 복잡한 분기. *재해 이론* (catastrophe theory) 이 이를 분류 (Thom).

**(3) 물리적 예.** 

- 단진자에 외력 추가 $\ddot \theta = -\sin\theta + \mu$ — saddle-node 분기 (외력이 충분히 크면 평형점 사라짐).
- 회전 후프 위 구슬 (2.1.2 회수) — *pitchfork 분기* (회전속도 임계 너머에서 적도가 불안정해지고 새 평형점 발생).
- 1차원 산란 — saddle-node 의 *시간 의존* 형식.
- Belousov–Zhabotinsky 반응 — Hopf 분기 + 카오스.

**(4) 분기 다이어그램.** $\mu$ 가로축, 평형점 $x^*$ 세로축. 평형점의 *위치 변화* + 안정성 (실선 = 안정, 점선 = 불안정) 을 한 그림에. 분기 분석의 *표준 시각화 도구*.

**(5) §2.1.2 의 회전 후프 회수.** 회전 후프 위 구슬의 평형점 $\theta_e$ 가 $\cos\theta_e = g/(R\Omega^2)$ — $\Omega^2 = g/R$ 에서 분기. *pitchfork* — 새 평형점이 한 쌍씩 생성. 본 절의 어휘로 정확히 분류.

## 파이썬으로 확인 — 회전 후프 (pitchfork 분기)

이 코드의 메시지는 단순하다: 회전 후프의 평형점 위치 $\theta_e$ 와 안정성을 회전속도 $\Omega$ 에 대해 그린다. $\Omega^2 < g/R$ 에서 적도 $\theta = 0$ 만 안정, 그 너머에서 적도 불안정 + 새 평형점 한 쌍 발생.

```python
# 회전 후프: θ¨ = (Ω² cos θ - g/R) sin θ
# 평형점: sin θ = 0 (θ = 0, π) 또는 cos θ = g/(R Ω²)
# pitchfork: Ω² = g/R 가 임계값
import numpy as np

g, R = 9.81, 1.0
Omega_c = np.sqrt(g / R)

# 회전속도 범위
omegas = np.linspace(0.5, 3.0, 100) * Omega_c
print(f"임계 회전속도 Ω_c = √(g/R) = {Omega_c:.4f} rad/s")
print(f"\n분기 다이어그램 (θ_eq vs Ω):")
print(f"{'Ω/Ω_c':>8}  {'θ_e (degree)':>15}  {'안정?'}")
print("-" * 40)

for Omega in [0.5, 0.9, 1.0, 1.5, 2.0, 3.0]:
    Omega_val = Omega * Omega_c
    # 평형점: sin θ = 0 → θ = 0 (적도) 또는 π
    # 또는 cos θ = g/(R Ω²)
    
    # 적도 안정성: linearize around θ=0
    # θ¨ ≈ (Ω² - g/R) θ
    # if Ω² < g/R: 안정 (음의 spring)
    if Omega_val**2 < g / R:
        print(f"  {Omega:>5.2f}    {0.0:>10.2f}        안정 (적도)")
    else:
        print(f"  {Omega:>5.2f}    {0.0:>10.2f}        불안정 (적도)")
        # 새 평형점
        cos_theta_e = g / (R * Omega_val**2)
        if abs(cos_theta_e) <= 1.0:
            theta_e = np.arccos(cos_theta_e)
            print(f"  {Omega:>5.2f}    ±{np.degrees(theta_e):>9.2f}        안정 (새 평형점)")

print("\n→ Ω/Ω_c = 1 에서 *pitchfork 분기*:")
print("  적도가 불안정해지고, ±θ_e 의 새 평형점이 발생.")
```

이 결과는 *pitchfork 분기* 의 정확한 형태 — 임계값에서 평형점 하나가 셋으로 갈라짐 — 을 회전 후프 예에서 확인한다.

## 다음 절(4.3.7)로 가는 다리

선형화로 분류 안 되는 경우 (비-하이퍼볼릭 평형점, 또는 *대역적* 안정성) 의 도구가 *Liapunov 함수* — 시스템의 *에너지 같은* 양으로 안정성을 직접 증명. §4.3.7 의 주제.
