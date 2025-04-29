import { create, all, MathJsStatic } from 'mathjs';

// Create sandboxed mathjs instance with limited function set
const math = create(all, {
  // Silent override prevents warning messages
  matrix: 'Matrix'
}) as MathJsStatic;

// Remove potentially unsafe or heavy functions if present
// @ts-ignore
math.import({ import: undefined, createUnit: undefined, eval: undefined, parse: undefined }, { override: true });

export function safeEvaluate(expr: string, scope: Record<string, unknown> = {}) {
  try {
    return math.evaluate(expr, scope);
  } catch (err) {
    throw new Error('Invalid expression');
  }
}

export type Matrix = number[][];
export type MatrixOpType = 'multiply' | 'add' | 'subtract';

export function performMatrixOp(A: Matrix, B: Matrix, type: MatrixOpType): Matrix {
  // Shape validation
  const rowsA = A.length;
  const colsA = A[0]?.length ?? 0;
  const rowsB = B.length;
  const colsB = B[0]?.length ?? 0;

  switch (type) {
    case 'multiply':
      if (colsA !== rowsB) throw new Error('Incompatible dimensions for multiplication');
      break;
    case 'add':
    case 'subtract':
      if (rowsA !== rowsB || colsA !== colsB) throw new Error('Matrices must have same dimensions');
      break;
  }

  let result: Matrix;
  switch (type) {
    case 'multiply':
      result = math.multiply(A, B) as unknown as Matrix;
      break;
    case 'add':
      result = math.add(A, B) as unknown as Matrix;
      break;
    case 'subtract':
      result = math.subtract(A, B) as unknown as Matrix;
      break;
    default:
      result = A;
  }
  return result;
}

export type ComplexOp = 'add' | 'subtract' | 'multiply' | 'divide' | 'conjugate' | 'magnitude' | 'phase';

export function performComplexOp(aReal: number, aImag: number, op: ComplexOp, bReal=0, bImag=0): string {
  const a = math.complex(aReal, aImag);
  if (op === 'conjugate') return math.conj(a).toString();
  if (op === 'magnitude') return math.abs(a).toString();
  if (op === 'phase') return math.arg(a).toString();
  const b = math.complex(bReal, bImag);
  switch(op) {
    case 'add': return math.add(a, b).toString();
    case 'subtract': return math.subtract(a, b).toString();
    case 'multiply': return math.multiply(a, b).toString();
    case 'divide': return math.divide(a, b).toString();
    default: return '0';
  }
}

export function taylorSeries(expr: string, variable: string, terms: number, point = 0): string[] {
  const series: string[] = [];

  const nthDerivative = (expression: string, n: number) => {
    let node: any = math.parse(expression);
    for (let i = 0; i < n; i++) {
      node = math.derivative(node, variable);
    }
    return node;
  };

  for (let k = 0; k < terms; k++) {
    const derivativeNode = k === 0 ? math.parse(expr) : nthDerivative(expr, k);
    const term = `(${derivativeNode.toString()})/${math.factorial(k)} * (${variable}-${point})^${k}`;
    series.push(term);
  }
  return series;
}

export function fourierSeries(expr: string, variable: string, terms: number, period=2*Math.PI): string[] {
  const res: string[] = [];
  for (let k=-terms; k<=terms; k++) {
    const ck = `(1/${period}) * ∫[${expr} * e^(-i*${k}${variable})]d${variable}`;
    res.push(`${ck}*e^(i*${k}${variable})`);
  }
  return res;
}

export function laurentSeries(expr: string, variable: string, terms: number, point=0): string[] {
  const res: string[] = [];
  for (let k=-terms; k<=terms; k++) {
    const ck = `(1/(2πi))∫[${expr}/(${variable}-${point})^${k+1}]d${variable}`;
    res.push(`${ck}*(${variable}-${point})^${k}`);
  }
  return res;
} 