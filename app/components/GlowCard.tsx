import { ReactNode } from "react";

type Tone = "violet" | "cyan" | "emerald" | "amber" | "fuchsia";

const TONE_GRADIENTS: Record<Tone, string> = {
  violet: "from-violet-500/30 via-violet-500/0 to-violet-500/0",
  cyan: "from-cyan-400/30 via-cyan-400/0 to-cyan-400/0",
  emerald: "from-emerald-400/30 via-emerald-400/0 to-emerald-400/0",
  amber: "from-amber-400/30 via-amber-400/0 to-amber-400/0",
  fuchsia: "from-fuchsia-500/30 via-fuchsia-500/0 to-fuchsia-500/0",
};

const TONE_DOT: Record<Tone, string> = {
  violet: "from-violet-400 to-fuchsia-500",
  cyan: "from-cyan-400 to-blue-500",
  emerald: "from-emerald-400 to-teal-500",
  amber: "from-amber-400 to-orange-500",
  fuchsia: "from-fuchsia-400 to-pink-500",
};

type Props = {
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export default function GlowCard({ tone = "violet", className = "", children }: Props) {
  return (
    <div className={`group relative ${className}`}>
      <div
        aria-hidden
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${TONE_GRADIENTS[tone]} opacity-60 blur-md transition duration-500 group-hover:opacity-100`}
      />
      <div className="relative glass rounded-2xl p-6 h-full overflow-hidden">
        <div
          aria-hidden
          className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${TONE_DOT[tone]} opacity-25 blur-2xl transition duration-500 group-hover:opacity-40`}
        />
        {children}
      </div>
    </div>
  );
}

export function GlowIcon({ tone = "violet", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${TONE_DOT[tone]} text-white shadow-[0_0_30px_-6px_rgba(168,85,247,0.6)]`}
    >
      {children}
    </div>
  );
}
