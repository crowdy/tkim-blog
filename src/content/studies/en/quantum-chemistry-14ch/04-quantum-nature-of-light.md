---
title: 'The quantum nature of light — photons, photoelectric effect, blackbody'
description: 'Light does not arrive as a continuous wave but as packets of energy $E = h\nu$ — blackbody radiation and the photoelectric effect both say so.'
book: quantum-chemistry-14ch
bookTitle: Quantum Chemistry in 14 Chapters — From Atoms to Matter
chapter: 4
lang: en
pairSlug: qc-quantum-light
draft: false
updated: 2026-05-14
---

# The quantum nature of light — photons, photoelectric effect, blackbody

> Light does not arrive as a continuous wave but as packets of energy $E = h\nu$ — blackbody radiation and the photoelectric effect both say so.

## Opening

Chapters 1–3 treated the electron inside an atom as a quantized object. This chapter looks at the other side: light itself is quantized too. Blackbody radiation and the photoelectric effect were the two great experimental crises around 1900, and both fell to the same one-line hypothesis — *light is absorbed and emitted in packets of size $E = h\nu$*. After this chapter you should be able to say in one sentence why the ultraviolet catastrophe happened, how Planck plugged it, and how the photon picture connects to the molecular absorption and emission spectra you will meet in chapters 9–11.

## Main 1 — Planck's quantum

If you plug the equipartition theorem of classical statistical mechanics straight into classical electromagnetism, the energy density of a blackbody at temperature $T$, per unit volume and per unit frequency $\nu$ (nu, in Hz), comes out as the **Rayleigh–Jeans law**:

$$
u_{\text{RJ}}(\nu, T) = \frac{8\pi \nu^2}{c^3}\, k_B T
$$

where $k_B$ (Boltzmann's constant, $1.381 \times 10^{-23}$ J/K) sets the thermal energy scale $k_B T$. The trouble is that this expression diverges as $\nu \to \infty$. Integrating over all frequencies gives infinite radiated energy: every warm object would pour out unbounded amounts of ultraviolet and X-rays. This is the **ultraviolet catastrophe**.

In 1900, **Planck** introduced one hypothesis: light at frequency $\nu$ can only be absorbed or emitted in packets of size $E = h\nu$, where $h$ (Planck's constant) is $6.626 \times 10^{-34}$ J·s. Once you put this into the statistical-mechanics counting, equipartition breaks automatically — a mode whose minimum quantum of excitation $h\nu$ exceeds $k_B T$ is almost always frozen out — and the spectrum becomes

$$
u(\nu, T) = \frac{8\pi h \nu^3}{c^3}\, \frac{1}{e^{h\nu/k_B T} - 1}
$$

In the low-frequency limit $h\nu \ll k_B T$ the denominator reduces to $h\nu/k_B T$ and Rayleigh–Jeans is recovered. At high frequencies the exponential dominates and the spectrum is cut off gently. The peak wavelength is fixed by **Wien's displacement law**

$$
\lambda_{\max} T \approx 2.898 \times 10^{-3}\,\text{m·K}.
$$

For the Sun's surface ($T \approx 5800$ K) this gives $\lambda_{\max} \approx 500$ nm — precisely the green where the human eye is most sensitive.

## Main 2 — The photoelectric effect

Planck himself regarded his quantum hypothesis as a mathematical trick. Direct evidence that light is *really* quantized came in 1905, when **Einstein** explained the photoelectric effect.

Shine ultraviolet light on a metal and electrons fly out. Classically, if you crank up the intensity high enough, electrons should eventually leave at any frequency — a stronger wave shakes them harder. Experiment says the opposite. Below some threshold frequency $\nu_0$, no matter how bright the lamp, *no* electrons appear. Above the threshold, electrons appear instantly, even for very dim light. And the kinetic energy of the ejected electron depends on the *frequency*, not on the intensity.

Einstein's explanation follows the photon hypothesis. Light is a stream of $h\nu$-sized packets (photons), and a single photon hands its entire energy to a single electron. Tearing an electron loose from the metal costs an energy $\phi_W$, the **work function**. The kinetic energy of the freed electron is therefore

$$
KE = h\nu - \phi_W,
$$

and if $h\nu < \phi_W$ a single photon simply cannot do the job. Turning up the intensity raises the *number* of photons, not the energy of each one, so below threshold a brighter lamp is useless. That one line was the decisive evidence that light really is grainy, and Einstein won the 1921 Nobel Prize for it.

## Main 3 — What this means for chemistry

Photons are the things that *connect* quantum states. When a molecule jumps from a state of energy $E_i$ to a state of energy $E_f$, the frequency of the absorbed photon is fixed by energy conservation,

$$
h\nu = E_f - E_i,
$$

and the same frequency comes back out when the molecule relaxes downward. Absorption and emission spectra are photographs of the molecule's energy ladder. Which transitions are actually allowed is settled by **selection rules**, the subject of chapter 9.

A visible-light photon carries between about 1.8 eV (700 nm red) and 3.1 eV (400 nm violet). It is no accident that this is exactly the range of valence-electron transition energies in typical molecules. That is *why* we can see colour at all — every dye, every pigment, every chlorophyll molecule has its own set of $\{E_i, E_f\}$ pairs which our eyes read out as wavelengths $\lambda = hc/(E_f - E_i)$. The reason we cannot see into the ultraviolet or the infrared is the same: those photon energies do not match any transition in the molecules of the retina.

This picture is used immediately in chapter 5: when two atoms bond, the gap between the resulting bonding and antibonding orbitals sets the colour of light the molecule absorbs.

## In Python

```python
# Plot Planck's blackbody spectrum at three temperatures
# and mark the Wien peak wavelength as a dashed vertical line.
import numpy as np
import matplotlib.pyplot as plt

h    = 6.62607015e-34   # J·s
c    = 2.99792458e8     # m/s
k_B  = 1.380649e-23     # J/K

# Wavelength grid: 100 nm to 3000 nm
lam = np.linspace(100e-9, 3000e-9, 800)

def u_lambda(lam, T):
    # u(λ, T) = (8π h c / λ^5) · 1/(exp(hc/λkT) - 1)
    x = h * c / (lam * k_B * T)
    return (8 * np.pi * h * c / lam**5) / (np.exp(x) - 1)

temps  = [3000, 5800, 10000]   # incandescent bulb, Sun, hot star
colors = ['tab:red', 'tab:orange', 'tab:blue']

fig, ax = plt.subplots(figsize=(7, 4))
for T, col in zip(temps, colors):
    ax.plot(lam * 1e9, u_lambda(lam, T), color=col, label=f'T = {T} K')
    lam_max = 2.898e-3 / T                     # Wien displacement law
    ax.axvline(lam_max * 1e9, color=col, linestyle='--', alpha=0.6)
    print(f"T = {T:>5d} K  ->  lambda_max ~ {lam_max*1e9:6.1f} nm")

ax.set_xlabel('wavelength λ [nm]')
ax.set_ylabel('u(λ, T)  [J/m^4]')
ax.set_title("Planck's blackbody spectrum")
ax.legend()
plt.tight_layout()
plt.show()
```

If the Sun's peak comes out in the visible (near 500 nm), Planck's formula and Wien's displacement law agree at once. The fact that the curve falls smoothly to zero on the short-wavelength side, instead of diverging, is the visible fingerprint of the one-line hypothesis — $E = h\nu$ — that closed the ultraviolet catastrophe.

## To the next chapter

[Chapter 5: Why atoms bond](../05-why-atoms-bond/) asks what quantum-mechanical bargain two hydrogen atoms strike when they form H$_2$. The photon picture carries over directly: the energy gap between bonding and antibonding orbitals fixes the frequencies the molecule absorbs, and that in turn is the colour we see.
