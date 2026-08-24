import type { LucideIcon } from "lucide-react";

export type FlowStage = {
  title: string;
  copy: string;
  icon: LucideIcon;
  /** Marks a stage where a person takes over, so human control stays visible in the flow. */
  human?: boolean;
};

type Props = {
  eyebrow: string;
  heading: string;
  intro?: string;
  stages: readonly FlowStage[];
};

export default function SystemFlow({ eyebrow, heading, intro, stages }: Props) {
  return (
    <section className="site-section">
      <div className="site-container">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-heading mt-5">{heading}</h2>
        {intro ? <p className="section-copy mt-6">{intro}</p> : null}
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stages.map(({ title, copy, icon: Icon, human }, index) => (
            <li
              key={title}
              className={`surface-card flex flex-col rounded-2xl p-6 ${
                human ? "border-teal-300/25" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                    human ? "bg-teal-400/12 text-teal-200" : "bg-violet-500/12 text-violet-200"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs font-semibold tracking-[0.2em] text-ink-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
              {human ? (
                <span className="mt-5 inline-flex w-fit items-center rounded-lg bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-200">
                  Human control
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
