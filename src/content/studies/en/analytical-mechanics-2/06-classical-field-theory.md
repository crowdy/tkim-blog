---
title: 'Classical field theory — scalar fields and Klein–Gordon'
description: 'A single real number attached to every spacetime point — how the simplest relativistic wave equation falls out of the action principle.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 6
lang: en
pairSlug: am2-classical-field-theory
draft: false
updated: 2026-05-14
---

# Classical field theory — scalar fields and Klein–Gordon

> A single real number attached to every spacetime point — how the simplest relativistic wave equation falls out of the action principle.

## Opening

In chapter 5 we extended the Lagrangian formalism from particles to *fields*. The countable set of degrees of freedom $\{q_i(t)\}$ was replaced by a continuous function $\phi(t, \vec x)$ defined on spacetime, but the skeleton — "make the action stationary and the equation of motion drops out" — survived intact. In this chapter we apply that skeleton to the simplest possible example: a **real scalar field**. By the end you will be able to derive the **Klein–Gordon equation** from a one-line action, and to state in a single sentence why this equation is the first stepping stone toward quantum field theory.

Throughout this chapter we use the **mostly-minus signature** for the spacetime **metric**: $\eta_{\mu\nu} = \mathrm{diag}(+1, -1, -1, -1)$. Partway through we also switch to natural units with $c = 1$.

## Main 1 — Four-vector setup

A point in spacetime is written as a four-vector

$$
x^\mu = (ct,\ \vec x), \qquad \mu \in \{0, 1, 2, 3\}.
$$

The Greek index $\mu$ (*mu*) runs from 0 to 3. The zeroth component is the speed of light times time; components 1–3 are the spatial coordinates.

The **metric tensor** $\eta_{\mu\nu}$ is a symmetric matrix used to raise and lower a pair of indices. We adopt

$$
\eta_{\mu\nu} = \mathrm{diag}(+1, -1, -1, -1)
$$

(the *mostly-minus* convention). The inverse $\eta^{\mu\nu}$ has the same form. Whenever the same index appears once up and once down, we sum it from 0 to 3 — the **Einstein summation convention**.

Bundling the partial derivative operators into four-vectors,

$$
\partial_\mu = \frac{\partial}{\partial x^\mu} = \left( \frac{1}{c}\partial_t,\ \nabla \right), \qquad \partial^\mu = \eta^{\mu\nu}\partial_\nu = \left( \frac{1}{c}\partial_t,\ -\nabla \right).
$$

Contracting the two gives the **d'Alembertian**:

$$
\Box = \partial^\mu \partial_\mu = \frac{1}{c^2}\partial_t^2 - \nabla^2.
$$

This is the four-dimensional cousin of the Laplacian. From here on we set $c = 1$ to compress notation; time and space are then measured in the same (length) units and $\partial_0 = \partial_t$.

## Main 2 — Scalar field Lagrangian and Klein–Gordon

A **real scalar field** $\phi(t, \vec x)$ is a function assigning a single real number to every spacetime point. Its value at a point is unchanged when we rotate or boost the coordinate axes — hence the name *scalar*.

The simplest Lorentz-invariant **Lagrangian density** is

$$
\mathcal{L} = \tfrac{1}{2}\partial^\mu \phi\, \partial_\mu \phi - \tfrac{1}{2} m^2 \phi^2,
$$

where $m$ is a mass parameter attached to the field. The first term is a kinetic piece built from two spacetime derivatives contracted together; the second is a potential piece.

The **Euler–Lagrange equation for a field**, derived in chapter 5,

$$
\partial_\mu \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)} = \frac{\partial \mathcal{L}}{\partial \phi},
$$

now takes us all the way to the answer. Compute $\partial \mathcal{L}/\partial(\partial_\mu \phi) = \partial^\mu \phi$ and $\partial \mathcal{L}/\partial \phi = -m^2 \phi$. Substituting,

$$
(\Box + m^2)\, \phi = 0.
$$

This is the **Klein–Gordon equation**.

Plugging in the plane-wave ansatz $\phi = e^{-i(\omega t - \vec k \cdot \vec x)}$ yields $\omega^2 = |\vec k|^2 + m^2$ — the **relativistic dispersion relation**. For $m = 0$ this collapses to the lightlike dispersion $\omega = |\vec k|$; for $m \neq 0$ the group velocity approaches the speed of light as the wavelength shrinks.

## Main 3 — Why Klein–Gordon matters

Klein–Gordon is the lowest-order relativistic wave equation that can describe a **spin-0 boson**. In the late 1920s Schrödinger himself first wrote it down as a candidate "relativistic Schrödinger equation". He quickly hit two problems.

First, the equation is **second order** in time, so the initial data must include both $\phi$ and $\partial_t \phi$. The Schrödinger equation is first order, requiring only $\psi$. Second, the solutions $\omega = \pm\sqrt{|\vec k|^2 + m^2}$ include **negative-energy branches**. Forcing a single-particle probability interpretation on top of these solutions makes the probability density turn negative.

The resolution arrived later. Klein–Gordon is not the wave function of one particle; it is a *classical* field equation that, after **quantization**, describes a spin-0 boson — the Higgs and pions are real-world examples. Negative-energy solutions are reinterpreted as antiparticles.

We will meet this result again in chapter 9. There we will treat the **path integral**, in which the action $S$ enters as a phase $e^{iS/\hbar}$ summed over all paths. In the limit $\hbar \to 0$ only the stationary point survives, and the Euler–Lagrange equation is recovered. Klein–Gordon will be the cleanest example of that stationary point.

## In Python

```python
# Leapfrog integration of the 1+1D Klein-Gordon equation.
# (∂_t^2 - ∂_x^2 + m^2) φ = 0
# Start from a Gaussian and watch the wavepacket disperse.
import numpy as np
import matplotlib.pyplot as plt

Nx, dx = 400, 0.1
x = np.linspace(-20, 20, Nx)
dt = 0.05
m = 1.0

# Initial data: width-1.5 Gaussian, zero initial velocity
phi_prev = np.exp(-(x / 1.5)**2)
phi = phi_prev.copy()  # ∂_t φ = 0 so the previous step equals the current

snapshots = {0.0: phi.copy()}
target_times = [5.0, 10.0, 15.0]

t, step = 0.0, 0
while t < target_times[-1] + dt:
    lap = np.zeros_like(phi)
    lap[1:-1] = (phi[2:] - 2*phi[1:-1] + phi[:-2]) / dx**2
    phi_next = 2*phi - phi_prev + dt**2 * (lap - m**2 * phi)
    phi_prev, phi = phi, phi_next
    t += dt; step += 1
    for tt in target_times:
        if abs(t - tt) < dt/2 and tt not in snapshots:
            snapshots[tt] = phi.copy()

for tt, snap in snapshots.items():
    plt.plot(x, snap, label=f"t = {tt:.0f}")
plt.xlabel("x"); plt.ylabel(r"$\phi(x, t)$")
plt.legend(); plt.title("1+1D Klein-Gordon — a dispersing wavepacket")
plt.show()
```

The Gaussian splits into two outgoing lumps, but unlike a massless wave that would propagate rigidly at the speed of light, the peaks shrink and the widths broaden. That is **dispersion**: the $m^2$ term makes each $k$-component travel at its own group velocity $v_g = k/\sqrt{k^2 + m^2}$.

## To the next chapter

[Chapter 7: Relativistic mechanics](../07-relativistic-mechanics/) turns the four-vector toolbox we just assembled back onto particles. Starting from the free-particle action $S = -m \int d\tau$, we will read off the four-momentum, four-acceleration, and the equation of motion under an external force — and see how fields and particles snap together into a single picture under the same variational principle.
