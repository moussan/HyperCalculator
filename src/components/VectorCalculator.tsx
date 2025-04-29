import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Slider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Box
} from '@mui/material';
import { create, all, MathJsStatic } from 'mathjs';

const math = create(all) as MathJsStatic;

interface VectorFieldConfig {
  density: number;
  scale: number;
  showStreamlines: boolean;
}

const VectorCalculator: React.FC = () => {
  const [exprX, setExprX] = useState('y');
  const [exprY, setExprY] = useState('-x');
  const [config, setConfig] = useState<VectorFieldConfig>({
    density: 20,
    scale: 1,
    showStreamlines: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawVectorField = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { density, scale, showStreamlines } = config;
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#1976d2';
    ctx.lineWidth = 1;

    for (let px = 0; px < width; px += density) {
      for (let py = 0; py < height; py += density) {
        const xVal = (px - width / 2) / scale;
        const yVal = (py - height / 2) / scale;

        let Fx: number;
        let Fy: number;
        try {
          Fx = math.evaluate(exprX, { x: xVal, y: yVal });
          Fy = math.evaluate(exprY, { x: xVal, y: yVal });
        } catch (err) {
          continue; // skip invalid cell
        }

        const len = Math.hypot(Fx, Fy) || 1e-6;
        const nx = (Fx / len) * density * 0.4;
        const ny = (Fy / len) * density * 0.4;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + nx, py + ny);
        ctx.stroke();

        if (showStreamlines) {
          ctx.strokeStyle = '#dc004e';
          let cx = px;
          let cy = py;
          for (let i = 0; i < 10; i++) {
            const nxStep = (Fx / len) * density * 0.4;
            const nyStep = (Fy / len) * density * 0.4;
            const nx1 = cx + nxStep;
            const ny1 = cy + nyStep;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(nx1, ny1);
            ctx.stroke();
            cx = nx1;
            cy = ny1;
            if (cx < 0 || cy < 0 || cx > width || cy > height) break;
          }
          ctx.strokeStyle = '#1976d2';
        }
      }
    }
  };

  // Redraw when config or expressions change
  useEffect(() => {
    drawVectorField();
  }, [exprX, exprY, config]);

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Vector Field Visualizer</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="F_x(x,y)"
            value={exprX}
            onChange={(e) => setExprX(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="F_y(x,y)"
            value={exprY}
            onChange={(e) => setExprY(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Density</Typography>
          <Slider
            min={5}
            max={40}
            step={1}
            value={config.density}
            onChange={(_, val) =>
              setConfig((c) => ({ ...c, density: val as number }))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Scale</Typography>
          <Slider
            min={0.5}
            max={5}
            step={0.1}
            value={config.scale}
            onChange={(_, val) =>
              setConfig((c) => ({ ...c, scale: val as number }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={config.showStreamlines}
                onChange={(_, checked) =>
                  setConfig((c) => ({ ...c, showStreamlines: checked }))
                }
              />
            }
            label="Show streamlines"
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ border: 1, borderColor: 'divider' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={drawVectorField}>Redraw</Button>
      </Box>
    </Paper>
  );
};

export default VectorCalculator; 