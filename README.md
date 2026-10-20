# Quantum Atlas

An offline-first, mobile-first quantum computing learning laboratory built from the supplied 40-page *Advanced Quantum Computing: Mathematics, algorithms and research for Athena* textbook.

**Current textbook coverage:** all 40 PDF pages are indexed and searchable offline. Pages 3–37 and 39 have authored concept lessons and page 38 is an eight-problem interactive workbook. All 37 teaching pages have checked learning interactions. Pages 1, 2 and 40 are reference material. See the [page-by-page coverage report](COVERAGE.md) for implemented concepts and remaining work.

## Run and install

```bash
npm install
npm run dev
```

For an installable Android PWA, build and deploy over HTTPS:

```bash
npm run build
npm run preview
```

Open the HTTPS deployment in Android Chrome and choose **Install app** or **Add to Home screen**. `localhost` also supports service-worker testing. Bundled lessons, source text, the PDF and lab code are precached. Notes, progress, assessments and circuits are stored in IndexedDB. Export a JSON backup from Settings regularly; browser storage is not a guaranteed permanent backup.

## Verify

```bash
npm test
npm run test:e2e
npm run test:offline
npm run coverage:report
```

Playwright tests cover desktop, 360×800 portrait and 800×360 landscape viewports. Install the browser with `npx playwright install --with-deps chromium` if necessary.

## Architecture

| Area | Location | Responsibility |
| --- | --- | --- |
| Original source | `Advanced_Quantum_Computing_Athena_FINAL.pdf`, `src/content/textbook-source.json` | Supplied 40-page PDF and page-indexed text with checksum |
| Source map | `src/content/textbook-map.ts` | Sections, concepts, objectives, equations, diagrams, lab links and coverage status for every page |
| Interactive content | `src/content/foundation.ts`, `src/content/mechanics.ts`, `src/content/computation.ts`, `src/content/algorithms.ts`, `src/content/search.ts`, `src/content/fourier.ts`, `src/content/optimization.ts`, `src/content/qml.ts`, `src/content/crypto.ts`, `src/content/athena.ts`, `src/content/challenge.ts`, `src/content/exercises.ts`, `src/content/page-checks.ts` | Authored concept lessons for pp. 3–37 and 39, plus the eight-problem p. 38 workbook and page-specific checks |
| Source reader | `src/screens/Textbook.tsx` | Page navigation, formula tutoring, derivations, assessed practice, annotations and PDF references |
| Math engine | `src/lib/math.ts`, `src/lib/answer.ts`, `src/lib/allocation.ts`, `src/lib/optimization.ts`, `src/lib/qml.ts`, `src/lib/bb84.ts`, `src/lib/athenaResearch.ts` | Complex arithmetic, linear algebra, ideal state vectors, deterministic numeric checking, QUBO/Ising |
| Persistence | `src/lib/storage.ts` | Versioned Dexie tables and backup import/export |
| Labs | `src/screens/` | Complex plane, matrix editor, circuit builder, Bloch sphere, mechanics, algorithm, optimisation and QML and BB84 workbenches, and Athena allocation model |
| Knowledge base | `src/screens/KnowledgeBase.tsx`, `src/screens/KnowledgeGraph.tsx` | Markdown/KaTeX notes, search, backlinks and graph |
| PWA | `vite.config.ts`, `public/` | Manifest, icons and precache service worker |

The simulator uses qubit 0 as the most significant bit: two-qubit array indices 0, 1, 2, 3 mean `|00⟩`, `|01⟩`, `|10⟩`, `|11⟩`. The textbook spin convention is `s = 2x − 1`; the QUBO conversion and tests use it. All simulations are ideal and local, not demonstrations of hardware speedup. The Athena model is a self-contained research exercise and never executes live tasks.

## Remaining work and limits

The [coverage report](COVERAGE.md) lists every page and the implemented interaction. Each concept currently offers one numeric exercise template and two checked derivation decisions. More parameterised variants, open algebraic answer checking, and richer diagram interaction would improve depth. The labs use ideal small-system simulation; BB84 is educational, not a secure cryptographic implementation. The Athena allocation lab is self-contained and has no live execution connection. Optional AI tutoring and a secure server-side gateway are still unimplemented. Browser storage can be lost, so export JSON backups from Settings.
