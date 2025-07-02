
// services/aiService.ts
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters } from "@google/genai";
import { z } from 'zod';
import { Idea, Attachment } from '../types';

// Initialize Gemini AI Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("API_KEY environment variable not found. Gemini features will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
  ai = null; 
}

export const isAiEnabled = (): boolean => {
  return !!ai;
};

// --- Retry Logic Utility ---
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 500;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function withRetries<T>(asyncFn: () => Promise<T>, operationName: string = "Operation"): Promise<T> {
  let attempts = 0;
  let currentDelay = INITIAL_DELAY_MS;

  while (attempts < MAX_RETRIES) {
    try {
      return await asyncFn();
    } catch (error) {
      attempts++;
      console.warn(`[${operationName}] Attempt ${attempts} failed: ${error instanceof Error ? error.message : String(error)}`);
      if (attempts >= MAX_RETRIES) {
        console.error(`[${operationName}] All ${MAX_RETRIES} attempts failed. Last error: ${error instanceof Error ? error.message : String(error)}`);
        throw error; // Re-throw the last error after all retries
      }
      await delay(currentDelay);
      currentDelay *= 2; // Exponential backoff
    }
  }
  // This line should technically be unreachable if MAX_RETRIES > 0
  throw new Error(`[${operationName}] Failed after ${MAX_RETRIES} attempts. This should not happen.`);
}

// --- AI Feature Functions ---

export const testAiConnection = async (): Promise<{ success: boolean; data?: string; message?: string }> => {
  if (!ai) return { success: false, message: "AI client not initialized or API key missing." };
  
  try {
    const operation = async (): Promise<GenerateContentResponse> => {
      return await ai!.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: "Say 'Hello' in a friendly tone.",
      });
    };
    
    const response = await withRetries(operation, "TestAIConnection");
    return { success: true, data: response.text };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("AI Connection Test Failed:", errorMessage);
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
  if (!ai) throw new Error("AI client not initialized.");

  const prompt = `Based on the app/product idea title "${ideaTitle}", generate a structured JSON object containing concise boilerplate content. The JSON object must have the following keys with string values: "problemSolved", "coreSolution", "keyFeatures", "targetAudience".

- "problemSolved": A brief, one-sentence description of the problem this idea addresses.
- "coreSolution": A one-to-two sentence summary of the core concept or solution.
- "keyFeatures": A newline-separated list of 3-4 key features. Start each feature with a hyphen.
- "targetAudience": A short description of the primary target audience.

Respond with ONLY the JSON object.`;

  const operation = async (): Promise<GenerateContentResponse> => {
    return await ai!.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
  };

  const response = await withRetries(operation, "GenerateBoilerplate");
  
  let jsonStr = response.text.trim();
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
    } else {
      throw new Error("Parsed JSON from AI response is missing required fields.");
    }
  } catch (e) {
    console.error("Failed to parse boilerplate JSON from AI:", e);
    throw new Error(`AI returned malformed data for boilerplate. Raw text: ${response.text}`);
  }
};

export const summarizeIdea = async (idea: Omit<Idea, 'id' | 'attachments' | 'createdAt' | 'updatedAt' | 'logo'>): Promise<string> => {
  if (!ai) throw new Error("AI client not initialized.");
  const contentToSummarize = `Title: ${idea.title}\nProblem: ${idea.problemSolved}\nSolution: ${idea.coreSolution}\nFeatures: ${idea.keyFeatures}\nAudience: ${idea.targetAudience}\nNotes: ${idea.inspirationNotes}`;
  const prompt = `Summarize the following idea/notes into a concise, well-structured paragraph. Focus on the core concept and its value. Raw text:\n\n${contentToSummarize}`;

  const operation = async (): Promise<GenerateContentResponse> => {
    return await ai!.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });
  };

  const response = await withRetries(operation, "SummarizeIdea");
  return response.text;
};

// Zod schema for the AI response
export const AIGeneratedIdeaSchema = z.object({
  title: z.string().min(1),
  problemSolved: z.string(),
  coreSolution: z.string(),
  keyFeatures: z.string(),
  targetAudience: z.string(),
  inspirationNotes: z.string(),
});

export const AIGeneratedProjectSchema = z.object({
  name: z.string().min(1),
  ideas: z.array(AIGeneratedIdeaSchema).min(1),
});

export const generateDemoProjectWithAI = async (): Promise<z.infer<typeof AIGeneratedProjectSchema> | null> => {
  if (!ai) {
    console.warn("AI client not initialized. Cannot generate AI demo.");
    return null;
  }

  const prompt = `Generate a sample project for a creative brainstorming application called "IdeaForge".
The project should be about a fictional, innovative tech product.
Please provide the response as a single, valid JSON object conforming to this structure:
{
  "name": "Project Name",
  "ideas": [
    {
      "title": "Idea Title",
      "problemSolved": "A concise, one-sentence description of the problem this idea addresses.",
      "coreSolution": "A one-to-two sentence summary of the core concept or solution.",
      "keyFeatures": "A newline-separated list of 3-4 key features. Start each feature with a hyphen.",
      "targetAudience": "A short description of the primary target audience.",
      "inspirationNotes": "A brief note about the inspiration behind the idea."
    }
  ]
}

The project must have exactly one "name" and an "ideas" array containing 2 to 3 distinct ideas. Do not include any other fields. Respond with ONLY the JSON object.`;

  try {
    const operation = async (): Promise<GenerateContentResponse> => {
      return await ai!.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });
    };
    
    const response = await withRetries(operation, "GenerateAIDemoProject");
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
  
    const parsedJson = JSON.parse(jsonStr);
    const validationResult = AIGeneratedProjectSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error("AI-generated demo project validation failed:", validationResult.error.format());
      throw new Error("AI returned data in an unexpected format.");
    }

    return validationResult.data;

  } catch (error) {
    console.error("Failed to generate or process AI demo project:", error);
    return null; // Return null to indicate failure, allowing fallback
  }
};

export const generateProjectSummaryIdea = async (projectName: string, attachments: Attachment[]): Promise<Omit<Idea, 'id' | 'createdAt' | 'updatedAt' > | null> => {
  if (!ai) {
    console.warn("AI client not initialized. Skipping project summary generation.");
    return null;
  }
  if (!attachments || attachments.length === 0) {
    console.warn("No attachments found in the project to generate a summary from.");
    return null;
  }

  // Find key files from attachments
  const findFileContent = (fileNameRegex: RegExp): string => {
    const file = attachments.find(att => fileNameRegex.test(att.name));
    if (!file || file.type !== 'text') return '';
    try {
      // Content is a data URL (e.g., "data:text/plain;base64,VGhpcy..."), so we need to decode it.
      const base64Content = file.content.split(',')[1];
      if (!base64Content) return '';
      return atob(base64Content);
    } catch (e) {
      console.error(`Failed to decode content for ${file.name}:`, e);
      return '';
    }
  };

  const packageJsonContent = findFileContent(/package\.json$/);
  const indexTsxContent = findFileContent(/(index|main)\.tsx?$/);
  const appTsxContent = findFileContent(/App\.tsx?$/);
  const readmeContent = findFileContent(/README\.md$/i);

  let contentForAnalysis = `
    Project Name: ${projectName}
    
    --- package.json ---
    ${packageJsonContent.substring(0, 1000)}

    --- index.tsx ---
    ${indexTsxContent.substring(0, 2000)}

    --- App.tsx ---
    ${appTsxContent.substring(0, 2000)}
    
    --- README.md ---
    ${readmeContent.substring(0, 2000)}
  `;

  if (contentForAnalysis.trim().length < 100) {
      console.warn("Not enough content from key files to generate a meaningful summary.");
      return null;
  }

  const prompt = `Analyze the provided code snippets and project files for a web application. Based on this analysis, generate a structured JSON object that provides a concise summary. The JSON object must have the following keys: "title", "problemSolved", "coreSolution", "keyFeatures", and "inspirationNotes".

- "title": A concise, descriptive title for this summary idea, like "AI-Generated Project Overview".
- "problemSolved": A brief, one-sentence description of the likely problem this project addresses.
- "coreSolution": A one-to-two sentence summary of the project's core purpose or functionality.
- "keyFeatures": A newline-separated list of 3-5 key features, technologies, or components observed in the code. Start each with a hyphen.
- "inspirationNotes": A comma-separated list of relevant keywords, tags, or technologies (e.g., "React, TypeScript, UI/UX, Data Visualization").

Respond with ONLY the JSON object.

Analysis content:
${contentForAnalysis}
`;

  try {
    const operation = async (): Promise<GenerateContentResponse> => {
      return await ai!.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });
    };
    
    const response = await withRetries(operation, "GenerateProjectSummary");
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
  
    const parsedData = JSON.parse(jsonStr);

    if (
      typeof parsedData.title !== 'string' ||
      typeof parsedData.problemSolved !== 'string' ||
      typeof parsedData.coreSolution !== 'string' ||
      typeof parsedData.keyFeatures !== 'string' ||
      typeof parsedData.inspirationNotes !== 'string'
    ) {
      throw new Error("Parsed JSON from AI response is missing required fields for project summary.");
    }
    
    const summaryIdea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt' > = {
      title: parsedData.title || "AI-Generated Project Overview",
      problemSolved: parsedData.problemSolved,
      coreSolution: parsedData.coreSolution,
      keyFeatures: parsedData.keyFeatures,
      targetAudience: "Inferred from project code.",
      inspirationNotes: `Keywords: ${parsedData.inspirationNotes}`,
      attachments: [],
    };
    
    return summaryIdea;

  } catch(e) {
    console.error("Failed to generate or process AI project summary:", e);
    // Fail silently in the background, as the main project creation was successful.
    return null;
  }
};