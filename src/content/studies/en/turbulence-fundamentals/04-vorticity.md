---
title: 'Vorticity and the vorticity equation — why turbulence must be 3D'
description: 'Starting from the definition of vorticity, reading the four terms of the vorticity equation one line at a time, and tracing why a 2D flow — where vortex stretching vanishes — cannot be turbulent.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 4
lang: en
pairSlug: turbulence-vorticity
draft: false
updated: 2026-05-14
---

# Vorticity and the vorticity equation — why turbulence must be 3D

> Starting from the definition of vorticity, reading the four terms of the vorticity equation one line at a time, and tracing why a 2D flow — where vortex stretching vanishes — cannot be turbulent.

## Opening

In Chapter 3 we wrote the Navier–Stokes equations for the velocity $\vec{u}$. In this chapter we rewrite the same equations in terms of the **vorticity** $\vec{\omega}$ (omega). Why bother — because in the vorticity equation the pressure term drops out, and a new term called **vortex stretching** appears in its place. That single term explains two of the five properties of turbulence from Chapter 1 simultaneously: "three-dimensional vorticity fluctuations" and "energy transfer to small scales." A reader who finishes this chapter should be able to say in one line of math why turbulence must be three-dimensional.

## Main 1 — What is vorticity

Vorticity is the curl of the velocity field. Using $\nabla$ (nabla, the gradient/curl operator),

$$
\vec{\omega} = \nabla \times \vec{u}
$$

Intuitively it is twice "how fast a fluid particle spins about its own axis." For a flow rotating as a rigid body, $\vec{\omega}$ is a constant vector along the axis of rotation; for a straight uniform flow, $\vec{\omega} = 0$.

In tensor notation (Chapter 2),

$$
\omega_i = \epsilon_{ijk} \frac{\partial u_k}{\partial x_j}
$$

where $\epsilon_{ijk}$ (epsilon ijk) is the **Levi-Civita symbol**, defined by:

- $+1$ for cyclic permutations (123, 231, 312)
- $-1$ for anti-cyclic permutations (132, 213, 321)
- $0$ if any two indices are equal

You do not need to memorize all six cases. What matters is that **this one symbol packages the cross product into index notation cleanly**. For example, $\omega_1 = \partial u_3/\partial x_2 - \partial u_2/\partial x_3$ falls out automatically from $\epsilon_{123}=+1$ and $\epsilon_{132}=-1$.

## Main 2 — The vorticity equation

Taking the curl of the Navier–Stokes equations for an incompressible flow (constant density) with no body forces eliminates the pressure term and gives:

$$
\frac{\partial \omega_i}{\partial t} + u_j \frac{\partial \omega_i}{\partial x_j} = \omega_j \frac{\partial u_i}{\partial x_j} + \nu \frac{\partial^2 \omega_i}{\partial x_j \partial x_j}
$$

Read the four terms left to right, one line at a time:

- $\partial \omega_i / \partial t$ — time rate of change of vorticity
- $u_j \, \partial \omega_i / \partial x_j$ — **convection** of vorticity by the flow
- $\omega_j \, \partial u_i / \partial x_j$ — **vortex stretching**
- $\nu \, \partial^2 \omega_i / \partial x_j \partial x_j$ — **viscous diffusion**, where $\nu$ (nu) is the kinematic viscosity (m²/s)

The third term is the protagonist of this chapter. When the velocity stretches along the direction of $\vec{\omega}$ (that is, the component of $\partial u_i / \partial x_j$ in that direction is positive), the vorticity itself is amplified — the same mechanism that lets a spinning figure skater speed up by pulling their arms in. This stretches large vortices into thinner ones and piles vorticity energy onto smaller and smaller scales. The microscopic identity of the energy cascade we will meet in Chapter 9 is exactly this term.

## Main 3 — In 2D, vortex stretching disappears

Now force the flow to be two-dimensional: $\vec{u} = (u_x, u_y, 0)$, and nothing depends on $z$. Computing the curl, the $x$ and $y$ components both vanish and we are left with

$$
\vec{\omega} = (0, 0, \omega_z)
$$

In the vortex-stretching term $\omega_j \, \partial u_i / \partial x_j$, only the $j=3$ component of $\omega_j$ survives, so

$$
\omega_j \frac{\partial u_i}{\partial x_j} = \omega_z \frac{\partial u_i}{\partial z} = 0
$$

because nothing varies in $z$.

The consequence is decisive.

> **In a 2D flow, vortex stretching is zero, so there is no energy cascade to small scales, and therefore none of the five-property definition of turbulence from Chapter 1 can be satisfied.**

A 2D flow can still be irregular and diffusive (some literature calls this "2D turbulence"), but its dynamics is an **inverse cascade**, in which small scales merge into larger ones — fundamentally a different phenomenon from 3D turbulence. This is precisely why industrial CFD always uses three-dimensional meshes.

## In Python

Take the simplest 2D flow $\vec{u}(x, y) = (y, 0)$ (uniform shear) and compute $\omega_z$ numerically. The answer is $\omega_z = \partial u_y/\partial x - \partial u_x/\partial y = 0 - 1 = -1$, constant over the whole domain.

```python
import numpy as np

# 100x100 grid covering [0, 1]^2
N = 100
x = np.linspace(0.0, 1.0, N)
y = np.linspace(0.0, 1.0, N)
X, Y = np.meshgrid(x, y, indexing="xy")

# Uniform shear flow: u_x = y, u_y = 0
u_x = Y
u_y = np.zeros_like(X)

# np.gradient returns derivatives in (row=y, col=x) order
dux_dy, dux_dx = np.gradient(u_x, y, x)
duy_dy, duy_dx = np.gradient(u_y, y, x)

# z-component of vorticity
omega_z = duy_dx - dux_dy

print(f"omega_z min  = {omega_z.min():.6f}")
print(f"omega_z max  = {omega_z.max():.6f}")
print(f"omega_z mean = {omega_z.mean():.6f}")
```

All three values print close to $-1$. The fact that $\omega_z$ is constant over the entire domain directly reflects "the shear is uniform, so the rotation rate is the same everywhere." This flow carries vorticity but no vortex stretching, and therefore cannot evolve into turbulence.

## To the next chapter

[Chapter 5: Reynolds averaging and the RANS equations](../05-reynolds-averaging/) shifts perspective. So far we have been tracking the instantaneous velocity field $\vec{u}(\vec{x}, t)$, but in real industrial applications it is more useful to separate the mean flow from the fluctuations. How do we put the fluctuations that vortex stretching produced back into the mean equations? — that is the entrance to the so-called closure problem.
