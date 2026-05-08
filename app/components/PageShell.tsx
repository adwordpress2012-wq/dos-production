import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export default function PageShell({ eyebrow, title, description, children }: Props) {
  return (
    <main className="relative pt-32 sm:pt-40">
      <section className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 mt-16">{children}</section>
    </main>
  );
}
