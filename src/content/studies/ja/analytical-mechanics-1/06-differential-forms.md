---
title: '微分形式 — 積分の本当の主役'
description: 'ベクトル解析の grad・curl・div と四つの積分定理は、多様体上の $d$ と一行のストークス定理に統合される。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 6
lang: ja
pairSlug: am1-differential-forms
draft: false
updated: 2026-05-14
---

# 微分形式 — 積分の本当の主役

> ベクトル解析の grad・curl・div と四つの積分定理は、多様体上の $d$ と一行のストークス定理に統合される。

## はじめに

学部のベクトル解析では、grad・curl・div の三つの微分演算と、微積分の基本定理・グリーンの定理・ケルビン–ストークスの定理・ガウスの発散定理という四つの積分定理を、それぞれ別物として暗記する。本章は、その四つの定理が実は一行の同じ式 $\int_M d\omega = \int_{\partial M} \omega$ にまとまるという事実を示す章である。登場する道具は **1-形式**・**ウェッジ積**(wedge product)・**外微分**(exterior derivative) $d$ の三つだけ。本章を終えると読者は「ベクトル場で書かれていた式を 1-形式に書き換えれば、次元によらず同じ定理が使える」という視点を手にする。7 章のラグランジュ力学で作用積分と変分を扱う際、この言語がそのまま必要になる。

## 本論 1 — 1-形式、ベクトルの双対

**1-形式**(1-form) $\omega$ は、ある点でベクトル一つを受け取り実数を一つ返す線形写像である。つまりベクトルの **双対**(dual) だ。座標系 $x^1, \ldots, x^n$ で微分 $dx^i$ を「ベクトルの第 $i$ 成分を取り出す機械」として定義すると、任意の 1-形式はこの基底の線形結合として

$$
\omega = \omega_i \, dx^i
$$

と書ける(アインシュタインの和の規約)。$\omega_i$ が位置の関数なら 1-形式 **場**(field) になる。

最もなじみ深い例が関数 $f(x, y, z)$ の **全微分**(exact differential):

$$
df = \frac{\partial f}{\partial x}\, dx + \frac{\partial f}{\partial y}\, dy + \frac{\partial f}{\partial z}\, dz
$$

物理で「$df$ は微小変位 $d\vec r$ に対する $f$ の変化量」と習ったあの式である。今あらためて見ると、$df$ は単なる記法ではなく **それ自体が 1-形式** だ。変位ベクトルを差し込めば関数値の 1 次変化が返ってくる機械である。

## 本論 2 — ウェッジ積と高次の形式

面積や体積のように向きを持つ量を扱うには、1-形式二つを掛けて 2-形式を作る道具がいる。**ウェッジ積**(wedge product) $\wedge$ は次の規則で定義される反対称な積である:

$$
dx \wedge dy = -\, dy \wedge dx, \qquad dx \wedge dx = 0
$$

反対称というこの一行から全てが従う。3 次元での一般の **2-形式** は

$$
\omega = P\, dy \wedge dz + Q\, dz \wedge dx + R\, dx \wedge dy
$$

の形をとり、ベクトル二つ $\vec u, \vec v$ を差し込むと、その二つが張る平行四辺形の符号付き面積(に $P, Q, R$ の重みを掛けた和)を返す。$n$ 次元多様体上では **最高次** の $n$-形式が体積要素そのものになる。**向き**(orientation) とは「どこでも 0 にならない最高次形式を一つ選ぶこと」と定義される — 座標を介さずに符号付き体積を定める最もきれいな方法だ。

## 本論 3 — 外微分 $d$ と grad・curl・div の統合

**外微分**(exterior derivative) $d$ は、$k$-形式を受け取って $(k+1)$-形式を返す線形演算である。0-形式(関数) $f$ については本論 1 で見た通り $df = \partial_i f\, dx^i$。1-形式 $\omega = \omega_i\, dx^i$ に対しては

$$
d\omega = (\partial_i \omega_j)\, dx^i \wedge dx^j = \tfrac{1}{2}\,(\partial_i \omega_j - \partial_j \omega_i)\, dx^i \wedge dx^j
$$

ウェッジ積の反対称性が自動的に「回転」を拾い出す。$d$ の最重要性質を一行で書けば

$$
d^2 = 0
$$

(偏微分の交換性から直ちに従う)。3 次元ではこの一つの演算がベクトル解析の三演算を統合する:

- 0-形式 $f$ に $d$ を作用させると 1-形式 $df$ — 成分が **勾配** $\nabla f$。
- 1-形式 $\omega = A_x dx + A_y dy + A_z dz$ に $d$ を作用させると 2-形式 — その成分が **回転** $\nabla \times \vec A$。
- 2-形式に $d$ を作用させると 3-形式 — その係数が **発散** $\nabla \cdot \vec B$。

そして $d^2 = 0$ は、恒等式 $\nabla \times \nabla f = 0$ と $\nabla \cdot (\nabla \times \vec A) = 0$ の二本を一度に述べたものに他ならない。

## 本論 4 — 一行のストークス定理

ここからが本題。コンパクトで向きの付いた多様体 $M$ と境界 $\partial M$ に対し、任意の $(\dim M - 1)$-形式 $\omega$ について

$$
\int_M d\omega = \int_{\partial M} \omega
$$

この一行が、学部で別々に覚えた四つの定理をすべて含む。

- $M$ が 1 次元区間 $[a, b]$、$\omega = f$ → **微積分の基本定理** $\int_a^b f'\, dx = f(b) - f(a)$。
- $M$ が平面領域、$\omega = P\, dx + Q\, dy$ → **グリーンの定理** $\iint_M (\partial_x Q - \partial_y P)\, dx\, dy = \oint_{\partial M} (P\, dx + Q\, dy)$。
- $M$ が 3 次元空間内の 2-曲面、$\omega = \vec A \cdot d\vec r$ → **ケルビン–ストークスの定理** $\iint_M (\nabla \times \vec A) \cdot d\vec S = \oint_{\partial M} \vec A \cdot d\vec r$。
- $M$ が 3 次元立体、$\omega$ が 2-形式 → **ガウスの発散定理** $\iiint_M \nabla \cdot \vec B\, dV = \iint_{\partial M} \vec B \cdot d\vec S$。

同じ式を、次元と形式の次数だけ変えて四回書き写しただけである。「一度覚えれば四箇所で使える」式が手に入った瞬間、ベクトル解析が急に小さく見えるようになる。

## Pythonで確かめる

```python
# 単位円板上でグリーンの定理を数値的に確認。
# omega = -y dx + x dy  →  d omega = 2 dx ^ dy
# 境界積分と領域積分のどちらも 2π 近傍になるはず。
import numpy as np

# (a) 境界積分: 単位円を t in [0, 2π] で媒介変数化
N = 20000
t = np.linspace(0.0, 2.0 * np.pi, N, endpoint=False)
dt = (2.0 * np.pi) / N
x, y = np.cos(t), np.sin(t)
dxdt, dydt = -np.sin(t), np.cos(t)

# omega(γ'(t)) = (-y)·x'(t) + x·y'(t) = sin^2 t + cos^2 t = 1
integrand_boundary = (-y) * dxdt + x * dydt
line_integral = np.sum(integrand_boundary) * dt

# (b) 領域積分: d omega = 2 dx ^ dy、単位円板上では 2·面積 = 2π
M = 2000
xs = np.linspace(-1.0, 1.0, M)
ys = np.linspace(-1.0, 1.0, M)
X, Y = np.meshgrid(xs, ys, indexing="xy")
inside = (X * X + Y * Y) <= 1.0
cell_area = (xs[1] - xs[0]) * (ys[1] - ys[0])
area_integral = 2.0 * np.sum(inside) * cell_area

print(f"∫∂M ω   = {line_integral:.6f}")
print(f"∫M  dω  = {area_integral:.6f}")
print(f"理論値 2π = {2.0 * np.pi:.6f}")
```

両者ともに $2\pi \approx 6.2832$ 近傍に落ちれば、ストークス定理の最も素朴な例を手で触ったことになる。格子を細かくするほど領域積分の方がゆっくり収束する。

## 次章へ

[7 章: ラグランジュ力学](../07-lagrangian-mechanics/)では、本章の 1-形式と外微分が作用積分 $S = \int L\, dt$ の変分を扱うのにそのまま使われる。運動方程式の左辺 $\frac{d}{dt}\frac{\partial L}{\partial \dot q} - \frac{\partial L}{\partial q} = 0$ も、結局は位相空間上のある 1-形式が閉形式になるという条件の成分表示にすぎない。形式の言語が頭の中にあると、ラグランジアンからハミルトニアンへ移る次章も、一行のルジャンドル変換として見えてくる。
