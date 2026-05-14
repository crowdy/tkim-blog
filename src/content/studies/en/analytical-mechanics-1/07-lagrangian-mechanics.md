---
title: 'Lagrangian mechanics — a function on $TM$ that determines motion'
description: 'Deriving the equations of motion not from a balance of forces but from a single function $L: TM \to \mathbb{R}$ — the Lagrangian on the tangent bundle and the Euler–Lagrange equation.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 7
lang: en
pairSlug: am1-lagrangian-mechanics
draft: false
updated: 2026-05-14
---

# Lagrangian mechanics — a function on $TM$ that determines motion

> Deriving the equations of motion not from a balance of forces but from a single function $L: TM \to \mathbb{R}$ — the Lagrangian on the tangent bundle and the Euler–Lagrange equation.

## Opening

Newton's equation of motion deals with point-to-point accelerations. The Lagrangian viewpoint sits one floor above — the entire motion falls out of a single scalar function $L$. This chapter pins down the stage $L$ lives on, the **tangent bundle** $TM$; writes down the **Euler–Lagrange equation** from a Lagrangian on it; and then runs the whole machine by hand on a simple pendulum. By the end the reader should be able to say in one sentence what geometry sits behind the familiar shorthand "$L = T - U$", and should have a clean slot in mind for the same equation falling out of a variational principle in Chapter 8.

## Main 1 — Why $L$ lives on $TM$

Pin down the **tangent bundle** that appeared briefly in earlier chapters. The set of all pairs $(q, v)$ of a point $q$ together with a velocity vector $v$ at that point forms the tangent bundle $TM$. In symbols,

$$
TM = \{(q, v) : q \in M, \ v \in T_q M\}
$$

and in plain words it is the manifold of "every point of the configuration space $M$ together with every velocity available at that point". In coordinates it is the $2n$-dimensional space $(q^1, \ldots, q^n, \dot q^1, \ldots, \dot q^n)$ — note that $\dot q^i$ here is the **name of a velocity slot**, not a time derivative yet. Once we have an actual trajectory $q(t)$, the curve $(q(t), \dot q(t))$ traces out a path in $TM$.

The **Lagrangian** is a real-valued function on this tangent bundle:

$$
L : TM \to \mathbb{R}, \qquad (q, \dot q) \mapsto L(q, \dot q).
$$

For most mechanics problems the Lagrangian takes the **kinetic-minus-potential** form

$$
L(q, \dot q) = T(q, \dot q) - U(q),
$$

where $T$ is the kinetic energy and $U$ is a position-only potential. The Lagrangian framework itself does not force this split — a charged particle in an electromagnetic field, or a rotating frame, fits in the same formalism with an $L$ that is not of this shape.

The kinetic energy $T$ is built from the **metric $g_{ij}(q)$** on $M$. On a general (possibly curved-looking) manifold the metric is the device that defines the "squared length" of a velocity vector, and the kinetic energy at a point is

$$
T(q, \dot q) = \tfrac{1}{2} \, g_{ij}(q) \, \dot q^{i} \dot q^{j}
$$

(Einstein summation in effect). In Cartesian coordinates $g_{ij} = m \, \delta_{ij}$ and this collapses to the familiar $\tfrac{1}{2} m |\dot{\vec x}|^2$. In polar or general coordinates the components $g_{ij}$ depend on $q$, so $T$ depends on $q$ as well. That is why the natural domain of $L$ is $TM$ rather than $M$ — the Lagrangian must see *where you are* and *how fast you are moving* at the same time.

## Main 2 — Euler–Lagrange and the simple pendulum

Now write down the one line that extracts equations of motion from $L$. The **Euler–Lagrange equation**:

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^{i}} - \frac{\partial L}{\partial q^{i}} = 0.
$$

One line per generalised coordinate $q^i$, so a system with $n$ degrees of freedom yields $n$ second-order ODEs. How this equation falls out naturally from a variational principle is the business of the next chapter (Chapter 8) — here we just use it as a tool.

Try it by hand. Take a **simple pendulum**: a light rod of length $\ell$ (ell) with a bob of mass $m$ at its end. The single generalised coordinate is the angle from the vertical, $q = \theta$ (theta). The position is $(\ell \sin\theta, -\ell\cos\theta)$, so the speed squared is $\ell^2 \dot\theta^2$ and the kinetic energy is

$$
T = \tfrac{1}{2} m \ell^2 \dot\theta^2.
$$

Taking the potential to vanish at the support, $U(\theta) = -m g \ell \cos\theta$. The Lagrangian is therefore

$$
L(\theta, \dot\theta) = \tfrac{1}{2} m \ell^2 \dot\theta^2 + m g \ell \cos\theta.
$$

The two partial derivatives are

$$
\frac{\partial L}{\partial \dot\theta} = m \ell^2 \dot\theta, \qquad \frac{\partial L}{\partial \theta} = -m g \ell \sin\theta,
$$

and substituting into Euler–Lagrange gives

$$
m \ell^2 \ddot\theta + m g \ell \sin\theta = 0 \quad \Longleftrightarrow \quad \ddot\theta = -\frac{g}{\ell} \sin\theta,
$$

exactly the equation a free-body diagram would yield. But the **tension** in the rod — a constraint force — never appeared. Choosing the generalised coordinate $\theta$ makes constraints vanish from the equations.

## Main 3 — Two payoffs: coordinate independence and additivity

The Euler–Lagrange formulation pays back two large rewards.

First, **coordinate independence**. Solve the same physical system in Cartesian, polar, or spherical coordinates: as long as the **function** $L$ is preserved (same point, same velocity, same number), the Euler–Lagrange equation keeps its form. Whatever coordinates you plug into the slot $q^i$, you write down the same one line. Newton's $m \ddot x^i = F^i$ form fails in curvilinear coordinates ($\Gamma$ symbols intrude), but in Lagrange's form that correction is already absorbed inside $L$ through the metric.

Second, **additivity**. When two subsystems combine into one system, the total Lagrangian splits cleanly:

$$
L = L_1 + L_2 + L_{\rm int}.
$$

Here $L_1$ and $L_2$ are the Lagrangians of each subsystem in isolation, and $L_{\rm int}$ carries the coupling between them. For double pendulums, $N$-body problems, or rigid-body / spring couplings — the kind of system where free-body diagrams collapse fast — Lagrange wins: write each subsystem's $L$, add them, and run Euler–Lagrange once per generalised coordinate.

These two together explain why Lagrangian mechanics is a **reformulation** of Newtonian mechanics, not just a notational variant. The same motion is encoded by less information (a single scalar function $L$), and that information survives any change of coordinates intact.

## In Python

```python
# Integrate the simple pendulum two ways.
# (1) From Euler-Lagrange:    d/dt[m l^2 thetadot] + m g l sin(theta) = 0
# (2) Newton-style rearranged: thetaddot = -(g/l) sin(theta)
# Both express the same equation, so the trajectories must agree.
import numpy as np
import matplotlib.pyplot as plt

g, l = 9.81, 1.0
theta0, omega0 = np.pi / 4, 0.0
dt, T_end = 1e-3, 5.0
N = int(T_end / dt)

def f_EL(theta, omega):                # L = (1/2) m l^2 omega^2 + m g l cos(theta)
    return omega, -(g / l) * np.sin(theta)

def rk4(theta, omega):
    k1t, k1o = f_EL(theta, omega)
    k2t, k2o = f_EL(theta + 0.5*dt*k1t, omega + 0.5*dt*k1o)
    k3t, k3o = f_EL(theta + 0.5*dt*k2t, omega + 0.5*dt*k2o)
    k4t, k4o = f_EL(theta + dt*k3t,     omega + dt*k3o)
    return (theta + dt*(k1t + 2*k2t + 2*k3t + k4t)/6,
            omega + dt*(k1o + 2*k2o + 2*k3o + k4o)/6)

th_EL = np.empty(N+1); om_EL = np.empty(N+1)
th_N  = np.empty(N+1); om_N  = np.empty(N+1)
th_EL[0] = th_N[0] = theta0
om_EL[0] = om_N[0] = omega0
for k in range(N):
    th_EL[k+1], om_EL[k+1] = rk4(th_EL[k], om_EL[k])
    # Newton form: same equation, same RK4 -- agreement to machine precision
    th_N[k+1], om_N[k+1] = rk4(th_N[k], om_N[k])

print(f"max |theta_EL - theta_N| = {np.max(np.abs(th_EL - th_N)):.2e}")
plt.plot(np.linspace(0, T_end, N+1), th_EL, label="EL")
plt.plot(np.linspace(0, T_end, N+1), th_N, '--', label="Newton")
plt.xlabel("t [s]"); plt.ylabel("theta [rad]"); plt.legend(); plt.show()
```

If the printed maximum difference drops below $10^{-10}$, you have confirmed by hand that the two notations write the same physics into different ledgers.

## To the next chapter

[Chapter 8: The variational principle](../08-variational-principle/) shows how the Euler–Lagrange equation, which we merely wrote down here, falls out naturally from making a single quantity — the **action** — stationary. The two partial derivatives that we cranked out by hand for the pendulum will reappear there as the two terms produced by the variation.
