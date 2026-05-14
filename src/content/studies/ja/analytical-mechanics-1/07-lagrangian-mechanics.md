---
title: 'ラグランジュ力学 — $TM$ 上の関数が運動を決める'
description: '力の釣り合いではなく一つの関数 $L: TM \to \mathbb{R}$ から運動方程式を導く視点の転換 — 点と速度の組の上で定義されるLagrangianとEuler–Lagrange方程式。'
book: analytical-mechanics-1
bookTitle: 解析力学 I
chapter: 7
lang: ja
pairSlug: am1-lagrangian-mechanics
draft: false
updated: 2026-05-14
---

# ラグランジュ力学 — $TM$ 上の関数が運動を決める

> 力の釣り合いではなく一つの関数 $L: TM \to \mathbb{R}$ から運動方程式を導く視点の転換 — 点と速度の組の上で定義されるLagrangianとEuler–Lagrange方程式。

## はじめに

Newtonの運動方程式は点から点への加速度を扱う。Lagrangeの視点はその一段上に立つ — 運動全体が一つのスカラー関数 $L$ から落ちる絵だ。本章では $L$ が住む舞台、すなわち **接束(tangent bundle)** $TM$ の定義を短く掴み、そこに置かれたLagrangianから **Euler–Lagrange方程式** を書き下し、最後に単振り子一つに手で適用する。読み終えると読者は「$L = T - U$」という見慣れた表式の背後にどんな幾何が敷かれているかを一文で言えるようになり、同じ方程式が8章で変分原理から落ちる場所を心の中にあらかじめ空けておけるはずだ。

## 本論 1 — なぜ $L$ は $TM$ の上に住むのか

前章までに短く現れた **接束** を一行で定義する。点 $q$ とその点における速度ベクトル $v$ の組 $(q, v)$ 全体がなす空間が接束 $TM$ である。式で書けば

$$
TM = \{(q, v) : q \in M, \ v \in T_q M\}
$$

であり、平たく言えば「配位空間 $M$ 上の全ての点 + その点で取り得る全ての速度」の組を集めた多様体だ。座標では $(q^1, \ldots, q^n, \dot q^1, \ldots, \dot q^n)$ の $2n$ 次元空間になる — ここで $\dot q^i$ は時間微分ではなく **速度スロットの名前** であることに注意する。運動の軌跡 $q(t)$ を一本持てば $(q(t), \dot q(t))$ が $TM$ 上の曲線になる。

**Lagrangian** はこの接束上に定義された実関数である:

$$
L : TM \to \mathbb{R}, \qquad (q, \dot q) \mapsto L(q, \dot q)
$$

ほとんどの力学問題ではLagrangianが **運動エネルギーからポテンシャルエネルギーを引いた形** で書かれる:

$$
L(q, \dot q) = T(q, \dot q) - U(q)
$$

ここで $T$ は運動エネルギー、$U$ は位置だけの関数のポテンシャルエネルギーだ。だがLagrange形式そのものはこの分解を強要しない — 電磁場中の荷電粒子や回転系のように $L$ がこの形に収まらない場合も同じ枠組みで扱える。

運動エネルギー $T$ は $M$ 上の **計量 $g_{ij}(q)$** から作られる。座標が曲がっている一般の多様体で二つの速度ベクトルの「長さの二乗」を定義する道具が計量であり、一点における運動エネルギーは

$$
T(q, \dot q) = \tfrac{1}{2} \, g_{ij}(q) \, \dot q^{i} \dot q^{j}
$$

である(Einsteinの総和規約を用いる)。Descartes座標では $g_{ij} = m \, \delta_{ij}$ なので見慣れた $\tfrac{1}{2} m |\dot{\vec x}|^2$ に戻る。極座標や一般座標では $g_{ij}$ が座標に依存するので $T$ も $q$ に依存する。だから $L$ の自然な定義域は $M$ ではなく $TM$ なのだ — Lagrangianは「どこに居て、どれだけ速く動くか」を同時に見なければならない。

## 本論 2 — Euler–Lagrange方程式と単振り子

ではLagrangianから運動方程式を取り出す一行を書き下そう。**Euler–Lagrange方程式**:

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^{i}} - \frac{\partial L}{\partial q^{i}} = 0
$$

各一般座標 $q^i$ ごとに一本ずつ、したがって自由度 $n$ の系では $n$ 本の二階微分方程式が落ちる。この式が変分原理からどう自然に導かれるかは次章(8章)に譲る — 本章では式を道具として使うことに集中する。

手で一回回してみる。長さ $\ell$ (ell) の軽い棒の先に質量 $m$ がぶら下がる **単振り子** を取る。一般座標は鉛直線とのなす角ひとつ、$q = \theta$ (theta) だ。位置は $(\ell \sin\theta, -\ell\cos\theta)$ なので速度の二乗は $\ell^2 \dot\theta^2$、運動エネルギーは

$$
T = \tfrac{1}{2} m \ell^2 \dot\theta^2
$$

ポテンシャルは鉛直下方を基準に取れば $U(\theta) = -m g \ell \cos\theta$. したがってLagrangianは

$$
L(\theta, \dot\theta) = \tfrac{1}{2} m \ell^2 \dot\theta^2 + m g \ell \cos\theta
$$

である。二つの偏微分を計算すれば

$$
\frac{\partial L}{\partial \dot\theta} = m \ell^2 \dot\theta, \qquad \frac{\partial L}{\partial \theta} = -m g \ell \sin\theta
$$

であり、Euler–Lagrange方程式に代入すると

$$
m \ell^2 \ddot\theta + m g \ell \sin\theta = 0 \quad \Longleftrightarrow \quad \ddot\theta = -\frac{g}{\ell} \sin\theta
$$

が落ちる。Newton式で自由物体図を描いて得る式と完全に一致する — ただし **張力** という拘束力は一度も登場しなかった。一般座標を取った瞬間に拘束は式から消える。

## 本論 3 — 二つの見返り: 座標非依存性と加法性

Euler–Lagrange形式が与える最大の見返りは二つだ。

第一に、**座標に対する非依存性**。同じ物理系をDescartes座標で解いても極座標で解いても球座標で解いても、$L$ の **関数としての中身**(同じ点、同じ速度、同じ数値)さえ保たれていれば、Euler–Lagrange方程式の形は変わらない。式中の $q^i$ にどんな座標を差し込んでも、同じ一行を書くことになる。Newton式の $m \ddot x^i = F^i$ の形は曲線座標で崩れる($\Gamma$ が現れる)が、Lagrange式ではその補正が既に $L$ の中に吸収されている。

第二に、**加法性**。二つの部分系が合わさって一つの系を成すとき、全体のLagrangianは

$$
L = L_1 + L_2 + L_{\rm int}
$$

の形に綺麗に分かれる。$L_1, L_2$ は各部分系単独のLagrangian、$L_{\rm int}$ は二つの部分系の結合を担う。二重振り子、$N$ 粒子系、剛体–バネ連成のように自由物体図がすぐに破綻する問題でLagrange法が勝つ — 各部分の $L$ を別々に書いて全部足し、一般座標ごとにEuler–Lagrangeを一本ずつ回せば終わりだ。

この二点こそがLagrange力学が単なるNewton力学の表記変えではなく **再構成** である理由だ。同じ運動をより少ない情報(スカラー関数 $L$ 一つ)で書き、座標が何であってもその情報がそのまま保たれる。

## Pythonで確かめる

```python
# 単振り子を二通りで積分する。
# (1) Euler–Lagrange から落ちた d/dt[m l^2 thetadot] + m g l sin(theta) = 0
# (2) Newton形に整理:  thetaddot = -(g/l) sin(theta)
# 両者は同じ方程式なので軌道も一致するはずだ。
import numpy as np
import matplotlib.pyplot as plt

g, l = 9.81, 1.0
theta0, omega0 = np.pi / 4, 0.0
dt, T_end = 1e-3, 5.0
N = int(T_end / dt)

def f_EL(theta, omega):                # L = (1/2) m l^2 omega^2 + m g l cos(theta)
    return omega, -(g / l) * np.sin(theta)

def rk4(theta, omega):
    k1t, k1o = f_EL(theta, omega)
    k2t, k2o = f_EL(theta + 0.5*dt*k1t, omega + 0.5*dt*k1o)
    k3t, k3o = f_EL(theta + 0.5*dt*k2t, omega + 0.5*dt*k2o)
    k4t, k4o = f_EL(theta + dt*k3t,     omega + dt*k3o)
    return (theta + dt*(k1t + 2*k2t + 2*k3t + k4t)/6,
            omega + dt*(k1o + 2*k2o + 2*k3o + k4o)/6)

th_EL = np.empty(N+1); om_EL = np.empty(N+1)
th_N  = np.empty(N+1); om_N  = np.empty(N+1)
th_EL[0] = th_N[0] = theta0
om_EL[0] = om_N[0] = omega0
for k in range(N):
    th_EL[k+1], om_EL[k+1] = rk4(th_EL[k], om_EL[k])
    # Newton形: 同じ式を同じRK4で — 結果は機械精度で一致するはずだ
    th_N[k+1], om_N[k+1] = rk4(th_N[k], om_N[k])

print(f"max |theta_EL - theta_N| = {np.max(np.abs(th_EL - th_N)):.2e}")
plt.plot(np.linspace(0, T_end, N+1), th_EL, label="EL")
plt.plot(np.linspace(0, T_end, N+1), th_N, '--', label="Newton")
plt.xlabel("t [s]"); plt.ylabel("theta [rad]"); plt.legend(); plt.show()
```

出力の最大差が $10^{-10}$ 以下に落ちれば、二つの表記が同じ物理を別の帳簿で書いているだけだということを手で確認したことになる。

## 次章へ

[8章: 変分原理](../08-variational-principle/)では、本章で書き写しただけのEuler–Lagrange方程式が **作用(action)** という単一の量を最小化(厳密には停留化)する条件から自然に落ちる様子を見る。単振り子で手で回した二つの偏微分は、そこでは変分の二つの項として再び現れる。
