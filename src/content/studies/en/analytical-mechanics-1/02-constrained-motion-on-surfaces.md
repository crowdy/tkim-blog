---
title: 'Constrained motion on surfaces — constraints and Lagrange multipliers'
description: 'A bead lives on the hoop and nowhere else — how a constraint trims the degrees of freedom, and how a Lagrange multiplier reveals the constraint force itself.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 2
lang: en
pairSlug: am1-constrained-motion
draft: false
updated: 2026-05-14
---

# Constrained motion on surfaces — constraints and Lagrange multipliers

> A bead lives on the hoop and nowhere else — how a constraint trims the degrees of freedom, and how a Lagrange multiplier reveals the constraint force itself.

## Opening

When we tidied up Newtonian mechanics in chapter 1, we assumed a particle drifts freely through three-dimensional space. Most real problems are not like that. A bead is stuck on a wire hoop, a pendulum bob hangs at the end of a string of fixed length, and a coin rolls along a floor without slipping. In this chapter we split such **constraints** into two flavours and then spend most of our time on the more common kind — **holonomic** constraints — using motion on the sphere $S^2$ as a working picture. Along the way we get a preview of the **Lagrange multiplier**, which chapter 7 will treat formally, and we will see that it is not merely a bookkeeping trick: it measures the *constraint force itself*.

## Main 1 — Two flavours of constraint

Constraints fall into two formal families.

A **holonomic constraint** is an equation that involves only the coordinates (and possibly time),

$$
f(q, t) = 0,
$$

where $q = (q^1, \dots, q^n)$ is the bundle of generalized coordinates. One such equation removes one dimension from the configuration space — the set of allowed positions. A bead on a planar circular hoop of radius $R$, for example, satisfies $f(x, y) = x^2 + y^2 - R^2 = 0$, which collapses the plane down to a one-dimensional curve. Likewise a point on the unit sphere $S^2$ satisfies $x^2 + y^2 + z^2 = 1$, sending three dimensions down to a two-dimensional surface.

A **nonholonomic constraint** is instead a linear condition on the velocities,

$$
\sum_i a_i(q)\, \dot q^i = 0,
$$

that **cannot be integrated into a relation among the coordinates alone**. There is no $f(q) = 0$ that captures it. The textbook example is a coin rolling without slipping on a plane: the coin can reach any point of the plane (the configuration space is not trimmed), but the *direction* of its velocity at each instant is locked to the way it is rolling. We will treat only holonomic constraints in this chapter. Most constraints you meet in a mechanics textbook are of that kind, and nonholonomic systems read more cleanly as a separate section after chapter 7.

## Main 2 — Bead on a hoop, from start to finish

A bead of mass $m$ slides on a *vertical* circular hoop of radius $R$ under gravity of magnitude $g$. Pick the *angle measured from the bottom of the hoop*, $\theta$ (theta), as the single coordinate. Then

$$
x = R\sin\theta, \qquad y = R(1 - \cos\theta),
$$

and the kinetic and potential energies fall out immediately:

$$
T = \tfrac{1}{2} m R^2 \dot\theta^2, \qquad V = m g R (1 - \cos\theta).
$$

Chapter 7 introduces the Lagrangian $L = T - V$ properly; here we borrow the result. The constant $mgR$ does not affect the equation of motion, so dropping it leaves

$$
L = \tfrac{1}{2} m R^2 \dot\theta^2 + m g R \cos\theta.
$$

Substituting this into the **Euler–Lagrange equation**

$$
\frac{d}{dt}\!\left( \frac{\partial L}{\partial \dot\theta} \right) - \frac{\partial L}{\partial \theta} = 0
$$

gives $m R^2 \ddot\theta + m g R \sin\theta = 0$, that is,

$$
\ddot\theta + \frac{g}{R} \sin\theta = 0.
$$

This is just the **pendulum equation**. What began as a three-DOF problem in $(x, y, z)$ with two constraint equations attached has, by a single well-chosen generalized coordinate, become a one-DOF problem with no constraints in sight. This is the scene that first hooks students on the Lagrangian formalism — the constraints are *solved algebraically and made to vanish*.

## Main 3 — What a Lagrange multiplier actually points to

Switching to a generalized coordinate makes the constraint force disappear from the equations. But sometimes you want exactly that force — for example, the *normal force* the hoop exerts on the bead, so you can ask whether the hoop will hold.

In that case you keep the redundant coordinates $(x, y)$ and impose the constraint $f(x, y) = x^2 + y^2 - R^2 = 0$ separately. You add a single term to the equation of motion,

$$
m \ddot{\mathbf{r}} = -\nabla V + \lambda\, \nabla f,
$$

where $\lambda$ (lambda) is the **Lagrange multiplier**. Since $\nabla f$ is the vector normal to the constraint surface, the added term $\lambda \nabla f$ points along the surface normal — exactly the direction of the normal force we were trying to extract. Its magnitude, signed, is precisely $\lambda$.

In other words, the multiplier is not just a mathematical aide brought in to enforce $f = 0$; it is the *amplitude of the constraint force* itself, a physical quantity in its own right. The formal derivation lives in chapter 7, *Variational principles and constraints*. For now keep one line in mind: a Lagrange multiplier is the size of the constraint force.

## In Python

```python
# Bead on a hoop: integrate theta_ddot = -(g/R) sin(theta) with hand-rolled RK4.
import numpy as np
import matplotlib.pyplot as plt

g, R = 9.81, 0.2
dt, T_end = 1e-3, 4.0
N = int(T_end / dt)

def f(state):
    th, om = state
    return np.array([om, -(g / R) * np.sin(th)])

state = np.array([np.pi / 3, 0.0])   # theta0 = 60 deg, released from rest
ts = np.linspace(0, T_end, N + 1)
ths = np.empty(N + 1)
oms = np.empty(N + 1)
ths[0], oms[0] = state

for i in range(N):
    k1 = f(state)
    k2 = f(state + 0.5 * dt * k1)
    k3 = f(state + 0.5 * dt * k2)
    k4 = f(state + dt * k3)
    state = state + (dt / 6) * (k1 + 2*k2 + 2*k3 + k4)
    ths[i + 1], oms[i + 1] = state

fig, ax = plt.subplots(2, 1, sharex=True)
ax[0].plot(ts, ths); ax[0].set_ylabel(r'$\theta$ [rad]')
ax[1].plot(ts, oms); ax[1].set_ylabel(r'$\dot\theta$ [rad/s]')
ax[1].set_xlabel('t [s]')
plt.tight_layout(); plt.show()
```

The trajectory closes one period and returns to the same amplitude. For a small initial angle the curve would look almost sinusoidal, but at $\theta_0 = \pi/3$ you can see a faint **anharmonicity** — the peaks flatten slightly. That is the nonlinearity of $\sin\theta$ making itself felt.

## To the next chapter

[Chapter 3: tensors and the covariant derivative](../03-tensors-and-covariant-derivative/) gives the surface we have been drawing — a smooth space of reduced dimension — its proper name (*manifold*) and then asks how to differentiate a vector on it in a way that does not depend on the choice of coordinates. The fact that a Lagrangian gives the same equations of motion under any change of coordinates will turn out to be no accident.
