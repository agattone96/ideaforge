import { Project, Idea, SampleProject, Attachment } from '@/types';
import * as aiService from '@/services/aiService';
import * as settingsService from '@/services/settingsService';

// --- AI Feature Functions (Re-exported) ---
export const { isAiEnabled } = aiService;
export const { testAiConnection } = aiService;
export const { generateIdeaBoilerplate } = aiService;
export const { summarizeIdea } = aiService;

// --- Appearance & Accessibility Preferences (Re-exported) ---
export const { isFirstVisit } = settingsService;
export const { setFirstVisitDone } = settingsService;
export const { getShowWelcomeOnNextLaunchPreference } = settingsService;
export const { setShowWelcomeOnNextLaunchPreference } = settingsService;
export const { getAccentColor } = settingsService;
export const { setAccentColor } = settingsService;
export const { getFontSizeMultiplier } = settingsService;
export const { setFontSizeMultiplier } = settingsService;
export const { getHighContrastMode } = settingsService;
export const { setHighContrastMode } = settingsService;
export const { getReducedMotion } = settingsService;
export const { setReducedMotion } = settingsService;
export const { getListDensity } = settingsService;
export const { setListDensity } = settingsService;
export const { applyStoredAppearanceSettings } = settingsService;

// --- Project CRUD & Backup/Restore ---
const PROJECTS_KEY = 'IDEA_FORGE_LOCAL_PROJECTS';

export const getProjects = (): Project[] => {
  const projectsJson = localStorage.getItem(PROJECTS_KEY);
  const projects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
  projects.sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return projects;
};

export const saveProjects = (projects: Project[]): void => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const createProject = (projectName: string): Project => {
  const projects = getProjects();
  const now = new Date().toISOString();
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: projectName,
    ideas: [],
    attachments: [],
    logo: undefined,
    createdAt: now,
    isFavorite: false,
  };
  projects.unshift(newProject);
  saveProjects(projects);
  return newProject;
};

export const getProjectById = (projectId: string): Project | undefined =>
  getProjects().find((p) => p.id === projectId);

export const updateProject = (updatedProject: Project): void => {
  const projects = getProjects().map((p) => (p.id === updatedProject.id ? updatedProject : p));
  saveProjects(projects);
};

export const deleteProject = (projectId: string): void => {
  const projects = getProjects().filter((p) => p.id !== projectId);
  saveProjects(projects);
};

export const toggleFavoriteProject = (projectId: string): Project | undefined => {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === projectId);
  if (idx > -1) {
    projects[idx].isFavorite = !projects[idx].isFavorite;
    saveProjects(projects);
    return projects[idx];
  }
  return undefined;
};

// --- Idea CRUD ---
export const addIdeaToProject = (projectId: string, idea: Idea): void => {
  const project = getProjectById(projectId);
  if (project) {
    project.ideas.push(idea);
    updateProject(project);
  }
};

export const updateIdeaInProject = (projectId: string, updatedIdea: Idea): void => {
  const project = getProjectById(projectId);
  if (project) {
    project.ideas = project.ideas.map((i) => (i.id === updatedIdea.id ? updatedIdea : i));
    updateProject(project);
  }
};

export const deleteIdeaFromProject = (projectId: string, ideaId: string): void => {
  const project = getProjectById(projectId);
  if (project) {
    project.ideas = project.ideas.filter((i) => i.id !== ideaId);
    updateProject(project);
  }
};

// --- Attachment CRUD (Project Level) ---
export const addAttachmentsToProject = (
  projectId: string,
  attachments: Attachment[]
): Project | undefined => {
  const project = getProjectById(projectId);
  if (project) {
    project.attachments = [...(project.attachments || []), ...attachments];
    updateProject(project);
    return project;
  }
  return undefined;
};

export const deleteAttachmentFromProject = (
  projectId: string,
  attachmentId: string
): Project | undefined => {
  const project = getProjectById(projectId);
  if (project) {
    project.attachments = (project.attachments || []).filter((att) => att.id !== attachmentId);
    updateProject(project);
    return project;
  }
  return undefined;
};

// --- Backup & Restore ---
export const getAllProjectsAsJson = (): string => JSON.stringify(getProjects(), null, 2);

export const importProjectsFromJson = (
  jsonString: string
): { success: boolean; message: string; projectsImported?: number } => {
  try {
    const imported: Project[] = JSON.parse(jsonString);
    if (!Array.isArray(imported)) throw new Error('Imported data is not an array of projects.');
    const map = new Map(getProjects().map((p) => [p.id, p]));
    let count = 0;
    imported.forEach((p) => {
      if (p.id && p.name) {
        map.set(p.id, p);
        count++;
      }
    });
    const merged = Array.from(map.values());
    saveProjects(merged);
    return {
      success: true,
      message: `${count} projects successfully imported/updated.`,
      projectsImported: count,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Import failed:', msg);
    return { success: false, message: `Import failed: ${msg}` };
  }
};

// --- Sample Project Import ---
const sampleProjectData: SampleProject = {
  name: 'My First Demo Project ✨',
  logo: getDefaultBlueprintLogo(),
  attachments: [],
  ideas: [],
};

export const importSampleProject = (): Project | null => {
  const existing = getProjects();
  if (existing.find((p) => p.name === sampleProjectData.name)) {
    return existing.find((p) => p.name === sampleProjectData.name) || null;
  }
  const now = new Date().toISOString();
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: sampleProjectData.name,
    isFavorite: true,
    createdAt: now,
    attachments: [],
    logo: sampleProjectData.logo,
    ideas: [],
  };
  saveProjects([...existing, newProject]);
  return newProject;
};

// --- Default Blueprint Logo ---
function getDefaultBlueprintLogo(): string {
  return '/assets/default-blueprint-logo.png';
}

// --- Local Storage Helpers ---
export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
