import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Modal from './Modal';
import Button from './Button';
import { NotificationType } from '@/types';
import * as Storage from '@/services/localStorageService';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  SparklesIcon,
  TrashIcon,
  CogIcon,
  AdjustmentsHorizontalIcon,
  SquaresPlusIcon,
  PaletteIcon,
} from './icons';
import { ThemeName } from '@/styles/theme';

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

const SettingItem: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => (
  <div className={`py-3 ${className || ''}`}>
    <h5 className="font-semibold font-display text-theme-text-primary mb-1">{title}</h5>
    {description && (
      <p className="text-xs text-theme-text-secondary mb-2 max-w-prose">{description}</p>
    )}
    <div className="mt-2">{children}</div>
  </div>
);

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}> = ({ title, children, className, icon }) => (
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

  const [accentColor, setAccentColorState] = useState(Storage.getAccentColor());
  const [fontSizeMultiplier, setFontSizeMultiplierState] = useState(
    Storage.getFontSizeMultiplier()
  );
  const [highContrastMode, setHighContrastModeState] = useState(Storage.getHighContrastMode());
  const [listDensity, setListDensityState] = useState(Storage.getListDensity());
  const [themePreview, setThemePreview] = useState<ThemeName | 'auto'>(currentTheme);

  useEffect(() => {
    if (isOpen) {
      setAiStatus(Storage.isAiEnabled());
      setTestResult(null);
      setShowWelcomeToggle(Storage.getShowWelcomeOnNextLaunchPreference());

      setAccentColorState(Storage.getAccentColor());
      setFontSizeMultiplierState(Storage.getFontSizeMultiplier());
      setHighContrastModeState(Storage.getHighContrastMode());
      setListDensityState(Storage.getListDensity());
    }
  }, [isOpen]);

  // Add smooth theme transitions to the root element
  useEffect(() => {
    if (isOpen) {
      const root = document.documentElement;
      root.style.transition = 'background-color 0.4s, color 0.4s';
      return () => {
        root.style.transition = '';
      };
    }
  }, [isOpen, currentTheme, accentColor]);

  const handleClearAllData = () => {
    if (
      window.confirm('CONFIRM: Delete ALL local data? This action is final and cannot be undone.')
    ) {
      localStorage.removeItem('IDEA_FORGE_LOCAL_PROJECTS');
      addNotification(
        'All local data has been deleted. The application will now reload.',
        'success'
      );
      onClose();
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleTestAiConnection = async () => {
    setIsTestingAi(true);
    setTestResult('Pinging AI Core...');
    const result = await Storage.testAiConnection();
    if (result.success) {
      setTestResult(`Connection successful! Response: "${result.data || 'OK'}"`);
      addNotification('AI Core connection test successful.', 'success');
    } else {
      setTestResult(`Connection failed: ${result.message}`);
      addNotification(`AI Core connection failed: ${result.message}`, 'error');
    }
    setIsTestingAi(false);
  };

  const handleDownloadAllData = () => {
    try {
      const jsonData = Storage.getAllProjectsAsJson();
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
      addNotification('Full data backup successfully downloaded.', 'success');
    } catch (error) {
      addNotification('Data backup failed to initiate.', 'error');
      console.error('Error downloading data:', error);
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const importResult = Storage.importProjectsFromJson(jsonString);
        if (importResult.success) {
          addNotification(`${importResult.message} The application will now reload.`, 'success');
          onClose();
          setTimeout(() => window.location.reload(), 1500);
        } else {
          addNotification(`Backup import failed: ${importResult.message}`, 'error');
        }
      } catch (error) {
        addNotification(
          `Backup import failed: ${error instanceof Error ? error.message : String(error)}`,
          'error'
        );
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleWelcomeToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setShowWelcomeToggle(isChecked);
    Storage.setShowWelcomeOnNextLaunchPreference(isChecked);
    addNotification(
      `Welcome screen will ${isChecked ? 'show' : 'be skipped'} on next launch.`,
      'info'
    );
  };

  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setAccentColorState(newColor);
    Storage.setAccentColor(newColor);
    addNotification(`Accent color updated.`, 'info');
  };

  const handleResetAccentColor = () => {
    setAccentColorState('');
    Storage.setAccentColor('');
    addNotification('Accent color reset to theme default.', 'info');
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMultiplier = parseFloat(e.target.value);
    setFontSizeMultiplierState(newMultiplier);
    Storage.setFontSizeMultiplier(newMultiplier);
    addNotification(`Global text size set to ${Math.round(newMultiplier * 100)}%.`, 'info');
  };

  const handleHighContrastToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    setHighContrastModeState(isEnabled);
    Storage.setHighContrastMode(isEnabled);
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
    Storage.setListDensity(newDensity);
    addNotification(`List view density set to ${newDensity}.`, 'info');
  };

  const handleThemePreview = (theme: ThemeName | 'auto') => setThemePreview(theme);
  const handleThemeSelect = (theme: ThemeName | 'auto') => {
    if (theme === 'auto') {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      onThemeChange(prefersDark ? 'dark' : 'light');
    } else {
      onThemeChange(theme);
    }
  };

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cosmic Control Center"
      size="xl"
      isGlassmorphic
      prefersReducedMotion={prefersReducedMotion}
      className="!rounded-2xl shadow-2xl shadow-black/30"
    >
      <p className="text-sm text-theme-text-secondary mb-4 -mt-2">
        Fine-tune your IdeaForge experience. Calibrate the interface, data protocols, and AI
        augments for peak creative flow.
      </p>
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1 divide-y divide-theme-border-primary/50 text-theme-text-primary text-sm max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        <Section title="Interface & Theme" icon={<PaletteIcon className="w-5 h-5" />}>
          <SettingItem
            title="Active Theme"
            description="Select your preferred visual theme for the application."
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...availableThemes, 'auto'].map((theme) => (
                <button
                  key={theme}
                  type="button"
                  className={`w-full rounded-lg border-2 p-2 flex flex-col items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-theme-accent-primary focus-visible:ring-offset-2 ${themePreview === theme ? 'ring-2 ring-theme-accent-primary border-theme-accent-primary' : 'border-theme-border-primary'}`}
                  onMouseEnter={() => handleThemePreview(theme as ThemeName | 'auto')}
                  onMouseLeave={() => setThemePreview(currentTheme)}
                  onClick={() => handleThemeSelect(theme as ThemeName | 'auto')}
                  aria-label={`Select ${theme} theme`}
                >
                  <div
                    className="w-10 h-6 rounded mb-2 border border-theme-border-primary bg-gradient-to-r from-theme-bg-primary to-theme-bg-accent"
                    style={{
                      boxShadow:
                        theme === currentTheme
                          ? '0 0 0 2px var(--color-accent-primary)'
                          : undefined,
                    }}
                  />
                  <span className="capitalize text-xs font-body">
                    {theme === 'auto' ? 'Auto' : theme}
                  </span>
                </button>
              ))}
            </div>
          </SettingItem>
          <SettingItem
            title="Accent Color"
            description="Manually override the primary accent color for the current theme."
          >
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={accentColor}
                onChange={handleAccentColorChange}
                className="w-10 h-10 p-0 border-none rounded-lg cursor-pointer bg-theme-bg-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg-accent focus-visible:ring-theme-accent-primary"
                title="Select accent color"
              />
              <div className="font-mono text-sm p-2 bg-theme-bg-accent rounded-md border border-theme-border-primary/50">
                {accentColor.toUpperCase()}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAccentColor}
                aria-label="Reset accent color"
              >
                Reset
              </Button>
            </div>
          </SettingItem>
        </Section>

        <Section title="Accessibility" icon={<AdjustmentsHorizontalIcon className="w-5 h-5" />}>
          <SettingItem
            title="Global Text Size"
            description="Adjust the base font size for all text in the application."
          >
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
              <span className="text-sm font-mono w-14 text-center p-1 bg-theme-bg-accent rounded-md border border-theme-border-primary/50">
                {Math.round(fontSizeMultiplier * 100)}%
              </span>
            </div>
          </SettingItem>
          <SettingItem
            title="High-Contrast Mode"
            description="Increases text-to-background contrast for better legibility."
          >
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
          <SettingItem
            title="Reduce Animations"
            description="Disables or reduces UI motion for a calmer experience."
          >
            <label
              htmlFor="reducedMotionToggleSettings"
              className="flex items-center cursor-pointer"
            >
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

        <Section title="Layout & Density" icon={<SquaresPlusIcon className="w-5 h-5" />}>
          <SettingItem
            title="List View Density"
            description="Choose between more compact or spacious layouts for project and idea lists."
          >
            <select
              value={listDensity}
              onChange={handleListDensityChange}
              className="w-full sm:w-2/3 p-2 rounded-lg bg-theme-bg-accent border border-theme-border-primary hover:border-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary focus:border-theme-accent-primary text-theme-text-primary font-body transition-colors"
            >
              <option value="spacious">Spacious Nebulae (Default)</option>
              <option value="compact">Compact Clusters</option>
            </select>
          </SettingItem>
        </Section>

        <Section title="System & Data" icon={<CogIcon className="w-5 h-5" />} className="pt-6">
          <SettingItem
            title="Welcome Screen"
            description="Control whether the welcome screen appears on application launch."
          >
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

          <SettingItem
            title="AI Core (Gemini)"
            description={
              aiStatus
                ? 'AI features are online. (Requires a valid API key)'
                : 'AI features are offline. An API key is required.'
            }
          >
            {aiStatus && (
              <div className="mt-2">
                <Button
                  onClick={handleTestAiConnection}
                  variant="outline"
                  size="sm"
                  disabled={isTestingAi}
                  leftIcon={
                    <SparklesIcon className={`w-4 h-4 ${isTestingAi ? 'animate-spin' : ''}`} />
                  }
                  prefersReducedMotion={prefersReducedMotion}
                >
                  {isTestingAi ? 'Connecting...' : 'Test AI Connection'}
                </Button>
                {testResult && (
                  <p
                    className={`text-xs mt-2 p-2 rounded ${testResult.startsWith('Connection successful') ? 'bg-status-success/10 text-status-success' : 'bg-status-error/10 text-status-error'}`}
                  >
                    {testResult}
                  </p>
                )}
              </div>
            )}
          </SettingItem>

          <SettingItem
            title="Backup & Restore"
            description="Export all your projects and ideas to a JSON file, or restore from a previous backup."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleDownloadAllData}
                size="md"
                leftIcon={<ArrowDownTrayIcon className="w-5 h-5" />}
                prefersReducedMotion={prefersReducedMotion}
              >
                Backup All Data
              </Button>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                size="md"
                leftIcon={<ArrowUpTrayIcon className="w-5 h-5" />}
                prefersReducedMotion={prefersReducedMotion}
              >
                Import from Backup
              </Button>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleImportData}
                className="hidden"
              />
            </div>
          </SettingItem>

          <SettingItem
            title="System Reset Protocol (Danger Zone)"
            description="Permanently delete all projects, ideas, and settings from this browser. This cannot be undone."
          >
            <Button
              variant="danger"
              onClick={handleClearAllData}
              size="md"
              leftIcon={<TrashIcon className="w-5 h-5" />}
              prefersReducedMotion={prefersReducedMotion}
            >
              Delete All Local Data
            </Button>
          </SettingItem>
        </Section>

        <Section title="Design Tokens" icon={<CogIcon className="w-5 h-5" />}>
          <SettingItem title="Spacing" description="Adjust base spacing for UI elements.">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={1}
              className="w-full"
              disabled
            />
            <span className="text-xs text-theme-text-secondary">(Coming soon)</span>
          </SettingItem>
          <SettingItem title="Typography" description="Choose font family and scale.">
            <select className="w-full" disabled>
              <option>Default</option>
            </select>
            <span className="text-xs text-theme-text-secondary">(Coming soon)</span>
          </SettingItem>
          <SettingItem
            title="Animation Curve"
            description="Set the animation curve for transitions."
          >
            <select className="w-full" disabled>
              <option>ease-in-out</option>
            </select>
            <span className="text-xs text-theme-text-secondary">(Coming soon)</span>
          </SettingItem>
        </Section>
      </motion.div>
      <footer className="mt-8 flex justify-end">
        <Button
          variant="default"
          onClick={onClose}
          size="lg"
          prefersReducedMotion={prefersReducedMotion}
        >
          Apply & Close
        </Button>
      </footer>
    </Modal>
  );
};

export default SettingsModal;

export const SettingsModalSkeleton: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 min-w-[300px]">
        <h2 className="text-xl font-bold mb-2">Settings</h2>
        {}
        <button className="mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
