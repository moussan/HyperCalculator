import { createTheme } from '@mui/material/styles';

export const themes = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
    },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
  }),
  neon: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#39ff14' },
      secondary: { main: '#ff007f' },
      background: { default: '#000000', paper: '#121212' },
    },
    typography: {
      fontFamily: '"Orbitron", sans-serif',
    },
  }),
  pastel: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#a8dadc' },
      secondary: { main: '#ffafcc' },
      background: { default: '#f1faee', paper: '#fffffc' },
    },
  }),
}; 