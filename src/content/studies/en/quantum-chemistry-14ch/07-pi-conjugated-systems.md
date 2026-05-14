---
title: 'π-conjugated systems — the Hückel method and molecular color'
description: 'Solve the ladder of π orbitals that benzene''s six carbons build with a single 6×6 matrix, and the molecule''s color falls out.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 7
lang: en
pairSlug: qc-pi-conjugated
draft: false
updated: 2026-05-14
---

# π-conjugated systems — the Hückel method and molecular color

> Solve the ladder of π orbitals that benzene's six carbons build with a single 6×6 matrix, and the molecule's color falls out.

## Opening

If chapter 6 showed you the bonding and antibonding orbitals between two atoms, this chapter lifts that picture onto a *ring*. A planar molecule like benzene carries its π electrons floating above a σ framework, and those π electrons decide which light the molecule absorbs. By the end of this chapter you can state the three lines of approximation the Hückel method makes, obtain benzene's six π-orbital energies by hand — really, by diagonalizing one 6×6 matrix — and estimate from the HOMO–LUMO gap, in a single line, whether a molecule will have a color in the visible range.

## Main 1 — The Hückel approximation as a blade

In a planar molecule, the π electrons live as a linear combination of carbon $2p_z$ atomic orbitals (AOs), the ones pointing *above and below* the molecular plane. With $n$ carbons there are $n$ such $2p_z$ AOs, and **LCAO** (linear combination of atomic orbitals) produces $n$ molecular orbitals (MOs). The trouble is that finding these MOs in principle means solving an $n \times n$ Fock matrix — out of reach for a 1930s hand calculation.

In 1931 **Erich Hückel** simplified that matrix with four crude — but effective — approximations.

1. **σ-π separation.** Look at the π electrons only. Absorb the σ framework into a background potential and ignore it.
2. **On-site integrals are all equal.** For every carbon $i$, $H_{ii} = \alpha$ (alpha, the *Coulomb integral*). Since $\alpha$ is added equally to every MO, it is merely the energy origin.
3. **Only neighbors interact.** If two carbons $i, j$ are *directly* joined by a chemical bond, $H_{ij} = \beta$ (beta, the *resonance integral*, a negative number); otherwise $H_{ij} = 0$.
4. **Neglect overlap.** $S_{ij} = \delta_{ij}$ — one on the diagonal, zero off it.

What these four lines mean is clear. **The Hückel matrix is the adjacency matrix of the molecular skeleton, scaled by $\beta$ with $\alpha$ laid on the diagonal.** The molecule's energy problem reduces to a problem in graph theory.

## Main 2 — Benzene's 6×6 matrix

Benzene is a ring of six carbons. Carbon 1 is bonded to carbons 2 and 6, carbon 2 to carbons 1 and 3, and in general carbon $k$ is bonded to $k \pm 1 \pmod 6$. So the Hückel matrix is

$$
\hat H = \alpha\, I + \beta \begin{pmatrix}
0 & 1 & 0 & 0 & 0 & 1 \\
1 & 0 & 1 & 0 & 0 & 0 \\
0 & 1 & 0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 & 0 & 1 \\
1 & 0 & 0 & 0 & 1 & 0
\end{pmatrix}.
$$

Thanks to the cyclic symmetry of the ring, this matrix can be diagonalized by hand. The plane waves on the ring, $\psi_k(j) = e^{2\pi i k j / 6}$, are the eigenfunctions, and the eigenvalues fall out as

$$
E_k = \alpha + 2\beta \cos\!\left(\frac{2\pi k}{6}\right), \quad k = 0, 1, 2, 3, 4, 5.
$$

Substituting the cosine values, the six MO energies are $\alpha + 2\beta$, $\alpha + \beta$ (doubly degenerate), $\alpha - \beta$ (doubly degenerate), and $\alpha - 2\beta$. Since $\beta < 0$, the lowest energy is $\alpha + 2\beta$ and the highest is $\alpha - 2\beta$.

Each carbon contributes one π electron, so there are six electrons to place. By the Pauli principle, two per MO, the three lowest MOs fill — these three are the **bonding π orbitals**. The highest occupied orbital, the **HOMO** (highest occupied MO), sits at $\alpha + \beta$; the lowest empty orbital, the **LUMO** (lowest unoccupied MO), sits at $\alpha - \beta$. The gap between them is

$$
\Delta E_{\text{HOMO-LUMO}} = 2|\beta|.
$$

Benzene's color — if it has one — is decided by this gap.

## Main 3 — From gap to color

The standard Hückel value of $|\beta|$ is about 2.7 eV. Then benzene's gap is $2|\beta| \approx 5.4$ eV. The photon energy–wavelength relation is $\lambda = hc/\Delta E$, and keeping the handy constant $hc \approx 1240$ nm·eV in mind,

$$
\lambda \approx \frac{1240\,\text{nm·eV}}{5.4\,\text{eV}} \approx 230\,\text{nm}.
$$

That is far below the visible range (about 380–750 nm) — deep ultraviolet. **Benzene is therefore colorless:** no frequency of light the human eye sees can lift the HOMO electron to the LUMO.

It gets interesting when the chain grows longer. Apply the same Hückel logic to a *straight* polyene of $N$ carbons and it becomes, in essence, a one-dimensional particle-in-a-box problem of length $L \propto N$ — chapter 13 revisits this properly. There $\Delta E \propto 1/L \propto 1/N$ falls out: the longer the chain, the smaller the gap, and the absorption wavelength moves into the visible. Indigo (blue jeans), beta-carotene (the orange of carrots), chlorophyll (the green of leaves), hemoglobin (the red of blood) — all are the result of a long-enough π-conjugated system whose HOMO–LUMO transition lands inside our retina's sensitivity band. The everyday phenomenon of molecular color reduces to the eigenvalue spacing of a 6×6, or slightly larger, adjacency matrix.

## In Python

```python
# Build benzene's Hückel matrix, diagonalize it,
# and convert the HOMO-LUMO gap into a wavelength.
import numpy as np

# Work in units where alpha = 0, beta = -1 (energy unit = |beta|).
n = 6
A = np.zeros((n, n))
for i in range(n):
    A[i, (i + 1) % n] = 1.0
    A[i, (i - 1) % n] = 1.0
H = -A  # alpha = 0, beta = -1 -> H_ij = -1 for neighbors only

# H is symmetric, so use eigh.
eigvals = np.sort(np.linalg.eigvalsh(H))
print("MO energies (units of |beta|):", np.round(eigvals, 3))
# expected: [-2, -1, -1, 1, 1, 2]

# HOMO = 3rd orbital (0-index 2), LUMO = 4th (0-index 3).
gap_in_beta = eigvals[3] - eigvals[2]      # = 2
beta_eV = 2.7                              # |beta| ~ 2.7 eV (standard Hückel value)
gap_eV  = gap_in_beta * beta_eV
hc_nm_eV = 1240.0
lam_nm = hc_nm_eV / gap_eV
print(f"HOMO-LUMO gap     = {gap_eV:.2f} eV")
print(f"absorption length = {lam_nm:.1f} nm")
print("in visible (380-750 nm)?", 380 <= lam_nm <= 750)
```

The output is `[-2, -1, -1, 1, 1, 2]`, a gap of 5.4 eV, a wavelength of about 230 nm, and `False` for the visible-range check. Benzene is colorless — exactly matching the result we solved by hand.

## To the next chapter

[Chapter 8: molecular shape and electronic states](../08-molecular-shape-and-electronic-states/) brings back the σ framework this chapter ignored and shows how hybridization and VSEPR fix the *three-dimensional shape* of a molecule. If the π system set the color in this chapter, the σ system sets the shape in the next.
