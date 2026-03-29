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

create table if not exists course_modules (
  id text primary key,
  title_pt text not null,
  title_en text not null,
  start_date date not null,
  end_date date not null,
  cohort text not null,
  professor text not null,
  created_at timestamptz not null default now()
);

create table if not exists study_notebooks (
  id text primary key,
  module_id text not null references course_modules(id) on delete cascade,
  status text not null check (status in ('planned', 'active', 'review', 'done')),
  summary_pt text not null,
  summary_en text not null,
  focus_pt text not null,
  focus_en text not null,
  updated_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists notebook_tasks (
  id text primary key,
  notebook_id text not null references study_notebooks(id) on delete cascade,
  title_pt text not null,
  title_en text not null,
  status text not null check (status in ('todo', 'in-progress', 'done')),
  created_at timestamptz not null default now()
);

create index if not exists idx_repositories_subject_id
  on repositories(subject_id);

create index if not exists idx_study_notebooks_module_id
  on study_notebooks(module_id);

create index if not exists idx_notebook_tasks_notebook_id
  on notebook_tasks(notebook_id);

alter table course_modules enable row level security;
alter table study_notebooks enable row level security;
alter table notebook_tasks enable row level security;

create policy "Public read course modules" on course_modules for select using (true);
create policy "Public read study notebooks" on study_notebooks for select using (true);
create policy "Public read notebook tasks" on notebook_tasks for select using (true);