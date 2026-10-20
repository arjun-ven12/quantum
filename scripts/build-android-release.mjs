import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const required = ['QUANTUM_ATLAS_KEYSTORE', 'QUANTUM_ATLAS_STORE_PASSWORD', 'QUANTUM_ATLAS_KEY_PASSWORD'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Signed release requires: ${missing.join(', ')}`);
  process.exit(1);
}
if (!existsSync(process.env.QUANTUM_ATLAS_KEYSTORE)) {
  console.error('QUANTUM_ATLAS_KEYSTORE does not point to an existing file.');
  process.exit(1);
}
const androidDir = resolve('android');
const result = spawnSync('./gradlew', ['assembleRelease'], {
  cwd: androidDir,
  env: process.env,
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
