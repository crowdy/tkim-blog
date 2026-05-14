---
title: 'Multielectron atoms — spin, Pauli, and the periodic table'
description: 'The electron is a tiny magnet with two faces — how spin and the Pauli exclusion principle force Slater determinants on us and write the periodic table for free.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 3
lang: en
pairSlug: qc-multielectron-atoms
draft: false
updated: 2026-05-14
---

# Multielectron atoms — spin, Pauli, and the periodic table

> The electron is a tiny magnet with two faces — how spin and the Pauli exclusion principle force Slater determinants on us and write the periodic table for free.

## Opening

In chapter 2 we saw that a single electron in a hydrogen atom lives in an *orbital* labelled by three quantum numbers $(n, \ell, m_\ell)$. This chapter adds one decisive piece to that picture — **spin**. The moment spin enters, an orbital can host *two* electrons rather than one, and that ceiling of "two" is enforced — in a way that refuses to factor apart — by the **Pauli exclusion principle**, expressed most cleanly as the vanishing of a determinant. By the end of the chapter you should be able to *reconstruct*, rather than memorise, the electron configurations from helium to uranium, and to say in one line which quantum number each axis of the periodic table is a picture of.

## Main 1 — Spin: the second face the electron carries around

Besides its spatial position, every electron carries one unit of an **intrinsic angular momentum** called $\vec S$. Quantum mechanics fixes its magnitude to

$$
|\vec S| = \hbar \sqrt{s(s+1)}, \qquad s = \tfrac{1}{2},
$$

where $\hbar$ (h-bar, the reduced Planck constant) sets the unit of every angular momentum in quantum theory. The crucial point is that $s = 1/2$ is *nailed down* for an electron — the electron is a "half-integer spin" particle, a **fermion**.

Spin's other degree of freedom is its projection onto a chosen axis (call it $z$):

$$
S_z = m_s \hbar, \qquad m_s = \pm \tfrac{1}{2}.
$$

So the spin of an electron takes only two values: "up" ($m_s = +1/2$, written $\uparrow$) and "down" ($m_s = -1/2$, written $\downarrow$). The consequence: each spatial orbital comes automatically paired with *two* **spin-orbitals** — one with spin up, one with spin down.

A single electron is now fully specified by four quantum numbers, $(n, \ell, m_\ell, m_s)$, with $n = 1, 2, 3, \dots$, $\ell = 0, 1, \dots, n-1$, $m_\ell = -\ell, \dots, +\ell$, and $m_s = \pm 1/2$. Following chemists' convention we call the $\ell = 0, 1, 2, 3$ orbitals $s, p, d, f$ respectively. (That "$s$" is *not* the spin $s$; the letter is a 19th-century spectroscopy fossil — *sharp* — and the collision of names is purely an accident.)

## Main 2 — Pauli exclusion and Slater determinants

Because electrons are fermions, swapping the labels of two electrons must multiply the total wavefunction by $-1$ — that is, the wavefunction must be **antisymmetric**:

$$
\Psi(1, 2) = - \Psi(2, 1).
$$

The labels "1, 2" stand jointly for the spatial coordinates and spin of each electron. This is not a convention dressed up as a rule — it is an experimentally verified fact about nature, and *every* half-integer-spin particle obeys it.

Suppose two electrons occupy distinct spin-orbitals $\phi_a$ and $\phi_b$. The simplest wavefunction that satisfies the antisymmetry condition is

$$
\Psi(1, 2) = \frac{1}{\sqrt{2}}\left[\phi_a(1)\phi_b(2) - \phi_a(2)\phi_b(1)\right] = \frac{1}{\sqrt{2}}\det\!\begin{pmatrix}\phi_a(1) & \phi_b(1) \\ \phi_a(2) & \phi_b(2)\end{pmatrix}.
$$

The right-hand side is the **determinant** of a 2×2 matrix; a multielectron wavefunction written this way is called a **Slater determinant**. A determinant changes sign when two rows are swapped and vanishes when two columns coincide, and these two properties immediately deliver:

- Swapping the electron labels 1 and 2 (= swapping rows) flips the sign of $\Psi$ — *antisymmetry is built in automatically*.
- If the two spin-orbitals coincide, $\phi_a = \phi_b$, the two columns of the matrix coincide and $\Psi \equiv 0$ — *no two electrons may share a single spin-orbital*. This is the **Pauli exclusion principle** in its strongest form.

Slater determinants generalise to $N$ electrons: the antisymmetric $N$-electron wavefunction is the determinant of the $N \times N$ matrix $\phi_i(j)$ normalised by $\sqrt{N!}$. This form returns in earnest in chapter 12 when we set up molecular orbital theory.

## Main 3 — Reading the periodic table: Aufbau and Hund's rule

With these two tools we now *build* the periodic table. The **Aufbau (build-up) principle** is almost embarrassingly simple — *fill the lowest-energy spin-orbital first*. Each spatial orbital has room for two electrons (one with each $m_s$); when it is full move on. The average filling order seen in multielectron atoms is

$$
1s \to 2s \to 2p \to 3s \to 3p \to 4s \to 3d \to 4p \to 5s \to 4d \to 5p \to \cdots
$$

with capacities $2, 6, 10, 14$ for the $s, p, d, f$ subshells respectively (which is just $2(2\ell+1)$). Two observations to fix in mind:

1. The $s, p, d, f$ **blocks** match the vertical groupings of the periodic table directly — 2 columns of $s$-block, 6 of $p$-block, 10 of $d$-block, 14 of $f$-block.
2. The slightly surprising fact that $4s$ fills *before* $3d$ is exactly what makes the first row of transition metals interesting. The subtle chemistry of transition metals begins right at that crossover.

One more rule completes the construction: **Hund's rule** — when several orbitals of equal energy are available (e.g. the three $2p$ orbitals $p_x, p_y, p_z$), electrons first spread out one to each orbital with *parallel* spins before any pairing begins. That is why carbon (C, six electrons) sits in the ground state $1s^2 2s^2 2p^2$ with its two $2p$ electrons in two *different* orbitals and spins aligned, rather than paired in a single orbital. This single fact sets the stage for carbon chemistry — and therefore, essentially, all of organic chemistry.

## In Python

```python
# Build the helium ground-state two-electron Slater determinant by hand
# and verify antisymmetry under electron-label exchange.
# Spatial 1s orbital phi(r) = (1/sqrt(pi)) exp(-r), with Bohr radius a_0 = 1.
import numpy as np

def phi_1s(r):
    return np.exp(-r) / np.sqrt(np.pi)

def alpha(spin):           # 1 only on spin "up"
    return 1.0 if spin == "up" else 0.0

def beta(spin):            # 1 only on spin "down"
    return 1.0 if spin == "down" else 0.0

def chi_up(r, spin):       # 1s with spin up (spin-orbital)
    return phi_1s(r) * alpha(spin)

def chi_dn(r, spin):       # 1s with spin down
    return phi_1s(r) * beta(spin)

def slater(e1, e2):
    r1, s1 = e1
    r2, s2 = e2
    M = np.array([[chi_up(r1, s1), chi_dn(r1, s1)],
                  [chi_up(r2, s2), chi_dn(r2, s2)]])
    return np.linalg.det(M) / np.sqrt(2)

e1 = (0.5, "up")
e2 = (1.2, "down")
psi_12 = slater(e1, e2)
psi_21 = slater(e2, e1)   # swap the electron labels
print(f"Psi(1, 2) = {psi_12: .6f}")
print(f"Psi(2, 1) = {psi_21: .6f}   (should be the negative)")
print(f"sum       = {psi_12 + psi_21: .2e}  (≈ 0)")
```

If $\Psi(1,2)$ and $\Psi(2,1)$ come out as exact negatives of each other and their sum is zero to machine precision, you have touched with your own hands the fact that a Slater determinant *automatically* enforces fermionic antisymmetry. Rewrite the snippet so that both electrons share the same spin-orbital (say both $\chi_\uparrow$) and the determinant collapses to zero — the Pauli exclusion principle falling out as a single line of code.

## To the next chapter

[Chapter 4: the quantum nature of light](../04-quantum-nature-of-light/) moves the stage from electrons sitting in spin-orbitals to electrons *jumping* between them, absorbing or emitting light as they go. Which combinations of the quantum numbers $(n, \ell, m_\ell, m_s)$ make a transition *allowed* — the so-called *selection rules* — will be the opening sentence of spectroscopy.
