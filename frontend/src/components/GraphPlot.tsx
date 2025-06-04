import React from 'react';
import Plot from 'react-plotly.js';

interface Props {
  xs: number[];
  ys: number[];
  title?: string;
}

const GraphPlot: React.FC<Props> = ({ xs, ys, title = 'Plot' }) => (
  <Plot
    data={[{ x: xs, y: ys, type: 'scatter', mode: 'lines', line: { color: '#007bff' } }]}
    layout={{ title, autosize: true }}
    style={{ width: '100%', height: '100%' }}
  />
);

export default GraphPlot; 