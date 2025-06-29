# Testing Guide

## Overview
This project uses **Jest** together with **React Testing Library**. The global test environment is configured through `setupTests.ts`, loaded automatically via Jest's `setupFilesAfterEnv`.

## Provided Mocks
- **localStorage** – In-memory replacement to isolate storage across tests.
- **crypto.randomUUID** – Deterministic UUID v4 polyfill producing sequential values.
- **JSZip** – Lightweight mock implementing `file`, `folder`, `generateAsync`, and `loadAsync`.
- **matchMedia** – Polyfill for JSDOM to emulate media queries.
- **process.env** – Environment variables are copied before each test and restored after.

All mocks reset state in `beforeEach`/`afterEach` hooks to keep tests deterministic and reusable.

## Adding New Mocks
Extend `setupTests.ts` with additional mocks when new browser APIs or libraries require them. Document the purpose of each mock and ensure any mutable state is reset between tests.

## Running Tests Locally
Use your preferred package manager:

```bash
# npm
npm test

# yarn
yarn test

# pnpm
pnpm test
```

Coverage reports are written to the `coverage` directory.

## Continuous Integration
The workflow `.github/workflows/test.yml` runs linting and tests on Node 18 and 20 for pushes and pull requests. Dependencies are cached based on the detected package manager. Coverage artifacts are uploaded for inspection.

## Extending setupTests.ts
1. Add the mock implementation.
2. Reset its state in `beforeEach`/`afterEach`.
3. Provide inline comments explaining why the mock exists.

## Known Limitations
- The UUID polyfill is deterministic and not suitable when true randomness is required.
- The JSZip mock supports only basic usage; extend it if more methods are needed.
