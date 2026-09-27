// Serves build/ on 127.0.0.1, runs the Playwright render tests, stops the server.
import {spawn} from 'node:child_process';

const PORT = 3919;
const url = `http://127.0.0.1:${PORT}/ConsumerDataStandards/`;
const server = spawn(
  process.execPath,
  [
    'node_modules/@docusaurus/core/bin/docusaurus.mjs',
    'serve',
    '--host',
    '127.0.0.1',
    '--port',
    String(PORT),
    '--no-open',
  ],
  {stdio: 'ignore'},
);
const stop = () => {
  try {
    server.kill();
  } catch {}
};

try {
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    try {
      up = (await fetch(url)).ok;
    } catch {}
    if (!up) await new Promise((r) => setTimeout(r, 1000));
  }
  if (!up) {
    console.error(`server did not answer at ${url}`);
    stop();
    process.exit(1);
  }
  const pw = spawn(
    process.execPath,
    ['node_modules/@playwright/test/cli.js', 'test', '--reporter=line'],
    {stdio: 'inherit'},
  );
  const code = await new Promise((r) => pw.on('exit', r));
  stop();
  process.exit(code ?? 1);
} catch (e) {
  console.error(e);
  stop();
  process.exit(1);
}
