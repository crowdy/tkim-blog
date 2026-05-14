---
title: '分子間力 — van der Waals・水素結合・分散力'
description: '分子を結びつける弱い力 — 永久双極子、誘起双極子、そして量子ゆらぎから来る分散力 — をひとつの 1/r⁶ の絵にまとめ、Lennard-Jones ポテンシャルで手に取る。'
book: quantum-chemistry-14ch
bookTitle: 語りかける量子化学 — 原子と物質をつなぐ14章
chapter: 11
lang: ja
pairSlug: qc-intermolecular-forces
draft: false
updated: 2026-05-14
---

# 分子間力 — van der Waals・水素結合・分散力

> 分子を結びつける弱い力 — 永久双極子、誘起双極子、そして量子ゆらぎから来る分散力 — をひとつの 1/r⁶ の絵にまとめ、Lennard-Jones ポテンシャルで手に取る。

## はじめに

10 章で分子の極性と分極性を扱ったなら、本章はその二つの概念が *分子と分子のあいだ* でどのように力として現れるかを見る。共有結合は数百 kJ/mol の強い力だが、水が 100 ℃ で沸騰し、アルゴンが液体になり、ヤモリが天井に貼りつくのは、すべてそれより 100 倍ほど弱い力 — 分子間力 — のおかげだ。本章を終えると読者は、「van der Waals 力」が実は三つの異なる寄与の束であること、その三つがなぜすべて $1/r^6$ で減衰するのか、そして水素結合がなぜその階層で特別な位置を占めるのかを一行で言える。

## 本論 1 — van der Waals 力の三つの顔

「van der Waals 力」は実は異なる三種類の引力寄与をひとまとめにした名前だ。

- **双極子–双極子(Keesom)**: 二つの永久双極子 $\vec\mu_1, \vec\mu_2$ が互いに向きを合わせて引き合う。すべての向きについてボルツマン平均を取ると $U_{\text{dd}} \propto -|\vec\mu_1|^2 |\vec\mu_2|^2 / (k_B T \cdot r^6)$。
- **双極子–誘起双極子(Debye)**: ある永久双極子が隣の分子の電子雲を分極させる。$U_{\text{di}} \propto -\mu^2 \alpha / r^6$。
- **誘起–誘起双極子(London 分散力)**: 無極性分子どうしでも電子雲の *瞬間的な* 量子ゆらぎによって引き合う。$U_{\text{L}} \propto -\alpha_1 \alpha_2 / r^6$。希ガス原子間に働く唯一の引力であり、液体アルゴンの凝集、アルカンの沸点、ヤモリの足裏はすべてこの力の仕業だ。

要点は、三つの寄与がすべて $1/r^6$ で減衰するという点だ。逆に近距離では電子雲が重なってパウリ反発が働くが、こちらははるかに急峻で、経験的に $1/r^{12}$ でモデル化する。

## 本論 2 — Lennard-Jones 12-6 ポテンシャル

これらすべてを一行で要約するのが **Lennard-Jones ポテンシャル** である。

$$
V(r) = 4\varepsilon\!\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right]
$$

ここで $\varepsilon$(epsilon)は井戸の深さ、$\sigma$(sigma)は $V = 0$ となる距離である。二項を微分して極小を求めると平衡距離は

$$
r_e = 2^{1/6}\sigma \approx 1.122\,\sigma
$$

であり、そのときの深さはちょうど $V(r_e) = -\varepsilon$ となる。代表的な値: アルゴン $\varepsilon/k_B \approx 120$ K、$\sigma \approx 0.34$ nm; メタン $\varepsilon/k_B \approx 148$ K、$\sigma \approx 0.38$ nm; 水は $\varepsilon/k_B \approx 78$ K、$\sigma \approx 0.32$ nm 程度に水素結合のためのクーロン項が加わる。$r^{12}$ 反発と $r^6$ 引力というたった二項が、気体の凝結からタンパク質折りたたみのシミュレーションまで、分子動力学の標準的な出発点になる。

## 本論 3 — 水素結合: 特別でありながら特別でない

水素が F, O, N のような強い電気陰性原子に結合すると、その水素は電子が不足して大きな永久双極子を帯び、しかも十分に小さいので隣の分子の電気陰性原子にぴったり近づける。そうしてできる **水素結合(hydrogen bond)** は通常の van der Waals 力より *はるかに* 強い — 10–40 kJ/mol に対し通常の London 力は約 1 kJ/mol。さらに *方向性* があり、水素はおおよそ N–H⋯O の直線上に置かれねばならない。

水素結合が担う仕事: 水の高い沸点(分子量の近い CH$_4$ の $-161$ ℃ に対し水は 100 ℃)、DNA 二重らせんの安定性、タンパク質の二次構造、そして氷が水より密度が低い現象。エネルギー的に水素結合は本物の共有結合(約 400 kJ/mol)と通常の van der Waals 力(約 1 kJ/mol)の *あいだ* に位置する — 結合に比べれば弱いが、ほとんどの非結合相互作用に比べれば強い。この「中くらいの強さ」こそ生命現象が働く場所だ。強すぎれば切れずに情報を読めず、弱すぎれば構造を保てない。

## Pythonで確かめる

```python
# アルゴン・メタン・クリプトンの Lennard-Jones ポテンシャルを描く。
# (eps/k_B, sigma) の単位は (K, nm)。
import numpy as np
import matplotlib.pyplot as plt

kB = 1.380649e-23  # J/K

species = {
    "Ar": (120.0, 0.34),
    "CH4": (148.0, 0.38),
    "Kr": (164.0, 0.36),
}

r = np.linspace(0.30, 1.00, 400)  # nm

for name, (eps_over_kB, sigma) in species.items():
    eps = eps_over_kB * kB                       # J
    V = 4 * eps * ((sigma / r)**12 - (sigma / r)**6)
    plt.plot(r, V / kB, label=f"{name} (ε/k_B={eps_over_kB:.0f} K)")
    r_e = 2**(1/6) * sigma
    plt.plot(r_e, -eps_over_kB, "o", color="0.3")
    print(f"{name}: r_e = {r_e:.3f} nm, 井戸の深さ = {eps_over_kB:.0f} K")

plt.axhline(0, color="0.6", lw=0.8)
plt.xlabel("r / nm"); plt.ylabel("V(r) / k_B  [K]")
plt.ylim(-200, 200)
plt.title("Lennard-Jones 12-6 ポテンシャル")
plt.legend(); plt.tight_layout(); plt.show()
```

三つの曲線がすべて $r_e = 2^{1/6}\sigma$ で深さ $-\varepsilon$ の極小を通れば、「$1/r^{12}$ 反発 + $1/r^6$ 引力」という二項の処方で三分子の凝集傾向を手に取ったことになる。

## 次章へ

[第12章: 固体の電子状態](../12-electronic-states-of-solids/)では、分子ではなく $10^{23}$ 個の原子が規則正しく並んだ固体へ視野を広げる。6 章の結合/反結合、7 章のヒュッケルのはしごが無限に長くなると *バンド(band)* になり、そのバンドが満たされているか否かが金属・半導体・絶縁体を分ける。
