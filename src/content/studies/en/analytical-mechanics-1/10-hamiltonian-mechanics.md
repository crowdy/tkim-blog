---
title: 'Hamiltonian mechanics — pivoting to phase space'
description: 'The Legendre transform turns the Lagrangian into the Hamiltonian, the stage moves from the configuration space $M$ to the cotangent bundle $T^*M$, and motion is rewritten as $2n$ first-order Hamilton equations.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 10
lang: en
pairSlug: am1-hamiltonian-mechanics
draft: false
updated: 2026-05-14
---

# Hamiltonian mechanics — pivoting to phase space

> The Legendre transform turns the Lagrangian into the Hamiltonian, the stage moves from the configuration space $M$ to the cotangent bundle $T^*M$, and motion is rewritten as $2n$ first-order Hamilton equations.

## Opening

Until now we drew motion on the tangent bundle $TM$ of the configuration space $M$ — that is, with coordinates and *velocities* $(q, \dot q)$ as variables, in the Lagrangian picture. This chapter swaps the stage. Replacing velocity $\dot q$ with the conjugate momentum $p$ and moving onto the *cotangent bundle* $T^*M$, the equations of motion rewrite themselves as a symmetric first-order system. That one change of coordinates is the key that unlocks the canonical transformations of chapter 11, the Poisson bracket of chapter 12, and even the phase-space intuition of quantum mechanics.

## Main 1 — Conjugate momentum and the Legendre transform

Given a Lagrangian $L(q, \dot q, t)$, the **conjugate momentum** to the $i$-th coordinate $q^i$ is

$$
p_i \;=\; \frac{\partial L}{\partial \dot q^i}
$$

For a single particle with $L = \tfrac12 m \dot q^2 - U(q)$ this is $p = m\dot q$ — the familiar linear momentum — but in general the meaning depends on the choice of coordinates (angular momentum for an angular coordinate, with extra correction terms in a rotating frame).

We now want to use $(q, p)$ as new coordinates rather than keeping $p$ as a function of $(q, \dot q)$. That requires solving the relation above for $\dot q$, and the condition that guarantees solvability is **regularity**: the Hessian

$$
\frac{\partial^2 L}{\partial \dot q^i\, \partial \dot q^j}
$$

is invertible at every point. By the implicit function theorem we then get $\dot q^i = \dot q^i(q, p, t)$ uniquely. Under this assumption we define the **Hamiltonian** as

$$
H(q, p, t) \;=\; p_i\, \dot q^i(q, p, t) \;-\; L\bigl(q,\, \dot q(q, p, t),\, t\bigr)
$$

(Einstein summation). This is the **Legendre transform** of $L$ with respect to $\dot q$ — the classical move of swapping the graph of a function for the slopes of its tangent lines as the new coordinate.

Concretely, with $L = \tfrac12 m\dot q^2 - U(q)$ we get $p = m\dot q$, $\dot q = p/m$, and

$$
H = p\cdot \frac{p}{m} - \Bigl(\frac12 m \frac{p^2}{m^2} - U\Bigr) = \frac{p^2}{2m} + U(q)
$$

namely the sum of kinetic and potential energy — the total energy. For simple systems the Hamiltonian *is* the energy, but in a rotating frame or with a magnetic field the two part ways; we revisit that distinction in chapter 12.

## Main 2 — Hamilton's equations and the phase space $T^*M$

Now rewrite the equations of motion in the new coordinates $(q, p)$. Differentiating the definition of $H$ and using the Euler–Lagrange equations, the partial derivatives of $H$ deliver the motion directly.

$$
\dot q^i = \frac{\partial H}{\partial p_i}, \qquad \dot p_i = -\frac{\partial H}{\partial q^i}
$$

These are **Hamilton's equations**. The $n$ *second*-order ODEs of the Lagrangian side become $2n$ *first*-order ODEs, and position and momentum enter almost symmetrically — up to a single sign.

The stage on which motion unfolds shifts too. If at each point $q \in M$ the tangent vector $\dot q$ lived in the tangent space $T_qM$, then the **cotangent space** $T_q^*M$ is its dual — the space of linear functionals that send tangent vectors to real numbers. The conjugate momentum $p = p_i\, dq^i$ is naturally an element of $T_q^*M$. Assembling all the cotangent spaces over every $q$ gives a manifold $T^*M$ called the **cotangent bundle**, and this is the **phase space** of Hamiltonian mechanics. Its dimension is $2n$ when $\dim M = n$.

That $T^*M$ is not just a twin of $TM$ becomes clear in chapter 11. Phase space carries a coordinate-independent natural 2-form

$$
\omega \;=\; dq^i \wedge dp_i
$$

inscribed on it (called the **symplectic form**), and Hamilton's equations are the flow of the vector field that this $\omega$ and the function $H$ together produce. For now we only deposit the name; the next chapter, on canonical transformations, will show why this form is preserved.

## Main 3 — Phase portrait of the pendulum

The strength of the Hamiltonian picture is that even when a nonlinear system has no closed-form integral, the *picture* is still drawable. Take the pendulum. The coordinate is the angle $\theta \in [-\pi, \pi]$ (a circle with the endpoints identified), and the conjugate momentum is $p = m\ell^2 \dot\theta$. The Legendre transform of $L = \tfrac12 m\ell^2 \dot\theta^2 + m g \ell \cos\theta$ is

$$
H(\theta, p) = \frac{p^2}{2 m \ell^2} - m g \ell \cos\theta
$$

and since $H$ itself is conserved, every trajectory lives on a level curve $H = E$. Three regimes appear depending on $E$.

- $E < m g \ell$: closed loops around the origin (the lower equilibrium) — oscillation.
- $E = m g \ell$: a pair of curves asymptotic to the unstable equilibrium $\theta = \pm\pi$ — the **separatrix**. Reaching it takes infinite time.
- $E > m g \ell$: open curves winding monotonically in $\theta$ — rotation.

Solving $H = m g \ell$ for $p$ gives the separatrix $p = \pm \sqrt{2 m^2 \ell^3 g\,(1 + \cos\theta)}$. In units with $m = \ell = g = 1$ this simplifies to $p = \pm\sqrt{2(1 + \cos\theta)}$. Compared with the same picture drawn in Lagrangian coordinates $(\theta, \dot\theta)$, the phase-space portrait makes one point obvious at a glance: the level curves of the conserved energy *are* the trajectories.

## In Python

```python
# Pendulum phase portrait: integrate Hamilton's equations with hand-rolled RK4
# and draw 15 trajectories in the (theta, p) plane. Dashed E=1 = separatrix.
import numpy as np
import matplotlib.pyplot as plt

def rhs(s):                                # Hamilton's eqs (m=l=g=1)
    th, p = s                              # dH/dp = p, -dH/dth = -sin(th)
    return np.array([p, -np.sin(th)])

def rk4_step(s, dt):
    k1 = rhs(s)
    k2 = rhs(s + 0.5 * dt * k1)
    k3 = rhs(s + 0.5 * dt * k2)
    k4 = rhs(s + dt * k3)
    return s + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

dt, T = 0.02, 20.0
N = int(T / dt)

fig, ax = plt.subplots(figsize=(7, 4))
for E in (0.2, 0.6, 1.0, 1.4, 1.8):        # sweep energies on a grid
    for th0 in (-2.0, 0.0, 2.0):           # three initial angles
        val = 2 * (E + np.cos(th0))        # p0^2 = 2(E + cos th0)
        if val < 0:                        # skip energetically forbidden seeds
            continue
        s = np.array([th0, np.sqrt(val)])
        traj = np.empty((N + 1, 2)); traj[0] = s
        for n in range(N):
            traj[n+1] = rk4_step(traj[n], dt)
        ax.plot(traj[:, 0], traj[:, 1], lw=0.7)

th = np.linspace(-np.pi, np.pi, 400)        # separatrix E=1
ax.plot(th,  np.sqrt(2*(1 + np.cos(th))), "k--", lw=1)
ax.plot(th, -np.sqrt(2*(1 + np.cos(th))), "k--", lw=1)
ax.set_xlabel(r"$\theta$"); ax.set_ylabel(r"$p$"); plt.show()
```

Closed loops in the oscillation region, open curves drifting up or down in the rotation region, and the dashed separatrix dividing them — once all three appear on the same canvas, the phase-space picture is in hand.

## To the next chapter

[Chapter 11: Canonical transformations and the symplectic structure](../11-canonical-transformations/) takes the symplectic form $\omega = dq^i \wedge dp_i$, dropped at the end of Main 2 with only its name, and asks how it behaves under changes of coordinates. Transformations that preserve $\omega$ are called **canonical**, and the fact that this single class of transformations preserves the form of Hamilton's equations is what underwrites the Poisson bracket of chapter 12 and the Hamilton–Jacobi equation of chapter 13.
