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
| `NEXT_PUBLIC_SUPABASE_URL`       | Command Centre + onboarding API        |
| `SUPABASE_SERVICE_ROLE_KEY`      | Server-side writes (RLS bypass)        |
| `STRIPE_SECRET_KEY`              | Checkout session creation              |
| `STRIPE_WEBHOOK_SECRET`          | `/api/stripe/webhook` signature verify |
| `STRIPE_PRICE_STARTER` etc.      | Plan-to-price mapping                  |
| `NEXT_PUBLIC_APP_URL`            | Used in metadata + Stripe redirects    |

If Supabase or Stripe env vars are missing, the app degrades gracefully:

- Command Centre falls back to demo data and shows a "Connect Supabase" banner.
- Pricing page surfaces a clear error message when checkout is hit without Stripe configured.
- Onboarding queues submissions in memory and emails the team if Supabase isn't reachable.

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
| `/command-centre`          | Live dashboard wired to Supabase             |
| `/terms`                   | Terms of Service                             |
| `/privacy`                 | Privacy Policy                               |
| `/acceptable-use`          | Acceptable Use Policy                        |
| `/number-policy`           | Voice + SMS / ACMA policy                    |
| `/cancellation-policy`     | Cancellation + refund policy                 |
| `/api/stripe/checkout`     | Creates a Stripe Checkout Session            |
| `/api/stripe/webhook`      | Handles `checkout.session.completed` etc.    |
| `/api/onboarding`          | Persists onboarding into Supabase            |

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
