---
title: 'Turbulent viscosity models — Boussinesq, mixing length, k-ε, k-ω'
description: 'The engineering trick that resolves chapter 5''s closure problem by modeling the Reynolds stress as a giant viscosity, traced from mixing length to the industrial two-equation workhorses.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 6
lang: en
pairSlug: turbulence-viscosity-models
draft: false
updated: 2026-05-14
---

# Turbulent viscosity models — Boussinesq, mixing length, k-ε, k-ω

> The engineering trick that resolves chapter 5's closure problem by modeling the Reynolds stress as a giant viscosity, traced from mixing length to the industrial two-equation workhorses.

## Opening

In chapter 5 we derived the RANS equations and hit a dead end — six new unknowns appeared in the form of the **Reynolds stress** $-\overline{u'_i u'_j}$, while we still had only four equations (one continuity + three momentum). This is the RANS **closure problem**. In this chapter we follow the simplest workaround that engineers have used for a century: **treat turbulence as if it were viscosity**. After finishing this chapter you will be able to look at an OpenFOAM case file using `kEpsilon` or `kOmegaSST` and explain in one sentence what assumption it makes and what its limits are.

## Main 1 — Boussinesq's hypothesis: turbulence treated like viscosity

In 1877 Boussinesq (Boussinesq, *boo-see-NESK*) proposed a simple assumption — **the Reynolds stress is proportional to the mean rate of strain**. Just as molecular viscosity gives a viscous stress proportional to strain rate ($\tau = \mu \, \partial u / \partial y$), the assumption is that the turbulent stress obeys a relation of the same form:

$$
-\overline{u'_i u'_j} = \nu_t \left( \frac{\partial \bar{u}_i}{\partial x_j} + \frac{\partial \bar{u}_j}{\partial x_i} \right) - \frac{2}{3} k \delta_{ij}
$$

Here $\nu_t$ (nu-t, the *eddy viscosity* or turbulent kinematic viscosity) is the newly introduced coefficient, $k = \tfrac{1}{2}\overline{u'_i u'_i}$ is the turbulent kinetic energy per unit mass, and $\delta_{ij}$ is the Kronecker delta — the symbol that equals 1 when $i=j$ and 0 otherwise. The trailing term $\tfrac{2}{3} k \delta_{ij}$ is a trace correction; on first reading it is enough to think of it as "a term added so the formula does not break when $i=j$."

The crucial distinction is the following — **molecular viscosity $\nu$ is a property of the fluid** (air is fixed at about $1.5 \times 10^{-5} \text{ m}^2/\text{s}$), whereas **eddy viscosity $\nu_t$ is a property of the flow**. The same air has $\nu_t = 0$ at rest but $\nu_t$ may exceed $\nu$ by factors of hundreds or thousands in strong turbulence. In other words $\nu_t$ is the unknown, and how to determine it is the starting point of every model that follows.

The advantage of this assumption is clear — six Reynolds-stress unknowns collapse into **one scalar** $\nu_t$. The closure problem is now compressed into the single question: how do we set $\nu_t$? The limitation is just as clear — in flows where stress and strain are not actually proportional (strongly curved flow, rotation, separation, and so on) the assumption itself breaks down. Yet more than eighty percent of industrial CFD still rests on Boussinesq.

## Main 2 — Prandtl's mixing length model

The **mixing length model** proposed by Prandtl (Prandtl, *PRAHN-tl*) in 1925 is the simplest way to fix $\nu_t$:

$$
\nu_t = \ell_m^2 \left| \frac{\partial \bar{u}}{\partial y} \right|
$$

Here $\ell_m$ (ell-m, the *mixing length*) carries the intuitive meaning "the average distance a fluid blob travels before mixing with its surroundings." The concept is borrowed from the mean free path of gas molecules — the average distance traveled before collision.

The intuition runs like this. If a fluid blob at position $y$ moves a distance $\ell_m$ upward, it carries with it the velocity of its original location and then collides with the surroundings. The mean velocity difference between the two positions is about $\ell_m \cdot \partial \bar{u}/\partial y$, and this is the typical magnitude of the velocity fluctuation $u'$. Substituting this estimate into the definition of the Reynolds stress yields the formula above.

The key point is that $\ell_m$ **varies with position**. Near a wall a fluid blob cannot travel beyond the wall, so $\ell_m \to 0$, and therefore $\nu_t \to 0$. In free flows $\ell_m$ scales with the width of the flow. The simplest near-wall ansatz uses the Kármán (Kármán, *KAHR-mahn*) constant $\kappa \approx 0.41$:

$$
\ell_m(y) = \kappa \cdot \min(y, 2h - y)
$$

This vanishes at both walls and reaches its maximum at the channel center. The mixing length model is simple, has no free unknowns once $\ell_m$ is given, and matches near-wall flows well, so it still survives in boundary-layer codes and textbook examples. Its limitation is that **the human must choose $\ell_m$ for each flow**. For complex geometries — separation, reattachment, impinging jets — there is no way to know the right $\ell_m$ in advance.

## Main 3 — The k-ε two-equation model

To get past the mixing-length limit we must let an **equation** determine $\nu_t$ instead of a person. The **k-ε model** (Launder & Spalding, 1974) adds two transport equations:

- $k$ — turbulent kinetic energy, the fluctuating kinetic energy per unit mass $\tfrac{1}{2} \overline{u'_i u'_i}$. Units m²/s². Represents the **"strength" of the turbulence**.
- $\varepsilon$ (epsilon, *EP-si-lon*) — the turbulent dissipation rate, the kinetic energy per unit time per unit mass dissipated to heat by viscosity. Units m²/s³. Represents the **rate at which turbulence breaks down into small eddies and disappears**.

Dimensional analysis on these two quantities yields exactly one combination with the units of viscosity (m²/s), namely $k^2/\varepsilon$, and the definition multiplies it by a calibration constant $C_\mu \approx 0.09$:

$$
\nu_t = C_\mu \frac{k^2}{\varepsilon}
$$

The values of $k$ and $\varepsilon$ at every grid point are obtained by solving their own transport equations (production = how the mean flow generates turbulence; dissipation = $\varepsilon$ itself; diffusion = spreading driven by $\nu_t$). This book does not derive those equations; we only record the result, that solving for these two quantities automatically determines $\nu_t$.

k-ε is robust and accurate in free flows (jets, wakes, atmospheric boundary layers, and the like). On the other hand its assumptions break down in the **viscous sublayer** near walls, so a corrective "wall function" is required. Industrially it was the most widely used model into the 1990s and remains the standard for external aerodynamics, ventilation, and combustion.

## Main 4 — The k-ω model and SST

Wilcox's (Wilcox, *WIL-koks*) **k-ω model** (1988) solves the second equation for the **specific dissipation rate** $\omega$ (omega, *oh-MEH-gah*) instead of $\varepsilon$. It is defined through the relation $\omega \approx \varepsilon / (C_\mu k)$ and has units 1/s — a frequency. The eddy viscosity is:

$$
\nu_t = \frac{k}{\omega}
$$

The biggest payoff of this small change is in **near-wall behavior**. The $\omega$ equation admits a natural diverging boundary condition at the wall and can be integrated all the way into the viscous sublayer without wall functions. Its limitation is the converse — **results are sensitive to the free-stream value of $\omega$**. Cases where wake position shifts substantially under tiny changes in inlet conditions are well documented.

In 1994 Menter (Menter, *MEN-ter*) proposed **SST k-ω** (Shear-Stress Transport k-ω), which combines the strengths of both. The core idea is simple — a blending function automatically switches to **k-ω near the wall and to k-ε in the free stream**. SST k-ω is today effectively the default in aerospace, automotive, and turbomachinery industries, and it reappears in chapter 12 when we discuss model selection in industrial CFD.

| Model | Strength | Weakness |
|---|---|---|
| Mixing length | Simple, zero unknowns | $\ell_m$ chosen by hand |
| k-ε | Robust in free flows | Wall function needed near walls |
| k-ω | Accurate near walls | Sensitive to free-stream values |
| SST k-ω | Robust in both regions | Slightly higher computational cost |

## In Python

Let us plot the $\nu_t$ distribution that the mixing length model produces across a channel section. Take half-height $h=1$ and a parabolic mean velocity $\bar{u}(y) = 1 - ((y-h)/h)^2$ (peak 1 at the center, 0 at the walls). Then $\partial \bar{u}/\partial y = -2(y-h)/h^2$ and the mixing length is $\ell_m(y) = 0.41 \cdot \min(y, 2h - y)$. The resulting curve is **zero at both walls and largest near the channel center**, matching the chapter-1 intuition that turbulent diffusion is weak near walls and strong in the core.

```python
import numpy as np
import matplotlib.pyplot as plt

# Channel geometry: half-height h=1, full height 2h=2
h = 1.0
y = np.linspace(0.0, 2.0 * h, 401)

# Mean velocity profile (parabolic): peak at center, zero at walls
u_bar = 1.0 - ((y - h) / h) ** 2

# Velocity gradient (analytic): du/dy = -2(y-h)/h^2
du_dy = -2.0 * (y - h) / (h ** 2)

# Mixing length: l_m = κ · min(y, 2h - y), κ = 0.41 (Kármán constant)
kappa = 0.41
l_m = kappa * np.minimum(y, 2.0 * h - y)

# Prandtl mixing-length eddy viscosity: ν_t = l_m^2 · |du/dy|
nu_t = (l_m ** 2) * np.abs(du_dy)

# Visualization
fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(y, nu_t, label=r'$\nu_t = \ell_m^2\,|\partial \bar{u}/\partial y|$')
ax.set_xlabel('y (distance from wall)')
ax.set_ylabel(r'$\nu_t$ (eddy viscosity)')
ax.set_title('Mixing length model: eddy viscosity across a channel')
ax.axvline(h, color='gray', linestyle='--', alpha=0.5, label='channel center')
ax.legend()
ax.grid(alpha=0.3)
fig.tight_layout()
fig.savefig('nu_t_mixing_length.png', dpi=120)
print(f"max ν_t = {nu_t.max():.4f} (at y = {y[nu_t.argmax()]:.2f})")
```

The curve drops to zero at both walls (because $\ell_m \to 0$ there) and rises to a gentle hump near the center. Exactly at $y = h$ the gradient $\partial \bar{u}/\partial y$ also vanishes, producing a small dip so that the hump splits into two peaks on either side. That small detail is the visual signature of a well-known limitation: the mixing length model gives **a single point where $\nu_t$ collapses to zero on the symmetry axis** — a non-physical artifact. Two-equation models such as k-ε correct this automatically.

## To the next chapter

So far we have applied the same model uniformly across the entire flow, yet the most interesting part of any real flow concentrates **near the wall**. [Chapter 7: Boundary layer theory](../07-boundary-layer/) lays out the three-part structure of the near-wall region — viscous sublayer, buffer layer, log-law layer — and looks at how (or why not) each of the chapter-6 models behaves in each layer. After chapter 7 you will be able to look at a CFD result and judge whether the near-wall region is correct by yourself.
