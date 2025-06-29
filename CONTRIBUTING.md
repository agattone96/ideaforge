# Contributing to IdeaForge

Thank you for your interest in improving IdeaForge! This project welcomes pull requests for bug fixes, new features, and documentation updates.

## Pull Request Workflow

1. **Fork** the repository and create your feature branch from `main`:
   ```bash
   git checkout -b my-feature
   ```
2. **Install dependencies** and ensure the project builds:
   ```bash
   npm install
   npm run build
   ```
3. **Run quality checks** before submitting:
   ```bash
   npm run lint
   npm run format:check
   npm test
   ```
   All tests should pass and coverage thresholds defined in `jest.config.cjs` must be satisfied.
4. **Commit** your changes with clear messages and open a pull request against the `main` branch.
5. A maintainer will review your PR. Please respond to feedback and keep your branch up to date.

## Coding Standards

- **Language:** All source code is written in TypeScript and React.
- **Linting:** The project uses ESLint with the Airbnb and TypeScript rules. Run `npm run lint` and resolve any reported issues.
- **Formatting:** Prettier enforces style rules such as 2‑space indentation and single quotes. Apply formatting with `npm run format`.
- **Testing:** Unit tests are written with Jest and must maintain at least 80% coverage as specified in `jest.config.cjs`.
- **Commit Style:** Use clear, descriptive commit messages. Small, focused commits make reviews easier.

Following these guidelines helps keep the codebase consistent and maintainable. Thank you for contributing!
