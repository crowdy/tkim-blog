---
title: 'Revisiting the Navier–Stokes equations — two equations, four forces'
description: 'Read the continuity and momentum equations of an incompressible fluid term by term, and redefine the viscosity coefficients and the Reynolds number.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 3
lang: en
pairSlug: turbulence-navier-stokes
draft: false
updated: 2026-05-14
---

# Revisiting the Navier–Stokes equations — two equations, four forces

> Read the continuity and momentum equations of an incompressible fluid term by term, and redefine the viscosity coefficients and the Reynolds number.

## Opening

Chapter 2 set up the tensor notation, so we can finally write **the two equations that say how a real fluid moves**. By the end of this chapter you should be able to point at each term in the Navier–Stokes equations and say in plain English what physical effect it represents — "this one is acceleration, this one is pressure, this one is the friction that viscosity makes." There is no need to memorize the equations; remembering what each term *does* lasts much longer.

## Main 1 — Mass conservation: an incompressible fluid does not leak

Under the incompressibility assumption, fluid is neither created nor destroyed anywhere. The amount flowing into any point must exactly match the amount flowing out. In vector form this becomes

$$
\nabla \cdot \vec{u} = 0
$$

where $\vec{u}$ (u-vector) is the velocity field and $\nabla \cdot$ (divergence) is the operator that measures the local "outflow rate" at a point. The same statement in the tensor (index) notation from chapter 2 is

$$
\frac{\partial u_i}{\partial x_i} = 0
$$

with $u_i$ (u-i) the $i$-th component of velocity and $\partial / \partial x_i$ (partial x-i) the rate of change along the coordinate $x_i$. The repeated index $i$ is summed by the summation convention over $i = 1, 2, 3$. In other words, this single line abbreviates $\partial u_1/\partial x_1 + \partial u_2/\partial x_2 + \partial u_3/\partial x_3 = 0$.

Physically: pick any small box in the flow, and the difference between what enters it and what leaves it is exactly zero. If the incompressibility assumption fails (for example, supersonic air), a density-change term appears on the right-hand side, but most of this book deals with water or low-speed air, so the right-hand side stays at zero throughout.

## Main 2 — The momentum equation: Newton's F = ma carried over to fluids

The momentum equation is a one-line Newton's second law. For an incompressible fluid of constant viscosity,

$$
\frac{\partial u_i}{\partial t} + u_j \frac{\partial u_i}{\partial x_j} = -\frac{1}{\rho}\frac{\partial p}{\partial x_i} + \nu \frac{\partial^2 u_i}{\partial x_j \partial x_j}
$$

The left-hand side is "the acceleration of a fluid particle"; the right-hand side is "the force per unit mass acting on that particle." Term by term:

- $\partial u_i / \partial t$ — the **time-derivative term**. With a camera fixed at one point in space, this is how quickly the velocity at that point changes with time. Call it the "fixed-point acceleration."
- $u_j \, \partial u_i / \partial x_j$ — the **convective term**. Fluid flowing in the $u_j$ direction carries spatial velocity differences into our point and dumps them out as acceleration there. The summation convention sums over $j = 1, 2, 3$. This is the source of nonlinearity, and — from the next chapter onward — the single term that makes turbulence hard.
- $-(1/\rho)\, \partial p / \partial x_i$ — the **pressure-gradient force**. $\rho$ (rho, density, kg/m³) is mass per unit volume; $p$ (p, pressure, Pa) is force per unit area. It pushes fluid from high-pressure regions toward low-pressure regions, with the minus sign setting that direction.
- $\nu \, \partial^2 u_i / \partial x_j \partial x_j$ — the **viscous diffusion term**. $\nu$ (nu, kinematic viscosity, m²/s) is defined in a moment. The repeated index $j$ is summed, giving $\partial^2 u_i / \partial x_1^2 + \partial^2 u_i / \partial x_2^2 + \partial^2 u_i / \partial x_3^2$. Friction between adjacent fluid layers smooths out velocity differences. The "diffusivity" listed in chapter 1 comes precisely from this term.

In words: **fixed-point acceleration + convection = −pressure + viscous diffusion**. Write that line out by hand once and you will start to see that every later equation in this book — RANS, LES, all of them — is a variation on this single statement.

## Main 3 — Viscosity and the Reynolds number, revisited

There are two notations for viscosity. $\mu$ (mu, dynamic viscosity, Pa·s) is the proportionality constant between shear stress and velocity gradient. But whenever viscosity enters the momentum equation as an acceleration, it appears only in the combination $\mu / \rho$, so we give that ratio its own name — the **kinematic viscosity**

$$
\nu = \frac{\mu}{\rho}
$$

with units (Pa·s) / (kg/m³) = m²/s. In plain words: "the larger $\nu$, the more strongly the fluid resists shearing (one layer sliding past another)." Air ($\nu \approx 1.5 \times 10^{-5}\,\mathrm{m^2/s}$) is larger than water ($\nu \approx 10^{-6}\,\mathrm{m^2/s}$) because air molecules are light, so less density suffices to produce the same viscous effect.

The fact that the convective term and the viscous term sit in the same equation means a single number can measure which one wins. Choose a representative velocity $U$ (m/s) and a representative length $L$ (m); then the convective term is of order $U^2 / L$ and the viscous term is of order $\nu U / L^2$. Their ratio,

$$
\mathrm{Re} = \frac{U L}{\nu}
$$

is the **Reynolds number**. Following the units gives $(\mathrm{m/s}) \cdot \mathrm{m} / (\mathrm{m^2/s}) = 1$ — dimensionless, as promised. Restating chapter 1's conclusion: when Re is large, convection dominates viscosity, and the smoothing effect that viscosity used to provide cannot keep up with the nonlinear stirring that convection produces. The result is turbulence.

## In Python

Use water at 20 °C to compute $\nu$, then evaluate Re for water flowing at 1 m/s through a 2 cm pipe, and classify the regime with the chapter 1 table.

```python
import numpy as np

# Dynamic viscosity mu and density rho of water at 20 C
mu = 1.002e-3        # Pa·s
rho = 998.0          # kg/m^3

# Kinematic viscosity nu = mu / rho
nu = mu / rho        # m^2/s

# Representative velocity U and length L (2 cm pipe, walking-pace water)
U = 1.0              # m/s
L = 0.02             # m
Re = U * L / nu      # dimensionless

# Classify the flow with chapter 1's boundary values
if Re < 2300:
    state = "laminar"
elif Re < 4000:
    state = "transition"
else:
    state = "turbulent"

print(f"mu  = {mu:.3e} Pa·s")
print(f"rho = {rho:.1f} kg/m^3")
print(f"nu  = {nu:.3e} m^2/s")
print(f"Re  = {Re:.0f}  ->  {state}")
```

The output is Re ≈ 19,900 — well past 4,000 and unambiguously in the turbulent regime. The way a stream of tap water suddenly fans out across the cross-section at some point below the faucet is the visual evidence of exactly this number.

## To the next chapter

[Chapter 4: Vorticity and the vorticity equation](../04-vorticity/) takes the curl of the momentum equation, drops the pressure term, and shows how the vortex stretching that chapter 1 called the "heart of turbulence" comes alive inside the equations. The convective term $u_j \, \partial u_i / \partial x_j$ from this chapter becomes the star of the show all over again.
