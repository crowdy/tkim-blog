---
title: 'Molecular shape and electronic states — VSEPR, hybridization, term symbols'
description: 'Predict a molecule''s shape from its valence-electron count alone, and use the same logic to pin a $^{2S+1}L_J$ label onto an atom''s ground state.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 8
lang: en
pairSlug: qc-molecular-shape
draft: false
updated: 2026-05-14
---

# Molecular shape and electronic states — VSEPR, hybridization, term symbols

> Predict a molecule's shape from its valence-electron count alone, and use the same logic to pin a $^{2S+1}L_J$ label onto an atom's ground state.

## Opening

Chapter 7 worked with Slater determinants and molecular orbitals (MOs) for many-electron molecules. This chapter comes down to a more tangible picture — *why does a molecule take the shape it does?* The reason H$_2$O bends, NH$_3$ is umbrella-shaped, and CH$_4$ is a perfect tetrahedron, once unpacked, is all a consequence of one sentence: electron pairs try to get as far apart as they can. After this chapter you can predict a molecule's shape immediately from the number of bonded atoms and lone pairs around the central atom, see how that prediction meshes with the *mathematical* picture of hybrid orbitals, and explain in one line how the same reasoning, at the atomic level, organizes into the term symbol $^{2S+1}L_J$.

## Main 1 — VSEPR: electron pairs choose the positions

The **VSEPR (valence-shell electron-pair repulsion)** model rests on a single premise. The electron pairs around a central atom — whether bonding pairs or lone pairs — repel one another, so they adopt the arrangement that maximizes their separation. The shape follows from that one line.

The quantity we count is the **steric number (SN)**.

$$
\text{SN} = (\text{number of bonded atoms}) + (\text{number of lone pairs})
$$

The standard geometry for each steric number is as follows.

- **SN = 2** → linear, bond angle 180°. Examples: BeCl$_2$, CO$_2$.
- **SN = 3** → trigonal planar, 120°. Example: BF$_3$.
- **SN = 4** → tetrahedral, 109.5°. Example: CH$_4$. With one lone pair it collapses to **trigonal pyramidal**, giving NH$_3$ (~107°). With two lone pairs it narrows further to **bent**, giving H$_2$O (~104.5°).
- **SN = 5** → trigonal bipyramidal, 90° axial / 120° equatorial. Example: PCl$_5$.
- **SN = 6** → octahedral, 90°. Example: SF$_6$.

There is a reason H$_2$O's bond angle is 104.5°, *tighter* than the ideal tetrahedral 109.5°. A lone pair is not tied down to a proton, so it is more spatially diffuse and takes up more room than a bonding pair. The lone pairs therefore push the bonding pairs *inward from the outside*, squeezing the angle. NH$_3$'s 107° is a weaker version of the same effect. VSEPR gets this far quantitatively without invoking quantum mechanics at all.

## Main 2 — Hybridization: how to re-shape atomic orbitals

If VSEPR tells you *what shape* you get, **hybridization** tells you *how to recombine the central atom's atomic orbitals (AOs)* to match that shape.

Carbon's ground-state configuration is $1s^2 2s^2 2p^2$, but when it forms four equivalent bonds as in CH$_4$, we mix one $2s$ and three $2p$ AOs into four equivalent $sp^3$ hybrid orbitals. These four point to the corners of a tetrahedron. For a trigonal-planar case — BF$_3$, or the carbons of ethylene — we mix $2s$ + $2p_x$ + $2p_y$ into three $sp^2$ hybrids plus one leftover $2p_z$; for a linear case — the carbons of acetylene — we mix only $2s$ + $2p_x$ into two $sp$ hybrids plus two leftover $2p$. The rule is one line.

$$
\text{steric number} = \text{number of hybrid orbitals}
$$

The leftover unhybridized $p$ orbitals meet the matching $p$ on a neighboring atom and form $\pi$ bonds (chapter 6). A double bond is $sp^2$ + $\pi$; a triple bond is $sp$ + $\pi \times 2$.

One caution. Hybridization is not a *measured fact* but a *post-hoc description*. We take the experimental result that a molecule is tetrahedral and then *choose* an orbital basis to fit it. Even so, this description lets us organize bond angles, the presence of $\pi$ bonds, and planarity all at once.

## Main 3 — Atomic term symbols $^{2S+1}L_J$

Organizing the same reasoning at the *atomic* level gives the **term symbol** $^{2S+1}L_J$. Call the total orbital angular momentum of an atom $L$, the total spin $S$ (capital, summed over all electrons), and the total angular momentum $J = L + S$. The notation reads as follows.

- The superscript $2S+1$ — the **multiplicity**.
- The central letter — the $L$ value. $L = 0, 1, 2, 3 \to$ S, P, D, F.
- The subscript — $J$.

This label distinguishes the slightly different states that share one electron configuration. Which one is the *ground state* is decided by **Hund's rules**.

1. Maximize $S$.
2. For fixed $S$, maximize $L$.
3. For a less-than-half-filled shell, minimize $J$ (for more than half full, the opposite).

Let us do nitrogen ($1s^2 2s^2 2p^3$) directly. Three electrons go into the three $2p$ slots $m_\ell = -1, 0, +1$; Hund's first rule aligns all three to the same spin, so $S = 3/2$. The sum of the magnetic quantum numbers is $-1 + 0 + 1 = 0$, so $L = 0$ → the letter is S. $J$ runs from $|L - S|$ to $|L + S|$, and for a less-than-half-filled shell we take the smallest value: $J = 3/2$. The result is

$$
^4 S_{3/2}
$$

That is nitrogen's ground-state label. Multiplicity 4 means there are $2S+1 = 4$ microstates of the same energy.

Molecules carry symbols of the same kind. The ground state of H$_2$ is $^1\Sigma_g^+$; the ground state of O$_2$ is $^3\Sigma_g^-$ (which is why the oxygen molecule is paramagnetic). Here $\Sigma, \Pi, \Delta$ are the $L$-analog for angular momentum along the molecular axis, $g/u$ labels inversion symmetry, and $\pm$ labels mirror symmetry. The deeper classification reappears in chapter 9 on spectroscopy.

## In Python

```python
# A VSEPR classifier: from bond count and lone-pair count alone,
# return the steric number and the shape. We also print the
# experimental bond angle alongside.

SHAPES = {
    (2, 0): ("linear",               180.0),
    (3, 0): ("trigonal planar",      120.0),
    (4, 0): ("tetrahedral",          109.5),
    (3, 1): ("trigonal pyramidal",   107.0),
    (2, 2): ("bent",                 104.5),
    (5, 0): ("trigonal bipyramidal",  90.0),
    (6, 0): ("octahedral",            90.0),
}

def vsepr(bonding, lone):
    sn = bonding + lone
    shape, angle = SHAPES[(bonding, lone)]
    return sn, shape, angle

cases = [
    ("H2O",   2, 2),
    ("NH3",   3, 1),
    ("CH4",   4, 0),
    ("BeCl2", 2, 0),
    ("BF3",   3, 0),
    ("PCl5",  5, 0),
    ("SF6",   6, 0),
]

print(f"{'formula':<6}  {'SN':>2}  {'shape':<22}  angle")
print("-" * 46)
for formula, b, l in cases:
    sn, shape, angle = vsepr(b, l)
    print(f"{formula:<6}  {sn:>2}  {shape:<22}  {angle:5.1f}°")
```

If each line of the output matches the shape and angle predicted in the text, you have taken hold of the geometry of seven molecules with the one-line rule that electron pairs spread apart.

## To the next chapter

In [Chapter 9: How molecules interact with light](../09-molecule-light-interaction/) we see which state a molecule's electronic state — its shape, hybridization, term symbol — can *transition* to when it meets light, and how the selection rules for that are fixed. The photon picture of chapter 4 and the state picture of this chapter merge there.
