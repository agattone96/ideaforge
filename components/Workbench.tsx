// components/Workbench.tsx (Previously ProjectManager.tsx)
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import Button from './Button';
import TextInput from './TextInput';
import Modal from './Modal';
import BlueprintCard from './BlueprintCard'; // New card component
import { PlusCircleIcon, StarIcon, DocumentTextIcon } from './icons'; // Added DocumentTextIcon for placeholder
import { staggerContainer, staggerItem } from '../motion/variants';

interface WorkbenchProps {
  projects: Project[];
  onProjectSelected: (project: Project) => void;
  onCreateProject: (projectName: string) => void;
  onDeleteProject: (projectId: string) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  onQuickNewIdea: (project: Project) => void; 
}

const Workbench: React.FC<WorkbenchProps> = ({ projects, onProjectSelected, onCreateProject, onDeleteProject, addNotification, onQuickNewIdea }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [projects, searchTerm]);

  // Memoize handlers to avoid unnecessary re-renders
  const handleCreateProject = useCallback(() => {
    if (newProjectName.trim() === '') {
      addNotification('Constellation name cannot be empty.', 'error');
      return;
    }
    try {
      onCreateProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreateModalOpen(false);
    } catch (error) {
      addNotification('Failed to spark new constellation. The cosmos resists.', 'error');
      console.error(error);
    }
  }, [newProjectName, addNotification, onCreateProject]);

  const handleDeleteProject = useCallback(() => {
    if (!projectToDelete) return;
    try {
      onDeleteProject(projectToDelete.id);
      setProjectToDelete(null);
    } catch (error) {
      addNotification('This constellation clings to existence. Deletion failed.', 'error');
      console.error(error);
    }
  }, [projectToDelete, addNotification, onDeleteProject]);

  const handleToggleFavorite = (_projectId: string) => {
    // Assuming there's a prop method for toggling favorite as well
    // onToggleFavorite(projectId);
  };
  
  return (
    <motion.div 
      className="p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-theme-accent-primary mb-3 sm:mb-0">
          Constellation Navigator
        </h1>
        <Button 
          onClick={() => {
            setNewProjectName(''); 
            setIsCreateModalOpen(true);
          }} 
          variant="default" 
          size="lg"
          leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
          title="Begin charting a new constellation."
          aria-label="Create new constellation"
        >
          New Constellation
        </Button>
      </div>
      
      <div className="mb-6 sm:mb-8">
        <TextInput
          placeholder="Search constellations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search constellations"
          // TextInput now uses theme vars internally
        />
      </div>

      <AnimatePresence>
        {filteredProjects.length > 0 ? (
          <motion.ul 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map(project => (
              <motion.li key={project.id} variants={staggerItem}>
                <BlueprintCard
                  item={project}
                  type="project"
                  onSelect={() => onProjectSelected(project)}
                  onQuickNewIdea={onQuickNewIdea}
                  onDelete={() => setProjectToDelete(project)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.p 
            className="text-center text-theme-text-secondary py-10 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: {delay: 0.2} }}
          >
            {searchTerm ? "No constellations match your cosmic query." : "Your forge is quiet, star-smith. Ready to ignite your first constellation?"}
          </motion.p>
        )}
      </AnimatePresence>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Constellation Control"
      >
        {projects.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-sans font-medium text-theme-accent-primary mb-2">Navigate Existing Constellations</h4>
            <ul className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {projects.map(p => (
                <li 
                  key={p.id} 
                  className="text-theme-text-primary hover:text-theme-accent-primary p-2.5 bg-theme-bg-accent/70 hover:bg-theme-bg-accent rounded-lg cursor-pointer transition-colors duration-150 flex justify-between items-center font-body"
                  onClick={() => {
                    onProjectSelected(p);
                    setIsCreateModalOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onProjectSelected(p); setIsCreateModalOpen(false);}}}
                >
                  <div className="flex items-center space-x-2 truncate">
                    {p.logo ? (
                      <img src={p.logo} alt="" className="w-6 h-6 object-cover rounded-sm flex-shrink-0 border border-theme-accent-primary/20" />
                    ) : (
                      <DocumentTextIcon className="w-6 h-6 text-theme-accent-primary/50 flex-shrink-0" />
                    )}
                    <span className="truncate">{p.name}</span>
                  </div>
                  {p.isFavorite && <StarIcon className="w-4 h-4 text-theme-accent-primary flex-shrink-0" isFilled />}
                </li>
              ))}
            </ul>
            <hr className="my-4 border-theme-border-primary/50" />
          </div>
        )}
        <div>
          <h4 className="text-md font-sans font-medium text-theme-accent-primary mb-2">
            {projects.length > 0 ? "Or Ignite a New Constellation" : "Ignite Your First Constellation"}
          </h4>
          <TextInput
            label="Constellation Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="e.g., Nova Navigator App"
            autoFocus={projects.length === 0} 
            onKeyDown={(e) => { if (e.key === 'Enter' && newProjectName.trim() !== '') { handleCreateProject();}}}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          <Button 
            variant="default" 
            onClick={handleCreateProject} 
            disabled={newProjectName.trim() === ''}
          >
            Create
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title={`Dissolve Constellation "${projectToDelete?.name}"?`}
      >
        <p className="text-theme-text-primary">This constellation and all its blueprints will fade into cosmic dust. This action is irreversible.</p>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setProjectToDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteProject}>Delete Constellation</Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Workbench;