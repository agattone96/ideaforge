import React from 'react';
import { useTheme } from '../hooks/useTheme';
import Button from './Button';
import { SunIcon, MoonIcon } from './icons';

const AppHeader: React.FC = () => {
  const { currentThemeName, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(currentThemeName === 'light' ? 'dark' : 'light');
  };

  const Icon = currentThemeName === 'light' ? MoonIcon : SunIcon;

  return (
    <header className="fixed top-4 right-4 z-[70] flex">
      <Button
        variant="icon"
        size="md"
        onClick={toggleTheme}
        aria-label="Toggle light/dark theme"
      >
        <Icon className="w-6 h-6" />
      </Button>
    </header>
  );
};

export default AppHeader;
