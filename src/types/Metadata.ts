// TODO: manual fix required – Metadata.ts is empty. Add type definitions for metadata.
// types/Metadata.ts
import { z } from 'zod';

// Zod schema for metadata.json
export const AppMetadataSchema = z.object({
  name: z.string().min(1, { message: "Metadata 'name' cannot be empty." }),
  description: z.string().min(1, { message: "Metadata 'description' cannot be empty." }),
  requestFramePermissions: z.array(z.string()).optional(), // Assuming it's an array of strings like "camera", "microphone"
  prompt: z.string().optional(), // Assuming prompt is a string, can be empty
});

// TypeScript interface derived from the Zod schema
export type AppMetadata = z.infer<typeof AppMetadataSchema>;

export interface Metadata {
  name: string;
  description: string;
  requestFramePermissions?: string[];
  prompt?: string;
}
