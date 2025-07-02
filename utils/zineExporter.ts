
// utils/zineExporter.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfExportOptions {
  filename?: string;
  pageSelector?: string; // CSS selector for elements to treat as pages
  // Add more options: paper size, orientation, margins, custom styling for PDF
}

/**
 * Renders the current view (or specific elements) to a canvas and exports as a PDF.
 * This is a basic implementation. Advanced "report" features would require
 * more sophisticated layout control, styling, and potentially a server-side component
 * for complex PDF generation.
 */
export const exportViewAsPdf = async (options: PdfExportOptions = {}): Promise<void> => {
  const {
    filename = `IdeaForge_Report_${new Date().toISOString().split('T')[0]}.pdf`,
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
      throw new Error("No content found to export for the PDF report.");
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
    console.log(`PDF Report exported as ${filename}`);

  } catch (error) {
    console.error("Error exporting PDF Report:", error);
    // Optionally, notify the user via UI
    throw new Error(`Failed to export PDF Report: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Exports selected elements into a "zine" format, with multiple items per page.
 */
export const exportViewAsPdfZine = async (options: PdfExportOptions = {}): Promise<void> => {
  const {
      filename = `IdeaForge_Zine_${new Date().toISOString().split('T')[0]}.pdf`,
      pageSelector,
  } = options;

  if (!pageSelector) throw new Error("A pageSelector is required for Zine export.");

  try {
      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
      const elements = Array.from(document.querySelectorAll<HTMLElement>(pageSelector));
      if (elements.length === 0) throw new Error("No content found to create Zine.");

      const pdfPageWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const gutter = 20;

      const contentWidth = pdfPageWidth - margin * 2;
      const contentHeight = pdfPageHeight - margin * 2;
      
      const cellWidth = (contentWidth - gutter) / 2;
      const cellHeight = (contentHeight - gutter) / 2;
      
      const itemsPerPage = 4;

      for (let i = 0; i < elements.length; i++) {
          const itemOnPage = i % itemsPerPage;
          if (i > 0 && itemOnPage === 0) {
              pdf.addPage();
          }

          const element = elements[i];
          const canvas = await html2canvas(element, {
              scale: 2,
              useCORS: true,
              // Explicitly set a background color from theme vars to avoid transparency issues
              backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-bg-secondary').trim() || '#1A1A2A',
          });

          const imgData = canvas.toDataURL('image/png');
          const col = itemOnPage % 2;
          const row = Math.floor(itemOnPage / 2);

          const x = margin + col * (cellWidth + gutter);
          const y = margin + row * (cellHeight + gutter);

          pdf.addImage(imgData, 'PNG', x, y, cellWidth, cellHeight);
      }

      pdf.save(filename);
      console.log(`PDF Zine exported as ${filename}`);

  } catch (error) {
      console.error("Error exporting Zine:", error);
      throw new Error(`Failed to export Zine: ${error instanceof Error ? error.message : String(error)}`);
  }
};
