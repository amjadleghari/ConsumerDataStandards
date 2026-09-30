// Runs every Arazzo workflow against Prism mocks of the sandbox editions.
// One mock per source description; respect sends each source's requests to its
// mock with -S, and receives the workflow inputs as one JSON object with -i.
import {spawn} from 'node:child_process';
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('tests/arazzo/runs.json', 'utf8'));
const PRISM = 'node_modules/@stoplight/prism-cli/dist/index.js';
const REDOCLY = 'node_modules/@redocly/cli/bin/cli.js';

const procs = [];
const stopAll = () =>
  procs.forEach((p) => {
    try {
      p.kill();
    } catch {}
  });

const waitFor = async (port) => {
  for (let i = 0; i < 90; i++) {
    try {
      await fetch(`http://127.0.0.1:${port}/`);
      return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
};

let failed = 0;
try {
  for (const [name, port] of Object.entries(cfg.mocks)) {
    procs.push(
      spawn(
        process.execPath,
        [PRISM, 'mock', `specs/generated/${name}.sandbox.yaml`, '-p', String(port), '-h', '127.0.0.1'],
        {stdio: 'ignore'},
      ),
    );
    if (!(await waitFor(port))) throw new Error(`mock ${name} did not start on port ${port}`);
  }
  const servers = Object.entries(cfg.mocks).flatMap(([n, p]) => ['-S', `${n}=http://127.0.0.1:${p}`]);
  for (const run of cfg.runs) {
    const args = [REDOCLY, 'respect', run.file, ...servers, '-i', JSON.stringify(run.inputs)];
    const code = await new Promise((r) =>
      spawn(process.execPath, args, {stdio: 'inherit'}).on('exit', r),
    );
    if (code !== 0) {
      failed++;
      console.error(`FAILED: ${run.file} (exit ${code})`);
    }
  }
} catch (e) {
  console.error(e.message);
  failed++;
}
stopAll();
console.log(failed ? `arazzo: ${failed} run(s) failed` : `arazzo: ${cfg.runs.length} run(s) passed`);
process.exit(failed ? 1 : 0);
