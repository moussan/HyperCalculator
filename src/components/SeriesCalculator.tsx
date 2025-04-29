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

type SeriesType = 'taylor' | 'fourier' | 'laurent';

const SeriesCalculator: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [variable, setVariable] = useState('x');
  const [type, setType] = useState<SeriesType>('taylor');
  const [terms, setTerms] = useState(5);
  const [point, setPoint] = useState(0);
  const [period, setPeriod] = useState(2 * Math.PI);
  const [inner, setInner] = useState(0);
  const [outer, setOuter] = useState(1);
  const [result, setResult] = useState<string[]>([]);

  const calculate = () => {
    try {
      const res: string[] = [];
      if (type === 'taylor') {
        for (let k = 0; k < terms; k++) {
          const derivative = math.derivative(expr, variable, { simplify: true });
          const term = `(${derivative.toString()})/${math.factorial(k)}*(${variable}-${point})^${k}`;
          res.push(term);
        }
      } else if (type === 'fourier') {
        for (let k = -terms; k <= terms; k++) {
          const ck = `(1/${period})∫[${expr}*e^(-i*${k}${variable})]d${variable}`;
          res.push(`${ck}*e^(i*${k}${variable})`);
        }
      } else {
        for (let k = -terms; k <= terms; k++) {
          const ck = `(1/(2πi))∫[${expr}/(${variable}-${point})^${k + 1}]d${variable}`;
          res.push(`${ck}*(${variable}-${point})^${k}`);
        }
      }
      setResult(res);
    } catch {
      setResult(['Error']);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Series Expansion Calculator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Expression"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Variable"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Terms"
            value={terms}
            onChange={(e) => setTerms(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Point"
            value={point}
            onChange={(e) => setPoint(parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Series Type</InputLabel>
            <Select
              value={type}
              label="Series Type"
              onChange={(e) => setType(e.target.value as SeriesType)}
            >
              <MenuItem value="taylor">Taylor</MenuItem>
              <MenuItem value="fourier">Fourier</MenuItem>
              <MenuItem value="laurent">Laurent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {type === 'fourier' && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Period"
              value={period}
              onChange={(e) => setPeriod(parseFloat(e.target.value))}
            />
          </Grid>
        )}
        {type === 'laurent' && (
          <>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Inner Radius"
                value={inner}
                onChange={(e) => setInner(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Outer Radius"
                value={outer}
                onChange={(e) => setOuter(parseFloat(e.target.value))}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculate}>
            Calculate
          </Button>
        </Grid>
      </Grid>
      {result.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Series:</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {result.join(' + \n')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SeriesCalculator;
