

// components/Workbench.tsx (Previously ProjectManager.tsx)
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import * as projectService from '../services/projectService';
import Button from './Button';
import TextInput from './TextInput';
import Modal from './Modal';
import BlueprintCard from './BlueprintCard'; // New card component
import ProjectSummoner from './ProjectSummoner'; // Import new component
import { PlusCircleIcon, StarIcon, DocumentTextIcon, CubeTransparentIcon } from './icons'; // Added DocumentTextIcon for placeholder and CubeTransparentIcon
import { staggerContainer, staggerItem } from '../motion/variants';

interface WorkbenchProps {
  onProjectSelected: (project: Project) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  onQuickNewIdea: (project: Project) => void; 
}

const Workbench: React.FC<WorkbenchProps> = ({ onProjectSelected, addNotification, onQuickNewIdea }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSummonerModalOpen, setIsSummonerModalOpen] = useState(false); // New state for Summoner modal
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProjects = useCallback(() => {
    setProjects(projectService.getProjects());
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = () => {
    if (newProjectName.trim() === '') {
      addNotification('Project name cannot be empty.', 'error'); // Updated
      return;
    }
    try {
      const newProject = projectService.createProject(newProjectName.trim());
      fetchProjects(); 
      setNewProjectName('');
      setIsCreateModalOpen(false);
      addNotification(`Project "${newProject.name}" successfully created!`, 'success'); // Updated
      onProjectSelected(newProject); 
    } catch (error) {
      addNotification('Failed to create project.', 'error'); // Updated
      console.error(error);
    }
  };

  const handleDeleteProject = () => {
    if (!projectToDelete) return;
    try {
      projectService.deleteProject(projectToDelete.id);
      fetchProjects(); 
      addNotification(`Project "${projectToDelete.name}" has been deleted.`, 'success'); // Updated
      setProjectToDelete(null);
    } catch (error) {
      addNotification('Failed to delete project.', 'error'); // Updated
      console.error(error);
    }
  };

  const handleToggleFavorite = useCallback((projectId: string) => {
    projectService.toggleFavoriteProject(projectId);
    fetchProjects(); 
  }, [fetchProjects]);
  
  const filteredProjects = React.useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  // Handler for when a project is successfully summoned
  const handleProjectSummoned = (project: Project) => {
    fetchProjects();
    setIsSummonerModalOpen(false);
    onProjectSelected(project);
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
          Project Workbench
        </h1>
        <div className="flex space-x-2">
            <Button 
                onClick={() => setIsSummonerModalOpen(true)}
                variant="outline"
                size="lg"
                leftIcon={<CubeTransparentIcon className="w-5 h-5" />}
                title="Import a project from a ZIP file"
            >
                Import Project
            </Button>
            <Button 
                id="new-constellation-button"
                onClick={() => {
                    setNewProjectName(''); 
                    setIsCreateModalOpen(true);
                }} 
                variant="default" 
                size="lg"
                leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
                title="Begin a new project."
            >
                New Project
            </Button>
        </div>
      </div>
      
      <div className="mb-6 sm:mb-8">
        <TextInput
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search projects"
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
            {searchTerm ? "No projects match your search." : "Your workspace is empty. Ready to start your first project?"}
          </motion.p>
        )}
      </AnimatePresence>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Project Manager"
      >
        {projects.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-sans font-medium text-theme-accent-primary mb-2">Open Existing Project</h4>
            <ul className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {projects.map(p => (
                <li 
                  key={p.id} 
                  className="text-theme-text-primary hover:text-theme-accent-primary p-2 sm:p-2.5 bg-theme-bg-accent/70 hover:bg-theme-bg-accent rounded-lg cursor-pointer transition-colors duration-150 flex justify-between items-center font-body"
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
            {projects.length > 0 ? "Or Create a New Project" : "Create Your First Project"}
          </h4>
          <TextInput
            label="Project Name"
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
        isOpen={isSummonerModalOpen}
        onClose={() => setIsSummonerModalOpen(false)}
        title="Import Project"
      >
        <ProjectSummoner 
            onClose={() => setIsSummonerModalOpen(false)}
            onProjectCreated={handleProjectSummoned}
            addNotification={addNotification}
        />
      </Modal>

      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title={`Delete Project "${projectToDelete?.name}"?`}
      >
        <p className="text-theme-text-primary">This project and all its ideas will be permanently deleted. This action is irreversible.</p>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => setProjectToDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteProject}>Delete Project</Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Workbench;