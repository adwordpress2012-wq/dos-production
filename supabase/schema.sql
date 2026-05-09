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

-- ── leads ────────────────────────────────────────────────────────────────────
-- Inbound leads captured by Sarah AI or manually entered.
create table if not exists public.leads (
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

-- Indexes for the most common query patterns
create index if not exists leads_tenant_id_idx    on public.leads (tenant_id);
create index if not exists leads_status_idx       on public.leads (tenant_id, status);
create index if not exists leads_created_at_idx   on public.leads (created_at desc);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ── business_profiles ────────────────────────────────────────────────────────
-- Client directory for Command Centre admin (/admin/clients). Distinct from tenants
-- (billing/subdomain) — link manually if needed.
create table if not exists public.business_profiles (
  id              uuid primary key default gen_random_uuid(),
  client_id       text not null unique,
  business_name   text not null,
  email           text not null,
  phone           text,
  status          text not null default 'active'
                    check (status in ('active', 'inactive', 'pending', 'archived')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists business_profiles_email_idx on public.business_profiles (lower(email));
create index if not exists business_profiles_created_idx on public.business_profiles (created_at desc);

drop trigger if exists business_profiles_set_updated_at on public.business_profiles;
create trigger business_profiles_set_updated_at
  before update on public.business_profiles
  for each row execute function public.set_updated_at();

-- ── Row-Level Security ────────────────────────────────────────────────────────
alter table public.tenants enable row level security;
alter table public.leads    enable row level security;
alter table public.business_profiles enable row level security;

-- Service role bypasses RLS (used server-side with SUPABASE_SERVICE_ROLE_KEY).
-- Add user-facing policies here when you wire up auth.

-- Example: allow authenticated dashboard users to read their profile (adjust to your auth model):
-- create policy "read own business profile"
--   on public.business_profiles for select
--   using (auth.uid() is not null);

-- Example tenant isolation policy (uncomment when auth is ready):
-- create policy "Tenants can read own row"
--   on public.tenants for select
--   using (id = (current_setting('app.tenant_id', true))::uuid);

-- create policy "Leads belong to tenant"
--   on public.leads for all
--   using (tenant_id = (current_setting('app.tenant_id', true))::uuid);
