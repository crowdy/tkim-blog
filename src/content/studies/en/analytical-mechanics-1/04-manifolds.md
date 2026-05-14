---
title: 'Manifolds — spaces that are locally flat'
description: 'A space where each point has a neighborhood that looks like $\mathbb{R}^n$, but globally may be curved — defined via charts and atlases, and made concrete on $S^2$ by stereographic projection.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 4
lang: en
pairSlug: am1-manifolds
draft: false
updated: 2026-05-14
---

# Manifolds — spaces that are locally flat

> A space where each point has a neighborhood that looks like $\mathbb{R}^n$, but globally may be curved — defined via charts and atlases, and made concrete on $S^2$ by stereographic projection.

## Opening

The word that flashed by once in Chapter 1 — **the configuration space $M$ is a manifold** — is the subject of this chapter. The formal definition of a manifold fits in two sentences, but to accept those two sentences we first need two tools: a chart and an atlas. After this chapter the reader can write down the two stereographic charts that together cover the unit sphere $S^2$, and can say in one sentence why the configuration spaces of the simple pendulum, the double pendulum, and the rigid body are $S^1$, $T^2$, and $SO(3)$ rather than copies of $\mathbb{R}^n$.

## Main 1 — The definition in two sentences

An $n$-**dimensional manifold** $M$ is a space that locally looks like $\mathbb{R}^n$. Formally: for every point $p \in M$ there exists an open neighborhood $U \subset M$ containing $p$ together with a homeomorphism $\varphi : U \to \varphi(U) \subset \mathbb{R}^n$ — the pair $(U, \varphi)$ is called a **chart**. Moreover, wherever two charts $(U_1, \varphi_1)$ and $(U_2, \varphi_2)$ overlap on $U_1 \cap U_2$, the **transition map** $\varphi_2 \circ \varphi_1^{-1} : \varphi_1(U_1 \cap U_2) \to \varphi_2(U_1 \cap U_2)$ is required to be smooth; when this holds, $M$ is called a **smooth manifold**.

A chart is a single page of an atlas. One page cannot cover the whole Earth, so we collect several into a stack — that stack is the **atlas**. If neighbouring pages agree smoothly on the strip where they overlap, the atlas defines a smooth structure on $M$.

Four concrete examples worth keeping in mind:

- $\mathbb{R}^n$: a single chart $(M, \mathrm{id})$ suffices. In one dimension a line, in two a plane.
- $S^1$ (the 1-dimensional circle): covered by the upper and lower half-circles, two charts.
- $S^2$ (the 2-dimensional sphere): covered by two stereographic charts — from the north pole and from the south pole.
- $T^n = S^1 \times \cdots \times S^1$ (the $n$-torus): a product atlas of $2^n$ charts, two per factor.

These four cover almost every configuration space we meet in analytical mechanics.

## Main 2 — Stereographic projection of $S^2$

The most touchable example is the stereographic projection of $S^2$. Place the unit sphere $S^2 = \{(x,y,z) : x^2 + y^2 + z^2 = 1\}$ inside $\mathbb{R}^3$. From the north pole $N = (0, 0, 1)$, draw the line through any point $p = (x, y, z) \in S^2$ with $p \neq N$; that line meets the plane $z = 0$ at a unique point $(u, v)$, which we declare to be the coordinates of $p$. Solving the similar-triangle ratio gives

$$
(u, v) = \left( \frac{x}{1 - z}, \; \frac{y}{1 - z} \right)
$$

This is the chart $\varphi_N : S^2 \setminus \{N\} \to \mathbb{R}^2$. The denominator $1 - z$ vanishes only at $N$ itself, so the only point missing from the chart is $N$. Project instead from the south pole $S = (0, 0, -1)$ and we get the second chart

$$
(u', v') = \left( \frac{x}{1 + z}, \; \frac{y}{1 + z} \right)
$$

so $\varphi_S : S^2 \setminus \{S\} \to \mathbb{R}^2$ covers everything except $S$. Together the two charts cover every point of $S^2$ at least once.

What does the transition map look like on the overlap $S^2 \setminus \{N, S\}$? Invert $\varphi_N$ to lift $(u, v)$ back to a point of $S^2$, then push it forward through $\varphi_S$, and after a direct algebraic computation we find

$$
\varphi_S \circ \varphi_N^{-1} : (u, v) \;\longmapsto\; \left( \frac{u}{u^2 + v^2}, \; \frac{v}{u^2 + v^2} \right)
$$

This is smooth on $\mathbb{R}^2 \setminus \{0\}$ — the origin where the denominator vanishes corresponds to $N$, which is already excluded from the domain. Hence the two stereographic charts form a smooth atlas, and $S^2$ is a smooth 2-manifold.

## Main 3 — Why configuration spaces are manifolds

Now we collect on the promissory note from Chapter 1. The generalized coordinate $\theta$ of the planar pendulum cannot honestly be said to live in $\mathbb{R}$ — the values $\theta$ and $\theta + 2\pi$ name the same physical state. The configuration space of the pendulum is $S^1$, not $\mathbb{R}$. If you do treat $\theta$ as an element of $\mathbb{R}$ the equations of motion still give the right trajectory, but you have to drag periodicity and modular arithmetic along by hand on the side.

The double pendulum has two independent angles $(\theta_1, \theta_2)$, each living on its own $S^1$, so the configuration space is $T^2 = S^1 \times S^1$ — not the plane $\mathbb{R}^2$. The distinction is sharpest in pictures: a trajectory on the torus winds around in both directions and closes back on itself, a structure the flat-plane drawing cannot represent.

What about the orientation of a rigid body? The rotation group $SO(3)$ is parametrized by nine matrix entries subject to six constraints (orthogonality and unit determinant), leaving three free degrees of freedom. $SO(3)$ is a smooth 3-manifold — and, being also a group, a **Lie group** — but it is not a vector space. Euler angles parametrize it with a single chart, and the price is the well-known coordinate singularity called gimbal lock. The pathology lives in the chart, not in the manifold.

In short, recognising that generalized coordinates live on a manifold lets us push coordinate-dependent artefacts — periodicity, gimbal lock, constraint forces — outside the equations. A chart is a computational tool; the manifold itself exists before any choice of coordinates. That viewpoint sets up the vector fields of Chapter 5.

## In Python

```python
# Sample 1000 points uniformly on S^2 and project them to the plane
# via the stereographic chart from the north pole.
# The equator maps to the unit circle; the south pole maps to the origin.
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
target = 1000
xs, ys, zs = [], [], []
while len(xs) < target:
    # Marsaglia's method: (u, v) ~ U(-1, 1), keep if u^2 + v^2 <= 1
    u = rng.uniform(-1.0, 1.0, size=2000)
    v = rng.uniform(-1.0, 1.0, size=2000)
    s = u*u + v*v
    keep = s <= 1.0
    u, v, s = u[keep], v[keep], s[keep]
    root = np.sqrt(1.0 - s)
    xs.extend((2 * u * root).tolist())
    ys.extend((2 * v * root).tolist())
    zs.extend((1.0 - 2.0 * s).tolist())

x = np.array(xs[:target]); y = np.array(ys[:target]); z = np.array(zs[:target])

# Stereographic projection from the north pole (0, 0, 1)
mask = z < 1.0 - 1e-6
U = x[mask] / (1.0 - z[mask])
V = y[mask] / (1.0 - z[mask])

plt.figure(figsize=(5, 5))
plt.scatter(U, V, s=4, alpha=0.5)
plt.gca().set_aspect("equal")
plt.xlim(-4, 4); plt.ylim(-4, 4)
plt.xlabel("u"); plt.ylabel("v")
plt.title("Stereographic projection of $S^2$ from N")
plt.show()
```

Points on the equator ($z = 0$) land exactly on the unit circle, and points near the south pole cluster near the origin. As the source point approaches the north pole, the projected image flies off to infinity — the picture itself shows what the chart's missing point really is.

## To the next chapter

[Chapter 5: Vector fields and flows](../05-vector-fields/) takes up the question of how a "direction" on a manifold is defined without ever picking coordinates. Assigning one tangent vector to each point gives a vector field; integrating along it gives a one-parameter group of transformations called a flow. The charts and transition maps we have just touched will reappear as the Jacobians that tell us how the tangent space transforms between coordinate systems.
