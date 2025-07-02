// services/metadataService.ts
import { AppMetadata, AppMetadataSchema } from '../types/Metadata';

export const getValidatedMetadata = async (): Promise<AppMetadata> => {
  try {
    const response = await fetch('/metadata.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata.json: ${response.status} ${response.statusText}`);
    }
    const jsonData = await response.json();

    // Validate with Zod
    const validationResult = AppMetadataSchema.safeParse(jsonData);

    if (!validationResult.success) {
      console.error("Metadata validation failed:", validationResult.error.format());
      const errorMessages = validationResult.error.errors.map(err => `${err.path.join('.') || 'metadata'}: ${err.message}`).join('; ');
      throw new Error(`Invalid metadata.json structure: ${errorMessages}`);
    }

    return validationResult.data;
  } catch (error) {
    console.error("Error loading or validating metadata.json:", error);
    if (error instanceof Error) {
        throw error; // Re-throw the original error or a more specific one
    }
    throw new Error("An unknown error occurred while processing metadata.json.");
  }
};