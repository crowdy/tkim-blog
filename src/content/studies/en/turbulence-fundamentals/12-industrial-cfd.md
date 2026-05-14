---
title: 'Application — turbulence model selection in industrial CFD'
description: 'Twelve chapters of tools compressed into a single decision table, so the reader can close the book with a working sense of which turbulence approach fits which flow.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 12
lang: en
pairSlug: turbulence-industrial-cfd
draft: false
updated: 2026-05-14
---

# Application — turbulence model selection in industrial CFD

> Twelve chapters of tools compressed into a single decision table, so the reader can close the book with a working sense of which turbulence approach fits which flow.

## Opening

If you have made it this far, the acronyms RANS, LES, and DNS are no longer words to memorize but tools whose assumptions and cost structures you can picture in your head. The aim of this final chapter is not to introduce new equations but to **organize what you already have**. After reading it you can open a paper or a commercial-code manual and form your own judgment about why the author chose the model they did.

## Main 1 — back to the five properties from chapter 1

Chapter 1 defined turbulence by five properties — **irregularity, diffusivity, large Reynolds number, three-dimensional vorticity fluctuations, and dissipation**. The whole book has, in the end, been a story about **how to honor each of those properties, or how to sidestep them**.

- **DNS** (chapter 10) tries to solve all five head-on. It meshes down to the smallest dissipative scale $\eta$ (eta, the Kolmogorov length) and computes every vorticity fluctuation directly. No model is invoked.
- **LES** (chapter 11) resolves the large eddies and delegates the sub-grid dissipation to an SGS (sub-grid stress) model. Of the five properties, the large scales are kept; the small ones are modeled away.
- **RANS** (chapters 5–6) absorbs all five properties into a time average and solves only the mean field. Vorticity fluctuations themselves are never computed — only their net effect, the Reynolds stress $\overline{u'_i u'_j}$, is modeled.

The three approaches are three answers to one question: **what do we resolve, and what do we hand off to a model?**

## Main 2 — one comparison table

| Approach | Resolved | Modeled | Cost (Re scaling) | Wall-mesh need | Where it pays off |
|---|---|---|---|---|---|
| DNS | every scale down to $\eta$ | nothing | $\sim \mathrm{Re}^3$ | $y^+ \lesssim 1$ | research, benchmark data |
| LES | large eddies | sub-grid stress | $\sim \mathrm{Re}^{1.8}$ | $y^+ \lesssim 1$ near wall | combustion, aeroacoustics, transient flows |
| Hybrid (DES) | wall RANS + LES core | depends on region | between LES and RANS | wall function or resolved | external aero, separated flows |
| RANS (k-ω SST) | mean only | full Reynolds stress | independent of Re | $y^+ \lesssim 1$ or wall functions | day-to-day industrial design |
| RANS w/ wall functions | mean only | full Reynolds stress | cheapest | $30 \lesssim y^+ \lesssim 100$ | quick design iterations |

Here $y^+$ (y-plus) is the non-dimensional wall distance introduced in chapters 6 and 7. The $\mathrm{Re}^3$ scaling is the scary one. A factor of 10 in Reynolds number is a factor of 1000 in DNS cost — which is why DNS at an aircraft wing's $\mathrm{Re} \sim 10^7$ is simply not on the table.

## Main 3 — the decision flow in prose

A single paragraph captures the flow chart.

If the **Reynolds number is below about 5000** and the geometry is simple — a small channel, a low-speed lab rig — DNS is worth considering; when feasible, it gives the cleanest answer. If DNS is out of reach and the physics that matters is **inherently unsteady** — separation, reattachment, combustion, noise — and you can spend days of compute, choose LES; if you want to lighten the near-wall mesh burden, choose DES. For **most industrial design work** — pumps, valves, vehicle exteriors, HVAC ducts — RANS is the right answer, and among the RANS family **k-ω SST** is the safe default. The reason is simple: SST blends k-ω near the wall with k-ε in the free stream, so it handles separation well without being overly sensitive in the free shear region.

## Main 4 — common landmines

- **$y^+$ matters more than mesh count.** A 10-million-cell mesh with a first-cell $y^+$ of 200 makes SST meaningless. A 1-million-cell mesh with $y^+ \sim 1$ at the wall can be perfectly trustworthy.
- **You cannot start an LES from a "uniform mean-velocity inlet."** LES demands turbulent fluctuations at the inlet. Without synthetic turbulence or a recycled cross-section from a precursor channel simulation, the flow will stay laminar far into the domain.
- **Do not validate an industrial code against raw DNS results.** DNS is usually run with periodic boundaries or artificial forcing that hold a statistically stationary state. The boundary conditions differ from those of an industrial geometry, so a comparison only makes sense if "the same statistic is measured in the same region."
- **k-ε is excellent for free shear flows but weak at separation.** The free jets, wakes, and mixing layers of the previous chapter are k-ε's home turf, but on a separated wake behind a vehicle k-ε tends to delay the predicted separation point. That is why SST became the industrial default.

## In Python

The decision rule from Main 3, written as code. Apply it to three example cases.

```python
import numpy as np

def recommend(Re, time_budget_hours, is_near_wall_important):
    # Direct translation of the rule from Main 3
    if Re < 5000 and time_budget_hours > 100:
        return "DNS"
    if is_near_wall_important and time_budget_hours > 24:
        return "LES (resolve wall)"
    if is_near_wall_important and time_budget_hours <= 24:
        return "RANS k-ω SST"
    if (not is_near_wall_important) and time_budget_hours > 24:
        return "DES"
    return "RANS k-ε with wall functions"

# Case 1: low-Re channel experiment reproduction (research)
print(recommend(Re=3000, time_budget_hours=200,
                is_near_wall_important=True))

# Case 2: external automotive aero, separated wake accuracy
print(recommend(Re=2.0e6, time_budget_hours=72,
                is_near_wall_important=False))

# Case 3: pump impeller design iteration (same-day answer)
print(recommend(Re=5.0e5, time_budget_hours=8,
                is_near_wall_important=True))
```

The outputs are `DNS`, `DES`, and `RANS k-ω SST` respectively. The rule is crude, but it is enough for a first call. In a real project, validation-data availability, license cost, and team experience will all weigh in on top of it.

## Closing

Sincere thanks to every reader who stayed through to here. The goal of this book was never to make you a turbulence specialist — it was to make you able to read someone else's CFD work critically. The next step belongs to your own hands on a keyboard: pick one of the open codes — [OpenFOAM](https://openfoam.org/), [SU2](https://su2code.github.io/), or [code_saturne](https://www.code-saturne.org/) — and reproduce a canonical case such as a flat-plate boundary layer or the backward-facing step. The real journey starts there.
