/**
 * Centralized Color Palette for Portfolio
 * 
 * This file contains all colors used throughout the application
 * organized by semantic meaning and theme variants.
 */

export const colors = {
  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Primary Accent Palette (pastel green / mint)
  pink: {
    25: '#F5FBF7',        // Very light mint transition
    50: '#EDFAF2',        // Light mint background
    100: '#D3F2E0',       // Light mint
    200: '#A9E4C6',       // Pastel green
    300: '#7ED3A8',       // Main pastel green
    400: '#52BD8A',       // Deeper green
    500: '#35A46E',       // Strong green
    600: '#2B8A5C',       // Deep green
    700: '#26724D',       // Navigation text green
    800: '#215C40',       // Main text green (WCAG AA)
    900: '#1C4C36',       // Darkest green
  },

  // Dark theme colors
  dark: {
    50: '#F8FAFC',        // Almost white
    100: '#F1F5F9',       // Very light gray
    200: '#E2E8F0',       // Light gray
    300: '#CBD5E1',       // Medium light gray
    400: '#94A3B8',       // Medium gray
    500: '#64748B',       // Neutral gray
    600: '#475569',       // Medium dark gray
    700: '#334155',       // Dark gray
    800: '#1E293B',       // Very dark gray
    900: '#0F172A',       // Almost black
    950: '#020617',       // Darkest
  },

  // Semantic colors
  background: {
    light: {
      primary: '#FFFFFF',
      secondary: '#FFF5F7',
      gradient: 'linear-gradient(180deg, rgb(254 245 245) 0%, rgb(254 240 240) 50%, rgb(254 235 235) 100%)',
      gradientEnd: 'rgb(254 235 235)', // End color of the main gradient for seamless transitions
      overlay: 'rgba(255, 255, 255, 0.5)',
      // Sections are transparent so the dot-grid background shows through.
      sections: {
        about: 'transparent',
        skills: 'transparent',
        projects: 'transparent',
        experience: 'transparent',
        certifications: 'transparent',
      },
    },
    dark: {
      primary: '#0F172A',
      secondary: '#1E293B',
      gradient: '#0A0F1B',
      gradientEnd: '#0A0F1B', // Consistent dark background for seamless transitions
      overlay: 'rgba(0, 0, 0, 0.7)',
      // Dark mode sections are transparent so the dot-grid background shows through.
      sections: {
        about: 'transparent',
        skills: 'transparent',
        projects: 'transparent',
        experience: 'transparent',
        certifications: 'transparent',
      },
    },
  },

  // Text colors
  text: {
    light: {
      primary: '#1F2937',     // rgb(31, 41, 55)
      secondary: '#4B5563',   // rgb(75, 85, 99)
      tertiary: '#6B7280',    // rgb(107, 114, 128)
      accent: '#215C40',      // Green text
      pink: '#2B8A5C',        // Deep green
    },
    dark: {
      primary: '#FFFFFF',
      secondary: '#A9E4C6',
      tertiary: '#7ED3A8',
      accent: '#7ED3A8',
      pink: '#A9E4C6',
    },
  },

  // Interactive elements
  interactive: {
    light: {
      primary: 'rgba(234, 190, 195, 0.1)',
      hover: 'rgba(234, 190, 195, 0.2)',
      active: '#EABEC3',
      focus: 'rgba(234, 190, 195, 0.3)',
    },
    dark: {
      primary: 'rgba(234, 190, 195, 0.1)',
      hover: 'rgba(234, 190, 195, 0.2)',
      active: '#EABEC3',
      focus: 'rgba(234, 190, 195, 0.3)',
    },
  },

  // Navigation specific
  navigation: {
    light: {
      background: 'rgba(255, 232, 239, 0.4)',
      backgroundScrolled: 'rgba(255, 232, 239, 0.6)',
      border: 'rgba(255, 194, 209, 0.15)',
      borderScrolled: 'rgba(255, 194, 209, 0.2)',
      shadow: 'rgba(255, 194, 209, 0.08)',
      shadowScrolled: 'rgba(255, 194, 209, 0.12)',
      mobile: 'rgba(254, 248, 250, 0.95)',
    },
    dark: {
      background: 'rgba(10, 15, 27, 0.4)',
      backgroundScrolled: 'rgba(10, 15, 27, 0.6)',
      border: 'rgba(234, 190, 195, 0.1)',
      borderScrolled: 'rgba(234, 190, 195, 0.15)',
      shadow: 'rgba(0, 0, 0, 0.2)',
      shadowScrolled: 'rgba(0, 0, 0, 0.3)',
      mobile: 'rgba(10, 15, 27, 0.95)',
    },
  },

  // Button variants
  button: {
    primary: {
      light: {
        background: '#EABEC3',
        text: '#FFFFFF',
        hover: '#D9A5AC',
        shadow: 'rgba(234, 190, 195, 0.3)',
      },
      dark: {
        background: '#EABEC3',
        text: '#0A0F1B',
        hover: '#FDD5DF',
        shadow: 'rgba(234, 190, 195, 0.4)',
      },
    },
    secondary: {
      light: {
        background: 'rgba(255, 255, 255, 0.8)',
        text: '#1F2937',
        border: '#EABEC3',
        hover: '#FAE8ED',
      },
      dark: {
        background: 'rgba(31, 41, 55, 0.9)',
        text: '#FFFFFF',
        border: '#374151',
        hover: 'rgba(234, 190, 195, 0.1)',
      },
    },
    outline: {
      light: {
        background: 'transparent',
        text: '#C88B95',
        border: '#EABEC3',
        hover: '#FAE8ED',
      },
      dark: {
        background: '#1F2937',
        text: '#EABEC3',
        border: '#D9A5AC',
        hover: 'rgba(234, 190, 195, 0.1)',
      },
    },
  },

  // Card colors
  card: {
    light: {
      background: '#FFFFFF',
      border: 'transparent',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      background: '#1F2937',
      border: 'transparent',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
  },

  // Special effects
  effects: {
    glow: 'rgba(255, 194, 209, 0.3)',
    dropShadow: 'rgba(234, 190, 195, 0.3)',
    textShadow: 'rgba(0, 0, 0, 0.1)',
    blur: 'rgba(255, 255, 255, 0.1)',
  },

  // Utility colors
  utility: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    neutral: '#6B7280',
  },

  // Special colors
  special: {
    dragMe: '#35A46E',       // Green for drag me star
    aurora: {
      dark: '#52BD8A',       // Green aurora for dark mode
      light: {
        1: '#A9E4C6',        // Light green aurora stop 1
        2: '#D3F2E0',        // Light green aurora stop 2
        3: '#7ED3A8',        // Light green aurora stop 3
      }
    }
  },
} as const;

// Type definitions for better TypeScript support
type ColorTheme = 'light' | 'dark';
type ColorVariant = keyof typeof colors;

export type { ColorTheme, ColorVariant };

// Helper function to get theme-specific colors
export const getThemeColors = (theme: ColorTheme) => ({
  background: colors.background[theme],
  text: colors.text[theme],
  interactive: colors.interactive[theme],
  navigation: colors.navigation[theme],
  button: {
    primary: colors.button.primary[theme],
    secondary: colors.button.secondary[theme],
    outline: colors.button.outline[theme],
  },
  card: colors.card[theme],
});