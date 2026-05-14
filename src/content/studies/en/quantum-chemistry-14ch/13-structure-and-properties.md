---
title: 'Structure and properties — conducting polymers, OLEDs, and the end of 14 chapters'
description: 'The length of a conjugated chain sets its color, and the same logic carries through to conducting polymers and OLEDs — the chapter that closes the journey from atoms to matter.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 13
lang: en
pairSlug: qc-structure-properties
draft: false
updated: 2026-05-14
---

# Structure and properties — conducting polymers, OLEDs, and the end of 14 chapters

> The length of a conjugated chain sets its color, and the same logic carries through to conducting polymers and OLEDs — the chapter that closes the journey from atoms to matter.

## Opening

This is the last chapter. If chapter 12 showed the band structure of solids, this chapter carries that logic to *materials made of molecules* — conducting polymers, organic semiconductors, OLEDs. The central tool we already met in chapter 7: approximate a conjugated π system as a 1D box, and the HOMO–LUMO gap shrinks as the chain grows longer. By the end of this chapter you will be able to compute quantitatively how conjugation length sets a molecule's color, and to state in one line why polyacetylene becomes a metal when doped and where the color of an OLED pixel comes from.

## Main 1 — Conjugation length sets the color

Consider a polyene of $N$ carbons conjugated in a line. Approximate the π electron cloud as confined to a 1D box of length $L = (N-1)d$ (C–C spacing $d \approx 1.4$ Å), and the particle-in-a-box formula of chapter 2 applies directly.

$$
E_n = \frac{n^2 \pi^2 \hbar^2}{2 m_e L^2}
$$

Here $\hbar$ (h-bar, the reduced Planck constant), and $m_e$ is the electron mass. By the Pauli principle $N/2$ levels are filled, so the HOMO is $n = N/2$, the LUMO is $n = N/2 + 1$, and the gap is

$$
\Delta E = E_{N/2+1} - E_{N/2} = \frac{\pi^2 \hbar^2}{2 m_e L^2}\,(N+1).
$$

Substituting $L = (N-1)d$ gives $\Delta E \propto (N+1)/(N-1)^2 \sim 1/N$ — the longer the chain, the smaller the gap, and the absorption wavelength $\lambda = hc/\Delta E$ grows roughly in proportion to $N$. A long conjugated chain like the beta-carotene in carrots absorbs the blue/green of visible light and so appears orange. The everyday phenomenon of molecular color reduces to a single integer: the chain length.

## Main 2 — Conducting polymers

The extreme of a long conjugated chain is a **conducting polymer**. Trans-polyacetylene $(\text{CH})_n$ was the breakthrough material shown in 1977 by Heeger, MacDiarmid, and Shirakawa — the demonstration that an organic polymer can have metallic conductivity when doped. The three received the 2000 Nobel Prize in Chemistry for the work.

Undoped polyacetylene has a **Peierls-distorted** ground state — *bond alternation*, with bond lengths alternating long and short. This alternation opens a band gap of about 1.5 eV. Doping (oxidation removes electrons, reduction adds them) pushes the Fermi level back into the band and creates conductivity. The same gap-narrowing logic applies directly to other conducting polymers like polythiophene and PEDOT-PSS.

## Main 3 — OLEDs, where chemistry meets the device

An **OLED (organic light-emitting diode)** is a sandwich: an electron-transport layer / an emissive organic molecule / a hole-transport layer. Electrons and holes injected from the electrodes recombine on the emissive molecule, releasing the energy as a photon at $h\nu = E_{\text{HOMO-LUMO}}$. Tune the emissive molecule's gap — through conjugation length and substituents — and you set the color. That is how the blue, green, and red pixel emitters of your phone screen are made.

From the device point of view, two numbers matter: external quantum efficiency (photons out per electron in) and lifetime (hours before degradation). As of 2026, the best blue OLEDs reach about 20% efficiency and 10,000 hours of lifetime — both still active research topics, because the large gap of a blue emitter degrades the molecule faster.

## In Python

```python
# Tabulate the HOMO-LUMO absorption wavelength and color of polyenes
# by conjugation length.
import numpy as np

h    = 6.62607015e-34
c    = 2.99792458e8
hbar = h / (2 * np.pi)
me   = 9.1093837e-31
eV   = 1.602176634e-19
d    = 1.4e-10        # C-C spacing [m]

def color_of(lam_nm):
    bands = [(380,"UV"),(450,"violet"),(490,"blue"),(570,"green"),
             (590,"yellow"),(620,"orange"),(750,"red")]
    for edge, name in bands:
        if lam_nm < edge:
            return name
    return "IR"

print(f"{'N':>3} {'L(nm)':>7} {'dE(eV)':>8} {'lam(nm)':>9}  color")
print("-" * 40)
for N in [4, 9, 10, 11, 12, 14]:
    L = (N - 1) * d
    dE = (np.pi**2 * hbar**2) / (2 * me * L**2) * (N + 1)   # J
    lam_nm = h * c / dE * 1e9
    print(f"{N:>3} {L*1e9:>7.2f} {dE/eV:>8.2f} {lam_nm:>9.1f}  {color_of(lam_nm)}")
```

If the absorption wavelength moves from UV through violet and blue to red as $N$ grows, then you have the one-line rule — "the longer the chain, the smaller the gap" — in hand. Real polyene absorptions follow this trend qualitatively but not exactly: the box model ignores electron–electron Coulomb repulsion and σ–π coupling.

## Closing

This book set out in chapter 0 from a paradox — classical physics says an atom should collapse in $10^{-11}$ seconds, yet every atom in the world is intact. To resolve that paradox we learned the language of the wavefunction (chapters 1–2), handled multielectron atoms with spin and Slater determinants (chapters 3–4), and used that language to explain bonds, molecules, light, and matter in turn (chapters 5–13). In this last chapter we saw the Hückel ladder of chapter 7 become the color of a polyene, and the band structure of chapter 12 become an OLED pixel. From atoms to matter, the same single Schrödinger equation followed us all the way through.

For the reader who wants to go deeper, three books. **Szabo & Ostlund, *Modern Quantum Chemistry*** — a proper treatment of Hartree–Fock and the methods beyond it. **Atkins, *Physical Chemistry* / *Molecular Quantum Mechanics*** — the same material at a slower pace and a wider scope. **Ashcroft & Mermin, *Solid State Physics*** — a full textbook on the band structure we only tasted in chapter 12. If these fourteen chapters were the bridge that makes the first page of those books feel familiar rather than foreign, that is enough.
