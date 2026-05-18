---
title: '5.1.3 — 상공간 위의 해밀턴 원리: 정준 방정식의 *직접 도출*'
description: "상공간 위의 작용 $S = \\int (p \\dot q - H) dt$ 의 변분 $\\delta S = 0$ 에 대한 정밀한 계산. $\\delta q$ 와 $\\delta p$ 의 *독립적* 변분이 *각각* 정준 식 하나씩을 만든다."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 89
lang: ko
pairSlug: am1tc-5-1-3-hamilton-on-phase
draft: false
updated: 2026-05-18
---

# 5.1.3 — 상공간 위의 해밀턴 원리: 정준 방정식의 *직접 도출*

> 상공간 위의 작용 $S = \int (p \dot q - H) dt$ 의 변분 $\delta S = 0$ 에 대한 정밀한 계산. $\delta q$ 와 $\delta p$ 의 *독립적* 변분이 *각각* 정준 식 하나씩을 만든다.

## 본문이 말하는 것

§5.1.1 의 상공간 작용

$$
S[q(\cdot), p(\cdot)] = \int_{t_1}^{t_2} \left[p_\alpha \dot q^\alpha - H(q, p, t)\right] dt
$$

의 변분을 직접 계산. *$q$ 와 $p$ 가 독립적* 으로 변분 — $\delta q^\alpha(t)$, $\delta p_\alpha(t)$ (끝점 고정).

$$
\delta S = \int_{t_1}^{t_2} \left[\delta p_\alpha\, \dot q^\alpha + p_\alpha\, \delta \dot q^\alpha - \frac{\partial H}{\partial q^\alpha} \delta q^\alpha - \frac{\partial H}{\partial p_\alpha} \delta p_\alpha\right] dt
$$

$\delta \dot q^\alpha = d(\delta q^\alpha)/dt$ 에 *부분 적분*:

$$
\int p_\alpha\, \frac{d \delta q^\alpha}{dt}\, dt = [p_\alpha \delta q^\alpha]_{t_1}^{t_2} - \int \dot p_\alpha\, \delta q^\alpha\, dt
$$

끝점 고정 → 경계 항 0. 정리하면

$$
\delta S = \int_{t_1}^{t_2} \left[\left(\dot q^\alpha - \frac{\partial H}{\partial p_\alpha}\right) \delta p_\alpha - \left(\dot p_\alpha + \frac{\partial H}{\partial q^\alpha}\right) \delta q^\alpha\right] dt
$$

$\delta q$, $\delta p$ 가 *임의 + 독립* → 두 괄호가 *각각* 0:

$$
\boxed{\quad \dot q^\alpha = \frac{\partial H}{\partial p_\alpha},\quad \dot p_\alpha = -\frac{\partial H}{\partial q^\alpha} \quad}
$$

— *정준 방정식*. 변분 원리의 직접 결과.

## 한 번 더, 천천히

도해 설명 — *$q$ 와 $p$ 의 독립성* 이 본 변분 원리의 *핵심* 인 이유.

**(a) §3.1 변분과의 차이.** §3.1 에서 $\delta q$ 만 변분, $\delta \dot q = d(\delta q)/dt$ 자동. 즉 *변분의 자유도가 $n$*. 본 절에서 $\delta q$, $\delta p$ 둘 다 *독립적* 변분 — *변분의 자유도가 $2n$*. 그래서 *$2n$ 개의 식* 이 떨어진다.

**(b) 변분 자유도와 식의 수.** $n$ 자유도의 라그랑주식이 *$n$ 개의 2차 ODE* — *총 $2n$ 정보* 단위 (초기 위치 + 초기 속도). 같은 정보가 $2n$ 개의 1차 ODE — 정준식 — 으로도 표현 가능. 본 절이 두 형식의 *변분 원리 시점 등가성*.

**(c) $\delta q$, $\delta p$ 의 *독립성* 의 *기하학적* 의미.** $\delta q$ 는 *기저 다양체 $M$* 의 변분, $\delta p$ 는 *여접번들 $T^*M$ 의 *섬유 (수직 방향)* 변분*. 두 변분이 *직교 보충* — 위상공간의 *완전한 변분 자유*. 라그랑주 형식에서는 $\delta \dot q$ 가 *$\delta q$ 의 종속* 이라 *수직 방향이 자동 결정*.

**(d) 경계 항의 미묘함.** *$q$* 의 끝점 고정 ($\delta q(t_1) = \delta q(t_2) = 0$) 이 자연. 그러나 *$p$* 의 끝점은 *고정 필요 없음* — 위 변분 계산에서 *$p$ 에 대한 경계 항이 처음부터 없다*. 이게 *해밀턴 원리의 비대칭성* — *$q$ 가 위치, $p$ 가 *상태* 라는 *물리적 차이* 의 반영.

**(e) §3 의 변분 원리와의 동치 증명.** 본 절의 정준 방정식 + §4.1.2 의 르장드르 가역성으로 *§3 의 EL 식이 다시 떨어진다*. 즉 *세 형식의 변분 원리* — §3 의 L 형식, 본 절의 H 형식, §3.1.4 의 1-형식 형식 — 가 *완전히 동치*.

**(f) 카르탕 형식의 *예고*.** §5.2.3 의 *카르탕 원리* 가 본 절의 변분 원리를 *미분형식 어휘* 로 정리한 *기하학적* 형식. $\delta S = 0 \Leftrightarrow \omega = -d\theta_L^{\text{ext}}$ 가 *실제 운동 곡선의 접벡터 의 contraction = 0*. 좌표 자유 형식.

## 다음 절(5.1.4)로 가는 다리

본 절까지의 변분 원리는 *Darboux 좌표 $(q, p)$ 에 의존* 한 표현. 좌표 자유 형식 — *심플렉틱 다양체 위의 변분 원리* — 가 §5.1.4 의 주제. 카르탕의 운동방정식 $\iota_X \omega = dH$ (§4.2.2 회수) 의 변분 원리 시점 표현.
