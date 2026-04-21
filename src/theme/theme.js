import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B1F3A',
      dark: '#071220',
      light: '#1a3a5f',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E91E63',
      dark: '#c2185b',
      light: '#f06292',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFBFC',
    },
    text: {
      primary: '#0B1F3A',
      secondary: '#64748B',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 800,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:900px)': {
        fontSize: '2.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      '@media (max-width:900px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      '@media (max-width:600px)': {
        fontSize: '0.9375rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '0.8125rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
      fontSize: '0.9375rem',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
      lineHeight: 2,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.04)',
    '0 4px 8px rgba(0,0,0,0.06)',
    '0 8px 16px rgba(0,0,0,0.08)',
    '0 12px 24px rgba(0,0,0,0.1)',
    '0 16px 32px rgba(0,0,0,0.12)',
    '0 20px 40px rgba(0,0,0,0.14)',
    '0 24px 48px rgba(0,0,0,0.16)',
    '0 28px 56px rgba(0,0,0,0.18)',
    '0 32px 64px rgba(0,0,0,0.2)',
    '0 2px 4px rgba(0,0,0,0.04)',
    '0 4px 8px rgba(0,0,0,0.06)',
    '0 8px 16px rgba(0,0,0,0.08)',
    '0 12px 24px rgba(0,0,0,0.1)',
    '0 16px 32px rgba(0,0,0,0.12)',
    '0 20px 40px rgba(0,0,0,0.14)',
    '0 24px 48px rgba(0,0,0,0.16)',
    '0 28px 56px rgba(0,0,0,0.18)',
    '0 32px 64px rgba(0,0,0,0.2)',
    '0 36px 72px rgba(0,0,0,0.22)',
    '0 40px 80px rgba(0,0,0,0.24)',
    '0 44px 88px rgba(0,0,0,0.26)',
    '0 48px 96px rgba(0,0,0,0.28)',
    '0 52px 104px rgba(0,0,0,0.3)',
    '0 56px 112px rgba(0,0,0,0.32)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '14px 36px',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(0,0,0,0.04)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
