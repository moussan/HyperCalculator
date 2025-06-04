import { supabase } from './auth';

export const computeIntegralRemote = (expr: string, a: number, b: number) =>
  supabase.functions.invoke('computeIntegral', { body: { expr, a, b } });

export const computeDerivativeRemote = (expr: string) =>
  supabase.functions.invoke('computeDerivative', { body: { expr } });

export const solveOderRemote = (
  expr: string,
  x0: number,
  y0: number,
  xEnd: number,
  h = 0.1
) => supabase.functions.invoke('solveODE', { body: { expr, x0, y0, xEnd, h } }); 