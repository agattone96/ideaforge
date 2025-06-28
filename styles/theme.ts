// styles/theme.ts

export type ThemeName = 'dark' | 'light' | 'cosmic';

export interface ColorPalette {
  bgPrimary: string;
  bgSecondary: string;
  bgAccent: string; // For cards, inputs
  textPrimary: string;
  textSecondary: string;
  textAccent: string; // For highlighted text or icons within text blocks
  borderPrimary: string;
  borderAccent: string;
  accentPrimary: string; // Main interactive accent (buttons, links)
  accentPrimaryLight?: string; // Lighter variant for hover/active states
  accentPrimaryDark?: string; // Darker variant if needed
  accentSecondary: string; // Secondary accent for complementary elements
  glowPrimary?: string; // Color for primary glow effects
  glowSecondary?: string; // Color for secondary glow effects
  focusRing?: string; // Color for focus rings, often accentPrimary with alpha
  // Status colors (can be common or themed)
  statusError: string;
  statusSuccess: string;
  statusWarning: string;
}

export interface TypographyTokens {
  fontFamilyDisplay: string;
  fontFamilyBody: string;
  fontFamilySans: string;
  fontFamilyMono: string;
  fontScaleRatio: number; // e.g., 1.25 for a major third scale
  fontSizeBase: string; // e.g., '1rem' or '16px'
}

export interface SpacingTokens {
  unit: string; // e.g., '0.25rem' (4px)
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  // Spacing for specific contexts if needed
  containerPadding: string;
  sectionPadding: string;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg:  string;
  xl: string;
  xxl: string;
  card: string;
  full: string;
}

export interface TransitionTokens {
  durationShort: string;
  durationMedium: string;
  durationLong: string;
  easingDefault: string;
}

export interface ShadowTokens {
  card: string;
  cardHover: string;
  glowAccentSm: string;
  glowAccentMd: string;
  glowAccentLg: string;
  // Add other shadow types as needed
}

export interface ThemeProperties {
  name: ThemeName;
  colors: ColorPalette;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radii: RadiusTokens;
  transitions: TransitionTokens;
  shadows: ShadowTokens;
  // Specific component styles if they vary significantly by theme
}

// --- Define Base Tokens (used across themes or as defaults) ---
const baseTypography: Omit<TypographyTokens, 'fontFamilyDisplay'> = { // fontFamilyDisplay is theme-specific
  fontFamilyBody: "'Sora', ui-serif, system-ui",
  fontFamilySans: "'Unbounded', ui-sans-serif, system-ui",
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontScaleRatio: 1.25, // Major Third
  fontSizeBase: '1rem',
};

const baseSpacing: SpacingTokens = {
  unit: '0.25rem', // 4px
  xs: 'calc(var(--spacing-unit) * 2)', // 0.5rem
  sm: 'calc(var(--spacing-unit) * 3)', // 0.75rem
  md: 'calc(var(--spacing-unit) * 4)', // 1rem
  lg: 'calc(var(--spacing-unit) * 6)', // 1.5rem
  xl: 'calc(var(--spacing-unit) * 8)', // 2rem
  containerPadding: 'var(--spacing-lg)',
  sectionPadding: 'var(--spacing-xl)',
};

const baseRadii: RadiusTokens = {
  sm: '0.125rem',   /* 2px */
  md: '0.25rem',    /* 4px */
  lg: '0.5rem',     /* 8px */
  xl: '0.75rem',    /* 12px */
  xxl: '1rem',      /* 16px */
  card: 'var(--radius-xl)', /* alias to xl */
  full: '9999px',
};

const baseTransitions: TransitionTokens = {
  durationShort: '0.15s',
  durationMedium: '0.3s',
  durationLong: '0.5s',
  easingDefault: 'ease-in-out',
};

const baseShadows: ShadowTokens = {
    card: '0 4px 12px rgba(0,0,0,0.15)', // Softer default
    cardHover: '0 6px 18px rgba(0,0,0,0.2)',
    glowAccentSm: '0 0 4px var(--color-glow-primary, var(--color-accent-primary)), 0 0 8px var(--color-glow-secondary, var(--color-accent-secondary))',
    glowAccentMd: '0 0 8px var(--color-glow-primary, var(--color-accent-primary)), 0 0 12px var(--color-glow-secondary, var(--color-accent-secondary))',
    glowAccentLg: '0 0 12px var(--color-glow-primary, var(--color-accent-primary)), 0 0 20px var(--color-glow-secondary, var(--color-accent-secondary))',
};

// --- Theme Definitions ---

export const darkTheme: ThemeProperties = {
  name: 'dark',
  colors: {
    bgPrimary: '#10101A',
    bgSecondary: '#1A1A2A',
    bgAccent: '#2A2A3A',
    textPrimary: '#E0E0FF',
    textSecondary: '#A0A0CF',
    textAccent: '#FFBF00', // Amber
    borderPrimary: '#3A3A4A',
    borderAccent: '#FFBF00',
    accentPrimary: '#FFBF00', // Amber
    accentPrimaryLight: '#FFD700',
    accentPrimaryDark: '#CC9900',
    accentSecondary: '#8A2BE2', // BlueViolet
    glowPrimary: 'var(--color-accent-primary)',
    glowSecondary: 'var(--color-accent-secondary)',
    focusRing: 'rgba(255, 191, 0, 0.3)', // Amber with alpha
    statusError: '#FF4136',
    statusSuccess: '#2ECC40',
    statusWarning: '#FFBF00',
  },
  typography: { ...baseTypography, fontFamilyDisplay: "'Orbitron', 'Unbounded', ui-sans-serif" },
  spacing: baseSpacing,
  radii: baseRadii,
  transitions: baseTransitions,
  shadows: {
    ...baseShadows,
    card: '0 4px 12px 0 rgba(0,0,0,0.3)', // Original dark theme card shadow
    cardHover: '0 8px 20px 0 rgba(0,0,0,0.35)',
  }
};

export const lightTheme: ThemeProperties = {
  name: 'light',
  colors: {
    bgPrimary: '#F0F2F5',
    bgSecondary: '#FFFFFF',
    bgAccent: '#E8EBF0',
    textPrimary: '#1A1A2A',
    textSecondary: '#5A5A6A',
    textAccent: '#D946EF', // Fuchsia
    borderPrimary: '#D0D5DB',
    borderAccent: '#D946EF',
    accentPrimary: '#D946EF', // Fuchsia
    accentPrimaryLight: '#E96FF2',
    accentPrimaryDark: '#C030D6',
    accentSecondary: '#3B82F6', // Blue 500
    glowPrimary: 'var(--color-accent-primary)',
    glowSecondary: 'var(--color-accent-secondary)',
    focusRing: 'rgba(217, 70, 239, 0.3)', // Fuchsia with alpha
    statusError: '#FF4136',
    statusSuccess: '#2ECC40',
    statusWarning: '#EAB308', // Amber 500
  },
  typography: { ...baseTypography, fontFamilyDisplay: "'Unbounded', ui-sans-serif" }, // Unbounded for light theme
  spacing: baseSpacing,
  radii: baseRadii,
  transitions: baseTransitions,
  shadows: baseShadows,
};

export const cosmicTheme: ThemeProperties = {
  name: 'cosmic',
  colors: {
    bgPrimary: '#0A0514', // Very dark purple/blue
    bgSecondary: '#140A28', // Dark purple
    bgAccent: '#281440', // Lighter purple for cards, inputs
    textPrimary: '#F0F0FF', // Brighter white
    textSecondary: '#A0A0CF', // Muted lavender grey
    textAccent: '#FF00E6', // Magenta, matches primary accent
    borderPrimary: '#402860', // Purple border
    borderAccent: '#FF00E6', // Magenta accent border
    accentPrimary: '#FF00E6', // Magenta
    accentPrimaryLight: '#FF40F0',
    accentPrimaryDark: '#D900C0',
    accentSecondary: '#9D00FF', // Vibrant Purple
    glowPrimary: '#FF00E6', // Magenta glow
    glowSecondary: '#9D00FF', // Vibrant Purple glow
    focusRing: 'rgba(255, 0, 230, 0.4)', // Magenta focus ring
    statusError: '#FF3366', // Hot pink/red error
    statusSuccess: '#00FF7F', // Spring green success
    statusWarning: '#FFFF66', // Bright yellow warning
  },
  typography: { ...baseTypography, fontFamilyDisplay: "'Orbitron', 'Unbounded', ui-sans-serif" },
  spacing: baseSpacing,
  radii: baseRadii,
  transitions: baseTransitions,
  shadows: {
    ...baseShadows,
    card: '0 5px 15px rgba(var(--rgb-accent-primary, 255,0,230), 0.1), 0 2px 8px rgba(var(--rgb-accent-secondary,0,240,255), 0.1)',
    cardHover: '0 8px 25px rgba(var(--rgb-accent-primary, 255,0,230), 0.2), 0 4px 12px rgba(var(--rgb-accent-secondary,0,240,255), 0.2)',
    glowAccentSm: '0 0 5px var(--color-glow-primary), 0 0 10px var(--color-glow-primary), 0 0 3px var(--color-glow-secondary)',
    glowAccentMd: '0 0 10px var(--color-glow-primary), 0 0 20px var(--color-glow-primary), 0 0 6px var(--color-glow-secondary)',
    glowAccentLg: '0 0 15px var(--color-glow-primary), 0 0 30px var(--color-glow-primary), 0 0 10px var(--color-glow-secondary), 0 0 5px #fff', // Add white hint
  }
};

export const themes: Record<ThemeName, ThemeProperties> = {
  dark: darkTheme,
  light: lightTheme,
  cosmic: cosmicTheme,
};

// This file primarily defines the JS structures for themes.
// The actual application of these as CSS variables is handled in index.html's <script> tag
// and the useTheme hook (or directly in App.tsx).
// Tailwind CSS will pick up these CSS variables as defined in its config in index.html.

console.info("styles/theme.ts: Design tokens loaded. Theme application managed via CSS custom properties and theme classes on <html>.");

export default themes;