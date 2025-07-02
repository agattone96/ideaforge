#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

// Parse CLI args (--type, --target, --note)
const args = process.argv.slice(2);
const options = args.reduce((opts, arg) => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  opts[key] = value || true;
  return opts;
}, {});

const templatePath = path.resolve(__dirname, '../audit-reports/Audit-Report-template.html');
const reportsDir = path.resolve(__dirname, '../audit-reports');

// Determine next version
const files = fs.readdirSync(reportsDir);
const versions = files
  .map(f => {
    const m = f.match(/^Audit-Report-v(\d+)\.html$/);
    return m ? parseInt(m[1], 10) : null;
  })
  .filter(v => v !== null);
const nextVersion = versions.length ? Math.max(...versions) + 1 : 1;

// Read template
let content = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
const date = new Date().toISOString().split('T')[0];
const author = os.userInfo().username;
content = content.replace(/{{version}}/g, nextVersion);
content = content.replace(/{{date}}/g, date);
content = content.replace(/{{author}}/g, author);

// Append audit-specific introduction
const intro = `<p><strong>Type:</strong> ${options.type || 'custom'}</p>`;
content = content.replace('</header>', `</header>\n  ${intro}`);

// Write new report
const outFile = path.resolve(reportsDir, `Audit-Report-v${nextVersion}.html`);
fs.writeFileSync(outFile, content, 'utf8');
console.log(`Generated audit report v${nextVersion} at ${outFile}`);
