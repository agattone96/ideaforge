

import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppView, Project, Idea, NotificationType } from './types';
import * as projectService from './services/projectService';
import * as settingsService from './services/settingsService';

// Import components
import LandingPage from './components/LandingPage';
import Workbench from './components/Workbench';
import IdeaList from './components/IdeaList';
import IdeaEditor from './components/IdeaEditor';
import NotificationArea from './components/NotificationArea';
import SettingsModal from './components/SettingsModal';
import ContactPanel from './components/ContactPanel';
import Button from './components/Button';
import OnboardingGuide from './components/OnboardingGuide';
import { CogIcon, EnvelopeIcon } from './components/icons';

// Import hooks and types for theme
import { useTheme } from './hooks/useTheme';
import { ThemeName } from './styles/theme';

const App: React.FC = () => {
  // Main app state
  const [appView, setAppView] = useState<AppView>('landing');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [ideaToEdit, setIdeaToEdit] = useState<Idea | null>(null);

  // UI state
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(false);
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);

  // Theme Management
  const { currentThemeName, setTheme, availableThemes } = useTheme();

  // Load accessibility settings on startup
  useEffect(() => {
    settingsService.applyStoredAppearanceSettings();
    setPrefersReducedMotion(settingsService.getReducedMotion());
  }, []);

  // Handlers
  const handleReducedMotionChange = (enabled: boolean) => {
    settingsService.setReducedMotion(enabled);
    setPrefersReducedMotion(enabled);
  };

  const addNotification = useCallback((message: string, type: NotificationType['type'] = 'info') => {
    const newNotification: NotificationType = { id: crypto.randomUUID(), message, type };
    setNotifications(current => [...current, newNotification]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(current => current.filter(n => n.id !== id));
  }, []);

  const handleEnterForge = () => {
    const isFirst = settingsService.isFirstVisit();
    setAppView('projectManager');
    if (isFirst) {
      setIsOnboardingVisible(true);
      settingsService.setFirstVisitDone();
    }
  };

  const handleTryDemo = async () => {
    setIsGeneratingDemo(true);
    addNotification('Creating a demo project for you... please wait.', 'info');
    try {
      const sampleProject = await projectService.importSampleProject();
      if (sampleProject) {
        settingsService.setFirstVisitDone();
        setCurrentProject(sampleProject);
        setAppView('ideaList');
        addNotification(`Demo project "${sampleProject.name}" is ready!`, 'success');
      } else {
        addNotification('Could not load the demo project. Please try again.', 'error');
        setAppView('projectManager');
      }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        addNotification(`Demo creation failed: ${errorMessage}`, 'error');
        console.error("Demo creation failed:", error);
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  const handleBackToProjects = useCallback(() => {
    setCurrentProject(null);
    setIdeaToEdit(null);
    setAppView('projectManager');
  }, []);

  const handleProjectSelected = useCallback((project: Project) => {
    setCurrentProject(project);
    setAppView('ideaList');
  }, []);

  const handleCreateNewIdea = () => {
    if (!currentProject) {
      addNotification('Select a project first to create a new idea.', 'error');
      setAppView('projectManager');
      return;
    }
    setIdeaToEdit(null);
    setAppView('ideaEditor');
  };

  const handleQuickNewIdea = useCallback((project: Project) => {
    setCurrentProject(project);
    setIdeaToEdit(null);
    setAppView('ideaEditor');
  }, []);

  const handleEditIdea = (idea: Idea) => {
    setIdeaToEdit(idea);
    setAppView('ideaEditor');
  };

  const handleSaveIdea = (updatedProject: Project) => {
    setCurrentProject(updatedProject);
    setIdeaToEdit(null);
    setAppView('ideaList');
  };

  const handleCancelEdit = () => {
    setIdeaToEdit(null);
    setAppView('ideaList');
  };

  const refreshProject = useCallback((projectId: string) => {
    const updatedProject = projectService.getProjectById(projectId);
    if (updatedProject) {
      setCurrentProject(updatedProject);
    } else {
      addNotification('The project could not be found.', 'info');
      handleBackToProjects();
    }
  }, [handleBackToProjects, addNotification]);

  const renderView = () => {
    switch (appView) {
      case 'landing':
        return <LandingPage key="landing" onEnterForge={handleEnterForge} onTryDemo={handleTryDemo} isGeneratingDemo={isGeneratingDemo} />;
      case 'projectManager':
        return <Workbench key="workbench" onProjectSelected={handleProjectSelected} addNotification={addNotification} onQuickNewIdea={handleQuickNewIdea} />;
      case 'ideaList':
        if (!currentProject) { handleBackToProjects(); return null; }
        return <IdeaList key={`ideelist-${currentProject.id}`} project={currentProject} onEditIdea={handleEditIdea} onCreateNewIdea={handleCreateNewIdea} onBackToProjects={handleBackToProjects} addNotification={addNotification} refreshProject={refreshProject} />;
      case 'ideaEditor':
        if (!currentProject) { handleBackToProjects(); return null; }
        return <IdeaEditor key={`ideaeditor-${ideaToEdit?.id || 'new'}`} project={currentProject} ideaToEdit={ideaToEdit} onSave={handleSaveIdea} onCancel={handleCancelEdit} addNotification={addNotification} />;
      default:
        return <LandingPage key="default-landing" onEnterForge={handleEnterForge} onTryDemo={handleTryDemo} isGeneratingDemo={isGeneratingDemo} />;
    }
  };

  return (
    <div className="font-body text-theme-text-primary min-h-screen">
      <main id="main-content" className="relative z-10">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      {appView !== 'landing' && (
        <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-center space-y-3">
            <Button id="settings-button" variant="glow" size="lg" className="rounded-full !p-3 shadow-lg" onClick={() => setIsSettingsModalOpen(true)} aria-label="Open Settings" prefersReducedMotion={prefersReducedMotion}>
              <CogIcon className="w-6 h-6" />
            </Button>
            <Button variant="glow" size="lg" className="rounded-full !p-3 shadow-lg" onClick={() => setIsContactPanelOpen(true)} aria-label="Open Contact Panel" prefersReducedMotion={prefersReducedMotion}>
              <EnvelopeIcon className="w-6 h-6" />
            </Button>
        </div>
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
      />
      
      <OnboardingGuide
        isOpen={isOnboardingVisible}
        onComplete={() => setIsOnboardingVisible(false)}
      />
    </div>
  );
};

export default App;