# Quantum Atlas

An offline-first, mobile-first quantum computing learning laboratory built from the supplied 40-page *Advanced Quantum Computing: Mathematics, algorithms and research for Athena* textbook.

**Current textbook coverage:** all 40 PDF pages are indexed and searchable offline. Pages 3–16 have fully authored interactive lessons; pages 17–39 have source transcripts, mapped objectives, one checked question each and connected labs where relevant, and are explicitly marked **partial**. Pages 1, 2 and 40 are reference material. See the [page-by-page coverage report](COVERAGE.md) for implemented concepts and remaining work.

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
| Interactive content | `src/content/foundation.ts`, `src/content/mechanics.ts`, `src/content/computation.ts`, `src/content/algorithms.ts`, `src/content/page-checks.ts` | Authored full lessons for pp. 3–16 and partial-page checks for pp. 17–39 |
| Source reader | `src/screens/Textbook.tsx` | Page navigation, formula tutoring, derivations, assessed practice, annotations and PDF references |
| Math engine | `src/lib/math.ts`, `src/lib/answer.ts`, `src/lib/allocation.ts` | Complex arithmetic, linear algebra, ideal state vectors, deterministic numeric checking, QUBO/Ising |
| Persistence | `src/lib/storage.ts` | Versioned Dexie tables and backup import/export |
| Labs | `src/screens/` | Complex plane, matrix editor, circuit builder, Bloch sphere, mechanics and algorithm workbenches, and Athena allocation model |
| Knowledge base | `src/screens/KnowledgeBase.tsx`, `src/screens/KnowledgeGraph.tsx` | Markdown/KaTeX notes, search, backlinks and graph |
| PWA | `vite.config.ts`, `public/` | Manifest, icons and precache service worker |

The simulator uses qubit 0 as the most significant bit: two-qubit array indices 0, 1, 2, 3 mean `|00⟩`, `|01⟩`, `|10⟩`, `|11⟩`. The textbook spin convention is `s = 2x − 1`; the QUBO conversion and tests use it. All simulations are ideal and local, not demonstrations of hardware speedup. The Athena model is a self-contained research exercise and never executes live tasks.

## Remaining work

The [coverage report](COVERAGE.md) is the authoritative list. In particular, pp. 17–39 still need full concept-by-concept authored lessons, equation derivations, worked calculations and richer relevant experiments. One checked source question does **not** make a page complete. The knowledge graph currently covers authored concepts on pp. 3–16 and linked personal notes; later chapters will join it as their concepts are authored. There is no AI tutor gateway.
