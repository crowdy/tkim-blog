---
title: '1.5.1 — 쌍대공간과 코벡터: 벡터를 *수* 로 옮기는 선형 함수'
description: '벡터공간 $V$ 의 *쌍대공간* $V^*$ = $V$ 에서 $\mathbb R$ 로의 선형 함수들. 각 함수가 *코벡터* — 위 첨자 $dx^i$ 가 기저, 변환은 *공변*. 다음 절부터의 텐서 형식의 출발점.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 25
lang: ko
pairSlug: am1tc-1-5-1-dual-space-and-covector
draft: false
updated: 2026-05-17
---

# 1.5.1 — 쌍대공간과 코벡터: 벡터를 *수* 로 옮기는 선형 함수

> 벡터공간 $V$ 의 *쌍대공간* $V^*$ = $V$ 에서 $\mathbb R$ 로의 선형 함수들. 각 함수가 *코벡터* — 위 첨자 $dx^i$ 가 기저, 변환은 *공변*. 다음 절부터의 텐서 형식의 출발점.

## 본문이 말하는 것

$V$ 가 유한 차원 ($n$) 실 벡터공간이라 하자. **쌍대공간** (dual space) $V^*$ 는

$$
V^* := \{\omega : V \to \mathbb R \mid \omega\, \text{는 선형}\}
$$

각 원소 $\omega \in V^*$ 가 **코벡터** (covector), **1-형식** (1-form), 또는 **선형 함수** (linear functional). 정의대로 $\omega(a \mathbf{v} + b \mathbf{w}) = a \omega(\mathbf{v}) + b \omega(\mathbf{w})$.

$V$ 의 기저 $\{\mathbf{e}_1, \dots, \mathbf{e}_n\}$ 에 대응하는 **쌍대 기저** $\{e^1, \dots, e^n\}$ 은

$$
e^i(\mathbf{e}_j) = \delta^i_j
$$

(크로네커 델타). 각 $e^i$ 는 *$i$-번째 성분을 뽑아 주는* 함수.

다양체에서는 차트 좌표 $(x^1, \dots, x^n)$ 의 좌표 기저 $\{\partial_1, \dots, \partial_n\}$ 의 쌍대 기저를 $\{dx^1, \dots, dx^n\}$ 로 적는다 (1.6 의 1-형식 자리). $dx^i$ 는 *$i$-번째 좌표를 뽑아 주는* 코벡터.

임의의 $\omega \in V^*$ 는 $\omega = \omega_i\, e^i$ — *공변* (covariant) 성분. 좌표 변환 $\mathbf{e}_{i'} = (\partial x^j / \partial x^{i'}) \mathbf{e}_j$ 에 대해

$$
e^{i'} = \frac{\partial x^{i'}}{\partial x^j}\, e^j,\qquad \omega_{i'} = \frac{\partial x^j}{\partial x^{i'}}\, \omega_j
$$

기저는 *반변*, 성분은 *공변* — 벡터의 정확히 *반대* 패턴. 이 비대칭이 1.3.1 의 *반변/공변* 대비의 자리.

## 한 번 더, 천천히

도해를 그려 두면 — 코벡터의 *기하학적* 상은 *평행한 평면들의 가족*.

**(a) 코벡터 = 평면.** $\mathbb R^3$ 의 코벡터 $\omega = a\,dx + b\,dy + c\,dz$ 가 벡터 $\mathbf{v} = (v_1, v_2, v_3)$ 에 작용하면 $\omega(\mathbf{v}) = a v_1 + b v_2 + c v_3$ — 내적. 기하학적으로 $\omega = $ const 의 등고선들은 $a x + b y + c z = $ const 의 *평행 평면들*. 벡터가 *그 평면 가족을 몇 개 가로지르는가* 가 $\omega(\mathbf{v})$ 의 값.

**(b) 벡터와 코벡터의 *기하학적 비대칭*.** 벡터는 *화살표*, 코벡터는 *평면 가족*. 둘이 결합해 *수* — *얼마나 가로지르는가* — 를 만든다. 같은 *벡터공간 구조* 를 가지지만 *그림이 다르다*.

**(c) 내적이 *없는* 다양체에서의 의미.** $V$ 와 $V^*$ 는 *추상적으로* 동형 (둘 다 $\mathbb R^n$) 이지만 *자연적* 동형은 없다 — 그 동형을 박는 것이 *내적* 또는 *미터*. 미터 $g_{ij}$ 가 있으면 $\omega_i = g_{ij} v^j$ 로 벡터를 코벡터로 *내릴* 수 있다. 일반 다양체는 미터가 없을 수 있고, 그 경우 벡터와 코벡터는 *진짜로 다른 객체*.

**(d) $V^{**} \cong V$ 의 자연 동형.** $V^*$ 의 쌍대 $V^{**}$ 는 $V$ 와 *자연적으로* 동형 — 벡터 $\mathbf{v}$ 가 코벡터 $\omega$ 에 작용해 $\omega(\mathbf{v})$ 를 만드는 *평가 사상*. 이 동형은 내적과 무관하다.

## 다음 절(1.5.2)로 가는 다리

벡터의 *반변* 성분과 코벡터의 *공변* 성분이 *다르게* 변환된다는 것은, 둘이 *별도의 객체* 임을 의미. 그러나 미터가 주어지면 둘을 *오간다* — 인덱스 올리기·내리기. 1.5.2 는 이 두 종류의 객체를 미터로 *짝짓는* 형식적 절차를 박는다.
