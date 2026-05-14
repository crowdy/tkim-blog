---
title: 'Mathematical preliminaries — a toolbox for manifold mechanics'
description: 'To carry Newton''s laws past the flat plane we need a new vocabulary — bases, the matrix exponential, and the shortest path to tangent vectors.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 0
lang: en
pairSlug: am1-mathematical-preliminaries
draft: false
updated: 2026-05-14
---

# Mathematical preliminaries — a toolbox for manifold mechanics

> To carry Newton's laws past the flat plane we need a new vocabulary — bases, the matrix exponential, and the shortest path to tangent vectors.

## Opening

This book is a study note that rewrites Lagrangian and Hamiltonian mechanics in the language of *manifolds*. That work starts in chapter 1, but a few tools should already be in the reader's hand. By the end of this prologue the reader should be able to write "change of basis" in a single line of indices and explain in one sentence why the matrix exponential $e^{tA}$ is our first example of a *flow*. The tangent space of chapter 4 and the vector fields of chapter 5 will then not feel like new abstractions but as formalizations of the pictures sketched here.

## Main 1 — Why we are setting up a toolbox

Newton's $\mathbf{F} = m\ddot{\mathbf{x}}$ rests on the silent assumption that the position vector lives in $\mathbb{R}^3$. For the textbook pendulum, planetary motion, and collision problems this is enough. But consider the **double pendulum**. Its coordinates are the two rod angles $(\theta_1, \theta_2)$, and the coordinate space is not a plane but the **torus** $T^2 = S^1 \times S^1$. The values $\theta_1 = 0$ and $\theta_1 = 2\pi$ name the same point — something ordinary planar calculus refuses to acknowledge.

In the same way, the orientation of a rigid body lives on the **rotation group** $SO(3)$, a curved surface, and a particle constrained to a sphere lives on $S^2$. The common name for such spaces is *manifold* — a space that looks locally like $\mathbb{R}^n$ but globally does not. The formal definition is deferred to chapter 4, but the premise of this book is simple: **if the configuration space is not flat, the vocabulary of calculus must be rewritten in a coordinate-independent way.** The price we pay is one more pass over the basics of linear algebra.

## Main 2 — Linear algebra refresher

A **basis** of a vector space $V$ is a set of vectors that is linearly independent and spans $V$. Once a basis $\{e_1, \dots, e_n\}$ is fixed, every vector $v \in V$ has unique components $(v^1, \dots, v^n)$. Throughout this book we use the **Einstein summation convention** — when the same index appears once up and once down, sum over it. So

$$
v = v^i e_i \equiv \sum_{i=1}^{n} v^i e_i
$$

is all we need to write. Upper indices mark components (contravariant), lower indices mark basis vectors (covariant). If a new basis $\{e_i'\}$ is given by $e_i' = A^j_{\ i} e_j$, then the new components $v'^i$ of the same vector $v$ are obtained by multiplying with the inverse matrix $(A^{-1})^i_{\ j}$ — this is **change of basis**, and the starting point of the tensor concept.

The next tool is **eigenvalues and eigenvectors**. For an $n \times n$ matrix $A$, if a nonzero $v$ satisfies $A v = \lambda v$, then $\lambda \in \mathbb{C}$ is an eigenvalue of $A$. Eigenvalues tell us the coordinates in which the matrix decomposes into pure stretching and rotation.

Now the protagonist of this chapter — the **matrix exponential**. It is just the scalar series $e^x = 1 + x + x^2/2! + \cdots$ ported to matrices. For an $n \times n$ matrix $A$,

$$
e^{tA} = I + tA + \frac{(tA)^2}{2!} + \frac{(tA)^3}{3!} + \cdots
$$

The series converges absolutely for every $A$. The linear ODE $\dot x = Ax$ has solution — accept this as fact for now — $x(t) = e^{tA} x_0$. The point to underline: applying $e^{tA}$ to $x_0$ as $t$ varies, i.e. **letting the system run for time $t$**, is the first concrete example of what we will later call a *flow*. $e^{tA}$ is a one-parameter family of linear maps indexed by $\mathbb{R}$, and the cleanest specimen of the picture that chapter 5 will generalize.

## Main 3 — Tangent vectors, intuitively

On a plane, a vector is the same vector no matter where you place it. Parallel transport is free. On the sphere $S^2$ the story changes. If you take an arrow at the equator pointing east and try to drag it to the north pole, it is not obvious in which direction the arrow should end up pointing.

The fix is to **give each point its own vector space**. A **tangent vector** at the point $p$ is, intuitively, "a velocity the surface allows at $p$." All tangent vectors at $p$ together form a vector space called the **tangent space** $T_p M$. The tangent space at the north pole of $S^2$, written $T_{\text{N}} S^2$, is just the *horizontal plane* tangent to the sphere there — exactly the picture you would draw.

A touch more formally: take a curve $\gamma : (-\varepsilon, \varepsilon) \to M$ through $p$ with $\gamma(0) = p$. Its velocity at time zero, $\dot\gamma(0)$, is one tangent vector. In coordinates $(x^1, \dots, x^n)$ we can write $\dot\gamma(0) = \dot\gamma^i(0)\, \partial_i \big|_p$, and the set $\{\partial_i|_p\}$ plays the role of a basis for $T_p M$. Notice that this is formally identical to $v = v^i e_i$ from Main 2.

For this chapter, the picture and the vocabulary are enough. The formal definition, the equivalence of different definitions, and basis changes are deferred to chapter 4. But one thing should be nailed in now: **a vector field is a smooth assignment of one tangent vector to each point in space**, and *letting points slide along it* is what produces a flow. $e^{tA}$ is just the flat-space special case of that picture.

## In Python

```python
# Check that the matrix exponential really produces a rotation.
# A = [[0,-1],[1,0]] is the generator of planar rotation;
# applying e^{tA} to x0 = (1,0) should trace the unit circle.
import numpy as np
import matplotlib.pyplot as plt

A = np.array([[0.0, -1.0], [1.0, 0.0]])
x0 = np.array([1.0, 0.0])

def expm_series(M, terms=20):
    # Truncated Taylor series: accurate for moderate ||M||.
    n = M.shape[0]
    result = np.eye(n)
    term = np.eye(n)
    for k in range(1, terms):
        term = term @ M / k
        result = result + term
    return result

ts = np.linspace(0.0, 2 * np.pi, 200)
xs = np.array([expm_series(t * A) @ x0 for t in ts])

# Compare with the closed form (cos t, sin t).
closed = np.array([[np.cos(t), np.sin(t)] for t in ts])
err = np.max(np.abs(xs - closed))
print(f"max error between series and closed form = {err:.2e}")

plt.plot(xs[:, 0], xs[:, 1])
plt.gca().set_aspect("equal")
plt.title(r"flow traced by $e^{tA} x_0$")
plt.show()
```

If the error falls to the order of $10^{-10}$ and the plot is a unit circle, the definition "$e^{tA}$ is the flow that acts on an initial vector for a time $t$" should now feel concrete.

## To the next chapter

[Chapter 1: Equations of motion](../01-equations-of-motion/) rewrites Newton's $\mathbf{F} = m\ddot{\mathbf{x}}$ in generalized coordinates $q^i$ and watches the Lagrangian emerge naturally. The index notation and the flow picture assembled in this chapter will serve as the working vocabulary for that derivation.
