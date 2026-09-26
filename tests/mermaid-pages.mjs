import fs from 'node:fs';
import path from 'node:path';

const BASE = '/ConsumerDataStandards/docs/';

// Lists every docs page that contains Mermaid, with its route and block count.
// A route is the page's folder plus its frontmatter `id`, or its file name when
// there is no `id`. That is how Docusaurus builds routes when no `slug` is set,
// so `slug` is not allowed.
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
        const idMatch = (fm.match(/^id:\s*(.+)$/m) || [])[1];
        const id = idMatch ? idMatch.trim().replace(/^["']|["']$/g, '') : base;
        const blocks = (text.match(/^```mermaid\s*$/gm) || []).length;
        if (blocks) {
          const dir = path.relative(root, path.dirname(p)).replace(/\\/g, '/');
          const rel = (dir ? `${dir}/${id}` : id).replace(/(^|\/)index$/, '');
          out.push({route: BASE + rel, blocks});
        }
      }
    }
  };
  walk(root);
  return out;
}
