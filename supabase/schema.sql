-- Run in Supabase: SQL Editor > New query.
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  business_name text,
  service text not null,
  budget text,
  message text not null check (char_length(message) between 10 and 3000),
  preferred_contact text not null default 'email' check (preferred_contact in ('email','whatsapp','instagram')),
  status text not null default 'pending' check (status in ('pending','in_progress','completed')),
  created_at timestamptz not null default now()
);
create table if not exists admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create or replace function is_admin() returns boolean language sql security definer stable as $$
  select exists (select 1 from admin_profiles where user_id = auth.uid());
$$;

alter table enquiries enable row level security;
alter table admin_profiles enable row level security;

-- Visitors can submit, but never read, enquiries.
create policy "anyone can submit" on enquiries for insert to anon, authenticated
  with check (status = 'pending');
create policy "admins read" on enquiries for select to authenticated using (is_admin());
create policy "admins update" on enquiries for update to authenticated using (is_admin());
create policy "admins delete" on enquiries for delete to authenticated using (is_admin());
create policy "admins see own profile" on admin_profiles for select to authenticated using (user_id = auth.uid());

-- TODO tables (projects, services, blog_posts, pricing_packages) are not included yet.
-- Make yourself admin after creating a user in Auth:
-- insert into admin_profiles (user_id) values ('<your-auth-user-uuid>');
