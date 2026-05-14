---
title: 'ベクトル場と流れ — 時間発展を描く道具'
description: '多様体上の滑らかなベクトル場 $X$ が ODE の右辺となり、その流れ $\phi^t$ が時間発展を描き、二つのベクトル場のリー括弧 $[X, Y]$ が流れの非可換性を測る。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 5
lang: ja
pairSlug: am1-vector-fields
draft: false
updated: 2026-05-14
---

# ベクトル場と流れ — 時間発展を描く道具

> 多様体上の滑らかなベクトル場 $X$ が ODE の右辺となり、その流れ $\phi^t$ が時間発展を描き、二つのベクトル場のリー括弧 $[X, Y]$ が流れの非可換性を測る。

## はじめに

前章までで配位空間 $M$ 上の一点における接ベクトル(tangent vector)が何であるかを見てきた。本章ではその接ベクトルを **すべての点で一斉に** 指定する量 — ベクトル場(vector field) — へ視野を広げる。ベクトル場はそれ自体が運動方程式の右辺であり、その積分曲線は解析力学のあらゆる軌道であり、二つのベクトル場のあいだの非可換性は次章で出会う微分形式とリー微分の土台となる。本章を終えたとき、読者は ODE 一行を「多様体上の流れ」という絵に直ちに翻訳できるはずだ。

## 本論 1 — ベクトル場:点ごとに方向を与える量

滑らかな多様体 $M$ 上の **ベクトル場(vector field)** $X$ とは、各点 $q \in M$ にその点での接ベクトル $X(q)$ を滑らかに対応させる量である。座標 $q = (q^1, \ldots, q^n)$ で標準基底 $\partial_i := \partial / \partial q^i$ を用いると

$$
X = X^i(q)\, \partial_i
$$

(以降もアインシュタインの和の規約を使う。)ここで $X^i: M \to \mathbb{R}$ は滑らかな関数、すなわち **成分関数** である。各点 $q$ に矢印が一本ずつ刺さっている絵を思い浮かべればよい。

ベクトル場の真の役割は ODE の右辺となることだ。曲線 $q(t) \in M$ が次を満たすとき、その曲線はベクトル場 $X$ に「沿って動く」と言う。

$$
\dot q^i(t) = X^i(q(t))
$$

座標を外して多様体上で書けば単に $\dot\gamma = X(\gamma)$。**ベクトル場 = 運動方程式の右辺**。

最も親しみやすい例:平面単振子。位相空間 $TS^1 \ni (\theta, \dot\theta)$ 上にベクトル場

$$
X(\theta, \dot\theta) = \Bigl(\dot\theta,\; -\tfrac{g}{\ell}\sin\theta\Bigr)
$$

を置けば、このベクトル場の流れがそのまま振子の軌道となる。左辺の第一成分は「$\theta$ が $\dot\theta$ だけ変化する」という自明な関係、第二成分が本当の運動方程式 $\ddot\theta = -(g/\ell)\sin\theta$。

## 本論 2 — 積分曲線と流れ

初期点 $q_0 \in M$ を与えれば、ODE の存在・一意性(本章では事実として受け入れる)により $\dot\gamma = X(\gamma)$, $\gamma(0) = q_0$ を満たす曲線 $\gamma_{q_0}(t)$ が(少なくとも短い時間)一意に存在する。これを $X$ の **積分曲線(integral curve)** と呼ぶ。

ここで初期点を変数と見て、時間 $t$ を固定しよう。すると写像

$$
\phi^t: M \to M, \quad \phi^t(q_0) := \gamma_{q_0}(t)
$$

が定義される。この写像の族 $\{\phi^t\}_{t \in \mathbb{R}}$ をベクトル場 $X$ の **流れ(flow)** と呼ぶ。流れは定義により次の群性質を満たす。

$$
\phi^{t+s} = \phi^t \circ \phi^s, \qquad \phi^0 = \mathrm{id}_M
$$

すなわち「$s$ 秒流れた後に $t$ 秒流れた結果」は「$t+s$ 秒を一度に流れた結果」と等しい。この性質は $X$ が時間に依存しない限り自明である。

線形の場合を見ればすべてが鮮明になる。$M = \mathbb{R}^n$ 上で $X(x) = A x$($A$ は $n \times n$ 行列)ならば、ODE $\dot x = Ax$ の解はよく知られているとおり

$$
\phi^t(x_0) = e^{tA} x_0
$$

すなわち流れが行列指数となる。群性質 $e^{(t+s)A} = e^{tA}e^{sA}$ も自動的に従う。第 0 章であらかじめ投げかけた「ODE がどこへ行くのかを知るには結局は行列指数だ」という予告が、ここで一般の多様体版へと衣替えしたわけだ。

## 本論 3 — リー括弧:二つの流れは可換か?

さて、ベクトル場二つ $X, Y$ が同じ多様体上にあるとしよう。自然な問い:二つの流れは可換だろうか?つまり $\phi^t_X \circ \phi^s_Y$ と $\phi^s_Y \circ \phi^t_X$ は等しいか?

その答えを測る量が **リー括弧(Lie bracket)** $[X, Y]$ である。座標成分では

$$
[X, Y]^k = X^i\, \partial_i Y^k - Y^i\, \partial_i X^k
$$

座標を外せば、任意の滑らかな関数 $f: M \to \mathbb{R}$ に対して

$$
[X, Y] f = X(Y f) - Y(X f)
$$

ここで $X f := X^i \partial_i f$ はベクトル場が関数に作用して得られるもう一つの滑らかな関数。すなわちベクトル場は一階微分作用素とも見られ、二つの微分作用素の交換子(commutator)がふたたび一階微分作用素になるという事実こそリー括弧の正体である。

小さな例で手になじませよう。$\mathbb{R}^2$ 上で

$$
X = \partial_x, \qquad Y = x\, \partial_y
$$

成分では $X = (1, 0)$, $Y = (0, x)$。公式をそのまま叩けば $[X, Y]^1 = 1\cdot \partial_x 0 - 0 \cdot \partial_x 1 = 0$, $[X, Y]^2 = 1 \cdot \partial_x x - 0 \cdot \partial_x 0 = 1$。したがって

$$
[X, Y] = \partial_y
$$

幾何的意味:一点から出発して $X$ に沿って時間 $\epsilon$ だけ流れ、そこから $Y$ に沿ってさらに $\epsilon$ 流れ、続いて $X$ を逆方向に $\epsilon$、最後に $Y$ を逆方向に $\epsilon$ だけ戻る。出発点に正確に戻ってきたら二つの流れは可換である。一般には出発点から

$$
\phi^{-\epsilon}_Y \circ \phi^{-\epsilon}_X \circ \phi^{\epsilon}_Y \circ \phi^{\epsilon}_X (q_0) \;=\; q_0 + \epsilon^2 [X, Y](q_0) + O(\epsilon^3)
$$

だけずれる。**リー括弧が 0 でないこと = 二つの流れが可換でないこと**。この一行が、次章で出会う微分形式の外微分(exterior derivative)とリー微分(Lie derivative)のすべての式を支えている。

## Pythonで確かめる

```python
# 2 次元ベクトル場 X(x,y) = (-y, x)(回転の生成元)の積分曲線を
# 手書きの RK4 で積分し、その上に plt.streamplot を重ねて
# 積分曲線とストリームラインが一致することを目で確認する。
import numpy as np
import matplotlib.pyplot as plt

def X(p):                                 # ベクトル場:回転の生成元
    x, y = p
    return np.array([-y, x])

def rk4_step(p, dt):                      # 標準的な 4 次ルンゲ・クッタ
    k1 = X(p)
    k2 = X(p + 0.5 * dt * k1)
    k3 = X(p + 0.5 * dt * k2)
    k4 = X(p + dt * k3)
    return p + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

dt, T = 0.02, 6.0
N = int(T / dt)
initials = [(1.0, 0.0), (1.5, 0.0), (2.0, 0.0), (0.0, 1.2)]
curves = []
for q0 in initials:                       # 初期点ごとに積分曲線を集める
    traj = np.empty((N + 1, 2))
    traj[0] = q0
    for n in range(N):
        traj[n+1] = rk4_step(traj[n], dt)
    curves.append(traj)

# ベクトル場のストリームラインを背景に敷き、積分曲線を上に重ねる
gx, gy = np.meshgrid(np.linspace(-2.5, 2.5, 25), np.linspace(-2.5, 2.5, 25))
plt.streamplot(gx, gy, -gy, gx, density=1.0, color="0.7")
for c in curves:
    plt.plot(c[:, 0], c[:, 1])
plt.gca().set_aspect("equal"); plt.xlabel("x"); plt.ylabel("y"); plt.show()
```

回転の生成元の積分曲線は円のはずで、ストリームラインの上に重ねて描いた RK4 軌道がきっちり円をなぞるなら、「ベクトル場 = 流れ」という絵が手の内に入ったということだ。

## 次章へ

[6 章:微分形式と外微分](../06-differential-forms/)では、本章で見たベクトル場の双対対象 — 1-形式とその外微分 — を導入する。リー括弧 $[X, Y]$ が流れの非可換性を測るなら、外微分 $d\alpha$ は 1-形式が小さな正方形の上でどれほど「閉じていないか」を測る。両者を結ぶカルタンの魔法公式が次章の到達点となる。
