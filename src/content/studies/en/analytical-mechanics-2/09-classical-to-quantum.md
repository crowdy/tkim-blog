---
title: 'From classical to quantum — Dirac correspondence and the path integral'
description: 'Classical Poisson brackets pass over to quantum commutators, and a sum over all paths collapses back to one classical trajectory in the small-$\hbar$ limit — two bridges across the same river.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 9
lang: en
pairSlug: am2-classical-to-quantum
draft: false
updated: 2026-05-14
---

# From classical to quantum — Dirac correspondence and the path integral

> Classical Poisson brackets pass over to quantum commutators, and a sum over all paths collapses back to one classical trajectory in the small-$\hbar$ limit — two bridges across the same river.

## Opening

A reader who has followed analytical mechanics to its end naturally asks: how does this framework turn into quantum mechanics? This chapter crosses that gap with two bridges — Dirac's canonical quantization and Feynman's path integral. The two start from different banks but reach the same Schrödinger equation. By the end of the chapter the reader should be able to write in one line how $\{q, p\} = 1$ becomes $[\hat q, \hat p] = i\hbar$, and to explain via the stationary-phase argument why the classical action $S$ appears as a *phase* in quantum mechanics. We keep $\hbar$ in the formulas rather than setting $\hbar = 1$, and write everything in SI units.

## Main 1 — The Dirac correspondence

In 1925 Dirac (P. A. M. Dirac, 1902–1984) proposed the following *dictionary*. The **Poisson bracket** $\{f, g\}$ — the antisymmetric differential operation on classical phase-space functions $f, g$ introduced in Chapter 4 — corresponds in quantum mechanics to the **commutator** $[\hat f, \hat g] = \hat f \hat g - \hat g \hat f$ of two self-adjoint operators, via

$$
\{f, g\} \;\longmapsto\; -\frac{i}{\hbar}[\hat f, \hat g].
$$

Note where $\hbar$ (h-bar, the reduced Planck constant, $\hbar \approx 1.055 \times 10^{-34}\,\mathrm{J\cdot s}$) sits. For the right-hand side not to diverge in the classical limit $\hbar \to 0$, the commutator itself must be of order $\hbar$. The simplest instance $\{q, p\} = 1$ quantizes to the celebrated canonical commutation relation

$$
[\hat q, \hat p] = i\hbar.
$$

And the Hamiltonian equation of motion $\dot f = \{f, H\}$ passes directly over to the **Heisenberg equation**

$$
i\hbar\, \frac{d\hat f}{dt} = [\hat f, \hat H].
$$

The classical equation of motion becomes the quantum equation of motion by changing exactly one symbol — $\{,\}$ to $-(i/\hbar)[,]$.

That said, the Dirac correspondence is an *ansatz*, not a derivation. At the level of polynomials in $q, p$ up to degree two — positions, momenta, and their products — it works cleanly. At higher degrees (say $q^2 p^2$) the result depends on the operator-ordering convention chosen at quantization time: Weyl-symmetric ordering, normal ordering, anti-normal ordering all give different answers. This ambiguity is intrinsic and persists into quantum field theory; the dictionary alone does not determine the classical-to-quantum map.

## Main 2 — Feynman's path integral

In 1948 Feynman (R. P. Feynman, 1918–1988) built a second bridge, independent of the Dirac dictionary. The amplitude for a particle to travel from $(x_i, t_i)$ to $(x_f, t_f)$ is written as a sum over *every possible path*:

$$
K(x_f, t_f; x_i, t_i) = \int \mathcal{D}[x(t)]\, e^{i S[x]/\hbar}.
$$

Here $\mathcal{D}[x(t)]$ is the formal measure over all continuous paths $x(t)$ joining $t_i$ and $t_f$ with the endpoints held fixed, and $S[x] = \int_{t_i}^{t_f} L\, dt$ is the classical action from Volume I, Chapter 1. Each path contributes a single unit-modulus complex number $e^{iS/\hbar}$ whose phase is its own action; summing those contributions over all paths gives the quantum amplitude $K$.

Three points are worth highlighting. First, the sum runs over *all* paths — smooth, kinked, and nowhere-differentiable. Second, every path contributes with the *same magnitude* $|e^{iS/\hbar}| = 1$; only the phases differ. Third, the classical path $x_{\rm cl}$ is the one for which $\delta S = 0$ — that is, the path along which the action is stationary. The next section explains how these three facts combine to produce the classical limit.

## Main 3 — Stationary phase and the recovery of classical mechanics

To say that $\hbar$ is small is to say that the phase $S/\hbar$ oscillates *rapidly*. Rapidly oscillating integrals cancel against themselves and tend to zero — with one exception. At a stationary point of $S$, where the derivative vanishes, the phase varies slowly, and the contribution survives. This is the heart of the stationary-phase approximation, and in the path integral the stationary path is precisely the classical path $x_{\rm cl}$.

Expanding the action about the classical path $x(t) = x_{\rm cl}(t) + \delta x(t)$ gives

$$
S[x_{\rm cl} + \delta x] = S[x_{\rm cl}] + \frac{1}{2}\, \delta^2 S\, (\delta x)^2 + \cdots
$$

The linear term $\delta S$ vanishes by the defining property of $x_{\rm cl}$, leaving the quadratic term. Performing the Gaussian integral over the fluctuations $\delta x$ yields an amplitude of the form

$$
K(x_f, t_f; x_i, t_i) \approx A(x_f, x_i, T)\, e^{i S[x_{\rm cl}]/\hbar}.
$$

The phase is the classical action itself, and the prefactor $A$ is the determinant of the second variation $\delta^2 S$ — the **Van Vleck determinant**. In the limit $\hbar \to 0$, all path contributions except this one oscillate themselves into cancellation, and a single classical trajectory remains.

For the free particle the computation reduces to one line. With $L = m\dot x^2/2$ the classical path is the uniform straight line $x_{\rm cl}(t) = x_i + (x_f - x_i)(t - t_i)/T$ (with $T = t_f - t_i$), and its action is

$$
S_{\rm cl} = \frac{m(x_f - x_i)^2}{2T}.
$$

The phase of the free-particle propagator obtained by solving the Schrödinger equation directly is exactly this expression. The two bridges — the Schrödinger equation produced by the Dirac correspondence and Feynman's path integral — meet at the same point on the far bank.

## In Python

```python
# Free-particle path integral: random paths whose phase sum lands near the classical action.
# m = hbar = 1. Endpoints x_i = 0, x_f = 1, T = 1. Classical action S_cl = 0.5.
import numpy as np

m, hbar = 1.0, 1.0
x_i, x_f, T = 0.0, 1.0, 1.0
N = 20                       # number of time slices
dt = T / N
N_path = 5000                # number of sampled paths
sigma = 0.5                  # std-dev of interior Gaussian samples
rng = np.random.default_rng(0)

# Each path: [x_i, x_1, ..., x_{N-1}, x_f]
interior = rng.normal(0.0, sigma, size=(N_path, N - 1))
left = np.full((N_path, 1), x_i)
right = np.full((N_path, 1), x_f)
paths = np.concatenate([left, interior, right], axis=1)

# Action S = sum_n (m/2) (x_{n+1} - x_n)^2 / dt
dx = np.diff(paths, axis=1)
S = 0.5 * m * np.sum(dx**2, axis=1) / dt

# Phase sum sum_path exp(i S / hbar)
amp = np.sum(np.exp(1j * S / hbar).astype(np.complex128))
phase = np.angle(amp)
S_cl = m * (x_f - x_i)**2 / (2 * T)

print(f"classical action  S_cl       = {S_cl:.4f} rad")
print(f"sample phase     arg(sum)    = {phase:.4f} rad")
print(f"difference                    = {phase - S_cl:.4f} rad")
```

The sampling measure is unnormalized, so the *magnitude* of the sum is meaningless; the *argument* of the complex sum, however, lands within a fraction of a radian of the classical action $S_{\rm cl} = 0.5$. Even after summing over all paths, the argument of the total concentrates on the phase of a single classical trajectory — the cleanest numerical fingerprint of the stationary-phase argument.

## To the next chapter

[Chapter 10: Where to next — paths beyond this book](../10-where-to-next/) is the closing chapter. Having crossed the two bridges of this volume, the reader can next move toward quantum field theory, the partition function in statistical mechanics, or gauge theory. The closing chapter sketches each of these directions and provides a map to topics that this book has, by design, left untouched.
