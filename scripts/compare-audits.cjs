#!/usr/bin/env node

// CLI tool: compare two audit HTML reports and generate diff outputs
// Implements semantic section matching and word-level diff placeholders

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { JSDOM } = require('jsdom');
const { diffWordsWithSpace } = require('diff');

function parseArgs() {
  const args = minimist(process.argv.slice(2), {
    string: ['v1', 'v2', 'outDir'],
    default: { outDir: 'audit-reports/diffs' }
  });
  if (!args.v1 || !args.v2) {
    console.error('Usage: compare-audits --v1=<version1> --v2=<version2> [--outDir=<dir>]');
    process.exit(1);
  }
  return args;
}

async function main() {
  const { v1, v2, outDir } = parseArgs();
  // Load report HTML files
  const report1 = fs.readFileSync(path.resolve('audit-reports', `Audit-Report-v${v1}.html`), 'utf-8');
  const report2 = fs.readFileSync(path.resolve('audit-reports', `Audit-Report-v${v2}.html`), 'utf-8');

  // Parse DOM
  const dom1 = new JSDOM(report1);
  const dom2 = new JSDOM(report2);

  // Define semantic sections to map
  const sectionKeys = [
    'overview',
    'scope-objectives',
    'issues-found',
    'remediation-actions',
    'audit-environment'
  ];

  const diffData = { v1, v2, sections: [] };

  sectionKeys.forEach(key => {
    const sec1 = dom1.window.document.querySelector(`[data-section="${key}"]`);
    const sec2 = dom2.window.document.querySelector(`[data-section="${key}"]`);
    const html1 = sec1 ? sec1.innerHTML : '';
    const html2 = sec2 ? sec2.innerHTML : '';
    // Compute word-level diffs
    const diffs = diffWordsWithSpace(html1, html2).map(part => ({
      value: part.value,
      added: part.added || false,
      removed: part.removed || false
    }));
    diffData.sections.push({ section: key, diffs });
  });

  // Ensure output directory exists
  fs.mkdirSync(outDir, { recursive: true });

  // Write JSON diff data
  const jsonPath = path.join(outDir, `diff-v${v1}-v${v2}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(diffData, null, 2), 'utf-8');

  // Generate basic HTML diff page (stub placeholder)
  const htmlPath = path.join(outDir, `diff-v${v1}-v${v2}.html`);
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Diff v${v1} vs v${v2}</title>
</head>
<body>
  <h1>Diff Summary</h1>
  <pre id="json-data"></pre>
  <script>
    // Load JSON and render basic diff output
    fetch('diff-v${v1}-v${v2}.json')
      .then(res => res.json())
      .then(data => {
        document.getElementById('json-data').textContent = JSON.stringify(data, null, 2);
      });
  </script>
</body>
</html>`;
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

  console.log(`Generated diff JSON at ${jsonPath}`);
  console.log(`Generated diff HTML at ${htmlPath}`);
}

main();
