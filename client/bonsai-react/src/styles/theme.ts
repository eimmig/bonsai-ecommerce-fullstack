/**
 * Design System - Colors
 * Cores do tema Bonsai E-commerce
 * Sincronizado com tailwind.config.js
 */

export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#006d3b',
    dark: '#005030',
  },
  
  // Text colors
  text: {
    DEFAULT: '#081B02',
    dark: '#444444',
    medium: '#666666',
  },

  // UI colors
  title: '#4D933E',
  white: '#FFFFFF',
  
  // Button colors
  button: {
    DEFAULT: '#4D933E',
    hover: '#44593A',
  },

  // Border colors
  border: {
    light: '#eeeeee',
    DEFAULT: '#dddddd',
    green: '#006d3b',
    whiteTranslucent: 'rgba(255, 255, 255, 0.1)',
  },

  // Shadow colors
  shadow: {
    DEFAULT: 'rgba(0, 0, 0, 0.1)',
    light: 'rgba(0, 0, 0, 0.05)',
  },

  // Background colors
  background: {
    light: '#f8f9fa',
    gray: 'rgba(255, 255, 255, 0.8)',
  },

  // Semantic colors
  focus: '#44593A',
  footer: '#44593A',
  discount: '#e74c3c',
  error: '#dc3545',
  success: '#4CAF50',
  placeholder: '#aaaaaa',

  // Utility colors
  lightGray: '#f5f5f5',
  darkGray: '#666666',

  // Card colors
  card: {
    bg: '#f8f8f8',
    alt: '#f9f9f9',
  },

  // Button variants
  btn: {
    green: {
      DEFAULT: '#557245',
      hover: '#6a8c5a',
    },
    blue: {
      DEFAULT: '#4081bc',
      hover: '#2c5f8c',
    },
  },
} as const;

/**
 * Design System - Spacing
 */
export const spacing = {
  header: '80px',
  headerMobile: '110px',
} as const;

/**
 * Design System - Z-Index
 */
export const zIndex = {
  header: 1050,
  toast: 9999,
} as const;

/**
 * Design System - Shadows
 */
export const shadows = {
  soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
  softLight: '0 2px 4px rgba(0, 0, 0, 0.05)',
  header: '0 2px 8px rgba(0, 0, 0, 0.07)',
} as const;
