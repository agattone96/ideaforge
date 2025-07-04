import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import * as localStorageServiceOriginal from './localStorageService'; // Adjust path
import { Project, Idea } from '@/types'; // Adjust path
// Import types from @google/genai directly for mocking clarity

// Declare the mock function with the correct signature
let mockGenerateContentFn: jest.Mock<(params: GenAIParameters) => Promise<GenAIResponse>>;

// Mock the @google/genai module
jest.mock('@google/genai', () => {
  // Initialize mockGenerateContentFn here so it's available to the mockImplementation
  mockGenerateContentFn = jest.fn();
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: mockGenerateContentFn,
      },
    })),
    // Exporting types from the mock itself is not standard. Tests should import types from the actual module.
  };
});

// Helper for act in timers - you might not need it here, but it's good practice for React component tests
const act = async (callback: () => any) => {
  // A simplified version for non-React async tests
  await Promise.resolve(callback()).then(() => {});
};

describe('localStorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('withRetries Utility', () => {
    const successfulAsyncFn = jest.fn<() => Promise<string>>();
    const failingAsyncFn = jest.fn<() => Promise<string>>();

    beforeEach(() => {
      successfulAsyncFn.mockClear();
      failingAsyncFn.mockClear();
    });

    test('should return result on first successful attempt', async () => {
      successfulAsyncFn.mockResolvedValueOnce('success');
      const result = await localStorageServiceOriginal.withRetries(
        successfulAsyncFn,
        'TestOpSuccess'
      );
      expect(result).toBe('success');
      expect(successfulAsyncFn).toHaveBeenCalledTimes(1);
    });

    test('should retry on failure and succeed eventually', async () => {
      failingAsyncFn
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValueOnce('success after retries');

      const result = await localStorageServiceOriginal.withRetries(
        failingAsyncFn,
        'TestOpRetrySuccess'
      );
      expect(result).toBe('success after retries');
      expect(failingAsyncFn).toHaveBeenCalledTimes(3);
    });

    test('should throw error after all retries fail', async () => {
      failingAsyncFn
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockRejectedValueOnce(new Error('Fail 3 Final'));

      await expect(
        localStorageServiceOriginal.withRetries(failingAsyncFn, 'TestOpRetryFail')
      ).rejects.toThrow('Fail 3 Final');
      expect(failingAsyncFn).toHaveBeenCalledTimes(3); // Max retries is 3
    });

    test('should use exponential backoff delay (mocking setTimeout)', async () => {
      jest.useFakeTimers();
      failingAsyncFn.mockRejectedValueOnce(new Error('Fail 1')).mockResolvedValueOnce('success');

      const promise = localStorageServiceOriginal.withRetries(failingAsyncFn, 'TestOpDelay');

      expect(failingAsyncFn).toHaveBeenCalledTimes(1);

      // Fast-forward time for the first delay (500ms)
      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      expect(failingAsyncFn).toHaveBeenCalledTimes(2);

      await act(async () => {
        await promise; // Allow the promise to resolve
      });

      jest.useRealTimers();
    });

    test('should retry and succeed after network error (simulate offline/online)', async () => {
      let callCount = 0;
      const flakyFn = jest.fn(async () => {
        callCount++;
        if (callCount < 2) throw new Error('Network offline');
        return 'online now';
      });
      const result = await localStorageServiceOriginal.withRetries(flakyFn, 'TestOfflineRetry');
      expect(result).toBe('online now');
      expect(flakyFn).toHaveBeenCalledTimes(2);
    });

    test('should throw error if all retries fail due to offline', async () => {
      const alwaysOffline = jest.fn().mockRejectedValue(new Error('Network offline'));
      await expect(
        localStorageServiceOriginal.withRetries(alwaysOffline, 'TestAlwaysOffline')
      ).rejects.toThrow('Network offline');
      expect(alwaysOffline).toHaveBeenCalledTimes(3);
    });
  });

  describe('Project CRUD', () => {
    test('should create a new project', () => {
      const projectName = 'Test Project';
      const project = localStorageServiceOriginal.createProject(projectName);
      expect(project.name).toBe(projectName);
      expect(project.ideas).toEqual([]);
      expect(project.attachments).toEqual([]);
      const projects = localStorageServiceOriginal.getProjects();
      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe(projectName);
    });

    test('should get all projects, sorted by favorite and then creation date', () => {
      localStorageServiceOriginal.createProject('Project B');
      const projectA = localStorageServiceOriginal.createProject('Project A'); // Created later, but will be favorited
      localStorageServiceOriginal.createProject('Project C');

      localStorageServiceOriginal.toggleFavoriteProject(projectA.id);

      const projects = localStorageServiceOriginal.getProjects();
      expect(projects).toHaveLength(3);
      expect(projects[0].name).toBe('Project A'); // Favorited should be first
      expect(projects[1].name).toBe('Project C'); // Then newest non-favorite
      expect(projects[2].name).toBe('Project B'); // Then older non-favorite
    });

    test('should get project by ID', () => {
      const project = localStorageServiceOriginal.createProject('Find Me');
      const foundProject = localStorageServiceOriginal.getProjectById(project.id);
      expect(foundProject).toEqual(project);
      const notFoundProject = localStorageServiceOriginal.getProjectById('non-existent-id');
      expect(notFoundProject).toBeUndefined();
    });

    test('should update a project', () => {
      const project = localStorageServiceOriginal.createProject('Initial Name');
      const updatedProjectData: Project = {
        ...project,
        name: 'Updated Name',
        isFavorite: true,
        attachments: [],
      };
      localStorageServiceOriginal.updateProject(updatedProjectData);
      const retrievedProject = localStorageServiceOriginal.getProjectById(project.id);
      expect(retrievedProject?.name).toBe('Updated Name');
      expect(retrievedProject?.isFavorite).toBe(true);
    });

    test('should delete a project', () => {
      const project = localStorageServiceOriginal.createProject('To Delete');
      localStorageServiceOriginal.deleteProject(project.id);
      const projects = localStorageServiceOriginal.getProjects();
      expect(projects.find((p) => p.id === project.id)).toBeUndefined();
    });

    test('should toggle favorite status of a project', () => {
      const project = localStorageServiceOriginal.createProject('Favorite Test');
      expect(project.isFavorite).toBe(false);
      localStorageServiceOriginal.toggleFavoriteProject(project.id);
      let updatedProject = localStorageServiceOriginal.getProjectById(project.id);
      expect(updatedProject?.isFavorite).toBe(true);
      localStorageServiceOriginal.toggleFavoriteProject(project.id);
      updatedProject = localStorageServiceOriginal.getProjectById(project.id);
      expect(updatedProject?.isFavorite).toBe(false);
    });

    test('should not allow duplicate project IDs', () => {
      const project1 = localStorageServiceOriginal.createProject('Unique Project');
      // Simulate manual insertion of duplicate
      const projects = localStorageServiceOriginal.getProjects();
      projects.push({ ...project1, name: 'Duplicate', id: project1.id });
      localStorage.setItem('projects', JSON.stringify(projects));
      const allProjects = localStorageServiceOriginal.getProjects();
      // Should still return both, but IDs are not unique
      expect(allProjects.filter((p) => p.id === project1.id)).toHaveLength(2);
    });

    test('should handle empty project list', () => {
      localStorage.clear();
      expect(localStorageServiceOriginal.getProjects()).toEqual([]);
    });

    test('should handle project with missing fields', () => {
      const incompleteProject = {
        id: 'pX',
        name: '',
        ideas: undefined,
        attachments: undefined,
        createdAt: '',
        isFavorite: undefined,
      };
      localStorage.setItem('projects', JSON.stringify([incompleteProject]));
      const projects = localStorageServiceOriginal.getProjects();
      expect(projects[0].id).toBe('pX');
    });
  });

  describe('Idea CRUD', () => {
    let projectId: string;
    beforeEach(() => {
      const project = localStorageServiceOriginal.createProject('Project With Ideas');
      projectId = project.id;
    });

    const createFullIdea = (ideaData: Partial<Idea>): Idea => ({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachments: [],
      title: 'Default Title',
      problemSolved: '',
      coreSolution: '',
      keyFeatures: '',
      targetAudience: '',
      inspirationNotes: '',
      ...ideaData,
    });

    test('should add an idea to a project', () => {
      const newIdea = createFullIdea({ title: 'New Test Idea' });
      localStorageServiceOriginal.addIdeaToProject(projectId, newIdea);
      const project = localStorageServiceOriginal.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(1);
      expect(project?.ideas[0].title).toBe('New Test Idea');
    });

    test('should update an idea in a project', () => {
      const ideaToUpdate = createFullIdea({ title: 'Initial Idea Title' });
      localStorageServiceOriginal.addIdeaToProject(projectId, ideaToUpdate);
      const updatedIdea: Idea = { ...ideaToUpdate, title: 'Updated Idea Title' };
      localStorageServiceOriginal.updateIdeaInProject(projectId, updatedIdea);
      const project = localStorageServiceOriginal.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(1);
      expect(project?.ideas[0].title).toBe('Updated Idea Title');
    });

    test('should delete an idea from a project', () => {
      const ideaToDelete = createFullIdea({ title: 'Idea To Delete' });
      localStorageServiceOriginal.addIdeaToProject(projectId, ideaToDelete);
      let project = localStorageServiceOriginal.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(1);

      localStorageServiceOriginal.deleteIdeaFromProject(projectId, ideaToDelete.id);
      project = localStorageServiceOriginal.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(0);
    });

    test('should handle adding idea to non-existent project', () => {
      const fakeIdea = {
        id: 'fake',
        title: 'Ghost',
        problemSolved: '',
        coreSolution: '',
        keyFeatures: '',
        targetAudience: '',
        inspirationNotes: '',
        attachments: [],
        createdAt: '',
        updatedAt: '',
      };
      expect(() =>
        localStorageServiceOriginal.addIdeaToProject('no-such-project', fakeIdea)
      ).not.toThrow();
      // Should not add anything
      expect(
        localStorageServiceOriginal.getProjects().find((p) => p.id === 'no-such-project')
      ).toBeUndefined();
    });

    test('should handle updating non-existent idea', () => {
      const idea = createFullIdea({ id: 'notfound', title: 'Missing' });
      expect(() => localStorageServiceOriginal.updateIdeaInProject(projectId, idea)).not.toThrow();
      const project = localStorageServiceOriginal.getProjectById(projectId);
      expect(project?.ideas.find((i) => i.id === 'notfound')).toBeUndefined();
    });
  });

  describe('AI Feature Functions', () => {
    test('generateIdeaBoilerplate should call AI and parse JSON', async () => {
      const mockResponse = {
        text: '```json\n{"problemSolved": "test problem", "coreSolution": "test solution", "keyFeatures": "- f1", "targetAudience": "test audience"}\n```',
      };
      mockGenerateContentFn.mockResolvedValue(mockResponse as GenAIResponse);

      const boilerplate = await localStorageServiceOriginal.generateIdeaBoilerplate('Test Idea');
      expect(mockGenerateContentFn).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gemini-2.5-flash-preview-04-17',
        })
      );
      expect(boilerplate).toEqual({
        problemSolved: 'test problem',
        coreSolution: 'test solution',
        keyFeatures: '- f1',
        targetAudience: 'test audience',
      });
    });

    test('summarizeIdea should call AI and return text', async () => {
      const mockResponse = { text: 'This is a summary.' };
      mockGenerateContentFn.mockResolvedValue(mockResponse as GenAIResponse);
      const ideaContent = {
        title: 't',
        problemSolved: 'p',
        coreSolution: 'c',
        keyFeatures: 'k',
        targetAudience: 'a',
        inspirationNotes: 'i',
      };

      const summary = await localStorageServiceOriginal.summarizeIdea(ideaContent);
      expect(mockGenerateContentFn).toHaveBeenCalled();
      expect(summary).toBe('This is a summary.');
    });

    test('generateIdeaBoilerplate should handle AI returning invalid JSON', async () => {
      mockGenerateContentFn.mockResolvedValue({ text: 'not a json' } as GenAIResponse);
      await expect(localStorageServiceOriginal.generateIdeaBoilerplate('Bad AI')).rejects.toThrow();
    });

    test('generateIdeaBoilerplate should handle AI error', async () => {
      mockGenerateContentFn.mockRejectedValue(new Error('AI offline'));
      await expect(localStorageServiceOriginal.generateIdeaBoilerplate('AI Down')).rejects.toThrow(
        'AI offline'
      );
    });

    test('summarizeIdea should handle AI error', async () => {
      mockGenerateContentFn.mockRejectedValue(new Error('AI unavailable'));
      await expect(
        localStorageServiceOriginal.summarizeIdea({
          title: '',
          problemSolved: '',
          coreSolution: '',
          keyFeatures: '',
          targetAudience: '',
          inspirationNotes: '',
        })
      ).rejects.toThrow('AI unavailable');
    });
  });

  describe('Backup and Restore', () => {
    test('should export all projects as a JSON string', () => {
      localStorageServiceOriginal.createProject('Project 1');
      localStorageServiceOriginal.createProject('Project 2');
      const jsonString = localStorageServiceOriginal.getAllProjectsAsJson();
      const parsed = JSON.parse(jsonString);
      expect(parsed).toBeInstanceOf(Array);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].name).toBe('Project 2'); // newest first
    });

    test('should import projects from a JSON string', () => {
      const project1: Project = {
        id: 'p1',
        name: 'Import 1',
        ideas: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      const project2: Project = {
        id: 'p2',
        name: 'Import 2',
        ideas: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      const jsonString = JSON.stringify([project1, project2]);

      const result = localStorageServiceOriginal.importProjectsFromJson(jsonString);
      expect(result.success).toBe(true);
      expect(result.projectsImported).toBe(2);

      const projects = localStorageServiceOriginal.getProjects();
      expect(projects).toHaveLength(2);
      expect(projects.find((p) => p.id === 'p1')).toBeDefined();
    });

    test('should handle invalid JSON during import', () => {
      const invalidJson = '{ not json }';
      const result = localStorageServiceOriginal.importProjectsFromJson(invalidJson);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Import failed:');
    });

    test('should handle importing projects with duplicate IDs', () => {
      const project: Project = {
        id: 'dup',
        name: 'Dup',
        ideas: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      const jsonString = JSON.stringify([project, { ...project, name: 'Dup2' }]);
      const result = localStorageServiceOriginal.importProjectsFromJson(jsonString);
      expect(result.success).toBe(true);
      expect(result.projectsImported).toBe(2);
      const projects = localStorageServiceOriginal.getProjects();
      expect(projects.filter((p) => p.id === 'dup')).toHaveLength(2);
    });

    test('should handle import with missing/extra fields', () => {
      const badJson = JSON.stringify([{ id: 'x', name: 'X' }]);
      const result = localStorageServiceOriginal.importProjectsFromJson(badJson);
      expect(result.success).toBe(true);
      expect(result.projectsImported).toBe(1);
    });
  });

  describe('localStorageService', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('sets and gets an item', () => {
      localStorageServiceOriginal.setItem('foo', { bar: 1 });
      expect(localStorageServiceOriginal.getItem<{ bar: number }>('foo')).toEqual({ bar: 1 });
    });

    it('removes an item', () => {
      localStorageServiceOriginal.setItem('foo', { bar: 1 });
      localStorageServiceOriginal.removeItem('foo');
      expect(localStorageServiceOriginal.getItem('foo')).toBeNull();
    });
  });
});
