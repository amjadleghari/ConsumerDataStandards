import fs from 'node:fs';
import path from 'node:path';

const BASE = '/ConsumerDataStandards/docs/';

// Lists every docs page that contains Mermaid, with its route and block count.
// Routes are derived from file paths, so `slug` is not allowed and `id` must
// equal the file's base name.
export function mermaidPages(root = 'docs') {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.mdx?$/.test(e.name)) {
        const text = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
        const fm = (text.match(/^---\n([\s\S]*?)\n---/) || [, ''])[1];
        const base = e.name.replace(/\.mdx?$/, '');
        if (/^slug:/m.test(fm)) throw new Error(`${p}: slug is not allowed`);
        const id = (fm.match(/^id:\s*(.+)$/m) || [])[1];
        if (id && id.trim().replace(/^["']|["']$/g, '') !== base) {
          throw new Error(`${p}: id must equal ${base}`);
        }
        const blocks = (text.match(/^```mermaid\s*$/gm) || []).length;
        if (blocks) {
          const rel = path
            .relative(root, p)
            .replace(/\\/g, '/')
            .replace(/\.mdx?$/, '')
            .replace(/\/index$/, '');
          out.push({route: BASE + rel, blocks});
        }
      }
    }
  };
  walk(root);
  return out;
}
