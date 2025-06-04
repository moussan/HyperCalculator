// Basic adaptive Runge-Kutta (Cash-Karp) solver for dy/dx = f(x,y)
export interface OdeResult { xs: number[]; ys: number[] }

export function ode45(
  f: (x: number, y: number) => number,
  x0: number,
  y0: number,
  xEnd: number,
  h = 0.1,
  tol = 1e-6
): OdeResult {
  const xs: number[] = [x0];
  const ys: number[] = [y0];
  let x = x0;
  let y = y0;

  // Cash-Karp coefficients
  const a2 = 1 / 5,
    a3 = 3 / 10,
    a4 = 3 / 5,
    a5 = 1,
    a6 = 7 / 8;

  const b: number[][] = [
    [],
    [1 / 5],
    [3 / 40, 9 / 40],
    [3 / 10, -9 / 10, 6 / 5],
    [-11 / 54, 5 / 2, -70 / 27, 35 / 27],
    [1631 / 55296, 175 / 512, 575 / 13824, 44275 / 110592, 253 / 4096],
  ];

  const c: number[] = [37 / 378, 0, 250 / 621, 125 / 594, 0, 512 / 1771];
  const cStar: number[] = [2825 / 27648, 0, 18575 / 48384, 13525 / 55296, 277 / 14336, 1 / 4];

  const errorNorm = (err: number) => Math.abs(err);

  while (x < xEnd) {
    if (x + h > xEnd) h = xEnd - x;

    const k1 = h * f(x, y);
    const k2 = h * f(x + a2 * h, y + b[1][0] * k1);
    const k3 = h * f(x + a3 * h, y + b[2][0] * k1 + b[2][1] * k2);
    const k4 = h * f(x + a4 * h, y + b[3][0] * k1 + b[3][1] * k2 + b[3][2] * k3);
    const k5 = h * f(x + a5 * h, y + b[4][0] * k1 + b[4][1] * k2 + b[4][2] * k3 + b[4][3] * k4);
    const k6 = h * f(
      x + a6 * h,
      y + b[5][0] * k1 + b[5][1] * k2 + b[5][2] * k3 + b[5][3] * k4 + b[5][4] * k5
    );

    const yNext = y +
      c[0] * k1 + c[1] * k2 + c[2] * k3 + c[3] * k4 + c[4] * k5 + c[5] * k6;
    const yErr =
      (c[0] - cStar[0]) * k1 +
      (c[2] - cStar[2]) * k3 +
      (c[3] - cStar[3]) * k4 +
      (c[4] - cStar[4]) * k5 +
      (c[5] - cStar[5]) * k6;

    const errNorm = errorNorm(yErr);
    if (errNorm <= tol || h <= 1e-5) {
      x += h;
      y = yNext;
      xs.push(x);
      ys.push(y);
    }
    // adaptive step
    const delta = 0.84 * Math.pow(tol / (errNorm || 1e-10), 0.25);
    h *= Math.min(4, Math.max(0.1, delta));
  }

  return { xs, ys };
} 