# Quantum Atlas

An offline-first quantum computing study laboratory. The current build is an honest foundation while the requested textbook PDF is unavailable. The nine chapter names come from the project brief. The two shipped lessons are **supplementary** and deliberately have no invented textbook page references.

## Run

```bash
npm install
npm run dev
```

Open the printed local URL. For an installable PWA, deploy the production build over HTTPS:

```bash
npm run build
npm run preview
```

In Android Chrome, open the HTTPS deployment and choose **Install app** or **Add to Home screen**. `localhost` is accepted for local service-worker testing; a remote HTTP address is not. The built service worker precaches app assets and bundled supplementary content. Notes, progress, and circuits live in IndexedDB; export a JSON backup in Settings.

## Verification

```bash
npm test
npm run test:e2e
npm run build
```

Playwright checks desktop and a 360×800 touch viewport. If Chromium is unavailable, run `npx playwright install --with-deps chromium`.

## Architecture

| Area | Location | Responsibility |
| --- | --- | --- |
| Curriculum | `src/content/curriculum.ts` | Typed lessons and chapter ordering; source provenance fields |
| Math engine | `src/lib/math.ts` | Complex arithmetic, linear algebra, ideal state vectors, QUBO conversion |
| Persistence | `src/lib/storage.ts` | Versioned Dexie tables, backup import/export, practice events |
| App state | `src/lib/appState.ts` | Navigation and theme |
| Labs | `src/screens/` | Complex plane, matrix editor, small circuit builder |
| Interface | `src/App.tsx`, `src/index.css` | Mobile-first navigation, lessons, practice, notes, settings |
| PWA | `vite.config.ts`, `public/` | Manifest, icons, generated precache service worker |

The simulator uses qubit 0 as the most significant bit. In a two-qubit state, array indices 0, 1, 2, 3 mean `|00⟩`, `|01⟩`, `|10⟩`, `|11⟩`. Current circuits are ideal and noiseless, support 1–3 qubits, and use gates H, X, Y, Z, S, T, and CNOT.

## Source coverage and remaining work

| Source chapter (titles from brief) | Source pages inspected | Implemented | Pending |
| --- | --- | --- | --- |
| 1. Mathematical Foundations | PDF missing | Two **supplementary** lessons; complex, matrix, and Bloch labs | Original headings, examples, exercises, page mapping, full coverage |
| 2. Mathematical Quantum Mechanics | PDF missing | Tested state-vector operations | Source lessons, Measurement and entanglement lab |
| 3. Quantum Computation | PDF missing | Small circuit builder and simulator | Source lessons, rotations and controls, measurement editing |
| 4. Quantum Algorithms | PDF missing | — | All source lessons and algorithm demonstrations |
| 5. Quantum Optimisation | PDF missing | QUBO/Ising engine and tests | Source lessons, interactive optimisation lab and baselines |
| 6. Quantum Machine Learning | PDF missing | — | Source lessons and numerical demonstrations |
| 7. Quantum Cryptography | PDF missing | — | Source lessons and BB84 simulation |
| 8. Athena: Advanced Algorithm Research | PDF missing | Editable two-task allocation model with exact enumeration, QUBO matrix, Ising conversion | Textbook mapping, larger models, validated performance comparisons |
| 9. Exercises and Research Challenges | PDF missing | — | Source exercises and research challenges |

**Textbook coverage: 0 of 40 pages verified.** The PDF `Advanced_Quantum_Computing_Athena_FINAL(1).pdf` must be supplied before curriculum transcription, claims about source coverage, or textbook-based validation can proceed. Once available: extract every page, map headings, definitions, notation, examples, diagrams, and exercises into typed content; link each concept to its page; implement chapter-by-chapter and update this table. Supplementary content remains distinctly labeled.

## Current limitations

The formula tutor offers deterministic explanations and step reveal for the two foundation lessons; it does not yet validate arbitrary symbolic derivations. Practice uses fixed numerical examples and a simple transparent review interval, not a full adaptive engine. Notes currently support plain text, tags, and knowledge type; Markdown rendering, backlinks, graph, flashcards, and reference upload are future work. There is no AI gateway. The Athena laboratory is a tiny exact-enumeration research model, not a connection to live Athena or evidence of a quantum advantage. Quantum algorithm, QML, and BB84 laboratories remain to be built. Browser storage is not a guaranteed backup, so use the Settings export regularly.
