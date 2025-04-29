import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Button,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { safeEvaluate } from '../lib/mathHelpers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calculator-tabpanel-${index}`}
      aria-labelledby={`calculator-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const Calculator: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setExpression('');
    setResult('');
    setError('');
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = safeEvaluate(expression);
      setResult(String(calculatedResult));
      setError('');
    } catch (err) {
      setError('Invalid expression');
      setResult('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCalculate();
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    '(', ')', '^', 'C'
  ];

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
      setError('');
    } else if (value === '=') {
      handleCalculate();
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Basic" />
            <Tab label="Matrix" />
            <Tab label="Complex" />
            <Tab label="Series" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Expression"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyPress={handleKeyPress}
                error={!!error}
                helperText={error}
                sx={{ mb: 2 }}
              />
              {result && (
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Result: {result}
                </Typography>
              )}
              <Grid container spacing={1}>
                {buttons.map((btn) => (
                  <Grid item xs={3} key={btn}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleButtonClick(btn)}
                      sx={{
                        height: '50px',
                        fontSize: '1.2rem',
                      }}
                    >
                      {btn}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography>Matrix Operations (Coming Soon)</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography>Complex Numbers (Coming Soon)</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography>Series Expansions (Coming Soon)</Typography>
          </TabPanel>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Calculator; 