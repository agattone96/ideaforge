import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppView, Idea, NotificationType } from './types';
import * as localStorageService from './services/localStorageService';
import { UndoRedoProvider, useUndoRedoContext } from './hooks/useUndoRedo';
import type { Project } from './types';

// Import components
import LandingPage from './components/LandingPage';
import Workbench from './components/Workbench';
import IdeaList from './components/IdeaList';
import IdeaEditor from './components/IdeaEditor';
import NotificationArea from './components/NotificationArea';
import SettingsModal from './components/SettingsModal';
import ContactPanel from './components/ContactPanel';
import Button from './components/Button';
import CosmicCanvas from './rendering/CosmicCanvas'; // Import the new canvas
import { CogIcon, EnvelopeIcon } from './components/icons';
import Modal from './components/Modal';
import AppHeader from './components/AppHeader';

// Import hooks and types for theme
import { useTheme } from './hooks/useTheme';
import { ThemeName } from './styles/theme';

const App: React.FC = () => {
  // Main app state
  const [appView, setAppView] = useState<AppView>('landing');
  const [ideaToEdit, setIdeaToEdit] = useState<Idea | null>(null);

  // UI state
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Theme Management
  const { currentThemeName, setTheme, availableThemes } = useTheme();
  const { state: undoRedoState, set: setProjectsState, undo, redo, canUndo, canRedo } = useUndoRedoContext();
  const {projects} = undoRedoState.present;

  // Load accessibility settings on startup
  useEffect(() => {
    localStorageService.applyStoredAppearanceSettings();
    setPrefersReducedMotion(localStorageService.getReducedMotion());
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('IDEA_FORGE_ONBOARDED')) {
      setShowOnboarding(true);
      localStorage.setItem('IDEA_FORGE_ONBOARDED', 'true');
    }
  }, []);

  // Handlers
  const handleReducedMotionChange = (enabled: boolean) => {
    localStorageService.setReducedMotion(enabled);
    setPrefersReducedMotion(enabled);
  };

  const addNotification = useCallback((message: string, type: NotificationType['type'] = 'info') => {
    const newNotification: NotificationType = { id: crypto.randomUUID(), message, type };
    setNotifications(current => [...current, newNotification]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(current => current.filter(n => n.id !== id));
  }, []);

  const handleEnterForge = () => setAppView('projectManager');

  const handleTryDemo = () => {
    const sampleProject = localStorageService.importSampleProject();
    if (sampleProject) {
      // setCurrentProject(sampleProject);
      setAppView('ideaList');
      addNotification(`Demo project imported! Welcome to "${sampleProject.name}".`, 'success');
    } else {
      addNotification('Could not load sample project. It may already exist.', 'info');
      setAppView('projectManager');
    }
  };

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const currentProject = projects.find(p => p.id === currentProjectId) || null;

  // Update onBackToProjects to clear currentProjectId
  const handleBackToProjects = useCallback(() => {
    setCurrentProjectId(null);
    setIdeaToEdit(null);
    setAppView('projectManager');
  }, []);

  // Update onCreateNewIdea and onEditIdea to set currentProjectId if needed
  const handleCreateNewIdea = useCallback(() => {
    if (!currentProject) {
      addNotification('Select a constellation first to create a new blueprint.', 'error');
      setAppView('projectManager');
      return;
    }
    setIdeaToEdit(null);
    setAppView('ideaEditor');
  }, [currentProject, addNotification]);

  const handleEditIdea = useCallback((idea: Idea) => {
    setIdeaToEdit(idea);
    setAppView('ideaEditor');
  }, []);

  // Handler to create a new project
  const handleCreateProject = useCallback((projectName: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: projectName,
      ideas: [],
      attachments: [],
      logo: undefined,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };
    const updatedProjects = [newProject, ...projects];
    setProjectsState({ projects: updatedProjects });
    localStorageService.saveProjects(updatedProjects);
    setCurrentProjectId(newProject.id);
    setAppView('ideaList');
    addNotification(`Constellation "${newProject.name}" successfully ignited!`, 'success');
  }, [projects, setProjectsState, addNotification]);

  // Handler to update a project (e.g., add/edit idea)
  const handleUpdateProject = useCallback((updatedProject: Project) => {
    const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    setProjectsState({ projects: updatedProjects });
    localStorageService.saveProjects(updatedProjects);
    setCurrentProjectId(updatedProject.id);
  }, [projects, setProjectsState]);

  // Handler to delete a project
  const handleDeleteProject = useCallback((projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjectsState({ projects: updatedProjects });
    localStorageService.saveProjects(updatedProjects);
    setCurrentProjectId(null);
    setAppView('projectManager');
    addNotification('Constellation has faded into the void.', 'success');
  }, [projects, setProjectsState, addNotification]);

  // Handler to add/edit/delete ideas within a project
  const handleSaveIdea = useCallback((updatedProject: Project) => {
    handleUpdateProject(updatedProject);
    setIdeaToEdit(null);
    setAppView('ideaList');
  }, [handleUpdateProject]);

  // Pass new handlers and state to children
  const renderView = () => {
    switch (appView) {
      case 'landing':
        return <LandingPage key="landing" onEnterForge={handleEnterForge} onTryDemo={handleTryDemo} />;
      case 'projectManager':
        return <Workbench 
          key="workbench"
          projects={projects}
          onProjectSelected={(project) => { setCurrentProjectId(project.id); setAppView('ideaList'); }}
          onCreateProject={handleCreateProject}
          onDeleteProject={handleDeleteProject}
          addNotification={addNotification}
          onQuickNewIdea={(project) => { setCurrentProjectId(project.id); setAppView('ideaEditor'); }}
        />;
      case 'ideaList':
        if (!currentProject) { handleBackToProjects(); return null; }
        return <IdeaList 
          key={`ideelist-${currentProject.id}`}
          project={currentProject}
          onEditIdea={handleEditIdea}
          onCreateNewIdea={handleCreateNewIdea}
          onBackToProjects={handleBackToProjects}
          addNotification={addNotification}
          onUpdateProject={handleUpdateProject}
        />;
      case 'ideaEditor':
        if (!currentProject) { handleBackToProjects(); return null; }
        return <IdeaEditor 
          key={`ideaeditor-${ideaToEdit?.id || 'new'}`}
          project={currentProject}
          ideaToEdit={ideaToEdit}
          onSave={handleSaveIdea}
          onCancel={handleBackToProjects}
          addNotification={addNotification}
        />;
      default:
        return <LandingPage key="default-landing" onEnterForge={handleEnterForge} onTryDemo={handleTryDemo} />;
    }
  };

  // Instead, manage all projects in undo/redo context
  const [initialProjects] = useState<Project[]>(() => localStorageService.getProjects());

  // Add undo/redo UI controls
  return (
    <UndoRedoProvider initialState={{ projects: initialProjects }}>
      <div className="font-body text-theme-text-primary min-h-screen">
        <CosmicCanvas />
        <AppHeader />
        <main id="main-content" className="relative z-10">
          <AnimatePresence mode="wait">
            {renderView()}
          </AnimatePresence>
        </main>
        {/* Undo/Redo Controls */}
        <div className="fixed bottom-4 left-4 z-[60] flex gap-2">
          <Button variant="glow" size="md" onClick={undo} disabled={!canUndo} aria-label="Undo" title="Undo (Ctrl+Z)">
            ⎌ Undo
          </Button>
          <Button variant="glow" size="md" onClick={redo} disabled={!canRedo} aria-label="Redo" title="Redo (Ctrl+Y)">
            ↻ Redo
          </Button>
        </div>
        {appView !== 'landing' && (
          <>
            <div className="fixed bottom-4 right-[calc(4rem+1rem)] z-[60]">
              <Button variant="glow" size="lg" className="rounded-full !p-3 shadow-lg" onClick={() => setIsSettingsModalOpen(true)} aria-label="Open Settings" prefersReducedMotion={prefersReducedMotion}>
                <CogIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="fixed bottom-4 right-4 z-[60]">
              <Button variant="glow" size="lg" className="rounded-full !p-3 shadow-lg" onClick={() => setIsContactPanelOpen(true)} aria-label="Open Contact Panel" prefersReducedMotion={prefersReducedMotion}>
                <EnvelopeIcon className="w-6 h-6" />
              </Button>
            </div>
          </>
        )}

        <NotificationArea notifications={notifications} onDismiss={dismissNotification} />
        
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          addNotification={addNotification}
          currentTheme={currentThemeName}
          onThemeChange={(theme: ThemeName) => setTheme(theme)}
          availableThemes={availableThemes}
          prefersReducedMotion={prefersReducedMotion}
          onReducedMotionChange={handleReducedMotionChange}
        />
        
        <ContactPanel
          isOpen={isContactPanelOpen}
          onClose={() => setIsContactPanelOpen(false)}
          addNotification={addNotification}
        />

        {showOnboarding && (
          <Modal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} title="Welcome to IdeaForge!">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Welcome to IdeaForge 🚀</h2>
              <p>Start by creating your first constellation (project) or try the demo. Use the settings to personalize your experience. Need help? Click the contact button!</p>
              <Button variant="default" onClick={() => setShowOnboarding(false)} aria-label="Close onboarding">Get Started</Button>
            </div>
          </Modal>
        )}
      </div>
    </UndoRedoProvider>
  );
};

export default App;
