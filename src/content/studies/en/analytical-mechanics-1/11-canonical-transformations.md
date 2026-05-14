---
title: 'Canonical transformations — the art of choosing good coordinates'
description: 'Coordinate changes that preserve the form of Hamilton''s equations, generating functions that compress an entire transformation into one line, and Liouville''s theorem that phase-space volume is conserved.'
book: analytical-mechanics-1
bookTitle: Analytical Mechanics I
chapter: 11
lang: en
pairSlug: am1-canonical-transformations
draft: false
updated: 2026-05-14
---

# Canonical transformations — the art of choosing good coordinates

> Coordinate changes that preserve the form of Hamilton's equations, generating functions that compress an entire transformation into one line, and Liouville's theorem that phase-space volume is conserved.

## Opening

The headline strength of the Hamiltonian formalism is that the equations of motion reduce to just two first-order ODEs, but the real payoff is that **picking the right coordinates makes those two lines easier to solve**. This chapter is about the grammar of "picking the right coordinates." After it you should be able to decide whether a change of variables is canonical with one Jacobian check, write down an entire transformation by reaching for a single generating function, and hold the picture of a small box in phase space whose volume cannot grow or shrink as it flows — the picture that feeds straight into next chapter's Poisson brackets.

## Main 1 — The canonical contract

Chapter 10 established that a generalized coordinate $q$ and its conjugate momentum $p$ satisfy $\dot q = \partial H/\partial p$ and $\dot p = -\partial H/\partial q$. Now consider a new pair $(Q, P)$ defined as functions of the old ones, $(Q(q, p),\, P(q, p))$. The transformation is called **canonical** if there exists some new Hamiltonian $K(Q, P)$ for which

$$
\dot Q = \frac{\partial K}{\partial P}, \qquad \dot P = -\frac{\partial K}{\partial Q}
$$

holds again. The contract is not just renaming variables — **the shape of the equations has to come along for the ride**.

This contract has two equivalent restatements. First, the **symplectic two-form** $\omega = dq \wedge dp$ is preserved:

$$
dQ \wedge dP = dq \wedge dp
$$

where $\wedge$ (wedge) is the differential-form product introduced in chapter 6. Second, the Jacobian $M = \partial(Q, P)/\partial(q, p)$ is a **symplectic matrix**:

$$
M^{T} J M = J, \qquad J = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix}
$$

Here $J$ is the $2n \times 2n$ block matrix that encodes the pairing between positions and momenta, and $I$ is the $n \times n$ identity. With one degree of freedom $J$ collapses to $\begin{pmatrix}0 & 1 \\ -1 & 0\end{pmatrix}$, and the condition becomes $\det M = 1$ — i.e. **phase-space area is preserved**.

## Main 2 — Generating functions

There are infinitely many canonical transformations, but remarkably every one of them can be packaged into a single function of mixed old-and-new variables. Such a function is called a **generating function**. Depending on which two variables you pick as independent, there are four standard types.

- Type 1, $F_1(q, Q)$: $\displaystyle p = \frac{\partial F_1}{\partial q}, \quad P = -\frac{\partial F_1}{\partial Q}$.
- Type 2, $F_2(q, P)$: $\displaystyle p = \frac{\partial F_2}{\partial q}, \quad Q = \frac{\partial F_2}{\partial P}$.
- Types 3 and 4, $F_3(p, Q)$ and $F_4(p, P)$, follow the same pattern with signs swapped.

Type 2 is the everyday choice. Start with the identity transformation: setting $F_2 = qP$ gives

$$
p = \frac{\partial F_2}{\partial q} = P, \qquad Q = \frac{\partial F_2}{\partial P} = q
$$

so $(Q, P) = (q, p)$, that is, nothing changes. Now add a small term. Let $F_2 = qP + \tfrac{\alpha}{2} q^{2}$, with $\alpha$ (alpha) a small constant. Then

$$
Q = q, \qquad p = P + \alpha\, q
$$

In phase space this is a **shear** that tilts the momentum axis toward the position axis. The area stays the same while the axes lean, and the transformation itself is canonical. The crucial point is that one short generating function packs the whole map.

## Main 3 — Liouville's theorem

The Hamiltonian flow itself, integrated for time $t$,

$$
\Phi_{t}: (q_0, p_0) \;\longmapsto\; (q(t), p(t))
$$

is a canonical transformation for every $t$. The last identity of Main 1 — the Jacobian is symplectic — therefore holds at every instant, so the phase-space **volume element** $d^{n}q\, d^{n}p$ does not change as it is carried along by the flow. This is **Liouville's theorem**.

The intuition is concrete. Track a small box of initial conditions — positions in $q_0 \pm \Delta q$, momenta in $p_0 \pm \Delta p$ — forward in time. The box may stretch, bend, or shear into a long thin ribbon. But **its volume never grows or shrinks**. This is exactly the statement that lets statistical mechanics treat the density of microstates as an "incompressible fluid" in phase space. It also forces any honest numerical integrator that discretizes phase space to preserve volume; that observation is the doorway to the family of **symplectic integrators** used in long-time molecular and orbital simulations.

## In Python

```python
# Check numerically that the shear generated by F_2 = q*P + (alpha/2) q^2
# is canonical. On a grid, the Poisson bracket {Q, P} = ∂q Q · ∂p P − ∂p Q · ∂q P
# should come out uniformly 1 for a canonical transformation.
import numpy as np

alpha = 0.3
N = 201
qs = np.linspace(-1.0, 1.0, N)
ps = np.linspace(-1.0, 1.0, N)
q, p = np.meshgrid(qs, ps, indexing="xy")   # q runs along columns, p along rows

# New coordinates: Q = q, P = p − α q
Q = q
P = p - alpha * q

# np.gradient returns derivatives along (rows, cols).
# Here rows = p direction and cols = q direction, so the second return is ∂/∂q.
dQ_dp, dQ_dq = np.gradient(Q, ps, qs)
dP_dp, dP_dq = np.gradient(P, ps, qs)

PB = dQ_dq * dP_dp - dQ_dp * dP_dq
print(f"{{Q, P}} mean = {PB.mean():.6f}")
print(f"{{Q, P}} std  = {PB.std():.2e}")
```

If the mean lands at $1$ and the standard deviation sits at roughly $10^{-12}$, you have verified by hand that the Jacobian of the transformation is exactly $1$ everywhere on the grid — an area-preserving canonical map.

## To the next chapter

[Chapter 12: Poisson brackets and integrability](../12-poisson-brackets-and-integrability/) promotes the bracket $\{Q, P\}$ that surfaced at the end of this chapter into a first-class object and proves that a transformation is canonical **if and only if** the fundamental brackets $\{Q_i, P_j\} = \delta_{ij}$ are preserved. From there the storyline moves naturally to the closing chapter of volume I: a system is **integrable** exactly when its conserved quantities close into an algebra under the Poisson bracket.
