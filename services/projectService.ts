
// services/projectService.ts
import { Project, Idea, SampleProject, Attachment, ProjectsArraySchema } from '../types';
import * as aiService from './aiService';

const PROJECTS_KEY = 'IDEA_FORGE_LOCAL_PROJECTS';

// --- Base64 Placeholder Assets ---
const placeholderProjectLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGRkJGMDAiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiMxQTFBMUEiPlA8L3RleHQ+Cjwvc3ZnPg==';
const placeholderBlueprintLogo1 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyOCIgZmlsbD0iIzRBOThFMkIiLz4KPC9zdmc+';
const placeholderBlueprintLogo2 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8cG9seWdvbiBwb2ludHM9IjMyLDQgNjAsNjAgNCw2MCIgZmlsbD0iIzUwRTNDMiIvPgo8L3N2Zz4=';

const tinyPdfBase64 = 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMiAwIFIKL01lZGlhQm94IFswIDAgMyAzXQo+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbgogMDAwMDAwMDE3MyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDQKUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMjEzCiUlRU9G';
const tinyTxtBase64 = 'data:text/plain;base64,VGhpcyBpcyBhIHNhbXBsZSB0ZXh0IGZpbGUu'; // "This is a sample text file."
const tinyPngBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // 1x1 transparent PNG
const tinySvgBase64 = placeholderBlueprintLogo1; // Reuse one of the SVG logos
const tinyMdBase64 = 'data:text/markdown;base64,IyBTYW1wbGUgTWFya2Rvd24KRm9yIGRlbW9uc3RyYXRpb24gcHVycG9zZXMu'; // "# Sample Markdown\nFor demonstration purposes."
const tinyJsonBase64 = 'data:application/json;base64,eyJrZXkiOiAidmFsdWUiLCAibnVtYmVyIjogNDJ9'; // {"key": "value", "number": 42}
const tinyJpgBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AAf/Z'; // 1x1 black JPG

// --- Sample Project ---
const sampleProjectData: SampleProject = {
  name: "My First Demo Project ✨",
  logo: placeholderProjectLogo,
  attachments: [
    { name: 'Brand_Guidelines.pdf', type: 'other', mimeType: 'application/pdf', content: tinyPdfBase64, size: 2345 },
    { name: 'Market_Research.txt', type: 'text', mimeType: 'text/plain', content: tinyTxtBase64, size: 123 },
    { name: 'Competitor_Analysis.png', type: 'image', mimeType: 'image/png', content: tinyPngBase64, size: 67 },
  ],
  ideas: [
    {
      title: "Eco-Friendly Commute App",
      problemSolved: "High carbon emissions from daily commutes and traffic congestion in cities.",
      coreSolution: "A mobile app that gamifies and rewards users for choosing sustainable transport options like cycling, walking, or public transport. Integrates with city transit data and bike-sharing services.",
      keyFeatures: "- Route planning for eco-friendly options\\n- CO2 saved tracker and leaderboard\\n- Rewards system (discounts, badges)\\n- Community challenges",
      targetAudience: "Environmentally conscious urban dwellers, students, and corporate employees participating in green initiatives.",
      inspirationNotes: "Inspired by fitness tracking apps and the need for actionable climate solutions. Could partner with local businesses for rewards.",
      logo: placeholderBlueprintLogo1,
      attachments: [
        { name: 'User_Flow_Diagram.svg', type: 'image', mimeType: 'image/svg+xml', content: tinySvgBase64, size: 800 },
        { name: 'Feature_Spec.md', type: 'text', mimeType: 'text/markdown', content: tinyMdBase64, size: 450 },
      ],
    },
    {
      title: "AI-Powered Recipe Generator",
      problemSolved: "Users often have ingredients at home but lack inspiration or time to find suitable recipes, leading to food waste.",
      coreSolution: "An app where users can input available ingredients, dietary restrictions, and preferred cuisine styles. The AI then generates unique recipes, cooking instructions, and nutritional information.",
      keyFeatures: "- Ingredient-based recipe generation\\n- Customizable dietary filters (vegan, gluten-free, etc.)\\n- AI learning for personalized suggestions\\n- Pantry inventory tracking (optional)",
      targetAudience: "Home cooks, busy individuals, people looking to reduce food waste, and those with specific dietary needs.",
      inspirationNotes: "Leverage large language models for creative recipe generation. Focus on a simple, intuitive UI.",
      logo: placeholderBlueprintLogo2,
      attachments: [
        { name: 'API_Documentation.json', type: 'text', mimeType: 'application/json', content: tinyJsonBase64, size: 150 },
        { name: 'Moodboard_Inspiration.jpg', type: 'image', mimeType: 'image/jpeg', content: tinyJpgBase64, size: 90 },
      ],
    }
  ],
};


const importStaticSampleProject = (): Project | null => {
  const projects = getProjects();
  if (projects.find(p => p.name === sampleProjectData.name)) {
    return projects.find(p => p.name === sampleProjectData.name) || null;
  }

  const now = new Date().toISOString();
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: sampleProjectData.name,
    isFavorite: true,
    createdAt: now,
    ideas: sampleProjectData.ideas.map(ideaData => ({
      id: crypto.randomUUID(),
      title: ideaData.title,
      problemSolved: ideaData.problemSolved,
      coreSolution: ideaData.coreSolution,
      keyFeatures: ideaData.keyFeatures,
      targetAudience: ideaData.targetAudience,
      inspirationNotes: ideaData.inspirationNotes,
      attachments: (ideaData.attachments || []).map(att => ({ ...att, id: crypto.randomUUID() })),
      logo: ideaData.logo || undefined,
      createdAt: now,
      updatedAt: now,
    })),
    attachments: (sampleProjectData.attachments || []).map(att => ({ ...att, id: crypto.randomUUID() })),
    logo: sampleProjectData.logo || undefined,
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

export const importSampleProject = async (): Promise<Project | null> => {
  // Try AI generation first
  const aiProjectData = await aiService.generateDemoProjectWithAI();
  if (aiProjectData) {
    const projects = getProjects();
    if (projects.find(p => p.name === aiProjectData.name)) {
        return projects.find(p => p.name === aiProjectData.name)!;
    }

    const now = new Date().toISOString();
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: aiProjectData.name,
      isFavorite: true,
      createdAt: now,
      ideas: aiProjectData.ideas.map(ideaData => ({
        id: crypto.randomUUID(),
        title: ideaData.title,
        problemSolved: ideaData.problemSolved,
        coreSolution: ideaData.coreSolution,
        keyFeatures: ideaData.keyFeatures,
        targetAudience: ideaData.targetAudience,
        inspirationNotes: ideaData.inspirationNotes,
        attachments: [],
        logo: undefined,
        createdAt: now,
        updatedAt: now,
      })),
      attachments: [],
      logo: undefined,
    };
    projects.unshift(newProject);
    saveProjects(projects);
    return newProject;
  }

  // Fallback to static project if AI fails
  console.warn("AI demo generation failed or is disabled. Falling back to static demo project.");
  return importStaticSampleProject();
};

// --- Project CRUD ---
export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  const projectsJson = localStorage.getItem(PROJECTS_KEY);
  if (!projectsJson) return [];

  try {
    // Use Zod's safeParse to validate data structure and prevent runtime errors from corrupted data
    const result = ProjectsArraySchema.safeParse(JSON.parse(projectsJson));
    if (!result.success) {
      console.error("Project data in localStorage is invalid, clearing it:", result.error.format());
      localStorage.removeItem(PROJECTS_KEY);
      return [];
    }
    
    const projects: Project[] = result.data;
    projects.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return projects;
  } catch (error) {
    console.error("Error parsing projects JSON from localStorage, clearing it:", error);
    // This catches JSON.parse errors specifically
    localStorage.removeItem(PROJECTS_KEY);
    return [];
  }
};

export const saveProjects = (projects: Project[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }
};

export const deleteAllProjects = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(PROJECTS_KEY);
    }
}

export const createProject = (projectName: string): Project => {
  const projects = getProjects();
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: projectName,
    ideas: [],
    attachments: [], 
    logo: undefined, 
    createdAt: new Date().toISOString(),
    isFavorite: false,
  };
  projects.unshift(newProject); 
  saveProjects(projects);
  return newProject;
};

export const getProjectById = (projectId: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.id === projectId);
};

export const updateProject = (updatedProject: Project): void => {
  let projects = getProjects();
  projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
  saveProjects(projects);
};

export const deleteProject = (projectId: string): void => {
  let projects = getProjects();
  projects = projects.filter(p => p.id !== projectId);
  saveProjects(projects);
};

export const toggleFavoriteProject = (projectId: string): Project | undefined => {
  const projects = getProjects();
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex > -1) {
    projects[projectIndex].isFavorite = !projects[projectIndex].isFavorite;
    saveProjects(projects);
    return projects[projectIndex];
  }
  return undefined;
};

// --- Idea CRUD (within Project) ---
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
    project.ideas = project.ideas.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea); 
    updateProject(project);
  }
};

export const deleteIdeaFromProject = (projectId: string, ideaId: string): void => {
  const project = getProjectById(projectId);
  if (project) {
    project.ideas = project.ideas.filter(idea => idea.id !== ideaId);
    updateProject(project);
  }
};

// --- Attachment CRUD (Project Level) ---
export const addAttachmentsToProject = (projectId: string, attachments: Attachment[]): Project | undefined => {
  const project = getProjectById(projectId);
  if (project) {
    project.attachments = [...(project.attachments || []), ...attachments];
    updateProject(project);
    return project;
  }
  return undefined;
};

export const deleteAttachmentFromProject = (projectId: string, attachmentId: string): Project | undefined => {
  const project = getProjectById(projectId);
  if (project) {
    project.attachments = (project.attachments || []).filter(att => att.id !== attachmentId);
    updateProject(project);
    return project;
  }
  return undefined;
};

// --- Backup & Restore ---
export const getAllProjectsAsJson = (): string => {
  const projects = getProjects();
  return JSON.stringify(projects, null, 2); // Pretty print for readability
};

export const validateProjectsJson = (jsonString: string): { success: boolean, data?: Project[], error?: string } => {
  try {
    const jsonData = JSON.parse(jsonString);
    const validationResult = ProjectsArraySchema.safeParse(jsonData);
    if (validationResult.success) {
      return { success: true, data: validationResult.data };
    } else {
      const errorMessage = validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
      return { success: false, error: `JSON structure is invalid. ${errorMessage}` };
    }
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, error: `Failed to parse JSON: ${e.message}` };
    }
    return { success: false, error: 'An unknown parsing error occurred.' };
  }
};

export const importProjectsFromJson = (jsonString: string): { success: boolean, message: string, projectsImported?: number } => {
  try {
    const validation = validateProjectsJson(jsonString);
    if (!validation.success || !validation.data) {
        throw new Error(validation.error || "Imported data is not a valid project array.");
    }
    const importedProjects: Project[] = validation.data;
    
    const currentProjects = getProjects();
    const projectMap = new Map(currentProjects.map(p => [p.id, p]));
    let importedCount = 0;
    
    importedProjects.forEach(p => {
        projectMap.set(p.id, p);
        importedCount++;
    });

    const newProjects: Project[] = Array.from(projectMap.values());
    saveProjects(newProjects);
    return { success: true, message: `${importedCount} projects successfully imported/updated.`, projectsImported: importedCount };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Import failed:", errorMessage);
    return { success: false, message: `Import failed: ${errorMessage}` };
  }
};

export const addGeneratedSummaryToProject = async (project: Project): Promise<void> => {
  const summaryIdeaData = await aiService.generateProjectSummaryIdea(project.name, project.attachments);
  if (summaryIdeaData) {
    const now = new Date().toISOString();
    const summaryIdea: Idea = {
      ...summaryIdeaData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    addIdeaToProject(project.id, summaryIdea);
    console.info(`Successfully generated and added AI project summary to "${project.name}"`);
  }
};
