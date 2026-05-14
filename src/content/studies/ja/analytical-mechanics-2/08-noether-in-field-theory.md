---
title: '場の理論におけるネーター — 保存カレントとエネルギー–運動量テンソル'
description: '連続対称性のあるところには必ず保存カレント $j^\mu$ がついてくる — U(1) 回転対称性が生む 4-カレントと、時空並進が生むエネルギー–運動量テンソル $T^{\mu\nu}$ との最初の出会い。'
book: analytical-mechanics-2
bookTitle: 解析力学 II
chapter: 8
lang: ja
pairSlug: am2-noether-field-theory
draft: false
updated: 2026-05-14
---

# 場の理論におけるネーター — 保存カレントとエネルギー–運動量テンソル

> 連続対称性のあるところには必ず保存カレント $j^\mu$ がついてくる — U(1) 回転対称性が生む 4-カレントと、時空並進が生むエネルギー–運動量テンソル $T^{\mu\nu}$ との最初の出会い。

## はじめに

解析力学 I で一度出会ったネーターの定理(Noether's theorem)は、「ラグランジアンが連続変換に対して不変ならば、対応する保存量が存在する」という一行の命題だった。あのときは時間並進 → エネルギー、空間並進 → 運動量、回転 → 角運動量という粒子系のバージョンを見た。本章では同じ定理を無限自由度 — つまり場(field) — の上で書き直す。結果は単なる「保存量」ではなく、時空上に敷かれた**保存カレント** $j^\mu$ ($\mu$ は 4-時空添字)である。本章を終えると、場の量子論の教科書の冒頭で出会う「U(1) 対称性 → 電荷保存」「時空並進 → エネルギー–運動量保存」というスローガンが、どのような計算から出てくるのかを自分の手で導けるようになる。本章を通して自然単位 $c = 1$ を用い、ミンコフスキー計量(metric)は 6 章と整合させて $\eta_{\mu\nu} = \mathrm{diag}(+, -, -, -)$ をとる。

## 本論 1 — 場のネーター — 命題と一行証明

場 $\phi(x)$ (ここで $x = (t, \vec x)$) に対する作用は、ラグランジアン密度 $\mathcal{L}(\phi, \partial_\mu \phi)$ の時空積分である。微小変換 $\phi \to \phi + \epsilon\, \delta\phi$ に対してラグランジアンが**全発散**だけ変化する、すなわち $\delta \mathcal{L} = \epsilon\, \partial_\mu K^\mu$ となる $K^\mu$ が存在するとき、この変換は作用を(境界項を除いて)不変に保つので対称性である。このとき次の**保存カレント**が定義できる:

$$
j^\mu = \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\, \delta\phi - K^\mu.
$$

場の方程式(Euler–Lagrange)が成り立つ解の上では $\partial_\mu j^\mu = 0$。対応する**保存電荷**は

$$
Q = \int d^3 x\, j^0
$$

であり、$\partial_t Q = 0$ となる。

一行証明: $\delta \mathcal{L} = (\partial \mathcal{L}/\partial \phi)\,\delta\phi + (\partial \mathcal{L}/\partial(\partial_\mu \phi))\,\partial_\mu \delta\phi$ を展開し、ライプニッツ則で

$$
\delta \mathcal{L} = \partial_\mu\!\left(\frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\,\delta\phi\right) + \left[\frac{\partial \mathcal{L}}{\partial \phi} - \partial_\mu\frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\right]\delta\phi.
$$

右辺第二項の角括弧は EL 方程式そのものなので解の上でゼロ。すると $\partial_\mu K^\mu = \partial_\mu(\partial \mathcal{L}/\partial(\partial_\mu \phi)\,\delta\phi)$ となり、これを一方に寄せれば上述の $j^\mu$ が保存することが従う。この一段変形が場の理論における「対称性 → 保存カレント」梯子のすべてである。

## 本論 2 — U(1) の例 — 複素スカラー場と 4-カレント

複素スカラー場 $\phi(x) \in \mathbb{C}$ に対する最も単純なローレンツ不変ラグランジアンは

$$
\mathcal{L} = \partial^\mu \phi^* \partial_\mu \phi - m^2 \phi^* \phi
$$

である ($m$ は場の質量、自然単位での次元は長さ$^{-1}$)。このラグランジアンは位相回転 $\phi \to e^{i\alpha}\phi$, $\phi^* \to e^{-i\alpha}\phi^*$ (任意の実数 $\alpha$) に対して厳密に不変である — $|\phi|^2$ と $\partial \phi^*\partial \phi$ がともに $\alpha$ に依存しないからだ。この一パラメータ連続対称性の群を **U(1)** と呼ぶ。

微小変換は $\alpha \to 0$ 極限で $\delta\phi = i\phi$, $\delta\phi^* = -i\phi^*$。ラグランジアン自体が厳密に不変なので $K^\mu = 0$。1 節の公式に代入すると

$$
j^\mu = i\bigl(\phi^* \partial^\mu \phi - \phi\, \partial^\mu \phi^*\bigr).
$$

この一行が場の量子論で「電荷 4-カレント」と呼ばれる量の出発点である。平面波解 $\phi(x) = A\, e^{-i(\omega t - \vec k \cdot \vec x)}$ を代入すると ($A$ は複素振幅、$\omega$ は角振動数、$\vec k$ は波数ベクトル、分散関係 $\omega^2 = \vec k^2 + m^2$)

$$
j^0 = 2\omega |A|^2, \qquad \vec j = 2\vec k\, |A|^2.
$$

すなわち 4-カレント $j^\mu$ は 4-運動量 $p^\mu = (\omega, \vec k)$ に単純に比例する。非相対論的シュレーディンガー方程式の「確率カレント $\rho \vec v$」が相対論に上がるとこのように 4-成分にまとめられる、というのが核心メッセージだ。符号に注意: $j^0$ は正にも負にもなりうるので「確率密度」として直接解釈できず — 結局、場の量子論ではこれを粒子から反粒子を引いた電荷密度として再解釈することになる。

## 本論 3 — 時空並進とエネルギー–運動量テンソル

時空並進 $x^\mu \to x^\mu + \epsilon^\mu$ もポアンカレ不変な任意の $\mathcal{L}$ の対称性である。パラメータが四つ ($\mu = 0, 1, 2, 3$) なので今度は四つの保存カレントが同時に得られ、その束は自然に **2 階テンソル** $T^{\mu\nu}$ にまとまる。1 節の公式を斜めに適用すると

$$
T^{\mu\nu} = \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)}\,\partial^\nu \phi - \eta^{\mu\nu}\mathcal{L}
$$

であり、解の上で $\partial_\mu T^{\mu\nu} = 0$ が四つ($\nu = 0, 1, 2, 3$)すべて成り立つ。このテンソルを**(正準)エネルギー–運動量テンソル(canonical stress–energy tensor)** と呼ぶ。

各成分の物理的解釈は次のとおり。$T^{00}$ はエネルギー密度、$T^{0i}$ は運動量密度(= エネルギーフラックス密度/$c^2$、自然単位では一致)、$T^{ij}$ は運動量 $i$ 成分が $j$ 方向に流れる比率 — すなわち応力(stress)である。$\partial_\mu T^{\mu 0} = 0$ がエネルギー保存、$\partial_\mu T^{\mu i} = 0$ が運動量保存に対応する。一般相対性理論でアインシュタイン方程式の右辺に入るあの $T^{\mu\nu}$ こそここで登場する量だという事実は記憶に留めておこう — 形式的な導出は次章で再び出会う。

## Pythonで確かめる

```python
# U(1) 対称性の保存カレント j^0 が平面波上で 2 omega |A|^2 になることを
# 数値微分で確認し、電荷 Q = ∫ j^0 dx が時間に依存しないことを見る。
import numpy as np

A     = 0.7
omega = 2.0
k     = 1.6
m     = 1.2          # omega^2 - k^2 = 4.0 - 2.56 = 1.44 = m^2 -> OK

x  = np.linspace(-10.0, 10.0, 200)
dx = x[1] - x[0]
ts = [0.0, 0.5, 1.0]

expected = 2.0 * omega * abs(A)**2     # = 2.8
print(f"理論値 j^0 = 2 omega |A|^2 = {expected:.4f}")

Q_history = []
for t in ts:
    phase  = -(omega * t - k * x)
    phi    = A * np.exp(1j * phase)         # 複素平面波
    # 時間微分: 解析的には d phi / dt = -i*omega*phi。
    # ここでは小さな dt で差分をとる。
    dt     = 1e-4
    phi_p  = A * np.exp(1j * (-(omega*(t+dt) - k*x)))
    dphidt = (phi_p - phi) / dt
    j0     = 1j * (np.conj(phi) * dphidt - phi * np.conj(dphidt))
    j0     = j0.real                         # 虚部は数値ゼロ
    Q      = np.trapezoid(j0, x)
    print(f"t={t:.1f}: mean j^0 = {j0.mean():.4f}, std = {j0.std():.2e}, Q = {Q:.4f}")
    Q_history.append(Q)

print(f"Q 変動幅 = {max(Q_history) - min(Q_history):.2e}  (~1e-3 以下なら保存)")
```

mean がいずれも $2.8$ 近傍、std が数値ノイズの水準、$Q$ の時間変動が $10^{-3}$ 以下であれば、上の理論式が格子の上でそのまま生き残ったということになる。

## 次章へ

[9 章: 古典から量子へ](../09-classical-to-quantum/) では、本章で得た保存カレント $j^\mu$ とエネルギー–運動量テンソル $T^{\mu\nu}$ が量子化の手続きでどのように演算子へ昇格し、結果として保存電荷 $Q$ が粒子数演算子として再解釈されるかを見る。ネーターの定理が古典と量子をつなぐ最も堅固な橋の一つであることが、その章で確実になるはずだ。
