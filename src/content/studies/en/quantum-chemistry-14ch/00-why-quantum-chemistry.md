---
title: 'Why quantum chemistry? — the limits of classical chemistry'
description: 'Apply classical electrodynamics to the atom and it collapses in $10^{-11}$ seconds — quantum mechanics is the theory that stops that collapse.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 0
lang: en
pairSlug: qc-why-quantum-chemistry
draft: false
updated: 2026-05-14
---

# Why quantum chemistry? — the limits of classical chemistry

> Apply classical electrodynamics to the atom and it collapses in $10^{-11}$ seconds — quantum mechanics is the theory that stops that collapse.

## Opening

This book walks through quantum chemistry in 14 chapters. The first one (chapter 0) exists to answer, in a single sentence, why chemistry needs quantum mechanics at all. By the end of it, the reader should be able to show — with one dimensional argument and one integral — that classical chemistry cannot even explain why atoms do not collapse, and to picture roughly what gap the wavefunctions, operators, and quantum numbers of the later chapters are coming in to fill.

## Main 1 — Rutherford's puzzle

In 1911, **Rutherford (E. Rutherford)** used alpha-particle scattering to establish the nuclear model of the atom: an electron orbits a tiny, positively charged nucleus. The trouble starts the moment you plug this picture into classical electrodynamics.

An accelerating charge radiates electromagnetic energy. The radiated power is given by the **Larmor formula**:

$$
P = \frac{1}{6\pi\epsilon_0}\,\frac{e^2 a^2}{c^3}
$$

where $e$ is the electron charge, $a$ is its acceleration, $\epsilon_0$ (epsilon-zero, the **vacuum permittivity**), and $c$ the speed of light. A 1s electron at the Bohr radius $a_0 \approx 0.529\,\text{Å}$ moves at speed $\alpha c$, where $\alpha$ (alpha, the **fine-structure constant**) is the dimensionless number

$$
\alpha = \frac{e^2}{4\pi\epsilon_0 \hbar c} \approx \frac{1}{137}.
$$

An electron looping at that speed sheds energy at the rate the Larmor formula prescribes, and a dimensional estimate gives a spiral-in time from atomic size to the nucleus of at most $\sim 10^{-11}$ s. In other words, classical electrodynamics predicts that **no atom should last a nanosecond.** Yet experimentally atoms are essentially eternal. Classical chemistry has no answer to the most basic question of all: *why do atoms not collapse?*

## Main 2 — The quantum answer in one sentence

The quantum answer is short. **An atom's energy is quantized, and its lowest (ground) state cannot radiate because there is no lower state to drop into.** Electrons do not spiral in not because of friction, but because "lower" simply does not exist.

Inside this picture the value of the Bohr radius is not an accident. If the electron is confined to a region of radius $r$, its quantum kinetic energy rises roughly as

$$
E_K(r) \sim \frac{\hbar^2}{m_e r^2}
$$

(tighter confinement means larger momentum uncertainty), while the Coulomb potential energy drops as

$$
E_V(r) = -\frac{e^2}{4\pi\epsilon_0\, r}.
$$

Minimize their sum over $r$, and the optimal radius falls out exactly as

$$
a_0 = \frac{4\pi\epsilon_0\, \hbar^2}{m_e e^2} \approx 0.529 \times 10^{-10}\,\text{m}.
$$

$a_0$ is the balance point between the kinetic energy's refusal to be compressed further and the Coulomb attraction's pull inward. That one line is the slogan of the whole book — **quantum mechanics is what stops atoms from collapsing.**

## Main 3 — What the 14 chapters cover

The book proceeds like this. Chapter 1 defines the language of quantum mechanics — wavefunctions, operators, measurement. Chapters 2–3 apply the Schrödinger equation to the particle in a box, the harmonic oscillator, and the hydrogen atom. Chapters 4–6 do multi-electron atoms (spin, the Pauli exclusion principle, Slater determinants) and the quantum reason behind the periodic table. Chapters 7–9 cover chemical bonding — ionic, covalent, molecular orbital theory (MO) and atomic orbitals (AO). Chapters 10–11 do molecular spectra: vibrations, rotations, electronic transitions. Chapters 12–14 turn to solids and band structure, and finally to how quantum chemistry connects to modern materials, catalysis, and drug design.

Prerequisites are modest: high-school chemistry (the periodic table, valence electrons), some single- and multivariable calculus, complex numbers — and curiosity. No prior quantum mechanics is assumed. Wavefunctions, operators, quantum numbers, Slater determinants, and MO/AO are all defined the first time they appear, each with two sentences of plain-language framing before the formula.

## In Python

```python
# Classical vs. quantum: compute the Bohr radius and the classical collapse time at once.
import numpy as np

hbar = 1.0545718e-34    # J·s
me   = 9.1093837e-31    # kg
e    = 1.602176634e-19  # C
eps0 = 8.8541878128e-12 # F/m
c    = 2.99792458e8     # m/s

# Quantum prediction: the Bohr radius
a0 = 4 * np.pi * eps0 * hbar**2 / (me * e**2)
print(f"Bohr radius a0 = {a0*1e12:.2f} pm")

# Classical collapse time (Larmor + virial theorem, order-of-magnitude estimate)
# E_K = e^2 / (8 pi eps0 a0), speed v = alpha * c
alpha = e**2 / (4 * np.pi * eps0 * hbar * c)
v     = alpha * c
a_acc = v**2 / a0                                   # centripetal acceleration
P     = (1 / (6 * np.pi * eps0)) * e**2 * a_acc**2 / c**3
E_K   = e**2 / (8 * np.pi * eps0 * a0)
tau   = E_K / P                                     # energy / radiated power
print(f"Classical collapse time tau ~ {tau:.2e} s")
print("Experiment: atoms are effectively eternal — that gap is the motivation.")
```

The output gives $a_0$ near 53 pm and $\tau$ on the order of $10^{-11}$ s. Classical theory says the atom cannot last an instant; experiment says it lasts forever. Closing that gap is what the remaining 14 chapters are for.

## To the next chapter

[Chapter 1: The language of quantum chemistry](../01-language-of-quantum-chemistry/) defines the wavefunction $\psi$, the operator $\hat A$, and the meaning of the eigenvalue equation $\hat A \psi = a \psi$. The slogan from this chapter — "the ground state has nowhere lower to go" — will reappear in the next as the mathematical fact that Hermitian operators have a discrete spectrum bounded from below.
