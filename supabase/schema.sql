create table if not exists subjects (
  id text primary key,
  name_pt text not null,
  name_en text not null,
  summary_pt text not null,
  summary_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists repositories (
  id text primary key,
  subject_id text not null references subjects(id) on delete cascade,
  full_name text not null,
  url text not null,
  language text not null,
  stars int not null default 0,
  last_activity date not null,
  level text not null check (level in ('foundation', 'intermediate', 'advanced')),
  tags text[] not null default '{}',
  why_pt text not null,
  why_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists repo_updates (
  id text primary key,
  repo_full_name text not null,
  repo_url text not null,
  updated_at timestamptz not null,
  summary_pt text not null,
  summary_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists milestones (
  id text primary key,
  title_pt text not null,
  title_en text not null,
  status text not null check (status in ('todo', 'in-progress', 'done')),
  subject_id text not null,
  reference_url text,
  notes_pt text not null,
  notes_en text not null,
  created_at timestamptz not null default now()
);

alter table subjects enable row level security;
alter table repositories enable row level security;
alter table repo_updates enable row level security;
alter table milestones enable row level security;

create policy "Public read subjects" on subjects for select using (true);
create policy "Public read repositories" on repositories for select using (true);
create policy "Public read updates" on repo_updates for select using (true);
create policy "Public read milestones" on milestones for select using (true);
