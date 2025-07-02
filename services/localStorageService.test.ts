
import * as projectService from './projectService'; // Adjust path
import { Project, Idea } from '../types'; // Adjust path
import { describe, test, expect, beforeEach, jest } from '@jest/globals';

// We mock the aiService dependency within projectService
jest.mock('./aiService', () => ({
  generateDemoProjectWithAI: jest.fn().mockImplementation(() => Promise.resolve(null)), // Default to AI failing to force fallback
}));


describe('projectService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Project CRUD', () => {
    test('should create a new project', () => {
      const projectName = 'Test Project';
      const project = projectService.createProject(projectName);
      expect(project.name).toBe(projectName);
      expect(project.ideas).toEqual([]);
      expect(project.attachments).toEqual([]);
      const projects = projectService.getProjects();
      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe(projectName);
    });

    test('should get all projects, sorted by favorite and then creation date', () => {
      projectService.createProject('Project B');
      const projectA = projectService.createProject('Project A'); // Created later, but will be favorited
      projectService.createProject('Project C');
      
      projectService.toggleFavoriteProject(projectA.id);
      
      const projects = projectService.getProjects();
      expect(projects).toHaveLength(3);
      expect(projects[0].name).toBe('Project A'); // Favorited should be first
      expect(projects[1].name).toBe('Project C'); // Then newest non-favorite
      expect(projects[2].name).toBe('Project B'); // Then older non-favorite
    });

    test('should get project by ID', () => {
      const project = projectService.createProject('Find Me');
      const foundProject = projectService.getProjectById(project.id);
      expect(foundProject).toEqual(project);
      const notFoundProject = projectService.getProjectById('non-existent-id');
      expect(notFoundProject).toBeUndefined();
    });

    test('should update a project', () => {
      const project = projectService.createProject('Initial Name');
      const updatedProjectData: Project = { ...project, name: 'Updated Name', isFavorite: true, attachments: [] };
      projectService.updateProject(updatedProjectData);
      const retrievedProject = projectService.getProjectById(project.id);
      expect(retrievedProject?.name).toBe('Updated Name');
      expect(retrievedProject?.isFavorite).toBe(true);
    });

    test('should delete a project', () => {
      const project = projectService.createProject('To Delete');
      projectService.deleteProject(project.id);
      const projects = projectService.getProjects();
      expect(projects.find(p => p.id === project.id)).toBeUndefined();
    });
    
    test('should delete all projects', () => {
      projectService.createProject('Project 1');
      projectService.createProject('Project 2');
      let projects = projectService.getProjects();
      expect(projects).toHaveLength(2);
      
      projectService.deleteAllProjects();
      projects = projectService.getProjects();
      expect(projects).toHaveLength(0);
    });

    test('should toggle favorite status of a project', () => {
      const project = projectService.createProject('Favorite Test');
      expect(project.isFavorite).toBe(false);
      projectService.toggleFavoriteProject(project.id);
      let updatedProject = projectService.getProjectById(project.id);
      expect(updatedProject?.isFavorite).toBe(true);
      projectService.toggleFavoriteProject(project.id);
      updatedProject = projectService.getProjectById(project.id);
      expect(updatedProject?.isFavorite).toBe(false);
    });
  });

  describe('Idea CRUD', () => {
    let projectId: string;
    beforeEach(() => {
      const project = projectService.createProject('Project With Ideas');
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
      projectService.addIdeaToProject(projectId, newIdea);
      const project = projectService.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(1);
      expect(project?.ideas[0].title).toBe('New Test Idea');
    });

    test('should update an idea in a project', () => {
      const ideaToUpdate = createFullIdea({ title: 'Initial Idea Title' });
      projectService.addIdeaToProject(projectId, ideaToUpdate);
      const updatedIdea: Idea = { ...ideaToUpdate, title: 'Updated Idea Title' };
      projectService.updateIdeaInProject(projectId, updatedIdea);
      const project = projectService.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(1);
      expect(project?.ideas[0].title).toBe('Updated Idea Title');
    });

    test('should delete an idea from a project', () => {
      const ideaToDelete = createFullIdea({ title: 'Idea To Delete' });
      projectService.addIdeaToProject(projectId, ideaToDelete);
      let project = projectService.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(1);

      projectService.deleteIdeaFromProject(projectId, ideaToDelete.id);
      project = projectService.getProjectById(projectId);
      expect(project?.ideas).toHaveLength(0);
    });
  });
  
  describe('Backup and Restore', () => {
    test('should export all projects as a JSON string', () => {
        projectService.createProject('Project 1');
        projectService.createProject('Project 2');
        const jsonString = projectService.getAllProjectsAsJson();
        const parsed = JSON.parse(jsonString);
        expect(parsed).toBeInstanceOf(Array);
        expect(parsed).toHaveLength(2);
        expect(parsed[0].name).toBe('Project 2'); // newest first
    });

    test('should import projects from a JSON string', () => {
        const project1: Project = { id: 'p1', name: 'Import 1', ideas: [], attachments: [], createdAt: new Date().toISOString(), isFavorite: false };
        const project2: Project = { id: 'p2', name: 'Import 2', ideas: [], attachments: [], createdAt: new Date().toISOString(), isFavorite: false };
        const jsonString = JSON.stringify([project1, project2]);

        const result = projectService.importProjectsFromJson(jsonString);
        expect(result.success).toBe(true);
        expect(result.projectsImported).toBe(2);

        const projects = projectService.getProjects();
        expect(projects).toHaveLength(2);
        expect(projects.find(p => p.id === 'p1')).toBeDefined();
    });

    test('should handle invalid JSON during import', () => {
        const invalidJson = '{ not json }';
        const result = projectService.importProjectsFromJson(invalidJson);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Import failed:');
    });
  });
});