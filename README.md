# DOS — Done-For-You AI Business Systems

The central hub for everything DOS runs:

- Website Rebuilds + Hosting
- Micah AI Receptionist
- COS — AI Communication System
- BOS — AI Booking System
- Command Centre (multi-tenant dashboard)
- Stripe Checkout + onboarding
- Legal: Terms, Privacy, Acceptable Use, Number Policy, Cancellation Policy

Built on Next.js 16 (App Router), React 19, Tailwind CSS v4, Supabase and Stripe — deployed on
Vercel.

## Prerequisites

- Node.js 22.x (see `package.json` engines field)
- A Supabase project (run `supabase/schema.sql` in the SQL editor)
- A Stripe account with prices for each plan (`starter`, `growth`, `scale`)

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in Supabase + Stripe keys in .env.local
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

See `.env.example`. Key variables:

| Var                              | Purpose                                |
| -------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase project URL (https)           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Public anon key (browser-safe; Command Centre / client Supabase) |
| `SUPABASE_SERVICE_ROLE_KEY`      | Server-only writes (RLS bypass)        |
| `STRIPE_SECRET_KEY`              | Checkout session creation              |
| `STRIPE_WEBHOOK_SECRET`          | `/api/stripe/webhook` signature verify |
| `STRIPE_PRICE_STARTER` etc.      | Plan-to-price mapping                  |
| `NEXT_PUBLIC_APP_URL`            | Used in metadata + Stripe redirects    |
| `GHL_PRIVATE_INTEGRATION_TOKEN`  | Server-only Start Here CRM access      |
| `GHL_LOCATION_ID`                | DOS GHL sub-account                    |
| `GHL_DOS_PIPELINE_ID`            | DOS sales pipeline                     |
| `GHL_DOS_PIPELINE_STAGE_ID`      | Initial Start Here opportunity stage   |
| `GHL_START_HERE_CUSTOM_FIELD_MAP`| Start Here field-to-GHL ID mapping     |

**Onboarding:** the amber configuration notice on `/onboarding` appears only when `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is missing, invalid, or placeholder — i.e. when tenant persistence via the service role cannot run. It does **not** depend on `NEXT_PUBLIC_SUPABASE_ANON_KEY`; keep the anon key configured for full-stack and browser features per `.env.example`.

If Supabase or Stripe env vars are missing, the app degrades gracefully:

- Command Centre falls back to demo data and shows a "Connect Supabase" banner.
- Pricing page surfaces a clear error message when checkout is hit without Stripe configured.
- Onboarding queues submissions in memory and emails the team if Supabase isn't reachable.

### Start Here CRM

`/start-here` keeps the DOS-owned form and sends submissions to `/api/start-here`.
The server upserts the GHL contact, adds the Start Here/source/industry tags, then
updates an existing opportunity for that contact in the DOS pipeline or creates one.

Create the nine Contact custom fields listed in `.env.example`, copy their IDs into
`GHL_START_HERE_CUSTOM_FIELD_MAP`, and give the private integration token
`contacts.write`, `opportunities.readonly`, and `opportunities.write` scopes. Until
all GHL values are configured, or whenever GHL returns an error, the server uses the
existing Formspree action as the fallback. GHL credentials are only read by the
server-only integration module.

## Routes

| Path                       | Description                                  |
| -------------------------- | -------------------------------------------- |
| `/`                        | Marketing homepage (10 sections)             |
| `/website-rebuilds`        | Product page                                 |
| `/micah`                   | Micah AI receptionist                        |
| `/cos`                     | COS communication system                     |
| `/bos`                     | BOS booking system                           |
| `/pricing`                 | Plans + Stripe Checkout                      |
| `/onboarding`              | Multi-step onboarding (writes to Supabase)   |
| `/start-here`              | Universal DOS Intake System                  |
| `/discovery`               | Permanent redirect to `/start-here`          |
| `/command-centre`          | Live dashboard wired to Supabase             |
| `/terms`                   | Terms of Service                             |
| `/privacy`                 | Privacy Policy                               |
| `/acceptable-use`          | Acceptable Use Policy                        |
| `/number-policy`           | Voice + SMS / ACMA policy                    |
| `/cancellation-policy`     | Cancellation + refund policy                 |
| `/api/stripe/checkout`     | Creates a Stripe Checkout Session            |
| `/api/stripe/webhook`      | Handles `checkout.session.completed` etc.    |
| `/api/onboarding`          | Persists onboarding into Supabase            |
| `/api/start-here`          | Secure GHL intake with Formspree fallback     |

## Deploying

This project is built for Vercel. Push to GitHub and import into Vercel, or run:

```bash
npx vercel deploy
```

Set the env vars under Project Settings → Environment Variables.

## Design system

- Deep black / navy background with radial purple + cyan + emerald glows
- Glassmorphism cards via `.glass` and `.glass-strong`
- Neon gradient CTAs via `.btn-neon`
- Soft animated glows (`animate-pulse-glow`, `animate-float`)
- Tailwind v4 `@theme` tokens in `app/globals.css`

Major shared components live in `app/components/`.
