

// components/ProjectSummoner.tsx
import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import JSZip, { JSZipObject } from 'jszip';
import { Project, Attachment } from '../types';
import * as projectService from '../services/projectService';
import * as aiService from '../services/aiService';
import Button from './Button';
import { CubeTransparentIcon, ArrowUpTrayIcon } from './icons';

interface ProjectSummonerProps {
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ProjectSummoner: React.FC<ProjectSummonerProps> = ({ onClose, onProjectCreated, addNotification }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processZipFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.zip') || file.type !== 'application/zip') {
      addNotification('Invalid file type. Please upload a ZIP archive.', 'error');
      return;
    }

    setIsProcessing(true);
    setProcessingMessage('Unpacking ZIP file...');

    try {
      const zip = await JSZip.loadAsync(file);
      const files: JSZipObject[] = Object.values(zip.files).filter((zipFile: JSZipObject) => !zipFile.dir);

      setProcessingMessage('Scanning for project files...');
      const packageJsonFile = files.find(f => f.name.endsWith('package.json'));
      const appTsxFile = files.find(f => f.name.endsWith('App.tsx'));
      const indexTsxFile = files.find(f => f.name.endsWith('index.tsx') || f.name.endsWith('main.tsx'));


      if (!packageJsonFile || !appTsxFile || !indexTsxFile) {
        addNotification('Project incomplete. Required files (package.json, App.tsx, index.tsx) not found.', 'error');
        setIsProcessing(false);
        return;
      }

      setProcessingMessage('Analyzing project metadata...');
      const packageJsonContent = await packageJsonFile.async('string');
      let projectName = file.name.replace('.zip', '');
      try {
        const parsedPackage = JSON.parse(packageJsonContent);
        projectName = parsedPackage.name || projectName;
      } catch (e) {
        addNotification('Could not parse package.json, using ZIP file name instead.', 'info');
      }

      setProcessingMessage('Creating new project...');
      const newProject = projectService.createProject(projectName);

      setProcessingMessage(`Adding ${files.length} files...`);
      
      const attachmentPromises = files.map(async (zipEntry) => {
          const blob = await zipEntry.async('blob');
          const content = await new Promise<string>((resolve, reject) => {
             const reader = new FileReader();
             reader.onload = () => resolve(reader.result as string);
             reader.onerror = reject;
             reader.readAsDataURL(blob);
          });

          const type: Attachment['type'] = zipEntry.name.match(/\.(png|jpg|jpeg|gif|svg)$/i) ? 'image' : (zipEntry.name.match(/\.(txt|md|json|js|tsx|jsx|html|css)$/i) ? 'text' : 'other');

          return {
              id: crypto.randomUUID(),
              name: zipEntry.name,
              type,
              mimeType: blob.type || 'application/octet-stream',
              content,
              size: blob.size,
          };
      });

      const attachments: Attachment[] = await Promise.all(attachmentPromises);
      
      const updatedProject = projectService.addAttachmentsToProject(newProject.id, attachments);

      if(updatedProject) {
        addNotification(`Project "${updatedProject.name}" imported and saved!`, 'success');

        // Kick off AI summary generation in the background
        if (aiService.isAiEnabled()) {
            setProcessingMessage('Generating AI summary...');
            projectService.addGeneratedSummaryToProject(updatedProject).then(() => {
                addNotification(`AI summary generated for "${updatedProject.name}".`, 'info');
            });
        }
        
        onProjectCreated(updatedProject);
      } else {
         throw new Error("Failed to add attachments to the new project.");
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification(`Failed to import project: ${errorMessage}`, 'error');
      console.error(error);
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [addNotification, onProjectCreated]);

  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (isProcessing) return;
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processZipFile(event.dataTransfer.files[0]);
    }
  }, [isProcessing, processZipFile]);
  
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        processZipFile(event.target.files[0]);
    }
  };

  const handleDragEvents = (event: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isProcessing) setIsDragging(isEntering);
  };
  
  return (
    <div className="p-2">
      <div 
        className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center p-4 transition-colors duration-200
            ${isDragging ? 'border-theme-accent-primary bg-theme-accent-primary/10' : 'border-theme-border-primary hover:border-theme-accent-primary/70'}
            ${isProcessing ? 'cursor-wait bg-theme-bg-accent' : 'cursor-pointer'}
        `}
        onDrop={handleFileDrop}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        <input type="file" accept=".zip,application/zip" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" />
        {isProcessing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <CubeTransparentIcon className="w-16 h-16 text-theme-accent-primary mb-4" />
            </motion.div>
            <p className="text-lg font-semibold text-theme-text-primary">{processingMessage}</p>
          </>
        ) : (
          <>
            <ArrowUpTrayIcon className="w-12 h-12 text-theme-text-secondary mb-3" />
            <p className="text-lg font-semibold text-theme-text-primary">Import Project from ZIP</p>
            <p className="text-sm text-theme-text-secondary">Drag & drop a ZIP file here, or click to select.</p>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="ghost" onClick={onClose} disabled={isProcessing}>Cancel</Button>
      </div>
    </div>
  );
};

export default ProjectSummoner;