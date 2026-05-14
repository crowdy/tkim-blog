---
title: '摂動理論 — KAM定理と共鳴'
description: '可積分なハミルトン系に小さな摂動を加えると、ほとんどの不変トーラスは生き残るが、共鳴トーラスは壊れる — 可積分性が崩れる仕方。'
book: analytical-mechanics-2
bookTitle: 解析力学 II
chapter: 4
lang: ja
pairSlug: am2-perturbation-theory
draft: false
updated: 2026-05-14
---

# 摂動理論 — KAM定理と共鳴

> 可積分なハミルトン系に小さな摂動を加えると、ほとんどの不変トーラスは生き残るが、共鳴トーラスは壊れる — 可積分性が崩れる仕方。

## はじめに

第3章で我々は作用-角変数 $(J, \theta)$ の上で、可積分なハミルトン系が位相空間をトーラスの束に分割するのを見た。しかし自然に現れるほとんどのハミルトン系は可積分ではない。それなら可積分モデルはただの教科書の飾りなのか? KAM定理(Kolmogorov–Arnold–Moser)はこの問いに驚くほど精密な答を与える。本章を終えれば読者は (1) なぜ小さな摂動が「ほとんどの」トーラスを保ちながらも一部を容赦なく破壊するのか、(2)「共鳴」という言葉が日常のブランコから天体力学までを同じ機構で繋ぐ理由を、一行で説明できるはずだ。

## 本論 1 — 舞台設定と小さい分母の問題

可積分ハミルトニアン $H_0(J)$ から始める。作用 $J = (J_1, \dots, J_n)$ は定数で、各角 $\theta_i$ は一定の角振動数

$$
\omega_i(J) = \frac{\partial H_0}{\partial J_i}
$$

で一様に回転する。すなわち運動は $n$ 次元トーラス上の直線だ。ここに小さな摂動を加える:

$$
H(J, \theta) = H_0(J) + \epsilon\, H_1(J, \theta)
$$

ここで $\epsilon$ (エプシロン、小さな無次元パラメタ) は $|\epsilon| \ll 1$。素朴な期待はこうだ — 新しい運動も少し振動数のずれたトーラス上にあるだろう。この期待を形式的に追うと、新しいトーラスを求める摂動展開の各項に次の**分母**が現れる:

$$
\frac{1}{\vec k \cdot \vec\omega}, \quad \vec k = (k_1, \dots, k_n) \in \mathbb{Z}^n \setminus \{0\}
$$

振動数ベクトル $\vec\omega = (\omega_1, \dots, \omega_n)$ の成分が**有理的に通約可能(rationally commensurate)** であれば、すなわち $\vec k \cdot \vec\omega = 0$ となる整数ベクトル $\vec k$ が存在すれば、その項は発散する。通約可能でなくとも $\vec k \cdot \vec\omega$ は任意に小さくなりうる — これがポアンカレが19世紀に直面した**小分母問題(small divisor problem)** である。

## 本論 2 — 共鳴条件

自由度2の系で、振動数 $\omega_1, \omega_2$ が

$$
m\, \omega_1 + n\, \omega_2 = 0, \quad (m, n) \in \mathbb{Z}^2 \setminus \{(0,0)\}
$$

を満たすとき**共鳴**と呼ぶ。共鳴点で摂動の効果は、時間平均が0になって消えるのではなく、**時間に比例して蓄積する**。仕組みは馴染み深い — ブランコを自分の固有振動数に合わせて押すと振幅が時間に比例して大きくなる、あの現象と同じだ(外力振動数が固有振動数に一致した強制単振動子では応答が $t$ に比例して発散する)。違いは、多自由度系では共鳴の格子が位相空間にびっしりと敷き詰められ、各格子線ごとにトーラスが一つ壊れる点にある。

壊れたトーラスの跡には**共鳴島(resonance island)** と、その間を縫う細いカオス帯が残る。ただしこの帯の幅は $\epsilon$ の正の冪で縮むため、$\epsilon$ が小さいほど舞台全体に占める面積は小さい。

## 本論 3 — 一段落で読むKAM

Kolmogorov(1954)が宣言し、Arnold(1963)とMoser(1962)が完成させた定理は次のように述べる。$H_0$ が**非退化(non-degenerate)**、すなわち振動数写像のヤコビアンが非零、

$$
\det\!\left( \frac{\partial^2 H_0}{\partial J_i\, \partial J_j} \right) \ne 0
$$

であり $H_1$ が十分滑らかなら、十分小さな $\epsilon$ に対し**ほとんどの不変トーラスが生き残る**。正確には、振動数ベクトル $\vec\omega$ がある正の定数 $\gamma, \tau > 0$ について**ディオファントス条件(Diophantine condition)**

$$
|\vec k \cdot \vec\omega| \ge \gamma\, |\vec k|^{-\tau}, \quad \forall\, \vec k \in \mathbb{Z}^n \setminus \{0\}
$$

を満たすトーラスのみが生き残る。生き残ったトーラスは位相空間内で**正の測度を持つカントール状の集合**を成す — びっしりとあるが穴だらけの集合だ。その穴を埋めるのが、壊れた共鳴トーラスの残したカオス領域である。

物理的結論は明快だ。可積分性は**脆い** — どんな摂動もそれを破る。しかし**破れ方は爆発的ではない** — 生き残るトーラスの占有率は $\epsilon \to 0$ で測度1に近づく。これが太陽系が数十億年にわたって「ほぼ可積分」のように振る舞う理由の最初の手がかりであり、同時にカオスがどこから始まるかを指し示す指でもある。

## Pythonで確かめる

強制振り子 $H = p^2/2 + \cos q - 0.1\cos(\omega_d t)$ をRK4で解き、駆動振動数 $\omega_d$ を変えて最大振幅を測る。小振幅の固有振動数 $\omega_{\text{nat}} = 1$ の近くで応答が跳ね上がるはずだ。

```python
import numpy as np
import matplotlib.pyplot as plt

# 強制振り子: dq/dt = p, dp/dt = -sin(q) + 0.1*sin(wd*t)
# H = p^2/2 + cos(q) - 0.1*cos(wd*t) のハミルトン方程式から導く
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

$\omega_d \approx 1$ の近傍にピークが見えれば、本論2で述べた「共鳴で線形に蓄積する応答」を手で一度触ったことになる。

## 次章へ

[第5章: 連続体力学への拡張](../05-continuum-mechanics/)では、有限自由度のハミルトン像を無限自由度の場(field)に押し上げる。作用-角変数の代わりにモード振幅が、トーラスの代わりに無限次元位相空間が現れる。本章で見た「ほとんどは生き残り、一部だけが壊れる」という直観は、場の理論でも — はるかに厄介な姿で — 再び姿を現す。
