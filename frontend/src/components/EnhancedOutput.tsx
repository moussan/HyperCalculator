import React from 'react';
import MathRenderer from './MathRenderer';
import GraphPlot from './GraphPlot';

interface Props {
  latex?: string;
  graph?: { xs: number[]; ys: number[]; title?: string };
}

const EnhancedOutput: React.FC<Props> = ({ latex, graph }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {latex && <MathRenderer latex={latex} block />}
    {graph && (
      <div style={{ height: 300 }}>
        <GraphPlot {...graph} />
      </div>
    )}
  </div>
);

export default EnhancedOutput; 