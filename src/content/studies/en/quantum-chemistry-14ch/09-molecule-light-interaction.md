---
title: 'Molecule–light interaction — absorption spectra and selection rules'
description: 'Which photon a molecule accepts is not settled by the resonance condition alone — if the transition dipole moment vanishes, the transition is forbidden.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 9
lang: en
pairSlug: qc-molecule-light
draft: false
updated: 2026-05-14
---

# Molecule–light interaction — absorption spectra and selection rules

> Which photon a molecule accepts is not settled by the resonance condition alone — if the transition dipole moment vanishes, the transition is forbidden.

## Opening

In Chapter 4 the photon appeared as the grain that links quantum states, and the resonance condition $h\nu = E_f - E_i$ fixed the frequency of absorption and emission. But satisfying the resonance condition does not mean every transition actually happens. After this chapter the reader can say, each in one line, why a given line in an absorption spectrum is *there* (resonance), why some lines are absent entirely (selection rules), and why a peak is not infinitely sharp but carries a definite width (line shape).

## Main 1 — Absorption and Fermi's Golden Rule

To handle the *probability* of a transition, we treat the light of frequency $\nu$ as an electric field oscillating in time, and treat the gentle shaking it gives the molecule as a perturbation. To leading order in perturbation theory, the transition rate from state $|i\rangle$ to $|f\rangle$ driven by a field oscillating at angular frequency $\omega$ (omega, with $\omega = 2\pi\nu$) is

$$
W_{i \to f} = \frac{2\pi}{\hbar} |\langle f | \hat{\mu} \cdot \vec E_0 | i \rangle|^2\, \delta(E_f - E_i - \hbar\omega)
$$

This is **Fermi's Golden Rule** in the dipole approximation. Here $\hat\mu = q \vec r$ is the **dipole operator** — the dipole moment of a charge $q$ sitting at position $\vec r$. $\vec E_0$ is the field amplitude of the light, and the Dirac delta $\delta(E_f - E_i - \hbar\omega)$ enforces energy conservation — that is, the resonance condition.

The crux is the matrix element $\langle f | \hat\mu | i \rangle$. This quantity is the **transition dipole moment**. Since the rate is proportional to its modulus squared, if symmetry forces $\langle f | \hat\mu | i \rangle = 0$, then no matter how precisely the resonance condition is met, the transition does not occur. Such a transition is said to be **forbidden**. Selection rules come from exactly this.

## Main 2 — Selection rules

Take a one-electron transition in an atom. The spatial part of $\langle f | \hat\mu | i \rangle$ carries $\hat r$, and $\hat r$, viewed through angular momentum, has $\ell = 1$ content (a direction vector transforms like a $p$ orbital). By the addition of angular momentum, $\langle \ell_f | \hat r | \ell_i \rangle$ is nonzero only when $\ell_f = \ell_i \pm 1$. This is the famous $\Delta\ell = \pm 1$ rule — $s \to p$ and $p \to d$ are allowed, $s \to s$ and $s \to d$ are forbidden.

The other atomic electric-dipole rules share the same origin: the magnetic quantum number obeys $\Delta m_\ell = 0, \pm 1$, and the spin obeys $\Delta s = 0$ (in the electric-dipole approximation light cannot flip a spin directly).

In molecules the rules split two ways. A vibrational transition needs a *changing* dipole moment during the transition — which is why the homonuclear diatomics $N_2$ and $O_2$ cannot absorb in the infrared: stretching them leaves the dipole moment at zero. For electronic transitions, in a centrosymmetric molecule the parity must change $g \to u$ for the transition to occur (the Laporte rule). Between states of the same parity the integrand of $\langle f | \hat r | i \rangle$ is an odd function, so the integral vanishes.

## Main 3 — Line shapes: the Lorentzian

Energy levels are not infinitely sharp. An excited state has a finite lifetime $\tau$ (tau), so — by the time–energy uncertainty — its energy acquires a width. This **natural linewidth** produces the **Lorentzian profile**

$$
L(\omega) = \frac{\gamma/\pi}{(\omega - \omega_0)^2 + \gamma^2}
$$

where $\omega_0$ is the resonant angular frequency and $\gamma$ (gamma) is the half-width. The full width at half maximum (FWHM) is $2\gamma = 1/\tau$ — the faster the excited state decays, the broader the peak.

In a real gas two more effects pile on: **Doppler broadening**, because molecules move at different speeds and so see shifted frequencies, and **collisional broadening**, because collisions scramble the phase. The Doppler contribution is Gaussian, so the observed peak is a **Voigt profile** — the **convolution** of a Lorentzian and a Gaussian. On top of that, the instrument's own resolution acts as a further convolution, smearing the spectrum smoother still.

## In Python

```python
# Synthesize three Lorentzian peaks, then convolve with a Gaussian
# kernel mimicking the instrument resolution to see them smear out.
import numpy as np
import matplotlib.pyplot as plt

w = np.linspace(0, 7, 700)          # photon-energy grid [eV]
dw = w[1] - w[0]

def lorentzian(w, w0, gamma):
    return (gamma / np.pi) / ((w - w0)**2 + gamma**2)

# three transitions: 2.0, 3.5, 5.0 eV, natural width gamma = 0.1 eV
gamma = 0.1
spec = sum(lorentzian(w, w0, gamma) for w0 in (2.0, 3.5, 5.0))

# instrument resolution: Gaussian kernel of FWHM 0.3 eV (same grid spacing)
fwhm = 0.3
sigma = fwhm / (2 * np.sqrt(2 * np.log(2)))
g = np.arange(-3 * sigma, 3 * sigma, dw)
kernel = np.exp(-g**2 / (2 * sigma**2))
kernel /= kernel.sum()              # normalize
conv = np.convolve(spec, kernel, mode='same')

plt.plot(w, spec, label='sum of 3 Lorentzians')
plt.plot(w, conv, label='after resolution convolution')
plt.xlabel('photon energy [eV]')
plt.ylabel('absorption (arb. units)')
plt.title('Absorption spectrum and instrument resolution')
plt.legend(); plt.tight_layout()
plt.show()
```

The convolved curve washes out the central detail of the three peaks, leaving them lower and wider. Had the three peaks been spaced closer than the 0.3 eV resolution, the convolution would merge them into one broad peak with no way to tell them apart — the instrument resolution is, in effect, "the smallest energy gap between two transitions you can still resolve."

## To the next chapter

[Chapter 10: Polarity and polarization](../10-polarity-and-polarization/) takes the dipole moment — which appeared here only as a matrix element — head on. Once you see what it means for a molecule to carry a permanent dipole moment, and to be polarized inside an external electric field, it becomes clearer still why the transition dipole moment serves as the measure of absorption strength.
