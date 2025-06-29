import '@testing-library/jest-dom'; // Use more explicit import for type augmentation
import { jest, beforeEach, afterEach } from '@jest/globals';

// Mock localStorage for tests
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] || null,
    length: Object.keys(store).length,
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock crypto.randomUUID if not available in JSDOM
if (typeof crypto === 'undefined' || typeof crypto.randomUUID === 'undefined') {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      randomUUID: () =>
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }),
    },
  });
}

// Mock window.JSZip if needed
if (typeof (window as any).JSZip === 'undefined') {
  const mockJSZipInstance = {
    file: jest.fn().mockReturnThis(),
    folder: jest.fn().mockReturnThis(),
    generateAsync: jest.fn<() => Promise<Blob>>().mockResolvedValue(new Blob()),
    loadAsync: jest.fn<() => Promise<any>>().mockResolvedValue({
      files: {
        'test.txt': {
          async: jest.fn<() => Promise<string>>().mockResolvedValue('test content'),
          dir: false,
          name: 'test.txt',
        },
      },
    }),
  };
  Object.defineProperty(window, 'JSZip', {
    value: jest.fn(() => mockJSZipInstance),
  });
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock process.env
const originalProcessEnv = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalProcessEnv,
    API_KEY: 'test-api-key',
  };
});

afterEach(() => {
  process.env = originalProcessEnv;
});