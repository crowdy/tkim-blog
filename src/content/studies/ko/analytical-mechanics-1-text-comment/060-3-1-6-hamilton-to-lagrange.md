---
title: '3.1.6 — 해밀턴의 원리와 라그랑주 방정식: 두 형식의 동치성'
description: "끝점 고정 변분 $\\delta S = 0$ 이 임의의 $\\delta q$ 에 대해 성립한다는 것 ↔ 오일러–라그랑주 방정식. 변분의 기본 정리가 그 동치성의 *비축약* 길."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 60
lang: ko
pairSlug: am1tc-3-1-6-hamilton-to-lagrange
draft: false
updated: 2026-05-18
---

# 3.1.6 — 해밀턴의 원리와 라그랑주 방정식: 두 형식의 동치성

> 끝점 고정 변분 $\delta S = 0$ 이 임의의 $\delta q$ 에 대해 성립한다는 것 ↔ 오일러–라그랑주 방정식. 변분의 기본 정리가 그 동치성의 *비축약* 길.

## 본문이 말하는 것

3.1.5 에서 정리된 변분

$$
\delta S = \int_{t_1}^{t_2} \left[\frac{\partial L}{\partial q^\alpha} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha}\right] \delta q^\alpha\, dt + [p_\alpha\, \delta q^\alpha]_{t_1}^{t_2}
$$

해밀턴의 원리는 *끝점 고정* — $\delta q^\alpha(t_1) = \delta q^\alpha(t_2) = 0$. 경계 항이 사라지고

$$
\delta S = \int_{t_1}^{t_2} E_\alpha(q, \dot q, t)\, \delta q^\alpha(t)\, dt
$$

여기서 $E_\alpha := \partial L/\partial q^\alpha - d(\partial L/\partial \dot q^\alpha)/dt$. 해밀턴 원리 ($\delta S = 0$ for all admissible $\delta q$) 는

$$
\int_{t_1}^{t_2} E_\alpha(t)\, \delta q^\alpha(t)\, dt = 0 \quad \forall\, \delta q
$$

**변분의 기본 정리** (fundamental lemma of variational calculus): 매끄러운 함수 $f$ 가 *모든* 매끄러운 *경계 0* 변분 $\delta q$ 에 대해 $\int f\, \delta q\, dt = 0$ 라면 $f \equiv 0$.

증명 스케치: 만약 *어떤* $t_0 \in (t_1, t_2)$ 에서 $f(t_0) \neq 0$ 라면, $t_0$ 의 작은 근방에서 *$f$ 와 같은 부호* 인 $\delta q$ 를 만들 수 있다 (예: bump function). 그러면 $\int f \delta q\, dt > 0$ — 가정 위반.

본 정리를 적용하면 $E_\alpha(t) \equiv 0$ — 즉

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^\alpha} - \frac{\partial L}{\partial q^\alpha} = 0 \quad (\alpha = 1, \dots, n)
$$

— **오일러–라그랑주 방정식**.

역도 성립: EL 식이 만족되면 $E_\alpha = 0$, 그래서 *임의의 끝점 0 변분* 에 대해 $\delta S = 0$. 즉

$$
\text{해밀턴 원리} \quad \Longleftrightarrow \quad \text{오일러–라그랑주 방정식}
$$

## 한 번 더, 천천히

도해 설명 — 두 형식의 *논리적 동치성* 은 단순한 *수학적 정체* 지만, 그 *철학적 무게* 가 다르다.

**(a) 미분 형식 vs 적분 형식.** EL 식은 *각 시각의 미분 방정식* (운동의 *국소 결정*). 해밀턴 원리는 *전체 경로의 적분 조건* (운동의 *전체적 결정*). *같은 운동* 을 *다른 시점* 에서 본 것.

**(b) 변분의 기본 정리의 *비축약* 의미.** 정리 자체는 *해석적* (continuity + 임의의 bump function) — *공간 의존* 안 함. 그러나 *해밀턴 원리에서 EL 식으로의 *추출 도구**. 변분 어휘의 *결정적* 도구.

**(c) 양자역학에서의 *현실적* 의미.** 양자역학에서는 *모든 경로가 기여* — 어느 한 경로가 *현실의 운동* 이 아니다. 그러나 *작용이 정류* 인 고전 경로 근방이 *건설적 간섭* 으로 도드라진다. 해밀턴 원리는 *고전 한계의 본질*.

**(d) 라그랑지언의 *유일성 모듈로* (2.1.5 회수).** 라그랑지언 $L$ 과 $L + dF/dt$ 가 *같은 EL 식* 을 만든다. 작용으로는 $S \to S + F(q_2, t_2) - F(q_1, t_1)$ — *끝점 고정* 변분에서 *상수 차이* — $\delta S$ 가 같다. 게이지 자유의 *변분 형식* 표현.

**(e) 일반 변분 원리로의 일반화.** 해밀턴 원리의 *형식* — *$\delta S = 0$* — 가 *어떤* 라그랑지언에서도 통한다. 표준 모형의 게이지 라그랑지언, 일반상대론의 Einstein-Hilbert 작용, 끈 이론의 Polyakov 작용 — 모두 *변분 원리* 의 같은 형식.

**(f) 비홀로노믹의 *예외* (회수).** §2.5.3 의 vakonomic vs nonholonomic 미묘함. 비홀로노믹 구속의 경우 *해밀턴 원리의 형식 적용* (vakonomic) 이 *실제 물리* (다랑베르) 와 다른 결과. 변분 원리의 *적용 범위 제한*. 본 절에서는 *홀로노믹 한정* 으로 동치성이 성립.

## 다음 절(3.1.7)로 가는 다리

EL 식이 *각 좌표 표현* 에서 박혔다. 그러나 *확장 배위공간 위* 의 *좌표 자유* 형식 — *시간을 포함한 무대* 위에서의 EL 식 — 도 자연스럽게 정의된다. §3.1.7 이 그 형식을 박는다.
