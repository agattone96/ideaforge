#!/usr/bin/env ts-node --esm

import { execSync } from 'child_process';
import { exit } from 'process';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, extname } from 'path';



function runStep(name: string, cmd: string, options: { fix?: boolean } = {}) {
  console.log(`\n== ${name} ==`);
  if (cmd) {
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error: any) {
      const msg = error?.message || String(error);
      if (msg.includes('imaginaryUncacheableRequireResolveScript')) {
        console.warn(`Ignored internal ts-node resolver error in step: ${name}`);
        return;
      }
      console.error(`Step failed: ${name}`, msg);
      if (!options.fix) exit(1);
    }
  }
}

// 1. List unused exports via ts-prune
runStep('Listing unused exports (ts-prune)', 'npx ts-prune');

// 2. Auto-fix lint errors via ESLint plugin
runStep('Auto-fixing lint errors (ESLint)', 'npm run lint -- --fix', { fix: true });

// 3. Remove block comments (commented-out code blocks)
console.log('\n== Removing block comments ==');
function removeBlockComments(dir: string) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      removeBlockComments(fullPath);
    } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry.name))) {
      const content = readFileSync(fullPath, 'utf8');
      const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '');
      if (stripped !== content) writeFileSync(fullPath, stripped, 'utf8');
    }
  }
}
removeBlockComments(process.cwd());

console.log('\nCleanup complete. Review above output for any remaining unused exports or code.');
