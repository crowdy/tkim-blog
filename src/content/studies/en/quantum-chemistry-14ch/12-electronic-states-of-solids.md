---
title: 'Electronic states of solids — band structure at an intuitive level'
description: 'When one atom''s discrete levels line up $10^{23}$ deep, they become a band. A single 1D tight-binding model draws the boundary between metals, semiconductors, and insulators.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 12
lang: en
pairSlug: qc-solids
draft: false
updated: 2026-05-14
---

# Electronic states of solids — band structure at an intuitive level

> When one atom's discrete levels line up $10^{23}$ deep, they become a band. A single 1D tight-binding model draws the boundary between metals, semiconductors, and insulators.

## Opening

Up through chapter 11 we dealt with atoms and molecules — at most a benzene ring. This chapter carries the same LCAO logic to a solid where $10^{23}$ atoms are arranged in a regular lattice. The surprising thing is that almost no new physics is needed — stretch the bonding/antibonding pairs of chapter 6 and the Hückel ladder of chapter 7 out infinitely long, and that is exactly an **energy band**. By the end of this chapter you will be able to state in one line how atomic levels spread into a band, how to write the dispersion relation $E(k)$ of the 1D tight-binding model, and why where the Fermi level sits in the band separates metals, semiconductors, and insulators.

## Main 1 — From atom to chain to crystal

A single atom has discrete energy levels. Bring two atoms close and each level splits into a bonding and an antibonding pair (chapter 6). Line up $N$ atoms in a 1D chain and each atomic level splits into $N$ closely spaced levels — this is a **band**. A real crystal has $N \sim 10^{23}$, so the band is effectively a continuum of states, and those states are labeled by a *quasi-momentum* $k$. The spacing between atomic levels survives as the **band gap** between one band and the next.

The central picture is this: discrete atomic levels → splitting → a band of infinitely dense levels. The question "why is a solid a conductor or an insulator?" now becomes the question "up to which band are the electrons filled?"

## Main 2 — The 1D tight-binding model

Consider a chain of identical atoms spaced by $a$. On-site energy $\alpha$ (alpha), nearest-neighbor hopping $\beta$ (beta, negative) — exactly the same structure as the Hückel model of chapter 7. Thanks to the chain's translational symmetry, the eigenfunctions are **Bloch waves** $\psi_k(x_n) = e^{i k a n}$, and substituting them into the Schrödinger equation yields the dispersion relation

$$
E(k) = \alpha + 2\beta\cos(ka), \qquad k \in \left[-\frac{\pi}{a}, +\frac{\pi}{a}\right].
$$

The bandwidth is $4|\beta|$. Since $\beta < 0$, the bottom of the band is at $k = 0$ and the top at $k = \pm\pi/a$. If each atom contributes one electron and, by the Pauli principle, two electrons fill each $k$ state, the band is **half-filled** — states up to $|k| = \pi/(2a)$ are occupied and the Fermi level sits at $E_F = \alpha$. Since the Fermi level lies *inside* the band, this chain is a **metal**. Had each atom contributed two electrons (a closed shell), the entire band would fill, the next band would start at $E_F + \Delta E_{\text{gap}}$, and the chain would be an **insulator** or a **semiconductor** depending on the size of the gap.

## Main 3 — Metals, semiconductors, insulators

The distinction is set by where the Fermi level sits and how large the band gap is.

- **Metals** (Cu, Al, Na): $E_F$ is inside a band and there is no gap. Electrons have empty states to move into right next door, essentially for free, so current flows.
- **Semiconductors** (Si: $E_g \approx 1.1$ eV; Ge: 0.66 eV; GaAs: 1.4 eV): a small gap. Even room-temperature thermal energy $k_B T \approx 0.025$ eV lets some electrons jump the gap, giving a little conductivity. The size of the gap sets the absorption wavelength $\lambda = hc/E_g$.
- **Insulators** (diamond $E_g \approx 5.5$ eV, SiO$_2$ about 9 eV): the gap is too large to cross by thermal excitation. Even a visible-light photon ($\le 3.1$ eV) cannot lift an electron across, so the material is transparent.

The everyday classification of metal, semiconductor, and insulator reduces, in the end, to just two numbers: how full the band is, and how far away the next band is.

## In Python

```python
# Plot the 1D tight-binding band E(k) = alpha + 2*beta*cos(k*a).
import numpy as np
import matplotlib.pyplot as plt

alpha = 0.0     # eV (zero of energy)
beta  = -1.0    # eV (nearest-neighbor hopping)
a     = 1.0     # Å (lattice spacing)

k = np.linspace(-np.pi / a, np.pi / a, 400)
E = alpha + 2 * beta * np.cos(k * a)

E_F = alpha     # half-filling -> Fermi level
bandwidth = 4 * abs(beta)
print(f"bandwidth = {bandwidth:.1f} eV")

plt.plot(k, E, color="C0")
plt.fill_between(k, E, E_F, where=(E <= E_F), alpha=0.3, label="occupied states")
plt.axhline(E_F, color="0.4", ls="--", label=f"Fermi level E_F = {E_F:.1f} eV")
plt.xlabel("k  [1/Å]"); plt.ylabel("E(k)  [eV]")
plt.title("1D tight-binding band structure")
plt.legend(); plt.tight_layout(); plt.show()
```

If the bandwidth comes out as $4|\beta| = 4$ eV, that is the same order of magnitude as the bandwidth of a real metal like sodium (about 3 eV). A one-line toy model has matched a real metal's number to within an order of magnitude.

## To the next chapter

[Chapter 13: Structure and properties](../13-structure-and-properties/) is the last chapter of this book. It begins with the question thrown out in chapter 0 — "why does classical chemistry fail?" — and closes the book by releasing the language built up over fourteen chapters onto *real materials* like conducting polymers and OLEDs.
