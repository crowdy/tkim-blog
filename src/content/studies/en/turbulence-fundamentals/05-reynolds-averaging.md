---
title: 'Reynolds averaging and the RANS equations'
description: 'Averaging the Navier–Stokes equations leaves the number of equations unchanged but adds new unknowns — introducing the closure problem that motivates all of turbulence modeling.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 5
lang: en
pairSlug: turbulence-reynolds-averaging
draft: false
updated: 2026-05-14
---

# Reynolds averaging and the RANS equations

> Averaging the Navier–Stokes equations leaves the number of equations unchanged but adds new unknowns — introducing the closure problem that motivates all of turbulence modeling.

## Opening

The Navier–Stokes equations from Chapter 3 describe every flow in principle, but in turbulence they require resolving every eddy scale, which is far too expensive for industrial computation. So in 1894 Osborne Reynolds proposed a detour: take a **time average**. By the end of this chapter the reader can state in one sentence why averaging adds unknowns faster than equations, and why Chapter 6 needs "turbulent viscosity models."

## Main 1 — Reynolds decomposition: splitting the signal into a mean and a fluctuation

The core idea is simple. The velocity $u_i$ at a point inside a turbulent flow fluctuates rapidly, but if we average over a long enough time, we can split it into a **mean** $\bar{u}_i$ (a symbol with a bar on top, read "u-bar") and a **fluctuation** $u'_i$ ("u-prime"):

$$
u_i = \bar{u}_i + u'_i, \qquad \overline{u'_i} = 0
$$

In plain words: "average the signal, define the leftover as turbulent noise; by construction the noise averages to zero." The second equality is not a new assumption — it is a direct consequence of the decomposition, because the average of whatever remains after subtracting the average has to be zero.

We apply the same split to every flow variable: pressure $p$, temperature $T$, concentration $c$, and so on. This is called **Reynolds decomposition**.

## Main 2 — The new term that averaging creates

Substitute the Reynolds decomposition into the incompressible Navier–Stokes momentum equation from Chapter 3 and take the average of both sides. Averaging commutes with differentiation ($\overline{\partial f / \partial t} = \partial \bar{f} / \partial t$), so the time-derivative, pressure-gradient, and viscous terms all survive with the average sign simply pushed inside.

The problem is the **convective term** $u_j \partial u_i / \partial x_j$. Because it is a product of two velocities, after decomposition it becomes

$$
\overline{(\bar{u}_j + u'_j)\,\frac{\partial (\bar{u}_i + u'_i)}{\partial x_j}}
$$

and the cross terms that contain a single prime vanish thanks to $\overline{u'_i} = 0$. The term with two primes, $\overline{u'_j \, \partial u'_i / \partial x_j}$, **remains**. Using the continuity equation ($\partial u'_j / \partial x_j = 0$) we can rewrite it as a derivative of a product, $\partial \overline{u'_i u'_j} / \partial x_j$.

Collecting all the averaged pieces gives the **RANS equation (Reynolds-Averaged Navier–Stokes)**:

$$
\frac{\partial \bar{u}_i}{\partial t} + \bar{u}_j \frac{\partial \bar{u}_i}{\partial x_j} = -\frac{1}{\rho}\frac{\partial \bar{p}}{\partial x_i} + \nu \frac{\partial^2 \bar{u}_i}{\partial x_j \partial x_j} - \frac{\partial \overline{u'_i u'_j}}{\partial x_j}
$$

Here $\rho$ (rho, density) and $\nu$ (nu, kinematic viscosity) are the same as in Chapter 3. The form is nearly identical to the original Navier–Stokes equation, with one **new term** added on the right-hand side: $-\partial \overline{u'_i u'_j} / \partial x_j$.

## Main 3 — Reynolds stress and the closure problem

The quantity $\overline{u'_i u'_j}$ inside that new term is called the **Reynolds stress tensor**. It is named a "stress" because it transports momentum the way a viscous stress does, not because it is an actual molecular stress — it is the mean momentum exchange carried by macroscopic eddies.

The Reynolds stress is a symmetric tensor, so out of its 9 components only **6 are independent** ($\overline{u'_1 u'_1}, \overline{u'_2 u'_2}, \overline{u'_3 u'_3}, \overline{u'_1 u'_2}, \overline{u'_1 u'_3}, \overline{u'_2 u'_3}$).

Now count the unknowns.

| | Original Navier–Stokes | RANS |
|---|---|---|
| Equations | 3 (momentum) + 1 (continuity) = 4 | still 4 |
| Unknowns | $u_1, u_2, u_3, p$ → 4 | $\bar{u}_1, \bar{u}_2, \bar{u}_3, \bar{p}$ + 6 Reynolds stresses = **10** |

We started with 4 equations for 4 unknowns. After one averaging step, the same 4 equations now confront 10 unknowns. This is the **closure problem** — the system is not closed.

Chapter 6 covers several recipes (mixing length, k-ε, k-ω) for **modeling** the 6 Reynolds stresses as functions of the mean velocity field $\bar{u}_i$ alone, forcing the system shut. RANS is the workhorse of industrial CFD not because RANS is an exact equation but because that modeling step happens to work well in practice.

## In Python

The Reynolds decomposition itself can be verified with a single 1D synthetic signal. After subtracting the mean, the fluctuation has mean close to zero and a positive mean-square (which corresponds to a Reynolds stress component).

```python
import numpy as np

rng = np.random.default_rng(0)

# 1D synthetic turbulent signal: mean 1.0 + deterministic oscillation + Gaussian noise
t = np.linspace(0, 10, 1000)
u = 1.0 + 0.3 * np.sin(t) + 0.1 * rng.standard_normal(1000)

# Reynolds decomposition: split into mean and fluctuation
u_mean = np.mean(u)
u_prime = u - u_mean

# Verify
mean_of_prime = np.mean(u_prime)         # zero by construction (within float tolerance)
reynolds_stress = np.mean(u_prime ** 2)  # variance = one Reynolds stress component u'u'

print(f"Mean velocity              u_bar  = {u_mean:.6f}")
print(f"Mean of fluctuation        <u'>   = {mean_of_prime:.2e}")
print(f"Reynolds stress component  <u'u'> = {reynolds_stress:.6f}")
```

In the output, `<u'>` is on the order of $10^{-17}$ — floating-point noise, effectively zero — while `<u'u'>` is about 0.05, clearly positive. If this signal had been one component of a real 3D flow, that value would be exactly one diagonal entry of the Reynolds stress tensor.

## To the next chapter

The closure problem has remained unsolved since 1894. Engineering chose a detour instead: rather than chasing an exact solution, settle for an approximate model that is good enough. [Chapter 6: Turbulent viscosity models](../06-turbulence-viscosity-models/) walks through the three canonical models — mixing length, k-ε, and k-ω — and shows what assumption each one uses to express the six Reynolds stresses as functions of the mean velocity field.
