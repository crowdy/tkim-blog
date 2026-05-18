---
title: '4.3.3 — 평형해·주기해와 안정성: 작은 perturbation 의 운명'
description: "평형해 주변의 *Liapunov 안정성* (충분히 가까이 시작하면 가까이 머문다) 과 *점근 안정성* (시간에 따라 수렴) 의 두 등급. 주기해의 안정성도 같은 개념."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 76
lang: ko
pairSlug: am1tc-4-3-3-equilibrium-and-stability
draft: false
updated: 2026-05-18
---

# 4.3.3 — 평형해·주기해와 안정성: 작은 perturbation 의 운명

> 평형해 주변의 *Liapunov 안정성* (충분히 가까이 시작하면 가까이 머문다) 과 *점근 안정성* (시간에 따라 수렴) 의 두 등급. 주기해의 안정성도 같은 개념.

## 본문이 말하는 것

**평형해의 Liapunov 안정성.** 평형점 $x^*$ ($f(x^*) = 0$) 가 *Liapunov 안정* 이라는 것은: *임의의 작은 $\varepsilon > 0$ 에 대해 어떤 $\delta > 0$ 이 존재해, $\|x_0 - x^*\| < \delta$ 이면 모든 $t > 0$ 에서 $\|\phi_t(x_0) - x^*\| < \varepsilon$*.

즉 *충분히 가까이서 시작하면 영원히 가까이 머문다*.

**점근 안정성** (asymptotic stability): Liapunov 안정 + *$\phi_t(x_0) \to x^*$ as $t \to \infty$*. 평형점이 *attractor*.

**불안정**: Liapunov 안정의 부정. 어떤 *임의로 가까운* 초기점 이 *멀리 떠난다*.

**주기해의 안정성.** 주기해 $\gamma$ (= 한 점이 아닌 *닫힌 곡선*) 에 대해, 같은 정의가 *집합 거리* $d(x, \gamma)$ 로 다시 정의. 주기해 *근방* 에 머무는지, 수렴하는지 등.

**대표적 예.**

- **단진자** $(\theta = 0, p = 0)$: Liapunov 안정 (보존). 점근 안정 *아님* — 진동이 계속됨.
- **마찰 진자** $(\theta = 0, p = 0)$: 점근 안정. 모든 운동이 수렴.
- **단진자** $(\theta = \pi, p = 0)$: 불안정. 거꾸로 선 진자.
- **van der Pol 의 극한 주기**: 점근 안정 (모든 다른 운동이 극한 주기로 수렴).

## 한 번 더, 천천히

**(1) "안정성" 의 *세 가지 등급*.**

| 등급 | 정의 | 해밀턴 가능 | 비-해밀턴 가능 |
|---|---|:---:|:---:|
| Liapunov 안정 | 가까이 머문다 | ✓ | ✓ |
| 점근 안정 | 수렴한다 | ✗ (보존) | ✓ |
| 불안정 | 멀어진다 | ✓ | ✓ |

해밀턴 시스템에서 *점근 안정 평형점이 없다* — 체적 보존 때문. 보존 시스템의 평형점은 *Liapunov 안정* 이거나 *불안정*. (예외: *중립 안정* — boundary case, KAM 이론.)

**(2) 직관적 그림 — 골프공의 위치.** 

- *그릇 바닥* (점근 안정): 모든 운동이 결국 바닥으로.
- *완벽한 평면 위 한 점* (Liapunov 안정, 점근 안정 아님): 가까이 시작하면 가까이 머물지만 *수렴하지 않음*.
- *언덕 꼭대기* (불안정): 작은 perturbation 으로 굴러떨어짐.

해밀턴 시스템은 *마찰 없는 그릇* — 진동만 계속.

**(3) 운동의 *위상학* 측면.** 평형점 근방의 *위상학* 이 안정성을 결정. 해밀턴 시스템의 안정 평형점은 *닫힌 궤도들로 둘러싸인* 무대 — 운동이 *그 궤도들 중 하나* 위. 불안정 평형점은 *separatrix 가 떠나는* 자리.

**(4) §4.3.4 의 선형화.** 평형점의 안정성은 *그 점에서의 선형화* — *$Df(x^*)$ 의 고유값 분석* — 으로 거의 결정된다. *Hartman–Grobman 정리* 가 그 정밀한 기반.

**(5) 통계역학과의 연결.** *분포의 안정성* 도 비슷한 어휘. 정규분포가 *attractor 분포* (중심극한정리), 비평형 시스템의 정상상태가 *점근 안정 분포*.

## 파이썬으로 확인 — 단진자의 두 평형점

이 코드의 메시지는 단순하다: 단진자 $(\theta = 0, p = 0)$ 과 $(\theta = \pi, p = 0)$ 에서 *각각* 작은 perturbation 으로 시작한 운동의 *크기* 를 추적. 전자는 *제한* 됨 (Liapunov 안정), 후자는 *지수적 증가* (불안정).

```python
# 단진자: θ¨ = -sin θ
# 안정 평형 (0, 0) vs 불안정 평형 (π, 0)
import numpy as np
from scipy.integrate import solve_ivp

def pendulum(t, y):
    theta, p = y
    return [p, -np.sin(theta)]

# (a) 안정 평형 부근: (ε, 0) 으로 시작
eps = 0.01
sol_stable = solve_ivp(pendulum, (0, 20.0), [eps, 0.0],
                      rtol=1e-10, atol=1e-12, dense_output=True)
ts = np.linspace(0, 20, 500)
y_stable = sol_stable.sol(ts)
norm_stable = np.sqrt(y_stable[0]**2 + y_stable[1]**2)

print("안정 평형 (0, 0) 부근:")
print(f"  초기 거리: {np.sqrt(eps**2):.4f}")
print(f"  최대 거리: {norm_stable.max():.4f}")
print(f"  → 작은 변위로 시작 → 작은 영역에 *제한* (Liapunov 안정)")

# (b) 불안정 평형 부근: (π + ε, 0) 으로 시작
sol_unstable = solve_ivp(pendulum, (0, 5.0), [np.pi + eps, 0.0],
                        rtol=1e-10, atol=1e-12, dense_output=True)
ts2 = np.linspace(0, 5, 500)
y_unstable = sol_unstable.sol(ts2)
norm_unstable = np.sqrt((y_unstable[0] - np.pi)**2 + y_unstable[1]**2)

print(f"\n불안정 평형 (π, 0) 부근:")
print(f"  초기 거리: {eps:.4f}")
print(f"  최대 거리: {norm_unstable.max():.4f}")
print(f"  → 지수적 발산 (불안정)")

# 단진자 (0, 0): 점근 안정이 *아님* — 운동이 영원히 진동
# 작은 진폭 운동은 *영원히 작은 진폭으로 진동* — 수렴하지 않음
print(f"\n안정 평형의 시간 t=20 거리: {norm_stable[-1]:.4f}")
print(f"→ 거의 그대로 — 점근 안정이 아니라 *Liapunov 안정*.")
```

이 결과는 *두 종류의 안정성* — Liapunov 안정 (가까이 머문다) 과 그 부재 (불안정) — 의 *수치적 시각화*.

## 다음 절(4.3.4)로 가는 다리

평형점의 안정성을 판정하는 가장 강력한 도구 — *선형화*. 평형점에서 *$Df(x^*)$* 의 고유값이 *국소 행동* 을 거의 결정한다. §4.3.4 가 그 형식을 박는다.
