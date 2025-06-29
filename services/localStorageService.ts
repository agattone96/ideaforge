import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { Project, Idea, SampleProject, Attachment } from '../types';

// Initialize Gemini AI Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn('API_KEY environment variable not found. Gemini features will be disabled.');
  }
} catch (error) {
  console.error('Failed to initialize GoogleGenAI:', error);
  ai = null;
}

export const isAiEnabled = (): boolean => !!ai;

// --- Retry Logic Utility ---
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 500;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetries<T>(
  asyncFn: () => Promise<T>,
  operationName: string = 'Operation'
): Promise<T> {
  let attempts = 0;
  let currentDelay = INITIAL_DELAY_MS;

  while (attempts < MAX_RETRIES) {
    try {
      return await asyncFn();
    } catch (error) {
      attempts++;
      console.warn(
        `[${operationName}] Attempt ${attempts} failed: ${error instanceof Error ? error.message : String(error)}`
      );
      if (attempts >= MAX_RETRIES) {
        console.error(
          `[${operationName}] All ${MAX_RETRIES} attempts failed. Last error: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error; // Re-throw the last error after all retries
      }
      await delay(currentDelay);
      currentDelay *= 2; // Exponential backoff
    }
  }
  // This line should technically be unreachable if MAX_RETRIES > 0
  throw new Error(
    `[${operationName}] Failed after ${MAX_RETRIES} attempts. This should not happen.`
  );
}

// --- AI Feature Functions (NEW IMPLEMENTATION) ---

export const testAiConnection = async (): Promise<{
  success: boolean;
  data?: string;
  message?: string;
}> => {
  if (!ai) return { success: false, message: 'AI client not initialized or API key missing.' };

  try {
    const operation = async (): Promise<GenerateContentResponse> =>
      // Non-null assertion is safe here due to the check above.
      await ai!.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: "Say 'Hello' in a friendly tone.",
      });
    const response = await withRetries(operation, 'TestAIConnection');
    return { success: true, data: response.text };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('AI Connection Test Failed:', errorMessage);
    return { success: false, message: errorMessage };
  }
};

export interface IdeaBoilerplate {
  problemSolved: string;
  coreSolution: string;
  keyFeatures: string;
  targetAudience: string;
}

export const generateIdeaBoilerplate = async (ideaTitle: string): Promise<IdeaBoilerplate> => {
  if (!ai) throw new Error('AI client not initialized.');

  const prompt = `Based on the app/product idea title "${ideaTitle}", generate a structured JSON object containing concise boilerplate content. The JSON object must have the following keys with string values: "problemSolved", "coreSolution", "keyFeatures", "targetAudience".

- "problemSolved": A brief, one-sentence description of the problem this idea addresses.
- "coreSolution": A one-to-two sentence summary of the core concept or solution.
- "keyFeatures": A newline-separated list of 3-4 key features. Start each feature with a hyphen.
- "targetAudience": A short description of the primary target audience.

Respond with ONLY the JSON object.`;

  const operation = async (): Promise<GenerateContentResponse> =>
    await ai!.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

  const response = await withRetries(operation, 'GenerateBoilerplate');

  let jsonStr = (response.text ?? '').trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }

  try {
    const parsedData = JSON.parse(jsonStr);
    // Basic validation to ensure the parsed object has the expected structure
    if (
      typeof parsedData.problemSolved === 'string' &&
      typeof parsedData.coreSolution === 'string' &&
      typeof parsedData.keyFeatures === 'string' &&
      typeof parsedData.targetAudience === 'string'
    ) {
      return parsedData;
    }
    throw new Error('Parsed JSON from AI response is missing required fields.');
  } catch (e) {
    console.error('Failed to parse boilerplate JSON from AI:', e);
    throw new Error(`AI returned malformed data for boilerplate. Raw text: ${response.text ?? ''}`);
  }
};

export const summarizeIdea = async (
  idea: Omit<Idea, 'id' | 'attachments' | 'createdAt' | 'updatedAt' | 'logo'>
): Promise<string> => {
  if (!ai) throw new Error('AI client not initialized.');
  const contentToSummarize = `Title: ${idea.title}\nProblem: ${idea.problemSolved}\nSolution: ${idea.coreSolution}\nFeatures: ${idea.keyFeatures}\nAudience: ${idea.targetAudience}\nNotes: ${idea.inspirationNotes}`;
  const prompt = `Summarize the following idea/notes into a concise, well-structured paragraph. Focus on the core concept and its value. Raw text:\n\n${contentToSummarize}`;

  const operation = async (): Promise<GenerateContentResponse> =>
    await ai!.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });

  const response = await withRetries(operation, 'SummarizeIdea');
  return response.text ?? '';
};

const PROJECTS_KEY = 'IDEA_FORGE_LOCAL_PROJECTS';
const FIRST_VISIT_KEY = 'IDEA_FORGE_LOCAL_FIRST_VISIT_DONE';
const SHOW_WELCOME_ON_NEXT_LAUNCH_KEY = 'IDEA_FORGE_SHOW_WELCOME_ON_NEXT_LAUNCH';

// New Appearance & Accessibility Keys
const ACCENT_COLOR_KEY = 'IDEA_FORGE_ACCENT_COLOR';
const FONT_SIZE_MULTIPLIER_KEY = 'IDEA_FORGE_FONT_SIZE_MULTIPLIER';
const HIGH_CONTRAST_MODE_KEY = 'IDEA_FORGE_HIGH_CONTRAST_MODE';
const REDUCED_MOTION_KEY = 'IDEA_FORGE_REDUCED_MOTION';
const LIST_DENSITY_KEY = 'IDEA_FORGE_LIST_DENSITY';

// --- First Visit & Welcome Modal Preference ---
export const isFirstVisit = (): boolean => localStorage.getItem(FIRST_VISIT_KEY) === null;

export const setFirstVisitDone = (): void => {
  localStorage.setItem(FIRST_VISIT_KEY, 'true');
};

export const getShowWelcomeOnNextLaunchPreference = (): boolean =>
  localStorage.getItem(SHOW_WELCOME_ON_NEXT_LAUNCH_KEY) === 'true';

export const setShowWelcomeOnNextLaunchPreference = (show: boolean): void => {
  localStorage.setItem(SHOW_WELCOME_ON_NEXT_LAUNCH_KEY, String(show));
};

// Helper to convert hex to RGB components string, e.g., "255, 191, 0"
function getRGBComponents(hexColor: string): string {
  let color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
  if (color.length === 3) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('');
  }
  if (color.length !== 6) {
    console.warn(`Invalid hex color for RGB conversion: ${hexColor}. Falling back to black.`);
    return '0, 0, 0';
  }
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// --- Appearance & Accessibility Preferences ---
export const getAccentColor = (): string => localStorage.getItem(ACCENT_COLOR_KEY) || '#FFBF00'; // Default Amber
export const setAccentColor = (color: string): void => {
  localStorage.setItem(ACCENT_COLOR_KEY, color);
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    document.documentElement.style.setProperty('--color-accent-primary', color);
    document.documentElement.style.setProperty('--rgb-accent-primary', getRGBComponents(color));
  }
};

export const getFontSizeMultiplier = (): number => {
  const stored = localStorage.getItem(FONT_SIZE_MULTIPLIER_KEY);
  return stored ? parseFloat(stored) : 1; // Default 1 (100%)
};
export const setFontSizeMultiplier = (multiplier: number): void => {
  localStorage.setItem(FONT_SIZE_MULTIPLIER_KEY, String(multiplier));
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    document.documentElement.style.setProperty('--base-font-size-multiplier', String(multiplier));
  }
};

export const getHighContrastMode = (): boolean =>
  localStorage.getItem(HIGH_CONTRAST_MODE_KEY) === 'true';
export const setHighContrastMode = (enabled: boolean): void => {
  localStorage.setItem(HIGH_CONTRAST_MODE_KEY, String(enabled));
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    if (enabled) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
    }
  }
};

export const getReducedMotion = (): boolean => localStorage.getItem(REDUCED_MOTION_KEY) === 'true';
export const setReducedMotion = (enabled: boolean): void => {
  localStorage.setItem(REDUCED_MOTION_KEY, String(enabled));
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    if (enabled) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }
  }
};

export const getListDensity = (): 'compact' | 'spacious' =>
  (localStorage.getItem(LIST_DENSITY_KEY) as 'compact' | 'spacious') || 'spacious';
export const setListDensity = (density: 'compact' | 'spacious'): void => {
  localStorage.setItem(LIST_DENSITY_KEY, density);
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    document.documentElement.setAttribute('data-list-density', density);
  }
};

export const applyStoredAppearanceSettings = (): void => {
  // Theme is handled by useTheme hook, so we don't apply it here.
  // We apply settings that directly manipulate the DOM outside of React's main state flow initially.
  setAccentColor(getAccentColor());
  setFontSizeMultiplier(getFontSizeMultiplier());
  setHighContrastMode(getHighContrastMode());
  setReducedMotion(getReducedMotion());
  setListDensity(getListDensity());
};

// --- Base64 Placeholder Assets ---
const placeholderProjectLogo =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGRkJGMDAiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiMxQTFBMUEiPlA8L3RleHQ+Cjwvc3ZnPg==';
const placeholderBlueprintLogo1 =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyOCIgZmlsbD0iIzRBOThFMkIiLz4KPC9zdmc+';
const placeholderBlueprintLogo2 =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8cG9seWdvbiBwb2ludHM9IjMyLDQgNjAsNjAgNCw2MCIgZmlsbD0iIzUwRTNDMiIvPgo8L3N2Zz4=';

const tinyPdfBase64 =
  'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMiAwIFIKL01lZGlhQm94IFswIDAgMyAzXQo+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbgogMDAwMDAwMDE3MyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDQKUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMjEzCiUlRU9G';
const tinyTxtBase64 = 'data:text/plain;base64,VGhpcyBpcyBhIHNhbXBsZSB0ZXh0IGZpbGUu'; // "This is a sample text file."
const tinyPngBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // 1x1 transparent PNG
const tinySvgBase64 = placeholderBlueprintLogo1; // Reuse one of the SVG logos
const tinyMdBase64 =
  'data:text/markdown;base64,IyBTYW1wbGUgTWFya2Rvd24KRm9yIGRlbW9uc3RyYXRpb24gcHVycG9zZXMu'; // "# Sample Markdown\nFor demonstration purposes."
const tinyJsonBase64 = 'data:application/json;base64,eyJrZXkiOiAidmFsdWUiLCAibnVtYmVyIjogNDJ9'; // {"key": "value", "number": 42}
const tinyJpgBase64 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AAf/Z'; // 1x1 black JPG

// --- Sample Project ---
const sampleProjectData: SampleProject = {
  name: 'My First Demo Project ✨',
  logo: placeholderProjectLogo,
  attachments: [
    {
      name: 'Brand_Guidelines.pdf',
      type: 'other',
      mimeType: 'application/pdf',
      content: tinyPdfBase64,
      size: 2345,
    },
    {
      name: 'Market_Research.txt',
      type: 'text',
      mimeType: 'text/plain',
      content: tinyTxtBase64,
      size: 123,
    },
    {
      name: 'Competitor_Analysis.png',
      type: 'image',
      mimeType: 'image/png',
      content: tinyPngBase64,
      size: 67,
    },
  ],
  ideas: [
    {
      title: 'Eco-Friendly Commute App',
      problemSolved: 'High carbon emissions from daily commutes and traffic congestion in cities.',
      coreSolution:
        'A mobile app that gamifies and rewards users for choosing sustainable transport options like cycling, walking, or public transport. Integrates with city transit data and bike-sharing services.',
      keyFeatures:
        '- Route planning for eco-friendly options\\n- CO2 saved tracker and leaderboard\\n- Rewards system (discounts, badges)\\n- Community challenges',
      targetAudience:
        'Environmentally conscious urban dwellers, students, and corporate employees participating in green initiatives.',
      inspirationNotes:
        'Inspired by fitness tracking apps and the need for actionable climate solutions. Could partner with local businesses for rewards.',
      logo: placeholderBlueprintLogo1,
      attachments: [
        {
          name: 'User_Flow_Diagram.svg',
          type: 'image',
          mimeType: 'image/svg+xml',
          content: tinySvgBase64,
          size: 800,
        },
        {
          name: 'Feature_Spec.md',
          type: 'text',
          mimeType: 'text/markdown',
          content: tinyMdBase64,
          size: 450,
        },
      ],
    },
    {
      title: 'AI-Powered Recipe Generator',
      problemSolved:
        'Users often have ingredients at home but lack inspiration or time to find suitable recipes, leading to food waste.',
      coreSolution:
        'An app where users can input available ingredients, dietary restrictions, and preferred cuisine styles. The AI then generates unique recipes, cooking instructions, and nutritional information.',
      keyFeatures:
        '- Ingredient-based recipe generation\\n- Customizable dietary filters (vegan, gluten-free, etc.)\\n- AI learning for personalized suggestions\\n- Pantry inventory tracking (optional)',
      targetAudience:
        'Home cooks, busy individuals, people looking to reduce food waste, and those with specific dietary needs.',
      inspirationNotes:
        'Leverage large language models for creative recipe generation. Focus on a simple, intuitive UI.',
      logo: placeholderBlueprintLogo2,
      attachments: [
        {
          name: 'API_Documentation.json',
          type: 'text',
          mimeType: 'application/json',
          content: tinyJsonBase64,
          size: 150,
        },
        {
          name: 'Moodboard_Inspiration.jpg',
          type: 'image',
          mimeType: 'image/jpeg',
          content: tinyJpgBase64,
          size: 90,
        },
      ],
    },
  ],
};

export const importSampleProject = (): Project | null => {
  const projects = getProjects();
  if (projects.find((p) => p.name === sampleProjectData.name)) {
    return projects.find((p) => p.name === sampleProjectData.name) || null;
  }

  const now = new Date().toISOString();
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: sampleProjectData.name,
    isFavorite: true,
    createdAt: now,
    ideas: sampleProjectData.ideas.map((ideaData) => ({
      id: crypto.randomUUID(),
      title: ideaData.title,
      problemSolved: ideaData.problemSolved,
      coreSolution: ideaData.coreSolution,
      keyFeatures: ideaData.keyFeatures,
      targetAudience: ideaData.targetAudience,
      inspirationNotes: ideaData.inspirationNotes,
      attachments: (ideaData.attachments || []).map((att) => ({ ...att, id: crypto.randomUUID() })),
      logo: ideaData.logo || undefined,
      createdAt: now,
      updatedAt: now,
    })),
    attachments: (sampleProjectData.attachments || []).map((att) => ({
      ...att,
      id: crypto.randomUUID(),
    })),
    logo: sampleProjectData.logo || undefined,
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

// --- Project CRUD ---
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
  return projects.find((p) => p.id === projectId);
};

export const updateProject = (updatedProject: Project): void => {
  let projects = getProjects();
  projects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
  saveProjects(projects);
};

export const deleteProject = (projectId: string): void => {
  let projects = getProjects();
  projects = projects.filter((p) => p.id !== projectId);
  saveProjects(projects);
};

export const toggleFavoriteProject = (projectId: string): Project | undefined => {
  const projects = getProjects();
  const projectIndex = projects.findIndex((p) => p.id === projectId);
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
    project.ideas = project.ideas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea));
    updateProject(project);
  }
};

export const deleteIdeaFromProject = (projectId: string, ideaId: string): void => {
  const project = getProjectById(projectId);
  if (project) {
    project.ideas = project.ideas.filter((idea) => idea.id !== ideaId);
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
export const getAllProjectsAsJson = (): string => {
  const projects = getProjects();
  return JSON.stringify(projects, null, 2); // Pretty print for readability
};

export const importProjectsFromJson = (
  jsonString: string
): { success: boolean; message: string; projectsImported?: number } => {
  try {
    const importedProjects: Project[] = JSON.parse(jsonString);
    if (!Array.isArray(importedProjects)) {
      throw new Error('Imported data is not an array of projects.');
    }
    const currentProjects = getProjects();
    const projectMap = new Map(currentProjects.map((p) => [p.id, p]));
    let importedCount = 0;
    importedProjects.forEach((p) => {
      if (p.id && p.name) {
        // Basic validation
        projectMap.set(p.id, p);
        importedCount++;
      }
    });
    const newProjects = Array.from(projectMap.values());
    saveProjects(newProjects);
    return {
      success: true,
      message: `${importedCount} projects successfully imported/updated.`,
      projectsImported: importedCount,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Import failed:', errorMessage);
    return { success: false, message: `Import failed: ${errorMessage}` };
  }
};
