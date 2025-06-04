import { serve } from 'https://esm.sh/serve@1.0.0';
import algebrite from 'https://esm.sh/algebrite@1.5.0';

serve(async (req) => {
  try {
    const { expr } = await req.json();
    const derivative = algebrite.simplify(algebrite.diff(expr).toString()).toString();
    return new Response(JSON.stringify({ result: derivative }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}); 