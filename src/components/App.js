import React, { useCallback, useEffect, useMemo } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import slates from 'slates';
import { useAppStore } from '@hooks/useAppStore';
import MainLayout from '@components/Layouts/MainLayout';
import MiniLayout from '@components/Layouts/MiniLayout';
import { grey } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        background: {
          secondary: '#F6F8FD',
          swapTranslate: '#E3EEFF',
          swapTranslateHover: '#D4E4FE',
        },
        text: {
          default: grey[900],
        },
      }
      : {
        background: {
          default: grey[900],
          secondary: grey[800],
          swapTranslate: 'rgb(144 202 249 / 30%)',
          swapTranslateHover: 'rgb(144 202 249 / 50%)',
        },
        text: {
          default: '#fff',
        },
      }),
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: 40,
          minHeight: 40
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

function App() {
  const useMini = useAppStore(state => state.useMini);
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = useMemo(() => createTheme(getDesignTokens(isDarkMode ? 'dark' : 'light')), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      {useMini ? <MiniLayout/> : <MainLayout />}
    </ThemeProvider>
  );
}

export default App;
