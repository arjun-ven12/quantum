import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe,expect,it} from 'vitest';

const colorSources = [
  'src/index.css',
  'src/screens/BlochLab.tsx',
  'src/screens/KnowledgeGraph.tsx',
  'src/screens/Lab.tsx',
  'src/screens/MechanicsLab.tsx',
  'public/favicon.svg',
  'vite.config.ts',
  'android/app/src/main/res/values/ic_launcher_background.xml',
  'android/app/src/main/res/drawable/ic_launcher_background.xml',
];

describe('monochrome visual palette', () => {
  it.each(colorSources)('%s uses equal RGB channels', (source) => {
    const content = readFileSync(resolve(process.cwd(), source), 'utf8');
    const colors = [...content.matchAll(/#[\da-fA-F]{3,8}\b/g)].map(([hex]) => hex.slice(1));
    expect(colors.length).toBeGreaterThan(0);
    for (const color of colors) {
      const rgb = color.length <= 4
        ? [...color.slice(0, 3)]
        : (source.endsWith('.xml') && color.length === 8 ? color.slice(2) : color.slice(0, 6)).match(/../g);
      expect(new Set(rgb).size, `${source}: #${color}`).toBe(1);
    }
  });
});
