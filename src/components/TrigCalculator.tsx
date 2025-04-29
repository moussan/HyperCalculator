import React, { useState } from 'react';
import { Paper, TextField, Grid, Button, ToggleButtonGroup, ToggleButton, Tooltip, Typography, Box } from '@mui/material';
import { create, all } from 'mathjs';

const math = create(all);

const trigFunctions = [
  { label: 'sin', tooltip: 'Sine' },
  { label: 'cos', tooltip: 'Cosine' },
  { label: 'tan', tooltip: 'Tangent' },
  { label: 'asin', tooltip: 'Arcsine' },
  { label: 'acos', tooltip: 'Arccosine' },
  { label: 'atan', tooltip: 'Arctangent' },
];

const TrigCalculator: React.FC = () => {
  const [angle, setAngle] = useState('');
  const [unit, setUnit] = useState<'deg' | 'rad'>('deg');
  const [result, setResult] = useState('');

  const toRadians = (value: number) => (unit === 'deg' ? (value * Math.PI) / 180 : value);
  const fromRadians = (value: number) => (unit === 'deg' ? (value * 180) / Math.PI : value);

  const handleTrig = (func: string) => {
    try {
      const angleValue = parseFloat(angle);
      const rad = toRadians(angleValue);
      let res: number;
      switch (func) {
        case 'sin':
          res = math.sin(rad);
          break;
        case 'cos':
          res = math.cos(rad);
          break;
        case 'tan':
          res = math.tan(rad);
          break;
        case 'asin':
          res = fromRadians((math.asin(angleValue) as unknown as number));
          break;
        case 'acos':
          res = fromRadians((math.acos(angleValue) as unknown as number));
          break;
        case 'atan':
          res = fromRadians((math.atan(angleValue) as unknown as number));
          break;
        default:
          res = NaN;
      }
      setResult(res.toString());
    } catch {
      setResult('Error');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Trigonometry Calculator</Typography>
      <TextField
        fullWidth
        label="Angle / Value"
        value={angle}
        onChange={(e) => setAngle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, val) => val && setUnit(val)} size="small">
          <ToggleButton value="deg">Degrees</ToggleButton>
          <ToggleButton value="rad">Radians</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={1}>
        {trigFunctions.map(({ label, tooltip }) => (
          <Grid item xs={4} key={label}>
            <Tooltip title={tooltip}>
              <Button variant="contained" fullWidth onClick={() => handleTrig(label)}>
                {label}
              </Button>
            </Tooltip>
          </Grid>
        ))}
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

export default TrigCalculator; 