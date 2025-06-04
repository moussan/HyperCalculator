import Algebrite from 'algebrite';

export function integrateDefinite(expr: string, a: number, b: number): number {
  try {
    const integral = Algebrite.integral(expr).toString();
    const F = Algebrite.run(`float(subst(${b},x,${integral})) - float(subst(${a},x,${integral}))`);
    return parseFloat(F);
  } catch (err) {
    console.error('Integration error', err);
    throw err;
  }
}

export function differentiate(expr: string): string {
  try {
    return Algebrite.simplify(Algebrite.diff(expr).toString()).toString();
  } catch (err) {
    console.error('Derivative error', err);
    throw err;
  }
} 