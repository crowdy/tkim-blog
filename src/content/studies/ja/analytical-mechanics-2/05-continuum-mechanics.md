---
title: '連続体力学 — 無限自由度への跳躍'
description: 'ばねでつながった $N$ 個の粒子を $N \to \infty$ の極限へ送ると、ラグランジアン密度一行と波動方程式一行が落ちてくる — 同じ変分原理が無限自由度の場(field)へ拡張される過程。'
book: analytical-mechanics-2
bookTitle: 解析力学 II
chapter: 5
lang: ja
pairSlug: am2-continuum-mechanics
draft: false
updated: 2026-05-14
---

# 連続体力学 — 無限自由度への跳躍

> ばねでつながった $N$ 個の粒子を $N \to \infty$ の極限へ送ると、ラグランジアン密度一行と波動方程式一行が落ちてくる — 同じ変分原理が無限自由度の場(field)へ拡張される過程。

## はじめに

ここまで扱ってきたのは自由度(degrees of freedom)が有限の系 — 数個の粒子、剛体、連成振動子 — だけだった。本章はその梯子をもう一段登る。格子上の粒子数 $N$ を無限大に飛ばすと、座標の集合 $\{q_n(t)\}$ は時空上の **場(field)** $\phi(t, x)$ に変わり、ラグランジアンは時空積分の形をした作用へと一般化される。この章を終える頃には、「なぜ電磁気学・一般相対論・場の量子論が揃って同じ変分原理を採用するのか」という問いに対する最初の答えが手に入る。

## 本論 1 — $N$ 個の粒子から連続体へ

質量 $m$ の粒子 $N$ 個が、ばね定数 $K$ のばねで一直線上に結ばれているとする。各粒子の平衡位置からの変位を $q_n(t)$ と書くと、ラグランジアンは

$$
L = \sum_n \tfrac{1}{2} m \dot q_n^2 - \sum_n \tfrac{1}{2} K (q_{n+1} - q_n)^2.
$$

ここで二つのことを同時に行う — 隣接粒子の間隔を $a$ として $a \to 0$、同時に粒子数 $N \to \infty$。ただし、次の三量は固定する: 全長 $L_0 = N a$、単位長さあたりの質量 $\rho = m/a$ (ロー、**線密度**、単位 kg/m)、そして張力 $T = K a$ (単位 N)。変位 $q_n(t)$ は位置 $x = n a$ 上の値 $\phi(t, x)$ とみなす。有限差分は導関数になる — $q_{n+1} - q_n \to a\, \partial_x \phi$。和は積分になる — $\sum_n \to \int dx / a$。運動エネルギー項とポテンシャル項を同時に整理すると

$$
L \to \int dx \left[ \tfrac{1}{2}\rho \dot\phi^2 - \tfrac{1}{2} T (\partial_x \phi)^2 \right].
$$

角括弧の中の量を **ラグランジアン密度** $\mathcal{L}$ (カリグラフィの L) と呼ぶ。

$$
\mathcal{L} = \tfrac{1}{2}\rho \dot\phi^2 - \tfrac{1}{2} T (\partial_x \phi)^2.
$$

作用は時間と空間の両方に渡る積分である。

$$
S = \int dt\, dx\, \mathcal{L}\!\left(\phi, \partial_t \phi, \partial_x \phi\right).
$$

3+1次元に一般化すれば $S = \int \mathcal{L}\, d^4 x$ と書く。場 $\phi(t, x)$ は点 $x$ ごとに独立な自由度を持つ — すなわち、無限自由度を持つ動力学系である。

## 本論 2 — 場の形のオイラー–ラグランジュ方程式

離散系で作用を変分してオイラー–ラグランジュ方程式を導いたのと同じ手続きを場に適用する。時空領域内で変分 $\phi \to \phi + \delta\phi$ を与え、領域の境界では $\delta\phi = 0$ とする。$\delta S = 0$ の結果は

$$
\frac{\partial}{\partial t}\!\left(\frac{\partial \mathcal{L}}{\partial \dot\phi}\right) + \partial_x\!\left(\frac{\partial \mathcal{L}}{\partial(\partial_x \phi)}\right) - \frac{\partial \mathcal{L}}{\partial \phi} = 0.
$$

離散系のラグランジュ方程式と形は同じだ — 時間導関数一つが時間 + 空間導関数の和に置き換わっただけ。本論 1 で書いた弾性弦の $\mathcal{L}$ について各項を計算すると、$\partial \mathcal{L}/\partial \dot\phi = \rho \dot\phi$、$\partial \mathcal{L}/\partial(\partial_x \phi) = -T\, \partial_x \phi$、$\partial \mathcal{L}/\partial \phi = 0$ なので

$$
\rho \ddot\phi - T\, \phi'' = 0
$$

すなわち **波動方程式**

$$
\ddot\phi = c^2\, \phi'', \qquad c = \sqrt{T/\rho}
$$

が落ちる。両端固定の弦 ($\phi(0, t) = \phi(L_0, t) = 0$) 上では変数分離により定常波モード

$$
\phi_n(t, x) = \sin(n\pi x/L_0)\cos(\omega_n t), \qquad \omega_n = n\pi c / L_0
$$

が得られる。離散格子の連成振動モードが、$N \to \infty$ の極限で整数 $n$ でラベル付けされる無限に多くの定常波として滑らかにつながる。

## 本論 3 — なぜこの一歩が大事なのか

同じ変分原理、同じネーター(Noether)論法が、いま無限自由度の場にそのまま適用される。次章(古典場の理論)で見ることになるが、ラグランジアン密度という一個の量を書きさえすれば — 運動方程式、保存量、対称性が自動的に落ちてくる。この枠組みが強力なのは、書く対象 $\mathcal{L}$ を変えるだけで、まったく別の物理が同じ機械の上で走るという点にある。

電磁気学のラグランジアン密度 $\mathcal{L} = -\tfrac{1}{4} F_{\mu\nu} F^{\mu\nu}$ (ここで $F_{\mu\nu}$ は **電磁場テンソル**、4次元時空において電場と磁場を一括りに書いた反対称 2-テンソル)、ゲージ理論、一般相対論、場の量子論はみなこの一行の上に乗っている。第 6 章ではこの枠組みを相対論的スカラー場へ広げ、クライン–ゴルドン方程式へともう一歩進む。

## Pythonで確かめる

```python
# 両端固定の1次元弾性弦の波動方程式を有限差分の leapfrog で積分。
# 初期ガウスパルスが左右に分かれ、端で反射する様子を五つの時刻で見る。
import numpy as np
import matplotlib.pyplot as plt

L, c = 1.0, 1.0               # 弦の長さと波速
N = 200                       # 格子点数
dx = L / (N - 1)
dt = 0.5 * dx / c             # CFL 安定条件
Nt = 2000
x = np.linspace(0, L, N)
r2 = (c * dt / dx) ** 2       # leapfrog 係数の二乗

# 初期条件: 中央のガウス、初速度 0
phi_prev = np.exp(-((x - L / 2) ** 2) / (2 * 0.05 ** 2))
phi_prev[0] = phi_prev[-1] = 0.0
phi = phi_prev.copy()         # 初速度 0 なので 1 ステップ先も同じ

snap_steps = np.linspace(0, Nt - 1, 5, dtype=int)
snapshots = []
for n in range(Nt):
    phi_next = np.zeros_like(phi)
    phi_next[1:-1] = (2 * phi[1:-1] - phi_prev[1:-1]
                      + r2 * (phi[2:] - 2 * phi[1:-1] + phi[:-2]))
    phi_prev, phi = phi, phi_next
    if n in snap_steps:
        snapshots.append((n, phi.copy()))

fig, ax = plt.subplots(figsize=(7, 3))
for n, snap in snapshots:
    ax.plot(x, snap, label=f"t = {n*dt:.2f}")
ax.set(xlabel="x", ylabel="phi(t, x)", title="弦上の波: 五つの時刻")
ax.legend(fontsize=8)
plt.tight_layout()
```

パルスが左右に分かれ、両端で符号を反転して反射する様子が見えれば — 無限自由度系の運動方程式を自分の手で解いたことになる。

## 次章へ

[6章: 古典場の理論](../06-classical-field-theory/) では、本章のスカラー場を相対論的に拡張し、クライン–ゴルドン方程式、ラグランジアン密度のローレンツ不変性、場に対するネーターの定理までを一気に扱う。本章の弦の方程式が、そのまま時空上で回転対称と出会う絵が描かれる。
