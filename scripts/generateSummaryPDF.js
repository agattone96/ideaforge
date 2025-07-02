#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { jsPDF } = require('jspdf');

function parseArgs() {
  const args = minimist(process.argv.slice(2), {
    string: ['v1', 'v2', 'outDir'],
    default: { outDir: 'audit-reports/diffs' }
  });
  if (!args.v1 || !args.v2) {
    console.error('Usage: generateSummaryPDF --v1=<version1> --v2=<version2> [--outDir=<dir>]');
    process.exit(1);
  }
  return args;
}

async function main() {
  const { v1, v2, outDir } = parseArgs();
  const jsonPath = path.resolve(outDir, `diff-v${v1}-v${v2}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`Diff JSON not found at ${jsonPath}`);
    process.exit(1);
  }
  const diffData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const pdf = new jsPDF();
  pdf.setFontSize(16);
  pdf.text(`Resolution Matrix: v${v1} → v${v2}`, 14, 20);
  pdf.setFontSize(12);

  const tableStartY = 30;
  const cellHeight = 8;
  const marginX = 14;

  // Header
  const headers = ['v1 Issue', 'v2 Status', 'Notes'];
  headers.forEach((h, i) => {
    pdf.text(h, marginX + i * 60, tableStartY);
  });

  // Rows: iterate through diffData.sections, extract placeholder rows
  // TODO: replace with actual resolution matrix logic
  diffData.sections.forEach((sec, idx) => {
    const y = tableStartY + (idx + 1) * cellHeight;
    pdf.text(sec.section, marginX, y);
    pdf.text('-', marginX + 60, y);
    pdf.text('-', marginX + 120, y);
  });

  const outFile = path.resolve(outDir, `diff-summary-v${v1}-v${v2}.pdf`);
  pdf.save(outFile);
  console.log(`Generated PDF summary at ${outFile}`);
}

main();