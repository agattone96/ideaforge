

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Modal from './Modal';
import Button from './Button';
import { Project, NotificationType } from '../types';
import * as projectService from '../services/projectService';
import * as aiService from '../services/aiService';
import * as settingsService from '../services/settingsService';
import { 
    ArrowDownTrayIcon, ArrowUpTrayIcon, SparklesIcon, TrashIcon, CogIcon,
    AdjustmentsHorizontalIcon, EyeSlashIcon,
    SunIcon, MoonIcon, SquaresPlusIcon, PaletteIcon
} from './icons';
import { ThemeName } from '../styles/theme';
import ImportPreviewModal from './ImportPreviewModal'; // Import the new preview modal

const sectionContainerVariants: Variants = {
  hidden: { opacity: 1 }, // Parent is visible
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 15 },
  },
};

const SettingItem: React.FC<{title: string; description?: string; children: React.ReactNode; className?: string}> = ({ title, description, children, className }) => (
  <div className={`py-3 ${className || ''}`}>
    <h5 className="font-semibold font-display text-theme-text-primary mb-1">{title}</h5>
    {description && <p className="text-xs text-theme-text-secondary mb-2 max-w-prose">{description}</p>}
    <div className="mt-2">{children}</div>
  </div>
);

const Section: React.FC<{title: string; children: React.ReactNode; className?: string; icon?: React.ReactNode}> = ({title, children, className, icon}) => (
    <motion.div variants={sectionItemVariants} className={`py-4 ${className || ''}`}>
      <div className="flex items-center mb-3">
        {icon && <span className="mr-2 text-theme-accent-primary">{icon}</span>}
        <h4 className="font-display font-semibold text-theme-accent-primary text-lg">{title}</h4>
      </div>
      <div className="font-body space-y-3">{children}</div>
    </motion.div>
  );

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNotification: (message: string, type: NotificationType['type']) => void;
  currentTheme: ThemeName;
  onThemeChange: (themeName: ThemeName) => void;
  availableThemes: ThemeName[];
  prefersReducedMotion: boolean;
  onReducedMotionChange: (enabled: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
    isOpen, 
    onClose, 
    addNotification,
    currentTheme,
    onThemeChange,
    availableThemes,
    prefersReducedMotion,
    onReducedMotionChange,
}) => {
  const [aiStatus, setAiStatus] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [showWelcomeToggle, setShowWelcomeToggle] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [accentColor, setAccentColorState] = useState(settingsService.getAccentColor());
  const [fontSizeMultiplier, setFontSizeMultiplierState] = useState(settingsService.getFontSizeMultiplier());
  const [highContrastMode, setHighContrastModeState] = useState(settingsService.getHighContrastMode());
  const [listDensity, setListDensityState] = useState(settingsService.getListDensity());

  // State for import preview
  const [projectsToPreview, setProjectsToPreview] = useState<Project[] | null>(null);
  const [jsonToImport, setJsonToImport] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAiStatus(aiService.isAiEnabled());
      setTestResult(null); 
      setShowWelcomeToggle(settingsService.getShowWelcomeOnNextLaunchPreference());
      
      setAccentColorState(settingsService.getAccentColor());
      setFontSizeMultiplierState(settingsService.getFontSizeMultiplier());
      setHighContrastModeState(settingsService.getHighContrastMode());
      setListDensityState(settingsService.getListDensity());
    } else {
      // Reset preview state when main modal closes
      setProjectsToPreview(null);
      setJsonToImport(null);
    }
  }, [isOpen]);

  const handleClearAllData = () => {
    if (window.confirm("CONFIRM: Delete ALL local data? This action is final and cannot be undone.")) {
      projectService.deleteAllProjects(); 
      addNotification("All local data has been deleted. The application will now reload.", 'success');
      onClose();
      setTimeout(() => window.location.reload(), 1500); 
    }
  };

  const handleTestAiConnection = async () => {
    setIsTestingAi(true);
    setTestResult("Testing connection...");
    const result = await aiService.testAiConnection();
    if (result.success) {
      setTestResult(`Connection successful! Response: "${result.data || "OK"}"`);
      addNotification("AI connection test successful.", 'success');
    } else {
      setTestResult(`Connection failed: ${result.message}`);
      addNotification(`AI connection failed: ${result.message}`, 'error');
    }
    setIsTestingAi(false);
  };
  
  const handleDownloadAllData = () => {
    try {
      const jsonData = projectService.getAllProjectsAsJson();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `IdeaForge_Backup_${timestamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addNotification("Full data backup successfully downloaded.", 'success');
    } catch (error) {
      addNotification("Data backup failed to initiate.", 'error');
      console.error("Error downloading data:", error);
    }
  };

  const handleImportDataSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const validationResult = projectService.validateProjectsJson(jsonString);
        if (validationResult.success && validationResult.data) {
          setProjectsToPreview(validationResult.data);
          setJsonToImport(jsonString);
        } else {
          addNotification(`Backup file is invalid: ${validationResult.error}`, 'error');
        }
      } catch (error) {
        addNotification(`Backup import failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
      }
    };
    reader.readAsText(file);
    if(fileInputRef.current) fileInputRef.current.value = ""; 
  };
  
  const handleConfirmImport = (jsonToImport: string) => {
    const importResult = projectService.importProjectsFromJson(jsonToImport);
     if (importResult.success) {
        addNotification(`${importResult.message} The application will now reload.`, 'success');
        setProjectsToPreview(null); // Close preview modal
        onClose(); // Close settings modal
        setTimeout(() => window.location.reload(), 1500);
    } else {
        addNotification(`Backup import failed: ${importResult.message}`, 'error');
    }
  };

  const handleWelcomeToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setShowWelcomeToggle(isChecked);
    settingsService.setShowWelcomeOnNextLaunchPreference(isChecked);
    addNotification(`Welcome screen will ${isChecked ? 'show' : 'be skipped'} on next launch.`, 'info');
  };

  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setAccentColorState(newColor);
    settingsService.setAccentColor(newColor);
    addNotification(`Accent color updated.`, 'info');
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMultiplier = parseFloat(e.target.value);
    setFontSizeMultiplierState(newMultiplier);
    settingsService.setFontSizeMultiplier(newMultiplier);
    addNotification(`Global text size set to ${Math.round(newMultiplier * 100)}%.`, 'info');
  };

  const handleHighContrastToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    setHighContrastModeState(isEnabled);
    settingsService.setHighContrastMode(isEnabled);
    addNotification(`High-contrast mode ${isEnabled ? 'enabled' : 'disabled'}.`, 'info');
  };

  const handleReducedMotionToggleInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    onReducedMotionChange(isEnabled); // Update App state
    addNotification(`Motion effects ${isEnabled ? 'reduced' : 'enabled'}.`, 'info');
  };

  const handleListDensityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDensity = e.target.value as 'compact' | 'spacious';
    setListDensityState(newDensity);
    settingsService.setListDensity(newDensity);
    addNotification(`List view density set to ${newDensity}.`, 'info');
  };
  
  return (
    <>
    <Modal 
        isOpen={isOpen && !projectsToPreview} // Only show if not previewing
        onClose={onClose} 
        title="Settings" 
        size="xl"
        isGlassmorphic
        prefersReducedMotion={prefersReducedMotion}
        className="!rounded-2xl shadow-2xl shadow-black/30"
    >
      <p className="text-sm text-theme-text-secondary mb-4 -mt-2">
        Fine-tune your experience. Adjust the interface, manage your data, and configure AI features.
      </p>
      <motion.div 
        variants={sectionContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1 divide-y divide-theme-border-primary/50 text-theme-text-primary text-sm max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        
        <Section title="Interface & Theme" icon={<PaletteIcon className="w-5 h-5"/>}>
          <SettingItem title="Active Theme" description="Select your preferred visual theme for the application.">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableThemes.map(theme => (
                <Button
                  key={theme}
                  variant={currentTheme === theme ? 'glow' : 'outline'}
                  size="md"
                  onClick={() => onThemeChange(theme)}
                  className="w-full capitalize !font-body focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg-secondary"
                  prefersReducedMotion={prefersReducedMotion}
                >
                  {theme === 'dark' && <MoonIcon className="w-4 h-4 mr-2" />}
                  {theme === 'light' && <SunIcon className="w-4 h-4 mr-2" />}
                  {theme === 'cosmic' && <SparklesIcon className="w-4 h-4 mr-2" />}
                  {theme}
                </Button>
              ))}
            </div>
          </SettingItem>
           <SettingItem title="Accent Color" description="Manually override the primary accent color for the current theme.">
            <div className="flex items-center space-x-3">
              <input 
                type="color" 
                value={accentColor} 
                onChange={handleAccentColorChange}
                className="w-10 h-10 p-0 border-none rounded-lg cursor-pointer bg-theme-bg-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg-accent focus-visible:ring-theme-accent-primary"
                title="Select accent color"
              />
              <div className="font-mono text-sm p-2 bg-theme-bg-accent rounded-md border border-theme-border-primary/50">{accentColor.toUpperCase()}</div>
            </div>
          </SettingItem>
        </Section>

        <Section title="Accessibility" icon={<AdjustmentsHorizontalIcon className="w-5 h-5"/>}>
          <SettingItem title="Global Text Size" description="Adjust the base font size for all text in the application.">
            <div className="flex items-center space-x-3">
               <input 
                type="range" 
                min="0.8" 
                max="1.3" 
                step="0.05" 
                value={fontSizeMultiplier} 
                onChange={handleFontSizeChange}
                className="w-full h-2 bg-theme-bg-accent rounded-lg appearance-none cursor-pointer accent-theme-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg-accent focus-visible:ring-theme-accent-primary"
              />
              <span className="text-sm font-mono w-14 text-center p-1 bg-theme-bg-accent rounded-md border border-theme-border-primary/50">{Math.round(fontSizeMultiplier * 100)}%</span>
            </div>
          </SettingItem>
          <SettingItem title="High-Contrast Mode" description="Increases text-to-background contrast for better legibility.">
             <label htmlFor="highContrastToggle" className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="highContrastToggle"
                checked={highContrastMode}
                onChange={handleHighContrastToggle}
                className="h-4 w-4 shrink-0 rounded border-2 border-theme-border-primary bg-theme-bg-secondary text-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary focus:ring-offset-2 focus:ring-offset-theme-bg-secondary checked:bg-theme-accent-primary checked:border-transparent cursor-pointer mr-3"
              />
              Enable high-contrast mode
            </label>
          </SettingItem>
          <SettingItem title="Reduce Animations" description="Disables or reduces UI motion for a calmer experience.">
            <label htmlFor="reducedMotionToggleSettings" className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="reducedMotionToggleSettings"
                checked={prefersReducedMotion}
                onChange={handleReducedMotionToggleInternal}
                className="h-4 w-4 shrink-0 rounded border-2 border-theme-border-primary bg-theme-bg-secondary text-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary focus:ring-offset-2 focus:ring-offset-theme-bg-secondary checked:bg-theme-accent-primary checked:border-transparent cursor-pointer mr-3"
              />
              Stabilize motion (reduce animations)
            </label>
          </SettingItem>
        </Section>

        <Section title="Layout & Density" icon={<SquaresPlusIcon className="w-5 h-5"/>}>
           <SettingItem title="List View Density" description="Choose between more compact or spacious layouts for project and idea lists.">
            <select 
                value={listDensity}
                onChange={handleListDensityChange}
                className="w-full sm:w-2/3 p-2 rounded-lg bg-theme-bg-accent border border-theme-border-primary hover:border-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary focus:border-theme-accent-primary text-theme-text-primary font-body transition-colors"
            >
                <option value="spacious">Spacious (Default)</option>
                <option value="compact">Compact</option>
            </select>
          </SettingItem>
        </Section>
        
        <Section title="System & Data" icon={<CogIcon className="w-5 h-5"/>} className="pt-6">
            <SettingItem title="Welcome Screen" description="Control whether the welcome screen appears on application launch.">
                <label htmlFor="showWelcomeToggleSystem" className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="showWelcomeToggleSystem"
                        checked={showWelcomeToggle}
                        onChange={handleWelcomeToggleChange}
                        className="h-4 w-4 shrink-0 rounded border-2 border-theme-border-primary bg-theme-bg-secondary text-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary focus:ring-offset-2 focus:ring-offset-theme-bg-secondary checked:bg-theme-accent-primary checked:border-transparent cursor-pointer mr-3"
                    />
                    Show on next launch
                </label>
            </SettingItem>

            <SettingItem title="AI Features (Gemini)" description={
                aiStatus
                ? "AI features are enabled."
                : "AI features are disabled. An API key is required in your setup."
            }>
                {aiStatus && (
                    <div className="mt-2">
                    <Button onClick={handleTestAiConnection} variant="outline" size="sm" disabled={isTestingAi} leftIcon={<SparklesIcon className={`w-4 h-4 ${isTestingAi ? 'animate-spin' : ''}`} />} prefersReducedMotion={prefersReducedMotion}>
                        {isTestingAi ? 'Connecting...' : 'Test AI Connection'}
                    </Button>
                    {testResult && <p className={`text-xs mt-2 p-2 rounded ${testResult.startsWith("Connection successful") ? 'bg-status-success/10 text-status-success' : 'bg-status-error/10 text-status-error'}`}>{testResult}</p>}
                    </div>
                )}
            </SettingItem>

            <SettingItem title="Backup & Restore" description="Export all your projects and ideas to a JSON file, or restore from a previous backup.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button variant="outline" onClick={handleDownloadAllData} size="md" leftIcon={<ArrowDownTrayIcon className="w-5 h-5"/>} prefersReducedMotion={prefersReducedMotion}>
                        Backup All Data
                    </Button>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} size="md" leftIcon={<ArrowUpTrayIcon className="w-5 h-5"/>} prefersReducedMotion={prefersReducedMotion}>
                        Import from Backup
                    </Button>
                    <input type="file" accept=".json" ref={fileInputRef} onChange={handleImportDataSelect} className="hidden" />
                </div>
            </SettingItem>

            <SettingItem title="Delete All Data" description="Permanently delete all projects, ideas, and settings from this browser. This action is irreversible.">
                 <Button variant="danger" onClick={handleClearAllData} size="md" leftIcon={<TrashIcon className="w-5 h-5"/>} prefersReducedMotion={prefersReducedMotion}>
                    Delete All Local Data
                </Button>
            </SettingItem>
        </Section>
      </motion.div>
      <footer className="mt-8 flex justify-end">
        <Button variant="default" onClick={onClose} size="lg" prefersReducedMotion={prefersReducedMotion}>Apply & Close</Button>
      </footer>
    </Modal>
    
    {projectsToPreview && jsonToImport && (
        <ImportPreviewModal
          isOpen={!!projectsToPreview}
          onClose={() => setProjectsToPreview(null)}
          onConfirmImport={handleConfirmImport}
          projects={projectsToPreview}
          jsonToImport={jsonToImport}
        />
      )}
    </>
  );
};

export default SettingsModal;
