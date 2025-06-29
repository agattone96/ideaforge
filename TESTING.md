# Testing Guide

## Overview
The project uses **Jest** with **React Testing Library** and a custom
`setupTests.ts` file to provide a stable test environment running in JSDOM.
`jest.config.cjs` loads this file automatically via `setupFilesAfterEnv`.

## Provided Mocks

- **localStorage** – A small in-memory replacement so tests can store and
  retrieve data exactly as the browser would.
- **crypto.randomUUID** – Deterministic polyfill returning sequential UUIDv4
  strings. This avoids flaky tests that depend on random values.
- **JSZip** – Lightweight class with `file`, `folder`, `generateAsync`, and
  `loadAsync` stubs. Useful for services that handle ZIP files.
- **matchMedia** – Polyfill so components relying on media queries can run under
  JSDOM without errors.
- **process.env** – The entire environment is copied before each test and
  restored afterwards to ensure isolation.

Each mock is reset in `beforeEach`/`afterEach` so tests remain deterministic and
reusable.

## Adding New Mocks
Extend `setupTests.ts` with additional utilities if a library or browser API
needs mocking. Keep implementations minimal and comment why each mock exists.
Use `beforeEach`/`afterEach` hooks to restore state.

## Running Tests Locally
From the project root, run:

```bash
# with npm
npm test

# or yarn
yarn test

# or pnpm
pnpm test
```
