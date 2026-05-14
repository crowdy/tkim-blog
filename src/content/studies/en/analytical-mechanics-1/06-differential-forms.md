---
title: "Differential forms — what integrals are really made of"
description: "The grad/curl/div of vector calculus and its four integral theorems collapse into a single line: $\\int_M d\\omega = \\int_{\\partial M} \\omega$ on a manifold."
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 6
lang: en
pairSlug: am1-differential-forms
draft: false
updated: 2026-05-14
---

# Differential forms — what integrals are really made of

> The grad/curl/div of vector calculus and its four integral theorems collapse into a single line: $\int_M d\omega = \int_{\partial M} \omega$ on a manifold.

## Opening

Undergraduate vector calculus asks you to memorize three differential operators (grad, curl, div) and four integral theorems (fundamental theorem of calculus, Green's, Kelvin–Stokes, Gauss divergence) as if they were unrelated facts. This chapter shows that all four are the same one-line statement, $\int_M d\omega = \int_{\partial M} \omega$, written four times with different dimensions. The cast is small: **1-forms**, the **wedge product**, and the **exterior derivative** $d$. By the end of the chapter you should be able to rewrite a vector-calculus identity as a statement about forms, and know which form-language sentence reduces to which classical theorem. Chapter 7's Lagrangian mechanics will use this language immediately when we take the variation of the action.

## Main 1 — 1-forms, the duals of vectors

A **1-form** $\omega$ at a point is a linear map that eats a single vector and returns a real number. It is therefore the **dual** of a vector. In coordinates $x^1, \ldots, x^n$ we define the differential $dx^i$ to be the machine that extracts the $i$-th component of a vector. Any 1-form is then a linear combination of these basis elements,

$$
\omega = \omega_i \, dx^i
$$

(Einstein summation), and a 1-form **field** is one whose coefficients $\omega_i$ depend on position.

The most familiar example is the **exact differential** of a smooth function $f(x, y, z)$:

$$
df = \frac{\partial f}{\partial x}\, dx + \frac{\partial f}{\partial y}\, dy + \frac{\partial f}{\partial z}\, dz
$$

In freshman physics this was just "the change in $f$ under a small displacement $d\vec r$". Read again now, $df$ is not a piece of suggestive notation: it **is** a 1-form, the one whose action on a displacement vector returns the first-order change of $f$.

## Main 2 — The wedge product and higher-degree forms

To handle oriented areas and volumes we need a way to multiply two 1-forms into a 2-form. The **wedge product** $\wedge$ is the antisymmetric multiplication defined by

$$
dx \wedge dy = -\, dy \wedge dx, \qquad dx \wedge dx = 0.
$$

Everything else follows from that one antisymmetry. A generic **2-form** in three dimensions is

$$
\omega = P\, dy \wedge dz + Q\, dz \wedge dx + R\, dx \wedge dy,
$$

and when fed two vectors $\vec u, \vec v$ it returns the signed area of the parallelogram they span, weighted by $P, Q, R$. On an $n$-dimensional manifold the **top-degree** form — the $n$-form — is exactly a volume element. We define an **orientation** as the choice of a nowhere-vanishing top form; that is the cleanest way to fix signed volumes without picking coordinates.

## Main 3 — The exterior derivative $d$ unifies grad, curl, div

The **exterior derivative** $d$ is a linear operator that turns a $k$-form into a $(k+1)$-form. On a 0-form (a function) $f$ it is the differential we already met: $df = \partial_i f\, dx^i$. On a 1-form $\omega = \omega_i\, dx^i$,

$$
d\omega = (\partial_i \omega_j)\, dx^i \wedge dx^j = \tfrac{1}{2}\,(\partial_i \omega_j - \partial_j \omega_i)\, dx^i \wedge dx^j,
$$

because antisymmetry of the wedge throws away the symmetric part automatically. The single most important property of $d$ is

$$
d^2 = 0,
$$

which is just the commuting of partial derivatives in disguise. In three dimensions this one operator collapses into all three classical operators:

- $d$ of a 0-form $f$ is the 1-form $df$ — its components are the **gradient** $\nabla f$.
- $d$ of a 1-form $\omega = A_x dx + A_y dy + A_z dz$ is a 2-form whose components are the **curl** $\nabla \times \vec A$.
- $d$ of a 2-form is a 3-form whose coefficient is the **divergence** $\nabla \cdot \vec B$.

And the identity $d^2 = 0$ is then the two classical identities $\nabla \times \nabla f = 0$ and $\nabla \cdot (\nabla \times \vec A) = 0$ stated at once.

## Main 4 — Stokes' theorem in one line

Now the payoff. For any compact oriented manifold $M$ with boundary $\partial M$ and any $(\dim M - 1)$-form $\omega$,

$$
\int_M d\omega = \int_{\partial M} \omega.
$$

This single line contains all four of the integral theorems you memorized as separate facts.

- $M = [a, b]$ a 1D interval, $\omega = f$ — the **fundamental theorem of calculus**, $\int_a^b f'\, dx = f(b) - f(a)$.
- $M$ a planar region, $\omega = P\, dx + Q\, dy$ — **Green's theorem**, $\iint_M (\partial_x Q - \partial_y P)\, dx\, dy = \oint_{\partial M} (P\, dx + Q\, dy)$.
- $M$ an oriented 2-surface in $\mathbb R^3$, $\omega = \vec A \cdot d\vec r$ — **Kelvin–Stokes**, $\iint_M (\nabla \times \vec A) \cdot d\vec S = \oint_{\partial M} \vec A \cdot d\vec r$.
- $M$ a 3D solid, $\omega$ a 2-form — **Gauss' divergence theorem**, $\iiint_M \nabla \cdot \vec B\, dV = \iint_{\partial M} \vec B \cdot d\vec S$.

Four classical theorems become four rewordings of one identity. The moment you have an equation that you learn once and apply in four places, vector calculus shrinks dramatically.

## In Python

```python
# Verify Green's theorem numerically on the unit disk.
# omega = -y dx + x dy  →  d omega = 2 dx ^ dy
# Both the boundary integral and the area integral should be near 2π.
import numpy as np

# (a) Boundary integral: parametrize the unit circle by t in [0, 2π)
N = 20000
t = np.linspace(0.0, 2.0 * np.pi, N, endpoint=False)
dt = (2.0 * np.pi) / N
x, y = np.cos(t), np.sin(t)
dxdt, dydt = -np.sin(t), np.cos(t)

# omega(γ'(t)) = (-y)·x'(t) + x·y'(t) = sin^2 t + cos^2 t = 1
integrand_boundary = (-y) * dxdt + x * dydt
line_integral = np.sum(integrand_boundary) * dt

# (b) Area integral: d omega = 2 dx ^ dy, so 2 · area(disk) = 2π
M = 2000
xs = np.linspace(-1.0, 1.0, M)
ys = np.linspace(-1.0, 1.0, M)
X, Y = np.meshgrid(xs, ys, indexing="xy")
inside = (X * X + Y * Y) <= 1.0
cell_area = (xs[1] - xs[0]) * (ys[1] - ys[0])
area_integral = 2.0 * np.sum(inside) * cell_area

print(f"∫∂M ω   = {line_integral:.6f}")
print(f"∫M  dω  = {area_integral:.6f}")
print(f"theory 2π = {2.0 * np.pi:.6f}")
```

When both numbers land near $2\pi \approx 6.2832$, you have touched the simplest non-trivial case of Stokes' theorem by hand. The area integral converges more slowly as the grid is refined because the disk's boundary is approximated by a staircase.

## To the next chapter

[Chapter 7: Lagrangian mechanics](../07-lagrangian-mechanics/) uses the 1-forms and exterior derivative of this chapter directly when taking the variation of the action $S = \int L\, dt$. Even the familiar Euler–Lagrange left-hand side $\frac{d}{dt}\frac{\partial L}{\partial \dot q} - \frac{\partial L}{\partial q} = 0$ is, in disguise, a component-form statement that a certain 1-form on configuration-velocity space is closed. With the language of forms in place, the next chapter's jump from Lagrangian to Hamiltonian mechanics will look like a one-line Legendre transform.
