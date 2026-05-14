---
title: '古典場の理論 — スカラー場とKlein–Gordon'
description: '時空のすべての点に一つの実数を載せる — もっとも単純な相対論的波動方程式が、作用原理からどう落ちてくるか。'
book: analytical-mechanics-2
bookTitle: 解析力学 II
chapter: 6
lang: ja
pairSlug: am2-classical-field-theory
draft: false
updated: 2026-05-14
---

# 古典場の理論 — スカラー場とKlein–Gordon

> 時空のすべての点に一つの実数を載せる — もっとも単純な相対論的波動方程式が、作用原理からどう落ちてくるか。

## はじめに

5章で私たちはラグランジュ形式を粒子から場(field)へと拡張した。自由度が可算な集合 $\{q_i(t)\}$ から、時空の上に敷かれた連続関数 $\phi(t, \vec x)$ に変わったが、「作用を停留させれば運動方程式が落ちる」という骨格はそのまま生きている。本章ではその骨格をもっとも単純な事例 — **実スカラー場(real scalar field)** — に適用する。読み終えた読者は、作用一行から **Klein–Gordon方程式** を自力で導けるようになり、なぜこの方程式が量子場理論への最初の足場となるかを一文で言えるはずである。

本章では時空の **計量(metric)** に **(+, -, -, -) 符号規約** を用いる。すなわち $\eta_{\mu\nu} = \mathrm{diag}(+1, -1, -1, -1)$。また本論の途中から自然単位系 $c = 1$ を採る。

## 本論 1 — 4元ベクトルの準備

時空の一点を4元ベクトル

$$
x^\mu = (ct,\ \vec x), \qquad \mu \in \{0, 1, 2, 3\}
$$

と書く。ギリシア添字 $\mu$ (ミュー、mu)は0から3まで走る。0成分が光速かける時間、1から3成分が空間座標である。

**計量テンソル(metric tensor)** $\eta_{\mu\nu}$ は2つの添字を一括して上げ下げする対称行列である。本書では

$$
\eta_{\mu\nu} = \mathrm{diag}(+1, -1, -1, -1)
$$

をとる(いわゆる mostly-minus 規約)。逆行列 $\eta^{\mu\nu}$ も同じ形だ。同じ添字が上下に一度ずつ現れたら0から3まで和をとる — **アインシュタインの縮約規約(Einstein summation)**。

偏微分演算子を4元ベクトルにまとめると

$$
\partial_\mu = \frac{\partial}{\partial x^\mu} = \left( \frac{1}{c}\partial_t,\ \nabla \right), \qquad \partial^\mu = \eta^{\mu\nu}\partial_\nu = \left( \frac{1}{c}\partial_t,\ -\nabla \right).
$$

両者をさらに縮約すると **ダランベルシアン(d'Alembertian)** が現れる:

$$
\Box = \partial^\mu \partial_\mu = \frac{1}{c^2}\partial_t^2 - \nabla^2.
$$

これは4次元版のラプラシアンである。ここから先は表記を簡潔にするため $c = 1$ と置く。時間と空間が同じ単位(長さ)で測られるようになり、$\partial_0 = \partial_t$ となる。

## 本論 2 — スカラー場のラグランジアンとKlein–Gordon

**実スカラー場(real scalar field)** $\phi(t, \vec x)$ は、時空の各点に1個の実数を割り当てる関数である。座標軸を回転やブーストで動かしても、その点での値は変化しない — だから「スカラー」と呼ぶ。

もっとも単純なローレンツ不変なラグランジアン密度(Lagrangian density)は

$$
\mathcal{L} = \tfrac{1}{2}\partial^\mu \phi\, \partial_\mu \phi - \tfrac{1}{2} m^2 \phi^2.
$$

ここで $m$ は場に付随する質量パラメータである。第1項は時空微分2つを縮めて作った運動エネルギー項、第2項はポテンシャル項である。

5章で得た **場に対するオイラー–ラグランジュ方程式**

$$
\partial_\mu \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)} = \frac{\partial \mathcal{L}}{\partial \phi}
$$

に直接代入してみる。左辺の中身は $\partial \mathcal{L}/\partial(\partial_\mu \phi) = \partial^\mu \phi$、右辺は $\partial \mathcal{L}/\partial \phi = -m^2 \phi$。したがって

$$
(\Box + m^2)\, \phi = 0
$$

これが **Klein–Gordon方程式** である。

平面波の試行解 $\phi = e^{-i(\omega t - \vec k \cdot \vec x)}$ を代入すれば $\omega^2 = |\vec k|^2 + m^2$、すなわち **相対論的分散関係** が落ちてくる。質量 $m$ がゼロなら光線分散 $\omega = |\vec k|$ に帰着し、$m \neq 0$ なら波長が短くなるほど群速度が光速に近づく。

## 本論 3 — なぜKlein–Gordonが重要か

Klein–Gordonは **スピン0のボソン(boson)** を記述する最低次の相対論的波動方程式である。1920年代後半、シュレディンガー自身もまずこの式を「相対論的シュレディンガー方程式」の候補として書いてみた。だがすぐ二つの問題にぶつかる。

第一に、時間について **2階** の微分なので、初期条件として $\phi$ だけでなく $\partial_t \phi$ まで与えねばならない。シュレディンガー式は1階だから $\psi$ さえあれば足りた。第二に、$\omega^2 = |\vec k|^2 + m^2$ の解 $\omega = \pm\sqrt{|\vec k|^2 + m^2}$ には **負エネルギー解** が含まれる。単一粒子の確率解釈を無理に被せると、確率密度が負になりうる。

解決はずっと後になって与えられた。Klein–Gordonは一粒子の波動関数ではなく、**量子化(quantization)** を経てスピン0のボソン — たとえばヒッグスやパイ中間子 — を生み出す *古典* 場の方程式なのだ、と。負エネルギー解は反粒子として再解釈される。

本章の結果は9章でもう一度顔を出す。そこでは作用 $S$ を重み $e^{iS/\hbar}$ で結んで全経路にわたる和をとる **経路積分(path integral)** を扱い、$\hbar \to 0$ の極限で停留点が生き残ってオイラー–ラグランジュ式が復元される。Klein–Gordonはその停留点のもっとも美しい例の一つになる。

## Pythonで確かめる

```python
# 1+1次元のKlein-Gordon方程式をleapfrogで積分。
# (∂_t^2 - ∂_x^2 + m^2) φ = 0
# ガウシアン初期条件を入れて、時間と共に波束が分散する様子を見る。
import numpy as np
import matplotlib.pyplot as plt

Nx, dx = 400, 0.1
x = np.linspace(-20, 20, Nx)
dt = 0.05
m = 1.0

# 初期条件: 幅1.5のガウシアン、初速ゼロ
phi_prev = np.exp(-(x / 1.5)**2)
phi = phi_prev.copy()  # ∂_t φ = 0 なので一ステップ前も同じ

snapshots = {0.0: phi.copy()}
target_times = [5.0, 10.0, 15.0]

t, step = 0.0, 0
while t < target_times[-1] + dt:
    lap = np.zeros_like(phi)
    lap[1:-1] = (phi[2:] - 2*phi[1:-1] + phi[:-2]) / dx**2
    phi_next = 2*phi - phi_prev + dt**2 * (lap - m**2 * phi)
    phi_prev, phi = phi, phi_next
    t += dt; step += 1
    for tt in target_times:
        if abs(t - tt) < dt/2 and tt not in snapshots:
            snapshots[tt] = phi.copy()

for tt, snap in snapshots.items():
    plt.plot(x, snap, label=f"t = {tt:.0f}")
plt.xlabel("x"); plt.ylabel(r"$\phi(x, t)$")
plt.legend(); plt.title("1+1D Klein-Gordon — 分散する波束")
plt.show()
```

ガウシアンは時間が進むと左右に分かれていくが、光速だけで進む無質量波と違い、ピークは次第に低くなり幅が広がる。これは $m^2$ 項のせいで $k$ 成分ごとに群速度 $v_g = k/\sqrt{k^2 + m^2}$ が異なる **分散(dispersion)** の結果である。

## 次章へ

[7章: 相対論的力学](../07-relativistic-mechanics/)では本章で用意した4元ベクトルの道具箱を粒子の側に折り返し、自由粒子の作用 $S = -m \int d\tau$ から出発して4元運動量、4元加速度、そして外力下の運動方程式を整理する。場と粒子が同じ変分原理のもとでどう一つの絵に束ねられるかが見えてくる。
