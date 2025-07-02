import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import {
  generateMarkdownContent,
  sanitizeFilename,
  exportIdea,
  exportProjectAsZip,
  readFileAsText,
  readFileAsBase64,
  saveFile,
} from './fileService'; // Adjust path as necessary
import { Idea, Project } from '@/types'; // Adjust path as necessary

// Mock JSZip
const mockZipFile = jest.fn();
const mockZipFolder = jest.fn().mockReturnThis(); // To chain folder().file()
// Correctly type mockZipGenerateAsync to accept options
const mockZipGenerateAsync = jest.fn<(options: { type: string }) => Promise<Blob>>();
const mockZipLoadAsync = jest.fn();

Object.defineProperty(window, 'JSZip', {
  value: jest.fn().mockImplementation(() => ({
    file: mockZipFile,
    folder: mockZipFolder,
    generateAsync: mockZipGenerateAsync,
    loadAsync: mockZipLoadAsync,
  })),
  writable: true,
});

// Mock Blob and URL.createObjectURL/revokeObjectURL
// @ts-ignore
globalThis.Blob = jest.fn((content?: BlobPart[], options?: BlobPropertyBag) => ({
  content,
  options,
  size:
    content && Array.isArray(content) && typeof content[0] === 'string'
      ? (content[0] as string).length
      : 0,
  type: options?.type || '',
  arrayBuffer: jest.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(0)),
  slice: jest.fn(),
  stream: jest.fn(),
  text: jest
    .fn<() => Promise<string>>()
    .mockResolvedValue(
      content && Array.isArray(content) && typeof content[0] === 'string' ? content[0] : ''
    ),
})) as unknown as typeof Blob; // Cast to actual Blob type for tsc
URL.createObjectURL = jest.fn(() => 'mock-url');
URL.revokeObjectURL = jest.fn();

// Mock document.createElement('a') for download simulation
const mockLinkClick = jest.fn();
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();
Object.defineProperty(document, 'createElement', {
  value: jest.fn(() => ({
    href: '',
    download: '',
    type: '',
    click: mockLinkClick,
    style: {},
  })),
  writable: true,
});
Object.defineProperty(document.body, 'appendChild', { value: mockAppendChild, writable: true });
Object.defineProperty(document.body, 'removeChild', { value: mockRemoveChild, writable: true });

const sampleIdea: Idea = {
  id: 'idea1',
  title: 'My Awesome Idea!',
  problemSolved: 'Solves world hunger.',
  coreSolution: 'Distribute cookies.',
  keyFeatures: '- Free cookies\n- Delicious cookies',
  targetAudience: 'Everyone',
  inspirationNotes: 'Cookies are great.',
  attachments: [
    {
      id: 'att1',
      name: 'logo with space.png',
      type: 'image',
      mimeType: 'image/png',
      content: 'base64imagestring',
      size: 1024,
    },
    {
      id: 'att2',
      name: 'notes <unsafe>.txt',
      type: 'text',
      mimeType: 'text/plain',
      content: 'Some text notes.',
      size: 512,
    },
    {
      id: 'att3',
      name: 'archive.zip',
      type: 'other',
      mimeType: 'application/zip',
      content: '',
      size: 0,
    },
    {
      id: 'att4',
      name: 'README.md',
      type: 'text',
      mimeType: 'text/markdown',
      content: '# Readme',
      size: 8,
    },
    {
      id: 'att5',
      name: `${'verylongfilename'.repeat(10)}.txt`,
      type: 'text',
      mimeType: 'text/plain',
      content: 'x'.repeat(1000),
      size: 1000,
    },
  ],
  createdAt: new Date('2020-01-01T00:00:00Z').toISOString(),
  updatedAt: new Date('2024-01-01T00:00:00Z').toISOString(),
};

const sampleProject: Project = {
  id: 'proj1',
  name: 'Cookie Project / Division',
  ideas: [sampleIdea],
  attachments: [
    {
      id: 'projatt1',
      name: 'project plan.pdf',
      type: 'other',
      mimeType: 'application/pdf',
      content: 'pdfbase64',
      size: 2048,
    },
    {
      id: 'projatt2',
      name: 'diagram (1).svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      content: '<svg></svg>',
      size: 256,
    },
  ],
  createdAt: new Date('2019-12-31T23:59:59Z').toISOString(),
  isFavorite: true,
};

// Define a shared mock FileReader instance structure
const mockFileReaderInstance = {
  onload: null as ((event: ProgressEvent<FileReader>) => void) | null,
  onerror: null as ((event: ProgressEvent<FileReader>) => void) | null,
  readAsText: jest.fn(function (this: FileReader, blob: Blob) {
    // Takes Blob/File
    // @ts-ignore
    this.result = (blob as any)._customContent || 'hello world'; // Simulate reading content
    // @ts-ignore
    if (this.onload) this.onload({ target: this } as ProgressEvent<FileReader>);
  }),
  readAsDataURL: jest.fn(function (this: FileReader, blob: Blob) {
    // Takes Blob/File
    // @ts-ignore
    this.result = (blob as any)._customBase64Content || 'data:image/png;base64,ZGF0YQ==';
    // @ts-ignore
    if (this.onload) this.onload({ target: this } as ProgressEvent<FileReader>);
  }),
  result: '' as string | ArrayBuffer | null,
  error: null as DOMException | null,
};

// Mock the global FileReader constructor to return our mock instance
(globalThis as any).FileReader = jest.fn(
  () => mockFileReaderInstance
) as unknown as typeof FileReader;

describe('fileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset individual methods of the mock FileReader instance
    mockFileReaderInstance.onload = null;
    mockFileReaderInstance.onerror = null;
    mockFileReaderInstance.readAsText.mockClear();
    mockFileReaderInstance.readAsDataURL.mockClear();
    mockFileReaderInstance.result = '';
    mockFileReaderInstance.error = null;
  });

  describe('generateMarkdownContent', () => {
    test('should generate correct markdown string with edge-case attachments', () => {
      const markdown = generateMarkdownContent(sampleIdea);
      expect(markdown).toContain(`# ${sampleIdea.title}`);
      expect(markdown).toContain(`## Problem Solved:\n${sampleIdea.problemSolved}`);
      expect(markdown).toContain(`![logo with space.png](./attachments/logo_with_space.png)`);
      expect(markdown).toContain(
        `- notes <unsafe>.txt (type: text, size: 0 KB) - See ./attachments/notes_unsafe_.txt`
      );
      expect(markdown).toContain(
        `- archive.zip (type: other, size: 0 KB) - See ./attachments/archive.zip`
      );
      expect(markdown).toContain(
        `- README.md (type: text, size: 0 KB) - See ./attachments/README.md`
      );
      expect(markdown).toContain(
        `- verylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilename.txt (type: text, size: 0 KB) - See ./attachments/verylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilenameverylongfilename.txt`
      );
    });

    test('should handle missing fields and empty attachments gracefully', () => {
      const minimalIdea: Idea = {
        ...sampleIdea,
        problemSolved: '',
        coreSolution: '',
        keyFeatures: '',
        targetAudience: '',
        inspirationNotes: '',
        attachments: [],
      };
      const markdown = generateMarkdownContent(minimalIdea);
      expect(markdown).toContain(`## Problem Solved:\nN/A`);
      expect(markdown).not.toContain(`## Attachments:`);
    });
  });

  describe('sanitizeFilename', () => {
    test('should replace invalid characters and truncate', () => {
      expect(sanitizeFilename('file/name*with?chars"<>|#%&{}.txt')).toBe(
        'file_name_with_chars_.txt'
      );
      expect(sanitizeFilename('file  with   spaces.txt')).toBe('file_with_spaces.txt');
      const longName = `${'a'.repeat(150)}.txt`;
      expect(sanitizeFilename(longName).length).toBe(100 + 4);
    });
    test('should handle unicode and edge cases', () => {
      expect(sanitizeFilename('emoji🚀file.txt')).toBe('emoji_file.txt');
      expect(sanitizeFilename('')).toBe('');
    });
  });

  describe('exportIdea', () => {
    test('should export idea as markdown if no attachments or JSZip unavailable', async () => {
      // @ts-ignore
      const originalJSZip = window.JSZip;
      // @ts-ignore
      window.JSZip = undefined; // Simulate JSZip not available

      const ideaNoAttachments = { ...sampleIdea, attachments: [] };
      await exportIdea(ideaNoAttachments);

      expect(globalThis.Blob).toHaveBeenCalledWith([expect.any(String)], {
        type: 'text/markdown;charset=utf-8',
      });
      expect(mockLinkClick).toHaveBeenCalled();
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();

      // @ts-ignore
      window.JSZip = originalJSZip; // Restore JSZip
    });

    test('should export idea as ZIP with attachments (edge cases)', async () => {
      mockZipGenerateAsync.mockResolvedValueOnce(new Blob([], { type: 'application/zip' }));
      await exportIdea(sampleIdea);

      expect(mockZipFile).toHaveBeenCalledWith(expect.stringContaining('.md'), expect.any(String));
      expect(mockZipFolder).toHaveBeenCalledWith('attachments');
      expect(mockZipFile).toHaveBeenCalledWith('logo_with_space.png', expect.any(Object));
      expect(mockZipFile).toHaveBeenCalledWith('notes_unsafe_.txt', expect.any(Object));
      expect(mockZipFile).toHaveBeenCalledWith('archive.zip', expect.any(Object));
      expect(mockZipFile).toHaveBeenCalledWith('README.md', expect.any(Object));
      expect(mockZipFile).toHaveBeenCalledWith(
        expect.stringMatching(/^verylongfilename/),
        expect.any(Object)
      );
      expect(mockZipGenerateAsync).toHaveBeenCalledWith({ type: 'blob' });
      expect(mockLinkClick).toHaveBeenCalled();
    });

    test('should throw error if JSZip operations fail', async () => {
      mockZipGenerateAsync.mockRejectedValueOnce(new Error('Zip generation failed'));
      await expect(exportIdea(sampleIdea)).rejects.toThrow('Failed to export idea');
    });

    test('should handle offline mode gracefully', async () => {
      // @ts-ignore
      const originalJSZip = window.JSZip;
      // @ts-ignore
      window.JSZip = undefined;
      const ideaNoAttachments = { ...sampleIdea, attachments: [] };
      await exportIdea(ideaNoAttachments);
      expect(globalThis.Blob).toHaveBeenCalledWith([expect.any(String)], {
        type: 'text/markdown;charset=utf-8',
      });
      // @ts-ignore
      window.JSZip = originalJSZip;
    });
  });

  describe('exportProjectAsZip', () => {
    test('should export project with multiple ideas and attachments as ZIP', async () => {
      mockZipGenerateAsync.mockResolvedValueOnce(new Blob([], { type: 'application/zip' }));
      const projectWithMultipleIdeas = {
        ...sampleProject,
        ideas: [sampleIdea, { ...sampleIdea, id: 'idea2', title: 'Another Idea', attachments: [] }],
      };
      await exportProjectAsZip(projectWithMultipleIdeas);

      expect(mockZipFolder).toHaveBeenCalledWith(sanitizeFilename(projectWithMultipleIdeas.name)); // Project folder
      expect(mockZipFolder).toHaveBeenCalledWith(sanitizeFilename(sampleIdea.title)); // Idea 1 subfolder
      expect(mockZipFolder).toHaveBeenCalledWith(sanitizeFilename('Another Idea')); // Idea 2 subfolder
      expect(mockZipFile).toHaveBeenCalledTimes(4); // 2 README.mds + 2 attachments for first idea
      expect(mockZipGenerateAsync).toHaveBeenCalledWith({ type: 'blob' });
      expect(mockLinkClick).toHaveBeenCalled();
    });

    test('should throw error if JSZip is not available for project export', async () => {
      // @ts-ignore
      const originalJSZip = window.JSZip;
      // @ts-ignore
      window.JSZip = undefined;
      await expect(exportProjectAsZip(sampleProject)).rejects.toThrow(
        'JSZip library is not available.'
      );
      // @ts-ignore
      window.JSZip = originalJSZip;
    });

    test('should handle project with no ideas or attachments', async () => {
      mockZipGenerateAsync.mockResolvedValueOnce(new Blob([], { type: 'application/zip' }));
      const emptyProject: Project = { ...sampleProject, ideas: [], attachments: [] };
      await exportProjectAsZip(emptyProject);
      expect(mockZipGenerateAsync).toHaveBeenCalledWith({ type: 'blob' });
      expect(mockLinkClick).toHaveBeenCalled();
    });
  });

  describe('readFileAsText', () => {
    test('should read file as text successfully', async () => {
      const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' });
      // @ts-ignore Add custom property for mock content
      (file as any)._customContent = 'hello world';

      const content = await readFileAsText(file);
      expect(content).toBe('hello world');
      expect(mockFileReaderInstance.readAsText).toHaveBeenCalledWith(file);
    });

    test('should reject on file read error (text)', async () => {
      const file = new File([''], 'error.txt', { type: 'text/plain' });
      const mockError = new DOMException('Test read error');

      // Configure the mock instance for error
      mockFileReaderInstance.readAsText.mockImplementationOnce(function (this: FileReader) {
        // @ts-ignore
        this.error = mockError;
        // @ts-ignore
        if (this.onerror) this.onerror({ target: this } as ProgressEvent<FileReader>);
      });

      await expect(readFileAsText(file)).rejects.toThrow(
        'Failed to read file "error.txt" as text: Test read error'
      );
    });

    test('should handle empty file', async () => {
      const file = new File([''], 'empty.txt', { type: 'text/plain' });
      // @ts-ignore
      (file as any)._customContent = '';
      const content = await readFileAsText(file);
      expect(content).toBe('');
    });
  });

  describe('readFileAsBase64', () => {
    test('should read file as base64 successfully', async () => {
      const file = new File(['data'], 'image.png', { type: 'image/png' });
      const base64String = 'data:image/png;base64,ZGF0YQ=='; // "data" in base64
      // @ts-ignore Add custom property for mock content
      (file as any)._customBase64Content = base64String;

      const content = await readFileAsBase64(file);
      expect(content).toBe(base64String);
      expect(mockFileReaderInstance.readAsDataURL).toHaveBeenCalledWith(file);
    });

    test('should handle binary file', async () => {
      const file = new File([new Uint8Array([0, 255, 127])], 'binfile.bin', {
        type: 'application/octet-stream',
      });
      // @ts-ignore
      (file as any)._customBase64Content = 'data:application/octet-stream;base64,AP9/';
      const content = await readFileAsBase64(file);
      expect(content).toBe('data:application/octet-stream;base64,AP9/');
    });
  });

  describe('saveFile', () => {
    it('creates a downloadable file link', () => {
      // JSDOM does not support download, so just check function runs
      expect(() => saveFile('test.txt', 'hello')).not.toThrow();
    });
  });
});

// TODO: manual fix required – fileService.test.ts is empty. Add tests for fileService.
