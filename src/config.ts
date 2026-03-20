// Theme Configuration - ElbilFAQ

export const THEME = {
  primary: {
    DEFAULT: '#10B981',  // Electric green for EVs
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    950: '#022C22',
  },
  
  secondary: {
    DEFAULT: '#1A1A1A',
    light: '#2D2D2D',
    lighter: '#404040',
  },
  
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#EBEBEB',
    dark: '#1A1A1A',
  },
  
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    tertiary: '#737373',
    muted: '#A3A3A3',
    inverted: '#FFFFFF',
  },
  
  border: {
    light: '#E5E5E5',
    DEFAULT: '#D4D4D4',
    dark: '#A3A3A3',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
  },
  
  radius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
} as const;

export const SITE = {
  name: 'ElbilFAQ',
  title: 'ElbilFAQ - Din guide till elbilar och laddhybrider',
  description: 'Aktuell information om elbilar, laddhybrider, laddning, räckvidd och allt som rör elektrisk mobilitet.',
  url: 'https://elbilfaq.se',
  ogImage: '/og-image.png',
  language: 'sv',
  author: 'ElbilFAQ',
} as const;

export const NAV = {
  main: [
    { label: 'Hem', href: '/' },
    { label: 'Artiklar', href: '/faq' },
    { label: 'Kategorier', href: '/categories' },
    { label: 'Elbilsjämförelse', href: '/jamforelse' },
  ],
} as const;
