---
title: '対称性と保存則 — ネーターの定理'
description: 'ラグランジアンがある連続変換に対して不変なら、その変換ひとつにつき軌道上で保存される量がちょうどひとつ落ちてくる。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 9
lang: ja
pairSlug: am1-symmetry-conservation
draft: false
updated: 2026-05-14
---

# 対称性と保存則 — ネーターの定理

> ラグランジアンがある連続変換に対して不変なら、その変換ひとつにつき軌道上で保存される量がちょうどひとつ落ちてくる。

## はじめに

これまで私たちはラグランジアン $L(q, \dot q, t)$ からオイラー–ラグランジュ方程式を取り出し、それが多様体上のベクトル場の流れであることを見てきた。本章はそのラグランジアンがもつ **対称性** がそのまま **保存量** を生むという一行の定理 — エミー・ネーター(Emmy Noether, 1882–1935)の1918年の結果 — を扱う。本章を終えると、読者は運動量・角運動量・エネルギーの保存則がすべて同じ機械から落ちてくる一族であることを一段落で説明できるようになり、中心力問題の平面性のように「なぜそうなるか」答えにくかった事実が、対称性という一語で整理される経験をすることになる。

## 本論 1 — ネーターの定理

配位空間の座標 $q = (q^1, \ldots, q^n)$ の上で、**1パラメータ変換(one-parameter transformation)** を

$$
q^i \to q^i + \epsilon\, \xi^i(q)
$$

と置く。ここで $\epsilon$ (エプシロン)は小さな実数パラメータ、$\xi^i(q)$ (クシー)は滑らかな成分関数である。この変換がラグランジアンの **対称(symmetry)** であるとは、一次の項まで

$$
\delta L = L(q + \epsilon\xi, \dot q + \epsilon\dot\xi, t) - L(q, \dot q, t) = 0 + O(\epsilon^2)
$$

が成り立つことを意味する。ここで $\dot\xi^i = (\partial \xi^i / \partial q^j)\, \dot q^j$.

**ネーターの定理**: このとき次の量

$$
J = \frac{\partial L}{\partial \dot q^i}\, \xi^i(q)
$$

はオイラー–ラグランジュ方程式の解の上で時間に関して定数である。すなわち $dJ/dt = 0$.

証明のスケッチは一段落で十分である。$\delta L$ を一次まで展開すると

$$
\delta L = \frac{\partial L}{\partial q^i}\, \epsilon \xi^i + \frac{\partial L}{\partial \dot q^i}\, \epsilon \dot\xi^i
$$

仮定により左辺は 0. 右辺第一項にオイラー–ラグランジュ方程式 $\partial L / \partial q^i = d/dt(\partial L / \partial \dot q^i)$ を軌道上(on-shell)で代入し、第二項とまとめると積の微分の形になる。整理すると $\epsilon \cdot dJ/dt = 0$、つまり $J$ は保存される。**対称 → 保存** の機械はこの一行で尽きる。

## 本論 2 — 三つの古典的な例

同じ定理が見慣れた保存則をまとめて落としてくる。

**(a) 空間並進 $\vec x \to \vec x + \epsilon \hat n$.** 自由粒子や閉じた多体系のようにラグランジアンが絶対位置 $\vec x$ に依存しない場合、$\xi^i = \hat n^i$. ネーターの $J$ は $J = (\partial L / \partial \dot x^i)\, \hat n^i = \vec p \cdot \hat n$、すなわち $\hat n$ 方向の **線運動量(linear momentum)** が保存される。独立な三方向を取れば $\vec p$ 全体が保存される。

**(b) $\hat n$ 軸まわりの回転.** 微小回転は $\delta \vec r = \epsilon\, \hat n \times \vec r$、すなわち $\xi^i = (\hat n \times \vec r)^i$. ネーターの $J$ は

$$
J = \vec p \cdot (\hat n \times \vec r) = \hat n \cdot (\vec r \times \vec p) = \vec L \cdot \hat n
$$

ここで $\vec L = \vec r \times \vec p$ が **角運動量(angular momentum)**. ラグランジアンが $\hat n$ 軸まわりの回転に対して不変なら、$\vec L \cdot \hat n$ が保存される。

**(c) 時間並進 $t \to t + \epsilon$.** ラグランジアンが時間に陽に依存しないとき($\partial L / \partial t = 0$)、まったく同じ論法は使えないが同じ精神に沿って進むと

$$
H = \frac{\partial L}{\partial \dot q^i}\, \dot q^i - L
$$

が保存されることを得る。この $H$ が **ハミルトニアン(Hamiltonian)**、標準的な場合は粒子のエネルギーである。この場合は変換が座標ではなく時間パラメータを動かすため、「ラグランジアンの対称」というよりも **作用汎関数(action functional)** の対称として扱うほうがすっきりする。きちんとした処理は次章(ハミルトン力学)に回す。

## 本論 3 — 中心力と $SO(3)$ 対称性

3次元粒子が中心力場の中を運動するラグランジアン

$$
L = \tfrac{1}{2}\, m\, |\dot{\vec r}|^2 - U(|\vec r|)
$$

を見よう。$U$ が $|\vec r|$ にのみ依存するので、$\vec r$ を任意の回転 $R \in SO(3)$ で回しても $|\vec r|$ と $|\dot{\vec r}|^2$ はそのままである。すなわち $L$ は **任意の** 回転に対して不変だ。本論 2 の (b) を $\hat n$ の独立な三選択に適用すれば、角運動量の三成分すべてが保存される。

$$
\frac{d\vec L}{dt} = 0, \qquad \vec L = \vec r \times m \vec v
$$

この一行からケプラー軌道の平面性が従う。$\vec L$ は一定ベクトルだから、任意の時刻 $t$ に対して $\vec r(t) \cdot \vec L = 0$ — つまり運動は $\vec L$ に垂直な一枚の平面に閉じ込められる。惑星軌道が楕円であるという事実より先に、**平面運動であること自体が回転対称の直接の帰結** なのである。

## Pythonで確かめる

```python
# ケプラー問題 (m=1, U=-1/r) で角運動量 L = r × v が保存されるかを
# 手書きの RK4 で積分しながら確認する。相対ドリフトが 1e-6 未満なら合格。
import numpy as np

def accel(r):                                  # 万有引力の加速度 (GM=1)
    return -r / np.linalg.norm(r)**3

def rhs(state):                                # 状態 = (r, v) の6次元
    r, v = state[:3], state[3:]
    return np.concatenate([v, accel(r)])

def rk4_step(s, dt):                           # 標準4次ルンゲ–クッタ
    k1 = rhs(s)
    k2 = rhs(s + 0.5 * dt * k1)
    k3 = rhs(s + 0.5 * dt * k2)
    k4 = rhs(s + dt * k3)
    return s + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

r0 = np.array([1.0, 0.0, 0.0])                 # 初期位置
v0 = np.array([0.0, 0.9, 0.0])                 # 初期速度 → 楕円軌道
state = np.concatenate([r0, v0])

dt, T = 0.005, 10.0
N = int(round(T / dt))
checkpoints = {int(round(t / dt)): t for t in (0.0, 2.5, 5.0, 7.5, 10.0)}
L0 = np.linalg.norm(np.cross(r0, v0))          # 初期 |L|

for n in range(N + 1):
    if n in checkpoints:                       # 五点で |L| を出力
        r, v = state[:3], state[3:]
        L = np.linalg.norm(np.cross(r, v))
        drift = abs(L - L0) / L0
        print(f"t={checkpoints[n]:4.1f}  |L|={L:.10f}  rel.drift={drift:.2e}")
    state = rk4_step(state, dt)
```

五つの時刻すべてで $|\vec L|$ が初期値と小数点以下六桁以上一致していれば、回転対称が保存則へ移されるネーターの機械が、計算機の上でもまったく同じ答えを出すという意味になる。

## 次章へ

[10章: ハミルトン力学](../10-hamiltonian-mechanics/)では、本論 2 (c) で先送りにした時間並進対称とエネルギー保存をきちんと扱う。ラグランジアンからハミルトニアンへ移るルジャンドル変換を導入すれば、位相空間上の流れと保存量の絵が一度に整理される。ネーターの定理はそこでポアソン括弧と再会する。
