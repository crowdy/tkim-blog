---
title: 'Tensor notation and coordinate systems'
description: 'The notation we need so that chapters 3 through 12 can write Navier–Stokes on a single line — index notation, the Einstein summation convention, and the Cartesian-only promise.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 2
lang: en
pairSlug: turbulence-tensor-notation
draft: false
updated: 2026-05-14
---

# Tensor notation and coordinate systems

> The notation we need so that chapters 3 through 12 can write Navier–Stokes on a single line — index notation, the Einstein summation convention, and the Cartesian-only promise.

## Opening

This chapter introduces no new physics. Instead it sharpens **the tools we need so that every equation from Chapter 3 onward fits on one line**. The goal is simple — to look at $u_i$ and immediately read "the $i$-th component of $\vec{u}$," and to read a repeated index as "there is a hidden $\sum$ here."

## Main 1 — Breaking a vector into components

In a 3D Cartesian coordinate system the velocity vector has three components:

$$
\vec{u} = (u_x, u_y, u_z) = (u_1, u_2, u_3)
$$

The subscripts 1, 2, 3 correspond to the $x, y, z$ axes respectively. That is, $u_1 \equiv u_x$, $u_2 \equiv u_y$, $u_3 \equiv u_z$. We write the coordinate axes themselves the same way: $(x_1, x_2, x_3)$.

The payoff of this notation is that once we introduce a generic index $i$, we can compress a statement about all three components into a single line:

$$
u_i, \quad i \in \{1, 2, 3\}
$$

This single line means "the following holds for each of $u_1, u_2, u_3$." A free index $i$ appears on both sides of an equation and signals "there are really three equations here, one per component."

## Main 2 — The Einstein summation convention

The dot product of two vectors $\vec{a}, \vec{b}$ in index notation is:

$$
\vec{a} \cdot \vec{b} = \sum_{i=1}^{3} a_i b_i = a_1 b_1 + a_2 b_2 + a_3 b_3
$$

The index $i$ is repeated twice within a single term. The convention Einstein introduced in his 1916 paper on general relativity is simple — **whenever an index appears twice in the same term, sum it from 1 to 3 automatically and drop the $\sum$ symbol**:

$$
a_i b_i \equiv \sum_{i=1}^{3} a_i b_i = a_1 b_1 + a_2 b_2 + a_3 b_3
$$

A repeated index is called a *dummy index*. Renaming a dummy index does not change the expression: $a_i b_i = a_j b_j = a_k b_k$, exactly the way $\sum_{i=1}^{3} f(i)$ and $\sum_{j=1}^{3} f(j)$ are the same number.

**If the same index appears three or more times in one term, the notation is wrong.** Free indices must also match exactly across an equation — if $i$ is free on the left side, $i$ must be free on the right side.

## Main 3 — Rank-2 tensors and stress

A scalar is a quantity with no direction (temperature, for instance). A vector is a quantity with one direction (velocity). A **rank-2 tensor is a quantity that carries two directions at once.** The canonical example is the stress tensor $\sigma_{ij}$.

$\sigma_{ij}$ means "the $i$-th component of the force per unit area acting on a surface whose normal points in the $j$-th direction." Since the two free indices $i, j$ each range over 1, 2, 3, the stress tensor has $3 \times 3 = 9$ components in total:

$$
\sigma_{ij} = \begin{pmatrix} \sigma_{11} & \sigma_{12} & \sigma_{13} \\ \sigma_{21} & \sigma_{22} & \sigma_{23} \\ \sigma_{31} & \sigma_{32} & \sigma_{33} \end{pmatrix}
$$

The velocity gradient $\partial u_i / \partial x_j$ that appears in Chapter 3 has the same structure — $i$ tells you which velocity component, $j$ tells you which direction we differentiate along, and the symbol packages all nine partial derivatives into one. Without this compression, Navier–Stokes would sprawl across a full page.

## Main 4 — This book uses Cartesian coordinates only

General tensor analysis also covers curvilinear coordinates (cylindrical, spherical), and in that setting Christoffel symbols and the distinction between covariant and contravariant indices appear. **In this book every chapter uses the 3D Cartesian coordinate system only.** Consequently:

- No need to distinguish upper from lower indices — we write everything as a subscript.
- Christoffel symbols vanish and can be ignored.
- The coordinate axes are straight lines and the unit vectors are constant in space.

This promise keeps the notation light. For applications that require curvilinear coordinates (flow in cylindrical pipes, inside rotating machinery), we typically derive results in Cartesian coordinates first and then transform the final expressions.

## In Python

Let us verify that computing a dot product by hand — as the sum of three products — agrees with what numpy's `einsum` does. The expression `einsum('i,i->', a, b)` is the Einstein convention transcribed into code: "the index $i$ is repeated, so sum over it; the output has no index, so it is a scalar."

```python
import numpy as np

# Two arbitrary 3D vectors (seed fixed for reproducibility)
rng = np.random.default_rng(0)
a = rng.standard_normal(3)
b = rng.standard_normal(3)

# Method 1 — three hand-written products added up
manual = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

# Method 2 — Einstein summation (repeated i is summed automatically)
einstein = np.einsum('i,i->', a, b)

# For reference — np.dot gives the same answer
dot = np.dot(a, b)

print(f"a = {a}")
print(f"b = {b}")
print(f"manual : {manual:.6f}")
print(f"einsum : {einstein:.6f}")
print(f"np.dot : {dot:.6f}")
print(f"all three agree? {np.allclose([manual, einstein, dot], manual)}")
```

The `einsum` argument `'i,i->'` is literally the formula — the comma-separated parts are the index labels of the two input tensors, and what follows the arrow is the output index. An empty output means "scalar," and any index that repeats in the inputs is summed. In other words, **Einstein notation is just a name for something numpy was already doing**.

## To the next chapter

The notation toolkit is now complete. [Chapter 3: Revisiting the Navier–Stokes equations](../03-navier-stokes/) uses this notation to write conservation of mass and conservation of momentum on one line each. If an expression like $\partial u_i / \partial x_i$ feels foreign in the middle of that chapter, come back here and re-read the rule "a repeated index means sum."
