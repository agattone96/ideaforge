// hooks/useTheme.ts
import { useState, useEffect, useCallback } from 'react';
import { themes, ThemeName } from '../styles/theme';

const THEME_STORAGE_KEY = 'ideaforge-ascension-theme';

// Helper to convert hex to RGB components string, e.g., "255, 191, 0"
// This is needed for rgba() colors where Tailwind's opacity modifiers might not work with CSS vars directly.
function getRGBComponents(hexColor: string): string {
    let color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    if (color.length === 3) {
        color = color.split('').map(char => char + char).join('');
    }
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

export const useTheme = () => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null : null;
    return storedTheme && themes[storedTheme] ? storedTheme : 'dark'; // Default to dark theme
  });

  const applyTheme = useCallback((newThemeName: ThemeName) => {
    const selectedTheme = themes[newThemeName];
    if (!selectedTheme) {
      console.warn(`Theme "${newThemeName}" not found. Applying default (dark).`);
      setThemeName('dark'); // Fallback to dark
      return;
    }

    const root = document.documentElement;
    
    // Set main theme class
    root.classList.remove('theme-light', 'theme-dark', 'theme-cosmic');
    root.classList.add(`theme-${newThemeName}`);

    // Update CSS variables directly from the theme object
    // This ensures dynamic updates and overrides CSS in index.html if necessary
    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      // Convert key from camelCase to kebab-case for CSS custom property
      const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      if(value) root.style.setProperty(cssVarName, value);
    });
    
    // Set RGB versions for specific variables used with alpha transparency
    // This is useful for components like .glassmorphic
    if (selectedTheme.colors.bgPrimary) {
        root.style.setProperty('--rgb-bg-primary', getRGBComponents(selectedTheme.colors.bgPrimary));
    }
    if (selectedTheme.colors.bgAccent) {
        root.style.setProperty('--rgb-bg-accent', getRGBComponents(selectedTheme.colors.bgAccent));
    }
    if (selectedTheme.colors.textPrimary) {
        root.style.setProperty('--rgb-text-primary', getRGBComponents(selectedTheme.colors.textPrimary));
    }
    if (selectedTheme.colors.borderAccent) {
        root.style.setProperty('--rgb-border-accent', getRGBComponents(selectedTheme.colors.borderAccent));
    }
    if (selectedTheme.colors.accentPrimary) {
        root.style.setProperty('--rgb-accent-primary', getRGBComponents(selectedTheme.colors.accentPrimary));
    }
    if (selectedTheme.colors.accentSecondary) {
        root.style.setProperty('--rgb-accent-secondary', getRGBComponents(selectedTheme.colors.accentSecondary));
    }


    // Persist theme choice
    localStorage.setItem(THEME_STORAGE_KEY, newThemeName);
    setThemeName(newThemeName);
  }, []);
  
  useEffect(() => {
    // Apply initial theme on mount
    applyTheme(themeName);
  }, [applyTheme, themeName]); // applyTheme dependency can be problematic if it changes too often.
                              // For this setup, it should be stable.

  return {
    currentThemeName: themeName,
    currentThemeProperties: themes[themeName],
    setTheme: applyTheme, // Expose applyTheme as setTheme
    availableThemes: Object.keys(themes) as ThemeName[],
  };
};
