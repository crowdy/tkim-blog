---
title: 'Hamilton–Jacobi equation — solving for the action directly'
description: 'Compress $2n$ Hamilton ODEs into a single nonlinear first-order PDE whose solution $S(q, t)$ already contains the entire motion — and walk the procedure end to end on the free particle.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 1
lang: en
pairSlug: am2-hamilton-jacobi
draft: false
updated: 2026-05-14
---

# Hamilton–Jacobi equation — solving for the action directly

> Compress $2n$ Hamilton ODEs into a single nonlinear first-order PDE whose solution $S(q, t)$ already contains the entire motion — and walk the procedure end to end on the free particle.

## Opening

In volume I we climbed one rung at a time — Lagrangian to Hamiltonian, Lagrange's equations to Hamilton's equations. This chapter is the next rung. Instead of chasing $2n$ pairs of coordinates and momenta, we solve for a **single function** — the action $S$ — and read the entire motion off its derivatives. By the end of the chapter the reader should also have a first hint of why the Hamilton–Jacobi (HJ) equation looks so much like the Schrödinger equation of quantum mechanics.

## Main 1 — Setting up the HJ equation

In volume I the action was a functional on paths: a single number $S[q(\cdot)] = \int L\,dt$ assigned to each path connecting two endpoints. We now shift the viewpoint. Fix an initial point $(q_0, t_0)$ and follow the **actual classical solution** to a generic endpoint $(q, t)$. Evaluate the action along that one solution path and call the result $S(q, t)$. So $S$ is no longer a functional of paths but an ordinary function of the endpoint and time.

Hamilton showed that this $S(q, t)$ satisfies the partial differential equation

$$
\frac{\partial S}{\partial t} + H\!\left(q, \frac{\partial S}{\partial q}, t\right) = 0
$$

The key observation is that the **momentum equals the spatial derivative of the action**.

$$
p_i = \frac{\partial S}{\partial q^i}
$$

Read analytically, the $2n$ Hamilton ODEs have been compressed into **one** first-order nonlinear PDE for a single function $S$ on the $n$-dimensional coordinate space. The characteristic curves of that PDE — the ODE system that naturally appears when one tries to solve a first-order PDE — coincide exactly with Hamilton's flow. The action carries the entire phase-space flow inside its graph.

## Main 2 — Separation when time drops out

When $H$ has no explicit time dependence, $H = H(q, p)$, one conserved quantity is built in for free: energy. We use that fact as the starting point of the PDE solve. Separate space and time by setting

$$
S(q, t) = -E\, t + W(q)
$$

so that $\partial S/\partial t = -E$, and the HJ equation collapses to its time-independent form,

$$
H\!\left(q, \frac{\partial W}{\partial q}\right) = E
$$

This is the **time-independent HJ equation**, or **Hamilton's characteristic-function equation**, and $W(q)$ is the **characteristic function**. The conserved constant $E$ plays the role of a **separation constant** in the PDE sense.

This is precisely where HJ shines on multi-degree-of-freedom systems. Each conserved quantity buys one separation constant. If we are lucky enough to find $n$ independent separation constants, $W(q)$ can be written down as a quadrature — a one-dimensional integral. Such systems are called **completely integrable**. The Kepler problem, the harmonic oscillator, and rigid-body rotation all belong to this family.

## Main 3 — The free particle, beginning to end

Take the simplest possible example — a one-dimensional free particle — and walk the full procedure. With $H = p^2/(2m)$ the HJ equation reads

$$
\frac{\partial S}{\partial t} + \frac{1}{2m}\left(\frac{\partial S}{\partial x}\right)^2 = 0
$$

Substitute $S = -E t + W(x)$ to get $W'(x)^2/(2m) = E$, hence

$$
W(x) = \sqrt{2mE}\, x = p\, x
$$

(here $p = \sqrt{2mE}$ is the constant momentum corresponding to energy $E$). Therefore

$$
S(x, t; E) = p\, x - E\, t
$$

Now apply **Jacobi's recipe**: differentiate the action with respect to the separation constant, and the result is itself a new constant of motion.

$$
\frac{\partial S}{\partial E} = \frac{m}{p}\, x - t = \text{const} = -t_0
$$

Rearranging,

$$
x(t) = \frac{p}{m}(t - t_0)
$$

which is the straight-line free-particle motion we already knew. HJ is obvious overkill for one free particle, but the example is the cleanest possible display of the five-step procedure — write the PDE, separate variables, solve for $W$, equate $\partial S/\partial (\text{separation constant})$ to a new constant, invert to find $q$ as a function of time. Once this flow meets canonical transformations in the next chapter, HJ starts to earn its keep.

## In Python

```python
# HJ solution for the free particle: plot W(x) = p x,
# then check that x(t) from Jacobi's recipe agrees with direct integration.
import numpy as np
import matplotlib.pyplot as plt

m, E = 1.0, 0.5
p = np.sqrt(2 * m * E)        # constant momentum

# 1) Characteristic function W(x) = p x
x_grid = np.linspace(0, 10, 200)
W = p * x_grid

# 2) Jacobi's recipe: dS/dE = m x / p - t = -t0  =>  x(t) = (p/m)(t - t0)
t = np.linspace(0, 10, 200)
t0 = 0.0
x_hj = (p / m) * (t - t0)

# 3) Direct integration of x_dot = p/m (Euler is enough here)
dt = t[1] - t[0]
x_dir = np.zeros_like(t)
for i in range(1, len(t)):
    x_dir[i] = x_dir[i-1] + (p / m) * dt

err = np.max(np.abs(x_hj - x_dir))
print(f"max |x_HJ - x_direct| = {err:.2e}")

fig, ax = plt.subplots(1, 2, figsize=(8, 3))
ax[0].plot(x_grid, W); ax[0].set(xlabel="x", ylabel="W(x)", title="characteristic function")
ax[1].plot(t, x_hj, label="HJ"); ax[1].plot(t, x_dir, "--", label="direct")
ax[1].set(xlabel="t", ylabel="x(t)"); ax[1].legend()
plt.tight_layout()
```

If the error falls to floating-point noise — order $10^{-14}$ — then the two trajectories, one obtained by solving a PDE and the other by integrating an ODE, are demonstrably the same motion.

## To the next chapter

[Chapter 2: Canonical transformations deepened](../02-canonical-transformations-deepened/) shows how the action $S$ of this chapter naturally earns the title of **generating function**, and how the HJ equation rereads itself as the elegant one-line statement "find a canonical transformation that sends the Hamiltonian to zero." At that point HJ is no longer a tool too heavy for the free particle but a machine that automatically delivers action–angle variables of any integrable system.
