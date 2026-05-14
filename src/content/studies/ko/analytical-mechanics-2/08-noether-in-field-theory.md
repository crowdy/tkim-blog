---
title: '장론에서의 뇌터 — 보존류와 에너지–운동량 텐서'
description: '연속 대칭이 있는 곳마다 보존류 $j^\mu$ 가 따라온다 — U(1) 회전 대칭이 만든 4-전류와, 시공간 평행이동이 만든 에너지–운동량 텐서 $T^{\mu\nu}$ 의 첫 만남.'
book: analytical-mechanics-2
bookTitle: 해석역학 II
chapter: 8
lang: ko
pairSlug: am2-noether-field-theory
draft: false
updated: 2026-05-14
---

# 장론에서의 뇌터 — 보존류와 에너지–운동량 텐서

> 연속 대칭이 있는 곳마다 보존류 $j^\mu$ 가 따라온다 — U(1) 회전 대칭이 만든 4-전류와, 시공간 평행이동이 만든 에너지–운동량 텐서 $T^{\mu\nu}$ 의 첫 만남.

## 들어가며

해석역학 I 에서 이미 한 번 만났던 뇌터 정리(Noether's theorem)는 "라그랑지안이 어떤 연속 변환에 대해 불변이면, 그에 대응하는 보존량이 존재한다"는 한 줄짜리 명제였다. 그때는 시간 평행이동 → 에너지, 공간 평행이동 → 운동량, 회전 → 각운동량이라는 입자계 버전을 봤다. 이 장에서는 같은 정리를 무한 자유도 — 즉 장(field) — 위에서 다시 쓴다. 결과는 단순한 "보존량"이 아니라, 시공간 위에 깔린 **보존류** $j^\mu$ (mu, 4-시공간 첨자) 이다. 이 장을 끝내면 양자장론 교과서 첫 장에서 마주치는 "U(1) 대칭 → 전하 보존", "시공간 평행이동 → 에너지–운동량 보존" 이라는 표어들이 어떤 계산에서 나오는지를 직접 손으로 도출할 수 있다. 이번 장 내내 자연단위 $c = 1$ 을 쓰고, 민코프스키 계량(metric)은 6장과 일관되게 $\eta_{\mu\nu} = \mathrm{diag}(+, -, -, -)$ 로 잡는다.

## 본론 1 — 장에 대한 뇌터 — 진술과 한 줄 증명

장 $\phi(x)$ (여기서 $x = (t, \vec x)$) 에 대한 작용은 라그랑지안 밀도 $\mathcal{L}(\phi, \partial_\mu \phi)$ 의 시공간 적분이다. 미소 변환 $\phi \to \phi + \epsilon\, \delta\phi$ 에 대해 라그랑지안이 **전체 발산** 만큼 변한다고 하자 — 즉 $\delta \mathcal{L} = \epsilon\, \partial_\mu K^\mu$ 인 어떤 $K^\mu$ 가 존재하면, 이 변환은 작용을 (경계항을 빼고) 불변으로 두므로 대칭이다. 그러면 다음의 **보존류**가 정의된다:

$$
j^\mu = \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\, \delta\phi - K^\mu.
$$

장 방정식(Euler–Lagrange) 이 성립하는 해 위에서 $\partial_\mu j^\mu = 0$. 대응되는 **보존 전하**는

$$
Q = \int d^3 x\, j^0
$$

이고, $\partial_t Q = 0$ 이다.

한 줄 증명: $\delta \mathcal{L} = (\partial \mathcal{L}/\partial \phi)\,\delta\phi + (\partial \mathcal{L}/\partial(\partial_\mu \phi))\,\partial_\mu \delta\phi$ 를 펴 적고, 곱셈규칙으로

$$
\delta \mathcal{L} = \partial_\mu\!\left(\frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\,\delta\phi\right) + \left[\frac{\partial \mathcal{L}}{\partial \phi} - \partial_\mu\frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\right]\delta\phi.
$$

오른쪽 둘째 항의 대괄호는 EL 방정식 그 자체라서 해 위에서 0. 그러면 $\partial_\mu K^\mu = \partial_\mu(\partial \mathcal{L}/\partial(\partial_\mu \phi)\,\delta\phi)$ 가 되고, 이를 한쪽으로 옮기면 위의 $j^\mu$ 가 보존됨이 따른다. 이 한 단계 변형이 장론에서 "대칭 → 보존류" 사다리의 전부다.

## 본론 2 — U(1) 예제 — 복소 스칼라장과 4-전류

복소 스칼라장 $\phi(x) \in \mathbb{C}$ 에 대해 가장 단순한 로렌츠 불변 라그랑지안은

$$
\mathcal{L} = \partial^\mu \phi^* \partial_\mu \phi - m^2 \phi^* \phi
$$

이다 ($m$ 은 장의 질량, 자연단위에서 차원은 길이$^{-1}$). 이 라그랑지안은 위상 회전 $\phi \to e^{i\alpha}\phi$, $\phi^* \to e^{-i\alpha}\phi^*$ (임의의 실수 $\alpha$) 에 대해 정확히 불변이다 — $|\phi|^2$ 과 $\partial \phi^*\partial \phi$ 가 모두 $\alpha$ 에 무관하기 때문이다. 이 단일 모수(parameter) 연속 대칭의 군을 **U(1)** 이라 부른다.

미소 변환은 $\alpha \to 0$ 극한에서 $\delta\phi = i\phi$, $\delta\phi^* = -i\phi^*$. 라그랑지안 자체가 정확히 불변이므로 $K^\mu = 0$. 1절의 공식에 대입하면

$$
j^\mu = i\bigl(\phi^* \partial^\mu \phi - \phi\, \partial^\mu \phi^*\bigr).
$$

이 한 줄이 양자장론에서 "전하 4-전류" 라 부르는 양의 출발점이다. 평면파 해 $\phi(x) = A\, e^{-i(\omega t - \vec k \cdot \vec x)}$ 를 대입하면 ($A$ 는 복소 진폭, $\omega$ 는 각진동수, $\vec k$ 는 파수벡터, 분산관계 $\omega^2 = \vec k^2 + m^2$)

$$
j^0 = 2\omega |A|^2, \qquad \vec j = 2\vec k\, |A|^2.
$$

즉 4-전류 $j^\mu$ 는 4-운동량 $p^\mu = (\omega, \vec k)$ 에 단순 비례한다. 비상대론적 슈뢰딩거 방정식의 "확률류 $\rho \vec v$" 가 상대론으로 올라가면 이렇게 4-성분으로 묶인다는 것이 핵심 메시지다. 부호 주의: $j^0$ 은 양수일 수도 음수일 수도 있어서 "확률밀도" 로 직접 해석하지 못하고 — 결국 양자장론에서는 이것을 입자 빼기 반입자의 전하 밀도로 재해석한다.

## 본론 3 — 시공간 평행이동과 에너지–운동량 텐서

시공간 평행이동 $x^\mu \to x^\mu + \epsilon^\mu$ 도 푸앵카레-불변인 임의의 $\mathcal{L}$ 의 대칭이다. 매개변수가 네 개($\mu = 0, 1, 2, 3$) 이므로 이번에는 네 개의 보존류가 동시에 떨어지고, 그 묶음은 자연스레 **2차 텐서** $T^{\mu\nu}$ 로 모인다. 1절 공식을 사도해 적용하면

$$
T^{\mu\nu} = \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\,\partial^\nu \phi - \eta^{\mu\nu}\mathcal{L}
$$

이고 해 위에서 $\partial_\mu T^{\mu\nu} = 0$ 이 네 개($\nu = 0, 1, 2, 3$) 모두 성립한다. 이 텐서를 **(정준) 에너지–운동량 텐서(canonical stress–energy tensor)** 라 부른다.

각 성분의 물리적 해석은 다음과 같다. $T^{00}$ 은 에너지 밀도, $T^{0i}$ 는 운동량 밀도(=에너지 흐름 밀도/$c^2$, 자연단위에서 일치), $T^{ij}$ 는 운동량 $i$-성분이 $j$ 방향으로 흐르는 비율 — 즉 응력(stress). $\partial_\mu T^{\mu 0} = 0$ 은 에너지 보존, $\partial_\mu T^{\mu i} = 0$ 은 운동량 보존이다. 일반상대성이론에서 아인슈타인 방정식의 오른변에 들어가는 그 $T^{\mu\nu}$ 가 바로 여기서 등장한다는 점을 기억해 두자 — 형식 도출은 다음 장에서 다시 만난다.

## 파이썬으로 확인

```python
# U(1) 대칭의 보존류 j^0 가 평면파 위에서 2 omega |A|^2 임을,
# 수치 미분으로 확인하고 전하 Q = ∫ j^0 dx 가 시간에 무관함을 본다.
import numpy as np

A     = 0.7
omega = 2.0
k     = 1.6
m     = 1.2          # omega^2 - k^2 = 4.0 - 2.56 = 1.44 = m^2 -> OK

x  = np.linspace(-10.0, 10.0, 200)
dx = x[1] - x[0]
ts = [0.0, 0.5, 1.0]

expected = 2.0 * omega * abs(A)**2     # = 2.8
print(f"이론값 j^0 = 2 omega |A|^2 = {expected:.4f}")

Q_history = []
for t in ts:
    phase  = -(omega * t - k * x)
    phi    = A * np.exp(1j * phase)         # 복소 평면파
    # 시간 미분: 해석적으로 d phi / dt = -i*omega*phi.
    # 수치 미분을 쓰고 싶을 때는 두 시각에서 차분을 잡는다.
    dt     = 1e-4
    phi_p  = A * np.exp(1j * (-(omega*(t+dt) - k*x)))
    dphidt = (phi_p - phi) / dt
    j0     = 1j * (np.conj(phi) * dphidt - phi * np.conj(dphidt))
    j0     = j0.real                         # 허수부는 수치 0
    Q      = np.trapezoid(j0, x)
    print(f"t={t:.1f}: mean j^0 = {j0.mean():.4f}, std = {j0.std():.2e}, Q = {Q:.4f}")
    Q_history.append(Q)

print(f"Q 변동폭 = {max(Q_history) - min(Q_history):.2e}  (~1e-3 이하면 보존)")
```

mean이 모두 $2.8$ 근방, std가 수치 잡음 수준, $Q$ 의 시간 변동이 $10^{-3}$ 이하라면 위의 이론식이 격자 위에서 그대로 살아남은 것이다.

## 다음 장으로

[9장: 고전에서 양자로](../09-classical-to-quantum/) 에서는 이 장에서 얻은 보존류 $j^\mu$ 와 에너지–운동량 텐서 $T^{\mu\nu}$ 가 양자화 절차에서 어떻게 연산자로 승격되고, 그 결과 보존 전하 $Q$ 가 입자 수 연산자로 재해석되는지를 본다. 뇌터의 정리가 고전과 양자를 잇는 가장 단단한 다리 중 하나라는 사실이 그 장에서 확실해질 것이다.
