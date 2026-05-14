---
title: 'Integrable systems — motion on tori'
description: 'When $n$ mutually commuting conserved quantities exist, motion is confined to an $n$-torus — why Kepler orbits close into ellipses.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 3
lang: en
pairSlug: am2-integrable-systems
draft: false
updated: 2026-05-14
---

# Integrable systems — motion on tori

> When $n$ mutually commuting conserved quantities exist, motion is confined to an $n$-torus — why Kepler orbits close into ellipses.

## Opening

One of the appeals of the Hamiltonian formalism is that "solving the motion" reduces to "finding enough conserved quantities". How many is enough, and what algebraic condition must they satisfy? The complete answer is the **Liouville–Arnold theorem**. By the end of this chapter you should understand that "integrable" is not a vague label but a geometric statement — that phase space is foliated by tori — and you should be able to explain in one line why Kepler orbits close: a hidden conserved vector, the Laplace–Runge–Lenz vector.

## Main 1 — The Liouville–Arnold theorem

For a Hamiltonian system with $n$ degrees of freedom, the phase space is $2n$-dimensional. Write coordinates as $(q_i, p_i)$, $i = 1, \ldots, n$. For two phase-space functions $F, G$, define the **Poisson bracket**

$$
\{F, G\} = \sum_{i=1}^{n} \left( \frac{\partial F}{\partial q_i} \frac{\partial G}{\partial p_i} - \frac{\partial F}{\partial p_i} \frac{\partial G}{\partial q_i} \right)
$$

Two functions are said to be *in involution* when $\{F, G\} = 0$.

Now the definition. A Hamiltonian system on a $2n$-dimensional phase space is **Liouville-integrable** when there exist $n$ smooth, functionally independent functions $F_1, \ldots, F_n$ such that $\{F_i, F_j\} = 0$ for all $i, j$, and one of them is the Hamiltonian $H$ itself.

The Liouville–Arnold theorem says: if the joint level set $\{F_i = c_i\}_{i=1}^{n}$ is compact and connected, then it is diffeomorphic to an $n$-torus $T^n$. Moreover, one can find coordinates — **action–angle variables** $(J_i, \theta_i)$ — in which Hamilton's equations become trivial:

$$
\dot J_i = 0, \qquad \dot \theta_i = \omega_i(J)
$$

Each torus has its own frequency vector $\omega(J)$, and the motion is a uniform straight line winding around it. If the ratios of the $\omega_i$ are rational, the trajectory closes; if irrational, it fills the torus densely.

## Main 2 — Why integrable systems are so rare

Demanding $n$ globally commuting conserved quantities is a very strong condition. A generic Hamiltonian has no conserved quantity other than $H$ itself. Integrability is therefore a **non-generic property**, and arbitrarily small perturbations can destroy it.

Despite this, the short list of physically important integrable models is remarkably powerful: the free particle, the harmonic oscillator at any number of degrees of freedom, the Kepler problem, the free Euler rotation of a rigid body, and one-dimensional many-body models such as the Calogero–Moser system. The brevity of this list is itself a message — the models we can solve in closed form are, viewed against the full space of Hamiltonians, a measure-zero exception.

Chapter 4's KAM theorem (Kolmogorov–Arnold–Moser) will quantify just how fragile integrability is. Some tori survive a perturbation, others dissolve into chaos, and the boundary depends on the number-theoretic properties of the frequency ratios. That is the trailer.

## Main 3 — Kepler's hidden symmetry

The three-dimensional Kepler Hamiltonian is

$$
H = \frac{|\vec p|^2}{2m} - \frac{k}{r}
$$

with $k > 0$ and $r = |\vec r|$. The obvious conserved quantities are the energy $E$, the squared angular-momentum magnitude $|\vec L|^2$, and the $z$-component $L_z$ — three quantities, in a three-degree-of-freedom system, already enough to meet the Liouville condition.

But Kepler has *one more*. The **Laplace–Runge–Lenz vector**

$$
\vec A = \vec p \times \vec L - m k \, \frac{\vec r}{r}
$$

is conserved along every Kepler trajectory. It points along the major axis of the elliptical orbit, toward perihelion. A generic central force — any power other than $1/r$ — does not have this extra invariant, and its orbits *precess* instead of closing. The fact that Kepler orbits are perfectly closed ellipses, returning to the same point every $2\pi$, is a direct consequence of this hidden symmetry. We state this without proof and verify it numerically below.

## In Python

```python
# 2D Kepler: m=k=1, hand-rolled RK4, draw a closed ellipse.
import numpy as np
import matplotlib.pyplot as plt

m, k = 1.0, 1.0

def accel(r):
    # gravitational acceleration: -k * r / |r|^3
    return -k * r / np.linalg.norm(r)**3

def rhs(state):
    r, v = state[:2], state[2:]
    return np.concatenate([v, accel(r) / m])

def rk4_step(s, dt):
    k1 = rhs(s)
    k2 = rhs(s + 0.5*dt*k1)
    k3 = rhs(s + 0.5*dt*k2)
    k4 = rhs(s + dt*k3)
    return s + (dt/6.0) * (k1 + 2*k2 + 2*k3 + k4)

dt, T = 0.005, 30.0
N = int(T / dt)
s = np.array([1.0, 0.0, 0.0, 0.8])  # r0=(1,0), v0=(0,0.8)
traj = np.empty((N+1, 4)); traj[0] = s
for i in range(N):
    s = rk4_step(s, dt); traj[i+1] = s

def E_L_A(s):
    r, v = s[:2], s[2:]
    rn = np.linalg.norm(r)
    p = m * v
    E = 0.5*m*np.dot(v, v) - k/rn
    Lz = r[0]*v[1] - r[1]*v[0]            # 2D angular momentum (z component)
    A = np.array([p[1]*Lz, -p[0]*Lz]) - m*k*r/rn  # LRL vector
    return E, Lz, A

E0, L0, A0 = E_L_A(traj[0])
E1, L1, A1 = E_L_A(traj[-1])
print(f"E:  {E0:+.8f} -> {E1:+.8f}")
print(f"Lz: {L0:+.8f} -> {L1:+.8f}")
print(f"A:  {A0} -> {A1}")

plt.plot(traj[:,0], traj[:,1]); plt.axis('equal')
plt.xlabel('x'); plt.ylabel('y'); plt.title('Kepler orbit')
plt.show()
```

If $E$ and $L_z$ are conserved to within about $10^{-6}$, and the two components of $\vec A$ likewise stay essentially fixed, you have touched the conservation of the Laplace–Runge–Lenz vector with your own hands. The orbit plot should be a closed ellipse: after one period the trajectory returns exactly to its starting point.

## To the next chapter

In [chapter 4: perturbation theory](../04-perturbation-theory/) we watch what happens when integrability breaks. Under a small perturbation, which tori (labelled by the rationality of their frequency ratios) survive and which dissolve into a sea of chaos? That is the content of the KAM theorem, and the proper answer to the question of what the integrable idealization actually teaches us.
