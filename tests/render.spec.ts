import {test, expect} from '@playwright/test';
import {mermaidPages} from './mermaid-pages.mjs';

const pages = mermaidPages();

test('at least one page has Mermaid', () => {
  expect(pages.length).toBeGreaterThan(0);
});

for (const p of pages) {
  test(`mermaid renders on ${p.route}`, async ({page}) => {
    await page.goto(p.route);
    await expect(
      page.locator('.docusaurus-mermaid-container svg[aria-roledescription]'),
    ).toHaveCount(p.blocks, {timeout: 15000});
    await expect(page.getByText(/Syntax error/i)).toHaveCount(0);
  });
}

test('architecture-beta renders somewhere', async ({page}) => {
  await page.goto('/ConsumerDataStandards/docs/architecture/overview');
  await expect(
    page.locator('svg[aria-roledescription="architecture"]').first(),
  ).toBeVisible();
});
