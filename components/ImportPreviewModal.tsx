
// components/ImportPreviewModal.tsx
import React from 'react';
import { Project } from '../types';
import Modal from './Modal';
import Button from './Button';
import BlueprintCard from './BlueprintCard';
import { staggerContainer, staggerItem } from '../motion/variants';
import { motion } from 'framer-motion';

interface ImportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmImport: (jsonToImport: string) => void;
  projects: Project[];
  jsonToImport: string;
}

const ImportPreviewModal: React.FC<ImportPreviewModalProps> = ({
  isOpen,
  onClose,
  onConfirmImport,
  projects,
  jsonToImport,
}) => {
  const totalIdeas = projects.reduce((acc, p) => acc + (p.ideas?.length || 0), 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Preview"
      size="xl"
      isGlassmorphic
      className="!rounded-2xl"
    >
      <div className="text-theme-text-primary">
        <p className="mb-4 text-sm text-theme-text-secondary font-body">
          Found <span className="font-bold text-theme-accent-primary">{projects.length}</span> project(s) and <span className="font-bold text-theme-accent-primary">{totalIdeas}</span> idea(s) in the backup file.
        </p>
        <p className="mb-6 text-xs text-theme-text-secondary bg-theme-bg-accent p-2 rounded-md border border-theme-border-primary/50">
          Note: Importing will merge this data with your existing projects. If a project ID from the file matches an existing project, the existing one will be <span className="font-bold text-status-warning">completely overwritten</span> by the version from the backup. This action cannot be undone.
        </p>
        <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {projects.length > 0 ? (
            <motion.ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {projects.map(project => (
                <motion.li key={project.id} variants={staggerItem}>
                    <BlueprintCard item={project} type="project" isPreview />
                </motion.li>
                ))}
            </motion.ul>
          ) : (
             <p className="text-center text-theme-text-secondary py-10 font-sans">
                The selected file does not contain any valid projects.
            </p>
          )}
        </div>
      </div>
      <footer className="mt-6 flex justify-end space-x-3">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="default" onClick={() => onConfirmImport(jsonToImport)} disabled={projects.length === 0}>
          Confirm & Import
        </Button>
      </footer>
    </Modal>
  );
};

export default ImportPreviewModal;