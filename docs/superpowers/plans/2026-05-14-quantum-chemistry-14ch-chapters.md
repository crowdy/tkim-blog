# Quantum Chemistry (14 Chapters) — Chapters 0 to 13 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write the 14 chapters (0..13) of "말 거는 양자화학 / 語りかける量子化学 / Quantum Chemistry in 14 Chapters" in all three languages (ko, ja, en) under `src/content/studies/<lang>/quantum-chemistry-14ch/`. Calibration: **Advanced track** — undergrad chem/physics, no QM prior assumed. Define wavefunction normalization, quantum numbers, Slater determinants, MO/AO on first use.

**Architecture:** 14 chapters × 3 languages = 42 chapter files. Book YAMLs already exist. Astro routes unchanged.

**Tech Stack:** identical to the other study books.

---

## File Structure

```
src/content/studies/{ko,ja,en}/quantum-chemistry-14ch/NN-<slug>.md
```

| Ch | slug                                          | pairSlug                              |
|----|------------------------------------------------|---------------------------------------|
| 0  | `00-why-quantum-chemistry`                    | `qc-why-quantum-chemistry`            |
| 1  | `01-language-of-quantum-chemistry`            | `qc-language`                         |
| 2  | `02-schrodinger-equation`                     | `qc-schrodinger-equation`             |
| 3  | `03-multielectron-atoms`                      | `qc-multielectron-atoms`              |
| 4  | `04-quantum-nature-of-light`                  | `qc-quantum-light`                    |
| 5  | `05-why-atoms-bond`                           | `qc-why-atoms-bond`                   |
| 6  | `06-mo-theory`                                | `qc-mo-theory`                        |
| 7  | `07-pi-conjugated-systems`                    | `qc-pi-conjugated`                    |
| 8  | `08-molecular-shape-and-electronic-states`    | `qc-molecular-shape`                  |
| 9  | `09-molecule-light-interaction`               | `qc-molecule-light`                   |
| 10 | `10-polarity-and-polarization`                | `qc-polarity-polarization`            |
| 11 | `11-intermolecular-forces`                    | `qc-intermolecular-forces`            |
| 12 | `12-electronic-states-of-solids`              | `qc-solids`                           |
| 13 | `13-structure-and-properties`                 | `qc-structure-properties`             |

Frontmatter pattern: `book: quantum-chemistry-14ch`, `bookTitle: 말 거는 양자화학 — 원자와 물질을 잇는 14장 / 語りかける量子化学 — 原子と物質をつなぐ14章 / Quantum Chemistry in 14 Chapters — From Atoms to Matter`, `chapter: <0..13>`.

---

## Per-chapter content brief

Each chapter task produces three files (ko/ja/en). Identical LaTeX math, translated prose, Python comments in target language. Body shape per template.

### Ch.0 — Why quantum chemistry (`00-why-quantum-chemistry`)

- **Focus:** classical "atom-as-planet" Rutherford model predicts atoms should collapse in `$\sim 10^{-11}$` s; chemistry is not predictable without QM. Motivate everything that follows.
- **Math (light):** Bohr radius `$a_0 = \hbar^2 / (m_e e^2 / (4\pi\epsilon_0)) \approx 0.529 \times 10^{-10}$` m. Compare against the classical collision-time estimate `$t \sim 10^{-11}$` s.
- **Python:** print `$a_0$` from constants and contrast with a classical "atom radius" derived from collapsing-electron-orbit reasoning.
- **Next:** ch.1.

### Ch.1 — Language of quantum chemistry (`01-language-of-quantum-chemistry`)

- **Focus:** wavefunction `$\psi$` (psi), probability density `$|\psi|^2$`, observable ↔ Hermitian operator. State normalization `$\int |\psi|^2\,d^3r = 1$`.
- **Math:** Gaussian wavepacket `$\psi(x) = (2\pi\sigma^2)^{-1/4}\exp(-x^2/(4\sigma^2))$`. Compute `$\langle x\rangle$` and `$\Delta x = \sigma$`.
- **Python:** build a Gaussian wavepacket on a 1D grid, compute `$\langle x \rangle$`, `$\langle x^2\rangle$`, `$\Delta x$`; print and compare to analytic.
- **Next:** ch.2.

### Ch.2 — Schrödinger equation (`02-schrodinger-equation`)

- **Focus:** time-independent SE `$\hat H \psi = E \psi$`. Particle in a box as the canonical first solution.
- **Math:** for a box of length `$L$`, `$\psi_n(x) = \sqrt{2/L}\sin(n\pi x/L)$`, `$E_n = n^2 \pi^2 \hbar^2 / (2mL^2)$`. State Pauli exclusion as preview.
- **Python:** plot `$\psi_1, \psi_2, \psi_3$` on `$[0, L]$`; print `$E_n / E_1$` for `$n = 1..4$` and check the `$n^2$` ratio.
- **Next:** ch.3.

### Ch.3 — Multielectron atoms (`03-multielectron-atoms`)

- **Focus:** electron spin `$s = 1/2$` with `$m_s = \pm 1/2$`. Pauli exclusion principle. Electron configuration. Reading the periodic table (s, p, d, f blocks).
- **Math:** quantum numbers `$(n, \ell, m_\ell, m_s)$`. Helium electron configuration `$1s^2$`. Slater determinant `$\Psi = (1/\sqrt{2}) \det \begin{pmatrix}\phi_{1s\uparrow}(1) & \phi_{1s\downarrow}(1) \\ \phi_{1s\uparrow}(2) & \phi_{1s\downarrow}(2)\end{pmatrix}$`. State antisymmetry.
- **Python:** construct the 2×2 Slater determinant of two 1s spin-orbitals for He on a sampled position grid; verify `$\Psi(r_1, r_2) = -\Psi(r_2, r_1)$` (sign flip on swap) at several points.
- **Next:** ch.4.

### Ch.4 — Quantum nature of light (`04-quantum-nature-of-light`)

- **Focus:** photons, photoelectric effect (`$KE = h\nu - \phi_W$`), Planck's `$E = h\nu$`, light–matter coupling preview.
- **Math:** Planck distribution `$u(\nu, T) = (8\pi h\nu^3/c^3) / (e^{h\nu/k_B T} - 1)$`. Briefly sketch what `$k_B$` (Boltzmann) and `$h$` (Planck) carry.
- **Python:** plot Planck's blackbody curve `$u(\lambda, T)$` (convert from `$\nu$` to `$\lambda$`) at `$T = 3000, 5800, 10000$` K; mark the peak wavelengths with `$\lambda_{\max} T = 2.898 \times 10^{-3}$` m·K (Wien).
- **Next:** ch.5.

### Ch.5 — Why atoms bond (`05-why-atoms-bond`)

- **Focus:** covalent bond intuition. Valence-bond theory. H₂ as the canonical example: shared 1s electrons give a bonding well at `$R_0 \approx 0.074$` nm.
- **Math:** Morse potential `$V(R) = D_e (1 - e^{-a(R-R_0)})^2$`. Compare with the small-displacement harmonic limit `$V \approx (1/2) k (R-R_0)^2$` with `$k = 2 D_e a^2$`.
- **Python:** plot Morse vs harmonic on the same axes for H₂ parameters (`$D_e = 4.52$` eV, `$R_0 = 0.074$` nm, `$a = 19.4$` 1/nm); show divergence at long range.
- **Next:** ch.6.

### Ch.6 — MO theory (`06-mo-theory`)

- **Focus:** molecular orbitals from LCAO. Bonding `$\psi_+ = c_+(\phi_A + \phi_B)$` vs. antibonding `$\psi_- = c_-(\phi_A - \phi_B)$`. σ vs. π distinction.
- **Math:** H₂⁺ LCAO at separation `$R$`: bonding energy `$E_+ = (H_{AA} + H_{AB})/(1 + S)$` with overlap `$S = \langle\phi_A|\phi_B\rangle$`. Plot `$E_\pm(R)$`.
- **Python:** compute `$E_\pm(R)$` for H₂⁺ in the LCAO/STO-1G approximation (use simple analytic forms for `$S(R)$`, `$H_{AB}(R)$` with hydrogenic 1s orbitals). Plot both curves.
- **Next:** ch.7.

### Ch.7 — π-conjugated systems (`07-pi-conjugated-systems`)

- **Focus:** Hückel method on benzene. Predict HOMO–LUMO gap → color of dyes.
- **Math:** for benzene, Hückel matrix is a 6×6 with `$\alpha$` on the diagonal and `$\beta$` on adjacent positions. Eigenvalues `$\alpha + 2\beta\cos(k\pi/3)$` for `$k = 0..5$`.
- **Python:** build the 6×6 Hückel matrix (`$\alpha = 0$`, `$\beta = -1$` in units of `$|\beta|$`), diagonalize with `np.linalg.eigh`, print the six MO energies. Compute the HOMO–LUMO gap and convert to a wavelength using `$|\beta| = -2.7$` eV and `$\lambda = hc/\Delta E$`.
- **Next:** ch.8.

### Ch.8 — Molecular shape and electronic states (`08-molecular-shape-and-electronic-states`)

- **Focus:** VSEPR (lone pairs spread out), hybridization (`$sp$`, `$sp^2$`, `$sp^3$`), term symbols `$^{2S+1}L_J$` in plain language.
- **Math:** count bond + lone pairs for `H_2O, NH_3, CH_4`; predict bent / pyramidal / tetrahedral. State the geometric angle predictions (104.5°, 107°, 109.5°).
- **Python:** VSEPR classifier — function `vsepr(bonding, lone)` that returns the shape name. Test on H₂O, NH₃, CH₄, BeCl₂, BF₃, PCl₅, SF₆.
- **Next:** ch.9.

### Ch.9 — Molecule–light interaction (`09-molecule-light-interaction`)

- **Focus:** absorption spectra, selection rules `$\Delta\ell = \pm 1$`, UV–vis.
- **Math:** Lorentzian line shape `$L(\omega) = (\gamma/\pi)/((\omega-\omega_0)^2 + \gamma^2)$`. Convolve with Gaussian instrument width.
- **Python:** synthesize three Lorentzian peaks at `$\omega_0 \in \{2, 3.5, 5\}$` eV with `$\gamma = 0.1$` eV, convolve with a Gaussian of width 0.2 eV (use `np.convolve`), plot original vs. convolved.
- **Next:** ch.10.

### Ch.10 — Polarity and polarization (`10-polarity-and-polarization`)

- **Focus:** dipole moment `$\vec\mu = q \vec d$`, polarizability `$\alpha$`, induced dipole `$\vec\mu_{\rm ind} = \alpha \vec E$`.
- **Math:** Debye unit `$1\,\text{D} = 3.336 \times 10^{-30}$` C·m. H₂O has `$\mu \approx 1.85$` D.
- **Python:** plot induced dipole magnitude vs. applied field for `$\alpha \in \{1, 5, 20\}$` in atomic units, over `$E \in [0, 0.05]$` a.u. (linear regime — straight lines).
- **Next:** ch.11.

### Ch.11 — Intermolecular forces (`11-intermolecular-forces`)

- **Focus:** van der Waals, hydrogen bonding, dispersion (London) forces.
- **Math:** Lennard-Jones potential `$V(r) = 4\epsilon [(\sigma/r)^{12} - (\sigma/r)^6]$`. Equilibrium separation `$r_e = 2^{1/6}\sigma$`. Hydrogen bond energy `$\sim 20$` kJ/mol vs. covalent `$\sim 400$` kJ/mol.
- **Python:** plot LJ for three `$(\epsilon, \sigma)$` sets — argon, methane, water-ish; mark equilibrium points.
- **Next:** ch.12.

### Ch.12 — Electronic states of solids (`12-electronic-states-of-solids`)

- **Focus:** band theory at intuition level. Metals (partially filled band), semiconductors (small gap), insulators (large gap).
- **Math:** tight-binding 1D chain `$E(k) = \alpha + 2\beta\cos(ka)$` for nearest-neighbor hopping `$\beta$`, lattice spacing `$a$`. Half-filled band → metal.
- **Python:** plot `$E(k)$` over `$k \in [-\pi/a, \pi/a]$` for `$\alpha = 0$`, `$\beta = -1$`, `$a = 1$`. Mark the Fermi level for half-filling.
- **Next:** ch.13.

### Ch.13 — Structure and properties (`13-structure-and-properties`)

- **Focus:** structure → property correlations. Conducting polymers (polyacetylene), OLEDs (organic semiconductor LEDs). Closing chapter.
- **Math:** for a polyene of length `$N$`, particle-in-a-box approximation gives HOMO–LUMO gap `$\Delta E \sim N^{-2}$`; map to wavelength `$\lambda = hc/\Delta E$`.
- **Python:** for `$N \in \{4, 6, 8, 10, 14\}$` print the HOMO–LUMO wavelength predicted by the particle-in-a-box model, mark each with its visible-light color (UV / blue / green / orange / red).
- **Closing note:** Keep personal-note style. Recap the through-line: classical chemistry → wavefunctions → bonds → spectra → solids. ~3 sentences. No "next chapter" link — instead one paragraph on possible deeper reads (Szabo & Ostlund for HF/post-HF, Atkins for advanced spectroscopy).

---

## Tasks 1..14 — One per chapter

Each task creates three files (ko/ja/en). Use the slug + pairSlug from the File Structure table and the brief above. Follow the template shape. No per-chapter commit.

- **Task 1:** Ch.0 why quantum chemistry.
- **Task 2:** Ch.1 language.
- **Task 3:** Ch.2 Schrödinger equation.
- **Task 4:** Ch.3 multielectron atoms.
- **Task 5:** Ch.4 quantum nature of light.
- **Task 6:** Ch.5 why atoms bond.
- **Task 7:** Ch.6 MO theory.
- **Task 8:** Ch.7 π-conjugated systems.
- **Task 9:** Ch.8 molecular shape & states.
- **Task 10:** Ch.9 molecule–light interaction.
- **Task 11:** Ch.10 polarity & polarization.
- **Task 12:** Ch.11 intermolecular forces.
- **Task 13:** Ch.12 electronic states of solids.
- **Task 14:** Ch.13 structure & properties. **Closing chapter** — personal-note style.

Per-task steps:
- [ ] **Step N.1:** Write Korean version (use brief).
- [ ] **Step N.2:** Translate to Japanese (mirror byte-for-byte).
- [ ] **Step N.3:** Translate to English (mirror byte-for-byte).
- [ ] **Step N.4:** `npm run check`; on the final pass we'll do `npm run build` once.

---

## Task 15: Final verification + commit

- [ ] **Step 15.1:** Count chapter files.

```bash
for L in ko ja en; do
  cnt=$(ls src/content/studies/$L/quantum-chemistry-14ch/ 2>/dev/null | wc -l)
  echo "$L: $cnt"
done
```

Expected: `14` for each.

- [ ] **Step 15.2:** Schema + build.

```bash
npm run check
npm run build
```

Expected: 0/0/0; build succeeds.

- [ ] **Step 15.3:** KaTeX render check.

```bash
for L in ko ja en; do
  for NN in 00 01 02 03 04 05 06 07 08 09 10 11 12 13; do
    f=$(ls dist/$L/study/quantum-chemistry-14ch/${NN}-*/index.html 2>/dev/null | head -1)
    if [ -z "$f" ]; then echo "MISSING: $L $NN"; continue; fi
    cnt=$(grep -c "katex" "$f")
    if [ "$cnt" -lt 1 ]; then echo "NO MATH RENDERED: $f (count=$cnt)"; fi
  done
done
```

Expected: no `MISSING` or `NO MATH RENDERED` lines.

- [ ] **Step 15.4:** TOC count.

```bash
for L in ko ja en; do
  cnt=$(grep -oE '/study/quantum-chemistry-14ch/[0-9]{2}-' dist/$L/study/quantum-chemistry-14ch/index.html | sort -u | wc -l)
  echo "$L: $cnt chapters in TOC"
done
```

Expected: each line `14 chapters in TOC`.

- [ ] **Step 15.5:** Commit.

```bash
git add src/content/books/{ko,ja,en}/quantum-chemistry-14ch.yml \
        src/content/studies/{ko,ja,en}/quantum-chemistry-14ch/
git commit -m "study(quantum-chemistry-14ch): add chapters 0..13 (ko, ja, en)"
```

---

## Self-Review

- 14 chapters → 14 chapter tasks + 1 verification = 15 tasks. ✓
- Closing chapter (13) gets the personal-note style flagged. ✓
- Advanced-track calibration: each chapter brief states which QM concept gets two-sentence framing before formula. ✓
- numpy/matplotlib only; no scipy. ✓
- No placeholders; concrete math and Python per chapter. ✓
