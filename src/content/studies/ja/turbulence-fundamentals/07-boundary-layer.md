---
title: '境界層理論 — 流れは壁の近くで決まる'
description: '平板上の薄い境界層、壁せん断応力から導く摩擦速度、そして乱流境界層の「壁の法則」まで — CFD コードがなぜ初めのセルの $y^+$ を要求するのかを答えられるようになる。'
book: turbulence-fundamentals
bookTitle: 乱流解析の基礎
chapter: 7
lang: ja
pairSlug: turbulence-boundary-layer
draft: false
updated: 2026-05-14
---

# 境界層理論 — 流れは壁の近くで決まる

> 平板上の薄い境界層、壁せん断応力から導く摩擦速度、そして乱流境界層の「壁の法則」まで — CFD コードがなぜ初めのセルの $y^+$ を要求するのかを答えられるようになる。

## はじめに

この章を読み終えたとき、二つのことができるようになっていてほしい。第一に、**壁の法則 (law of the wall)** を紙の上にそのまま描けること。第二に、CFD のレポートに書かれている「first cell $y^+ \approx 1$」という一行が、なぜそれほど重要なのかを友達に説明できること。第 6 章で扱った乱流粘性モデルは結局のところ壁の近くで最もやっかいに振る舞うので、境界層はモデリングの議論で最も頻繁に登場する領域である。

## 本論 1 — 境界層は「壁にはりついた薄い層」

自動車の表面、航空機の翼、配管の内側 — 壁の近くにはどこにも、**粘性を無視できない薄い領域**が現れる。この領域を**境界層 (boundary layer)** と呼ぶ。壁での流速はゼロ (粘着条件、no-slip)、そこから離れるにつれて主流の速度 $U_\infty$ ($U$ インフィニティ、free-stream velocity) に近づいていく。

流れが層流で平板の上を流れているとき、境界層の厚さ $\delta$ (デルタ、boundary layer thickness) はブラジウス (Blasius) 解によって次のように近似される:

$$
\delta(x) \approx 5 \sqrt{\nu x / U_\infty}
$$

ここで $x$ は平板前縁 (leading edge) からの距離、$\nu$ (ニュー、kinematic viscosity) は動粘性係数である。式が言っているのは単純なことだ — 壁に沿って流れが進むにつれて、境界層は $\sqrt{x}$ に比例してゆっくり厚くなっていく。

## 本論 2 — 壁せん断応力と摩擦速度

境界層の中で壁が流れを引き留める力は、**壁せん断応力 (wall shear stress)** $\tau_w$ (タウ・ウォール、wall shear) で表される:

$$
\tau_w = \mu \left.\frac{\partial u}{\partial y}\right|_{y=0}
$$

ここで $\mu$ (ミュー、dynamic viscosity) は粘性係数、$u$ は壁に平行な方向の速度、$y$ は壁からの法線距離である。式の意味は「壁のすぐ上で速度がどれだけ急に変化しているかに粘性を掛けたもの」だ。

この $\tau_w$ を密度 $\rho$ (ロー、density) で割ってから平方根を取ると、単位が m/s になる新しい速度スケールが得られる:

$$
u_\tau = \sqrt{\tau_w / \rho}
$$

これを**摩擦速度 (friction velocity)** と呼ぶ。名前は「速度」だが、実際の流れの速度ではなく、**壁が流れに与える応力から導いた、速度の次元を持つ量**である。境界層の中の長さと速度をすべて $u_\tau$ と $\nu$ で測り直すと、あらゆる平板乱流境界層がほぼ同じ形に重なる — それが次節の核心だ。

## 本論 3 — 壁単位と壁の法則

距離 $y$ と速度 $u$ を摩擦速度と動粘性係数で無次元化した量を**壁単位 (wall units)** と呼ぶ:

$$
y^+ = \frac{y u_\tau}{\nu}
$$

$$
u^+ = \frac{u}{u_\tau}
$$

$y^+$ (ワイ・プラス) は壁からの無次元距離、$u^+$ (ユー・プラス) は無次元速度だ。乱流境界層をこの座標で描き直すと、流れの種類によらず三つの領域に分かれる:

- **粘性底層 (viscous sublayer)**: $y^+ < 5$ の領域。ここでは粘性が支配的で、速度は距離に正比例する — $u^+ = y^+$。
- **バッファ層 (buffer layer)**: $5 < y^+ < 30$ の領域。粘性と乱流の効果が同程度の大きさで競合する。簡単な閉じた形の式は存在しない。
- **対数層 (log layer)**: $y^+ > 30$ の領域。速度が距離の対数に比例する — $u^+ = (1/\kappa) \ln y^+ + B$。ここで $\kappa \approx 0.41$ (カッパ、カルマン定数、Kármán's constant)、$B \approx 5.0$ である。

この三つの領域をひとまとめにした絵を**壁の法則 (law of the wall)** と呼ぶ。産業用の RANS 解析で粘性底層まで解像したいなら、**最初のセルが $y^+ \lesssim 1$** でなければならない。格子を細かくするコストが厳しいときは**壁関数 (wall functions)** を使い、最初のセルを $30 \lesssim y^+ \lesssim 100$ に置いて対数層の式から速度を課すこともできるが、剥離 (separation) や強い圧力勾配 (pressure gradient) を伴う流れでは精度が落ちる。

## Python で確かめる

壁の法則をそのまま描いてみる。粘性底層は直線、対数層は対数曲線、バッファ層はわざと空けておいて注記で示す。

```python
import numpy as np
import matplotlib.pyplot as plt

# カルマン定数と対数層の切片
kappa = 0.41
B = 5.0

# 粘性底層: y+ in [0.1, 5], u+ = y+
y_sub = np.linspace(0.1, 5.0, 50)
u_sub = y_sub

# 対数層: y+ in [30, 1000], u+ = (1/kappa) ln y+ + B
y_log = np.linspace(30.0, 1000.0, 200)
u_log = (1.0 / kappa) * np.log(y_log) + B

fig, ax = plt.subplots(figsize=(7, 5))
ax.semilogx(y_sub, u_sub, label=r"粘性底層  $u^+ = y^+$")
ax.semilogx(y_log, u_log, label=r"対数層  $u^+ = (1/\kappa)\ln y^+ + B$")

# バッファ層は空けておいて表示
ax.axvspan(5, 30, alpha=0.15, color="gray")
ax.text(12, 2, "バッファ層\n(閉じた式なし)", ha="center", va="center")

ax.set_xlabel(r"$y^+$")
ax.set_ylabel(r"$u^+$")
ax.set_title("壁の法則 — 乱流境界層の平均速度プロファイル")
ax.legend()
ax.grid(True, which="both", alpha=0.3)
plt.tight_layout()
plt.show()
```

セミログ軸では粘性底層は曲線のように見え、対数層は直線になる — 対数層という名前はここから来ている。最初のセルの $y^+$ が 1 付近だ、という言い回しは、この図の一番左端の粘性底層まで格子が届いている、という意味になる。

## 次章へ

[8 章: 自由せん断流](../08-free-shear-flows/) では、壁のない乱流 — ジェット (jet)、後流 (wake)、混合層 (mixing layer) — に移る。壁が消えると摩擦速度というスケールも消えて、代わりに流れ自身の速度差と幅が新しいスケールになる。同じ乱流でも壁の有無で記述がどう変わるかを比べると、第 7 章の壁単位がなぜあれほど特別な道具だったのかが、逆向きに理解できる。
