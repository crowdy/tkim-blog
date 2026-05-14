---
title: '渦度と渦度方程式 — 乱流はなぜ必ず3次元なのか'
description: '渦度(vorticity)の定義から始め、渦度方程式の四つの項を一行ずつ読み、渦度伸長項が消える2次元流れがなぜ乱流になり得ないかを辿る。'
book: turbulence-fundamentals
bookTitle: 乱流解析の基礎
chapter: 4
lang: ja
pairSlug: turbulence-vorticity
draft: false
updated: 2026-05-14
---

# 渦度と渦度方程式 — 乱流はなぜ必ず3次元なのか

> 渦度(vorticity)の定義から始め、渦度方程式の四つの項を一行ずつ読み、渦度伸長項が消える2次元流れがなぜ乱流になり得ないかを辿る。

## はじめに

第3章ではナビエ–ストークス方程式を速度 $\vec{u}$ について書いた。本章では同じ方程式を**渦度** $\vec{\omega}$(オメガ)についての形に書き直す。なぜそうするのか — 渦度方程式では圧力項が消え、代わりに**渦度伸長(vortex stretching)** という項が現れるからである。この一項が、第1章で挙げた乱流の五つの特性のうち「3次元の渦度変動」と「小スケールへのエネルギー伝達」を同時に説明する。本章を読み終えた読者は、「なぜ乱流は必ず3次元でなければならないのか」を一行の式で言えるようになる。

## 本論 1 — 渦度とは何か

渦度は速度場の回転(curl)である。$\nabla$(ナブラ、勾配・回転演算子)を用いて

$$
\vec{\omega} = \nabla \times \vec{u}
$$

と定義する。直感的には「流体粒子が自分自身を軸としてどれほど速く回転しているか」の2倍にあたる。剛体のように回転する流れであれば $\vec{\omega}$ は回転軸方向の一定ベクトル、直線的に流れる一様流であれば $\vec{\omega} = 0$ となる。

テンソル表記(第2章)では

$$
\omega_i = \epsilon_{ijk} \frac{\partial u_k}{\partial x_j}
$$

となる。ここで $\epsilon_{ijk}$(エプシロン ijk)は**レヴィ–チヴィタ記号(Levi-Civita symbol)** で、次の規則に従う。

- 巡回順序(123, 231, 312)であれば $+1$
- 反巡回順序(132, 213, 321)であれば $-1$
- 二つの添字が重なれば $0$

六通りを暗記する必要はない。重要なのは、**この記号一つが外積(cross product)を添字表記に綺麗に包んでくれる**という点である。たとえば $\omega_1 = \partial u_3/\partial x_2 - \partial u_2/\partial x_3$ は $\epsilon_{123}=+1, \epsilon_{132}=-1$ から自動的に出てくる。

## 本論 2 — 渦度方程式

非圧縮(密度一定)・外力なしの流れのナビエ–ストークス方程式の両辺に回転をとると圧力項が消去され、次式が得られる。

$$
\frac{\partial \omega_i}{\partial t} + u_j \frac{\partial \omega_i}{\partial x_j} = \omega_j \frac{\partial u_i}{\partial x_j} + \nu \frac{\partial^2 \omega_i}{\partial x_j \partial x_j}
$$

四つの項を左から右へ一行ずつ読む。

- $\partial \omega_i / \partial t$ — 渦度の時間変化
- $u_j \, \partial \omega_i / \partial x_j$ — 流れに乗って渦度が運ばれる**移流(convection)**
- $\omega_j \, \partial u_i / \partial x_j$ — **渦度伸長(vortex stretching)**
- $\nu \, \partial^2 \omega_i / \partial x_j \partial x_j$ — 粘性による**拡散(viscous diffusion)**、ここで $\nu$(ニュー)は動粘度(m²/s)

三番目の項が本章の主役である。渦度ベクトル $\vec{\omega}$ の方向に沿って速度が伸びる(その方向の $\partial u_i/\partial x_j$ が正である)と、渦度自体が増幅される — 回転中のフィギュアスケーターが腕を縮めて速く回るのと同じ仕組みだ。このメカニズムが大きな渦を引き伸ばして細くし、結果としてより小さなスケールに渦度のエネルギーが溜まる。第9章で扱うエネルギーカスケードの微視的正体がこれである。

## 本論 3 — 2次元では渦度伸長が消える

強制的に2次元の流れを考えてみよう。$\vec{u} = (u_x, u_y, 0)$ であり、すべての変数は $z$ に依存しない。渦度を計算すると $x$, $y$ 成分はいずれもゼロになり、

$$
\vec{\omega} = (0, 0, \omega_z)
$$

だけが残る。渦度伸長項 $\omega_j \, \partial u_i / \partial x_j$ では $\omega_j$ のうち $j=3$ 成分のみが生きているので、

$$
\omega_j \frac{\partial u_i}{\partial x_j} = \omega_z \frac{\partial u_i}{\partial z} = 0
$$

となる。$z$ で何も変化しないからである。

結論は決定的だ。

> **2次元流れでは渦度伸長が0となるため、小スケールへのエネルギーカスケードが生じず、したがって第1章で定義した五つの意味での「乱流」は成立しない。**

2次元流れも不規則で拡散性を持ち得るが(これを "2D turbulence" と呼ぶ文献もある)、その力学は小スケールが大スケールへ統合される**逆カスケード(inverse cascade)** であり、3次元乱流とは本質的に異なる現象である。産業CFDが常に3次元メッシュを用いる理由はここにある。

## Pythonで確かめる

最も単純な2次元流れ $\vec{u}(x, y) = (y, 0)$(一様せん断)で $\omega_z$ を数値計算してみる。答えは $\omega_z = \partial u_y/\partial x - \partial u_x/\partial y = 0 - 1 = -1$ で、領域全体にわたって定数となる。

```python
import numpy as np

# 100×100 格子、[0, 1]^2 領域
N = 100
x = np.linspace(0.0, 1.0, N)
y = np.linspace(0.0, 1.0, N)
X, Y = np.meshgrid(x, y, indexing="xy")

# 一様せん断流れ: u_x = y, u_y = 0
u_x = Y
u_y = np.zeros_like(X)

# np.gradient は (行=y, 列=x) の順で微分を返す
dux_dy, dux_dx = np.gradient(u_x, y, x)
duy_dy, duy_dx = np.gradient(u_y, y, x)

# 渦度の z 成分
omega_z = duy_dx - dux_dy

print(f"omega_z 最小値 = {omega_z.min():.6f}")
print(f"omega_z 最大値 = {omega_z.max():.6f}")
print(f"omega_z 平均   = {omega_z.mean():.6f}")
```

三つの値はいずれも $-1$ に近い数として出力される。$\omega_z$ が領域全体で定数であるという事実は、「せん断が一様だから回転の強さもどこでも同じ」という性質をそのまま反映している。この流れは渦度を持つが渦度伸長を持たず、したがって乱流へ発展することはない。

## 次章へ

[第5章: レイノルズ平均とRANS方程式](../05-reynolds-averaging/)では視点を切り替える。これまでは瞬時の速度場 $\vec{u}(\vec{x}, t)$ を扱ってきたが、実際の産業応用では平均流と変動の分離がより有用である。渦度伸長が生み出した変動を、いかにして平均方程式に取り戻すか — いわゆる閉包問題(closure problem)の入口に踏み込む。
