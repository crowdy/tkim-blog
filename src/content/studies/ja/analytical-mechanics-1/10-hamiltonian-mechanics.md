---
title: 'ハミルトン力学 — 位相空間への転換'
description: 'ルジャンドル変換がラグランジアンをハミルトニアンに移し、舞台は配位空間 $M$ から余接束 $T^*M$ へと移り、運動は $2n$ 個の 1 階 ODE であるハミルトン方程式として書き直される。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 10
lang: ja
pairSlug: am1-hamiltonian-mechanics
draft: false
updated: 2026-05-14
---

# ハミルトン力学 — 位相空間への転換

> ルジャンドル変換がラグランジアンをハミルトニアンに移し、舞台は配位空間 $M$ から余接束 $T^*M$ へと移り、運動は $2n$ 個の 1 階 ODE であるハミルトン方程式として書き直される。

## はじめに

これまで我々は配位空間 $M$ の接束 $TM$ の上、すなわち座標と *速度* $(q, \dot q)$ を変数とするラグランジュ流の絵で運動を描いてきた。本章はその舞台を取り替える。速度 $\dot q$ の代わりに共役運動量 $p$ を座標に取り、*余接束* $T^*M$ の上へと移ると、運動方程式は対称的な 1 階のシステムに書き換わる。この一度きりの座標取り替えが、11 章の正準変換、12 章のポアソン括弧、そして量子力学の位相空間直観までを連鎖的に解きほぐす鍵になる。

## 本論 1 — 共役運動量とルジャンドル変換

ラグランジアン $L(q, \dot q, t)$ が与えられたとき、$i$ 番目の座標 $q^i$ に対応する **共役運動量(conjugate momentum)** を

$$
p_i \;=\; \frac{\partial L}{\partial \dot q^i}
$$

で定義する。一粒子で $L = \tfrac12 m \dot q^2 - U(q)$ ならば $p = m\dot q$、つまりお馴染みの線運動量だが、一般には座標の取り方で意味が変わる(角座標なら角運動量、回転座標なら補正項が乗る、という具合)。

ここで $p$ を $(q, \dot q)$ の関数ではなく $(q, p)$ を新たな座標として使いたい。それには上の関係を $\dot q$ について解けなければならず、その可能性を保証する条件が **正則性(regularity)** である。すなわちヘッセ行列

$$
\frac{\partial^2 L}{\partial \dot q^i\, \partial \dot q^j}
$$

がすべての点で可逆であること。このとき陰関数定理から $\dot q^i = \dot q^i(q, p, t)$ が一意に解ける。この仮定の下で **ハミルトニアン(Hamiltonian)** を

$$
H(q, p, t) \;=\; p_i\, \dot q^i(q, p, t) \;-\; L\bigl(q,\, \dot q(q, p, t),\, t\bigr)
$$

と定義する(アインシュタイン規約)。これが $L$ の $\dot q$ に関する **ルジャンドル変換(Legendre transform)** — 関数のグラフではなく接線の傾きを新しい座標に取る古典的な操作である。

具体的に $L = \tfrac12 m\dot q^2 - U(q)$ なら $p = m\dot q$、$\dot q = p/m$、そして

$$
H = p\cdot \frac{p}{m} - \Bigl(\frac12 m \frac{p^2}{m^2} - U\Bigr) = \frac{p^2}{2m} + U(q)
$$

すなわち運動エネルギーと位置エネルギーの和 — 全エネルギーになる。素直な系ではハミルトニアンはエネルギーそのものだが、回転座標や磁場が絡むと両者は分かれる、という話は 12 章で再び戻ってくる。

## 本論 2 — ハミルトン方程式と位相空間 $T^*M$

新しい座標 $(q, p)$ で運動方程式を書き直そう。$H$ の定義式とオイラー–ラグランジュ方程式を両辺微分して整理すると、$H$ の偏微分がそのまま運動を与える。

$$
\dot q^i = \frac{\partial H}{\partial p_i}, \qquad \dot p_i = -\frac{\partial H}{\partial q^i}
$$

これを **ハミルトン方程式(Hamilton's equations)** と呼ぶ。ラグランジュ側の $n$ 個の *2 階* ODE が $2n$ 個の *1 階* ODE に置き換わり、座標と運動量は符号一つを除けばほぼ対称的に登場する。

運動の舞台も一緒に変わる。各点 $q \in M$ で接ベクトル $\dot q$ が住む場所が接空間 $T_qM$ だったとすれば、**余接空間(cotangent space)** $T_q^*M$ はその双対空間 — つまり接ベクトルに実数を返す線形汎関数たちの空間である。共役運動量 $p = p_i\, dq^i$ は自然に $T_q^*M$ の元になる。各点の余接空間をすべての $q$ にわたって集めた多様体 $T^*M$ を **余接束(cotangent bundle)** と呼び、これがハミルトン力学の **位相空間(phase space)** である。次元は $\dim M = n$ のとき $2n$。

$T^*M$ が単に $TM$ の双子ではないことは 11 章ではっきりする。位相空間には座標の取り方によらない自然な 2-形式

$$
\omega \;=\; dq^i \wedge dp_i
$$

があらかじめ刻まれており(これを **シンプレクティック形式(symplectic form)** と呼ぶ)、ハミルトン方程式はこの $\omega$ と関数 $H$ が出会って生み出されるベクトル場の流れである。いまは名前だけ置いておき、正準変換を扱う次章でなぜこの形式が保たれるのかを見せる。

## 本論 3 — 振り子の位相像

ハミルトン流の絵の威力は、積分が不可能な非線形系でも *絵* は描けるという点にある。振り子を例にしよう。座標は角度 $\theta \in [-\pi, \pi]$(両端を同一視した円)、共役運動量は $p = m\ell^2 \dot\theta$。ラグランジアン $L = \tfrac12 m\ell^2 \dot\theta^2 + m g \ell \cos\theta$ のルジャンドル変換は

$$
H(\theta, p) = \frac{p^2}{2 m \ell^2} - m g \ell \cos\theta
$$

であり、$H$ 自身が保存量だから、各軌道は $H = E$ の等高線上に乗る。エネルギー $E$ に応じて三種類の挙動に分かれる。

- $E < m g \ell$: 原点(下側の平衡)を取り巻く閉曲線 — 振動。
- $E = m g \ell$: 上側の不安定平衡 $\theta = \pm\pi$ に漸近する一対の曲線 — **分離線(separatrix)**。到達までに無限の時間がかかる。
- $E > m g \ell$: $\theta$ を一方向に巻き続ける開曲線 — 回転。

分離線の式は $H = m g \ell$ から $p$ を解いて $p = \pm \sqrt{2 m^2 \ell^3 g\,(1 + \cos\theta)}$。単位系 $m = \ell = g = 1$ では綺麗に $p = \pm\sqrt{2(1 + \cos\theta)}$ となる。ラグランジュ座標 $(\theta, \dot\theta)$ で描いた同じ絵と比べると、位相空間の絵は保存量の等高線がそのまま軌道であることが一目で分かる。

## Pythonで確かめる

```python
# 振り子の位相像: ハミルトン方程式を手書き RK4 で積分し
# (theta, p) 平面の上に 15 本の軌道を描く。分離線 E=1 は破線で比較。
import numpy as np
import matplotlib.pyplot as plt

def rhs(s):                                # ハミルトン方程式 (m=l=g=1)
    th, p = s                              # dH/dp = p, -dH/dth = -sin(th)
    return np.array([p, -np.sin(th)])

def rk4_step(s, dt):
    k1 = rhs(s)
    k2 = rhs(s + 0.5 * dt * k1)
    k3 = rhs(s + 0.5 * dt * k2)
    k4 = rhs(s + dt * k3)
    return s + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

dt, T = 0.02, 20.0
N = int(T / dt)

fig, ax = plt.subplots(figsize=(7, 4))
for E in (0.2, 0.6, 1.0, 1.4, 1.8):        # エネルギーを格子状に走査
    for th0 in (-2.0, 0.0, 2.0):           # 初期角度を 3 通り
        val = 2 * (E + np.cos(th0))        # p0^2 = 2(E + cos th0)
        if val < 0:                        # 運動不可能な領域は飛ばす
            continue
        s = np.array([th0, np.sqrt(val)])
        traj = np.empty((N + 1, 2)); traj[0] = s
        for n in range(N):
            traj[n+1] = rk4_step(traj[n], dt)
        ax.plot(traj[:, 0], traj[:, 1], lw=0.7)

th = np.linspace(-np.pi, np.pi, 400)        # 分離線 E=1
ax.plot(th,  np.sqrt(2*(1 + np.cos(th))), "k--", lw=1)
ax.plot(th, -np.sqrt(2*(1 + np.cos(th))), "k--", lw=1)
ax.set_xlabel(r"$\theta$"); ax.set_ylabel(r"$p$"); plt.show()
```

振動領域の閉曲線、回転領域の上下に流れる開曲線、そしてその二つを隔てる破線(分離線)が一画面に揃えば、位相空間の絵が手に入ったことになる。

## 次章へ

[11 章: 正準変換とシンプレクティック構造](../11-canonical-transformations/)では、本論 2 の末尾で名前だけを置いたシンプレクティック形式 $\omega = dq^i \wedge dp_i$ が座標変換に対してどう振る舞うかを見る。$\omega$ を保つ変換を **正準変換** と呼び、この一クラスの変換がハミルトン方程式の形をそのまま保つという事実が、12 章のポアソン括弧と 13 章のハミルトン–ヤコビ方程式のすべてを支えている。
