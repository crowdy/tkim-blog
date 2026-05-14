---
title: '섭동 이론 — KAM 정리와 공명'
description: '적분 가능한 해밀턴 계에 작은 섭동을 더하면 대부분의 불변 토러스는 살아남지만, 공명 토러스는 부서진다 — 적분 가능성이 깨지는 방식.'
book: analytical-mechanics-2
bookTitle: 해석역학 II
chapter: 4
lang: ko
pairSlug: am2-perturbation-theory
draft: false
updated: 2026-05-14
---

# 섭동 이론 — KAM 정리와 공명

> 적분 가능한 해밀턴 계에 작은 섭동을 더하면 대부분의 불변 토러스는 살아남지만, 공명 토러스는 부서진다 — 적분 가능성이 깨지는 방식.

## 들어가며

3장에서 우리는 작용-각 변수 $(J, \theta)$ 위에서 적분 가능한 해밀턴 계가 어떻게 위상공간을 토러스의 다발로 분할하는지 보았다. 그러나 자연에 등장하는 거의 모든 해밀턴 계는 적분 가능하지 않다. 그렇다면 적분 가능한 모델은 단지 교과서의 장식일 뿐인가? KAM 정리(Kolmogorov–Arnold–Moser)는 이 질문에 놀라울 만큼 정밀한 답을 준다. 이 장을 끝내면 독자는 (1) 왜 작은 섭동이 "대부분의" 토러스를 보존하면서도 일부를 무자비하게 파괴하는지, (2) **공명**이라는 단어가 일상의 흔들리는 그네에서 천체역학까지 같은 메커니즘으로 등장하는 이유를 한 줄로 설명할 수 있어야 한다.

## 본론 1 — 무대 설정과 작은 분모 문제

적분 가능한 해밀턴 $H_0(J)$ 에서 출발하자. 작용 $J = (J_1, \dots, J_n)$ 은 상수이고, 각 $\theta_i$ 는 일정한 각진동수

$$
\omega_i(J) = \frac{\partial H_0}{\partial J_i}
$$

로 균일하게 회전한다. 즉 운동은 $n$-차원 토러스 위의 직선이다. 여기에 작은 섭동을 더하자:

$$
H(J, \theta) = H_0(J) + \epsilon\, H_1(J, \theta)
$$

여기서 $\epsilon$ (epsilon, 작은 무차원 매개변수)은 $|\epsilon| \ll 1$. 소박한 기대는 이렇다 — 새 운동도 토러스 위에 있되, 진동수만 약간 어긋날 것이다. 이 기대를 형식적으로 따라가면, 새 토러스를 찾기 위한 섭동 전개의 각 항에 다음과 같은 **분모**가 나타난다:

$$
\frac{1}{\vec k \cdot \vec\omega}, \quad \vec k = (k_1, \dots, k_n) \in \mathbb{Z}^n \setminus \{0\}
$$

진동수 벡터 $\vec\omega = (\omega_1, \dots, \omega_n)$ 의 성분들이 **유리수적으로 통약 가능(rationally commensurate)** 하면, 즉 $\vec k \cdot \vec\omega = 0$ 이 되는 정수 벡터 $\vec k$ 가 존재하면, 그 항은 발산한다. 통약 가능하지 않더라도 $\vec k \cdot \vec\omega$ 가 임의로 작아질 수 있고 — 이것이 푸앵카레가 19세기에 마주쳤던 **작은 분모 문제(small divisor problem)**다.

## 본론 2 — 공명 조건

자유도가 둘인 계에서 진동수 $\omega_1, \omega_2$ 가 다음을 만족하면 **공명**이라 부른다:

$$
m\, \omega_1 + n\, \omega_2 = 0, \quad (m, n) \in \mathbb{Z}^2 \setminus \{(0,0)\}
$$

공명점에서 섭동의 효과는 시간에 따라 평균이 0이 되어 사라지는 대신, **선형으로 누적**된다. 메커니즘은 친숙하다 — 그네를 자기 고유진동수에 맞춰 밀면 진폭이 시간에 비례해 커지는 그 현상과 같다(외력 진동수가 고유진동수와 일치한 강제 단순조화진동자에서 응답이 $t$ 에 비례해 발산한다). 차이라면, 자유도가 둘 이상인 계에서는 공명의 격자가 위상공간을 빽빽하게 메우고 있고, 각 격자선마다 토러스 하나가 부서진다는 점이다.

부서진 토러스의 자리에는 **공명섬(resonance island)**과 그 사이를 잇는 가는 카오스 띠가 들어선다. 다만 이 띠의 폭은 $\epsilon$ 의 어떤 양의 거듭제곱으로 줄어들기 때문에, $\epsilon$ 이 작을수록 무대 전체에서 차지하는 면적은 작아진다.

## 본론 3 — 한 문단으로 본 KAM

Kolmogorov(1954)가 발표하고 Arnold(1963)와 Moser(1962)가 완성한 정리는 다음을 말한다. $H_0$ 가 **비퇴화(non-degenerate)**, 즉 진동수 사상의 야코비안이 영이 아니고

$$
\det\!\left( \frac{\partial^2 H_0}{\partial J_i\, \partial J_j} \right) \ne 0
$$

이며 $H_1$ 이 충분히 매끄럽다면, 충분히 작은 $\epsilon$ 에 대해 **대부분의 불변 토러스가 살아남는다**. 정확히 말하면, 진동수 벡터 $\vec\omega$ 가 어떤 양의 상수 $\gamma, \tau > 0$ 에 대해 **디오판토스 조건(Diophantine condition)**

$$
|\vec k \cdot \vec\omega| \ge \gamma\, |\vec k|^{-\tau}, \quad \forall\, \vec k \in \mathbb{Z}^n \setminus \{0\}
$$

을 만족하는 토러스만 살아남는다. 살아남은 토러스들은 위상공간에서 **양의 측도를 가진 칸토어 집합**을 이룬다 — 빽빽하지만 구멍이 숭숭 뚫린 집합. 그 구멍을 채우는 것이 부서진 공명 토러스가 남긴 카오스 영역이다.

물리적 결론은 명료하다. 적분 가능성은 **약하다** — 어떤 섭동이든 그것을 깨뜨린다. 그러나 **부서지는 방식은 폭발적이지 않다** — 측도 1을 향해 살아남는 토러스의 비율은 $\epsilon \to 0$ 일 때 1에 다가간다. 이것이 태양계가 수십억 년 동안 거의 적분 가능한 듯 행동하는 이유의 첫 단서이며, 또한 카오스가 어디에서 시작되는지를 가리키는 손가락이기도 하다.

## 파이썬으로 확인

강제 진자 $H = p^2/2 + \cos q - 0.1\cos(\omega_d t)$ 를 RK4로 풀어, 구동진동수 $\omega_d$ 를 바꿔가며 최대 진폭을 잰다. 소진폭 고유진동수 $\omega_{\text{nat}} = 1$ 근방에서 응답이 솟구쳐야 한다.

```python
import numpy as np
import matplotlib.pyplot as plt

# 강제 진자: dq/dt = p, dp/dt = -sin(q) + 0.1*sin(wd*t)
# H = p^2/2 + cos(q) - 0.1*cos(wd*t) 의 해밀턴 방정식에서 유도
def deriv(t, y, wd):
    q, p = y
    return np.array([p, -np.sin(q) + 0.1 * np.sin(wd * t)])

def rk4(y0, t, wd):
    y = np.zeros((len(t), 2)); y[0] = y0
    for i in range(len(t) - 1):
        h = t[i+1] - t[i]
        k1 = deriv(t[i],       y[i],          wd)
        k2 = deriv(t[i] + h/2, y[i] + h*k1/2, wd)
        k3 = deriv(t[i] + h/2, y[i] + h*k2/2, wd)
        k4 = deriv(t[i] + h,   y[i] + h*k3,   wd)
        y[i+1] = y[i] + h * (k1 + 2*k2 + 2*k3 + k4) / 6
    return y

t = np.linspace(0, 200, 4001)
wds = np.linspace(0.5, 2.0, 20)
amps = [np.max(np.abs(rk4(np.array([0.1, 0.0]), t, wd)[:, 0])) for wd in wds]

plt.plot(wds, amps, 'o-')
plt.axvline(1.0, color='r', ls='--', label=r'$\omega_{\rm nat}=1$')
plt.xlabel(r'$\omega_d$'); plt.ylabel(r'max $|q(t)|$')
plt.legend(); plt.show()
```

$\omega_d \approx 1$ 근방에서 봉우리가 보이면, 본론 2에서 묘사한 "공명에서 선형으로 누적되는 응답"을 손으로 한 번 만져본 셈이다.

## 다음 장으로

[5장: 연속체 역학으로의 확장](../05-continuum-mechanics/)에서는 유한 자유도의 해밀턴 그림을 무한 자유도의 장(field)으로 끌어올린다. 작용-각 변수의 자리에 모드 진폭이, 토러스의 자리에 무한차원 위상공간이 들어선다. 이 장에서 본 "대부분은 살아남고 일부만 부서진다"는 직관은 장 이론에서도 — 다만 훨씬 까다로운 모습으로 — 다시 등장한다.
