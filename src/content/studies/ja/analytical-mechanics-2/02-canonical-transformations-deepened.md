---
title: '正準変換の深化 — 流れは変換であり、変換は流れである'
description: 'ハミルトン流はそれ自体が正準変換であり、正準変換はある関数が生み出す短い流れである — 二つの概念が同じものであることをシンプレクティック形式で束ねる。'
book: analytical-mechanics-2
bookTitle: 解析力学 II
chapter: 2
lang: ja
pairSlug: am2-canonical-deepened
draft: false
updated: 2026-05-14
---

# 正準変換の深化 — 流れは変換であり、変換は流れである

> ハミルトン流はそれ自体が正準変換であり、正準変換はある関数が生み出す短い流れである — 二つの概念が同じものであることをシンプレクティック形式で束ねる。

## はじめに

I 巻第 11 章では正準変換(canonical transformation、以下 CT)を母関数 $F_1, F_2, F_3, F_4$ の観点から定義した。本章は同じ対象に**幾何学的**な衣を着せる。主張は二行に尽きる。第一に、すべてのハミルトン流は CT である。第二に、すべての無限小 CT はある関数 $G(q,p)$ が生む短いハミルトン流である。本章を読み終えた読者は「$Sp(2n)$ の生成子はハミルトニアンである」という一行を、自分の言葉で説き起こせるようになっているはずだ。

## 本論 1 — 復習と視点の転換

I 巻における CT とは、新しい座標 $(Q,P)$ が再びハミルトン形式に従うような座標変換だった。ここではこれを**シンプレクティック形式(symplectic form)** $\omega = dq^i \wedge dp_i$ の保存として定義し直す。$\omega$ は位相空間の各点で二つのベクトルに面積を割り当てる反対称な 2-形式で、直観的には「$(q,p)$ 平面上の微小平行四辺形の面積」の一般化である。

CT は次の二つの同値条件のどちらで捉えてもよい。

(a) ヤコビ行列 $M = \partial(Q,P)/\partial(q,p)$ がシンプレクティック:

$$
M^T J M = J, \qquad J = \begin{pmatrix} 0 & I_n \\ -I_n & 0 \end{pmatrix}
$$

(b) ポアソン括弧が古い変数で計算しても正準関係を保つ:

$$
\{Q_i, Q_j\}_{q,p} = 0, \quad \{P_i, P_j\}_{q,p} = 0, \quad \{Q_i, P_j\}_{q,p} = \delta_{ij}
$$

両者は同じ事実の行列版と微分版である。この物差しを「流れ」という対象に当ててみよう。

## 本論 2 — 流れはそれ自体 CT である

ハミルトニアン $H$ が定めるハミルトンベクトル場 $X_H$ は $\iota_{X_H} \omega = -dH$ という一行で定義される。ここで $\iota$ は**内部積(interior product)** — 2-形式にベクトルを一つ差し込んで 1-形式に落とす演算である。その流れ $\phi^t_H$ が $(q,p)$ を時刻 $t$ 後の $(Q(t), P(t))$ に運ぶ。

主張:$\phi^t_H$ はすべての $t$ について CT である。

証明の骨格は**リー微分(Lie derivative)** — ベクトル場に沿って流したときテンソルがどう変化するかを測る微分 — のカルタン公式である。

$$
\mathcal{L}_{X_H} \omega = d(\iota_{X_H}\omega) + \iota_{X_H}(d\omega) = d(-dH) + 0 = 0
$$

$d^2 = 0$ より第一項が消え、$\omega$ 自身が閉じている ($d\omega = 0$) ので第二項も消える。よって $\omega$ は流れに沿って保存される。保存される $\omega$ のヤコビ行列は自動的にシンプレクティックであり、本論 1 の条件 (a) によって $\phi^t_H$ は CT である。振り子の時間発展でもケプラー軌道の全区間積分でも、その営みそのものが位相空間上の正準変換の 1 パラメータ族なのだ。

## 本論 3 — 無限小 CT と $Sp(2n)$

逆を辿ろう。位相空間上の滑らかな関数 $G(q,p)$ を一つ選ぶ。小さなパラメータ $\varepsilon$ (epsilon)を用いて

$$
\delta q^i = \varepsilon \{q^i, G\} = \varepsilon\, \frac{\partial G}{\partial p_i}, \qquad
\delta p_i = \varepsilon \{p_i, G\} = -\varepsilon\, \frac{\partial G}{\partial q^i}
$$

と定めると、この変換は $O(\varepsilon^2)$ までシンプレクティック条件を満たす。すなわち $G$ は**無限小 CT の生成子**である。運動量が平行移動の生成子、角運動量が回転の生成子、という見慣れた構図がそのまま位相空間全体へ拡張される。

シンプレクティック条件を満たす $2n \times 2n$ 実行列の全体は群をなし、これを**シンプレクティック群** $Sp(2n, \mathbb{R})$ と呼ぶ。そのリー代数は、位相空間上の**二次関数** $G(q,p) = \tfrac{1}{2} z^T S z$($S$ は対称、$z = (q,p)$)がポアソン括弧の下で閉じている空間と完全に一致する。

最も澄んだ例を一つ。$G = (q^2 + p^2)/2$ を取ると、無限小 CT は

$$
\delta q = \varepsilon\, p, \qquad \delta p = -\varepsilon\, q
$$

となり、これは $(q,p)$ 平面の角度 $\varepsilon$ の回転に他ならない。ところがこの $G$ はちょうど単位角振動数の調和振動子のハミルトニアン $H_{\text{HO}}$ である。つまり「調和振動子の時間発展が位相空間の回転」という絵は偶然ではなく、*流れと CT の同値性*の最も単純な事例なのだ。次章で扱う作用・角変数も、まさにこの視点を多次元へ一般化したものに他ならない。

## Pythonで確かめる

単振り子の流れが位相空間の面積を保存するかを手で確かめる。小さな長方形の境界を 200 点で標本化し、流れに乗せて運び、1 秒ごとに多角形の面積を出力する。

```python
import numpy as np

# H = p^2/2 - cos q (単振り子)、ハミルトン方程式
def f(state):
    q, p = state[..., 0], state[..., 1]
    return np.stack([p, -np.sin(q)], axis=-1)

# 小さな長方形の境界上に 200 点(各辺 50 点)
def rect_boundary(q0, q1, p0, p1, n_per_side=50):
    s = np.linspace(0, 1, n_per_side, endpoint=False)
    side1 = np.stack([q0 + (q1-q0)*s, np.full_like(s, p0)], axis=-1)
    side2 = np.stack([np.full_like(s, q1), p0 + (p1-p0)*s], axis=-1)
    side3 = np.stack([q1 + (q0-q1)*s, np.full_like(s, p1)], axis=-1)
    side4 = np.stack([np.full_like(s, q0), p1 + (p0-p1)*s], axis=-1)
    return np.concatenate([side1, side2, side3, side4], axis=0)

def shoelace(pts):
    x, y = pts[:, 0], pts[:, 1]
    return 0.5 * np.abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1)))

pts = rect_boundary(0.5, 0.7, 0.0, 0.3)
dt, n_steps = 0.01, 500
print(f"t=0.0  area = {shoelace(pts):.6f}")
for step in range(1, n_steps + 1):
    k1 = f(pts)
    k2 = f(pts + 0.5*dt*k1)
    k3 = f(pts + 0.5*dt*k2)
    k4 = f(pts + dt*k3)
    pts = pts + (dt/6.0) * (k1 + 2*k2 + 2*k3 + k4)
    if step % 100 == 0:
        print(f"t={step*dt:.1f}  area = {shoelace(pts):.6f}")
```

長方形は時間とともに細長く、湾曲した形に変形してゆくが、出力される面積はどの時刻でも $0.06$ 付近 — 先頭の桁以外の差は $10^{-4}$ レベルに収まる。流れは正準変換であるという本論 2 の主張が、数値の上でも確かに見えたわけだ。

## 次章へ

[3 章:可積分系と作用・角変数](../03-integrable-systems/)では、本章の視点をもう一歩押し進める。互いにポアソン可換な $n$ 個の保存量を持つ系では、流れが作る CT は位相空間をトーラスに切り分け、その上の回転として整理できる。調和振動子が円周上の回転だったように、可積分系は $n$ 次元トーラス上の回転になる。
