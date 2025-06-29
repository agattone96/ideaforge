import JSZip from 'jszip';
import { Idea, Project } from '../types';

// Helper to convert Base64 to Blob
export const base64ToBlob = (base64: string, type = 'application/octet-stream'): Blob => {
  try {
    const byteCharacters = atob(base64.split(',')[1] || base64); // Handle optional data URI prefix
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  } catch (error) {
    console.error('Error converting Base64 to Blob:', error);
    throw new Error(
      `Failed to convert Base64 string to Blob: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const generateMarkdownContent = (idea: Idea): string => {
  let content = `# ${idea.title}\n\n`;
  content += `## Problem Solved:\n${idea.problemSolved || 'N/A'}\n\n`;
  content += `## Core Solution/Concept:\n${idea.coreSolution || 'N/A'}\n\n`;
  content += `## Key Features:\n${idea.keyFeatures || 'N/A'}\n\n`;
  content += `## Target Audience:\n${idea.targetAudience || 'N/A'}\n\n`;
  content += `## Inspiration/Notes:\n${idea.inspirationNotes || 'N/A'}\n\n`;

  if (idea.attachments.length > 0) {
    content += `## Attachments:\n`;
    idea.attachments.forEach((att) => {
      if (att.type === 'image') {
        // Relative path for zip structure
        content += `![${att.name}](./attachments/${sanitizeFilename(att.name)})\n`;
      } else {
        content += `- ${att.name} (type: ${att.type}, size: ${Math.round(att.size / 1024)} KB) - See ./attachments/${sanitizeFilename(att.name)}\n`;
      }
    });
  }
  return content;
};

export const sanitizeFilename = (name: string): string =>
  // Replace problematic characters and multiple spaces with a single underscore
  name
    .replace(/[\\/:*?"<>|#%&{}]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 100);

const formatDateForFilename = (date: Date): string => {
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const DD = String(date.getDate()).padStart(2, '0');
  const HH = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD}_${HH}${mm}${ss}`;
};

export const exportIdea = async (idea: Idea): Promise<void> => {
  try {
    const markdownContent = generateMarkdownContent(idea);
    const baseFilename = sanitizeFilename(idea.title) || 'Untitled_Idea';
    const timestamp = formatDateForFilename(new Date(idea.updatedAt));
    const markdownFilename = `${baseFilename}_${timestamp}.md`;

    if (idea.attachments.length > 0) {
      const zip = new JSZip();
      zip.file(markdownFilename, markdownContent);
      const attachmentsFolder = zip.folder('attachments');
      if (!attachmentsFolder) throw new Error('Could not create attachments folder in ZIP.');

      for (const att of idea.attachments) {
        const blob = base64ToBlob(att.content, att.mimeType);
        attachmentsFolder.file(sanitizeFilename(att.name), blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      downloadFile(
        `${baseFilename}_${timestamp}.zip`,
        URL.createObjectURL(zipBlob),
        'application/zip'
      );
    } else {
      // No attachments, just download Markdown
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
      downloadFile(markdownFilename, URL.createObjectURL(blob), 'text/markdown;charset=utf-8');
    }
  } catch (error) {
    console.error('Error exporting idea:', error);
    throw new Error(
      `Failed to export idea "${idea.title}": ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const exportProjectAsZip = async (project: Project): Promise<void> => {
  try {
    const zip = new JSZip();
    const projectBaseFilename = sanitizeFilename(project.name) || 'Untitled_Project';
    const projectFolder = zip.folder(projectBaseFilename);

    if (!projectFolder) {
      throw new Error('Could not create project folder in ZIP.');
    }

    for (const idea of project.ideas) {
      const ideaBaseFilename = sanitizeFilename(idea.title) || 'Untitled_Idea';
      const ideaMarkdownFilename = `README.md`; // Store markdown as README in idea's folder
      const markdownContent = generateMarkdownContent(idea);

      const ideaSubFolder = projectFolder.folder(ideaBaseFilename);
      if (!ideaSubFolder) {
        console.warn(
          `Could not create subfolder for idea "${idea.title}" in project ZIP. Skipping this idea's folder structure.`
        );
        projectFolder.file(`${ideaBaseFilename}.md`, markdownContent); // Fallback to flat MD
        continue;
      }

      ideaSubFolder.file(ideaMarkdownFilename, markdownContent);

      if (idea.attachments.length > 0) {
        const attachmentsFolder = ideaSubFolder.folder('attachments');
        if (attachmentsFolder) {
          for (const att of idea.attachments) {
            const blob = base64ToBlob(att.content, att.mimeType);
            attachmentsFolder.file(sanitizeFilename(att.name), blob);
          }
        } else {
          console.warn(
            `Could not create attachments folder for idea "${idea.title}" in project ZIP.`
          );
        }
      }
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const timestamp = formatDateForFilename(new Date());
    downloadFile(
      `${projectBaseFilename}_${timestamp}.zip`,
      URL.createObjectURL(zipBlob),
      'application/zip'
    );
  } catch (error) {
    console.error('Error exporting project:', error);
    throw new Error(
      `Failed to export project "${project.name}": ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

const downloadFile = (filename: string, href: string, mimeType?: string): void => {
  try {
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    if (mimeType) link.type = mimeType;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href); // Clean up
  } catch (error) {
    console.error('Error in downloadFile utility:', error);
    // This error won't be easily caught by calling functions unless re-thrown,
    // but it's important for debugging.
  }
};

export const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (event) => {
      console.error('Error reading file as text:', event.target?.error);
      reject(
        new Error(
          `Failed to read file "${file.name}" as text: ${event.target?.error?.message || 'Unknown error'}`
        )
      );
    };
    reader.readAsText(file);
  });

export const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (event) => {
      console.error('Error reading file as Base64:', event.target?.error);
      reject(
        new Error(
          `Failed to read file "${file.name}" as Base64: ${event.target?.error?.message || 'Unknown error'}`
        )
      );
    };
    reader.readAsDataURL(file);
  });
