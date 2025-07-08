// components/IdeaList.tsx (Project File View)
import React, { useState, useRef, ChangeEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Idea, Attachment } from '@/types';
import Button from './Button';
import Modal from './Modal';
import * as fileService from '@/services/fileService';
import { exportViewAsPdfZine } from '@/utils/zineExporter'; // Import Zine Exporter
import BlueprintCard from './BlueprintCard'; 
import { 
    PlusCircleIcon, ArrowLeftIcon, DocumentDuplicateIcon, DocumentTextIcon,
    TrashIcon, PhotoIcon, ArrowUpTrayIcon, DocumentIcon, ArrowDownTrayIcon, PaperClipIcon,
    DocumentChartBarIcon // New icon
} from './icons'; 
import { staggerContainer, staggerItem } from '@/motion/variants';
import { useSortedIdeas } from '@/utils/zineExporter';

interface IdeaListProps {
  project: Project;
  onEditIdea: (idea: Idea) => void;
  onCreateNewIdea: () => void;
  onBackToProjects: () => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  onUpdateProject: (updatedProject: Project) => void;
}

type SortOption = 'updatedAt_desc' | 'title_asc' | 'createdAt_asc' | 'createdAt_desc';
const MAX_LOGO_SIZE_MB = 2;
const ALLOWED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
const BLUEPRINT_CARD_ITEM_CLASS = 'blueprint-card-list-item'; // Class for PDF capture

const IdeaList: React.FC<IdeaListProps> = ({ project, onEditIdea, onCreateNewIdea, onBackToProjects, addNotification, onUpdateProject }) => {
  const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('updatedAt_desc');
  const [isExportingProjectZine, setIsExportingProjectZine] = useState(false); // New state
  const logoInputRef = useRef<HTMLInputElement>(null);
  const projectAttachmentInputRef = useRef<HTMLInputElement>(null);
  
  const handleDeleteIdea = () => {
    if (!ideaToDelete) return;
    try {
      const updatedProject = {
        ...project,
        ideas: project.ideas.filter(idea => idea.id !== ideaToDelete.id),
      };
      onUpdateProject(updatedProject);
      addNotification(`Blueprint "${ideaToDelete.title}" disassembled.`, 'success');
      setIdeaToDelete(null);
    } catch (err) {
      addNotification('Failed to disassemble blueprint.', 'error');
      console.error(err);
    }
  };

  const handleExportProject = async () => {
    try {
      await fileService.exportProjectAsZip(project);
      addNotification(`Constellation "${project.name}" export (ZIP) initiated.`, 'success'); // Clarified ZIP
    } catch (error) {
      addNotification(`Failed to export constellation: ${error instanceof Error ? error.message : String(error)}`, 'error'); // Updated
      console.error(error);
    }
  };

  const handleExportProjectZine = async () => {
    if (project.ideas.length === 0) {
      addNotification('This constellation has no blueprints to include in a Zine.', 'info');
      return;
    }
    setIsExportingProjectZine(true);
    addNotification(`Preparing Constellation Zine for "${project.name}"... This may take a moment.`, 'info');
    try {
      await exportViewAsPdfZine({
        pageSelector: `.${BLUEPRINT_CARD_ITEM_CLASS}`, // Target each BlueprintCard's li
        filename: `${fileService.sanitizeFilename(project.name || 'Untitled Project')}_ConstellationZine.pdf`,
      });
      addNotification(`Constellation Zine for "${project.name}" exported successfully.`, 'success');
    } catch (error) {
      addNotification(`Failed to export Constellation Zine: ${error instanceof Error ? error.message : String(error)}`, 'error');
      console.error(error);
    }
    setIsExportingProjectZine(false);
  };


  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      addNotification(`This sigil's material isn't quite right. Try PNG, JPG, or SVG. (Found: ${file.type})`, 'error'); // Updated
      return;
    }
    if (file.size > MAX_LOGO_SIZE_MB * 1024 * 1024) {
      addNotification(`This sigil is too massive for the forge! Max size: ${MAX_LOGO_SIZE_MB}MB.`, 'error'); // Updated
      return;
    }

    try {
      const base64Logo = await fileService.readFileAsBase64(file);
      const updatedProject = { ...project, logo: base64Logo };
      onUpdateProject(updatedProject);
      addNotification('Constellation sigil updated successfully.', 'success'); // Updated
    } catch (error) {
      addNotification('Sigil upload failed. Try a different cosmic image.', 'error'); // Updated
      console.error("Logo upload error:", error);
    }
    if (logoInputRef.current) logoInputRef.current.value = ""; 
  };

  const handleRemoveLogo = () => {
    if (window.confirm("Are you sure you want to clear this constellation's sigil?")) { // Slightly rephrased confirm
      const updatedProject = { ...project, logo: undefined };
      onUpdateProject(updatedProject);
      addNotification('Constellation sigil has been cleared.', 'info'); // Updated
    }
  };

  const processProjectFile = async (file: File): Promise<Attachment | null> => {
    const common = { id: crypto.randomUUID(), name: fileService.sanitizeFilename(file.name), mimeType: file.type, size: file.size };
    if (file.type.startsWith('image/')) return { ...common, type: 'image', content: await fileService.readFileAsBase64(file) };
    if (file.type === 'text/plain' || file.type === 'text/markdown') return { ...common, type: 'text', content: await fileService.readFileAsText(file) };
    return { ...common, type: 'other', content: await fileService.readFileAsBase64(file) };
  };

  const handleProjectFileUpload = useCallback(async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    addNotification('Materializing your artifacts...', 'info'); // Updated
    const newProjectAttachmentsBatch: Attachment[] = [];

    for (const file of Array.from(files)) {
        // No ZIP processing for project-level attachments for simplicity, direct file attachment
        try {
            const attachment = await processProjectFile(file);
            if (attachment) {
                newProjectAttachmentsBatch.push(attachment);
            }
        } catch (err) {
            console.error('Project file process error:', err);
            addNotification(`Failed to process ${file.name}.`, 'error');
        }
    }
    
    if (newProjectAttachmentsBatch.length > 0) {
        // Update attachment handlers to use onUpdateProject
        const updatedProject = {
          ...project,
          attachments: [...(project.attachments || []), ...newProjectAttachmentsBatch],
        };
        onUpdateProject(updatedProject);
        addNotification(`${newProjectAttachmentsBatch.length} support artifact(s) anchored to constellation.`, 'success'); // Updated
    }
    if (projectAttachmentInputRef.current) projectAttachmentInputRef.current.value = "";
  }, [project.id, onUpdateProject, addNotification]);

  const handleDownloadProjectAttachment = (attachment: Attachment) => {
    try {
        const blob = fileService.base64ToBlob(attachment.content, attachment.mimeType);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = attachment.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        addNotification(`Beaming down artifact "${attachment.name}"...`, 'info'); // Updated
    } catch (error) {
        addNotification(`Artifact "${attachment.name}" lost in transit: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error'); // Updated
    }
  };

  const handleDeleteProjectAttachment = (attachmentId: string) => {
    if (window.confirm("Are you sure you want to unlink this artifact from the constellation?")) {
      const updatedProject = {
        ...project,
        attachments: (project.attachments || []).filter(att => att.id !== attachmentId),
      };
      onUpdateProject(updatedProject);
      addNotification('Constellation artifact unlinked.', 'info');
    }
  };

  const getFileIcon = (type: Attachment['type']) => {
    if (type === 'image') return <PhotoIcon className="w-5 h-5 text-theme-accent-primary mr-2 flex-shrink-0" />;
    if (type === 'text') return <DocumentTextIcon className="w-5 h-5 text-theme-accent-primary mr-2 flex-shrink-0" />;
    return <DocumentIcon className="w-5 h-5 text-theme-text-secondary mr-2 flex-shrink-0" />;
  };

  const sortedIdeas = useSortedIdeas(project.ideas, sortOption);
  
  const isActionInProgress = isExportingProjectZine; // Combine other loading states here if any

  return (
    <motion.div 
      className="p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }} 
      transition={{ type: 'spring', stiffness: 70, damping: 20 }}
    >
      {/* Project Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 pb-4 border-b border-theme-border-primary">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <Button onClick={onBackToProjects} variant="ghost" size="sm" className="mb-2" leftIcon={<ArrowLeftIcon className="w-5 h-5"/>} disabled={isActionInProgress}>
            Back to Navigator
          </Button>
          <div className="flex items-center space-x-3 mt-1">
            {project.logo ? (
              <img src={project.logo} alt={`${project.name} logo`} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border-2 border-theme-accent-primary/50 shadow-md" />
            ) : (
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-theme-bg-accent rounded-lg flex items-center justify-center border-2 border-theme-border-primary/50">
                <PhotoIcon className="w-6 h-6 sm:w-8 sm:h-8 text-theme-accent-primary/70" />
              </div>
            )}
            <div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-theme-accent-primary truncate" title={project.name}>
                Constellation: {project.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1.5">
                <input 
                  type="file" 
                  accept=".png,.jpg,.jpeg,.svg" 
                  ref={logoInputRef} 
                  onChange={handleLogoUpload} 
                  className="hidden"
                  id="project-logo-upload-input"
                  aria-label="Upload project logo"
                  disabled={isActionInProgress}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="!text-xs !px-2 !py-1"
                  onClick={() => logoInputRef.current?.click()}
                  leftIcon={<ArrowUpTrayIcon className="w-3.5 h-3.5"/>}
                  title={project.logo ? "Change Constellation Sigil" : "Set Constellation Sigil"}
                  disabled={isActionInProgress}
                >
                  {project.logo ? 'Change Sigil' : 'Set Sigil'}
                </Button>
                {project.logo && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="!text-xs !px-2 !py-1 text-status-error/80 hover:text-status-error"
                    onClick={handleRemoveLogo}
                    leftIcon={<TrashIcon className="w-3.5 h-3.5"/>}
                    title="Clear Constellation Sigil"
                    disabled={isActionInProgress}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 self-start sm:self-center mt-4 sm:mt-0">
          <Button onClick={handleExportProjectZine} variant="outline" size="md" leftIcon={<DocumentChartBarIcon className="w-5 h-5"/>} isLoading={isExportingProjectZine} disabled={isActionInProgress && !isExportingProjectZine} aria-label="Export constellation as PDF Zine">
            Export Zine (PDF)
          </Button>
          <Button onClick={handleExportProject} variant="outline" size="md" leftIcon={<DocumentDuplicateIcon className="w-5 h-5"/>} disabled={isActionInProgress} aria-label="Export constellation as ZIP">
            Export (ZIP)
          </Button>
          <Button onClick={onCreateNewIdea} variant="default" size="md" leftIcon={<PlusCircleIcon className="w-5 h-5"/>} disabled={isActionInProgress} aria-label="Create new blueprint">
            New Blueprint
          </Button>
        </div>
      </div>
      
      {/* Ideas Section */}
      <div className="mb-8">
        <h3 className="text-xl font-sans font-semibold text-theme-text-primary mb-1">Blueprints</h3>
        <p className="text-sm text-theme-text-secondary mb-3">These are the star-charts of your ideas. Malleable. Luminous. Forged.</p>
        {sortedIdeas.length > 0 && (
          <div className="mb-4 flex items-center justify-end">
              <label htmlFor="sort-ideas" className="text-sm text-theme-text-secondary mr-2 font-sans">Arrange Blueprints by:</label>
              <select 
                  id="sort-ideas"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-theme-bg-accent border border-theme-border-primary/50 text-theme-text-primary text-sm rounded-md focus:ring-1 focus:ring-theme-accent-primary focus:border-theme-accent-primary p-2 font-sans"
                  disabled={isActionInProgress}
              >
                  <option value="updatedAt_desc">Most Recently Forged</option>
                  <option value="title_asc">Name (A-Z, Ascending)</option>
                  <option value="createdAt_desc">Ignition Date (Newest First)</option>
                  <option value="createdAt_asc">Ignition Date (Oldest First)</option>
              </select>
          </div>
        )}
        <AnimatePresence>
          {sortedIdeas.length > 0 ? (
            <motion.ul 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {sortedIdeas.map(idea => (
                <motion.li key={idea.id} variants={staggerItem} className={BLUEPRINT_CARD_ITEM_CLASS}>
                  <BlueprintCard 
                    item={idea} 
                    type="idea"
                    onSelect={() => !isActionInProgress && onEditIdea(idea)} 
                    onDelete={() => !isActionInProgress && setIdeaToDelete(idea)}
                  />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.div 
              className="text-center py-12 sm:py-16 font-sans bg-theme-bg-accent/30 rounded-lg border border-theme-border-primary"
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: {delay: 0.2} }}
            >
              <DocumentTextIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-theme-accent-primary/50 mb-4 opacity-70"/>
              <p className="text-lg sm:text-xl text-theme-text-primary">This constellation holds no blueprints yet.</p>
              <p className="text-sm text-theme-text-secondary mt-2">Chart your first blueprint by selecting 'New Blueprint'.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Support Files Section */}
      <div className="mt-10 pt-6 border-t border-theme-border-primary">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-sans font-semibold text-theme-text-primary flex items-center">
                <PaperClipIcon className="w-6 h-6 mr-2 text-theme-accent-primary"/> Constellation Support Artifacts 
                <span className="ml-2 text-sm text-theme-accent-primary">({project.attachments?.length || 0})</span>
            </h3>
            <input 
                type="file" 
                multiple 
                ref={projectAttachmentInputRef} 
                onChange={(e) => handleProjectFileUpload(e.target.files)} 
                className="hidden" 
                id="project-file-upload-input"
                aria-label="Upload files to project"
                disabled={isActionInProgress}
            />
            <Button 
                type="button" 
                variant="outline" 
                size="md" 
                onClick={() => projectAttachmentInputRef.current?.click()}
                leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
                disabled={isActionInProgress}
            >
                Add Artifact(s)
            </Button>
        </div>
        {project.attachments && project.attachments.length > 0 ? (
            <ul className="space-y-3">
            {project.attachments.map(att => (
                <li key={att.id} className="flex items-center justify-between p-3 bg-theme-bg-accent rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center truncate mr-2">
                    {getFileIcon(att.type)}
                    <span className="text-sm text-theme-text-primary truncate" title={att.name}>{att.name}</span>
                    <span className="text-xs text-theme-text-secondary ml-2 flex-shrink-0">({Math.round(att.size / 1024)} KB)</span>
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                    <Button type="button" variant="icon" size="sm" onClick={() => handleDownloadProjectAttachment(att)} title="Download file" disabled={isActionInProgress}>
                    <ArrowDownTrayIcon className="w-4 h-4 text-theme-accent-primary"/>
                    </Button>
                    <Button type="button" variant="icon" size="sm" onClick={() => handleDeleteProjectAttachment(att.id)} title="Delete file" className="text-status-error hover:bg-status-error/10" disabled={isActionInProgress}>
                    <TrashIcon className="w-4 h-4"/>
                    </Button>
                </div>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-sm text-theme-text-secondary text-center py-6 bg-theme-bg-accent/30 rounded-lg border border-theme-border-primary">
                No support artifacts anchored to this constellation yet.
            </p>
        )}
      </div>


      {/* Delete Idea Modal */}
      <Modal
        isOpen={!!ideaToDelete}
        onClose={() => setIdeaToDelete(null)}
        title={`Disassemble Blueprint "${ideaToDelete?.title}"?`}
      >
        <p className="text-theme-text-primary">This blueprint will be returned to stardust. This action is irreversible.</p>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setIdeaToDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteIdea}>Disassemble</Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default IdeaList;
