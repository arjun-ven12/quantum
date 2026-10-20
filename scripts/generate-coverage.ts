import {writeFileSync} from 'node:fs';
import {textbookPages,sourceChecksum} from '../src/content/textbook-map';
import {authoredConcepts,conceptsForPage} from '../src/content/concepts';
import {pageChecks} from '../src/content/page-checks';
const teaching=textbookPages.filter(p=>p.chapter!==null),complete=teaching.filter(p=>p.coverage==='complete'),partial=teaching.filter(p=>p.coverage==='partial');
const escape=(x:string)=>x.replace(/\|/g,'\\|').replace(/\n/g,' ');
const lines=[
 '# Textbook implementation coverage',
 '',
 `Source: \`Advanced_Quantum_Computing_Athena_FINAL.pdf\` (SHA-256 \`${sourceChecksum}\`). The supplied PDF has ${textbookPages.length} physical pages: pages 1–2 are front matter, pages 3–39 are ${teaching.length} teaching pages, and page 40 is references.`,
 '',
 `**Fully interactive:** ${complete.length}/${teaching.length} teaching pages (pages ${complete.map(p=>p.page).join(', ')}). **Partial:** ${partial.length}/${teaching.length}. **Source indexed:** ${textbookPages.length}/${textbookPages.length}.`,
 '',
 'A page is **complete** only when its substantial concepts have authored intuition, rigorous mathematics, notation, worked examples, guided derivation choices with feedback, numeric practice, checks, prerequisite links, and a relevant live lab link. Source transcription and a single check make a page **partial**.',
 '',
 `The ${authoredConcepts.length} fully authored concepts on pages ${complete[0].page}–${complete.at(-1)?.page} are listed in \`src/content/foundation.ts\`, \`src/content/mechanics.ts\`, \`src/content/computation.ts\` and \`src/content/algorithms.ts\`. The ${pageChecks.length} page-specific checks on pages 7–39 support study but do not satisfy the complete criterion. All source transcripts and the original PDF are bundled offline.`,
 '',
 '| PDF page | Textbook section | Status | Implemented interaction | Remaining content or visual |',
 '| ---: | --- | --- | --- | --- |'
];
for(const p of textbookPages){let interaction='',remaining='';if(p.coverage==='complete'){interaction=`${conceptsForPage(p.page).length} concept lessons; guided derivations; checked calculations; ${p.lab} lab`;remaining='Further exercise variants and advanced extensions'}else if(p.coverage==='partial'){interaction=`Source transcript; page-specific checked question; open response${p.lab?`; ${p.lab} lab link`:''}`;remaining=`Full concept lessons: ${p.concepts.join(', ')}${p.diagram?`; interactive ${p.diagram.toLowerCase()}`:''}`}else{interaction='Indexed source text';remaining='No teaching interaction required'}lines.push(`| ${p.page} | ${escape(p.section+' '+p.title)} | ${p.coverage} | ${escape(interaction)} | ${escape(remaining)} |`)}
lines.push('','## Current verified interactions','',`- Pages ${complete[0].page}–${complete.at(-1)?.page}: ${authoredConcepts.length} authored concept cards with at least two checked derivation steps, an understanding check, a numeric exercise, feedback, formula notation and a direct lab link.`,`- Pages 7–39: one page-specific checked recap question; pages ${partial[0].page}–${partial.at(-1)?.page} remain partial.`,'- Search: source text, page titles, mapped concepts, formulas and personal notes; note links such as `[[page-6]]` produce backlinks.','- Existing labs: complex plane, matrices, circuit builder, Bloch sphere, wavefunction/time evolution/density, and simplified Athena allocation model.','- Offline: source text, original PDF, lesson interactions and local notes are precached or stored on device.','','## Mathematical conventions and limits','','- The textbook uses qubit 0 as the most significant bit, 00/01/10/11 order, and spin convention `s = 2x − 1`. The simulator and QUBO conversion tests follow these conventions.','- PDF text extraction can flatten matrices and diagrams; the bundled original PDF link is the typographic authority.','- Later chapters still require equation-by-equation interactive derivations and richer live experiments. The partial pages are deliberately excluded from the complete count.','');
writeFileSync('COVERAGE.md',lines.join('\n'));
