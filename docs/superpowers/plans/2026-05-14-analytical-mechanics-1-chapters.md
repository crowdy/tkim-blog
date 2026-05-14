# Analytical Mechanics I — Chapters 0 to 12 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write the 13 chapters (0..12) of "해석역학 I / 解析力学 I / Analytical Mechanics I" in all three languages (ko, ja, en) under `src/content/studies/<lang>/analytical-mechanics-1/`. Calibration: **Advanced track** (see `docs/superpowers/specs/2026-05-14-chapter-template.md`). LaTeX math via the already-wired KaTeX stack, numpy/matplotlib Python demos per chapter.

**Architecture:**
- 13 chapters × 3 languages = 39 new chapter files.
- File naming: `src/content/studies/<lang>/analytical-mechanics-1/NN-<slug>.md` with `NN ∈ {00..12}` and the slug list below.
- Book metadata YAMLs already exist at `src/content/books/{ko,ja,en}/analytical-mechanics-1.yml`.
- Astro routes (`/<lang>/study/analytical-mechanics-1/`, `/<lang>/study/analytical-mechanics-1/<slug>/`) and the homepage `<StudyBanner />` already render whatever new chapters land — no Astro file touched.
- Each chapter follows the shape from the template: `## 들어가며 / はじめに / Opening` → 2–4 `## 본론 N / 本論 N / Main N` sections → `## 파이썬으로 확인 / Pythonで確かめる / In Python` → `## 다음 장으로 / 次章へ / To the next chapter`. The Korean H1 line at the top is hidden by CSS but still required.

**Tech Stack:** Astro 5 content collections (already configured), `remark-math` + `rehype-katex` (already wired), numpy + matplotlib in fenced ```python blocks (illustrative only, never executed by the site).

---

## File Structure

```
src/content/studies/ko/analytical-mechanics-1/00-mathematical-preliminaries.md  (and 12 more)
src/content/studies/ja/analytical-mechanics-1/00-mathematical-preliminaries.md  (and 12 more)
src/content/studies/en/analytical-mechanics-1/00-mathematical-preliminaries.md  (and 12 more)
```

**Slug / pairSlug map** (the same triple shared across the three languages):

| Ch | slug                                    | pairSlug                            |
|----|------------------------------------------|-------------------------------------|
| 0  | `00-mathematical-preliminaries`         | `am1-mathematical-preliminaries`    |
| 1  | `01-equations-of-motion`                | `am1-equations-of-motion`           |
| 2  | `02-constrained-motion-on-surfaces`     | `am1-constrained-motion`            |
| 3  | `03-tensors-and-covariant-derivative`   | `am1-tensors`                       |
| 4  | `04-manifolds`                          | `am1-manifolds`                     |
| 5  | `05-vector-fields`                      | `am1-vector-fields`                 |
| 6  | `06-differential-forms`                 | `am1-differential-forms`            |
| 7  | `07-lagrangian-mechanics`               | `am1-lagrangian-mechanics`          |
| 8  | `08-variational-principle`              | `am1-variational-principle`         |
| 9  | `09-symmetry-and-conservation`          | `am1-symmetry-conservation`         |
| 10 | `10-hamiltonian-mechanics`              | `am1-hamiltonian-mechanics`         |
| 11 | `11-canonical-transformations`          | `am1-canonical-transformations`     |
| 12 | `12-poisson-brackets-and-integrability` | `am1-poisson-integrability`         |

**Frontmatter template** (every file):

```yaml
---
title: '<title in target language>'
description: '<one-sentence hook, identical to opening blockquote>'
book: analytical-mechanics-1
bookTitle: '해석역학 I'   # ko — for ja use '解析力学 I', for en use 'Analytical Mechanics I'
chapter: <0..12>
lang: ko                 # ko | ja | en
pairSlug: <pairSlug-from-table>
draft: false
updated: 2026-05-14
---
```

---

## Per-chapter content brief

Each chapter task below produces three files (ko, ja, en) that share frontmatter `book`, `chapter`, `pairSlug`, `draft`, `updated` and differ in `title`, `description`, `lang`, `bookTitle`. The body sections are translated section-by-section so the structure is byte-identical across languages; only prose and inline Korean→Japanese→English comments inside the Python block change. Math LaTeX is identical across languages.

### Ch.0 — Mathematical preliminaries (`00-mathematical-preliminaries`)

- **Focus:** linear-algebra refresher (basis, change of basis, eigenvalues), tangent vector intuition, motivation for why "geometric mechanics" needs more than calculus.
- **Math:** `$T_p M$` defined informally as "velocities at a point"; explain `$\dot{x} = A x$` solved by `$x(t) = e^{tA} x_0$`; brief mention that `$e^{tA}$` is itself a one-parameter family of linear maps — a teaser for "flows".
- **Python:** matrix exponential `expm(A * t) @ x0` for a 2×2 rotation generator `$A = [[0, -1], [1, 0]]$`. Plot trajectory in the plane.
- **Next-chapter link:** ch.1 — Newton's laws in generalized coordinates.

### Ch.1 — Equations of motion (`01-equations-of-motion`)

- **Focus:** restate Newton's laws, introduce generalized coordinates `$q^i$`, configuration space `$M$` as the set of allowed `$q$` vectors.
- **Math:** Newton `$m \ddot{x} = F$`; transition to `$M$` via constraints (a bead on a ring lives in `$S^1$`, a planar pendulum in `$S^1$`, a double pendulum in `$T^2 = S^1 \times S^1$`). Generalized force `$Q_i = F_j \partial x^j / \partial q^i$`.
- **Python:** simulate a 2D harmonic oscillator with (a) explicit Euler and (b) symplectic Euler; compute energy along the trajectory; plot energy vs time on the same axes to show drift.
- **Next:** ch.2 — constraints.

### Ch.2 — Constrained motion on surfaces (`02-constrained-motion-on-surfaces`)

- **Focus:** holonomic vs. nonholonomic constraints; motion on `$S^2$`; Lagrange multipliers as constraint forces.
- **Math:** holonomic `$f(q, t) = 0$` reduces dimension; nonholonomic `$\sum_i a_i(q) \dot q^i = 0$` does not. Bead on a hoop ODE: `$\ddot{\theta} + (g/R) \sin\theta = 0$`.
- **Python:** integrate the bead-on-hoop ODE with `scipy.integrate.solve_ivp`, plot `$\theta(t)$` and `$\dot\theta(t)$`. (No `scipy` available in our snippets — use a hand-coded RK4 in ≤ 15 lines instead.)
- **Next:** ch.3 — tensors.

### Ch.3 — Tensors and covariant derivative (`03-tensors-and-covariant-derivative`)

- **Focus:** what a tensor IS (multilinear map), then how its components transform. Christoffel symbols `$\Gamma^k_{ij}$` introduced as "the price you pay for non-Cartesian coordinates" — one sentence.
- **Math:** transformation law `$T'^{i} = (\partial x'^i / \partial x^j) T^j$`. One worked example: transform a rank-1 tensor between Cartesian and polar coordinates.
- **Python:** numerically build the Jacobian `$J_{ij} = \partial x'^i / \partial x^j$` for `$(x, y) \to (r, \theta)$` at one point, then apply it to a vector and verify components.
- **Next:** ch.4 — manifolds.

### Ch.4 — Manifolds (`04-manifolds`)

- **Focus:** charts, atlases, smooth structure, why configuration space is a manifold.
- **Math:** definition of an `$n$`-manifold via locally homeomorphic to `$\mathbb{R}^n$`; sphere `$S^2$` covered by two stereographic charts; the transition map is smooth.
- **Python:** stereographic projection of `$S^2$` onto the plane: sample 200 points on `$S^2$`, project, plot.
- **Next:** ch.5 — vector fields.

### Ch.5 — Vector fields (`05-vector-fields`)

- **Focus:** smooth vector field `$X$` on `$M$`, integral curves `$\gamma(t)$` with `$\dot\gamma = X(\gamma)$`, flow `$\phi^t$`, Lie bracket `$[X, Y]$` as "non-commutativity of flows".
- **Math:** `$[X, Y] f = X(Y f) - Y(X f)$`. Compute one bracket example: `$X = \partial_x$`, `$Y = x \partial_y$` → `$[X, Y] = \partial_y$`.
- **Python:** define a 2D vector field `(u, v) = (-y, x)`, integrate it with hand-coded RK4 from a few initial points, plot streamlines using `plt.streamplot`.
- **Next:** ch.6 — differential forms.

### Ch.6 — Differential forms (`06-differential-forms`)

- **Focus:** 1-form as "object dual to a vector field", wedge product, exterior derivative `$d$`, Stokes in one line `$\int_M d\omega = \int_{\partial M} \omega$`.
- **Math:** for `$\omega = P\,dx + Q\,dy$`, `$d\omega = (\partial_x Q - \partial_y P)\,dx \wedge dy$` (=Green's theorem). Sign convention: `$dx \wedge dy = -dy \wedge dx$`.
- **Python:** compute the line integral of `$\omega = -y\,dx + x\,dy$` along the unit circle two ways: (a) direct parametrization, (b) by Green's theorem as `$\int\int 2\,dx\,dy = 2\pi$`. Print and compare.
- **Next:** ch.7 — Lagrangian mechanics.

### Ch.7 — Lagrangian mechanics (`07-lagrangian-mechanics`)

- **Focus:** Lagrangian `$L: TM \to \mathbb{R}$`, Euler–Lagrange `$\frac{d}{dt}\frac{\partial L}{\partial \dot q^i} - \frac{\partial L}{\partial q^i} = 0$`.
- **Math:** derive EL for a planar pendulum `$L = (1/2) m \ell^2 \dot\theta^2 + m g \ell \cos\theta$`; show it gives `$\ddot\theta = -(g/\ell)\sin\theta$`.
- **Python:** integrate the pendulum EL with RK4 vs. its Newtonian form; verify the two agree to machine precision over 10 s.
- **Next:** ch.8 — variational principle.

### Ch.8 — Variational principle (`08-variational-principle`)

- **Focus:** action `$S[q] = \int L\,dt$`, principle of least (stationary) action, calculus of variations, fixed-endpoint conditions.
- **Math:** derive EL by setting `$\delta S = 0$`. State boundary conditions `$\delta q(t_1) = \delta q(t_2) = 0$`.
- **Python:** discrete variational integrator for the pendulum (one of the cleanest demos in classical mechanics): minimize the discrete action `$S_d = \sum_n L((q_{n+1}+q_n)/2, (q_{n+1}-q_n)/\Delta t) \Delta t$` over `$q_n$` by direct iteration. Plot trajectory and energy.
- **Next:** ch.9 — symmetry & conservation.

### Ch.9 — Symmetry and conservation (`09-symmetry-and-conservation`)

- **Focus:** Noether's theorem informally. Examples: translation invariance → momentum, rotation invariance → angular momentum, time-translation invariance → energy.
- **Math:** if `$L$` is invariant under `$q^i \to q^i + \epsilon \xi^i(q)$`, the quantity `$J = (\partial L/\partial \dot q^i) \xi^i$` is conserved. Apply to a central-force `$L = (1/2) m |\dot{\vec r}|^2 - U(|\vec r|)$` and recover `$\vec L = \vec r \times m \vec v$`.
- **Python:** integrate a Kepler-like central-force orbit and verify `$\vec L$` is conserved (print `$L_z$` at several timesteps; show variation ≤ 1e-10).
- **Next:** ch.10 — Hamiltonian mechanics.

### Ch.10 — Hamiltonian mechanics (`10-hamiltonian-mechanics`)

- **Focus:** Legendre transform `$H(q, p) = p_i \dot q^i - L$`, phase space `$T^*M$`, Hamilton's equations `$\dot q^i = \partial H/\partial p_i$`, `$\dot p_i = -\partial H/\partial q^i$`.
- **Math:** apply to the simple pendulum: `$H = p^2/(2m\ell^2) - m g \ell \cos\theta$`.
- **Python:** phase portrait of the simple pendulum: sample `(\theta_0, p_0)` on a grid, integrate each for one period or several, scatter-plot the `(\theta, p)` trajectories. Identify separatrix at `$E = m g \ell$`.
- **Next:** ch.11 — canonical transformations.

### Ch.11 — Canonical transformations (`11-canonical-transformations`)

- **Focus:** canonical transformation `$(q, p) \to (Q, P)$` that preserves Hamilton's-equation form. Generating functions `$F_1(q, Q)$`, `$F_2(q, P)$`, etc. Phase-space volume preservation (Liouville).
- **Math:** explicit `$F_2$` example: `$F_2 = qP$` gives identity; `$F_2 = qP + \epsilon q^2$` gives a shear. Verify `$\{Q, P\} = 1$`.
- **Python:** apply the shear, then numerically verify `$\{Q, P\} = 1$` by computing partial derivatives via `np.gradient` on a grid.
- **Next:** ch.12 — Poisson brackets & integrability.

### Ch.12 — Poisson brackets and integrability (`12-poisson-brackets-and-integrability`)

- **Focus:** Poisson bracket `$\{f, g\} = \partial_q f \, \partial_p g - \partial_p f \, \partial_q g$` as the Lie bracket on functions. Liouville integrability: `$n$` independent commuting conserved quantities → action–angle variables.
- **Math:** harmonic oscillator action–angle: `$J = H/\omega$`, `$\theta = \omega t + \theta_0$`. Show `(\theta, J)` traces a horizontal line in phase space.
- **Python:** harmonic oscillator: integrate `$(q, p)$`, compute `$(J, \theta)$` along the trajectory, plot in the `$(\theta, J)$` plane — confirm `$J$` is constant and `$\theta$` advances linearly.
- **Closing note:** This is the closing chapter — keep the personal-note style. Sketch where the reader could go next: volume II (HJ, field theory), symplectic geometry, or Arnold's *Mathematical Methods of Classical Mechanics* as a deeper reference. ~3 sentences. No "Next chapter" link.

---

## Task 1: Ch.0 — Mathematical preliminaries (ko/ja/en)

**Files:**
- Create: `src/content/studies/ko/analytical-mechanics-1/00-mathematical-preliminaries.md`
- Create: `src/content/studies/ja/analytical-mechanics-1/00-mathematical-preliminaries.md`
- Create: `src/content/studies/en/analytical-mechanics-1/00-mathematical-preliminaries.md`

- [ ] **Step 1.1: Write the Korean version.** Frontmatter: `title: '수학적 준비 — 다양체 역학을 위한 도구상자'`, `description`: one-sentence hook matching the body's opening blockquote, `chapter: 0`, `pairSlug: am1-mathematical-preliminaries`, `bookTitle: 해석역학 I`. Body shape per template (Advanced track). Aim 2500–3500 chars body excluding code. Content brief: see Ch.0 brief above.

- [ ] **Step 1.2: Write the Japanese sibling.** Mirror structure byte-for-byte. `bookTitle: 解析力学 I`, headings 「はじめに / 本論 1 / … / Pythonで確かめる / 次章へ」, Python comments in Japanese.

- [ ] **Step 1.3: Write the English sibling.** Mirror structure byte-for-byte. `bookTitle: Analytical Mechanics I`, headings `Opening / Main 1 / … / In Python / To the next chapter`, Python comments in English.

- [ ] **Step 1.4: Verify schema + build + KaTeX.**

```bash
npm run check
npm run build
for L in ko ja en; do
  f="dist/$L/study/analytical-mechanics-1/00-mathematical-preliminaries/index.html"
  cnt=$(grep -c "katex" "$f")
  echo "$L $cnt"
done
```

Expected: `npm run check` 0/0/0; build succeeds; every counted line shows `katex` ≥ 1.

(No commit at this stage — commit once after the whole book is in.)

---

## Tasks 2..13 — Chapters 1..12

Each task has the same shape as Task 1: write ko, ja, en in parallel; verify schema + build + KaTeX render on the chapter's three pages. Use the per-chapter brief above. Use the slug + pairSlug from the File Structure table.

- **Task 2:** Ch.1 `01-equations-of-motion`, pairSlug `am1-equations-of-motion`.
- **Task 3:** Ch.2 `02-constrained-motion-on-surfaces`, pairSlug `am1-constrained-motion`.
- **Task 4:** Ch.3 `03-tensors-and-covariant-derivative`, pairSlug `am1-tensors`.
- **Task 5:** Ch.4 `04-manifolds`, pairSlug `am1-manifolds`.
- **Task 6:** Ch.5 `05-vector-fields`, pairSlug `am1-vector-fields`.
- **Task 7:** Ch.6 `06-differential-forms`, pairSlug `am1-differential-forms`.
- **Task 8:** Ch.7 `07-lagrangian-mechanics`, pairSlug `am1-lagrangian-mechanics`.
- **Task 9:** Ch.8 `08-variational-principle`, pairSlug `am1-variational-principle`.
- **Task 10:** Ch.9 `09-symmetry-and-conservation`, pairSlug `am1-symmetry-conservation`.
- **Task 11:** Ch.10 `10-hamiltonian-mechanics`, pairSlug `am1-hamiltonian-mechanics`.
- **Task 12:** Ch.11 `11-canonical-transformations`, pairSlug `am1-canonical-transformations`.
- **Task 13:** Ch.12 `12-poisson-brackets-and-integrability`, pairSlug `am1-poisson-integrability`. **Closing chapter** — keep personal-note style; omit the "next chapter" link or replace with a "where next" pointer (volume II / symplectic geometry / Arnold).

---

## Task 14: Final verification + commit

- [ ] **Step 14.1: Count chapter files.**

```bash
for L in ko ja en; do
  cnt=$(ls src/content/studies/$L/analytical-mechanics-1/ 2>/dev/null | wc -l)
  echo "$L: $cnt"
done
```

Expected: `13` for each.

- [ ] **Step 14.2: Schema + build verification.**

```bash
npm run check
npm run build
```

Expected: 0/0/0; build succeeds.

- [ ] **Step 14.3: KaTeX render check on every chapter.**

```bash
for L in ko ja en; do
  for NN in 00 01 02 03 04 05 06 07 08 09 10 11 12; do
    f=$(ls dist/$L/study/analytical-mechanics-1/${NN}-*/index.html 2>/dev/null | head -1)
    if [ -z "$f" ]; then echo "MISSING: $L $NN"; continue; fi
    cnt=$(grep -c "katex" "$f")
    if [ "$cnt" -lt 1 ]; then echo "NO MATH RENDERED: $f (count=$cnt)"; fi
  done
done
```

Expected: no `MISSING` or `NO MATH RENDERED` lines.

- [ ] **Step 14.4: TOC count check.**

```bash
for L in ko ja en; do
  cnt=$(grep -oE '/study/analytical-mechanics-1/[0-9]{2}-' dist/$L/study/analytical-mechanics-1/index.html | sort -u | wc -l)
  echo "$L: $cnt chapters in TOC"
done
```

Expected: each line `13 chapters in TOC`.

- [ ] **Step 14.5: Commit.**

```bash
git add src/content/books/{ko,ja,en}/analytical-mechanics-1.yml \
        src/content/studies/{ko,ja,en}/analytical-mechanics-1/
git commit -m "study(analytical-mechanics-1): add chapters 0..12 (ko, ja, en)"
```

---

## Self-Review

- 13 chapters spec'd → 13 chapter tasks + 1 verification task = 14 tasks. ✓
- Three languages per chapter handled inside each chapter task. ✓
- Advanced-track calibration: enforced by template reference; each chapter brief calls out which new piece of machinery needs the two-sentence framing. ✓
- No placeholders: each chapter has concrete math content and Python demo content. ✓
- Naming consistency: `pairSlug` table is the single source — every chapter task points back to it. ✓
- Closing chapter (12) gets the personal-note style flagged. ✓
