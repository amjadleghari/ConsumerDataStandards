// Maps each operationId to the route of its generated API reference page.
// Each generated *.api.mdx page carries `id` and `api` in its frontmatter. The
// `api` value is the operation object, zlib-deflated and base64-encoded.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

export function buildOperationMap(apiDir = 'docs/api') {
  const map = new Map();
  if (!fs.existsSync(apiDir)) return map;
  for (const api of fs.readdirSync(apiDir)) {
    const dir = path.join(apiDir, api);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.api.mdx')) continue;
      const text = fs.readFileSync(path.join(dir, file), 'utf8').replace(/\r\n/g, '\n');
      const fm = (text.match(/^---\n([\s\S]*?)\n---/) || [, ''])[1];
      const id = (fm.match(/^id:\s*(.+)$/m) || [])[1]?.trim();
      const encoded = (fm.match(/^api:\s*(.+)$/m) || [])[1]?.trim();
      if (!id || !encoded) continue;
      const operation = JSON.parse(zlib.inflateSync(Buffer.from(encoded, 'base64')).toString('utf8'));
      if (operation.operationId) map.set(operation.operationId, `/docs/api/${api}/${id}`);
    }
  }
  return map;
}
