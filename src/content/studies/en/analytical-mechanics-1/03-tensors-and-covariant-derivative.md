---
title: 'Tensors and the covariant derivative — keeping equations the same under coordinate change'
description: 'A tensor is the multilinear map itself, not its coordinate components; the covariant derivative is the correction that turns a partial derivative back into a tensor when the coordinates are curved.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 3
lang: en
pairSlug: am1-tensors
draft: false
updated: 2026-05-14
---

# Tensors and the covariant derivative — keeping equations the same under coordinate change

> A tensor is the multilinear map itself, not its coordinate components; the covariant derivative is the correction that turns a partial derivative back into a tensor when the coordinates are curved.

## Opening

Analytical mechanics is, in the end, the project of building a language in which the equations of motion read the same after you swap one coordinate system for another. This chapter puts the two most basic pieces of that language in your hand: **tensors** and the **covariant derivative**. After this chapter you should be able to take the familiar question "how do the components of a vector transform?" and rewrite it at a higher level — "the tensor itself is a coordinate-free object; only its labels change." It is also the warm-up for putting motion on a manifold next chapter. Throughout we use the **Einstein summation convention** — whenever the same index appears once upstairs and once downstairs, sum over it automatically.

## Main 1 — What a tensor really is

The most common misconception when meeting tensors for the first time is the definition "an array with two or more indices." That is the tensor's **component representation**, not the tensor.

A **rank-$(p, q)$ tensor** at a point $p$ is a **multilinear map that eats $p$ covectors and $q$ vectors and returns a single real number**. In plain language: a machine with $p + q$ slots. Plug a vector or covector (whichever the slot demands) into each slot, get a number out, and the machine is **linear in each slot independently**.

Once you hold that definition, the familiar objects line up cleanly.

- Rank $(0, 0)$ tensor = scalar. No slots, just a number.
- Rank $(1, 0)$ tensor = vector. Eats one covector, returns a number.
- Rank $(0, 1)$ tensor = covector (a.k.a. one-form). Eats one vector, returns a number.
- Rank $(0, 2)$ tensor = bilinear form. Eats two vectors, returns a number. The headline example is the metric tensor $g_{ij}$ — the machine that produces the inner product of two vectors.
- Rank $(1, 1)$ tensor = linear map. Eats one vector and one covector and returns a number. You can treat it exactly like a matrix.

The point is that no coordinate system appears in any of these definitions. Coordinates are a **labeling tool** for writing tensors down; the tensor itself lives upstream of the labels.

## Main 2 — The component transformation law

Of course we compute with components. When we change coordinates from $x$ to $x'$, how do the components transform?

A vector (contravariant, index upstairs) transforms as:

$$
T'^{i} = \frac{\partial x'^{i}}{\partial x^{j}} \, T^{j}
$$

A covector (covariant, index downstairs) uses the inverse Jacobian:

$$
T'_{i} = \frac{\partial x^{j}}{\partial x'^{i}} \, T_{j}
$$

A rank-$(1, 1)$ tensor $T^{i}{}_{j}$ picks up one factor of each kind of Jacobian, one per index:

$$
T'^{i}{}_{j} = \frac{\partial x'^{i}}{\partial x^{k}} \frac{\partial x^{l}}{\partial x'^{j}} \, T^{k}{}_{l}
$$

The rule is simple. **Upstairs indices get a new-over-old Jacobian, downstairs indices get an old-over-new Jacobian**, applied once per index.

A worked example. Take 2D Cartesian coordinates and rotate them by an angle $\alpha$ (alpha) into a new frame. The Jacobian is the transpose $R(\alpha)^{T}$ of the rotation matrix, so a vector that read $v = (1, 0)$ in the old frame reads $v'^{i} = (R^{-1})^{i}{}_{j} v^{j}$, i.e. $v' = (\cos\alpha, \sin\alpha)$, in the new one. The same arrow, measured against a different ruler.

## Main 3 — The covariant derivative in one sentence

In Cartesian coordinates the partial derivative $\partial_{i} V^{j}$ of a vector field $V^{j}$ is itself the components of a rank-$(1, 1)$ tensor. But in polar coordinates, where **the basis vectors depend on position**, that naive partial derivative is no longer a tensor — differentiation catches the change in components but misses the rotation of the basis.

The fix is to add a correction term that puts the result back into the tensor world. The **covariant derivative** is defined by:

$$
\nabla_{i} V^{j} = \partial_{i} V^{j} + \Gamma^{j}{}_{ik} \, V^{k}
$$

The new symbol $\Gamma^{j}{}_{ik}$ is the **Christoffel symbol**. For now, read it as "the price of using non-Cartesian coordinates." In one line: in any coordinate system $\Gamma$ is determined entirely by the metric $g_{ij}$, and in Cartesian coordinates $\Gamma = 0$. We will derive the explicit formula only when a later chapter needs it.

## In Python

```python
# Check that, under a change of basis by rotation, the length of a vector and
# the trace/determinant of a rank-2 tensor are preserved. We rotate the basis,
# not the object, so all paired numbers must agree.
import numpy as np

alpha = np.pi / 6                                        # rotation angle (radians)
R = np.array([[np.cos(alpha), -np.sin(alpha)],
              [np.sin(alpha),  np.cos(alpha)]])
R_inv = R.T                                              # R is orthogonal

# Vector: (1, 0) in basis A; components in basis B are R^{-1} v.
v = np.array([1.0, 0.0])
v_prime = R_inv @ v
print(f"|v|^2  = {v @ v:.6f}")
print(f"|v'|^2 = {v_prime @ v_prime:.6f}")               # must match

# Rank-2 tensor: T' = R^{-1} T R
T = np.array([[2.0, 1.0],
              [1.0, 0.0]])
T_prime = R_inv @ T @ R
print(f"tr T   = {np.trace(T):.6f},  tr T'   = {np.trace(T_prime):.6f}")
print(f"det T  = {np.linalg.det(T):.6f},  det T'  = {np.linalg.det(T_prime):.6f}")
```

If the four lines come out matched in pairs, you have just touched the **scalar invariants** — length, trace, determinant — that survive a change of coordinates.

## To the next chapter

[Chapter 4: Manifolds](../04-manifolds/) puts the tensors of this chapter onto a **manifold**: we ask how a rank-$(p, q)$ tensor, which so far has only made sense at a single point, is glued together consistently across overlapping smooth coordinate patches. The transformation law for the Christoffel symbol and the explicit formula that pulls $\Gamma$ out of the metric will be taken back out of the toolbox in a later chapter, only when the storyline demands them.
