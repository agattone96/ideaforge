

import { z } from 'zod';

// Zod Schemas for Validation and Type Derivation
export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['image', 'text', 'other']),
  mimeType: z.string(),
  content: z.string(),
  size: z.number(),
});
export type Attachment = z.infer<typeof AttachmentSchema>;

export const IdeaSchema = z.object({
  id: z.string(),
  title: z.string(),
  problemSolved: z.string(),
  coreSolution: z.string(),
  keyFeatures: z.string(),
  targetAudience: z.string(),
  inspirationNotes: z.string(),
  attachments: z.array(AttachmentSchema),
  logo: z.string().optional(),
  createdAt: z.string(), // Using string for simplicity, as datetime can be strict
  updatedAt: z.string(),
});
export type Idea = z.infer<typeof IdeaSchema>;


export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  ideas: z.array(IdeaSchema),
  attachments: z.array(AttachmentSchema),
  logo: z.string().optional(),
  createdAt: z.string(),
  isFavorite: z.boolean().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsArraySchema = z.array(ProjectSchema);


export type AppView = 'landing' | 'projectManager' | 'ideaList' | 'ideaEditor';

export interface NotificationType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

// For sample project data structure (optional, can be inline)
// These now correctly use the Zod-inferred types
export interface SampleIdea extends Omit<Idea, 'id' | 'createdAt' | 'updatedAt' | 'attachments' | 'logo'> {
  attachments?: Omit<Attachment, 'id'>[];
  logo?: string; // Optional: Base64 string for sample blueprint logo
}
export interface SampleProject extends Omit<Project, 'id' | 'createdAt' | 'ideas' | 'isFavorite' | 'attachments' | 'logo'> {
  ideas: SampleIdea[];
  attachments?: Omit<Attachment, 'id'>[]; // Sample project can also have attachments
  logo?: string;
}
