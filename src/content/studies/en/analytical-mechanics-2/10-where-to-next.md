---
title: 'Where to next — the next shelf'
description: 'Two volumes pulled along a single thread — the action principle. This closing chapter lays that thread out on one page and points at three doors that branch off from it.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 10
lang: en
pairSlug: am2-where-to-next
draft: false
updated: 2026-05-14
---

# Where to next — the next shelf

> Two volumes pulled along a single thread — the action principle. This closing chapter lays that thread out on one page and points at three doors that branch off from it.

## Opening

Thank you, sincerely, for sticking with the book this far. The point of this chapter is not to slip in one more theorem — it is to spread the **single story that these two volumes have been telling** out on a single page. Once that one line is fixed in mind, I want to point briefly at where you might reach next after closing the book.

## Main 1 — What we built

Volume I began with Newton's equations of motion on $\mathbb{R}^3$. We lifted those coordinate-fragile equations onto a smooth manifold, packed everything into a single Lagrangian $L(q, \dot q, t)$, and formed the action

$$
S[q] = \int L\, dt
$$

whose stationarity gave us the Euler–Lagrange equations. From there **Noether** tied symmetries to conserved quantities, and the Hamiltonian flow on $T^*M$ sharpened the picture one more step.

Volume II carried that skeleton further. Chapters 1–3 wrote Hamilton–Jacobi as a **single partial differential equation**, then solved the motion of integrable systems on tori using action–angle coordinates. Chapter 4 watched that picture break under perturbations (KAM). Chapters 5–7 lifted the Lagrangian from particles to fields, and then to relativistic four-vectors. Chapters 8–9 wrapped the same action $S$ inside the weight $e^{iS/\hbar}$ and summed over all paths — the path integral. **The variational principle survives every one of these generalizations. That is what the two volumes were really about.**

## Main 2 — A two-line diagram

```
L(q, q̇)  →  S = ∫L dt  →  e^{iS/ℏ}  →  ⟨x_f | x_i⟩
classical                              quantum amplitude (propagator)
```

This single line carries more than it shows. The left edge is the starting point of volume I, chapter 1. The right edge is the destination of chapter 9. The two middle cells are the bridge between the action principle (classical) and the path integral (quantum). The cleanest example of this bridge becoming a numerical calculation is **lattice QCD**: spacetime is chopped into a lattice, the action is discretized (usually after a Wick rotation to imaginary time), and the integral $\int \mathcal{D}\phi\, e^{iS/\hbar}$ is evaluated directly by a computer. The thread we have been fingering by hand across two volumes is exactly the one a supercomputer is running, with hundreds of thousands of degrees of freedom, in production.

## Main 3 — Three doors

There are more than three places to go after closing this book, but the three that follow most naturally from the action–Hamilton skeleton you now hold are:

- **Symplectic / contact geometry.** The modern mathematical language for Hamiltonian mechanics. The protagonist is the canonical 2-form $\omega = dp \wedge dq$ on $T^*M$, and canonical transformations are recast as symplectomorphisms — the maps that preserve $\omega$. The canonical bridge from where you stand now is Arnold's **Mathematical Methods of Classical Mechanics**: every tool from volumes I and II re-emerges, dressed in differential-geometric language.
- **Floer theory / mirror symmetry.** Where symplectic geometry meets algebraic geometry. It produces topologically robust invariants of phase space and runs deep into mathematical physics and string theory. A reasonable first book is McDuff & Salamon's **Introduction to Symplectic Topology**.
- **Quantum field theory.** The most powerful place the $e^{iS/\hbar}$ of chapter 9 lives. For particle physics, the standard text is Peskin & Schroeder, **An Introduction to Quantum Field Theory**; for the foundations, Weinberg volume 1, **The Quantum Theory of Fields**. This is where you see most clearly that the action principle of these two volumes survives quantization intact — and that the path-integral viewpoint is, by now, the canonical one.

## In Python

For closure, one more tiny computation — no new physics. Compute the de Broglie wavelength $\lambda_{\rm dB} = h/p$ of an electron with kinetic energy 1 eV. Here $h$ is Planck's constant, $m_e$ is the electron mass, and 1 eV converts to a known number of joules.

```python
import numpy as np

h = 6.626e-34      # Planck constant (J·s)
m_e = 9.109e-31    # electron mass (kg)
eV = 1.602e-19     # 1 eV in joules

E_kin = 1.0 * eV                  # kinetic energy of 1 eV
p = np.sqrt(2 * m_e * E_kin)      # non-relativistic momentum
lam = h / p                       # de Broglie wavelength (m)

print(f"p    = {p:.3e} kg·m/s")
print(f"λ_dB = {lam*1e9:.3f} nm")
# an electron at 1 eV has a wavelength comparable to atomic spacing —
# the bridge to quantum chemistry.
```

The output is roughly $\lambda_{\rm dB} \approx 1.23$ nm — about an order of magnitude larger than typical atomic bond lengths (around 0.1 nm). That single printed number is the last stepping stone on the bridge we have walked across the two volumes: from the action principle, through $e^{iS/\hbar}$, to the matter wave of a real electron.

## Closing

If, when we wrote down the first line of volume I — that one Lagrangian — somebody had whispered "this is the same equation you will write down in chapter 9 of volume II under a path integral", the book would have looked a little thinner. The real goal of the two volumes was exactly that: to make it possible to touch, with your own fingers, the fact that one variational principle survives the passage from particles to fields, from non-relativistic to relativistic, from classical to quantum. If this book is remembered as one that walked across that bridge with you, even once, that is more than I could ask for as an author. Whichever door on the next shelf you pick, the tools you already have in hand will continue to work there. If, years later, in front of some paper, you find yourself muttering "ah — this is just stationarity of an action", these two volumes will have done their job. Safe travels.
