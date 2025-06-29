
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { getValidatedMetadata } from "./metadataService"; // Adjust path as necessary
import { AppMetadata, AppMetadataSchema } from '../types/Metadata'; // Adjust path as necessary

// Mock globalThis.fetch
const mockFetch = jest.spyOn(globalThis, 'fetch');

const validMetadata: AppMetadata = {
  name: "IdeaForge Local Test",
  description: "Test description for metadata validation.",
  requestFramePermissions: ["camera"],
  prompt: "Test prompt"
};

// Helper to create a partial Response object for mocking
const createMockResponse = (body: any, ok: boolean, status: number, statusText: string): Response =>
  ({
    ok,
    json: async () => Promise.resolve(body), // Ensure json returns a Promise
    status,
    statusText,
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '/metadata.json',
    clone: () => createMockResponse(body, ok, status, statusText),
    arrayBuffer: async () => Promise.resolve(new ArrayBuffer(0)),
    blob: async () => Promise.resolve(new Blob()),
    formData: async () => Promise.resolve(new FormData()),
    text: async () => Promise.resolve(JSON.stringify(body)),
    body: null,
    bodyUsed: false,
  } as unknown as Response);


describe('metadataService - getValidatedMetadata', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  test('should fetch and validate correct metadata successfully', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(validMetadata, true, 200, 'OK'));

    const metadata = await getValidatedMetadata();
    expect(metadata).toEqual(validMetadata);
    expect(mockFetch).toHaveBeenCalledWith('/metadata.json');
  });

  test('should handle optional fields being absent correctly', async () => {
    const metadataWithoutOptional: Omit<AppMetadata, 'requestFramePermissions' | 'prompt'> & { requestFramePermissions?: string[], prompt?: string } = {
      name: "App With No Optional Meta",
      description: "Description here.",
    };
    mockFetch.mockResolvedValueOnce(createMockResponse(metadataWithoutOptional, true, 200, 'OK'));

    const metadata = await getValidatedMetadata();
    expect(metadata.name).toBe("App With No Optional Meta");
    expect(metadata.requestFramePermissions).toBeUndefined();
    expect(metadata.prompt).toBeUndefined();
  });


  test('should throw error if metadata.json fetch fails (network error)', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Network failed'));
    await expect(getValidatedMetadata()).rejects.toThrow('Network failed');
  });

  test('should throw error if metadata.json fetch returns non-OK status (e.g., 404)', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse({}, false, 404, 'Not Found'));
    await expect(getValidatedMetadata()).rejects.toThrow('Failed to fetch metadata.json: 404 Not Found');
  });

  test('should throw error if metadata.json response is not valid JSON', async () => {
    const invalidJsonResponse = {
        ok: true,
        json: async () => { throw new SyntaxError("Invalid JSON"); }, // json itself throws
        status: 200,
        statusText: 'OK',
        // Add other required Response properties or cast
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '/metadata.json',
        clone: () => invalidJsonResponse as Response,
        arrayBuffer: async () => new ArrayBuffer(0),
        blob: async () => new Blob(),
        formData: async () => new FormData(),
        text: async () => "{invalid json",
        body: null,
        bodyUsed: false,
    } as Response;
    mockFetch.mockResolvedValueOnce(invalidJsonResponse);
    await expect(getValidatedMetadata()).rejects.toThrow('Invalid JSON');
  });

  // Test cases for Zod validation errors
  const invalidMetadataTestCases = [
    {
      description: 'missing name',
      data: { description: 'Test desc' },
      expectedErrorMsg: /metadata\.name: Metadata 'name' cannot be empty/i,
    },
    {
      description: 'name is not a string',
      data: { name: 123, description: 'Test desc' },
      expectedErrorMsg: /metadata\.name: Expected string, received number/i,
    },
    {
      description: 'missing description',
      data: { name: 'Test name' },
      expectedErrorMsg: /metadata\.description: Metadata 'description' cannot be empty/i,
    },
    {
      description: 'description is not a string',
      data: { name: 'Test name', description: true },
      expectedErrorMsg: /metadata\.description: Expected string, received boolean/i,
    },
    {
      description: 'requestFramePermissions is not an array',
      data: { ...validMetadata, requestFramePermissions: 'camera' },
      expectedErrorMsg: /metadata\.requestFramePermissions: Expected array, received string/i,
    },
    {
      description: 'requestFramePermissions array contains non-string',
      data: { ...validMetadata, requestFramePermissions: ['camera', 123] },
      expectedErrorMsg: /metadata\.requestFramePermissions.1: Expected string, received number/i,
    },
    {
      description: 'prompt is not a string',
      data: { ...validMetadata, prompt: { text: "hello" } },
      expectedErrorMsg: /metadata\.prompt: Expected string, received object/i,
    },
  ];

  invalidMetadataTestCases.forEach(testCase => {
    test(`should throw validation error for invalid metadata: ${testCase.description}`, async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(testCase.data, true, 200, 'OK'));

      await expect(getValidatedMetadata()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringMatching(/Invalid metadata\.json structure: .+/) && expect.stringMatching(testCase.expectedErrorMsg),
        })
      );
    });
  });
});
