import React, { useState } from 'react';
import { integrateDefinite, differentiate } from '../services/calculus';
import { ode45 } from '../services/ode';
import EnhancedOutput from './EnhancedOutput';

const Calculator: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [outputLatex, setLatex] = useState<string | undefined>();
  const [graphData, setGraphData] = useState<{ xs: number[]; ys: number[]; title?: string } | undefined>();
  const [lastLatex, setLastLatex] = useState<string>('');

  const handleEvaluate = async () => {
    try {
      if (expr.startsWith('int ')) {
        // format: int expr,a,b
        const [, body] = expr.split('int ');
        const [exp, aStr, bStr] = body.split(',');
        // try remote first
        try {
          const { data, error } = await (await import('../services/remoteCompute')).computeIntegralRemote(
            exp,
            parseFloat(aStr),
            parseFloat(bStr)
          );
          if (error) throw error;
          const res = data.result as number;
          setLatex(`\\int_{${aStr}}^{${bStr}} ${exp}\\,dx = ${res}`);
          setLastLatex(`\\int_{${aStr}}^{${bStr}} ${exp}\\,dx = ${res}`);
        } catch {
          const res = integrateDefinite(exp, parseFloat(aStr), parseFloat(bStr));
          setLatex(`\\int_{${aStr}}^{${bStr}} ${exp}\\,dx = ${res}`);
          setLastLatex(`\\int_{${aStr}}^{${bStr}} ${exp}\\,dx = ${res}`);
        }
      } else if (expr.startsWith('diff ')) {
        const [, body] = expr.split('diff ');
        try {
          const { data, error } = await (await import('../services/remoteCompute')).computeDerivativeRemote(body);
          if (error) throw error;
          const res = data.result as string;
          setLatex(`\\frac{d}{dx}(${body}) = ${res}`);
          setLastLatex(`\\frac{d}{dx}(${body}) = ${res}`);
        } catch {
          const res = differentiate(body);
          setLatex(`\\frac{d}{dx}(${body}) = ${res}`);
          setLastLatex(`\\frac{d}{dx}(${body}) = ${res}`);
        }
      } else if (expr.startsWith('ode ')) {
        // ode dy/dx=x+y,0,1,2 (expr,x0,y0,xEnd)
        const [, body] = expr.split('ode ');
        const [rhs, x0, y0, xEnd] = body.split(',');
        const f = new Function('x', 'y', `return ${rhs};`) as (x: number, y: number) => number;
        const res = ode45(f, parseFloat(x0), parseFloat(y0), parseFloat(xEnd));
        setGraphData({ xs: res.xs, ys: res.ys, title: 'ODE Solution' });
        setLatex(undefined);
        setLastLatex('');
      } else {
        setLatex('Unsupported command');
      }
    } catch (err) {
      setLatex('Error');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <input
        style={{ width: '100%', padding: '0.5rem', fontSize: '1.2rem' }}
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        placeholder="Enter command e.g. 'int x^2,0,1' or 'diff sin(x)' or 'ode x+y,0,1,2'"
      />
      <button style={{ width: '100%', marginTop: '1rem' }} onClick={handleEvaluate}>
        Evaluate
      </button>
      {(outputLatex || graphData) && <>
        <EnhancedOutput latex={outputLatex} graph={graphData} />
        {outputLatex && (
          <button style={{ marginTop: '1rem' }} onClick={() => import('../services/exportPdf').then(m => m.exportLatexToPdf(lastLatex))}>
            Export to PDF
          </button>
        )}
      </>}
    </div>
  );
};

export default Calculator; 