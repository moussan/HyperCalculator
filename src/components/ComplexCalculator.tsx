import React, { useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import { create, all } from 'mathjs';

const math = create(all);

const ComplexCalculator: React.FC = () => {
  const [realA, setRealA] = useState('');
  const [imagA, setImagA] = useState('');
  const [realB, setRealB] = useState('');
  const [imagB, setImagB] = useState('');
  const [operation, setOperation] = useState<
    'add' | 'subtract' | 'multiply' | 'divide' | 'conjugate' | 'magnitude' | 'phase'
  >('add');
  const [result, setResult] = useState('');

  const calculate = () => {
    try {
      const a = math.complex(parseFloat(realA) || 0, parseFloat(imagA) || 0);
      let res;
      if (operation === 'conjugate' || operation === 'magnitude' || operation === 'phase') {
        switch (operation) {
          case 'conjugate':
            res = math.conj(a).toString();
            break;
          case 'magnitude':
            res = math.abs(a).toString();
            break;
          case 'phase':
            res = math.arg(a).toString();
            break;
        }
      } else {
        const b = math.complex(parseFloat(realB) || 0, parseFloat(imagB) || 0);
        switch (operation) {
          case 'add':
            res = math.add(a, b).toString();
            break;
          case 'subtract':
            res = math.subtract(a, b).toString();
            break;
          case 'multiply':
            res = math.multiply(a, b).toString();
            break;
          case 'divide':
            res = math.divide(a, b).toString();
            break;
        }
      }
      setResult(res as string);
    } catch {
      setResult('Error');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Complex Number Calculator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Real A"
            value={realA}
            onChange={(e) => setRealA(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Imag A"
            value={imagA}
            onChange={(e) => setImagA(e.target.value)}
            fullWidth
          />
        </Grid>
        {!(operation === 'conjugate' || operation === 'magnitude' || operation === 'phase') && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Real B"
                value={realB}
                onChange={(e) => setRealB(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Imag B"
                value={imagB}
                onChange={(e) => setImagB(e.target.value)}
                fullWidth
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select
              value={operation}
              label="Operation"
              onChange={(e) => setOperation(e.target.value as any)}
            >
              <MenuItem value="add">Add</MenuItem>
              <MenuItem value="subtract">Subtract</MenuItem>
              <MenuItem value="multiply">Multiply</MenuItem>
              <MenuItem value="divide">Divide</MenuItem>
              <MenuItem value="conjugate">Conjugate</MenuItem>
              <MenuItem value="magnitude">Magnitude</MenuItem>
              <MenuItem value="phase">Phase</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" fullWidth onClick={calculate}>
            Calculate
          </Button>
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

export default ComplexCalculator;
