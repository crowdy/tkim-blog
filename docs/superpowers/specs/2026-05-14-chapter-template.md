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
