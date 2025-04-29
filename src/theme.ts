import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

export const themes = {
  dark: darkTheme,
  light: lightTheme,
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
