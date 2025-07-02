# Release Checklist

- [ ] Build passes (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Code is formatted (`npm run format`)
- [ ] Test coverage meets threshold (`npm run coverage`)
- [ ] Environment variables audited (`.env.example` up to date)
- [ ] Version bumped in `package.json`
- [ ] Changelog updated
- [ ] Lint passes (`npm run lint`)
- [ ] Manual accessibility checks complete
- [ ] Docker image builds and runs (if applicable)
- [ ] Deployment instructions verified
- [ ] **Coverage reports generated in CI** (`jest --coverage --coverageReporters="text-summary"`)
- [ ] (Optional) Upload coverage to badge system (e.g., Codecov, Coveralls)
