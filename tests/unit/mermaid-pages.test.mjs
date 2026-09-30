import test from 'node:test';
import assert from 'node:assert/strict';
import {countMermaidBlocks} from '../mermaid-pages.mjs';

test('counts top-level mermaid fences', () => {
  const text = '# T\n\n```mermaid\nflowchart LR\n  a --> b\n```\n\n```mermaid\npie\n```\n';
  assert.equal(countMermaidBlocks(text), 2);
});

test('ignores a mermaid fence shown inside a longer example fence', () => {
  const text = '````md\n```mermaid\nsequenceDiagram\n```\n````\n';
  assert.equal(countMermaidBlocks(text), 0);
});

test('ignores other languages', () => {
  assert.equal(countMermaidBlocks('```yaml\na: 1\n```\n'), 0);
});
