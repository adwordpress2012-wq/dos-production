export default function BackgroundFx() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -left-40 -top-48 h-[560px] w-[560px] rounded-full bg-violet-600/15 blur-[150px]" />
      <div className="absolute -right-52 top-[24%] h-[620px] w-[620px] rounded-full bg-fuchsia-500/10 blur-[170px]" />
      <div className="absolute bottom-[-260px] left-1/3 h-[680px] w-[680px] rounded-full bg-teal-400/[0.07] blur-[180px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
    </div>
  );
}
