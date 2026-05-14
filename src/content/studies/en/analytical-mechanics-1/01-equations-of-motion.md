---
title: 'Equations of motion — from Newton to generalized coordinates'
description: 'Where Cartesian $m\ddot{\vec x} = \vec F$ stops being graceful, two words — generalized coordinates $q^i$ and the configuration space $M$ — open the door to analytical mechanics.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 1
lang: en
pairSlug: am1-equations-of-motion
draft: false
updated: 2026-05-14
---

# Equations of motion — from Newton to generalized coordinates

> Where Cartesian $m\ddot{\vec x} = \vec F$ stops being graceful, two words — generalized coordinates $q^i$ and the configuration space $M$ — open the door to analytical mechanics.

## Opening

This chapter is the starting line of the whole book. We rewrite the Newtonian equation of motion the reader met as a freshman, then watch it get awkward as soon as the system carries a constraint. Resolving that awkwardness forces us to introduce two pieces of vocabulary — **generalized coordinates** $q^i$ and the **configuration space** $M$ — that the rest of the book will lean on constantly. By the end the reader should be able to state what "degree of freedom" really means, and should have a mental slot waiting for the "equation of motion for $q^i$" that the Lagrangian derivation of chapter 7 will eventually fill.

## Main 1 — Newton in Cartesian coordinates

Let a particle of mass $m$ move through 3D Euclidean space $\mathbb{R}^3$. Write its position as $\vec x(t) = (x^1, x^2, x^3)$ and call the net force $\vec F$. Newton's second law is then the famous one-liner.

$$
m\,\ddot{\vec x} = \vec F
$$

A dot denotes a time derivative, so $\ddot{\vec x}$ is the acceleration. For a free particle this single equation is enough: given initial position and velocity, the existence-and-uniqueness theorem for ODEs picks out one trajectory.

Now consider a different example. A bead slides along a smooth circular hoop of radius $R$. Intuitively this system has **one degree of freedom** — the bead's location is captured by a single angle $\theta$. But if we insist on Cartesian coordinates we end up tracking three numbers $(x, y, z)$ together with the **constraint** $x^2 + y^2 = R^2$, $z = 0$. The constraint force is something we know will cancel out at the end, yet it haunts every line of the calculation. It is not graceful.

The cure is to write the motion in $\theta$ from the start. But then the equation of motion is no longer of the form $m \ddot\theta = F_\theta$ — the Cartesian intuition does not survive intact. We need a new language.

## Main 2 — Generalized coordinates and configuration space

For a mechanical system with $n$ degrees of freedom, the **generalized coordinates** are $n$ independent numbers $q^1, q^2, \ldots, q^n$ that pin down the configuration of the system (where it sits and how it is laid out). We bundle them as $q = (q^1, \ldots, q^n)$, with the convention that the upper index labels which coordinate, not a power.

The set of admissible $q$ is the **configuration space** $M$. In general $M$ is not a flat Euclidean space but a **manifold** — a space that looks locally like $\mathbb{R}^n$ (so we can put $n$ smooth coordinates on a neighborhood of any point) but may be curved or have holes globally. The formal definition of a manifold waits until chapter 3; for now "space on which each point has $n$ independent local coordinates $q^i$" is the right mental picture.

Concretely:

- A free particle in 3D: $n = 3$, $M = \mathbb{R}^3$, with coordinates $(x, y, z)$.
- A bead on a hoop: $n = 1$, $M = S^1$ (the 1D circle), coordinate $\theta \in [0, 2\pi)$.
- A planar pendulum: $n = 1$, $M = S^1$, coordinate the angle $\theta$ from vertical.
- A planar double pendulum: $n = 2$, $M = T^2 = S^1 \times S^1$ (the 2-torus), coordinates the two rod angles $(\theta_1, \theta_2)$.

The fact that the configuration space of the double pendulum is a torus rather than the plane $\mathbb{R}^2$ matters. $\theta_1 = 0$ and $\theta_1 = 2\pi$ are the same physical state — Cartesian coordinates do not know this identification, generalized coordinates do.

## Main 3 — Generalized forces and the chain rule

We now write down the bridge between Cartesian and generalized coordinates. Suppose $\vec x$ is given as a smooth function of $q$: $\vec x = \vec x(q)$. The chain rule gives

$$
dx^j = \frac{\partial x^j}{\partial q^i}\, dq^i
$$

(from now on a repeated upper/lower index is summed — the Einstein convention). The infinitesimal work done by an external force $\vec F$ along the displacement $d\vec x$ is then

$$
\vec F \cdot d\vec x = F_j\,dx^j = F_j\,\frac{\partial x^j}{\partial q^i}\, dq^i \equiv Q_i\, dq^i
$$

The $Q_i$ defined here is the **generalized force** conjugate to $q^i$. Its units depend on $q^i$: newtons if $q^i$ is a length, newton-metres (i.e. a torque) if $q^i$ is an angle. One can read $Q_i$ as a weighted average of the Cartesian components of $\vec F$, where the Jacobian entries $\partial x^j / \partial q^i$ play the role of weights.

One promise to mark the boundary of this chapter: we stop at the definition of $Q_i$. The actual "equation of motion for $q^i$" will fall out in a single stroke from the variation of the action in chapter 7 (Lagrange's equations). This section is just bookkeeping for that destination.

## In Python

```python
# Explicit Euler vs. symplectic Euler on the 1D harmonic oscillator
# q'' = -omega^2 q,  with omega = 1.
# Watch the energy E = (1/2)(p^2 + omega^2 q^2) over time.
import numpy as np
import matplotlib.pyplot as plt

omega = 1.0
dt = 0.05
t = np.arange(0.0, 50.0 + dt, dt)
N = len(t)

# Initial condition: q(0) = 1, p(0) = 0  =>  E(0) = 0.5
q_e, p_e = np.empty(N), np.empty(N)   # explicit Euler
q_s, p_s = np.empty(N), np.empty(N)   # symplectic Euler
q_e[0] = q_s[0] = 1.0
p_e[0] = p_s[0] = 0.0

for n in range(N - 1):
    # Explicit Euler: update q and p simultaneously from old values
    q_e[n+1] = q_e[n] + dt * p_e[n]
    p_e[n+1] = p_e[n] - dt * omega**2 * q_e[n]
    # Symplectic Euler: update p first, then use the new p to update q
    p_s[n+1] = p_s[n] - dt * omega**2 * q_s[n]
    q_s[n+1] = q_s[n] + dt * p_s[n+1]

E_e = 0.5 * (p_e**2 + omega**2 * q_e**2)
E_s = 0.5 * (p_s**2 + omega**2 * q_s**2)

plt.plot(t, E_e, label="explicit Euler")
plt.plot(t, E_s, label="symplectic Euler")
plt.xlabel("t"); plt.ylabel("E(t)"); plt.legend(); plt.show()
```

The explicit-Euler energy drifts monotonically upward; the symplectic-Euler energy oscillates with small amplitude around the true value 0.5. Same dynamics, same step size, completely different long-time behaviour — this is the first hint of why preserving the **symplectic structure** (chapter 10, Hamiltonian mechanics) is worth the algebraic effort.

## To the next chapter

[Chapter 2: Constrained motion on surfaces](../02-constrained-motion-on-surfaces/) treats the "system with a constraint" we just sketched in words with more care. Working through the recipe for writing the motion of a particle confined to a surface in generalized coordinates lets the vocabulary of motion on a manifold settle into place naturally.
