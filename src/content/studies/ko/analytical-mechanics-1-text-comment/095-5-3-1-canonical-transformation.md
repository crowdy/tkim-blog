---
title: '5.3.1 — 정준 변환: 해밀턴 형식을 *보존* 하는 위상공간 변환'
description: "$(q, p) \\to (Q, P)$ 변환이 *정준 방정식의 형식* 을 보존하면 정준 변환. 동치적: 카르탕의 적분 불변식 $\\oint p dq = \\oint P dQ$ 를 보존. 라그랑주 형식의 점 변환을 *훨씬 큰 군* 으로 확장."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 95
lang: ko
pairSlug: am1tc-5-3-1-canonical-transformation
draft: false
updated: 2026-05-18
---

# 5.3.1 — 정준 변환: 해밀턴 형식을 *보존* 하는 위상공간 변환

> $(q, p) \to (Q, P)$ 변환이 *정준 방정식의 형식* 을 보존하면 정준 변환. 동치적: 카르탕의 적분 불변식 $\oint p dq = \oint P dQ$ 를 보존. 라그랑주 형식의 점 변환을 *훨씬 큰 군* 으로 확장.

## 본문이 말하는 것

**정준 변환** (canonical transformation) 의 정의: 위상공간의 매끄러운 사상

$$
\Phi : T^*M \to T^*M,\quad (q, p) \mapsto (Q, P) = \Phi(q, p)
$$

이 *정준 방정식의 형식을 보존*. 즉 *임의의 해밀토니언* $H(q, p, t)$ 에 대해, 새 좌표 $(Q, P)$ 에서도 *어떤 새 해밀토니언* $K(Q, P, t)$ 가 있어 정준 방정식

$$
\dot Q^\alpha = \frac{\partial K}{\partial P_\alpha}, \quad \dot P_\alpha = -\frac{\partial K}{\partial Q^\alpha}
$$

이 성립한다.

**동치 조건 (카르탕 형식).** $\Phi$ 가 정준 변환 ↔ 위상공간 *닫힌 곡선* 의 적분 불변식 보존:

$$
\oint_C p_\alpha\, dq^\alpha = \oint_{\Phi(C)} P_\alpha\, dQ^\alpha
$$

즉 $\Phi^* (P\, dQ) - p\, dq = dF$ (어떤 함수 $F$ 의 전미분 — 닫힌 곡선 위 적분에서 0).

**왜 *훨씬 큰* 군인가.** 라그랑주 형식의 점 변환 $q \to Q(q, t)$ — $n$ 개 자유 함수. 정준 변환 $(q, p) \to (Q(q, p, t), P(q, p, t))$ — $2n$ 개 자유 함수 + 심플렉틱 제약 = *$n^2$ 함수만큼 자유*. *제곱 만큼* 확장.

**예시.**

- *항등 변환*: $Q = q$, $P = p$.
- *점 변환* (라그랑주 형식 의 변환): $Q = Q(q, t)$, $P = (\partial Q/\partial q)^{-T} p$.
- *$q \leftrightarrow p$ 교환*: $Q = p$, $P = -q$. *정준* — 위치와 운동량의 역할 교환.
- *조화 진동자* 의 *작용-각 변수*: $(q, p) \to (J, \phi)$ — 진동을 *균일 회전* 으로 변환.

## 한 번 더, 천천히

**(1) "정준" 변환의 *기하학적* 정체.** *심플렉틱 사상* — $\Phi^* \omega = \omega$, 즉 *심플렉틱 2-형식을 보존*. §5.4 에서 형식적으로 박힘.

**(2) 동력학적 *의미*.** 정준 변환은 *해밀턴 흐름의 시점을 바꾸는 도구*. *복잡한 시스템* 을 *단순한 시스템* 으로 변환 (예: 조화 진동자 → 작용-각 변수 → 균일 회전). 운동을 *명시적으로 풀기* 위한 *변수 변환*.

**(3) 위상공간의 *대칭성* 의 결과.** 위상공간 $(q, p)$ 에서 *위치와 운동량의 역할 교환* 이 정준 변환 — 라그랑주 형식에서는 *불가능* (점 변환 한정). 해밀턴 형식의 *대칭성* 의 실질적 결과.

**(4) 해밀턴-야코비식 (HJ) 와의 *연결*.** *주어진 해밀토니언을 0 으로 만드는* 정준 변환을 찾으면 → 새 좌표 $(Q, P)$ 가 *모두 상수* — 운동이 *완전 해결*. HJ 식 $\partial S/\partial t + H(q, \partial S/\partial q, t) = 0$ 의 해 $S(q, P, t)$ 가 정확히 그 변환의 *생성 함수*.

**(5) §5.4 와의 다리.** *어떤 변환이 정준 변환인가* 의 정밀한 조건 — *심플렉틱 조건* — 이 §5.4 의 주제. *행렬 형식* $J^T \Omega J = \Omega$ ($J$ = 자코비안, $\Omega$ = 심플렉틱 형식의 행렬 표현).

## 파이썬으로 확인 — 회전 변환의 정준성 검증

이 코드의 메시지는 단순하다: $(q, p)$ 의 회전 변환 $Q = q\cos\alpha + p\sin\alpha$, $P = -q\sin\alpha + p\cos\alpha$ 가 정준 변환임을 직접 검증. 심플렉틱 보존 ($\Phi^* \omega = \omega$) 을 자코비안 행렬로 확인.

```python
# 회전 변환: (q, p) → (Q, P)
#   Q = q cos α + p sin α
#   P = -q sin α + p cos α
# 자코비안 행렬 J = ∂(Q, P)/∂(q, p)
# 심플렉틱 조건: J^T Ω J = Ω, where Ω = [[0, 1], [-1, 0]]
import numpy as np

alpha = np.pi / 3  # 임의의 회전 각도

J = np.array([[np.cos(alpha), np.sin(alpha)],
              [-np.sin(alpha), np.cos(alpha)]])

Omega = np.array([[0.0, 1.0],
                  [-1.0, 0.0]])

# 심플렉틱 조건 검증
result = J.T @ Omega @ J
print(f"회전 각도 α = π/3 = {alpha:.4f}")
print(f"자코비안 J =\n{J}")
print(f"\nJ^T Ω J =\n{result}")
print(f"\nΩ =\n{Omega}")
print(f"\n차이 ||J^T Ω J - Ω||: {np.linalg.norm(result - Omega):.2e}")
print(f"  → 심플렉틱 조건 만족 (회전 변환은 정준 변환)")

# 비교: 스케일 변환 Q = aq, P = ap (비심플렉틱)
a = 2.0
J_scale = np.array([[a, 0.0],
                    [0.0, a]])
result_scale = J_scale.T @ Omega @ J_scale
print(f"\n비교: 스케일 변환 Q=aq, P=ap (a={a}):")
print(f"  J^T Ω J - Ω 의 norm: {np.linalg.norm(result_scale - Omega):.4f}")
print(f"  → 비-심플렉틱 — *정준 변환이 아니다*")

# 그러나 *반대 스케일* Q = a q, P = p/a 는 심플렉틱
J_scale_correct = np.array([[a, 0.0],
                             [0.0, 1.0/a]])
result_correct = J_scale_correct.T @ Omega @ J_scale_correct
print(f"\n반대 스케일 Q = a q, P = p/a:")
print(f"  J^T Ω J - Ω 의 norm: {np.linalg.norm(result_correct - Omega):.2e}")
print(f"  → 심플렉틱 — *정준 변환* (작용 보존 변환)")

# 적분 불변식 검증: 닫힌 곡선 위 ∮ p dq 가 변환 전후 같은지
# 단위 원 (q, p) = (cos θ, sin θ), θ ∈ [0, 2π]
thetas = np.linspace(0, 2*np.pi, 1000)
q_orig = np.cos(thetas)
p_orig = np.sin(thetas)

# 변환 (회전)
Q_new = q_orig * np.cos(alpha) + p_orig * np.sin(alpha)
P_new = -q_orig * np.sin(alpha) + p_orig * np.cos(alpha)

# 적분 (사다리꼴 공식)
def closed_loop_integral(q, p):
    dq = np.diff(q, append=q[0])
    return np.sum((p + np.roll(p, -1)) / 2 * dq)

I_orig = closed_loop_integral(q_orig, p_orig)
I_new = closed_loop_integral(Q_new, P_new)
print(f"\n적분 불변식 검증:")
print(f"  ∮ p dq (변환 전): {I_orig:.6f}  (≈ π — 단위원 면적)")
print(f"  ∮ P dQ (변환 후): {I_new:.6f}  (=같은 값 기대)")
print(f"  차이: {abs(I_orig - I_new):.2e}  → 적분 보존 (정준 변환의 정의)")
```

이 결과는 회전 변환이 (a) *심플렉틱 조건* $J^T \Omega J = \Omega$ 를 *정확히 만족*, (b) *적분 불변식* 을 보존 — *정준 변환의 정의* 를 두 *동치* 시점에서 확인한다.

## 다음 절(5.3.2)로 가는 다리

정준 변환의 *조직적* 생성 방법 — *생성 함수* (generating function). 임의의 *매끄러운 함수 $F$* 에서 정준 변환이 *자동으로 생성*. 4 가지 표준 형식 ($F_1, F_2, F_3, F_4$) 가 있고, 각각 *다른 의존 변수* 를 사용. §5.3.2 가 이 형식의 *체계적 분류* 와 *대표 예시*.
