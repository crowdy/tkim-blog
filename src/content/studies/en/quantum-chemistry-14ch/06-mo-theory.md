---
title: 'MO theory — LCAO, bonding and antibonding'
description: 'Adding or subtracting two atomic orbitals is enough to make the whole picture — bonding, antibonding, σ and π — fall out by itself; we follow it through H₂⁺ end to end.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 6
lang: en
pairSlug: qc-mo-theory
draft: false
updated: 2026-05-14
---

# MO theory — LCAO, bonding and antibonding

> Adding or subtracting two atomic orbitals is enough to make the whole picture — bonding, antibonding, σ and π — fall out by itself; we follow it through H₂⁺ end to end.

## Opening

In chapter 5 we treated chemical bonds with the Lewis picture: a pair of electrons shared between two atoms. This chapter replaces that picture with a quantum-mechanical one. The central tool is **LCAO (Linear Combination of Atomic Orbitals)** — the deceptively simple prescription of writing a molecular orbital as a sum of atomic orbitals. From that one line, bonding and antibonding orbitals, the distinction between σ and π, and even the question "why does He₂ not form a stable molecule?" come out automatically. Next chapter's π-conjugated systems and Hückel theory only read cleanly after the σ/π split of this chapter is in your head.

## Main 1 — The LCAO ansatz

The function that tells us where the electron lives in a molecule is the **molecular orbital (MO)** $\psi$ (psi). Solving for $\psi$ exactly requires the full many-body Schrödinger equation, but there is an intuitive approximation. Take an atomic orbital $\phi_A$ (phi) centered on atom A and another $\phi_B$ centered on atom B, and write the MO as their linear combination. For the simplest homonuclear diatomic (H₂⁺ or H₂), the two atoms are chemically equivalent, so symmetry forces $|c_A| = |c_B|$. The only allowed combinations are

$$
\psi_\pm = c_A \phi_A \pm c_B \phi_B.
$$

Imposing normalization $\int |\psi_\pm|^2\,d\vec r = 1$ brings in the **overlap integral** $S = \langle\phi_A|\phi_B\rangle$ between the two atomic orbitals automatically, giving

$$
\psi_\pm = \frac{1}{\sqrt{2(1 \pm S)}}\,(\phi_A \pm \phi_B).
$$

The $+$ combination piles electron density up between the two nuclei — the two 1s functions add *constructively* in the internuclear region. This is the **bonding** MO. The $-$ combination produces a nodal plane right between the nuclei, draining density out of the internuclear region. This is the **antibonding** MO. The two are conventionally written $\sigma$ and $\sigma^*$.

## Main 2 — Bonding and antibonding are not symmetric

The single most important quantitative fact that drops out of LCAO is that the two MO energies are **not symmetric** about the atomic level. Write the Hamiltonian matrix elements as $H_{AA} = H_{BB} = \alpha$ on-site (the **Coulomb integral**) and $H_{AB} = \beta$ off-site (the **resonance integral** or hopping integral). For a stable bond, $\beta$ is negative. Then the two MO energies are

$$
E_\pm = \frac{H_{AA} \pm H_{AB}}{1 \pm S} = \frac{\alpha \pm \beta}{1 \pm S}.
$$

Measured from $\alpha$, the bonding orbital sits *below* the atomic level by $\,|(\beta - \alpha S)/(1+S)|\,$, and the antibonding sits *above* by $\,|(\beta - \alpha S)/(1-S)|\,$. Because of the $1 \pm S$ in the denominators, **the antibonding orbital is destabilized by more than the bonding orbital is stabilized**. This single line produces the famous consequence: two atoms supplying two electrons (H₂) put both into the bonding MO and the molecule is stable. Four electrons (hypothetical He₂) would put two into bonding and two into antibonding — and because the antibonding penalty outweighs the bonding gain, the *net* is destabilizing. That is the quantum-mechanical reason helium remains a noble gas: He₂ is not a molecule.

## Main 3 — σ and π

LCAO does not stop at adding 1s to 1s. The atomic orbitals you can mix come in many shapes, and depending on which ones you mix, the resulting MO has different **spatial symmetry** about the bond axis. If the MO is invariant under rotation about the bond axis (taken as the $z$ axis) — that is, cylindrically symmetric — it is called a $\sigma$ orbital. The 1s + 1s combination is a σ, and so is the *end-on* combination of two 2p$_z$ orbitals pointing at each other. If the MO has a nodal plane that contains the bond axis, it is called a $\pi$ orbital. Two 2p$_x$ (or two 2p$_y$) orbitals overlapping *side-on*, parallel to each other, give a π orbital.

This classification lines up exactly with the chemical hierarchy of bonds. Single bond = 1σ. Double bond = 1σ + 1π. Triple bond = 1σ + 2π. The σ bond piles electron density right between the two nuclei, so it is *short and strong*. The π bond overlaps only sideways, so it is weaker than σ — but the *extra energy* of double and triple bonds, and the *rotational rigidity* of a double bond (you cannot freely rotate around C=C), come entirely from those π bonds. The π-conjugated systems of the next chapter — butadiene, benzene — keep the σ skeleton frozen and zoom in only on the π orbitals, which Hückel theory then diagonalizes as a small matrix.

## In Python

```python
# H2+ bonding/antibonding curves from LCAO with Slater 1s orbitals.
# Atomic units: hbar = m_e = e = 4πε₀ = 1. Lengths in Bohr radii.
import numpy as np
import matplotlib.pyplot as plt

R = np.linspace(0.5, 6.0, 200)

# Overlap and Hamiltonian matrix elements (closed forms for 1s-1s, H2+)
S   = (1 + R + R**2 / 3) * np.exp(-R)
T_AA = 0.5 * np.ones_like(R)
V_AA = -1.0/R + (1.0 + 1.0/R) * np.exp(-2*R)
T_AB = -0.5 * (S - 2 * (1 + R) * np.exp(-R))
V_AB = -(1 + R) * np.exp(-R) / R

H_AA = T_AA + V_AA
H_AB = T_AB + V_AB

# Electronic energy plus internuclear repulsion 1/R
E_plus  = (H_AA + H_AB) / (1 + S) + 1.0 / R   # bonding σ
E_minus = (H_AA - H_AB) / (1 - S) + 1.0 / R   # antibonding σ*

i_min = int(np.argmin(E_plus))
print(f"bonding minimum at R ≈ {R[i_min]:.2f} a0, E ≈ {E_plus[i_min]:.3f} Hartree")

plt.plot(R, E_plus,  label="σ (bonding)")
plt.plot(R, E_minus, label="σ* (antibonding)")
plt.axhline(-0.5, color="0.6", lw=0.8, ls="--", label="H + H⁺ dissociation")
plt.xlabel("R / a₀"); plt.ylabel("E / Hartree")
plt.title("H₂⁺: LCAO bonding / antibonding curves")
plt.legend(); plt.tight_layout(); plt.show()
```

If the bonding curve dips to $E \approx -0.602$ Hartree (about $-16.4$ eV) near $R \approx 2$ a$_0$ ($\approx 1.06$ Å), that is roughly $0.10$ Hartree below the H + H⁺ asymptote at $-0.5$ Hartree. It is the same order of magnitude as the experimental binding energy of $2.79$ eV — confirmation, by your own hand, that the one-line LCAO prescription works not only qualitatively but quantitatively.

## To the next chapter

In [Chapter 7: π-conjugated systems and Hückel theory](../07-pi-conjugated-systems/) we freeze the σ skeleton that we isolated here and look only at the π MOs of conjugated chains such as butadiene and benzene. Diagonalizing the small Hückel matrix gives molecular colors, reactivities and aromaticity in one shot. With the bonding/antibonding picture and the σ/π classification in mind, that next chapter's Hückel matrix should read as an almost trivial generalization of what you have just done.
