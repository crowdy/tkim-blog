---
title: 'Why atoms bond — covalent bonds and H₂'
description: 'Following the event of two hydrogen atoms meeting to become H₂ all the way through, from three angles: the energy argument, the Heitler–London wavefunction, and the Morse potential.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 5
lang: en
pairSlug: qc-why-atoms-bond
draft: false
updated: 2026-05-14
---

# Why atoms bond — covalent bonds and H₂

> Following the event of two hydrogen atoms meeting to become H₂ all the way through, from three angles: the energy argument, the Heitler–London wavefunction, and the Morse potential.

## Opening

This is the first chapter in the book to face a *molecule* head-on. Up to chapter 4 we watched a single atom, at most a single electron, move. Now the stage is two atoms facing each other and two electrons settling into the space between two nuclei — the simplest molecule there is, the hydrogen molecule H₂. By the end of this chapter you should be able to answer the question "why are two H atoms bound into H₂?" in three different languages at once: in energy, in wavefunctions, and in potential curves. The molecular-orbital theory of chapter 6 is the natural generalization of the Heitler–London picture we build here.

## Main 1 — The energy argument for bonding

The ground-state energy of one hydrogen atom is $E_H = -13.6$ eV (in this book we use $E_H$ as **the sign-flipped ionization energy of the hydrogen atom**). Place two H atoms infinitely far apart and the total energy is simply $2 E_H = -27.2$ eV. This is the "no-bond baseline."

What happens as we bring the two atoms slowly together? The nucleus–nucleus repulsion $+e^2/(4\pi\epsilon_0 R)$ clearly raises the energy. But the two electrons can suddenly roam freely through "the larger box made by the two nuclei." **When the box gets larger, the electron's kinetic energy goes down** — in the de Broglie relation $\lambda \sim h/p$ (de Broglie, **the matter-wave wavelength**), the fact that $\lambda$ can grow means $p$ can shrink, so $\langle p^2 / 2m \rangle$ decreases. More precisely, as electron density piles up in the space between the two nuclei, it feels attraction from both protons at once, and the potential energy drops as well.

These two effects combine, and near a critical separation $R \approx 0.74$ Å the total energy drops **below** $2 E_H$. That difference is the binding energy $D_e \approx 4.52$ eV. Experimentally, breaking H₂ into two free H atoms costs exactly that much energy. Generalized: **bonds form when electron sharing lowers the total energy below the separated-atom limit.** That one line is the starting point of every covalent bond.

## Main 2 — The valence-bond (Heitler–London) picture

In 1927, Heitler (W. Heitler) and London (F. London) applied quantum mechanics to H₂ for the first time. Their starting point is simple: before bonding, each of the two H atoms carried one 1s electron. Call those two 1s orbitals $\phi_A$ and $\phi_B$, and assume their shapes survive more or less intact once the molecule forms.

The catch is that the two electrons are **indistinguishable** (the Pauli principle of chapter 3). The full wavefunction, combining the spatial and spin parts of the two electrons, must therefore be **antisymmetric** under exchange of the two electron labels. The spatial wavefunction that makes a bond is the following *symmetric* combination,

$$
\Psi(1, 2) = N\left[\phi_A(1)\phi_B(2) + \phi_A(2)\phi_B(1)\right]\,\chi_{\rm singlet}(1, 2)
$$

where $N$ is a normalization constant and $\chi_{\rm singlet} = \frac{1}{\sqrt 2}[\,\alpha(1)\beta(2) - \beta(1)\alpha(2)\,]$ is the spin **singlet (singlet, total spin 0)** state. Because the spatial part is symmetric, the spin part must be antisymmetric, so that the whole thing is antisymmetric.

The $+$ spatial combination piles electron density up between the two nuclei — the two 1s peaks interfere constructively. This is the **bonding** combination. The $-$ combination, by contrast, creates a node between the two nuclei and pushes electron density to the outside — the **antibonding** combination. And the bonding combination is always paired with the spin singlet. The chemist's phrase "two electrons pair up to make a bond" is exactly this state — the two spins bound antiparallel so that the spatial part can be symmetric.

## Main 3 — Morse vs. harmonic

Plot the total energy $V(R)$ as you vary the internuclear distance $R$, and H₂ shows a well of depth $D_e = 4.52$ eV at $R_0 = 0.741$ Å. The shape of this curve itself determines the character of the molecule.

Near the equilibrium point $R_0$, a second-order Taylor expansion fits well, giving

$$
V(R) \approx \frac{1}{2} k (R - R_0)^2
$$

the harmonic-oscillator form. Here $k$ is the spring constant. But once $R$ wanders far, this approximation breaks down — a harmonic well grows infinitely high even as $R \to \infty$, whereas a real molecule, stretched far enough, **dissociates**. That is, $V$ must flatten out to $D_e$.

The most famous model that keeps this limiting behavior is the **Morse potential (Morse potential)**:

$$
V(R) = D_e\left[1 - e^{-a(R - R_0)}\right]^2
$$

where $a$ (units 1/m) is the parameter that sets the width of the well. It has a minimum of 0 at $R = R_0$, approaches $D_e$ as $R \to \infty$, and a large positive value as $R \to 0$ — it satisfies all three limiting behaviors. Expand the Morse form near $R_0$ and it matches the harmonic term exactly, with spring constant

$$
k = 2 D_e a^2
$$

For H₂: $D_e = 4.52$ eV, $R_0 = 0.741$ Å, $a \approx 19.4$ 1/nm. The two curves nearly coincide near $R_0$, but the moment the stretch exceeds about 0.05 nm they start to diverge — the Morse curve lies down smoothly toward the dissociation limit, while the harmonic one runs away with an unphysical infinite restoring force. The spacing of the vibrational excited levels also differs between the two: harmonic is evenly spaced, Morse narrows toward the top (anharmonicity).

## In Python

```python
# Overlay the Morse potential and harmonic approximation for H₂ on one axis.
import numpy as np
import matplotlib.pyplot as plt

D_e = 4.52          # bond dissociation energy [eV]
R_0 = 0.0741        # equilibrium internuclear distance [nm]
a   = 19.4          # Morse parameter [1/nm]
k   = 2 * D_e * a**2  # harmonic spring constant [eV/nm^2]

R = np.linspace(0.04, 0.30, 400)        # internuclear distance [nm]

# Morse: shifted so the minimum sits at -D_e
V_morse = D_e * (1 - np.exp(-a * (R - R_0)))**2 - D_e

# Harmonic approximation: same equilibrium point, same depth baseline
V_harm  = 0.5 * k * (R - R_0)**2 - D_e

plt.plot(R, V_morse, label="Morse")
plt.plot(R, V_harm,  label="Harmonic", linestyle="--")
plt.axvline(R_0, color="k", linewidth=0.6)
plt.axhline(0.0, color="grey", linewidth=0.4)
plt.ylim(-5.0, 5.0)
plt.xlabel("R [nm]")
plt.ylabel("V(R) [eV]")
plt.title("H$_2$: Morse vs. Harmonic")
plt.legend(); plt.tight_layout()
plt.show()

print(f"curvature match at equilibrium: k = {k:.2f} eV/nm^2")
print(f"R -> inf limit: Morse -> 0,  Harmonic -> inf (unphysical)")
```

If the output shows the two curves nearly coinciding near $R_0 = 0.0741$ nm, and from the moment $R$ passes 0.10 nm the Morse curve lying down toward the ceiling $V = 0$ while the harmonic one climbs vertically, you have seen the two limiting behaviors of Main 3 with your own eyes.

## To the next chapter

[Chapter 6: Molecular Orbital Theory](../06-mo-theory/) takes the Heitler–London picture of this chapter one step further into generality. Instead of simply adding and subtracting the two 1s orbitals, it introduces the LCAO procedure of building new molecular orbitals from a **linear combination** of the two atomic orbitals, and shows how the bonding and antibonding orbitals emerge naturally from nothing more than a sign difference. If you go in holding the energy argument and the singlet-pairing picture of this chapter, MO theory will look like nothing more than the same landscape viewed from a different coordinate system.
