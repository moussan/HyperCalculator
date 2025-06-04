# CalcX

A responsive, web-based scientific calculator inspired by the iOS calculator UI but extended with advanced mathematics such as definite integrals, symbolic differentiation and numerical ODE solving.

## Tech Stack

* **Frontend**: React + TypeScript, Modern UI, Redux Toolkit
* **Backend**: Supabase (Postgres, Auth, Edge Functions)
* **Math**: Algebrite, Math.js
* **Visualisation**: Plotly.js, KaTeX
* **Deployment**: Docker, Coolify

## Local Development

```bash
# install client deps
cd frontend && npm install

# copy env template and fill
cp ../env.example .env

# start dev server
npm start
```

## Docker

```bash
docker-compose up --build
```

---

For Supabase credentials create a `.env` file (see `env.example`). 