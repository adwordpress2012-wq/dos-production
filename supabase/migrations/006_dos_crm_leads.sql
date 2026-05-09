-- Migrate existing databases: rename legacy pipeline table, extend clients, add CRM leads.
-- Safe to run once; re-run skips completed steps where IF NOT EXISTS applies.

-- 1) Legacy table was named "leads" with tenant_id — rename to tenant_leads for onboarding/Micah.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads' and column_name = 'tenant_id'
  ) then
    alter table public.leads rename to tenant_leads;
  end if;
end $$;

-- 2) Paying-client flag for business_profiles (clients list shows is_paying_customer = true only).
alter table public.business_profiles
  add column if not exists is_paying_customer boolean not null default true;

-- 3) CRM leads table (only if missing — fresh installs use schema.sql).
create table if not exists public.leads (
  id                    uuid primary key default gen_random_uuid(),
  business_name         text not null,
  contact_person        text not null,
  phone                 text,
  email                 text not null,
  website_url           text,
  business_type         text,
  source                text not null
                          check (source in ('walk_in', 'cold_call', 'flyer', 'referral', 'website', 'other')),
  interested_in         text[] not null default '{}',
  status                text not null default 'new'
                          check (status in (
                            'new', 'contacted', 'demo_booked', 'proposal_sent',
                            'won', 'lost', 'follow_up_later'
                          )),
  next_follow_up_date   date,
  notes                 text,
  converted_client_id   uuid references public.business_profiles (id) on delete set null,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists leads_crm_status_idx on public.leads (status);
create index if not exists leads_crm_created_idx on public.leads (created_at desc);
create index if not exists leads_crm_email_idx on public.leads (lower(email));
create index if not exists leads_crm_converted_idx on public.leads (converted_client_id);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

alter table public.leads enable row level security;
