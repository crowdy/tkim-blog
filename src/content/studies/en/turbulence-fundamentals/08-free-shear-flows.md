---
title: 'Free shear flows — jets, wakes, and mixing layers'
description: 'Without walls, turbulent flows fall into three canonical shapes (jet, wake, mixing layer), each with a surprisingly clean self-similar solution.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 8
lang: en
pairSlug: turbulence-free-shear-flows
draft: false
updated: 2026-05-14
---

# Free shear flows — jets, wakes, and mixing layers

> Without walls, turbulent flows fall into three canonical shapes (jet, wake, mixing layer), each with a surprisingly clean self-similar solution.

## Opening

Chapter 7 covered wall-bounded turbulence — the boundary layer. This chapter widens the view to turbulence **without walls**. With no wall, there is only one possible source of a velocity gradient: a relative velocity difference between streams of fluid. Flows of this kind sort into three families. By the end of this chapter you will see that the jet leaving a nozzle, the wake behind a car, and the mixing layer where a river meets a lake all share the same mathematical shape.

## Main 1 — Three canonical forms

A free shear flow (a shear flow with no wall) falls into one of three categories.

- **Jet** — fluid issuing into still surroundings. Examples: a gas burner flame, the stream from an inkjet printer.
- **Wake** — the velocity-deficit region downstream of a body sitting in a uniform stream. Examples: behind a car, behind an aircraft wingtip.
- **Mixing layer** — the boundary where two parallel streams of different speeds meet tangentially. Example: the surface layer where a river meets the sea.

In all three, **the shear (velocity shear) is built purely from speed differences**, with no help from a wall, and that shear is what sustains the turbulence. The five properties of turbulence from Chapter 1 — especially diffusivity and vorticity fluctuations — all appear here.

## Main 2 — The self-similarity ansatz

The thing the three flows have in common is **self-similarity**. Let $x$ be the downstream coordinate and $y$ the cross-stream coordinate. At each $x$, the mean velocity profile $\bar{u}(x, y)$ can be normalized by a local **characteristic centerline velocity** $U_c(x)$ and a local **characteristic width** $\delta(x)$. Experiment and theory both confirm that the normalized profiles at all downstream stations collapse onto a single function $f$:

$$
\frac{\bar{u}(x, y)}{U_c(x)} = f\!\left( \frac{y}{\delta(x)} \right)
$$

Here $\bar{u}$ is the time-averaged velocity, $U_c$ is the representative speed of the cross-section (usually the centerline value), and $\delta$ is the width scale that captures how far the flow has spread. The combination $y/\delta$ is the dimensionless cross-stream coordinate $\eta$ (eta).

The strength of this ansatz is significant: every cross-section of the flow can be compressed into a single curve $f(\eta)$. The only thing left to determine is how the two scales $U_c(x)$ and $\delta(x)$ depend on $x$.

## Main 3 — Scaling laws for the three flows

We state the results without derivation. The derivation is bundled with the dimensional-analysis material in Chapter 9.

- **Round jet**:
$$
\delta(x) \propto x, \qquad U_c(x) \propto \frac{1}{x}
$$

  The width grows linearly with $x$ and the centerline velocity decays as $1/x$.

- **Plane wake**:
$$
\delta(x) \propto \sqrt{x}, \qquad U_c(x) - U_\infty \propto \frac{1}{\sqrt{x}}
$$

  $U_\infty$ is the free-stream velocity far from the body, and $U_c - U_\infty$ is the velocity deficit. The width grows slowly as $\sqrt{x}$, and the deficit fills in slowly as $1/\sqrt{x}$.

- **Mixing layer**:
$$
\delta(x) \propto x, \qquad U_c = \text{const}
$$

  The width grows linearly as in the jet, but the characteristic velocity does not depend on $x$.

Why is $U_c$ constant only for the mixing layer? The upper-stream velocity $U_1$ and the lower-stream velocity $U_2$ are **set by boundary conditions far upstream**. The "characteristic velocity scale" of the mixing layer is fixed externally — it has nothing to do with the internal dynamics of the flow. As $x$ grows, $U_1$ and $U_2$ do not change, so the $U_c$ built from their difference is constant.

The jet is different. The momentum flux $J = \int \rho \bar{u}^2 \, dA$ (momentum per unit time crossing the cross-section) leaving the nozzle is **conserved** as we move downstream — the surrounding still fluid is entrained, so the mass increases, but the total momentum stays the same. Meanwhile, with $\delta \propto x$ the cross-sectional area grows as $\delta^2 \propto x^2$. For the product $\rho U_c^2 \cdot \delta^2$ to stay constant, we need $U_c^2 \cdot x^2 = \text{const}$, i.e. $U_c \propto 1/x$. If the width spreads, the centerline velocity must fall.

## In Python

The self-similar mean profile of the round jet is well approximated by the Gaussian $f(\eta) = \exp(-\eta^2)$. We plot the function and check numerically that its integral equals $\sqrt{\pi}$.

```python
import numpy as np
import matplotlib.pyplot as plt

# Dimensionless cross-stream coordinate η = y / δ(x)
eta = np.linspace(-3, 3, 200)

# Self-similar model for the round-jet mean velocity
f = np.exp(-eta**2)

# Plot the shape
plt.plot(eta, f)
plt.xlabel("η = y / δ(x)")
plt.ylabel("u / U_c")
plt.title("Round jet self-similar profile")
plt.grid(True)
plt.show()

# Integral check used in the momentum-flux conservation argument
integral = np.trapz(f, eta)
print(f"∫ f(η) dη ≈ {integral:.4f}")
print(f"√π        ≈ {np.sqrt(np.pi):.4f}")
```

The printed value is approximately 1.7725, matching $\sqrt{\pi}$. The fact that the integral is finite at all means the profile falls off rapidly toward the edges — that is the starting point for the momentum-flux conservation argument given in Main 3.

## To the next chapter

We accepted the self-similar scaling laws as results, not derivations. [Chapter 9: Isotropic turbulence and the energy cascade](../09-isotropic-energy-cascade/) opens up dimensional analysis and Kolmogorov's 1941 hypothesis to show how large eddies hand energy down to small eddies until viscosity finally dissipates it. The width growth we saw in free shear flows turns out to be one consequence of that same cascade.
