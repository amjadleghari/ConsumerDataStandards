import fs from 'node:fs';
import path from 'node:path';

const BASE = '/ConsumerDataStandards/docs/';

// Counts top-level ```mermaid fences. A fence shown as an example inside a
// longer fence (for example ````md ... ````) is text, not a diagram.
export function countMermaidBlocks(text) {
  let open = null;
  let count = 0;
  for (const line of text.split('\n')) {
    const m = /^(`{3,}|~{3,})\s*([\w-]*)/.exec(line);
    if (!m) continue;
    if (open === null) {
      open = m[1];
      if (m[2] === 'mermaid' && m[1] === '```') count++;
    } else if (m[1][0] === open[0] && m[1].length >= open.length && !m[2]) {
      open = null;
    }
  }
  return count;
}

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
        const blocks = countMermaidBlocks(text);
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
