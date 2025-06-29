# 🧪 Testing Guide

## Overview

This project uses **Jest** with **React Testing Library** for unit and integration testing. The global test environment is configured via `setupTests.ts`, automatically loaded through Jest’s `setupFilesAfterEnv` setting. Tests execute within a **JSDOM**-based browser simulation.

## 🧱 Provided Mocks

The following mocks are configured to ensure consistent, isolated, and browser-like behavior during tests:

- **`localStorage`** – In-memory mock to simulate web storage.
- **`crypto.randomUUID`** – Deterministic UUID v4 polyfill returning sequential values to prevent flaky tests.
- **`JSZip`** – Lightweight stub of the ZIP handling library supporting:
  - `file`
  - `folder`
  - `generateAsync`
  - `loadAsync`
- **`matchMedia`** – Polyfill that enables media query support under JSDOM.
- **`process.env`** – Environment variables are cloned before each test and restored afterward to isolate side effects.

All mocks are automatically reset in `beforeEach`/`afterEach` to maintain test integrity.

## ➕ Adding New Mocks

Extend `setupTests.ts` when a library or browser API requires mocking:

1. Implement the mock.
2. Reset state with `beforeEach`/`afterEach`.
3. Add inline comments explaining the purpose of the mock.

Keep all mocks lightweight and focused on test-specific behavior.

## ▶️ Running Tests Locally

Run tests from the project root using your preferred package manager:

```bash
# npm
npm test

# yarn
yarn test

# pnpm
pnpm test