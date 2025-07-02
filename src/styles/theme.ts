export const themes = {
  light: {
    colors: {
      primary: '#4a90e2',
      secondary: '#22223b',
      accent: '#f2e9e4',
    },
  },
  dark: {
    colors: {
      primary: '#22223b',
      secondary: '#4a90e2',
      accent: '#f2e9e4',
    },
  },
};

export type ThemeName = keyof typeof themes;
