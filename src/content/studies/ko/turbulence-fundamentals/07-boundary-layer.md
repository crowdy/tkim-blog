---
title: '경계층 이론 — 벽 근처에서 흐름이 결정된다'
description: '평판 위 얇은 경계층, 벽전단응력에서 끌어내는 마찰속도, 그리고 난류 경계층의 "벽의 법칙"까지 — CFD 코드가 왜 첫 셀의 $y^+$를 묻는지 답할 수 있게 된다.'
book: turbulence-fundamentals
bookTitle: 난류해석의 기초
chapter: 7
lang: ko
pairSlug: turbulence-boundary-layer
draft: false
updated: 2026-05-14
---

# 경계층 이론 — 벽 근처에서 흐름이 결정된다

> 평판 위 얇은 경계층, 벽전단응력에서 끌어내는 마찰속도, 그리고 난류 경계층의 "벽의 법칙"까지 — CFD 코드가 왜 첫 셀의 $y^+$를 묻는지 답할 수 있게 된다.

## 들어가며

이 장이 끝나면 두 가지를 할 수 있어야 한다. 첫째, **벽의 법칙(law of the wall)**을 종이 위에 직접 그릴 수 있어야 한다. 둘째, CFD 보고서에 적힌 "first cell $y^+ \approx 1$"이라는 한 줄이 왜 그렇게 중요한지 친구에게 설명할 수 있어야 한다. 6장에서 다룬 난류 점성 모델은 결국 벽 근처에서 가장 까다롭게 작동하기 때문에, 경계층은 모델링 토론에서 가장 자주 등장하는 영역이다.

## 본론 1 — 경계층은 "벽 옆에 붙은 얇은 층"이다

자동차 표면, 항공기 날개, 파이프 안쪽 — 모든 벽 근처에는 **점성이 무시할 수 없는 얇은 영역**이 생긴다. 이 영역을 **경계층(boundary layer)**이라 부른다. 벽에서는 흐름의 속도가 0이고(점착 조건, no-slip), 멀어질수록 자유흐름 속도 $U_\infty$ ($U$ 무한대, free-stream velocity)에 점점 가까워진다.

흐름이 층류이고 평판 위라면, 경계층 두께 $\delta$ (델타, boundary layer thickness)는 블라시우스(Blasius) 해에 의해 아래처럼 근사된다:

$$
\delta(x) \approx 5 \sqrt{\nu x / U_\infty}
$$

여기서 $x$는 평판 앞전(leading edge)에서 잰 거리, $\nu$ (뉴, kinematic viscosity)는 동점성계수이다. 식이 말하는 바는 단순하다 — 벽을 따라 흐름이 진행될수록 경계층은 $\sqrt{x}$만큼 천천히 두꺼워진다.

## 본론 2 — 벽전단응력과 마찰속도

경계층 안에서 벽이 흐름을 붙잡는 힘은 **벽전단응력(wall shear stress)** $\tau_w$ (타우 워, wall shear)로 표현된다:

$$
\tau_w = \mu \left.\frac{\partial u}{\partial y}\right|_{y=0}
$$

여기서 $\mu$ (뮤, dynamic viscosity)는 점성계수, $u$는 벽에 평행한 방향의 속도, $y$는 벽에서의 수직 거리이다. 식의 의미는 "벽 바로 위에서 속도가 얼마나 가파르게 변하는가에 점성을 곱한 값"이다.

이 $\tau_w$를 밀도 $\rho$ (로, density)로 나누고 제곱근을 씌우면, 단위가 m/s인 새로운 속도 척도가 만들어진다:

$$
u_\tau = \sqrt{\tau_w / \rho}
$$

이 $u_\tau$를 **마찰속도(friction velocity)**라 부른다. 이름은 "속도"지만, 실제 흐름의 속도가 아니라 **벽이 흐름에 가하는 응력에서 유도된 속도 차원의 양**이다. 경계층 안의 모든 길이와 속도를 이 $u_\tau$와 $\nu$로 다시 재면, 모든 평판 난류 경계층이 거의 같은 모양으로 겹쳐진다 — 이게 다음 절의 핵심이다.

## 본론 3 — 벽 단위와 벽의 법칙

거리 $y$와 속도 $u$를 마찰속도와 동점성계수로 무차원화한 양을 **벽 단위(wall units)**라 한다:

$$
y^+ = \frac{y u_\tau}{\nu}
$$

$$
u^+ = \frac{u}{u_\tau}
$$

$y^+$ (와이 플러스)는 벽으로부터의 무차원 거리, $u^+$ (유 플러스)는 무차원 속도다. 난류 경계층을 이 좌표로 다시 그리면, 흐름의 종류와 무관하게 세 개의 영역으로 나뉜다:

- **점성 부분층(viscous sublayer)**: $y^+ < 5$ 구간. 여기서는 점성이 지배하고 속도는 거리에 정비례한다 — $u^+ = y^+$.
- **버퍼층(buffer layer)**: $5 < y^+ < 30$ 구간. 점성과 난류 효과가 비슷한 크기로 경쟁한다. 간단한 닫힌 형태의 식이 없다.
- **로그층(log layer)**: $y^+ > 30$ 구간. 속도가 거리의 로그에 비례한다 — $u^+ = (1/\kappa) \ln y^+ + B$, 여기서 $\kappa \approx 0.41$ (카파, 카르만 상수, Kármán's constant)이고 $B \approx 5.0$이다.

이 세 영역의 그림을 통틀어 **벽의 법칙(law of the wall)**이라 부른다. 산업용 RANS 해석에서는 점성 부분층까지 해석으로 풀고 싶다면 **첫 셀이 $y^+ \lesssim 1$**이어야 한다. 격자를 줄이는 비용을 감당하기 어렵다면 **벽함수(wall functions)**를 사용해 첫 셀을 $30 \lesssim y^+ \lesssim 100$에 두고 로그층의 식으로 속도를 부과할 수 있는데, 박리(separation)나 강한 압력구배(pressure gradient)가 있는 흐름에서는 정확도가 떨어진다.

## 파이썬으로 확인

벽의 법칙을 직접 그려 본다. 점성 부분층은 직선, 로그층은 로그 곡선, 버퍼층은 일부러 비워두고 주석으로 표시한다.

```python
import numpy as np
import matplotlib.pyplot as plt

# 카르만 상수와 로그층 절편
kappa = 0.41
B = 5.0

# 점성 부분층: y+ in [0.1, 5], u+ = y+
y_sub = np.linspace(0.1, 5.0, 50)
u_sub = y_sub

# 로그층: y+ in [30, 1000], u+ = (1/kappa) ln y+ + B
y_log = np.linspace(30.0, 1000.0, 200)
u_log = (1.0 / kappa) * np.log(y_log) + B

fig, ax = plt.subplots(figsize=(7, 5))
ax.semilogx(y_sub, u_sub, label=r"점성 부분층  $u^+ = y^+$")
ax.semilogx(y_log, u_log, label=r"로그층  $u^+ = (1/\kappa)\ln y^+ + B$")

# 버퍼층은 비워두고 표시
ax.axvspan(5, 30, alpha=0.15, color="gray")
ax.text(12, 2, "버퍼층\n(닫힌 식 없음)", ha="center", va="center")

ax.set_xlabel(r"$y^+$")
ax.set_ylabel(r"$u^+$")
ax.set_title("벽의 법칙 — 난류 경계층의 평균 속도 프로파일")
ax.legend()
ax.grid(True, which="both", alpha=0.3)
plt.tight_layout()
plt.show()
```

세미로그 축에서 점성 부분층은 곡선처럼 보이고, 로그층은 직선이 된다 — 로그층의 이름이 여기서 온다. 첫 셀의 $y^+$가 1 근처라는 말은, 이 그림에서 가장 왼쪽 끝의 점성 부분층까지 격자가 도달했다는 뜻이다.

## 다음 장으로

[8장: 자유전단류](../08-free-shear-flows/)에서는 벽이 없는 난류 — 제트(jet), 후류(wake), 혼합층(mixing layer) — 로 이동한다. 벽이 사라지면 마찰속도라는 척도도 사라지고, 대신 흐름 자체의 속도차와 폭이 새로운 척도가 된다. 같은 난류라도 벽 유무에 따라 어떻게 묘사가 바뀌는지 비교하면, 7장의 벽 단위가 왜 그렇게 특별한 도구였는지 거꾸로 이해된다.
