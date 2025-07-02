import { useState, useEffect } from 'react';
import { themes, ThemeName } from '@/styles/theme';

export interface UseThemeResult {
  currentThemeName: ThemeName;
  currentThemeProperties: (typeof themes)[ThemeName];
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
}

export const useTheme = (): UseThemeResult => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>(
    Object.keys(themes)[0] as ThemeName
  );

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[currentThemeName].colors;
    Object.entries(themeColors).forEach(([key, value]) => {
      const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });
  }, [currentThemeName]);

  const setTheme = (themeName: ThemeName) => {
    setCurrentThemeName(themeName);
  };

  return {
    currentThemeName,
    currentThemeProperties: themes[currentThemeName],
    setTheme,
    availableThemes: Object.keys(themes) as ThemeName[],
  };
};
