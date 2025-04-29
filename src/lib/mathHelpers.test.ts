import { performMatrixOp, performComplexOp, taylorSeries } from './mathHelpers';

describe('mathHelpers', () => {
  it('matrix multiplication', () => {
    const A = [[1,2],[3,4]];
    const B = [[5,6],[7,8]];
    const result = performMatrixOp(A, B, 'multiply');
    expect(result).toEqual([[19,22],[43,50]]);
  });

  it('complex magnitude', () => {
    const res = performComplexOp(3, 4, 'magnitude');
    expect(res).toBe('5');
  });

  it('taylor series first term matches function', () => {
    const series = taylorSeries('sin(x)', 'x', 1);
    expect(series[0]).toContain('sin(x)');
  });
}); 