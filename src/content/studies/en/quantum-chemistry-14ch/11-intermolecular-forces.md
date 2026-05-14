---
title: 'Intermolecular forces — van der Waals, hydrogen bonding, dispersion'
description: 'The weak forces that hold molecules together — permanent dipoles, induced dipoles, and dispersion from quantum fluctuations — gathered into one 1/r⁶ picture and made tangible with the Lennard-Jones potential.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 11
lang: en
pairSlug: qc-intermolecular-forces
draft: false
updated: 2026-05-14
---

# Intermolecular forces — van der Waals, hydrogen bonding, dispersion

> The weak forces that hold molecules together — permanent dipoles, induced dipoles, and dispersion from quantum fluctuations — gathered into one 1/r⁶ picture and made tangible with the Lennard-Jones potential.

## Opening

If chapter 10 dealt with the polarity and polarizability of a molecule, this chapter looks at how those two ideas show up as forces *between* one molecule and another. A covalent bond is a strong force worth hundreds of kJ/mol, but water boiling at 100 °C, argon condensing into a liquid, and a gecko sticking to the ceiling are all the work of forces about a hundred times weaker — intermolecular forces. By the end of this chapter you will be able to state in one line that the "van der Waals force" is really a bundle of three distinct contributions, why all three fall off as $1/r^6$, and why the hydrogen bond occupies a special place in that hierarchy.

## Main 1 — The three faces of the van der Waals force

"Van der Waals force" is really a name lumping together three different attractive contributions.

- **Dipole–dipole (Keesom)**: two permanent dipoles $\vec\mu_1, \vec\mu_2$ attract while aligning their orientations. Boltzmann-averaging over all orientations gives $U_{\text{dd}} \propto -|\vec\mu_1|^2 |\vec\mu_2|^2 / (k_B T \cdot r^6)$.
- **Dipole–induced dipole (Debye)**: a permanent dipole polarizes the electron cloud of a neighboring molecule. $U_{\text{di}} \propto -\mu^2 \alpha / r^6$.
- **Induced–induced dipole (London dispersion)**: even nonpolar molecules attract through *instantaneous* quantum fluctuations of their electron clouds. $U_{\text{L}} \propto -\alpha_1 \alpha_2 / r^6$. It is the only attraction acting between noble-gas atoms, and the cohesion of liquid argon, the boiling points of alkanes, and a gecko's footpad are all its doing.

The key point is that all three contributions fall off as $1/r^6$. At short range, by contrast, the electron clouds overlap and Pauli repulsion kicks in; that part is much steeper, modeled empirically as $1/r^{12}$.

## Main 2 — The Lennard-Jones 12-6 potential

What summarizes all of this in one line is the **Lennard-Jones potential**.

$$
V(r) = 4\varepsilon\!\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right]
$$

Here $\varepsilon$ (epsilon) is the depth of the well and $\sigma$ (sigma) is the distance at which $V = 0$. Differentiating the two terms and finding the minimum, the equilibrium separation is

$$
r_e = 2^{1/6}\sigma \approx 1.122\,\sigma
$$

and the depth there is exactly $V(r_e) = -\varepsilon$. Representative values: argon $\varepsilon/k_B \approx 120$ K, $\sigma \approx 0.34$ nm; methane $\varepsilon/k_B \approx 148$ K, $\sigma \approx 0.38$ nm; water sits around $\varepsilon/k_B \approx 78$ K, $\sigma \approx 0.32$ nm with extra Coulomb terms added for hydrogen bonding. Just two terms — an $r^{12}$ repulsion and an $r^6$ attraction — become the standard starting point of molecular dynamics, from gas condensation all the way to protein-folding simulations.

## Main 3 — Hydrogen bonds: special and not so special

When hydrogen bonds to a strongly electronegative atom like F, O, or N, that hydrogen becomes electron-deficient and carries a large permanent dipole — and being small enough, it can approach a neighboring molecule's electronegative atom closely. The **hydrogen bond** formed this way is *much* stronger than an ordinary van der Waals force — 10–40 kJ/mol versus about 1 kJ/mol for a typical London interaction. It is also *directional*: the hydrogen must lie roughly along the N–H⋯O line.

What hydrogen bonds are responsible for: water's high boiling point (100 °C, against $-161$ °C for CH$_4$ of comparable molecular mass), the stability of the DNA double helix, the secondary structure of proteins, and the fact that ice is less dense than water. Energetically the hydrogen bond sits *between* a true covalent bond (about 400 kJ/mol) and an ordinary van der Waals force (about 1 kJ/mol) — weak compared to bonds, but strong compared to most non-bonded interactions. That "medium strength" is exactly where life works: too strong and the bonds never break, so information cannot be read; too weak and structure cannot be held.

## In Python

```python
# Plot the Lennard-Jones potential for argon, methane, and krypton.
# (eps/k_B, sigma) in units of (K, nm).
import numpy as np
import matplotlib.pyplot as plt

kB = 1.380649e-23  # J/K

species = {
    "Ar": (120.0, 0.34),
    "CH4": (148.0, 0.38),
    "Kr": (164.0, 0.36),
}

r = np.linspace(0.30, 1.00, 400)  # nm

for name, (eps_over_kB, sigma) in species.items():
    eps = eps_over_kB * kB                       # J
    V = 4 * eps * ((sigma / r)**12 - (sigma / r)**6)
    plt.plot(r, V / kB, label=f"{name} (eps/k_B={eps_over_kB:.0f} K)")
    r_e = 2**(1/6) * sigma
    plt.plot(r_e, -eps_over_kB, "o", color="0.3")
    print(f"{name}: r_e = {r_e:.3f} nm, well depth = {eps_over_kB:.0f} K")

plt.axhline(0, color="0.6", lw=0.8)
plt.xlabel("r / nm"); plt.ylabel("V(r) / k_B  [K]")
plt.ylim(-200, 200)
plt.title("Lennard-Jones 12-6 potential")
plt.legend(); plt.tight_layout(); plt.show()
```

If all three curves pass through a minimum of depth $-\varepsilon$ at $r_e = 2^{1/6}\sigma$, then with a two-term recipe — "$1/r^{12}$ repulsion plus $1/r^6$ attraction" — you have the cohesive tendency of three molecules in hand.

## To the next chapter

[Chapter 12: Electronic states of solids](../12-electronic-states-of-solids/) widens the view from molecules to a solid where $10^{23}$ atoms are arranged in a regular lattice. When the bonding/antibonding pairs of chapter 6 and the Hückel ladder of chapter 7 grow infinitely long, they become a *band*, and whether that band is filled or not separates metals, semiconductors, and insulators.
