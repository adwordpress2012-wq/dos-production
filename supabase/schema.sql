-- ============================================================
-- DirectiveOS — Supabase Schema
-- Run this in the Supabase SQL Editor to bootstrap your database.
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── tenants ──────────────────────────────────────────────────────────────────
-- One row per customer account (brokerage, team, or individual).
create table if not exists public.tenants (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  subdomain           text not null unique,
  stripe_customer_id  text unique,
  status              text not null default 'active'
                        check (status in ('active', 'trialing', 'past_due', 'canceled', 'suspended')),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Index for subdomain lookups (used on every request for multi-tenant routing)
create index if not exists tenants_subdomain_idx on public.tenants (subdomain);

-- Auto-update updated_at on any row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tenants_set_updated_at on public.tenants;
create trigger tenants_set_updated_at
  before update on public.tenants
  for each row execute function public.set_updated_at();

-- ── tenant_leads ─────────────────────────────────────────────────────────────
-- Per-tenant pipeline (onboarding, Micah, etc.). Renamed from legacy "leads".
create table if not exists public.tenant_leads (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid not null references public.tenants (id) on delete cascade,
  name              text not null,
  phone             text,
  property_address  text,
  summary           text,
  status            text not null default 'new'
                      check (status in ('new', 'contacted', 'qualified', 'disqualified', 'closed')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists tenant_leads_tenant_id_idx    on public.tenant_leads (tenant_id);
create index if not exists tenant_leads_status_idx       on public.tenant_leads (tenant_id, status);
create index if not exists tenant_leads_created_at_idx   on public.tenant_leads (created_at desc);

drop trigger if exists tenant_leads_set_updated_at on public.tenant_leads;
create trigger tenant_leads_set_updated_at
  before update on public.tenant_leads
  for each row execute function public.set_updated_at();

-- ── business_profiles ────────────────────────────────────────────────────────
-- Paying clients (/admin/clients). Rows with is_paying_customer = false are hidden there.
create table if not exists public.business_profiles (
  id                   uuid primary key default gen_random_uuid(),
  client_id            text not null unique,
  business_name        text not null,
  email                text not null,
  phone                text,
  status               text not null default 'active'
                         check (status in ('active', 'inactive', 'pending', 'archived')),
  is_paying_customer   boolean not null default true,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists business_profiles_email_idx on public.business_profiles (lower(email));
create index if not exists business_profiles_created_idx on public.business_profiles (created_at desc);
create index if not exists business_profiles_paying_idx on public.business_profiles (is_paying_customer);

drop trigger if exists business_profiles_set_updated_at on public.business_profiles;
create trigger business_profiles_set_updated_at
  before update on public.business_profiles
  for each row execute function public.set_updated_at();

-- ── leads (DOS CRM) ────────────────────────────────────────────────────────────
-- Sales pipeline for Command Centre /admin/leads. Distinct from tenant_leads.
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

-- ── Row-Level Security ────────────────────────────────────────────────────────
alter table public.tenants           enable row level security;
alter table public.tenant_leads      enable row level security;
alter table public.business_profiles enable row level security;
alter table public.leads             enable row level security;

-- Server-side admin routes use the Supabase service role key, which bypasses RLS.

-- Optional: when you add Supabase Auth for /admin, attach policies such as:
-- create policy "crm_leads_auth_all"
--   on public.leads for all to authenticated using (true) with check (true);
