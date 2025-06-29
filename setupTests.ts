import '@testing-library/jest-dom';
import { jest, beforeEach, afterEach } from '@jest/globals';

/**
 * In-memory implementation of `window.localStorage`.
 * Keeps state isolated between tests.
 */
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(index: number) {
    return Object.keys(this.store)[index] ?? null;
  }

  get length() {
    return Object.keys(this.store).length;
  }
}

const localStorageMock = new LocalStorageMock();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

/**
 * Deterministic `crypto.randomUUID` polyfill.
 * Generates sequential UUIDv4 values for predictable assertions.
 */
let uuidCounter = 0;
const deterministicUUID = () =>
  `00000000-0000-4000-8000-${(uuidCounter++)
    .toString(16)
    .padStart(12, '0')}`;

if (!globalThis.crypto || typeof globalThis.crypto.randomUUID !== 'function') {
  globalThis.crypto = {
    ...(globalThis.crypto ?? {}),
    randomUUID: jest.fn(deterministicUUID),
  } as Crypto;
}

/**
 * Lightweight mock for JSZip used in file service tests.
 */
class MockJSZip {
  file = jest.fn(() => this);
  folder = jest.fn(() => this);
  generateAsync = jest.fn(async () => new Blob());
  loadAsync = jest.fn(async () => ({ files: {} }));
}

Object.defineProperty(window, 'JSZip', {
  value: jest.fn(() => new MockJSZip()),
  writable: true,
});

// Mock the `jszip` module to use the same lightweight implementation
jest.mock('jszip', () => {
  return {
    __esModule: true,
    default: jest.fn(() => new MockJSZip()),
  };
});

/**
 * `matchMedia` polyfill so components using it do not fail under JSDOM.
 */
if (!window.matchMedia) {
  window.matchMedia = ((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

/**
 * Preserve and restore `process.env` between tests.
 */
const originalEnv = { ...process.env };

beforeEach(() => {
  localStorageMock.clear();
  uuidCounter = 0;
  process.env = { ...originalEnv };
});

afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  uuidCounter = 0;
  process.env = { ...originalEnv };
});
