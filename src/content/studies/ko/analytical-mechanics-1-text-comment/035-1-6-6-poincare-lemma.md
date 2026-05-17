---
title: '1.6.6 — 푸앵카레 보조정리: *국소적* 으로는 닫힘 = 정확함'
description: '$d \omega = 0$ 인 미분형식은 *국소적* 으로 $\omega = d\alpha$ 의 형태. 즉 닫힘은 *국소적으로* 정확함과 동치. 그러나 *전역적* 으로는 일반적으로 다르다 — 그 차이가 다양체의 위상학.'
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 35
lang: ko
pairSlug: am1tc-1-6-6-poincare-lemma
draft: false
updated: 2026-05-17
---

# 1.6.6 — 푸앵카레 보조정리: *국소적* 으로는 닫힘 = 정확함

> $d \omega = 0$ 인 미분형식은 *국소적* 으로 $\omega = d\alpha$ 의 형태. 즉 닫힘은 *국소적으로* 정확함과 동치. 그러나 *전역적* 으로는 일반적으로 다르다 — 그 차이가 다양체의 위상학.

## 본문이 말하는 것

**푸앵카레 보조정리** (Poincaré lemma). $U \subset \mathbb R^n$ 가 *별 모양 영역* (star-shaped domain — 어떤 점에서 다른 모든 점으로 직선이 들어 있는 영역) 이고 $\omega \in \Omega^p(U)$ 가 *닫힘* ($d\omega = 0$, $p \ge 1$) 이라면, $\omega$ 는 *정확함*: 어떤 $\alpha \in \Omega^{p-1}(U)$ 에 대해 $\omega = d\alpha$.

다양체 일반에서는: 임의의 점 $p \in M$ 의 *충분히 작은 근방* 에서는 닫힌 형식이 정확함. 그러나 다양체 *전체* 에서는 일반적으로 *닫힘 ≠ 정확함*.

차이의 *측정* — **드람 코호몰로지** (de Rham cohomology):

$$
H^p_{dR}(M) := \frac{\{\omega \in \Omega^p : d\omega = 0\}}{\{d\alpha : \alpha \in \Omega^{p-1}\}}
$$

— 닫힌 / 정확. 푸앵카레 보조정리는 *별 모양 영역 위에서 $H^p_{dR} = 0$* 이라는 진술.

## 한 번 더, 천천히

**도해.** 두 예가 *전역 차이* 를 보여 준다.

**(a) $\mathbb R^2$ 의 1-형식 $\omega = y\, dx$.** $d\omega = dy \wedge dx = -dx \wedge dy \neq 0$ — *닫힘이 아님*. 그래서 정확하지도 않다 (자명).

**(b) 펑크 평면 $\mathbb R^2 \setminus \{0\}$ 의 1-형식.**

$$
\omega = \frac{-y\, dx + x\, dy}{x^2 + y^2}
$$

직접 계산하면 $d\omega = 0$ — *닫힘*. 그러나 *정확하지 않다*: $\omega = d\alpha$ 인 함수 $\alpha$ 가 *없다*. (시도해 보면 $\alpha = \arctan(y/x)$ 가 떠오르지만, $\arctan$ 이 펑크 평면 전체에서 *잘 정의되는 함수가 아니다* — 양의 $x$ 축에서 $\pm \pi$ 의 불연속.)

즉 펑크 평면에서 $H^1_{dR} \neq 0$. 이 1차원 차이가 *원점 주위를 한 번 도는* 폐곡선의 존재 — 위상학적 *구멍* — 을 측정한다.

**(c) 원점 근방의 작은 디스크 위에서는 정확.** 같은 $\omega$ 를 펑크 평면의 *작은 별 모양* 부분에 제한하면 $\arctan$ 이 한 가지(branch) 로 잘 정의되어 $\omega = d \arctan(y/x)$. 푸앵카레 보조정리의 *국소* 진술이 적용.

**별 모양 영역의 의미.** *어떤 한 점 $p_0$ 에서 모든 다른 점 $p$ 로의 직선이 영역에 들어 있는* 영역. 볼록 영역 (특히 $\mathbb R^n$ 전체) 이 별 모양. 푸앵카레 보조정리의 증명은 *호모토피 작용소* — $p_0$ 와 $p$ 사이의 직선을 따라 적분 — 으로 명시적인 $\alpha$ 를 만든다.

**물리에서의 출현.**

- *자속* $\mathbf{B}$ (2-형식) 가 닫힘 ($d\mathbf{B} = 0$, 즉 $\nabla \cdot \mathbf{B} = 0$). 단일 연결 영역에서는 정확 — 즉 *벡터 포텐셜* $\mathbf{A}$ 가 있어 $\mathbf{B} = d\mathbf{A}$ (= $\nabla \times \mathbf{A}$). 자기 단극 (monopole) 의 자속은 펑크된 $\mathbb R^3 \setminus \{0\}$ 의 2-형식 — *전역적* 으로 정확하지 않다 (Dirac 의 stringency).
- *전기 정전기장* $\mathbf{E}$ (1-형식) 가 정전기 영역에서 닫힘 ($\nabla \times \mathbf{E} = 0$). 단일 연결 영역에서는 *전위* $\phi$ 가 존재 ($\mathbf{E} = -d\phi$).
- *심플렉틱 2-형식* $\omega = dp \wedge dq$ on $T^*M$ 은 닫힘 ($d\omega = d^2 p \wedge dq + dp \wedge d^2 q = 0$, 정확) — 그러나 $\omega = d\alpha$ 인 *전역적* $\alpha$ 는 없을 수도 있다 (다양체의 위상에 의존).

## 다음 절(1.6.7)로 가는 다리

$d$ 의 *반대* 가 *적분*. $\int_M d\alpha = ?$ 의 답은 다음 1.6.7 ~ 1.6.8 의 스토크스 정리에서 나온다. 푸앵카레 보조정리가 *국소적 역* 을 박았다면, 스토크스 정리는 그것이 *경계와 어떻게 통신* 하는지를 박는다.
