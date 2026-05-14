---
title: '変分原理 — 作用を定常にする経路'
description: '経路 $q(t)$ に数を返す汎関数 $S[q] = \int L\,dt$ — その定常点が運動方程式であるという一行が、座標を忘れて場と量子まで延びる橋全体を支える。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 8
lang: ja
pairSlug: am1-variational-principle
draft: false
updated: 2026-05-14
---

# 変分原理 — 作用を定常にする経路

> 経路 $q(t)$ に数を返す汎関数 $S[q] = \int L\,dt$ — その定常点が運動方程式であるという一行が、座標を忘れて場と量子まで延びる橋全体を支える。

## はじめに

7章までで、われわれはラグランジアン $L(q, \dot q, t)$ とそのオイラー–ラグランジュ(Euler–Lagrange)方程式を、多様体上のベクトル場と微分形式の言葉で扱ってきた。本章ではその方程式が *どこから来るのか* をもう一段さかのぼる。答えは **作用(action)** という一つの数。本章を終えれば読者は「物理的軌道とは作用を定常(stationary)にする経路である」というハミルトンの原理を正確に述べられるようになり、$\delta S = 0$ という一行から EL 方程式を手で導けるはずだ。同時に、なぜこの原理が単なる言い換えではなく — 座標変換に無関係で、部分系について加法的で、場・ゲージ・経路積分へまっすぐ拡張する — 力学唯一の普遍言語なのかを一段落で整理できることも目指す。

## 本論 1 — 汎関数としての作用

**汎関数(functional)** とは *関数に数を返す* 写像である。通常の関数 $q: \mathbb{R} \to \mathbb{R}^n$ が点 $t$ に点 $q(t)$ を対応させるのに対し、汎関数は *関数そのもの* に数一つを返す。例:曲線の長さ $\ell[\gamma] = \int |\dot\gamma|\,dt$、領域 $\Omega$ 上の関数の積分 $\int_\Omega f\, dV$。どれも「関数を入れると数が出る」。

解析力学の主役は **作用** という汎関数である。時刻 $t_1, t_2$ と、その間の滑らかな経路 $q: [t_1, t_2] \to M$ に対して

$$
S[q] = \int_{t_1}^{t_2} L\bigl(q(t),\, \dot q(t),\, t\bigr)\, dt
$$

$S$ の単位は $L$ の単位かけ秒、すなわちエネルギー×時間、SI 単位で $\text{J}\cdot\text{s}$。プランク定数 $\hbar$ (エイチバー)が同じ単位であるという事実は、作用が量子力学で再登場するときに意味を取り戻す。

**ハミルトンの原理(principle of stationary action)** はこの一行である:両端点 $q(t_1) = q_1$, $q(t_2) = q_2$ を固定した滑らかな経路の集合のうえで、物理的に実現される経路は $S$ の **定常点(stationary point)** である。定常点とは、小さな変分 $q \to q + \delta q$ に対して $S$ の一次変化が 0 という意味で、最小でも最大でもない鞍点(saddle)であってよい。「最小作用」という言い方が広いが正確ではなく、定常作用と呼ぶのが正しい。

ここで変分 $\delta q$ は **両端点でゼロになる** 任意の滑らかな関数である。つまり $\delta q(t_1) = \delta q(t_2) = 0$。両端点は境界条件として与えられた定数で、変数ではない。

## 本論 2 — $\delta S = 0$ からオイラー–ラグランジュへ

変分を直接計算しよう。$S[q + \delta q] - S[q]$ を $\delta q$ の一次まで展開する。記法はアインシュタインの和の規約をそのまま用い、自由度の添字 $i = 1, \ldots, n$。

$$
\delta S = \int_{t_1}^{t_2} \!\left( \frac{\partial L}{\partial q^i}\,\delta q^i + \frac{\partial L}{\partial \dot q^i}\,\delta \dot q^i \right) dt
$$

ここで $\delta \dot q^i = \frac{d}{dt}(\delta q^i)$ である(変分と時間微分は可換)。第二項を部分積分すると

$$
\int_{t_1}^{t_2} \frac{\partial L}{\partial \dot q^i}\, \frac{d}{dt}(\delta q^i)\, dt = \left[ \frac{\partial L}{\partial \dot q^i}\, \delta q^i \right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \frac{d}{dt}\!\left( \frac{\partial L}{\partial \dot q^i} \right) \delta q^i\, dt
$$

境界項は $\delta q(t_1) = \delta q(t_2) = 0$ により消える。残りをまとめて

$$
\delta S = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q^i} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^i} \right) \delta q^i \, dt
$$

物理的経路は *任意* の許容される $\delta q$ について $\delta S = 0$ でなければならない。ここで **変分法の基本補題(fundamental lemma)** が要る:連続関数 $f(t)$ が、$\delta q(t_1) = \delta q(t_2) = 0$ を満たす任意の滑らかな $\delta q$ について $\int f\, \delta q\, dt = 0$ なら $f \equiv 0$。一行の正当化:もしどこかで $f(t_*) > 0$ なら、その近傍のみで正値の滑らかな山形 $\delta q$ を選べば $\int f \delta q\, dt > 0$ となり仮定に反する。

ゆえに括弧内はすべての $i$ について 0:

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^i} - \frac{\partial L}{\partial q^i} = 0
$$

これがオイラー–ラグランジュ方程式である。6, 7 章で天下り的に受け取ったこの式が、ただひとつの汎関数の定常条件に過ぎないことが、ここで初めて見える。

## 本論 3 — なぜこれは単なる代数ではないのか

EL 方程式は別のやり方で — ニュートン則を一般化座標に変換しても、多様体上の測地線方程式としても — 導ける。それでも変分原理が「力学の真の出発点」とされる理由は三つある。

第一に、**座標の自由さ(coordinate-freedom)**。$S$ はスカラー — 数一つ — である。座標をどう選んでも $S$ の値は変わらない。したがって定常点も変わらない。EL 方程式が任意の滑らかな座標変換のもとで形を保つという事実は、変分原理から見れば *証明するまでもなく* 自明な帰結だ。

第二に、**加法性(additivity)**。部分系 1 と 2 が相互作用しているなら、全系のラグランジアンは $L = L_1 + L_2 + L_\mathrm{int}$ で、$S = S_1 + S_2 + S_\mathrm{int}$。変分も加わる。ニュートン則だと自由度が増えるたびに式を書き直すが、変分原理では項を足すだけで終わる。この加法性は II 巻 5 章で場のラグランジアン密度 $\mathcal{L}$ へ拡張されるときもそのまま生きる。

第三に、そして決定的に、**拡張性**。作用原理は、われわれの知る限り、力学を — 質点から — 場(field)、ゲージ理論、一般相対性、そして量子力学の経路積分(II 巻 9 章)まで **一つの言葉で** 引き継ぐ唯一の形式である。量子力学では $e^{iS/\hbar}$ の位相をあらゆる経路で足し合わせると、古典極限 $\hbar \to 0$ で $\delta S = 0$ の経路が最大寄与を持つことがそのまま従う。「なぜ自然は定常経路を選ぶのか」の答えは、量子力学にあるのである。

## Pythonで確かめる

```python
# 単振り子の離散変分積分(symplectic Verlet)で経路を描き、
# 離散エネルギーが(細かな振動はあれど)時間に対してドリフトしないことを見る。
# ラグランジアン L = (1/2) θ̇² + cos θ  (g/ℓ = 1)。
import numpy as np
import matplotlib.pyplot as plt

dt = 0.05
N  = 200

theta    = np.empty(N + 1)
theta[0] = 0.5             # 初期角度 [rad]
theta[1] = theta[0]        # 初速 0  ⇒  q₁ ≈ q₀

# このラグランジアンに対する離散 EL = symplectic Verlet
for n in range(1, N):
    theta[n + 1] = 2 * theta[n] - theta[n - 1] - dt**2 * np.sin(theta[n])

# 離散運動エネルギー(中心差分)と位置エネルギーで離散エネルギーを定義
v = (theta[2:] - theta[:-2]) / (2 * dt)
E = 0.5 * v**2 - np.cos(theta[1:-1])
t = np.arange(N + 1) * dt

fig, ax = plt.subplots(2, 1, figsize=(6, 4), sharex=True)
ax[0].plot(t, theta);        ax[0].set_ylabel("θ [rad]")
ax[1].plot(t[1:-1], E);      ax[1].set_ylabel("離散エネルギー")
ax[1].set_xlabel("t");       plt.tight_layout(); plt.show()

print(f"E_min = {E.min():.6f},  E_max = {E.max():.6f}")
```

角度はほぼ一定振幅で振動し、離散エネルギーは小さな幅(およそ $10^{-4}$ 以下)で揺れるだけ — ドリフトしないことが変分積分器の特徴で、作用原理から出発した時間積分が *なぜ* 保存量をうまく守るのかは次章の主題である。

## 次章へ

[9章: 対称性と保存量 — ネーターの定理](../09-symmetry-and-conservation/)では、本章で見た作用が **連続対称性** — 時間並進、空間並進、回転 — のもとで不変であるとき、対称性ごとにちょうど一つの保存量(エネルギー、運動量、角運動量)が自動的に従うことを見る。変分原理が EL 方程式をきれいに書く道具ではなく、保存則の生成器であるという事実が次章の本文だ。
