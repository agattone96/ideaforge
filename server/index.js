const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const authCheck = require('../scripts/auth-check');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Block all API routes in production
app.use('/api', (req, res, next) => {
  if (isProd) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// Generate new audit report
app.post('/api/generate-audit', authCheck, (req, res) => {
  const { type, target, note } = req.body;
  const args = ['scripts/generate-audit.js', `--type=${type}`, `--target=${target}`];
  if (note) args.push(`--note=${note}`);
  const child = spawn('node', args, { stdio: 'inherit' });
  child.on('close', code => {
    if (code === 0) res.json({ success: true });
    else res.status(500).json({ error: 'Generation failed' });
  });
});

// Git sync audit changes
app.post('/api/git-sync', authCheck, (req, res) => {
  const { message } = req.body;
  const args = ['scripts/git-sync.js'];
  if (message) args.push(`--message=${message}`);
  const child = spawn('node', args, { stdio: 'inherit' });
  child.on('close', code => {
    if (code === 0) res.json({ success: true });
    else res.status(500).json({ error: 'Git sync failed' });
  });
});

// On-demand compare audits endpoint
app.post('/api/compare-audits', authCheck, (req, res) => {
  const { fromVersion, toVersion } = req.body;
  const outDir = path.resolve(__dirname, '../audit-reports/diffs');
  // Spawn diff generation
  const compare = spawn('node', ['scripts/compare-audits.cjs', `--v1=${fromVersion}`, `--v2=${toVersion}`, `--outDir=${outDir}`]);
  compare.on('close', code => {
    if (code !== 0) return res.status(500).json({ error: 'Diff generation failed' });
    // Spawn PDF summary generation
    const pdfGen = spawn('node', ['scripts/generateSummaryPDF.js', `--v1=${fromVersion}`, `--v2=${toVersion}`, `--outDir=${outDir}`]);
    pdfGen.on('close', code2 => {
      if (code2 !== 0) return res.status(500).json({ error: 'PDF generation failed' });
      try {
        const jsonPath = path.join(outDir, `diff-v${fromVersion}-v${toVersion}.json`);
        const htmlPath = path.join(outDir, `diff-v${fromVersion}-v${toVersion}.html`);
        const pdfPath = path.join(outDir, `diff-summary-v${fromVersion}-v${toVersion}.pdf`);
        const diffData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const htmlSnippet = fs.readFileSync(htmlPath, 'utf-8');
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfBase64 = pdfBuffer.toString('base64');
        res.json({ diffData, htmlSnippet, pdfBase64 });
      } catch (err) {
        res.status(500).json({ error: 'Error reading generated files' });
      }
    });
  });
});

// Delete an audit report by version
app.delete('/api/audit/:version', authCheck, (req, res) => {
  const version = req.params.version;
  const filePath = path.resolve(__dirname, '../audit-reports', `Audit-Report-v${version}.html`);
  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ success: true });
  });
});

// List all reports
app.get('/api/reports', (req, res) => {
  const dir = path.resolve(__dirname, '../audit-reports');
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Read failed' });
    const reports = files
      .filter(f => /^Audit-Report-v(\d+)\.html$/.test(f))
      .map(f => {
        const match = f.match(/^Audit-Report-v(\d+)\.html$/);
        return { version: match[1], file: f };
      })
      .sort((a, b) => Number(b.version) - Number(a.version));
    res.json(reports);
  });
});

const port = process.env.AUDIT_PORT || 4000;
app.listen(port, () => console.log(`Audit API listening on port ${port}`));
