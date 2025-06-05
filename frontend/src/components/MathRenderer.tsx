import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

interface Props {
  latex: string;
  block?: boolean;
}

const MathRenderer: React.FC<Props> = ({ latex, block = false }) => (
  <TeX math={latex} block={block} />
);

export default MathRenderer; 