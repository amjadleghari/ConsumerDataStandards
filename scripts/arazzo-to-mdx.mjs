// Generates one MDX page per Arazzo workflow in specs/arazzo/, into
// docs/workflows/generated/. Each step links to its operation page in the API
// reference; a step whose operation has no page fails the generation.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parse} from 'yaml';
import {buildOperationMap} from './lib/operation-map.mjs';

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// Plain text for MDX: braces start an expression and '<' starts JSX.
const text = (s = '') =>
  String(s).replace(/[{}<>]/g, (c) => ({'{': '&#123;', '}': '&#125;', '<': '&lt;', '>': '&gt;'})[c]);

// Inline code for a table cell: backticks are safe for braces; pipes still split cells.
const code = (s) => '`' + String(s).replace(/\|/g, '\\|').replace(/`/g, "'") + '`';

// `$sourceDescriptions.<source>.<operationId>` or a bare `<operationId>`.
export function splitOperationId(ref) {
  const m = /^\$sourceDescriptions\.([^.]+)\.(.+)$/.exec(ref);
  return m ? {source: m[1], operationId: m[2]} : {source: null, operationId: ref};
}

// `opSources` maps each operationId to the Arazzo source description that
// defines it, so a bare operationId gets its diagram participant from the
// workflow's own sources, not from the folder its reference page is in.
export function renderWorkflow(wf, sourceTitles, opMap, {yamlSource = '', title, opSources} = {}) {
  const unresolved = [];
  const rows = [];
  const arrows = [];
  const used = new Set();

  for (const step of wf.steps ?? []) {
    if (!step.operationId) {
      unresolved.push(`${step.stepId}: no operationId (operationPath and workflowId steps are not supported)`);
      continue;
    }
    const {source, operationId} = splitOperationId(step.operationId);
    const route = opMap.get(operationId);
    if (!route) {
      unresolved.push(`${step.stepId}: ${operationId}`);
      continue;
    }
    let api = source;
    if (!api && opSources) {
      api = opSources.get(operationId);
      if (!api) {
        unresolved.push(`${step.stepId}: ${operationId} is in no source description of this workflow`);
        continue;
      }
    }
    api ??= route.split('/')[3];
    used.add(api);
    const criteria = (step.successCriteria ?? []).map((c) => code(c.condition)).join('<br/>') || '-';
    const outputs = Object.entries(step.outputs ?? {})
      .map(([k, v]) => `${code(k)}: ${code(v)}`)
      .join('<br/>') || '-';
    rows.push(`| ${code(step.stepId)} | [${code(operationId)}](${route}) | ${criteria} | ${outputs} |`);
    arrows.push(`    recipient->>${api}: ${step.stepId} (${operationId})`);
    arrows.push(`    ${api}-->>recipient: response`);
  }
  if (unresolved.length) {
    throw new Error(`workflow ${wf.workflowId}: unresolved operations:\n  ${unresolved.join('\n  ')}`);
  }

  const id = kebab(wf.workflowId);
  const inputs = Object.entries(wf.inputs?.properties ?? {}).map(
    ([k, v]) =>
      `| ${code(k)} | ${(wf.inputs.required ?? []).includes(k) ? 'yes' : 'no'} | ${text(v.description ?? '')} |`,
  );
  const participants = [...used].map((s) => `    participant ${s} as ${sourceTitles[s] ?? s}`);
  const heading = title ?? wf.summary ?? wf.workflowId;

  return [
    '---',
    `id: ${id}`,
    `title: ${JSON.stringify(heading)}`,
    `sidebar_label: ${JSON.stringify(heading)}`,
    `description: ${JSON.stringify(wf.summary ?? heading)}`,
    '---',
    '',
    `# ${text(heading)}`,
    '',
    text(wf.summary ?? ''),
    '',
    wf.description ? text(wf.description.trim()) + '\n' : '',
    `Workflow id: ${code(wf.workflowId)}. This page is generated from the Arazzo description; edit the YAML, not this page.`,
    '',
    '## Inputs',
    '',
    inputs.length ? '| Input | Required | Description |\n|---|---|---|\n' + inputs.join('\n') : 'None.',
    '',
    '## Steps',
    '',
    '| Step | Operation | Success criteria | Outputs |',
    '|---|---|---|---|',
    ...rows,
    '',
    '## Sequence',
    '',
    '```mermaid',
    'sequenceDiagram',
    '    participant recipient as Tallowood Budgeting',
    ...participants,
    ...arrows,
    '```',
    '',
    '## Source',
    '',
    '<details>',
    '<summary>Arazzo description (YAML)</summary>',
    '',
    '```yaml',
    yamlSource.trimEnd(),
    '```',
    '',
    '</details>',
    '',
  ].join('\n');
}

function main() {
  const opMap = buildOperationMap('docs/api');
  const outDir = 'docs/workflows/generated';
  fs.rmSync(outDir, {recursive: true, force: true});
  fs.mkdirSync(outDir, {recursive: true});
  fs.writeFileSync(
    path.join(outDir, '_category_.json'),
    JSON.stringify({label: 'Workflow pages', position: 2, collapsed: false}, null, 2) + '\n',
  );
  let written = 0;
  let failed = false;
  for (const file of fs.readdirSync('specs/arazzo').filter((f) => f.endsWith('.arazzo.yaml')).sort()) {
    const yamlSource = fs.readFileSync(path.join('specs/arazzo', file), 'utf8');
    const doc = parse(yamlSource);
    const sourceTitles = {};
    const opSources = new Map();
    for (const s of doc.sourceDescriptions ?? []) {
      const api = parse(fs.readFileSync(path.join('specs/arazzo', s.url), 'utf8'));
      sourceTitles[s.name] = api.info?.title ?? s.name;
      for (const item of Object.values(api.paths ?? {})) {
        for (const op of Object.values(item ?? {})) {
          if (op && typeof op === 'object' && op.operationId) opSources.set(op.operationId, s.name);
        }
      }
    }
    const single = (doc.workflows ?? []).length === 1;
    for (const wf of doc.workflows ?? []) {
      try {
        const mdx = renderWorkflow(wf, sourceTitles, opMap, {
          yamlSource,
          title: single ? doc.info?.title : undefined,
          opSources,
        });
        fs.writeFileSync(path.join(outDir, `${kebab(wf.workflowId)}.mdx`), mdx);
        written++;
      } catch (e) {
        console.error(`${file}: ${e.message}`);
        failed = true;
      }
    }
  }
  if (failed) process.exit(1);
  console.log(`arazzo-to-mdx: ${written} page(s) written to ${outDir}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
