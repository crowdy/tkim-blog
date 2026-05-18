---
title: '4.2.2 — 정준 방정식의 좌표 무관 표현: $\iota_{X_H} \omega = dH$ 의 한 줄'
description: "해밀턴 벡터장 $X_H$ 가 $\\iota_{X_H} \\omega = dH$ 의 유일한 해. 비퇴화 $\\omega$ 가 1-형식과 벡터장 사이의 동형 — 이게 정준 방정식의 *좌표 자유* 정체."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 72
lang: ko
pairSlug: am1tc-4-2-2-coordinate-free-canonical
draft: false
updated: 2026-05-18
---

# 4.2.2 — 정준 방정식의 좌표 무관 표현: $\iota_{X_H} \omega = dH$ 의 한 줄

> 해밀턴 벡터장 $X_H$ 가 $\iota_{X_H} \omega = dH$ 의 유일한 해. 비퇴화 $\omega$ 가 1-형식과 벡터장 사이의 동형 — 이게 정준 방정식의 *좌표 자유* 정체.

## 본문이 말하는 것

심플렉틱 다양체 $(P, \omega)$ 와 해밀토니언 $H : P \to \mathbb R$ 이 주어졌다 하자. $\omega$ 가 *비퇴화* (§4.2.1) — 즉 각 점에서 *벡터장 → 1-형식* 사상

$$
X \mapsto \iota_X \omega
$$

이 *전단사* (위상공간 위 벡터장과 1-형식 사이의 동형). 그 역사상으로 *임의의 1-형식 $\alpha$ 가 유일한 벡터장 $X$* 에 대응:

$$
\iota_X \omega = \alpha
$$

특히 $\alpha = dH$ ($H$ 의 미분) 을 대입하면 *유일한 벡터장* $X_H$:

$$
\boxed{\quad \iota_{X_H}\, \omega = dH \quad}
$$

이 $X_H$ 가 **해밀턴 벡터장** (Hamiltonian vector field, §4.2.3). 위상공간의 운동이 *$X_H$ 의 적분곡선*.

**좌표 표현.** Darboux 좌표 $(q^\alpha, p_\alpha)$ 에서 $\omega = dq^\alpha \wedge dp_\alpha$, $dH = (\partial H/\partial q^\alpha) dq^\alpha + (\partial H/\partial p_\alpha) dp_\alpha$. $X_H = A^\alpha \partial/\partial q^\alpha + B_\alpha \partial/\partial p_\alpha$ 로 적으면

$$
\iota_{X_H} \omega = A^\alpha dp_\alpha - B_\alpha dq^\alpha
$$

(부호는 외적의 정의에 따라). 양변 비교:

$$
A^\alpha = \frac{\partial H}{\partial p_\alpha},\quad B_\alpha = -\frac{\partial H}{\partial q^\alpha}
$$

— *정준 방정식* (§4.1.2). 즉 $\iota_{X_H} \omega = dH$ 의 좌표 표현이 정확히 정준 방정식.

## 한 번 더, 천천히

도해 설명 — *좌표 자유 형식의 위력*.

**(a) "좌표 자유" 의 *실용적* 의미.** 좌표를 바꿔도 $\iota_{X_H} \omega = dH$ 라는 *식의 형태* 가 그대로. 정준 변환 (§5) 에서 변환된 새 좌표 $(Q, P)$ 에 대해서도 같은 형식. *심플렉틱 형식만 보존되면 운동의 표현이 자동 일관*.

**(b) Darboux 정리의 *역할*.** §4.2.1 의 Darboux 정리가 *어떤 심플렉틱 다양체에서도 $(q, p)$ 형식의 좌표가 국소적으로 존재* 함을 보장. 그래서 정준 방정식이 *모든 심플렉틱 시스템* 에서 동일 형식.

**(c) 비-$T^*M$ 시스템의 예.** 구면 $S^2$ 위의 회전체 운동 — 자유도 2 (위도·경도) 의 *비-$T^*M$ 심플렉틱 다양체* 위에 정의. 해밀토니언 = 회전 운동에너지. *Euler 식의 심플렉틱 정체* — 본 절의 *좌표 자유 형식* 으로 자연스럽게 다뤄진다.

**(d) 1-형식 ↔ 벡터장 동형.** 비퇴화 $\omega$ 가 *공역* (cotangent) 과 *접* (tangent) 사이의 *자연 동형*. 리만 계량 (대칭) 이 같은 일을 한다면 — 인덱스 올리기·내리기. 심플렉틱 (반대칭) 도 *비퇴화* 이면 같은 일이 가능. *수학적 도구의 평행 관계*.

**(e) §1.6.5 의 외미분 회수.** $dH$ 가 *함수의 미분* — §1.6.1 의 자연스러운 1-형식. $\iota_X \omega$ 가 *내부 곱* (§3.1.4 회수). 두 연산이 *심플렉틱 무대 위에서* 자연스럽게 짝지어진다.

**(f) 양자역학과의 연결.** 양자역학의 시간 진화는 $i\hbar \partial \psi / \partial t = \hat H \psi$ — *작용소* 형식. 고전 한계의 *해밀턴 벡터장* $X_H$ 와 양자 *해밀톤 작용소* $\hat H$ 의 평행 관계. *Weyl 양자화* 가 두 무대 사이의 정밀한 다리.

## 다음 절(4.2.3)로 가는 다리

$X_H$ 의 정의 ($\iota_{X_H} \omega = dH$) 가 박혔다. 이제 그 *벡터장* 자체의 성질 — 적분곡선, 보존량, 두 해밀턴 벡터장의 *Lie 괄호* (= Poisson 괄호) — 를 §4.2.3 에서 본격적으로 다룬다.
