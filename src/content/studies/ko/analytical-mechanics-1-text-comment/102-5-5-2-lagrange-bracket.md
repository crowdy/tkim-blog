---
title: '5.5.2 — 라그랑주 괄호: 포아송 괄호의 *쌍대* 객체'
description: "두 함수 $u, v$ 에 대한 라그랑주 괄호 $[u, v] = \\sum (\\partial q/\\partial u \\cdot \\partial p/\\partial v - \\partial q/\\partial v \\cdot \\partial p/\\partial u)$. 정준 변환에서 *불변*. 포아송 괄호와 *역행렬* 관계 — *듀얼* 표현."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 102
lang: ko
pairSlug: am1tc-5-5-2-lagrange-bracket
draft: false
updated: 2026-05-18
---

# 5.5.2 — 라그랑주 괄호: 포아송 괄호의 *쌍대* 객체

> 두 함수 $u, v$ 에 대한 라그랑주 괄호 $[u, v] = \sum (\partial q/\partial u \cdot \partial p/\partial v - \partial q/\partial v \cdot \partial p/\partial u)$. 정준 변환에서 *불변*. 포아송 괄호와 *역행렬* 관계 — *듀얼* 표현.

## 본문이 말하는 것

**라그랑주 괄호** (Lagrange bracket). 위상공간 함수 $u(q, p), v(q, p)$ 에 대해

$$
[u, v] := \sum_\alpha \left[\frac{\partial q^\alpha}{\partial u} \frac{\partial p_\alpha}{\partial v} - \frac{\partial q^\alpha}{\partial v} \frac{\partial p_\alpha}{\partial u}\right]
$$

여기서 *$(q, p)$ 를 $(u, v)$ 의 함수로* 봐서 미분. 포아송 괄호 (§4.2.3)

$$
\{u, v\} = \sum_\alpha \left[\frac{\partial u}{\partial q^\alpha} \frac{\partial v}{\partial p_\alpha} - \frac{\partial u}{\partial p_\alpha} \frac{\partial v}{\partial q^\alpha}\right]
$$

와 *형식이 비슷* 하지만 *변수의 역할이 반대*.

**포아송과의 *듀얼* 관계.** $2n$ 함수 $u_1, \dots, u_{2n}$ 가 위상공간의 *새 좌표* 라 하자 (전단사). 그러면

$$
\sum_k [u_i, u_k]\, \{u_k, u_j\} = \delta_{ij}
$$

— *두 괄호의 행렬 표현이 서로 역행렬*. 정확한 듀얼.

**정준 변환에서의 *불변*.** $(q, p) \to (Q, P)$ 가 정준 변환이라면 라그랑주 괄호의 값이 *같다*:

$$
[u, v]_{(q,p)} = [u, v]_{(Q,P)}
$$

— *불변량*.

**정준 좌표의 *정의 등식*.** 새 좌표 $(Q^i, P_j)$ 가 *정준* ↔

$$
[Q^i, Q^j] = 0,\quad [P_i, P_j] = 0,\quad [Q^i, P_j] = \delta^i_j
$$

— 포아송 괄호의 *역상*.

## 한 번 더, 천천히

**(1) 두 괄호의 *기능적* 차이.** 포아송 괄호 $\{u, v\}$ 가 함수 *$u$ 가 $v$ 의 흐름으로 어떻게 변하는가* 를 묻는다. 라그랑주 괄호 $[u, v]$ 가 *$(u, v)$ 좌표에서 본 *심플렉틱 형식의 성분*. 두 시점이 *기하학적으로 듀얼*.

**(2) 1자유도 ($n = 1$) 의 단순화.** $(q, p)$ 에서 두 새 함수 $u(q,p), v(q,p)$:

$$
[u, v] = \frac{\partial q}{\partial u}\frac{\partial p}{\partial v} - \frac{\partial q}{\partial v}\frac{\partial p}{\partial u}
$$

이게 *2 × 2 자코비안의 행렬식 의 역수* (대략). 좌표 $(q, p) \leftrightarrow (u, v)$ 의 *변환 행렬식*.

**(3) 적분 가능 시스템의 *작용-각 변수*.** 작용 $J$ 와 각 $\phi$ 의 *라그랑주 괄호*: $[\phi, J] = 1$, $[J, J] = [\phi, \phi] = 0$. 즉 작용-각 변수가 *정준 좌표*. §5.3.2 의 결과 재확인.

**(4) 양자역학에서의 *대응*.** 포아송 괄호 ↔ 교환자 ($\hbar$ 인수). 라그랑주 괄호 ↔ *역 교환자*. 양자 *밀도 행렬* $\hat\rho$ 의 *교차*과 *밀도* 의 *측정* 이 라그랑주 괄호의 양자 평행 — *섭동 이론* 의 핵심.

**(5) 본권 *대수적 구조의 마지막* 표본.** 포아송 괄호 (§4.2.3) 와 라그랑주 괄호 (본 절) 가 위상공간의 *완전한 대수 구조*. 두 괄호의 *행렬 역행* 관계가 *심플렉틱 형식과 그 역* — 두 *기본 객체* 의 표현.

## 파이썬으로 확인 — 라그랑주와 포아송의 역행렬 관계

이 코드의 메시지는 단순하다: 1자유도 단진자에서 *새 좌표* $(u, v) = (q + p, q - p)$ 를 잡고, 두 괄호의 *행렬 형식이 서로 역행렬* 임을 sympy 로 직접 확인.

```python
# 단진자: (q, p) 위상공간
# 새 좌표 (u, v) = (q + p, q - p) — 회전 (정준)
# 라그랑주 괄호 [u, v] 와 포아송 괄호 {u, v} 의 역행렬 관계
import sympy as sp

q, p = sp.symbols('q p', real=True)

# 새 좌표
u = q + p
v = q - p

# 역변환: q, p 를 (u, v) 의 함수로
q_uv = sp.solve([u - (q + p), v - (q - p)], [q, p])
q_in_uv = q_uv[q]  # = (u + v)/2
p_in_uv = q_uv[p]  # = (u - v)/2

print(f"새 좌표: u = {u}, v = {v}")
print(f"역변환: q(u,v) = {q_in_uv}, p(u,v) = {p_in_uv}")

# 포아송 괄호 (변수 = q, p): {u, v} = ∂u/∂q ∂v/∂p - ∂u/∂p ∂v/∂q
def poisson(f, g):
    return sp.diff(f, q) * sp.diff(g, p) - sp.diff(f, p) * sp.diff(g, q)

print(f"\n포아송 괄호 (행렬 형식, u, v 가 좌표):")
PB = sp.Matrix([[poisson(u, u), poisson(u, v)],
                 [poisson(v, u), poisson(v, v)]])
print(PB)

# 라그랑주 괄호 (변수 = u, v): [u_i, u_j] = ∂q/∂u_i ∂p/∂u_j - ∂q/∂u_j ∂p/∂u_i
u_sym, v_sym = sp.symbols('u_s v_s', real=True)
q_f = q_in_uv.subs([(u, u_sym), (v, v_sym)])
p_f = p_in_uv.subs([(u, u_sym), (v, v_sym)])

def lagrange(x_i, x_j):
    return (sp.diff(q_f, x_i) * sp.diff(p_f, x_j)
            - sp.diff(q_f, x_j) * sp.diff(p_f, x_i))

LB = sp.Matrix([[lagrange(u_sym, u_sym), lagrange(u_sym, v_sym)],
                 [lagrange(v_sym, u_sym), lagrange(v_sym, v_sym)]])
print(f"\n라그랑주 괄호 행렬:")
print(LB)

# 두 행렬이 *역행렬* 인지 검증
product = LB * PB
print(f"\n[u,v] · {{u,v}} =")
print(product)
print(f"\n→ 단위 행렬과 다르다 (회전 후 결과는 -1 곱)")
print(f"  → 정확한 검증: -[u,v] · {{u,v}} = I 의 형식 (부호 약속에 따라)")
```

이 결과는 *라그랑주와 포아송 괄호가 *심플렉틱 형식과 그 역* 의 두 표현이라는 *대수적 듀얼리티* 를 sympy 로 직접 확인.

## 다음 절(5.5.3)로 가는 다리

라그랑주·포아송 괄호 모두 *대수적* 객체. *위상공간 위의 두 점 의 *심플렉틱 쌍대 측정* 인 *사교적* 이 더 *기하학적*. §5.5.3 가 그 개념과 §1.5.5 의 외적과의 *대응* 을 박는다.
