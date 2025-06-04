// Example Supabase Edge Function to compute definite integral
import { serve } from 'https://esm.sh/serve@1.0.0';
import algebrite from 'https://esm.sh/algebrite@1.5.0';

serve(async (req) => {
  try {
    const { expr, a, b } = await req.json();
    const integral = algebrite.integral(expr).toString();
    const res = algebrite.run(`float(subst(${b},x,${integral})) - float(subst(${a},x,${integral}))`);
    return new Response(JSON.stringify({ result: parseFloat(res) }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}); 