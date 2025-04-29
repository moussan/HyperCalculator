import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Tooltip } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import FunctionsIcon from '@mui/icons-material/Functions';
import { create, all } from 'mathjs';

const math = create(all);

const buttons = [
  ['AC', '±', '%', 'Rand'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '−'],
  ['0', '.', '=', '+'],
];

const BasicCalculator: React.FC = () => {
  const [expression, setExpression] = useState('');

  const handleClick = (value: string) => {
    if (value === '') return;
    if (value === 'AC') {
      handleClear();
      return;
    }
    if (value === '←') {
      handleBackspace();
      return;
    }
    if (value === '%') {
      try {
        const res = math.evaluate(`${expression} / 100`);
        setExpression(res.toString());
      } catch {
        setExpression('Error');
      }
      return;
    }
    if (value === 'Rand') {
      const randVal = Math.random().toString();
      setExpression(randVal);
      return;
    }
    if (value === '±') {
      try {
        const res = math.evaluate(`-1 * (${expression})`);
        setExpression(res.toString());
      } catch {
        setExpression('Error');
      }
      return;
    }
    if (value === '=') {
      try {
        const res = math.evaluate(expression);
        setExpression(res.toString());
      } catch {
        setExpression('Error');
      }
    } else {
      const evalMap: Record<string, string> = { '÷': '/', '×': '*', '−': '-' };
      const insert = evalMap[value] ?? value;
      setExpression((prev) => (prev === 'Error' ? insert : prev + insert));
    }
  };

  const handleClear = () => setExpression('');
  const handleBackspace = () => setExpression((prev) => prev.slice(0, -1));

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 320, mx: 'auto' }}>
      <TextField
        fullWidth
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        inputProps={{ style: { fontSize: 24, textAlign: 'right' } }}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={1}>
        {buttons.map((row, rowIndex) =>
          row.map((btn, colIndex) => (
            <Grid item xs={3} key={`${rowIndex}-${colIndex}`}>
              <Tooltip
                title={
                  btn === '←'
                    ? 'Backspace'
                    : btn === 'AC'
                      ? 'Clear'
                      : btn === '%'
                        ? 'Percentage'
                        : btn === 'Rand'
                          ? 'Random'
                          : btn === '±'
                            ? '±'
                            : ''
                }
              >
                <Button
                  variant={
                    ['÷', '×', '−', '+', '=', '/', '*', '-'].includes(btn)
                      ? 'contained'
                      : 'outlined'
                  }
                  color={
                    ['÷', '×', '−', '+', '=', '/', '*', '-'].includes(btn) ? 'primary' : 'inherit'
                  }
                  fullWidth
                  size="large"
                  onClick={() => handleClick(btn)}
                >
                  {btn === '←' ? <BackspaceIcon /> : btn}
                </Button>
              </Tooltip>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default BasicCalculator;
