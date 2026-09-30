// Applies every overlay to every OpenAPI document:
// specs/openapi/<api>.yaml + specs/overlays/<edition>.overlay.yaml
//   -> specs/generated/<api>.<edition>.yaml
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';

const apis = ['common', 'banking', 'consent'];
const editions = ['recipient', 'sandbox'];
const cli = 'node_modules/openapi-format/bin/cli.js';

fs.mkdirSync('specs/generated', {recursive: true});

for (const api of apis) {
  for (const edition of editions) {
    const out = `specs/generated/${api}.${edition}.yaml`;
    const r = spawnSync(
      process.execPath,
      [
        cli,
        `specs/openapi/${api}.yaml`,
        '--overlayFile',
        `specs/overlays/${edition}.overlay.yaml`,
        '-o',
        out,
        '--no-sort',
      ],
      {encoding: 'utf8'},
    );
    if (r.status !== 0) {
      console.error(r.stdout, r.stderr);
      console.error(`FAILED: ${out}`);
      process.exit(1);
    }
    console.log(`wrote ${out}`);
  }
}
