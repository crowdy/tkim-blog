---
title: 'Variational principle — paths that make the action stationary'
description: 'The functional $S[q] = \int L\,dt$ assigns a number to each path, and the one line that physical trajectories are its stationary points carries mechanics all the way to fields and quantum theory.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 8
lang: en
pairSlug: am1-variational-principle
draft: false
updated: 2026-05-14
---

# Variational principle — paths that make the action stationary

> The functional $S[q] = \int L\,dt$ assigns a number to each path, and the one line that physical trajectories are its stationary points carries mechanics all the way to fields and quantum theory.

## Opening

Through chapter 7 we treated the Lagrangian $L(q, \dot q, t)$ and its Euler–Lagrange equation in the language of vector fields and differential forms on a manifold. This chapter takes one more step backwards and asks where that equation comes from. The answer is a single number: the **action**. By the end of the chapter the reader should be able to state Hamilton's principle precisely — physical trajectories are paths that make the action *stationary* — and to derive the Euler–Lagrange equation from $\delta S = 0$ with pen and paper. The reader should also be able to summarise in one paragraph why this is not merely a repackaging but the only universal formulation of mechanics we know: coordinate-free, additive across subsystems, and extending cleanly to fields, gauge theories, and the path integral.

## Main 1 — Action as a functional

A **functional** is a map that *eats a function and returns a number*. Whereas an ordinary function $q: \mathbb{R} \to \mathbb{R}^n$ sends a point $t$ to a point $q(t)$, a functional sends an entire *function* to a single number. Examples: the length of a curve $\ell[\gamma] = \int |\dot\gamma|\, dt$, or the integral of a scalar field $\int_\Omega f\, dV$. In every case, a function goes in, one number comes out.

The protagonist of analytical mechanics is the **action**, a particular functional. For two instants $t_1, t_2$ and a smooth path $q: [t_1, t_2] \to M$ on the configuration manifold,

$$
S[q] = \int_{t_1}^{t_2} L\bigl(q(t),\, \dot q(t),\, t\bigr)\, dt
$$

The units of $S$ are those of $L$ times seconds, i.e. energy times time, which in SI is $\text{J}\cdot\text{s}$. That this is the same unit as Planck's constant $\hbar$ (h-bar) is not a coincidence; it becomes meaningful when the action returns in quantum mechanics.

**Hamilton's principle of stationary action** is the following one-liner. Among all smooth paths sharing the fixed endpoints $q(t_1) = q_1$ and $q(t_2) = q_2$, the physically realised trajectory is a **stationary point** of $S$. Stationary means that the first-order change of $S$ under any small variation $q \to q + \delta q$ is zero — usually not a minimum, sometimes a saddle. The phrase "least action" is widespread but inaccurate; *stationary* action is the correct term.

Here the variation $\delta q$ is any smooth function **vanishing at the endpoints**: $\delta q(t_1) = \delta q(t_2) = 0$. The endpoints are boundary conditions, not variables.

## Main 2 — Deriving Euler–Lagrange

Compute the variation directly. Expand $S[q + \delta q] - S[q]$ to first order in $\delta q$, using the Einstein summation convention with the degree-of-freedom index $i = 1, \ldots, n$:

$$
\delta S = \int_{t_1}^{t_2} \!\left( \frac{\partial L}{\partial q^i}\,\delta q^i + \frac{\partial L}{\partial \dot q^i}\,\delta \dot q^i \right) dt
$$

where $\delta \dot q^i = \frac{d}{dt}(\delta q^i)$ because variation and time derivative commute. Integrate the second term by parts:

$$
\int_{t_1}^{t_2} \frac{\partial L}{\partial \dot q^i}\, \frac{d}{dt}(\delta q^i)\, dt = \left[ \frac{\partial L}{\partial \dot q^i}\, \delta q^i \right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \frac{d}{dt}\!\left( \frac{\partial L}{\partial \dot q^i} \right) \delta q^i\, dt
$$

The boundary term vanishes because $\delta q$ is zero at both endpoints. Collecting what remains,

$$
\delta S = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q^i} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^i} \right) \delta q^i \, dt
$$

A physical trajectory must give $\delta S = 0$ for *every* admissible variation $\delta q$. We now invoke the **fundamental lemma of the calculus of variations**: if a continuous function $f(t)$ satisfies $\int f\, \delta q\, dt = 0$ for every smooth $\delta q$ vanishing at $t_1, t_2$, then $f \equiv 0$. Justification in one sentence: if $f(t_*) > 0$ somewhere, choose a smooth bump $\delta q$ supported near $t_*$ and positive there; then $\int f\, \delta q\, dt > 0$, contradicting the hypothesis.

Hence the bracket vanishes for each $i$:

$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^i} - \frac{\partial L}{\partial q^i} = 0
$$

This is the Euler–Lagrange equation. The formula that chapters 6 and 7 accepted as given turns out to be nothing more than the stationarity condition of a single functional.

## Main 3 — Why this is more than algebra

The Euler–Lagrange equation can be reached in other ways — transforming Newton's law into generalised coordinates, or as the geodesic equation on a manifold with a particular metric. Why, then, is the variational principle treated as the *true* starting point of mechanics? Three reasons.

First, **coordinate-freedom**. The action $S$ is a scalar — a single number. Whatever chart we choose on $M$, the value of $S$ is unchanged, so its stationary points are unchanged too. That the EL equation keeps its form under any smooth change of coordinates is, from the variational viewpoint, a triviality that needs no separate proof.

Second, **additivity**. If two subsystems labelled 1 and 2 interact, the total Lagrangian splits as $L = L_1 + L_2 + L_\mathrm{int}$, and so does the action: $S = S_1 + S_2 + S_\mathrm{int}$. Variations add. Newton's framework requires writing fresh equations for every new degree of freedom; the variational principle adds one more term and is done. This additivity carries over unchanged in volume II chapter 5 when we generalise to a Lagrangian density $\mathcal{L}$ for fields.

Third, and most decisively, **extensibility**. As far as we know, the action principle is the *only* formulation of mechanics that extends — in one language — from point particles to classical fields, gauge theories, general relativity, and the quantum path integral (volume II chapter 9). In quantum mechanics, summing the phase $e^{iS/\hbar}$ over all paths recovers, in the classical limit $\hbar \to 0$, exactly the paths with $\delta S = 0$ as the dominant contribution. The answer to *why* nature picks stationary paths lives in quantum mechanics, not in classical mechanics.

## In Python

```python
# Discrete variational integrator (symplectic Verlet) for the simple pendulum.
# We watch the trajectory and the discrete energy, which oscillates without drift.
# Lagrangian L = (1/2) θ̇² + cos θ   (g/ℓ = 1).
import numpy as np
import matplotlib.pyplot as plt

dt = 0.05
N  = 200

theta    = np.empty(N + 1)
theta[0] = 0.5             # initial angle [rad]
theta[1] = theta[0]        # zero initial velocity  =>  q_1 ≈ q_0

# Discrete EL for this Lagrangian = symplectic Verlet update
for n in range(1, N):
    theta[n + 1] = 2 * theta[n] - theta[n - 1] - dt**2 * np.sin(theta[n])

# Discrete kinetic energy via central difference, plus the potential -cos θ
v = (theta[2:] - theta[:-2]) / (2 * dt)
E = 0.5 * v**2 - np.cos(theta[1:-1])
t = np.arange(N + 1) * dt

fig, ax = plt.subplots(2, 1, figsize=(6, 4), sharex=True)
ax[0].plot(t, theta);        ax[0].set_ylabel("θ [rad]")
ax[1].plot(t[1:-1], E);      ax[1].set_ylabel("discrete energy")
ax[1].set_xlabel("t");       plt.tight_layout(); plt.show()

print(f"E_min = {E.min():.6f},  E_max = {E.max():.6f}")
```

The angle traces a roughly constant-amplitude oscillation, and the discrete energy wobbles within a tiny band (about $10^{-4}$) without secular drift. That lack of drift is the signature of a variational integrator, and *why* an integrator derived from the action principle conserves things so well is exactly the subject of the next chapter.

## To the next chapter

In [chapter 9: Symmetry and conservation — Noether's theorem](../09-symmetry-and-conservation/) we see that when the action of this chapter is invariant under a **continuous symmetry** — time translation, spatial translation, or rotation — there follows automatically exactly one conserved quantity per symmetry (energy, momentum, angular momentum). The variational principle is not merely a clean way to write the Euler–Lagrange equation; it is the generator of conservation laws, and that is the body of the next chapter.
