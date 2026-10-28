-- Run this once in your Supabase project: SQL Editor -> New query -> paste -> Run.
-- No Supabase Auth, no RLS. Add people yourself: Table editor -> profiles -> Insert row
-- (leave "id" blank, it fills itself). The app lets you pick which row is "you".

-- 1. People who can use this chat
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. One-to-one messages
CREATE TABLE messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Needed so new messages push over Realtime to open chats
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
