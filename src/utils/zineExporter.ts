// utils/zineExporter.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as logger from '@/services/logger';

// Custom hook for sorting/filtering ideas
import { useMemo } from 'react';
import { Idea } from '@/types';

interface ZineExportOptions {
  filename?: string;
  pageSelector?: string; // CSS selector for elements to treat as pages
  // Add more options: paper size, orientation, margins, custom styling for PDF
}

/**
 * Renders the current view (or specific elements) to a canvas and exports as a PDF.
 * This is a basic implementation. Advanced "zine" features would require
 * more sophisticated layout control, styling, and potentially a server-side component
 * for complex PDF generation.
 */
export const exportViewAsPdfZine = async (options: ZineExportOptions = {}): Promise<void> => {
  const {
    filename = `IdeaForge_Zine_${new Date().toISOString().split('T')[0]}.pdf`,
    pageSelector = null, // If null, captures the whole body or a main app container
  } = options;

  try {
    const pdf = new jsPDF({
      orientation: 'p', // portrait
      unit: 'pt',       // points
      format: 'a4',     // A4 paper size
    });

    const elementsToCapture: HTMLElement[] = [];
    if (pageSelector) {
      document.querySelectorAll<HTMLElement>(pageSelector).forEach(el => elementsToCapture.push(el));
    } else {
      // Fallback: try to capture the main app content area
      // This needs a reliable selector for your app's main content wrapper
      const mainContent = document.getElementById('root') || document.body;
      elementsToCapture.push(mainContent);
    }

    if (elementsToCapture.length === 0) {
      throw new Error("No content found to export for the Zine.");
    }

    for (let i = 0; i < elementsToCapture.length; i++) {
      const element = elementsToCapture[i];
      
      // Ensure element is visible and has dimensions
      // May need to temporarily adjust styles for off-screen or hidden elements if they should be included
      
      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // If you have external images
        logging: true,
        backgroundColor: null, // Make background transparent to capture underlying styles
        // Consider scrollX/scrollY if element is scrollable and you want full content
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate aspect ratio to fit image on page
      const imgWidth = pdfWidth * 0.9; // Use 90% of page width
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      
      let finalImgHeight = imgHeight;
      let finalImgWidth = imgWidth;

      if (imgHeight > pdfHeight * 0.9) {
        finalImgHeight = pdfHeight * 0.9;
        finalImgWidth = (imgProps.width * finalImgHeight) / imgProps.height;
      }
      
      const xOffset = (pdfWidth - finalImgWidth) / 2;
      const yOffset = (pdfHeight - finalImgHeight) / 2;

      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
    }

    pdf.save(filename);
    logger.info(`Zine exported as ${filename}`);

  } catch (error) {
    console.error("Error exporting Zine:", error);
    // Optionally, notify the user via UI
    throw new Error(`Failed to export Zine: ${error instanceof Error ? error.message : String(error)}`);
  }
};

type SortOption = 'updatedAt_desc' | 'title_asc' | 'createdAt_asc' | 'createdAt_desc';

export function useSortedIdeas(ideas: Idea[], sortOption: SortOption): Idea[] {
  return useMemo(() => {
    const sorted = [...ideas];
    switch (sortOption) {
      case 'title_asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'createdAt_asc':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'createdAt_desc':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'updatedAt_desc':
      default:
        sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }
    return sorted;
  }, [ideas, sortOption]);
}

// Placeholder for more advanced zine creation, e.g. with custom layouts, text extraction etc.
// This might involve server-side PDF generation for complex documents.
