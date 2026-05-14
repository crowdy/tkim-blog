---
title: 'What is turbulence — definition and classification'
description: 'Starting from why turbulence resists a one-line definition, through the laminar/transition/turbulent boundaries, and laying out the full study roadmap for the book.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 1
lang: en
pairSlug: turbulence-what-is
draft: false
updated: 2026-05-14
---

# What is turbulence — definition and classification

> Starting from why turbulence resists a one-line definition, through the laminar/transition/turbulent boundaries, and laying out the full study roadmap for the book.

## Opening

The book is organized into 12 chapters, and each chapter assumes the concepts of the one before it. Chapter 1 therefore doubles as a study map — not just a definition of turbulence, but a decision about **the order in which to read the remaining 11 chapters**.

## Turbulence is handled as a "set of properties," not a single definition

Textbooks avoid defining turbulence in a single sentence for a reason. Turbulence does not fit any one mathematical definition; it is identified as **a state in which several properties hold simultaneously**.

- **Irregularity** — deterministic but unpredictable
- **Diffusivity** — rapid mixing of momentum, heat, and mass
- **High Reynolds number** — inertial forces dominate viscous forces
- **Three-dimensional vorticity fluctuations** — vortex stretching is central
- **Dissipation** — kinetic energy converts to heat through viscosity at small scales

When all five hold simultaneously, we call the flow turbulent. A state where only one or two are present may be in *transition*, or it may be a *chaotic system*, but it is not turbulence.

## Laminar → transition → turbulent

The ink visualization in Reynolds' experiment (1883) made three states visible:

| State | Re | Characteristic |
|---|---|---|
| Laminar | < 2,300 (pipe flow) | Ink line remains straight |
| Transition | 2,300–4,000 | Ink line wavers but stays continuous |
| Turbulent | > 4,000 | Ink diffuses across the entire section |

The boundary values for pipe flow are highly sensitive to external disturbance, so the exact numbers vary by textbook. What matters is not the numerical threshold but the fact that **a single variable — the Reynolds number — determines the qualitative state of the flow**.

## Study roadmap for the book

The 12-chapter sequence is:

1. **What is turbulence** (← you are here)
2. Tensor notation and coordinate systems
3. Revisiting the Navier–Stokes equations
4. Vorticity and the vorticity equation
5. Reynolds averaging and the RANS equations
6. Turbulent viscosity models (mixing length, k-ε, k-ω)
7. Boundary layer theory
8. Free shear flows (jet, wake, mixing layer)
9. Isotropic turbulence and the energy cascade
10. Direct Numerical Simulation (DNS)
11. Large Eddy Simulation (LES)
12. Application: model selection in industrial CFD

Prerequisites: undergraduate-level fluid mechanics plus vector/tensor calculus. From Chapter 6 onward (turbulent viscosity models), real intuition does not arrive without actually running CFD code, so an appendix will cover OpenFOAM or SU2 examples separately.

## To the next chapter

[Chapter 2: Tensor notation and coordinate systems](../02-tensor-notation/) sets the notation before any serious derivation. If you are not comfortable with tensor notation, read Chapter 2 twice — every later chapter will assume it.
