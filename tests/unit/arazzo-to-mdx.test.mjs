import test from 'node:test';
import assert from 'node:assert/strict';
import {renderWorkflow} from '../../scripts/arazzo-to-mdx.mjs';

const map = new Map([
  ['listAccounts', '/docs/api/banking/list-accounts'],
  ['getStatus', '/docs/api/common/get-status'],
]);
const sources = {banking: 'Banking API', common: 'Common API'};
const wf = {
  workflowId: 'readAccounts',
  summary: 'Read accounts',
  steps: [
    {
      stepId: 'status',
      operationId: '$sourceDescriptions.common.getStatus',
      successCriteria: [{condition: '$statusCode == 200'}],
    },
    {
      stepId: 'list',
      operationId: 'listAccounts',
      successCriteria: [{condition: '$statusCode == 200'}],
      outputs: {first: '$response.body#/data/accounts/0/accountId'},
    },
  ],
};

test('links each step to its operation page, in both operationId forms', () => {
  const mdx = renderWorkflow(wf, sources, map);
  assert.match(mdx, /\[`getStatus`\]\(\/docs\/api\/common\/get-status\)/);
  assert.match(mdx, /\[`listAccounts`\]\(\/docs\/api\/banking\/list-accounts\)/);
});

test('emits a sequence diagram with one participant per source used', () => {
  const mdx = renderWorkflow(wf, sources, map);
  assert.match(mdx, /```mermaid\nsequenceDiagram\n/);
  assert.match(mdx, /participant common as Common API/);
  assert.match(mdx, /participant banking as Banking API/);
});

test('sets id to the kebab-case workflow id', () => {
  assert.match(renderWorkflow(wf, sources, map), /^---\nid: read-accounts\n/);
});

test('fails on an unknown operation and names it', () => {
  const bad = {...wf, steps: [{stepId: 'x', operationId: 'nope'}]};
  assert.throws(() => renderWorkflow(bad, sources, map), /nope/);
});

test('fails on a step without operationId', () => {
  const bad = {...wf, steps: [{stepId: 'x', operationPath: '/some/path'}]};
  assert.throws(() => renderWorkflow(bad, sources, map), /operationId/);
});

test('takes the participant from the Arazzo source, not the page folder', () => {
  const renamed = new Map([['listAccounts', '/docs/api/banking-api/list-accounts']]);
  const opSources = new Map([['listAccounts', 'banking']]);
  const one = {...wf, steps: [wf.steps[1]]};
  const mdx = renderWorkflow(one, sources, renamed, {opSources});
  assert.match(mdx, /participant banking as Banking API/);
  assert.doesNotMatch(mdx, /banking-api->>|->>banking-api/);
});

test('fails when a bare operationId belongs to no source description', () => {
  const one = {...wf, steps: [wf.steps[1]]};
  assert.throws(() => renderWorkflow(one, sources, map, {opSources: new Map()}), /no source description/);
});

test('escapes MDX expression braces outside code', () => {
  const braced = {...wf, summary: 'Uses {$inputs.token} in text'};
  const mdx = renderWorkflow(braced, sources, map);
  assert.doesNotMatch(mdx, /^Uses \{\$inputs/m);
});
