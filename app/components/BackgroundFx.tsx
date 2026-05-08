export default function BackgroundFx() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute top-[20%] -right-40 h-[560px] w-[560px] rounded-full bg-cyan-400/15 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-[-220px] left-1/3 h-[640px] w-[640px] rounded-full bg-emerald-400/10 blur-[160px] animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
    </div>
  );
}
