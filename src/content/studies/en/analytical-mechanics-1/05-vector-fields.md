---
title: 'Vector fields and flows — the tools that draw time evolution'
description: 'A smooth vector field $X$ on a manifold is the right-hand side of an ODE, its flow $\phi^t$ draws time evolution, and the Lie bracket $[X, Y]$ measures the non-commutativity of two flows.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 5
lang: en
pairSlug: am1-vector-fields
draft: false
updated: 2026-05-14
---

# Vector fields and flows — the tools that draw time evolution

> A smooth vector field $X$ on a manifold is the right-hand side of an ODE, its flow $\phi^t$ draws time evolution, and the Lie bracket $[X, Y]$ measures the non-commutativity of two flows.

## Opening

By the end of the previous chapter we knew what a tangent vector at one point of the configuration manifold $M$ is. This chapter widens the view to a quantity that specifies a tangent vector **at every point at once** — a vector field. A vector field is itself the right-hand side of an equation of motion; its integral curves are the trajectories of every mechanical system we will meet; and the non-commutativity of two vector fields is the bedrock of the differential forms and Lie derivatives that arrive in the next chapter. When this chapter is over, the reader should be able to translate a one-line ODE into the picture "a flow on a manifold" without thinking.

## Main 1 — A vector field: a direction at every point

A **vector field** $X$ on a smooth manifold $M$ is a smooth assignment of a tangent vector $X(q)$ to every point $q \in M$. In a coordinate chart $q = (q^1, \ldots, q^n)$ with the standard basis $\partial_i := \partial / \partial q^i$, we write

$$
X = X^i(q)\, \partial_i
$$

(we keep using Einstein's summation convention). The $X^i: M \to \mathbb{R}$ are smooth **component functions**. Picture an arrow planted at every point of $M$, and you have the right mental image.

The real job of a vector field is to be the right-hand side of an ODE. A curve $q(t) \in M$ is said to follow $X$ when

$$
\dot q^i(t) = X^i(q(t))
$$

Stripped of coordinates this reads $\dot\gamma = X(\gamma)$. **Vector field = right-hand side of the equations of motion.**

The friendliest example: the plane pendulum. On the phase space $TS^1 \ni (\theta, \dot\theta)$ define the vector field

$$
X(\theta, \dot\theta) = \Bigl(\dot\theta,\; -\tfrac{g}{\ell}\sin\theta\Bigr)
$$

and its flow is exactly the pendulum's trajectory. The first component encodes the tautology "$\theta$ changes at rate $\dot\theta$"; the second component carries the real physics, $\ddot\theta = -(g/\ell)\sin\theta$.

## Main 2 — Integral curves and the flow

Given an initial point $q_0 \in M$, existence and uniqueness for ODEs (which we accept as a fact in this chapter) guarantees a unique curve $\gamma_{q_0}(t)$ satisfying $\dot\gamma = X(\gamma)$, $\gamma(0) = q_0$, at least for a short time. We call $\gamma_{q_0}$ the **integral curve** of $X$ through $q_0$.

Now turn the initial point into a variable and fix the time $t$. Then the map

$$
\phi^t: M \to M, \quad \phi^t(q_0) := \gamma_{q_0}(t)
$$

is defined. The family $\{\phi^t\}_{t \in \mathbb{R}}$ is called the **flow** of $X$. By construction the flow satisfies the group property

$$
\phi^{t+s} = \phi^t \circ \phi^s, \qquad \phi^0 = \mathrm{id}_M
$$

In words: "flow for $s$ seconds, then for $t$ seconds" equals "flow for $t+s$ seconds in one go". This is automatic as long as $X$ does not depend on time.

The linear case makes everything concrete. Let $M = \mathbb{R}^n$ and $X(x) = Ax$ for an $n \times n$ matrix $A$. The solution of $\dot x = Ax$ is, famously,

$$
\phi^t(x_0) = e^{tA} x_0
$$

so the flow is just the matrix exponential. The group property $e^{(t+s)A} = e^{tA}e^{sA}$ falls out for free. The teaser planted in chapter 0 — "to know where an ODE goes, you eventually need the matrix exponential" — has just been re-dressed as a statement about flows on a general manifold.

## Main 3 — Lie bracket: do the two flows commute?

Now place two vector fields $X, Y$ on the same manifold. The natural question: do their flows commute? Is $\phi^t_X \circ \phi^s_Y$ the same map as $\phi^s_Y \circ \phi^t_X$?

The quantity that measures the answer is the **Lie bracket** $[X, Y]$. In coordinates

$$
[X, Y]^k = X^i\, \partial_i Y^k - Y^i\, \partial_i X^k
$$

and, equivalently, for any smooth function $f: M \to \mathbb{R}$,

$$
[X, Y] f = X(Y f) - Y(X f)
$$

where $X f := X^i \partial_i f$ is the smooth function obtained by letting a vector field act on $f$ as a first-order differential operator. So vector fields can be seen as first-order differential operators, and the commutator of two such operators turns out to be another first-order operator — that operator is exactly $[X, Y]$.

A small worked example. On $\mathbb{R}^2$ take

$$
X = \partial_x, \qquad Y = x\, \partial_y
$$

so $X = (1, 0)$ and $Y = (0, x)$. Plug into the formula: $[X, Y]^1 = 1\cdot\partial_x 0 - 0\cdot\partial_x 1 = 0$, $[X, Y]^2 = 1\cdot\partial_x x - 0\cdot\partial_x 0 = 1$. Therefore

$$
[X, Y] = \partial_y
$$

Geometric meaning: start at a point, flow along $X$ for time $\epsilon$, then along $Y$ for $\epsilon$, then back along $X$ for $\epsilon$, then back along $Y$ for $\epsilon$. If you land exactly where you started, the two flows commute. In general you land at

$$
\phi^{-\epsilon}_Y \circ \phi^{-\epsilon}_X \circ \phi^{\epsilon}_Y \circ \phi^{\epsilon}_X (q_0) \;=\; q_0 + \epsilon^2 [X, Y](q_0) + O(\epsilon^3)
$$

so the leading offset is $\epsilon^2 [X, Y]$. **Non-zero Lie bracket = the flows do not commute.** This single sentence supports every formula about the exterior derivative and the Lie derivative that the next chapter will state.

## In Python

```python
# 2D vector field X(x,y) = (-y, x) (the generator of rotations).
# Integrate from several initial points with a hand-coded RK4
# and overlay the integral curves on plt.streamplot of X — visually
# confirm that the integral curves match the streamlines.
import numpy as np
import matplotlib.pyplot as plt

def X(p):                                  # vector field: rotation generator
    x, y = p
    return np.array([-y, x])

def rk4_step(p, dt):                       # standard 4th-order Runge-Kutta
    k1 = X(p)
    k2 = X(p + 0.5 * dt * k1)
    k3 = X(p + 0.5 * dt * k2)
    k4 = X(p + dt * k3)
    return p + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

dt, T = 0.02, 6.0
N = int(T / dt)
initials = [(1.0, 0.0), (1.5, 0.0), (2.0, 0.0), (0.0, 1.2)]
curves = []
for q0 in initials:                        # one integral curve per initial point
    traj = np.empty((N + 1, 2))
    traj[0] = q0
    for n in range(N):
        traj[n+1] = rk4_step(traj[n], dt)
    curves.append(traj)

# Lay down the streamlines of X, then overlay the RK4 trajectories
gx, gy = np.meshgrid(np.linspace(-2.5, 2.5, 25), np.linspace(-2.5, 2.5, 25))
plt.streamplot(gx, gy, -gy, gx, density=1.0, color="0.7")
for c in curves:
    plt.plot(c[:, 0], c[:, 1])
plt.gca().set_aspect("equal"); plt.xlabel("x"); plt.ylabel("y"); plt.show()
```

The integral curves of a rotation generator should be circles, and the RK4 trajectories overlaid on the streamplot should trace them exactly — if they do, the picture "vector field equals flow" is in hand.

## To the next chapter

[Chapter 6: Differential forms and the exterior derivative](../06-differential-forms/) introduces the objects dual to vector fields — 1-forms and their exterior derivatives. Where the Lie bracket $[X, Y]$ measures how badly two flows fail to commute, the exterior derivative $d\alpha$ measures how badly a 1-form $\alpha$ fails to "close up" around a small loop. Cartan's magic formula, which knots these two notions together, is the destination of the next chapter.
