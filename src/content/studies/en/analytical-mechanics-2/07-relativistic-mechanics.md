---
title: 'Relativistic mechanics — 4-vectors and the free-particle Lagrangian'
description: 'Make proper time the action and the free-particle Lagrangian falls out in one line — that single line then yields both $E^2 = p^2 + m^2$ and Newtonian mechanics in one stroke.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 7
lang: en
pairSlug: am2-relativistic-mechanics
draft: false
updated: 2026-05-14
---

# Relativistic mechanics — 4-vectors and the free-particle Lagrangian

> Make proper time the action and the free-particle Lagrangian falls out in one line — that single line then yields both $E^2 = p^2 + m^2$ and Newtonian mechanics in one stroke.

## Opening

The Lagrangian $L = \tfrac{1}{2} m v^2 - V$ that has carried us so far is clean under Galilean transformations but breaks under Lorentz transformations. This chapter rebuilds the skeleton so it respects the principle of relativity. Throwing a single Lorentz invariant — the **proper time** — into the action fixes the free-particle Lagrangian automatically, and from that one line we read off the 4-momentum, the mass–energy relation, and the Newtonian equations of motion in the low-velocity limit. When chapter 8 moves on to field theory, the same prescription — "build the action out of a Lorentz invariant" — lifts straight up to infinitely many degrees of freedom. Throughout this chapter we work in natural units $c = 1$ and restore SI units only for the final numerical table.

## Main 1 — Proper time and the 4-velocity

Write a particle's worldline in Minkowski spacetime as a 4-tuple $x^\mu = (t, \vec x)$. Here $\mu$ (mu) is the spacetime index running over $0, 1, 2, 3$. The invariant interval between two neighbouring events is

$$
d\tau^2 = dt^2 - |d\vec x|^2,
$$

and this $\tau$ (tau) is called the **proper time** — the time read by a clock the particle *itself* carries. The crucial property is that every inertial observer assigns the same numerical value to it.

Reparametrising in terms of the lab time $t$ brings in the 3-velocity $\vec v = d\vec x/dt$, and

$$
d\tau = dt\, \sqrt{1 - v^2},
$$

which forces the familiar factor

$$
\gamma \equiv \frac{dt}{d\tau} = \frac{1}{\sqrt{1 - v^2}}.
$$

$\gamma$ (gamma) is the rate at which lab time accumulates relative to proper time; it diverges as $v \to 1$.

Define the **4-velocity** as the derivative with respect to proper time,

$$
u^\mu = \frac{dx^\mu}{d\tau} = (\gamma, \, \gamma \vec v).
$$

Multiplying by the mass $m$ gives the **4-momentum** $p^\mu = m u^\mu = (\gamma m, \gamma m \vec v)$. The zero-component is the quantity we will call energy, $E = \gamma m$, and the spatial three components form the relativistic momentum $\vec p = \gamma m \vec v$.

## Main 2 — Free-particle Lagrangian and $E^2 = p^2 + m^2$

The power of the Lagrangian recipe lies in the demand that **the action be invariant under coordinate transformations**. The simplest quantity automatically invariant under Lorentz transformations is the proper time itself, so we postulate

$$
S = -m \int d\tau
$$

for a free particle. The sign and the overall factor $m$ will be justified shortly. Rewriting the action in terms of the lab time via $d\tau = dt/\gamma = dt\sqrt{1-v^2}$ gives

$$
S = -m \int dt\, \sqrt{1 - v^2}, \qquad L = -m\sqrt{1 - v^2}.
$$

This is the relativistic free-particle Lagrangian. It depends only on the velocity, not on the coordinates, so the conjugate momentum is read off by direct differentiation:

$$
p_i = \frac{\partial L}{\partial v^i} = \frac{m v^i}{\sqrt{1 - v^2}} = m \gamma v^i.
$$

As expected, this is exactly the spatial part of the 4-momentum. The Legendre transform produces the Hamiltonian

$$
H = p_i v^i - L = \frac{m v^2}{\sqrt{1 - v^2}} + m\sqrt{1 - v^2} = \frac{m}{\sqrt{1 - v^2}} = m\gamma = E,
$$

confirming that the energy is precisely the zero-component of the 4-momentum. Finally, using $E = \gamma m$ and $\vec p = \gamma m \vec v$ together with $\gamma^2(1 - v^2) = 1$ to eliminate $\gamma$ yields the one-line identity

$$
E^2 = |\vec p|^2 + m^2.
$$

(Restoring units, $E^2 = (pc)^2 + (mc^2)^2$.) At rest, $\vec p = 0$, so $E = m$, i.e. $E = mc^2$ — Einstein's relation drops out of the Lagrangian formalism as a by-product.

## Main 3 — Newtonian limit and rest energy

Expanding $L = -m\sqrt{1 - v^2}$ for $v^2 \ll 1$ gives

$$
L = -m + \tfrac{1}{2} m v^2 + \tfrac{1}{8} m v^4 + O(v^6).
$$

The first term, $-m$, is a velocity-independent constant; it drops out of the Euler–Lagrange equations $\frac{d}{dt}\frac{\partial L}{\partial v^i} - \frac{\partial L}{\partial x^i} = 0$ entirely. From the standpoint of equations of motion the term is invisible. It *does*, however, survive in the energy and shows up there as the rest energy $E_0 = m$ (in SI, $mc^2$).

The second term, $\tfrac{1}{2} m v^2$, is exactly the Newtonian kinetic energy. The third term, $\tfrac{1}{8} m v^4$, is the first relativistic correction: at $v/c \approx 0.1$ it already produces a $\sim 0.4\%$ deviation. So the relativistic Lagrangian connects *smoothly* to Newtonian mechanics while carrying along the new piece of information called rest energy. When chapter 8 writes down a Lagrangian for a field, exactly the same principle — *integrate an invariant* — does the work.

## In Python

```python
# Tabulate gamma, pc, E, KE for an electron (m c^2 = 0.511 MeV)
# and verify E^2 - (pc)^2 = (mc^2)^2 on the last row.
import numpy as np

mc2 = 0.511  # electron rest energy [MeV]
beta = np.array([0.1, 0.3, 0.5, 0.7, 0.9, 0.99, 0.999])  # v/c

gamma = 1.0 / np.sqrt(1.0 - beta**2)
E = gamma * mc2                # total energy [MeV]
pc = gamma * beta * mc2        # momentum * c [MeV]
KE = E - mc2                   # kinetic energy [MeV]

print(f"{'v/c':>7} {'gamma':>10} {'pc [MeV]':>12} {'E [MeV]':>12} {'KE [MeV]':>12}")
for b, g, p, e, k in zip(beta, gamma, pc, E, KE):
    print(f"{b:>7.3f} {g:>10.4f} {p:>12.5f} {e:>12.5f} {k:>12.5f}")

# Check the dispersion relation on the last row
inv = E[-1]**2 - pc[-1]**2     # should equal (mc^2)^2
print(f"\nE^2 - (pc)^2 = {inv:.8f}  vs  (mc^2)^2 = {mc2**2:.8f}")
print(f"relative error = {abs(inv - mc2**2) / mc2**2:.2e}")
```

The last two printed lines should agree to floating-point precision. At $v/c = 0.999$ one finds $\gamma \approx 22.4$ and $E \approx 11.4$ MeV, so the kinetic energy is roughly twenty-two times the rest energy — directly visible in the table.

## To the next chapter

[Chapter 8: Noether's theorem in field theory](../08-noether-in-field-theory/) lifts the recipe of this chapter — "integrate a Lorentz invariant to obtain an action" — to infinitely many degrees of freedom. Just as conservation of 4-momentum for a single particle was the shadow of spacetime translation symmetry, in field theory the energy–momentum tensor will drop out of the same place automatically. That bridge is the field-theoretic generalisation of Noether's theorem.
