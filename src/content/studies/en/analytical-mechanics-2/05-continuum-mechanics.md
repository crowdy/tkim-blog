---
title: 'Continuum mechanics — the leap to infinite degrees of freedom'
description: 'Send a chain of $N$ spring-coupled particles to the limit $N \to \infty$ and one line of Lagrangian density and one line of the wave equation drop out — the same variational principle, now extended to fields with infinitely many degrees of freedom.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 5
lang: en
pairSlug: am2-continuum-mechanics
draft: false
updated: 2026-05-14
---

# Continuum mechanics — the leap to infinite degrees of freedom

> Send a chain of $N$ spring-coupled particles to the limit $N \to \infty$ and one line of Lagrangian density and one line of the wave equation drop out — the same variational principle, now extended to fields with infinitely many degrees of freedom.

## Opening

So far we have handled systems with finite degrees of freedom (DOF) — a handful of particles, rigid bodies, coupled oscillators. This chapter climbs one more rung on that ladder. Push the particle count $N$ on a lattice to infinity, and the set of coordinates $\{q_n(t)\}$ turns into a **field** $\phi(t, x)$ over spacetime, while the Lagrangian generalizes to a spacetime integral. By the end of the chapter, the question "why do electromagnetism, general relativity, and quantum field theory all use the same variational principle?" has its first concrete answer.

## Main 1 — From $N$ particles to a continuum

Take $N$ particles of mass $m$ on a line, joined by springs of stiffness $K$. Let $q_n(t)$ be the displacement of particle $n$ from its equilibrium position. The Lagrangian is

$$
L = \sum_n \tfrac{1}{2} m \dot q_n^2 - \sum_n \tfrac{1}{2} K (q_{n+1} - q_n)^2.
$$

Now perform two limits at once — let the inter-particle spacing $a \to 0$ and $N \to \infty$ — while fixing three quantities: the total length $L_0 = N a$, the mass per unit length $\rho = m/a$ (rho, **linear density**, units kg/m), and the tension $T = K a$ (units N). The displacement $q_n(t)$ is reinterpreted as the value $\phi(t, x)$ of a continuous field at the position $x = n a$. Finite differences become derivatives — $q_{n+1} - q_n \to a\, \partial_x \phi$. Sums become integrals — $\sum_n \to \int dx / a$. Rewriting both the kinetic and potential terms gives

$$
L \to \int dx \left[ \tfrac{1}{2}\rho \dot\phi^2 - \tfrac{1}{2} T (\partial_x \phi)^2 \right].
$$

The integrand is the **Lagrangian density** $\mathcal{L}$ (calligraphic L):

$$
\mathcal{L} = \tfrac{1}{2}\rho \dot\phi^2 - \tfrac{1}{2} T (\partial_x \phi)^2.
$$

The action is now an integral over both time and space,

$$
S = \int dt\, dx\, \mathcal{L}\!\left(\phi, \partial_t \phi, \partial_x \phi\right),
$$

which in 3+1 dimensions is written compactly as $S = \int \mathcal{L}\, d^4 x$. The field $\phi(t, x)$ carries one independent DOF per point $x$ — a dynamical system with infinitely many DOF.

## Main 2 — Euler–Lagrange in field form

Apply the same variational procedure used for discrete systems. Perturb $\phi \to \phi + \delta\phi$ inside a spacetime region, with $\delta\phi$ vanishing on the boundary of that region. Requiring $\delta S = 0$ yields

$$
\frac{\partial}{\partial t}\!\left(\frac{\partial \mathcal{L}}{\partial \dot\phi}\right) + \partial_x\!\left(\frac{\partial \mathcal{L}}{\partial(\partial_x \phi)}\right) - \frac{\partial \mathcal{L}}{\partial \phi} = 0.
$$

The shape mirrors the discrete Euler–Lagrange equation — one time derivative has been replaced by a sum of a time derivative and a space derivative. For the elastic-string $\mathcal{L}$ above, $\partial \mathcal{L}/\partial \dot\phi = \rho \dot\phi$, $\partial \mathcal{L}/\partial(\partial_x \phi) = -T\, \partial_x \phi$, and $\partial \mathcal{L}/\partial \phi = 0$, so

$$
\rho \ddot\phi - T\, \phi'' = 0,
$$

i.e. the **wave equation**

$$
\ddot\phi = c^2\, \phi'', \qquad c = \sqrt{T/\rho}.
$$

For a string with fixed ends ($\phi(0, t) = \phi(L_0, t) = 0$), separation of variables gives the standing-wave modes

$$
\phi_n(t, x) = \sin(n\pi x/L_0)\cos(\omega_n t), \qquad \omega_n = n\pi c / L_0.
$$

The normal modes of the discrete lattice merge smoothly into an infinite family of standing waves, labelled by the integer $n$, as $N \to \infty$.

## Main 3 — Why this single step is a big deal

The same variational principle, the same Noether logic, now applies verbatim to a field with infinitely many DOF. As the next chapter (classical field theory) makes precise: write down a single object — the Lagrangian density — and the equations of motion, the conserved currents, and the symmetries fall out automatically. The power of the framework is that swapping $\mathcal{L}$ alone gives entirely different physics on the same underlying machine.

Electromagnetism uses $\mathcal{L} = -\tfrac{1}{4} F_{\mu\nu} F^{\mu\nu}$ (where $F_{\mu\nu}$ is the **electromagnetic field-strength tensor**, an antisymmetric rank-2 tensor on 4D spacetime that packages the electric and magnetic fields together); gauge theory, general relativity, and quantum field theory all sit on top of this single template. Chapter 6 extends the framework to relativistic scalar fields and the Klein–Gordon equation.

## In Python

```python
# 1D elastic string with fixed ends, integrated by finite-difference leapfrog.
# An initial Gaussian pulse splits left/right and reflects off the boundaries.
import numpy as np
import matplotlib.pyplot as plt

L, c = 1.0, 1.0               # string length and wave speed
N = 200                       # grid points
dx = L / (N - 1)
dt = 0.5 * dx / c             # CFL stability
Nt = 2000
x = np.linspace(0, L, N)
r2 = (c * dt / dx) ** 2       # squared Courant number

# Initial condition: centred Gaussian, zero initial velocity
phi_prev = np.exp(-((x - L / 2) ** 2) / (2 * 0.05 ** 2))
phi_prev[0] = phi_prev[-1] = 0.0
phi = phi_prev.copy()         # zero initial velocity, so one step ahead matches

snap_steps = np.linspace(0, Nt - 1, 5, dtype=int)
snapshots = []
for n in range(Nt):
    phi_next = np.zeros_like(phi)
    phi_next[1:-1] = (2 * phi[1:-1] - phi_prev[1:-1]
                      + r2 * (phi[2:] - 2 * phi[1:-1] + phi[:-2]))
    phi_prev, phi = phi, phi_next
    if n in snap_steps:
        snapshots.append((n, phi.copy()))

fig, ax = plt.subplots(figsize=(7, 3))
for n, snap in snapshots:
    ax.plot(x, snap, label=f"t = {n*dt:.2f}")
ax.set(xlabel="x", ylabel="phi(t, x)", title="Wave on a string: five snapshots")
ax.legend(fontsize=8)
plt.tight_layout()
```

When the pulse splits into two counter-propagating halves that reflect with inverted sign at the fixed ends, the equation of motion of an infinite-DOF system has been solved by hand.

## To the next chapter

[Chapter 6: classical field theory](../06-classical-field-theory/) extends the scalar field of this chapter to the relativistic setting and treats the Klein–Gordon equation, the Lorentz invariance of $\mathcal{L}$, and Noether's theorem for fields in one sweep. The string equation written here is exactly the non-relativistic shadow of what we'll meet under rotations of spacetime.
