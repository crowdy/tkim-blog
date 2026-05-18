---
title: '3.1.3 — 확장 상태공간: 위치·속도·시간 의 결합 무대'
description: "확장 배위공간 $\\tilde M$ 의 접번들 $T\\tilde M$. 좌표 $(q, \\dot q, t)$ 의 모임 — 라그랑지언이 사는 자리. 변분 원리의 적분기가 정의되는 자연스러운 무대."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 57
lang: ko
pairSlug: am1tc-3-1-3-extended-state-space
draft: false
updated: 2026-05-18
---

# 3.1.3 — 확장 상태공간: 위치·속도·시간 의 결합 무대

> 확장 배위공간 $\tilde M$ 의 접번들 $T\tilde M$. 좌표 $(q, \dot q, t)$ 의 모임 — 라그랑지언이 사는 자리. 변분 원리의 적분기가 정의되는 자연스러운 무대.

## 본문이 말하는 것

**확장 상태공간** (extended state space) $\tilde S$ 의 정의:

$$
\tilde S := T(M \times \mathbb R) \cong TM \times T\mathbb R \cong TM \times \mathbb R \times \mathbb R
$$

— 확장 배위공간 $\tilde M$ 의 접번들. 차트 좌표는 $(q, \dot q, t, \dot t)$. 차원은 $2(\dim M + 1) = 2n + 2$.

원래 상태공간 ($TM \times \mathbb R$, 좌표 $(q, \dot q, t)$, 시간을 *외부 매개변수* 로 둔 경우) 와의 차이: $\dot t$ 가 *별 좌표* 로 추가. 단, 보통 $\dot t = 1$ 로 고정 (시간이 *자기 자신에 대한 단조 매개변수*) 이라 사실상 $TM \times \mathbb R$ 와 동치.

라그랑지언 $L : \tilde S \to \mathbb R$ 는

$$
L(q, \dot q, t, \dot t) = \tilde L\, \dot t \quad \text{with } \tilde L = L(q, \dot q / \dot t, t)
$$

(여기서 $\dot q / \dot t$ 는 시간에 대한 속도 — 매개변수 $s$ 가 시간 아닐 때 자코비안 변환). $L$ 이 *$\dot t$ 에 동차* — *매개화 무관* 한 *작용 1-형식* 의 적분기 정의.

## 한 번 더, 천천히

**(1) "동차" 의 의미.** $L(q, \dot q, t, \dot t)$ 가 *$\dot t, \dot q$ 의 1차 동차 함수* — 즉 $L(q, \lambda \dot q, t, \lambda \dot t) = \lambda L(q, \dot q, t, \dot t)$ for $\lambda > 0$. 이게 *매개화 무관* 의 정밀한 조건. 작용 적분이 *경로의 모양* 에만 의존하고 *매개화 속도* 에는 무관.

**(2) Hilbert 의 변환 형식.** *매개화 무관* 한 변분 문제의 표준 정리 (Hilbert 1900) — 임의의 1-동차 라그랑지언 $L$ 에서 출발해도, *고정 매개변수* ($\dot t = 1$) 로 jia 환원하면 보통 라그랑지언 $\tilde L(q, \dot q, t)$ 가 나온다. 두 형식이 동치.

**(3) §1.4.5 의 접번들 어휘 회수.** $T\tilde M$ 이 *$2(n+1)$ 차원 매끄러운 다양체*. 그 위에서의 미분기하학 (1.4.5 의 어휘) 이 §3.1.4 의 *기본 1-형식의 확장형* 의 무대.

**(4) 일반상대론으로의 다리.** 4-차원 시공간 위의 자유낙하 입자의 라그랑지언

$$
L = -m c^2 \sqrt{-g_{\mu\nu} \dot x^\mu \dot x^\nu}
$$

이 정확히 *4-속도 $\dot x^\mu$ 에 대해 1-동차*. *고유시간* $\tau$ 매개화로 환원하면 $L = -mc^2$ (상수) — 의미 있는 항이 *기하학적 길이* 그 자체.

**(5) §4.1.5 의 확장 상공간과 차이.** 본 절의 $\tilde S$ 는 *접번들*. §4.1.5 의 확장 상공간은 *여접번들* + 에너지 좌표. 르장드르 변환이 두 무대를 잇는다 — 해밀턴 형식의 확장.

## 다음 절(3.1.4)로 가는 다리

확장 상태공간 위에서 *작용 1-형식* — §2.3.1 에서 본 기본 1-형식의 확장 — 을 적을 수 있다. 그 1-형식의 *경로 위 적분* 이 정확히 작용. 변분 원리가 *1-형식의 적분이 정류* 라는 *기하학적* 형식으로 다시 적힌다.
