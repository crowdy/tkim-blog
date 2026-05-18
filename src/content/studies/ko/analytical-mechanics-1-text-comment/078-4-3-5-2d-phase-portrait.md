---
title: '4.3.5 — 2 차원에서의 고찰: 평형점의 *완전 분류*'
description: "2×2 자코비안의 trace $\\tau$ 와 행렬식 $\\Delta$ 가 평형점을 *완전 분류* — saddle, node, focus, center. $\\tau$-$\\Delta$ 다이어그램으로 한눈에. 해밀턴 시스템은 $\\tau = 0$ 인 부분공간."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 78
lang: ko
pairSlug: am1tc-4-3-5-2d-phase-portrait
draft: false
updated: 2026-05-18
---

# 4.3.5 — 2 차원에서의 고찰: 평형점의 *완전 분류*

> 2×2 자코비안의 trace $\tau$ 와 행렬식 $\Delta$ 가 평형점을 *완전 분류* — saddle, node, focus, center. $\tau$-$\Delta$ 다이어그램으로 한눈에. 해밀턴 시스템은 $\tau = 0$ 인 부분공간.

## 본문이 말하는 것

2 차원 ($N = 2$) 동력학 시스템 $\dot x = f(x)$, $x \in \mathbb R^2$. 평형점 $x^*$ 의 자코비안 $A = Df(x^*)$ 는 $2 \times 2$ 행렬. 두 *불변량*:

$$
\tau := \text{trace}(A), \quad \Delta := \det(A)
$$

고유값 $\lambda_{1,2} = (\tau \pm \sqrt{\tau^2 - 4\Delta})/2$.

**$\tau$-$\Delta$ 평면 분류.**

| 영역 | 명칭 | 안정성 |
|---|---|---|
| $\Delta < 0$ | 안장점 (saddle) | 불안정 |
| $\Delta > 0$, $\tau^2 > 4\Delta$, $\tau < 0$ | 안정 결절 (stable node) | 점근 안정 |
| $\Delta > 0$, $\tau^2 > 4\Delta$, $\tau > 0$ | 불안정 결절 | 불안정 |
| $\Delta > 0$, $\tau^2 < 4\Delta$, $\tau < 0$ | 안정 나선 (stable focus) | 점근 안정 |
| $\Delta > 0$, $\tau^2 < 4\Delta$, $\tau > 0$ | 불안정 나선 | 불안정 |
| $\Delta > 0$, $\tau = 0$ | 중심 (center) | Liapunov 안정 (선형) |

해밀턴 시스템 ($\tau = 0$, $\Delta > 0$): 항상 *중심*. $\Delta < 0$ 의 안장점도 가능.

## 한 번 더, 천천히

**(1) 직관적 그림.**

- **Saddle**: 한 방향 안정, 한 방향 불안정. 평형점이 *통과* — separatrix 가 만든다.
- **Node**: 두 방향 모두 같은 부호 (실 고유값). 점이 *직접* 평형점으로 (혹은 멀어짐).
- **Focus**: 복소 고유값. *나선* 모양으로 평형점에 접근 (혹은 멀어짐).
- **Center**: 순수 허수 고유값. *닫힌 곡선* 으로 둘러쌈. 해밀턴.

**(2) 해밀턴 한정의 두 가능성.** 해밀턴 시스템 (1자유도, 2D) 에서 trace$(A) = 0$ 이 자동. 그래서 평형점은 *오직* center 또는 saddle. 단진자 (0,0) = center, (π,0) = saddle 이 그 정확한 분류.

**(3) Poincaré–Bendixson 의 *위상학적* 의미.** 2D 동력학에서 *유계* 운동은 *반드시* 평형점 또는 주기해로 수렴. 카오스 불가능. *Jordan 곡선 정리* (평면의 닫힌 곡선이 평면을 두 영역으로 나눔) 의 동력학적 결과.

**(4) van der Pol 의 극한 주기.** van der Pol 방정식 $\ddot x - \mu(1-x^2)\dot x + x = 0$ 의 (0, 0) 평형점은 *불안정 focus* — 원점에서 발산. 그러나 큰 $|x|$ 에서는 마찰이 *수축* — 모든 운동이 *극한 주기* 로 수렴. Poincaré–Bendixson 이 보장.

**(5) §4.3.6 의 분기 이론으로의 다리.** 매개변수가 변할 때 $\tau$ 또는 $\Delta$ 가 *0 을 넘어가는* 순간 — *분기*. 안정성 변화 + 평형점 생성/소멸 등이 일어난다.

## 파이썬으로 확인 — 4 종 평형점의 상포트레이트

이 코드의 메시지는 단순하다: 4 가지 평형점 (saddle, stable node, stable focus, center) 을 만드는 $2 \times 2$ 행렬을 각각 잡고, 그 *흐름* 의 *짧은 적분궤도* 를 출력. 정성적 행동의 차이를 직접 본다.

```python
# 2D 선형 시스템: ẋ = A x, A 2×2 행렬
# 4 종 평형점 데모
import numpy as np
from scipy.integrate import solve_ivp

systems = {
    "Saddle (Δ<0)":         np.array([[1, 0], [0, -1]]),       # 고유값 +1, -1
    "Stable node (τ<0,Δ>0,τ²>4Δ)": np.array([[-2, 0], [0, -1]]),  # 고유값 -2, -1
    "Stable focus (τ<0,Δ>0,τ²<4Δ)": np.array([[-0.2, 1], [-1, -0.2]]),  # 고유값 -0.2 ± i
    "Center (τ=0,Δ>0)":     np.array([[0, 1], [-1, 0]]),       # 고유값 ±i
}

for name, A in systems.items():
    tau = np.trace(A)
    Delta = np.linalg.det(A)
    eigs = np.linalg.eigvals(A)
    
    # 임의의 초기점에서 적분
    def rhs(t, y, A=A):
        return A @ y
    
    sol = solve_ivp(rhs, (0, 5.0), [1.0, 0.5], rtol=1e-9, atol=1e-11)
    final_norm = np.linalg.norm(sol.y[:, -1])
    
    print(f"{name}")
    print(f"  τ = {tau:+.2f}, Δ = {Delta:+.2f}, 고유값 = {eigs}")
    print(f"  t=5 에서 ||x|| = {final_norm:.4f} (초기 ||x|| = {np.sqrt(1.25):.4f})")
    print()

print("→ Saddle: 발산  /  Stable node, focus: 수축  /  Center: 보존")
```

이 결과는 *2 차원 평형점의 4 종 분류* 의 *수치적 시각화*. 각 종이 *질적으로 다른* 흐름 모양을 가진다.

## 다음 절(4.3.6)로 가는 다리

매개변수가 변할 때 평형점의 *질적 변화* — *분기* (bifurcation). saddle-node 분기, transcritical, pitchfork, Hopf 분기 등이 *4 가지 표준 분기*. §4.3.6 가 그 분류와 *분기 다이어그램* 을 박는다.
