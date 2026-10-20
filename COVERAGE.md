# Textbook implementation coverage

Source: `Advanced_Quantum_Computing_Athena_FINAL.pdf` (SHA-256 `0433954b28bd41d37b04a2dac0ed2a7f3c4edb8294b2dc5363c066a8fb9a17fe`). The supplied PDF has 40 physical pages: pages 1–2 are front matter, pages 3–39 are 37 teaching pages, and page 40 is references.

**Fully interactive:** 14/37 teaching pages (pages 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16). **Partial:** 23/37. **Source indexed:** 40/40.

A page is **complete** only when its substantial concepts have authored intuition, rigorous mathematics, notation, worked examples, guided derivation choices with feedback, numeric practice, checks, prerequisite links, and a relevant live lab link. Source transcription and a single check make a page **partial**.

The 45 fully authored concepts on pages 3–16 are listed in `src/content/foundation.ts`, `src/content/mechanics.ts`, `src/content/computation.ts` and `src/content/algorithms.ts`. The 33 page-specific checks on pages 7–39 support study but do not satisfy the complete criterion. All source transcripts and the original PDF are bundled offline.

| PDF page | Textbook section | Status | Implemented interaction | Remaining content or visual |
| ---: | --- | --- | --- | --- |
| 1 | Front matter Title and study method | reference | Indexed source text | No teaching interaction required |
| 2 | Contents Contents and notation | reference | Indexed source text | No teaching interaction required |
| 3 | 1.1 Complex numbers and phase | complete | 4 concept lessons; guided derivations; checked calculations; complex lab | Further exercise variants and advanced extensions |
| 4 | 1.2 Vectors, matrices and linear maps | complete | 3 concept lessons; guided derivations; checked calculations; matrix lab | Further exercise variants and advanced extensions |
| 5 | 1.3 Inner products, spectra and unitary matrices | complete | 4 concept lessons; guided derivations; checked calculations; matrix lab | Further exercise variants and advanced extensions |
| 6 | 1.4 Tensor products and amplitude bookkeeping | complete | 4 concept lessons; guided derivations; checked calculations; circuit lab | Further exercise variants and advanced extensions |
| 7 | 2.1 Hilbert spaces and wavefunctions | complete | 3 concept lessons; guided derivations; checked calculations; mechanics lab | Further exercise variants and advanced extensions |
| 8 | 2.2 Hamiltonians and the Schrödinger equation | complete | 3 concept lessons; guided derivations; checked calculations; bloch lab | Further exercise variants and advanced extensions |
| 9 | 2.3 Observables, measurement and the Born rule | complete | 3 concept lessons; guided derivations; checked calculations; bloch lab | Further exercise variants and advanced extensions |
| 10 | 2.4 Density matrices, mixtures and noise | complete | 3 concept lessons; guided derivations; checked calculations; circuit lab | Further exercise variants and advanced extensions |
| 11 | 3.1 Qubit geometry and elementary gates | complete | 3 concept lessons; guided derivations; checked calculations; bloch lab | Further exercise variants and advanced extensions |
| 12 | 3.2 Rotations and a complete gate sequence | complete | 3 concept lessons; guided derivations; checked calculations; bloch lab | Further exercise variants and advanced extensions |
| 13 | 3.3 Controlled gates, Bell states and conditional outcomes | complete | 3 concept lessons; guided derivations; checked calculations; circuit lab | Further exercise variants and advanced extensions |
| 14 | 3.4 Circuit reasoning, no-cloning and error correction | complete | 3 concept lessons; guided derivations; checked calculations; circuit lab | Further exercise variants and advanced extensions |
| 15 | 4.1 Oracles, reversible computation and phase kickback | complete | 3 concept lessons; guided derivations; checked calculations; algorithms lab | Further exercise variants and advanced extensions |
| 16 | 4.2 Deutsch–Jozsa and Bernstein–Vazirani | complete | 3 concept lessons; guided derivations; checked calculations; algorithms lab | Further exercise variants and advanced extensions |
| 17 | 4.3 Grover search as a rotation | partial | Source transcript; page-specific checked question; open response; algorithms lab link | Full concept lessons: Grover search, oracle reflection, diffusion, query scaling; interactive two-dimensional grover rotation |
| 18 | 4.4 Numerical search and amplitude amplification | partial | Source transcript; page-specific checked question; open response; algorithms lab link | Full concept lessons: diffusion mean, amplitude amplification, oracle costs |
| 19 | 4.5 The quantum Fourier transform | partial | Source transcript; page-specific checked question; open response; algorithms lab link | Full concept lessons: QFT, roots of unity, controlled phases, wire reversal; interactive two-qubit qft circuit |
| 20 | 4.6 Quantum phase estimation | partial | Source transcript; page-specific checked question; open response; algorithms lab link | Full concept lessons: eigenphase, phase kickback, phase estimation, geometric series |
| 21 | 4.7 Shor: factoring by finding an order | partial | Source transcript; page-specific checked question; open response; algorithms lab link | Full concept lessons: modular order, continued fractions, Shor algorithm, fault tolerance |
| 22 | 5.1 Binary models and penalty reasoning | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: QUBO, binary idempotence, one-hot penalty, slack variables |
| 23 | 5.2 A complete task-allocation QUBO | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: task allocation, QUBO matrix, feasibility, objective versus energy; interactive cost table |
| 24 | 5.3 From QUBO to Ising and a problem Hamiltonian | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: Ising conversion, spin convention, cost Hamiltonian; interactive ising coupling graph |
| 25 | 5.4 Annealing, adiabatic evolution and classical alternatives | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: simulated annealing, adiabatic evolution, spectral gap, classical baselines |
| 26 | 5.5 QAOA and hybrid optimisation | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: QAOA, cost Hamiltonian, mixer, sampling |
| 27 | 6.1 Variational models and a learning objective | partial | Source transcript; page-specific checked question; open response; bloch lab link | Full concept lessons: variational circuit, feature map, loss, regularisation |
| 28 | 6.2 Deriving the parameter-shift gradient | partial | Source transcript; page-specific checked question; open response; bloch lab link | Full concept lessons: parameter shift, analytic gradient, shot noise |
| 29 | 6.3 Quantum feature maps and kernels | partial | Source transcript; page-specific checked question; open response; bloch lab link | Full concept lessons: quantum kernel, Gram matrix, feature map, data loading |
| 30 | 6.4 Trainability, barren plateaus and honest limits | partial | Source transcript; page-specific checked question; open response | Full concept lessons: barren plateau, shot budget, validation protocol |
| 31 | 7.1 BB84: preparation, sifting and disturbance | partial | Source transcript; page-specific checked question; open response | Full concept lessons: BB84, basis reconciliation, QBER, intercept-resend; interactive bb84 channel flow |
| 32 | 7.2 From raw correlations to a secure key | partial | Source transcript; page-specific checked question; open response | Full concept lessons: reconciliation, privacy amplification, authentication, trace-distance secrecy |
| 33 | 7.3 Shor’s threat and post-quantum engineering | partial | Source transcript; page-specific checked question; open response | Full concept lessons: Shor threat, Grover threat, PQC, crypto agility; interactive qkd/pqc comparison table |
| 34 | 8.1 A decision model before a solver | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: Athena decision model, capabilities, workflow DAG, greedy failure |
| 35 | 8.2 Dependency-aware scheduling and QUBO conversion | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: time-indexed scheduling, valid starts, forbidden pairs, penalty bounds |
| 36 | 8.3 Prototype pseudocode and a reproducible small experiment | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: exact enumeration, simulated annealing, solver adapters, validation; interactive pseudocode workflow |
| 37 | 8.4 Evaluation, extensions and research hypotheses | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: evaluation protocol, time to target, ablation, hypothesis; interactive metric table |
| 38 | 9.1 Derivation problems with answer checks | partial | Source transcript; page-specific checked question; open response | Full concept lessons: complex algebra, evolution, tensor products, density matrices, Grover, QFT, QUBO, gradient; interactive exercise set |
| 39 | 9.2 Mini research challenge: can Athena allocate better? | partial | Source transcript; page-specific checked question; open response; athena lab link | Full concept lessons: research hypothesis, baselines, paired bootstrap, ablation; interactive research protocol |
| 40 | References References and further study | reference | Indexed source text | No teaching interaction required |

## Current verified interactions

- Pages 3–16: 45 authored concept cards with at least two checked derivation steps, an understanding check, a numeric exercise, feedback, formula notation and a direct lab link.
- Pages 7–39: one page-specific checked recap question; pages 17–39 remain partial.
- Search: source text, page titles, mapped concepts, formulas and personal notes; note links such as `[[page-6]]` produce backlinks.
- Existing labs: complex plane, matrices, circuit builder, Bloch sphere, wavefunction/time evolution/density, and simplified Athena allocation model.
- Offline: source text, original PDF, lesson interactions and local notes are precached or stored on device.

## Mathematical conventions and limits

- The textbook uses qubit 0 as the most significant bit, 00/01/10/11 order, and spin convention `s = 2x − 1`. The simulator and QUBO conversion tests follow these conventions.
- PDF text extraction can flatten matrices and diagrams; the bundled original PDF link is the typographic authority.
- Later chapters still require equation-by-equation interactive derivations and richer live experiments. The partial pages are deliberately excluded from the complete count.
