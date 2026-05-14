---
title: 'Isotropic turbulence and the energy cascade'
description: 'Big eddies hand energy down to little eddies, and viscosity eventually turns it all into heat — Kolmogorov''s $-5/3$ law and the identity of the smallest eddy.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 9
lang: en
pairSlug: turbulence-energy-cascade
draft: false
updated: 2026-05-14
---

# Isotropic turbulence and the energy cascade

> Big eddies hand energy down to little eddies, and viscosity eventually turns it all into heat — Kolmogorov's $-5/3$ law and the identity of the smallest eddy.

## Opening

This is the chapter where the most "turbulence-like" picture in the whole book gets drawn. The five properties listed in Chapter 1 — diffusivity, three-dimensional vorticity, dissipation — finally collapse into a single scenario. After this chapter, the reader should be able to explain why Kolmogorov's $-5/3$ law has the shape it does from dimensional analysis alone, and to state in one line why turbulence contains a "smallest eddy that cannot be split further." The outline of why Chapter 10 (DNS) is so expensive also appears here in advance.

## Main 1 — Isotropy as an idealization

**Isotropy** is the property that the statistics of a flow are invariant under rotation. Rotate the coordinate axes by any angle and the mean kinetic energy, the variance, the correlation functions do not change.

Most real-world turbulence is not isotropic. Smoke rising from a chimney stretches upward; near a wall, the direction parallel to the wall stands out. In other words, **large scales are almost always anisotropic**. But as the eddies become smaller, this directional information tends to be forgotten.

Kolmogorov (A. N. Kolmogorov, 1903–1987) elevated this observation into a hypothesis: **at small scales the statistics become locally isotropic (local isotropy)**. This is not a claim that all turbulence is isotropic from the start; it is a claim that "directional information gets washed out as the cascade descends." The idealization is what lets us treat the small scales as a single universal picture.

## Main 2 — Richardson's cascade

Lewis Fry Richardson (L. F. Richardson, 1881–1953) left behind a poem in 1922. Paraphrased in plain prose, it says: *big whirls have little whirls that feed on their velocity, and little whirls have lesser whirls, and so on down to viscosity in the molecular sense*.

That one sentence holds the entire picture of turbulence. Energy enters a flow from the outside always at the **large scales** — pumps, wings, wind gradients. This energy creates large eddies; large eddies are unstable and break up into smaller eddies; those smaller eddies face the same fate. Energy flows in one direction, from large to small. We call the rate of this flow $\varepsilon$ (epsilon, the **energy dissipation rate per unit mass**), with units of $\text{m}^2/\text{s}^3$.

The crucial point is that this cascade is **local**. An eddy at some intermediate scale $\ell$ receives energy from eddies slightly larger than itself, and hands energy down to eddies slightly smaller. It does not jump scales.

## Main 3 — Kolmogorov's three hypotheses and the $-5/3$ law

In 1941 Kolmogorov organized this picture into three hypotheses:

1. **Energy injection**: large eddies inject energy at a rate $\varepsilon$ per unit mass.
2. **Inertial range**: in the intermediate range between large and small scales, the statistics depend only on $\varepsilon$ and the wavenumber $k$ (wavenumber, units $1/\text{m}$, the inverse of an eddy size). Viscosity $\nu$ (nu, the **kinematic viscosity**, units $\text{m}^2/\text{s}$) does not enter directly.
3. **Dissipation range**: at sufficiently small scales, viscosity finally consumes the eddies and converts kinetic energy into heat.

Hypothesis 2 is the most powerful. If the inertial-range energy spectrum $E(k)$ — the energy density per unit mass contained near wavenumber $k$ — is a function of only $\varepsilon$ and $k$, then dimensions alone fix its shape.

Write out the dimensions: $[E] = \text{m}^3/\text{s}^2$, $[\varepsilon] = \text{m}^2/\text{s}^3$, $[k] = 1/\text{m}$. Match the dimensions of $E \sim \varepsilon^a k^b$ on both sides and you get $a = 2/3$, $b = -5/3$ uniquely. Therefore

$$
E(k) = C \, \varepsilon^{2/3} k^{-5/3}
$$

The constant $C \approx 1.5$ is the **Kolmogorov constant**. This one line is the most famous result in 20th-century turbulence research, and the $-5/3$ slope in the inertial range has been confirmed in wind tunnels, ocean measurements, and atmospheric measurements alike.

## Main 4 — The Kolmogorov length $\eta$

Where does the cascade stop? As eddies become smaller, the local Reynolds number of the eddy, $Re_\ell = u_\ell \ell / \nu$, decreases. At some threshold size where $Re_\ell \sim 1$, viscosity overwhelms inertia, and the eddy cannot break up any further — instead it dissipates as heat. We call this size the **Kolmogorov length** $\eta$ (eta).

$\eta$ is also fixed by dimensional analysis. From $\nu$ and $\varepsilon$ alone there is only one combination with the dimension of length:

$$
\eta = \left( \frac{\nu^3}{\varepsilon} \right)^{1/4}
$$

For room-temperature air ($\nu \approx 1.5 \times 10^{-5}\,\text{m}^2/\text{s}$) with relatively gentle turbulence ($\varepsilon \approx 10^{-2}\,\text{m}^2/\text{s}^3$), $\eta$ is about 0.4 mm. Even the air flow inside a living room carries sub-millimeter smallest eddies. In something like an industrial gas turbine, where $\varepsilon$ is much larger, $\eta$ drops to micrometres.

This number determines the opening sentence of the next chapter: **DNS must shrink its grid spacing down to $\eta$**. That is why DNS cost scales roughly as $Re^3$ and earns its reputation as impractical for industrial flows.

## In Python

```python
# Build a fake spectrum and measure the slope in the inertial range.
# The answer should land near -5/3 ≈ -1.667.
import numpy as np

# Wavenumbers: 1 to 1000, log-spaced
k = np.logspace(0, 3, 200)

# In the inertial range E ~ k^(-5/3);
# in the viscous range we tack on an exponential roll-off.
eps = 0.01          # energy dissipation rate [m^2/s^3]
C = 1.5             # Kolmogorov constant
E = C * eps**(2/3) * k**(-5/3) * np.exp(-(k / 600)**2)

# Fit a straight line in log-log over the inertial range only
mask = (k >= 5) & (k <= 100)
slope, intercept = np.polyfit(np.log10(k[mask]), np.log10(E[mask]), 1)
print(f"inertial-range slope = {slope:.3f} (theory -1.667)")

# Check the Kolmogorov length too.
nu = 1.5e-5         # kinematic viscosity of air [m^2/s]
eta = (nu**3 / eps)**(1/4)
print(f"Kolmogorov length eta = {eta*1e3:.3f} mm")
```

If the printed slope lands near $-1.667$ and $\eta$ comes out under 1 mm, you have touched both of the cascade's central equations with your own hands.

## To the next chapter

[Chapter 10: Direct Numerical Simulation (DNS)](../10-dns/) quantifies why the $\eta$ we met here becomes the direct cause of DNS's computational blow-up, walking through the grid-point scaling explicitly. With the cascade picture in mind, the trade-offs between DNS, LES, and RANS will appear much more sharply.
