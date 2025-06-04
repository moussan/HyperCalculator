import { serve } from 'https://esm.sh/serve@1.0.0';
import numeric from 'https://esm.sh/numeric@1.2.6';

// simple Euler fallback if numeric not available.
function euler(f, x0, y0, xEnd, h = 0.1) {
  const xs = [];
  const ys = [];
  for (let x = x0, y = y0; x <= xEnd; x += h) {
    xs.push(x);
    ys.push(y);
    y += h * f(x, y);
  }
  return { xs, ys };
}

serve(async (req) => {
  try {
    const { expr, x0, y0, xEnd, h } = await req.json();
    const f = new Function('x', 'y', `return ${expr};`);
    const res = euler(f, x0, y0, xEnd, h);
    return new Response(JSON.stringify(res), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}); 