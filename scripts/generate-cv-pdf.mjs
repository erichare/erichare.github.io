#!/usr/bin/env node
// Regenerate public/cv.pdf from the /cv route using headless Chrome.
// Run after editing cv.md:
//   npm run cv:pdf
//
// Requires: a local Google Chrome install at the macOS path below
// (override with $CHROME env var if elsewhere).

import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME =
  process.env.CHROME ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}. Set $CHROME to override.`);
  process.exit(1);
}

const url = 'http://localhost:4321/cv/';
const output = resolve('public/cv.pdf');

const run = (cmd, args, opts = {}) =>
  spawn(cmd, args, { stdio: 'inherit', ...opts });

console.log('» astro build');
const build = run('npx', ['astro', 'build']);
await once(build, 'close');

console.log('» astro preview (background)');
const preview = spawn('npx', ['astro', 'preview'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});
// Wait until preview reports it's ready.
await new Promise((ok) => {
  const watch = (buf) => {
    if (buf.toString().includes('Local')) ok();
  };
  preview.stdout.on('data', watch);
  preview.stderr.on('data', watch);
  setTimeout(ok, 5000);
});

console.log(`» chrome --print-to-pdf ${url} → ${output}`);
const chrome = run(CHROME, [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${output}`,
  '--virtual-time-budget=5000',
  url,
]);
const [code] = await once(chrome, 'close');

preview.kill('SIGTERM');
process.exit(code ?? 0);
