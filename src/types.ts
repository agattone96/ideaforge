

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'text' | 'other'; // 'other' for files from zip we don't preview
  mimeType: string; // e.g., image/png, text/plain
  content: string; // Base64 for images, text content for text files
  size: number; // in bytes
}

export interface Idea {
  id: string;
  title: string;
  problemSolved: string;
  coreSolution: string;
  keyFeatures: string;
  targetAudience: string;
  inspirationNotes: string;
  attachments: Attachment[];
  logo?: string; // Optional: Base64 string for blueprint logo
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Project {
  id: string;
  name: string;
  ideas: Idea[];
  attachments: Attachment[]; // Added for project-level attachments
  logo?: string; // Optional: Base64 string for project logo
  createdAt: string; // ISO date string
  isFavorite?: boolean; // Added for starring projects
}

export type AppView = 'landing' | 'projectManager' | 'ideaList' | 'ideaEditor';

export interface NotificationType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

// For sample project data structure (optional, can be inline)
export interface SampleIdea extends Omit<Idea, 'id' | 'createdAt' | 'updatedAt' | 'attachments' | 'logo'> {
  attachments?: Omit<Attachment, 'id'>[];
  logo?: string; // Optional: Base64 string for sample blueprint logo
}
export interface SampleProject extends Omit<Project, 'id' | 'createdAt' | 'ideas' | 'isFavorite' | 'attachments' | 'logo'> {
  ideas: SampleIdea[];
  attachments?: Omit<Attachment, 'id'>[]; // Sample project can also have attachments
  logo?: string;
}
