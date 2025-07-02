#!/usr/bin/env node

// CLI tool: generate ongoing issues list from diff JSON
// Writes a JSON file used by the audit index page

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

function parseArgs() {
  const args = minimist(process.argv.slice(2), {
    string: ['v1', 'v2', 'outDir', 'diffDir', 'reportsDir'],
    default: {
      diffDir: 'audit-reports/diffs',
      reportsDir: 'audit-reports/reports',
      outDir: 'audit-reports/problem-tracker',
    },
  });
  if (!args.v1 || !args.v2) {
    console.error('Usage: build-problem-tracker --v1=<version1> --v2=<version2> [--diffDir=<dir>] [--outDir=<dir>]');
    process.exit(1);
  }
  return args;
}

function main() {
  const { v1, v2, diffDir, reportsDir, outDir } = parseArgs();
  const diffPath = path.resolve(diffDir, `diff-v${v1}-v${v2}.json`);
  if (!fs.existsSync(diffPath)) {
    console.error(`Diff JSON not found at ${diffPath}`);
    process.exit(1);
  }
  const diffData = JSON.parse(fs.readFileSync(diffPath, 'utf-8'));

  const issues = [];
  // Extract new or unresolved issues from diff
  diffData.sections.forEach(sec => {
    sec.diffs.forEach(part => {
      if (part.added || part.removed) {
        // Determine status badge
        let status = part.added ? '🆕' : '⚠️';
        const message = part.value.trim();
        if (message) {
          issues.push({
            message,
            status,
            link: path.posix.join(reportsDir, `Audit-Report-v${v2}.html#${sec.section}`),
          });
        }
      }
    });
  });

  // Write ongoing issues JSON
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.resolve(outDir, 'ongoing-issues.json');
  fs.writeFileSync(outPath, JSON.stringify(issues, null, 2), 'utf-8');
  console.log(`Generated ongoing issues at ${outPath}`);
}

main();
