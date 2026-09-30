import {defineConfig} from '@playwright/test';

// No webServer block: scripts/run-render-tests.mjs starts and stops the server.
export default defineConfig({
  testDir: 'tests',
  testMatch: /.*\.spec\.ts/,
  use: {
    baseURL: 'http://127.0.0.1:3919',
    channel: process.env.CI ? undefined : 'chrome',
  },
});
