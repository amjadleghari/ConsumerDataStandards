// Asserts that each overlay changed what it is meant to change. openapi-format
// exits 0 when an overlay target matches nothing, so a typo in a target would
// otherwise publish an unfiltered document.
import fs from 'node:fs';
import {parse} from 'yaml';

const apis = ['common', 'banking', 'consent'];
const fail = [];

for (const api of apis) {
  const r = parse(fs.readFileSync(`specs/generated/${api}.recipient.yaml`, 'utf8'));
  for (const [p, item] of Object.entries(r.paths ?? {})) {
    if (item['x-fdsc-audience'] === 'holder') {
      fail.push(`${api}.recipient: holder path ${p} remains`);
    }
  }
  if (r.info?.['x-audience'] !== 'data-recipient') {
    fail.push(`${api}.recipient: info.x-audience not set`);
  }

  const s = parse(fs.readFileSync(`specs/generated/${api}.sandbox.yaml`, 'utf8'));
  const urls = (s.servers ?? []).map((x) => x.url);
  if (urls.length !== 1 || !urls[0].startsWith('https://sandbox.coralbay.example.com/')) {
    fail.push(`${api}.sandbox: servers are ${JSON.stringify(urls)}`);
  }
}

// Without a holder path in the source, the removal check above proves nothing.
const banking = parse(fs.readFileSync('specs/openapi/banking.yaml', 'utf8'));
if (!banking.paths['/admin/metrics']) {
  fail.push('source lost /admin/metrics: the removal check would be vacuous');
}

if (fail.length) {
  console.error(fail.join('\n'));
  process.exit(1);
}
console.log(`overlay effects: ${apis.length * 2} outputs checked`);
