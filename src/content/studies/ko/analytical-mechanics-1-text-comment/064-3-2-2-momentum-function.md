---
title: '3.2.2 — 확장 배위공간의 모멘트 함수: $S(q, t)$ 가 *운동량을 생성*'
description: "끝점의 함수로 본 작용 $S(q, t)$. 그 편미분 $\\partial S/\\partial q^\\alpha = p_\\alpha$, $\\partial S/\\partial t = -H$ — *모멘트 함수* 의 정체. §4.4 의 해밀턴-야코비식의 출발점."
book: analytical-mechanics-1-text-comment
bookTitle: 해석역학 I — 본문 해설
chapter: 64
lang: ko
pairSlug: am1tc-3-2-2-momentum-function
draft: false
updated: 2026-05-18
---

# 3.2.2 — 확장 배위공간의 모멘트 함수: $S(q, t)$ 가 *운동량을 생성*

> 끝점의 함수로 본 작용 $S(q, t)$. 그 편미분 $\partial S/\partial q^\alpha = p_\alpha$, $\partial S/\partial t = -H$ — *모멘트 함수* 의 정체. §4.4 의 해밀턴-야코비식의 출발점.

## 본문이 말하는 것

§3.2.1 의 워이스 원리에서, *실제 운동의 작용* 을 *끝점의 함수* 로 본다:

$$
S(q_2, t_2; q_1, t_1) := \int_{(\gamma_{\text{real}})} L\, dt
$$

여기서 $\gamma_{\text{real}}$ 은 $(q_1, t_1)$ 에서 $(q_2, t_2)$ 로 가는 *실제 운동* 경로 (라그랑주 방정식의 해). 만약 그 경로가 유일하다면 $S$ 는 *끝점의 함수*.

**모멘트 함수** (momentum function) 또는 *작용 함수* 의 성질:

$$
\frac{\partial S}{\partial q_2^\alpha} = p_\alpha(t_2),\quad \frac{\partial S}{\partial t_2} = -H(t_2)
$$

$\frac{\partial S}{\partial q_1^\alpha} = -p_\alpha(t_1),\quad \frac{\partial S}{\partial t_1} = H(t_1)$ (시작점 미분).

증명: 워이스 원리 $\delta S = [p \delta q - H \delta t]_1^2$ 에서, *시작점 고정* + *끝점 변동* 하면 위의 끝점 미분이 떨어진다.

**의미.** $S(q, t)$ 가 *확장 배위공간 위의 함수*. 그 *미분형식*

$$
dS = \frac{\partial S}{\partial q^\alpha}\, dq^\alpha + \frac{\partial S}{\partial t}\, dt = p_\alpha\, dq^\alpha - H\, dt = \theta_L^{\text{ext}}
$$

— *확장 기본 1-형식이 $S$ 의 전미분*. 즉 $\theta_L^{\text{ext}}$ 가 *국소적으로 정확함* (exact, §1.6.6 회수). $S$ 가 그 *원시함수*.

## 한 번 더, 천천히

도해 설명 — 모멘트 함수의 *기하학적* 정체를 짚자.

**(a) 작용이 *경로의 범함수* 에서 *점의 함수* 로 변하는 일.** §3.1.1 에서 $S[q(\cdot)]$ 는 *경로 전체* 의 함수. §3.2.2 에서 $S(q_2, t_2)$ 는 *끝점 두 개의 함수*. *실제 운동 경로* 하나에 *끝점* 두 개를 박아 *작용을 함수* 로 환원.

**(b) $dS = \theta_L^{\text{ext}}$ 의 *위상학적* 의미.** §1.6.6 의 푸앵카레 보조정리 회수 — 확장 1-형식 $\theta_L^{\text{ext}}$ 가 *국소적으로* 정확함. 그 원시함수가 모멘트 함수 $S$. *전역적* 인 $S$ 는 *경로가 유일* 한 영역에서만 잘 정의됨. *카우스틱* (caustic) 에서 경로가 두 개 이상 — $S$ 가 다가 함수 (multi-valued).

**(c) 해밀턴-야코비식의 시드.** $\partial S/\partial t + H(q, \partial S/\partial q, t) = 0$ — 해밀턴-야코비식 (§4.4). 이게 *모멘트 함수가 만족하는 1차 편미분 방정식*. 식의 해 $S(q, t)$ 가 운동의 *전체 정보* 를 인코딩.

**(d) 광학과의 *유사*.** 광선의 *광학 경로* 가 *eikonal* 함수 $\Phi$ 를 만든다. 그 미분이 *빛의 방향*. 입자의 *작용* $S$ 가 *유사 eikonal*, 그 미분이 *운동량*. 광학과 입자 역학의 평행 관계 — *de Broglie* 의 물질파 발상의 수학적 출처.

**(e) 양자역학에서의 *위상*.** 양자역학에서 파동함수 $\psi = A e^{iS/\hbar}$. 고전 한계 ($\hbar \to 0$) 에서 $\nabla \psi / \psi \approx i (\nabla S)/\hbar = i p/\hbar$. *모멘트 함수 $S$ 의 그라디언트가 운동량* 이라는 사실의 *양자판*. WKB 근사의 출발점.

**(f) *생성 함수* 어휘의 시작.** $S(q, t)$ 가 *운동량과 에너지를 생성* 하는 함수. §5.3.1 의 정준 변환의 *생성 함수* 가 같은 형식 — *변환을 만드는 함수*. 본 절이 그 어휘의 시작.

## 다음 절(3.2.3)로 가는 다리

모멘트 함수의 어휘 — 워이스 원리 + 작용을 끝점의 함수로 본 시점 — 이 박혔다. 이제 노에터 정리를 *시간 변환 포함* 으로 일반화할 수 있다. *연속 대칭의 변환이 시간까지 옮길 때* 의 보존량 — 본 절의 어휘로 깔끔히 적힌다. §3.2.3 의 *노에터 정리의 확장* 이 그 결과.
