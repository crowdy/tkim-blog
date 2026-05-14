---
title: 'Large Eddy Simulation (LES) — resolve the big eddies, model the small ones'
description: 'The middle ground between DNS and RANS — solve the big eddies directly through a spatial filter, and hand the sub-grid eddies off to an SGS model.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 11
lang: en
pairSlug: turbulence-les
draft: false
updated: 2026-05-14
---

# Large Eddy Simulation (LES) — resolve the big eddies, model the small ones

> The middle ground between DNS and RANS — solve the big eddies directly through a spatial filter, and hand the sub-grid eddies off to an SGS model.

## Opening

DNS in Chapter 10 was exact, but its grid count grew as $\mathrm{Re}^{9/4}$, so it stayed out of reach for the high-Reynolds-number flows industry actually cares about. RANS in Chapter 5 was cheap, but it averaged all the fluctuations away in one stroke and lost the time evolution of the eddies. After this chapter the reader can explain — in one sentence, one equation, and one line of code — how **LES (Large Eddy Simulation)** stakes out a middle ground between those two extremes: resolve the big eddies, model the small ones.

## Main 1 — The spatial filter: cutting the small scales out of the signal

LES starts from a **spatial filter, not a time average.** Choose a filter kernel $G$ and a filter width $\Delta$ (capital delta, roughly the size of one grid cell). The filtered velocity $\tilde{u}_i$ (read "u tilde") is then defined as:

$$
\tilde{u}_i(\vec{x}, t) = \int G(\vec{x} - \vec{x}') \, u_i(\vec{x}', t) \, d\vec{x}'
$$

In plain words: the velocity at one point, weighted-averaged over a neighborhood of size $\Delta$ around it. Eddies larger than $\Delta$ pass through almost unchanged, while eddies smaller than $\Delta$ are smeared into the average and disappear. The three filter shapes you will see in practice are the box filter (uniform average over an interval), the Gaussian filter (a bell-shaped weight), and the sharp-spectral filter (one that cuts out everything above a chosen wavenumber in Fourier space).

The Reynolds decomposition $u_i = \bar{u}_i + u'_i$ from Chapter 5 looks superficially similar but is qualitatively different — Reynolds decomposition is a **time average**, so the averaged field is either steady or changes only very slowly, whereas the LES-filtered field $\tilde{u}_i$ still **fluctuates in time** and preserves the dynamics of the big eddies.

## Main 2 — The filtered Navier–Stokes equations and the SGS stress

Apply the filter to the incompressible Navier–Stokes equations. The time-derivative, pressure-gradient, and viscous terms all survive unchanged with the filter symbol pulled inside, because filtering and differentiation commute. As in the RANS derivation in Chapter 5, the troublesome term is the **convective term** $u_j \partial u_i / \partial x_j$.

Filtering the convective term produces a product of two velocities, and **the filter of a product is not in general the product of the filters**: $\widetilde{u_i u_j} \ne \tilde{u}_i \tilde{u}_j$. We define this discrepancy as the **SGS stress (Subgrid-Scale stress)**:

$$
\tau^{sgs}_{ij} = \widetilde{u_i u_j} - \tilde{u}_i \tilde{u}_j
$$

This tensor packages up all the momentum exchange carried by eddies smaller than the grid. Put another way, it is "everything below $\Delta$ that the resolved field $\tilde{u}_i$ alone cannot represent" compressed into one symbol. The LES closure problem therefore reduces to one question: **how do we write $\tau^{sgs}_{ij}$ as a function of $\tilde{u}_i$ alone?** It has the same shape as the closure problem in Chapter 5, but the target has narrowed — from "the averaged effect of the entire spectrum" (RANS) to "the effect of just the sub-grid eddies" (LES).

## Main 3 — The Smagorinsky model and its successors

The simplest SGS closure is the **eddy-viscosity model** proposed by Smagorinsky in 1963. Assume the effect of the sub-grid eddies acts like an extra viscosity, and set the magnitude of that viscosity proportional to the magnitude of the local resolved strain rate:

$$
\nu_{sgs} = (C_s \Delta)^2 |\tilde{S}|, \qquad |\tilde{S}| = \sqrt{2 \tilde{S}_{ij} \tilde{S}_{ij}}
$$

Here $\tilde{S}_{ij} = \tfrac{1}{2}(\partial \tilde{u}_i / \partial x_j + \partial \tilde{u}_j / \partial x_i)$ is the strain-rate tensor computed from the filtered velocity field, and $C_s$ (the Smagorinsky constant) takes values between $0.1$ and $0.17$ depending on the flow — closer to $0.17$ for isotropic turbulence, $0.1$ or below near walls in a boundary layer. To dodge the need to pick $C_s$ by hand, Germano's 1991 **dynamic Smagorinsky model** compares two different filter widths applied to the resolved field and lets $C_s$ adjust itself at every time step.

This economy makes the LES grid count scale not as DNS's $\mathrm{Re}^{9/4}$ but as roughly **$\mathrm{Re}^{1.8}$**. At $\mathrm{Re} = 10^6$, DNS would need on the order of $10^{13.5}$ grid points; LES needs about $10^{10.8}$ — a factor of roughly 500 less. There is a regime in which the same supercomputer makes LES feasible while DNS remains impossible. That regime is exactly where industrial aerodynamics for aircraft, external automotive flow, and urban wind-environment simulations live.

## In Python

Let us apply the simplest LES filter — the box filter — directly in one dimension. Sum a long-wavelength sine with short-wavelength noise, then average it with a width-5 box filter; you will see the filtered signal track the slow trend while attenuating the short-wavelength fluctuations.

```python
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Large eddies (low-frequency sine) + small eddies (high-frequency noise)
x = np.linspace(0, 10, 500)
large_scale = np.sin(x)                              # large eddies
small_scale = 0.4 * rng.standard_normal(x.size)      # small eddies
u = large_scale + small_scale

# Apply a width-5 box filter — the 1D analogue of the LES filter
kernel = np.ones(5) / 5
u_tilde = np.convolve(u, kernel, mode='same')

# Plot the original and filtered signal on the same axes
plt.figure(figsize=(8, 4))
plt.plot(x, u, label='raw u (large + small eddies)', alpha=0.5)
plt.plot(x, u_tilde, label='filtered ũ (what LES resolves)', linewidth=2)
plt.xlabel('x')
plt.ylabel('velocity')
plt.title('Box filter: keep the large eddies, attenuate the small ones')
plt.legend()
plt.tight_layout()
plt.show()
```

When you run it, the raw curve jitters with noise, while the filtered curve traces the slow sinusoidal trend smoothly. The smooth curve is what an LES actually solves for, and the information thrown away — the difference between the two curves, i.e. the small eddies — is what the SGS stress $\tau^{sgs}_{ij}$ compresses into the model.

## To the next chapter

DNS is accurate but expensive, RANS is cheap but only tells you the average, and LES sits in the middle and keeps the dynamics of the big eddies. In an industrial setting the most important engineering judgement is deciding which of the three to use, and when. [Chapter 12: Choosing a model in industrial CFD](../12-industrial-cfd/) closes the book by walking through representative case studies in aerospace, automotive, building, and weather contexts, picking — for each flow — which model on which grid is the right answer.
