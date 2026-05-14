---
title: 'Perturbation theory — KAM and resonance'
description: 'Add a small perturbation to an integrable Hamiltonian and most invariant tori survive — but resonant ones break. How integrability fails, gently.'
book: analytical-mechanics-2
bookTitle: Analytical Mechanics II
chapter: 4
lang: en
pairSlug: am2-perturbation-theory
draft: false
updated: 2026-05-14
---

# Perturbation theory — KAM and resonance

> Add a small perturbation to an integrable Hamiltonian and most invariant tori survive — but resonant ones break. How integrability fails, gently.

## Opening

In Chapter 3 we saw how an integrable Hamiltonian system, written in action–angle variables $(J, \theta)$, foliates phase space into a stack of invariant tori. But almost no system in nature is integrable. Are integrable models therefore just textbook scaffolding? The KAM theorem (Kolmogorov–Arnold–Moser) gives a surprisingly sharp answer. By the end of this chapter the reader should be able to (1) explain why a small perturbation preserves *most* tori while ruthlessly destroying a few, and (2) state in a single sentence why "resonance" links a child's swing, a forced oscillator, and the long-term stability of the solar system through the same mechanism.

## Main 1 — The setup and the small-divisor problem

Begin with an integrable Hamiltonian $H_0(J)$. The actions $J = (J_1, \dots, J_n)$ are constants of motion, and each angle $\theta_i$ winds at a fixed angular frequency

$$
\omega_i(J) = \frac{\partial H_0}{\partial J_i}
$$

so each trajectory is a straight line on an $n$-dimensional torus. Now add a small perturbation:

$$
H(J, \theta) = H_0(J) + \epsilon\, H_1(J, \theta)
$$

where $\epsilon$ (epsilon, a small dimensionless parameter) satisfies $|\epsilon| \ll 1$. The naive hope is that the new motion lives on slightly deformed tori with slightly shifted frequencies. Follow that hope formally and the perturbation series for the new tori develops, term by term, the following **denominator**:

$$
\frac{1}{\vec k \cdot \vec\omega}, \quad \vec k = (k_1, \dots, k_n) \in \mathbb{Z}^n \setminus \{0\}
$$

If the frequency vector $\vec\omega = (\omega_1, \dots, \omega_n)$ is **rationally commensurate** — that is, $\vec k \cdot \vec\omega = 0$ for some nonzero integer $\vec k$ — that term diverges outright. Even when $\vec\omega$ is incommensurate, $\vec k \cdot \vec\omega$ can be made arbitrarily small by choosing larger $\vec k$. This is the **small-divisor problem** that confronted Poincaré in the nineteenth century and stalled the subject for fifty years.

## Main 2 — The resonance condition

For a two-degree-of-freedom system, the frequencies $\omega_1, \omega_2$ are in **resonance** when

$$
m\, \omega_1 + n\, \omega_2 = 0, \quad (m, n) \in \mathbb{Z}^2 \setminus \{(0,0)\}
$$

for some integer pair $(m,n)$ not both zero. At resonance the effect of the perturbation does not time-average to zero; it **accumulates linearly in time**. The mechanism is familiar — push a swing at its natural frequency and the amplitude grows linearly with $t$, exactly as a forced simple harmonic oscillator at its natural frequency exhibits a response proportional to $t$. The new feature in many-degree-of-freedom systems is that the resonance lattice is *dense* in phase space, so along every rational direction one torus is broken.

In place of a broken torus, **resonance islands** appear, separated by thin chaotic layers. The width of those layers shrinks as a positive power of $\epsilon$, so for small $\epsilon$ they occupy only a tiny fraction of the stage.

## Main 3 — KAM in one paragraph

Kolmogorov announced the theorem in 1954; Arnold (1963) and Moser (1962) completed it. The statement: if $H_0$ is **non-degenerate**, meaning the frequency map has non-vanishing Jacobian,

$$
\det\!\left( \frac{\partial^2 H_0}{\partial J_i\, \partial J_j} \right) \ne 0
$$

and $H_1$ is sufficiently smooth, then for sufficiently small $\epsilon$ **most invariant tori survive**. Precisely: a torus survives whenever its frequency vector $\vec\omega$ satisfies a **Diophantine condition** — there exist constants $\gamma, \tau > 0$ such that

$$
|\vec k \cdot \vec\omega| \ge \gamma\, |\vec k|^{-\tau}, \quad \forall\, \vec k \in \mathbb{Z}^n \setminus \{0\}
$$

The surviving tori form a **Cantor-like set of positive measure** in phase space — dense but full of gaps. Those gaps are exactly where the broken resonant tori once lived, and they are filled with chaotic motion.

The physical conclusion is sharp. Integrability is **fragile** — any perturbation breaks it. But the breaking is **not catastrophic**: as $\epsilon \to 0$ the measure of surviving tori tends to one. This is the first clue to why the solar system has behaved as if nearly integrable for billions of years, and at the same time it is the finger that points to where chaos enters.

## In Python

We drive a pendulum, $H = p^2/2 + \cos q - 0.1\cos(\omega_d t)$, with RK4 and sweep the driving frequency $\omega_d$. The small-angle natural frequency is $\omega_{\text{nat}} = 1$; the response should peak nearby.

```python
import numpy as np
import matplotlib.pyplot as plt

# Driven pendulum: dq/dt = p, dp/dt = -sin(q) + 0.1*sin(wd*t)
# Derived from H = p^2/2 + cos(q) - 0.1*cos(wd*t)
def deriv(t, y, wd):
    q, p = y
    return np.array([p, -np.sin(q) + 0.1 * np.sin(wd * t)])

def rk4(y0, t, wd):
    y = np.zeros((len(t), 2)); y[0] = y0
    for i in range(len(t) - 1):
        h = t[i+1] - t[i]
        k1 = deriv(t[i],       y[i],          wd)
        k2 = deriv(t[i] + h/2, y[i] + h*k1/2, wd)
        k3 = deriv(t[i] + h/2, y[i] + h*k2/2, wd)
        k4 = deriv(t[i] + h,   y[i] + h*k3,   wd)
        y[i+1] = y[i] + h * (k1 + 2*k2 + 2*k3 + k4) / 6
    return y

t = np.linspace(0, 200, 4001)
wds = np.linspace(0.5, 2.0, 20)
amps = [np.max(np.abs(rk4(np.array([0.1, 0.0]), t, wd)[:, 0])) for wd in wds]

plt.plot(wds, amps, 'o-')
plt.axvline(1.0, color='r', ls='--', label=r'$\omega_{\rm nat}=1$')
plt.xlabel(r'$\omega_d$'); plt.ylabel(r'max $|q(t)|$')
plt.legend(); plt.show()
```

A peak near $\omega_d \approx 1$ is the linear-in-time accumulation of Main 2 made tactile.

## To the next chapter

[Chapter 5: Extension to continuum mechanics](../05-continuum-mechanics/) lifts the finite-degree Hamiltonian picture to fields — infinite degrees of freedom. Mode amplitudes take the place of action–angle variables; infinite-dimensional phase space takes the place of the torus. The intuition from this chapter — most survives, a measure-zero minority breaks — returns in field theory, although in considerably more delicate form.
