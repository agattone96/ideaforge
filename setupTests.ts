import '@testing-library/jest-dom';


class LocalStorageMock {
  private store: Record<string, string> = {};

  private throwOnSet = false;

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: unknown) {
    if (this.throwOnSet) throw new Error('QuotaExceededError');
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

  simulateQuotaExceeded(shouldThrow: boolean) {
    this.throwOnSet = shouldThrow;
  }
}

const localStorageMock = new LocalStorageMock();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});


let uuidCounter = 0;
const deterministicUUID = () =>
  `00000000-0000-4000-8000-${(uuidCounter++).toString(16).padStart(12, '0')}`;

if (!globalThis.crypto || typeof globalThis.crypto.randomUUID !== 'function') {
  globalThis.crypto = {
    ...(globalThis.crypto ?? {}),
    randomUUID: jest.fn(deterministicUUID),
  } as Crypto;
}


class MockJSZip {
  file = jest.fn(() => this);

  folder = jest.fn(() => this);

  generateAsync = jest.fn(async (options?: any) => {
    if ((this as any)._shouldThrow) throw new Error('ZipError');
    return new Blob();
  });

  loadAsync = jest.fn(async () => ({ files: {} }));

  simulateError(shouldThrow: boolean) {
    (this as any)._shouldThrow = shouldThrow;
  }
}

Object.defineProperty(window, 'JSZip', {
  value: jest.fn(() => new MockJSZip()),
  writable: true,
});

// Mock the `jszip` module to use the same lightweight implementation
jest.mock('jszip', () => ({
  __esModule: true,
  default: jest.fn(() => new MockJSZip()),
}));


if (!window.matchMedia) {
  window.matchMedia = ((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(() => false),
  })) as unknown as typeof window.matchMedia;
}


export function setNavigatorOnline(online: boolean) {
  Object.defineProperty(window.navigator, 'onLine', {
    value: online,
    configurable: true,
  });
}


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

// TODO: manual fix required – setupTests.ts is empty. Add test setup (e.g., jest-dom, mocks).
// TODO: manual fix required – setupTests.ts is empty. Add test setup (e.g., jest-dom, mocks).
