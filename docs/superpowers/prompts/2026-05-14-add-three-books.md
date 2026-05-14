# Follow-up prompt — add three more study books

> Paste this whole file (or its body) into a fresh session as the user prompt. It is self-contained: the next session can read it, then read the referenced files, and proceed without prior conversation history.

---

## What you are about to do

Add three new books to the `studies` collection of this blog, each with a full chapter set in all three site languages (ko / ja / en):

1. **『解析力学 I』** — graduate-level analytical mechanics with a differential-geometry / manifold approach
2. **『解析力学 II』** — Hamilton–Jacobi theory through field theory and the bridge to quantum mechanics
3. **『語りかける量子化学 ― 原子と物質をつなぐ14章』** — undergraduate quantum chemistry from atoms to solids

These books sit alongside the already-shipped *난류해석의 기초 / 乱流解析の基礎 / Fundamentals of Turbulence Analysis* book (12 chapters). They use the same routing, layout, banner, and language-toggle plumbing — nothing in the site infrastructure needs to change.

## Read these first

In this order, before doing anything else:

1. `CLAUDE.md` — repo-level agent instructions (multilingual blog, posts vs. studies, Astro/content layout).
2. `docs/superpowers/specs/2026-05-14-chapter-template.md` — chapter template, math/Python conventions, audience and difficulty calibration.
3. `docs/superpowers/plans/2026-05-14-turbulence-chapters-2-12.md` — the plan that shipped the first study book. It is the blueprint to imitate for these three books: chapter-by-chapter spec, parallel subagent dispatch, schema-check gate, single commit per chapter group.
4. `src/content/studies/ko/turbulence-fundamentals/01-what-is-turbulence.md` and the matching ja/en files — style reference for prose tone.
5. `src/content/studies/ko/turbulence-fundamentals/09-isotropic-energy-cascade.md` — example of a math-heavy chapter that still stays high-school-friendly.
6. `src/content/books/ko/turbulence-fundamentals.yml` and the ja/en siblings — book metadata format.

## Difficulty calibration for these three books

The turbulence book used a "bright high-school student" calibration. **These three books target a different audience and the chapter template's calibration table must be lifted accordingly.** Decide one of two routes:

- **Route A — same calibration band, harder math.** Keep the audience as "undergraduate STEM 2nd–3rd year." Symbols still introduced on first use. Differential forms, manifolds, Lie brackets etc. are allowed, but each new concept gets two sentences of plain-language framing before the formula.
- **Route B — extend the template.** Add a second calibration table in `docs/superpowers/specs/2026-05-14-chapter-template.md` (or fork a second template file) titled "Advanced track" so 解析力学 I/II and Quantum Chemistry can cite it without rewriting the rule each time.

Route B is the cleaner long-term move. Pick it unless there is a reason not to.

In either case the difficulty bar by book is:

| Book | Target reader | OK to assume | Not OK to skip |
|---|---|---|---|
| 解析力学 I | undergrad with mechanics + multivariable calculus | partial derivatives, basic linear algebra, ODE intuition | manifold definitions, exterior derivative, pullback, Lie derivative — define each |
| 解析力学 II | undergrad who finished volume I | everything from volume I + tensor / form algebra | HJ equation derivation, infinite-dim phase space, relativistic 4-vectors — define on use |
| 量子化学 | undergrad chem/physics, no QM prior | high-school chem, basic calculus, complex numbers | wavefunction normalization, quantum numbers, Slater determinants, MO/AO — define on use |

Python snippets stay numpy/matplotlib only, ≤40 lines, one focused demonstration per chapter. For quantum chemistry, simple analytic models (particle in a box, hydrogen 1s radial density, Hückel π-system) are the canonical demos.

## The TOC and per-chapter content

### Book 1 — 『解析力学 I』 (Analytical Mechanics I)

Book metadata (write `src/content/books/{ko,ja,en}/analytical-mechanics-1.yml`):
- `book: analytical-mechanics-1`
- `pairSlug: analytical-mechanics-1`
- `bookTitle`: 해석역학 I / 解析力学 I / Analytical Mechanics I
- `bookAuthor`: (fill in if researched, otherwise omit)
- `totalChapters: 13` (12 main chapters + 1 prologue "수학적 준비")
- `description`: one-sentence hook per language. ko sample: "공대 해석역학을 넘어, 다양체·미분형식의 언어로 라그랑주·해밀턴 역학을 재구성하는 학습 노트."

Chapters (use `chapter: 0` for the prologue so it sorts first; or shift everything to start at 1 and number the prologue 1):

| Ch | Slug | Focus |
|---|---|---|
| 0 | `00-mathematical-preliminaries` | linear algebra refresher, tangent/cotangent intuition, why "geometric mechanics" needs more than calculus |
| 1 | `01-equations-of-motion` | Newton's laws restated, generalized coordinates, configuration space |
| 2 | `02-constrained-motion-on-surfaces` | holonomic/non-holonomic constraints, motion on a sphere, Lagrange multipliers as constraint forces |
| 3 | `03-tensors-and-covariant-derivative` | what a tensor really is (multilinear map), index gymnastics revisited, Christoffel symbols introduced minimally |
| 4 | `04-manifolds` | charts, atlases, smooth structure, why configuration space is a manifold |
| 5 | `05-vector-fields` | smooth vector fields, integral curves, flows, Lie bracket as "noncommutativity of flows" |
| 6 | `06-differential-forms` | 1-forms, wedge product, exterior derivative, Stokes in one line — high payoff chapter |
| 7 | `07-lagrangian-mechanics` | Euler–Lagrange equations from L on TM (tangent bundle), why the Lagrangian is a function on TM |
| 8 | `08-variational-principle` | principle of least action, calculus of variations, end-point conditions |
| 9 | `09-symmetry-and-conservation` | Noether's theorem, examples: translation→momentum, rotation→angular momentum, time→energy |
| 10 | `10-hamiltonian-mechanics` | Legendre transform L→H, phase space T*M (cotangent bundle), Hamilton's equations |
| 11 | `11-canonical-transformations` | generating functions F1..F4, why CT preserves phase space volume |
| 12 | `12-poisson-brackets-and-integrability` | Poisson bracket as Lie bracket on functions, Liouville integrability, action-angle variables in one example (harmonic oscillator) |

Python demo seeds per chapter (one per chapter; the next session refines):
- Ch.0: matrix exponential `expm(A * t) @ x0` to integrate `dx/dt = A x` as a teaser for flows on a vector space.
- Ch.1: simulate a 2D harmonic oscillator with Euler vs. symplectic Euler; show energy drift.
- Ch.2: bead on a hoop ODE integrated and plotted.
- Ch.3: numerically transform a tensor between two bases and verify the component formula.
- Ch.4: stereographic projection of S² onto R²; plot.
- Ch.5: integrate a 2D vector field with `scipy.integrate.solve_ivp` and plot streamlines.
- Ch.6: numerically integrate a 1-form along a curve (line integral) two ways and verify Stokes for a simple case.
- Ch.7: derive E-L for a pendulum, integrate, compare to Newton.
- Ch.8: discrete variational integrator (one of the cleanest demos in classical mechanics).
- Ch.9: rotational symmetry of central force → conserved L = r × p; verify in simulation.
- Ch.10: phase portrait of the simple pendulum from H(q, p).
- Ch.11: explicit canonical transformation (q, p) → (Q, P) with F2 generating function; verify {Q, P} = 1.
- Ch.12: action-angle variables for the harmonic oscillator; plot trajectory in (J, θ).

### Book 2 — 『解析力学 II』 (Analytical Mechanics II)

Book metadata: `book: analytical-mechanics-2`, `pairSlug: analytical-mechanics-2`, `totalChapters: 10`.

Chapter set:

| Ch | Slug | Focus |
|---|---|---|
| 1 | `01-hamilton-jacobi` | HJ equation as a PDE for the action, characteristics ↔ Hamilton flow |
| 2 | `02-canonical-transformations-deepened` | flow as a CT, infinitesimal CTs, symplectic group |
| 3 | `03-integrable-systems` | Liouville–Arnold theorem, tori in phase space, examples (Kepler, two-body) |
| 4 | `04-perturbation-theory` | KAM theorem at the intuition level, resonances, why integrability is fragile |
| 5 | `05-continuum-mechanics` | Lagrangian density for an elastic string, Euler–Lagrange in field form |
| 6 | `06-classical-field-theory` | scalar field action, EL field equations, Klein–Gordon as a warm-up |
| 7 | `07-relativistic-mechanics` | 4-vectors, proper time, relativistic Lagrangian for a free particle |
| 8 | `08-noether-in-field-theory` | continuous symmetries → conserved currents, energy-momentum tensor stub |
| 9 | `09-classical-to-quantum` | Dirac correspondence {f, g} → -iℏ[f̂, ĝ], path integral as an action sum |
| 10 | `10-where-to-next` | closing — pointers to symplectic geometry, Floer theory, modern math-phys |

Python demo seeds:
- Ch.1: solve HJ for a 1D free particle by separation of variables and recover trajectory.
- Ch.2: verify symplectic form preservation under a canonical map numerically.
- Ch.3: integrate Kepler and plot the closed elliptical orbit; show conservation of L and E.
- Ch.4: pendulum + small driving force; show resonance with a sweep.
- Ch.5: wave equation on a string (finite differences), animate one mode.
- Ch.6: KG soliton-ish: integrate 1+1 KG with a Gaussian initial profile, watch dispersion.
- Ch.7: relativistic momentum-energy for an electron at various v/c values; table.
- Ch.8: scalar field with U(1) symmetry — compute the conserved current numerically.
- Ch.9: heuristic path-integral sum for the free particle: sample broken paths, sum exp(iS/ℏ), recover propagator phase.
- Ch.10: closing — no code, or one tiny demo of your choice.

### Book 3 — 『語りかける量子化学 ― 原子と物質をつなぐ14章』 (Quantum Chemistry, 14 chapters connecting atoms to matter)

Book metadata: `book: quantum-chemistry-14ch`, `pairSlug: quantum-chemistry-14ch`, `totalChapters: 14`.
`bookTitle`: 말 거는 양자화학 — 원자와 물질을 잇는 14장 / 語りかける量子化学 — 原子と物質をつなぐ14章 / Quantum Chemistry in 14 Chapters — From Atoms to Matter.

Note: 章 numbering starts at 0 in the book. Use `chapter: 0..13` accordingly. The "totalChapters: 14" stays correct.

Chapter set:

| Ch | Slug | Focus |
|---|---|---|
| 0 | `00-why-quantum-chemistry` | why classical chemistry fails to predict bonds; the chapter that motivates everything else |
| 1 | `01-language-of-quantum-chemistry` | wavefunction ψ, probability density |ψ|², observable ↔ operator |
| 2 | `02-schrodinger-equation` | $\hat H \psi = E \psi$, particle-in-a-box solution, energy quantization, Pauli exclusion preview |
| 3 | `03-multielectron-atoms` | spin, Pauli principle in full, electron configuration, periodic table reading |
| 4 | `04-quantum-nature-of-light` | photons, photoelectric effect, Planck/Einstein, light–matter coupling preview |
| 5 | `05-why-atoms-bond` | covalent bond intuition, valence-bond theory, H₂ as the canonical example |
| 6 | `06-mo-theory` | molecular orbitals, LCAO, bonding vs. antibonding, σ vs. π |
| 7 | `07-pi-conjugated-systems` | Hückel method, benzene, color of dyes |
| 8 | `08-molecular-shape-and-electronic-states` | VSEPR, hybridization, term symbols in plain language |
| 9 | `09-molecule-light-interaction` | absorption spectra, selection rules, UV-vis |
| 10 | `10-polarity-and-polarization` | dipole moment, polarizability, induced dipoles |
| 11 | `11-intermolecular-forces` | van der Waals, hydrogen bonding, dispersion |
| 12 | `12-electronic-states-of-solids` | band theory at the intuition level, metals/semiconductors/insulators |
| 13 | `13-structure-and-properties` | structure→property correlations, conducting polymers, OLEDs, closing chapter |

Python demo seeds:
- Ch.0: just print the Bohr radius and compare with classical "atom-as-planet" predictions.
- Ch.1: plot Gaussian wavepacket; compute ⟨x⟩ and Δx numerically.
- Ch.2: particle-in-a-box eigenfunctions and eigenvalues plotted on the same axes.
- Ch.3: build a "naive" Slater determinant for He using two 1s orbitals; verify antisymmetry.
- Ch.4: blackbody curve at three temperatures.
- Ch.5: plot H₂ Morse potential vs. harmonic approximation.
- Ch.6: LCAO bonding/antibonding orbitals for H₂⁺ at varying R.
- Ch.7: Hückel matrix for benzene, diagonalize, list MO energies; predict color from HOMO–LUMO gap.
- Ch.8: VSEPR geometry classifier function for input (#bonding pairs, #lone pairs).
- Ch.9: Lorentzian absorption peak; convolve with instrument width.
- Ch.10: induced dipole as a function of external field strength (linear regime).
- Ch.11: Lennard-Jones potential plot at three (ε, σ) sets.
- Ch.12: tight-binding 1D chain band structure E(k) = −2t cos(ka).
- Ch.13: take Hückel-derived HOMO–LUMO gap as input and convert to absorption wavelength; map several conjugation lengths to colors.

## Suggested workflow (this is what worked for the turbulence book)

1. Use the **superpowers:writing-plans** skill to write one plan per book under `docs/superpowers/plans/YYYY-MM-DD-<book-slug>-chapters.md`. Three plans total (one per book) is cleaner than one mega-plan.
2. For each plan, use **superpowers:subagent-driven-development** to execute: one parallel agent per chapter, each agent writes the chapter in all three languages, all agents dispatched in parallel.
3. After all chapters in a book land, `npm run check` must be 0/0/0, `npm run build` must succeed, and a spot-grep for `katex` class on every chapter's built HTML must show at least one hit per chapter.
4. Commit per book (not per chapter) — one commit titled `study(<book-slug>): add chapters 1..N (ko, ja, en)`.
5. Push after all three books are in.

The KaTeX rendering stack (`remark-math` + `rehype-katex` + CDN CSS) is already wired into `astro.config.mjs` and `BaseLayout.astro`. The study routes (`/<lang>/study/`, `/<lang>/study/<book>/`, `/<lang>/study/<book>/<chapter-slug>/`) and the home-page `<StudyBanner />` already render whatever new books you add — no Astro file needs to change.

## Things to confirm before drafting

A short ask-and-decide list. If any of these are unclear, ask the user once at the top of the session rather than mid-flight:

1. **Audience level** — confirm "undergraduate STEM" is the right calibration band for all three (vs. "graduate" for 解析力学 II).
2. **Author attribution** — if any of the books has a real author you can cite, set `bookAuthor` in the YAML; otherwise omit cleanly.
3. **Chapter 0 vs. chapter 1 numbering** — the quantum chem book and 解析力学 I have a "preliminary" chapter; the existing turbulence book starts at 1. The `chapter:` field accepts any number, but the TOC will display in ascending order, so `chapter: 0` for the prologue is the most readable choice.
4. **Closing sentence per book** — for the closing chapter (12 / 10 / 13) of each book, ask whether the author wants to keep the personal-note style used in the turbulence book's chapter 12, or switch to a more impersonal "further reading" closer.

Once those are answered, proceed straight into the plans.
