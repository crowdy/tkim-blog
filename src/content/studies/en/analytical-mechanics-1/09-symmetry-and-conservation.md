---
title: "Symmetry and conservation — Noether's theorem"
description: 'If the Lagrangian is invariant under a continuous transformation, exactly one conserved quantity drops out along every trajectory for each such transformation.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 9
lang: en
pairSlug: am1-symmetry-conservation
draft: false
updated: 2026-05-14
---

# Symmetry and conservation — Noether's theorem

> If the Lagrangian is invariant under a continuous transformation, exactly one conserved quantity drops out along every trajectory for each such transformation.

## Opening

So far we have extracted the Euler–Lagrange equations from a Lagrangian $L(q, \dot q, t)$ and seen them as the flow of a vector field on a manifold. This chapter is about the one-line theorem — Emmy Noether's 1918 result — that turns every **symmetry** of $L$ into a **conserved quantity**. After this chapter the reader should be able to explain in a single paragraph that conservation of linear momentum, angular momentum, and energy all fall out of the same machine, and should experience how a fact like "central-force motion is planar" — previously hard to motivate — is summed up by one word: symmetry.

## Main 1 — Noether's theorem

On the configuration space with coordinates $q = (q^1, \ldots, q^n)$, take a **one-parameter transformation**

$$
q^i \to q^i + \epsilon\, \xi^i(q)
$$

where $\epsilon$ (epsilon) is a small real parameter and $\xi^i(q)$ (xi) are smooth component functions. We call this transformation a **symmetry** of the Lagrangian when, to first order in $\epsilon$,

$$
\delta L = L(q + \epsilon\xi, \dot q + \epsilon\dot\xi, t) - L(q, \dot q, t) = 0 + O(\epsilon^2),
$$

with $\dot\xi^i = (\partial \xi^i / \partial q^j)\, \dot q^j$.

**Noether's theorem.** Under this hypothesis the quantity

$$
J = \frac{\partial L}{\partial \dot q^i}\, \xi^i(q)
$$

is constant in time along any solution of the Euler–Lagrange equations: $dJ/dt = 0$.

The proof fits in one paragraph. Expand $\delta L$ to first order:

$$
\delta L = \frac{\partial L}{\partial q^i}\, \epsilon \xi^i + \frac{\partial L}{\partial \dot q^i}\, \epsilon \dot\xi^i.
$$

The left side vanishes by hypothesis. On the right, substitute the Euler–Lagrange equation $\partial L / \partial q^i = (d/dt)(\partial L / \partial \dot q^i)$ on-shell (i.e. along a solution) into the first term; the two terms then collapse into a single total time derivative, namely $\epsilon \cdot dJ/dt$. Hence $dJ/dt = 0$. The entire **symmetry $\to$ conservation** machine is contained in that line.

## Main 2 — Three classical examples

The same theorem produces all the familiar conservation laws in one stroke.

**(a) Spatial translation $\vec x \to \vec x + \epsilon \hat n$.** When the Lagrangian does not depend on absolute position $\vec x$ — as for a free particle or a closed many-body system — we have $\xi^i = \hat n^i$. Noether's $J$ becomes $J = (\partial L / \partial \dot x^i)\, \hat n^i = \vec p \cdot \hat n$, so the component of **linear momentum** along $\hat n$ is conserved. Choosing three independent directions gives all of $\vec p$.

**(b) Rotation about the axis $\hat n$.** An infinitesimal rotation is $\delta \vec r = \epsilon\, \hat n \times \vec r$, so $\xi^i = (\hat n \times \vec r)^i$. Noether's $J$ is

$$
J = \vec p \cdot (\hat n \times \vec r) = \hat n \cdot (\vec r \times \vec p) = \vec L \cdot \hat n,
$$

where $\vec L = \vec r \times \vec p$ is the **angular momentum**. If $L$ is invariant under rotations about $\hat n$, then $\vec L \cdot \hat n$ is conserved.

**(c) Time translation $t \to t + \epsilon$.** When $L$ has no explicit time dependence ($\partial L / \partial t = 0$), the same argument cannot be applied verbatim, but the same spirit yields conservation of

$$
H = \frac{\partial L}{\partial \dot q^i}\, \dot q^i - L,
$$

the **Hamiltonian** — in the standard case the energy of the system. This example is slightly different from (a) and (b): the transformation moves the time parameter rather than the coordinates, so it is cleaner to treat it as a symmetry of the **action functional** rather than of $L$ evaluated at a fixed time. The proper treatment is deferred to chapter 10.

## Main 3 — Central force and $SO(3)$ symmetry

Consider a 3D particle in a central potential, with Lagrangian

$$
L = \tfrac{1}{2}\, m\, |\dot{\vec r}|^2 - U(|\vec r|).
$$

Because $U$ depends only on $|\vec r|$, rotating $\vec r$ by any $R \in SO(3)$ leaves $|\vec r|$ and $|\dot{\vec r}|^2$ unchanged. In other words, $L$ is invariant under **every** rotation. Applying example (b) to three independent choices of $\hat n$ conserves all three components of angular momentum:

$$
\frac{d\vec L}{dt} = 0, \qquad \vec L = \vec r \times m \vec v.
$$

From this one line the planarity of Kepler orbits follows. Since $\vec L$ is a fixed vector, at every time $t$ we have $\vec r(t) \cdot \vec L = 0$ — so the motion is trapped in the plane perpendicular to $\vec L$. Even before the orbit is shown to be an ellipse, **the fact that the motion lies in a plane is the direct corollary of rotational symmetry**.

## In Python

```python
# Kepler problem (m=1, U=-1/r): verify L = r × v is conserved
# by integrating with hand-rolled RK4. Pass if relative drift < 1e-6.
import numpy as np

def accel(r):                                  # gravitational acceleration (GM=1)
    return -r / np.linalg.norm(r)**3

def rhs(state):                                # state = (r, v) in 6D
    r, v = state[:3], state[3:]
    return np.concatenate([v, accel(r)])

def rk4_step(s, dt):                           # standard 4th-order Runge-Kutta
    k1 = rhs(s)
    k2 = rhs(s + 0.5 * dt * k1)
    k3 = rhs(s + 0.5 * dt * k2)
    k4 = rhs(s + dt * k3)
    return s + dt * (k1 + 2*k2 + 2*k3 + k4) / 6

r0 = np.array([1.0, 0.0, 0.0])                 # initial position
v0 = np.array([0.0, 0.9, 0.0])                 # initial velocity -> elliptic orbit
state = np.concatenate([r0, v0])

dt, T = 0.005, 10.0
N = int(round(T / dt))
checkpoints = {int(round(t / dt)): t for t in (0.0, 2.5, 5.0, 7.5, 10.0)}
L0 = np.linalg.norm(np.cross(r0, v0))          # initial |L|

for n in range(N + 1):
    if n in checkpoints:                       # print |L| at five times
        r, v = state[:3], state[3:]
        L = np.linalg.norm(np.cross(r, v))
        drift = abs(L - L0) / L0
        print(f"t={checkpoints[n]:4.1f}  |L|={L:.10f}  rel.drift={drift:.2e}")
    state = rk4_step(state, dt)
```

If $|\vec L|$ matches its initial value to six decimals or better at all five checkpoints, then the Noether machine that turns rotational symmetry into a conservation law produces the same answer on a computer that it does on paper.

## To the next chapter

[Chapter 10: Hamiltonian mechanics](../10-hamiltonian-mechanics/) treats the time-translation symmetry and energy conservation that we deferred in Main 2 (c). Introducing the Legendre transform from the Lagrangian to the Hamiltonian cleans up the picture of flows and conserved quantities on phase space in a single stroke. Noether's theorem returns there in the company of the Poisson bracket.
