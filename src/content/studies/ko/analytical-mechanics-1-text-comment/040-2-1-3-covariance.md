---
title: '2.1.3 — 공변성: 좌표를 바꿔도 라그랑주식의 *형태* 가 유지된다'
description: "$q \\to q' = q'(q, t)$ 변환에서 라그랑주식 $\\frac{d}{dt}\\partial L/\\partial \\dot q^\\alpha - \\partial L/\\partial q^\\alpha = 0$ 의 *형태* 가 그대로 유지된다. 즉 라그랑지언이 *배위공간 위의 함수* — 좌표 자유 객체."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 40
lang: ko
pairSlug: am1tc-2-1-3-covariance
draft: false
updated: 2026-05-18
---

# 2.1.3 — 공변성: 좌표를 바꿔도 라그랑주식의 *형태* 가 유지된다

> $q \to q' = q'(q, t)$ 변환에서 라그랑주식 $\frac{d}{dt}\partial L/\partial \dot q^\alpha - \partial L/\partial q^\alpha = 0$ 의 *형태* 가 그대로 유지된다. 즉 라그랑지언이 *배위공간 위의 함수* — 좌표 자유 객체.

## 본문이 말하는 것

원서 2.1.3 절은 다음 정리를 증명한다.

**공변성 정리.** 일반화 좌표를 $q \to q'$ 의 *매끄러운 가역* 변환 ($q' = q'(q, t)$, 자코비안이 비퇴화) 으로 바꿀 때, 라그랑지언이 변환됨

$$
L'(q', \dot q', t) := L(q(q', t), \dot q(q', \dot q', t), t)
$$

그러면 새 좌표에서 *같은 형태* 의 라그랑주식이 성립:

$$
\frac{d}{dt} \frac{\partial L'}{\partial \dot q'^\beta} - \frac{\partial L'}{\partial q'^\beta} = 0
$$

증명의 핵심은 두 단계.

**(a) 속도의 변환.** $\dot q^\alpha = \dot q^\alpha(q', \dot q', t) = (\partial q^\alpha / \partial q'^\beta)\, \dot q'^\beta + \partial q^\alpha / \partial t$ — 자코비안 + 시간 미분.

**(b) 편미분의 자코비안.** $\partial \dot q^\alpha / \partial \dot q'^\beta = \partial q^\alpha / \partial q'^\beta$ (속도의 변환식에서 — *비-호환 마술* 라 불리는 이 등식이 라그랑주식 공변성의 비결).

이 두 사실을 라그랑주식의 좌변에 대입 후 인덱스 정리하면 *새 좌표의 좌변* 이 *자코비안과 곱해진* 형태로 나옴. 자코비안이 비퇴화이므로 좌변이 0 ↔ 새 좌변이 0.

**기하학적 해석.** 라그랑지언 $L$ 이 사실 *배위공간의 접번들* $TM$ 위의 *함수*. 좌표 표현 $L(q, \dot q, t)$ 은 그 함수의 *좌표 표현*. 좌표를 바꾸면 표현은 바뀌지만 *함수 자체* 는 그대로. 라그랑주식은 그 *함수의 미분 구조* 가 만드는 곡선 — 좌표 자유 객체.

## 한 번 더, 천천히

도해를 그려 두면 — 공변성은 *형식 불변성* (form invariance), *값 불변성* (value invariance) 이 둘 다 의미하는 단어다.

**(a) 형식 불변성.** 식의 *모양* — $\frac{d}{dt} \partial L / \partial \dot q - \partial L / \partial q = 0$ — 이 좌표를 바꿔도 그대로. 새 좌표 $q'$ 에서도 같은 $\dot{}$ , $\partial / \partial$ 의 기호로 적힘. *형식의 패턴* 이 좌표 무관.

**(b) 값 불변성.** $L'$ 의 *값* 이 $q'$ 의 한 점에서, 같은 점을 다른 좌표로 적은 $L$ 의 값과 같다. 즉 *기하학적* 라그랑지언이 좌표 표현에 의존하지 않는 *하나의 함수*.

(a) 가 (b) 에서 자동으로 따라 나옴. 단, 라그랑주식의 *해석* — 식이 어떤 *물리적 객체* 의 식인지 — 는 (b) 에서만 명확해진다.

**(c) 단진자 두 좌표.** $q = \theta$ 로 적은 $L = \frac{1}{2}m\ell^2 \dot\theta^2 + mg\ell\cos\theta$ 과 $q' = \sin\theta$ 로 적은 $L'$ 가 *값* 으로 같은 함수. $L'$ 을 명시적으로 적으면 — $\dot\theta = \dot q' / \cos\theta = \dot q' / \sqrt{1 - q'^2}$ 이라 — $L' = \frac{1}{2} m\ell^2 \dot q'^2 / (1 - q'^2) + mg\ell\sqrt{1 - q'^2}$. 두 식이 *형태는 다르지만 같은 운동* 을 만든다.

**(d) 1.3.2 의 텐서 변환과의 연결.** 라그랑지언은 *(0,0)-스칼라장* (배위공간 위의 함수). 1.3.2 의 텐서 변환 규칙에서 *스칼라* 는 좌표 변환에 *완전히 불변*. 그 불변성이 공변성 정리의 *심층 이유*.

**(e) 일반상대론으로의 다리.** 라그랑주식이 *시공간의 모든 좌표계에서 같은 형태* 라는 것은 일반상대론의 *일반 공변성* (general covariance) 의 학부 표본. 일반상대론은 4-차원 시공간을 다양체로 잡고, 라그랑지언을 *시공간 위 스칼라* 로 적는다.

## 다음 절(2.1.4)로 가는 다리

지금까지 본 라그랑지언 $L = T - V$ 는 *위치만의 함수* $V(q)$ 를 위치에너지로 가졌다. 그러나 *속도에 의존하는* 힘 — 가장 중요한 예: *전자기 로렌츠 힘* — 도 라그랑주식으로 다룰 수 있다. 그 자리에 등장하는 새 개념이 **일반화 포텐셜** $U(q, \dot q, t)$. 2.1.4 가 그 정의와 로렌츠 힘 예시를 박는다.
