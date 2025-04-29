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
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { create, all } from 'mathjs';

const math = create(all);

const MatrixCalculator: React.FC = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [data, setData] = useState<string[][]>([
    ['', ''],
    ['', ''],
  ]);
  const [operation, setOperation] = useState<'determinant' | 'inverse' | 'transpose'>(
    'determinant'
  );
  const [result, setResult] = useState('');

  const handleChange = (r: number, c: number, value: string) => {
    const newData = data.map((arr) => [...arr]);
    newData[r][c] = value;
    setData(newData);
  };

  const calculate = () => {
    try {
      const numeric = data.map((row) => row.map((cell) => parseFloat(cell) || 0));
      let res: string;
      switch (operation) {
        case 'determinant':
          res = math.det(numeric).toString();
          break;
        case 'inverse':
          res = math.inv(numeric).toString();
          break;
        case 'transpose':
          res = math.transpose(numeric).toString();
          break;
        default:
          res = '';
      }
      setResult(res);
    } catch {
      setResult('Error');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Matrix Calculator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Rows"
            value={rows}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              setRows(val);
              setData(
                Array.from({ length: val }, (_, i) =>
                  Array.from({ length: cols }, (_, j) => data[i]?.[j] ?? '')
                )
              );
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Cols"
            value={cols}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              setCols(val);
              setData(
                Array.from({ length: rows }, (_, i) =>
                  Array.from({ length: val }, (_, j) => data[i]?.[j] ?? '')
                )
              );
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Table size="small">
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>
                      <TextField
                        size="small"
                        value={cell}
                        onChange={(e) => handleChange(i, j, e.target.value)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select
              value={operation}
              label="Operation"
              onChange={(e) => setOperation(e.target.value as any)}
            >
              <MenuItem value="determinant">Determinant</MenuItem>
              <MenuItem value="inverse">Inverse</MenuItem>
              <MenuItem value="transpose">Transpose</MenuItem>
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
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {result}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MatrixCalculator;
