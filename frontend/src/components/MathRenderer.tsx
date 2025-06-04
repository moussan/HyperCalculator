import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from '@matejmazur/react-katex';

interface Props {
  latex: string;
  block?: boolean;
}

const MathRenderer: React.FC<Props> = ({ latex, block = false }) => (
  block ? <BlockMath math={latex} /> : <InlineMath math={latex} />
);

export default MathRenderer; 