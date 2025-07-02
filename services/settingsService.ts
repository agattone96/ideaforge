
// services/settingsService.ts

const FIRST_VISIT_KEY = 'IDEA_FORGE_LOCAL_FIRST_VISIT_DONE';
const SHOW_WELCOME_ON_NEXT_LAUNCH_KEY = 'IDEA_FORGE_SHOW_WELCOME_ON_NEXT_LAUNCH';
const ACCENT_COLOR_KEY = 'IDEA_FORGE_ACCENT_COLOR';
const FONT_SIZE_MULTIPLIER_KEY = 'IDEA_FORGE_FONT_SIZE_MULTIPLIER';
const HIGH_CONTRAST_MODE_KEY = 'IDEA_FORGE_HIGH_CONTRAST_MODE';
const REDUCED_MOTION_KEY = 'IDEA_FORGE_REDUCED_MOTION';
const LIST_DENSITY_KEY = 'IDEA_FORGE_LIST_DENSITY';

// --- First Visit & Welcome Modal Preference ---
export const isFirstVisit = (): boolean => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(FIRST_VISIT_KEY) === null;
};

export const setFirstVisitDone = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
  }
};

export const getShowWelcomeOnNextLaunchPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SHOW_WELCOME_ON_NEXT_LAUNCH_KEY) === 'true';
};

export const setShowWelcomeOnNextLaunchPreference = (show: boolean): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SHOW_WELCOME_ON_NEXT_LAUNCH_KEY, String(show));
  }
};

// --- Appearance & Accessibility Preferences ---

// Helper to convert hex to RGB components string, e.g., "255, 191, 0"
// This is already in useTheme.ts, but keeping it here for service independence
function getRGBComponents(hexColor: string): string {
    let color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    if (color.length === 3) {
        color = color.split('').map(char => char + char).join('');
    }
    if (color.length !== 6) {
        console.warn(`Invalid hex color for RGB conversion: ${hexColor}. Falling back to black.`);
        return '0, 0, 0';
    }
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

export const getAccentColor = (): string => {
  if (typeof window === 'undefined') return '#FFBF00';
  return localStorage.getItem(ACCENT_COLOR_KEY) || '#FFBF00'; // Default Amber
};
export const setAccentColor = (color: string): void => {
  if (typeof document !== 'undefined') {
    localStorage.setItem(ACCENT_COLOR_KEY, color);
    document.documentElement.style.setProperty('--color-accent-primary', color);
    // Also update the RGB version for any components that need it (e.g., for opacity)
    document.documentElement.style.setProperty('--rgb-accent-primary', getRGBComponents(color));
  }
};

export const getFontSizeMultiplier = (): number => {
  if (typeof window === 'undefined') return 1;
  const stored = localStorage.getItem(FONT_SIZE_MULTIPLIER_KEY);
  return stored ? parseFloat(stored) : 1; // Default 1 (100%)
};
export const setFontSizeMultiplier = (multiplier: number): void => {
  if (typeof document !== 'undefined') {
    localStorage.setItem(FONT_SIZE_MULTIPLIER_KEY, String(multiplier));
    document.documentElement.style.setProperty('--base-font-size-multiplier', String(multiplier));
  }
};

export const getHighContrastMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(HIGH_CONTRAST_MODE_KEY) === 'true';
};
export const setHighContrastMode = (enabled: boolean): void => {
  if (typeof document !== 'undefined') {
    localStorage.setItem(HIGH_CONTRAST_MODE_KEY, String(enabled));
    if (enabled) {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }
  }
};

export const getReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(REDUCED_MOTION_KEY) === 'true';
};
export const setReducedMotion = (enabled: boolean): void => {
  if (typeof document !== 'undefined') {
    localStorage.setItem(REDUCED_MOTION_KEY, String(enabled));
    if (enabled) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }
  }
};

export const getListDensity = (): 'compact' | 'spacious' => {
    if (typeof window === 'undefined') return 'spacious';
    return (localStorage.getItem(LIST_DENSITY_KEY) as 'compact' | 'spacious') || 'spacious';
};
export const setListDensity = (density: 'compact' | 'spacious'): void => {
  if (typeof document !== 'undefined') {
    localStorage.setItem(LIST_DENSITY_KEY, density);
    document.documentElement.setAttribute('data-list-density', density);
  }
};

export const applyStoredAppearanceSettings = (): void => {
  // Theme is handled by useTheme hook, so we don't apply it here.
  // We apply settings that directly manipulate the DOM outside of React's main state flow initially.
  setAccentColor(getAccentColor());
  setFontSizeMultiplier(getFontSizeMultiplier());
  setHighContrastMode(getHighContrastMode());
  setReducedMotion(getReducedMotion());
  setListDensity(getListDensity());
};
