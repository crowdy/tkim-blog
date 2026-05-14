---
title: 'Direct Numerical Simulation (DNS) — why it stays a research tool'
description: 'A napkin calculation showing why the cost of solving the Navier–Stokes equations without any turbulence model explodes as the 9/4 power of the Reynolds number.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 10
lang: en
pairSlug: turbulence-dns
draft: false
updated: 2026-05-14
---

# Direct Numerical Simulation (DNS) — why it stays a research tool

> A napkin calculation showing why the cost of solving the Navier–Stokes equations without any turbulence model explodes as the 9/4 power of the Reynolds number.

## Opening

In Chapter 9 we saw that the largest eddy $L$ (capital L, the integral scale) and the smallest eddy $\eta$ (eta, the Kolmogorov scale, where viscosity finally turns kinetic energy into heat) coexist in the same flow. This chapter asks what happens to a computer **the moment you try to fit both ends onto a single grid**. By the end you can answer "why is DNS not used in industry?" with a one-line napkin calculation.

## Main 1 — Definition of DNS: no model

DNS (Direct Numerical Simulation) means **solving the Navier–Stokes equations directly, with no turbulence model at all**. The RANS approach of Chapter 5 splits off a mean field and closes the unknown $-\overline{u'_i u'_j}$ term with a model; the LES approach of Chapter 11 resolves only the large eddies and models the small ones. DNS has no such closure. Instead it refines the grid all the way down to $\eta$ and **resolves every scale of the energy cascade numerically and directly**.

For that reason DNS is often called "a numerical experiment without approximation." It produces new turbulence statistics with the same standing as a wind-tunnel measurement — a research instrument, not a design tool.

## Main 2 — Grid count scales as $\mathrm{Re}^{9/4}$

Only one estimate is needed. Let the side length of the domain be $L$ and the smallest cell size be $\eta$. The number of grid points along one direction is simply

$$
\frac{L}{\eta}
$$

From Chapter 9, with the integral-scale Reynolds number $\mathrm{Re} = UL/\nu$ (where $\nu$, *nu*, is the kinematic viscosity),

$$
\frac{L}{\eta} \sim \mathrm{Re}^{3/4}
$$

In three dimensions all three directions have to be resolved, so the total grid count $N$ is

$$
N \sim \left(\frac{L}{\eta}\right)^3 \sim \mathrm{Re}^{9/4}
$$

That exponent 9/4 equals 2.25. A tenfold increase in Reynolds number multiplies the grid by about 178; a hundredfold increase multiplies it by about 31,623.

Add the CFL stability condition on the time step, $\Delta t \propto \Delta x / U \propto \eta / U$, and the **combined space-and-time cost scales as $\mathrm{Re}^3$**. The table below sticks to the spatial grid alone.

## Main 3 — Napkin numbers: at what Re does a supercomputer become mandatory

The single relation $N \sim \mathrm{Re}^{9/4}$ already decides whether DNS is practical.

| $\mathrm{Re}$ | $N \sim \mathrm{Re}^{9/4}$ | What it really means |
|---|---|---|
| $10^2$ | $\sim 10^{4.5} \approx 3 \times 10^4$ | Minutes on a laptop |
| $10^3$ | $\sim 10^{6.75} \approx 6 \times 10^6$ | An overnight run on a workstation |
| $10^4$ | $\sim 10^{9} \approx 10^9$ | One run on a national supercomputer |
| $10^5$ | $\sim 10^{11.25} \approx 2 \times 10^{11}$ | A multi-year project on a top-tier system |
| $10^6$ | $\sim 10^{13.5} \approx 3 \times 10^{13}$ | Out of reach on current hardware |

External automotive aerodynamics sits at $\mathrm{Re} \sim 10^7$, an airliner wing at $\mathrm{Re} \sim 10^8$. Real industrial problems live two or three rows below the bottom of this table. **So DNS is reserved for validating industrial codes and producing reference data for new models, while RANS and LES occupy the design loop.**

## In Python

Let us print the table for ourselves. `numpy` only, just $\mathrm{Re}^{9/4}$.

```python
import numpy as np

# DNS grid-point estimate: N ~ Re^(9/4)
# 9/4 = 2.25, lifting Chapter 9's L/eta ~ Re^(3/4) into three dimensions

Re_values = [1e2, 1e3, 1e4, 1e5, 1e6]
exponent = 9 / 4  # 2.25

print(f"{'Re':>10} | {'N ~ Re^(9/4)':>15}")
print("-" * 30)
for Re in Re_values:
    N = Re ** exponent
    print(f"{Re:>10.1e} | {N:>15.2e}")

# Note: adding the CFL condition on the time step pushes the total cost
# to Re^3. The table above counts only the spatial grid; wall-clock cost
# rises even faster.
```

Running it shows $N \approx 3.16 \times 10^9$ at $\mathrm{Re} = 10^4$. Chapter 1's claim that "the Reynolds number alone fixes the qualitative state of the flow" gets a computational rephrasing: **a single variable also fixes the boundary of what is computable.**

## To the next chapter

If the DNS grid cost is unacceptable, two paths remain. Average out every fluctuation and model what is left (RANS, Chapters 5–6), or resolve only the large eddies and model the small ones (LES). [Chapter 11: Large Eddy Simulation (LES)](../11-les/) takes the second path quantitatively — the central question is how DNS's $\mathrm{Re}^{9/4}$ shrinks under LES.
