# Turbulence Fundamentals — Chapters 2 to 12 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write chapters 2–12 of the "난류해석의 기초 / 乱流解析の基礎 / Fundamentals of Turbulence Analysis" study series in all three languages (ko, ja, en), at a high-school accessible level, with LaTeX math and Python 3 code examples. Add KaTeX rendering support to the Astro site so the math actually renders.

**Architecture:**
- One markdown file per (chapter × language) — 11 chapters × 3 languages = 33 new chapter files under `src/content/studies/<lang>/turbulence-fundamentals/`.
- Math via `remark-math` (markdown parser) + `rehype-katex` (HTML renderer) + KaTeX CSS loaded in `BaseLayout.astro`. Inline math is `$…$`, display math is `$$…$$`.
- Python examples live inside fenced ``` ```python blocks; Shiki already handles syntax highlighting.
- Each chapter follows a fixed shape so a reader can navigate predictably and so parallel content agents stay aligned: opening hook → core concept → math → Python demo → connection to next chapter.

**Tech Stack:** Astro 5 content collections, `remark-math` ^6, `rehype-katex` ^7, KaTeX 0.16 CSS (CDN), Shiki for code highlighting (already present), Python 3 + numpy + matplotlib in code blocks (illustrative only — not executed by the site).

---

## File Structure

**New / modified site files:**

```
package.json                                       (modify — add remark-math, rehype-katex)
astro.config.mjs                                   (modify — wire plugins into markdown config)
src/layouts/BaseLayout.astro                       (modify — preconnect + KaTeX CSS link)
src/content/studies/ko/turbulence-fundamentals/    (11 new chapter files: 02..12)
src/content/studies/ja/turbulence-fundamentals/    (11 new chapter files: 02..12)
src/content/studies/en/turbulence-fundamentals/    (11 new chapter files: 02..12)
docs/superpowers/specs/2026-05-14-chapter-template.md  (new — the chapter template + style guide)
```

**Chapter file naming (the slugs ↔ frontmatter `pairSlug` map):**

| Ch | ko / ja / en slug                       | pairSlug                       |
|----|------------------------------------------|--------------------------------|
| 2  | `02-tensor-notation`                     | `turbulence-tensor-notation`   |
| 3  | `03-navier-stokes`                       | `turbulence-navier-stokes`     |
| 4  | `04-vorticity`                           | `turbulence-vorticity`         |
| 5  | `05-reynolds-averaging`                  | `turbulence-reynolds-averaging`|
| 6  | `06-turbulence-viscosity-models`         | `turbulence-viscosity-models`  |
| 7  | `07-boundary-layer`                      | `turbulence-boundary-layer`    |
| 8  | `08-free-shear-flows`                    | `turbulence-free-shear-flows`  |
| 9  | `09-isotropic-energy-cascade`            | `turbulence-energy-cascade`    |
| 10 | `10-dns`                                 | `turbulence-dns`               |
| 11 | `11-les`                                 | `turbulence-les`               |
| 12 | `12-industrial-cfd`                      | `turbulence-industrial-cfd`    |

The existing chapter 1 uses `pairSlug: turbulence-what-is` — keep that as-is.

**Per-chapter content shape (fixed so all three languages match):**

1. Opening blockquote (= frontmatter description).
2. "들어가며 / はじめに / Opening" — why this chapter matters, what the reader will be able to do after.
3. Two to four "## 본론 N" sections with the core concept. Math typeset with `$…$` and `$$…$$`.
4. "## 파이썬으로 확인 / Pythonで確かめる / In Python" — one minimal numpy/matplotlib snippet demonstrating the chapter's central idea.
5. "## 다음 장으로 / 次章へ / To the next chapter" — link to the next chapter's relative path.

The shape is documented once in `docs/superpowers/specs/2026-05-14-chapter-template.md` and is what content agents read before drafting.

---

## Task 1: Add KaTeX math support to Astro

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `astro.config.mjs` (markdown.remarkPlugins, markdown.rehypePlugins)
- Modify: `src/layouts/BaseLayout.astro` (head: preconnect + KaTeX CSS link)

- [ ] **Step 1.1: Install remark-math and rehype-katex**

Run:
```bash
npm install --save remark-math@^6 rehype-katex@^7
```

Expected: `package.json` and `package-lock.json` updated. Two new packages plus their transitive deps under `node_modules/`.

- [ ] **Step 1.2: Wire the plugins into `astro.config.mjs`**

Replace the existing `markdown:` block in `astro.config.mjs` with:

```js
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// ...inside defineConfig:
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
```

The two `import` lines go at the top of the file alongside the existing imports.

- [ ] **Step 1.3: Load the KaTeX CSS from a CDN in `BaseLayout.astro`**

In `src/layouts/BaseLayout.astro`, inside `<head>`, immediately after the existing Pretendard stylesheet `<link>` (around line 71), add:

```astro
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
      integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
      crossorigin="anonymous"
    />
```

The preconnect line already exists for Pretendard, so just add the `<link rel="stylesheet">` for KaTeX. The integrity hash above is the published one for `katex@0.16.11`.

- [ ] **Step 1.4: Smoke-test math rendering**

Temporarily edit `src/content/studies/ko/turbulence-fundamentals/01-what-is-turbulence.md`: append `\n\n테스트: $a^2 + b^2 = c^2$\n` at the very end of the body. Then:

```bash
npm run check
npm run build
grep "katex" dist/ko/study/turbulence-fundamentals/01-what-is-turbulence/index.html | head -3
```

Expected: `npm run check` reports 0 errors. The grep returns one or more lines containing `katex` class names, proving the math was rendered server-side.

Revert the test edit (`git checkout -- src/content/studies/ko/turbulence-fundamentals/01-what-is-turbulence.md`).

- [ ] **Step 1.5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs src/layouts/BaseLayout.astro
git commit -m "feat(site): add KaTeX math rendering via remark-math + rehype-katex"
```

---

## Task 2: Write the chapter template + style guide

**Files:**
- Create: `docs/superpowers/specs/2026-05-14-chapter-template.md`

- [ ] **Step 2.1: Create the template doc**

Create `docs/superpowers/specs/2026-05-14-chapter-template.md` with this exact content:

````markdown
# Turbulence chapter template & style guide

All chapters of the "Fundamentals of Turbulence Analysis" study series follow this template so that ko/ja/en pairs stay structurally aligned and the difficulty stays consistent across the book.

## Audience

Bright high-school student who finished single-variable calculus and basic vector algebra. They have NOT seen partial differential equations, tensors, or fluid mechanics before. Every new symbol is defined the first time it appears. Every Greek letter is named ("μ, called *mu*").

## Frontmatter

```yaml
---
title: '<chapter title in target language>'
description: '<one-sentence hook, identical to the opening blockquote>'
book: turbulence-fundamentals
bookTitle: '<책 제목 / 本の題名 / Book title in target language>'
chapter: <integer 2..12>
lang: ko | ja | en
pairSlug: '<shared across the three language versions>'
draft: false
updated: 2026-05-14
---
```

## Body shape (fixed)

1. `# <title>` (matches frontmatter title exactly).
2. `> <description>` blockquote (matches frontmatter description exactly).
3. `## 들어가며 / ## はじめに / ## Opening` — 2–4 sentences answering: why this chapter, what the reader can do after it.
4. Two to four `## 본론 N — <subtitle> / ## 本論 N — <subtitle> / ## Main N — <subtitle>` sections.
5. `## 파이썬으로 확인 / ## Pythonで確かめる / ## In Python` — exactly one fenced ```python block. Imports go at the top of the snippet. No external state. Numpy + matplotlib only. Snippet must be runnable as-is if pasted into a fresh script.
6. `## 다음 장으로 / ## 次章へ / ## To the next chapter` — one paragraph plus a relative link `[<n+1>장: <title>](../<NN>-<slug>/)`.

## Math conventions

- Inline math: `$a^2 + b^2 = c^2$`.
- Display math: surround with blank lines and use `$$ … $$`.
- Always name a symbol the first time it appears: `$\mu$ (mu, 점성계수)` and reuse the bare symbol after.
- Prefer concrete SI units in prose (m/s, Pa·s) rather than dimensionless variables.
- One equation per display block — readers parse one line at a time.

## Python conventions

- Python 3.11+ syntax. `numpy as np` and `matplotlib.pyplot as plt` are the default imports.
- No external data files — generate inputs in the snippet (`np.linspace`, `np.random.default_rng(0)`).
- Each snippet does ONE thing and prints or plots ONE result. No multi-figure dashboards.
- Comments in the snippet are in the chapter's target language (Korean comments in ko chapters, etc.).
- Keep snippets under 40 lines.

## Difficulty calibration

| Allowed | Out of bounds |
|---|---|
| derivative / integral notation | covariant derivatives, multi-index tensors with > 2 indices |
| `∂u/∂x` once defined as "rate of change of u along x" | functional analysis, weak formulations |
| Reynolds number, simple dimensionless groups | spectral decompositions presented without preamble |
| Linking back to chapter 1's five properties of turbulence | citing literature without explaining the term |

When in doubt: explain the concept first in plain language, then give the formula, then run the formula on one concrete number in Python.
````

- [ ] **Step 2.2: Commit**

```bash
git add docs/superpowers/specs/2026-05-14-chapter-template.md
git commit -m "docs(spec): add chapter template for turbulence study series"
```

---

## Task 3: Draft chapter 2 — Tensor notation and coordinate systems (ko)

**Files:**
- Create: `src/content/studies/ko/turbulence-fundamentals/02-tensor-notation.md`

- [ ] **Step 3.1: Write the Korean chapter file**

Create the file with the structure below. Frontmatter exactly as shown; fill the body sections following the template (Task 2) at high-school level.

```markdown
---
title: '텐서 표기와 좌표계 — 첨자 하나로 식 한 줄을 줄이는 법'
description: '난류 수식이 짧아 보이는 비밀은 "아인슈타인 합 규약"에 있다. 텐서·첨자·좌표계의 직관과, 책 전체에서 쓸 표기 약속을 정리한다.'
book: turbulence-fundamentals
bookTitle: 난류해석의 기초
chapter: 2
lang: ko
pairSlug: turbulence-tensor-notation
draft: false
updated: 2026-05-14
---

# 텐서 표기와 좌표계 — 첨자 하나로 식 한 줄을 줄이는 법

> 난류 수식이 짧아 보이는 비밀은 "아인슈타인 합 규약"에 있다. 텐서·첨자·좌표계의 직관과, 책 전체에서 쓸 표기 약속을 정리한다.

## 들어가며

[2–4 문장: 왜 이 장이 필요한가. 3장부터 나오는 나비에-스토크스를 한 줄로 쓰기 위함.]

## 본론 1 — 벡터부터 다시: $u_i$ 는 무슨 뜻인가

[벡터 $\vec{u}$ 를 성분 $u_1, u_2, u_3$ (혹은 $u_x, u_y, u_z$) 로 나누는 직관. $u_i$ 표기 도입.]

$$
\vec{u} = (u_1, u_2, u_3)
$$

## 본론 2 — 아인슈타인 합 규약

[같은 첨자가 두 번 나오면 합한다는 규약. 예: $a_i b_i = a_1 b_1 + a_2 b_2 + a_3 b_3$.]

$$
a_i b_i \equiv \sum_{i=1}^{3} a_i b_i
$$

## 본론 3 — 좌표계 선택과 텐서의 의미

[직교 좌표만 쓸 것이라는 약속. 텐서를 "방향 두 개 이상이 동시에 들어간 양"으로 직관화. 응력 텐서 $\sigma_{ij}$ 예고.]

## 파이썬으로 확인

```python
import numpy as np

# 두 벡터의 내적을 (1) 일반 식과 (2) 아인슈타인 합 규약 식으로 비교
a = np.array([1.0, 2.0, 3.0])
b = np.array([4.0, 5.0, 6.0])

# (1) 일반 합
dot_loop = a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
# (2) numpy 의 내적 — 사실상 a_i b_i
dot_einsum = np.einsum('i,i->', a, b)

print(f"loop = {dot_loop}, einsum = {dot_einsum}")
```

## 다음 장으로

[1–2 문장. 3장 링크: `[3장: 나비에-스토크스 방정식 복습](../03-navier-stokes/)`.]
```

Write the actual paragraphs (the bracketed `[…]` placeholders) following the template. Aim for ~2500–3500 characters of body.

- [ ] **Step 3.2: Verify schema**

```bash
npm run check
```

Expected: 0 errors / 0 warnings / 0 hints.

- [ ] **Step 3.3: Build and spot-check the rendered math**

```bash
npm run build
grep -c "katex" dist/ko/study/turbulence-fundamentals/02-tensor-notation/index.html
```

Expected: build completes; grep returns a count > 0 (math classes present).

- [ ] **Step 3.4: Commit**

```bash
git add src/content/studies/ko/turbulence-fundamentals/02-tensor-notation.md
git commit -m "study(turbulence): add ch.2 tensor notation (ko)"
```

---

## Task 4: Draft chapter 2 — Japanese and English siblings

**Files:**
- Create: `src/content/studies/ja/turbulence-fundamentals/02-tensor-notation.md`
- Create: `src/content/studies/en/turbulence-fundamentals/02-tensor-notation.md`

- [ ] **Step 4.1: Translate the Korean chapter 2 into Japanese**

Mirror the structure of the ko file. Frontmatter must:
- copy `book`, `chapter`, `pairSlug`, `draft`, `updated` verbatim,
- set `lang: ja`,
- translate `title`, `description`, `bookTitle` (`乱流解析の基礎`) into Japanese.

Body shape rules: H1 = new Japanese title; opening blockquote = new Japanese description; section headings translated to `はじめに`, `本論 1 …`, `Pythonで確かめる`, `次章へ`. Math is identical byte-for-byte (LaTeX does not change between languages). Code block content stays the same; only the inline Korean comments in the snippet (if any) translate to Japanese.

- [ ] **Step 4.2: Translate the Korean chapter 2 into English**

Same as Step 4.1 but `lang: en`, English headings (`Opening`, `Main 1 — …`, `In Python`, `To the next chapter`), and `bookTitle: Fundamentals of Turbulence Analysis`.

- [ ] **Step 4.3: Verify**

```bash
npm run check
```

Expected: 0 errors / 0 warnings / 0 hints.

- [ ] **Step 4.4: Commit**

```bash
git add src/content/studies/{ja,en}/turbulence-fundamentals/02-tensor-notation.md
git commit -m "study(turbulence): add ch.2 tensor notation (ja, en)"
```

---

## Tasks 5–14: Chapters 3 through 12

For chapters 3 to 12, repeat the Task 3 + Task 4 pattern (one task per chapter writing the ko version, one task translating to ja + en). Each chapter follows the template from Task 2, and the parameters below give the per-chapter focus, the math content to cover, the Python demo to write, and the prerequisite from the previous chapter.

The shape of each numbered task in this section is identical to Task 3/4 — only the chapter parameters change. Each task ends in a commit. Below is the per-chapter "fill" the engineer needs.

### Task 5 (ch.3 ko) + Task 6 (ch.3 ja+en) — Navier–Stokes equations revisited

**Files:** `…/{ko,ja,en}/turbulence-fundamentals/03-navier-stokes.md`. `pairSlug: turbulence-navier-stokes`. Use the Task 2 template.

**Math to cover:**
- Conservation of mass for an incompressible fluid: $\nabla \cdot \vec{u} = 0$ → in tensor notation $\partial u_i / \partial x_i = 0$.
- Conservation of momentum:
$$
\frac{\partial u_i}{\partial t} + u_j \frac{\partial u_i}{\partial x_j} = -\frac{1}{\rho}\frac{\partial p}{\partial x_i} + \nu \frac{\partial^2 u_i}{\partial x_j \partial x_j}
$$
- Name every term: time derivative, convective term, pressure gradient, viscous diffusion. Explain `$\nu = \mu / \rho$` (kinematic viscosity) in one sentence.
- Reynolds number $\mathrm{Re} = U L / \nu$, with units canceled out explicitly.

**Python demo:** numerically estimate kinematic viscosity of water at 20 °C from `mu = 1.002e-3 Pa·s` and `rho = 998 kg/m³`, then compute Re for pipe flow with `U = 1.0 m/s` and `L = 0.02 m`. Print the three numbers and decide if it is laminar (Re ≈ 19,900 → turbulent).

### Task 7 (ch.4 ko) + Task 8 (ch.4 ja+en) — Vorticity and the vorticity equation

**Files:** `…/04-vorticity.md`. `pairSlug: turbulence-vorticity`.

**Math:**
- Vorticity definition $\vec{\omega} = \nabla \times \vec{u}$, in tensor form $\omega_i = \epsilon_{ijk} \partial u_k / \partial x_j$. Briefly introduce the Levi-Civita symbol $\epsilon_{ijk}$ ("+1, -1, 0").
- Vortex stretching term $\omega_j \partial u_i / \partial x_j$ from the vorticity equation — the *core* of why turbulence is 3D.
- 2D special case: vortex stretching vanishes → why purely 2D flows cannot be turbulent.

**Python demo:** create a simple 2D shear flow `u(x, y) = (y, 0)` on a grid and compute the (only nonzero) vorticity component $\omega_z = -\partial u_x / \partial y$ numerically with `np.gradient`. Print the constant value.

### Task 9 (ch.5 ko) + Task 10 (ch.5 ja+en) — Reynolds averaging and the RANS equations

**Files:** `…/05-reynolds-averaging.md`. `pairSlug: turbulence-reynolds-averaging`.

**Math:**
- Reynolds decomposition $u_i = \bar{u}_i + u'_i$ with $\overline{u'_i} = 0$.
- Apply the average to Navier–Stokes; show how the convective term $\overline{u_j \partial u_i / \partial x_j}$ produces the Reynolds stress $\overline{u'_i u'_j}$.
- RANS equation:
$$
\frac{\partial \bar{u}_i}{\partial t} + \bar{u}_j \frac{\partial \bar{u}_i}{\partial x_j} = -\frac{1}{\rho}\frac{\partial \bar{p}}{\partial x_i} + \nu \frac{\partial^2 \bar{u}_i}{\partial x_j \partial x_j} - \frac{\partial \overline{u'_i u'_j}}{\partial x_j}
$$
- Closure problem: more unknowns than equations → reason why ch.6 exists.

**Python demo:** synthesize a noisy 1D signal `u = 1.0 + 0.3 * sin(t) + noise`, compute its time average (`np.mean`), subtract it, and verify `mean(u_prime) ≈ 0` and `mean(u_prime**2) > 0` (the Reynolds stress is nonzero).

### Task 11 (ch.6 ko) + Task 12 (ch.6 ja+en) — Turbulent viscosity models

**Files:** `…/06-turbulence-viscosity-models.md`. `pairSlug: turbulence-viscosity-models`.

**Math:**
- Boussinesq hypothesis $-\overline{u'_i u'_j} = \nu_t \left( \partial \bar{u}_i / \partial x_j + \partial \bar{u}_j / \partial x_i \right)$. Define eddy viscosity $\nu_t$.
- Mixing length: $\nu_t = \ell_m^2 |\partial \bar{u}/\partial y|$. One paragraph each on k-ε and k-ω as "two coupled equations for turbulent kinetic energy $k$ and a frequency-like quantity $\varepsilon$ or $\omega$." No need to derive them.
- Compare: which model is good near walls (k-ω) vs. free stream (k-ε).

**Python demo:** plot mixing-length eddy viscosity profile $\nu_t(y)$ for a channel flow approximation with $\ell_m = 0.41 \cdot \min(y, y_{\max} - y)$ and a parabolic mean velocity profile. Use matplotlib.

### Task 13 (ch.7 ko) + Task 14 (ch.7 ja+en) — Boundary layer theory

**Files:** `…/07-boundary-layer.md`. `pairSlug: turbulence-boundary-layer`.

**Math:**
- Boundary layer thickness $\delta(x) \approx 5\sqrt{\nu x / U_\infty}$ for laminar Blasius.
- Wall shear stress $\tau_w = \mu (\partial u / \partial y)|_{y=0}$ and friction velocity $u_\tau = \sqrt{\tau_w / \rho}$.
- Law of the wall: $u^+ = y^+$ in the viscous sublayer ($y^+ < 5$); $u^+ = (1/\kappa) \ln y^+ + B$ in the log layer with $\kappa \approx 0.41$, $B \approx 5.0$. Define $y^+ = y u_\tau / \nu$.

**Python demo:** plot $u^+$ vs $y^+$ as a piecewise function (viscous + log) on semilog axes. Save as a figure.

### Task 15 (ch.8 ko) + Task 16 (ch.8 ja+en) — Free shear flows

**Files:** `…/08-free-shear-flows.md`. `pairSlug: turbulence-free-shear-flows`.

**Math:**
- Self-similarity ansatz $u(x, y) / U_c(x) = f(y / \delta(x))$ for jets/wakes/mixing layers.
- Spreading rate for round jet $\delta(x) \propto x$, centerline decay $U_c(x) \propto 1/x$. Mixing layer $\delta(x) \propto x$ but $U_c$ constant — explain why.

**Python demo:** plot the self-similar Gaussian profile $f(\eta) = \exp(-\eta^2)$ for a free jet and verify that area under the curve corresponds to constant momentum flux.

### Task 17 (ch.9 ko) + Task 18 (ch.9 ja+en) — Isotropic turbulence and the energy cascade

**Files:** `…/09-isotropic-energy-cascade.md`. `pairSlug: turbulence-energy-cascade`.

**Math:**
- Kolmogorov's hypotheses: large eddies inject, inertial range transfers, small eddies dissipate.
- Kolmogorov scaling $E(k) = C \varepsilon^{2/3} k^{-5/3}$ with $C \approx 1.5$. Show on log-log axes.
- Kolmogorov length scale $\eta = (\nu^3 / \varepsilon)^{1/4}$ — the smallest eddy.

**Python demo:** synthesize a fake power-law spectrum on a log $k$ grid, fit a slope with `np.polyfit(log k, log E, 1)`, and verify the slope is `−5/3`.

### Task 19 (ch.10 ko) + Task 20 (ch.10 ja+en) — Direct Numerical Simulation (DNS)

**Files:** `…/10-dns.md`. `pairSlug: turbulence-dns`.

**Math:**
- Grid count requirement $N \sim \mathrm{Re}^{9/4}$ in 3D — derive informally: must resolve down to $\eta$, the box scales as $L$, and $L/\eta \sim \mathrm{Re}^{3/4}$.
- Cost estimate per chapter: at $\mathrm{Re} = 10^4$, $N \sim 10^9$ grid points, hence DNS is research-only for canonical flows.

**Python demo:** small numpy table comparing N at Re = 10², 10³, 10⁴, 10⁵ assuming the $\mathrm{Re}^{9/4}$ scaling. Print as a formatted table.

### Task 21 (ch.11 ko) + Task 22 (ch.11 ja+en) — Large Eddy Simulation (LES)

**Files:** `…/11-les.md`. `pairSlug: turbulence-les`.

**Math:**
- Spatial filter $\tilde{u}_i = \int G(\vec{x} - \vec{x}') u_i(\vec{x}') d\vec{x}'$ with filter width $\Delta$.
- Filtered Navier–Stokes ⇒ subgrid stress $\tau_{ij}^{sgs} = \widetilde{u_i u_j} - \tilde{u}_i \tilde{u}_j$.
- Smagorinsky model $\nu_{sgs} = (C_s \Delta)^2 |\tilde{S}|$ with $C_s \approx 0.1$.

**Python demo:** apply a 1D box filter of width 5 to a noisy synthetic signal with `np.convolve` and plot original vs filtered.

### Task 23 (ch.12 ko) + Task 24 (ch.12 ja+en) — Industrial CFD model selection

**Files:** `…/12-industrial-cfd.md`. `pairSlug: turbulence-industrial-cfd`.

**Math (light):** decision flow chart, not derivation-heavy. Compare RANS vs LES vs DNS in a table: required wall resolution ($y^+ \lesssim 1$ vs $\lesssim 30$ wall-functions), cost, when each pays off.

Recap chapter 1's five-property definition of turbulence. Close the loop with the reader.

**Python demo:** small decision-tree helper printed as text — given `Re`, `time_budget_hours`, and `is_near_wall_important`, print which model (RANS k-ω SST, LES, DNS) is appropriate.

---

## Task 25: Final verification and finalize the chapter-1 forward link

**Files:**
- Modify: `src/content/studies/{ko,ja,en}/turbulence-fundamentals/01-what-is-turbulence.md` (only the link in the closing paragraph, already correct — verify it still resolves).

- [ ] **Step 25.1: Confirm all 33 new chapter files exist and validate**

```bash
ls src/content/studies/ko/turbulence-fundamentals/ | wc -l
ls src/content/studies/ja/turbulence-fundamentals/ | wc -l
ls src/content/studies/en/turbulence-fundamentals/ | wc -l
```

Each should print `12` (chapters 1 through 12).

- [ ] **Step 25.2: Schema + build verification**

```bash
npm run check
npm run build
```

Expected: 0 errors / 0 warnings / 0 hints; build completes; `dist/<lang>/study/turbulence-fundamentals/` contains 12 chapter dirs per language.

- [ ] **Step 25.3: Confirm KaTeX renders on every chapter**

```bash
for L in ko ja en; do
  for NN in 02 03 04 05 06 07 08 09 10 11 12; do
    f=$(ls dist/$L/study/turbulence-fundamentals/${NN}-*/index.html 2>/dev/null | head -1)
    if [ -z "$f" ]; then echo "MISSING: $L $NN"; continue; fi
    cnt=$(grep -c "katex" "$f")
    if [ "$cnt" -lt 1 ]; then echo "NO MATH RENDERED: $f (count=$cnt)"; fi
  done
done
```

Expected: no `MISSING` or `NO MATH RENDERED` lines.

- [ ] **Step 25.4: Confirm TOC shows 12 chapters in each language**

Open the built HTML and count chapter links:

```bash
for L in ko ja en; do
  cnt=$(grep -oE '/study/turbulence-fundamentals/[0-9]{2}-' dist/$L/study/turbulence-fundamentals/index.html | sort -u | wc -l)
  echo "$L: $cnt chapters in TOC"
done
```

Expected: each line reports `12 chapters in TOC`.

- [ ] **Step 25.5: Update the book metadata `updated` field**

In `src/content/books/{ko,ja,en}/turbulence-fundamentals.yml`, set `updated: 2026-05-14` (already set — confirm; otherwise update). The banner pulls from `latestUpdate` so this controls the homepage ordering.

- [ ] **Step 25.6: Final commit**

```bash
git add src/content/books/
git commit -m "study(turbulence): refresh book metadata after ch.2–12 backfill"
git push
```

---

## Self-Review

**Spec coverage check:**
- Chapter 1's forward map lists 12 chapters → Tasks 3–24 cover chapters 2–12 (chapter 1 already exists). ✓
- Each chapter has math + Python → enforced by Task 2 template + per-task math/Python spec. ✓
- Three languages per chapter → each chapter gets a ko task (drafting) followed by a ja+en task (translation). ✓
- High-school accessibility → enforced by Task 2 difficulty calibration table. ✓
- LaTeX rendering on the site → Task 1 adds remark-math + rehype-katex + KaTeX CSS. ✓

**Placeholder scan:** No "TBD" / "implement later" / "similar to Task N" — each chapter task specifies math content and Python demo content concretely. The Task 5–24 group reuses the Task 3/4 *shape* but supplies per-chapter content fills.

**Type / naming consistency:**
- File slugs `02-tensor-notation` ↔ pairSlug `turbulence-tensor-notation` etc. are tabulated in the File Structure section and referenced in each task.
- Math symbol conventions (kinematic viscosity `$\nu$`, eddy viscosity `$\nu_t$`, friction velocity `$u_\tau$`, Karman constant `$\kappa$`) are introduced in the chapter where they first appear and reused without redefinition in later chapters — verify when drafting that no symbol is reintroduced under a different letter.
