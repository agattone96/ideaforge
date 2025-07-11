

// components/IdeaEditor.tsx (Blueprint Canvas)
import React, { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import { Idea, Attachment, Project } from '../types';
import Button from './Button';
import TextInput from './TextInput';
import TextArea from './TextArea';
import * as projectService from '../services/projectService';
import * as aiService from '../services/aiService';
import { exportIdea, readFileAsText, readFileAsBase64, sanitizeFilename, base64ToBlob } from '../services/fileService';
import { exportViewAsPdf } from '../utils/zineExporter'; // Import PDF Exporter
import { SparklesIcon, DocumentArrowDownIcon, DocumentTextIcon, PhotoIcon, DocumentIcon, TrashIcon, ArrowLeftIcon, PlusCircleIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentChartBarIcon } from './icons';

interface IdeaEditorProps {
  project: Project;
  ideaToEdit: Idea | null;
  onSave: (updatedProject: Project) => void;
  onCancel: () => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const emptyIdea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '', problemSolved: '', coreSolution: '', keyFeatures: '', targetAudience: '', inspirationNotes: '', attachments: [], logo: undefined,
};

const MAX_BLUEPRINT_LOGO_SIZE_MB = 1;
const ALLOWED_BLUEPRINT_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
const IDEA_EDITOR_CONTENT_ID = 'idea-editor-content-area'; // ID for PDF capture


const IdeaEditor: React.FC<IdeaEditorProps> = ({ project, ideaToEdit, onSave, onCancel, addNotification }) => {
  const [idea, setIdea] = useState<Omit<Idea, 'id' | 'createdAt' | 'updatedAt' > & Partial<Pick<Idea, 'id' | 'createdAt' | 'updatedAt'>>>(emptyIdea);
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingBoilerplate, setIsGeneratingBoilerplate] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false); // New state for PDF export
  const [isAiAvailable, setIsAiAvailable] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blueprintLogoInputRef = useRef<HTMLInputElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null); // Ref for the main content area

  useEffect(() => {
      setIsAiAvailable(aiService.isAiEnabled());
  }, []);

  const fieldHelp = {
    title: "Give your idea a clear and memorable name.",
    logo: "Optional: Give this idea its own unique logo.",
    problemSolved: "What problem does this idea solve?",
    coreSolution: "Briefly describe the core concept or solution.",
    keyFeatures: "List the key features or components. Use '-' or '*' for each point.",
    targetAudience: "Who is the target audience for this idea?",
    inspirationNotes: "A space for your notes, research, and inspiration. Drag & drop files here.",
    attachments: "Attach relevant files like mockups, research, or other documents."
  };

  useEffect(() => {
    setIdea(ideaToEdit ? { ...ideaToEdit } : { ...emptyIdea });
  }, [ideaToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIdea(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (idea.title.trim() === '') {
      addNotification('Every great idea needs a title.', 'error'); // Updated
      return;
    }
    const now = new Date().toISOString();
    let savedIdea: Idea = idea.id 
      ? { ...idea, updatedAt: now } as Idea // idea already includes 'logo' if set
      : { ...idea, id: crypto.randomUUID(), createdAt: now, updatedAt: now } as Idea; // new idea includes 'logo'
    
    if (idea.id) projectService.updateIdeaInProject(project.id, savedIdea);
    else projectService.addIdeaToProject(project.id, savedIdea);
    
    const updatedProject = projectService.getProjectById(project.id);
    if (updatedProject) onSave(updatedProject);
    addNotification(`Idea "${savedIdea.title}" saved.`, 'success'); // Updated
  };

  const handleExport = async () => {
    if (!idea.id) { addNotification('Save the idea first before exporting.', 'info'); return; } // Updated
    try { await exportIdea(idea as Idea); addNotification(`Exporting idea "${idea.title}" as Markdown...`, 'success'); } // Clarified Markdown export
    catch (error) { addNotification(`Export failed. Idea "${idea.title}" was not exported.`, 'error'); console.error(error); } // Updated
  };

  const handleExportPdf = async () => {
    if (!idea.id) {
      addNotification('Save the idea first to export it as a PDF report.', 'info');
      return;
    }
    if (!editorContentRef.current) {
        addNotification('Cannot capture idea content for PDF. DOM element not found.', 'error');
        return;
    }
    setIsExportingPdf(true);
    addNotification(`Preparing Idea PDF for "${idea.title}"... This may take a moment.`, 'info');
    try {
      // The main motion.div already has IDEA_EDITOR_CONTENT_ID
      await exportViewAsPdf({
        pageSelector: `#${IDEA_EDITOR_CONTENT_ID}`,
        filename: `${sanitizeFilename(idea.title || 'Untitled Idea')}_IdeaReport.pdf`,
      });
      addNotification(`Idea PDF for "${idea.title}" exported successfully.`, 'success');
    } catch (error) {
      addNotification(`Failed to export PDF Report: ${error instanceof Error ? error.message : String(error)}`, 'error');
      console.error(error);
    }
    setIsExportingPdf(false);
  };


  const handleGenerateBoilerplate = async () => {
    if (!idea.title.trim()) { addNotification('Give your idea a title to get AI suggestions.', 'info'); return; } // Updated
    if (!isAiAvailable) { addNotification('AI features are disabled. Please check your API key in Settings.', 'error'); return; } // Updated
    setIsGeneratingBoilerplate(true);
    try {
      const boilerplate = await aiService.generateIdeaBoilerplate(idea.title);
      setIdea(prev => ({ ...prev, ...boilerplate }));
      addNotification('AI has generated some starting points!', 'success'); // Updated
    } catch (e) { addNotification(`AI request failed. ${e instanceof Error ? e.message : String(e)}`, 'error'); } // Updated
    setIsGeneratingBoilerplate(false);
  };

  const handleSummarizeNotes = async () => {
    if (!idea.inspirationNotes?.trim() && !idea.coreSolution?.trim()) { addNotification('Provide some notes or a solution for the AI to summarize.', 'info'); return; } // Updated
    if (!isAiAvailable) { addNotification('AI features are disabled. Please check your API key in Settings.', 'error'); return; } // Updated
    setIsSummarizing(true);
    try {
      const summaryContent = { title: idea.title, problemSolved: idea.problemSolved, coreSolution: idea.coreSolution, keyFeatures: idea.keyFeatures, targetAudience: idea.targetAudience, inspirationNotes: idea.inspirationNotes };
      const summary = await aiService.summarizeIdea(summaryContent);
      setIdea(prev => ({ ...prev, inspirationNotes: `${prev.inspirationNotes || ''}\n\n--- AI Summary ---\n${summary}` })); // Updated summary separator
      addNotification('AI summary has been added to your notes!', 'success'); // Updated
    } catch (e) { addNotification(`AI request failed. ${e instanceof Error ? e.message : String(e)}`, 'error'); } // Updated
    setIsSummarizing(false);
  };

  const processFile = useCallback(async (file: File): Promise<Attachment | null> => {
    const common = { id: crypto.randomUUID(), name: sanitizeFilename(file.name), mimeType: file.type, size: file.size };
    if (file.type.startsWith('image/')) return { ...common, type: 'image', content: await readFileAsBase64(file) };
    if (file.type === 'text/plain' || file.type === 'text/markdown') return { ...common, type: 'text', content: await readFileAsText(file) };
    return { ...common, type: 'other', content: await readFileAsBase64(file) };
  }, []);
  
  const addProcessedAttachments = useCallback((processedAttachments: Attachment[], notesUpdateFromFile?: string) => {
    setIdea(prev => {
        let newInspirationNotes = prev.inspirationNotes || '';
        if (notesUpdateFromFile) {
            newInspirationNotes += notesUpdateFromFile;
        }
        
        processedAttachments.forEach(att => {
            if (att.type === 'image') {
                newInspirationNotes += `\n![${att.name}](_attachments/${att.name})`;
            }
        });

        return { 
            ...prev, 
            inspirationNotes: newInspirationNotes, 
            attachments: [...prev.attachments, ...processedAttachments] 
        };
    });
  }, []);

  const handleFileUpload = useCallback(async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    addNotification('Processing attachments...', 'info');
    let newAttachmentsBatch: Attachment[] = [];
    let aggregatedNotesUpdate = '';

    for (const file of Array.from(files)) {
      if (file.type === 'application/zip') {
        try { 
          const zip = await JSZip.loadAsync(file);
          const zipFileEntries = Object.values(zip.files).filter((f:any) => !f.dir);
          let currentZipAttachments: Attachment[] = [];
          for (const entry of zipFileEntries) {
            const entryFile = new File([await (entry as any).async('blob')], (entry as any).name, {type: (await (entry as any).async('blob')).type});
            const attachment = await processFile(entryFile);
            if (attachment) {
                 if (attachment.type === 'text') aggregatedNotesUpdate += `\n\n--- Appended from ${attachment.name} (in ${file.name}) ---\n${attachment.content}`;
                 currentZipAttachments.push(attachment);
            }
          }
          newAttachmentsBatch.push(...currentZipAttachments); 
          addNotification(`Unpacked ${currentZipAttachments.length} files from ${file.name}.`, 'success');
        } catch (err) { console.error("ZIP Error:", err); addNotification(`Could not unpack ${file.name}. The ZIP file may be corrupted.`, 'error'); }
      } else {
        const attachment = await processFile(file);
        if (attachment) {
          if (attachment.type === 'text') aggregatedNotesUpdate += `\n\n--- Appended from ${attachment.name} ---\n${attachment.content}`;
          newAttachmentsBatch.push(attachment);
        }
      }
    }
    
    if (newAttachmentsBatch.length > 0) {
        addProcessedAttachments(newAttachmentsBatch, aggregatedNotesUpdate);
    }
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  }, [addNotification, processFile, addProcessedAttachments]);


  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    await handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);


  const removeAttachment = (id: string) => {
    const attachmentToRemove = idea.attachments.find(att => att.id === id);
    setIdea(prev => {
        const updatedAttachments = prev.attachments.filter(att => att.id !== id);
        let updatedNotes = prev.inspirationNotes || '';
        if (attachmentToRemove && attachmentToRemove.type === 'image') {
            const markdownLinkRegex = new RegExp(`\\n!\\[${attachmentToRemove.name}\\]\\(_attachments/${attachmentToRemove.name}\\)`, 'g');
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
        addNotification(`Downloading attachment "${attachment.name}"...`, 'info'); // Updated
    } catch (error) {
        addNotification(`Download failed for "${attachment.name}": ${error instanceof Error ? error.message : 'Unknown error'}`, 'error'); // Updated
    }
  };

  const handleBlueprintLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_BLUEPRINT_LOGO_TYPES.includes(file.type)) {
      addNotification(`Invalid file type for logo. Please use PNG, JPG, or SVG. Got: ${file.type}`, 'error'); // Updated
      return;
    }
    if (file.size > MAX_BLUEPRINT_LOGO_SIZE_MB * 1024 * 1024) {
      addNotification(`Logo file is too large. Max size: ${MAX_BLUEPRINT_LOGO_SIZE_MB}MB.`, 'error'); // Updated
      return;
    }
    try {
      const base64Logo = await readFileAsBase64(file);
      setIdea(prev => ({ ...prev, logo: base64Logo }));
      addNotification('Logo selected. Save the idea to make it permanent.', 'info'); // Updated
    } catch (error) {
      addNotification('Logo upload failed. Please try a different image.', 'error'); // Updated
    }
    if (blueprintLogoInputRef.current) blueprintLogoInputRef.current.value = "";
  };

  const handleRemoveBlueprintLogo = () => {
     setIdea(prev => ({ ...prev, logo: undefined }));
     addNotification('Logo cleared. Save the idea to apply the change.', 'info'); // Updated
  };

  const getFileIcon = (type: Attachment['type']) => {
    if (type === 'image') return <PhotoIcon className="w-5 h-5 text-theme-accent-primary mr-2 flex-shrink-0" />;
    if (type === 'text') return <DocumentTextIcon className="w-5 h-5 text-theme-accent-primary mr-2 flex-shrink-0" />;
    return <DocumentIcon className="w-5 h-5 text-theme-text-secondary mr-2 flex-shrink-0" />;
  };

  const isSaveDisabled = isGeneratingBoilerplate || isSummarizing || isExportingPdf;

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 pb-4 border-b border-theme-border-primary">
        <div className="w-full sm:w-auto mb-3 sm:mb-0">
         <Button onClick={onCancel} variant="ghost" size="sm" className="mb-2" leftIcon={<ArrowLeftIcon className="w-5 h-5"/>}>
            Back to Project
          </Button>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-theme-accent-primary"> 
            {idea.id ? 'Edit Idea' : 'New Idea'}
          </h2>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
            {idea.id && (
                <>
                <Button onClick={handleExport} variant="outline" size="md" leftIcon={<DocumentArrowDownIcon className="w-5 h-5"/>} disabled={isSaveDisabled}>
                    Export (MD)
                </Button>
                <Button 
                    onClick={handleExportPdf} 
                    variant="outline" 
                    size="md" 
                    leftIcon={<DocumentChartBarIcon className="w-5 h-5"/>}
                    isLoading={isExportingPdf}
                    disabled={isSaveDisabled && !isExportingPdf}
                >
                    Export Report (PDF)
                </Button>
                </>
            )}
        </div>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
        
        <div className="md:col-span-2 space-y-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            {/* Blueprint Logo Area */}
            <div className="flex-shrink-0 mt-1.5 pt-5">
                {idea.logo ? (
                    <img src={idea.logo} alt="Idea logo" className="w-16 h-16 object-cover rounded-md border border-theme-accent-primary/30 shadow-sm mx-auto"/>
                ) : (
                    <div className="w-16 h-16 bg-theme-bg-accent rounded-md flex items-center justify-center border border-theme-border-primary/50 mx-auto">
                        <PhotoIcon className="w-8 h-8 text-theme-accent-primary/60"/>
                    </div>
                )}
                <input 
                    type="file" 
                    accept={ALLOWED_BLUEPRINT_LOGO_TYPES.join(',')}
                    ref={blueprintLogoInputRef} 
                    onChange={handleBlueprintLogoUpload} 
                    className="hidden"
                    id="blueprint-logo-upload-input"
                    aria-label="Upload idea logo"
                />
                <div className="mt-1.5 space-y-1">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="!text-xs !px-1.5 !py-0.5"
                        onClick={() => blueprintLogoInputRef.current?.click()}
                        title={idea.logo ? "Change idea logo" : "Upload idea logo"}
                        disabled={isSaveDisabled}
                    >
                       <ArrowUpTrayIcon className="w-3 h-3 mr-1"/> {idea.logo ? 'Change' : 'Upload'}
                    </Button>
                    {idea.logo && (
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="!text-xs !px-1.5 !py-0.5 text-status-error/80 hover:text-status-error"
                            onClick={handleRemoveBlueprintLogo}
                            title="Remove idea logo"
                            disabled={isSaveDisabled}
                        >
                            <TrashIcon className="w-3 h-3 mr-1"/> Remove
                        </Button>
                    )}
                </div>
            </div>
            {/* Title & AI Button */}
            <div className="flex-grow w-full">
                 <div className="flex items-end space-x-2">
                    <TextInput name="title" label="Idea Title*" value={idea.title} onChange={handleChange} required helpText={fieldHelp.title} wrapperClassName="flex-grow" disabled={isSaveDisabled}/>
                    {isAiAvailable && <Button type="button" onClick={handleGenerateBoilerplate} variant="icon" size="md" className="self-end mb-0.5" disabled={isGeneratingBoilerplate || !idea.title.trim() || isSaveDisabled} title="Generate with AI"><SparklesIcon className={`w-5 h-5 ${isGeneratingBoilerplate ? 'animate-spin' : ''}`}/></Button>}
                 </div>
            </div>
          </div>


          <TextArea name="problemSolved" label="Problem Solved" value={idea.problemSolved} onChange={handleChange} helpText={fieldHelp.problemSolved} rows={3} disabled={isSaveDisabled}/>
          <TextArea name="coreSolution" label="Core Solution" value={idea.coreSolution} onChange={handleChange} helpText={fieldHelp.coreSolution} rows={4} disabled={isSaveDisabled}/>
          <TextArea name="keyFeatures" label="Key Features (List)" value={idea.keyFeatures} onChange={handleChange} helpText={fieldHelp.keyFeatures} rows={5} disabled={isSaveDisabled}/>
          <TextArea name="targetAudience" label="Target Audience" value={idea.targetAudience} onChange={handleChange} helpText={fieldHelp.targetAudience} rows={3} disabled={isSaveDisabled}/>
        </div>

        <div 
          className="md:col-span-3 p-4 border-2 border-theme-border-primary rounded-lg transition-all flex flex-col min-h-[400px] md:min-h-full bg-theme-bg-accent/30"
          onDrop={handleDrop} 
          onDragOver={(e)=>{e.preventDefault(); e.stopPropagation(); if (!isSaveDisabled) setIsDragging(true);}} 
          onDragLeave={(e)=>{e.preventDefault(); e.stopPropagation(); setIsDragging(false);}}
          onDragEnd={(e)=>{e.preventDefault(); e.stopPropagation(); setIsDragging(false);}}
          style={{ borderColor: isDragging ? 'var(--color-accent-primary)' : 'var(--color-border-primary)', borderWidth: '2px', borderStyle: isDragging? 'dashed' : 'solid'}}
        >
          <div className="flex justify-between items-center mb-2">
             <label className="block text-sm font-medium text-theme-text-secondary font-sans">Notes & Attachments</label>
             {isAiAvailable && <Button type="button" onClick={handleSummarizeNotes} variant="ghost" size="sm" className="!px-2 !py-1 text-xs" disabled={isSummarizing || (!idea.inspirationNotes?.trim() && !idea.coreSolution?.trim()) || isSaveDisabled} title="Summarize with AI"><SparklesIcon className={`w-4 h-4 mr-1 ${isSummarizing ? 'animate-spin' : ''}`}/>Summarize</Button>}
          </div>
          <TextArea 
            name="inspirationNotes" 
            value={idea.inspirationNotes} 
            onChange={handleChange} 
            placeholder="A space for your notes, research, and inspiration. Drag & drop files here..." 
            rows={10} 
            className="bg-transparent border-none focus:ring-0 p-2 flex-grow w-full !text-theme-text-primary placeholder:!text-theme-text-secondary/70 resize-none custom-scrollbar" 
            helpText={fieldHelp.inspirationNotes}
            disabled={isSaveDisabled}
          />

           <div className="mt-4 border-t border-theme-border-primary pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-theme-text-secondary font-sans flex items-center">
                   Idea Attachments <span className="ml-1.5 text-xs text-theme-accent-primary">({idea.attachments.length})</span>
                </h4>
                <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    onChange={(e) => handleFileUpload(e.target.files)} 
                    className="hidden" 
                    id="idea-file-upload-input"
                    aria-label="Upload files to idea"
                    disabled={isSaveDisabled}
                />
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                    leftIcon={<PlusCircleIcon className="w-4 h-4"/>}
                    disabled={isSaveDisabled}
                >
                    Add Attachment(s)
                </Button>
              </div>
              {idea.attachments.length > 0 && (
                <ul className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1 mt-3">
                  {idea.attachments.map(att => (
                    <li key={att.id} className="flex items-center justify-between p-2 bg-theme-bg-accent/50 rounded-md hover:bg-theme-bg-accent transition-colors">
                      <div className="flex items-center truncate mr-2">
                        {getFileIcon(att.type)}
                        <span className="text-sm text-theme-text-primary truncate" title={att.name}>{att.name}</span>
                        <span className="text-xs text-theme-text-secondary ml-2 flex-shrink-0">({Math.round(att.size / 1024)} KB)</span>
                      </div>
                      <div className="flex space-x-1.5 flex-shrink-0">
                        <Button type="button" variant="icon" size="sm" onClick={() => handleDownloadAttachment(att)} title="Download file" disabled={isSaveDisabled}>
                          <ArrowDownTrayIcon className="w-4 h-4 text-theme-accent-primary"/>
                        </Button>
                        <Button type="button" variant="icon" size="sm" onClick={() => removeAttachment(att.id)} title="Delete file" className="text-status-error hover:bg-status-error/10" disabled={isSaveDisabled}>
                          <TrashIcon className="w-4 h-4"/>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
               {idea.attachments.length === 0 && (
                 <p className="text-xs text-theme-text-secondary text-center py-3">No files attached to this idea yet.</p>
               )}
            </div>
          
          <p className={`mt-3 text-xs text-center ${isDragging ? 'text-theme-accent-primary font-semibold' : 'text-theme-text-secondary'}`}>
            {isDragging ? 'Release to add files' : "Drag files here, or use 'Add Attachment(s)'."}
          </p>
        </div>

        <div className="md:col-span-5 flex justify-end space-x-3 sm:space-x-4 pt-6 border-t border-theme-border-primary mt-6">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSaveDisabled}>Cancel</Button>
          <Button type="submit" variant="default" isLoading={isGeneratingBoilerplate || isSummarizing || isExportingPdf} disabled={isSaveDisabled}>
            Save Idea
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default IdeaEditor;