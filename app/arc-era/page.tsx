'use client';

import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Bot,
  CalendarClock,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleDollarSign,
  ExternalLink,
  FileText,
  Inbox,
  MessageSquareText,
  PencilLine,
  Send,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/arc-era/ui/badge';
import { Button } from '@/components/arc-era/ui/button';
import { Card, CardContent } from '@/components/arc-era/ui/card';
import { Textarea } from '@/components/arc-era/ui/textarea';
import { cn } from '@/lib/arc-era/utils';

type ArcAction = 'paid' | 'follow-up' | 'review' | null;
type EraAction = 'sent' | 'editing' | 'assigned' | null;

const arcOutcomes = [
  'Clear collection status',
  'Consistent follow-up',
  'Reduced manual chasing',
  'Human-controlled escalation',
  'Better cash-flow visibility',
];

const eraOutcomes = [
  'Faster response times',
  'Important emails prioritised',
  'Reduced inbox monitoring',
  'Consistent communication',
  'Human approval maintained',
];

const arcSteps = [
  'Invoice Due',
  'Friendly Reminder Sent',
  'Client Replied',
  'Micah Analysed Response',
];

const eraSteps = [
  'Email Received',
  'Micah Reads & Classifies',
  'Priority: HIGH',
  'Draft Response Prepared',
  'Correct Team Member Notified',
];

const initialDraft =
  'Hi Sarah, thanks for following up. We’ve flagged the variation for immediate review and the team will confirm the approval status shortly.';

function SectionIntro({
  eyebrow,
  title,
  description,
  tone,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone: 'amber' | 'teal';
}) {
  return (
    <div className="max-w-3xl">
      <p className={cn('text-xs font-semibold uppercase tracking-[0.2em]', tone === 'amber' ? 'text-amber-300' : 'text-teal-300')}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-balance sm:text-4xl lg:text-[2.85rem]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  );
}

function WorkflowSteps({
  steps,
  finalStep,
  tone,
}: {
  steps: string[];
  finalStep: string;
  tone: 'amber' | 'teal';
}) {
  const allSteps = [...steps, finalStep];

  return (
    <ol className="grid gap-3" aria-label="Workflow progress">
      {allSteps.map((step, index) => {
        const isFinal = index === allSteps.length - 1;
        return (
          <li key={`${step}-${index}`} className="relative flex gap-3">
            {index < allSteps.length - 1 && (
              <span className="absolute left-[11px] top-6 h-[calc(100%+0.25rem)] w-px bg-white/10" aria-hidden="true" />
            )}
            <span
              className={cn(
                'relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border',
                isFinal
                  ? tone === 'amber'
                    ? 'border-amber-300/45 bg-amber-300/15 text-amber-200'
                    : 'border-teal-300/45 bg-teal-300/15 text-teal-200'
                  : 'border-white/15 bg-[#101c26] text-slate-300',
              )}
            >
              {isFinal ? <CircleAlert className="size-3.5" /> : <Check className="size-3.5" />}
            </span>
            <span className={cn('pt-0.5 text-sm leading-6', isFinal ? 'font-medium text-foreground' : 'text-muted-foreground')}>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function OutcomePanel({ title, outcomes, tone }: { title: string; outcomes: string[]; tone: 'amber' | 'teal' }) {
  return (
    <aside className="rounded-2xl border border-white/[0.08] bg-[#0a141d]/80 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-3 text-sm leading-6 text-slate-200">
            <CheckCircle2 className={cn('mt-1 size-4 shrink-0', tone === 'amber' ? 'text-amber-300' : 'text-teal-300')} />
            {outcome}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FlowLine({ label, steps, tone }: { label: string; steps: string[]; tone: 'amber' | 'teal' }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:p-6">
      <p className={cn('mb-5 text-xs font-semibold uppercase tracking-[0.18em]', tone === 'amber' ? 'text-amber-300' : 'text-teal-300')}>
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {steps.map((step, index) => (
          <div key={step} className="contents">
            <span className="rounded-lg border border-white/10 bg-[#0a141d] px-3 py-2 text-sm text-slate-200">{step}</span>
            {index < steps.length - 1 && <ArrowRight className="size-4 text-slate-600" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [arcAction, setArcAction] = useState<ArcAction>(null);
  const [eraAction, setEraAction] = useState<EraAction>(null);
  const [draft, setDraft] = useState(initialDraft);
  const [ctaNotice, setCtaNotice] = useState(false);

  const arcStatus =
    arcAction === 'paid'
      ? 'Paid · Account Closed'
      : arcAction === 'follow-up'
        ? 'Follow-Up Created · Monday'
        : arcAction === 'review'
          ? 'Escalated · Awaiting Review'
          : '7 Days Overdue';

  const arcFinalStep =
    arcAction === 'paid'
      ? 'Payment Received'
      : arcAction === 'follow-up'
        ? 'Monday Follow-Up Scheduled'
        : arcAction === 'review'
          ? 'Escalated for Human Review'
          : 'Human Review Required';

  const eraStatus =
    eraAction === 'sent'
      ? 'Approved & Sent'
      : eraAction === 'editing'
        ? 'Draft Open for Editing'
        : eraAction === 'assigned'
          ? 'Assigned to Projects Lead'
          : 'Human Approval Required';

  return (
    <main className="arc-era-demo min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(44,168,156,0.10),transparent_32%),radial-gradient(circle_at_12%_20%,rgba(213,156,67,0.08),transparent_28%)]" />

      <nav className="relative mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-5 py-5 sm:px-6 md:px-10 md:py-6">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-semibold tracking-tight">
            DOS
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Directive OS</p>
            <p className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Interactive Business Workflow Demo
            </p>
          </div>
        </div>
        <Badge className="h-auto border border-teal-300/20 bg-teal-300/10 px-3 py-2 text-[11px] text-teal-100">
          <ShieldCheck data-icon="inline-start" /> Sample data only
        </Badge>
      </nav>

      <section className="relative mx-auto grid w-full max-w-[1180px] gap-10 px-5 pb-20 pt-14 sm:px-6 md:px-10 md:pb-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pt-24">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">DOS ARC + ERA</p>
          <h1 className="max-w-4xl text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
            Take Control of Cash Flow and Customer Communication.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-xl sm:leading-8">
            DOS ARC helps businesses control overdue accounts. DOS ERA helps teams respond to important emails faster. Micah assists with the workflow while your team remains in control.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { name: 'DOS ARC', outcome: 'Protect Cash Flow', tone: 'amber' },
            { name: 'DOS ERA', outcome: 'Protect Response Time', tone: 'teal' },
          ].map(({ name, outcome, tone }) => (
            <Card key={name} className="border-white/10 bg-white/[0.045] py-0 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <CardContent className="flex items-center justify-between gap-6 p-5">
                <div>
                  <p className={cn('text-xs font-semibold tracking-[0.18em]', tone === 'amber' ? 'text-amber-300' : 'text-teal-300')}>
                    {name}
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-tight">{outcome}</p>
                </div>
                <CheckCircle2 className={tone === 'amber' ? 'text-amber-300' : 'text-teal-300'} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="col-span-full mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Explore the two workflows</span>
          <ArrowDown className="size-4" />
        </div>
      </section>

      <section className="relative border-t border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-6 md:px-10 md:py-24">
          <SectionIntro
            eyebrow="Workflow 01 · Cash Flow"
            title="DOS ARC — Accounts Receivable Control"
            description="Know what is overdue, what has been actioned, and exactly what needs human attention next."
            tone="amber"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.7fr)]">
            <Card className="border-white/10 bg-[#0c1721]/90 py-0 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <CardContent className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/[0.08] pb-6">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-amber-300/10 text-amber-300">
                      <FileText className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm text-muted-foreground">Atlas Commercial Group</p>
                      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="text-xl font-semibold tracking-tight">INV-2048</p>
                        <p className="text-lg font-medium text-slate-300">$18,500</p>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      'h-auto border px-3 py-2 text-xs',
                      arcAction === 'paid'
                        ? 'border-teal-300/25 bg-teal-300/10 text-teal-200'
                        : arcAction === 'review'
                          ? 'border-rose-300/25 bg-rose-300/10 text-rose-200'
                          : 'border-amber-300/25 bg-amber-300/10 text-amber-200',
                    )}
                  >
                    {arcStatus}
                  </Badge>
                </div>

                <div className="grid gap-7 py-7 md:grid-cols-[0.75fr_1.25fr]">
                  <WorkflowSteps steps={arcSteps} finalStep={arcFinalStep} tone="amber" />

                  <div className="grid gap-4">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        <MessageSquareText className="size-4" /> Customer reply
                      </div>
                      <blockquote className="mt-4 text-base leading-7 text-slate-200">
                        “Hi, accounts are processing this Friday. We expect payment to be released then.”
                      </blockquote>
                    </div>

                    <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                        <Bot className="size-4" /> Micah insight
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-200">
                        <strong className="font-semibold text-white">Recommended Action:</strong> Wait until Friday before escalating. Create a follow-up task for Monday if payment has not been received.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-white/[0.08] pt-6" aria-label="Accounts receivable actions">
                  <Button
                    size="lg"
                    aria-pressed={arcAction === 'paid'}
                    onClick={() => setArcAction('paid')}
                    className={cn('h-11 px-4', arcAction === 'paid' && 'bg-teal-300 text-slate-950 hover:bg-teal-200')}
                  >
                    <CircleDollarSign data-icon="inline-start" /> Mark Paid
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    aria-pressed={arcAction === 'follow-up'}
                    onClick={() => setArcAction('follow-up')}
                    className={cn('h-11 border-white/15 bg-white/[0.03] px-4', arcAction === 'follow-up' && 'border-amber-300/35 bg-amber-300/10 text-amber-100')}
                  >
                    <CalendarClock data-icon="inline-start" /> Create Follow-Up
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    aria-pressed={arcAction === 'review'}
                    onClick={() => setArcAction('review')}
                    className={cn('h-11 border-white/15 bg-white/[0.03] px-4', arcAction === 'review' && 'border-rose-300/35 bg-rose-300/10 text-rose-100')}
                  >
                    <UserCheck data-icon="inline-start" /> Escalate for Review
                  </Button>
                </div>
                <output className="mt-4 block min-h-6 text-sm text-muted-foreground" aria-live="polite">
                  {arcAction ? `Account status updated: ${arcStatus}.` : 'Choose an action to update this sample account.'}
                </output>
              </CardContent>
            </Card>

            <OutcomePanel title="Business outcomes" outcomes={arcOutcomes} tone="amber" />
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.07]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-6 md:px-10 md:py-24">
          <SectionIntro
            eyebrow="Workflow 02 · Customer Communication"
            title="DOS ERA — Email Response Automation"
            description="Important customer emails are classified, prepared and routed to the right person without relying on someone constantly monitoring the inbox."
            tone="teal"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.7fr)]">
            <Card className="border-white/10 bg-[#0c1721]/90 py-0 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <CardContent className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/[0.08] pb-6">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-teal-300/10 text-teal-300">
                      <Inbox className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm text-muted-foreground">Sarah Mitchell — Apex Projects</p>
                      <p className="mt-1 text-xl font-semibold tracking-tight">Urgent variation approval required</p>
                    </div>
                  </div>
                  <Badge className="h-auto border border-rose-300/25 bg-rose-300/10 px-3 py-2 text-xs text-rose-200">
                    Priority: HIGH
                  </Badge>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Incoming message</p>
                  <blockquote className="mt-3 text-base leading-7 text-slate-200">
                    “Can you please confirm whether the revised variation has been approved? We need to finalise tomorrow’s works.”
                  </blockquote>
                </div>

                <div className="grid gap-7 py-7 md:grid-cols-[0.75fr_1.25fr]">
                  <WorkflowSteps steps={eraSteps} finalStep={eraStatus} tone="teal" />

                  <div className="rounded-xl border border-teal-300/15 bg-teal-300/[0.055] p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
                        <Bot className="size-4" /> Micah draft
                      </div>
                      {eraAction === 'editing' && <Badge className="border border-teal-300/20 bg-teal-300/10 text-teal-100">Editing locally</Badge>}
                    </div>
                    {eraAction === 'editing' ? (
                      <Textarea
                        aria-label="Edit sample Micah draft"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        className="mt-4 min-h-36 resize-none border-white/15 bg-[#071019]/70 text-base leading-7 text-slate-100"
                      />
                    ) : (
                      <p className="mt-4 text-base leading-7 text-slate-200">“{draft}”</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-white/[0.08] pt-6" aria-label="Email response actions">
                  <Button
                    size="lg"
                    aria-pressed={eraAction === 'sent'}
                    onClick={() => setEraAction('sent')}
                    className={cn('h-11 bg-teal-300 px-4 text-slate-950 hover:bg-teal-200', eraAction === 'sent' && 'ring-2 ring-teal-200/30')}
                  >
                    <Send data-icon="inline-start" /> Approve & Send
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    aria-pressed={eraAction === 'editing'}
                    onClick={() => setEraAction(eraAction === 'editing' ? null : 'editing')}
                    className={cn('h-11 border-white/15 bg-white/[0.03] px-4', eraAction === 'editing' && 'border-teal-300/35 bg-teal-300/10 text-teal-100')}
                  >
                    <PencilLine data-icon="inline-start" /> {eraAction === 'editing' ? 'Close Editor' : 'Edit Draft'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    aria-pressed={eraAction === 'assigned'}
                    onClick={() => setEraAction('assigned')}
                    className={cn('h-11 border-white/15 bg-white/[0.03] px-4', eraAction === 'assigned' && 'border-teal-300/35 bg-teal-300/10 text-teal-100')}
                  >
                    <Users data-icon="inline-start" /> Assign to Team
                  </Button>
                </div>
                <output className="mt-4 block min-h-6 text-sm text-muted-foreground" aria-live="polite">
                  {eraAction ? `Email workflow updated: ${eraStatus}.` : 'Choose an action to update this sample email workflow.'}
                </output>
              </CardContent>
            </Card>

            <OutcomePanel title="Business outcomes" outcomes={eraOutcomes} tone="teal" />
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-6 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">The managed system</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl">
                Two Bottlenecks. Two Managed DOS Workflows.
              </h2>
              <p className="mt-6 text-xl font-medium leading-8 text-slate-200">AI assists. Humans decide. DOS manages the system.</p>
            </div>

            <div className="grid gap-4">
              <FlowLine label="DOS ARC" tone="amber" steps={['Invoice', 'Micah', 'Follow-Up', 'Human Decision', 'Payment']} />
              <FlowLine label="DOS ERA" tone="teal" steps={['Email', 'Micah', 'Priority & Draft', 'Human Decision', 'Response']} />
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(229,169,81,0.10),rgba(44,168,156,0.08))] p-6 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-2xl font-medium tracking-tight">Turn one meaningful bottleneck into a managed workflow.</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                Directive OS identifies one meaningful business bottleneck, designs the workflow, deploys the system and manages it through DOS Managed Technology (DMT).
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Button
                size="lg"
                className="h-12 w-full px-5 text-sm sm:w-auto"
                onClick={() => setCtaNotice(true)}
              >
                Book a DOS Discovery <ExternalLink data-icon="inline-end" />
              </Button>
              <output className="mt-3 block max-w-72 text-xs leading-5 text-muted-foreground" aria-live="polite">
                {ctaNotice ? 'Demo mode — no booking system is connected.' : 'No customer information is collected in this demo.'}
              </output>
            </div>
          </div>

          <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-7 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-teal-300" /> Fictitious demonstration data only
            </div>
            <p>Directive OS · Business Control Demo</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
