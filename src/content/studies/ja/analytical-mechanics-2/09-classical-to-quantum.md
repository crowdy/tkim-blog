---
title: '古典から量子へ — Dirac対応と経路積分'
description: '古典のポアソン括弧が量子の交換子へ移り、すべての経路の位相和が小さな$\hbar$の極限で再び一本の古典経路だけを残す — 同じ川を二本の橋で渡る話。'
book: analytical-mechanics-2
bookTitle: 解析力学 II
chapter: 9
lang: ja
pairSlug: am2-classical-to-quantum
draft: false
updated: 2026-05-14
---

# 古典から量子へ — Dirac対応と経路積分

> 古典のポアソン括弧が量子の交換子へ移り、すべての経路の位相和が小さな$\hbar$の極限で再び一本の古典経路だけを残す — 同じ川を二本の橋で渡る話。

## はじめに

解析力学を最後まで追ってきた読者がごく自然に投げる問いは一つだ — 「この枠組みはどのように量子力学へつながるのか」。本章はその橋を二本 — Diracの正準量子化とFeynmanの経路積分 — に分けて渡る。二つは異なる出発点から出発するが、同じSchrödinger方程式へ到達する。本章を終えると読者は、$\{q, p\} = 1$ がどうして $[\hat q, \hat p] = i\hbar$ になるのかを一行で書け、作用 $S$ が量子力学においてなぜ *位相(phase)* として現れるのかを停留位相の議論で説明できるはずだ。単位は $\hbar = 1$ ではなく、$\hbar$ をそのままSIで残す方針をとる。

## 本論 1 — Dirac対応

Dirac(P. A. M. Dirac, 1902–1984)は1925年に次の辞書(dictionary)を提案した。古典位相空間上の二つの関数 $f, g$ に対する **ポアソン括弧(Poisson bracket)** $\{f, g\}$ — 第4章で導入した、位相空間上の関数同士の反対称な微分演算 — は量子力学では二つの自己共役(self-adjoint)演算子 $\hat f, \hat g$ の **交換子(commutator)** $[\hat f, \hat g] = \hat f \hat g - \hat g \hat f$ と次の関係で対応する:

$$
\{f, g\} \;\longmapsto\; -\frac{i}{\hbar}[\hat f, \hat g].
$$

ここで $\hbar$ (h-bar, 換算プランク定数、$\hbar \approx 1.055 \times 10^{-34}\,\mathrm{J\cdot s}$) が現れる位置に注意したい。古典極限 $\hbar \to 0$ において右辺が発散しないためには、二つの演算子の交換子そのものが $\hbar$ の一次のオーダーで小さくなければならない。最も単純な例 $\{q, p\} = 1$ を量子化すると、有名な正準交換関係(canonical commutation relation)

$$
[\hat q, \hat p] = i\hbar
$$

が落ちる。そしてHamilton方程式 $\dot f = \{f, H\}$ はそのまま **Heisenberg方程式**

$$
i\hbar\, \frac{d\hat f}{dt} = [\hat f, \hat H]
$$

へ移行する — 古典の運動方程式は記号 $\{,\}$ を $-(i/\hbar)[,]$ に置き換えるだけで量子の運動方程式になるわけだ。

ただし、Dirac対応は *導出* ではなく *公準(ansatz)* である。$q, p$ の二次以下の多項式 — 位置、運動量、それらの積まで — のレベルではうまく働くが、三つ以上が混じった多項式(例えば $q^2 p^2$)では量子化するときの順序(Weyl対称順序 / 正規順序 / 反正規順序)の取り方によって結果が変わる。この曖昧さは量子場理論まで続く本質的な問題であり、単に辞書一行で「古典 → 量子」が決まらないことを教えている。

## 本論 2 — Feynmanの経路積分

Feynman(R. P. Feynman, 1918–1988)は1948年にDirac対応とは独立にもう一本の橋をかけた。粒子が時空点 $(x_i, t_i)$ から $(x_f, t_f)$ へ移る振幅は、*すべての可能な経路* についての和として書ける:

$$
K(x_f, t_f; x_i, t_i) = \int \mathcal{D}[x(t)]\, e^{i S[x]/\hbar}.
$$

ここで $\mathcal{D}[x(t)]$ は両端を固定したまま $t_i$ と $t_f$ を結ぶすべての連続経路 $x(t)$ に対する形式的な積分測度であり、$S[x] = \int_{t_i}^{t_f} L\, dt$ は第I巻第1章で見た古典作用である。各経路は自分の作用を位相にもつ単位複素数 $e^{iS/\hbar}$ ひとつとして寄与し、それらをすべて足し合わせたものが量子振幅 $K$ となる。

三点強調しておく。第一に、和は *すべての* 経路に対して行われる — 滑らかな経路、折れ曲がった経路、微分不可能な経路も含む。第二に、各経路の寄与は *同じ大きさ* $|e^{iS/\hbar}| = 1$ をもち、違いは *位相* のみにある。第三に、古典経路 $x_{\rm cl}$ は $\delta S = 0$ を満たす経路 — つまり作用がその近傍で停留(stationary)している経路である。次節ではこの三つがどのように結びついて古典極限を生むかを見る。

## 本論 3 — 停留位相と古典極限の回復

$\hbar$ が小さいとは、位相 $S/\hbar$ が *急速に* 振動するという意味だ。急速に振動する積分は互いに打ち消し合ってゼロに近づくが、ひとつだけ例外がある — $S$ の導関数がゼロとなる点、つまり停留点(stationary point)の近傍では位相がゆっくりと変化するので寄与が生き残る。これが停留位相近似(stationary-phase approximation)の核であり、経路積分においては停留経路がまさに古典経路 $x_{\rm cl}$ である。

古典経路の周りで $x(t) = x_{\rm cl}(t) + \delta x(t)$ と置き、作用を展開すれば

$$
S[x_{\rm cl} + \delta x] = S[x_{\rm cl}] + \frac{1}{2}\, \delta^2 S\, (\delta x)^2 + \cdots
$$

となる。一次の項 $\delta S$ は $x_{\rm cl}$ の定義から消え、二次以上の項が残る。この二次項についてのGauss積分を実行すると、振幅は

$$
K(x_f, t_f; x_i, t_i) \approx A(x_f, x_i, T)\, e^{i S[x_{\rm cl}]/\hbar}
$$

という形になる。位相は古典作用そのものであり、振幅の前因子 $A$ は二次変分 $\delta^2 S$ の行列式 — **Van Vleck行列式(Van Vleck determinant)** — として書ける。$\hbar \to 0$ の極限ではこの一項以外の経路の寄与はすべて振動しながら消え、生き残るのは唯一一本の古典経路となる。

自由粒子について一度だけ手で計算しておこう。$L = m\dot x^2/2$ の古典経路は等速直線 $x_{\rm cl}(t) = x_i + (x_f - x_i)(t - t_i)/T$ — ここで $T = t_f - t_i$ — であり、その作用は

$$
S_{\rm cl} = \frac{m(x_f - x_i)^2}{2T}
$$

となる。Schrödinger方程式を直接解いて得られる自由粒子伝播関数の位相も、ちょうどこの式と一致する。二本の橋 — Dirac対応が生むSchrödinger方程式と、Feynmanの経路積分 — が、同じ川の向こう岸で出会う一点だ。

## Pythonで確かめる

```python
# 自由粒子の経路積分:無作為経路の位相和が古典作用の近くに落ちることを見る。
# m = hbar = 1。両端 x_i = 0, x_f = 1, T = 1。古典作用 S_cl = 0.5。
import numpy as np

m, hbar = 1.0, 1.0
x_i, x_f, T = 0.0, 1.0, 1.0
N = 20                       # 時間スライス数
dt = T / N
N_path = 5000                # サンプル経路数
sigma = 0.5                  # 内部点のガウス標準偏差
rng = np.random.default_rng(0)

# 各経路: [x_i, x_1, ..., x_{N-1}, x_f]
interior = rng.normal(0.0, sigma, size=(N_path, N - 1))
left = np.full((N_path, 1), x_i)
right = np.full((N_path, 1), x_f)
paths = np.concatenate([left, interior, right], axis=1)

# 作用 S = sum_n (m/2) (x_{n+1} - x_n)^2 / dt
dx = np.diff(paths, axis=1)
S = 0.5 * m * np.sum(dx**2, axis=1) / dt

# 位相和 sum_path exp(i S / hbar)
amp = np.sum(np.exp(1j * S / hbar).astype(np.complex128))
phase = np.angle(amp)
S_cl = m * (x_f - x_i)**2 / (2 * T)

print(f"古典作用 S_cl        = {S_cl:.4f} rad")
print(f"サンプル位相 arg(sum) = {phase:.4f} rad")
print(f"差                    = {phase - S_cl:.4f} rad")
```

サンプル測度が規格化されていないので和の *大きさ* には意味がないが、*位相* は古典作用 $S_{\rm cl} = 0.5$ ラジアンの近くに落ちる。すべての経路を足し合わせたにもかかわらず、その和の位相が古典経路一本分の位相に集中する — これが停留位相の議論の最も簡潔な数値的証拠である。

## 次章へ

[第10章:次の航海 — どこへ向かうか](../10-where-to-next/) は本書を閉じる章である。Dirac対応と経路積分という二本の橋を渡った読者が次に歩める道 — 量子場理論、統計力学の分配関数、ゲージ理論 — を一望し、本書が意図的に扱わなかった主題への案内地図を提供する。
