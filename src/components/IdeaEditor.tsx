import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import TextArea from './TextArea';
import {
  SparklesIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  PhotoIcon,
  DocumentIcon,
  TrashIcon,
  ArrowLeftIcon,
  PlusCircleIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentChartBarIcon,
} from './icons';
// Lazy-load subcomponents to split chunks
const BlueprintLogoUploader = lazy(() => import('./BlueprintLogoUploader'));
const IdeaEditorHeader = lazy(() => import('./IdeaEditorHeader'));
const TitleWithAI = lazy(() => import('./TitleWithAI'));
const IdeaFormFields = lazy(() => import('./IdeaFormFields'));
const IdeaEditorFooter = lazy(() => import('./IdeaEditorFooter'));
// Lazy-load NebulaCanvas to reduce initial bundle size
const NebulaCanvas = lazy(() => import('./NebulaCanvas'));

interface IdeaEditorProps {
  project: Project;
  ideaToEdit: Idea | null;
  onSave: (updatedProject: Project) => void;
  onCancel: () => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const emptyIdea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  problemSolved: '',
  coreSolution: '',
  keyFeatures: '',
  targetAudience: '',
  inspirationNotes: '',
  attachments: [],
  logo: undefined,
};

const MAX_BLUEPRINT_LOGO_SIZE_MB = 1;
const ALLOWED_BLUEPRINT_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
const IDEA_EDITOR_CONTENT_ID = 'idea-editor-content-area'; // ID for PDF capture

export const IdeaEditor: React.FC<IdeaEditorProps> = ({
  project,
  ideaToEdit,
  onSave,
  onCancel,
  addNotification,
}) => {
  const [idea, setIdea] = useState<
    Omit<Idea, 'id' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<Idea, 'id' | 'createdAt' | 'updatedAt'>>
  >(emptyIdea);
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingBoilerplate, setIsGeneratingBoilerplate] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isExportingZine, setIsExportingZine] = useState(false); // New state for Zine export
  const aiEnabled = localStorageService.isAiEnabled();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blueprintLogoInputRef = useRef<HTMLInputElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null); // Ref for the main content area

  const fieldHelp = {
    title: 'The designation for your blueprint. Let it resonate across the cosmos.',
    logo: 'Optional: A unique sigil for this specific blueprint, a miniature star.',
    problemSolved: 'What cosmic imbalance or earthly void does your blueprint seek to rectify?',
    coreSolution: 'Describe the heart of your idea, its central star and guiding light.',
    keyFeatures:
      "Chart the key constellations of functionality. Use '-' or '*' for each star point.",
    targetAudience: 'For whom does this cosmic creation shine? Who are its destined travelers?',
    inspirationNotes:
      'Your canvas for cosmic cartography. Drag & drop images, text files, or entire nebulae (ZIPs).',
  };

  useEffect(() => {
    setIdea(ideaToEdit ? { ...ideaToEdit } : { ...emptyIdea });
  }, [ideaToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIdea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (idea.title.trim() === '') {
      addNotification('A blueprint needs a name to echo in the cosmos. Title, please!', 'error'); // Updated
      return;
    }
    const now = new Date().toISOString();
    const savedIdea: Idea = idea.id
      ? ({ ...idea, updatedAt: now } as Idea) // idea already includes 'logo' if set
      : ({ ...idea, id: crypto.randomUUID(), createdAt: now, updatedAt: now } as Idea); // new idea includes 'logo'

    if (idea.id) localStorageService.updateIdeaInProject(project.id, savedIdea);
    else localStorageService.addIdeaToProject(project.id, savedIdea);

    const updatedProject = localStorageService.getProjectById(project.id);
    if (updatedProject) onSave(updatedProject);
    addNotification(`Blueprint "${savedIdea.title}" forged and filed.`, 'success'); // Updated
  };

  const handleExport = async () => {
    if (!idea.id) {
      addNotification('Forge the blueprint first to give it form.', 'info');
      return;
    } // Updated
    try {
      await exportIdea(idea as Idea);
      addNotification(
        `Transmitting Blueprint "${idea.title}" (Markdown) beyond the forge...`,
        'success'
      );
    } catch (error) {
      // Clarified Markdown export
      addNotification(
        `Transmission error. Blueprint "${idea.title}" remains in the forge.`,
        'error'
      );
      console.error(error);
    } // Updated
  };

  const handleExportZine = async () => {
    if (!idea.id) {
      addNotification('Forge the blueprint first to give its Zine form.', 'info');
      return;
    }
    if (!editorContentRef.current) {
      addNotification('Cannot capture blueprint content for Zine. DOM element not found.', 'error');
      return;
    }
    setIsExportingZine(true);
    addNotification(
      `Preparing Blueprint Zine for "${idea.title}"... This may take a moment.`,
      'info'
    );
    try {
      // The main motion.div already has IDEA_EDITOR_CONTENT_ID
      await exportViewAsPdfZine({
        pageSelector: `#${IDEA_EDITOR_CONTENT_ID}`,
        filename: `${sanitizeFilename(idea.title || 'Untitled Idea')}_BlueprintZine.pdf`,
      });
      addNotification(`Blueprint Zine for "${idea.title}" exported successfully.`, 'success');
    } catch (error) {
      addNotification(
        `Failed to export Blueprint Zine: ${error instanceof Error ? error.message : String(error)}`,
        'error'
      );
      console.error(error);
    }
    setIsExportingZine(false);
  };

  const handleGenerateBoilerplate = async () => {
    if (!idea.title.trim()) {
      addNotification('Give your idea a name, and the Cosmic Muse shall sing.', 'info');
      return;
    } // Updated
    if (!aiEnabled) {
      addNotification('The Cosmic Muse is slumbering. Awaken it with your API key.', 'error');
      return;
    } // Updated
    setIsGeneratingBoilerplate(true);
    try {
      const boilerplate = await localStorageService.generateIdeaBoilerplate(idea.title);
      setIdea((prev) => ({ ...prev, ...boilerplate }));
      addNotification('The Cosmic Muse has whispered some starting points!', 'success'); // Updated
    } catch (e) {
      addNotification(
        `Cosmic Interference: The AI Muse is a bit fuzzy. ${e instanceof Error ? e.message : String(e)}`,
        'error'
      );
    } // Updated
    setIsGeneratingBoilerplate(false);
  };

  const handleSummarizeNotes = async () => {
    if (!idea.inspirationNotes?.trim() && !idea.coreSolution?.trim()) {
      addNotification(
        'Share your whispers or solutions, and the AI Oracle shall find their essence.',
        'info'
      );
      return;
    } // Updated
    if (!aiEnabled) {
      addNotification('The Cosmic Muse is slumbering. Awaken it with your API key.', 'error');
      return;
    } // Updated
    setIsSummarizing(true);
    try {
      const summaryContent = {
        title: idea.title,
        problemSolved: idea.problemSolved,
        coreSolution: idea.coreSolution,
        keyFeatures: idea.keyFeatures,
        targetAudience: idea.targetAudience,
        inspirationNotes: idea.inspirationNotes,
      };
      const summary = await localStorageService.summarizeIdea(summaryContent);
      setIdea((prev) => ({
        ...prev,
        inspirationNotes: `${prev.inspirationNotes || ''}\n\n--- AI Oracle's Distillation ---\n${summary}`,
      })); // Updated summary separator
      addNotification('The AI Oracle has distilled your thoughts!', 'success'); // Updated
    } catch (e) {
      addNotification(
        `Cosmic Interference: The AI Muse is a bit fuzzy. ${e instanceof Error ? e.message : String(e)}`,
        'error'
      );
    } // Updated
    setIsSummarizing(false);
  };

  const processFile = useCallback(async (file: File): Promise<Attachment | null> => {
    const common = {
      id: crypto.randomUUID(),
      name: sanitizeFilename(file.name),
      mimeType: file.type,
      size: file.size,
    };
    if (file.type.startsWith('image/'))
      return { ...common, type: 'image', content: await readFileAsBase64(file) };
    if (file.type === 'text/plain' || file.type === 'text/markdown')
      return { ...common, type: 'text', content: await readFileAsText(file) };
    return { ...common, type: 'other', content: await readFileAsBase64(file) };
  }, []);

  const addProcessedAttachments = useCallback(
    (processedAttachments: Attachment[], notesUpdateFromFile?: string) => {
      setIdea((prev) => {
        let newInspirationNotes = prev.inspirationNotes || '';
        if (notesUpdateFromFile) {
          newInspirationNotes += notesUpdateFromFile;
        }

        processedAttachments.forEach((att) => {
          if (att.type === 'image') {
            newInspirationNotes += `\n![${att.name}](_attachments/${att.name})`;
          }
        });

        return {
          ...prev,
          inspirationNotes: newInspirationNotes,
          attachments: [...prev.attachments, ...processedAttachments],
        };
      });
    },
    []
  );

  const handleFileUpload = useCallback(
    async (files: FileList | File[] | null) => {
      if (!files || files.length === 0) return;
      addNotification('Materializing your artifacts...', 'info');
      const newAttachmentsBatch: Attachment[] = [];
      let aggregatedNotesUpdate = '';

      for (const file of Array.from(files)) {
        if (file.type === 'application/zip') {
          try {
            // Dynamic import of JSZip for performance
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(file);
            const zipFileEntries = Object.values(zip.files).filter((f: any) => !f.dir);
            const currentZipAttachments: Attachment[] = [];
            for (const entry of zipFileEntries) {
              const entryFile = new File(
                [await (entry as any).async('blob')],
                (entry as any).name,
                { type: (await (entry as any).async('blob')).type }
              );
              const attachment = await processFile(entryFile);
              if (attachment) {
                if (attachment.type === 'text')
                  aggregatedNotesUpdate += `\n\n--- Appended from ${attachment.name} (in ${file.name}) ---\n${attachment.content}`;
                currentZipAttachments.push(attachment);
              }
            }
            newAttachmentsBatch.push(...currentZipAttachments);
            addNotification(
              `Unpacked ${currentZipAttachments.length} artifacts from ${file.name}'s dimensional pouch.`,
              'success'
            );
          } catch (err) {
            console.error('ZIP Error:', err);
            addNotification(
              `Dimensional pouch for ${file.name} seems corrupted. Could not unpack.`,
              'error'
            );
          }
        } else {
          const attachment = await processFile(file);
          if (attachment) {
            if (attachment.type === 'text')
              aggregatedNotesUpdate += `\n\n--- Appended from ${attachment.name} ---\n${attachment.content}`;
            newAttachmentsBatch.push(attachment);
          }
        }
      }

      if (newAttachmentsBatch.length > 0) {
        addProcessedAttachments(newAttachmentsBatch, aggregatedNotesUpdate);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [addNotification, processFile, addProcessedAttachments]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      await handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const removeAttachment = (id: string) => {
    const attachmentToRemove = idea.attachments.find((att) => att.id === id);
    setIdea((prev) => {
      const updatedAttachments = prev.attachments.filter((att) => att.id !== id);
      let updatedNotes = prev.inspirationNotes || '';
      if (attachmentToRemove && attachmentToRemove.type === 'image') {
        const markdownLinkRegex = new RegExp(
          `\\n!\\[${attachmentToRemove.name}\\]\\(_attachments/${attachmentToRemove.name}\\)`,
          'g'
        );
        updatedNotes = updatedNotes.replace(markdownLinkRegex, '');
      }
      return { ...prev, attachments: updatedAttachments, inspirationNotes: updatedNotes };
    });
  };

  const handleDownloadAttachment = (attachment: Attachment) => {
    try {
      const blob = base64ToBlob(attachment.content, attachment.mimeType);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      addNotification(`Beaming down artifact "${attachment.name}"...`, 'info'); // Updated
    } catch (error) {
      addNotification(
        `Artifact "${attachment.name}" lost in transit: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'error'
      ); // Updated
    }
  };

  const handleBlueprintLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_BLUEPRINT_LOGO_TYPES.includes(file.type)) {
      addNotification(
        `This sigil's material isn't quite right for a blueprint. Use PNG, JPG, SVG. Got: ${file.type}`,
        'error'
      ); // Updated
      return;
    }
    if (file.size > MAX_BLUEPRINT_LOGO_SIZE_MB * 1024 * 1024) {
      addNotification(
        `Blueprint sigil too massive. Max: ${MAX_BLUEPRINT_LOGO_SIZE_MB}MB.`,
        'error'
      ); // Updated
      return;
    }
    try {
      const base64Logo = await readFileAsBase64(file);
      setIdea((prev) => ({ ...prev, logo: base64Logo }));
      addNotification(
        'Blueprint sigil selected. Forge the blueprint to make it permanent.',
        'info'
      ); // Updated
    } catch (error) {
      addNotification('Blueprint sigil upload failed. The forge prefers other images.', 'error'); // Updated
    }
    if (blueprintLogoInputRef.current) blueprintLogoInputRef.current.value = '';
  };

  const handleRemoveBlueprintLogo = () => {
    setIdea((prev) => ({ ...prev, logo: undefined }));
    addNotification('Blueprint sigil cleared. Forge the blueprint to update.', 'info'); // Updated
  };

  const getFileIcon = (type: Attachment['type']) => {
    if (type === 'image')
      return <PhotoIcon className="w-5 h-5 text-theme-accent-primary mr-2 flex-shrink-0" />;
    if (type === 'text')
      return <DocumentTextIcon className="w-5 h-5 text-theme-accent-primary mr-2 flex-shrink-0" />;
    return <DocumentIcon className="w-5 h-5 text-theme-text-secondary mr-2 flex-shrink-0" />;
  };

  const isSaveDisabled = isGeneratingBoilerplate || isSummarizing || isExportingZine;

  return (
    <motion.div
      ref={editorContentRef} // Add ref here for PDF capture
      id={IDEA_EDITOR_CONTENT_ID} // Add static ID for PDF capture
      className="p-4 sm:p-6 md:p-8 w-full max-w-6xl mx-auto bg-theme-bg-secondary shadow-xl rounded-card border border-theme-border-primary font-body"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
    >
      <IdeaEditorHeader
        project={project}
        idea={idea}
        onCancel={onCancel}
        handleExport={handleExport}
        handleExportZine={handleExportZine}
        isExportingZine={isExportingZine}
        isSaveDisabled={isSaveDisabled}
        aiEnabled={aiEnabled}
        isGeneratingBoilerplate={isGeneratingBoilerplate}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6"
      >
        <div className="md:col-span-2 space-y-5">
          <BlueprintLogoUploader
            idea={idea}
            handleBlueprintLogoUpload={handleBlueprintLogoUpload}
            handleRemoveBlueprintLogo={handleRemoveBlueprintLogo}
            addNotification={addNotification}
            isSaveDisabled={isSaveDisabled}
          />
          <TitleWithAI
            name="title"
            label="Blueprint Title*"
            value={idea.title}
            onChange={handleChange}
            required
            helpText={fieldHelp.title}
            wrapperClassName="flex-grow"
            disabled={isSaveDisabled}
            aiEnabled={aiEnabled}
            isGeneratingBoilerplate={isGeneratingBoilerplate}
            handleGenerateBoilerplate={handleGenerateBoilerplate}
          />
        </div>

        <IdeaFormFields
          idea={idea}
          handleChange={handleChange}
          fieldHelp={fieldHelp}
          isSaveDisabled={isSaveDisabled}
        />

        <Suspense fallback={<div>Loading Nebula Canvas...</div>}>
          <NebulaCanvas
            idea={idea}
            handleDrop={handleDrop}
            handleFileUpload={handleFileUpload}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            addNotification={addNotification}
            isSaveDisabled={isSaveDisabled}
            handleSummarizeNotes={handleSummarizeNotes}
            isSummarizing={isSummarizing}
            aiEnabled={aiEnabled}
            removeAttachment={removeAttachment}
            getFileIcon={getFileIcon}
          />
        </Suspense>
      </form>

      <IdeaEditorFooter
        isSaveDisabled={isSaveDisabled}
        onCancel={onCancel}
        handleSave={handleSave}
        isGeneratingBoilerplate={isGeneratingBoilerplate}
        isSummarizing={isSummarizing}
        isExportingZine={isExportingZine}
      />
    </motion.div>
  );
};
