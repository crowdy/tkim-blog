---
title: 'Polarity and polarizability — dipole moment and induced dipole'
description: 'A molecule whose charge centers do not coincide carries a permanent dipole, and even one that does not builds an induced dipole $\vec\mu_{\rm ind} = \alpha \vec E$ inside an external field.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 10
lang: en
pairSlug: qc-polarity-polarization
draft: false
updated: 2026-05-14
---

# Polarity and polarizability — dipole moment and induced dipole

> A molecule whose charge centers do not coincide carries a permanent dipole, and even one that does not builds an induced dipole $\vec\mu_{\rm ind} = \alpha \vec E$ inside an external field.

## Opening

So far we have looked inside a single molecule — its bonds and molecular orbitals. This chapter is about how a molecule looks from the *outside*: the permanent dipole moment it carries on its own, and the induced dipole it builds in response to an electric field. After this chapter you can explain by geometry why H₂O is polar but CO₂ is not, and say in one line why refractive index, dispersion forces, and Raman scattering all start from the same quantity — polarizability.

## Main 1 — The permanent dipole moment

A molecule whose center of positive charge and center of negative charge do not coincide at a single point carries a **permanent dipole moment**. Its magnitude is

$$
\vec\mu = q \, \vec d
$$

where $q$ is the separated charge and $\vec d$ (vector d) is the displacement vector pointing from the negative charge center to the positive one. In chemistry the direction of $\vec\mu$ (mu, the dipole moment) is taken **from negative to positive** — the opposite of the physics convention, but we use the chemistry convention throughout this book. The unit is the **Debye**, with 1 D $= 3.336 \times 10^{-30}$ C·m.

Geometry alone fixes the polarity. Water H₂O is bent, so its two O–H bond dipoles do not cancel and leave $\mu \approx 1.85$ D. Carbon dioxide CO₂, by contrast, is linear O=C=O, so its two C=O dipoles cancel exactly and $\mu = 0$. HF is $\approx 1.83$ D; ammonia NH₃, with its pyramidal shape, is $\approx 1.47$ D. The key point: even with polar bonds, the molecule as a whole can be nonpolar.

## Main 2 — Induced dipole and polarizability

A molecule with no permanent dipole is still not indifferent to an external field. When a field $\vec E$ is applied, the electron cloud is pushed slightly in the direction opposite to the field, and an **induced dipole** appears. In the *linear response* regime, where the field is not too strong,

$$
\vec\mu_{\rm ind} = \alpha \, \vec E
$$

so the induced dipole is directly proportional to the field. The proportionality constant $\alpha$ (alpha, the **polarizability**) is a molecular property measuring how "soft" the electron cloud is. In CGS units it has the dimension of a volume, of order $10^{-30}$ m³ for small molecules. Larger molecules, with more loosely bound electrons, have larger $\alpha$. Strictly, for an anisotropic molecule $\alpha$ is a rank-2 tensor — a matrix with two indices linking the input direction to the output direction — but here we treat it as a scalar.

## Main 3 — Why this matters

Polarizability shows up everywhere in chemistry and optics. The refractive index is tied directly to it through the **Clausius–Mossotti relation**, $n^2 - 1 \propto N\alpha$, where $N$ is the number of molecules per unit volume. The dispersion forces between neutral molecules — the subject of chapter 11 — are the effect of each molecule's instantaneous dipole polarizing its neighbor. Raman scattering selection rules decide whether a vibrational mode is active by the "change in polarizability." A molecule's response to a laser field works the same way.

The total dipole of a molecule in a field expands as

$$
\vec\mu_{\rm total} = \vec\mu_0 + \alpha \vec E + O(E^2)
$$

where $\vec\mu_0$ is the permanent dipole, the linear term is the polarizability, and the term of order $E^2$ defines the **hyperpolarizability**, the basis for nonlinear optics.

## In Python

```python
# Plot the induced dipole mu_ind(E) = alpha * E for three polarizabilities.
# In the linear response regime all three curves should be straight lines.
import numpy as np
import matplotlib.pyplot as plt

# Electric field in atomic units (a.u.): 1 a.u. ~ 5.14e11 V/m
E = np.linspace(0, 0.05, 100)
alphas = [1, 5, 20]            # polarizabilities (a.u.)

for alpha in alphas:
    mu_ind = alpha * E         # linear response: mu_ind = alpha * E
    plt.plot(E, mu_ind, label=f"alpha = {alpha} a.u.")

plt.xlabel("electric field E (a.u.)")
plt.ylabel("induced dipole mu_ind (a.u.)")
plt.title("Induced dipole in the linear response regime")
plt.legend()
plt.show()
```

If all three curves come out as straight lines through the origin, you have checked linear response by hand. Note, though, that for most molecules nonlinear corrections — the hyperpolarizability term — start to matter beyond $E \sim 0.01$ a.u. The linear regime drawn here is a deliberate approximation.

## To the next chapter

[Chapter 11: Intermolecular forces](../11-intermolecular-forces/) takes the permanent and induced dipoles of this chapter and shows how they lead to attractions *between* molecules — dipole–dipole, dipole–induced-dipole, and the purely dispersive force. How a single quantity, polarizability, explains everything from the boiling point of a liquid to the condensation of a gas is the subject of that chapter.
