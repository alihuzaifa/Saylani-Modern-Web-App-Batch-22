create table public.users (
  id bigint generated always as identity primary key,
  name text not null
);

create table public.messages (
  id bigint generated always as identity primary key,
  sender_id bigint not null references public.users(id),
  receiver_id bigint not null references public.users(id),
  content text not null,
  created_at timestamptz not null default now()
);

alter publication supabase_realtime add table public.messages;

-- Test users
insert into public.users (name) values ('Ali'), ('Ahmed'), ('Sara'), ('Fatima');
