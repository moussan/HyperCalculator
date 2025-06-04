# CalcX Architecture Overview

CalcX is a two-tier web application:

1. **Frontend (React/Vite)** – delivers the user interface, performs client-side math evaluation (Algebrite), rendering (KaTeX) and plotting (Plotly). Communication with Supabase is via REST / Edge Functions.
2. **Backend (Supabase)** – provides authentication, Postgres database, and Edge Functions for heavy math and premium compute.

Docker orchestrates both tiers. Coolify deploys the container to production. 