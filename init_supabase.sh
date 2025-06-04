#!/usr/bin/env bash

# Initializes local Supabase migrations and seeds.
# Requires supabase CLI (https://supabase.com/docs/guides/cli)

set -e

if ! command -v supabase > /dev/null; then
  echo "Supabase CLI not installed. Install via: npm i -g supabase" && exit 1
fi

supabase stop || true
supabase start

# apply migrations
supabase db push

# seed data if present
if [ -d "backend/supabase/seed" ]; then
  supabase db execute "$(cat backend/supabase/seed/seed.sql)"
fi

echo "Supabase local dev instance is ready." 