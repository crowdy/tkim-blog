# Study chapter template & style guide

All chapters of the study series under `src/content/studies/` follow this template so that ko/ja/en pairs stay structurally aligned and the difficulty stays consistent across a book.

Each book picks **one** of the two calibration tracks below:

- **Standard track** — the original turbulence-book calibration. Bright high-school student, every new symbol defined on first use.
- **Advanced track** — undergraduate STEM 2nd–3rd year. More math machinery allowed, but every new piece of machinery (manifold, exterior derivative, Slater determinant…) gets two sentences of plain-language framing before the formula.

The body shape, frontmatter rules, math conventions, and Python conventions are shared across both tracks. Only the difficulty-calibration table differs.

## Audience — Standard track

Bright high-school student who finished single-variable calculus and basic vector algebra. They have NOT seen partial differential equations, tensors, or fluid mechanics before. Every new symbol is defined the first time it appears. Every Greek letter is named ("μ, called *mu*").

Books currently on this track:

- `turbulence-fundamentals` (난류해석의 기초 / 乱流解析の基礎 / Fundamentals of Turbulence Analysis)

## Audience — Advanced track

Undergraduate STEM reader, 2nd–3rd year. Has partial derivatives, basic linear algebra, ODE intuition, and complex numbers in hand. Has NOT seen differential forms, tensor algebra, or Slater determinants before — those still get defined on first use, with two sentences of plain-language framing *before* the formula. The reader is willing to follow one new piece of machinery per section, not three.

Books currently on this track:

- `analytical-mechanics-1` (해석역학 I / 解析力学 I / Analytical Mechanics I) — assumes mechanics + multivariable calculus. Manifold, exterior derivative, pullback, Lie derivative defined on first use.
- `analytical-mechanics-2` (해석역학 II / 解析力学 II / Analytical Mechanics II) — assumes everything from volume I + tensor / form algebra. HJ equation, infinite-dimensional phase space, relativistic 4-vectors defined on first use.
- `quantum-chemistry-14ch` (말 거는 양자화학 / 語りかける量子化学 / Quantum Chemistry in 14 Chapters) — no QM prior assumed; high-school chemistry + basic calculus + complex numbers. Wavefunction normalization, quantum numbers, Slater determinants, MO/AO defined on first use.

## Frontmatter

```yaml
---
title: '<chapter title in target language>'
description: '<one-sentence hook, identical to the opening blockquote>'
book: <book-slug>            # e.g. turbulence-fundamentals, analytical-mechanics-1
bookTitle: '<책 제목 / 本の題名 / Book title in target language>'
chapter: <integer>           # 0 for a prologue (sorts first), 1.. for main chapters
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

## Difficulty calibration — Standard track

| Allowed | Out of bounds |
|---|---|
| derivative / integral notation | covariant derivatives, multi-index tensors with > 2 indices |
| `∂u/∂x` once defined as "rate of change of u along x" | functional analysis, weak formulations |
| Reynolds number, simple dimensionless groups | spectral decompositions presented without preamble |
| Linking back to chapter 1's five properties of turbulence | citing literature without explaining the term |

## Difficulty calibration — Advanced track

| Allowed | Out of bounds |
|---|---|
| multivariable calculus, partial derivatives, Jacobians, line/surface integrals | Sobolev spaces, weak solutions, distributional derivatives without context |
| basic linear algebra: matrices, eigenvalues, change of basis, determinant | spectral theory of unbounded operators without preamble |
| ODE intuition: existence/uniqueness as a stated fact, flow of a vector field | functional analysis machinery (Banach/Hilbert spaces) without two sentences of framing |
| differential forms, exterior derivative, pullback, Lie derivative — defined on first use with a one-sentence intuition | citing "Stokes' theorem on manifolds" or "Hodge star" without explaining what they mean |
| tensor algebra up to rank 2, index gymnastics with Einstein summation | rank-3+ tensors used in formulae without first computing one example |
| wavefunctions, operators, eigenvalue equations once `$\hat A \psi = a \psi$` is introduced | second quantization, creation/annihilation operators without preamble |
| Slater determinants, MO/AO, hybridization — defined on first use | density functional theory, post-HF methods cited without explanation |
| `$\hbar = 1$` or SI units — pick one per chapter and state it once | mixing unit systems within a single derivation |
| numerical demos with matrices up to ~100×100 | demos that require external data files or > 40 lines of Python |

When in doubt (either track): explain the concept first in plain language, then give the formula, then run the formula on one concrete number in Python.

## When the chapter is a prologue (`chapter: 0`)

Skip the "다음 장으로 / 次章へ / To the next chapter" link if the prologue points to ch.1 by author choice, otherwise still include the link. The opening blockquote should be one sentence stating "why this prologue exists" so the TOC reads cleanly.

## When the chapter is the closing chapter of a book

Keep the personal-note style used in `turbulence-fundamentals/12-industrial-cfd.md` — the closing chapter recaps the book's central image and points forward to one or two reading paths the reader could take next. Do not collapse it into a bare "further reading" list.
