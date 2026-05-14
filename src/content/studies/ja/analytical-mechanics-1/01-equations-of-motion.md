---
title: '運動方程式 — Newtonから一般座標へ'
description: 'Descartes座標の $m\ddot{\vec x} = \vec F$ が立ち止まる場所で、一般座標 $q^i$ と配位空間 $M$ という二つの語が解析力学の扉を開く。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 1
lang: ja
pairSlug: am1-equations-of-motion
draft: false
updated: 2026-05-14
---

# 運動方程式 — Newtonから一般座標へ

> Descartes座標の $m\ddot{\vec x} = \vec F$ が立ち止まる場所で、一般座標 $q^i$ と配位空間 $M$ という二つの語が解析力学の扉を開く。

## はじめに

この章は解析力学全体の出発点である。学部1年で慣れ親しんだNewtonの運動方程式をもう一度書き直し、その式が「拘束のある系」でなぜ不格好になるかを一つの例で見る。その不格好さを解消するために導入される二つの語 — **一般座標** $q^i$ と **配位空間(configuration space)** $M$ — がこの本全体の語彙である。この章を読み終えた読者は自由度(degrees of freedom, DOF)の意味を滑らかに口に出せ、7章でLagrange方程式を導く際に現れる「$q^i$ に対する運動方程式」の場所を、あらかじめ空けておけるようになるはずだ。

## 本論 1 — Descartes座標でのNewton

質量 $m$ の質点が3次元Euclid空間 $\mathbb{R}^3$ の中を動くとしよう。位置を $\vec x(t) = (x^1, x^2, x^3)$、合力を $\vec F$ と書けば、Newtonの第2法則はあの有名な一行になる。

$$
m\,\ddot{\vec x} = \vec F
$$

ここで点は時間微分、$\ddot{\vec x}$ は加速度である。自由質点ならこの一行で十分だ。初期位置と初期速度を与えれば、ODE の存在・一意性により軌道は一つに決まる。

しかし次の例を見よう。半径 $R$ の滑らかな円形のリング上を転がるビーズ。直観的にこの系は **自由度1** である — リング上のどこにあるかは一つの角度 $\theta$ で書けるからだ。ところがDescartes座標で解こうとすると、座標は $(x, y, z)$ の三つを用いつつ「これらは $x^2 + y^2 = R^2$, $z = 0$ を満たす」という **拘束(constraint)** を引きずって歩かねばならない。拘束力は最終的には消えるはずの量だが、式の上では最後まで出没する。気持ちが悪い。

解決策は最初から $\theta$ 一つで運動を書くことだ。しかしそのときの運動方程式はもはや $m\ddot\theta = F_\theta$ のような形ではない — Descartesの直観はそのままでは持ち越せない。だから新しい言葉が要る。

## 本論 2 — 一般座標と配位空間

自由度 $n$ の力学系における **一般座標(generalized coordinates)** とは、系の配位(どこにあり、どう置かれているか)を決定する $n$ 個の独立変数 $q^1, q^2, \ldots, q^n$ の組のことである。これらをまとめて $q = (q^1, \ldots, q^n)$ と書き、上付き添字は冪ではなく座標の番号であると約束する。

許される $q$ の集合を **配位空間** $M$ と呼ぶ。$M$ は一般には平らなEuclid空間ではなく **多様体(manifold)** である — 各点の近傍では $\mathbb{R}^n$ のように滑らかに座標が与えられるが、全体としては曲がっていたり穴が空いていたりするかもしれない空間を指す言葉だ。多様体の正式な定義は3章で扱うので、この章では「各点の近傍に $n$ 個の独立座標 $q^i$ が与えられる空間」程度に理解しておけば十分である。

具体的に挙げると:

- 3次元の自由質点: $n = 3$, $M = \mathbb{R}^3$, 座標は $(x, y, z)$.
- リング上のビーズ: $n = 1$, $M = S^1$ (1次元円), 座標は角度 $\theta \in [0, 2\pi)$.
- 平面単振り子: $n = 1$, $M = S^1$, 座標は鉛直線とのなす角 $\theta$.
- 平面二重振り子: $n = 2$, $M = T^2 = S^1 \times S^1$ (2次元トーラス), 座標は二本の棒の角 $(\theta_1, \theta_2)$.

二重振り子で配位空間が平面 $\mathbb{R}^2$ ではなくトーラスになる点が重要だ。$\theta_1 = 0$ と $\theta_1 = 2\pi$ は同じ物理状態だからである。Descartes座標はこの同値関係を知らない — 一般座標は知っている。

## 本論 3 — 一般力と連鎖律

ではDescartes座標と一般座標をどう繋ぐかを書き留めておこう。Descartes座標 $\vec x$ が一般座標 $q$ の関数として与えられるとする: $\vec x = \vec x(q)$。この関数が滑らかなら、連鎖律により

$$
dx^j = \frac{\partial x^j}{\partial q^i}\, dq^i
$$

(以下、上下に同じ添字が現れたら和をとる — Einsteinの約束。) 外力 $\vec F$ が微小変位 $d\vec x$ に対してする微小仕事は

$$
\vec F \cdot d\vec x = F_j\,dx^j = F_j\,\frac{\partial x^j}{\partial q^i}\, dq^i \equiv Q_i\, dq^i
$$

ここで定義された $Q_i$ が **一般力(generalized force)** である。単位は $q^i$ が長さなら ニュートン、角度ならニュートン・メートル(すなわちトルク)。一般力はDescartes力の成分を $\partial x^j / \partial q^i$ というJacobi成分で重み付け平均したもの、と理解すればよい。

ここでひとつだけ約束しておこう。本章は $Q_i$ の定義までしか書かない。「$q^i$ に対する運動方程式」は7章(Lagrange方程式)で作用の変分から一気に落とす。本節はそのための簿記に過ぎない。

## Pythonで確かめる

```python
# 明示的Euler vs. シンプレクティックEuler の比較: 1次元調和振動子
# q'' = -omega^2 q,  omega = 1
# エネルギー E = (1/2)(p^2 + omega^2 q^2) がどう動くかを見る。
import numpy as np
import matplotlib.pyplot as plt

omega = 1.0
dt = 0.05
t = np.arange(0.0, 50.0 + dt, dt)
N = len(t)

# 初期条件: q(0) = 1, p(0) = 0  ->  E(0) = 0.5
q_e, p_e = np.empty(N), np.empty(N)   # 明示的Euler
q_s, p_s = np.empty(N), np.empty(N)   # シンプレクティックEuler
q_e[0] = q_s[0] = 1.0
p_e[0] = p_s[0] = 0.0

for n in range(N - 1):
    # 明示的Euler: (q, p) を同時に古い値で更新
    q_e[n+1] = q_e[n] + dt * p_e[n]
    p_e[n+1] = p_e[n] - dt * omega**2 * q_e[n]
    # シンプレクティックEuler: 先に p を更新し、その新しい p で q を更新
    p_s[n+1] = p_s[n] - dt * omega**2 * q_s[n]
    q_s[n+1] = q_s[n] + dt * p_s[n+1]

E_e = 0.5 * (p_e**2 + omega**2 * q_e**2)
E_s = 0.5 * (p_s**2 + omega**2 * q_s**2)

plt.plot(t, E_e, label="明示的Euler")
plt.plot(t, E_s, label="シンプレクティックEuler")
plt.xlabel("t"); plt.ylabel("E(t)"); plt.legend(); plt.show()
```

明示的Eulerのエネルギーは時間とともに単調増加し、シンプレクティックEulerのエネルギーは正確値 0.5 の近傍を小さな振幅で振動する。同じ運動を同じ刻み幅で積分しただけなのに、結果はまったく異なる — この差が、10章(Hamilton力学)で扱う **シンプレクティック構造** が保たれねばならない理由の最初の手がかりである。

## 次章へ

[2章: 曲面上の拘束運動](../02-constrained-motion-on-surfaces/)では、本章では絵で見ただけの「拘束のある系」をもう少し定量的に扱う。曲面上にとどまる質点の運動を一般座標で書く手続きを通して、多様体上の運動という語彙が自然に居場所を見つける。
