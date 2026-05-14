---
title: 'The language of quantum chemistry — wavefunctions and operators'
description: 'A particle''s state as a complex function, every observable as a Hermitian operator — the two basic tools of quantum chemistry, followed end to end through one concrete Gaussian wavepacket.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 1
lang: en
pairSlug: qc-language
draft: false
updated: 2026-05-14
---

# The language of quantum chemistry — wavefunctions and operators

> A particle's state as a complex function, every observable as a Hermitian operator — the two basic tools of quantum chemistry, followed end to end through one concrete Gaussian wavepacket.

## Opening

The book spans 14 chapters from atomic bonding to band structure, but every chapter is written in the same two tools — the **wavefunction** and the **operator**. By the end of this chapter the reader should be able to say clearly what "the state of an electron" means, and how the act of "measuring its position" translates into a formula. The destination of this chapter is one concrete wavefunction — the Gaussian wavepacket — touched by hand and by Python, with normalization, expectation values, and uncertainty all checked directly.

## Main 1 — Wavefunction and probability

Quantum mechanics describes a particle's state by a complex-valued function $\psi(\vec r)$ (psi, the **wavefunction**). In classical mechanics the state was the pair $(\vec r, \vec p)$ of position and momentum; in quantum mechanics the particle does not hold both at once — it holds only a single complex function spread over space.

This function is not directly observable. What is observable is the **probability density** $|\psi(\vec r)|^2$. The probability of finding the particle in the volume element $d^3 r$ is

$$
dP(\vec r) = |\psi(\vec r)|^2\, d^3 r,
$$

and the fact that the particle exists *somewhere* is expressed by the **normalization condition**

$$
\int |\psi(\vec r)|^2\, d^3 r = 1.
$$

Even though $\psi$ itself is not observed, its phase does not vanish from the story. When two wavefunctions are **combined** — as in the double slit or in the overlap of molecular orbitals — the phase determines constructive vs destructive interference. The phase only becomes invisible when one "measures" a single state.

## Main 2 — Observables and Hermitian operators

Every measurable quantity is represented by one **Hermitian operator**. For now you can read "Hermitian" as: a linear transformation engineered so that its eigenvalues are real — because real eigenvalues are what physical measurements actually return.

- Position $\hat x = x$ (just multiplication)
- Momentum $\hat p = -i\hbar\, \partial / \partial x$
- Kinetic energy $\hat T = -\hbar^2/(2m)\, \nabla^2$
- Potential $\hat V = V(\vec r)$ (multiplication by a function of position)

Here $\hbar$ (h-bar) is Planck's constant divided by $2\pi$, $m$ is the particle mass, and $\nabla^2$ is the Laplacian.

The **expectation value** of operator $\hat A$ in state $\psi$ — the mean of measurements over infinitely many identically prepared copies of the state — is defined by

$$
\langle A \rangle = \int \psi^*(\vec r)\, \hat A\, \psi(\vec r)\, d^3 r,
$$

where $\psi^*$ is the complex conjugate of $\psi$. This integral reappears almost everywhere in quantum chemistry — when computing energies, dipole moments, bond orders, anything that has a number attached.

## Main 3 — A concrete example: the Gaussian wavepacket

Drop down from abstraction once. Consider the one-dimensional wavefunction

$$
\psi(x) = (2\pi\sigma^2)^{-1/4} \exp\!\left( -\frac{x^2}{4\sigma^2} \right),
$$

where $\sigma$ (sigma) is a positive width parameter. $\psi$ is real and peaks at the origin. Check normalization first:

$$
\int_{-\infty}^{\infty} |\psi(x)|^2\, dx = (2\pi\sigma^2)^{-1/2} \int_{-\infty}^{\infty} e^{-x^2/(2\sigma^2)}\, dx = 1.
$$

The last equality uses the Gaussian integral $\int e^{-x^2/(2\sigma^2)}\, dx = \sqrt{2\pi}\,\sigma$. Then the expectation values. Since $|\psi|^2$ is symmetric about the origin,

$$
\langle x \rangle = 0,
$$

and the variance is

$$
\langle x^2 \rangle = \int x^2\, |\psi(x)|^2\, dx = \sigma^2.
$$

The position uncertainty is $\Delta x = \sqrt{\langle x^2\rangle - \langle x\rangle^2} = \sigma$. The width parameter $\sigma$ *is* the position uncertainty.

This is not accidental. The analogous calculation on the momentum side gives $\Delta p = \hbar/(2\sigma)$, and the product is

$$
\Delta x\, \Delta p = \frac{\hbar}{2}.
$$

This is the state that saturates the equality in **Heisenberg's uncertainty principle** $\Delta x\, \Delta p \ge \hbar/2$ — the Gaussian wavepacket is "the narrowest state quantum mechanics allows," in a precise sense. The full proof is for a later chapter, but this one example already shows the two tools of quantum chemistry meshing together.

## In Python

```python
# Numerically verify normalization, expectation values, and uncertainty
# for a Gaussian wavepacket.
import numpy as np
import matplotlib.pyplot as plt

sigma = 1.5
N = 400
x = np.linspace(-10, 10, N)
dx = x[1] - x[0]

# Analytic form, normalization constant included.
psi = (2 * np.pi * sigma**2)**(-0.25) * np.exp(-x**2 / (4 * sigma**2))
rho = psi**2

# Numerical normalization: scale so trapezoidal integral is 1.
norm = np.trapz(rho, x)
rho = rho / norm

# Expectation values and standard deviation.
x_mean = np.trapz(x * rho, x)
x2_mean = np.trapz(x**2 * rho, x)
dx_num = np.sqrt(x2_mean - x_mean**2)

print(f"<x^2> numeric = {x2_mean:.4f}, analytic = {sigma**2:.4f}")
print(f"dx    numeric = {dx_num:.4f}, analytic = {sigma:.4f}")

# Plot |psi|^2 with vertical lines at +/- dx.
plt.plot(x, rho, label=r"$|\psi(x)|^2$")
plt.axvline(+dx_num, color="k", linestyle="--", label=r"$\pm\Delta x$")
plt.axvline(-dx_num, color="k", linestyle="--")
plt.xlabel("x"); plt.ylabel(r"$|\psi|^2$")
plt.legend(); plt.tight_layout()
plt.show()
```

If the numerical $\langle x^2 \rangle$ matches $\sigma^2 = 2.25$ and the numerical $\Delta x$ matches $\sigma = 1.5$ to two decimal places, the three definitions — normalization, expectation, standard deviation — have all been touched by hand.

## To the next chapter

[Chapter 2: The Schrödinger equation](../02-schrodinger-equation/) takes the operators introduced here and ties them into a single equation that governs how $\psi$ evolves in time. With normalization and expectation values already in hand, the Schrödinger equation lands as exactly what it is: the quantum-mechanical statement of energy conservation.
