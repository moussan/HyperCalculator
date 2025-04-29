import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { themes } from './theme';
import { CalculatorProvider } from './context/CalculatorContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CalculatorTabs from './components/CalculatorTabs';

const App: React.FC = () => {
  const [themeName, setThemeName] = useState<'dark' | 'light' | 'neon' | 'pastel'>('dark');

  return (
    <CalculatorProvider>
      <ThemeProvider theme={themes[themeName]}>
        <CssBaseline />
        <Header themeName={themeName} onThemeChange={(name) => setThemeName(name as any)} />
        <CalculatorTabs />
        <Footer />
      </ThemeProvider>
    </CalculatorProvider>
  );
};

export default App;
