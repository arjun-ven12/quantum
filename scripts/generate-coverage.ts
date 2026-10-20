import {writeFileSync} from 'node:fs';
import {textbookPages,sourceChecksum} from '../src/content/textbook-map';
import {authoredConcepts,conceptsForPage} from '../src/content/concepts';
import {sourceExercises} from '../src/content/exercises';
import {pageChecks} from '../src/content/page-checks';

const teaching=textbookPages.filter(p=>p.chapter!==null);
const complete=teaching.filter(p=>p.coverage==='complete');
const partial=teaching.filter(p=>p.coverage==='partial');
const escape=(value:string)=>value.replace(/\|/g,'\\|').replace(/\n/g,' ');
const lines=[
  '# Textbook implementation coverage','',
  `Source: \`Advanced_Quantum_Computing_Athena_FINAL.pdf\` (SHA-256 \`${sourceChecksum}\`). The PDF has ${textbookPages.length} physical pages: pages 1–2 are front matter, pages 3–39 are teaching pages, and page 40 is references.`,
  '',
  `**Interactive teaching pages:** ${complete.length}/${teaching.length}. **Partial:** ${partial.length}/${teaching.length}. **Source indexed:** ${textbookPages.length}/${textbookPages.length}.`,
  '',
  'A teaching page is counted as interactive when its substantial concepts have authored intuition, mathematical explanations, notation, worked examples, checked derivation steps, numeric practice, prerequisite links, source reference, and a connected live lab where relevant. Page 38 is the eight-problem source workbook, with checked steps and numeric answers for every numbered problem. A transcript alone does not meet this criterion.',
  '',
  `There are ${authoredConcepts.length} authored concept lessons on pages 3–37 and 39, ${sourceExercises.length} source workbook problems on page 38, and ${pageChecks.length} extra page-specific checks on pages 7–39. All source transcripts and the PDF are bundled offline.`,
  '',
  '| PDF page | Textbook section | Status | Implemented interaction | Further work |',
  '| ---: | --- | --- | --- | --- |'
];
for(const page of textbookPages){
  let interaction='Indexed source text';
  let remaining='No teaching interaction required';
  if(page.coverage==='complete'){
    interaction=page.page===38?`${sourceExercises.length} original problems; checked derivations and calculations`:`${conceptsForPage(page.page).length} concept lessons; checked derivations and calculations; ${page.lab??'related'} lab`;
    remaining='More parameterized variants and advanced extensions';
  }else if(page.coverage==='partial'){
    interaction=`Source transcript; checked recap question${page.lab?`; ${page.lab} lab link`:''}`;
    remaining=`Full interactive treatment: ${page.concepts.join(', ')}`;
  }
  lines.push(`| ${page.page} | ${escape(page.section+' '+page.title)} | ${page.coverage} | ${escape(interaction)} | ${escape(remaining)} |`);
}
lines.push('','## Verified interaction types','',
  `- Pages 3–37 and 39: ${authoredConcepts.length} authored concepts with at least two checked derivation steps, a concept check, a numeric exercise, feedback, formula notation, and a related lab link.`,
  `- Page 38: all ${sourceExercises.length} numbered source problems have guided steps, a numeric check, hint, and source answer.`,
  '- Search spans source text, mapped concepts, formulas and personal notes. Note links such as `[[page-6]]` produce backlinks.',
  '- Live labs include complex arithmetic, matrices, circuits, Bloch geometry, quantum mechanics, algorithms, optimisation, quantum machine learning, BB84, and the self-contained Athena model.',
  '- Source text, the original PDF, authored lessons and local data remain available offline after the PWA assets are cached.',
  '','## Mathematical conventions and limits','',
  '- The textbook uses qubit 0 as the most significant bit and spin convention `s = 2x − 1`; reference tests exercise both.',
  '- PDF text extraction can flatten matrices and diagrams; the bundled original PDF is the typographic authority.',
  '- Labs use ideal small-system simulation. BB84 is educational and not a secure key exchange. Athena results are research demonstrations, not validated improvements to live execution.',
  '- Each concept currently has one numerical template and two checked derivation decisions; more open algebraic answer checking and variants would deepen practice.',
  '- Optional online AI tutoring and a secure server-side gateway have not been implemented.',
  '');
writeFileSync('COVERAGE.md',lines.join('\n'));
