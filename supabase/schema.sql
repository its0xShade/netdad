-- ── NetDad Supabase Schema ─────────────────────────────
-- Run in: Supabase Dashboard → SQL Editor → New query

-- 1. Progress table (lesson completion)
create table if not exists public.progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- 2. Bookmarks table
create table if not exists public.bookmarks (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- 3. Exam scores table
create table if not exists public.exam_scores (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  score int not null,
  total int not null,
  pct int not null,
  passed boolean not null default false,
  created_at timestamptz not null default now()
);

-- 4. User profiles (onboarding data)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  skill_level text,
  goal text,
  onboarded_at timestamptz,
  updated_at timestamptz default now()
);

-- ── Row Level Security ──
alter table public.progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.exam_scores enable row level security;
alter table public.profiles enable row level security;

-- Users can only read/write their own rows
create policy "own progress" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own exam scores" on public.exam_scores
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);