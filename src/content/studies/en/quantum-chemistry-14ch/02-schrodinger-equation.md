---
title: 'The Schrödinger equation — where energy quantization begins'
description: 'How a single line, $\hat H \psi = E \psi$, forces the conclusion that energy comes in discrete steps — worked out by hand on the particle in a box.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 2
lang: en
pairSlug: qc-schrodinger-equation
draft: false
updated: 2026-05-14
---

# The Schrödinger equation — where energy quantization begins

> How a single line, $\hat H \psi = E \psi$, forces the conclusion that energy comes in discrete steps — worked out by hand on the particle in a box.

## Opening

Chapter 1 showed that classical mechanics has nothing to say about the electron inside an atom. This chapter introduces the one line that breaks that silence — the time-independent Schrödinger equation — explains why it takes the shape of an *eigenvalue equation*, and shows how **energy quantization** falls out of that shape automatically, with no extra postulate. The finale solves the simplest model, the *particle in a box*, by hand, and checks that the numbers come out on the energy scale of real chemistry. The 1s, 2s, 2p structure of multi-electron atoms in the next chapter starts from this picture.

## Main 1 — The single line

The **time-independent Schrödinger equation** is this one line:

$$
\hat H \psi = E \psi, \qquad \hat H = -\frac{\hbar^2}{2m}\nabla^2 + V(\vec r).
$$

Here $\psi$ (psi, the **wavefunction**) is a complex-valued function of position $\vec r$, and $\hat H$ (the **Hamiltonian**) is the sum of a kinetic term — the Laplacian $\nabla^2$ — and a potential $V(\vec r)$. The constant $\hbar$ (h-bar, the reduced Planck constant) is about $1.055 \times 10^{-34}\,\text{J·s}$.

The crucial feature of this equation is its shape: "apply $\hat H$ to $\psi$ and get back a multiple of the same $\psi$." That is an **eigenvalue equation**. Just as the matrix equation $A \vec v = \lambda \vec v$ in linear algebra singles out a few special vectors (eigenvectors) and the numbers attached to them (eigenvalues), the operator $\hat H$ singles out, from the infinity of possible functions, a few special ones — the *eigenfunctions* $\psi_n$. The number $E_n$ that pairs with each of them is the energy of that state.

The point is this: not every $\psi$ is a solution. **Only the special $\psi$ that also satisfy the boundary and normalization conditions survive**, and that is why the set of allowed energies $E$ is not a continuum but a **discrete set**. Quantization is not an extra postulate; it is a structural consequence of the equation.

## Main 2 — Particle in a box (1D)

Let us solve the simplest example by hand. A particle is confined to the 1D interval $0 < x < L$. Inside, $V(x) = 0$; outside, $V = +\infty$ (the particle cannot leave the box). Inside the box the Schrödinger equation reduces to

$$
-\frac{\hbar^2}{2m}\frac{d^2 \psi}{d x^2} = E\,\psi
$$

Outside the box $\psi = 0$, and for $\psi$ to be continuous we must have the **boundary conditions** $\psi(0) = \psi(L) = 0$.

The general solution inside is $\psi(x) = A\sin(kx) + B\cos(kx)$ with $k = \sqrt{2mE}/\hbar$. The condition $\psi(0) = 0$ forces $B = 0$. The remaining condition $\psi(L) = A\sin(kL) = 0$ leaves two possibilities: $A = 0$ (the trivial empty-box solution) or $kL = n\pi$ for some integer $n \ge 1$. The second is what we want. Adding the normalization $\int_0^L |\psi|^2 dx = 1$ gives

$$
\psi_n(x) = \sqrt{\frac{2}{L}}\sin\!\left(\frac{n\pi x}{L}\right), \qquad E_n = \frac{n^2 \pi^2 \hbar^2}{2 m L^2}.
$$

Three observations follow from this one line. (a) **The energy is discrete** — only $n = 1, 2, 3, \ldots$ are allowed. (b) Because $E_n \propto n^2$, **the gaps grow as you go up the ladder**. (c) $E_1 > 0$ — the mere fact of being confined produces a non-zero minimum kinetic energy. This is the **zero-point energy**. A classical particle can sit still with $E = 0$; a quantum particle cannot.

## Main 3 — Why this matters for chemistry

The particle in a box is a toy model, but it sets the scale of chemistry in one stroke. Confine an electron to a box the size of an atom — $L \sim a_0 = 5.29 \times 10^{-11}\,\text{m}$ (the Bohr radius) — and plug in the electron mass $m_e = 9.11 \times 10^{-31}\,\text{kg}$: the ground-state energy $E_1$ comes out to about $1.3 \times 10^{-17}\,\text{J} \approx 80\,\text{eV}$. The order of magnitude is exactly the **electronvolt regime**, the same scale as chemical bond energies and visible-light photon energies. The "electron in a Coulomb well" picture from Chapter 1 was, in effect, a "particle in a Coulomb-shaped box," and the same logic will produce the hydrogen 1s, 2s, 2p structure in the next chapter.

A second preview. Each spatial eigenstate $\psi_n$ can hold **two** electrons — one spin-up, one spin-down. That is the **Pauli exclusion principle**: no two electrons share a complete set of quantum numbers. It is the reason the periodic table fills 2-8-8-18, the reason helium is a stable noble gas, the reason carbon makes four bonds. The proper formalism — the Slater determinant — waits for Chapter 4.

## In Python

```python
# The first three eigenfunctions of the particle in a box, on the energy ladder.
# Units: hbar = 1, m = 1, L = 1. Then E_n = n^2 * pi^2 / 2.
import numpy as np
import matplotlib.pyplot as plt

L = 1.0
N = 200
x = np.linspace(0.0, L, N)

# Check the energy ratio: E_n / E_1 = n^2
ratios = [(n, n**2) for n in range(1, 5)]
print("E_n / E_1 =", [r for _, r in ratios])  # [1, 4, 9, 16]

# Energies and wavefunctions
energies = [n**2 * np.pi**2 / 2 for n in (1, 2, 3)]
psis = [np.sqrt(2/L) * np.sin(n * np.pi * x / L) for n in (1, 2, 3)]

# Stack each psi vertically at its own energy level
fig, ax = plt.subplots(figsize=(6, 5))
scale = 1.2   # amplitude scaling for visibility
for n, (E, psi) in enumerate(zip(energies, psis), start=1):
    ax.axhline(E, color="0.7", lw=0.8)
    ax.plot(x, scale * psi + E, label=f"n={n}, E={E:.2f}")
ax.set_xlabel("x / L")
ax.set_ylabel("E (arb. units)")
ax.set_title("Particle in a box: psi_n stacked on the energy ladder")
ax.legend()
plt.tight_layout()
plt.show()
```

If the printed list comes out as `[1, 4, 9, 16]` and the figure shows successively more nodes with successively larger gaps as you climb, you have touched the two core ideas of this chapter — quantization and the $n^2$ scaling — with your own hands.

## To the next chapter

[Chapter 3: Multi-electron atoms and atomic orbitals](../03-multielectron-atoms/) solves the same Schrödinger equation, this time with the three-dimensional Coulomb potential $V(r) = -e^2/(4\pi\epsilon_0 r)$, and reads off the 1s, 2s, 2p, 3d, … orbital structure that follows. If the box in this chapter was the cleanest example of "confinement forces quantization," the next chapter is about how that picture deforms when the walls are replaced by a real Coulomb attraction.
