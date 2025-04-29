import React, { useState } from 'react';
import { Paper, TextField, Grid, Button, ToggleButtonGroup, ToggleButton, Tooltip, Typography, Box } from '@mui/material';
import { create, all } from 'mathjs';

const math = create(all);

const CalculusCalculator: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [variable, setVariable] = useState('x');
  const [mode, setMode] = useState<'derivative' | 'integral'>('derivative');
  const [result, setResult] = useState('');

  const calculate = () => {
    try {
      if (mode === 'derivative') {
        const res = math.derivative(expr, variable);
        setResult(res.toString());
      } else {
        const res = math.evaluate(`integrate(${expr}, ${variable})`);
        setResult(res.toString());
      }
    } catch {
      setResult('Error');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Calculus Calculator</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField fullWidth label="Expression" value={expr} onChange={(e) => setExpr(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Variable" value={variable} onChange={(e) => setVariable(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, val) => val && setMode(val)} size="small">
            <ToggleButton value="derivative">Derivative</ToggleButton>
            <ToggleButton value="integral">Integral</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculate}>Calculate</Button>
        </Grid>
      </Grid>
      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Result:</Typography>
          <Typography variant="body1">{result}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CalculusCalculator; 