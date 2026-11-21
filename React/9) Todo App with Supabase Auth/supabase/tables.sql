-- Run this once in Supabase: SQL Editor -> New query -> Run

create table public.user_todos (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  text text not null
);

-- No policies: turn RLS off so the app can read and write directly
alter table public.user_todos disable row level security;
