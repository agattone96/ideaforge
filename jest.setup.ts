
import '@testing-library/jest-dom/extend-expect'; // Use more explicit import for type augmentation
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

// Mock crypto.randomUUID if not available in JSDOM (it usually is in newer versions)
if (typeof crypto === 'undefined' || typeof crypto.randomUUID === 'undefined') {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      randomUUID: () => 
        // A simple UUID v4 polyfill for testing purposes
         'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        })
      ,
    },
  });
}

// Mock window.JSZip for fileService tests if needed and not loaded by JSDOM
if (typeof (window as any).JSZip === 'undefined') {
  const mockJSZipInstance = {
    file: jest.fn().mockReturnThis(),
    folder: jest.fn().mockReturnThis(),
    generateAsync: jest.fn<() => Promise<Blob>>().mockResolvedValue(new Blob()), // Typed mock
    loadAsync: jest.fn<() => Promise<any>>().mockResolvedValue({ // Typed mock, 'any' for simplicity
      files: {
        'test.txt': {
          async: jest.fn<() => Promise<string>>().mockResolvedValue('test content'), // Typed mock
          dir: false,
          name: 'test.txt'
        }
      }
    })
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

// Suppress console.warn and console.error for cleaner test output
// You can comment this out if you need to see these logs during tests
// console.warn = jest.fn();
// console.error = jest.fn();

// Mock process.env for test environments
const originalProcessEnv = process.env;
beforeEach(() => {
  jest.resetModules(); // Reset modules to allow env changes
  process.env = {
    ...originalProcessEnv,
    API_KEY: 'test-api-key', // Provide a mock API key for tests
  };
});

afterEach(() => {
  process.env = originalProcessEnv; // Restore original process.env
});
