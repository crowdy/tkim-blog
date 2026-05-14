---
title: 'Boundary Layer Theory — the Flow is Decided Near the Wall'
description: 'The thin boundary layer on a flat plate, the friction velocity drawn out of wall shear stress, and the "law of the wall" for turbulent boundary layers — enough to answer why a CFD code asks for the $y^+$ of the first cell.'
book: turbulence-fundamentals
bookTitle: Fundamentals of Turbulence Analysis
chapter: 7
lang: en
pairSlug: turbulence-boundary-layer
draft: false
updated: 2026-05-14
---

# Boundary Layer Theory — the Flow is Decided Near the Wall

> The thin boundary layer on a flat plate, the friction velocity drawn out of wall shear stress, and the "law of the wall" for turbulent boundary layers — enough to answer why a CFD code asks for the $y^+$ of the first cell.

## Opening

By the end of this chapter you should be able to do two things. First, sketch the **law of the wall** from scratch on a piece of paper. Second, explain to a friend why the line "first cell $y^+ \approx 1$" in a CFD report matters so much. The turbulence-viscosity models from Chapter 6 misbehave most stubbornly near walls, which is why the boundary layer comes up in almost every modelling discussion.

## Main 1 — A boundary layer is a thin sheet stuck to the wall

The skin of a car, the wing of an airplane, the inside of a pipe — near every wall there is a **thin region where viscosity cannot be ignored**. We call this region the **boundary layer**. The velocity is zero at the wall itself (the no-slip condition) and approaches the free-stream value $U_\infty$ ($U$ infinity, free-stream velocity) as you move away from it.

For laminar flow over a flat plate, the Blasius solution gives an approximate boundary-layer thickness $\delta$ (delta, boundary layer thickness):

$$
\delta(x) \approx 5 \sqrt{\nu x / U_\infty}
$$

Here $x$ is the distance measured from the leading edge of the plate, and $\nu$ (nu, kinematic viscosity) is the kinematic viscosity. The message of the formula is simple — as the flow runs along the wall, the boundary layer thickens slowly, in proportion to $\sqrt{x}$.

## Main 2 — Wall shear stress and friction velocity

Inside the boundary layer, the grip of the wall on the flow is captured by the **wall shear stress** $\tau_w$ (tau wall, wall shear):

$$
\tau_w = \mu \left.\frac{\partial u}{\partial y}\right|_{y=0}
$$

Here $\mu$ (mu, dynamic viscosity) is the dynamic viscosity, $u$ is the velocity along the wall, and $y$ is the perpendicular distance from the wall. The formula reads as "how steeply the velocity changes just above the wall, multiplied by viscosity."

Divide $\tau_w$ by the density $\rho$ (rho, density) and take the square root, and you get a new velocity scale with units of m/s:

$$
u_\tau = \sqrt{\tau_w / \rho}
$$

We call $u_\tau$ the **friction velocity**. The name says "velocity," but it is not the actual speed of any flow — it is a **velocity-dimensioned quantity derived from the stress the wall exerts on the flow**. If you re-measure every length and velocity inside the boundary layer in terms of $u_\tau$ and $\nu$, every flat-plate turbulent boundary layer collapses onto nearly the same shape. That is the punchline of the next section.

## Main 3 — Wall units and the law of the wall

The non-dimensional versions of $y$ and $u$, scaled by the friction velocity and the kinematic viscosity, are called **wall units**:

$$
y^+ = \frac{y u_\tau}{\nu}
$$

$$
u^+ = \frac{u}{u_\tau}
$$

$y^+$ (y plus) is the dimensionless distance from the wall, $u^+$ (u plus) is the dimensionless velocity. Redrawn in these coordinates, the turbulent boundary layer separates into three regions regardless of the specific flow:

- **Viscous sublayer**: $y^+ < 5$. Viscosity dominates and velocity is proportional to distance — $u^+ = y^+$.
- **Buffer layer**: $5 < y^+ < 30$. Viscous and turbulent effects compete on roughly equal terms. There is no simple closed-form expression.
- **Log layer**: $y^+ > 30$. Velocity grows like the logarithm of distance — $u^+ = (1/\kappa) \ln y^+ + B$, with $\kappa \approx 0.41$ (kappa, Kármán's constant) and $B \approx 5.0$.

Taken together, the three regions are the **law of the wall**. Industrial RANS calculations that aim to resolve the viscous sublayer demand **first cell $y^+ \lesssim 1$**. When the grid cost is too high, **wall functions** allow the first cell to sit at $30 \lesssim y^+ \lesssim 100$ and impose the log-law velocity there, at the price of accuracy for flows with separation or strong pressure gradients.

## In Python

Let us draw the law of the wall directly. The viscous sublayer is a straight line, the log layer is a logarithmic curve, and the buffer layer is left intentionally blank with an annotation.

```python
import numpy as np
import matplotlib.pyplot as plt

# Kármán constant and log-law intercept
kappa = 0.41
B = 5.0

# Viscous sublayer: y+ in [0.1, 5], u+ = y+
y_sub = np.linspace(0.1, 5.0, 50)
u_sub = y_sub

# Log layer: y+ in [30, 1000], u+ = (1/kappa) ln y+ + B
y_log = np.linspace(30.0, 1000.0, 200)
u_log = (1.0 / kappa) * np.log(y_log) + B

fig, ax = plt.subplots(figsize=(7, 5))
ax.semilogx(y_sub, u_sub, label=r"Viscous sublayer  $u^+ = y^+$")
ax.semilogx(y_log, u_log, label=r"Log layer  $u^+ = (1/\kappa)\ln y^+ + B$")

# Leave the buffer layer blank and annotate
ax.axvspan(5, 30, alpha=0.15, color="gray")
ax.text(12, 2, "Buffer layer\n(no closed form)", ha="center", va="center")

ax.set_xlabel(r"$y^+$")
ax.set_ylabel(r"$u^+$")
ax.set_title("Law of the wall — mean velocity profile in a turbulent boundary layer")
ax.legend()
ax.grid(True, which="both", alpha=0.3)
plt.tight_layout()
plt.show()
```

On a semilog x-axis the viscous sublayer looks like a curve and the log layer becomes a straight line — that is where the name "log layer" comes from. Saying the first cell has $y^+$ near one means that the mesh reaches all the way to the leftmost slice of this figure, the viscous sublayer.

## To the next chapter

[Chapter 8: Free shear flows](../08-free-shear-flows/) moves to turbulence without walls — jets, wakes, and mixing layers. Once the wall is gone, the friction-velocity scale disappears with it, and the velocity difference and width of the flow itself become the new scales. Comparing the wall-bounded and free cases makes it clear, in reverse, why the wall units of Chapter 7 were such a special tool.
