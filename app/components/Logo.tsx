type Props = {
  className?: string;
};

export default function Logo({ className = "h-8 w-8" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-90 shadow-[0_0_30px_-4px_rgba(168,85,247,0.6)]" />
      <div className="absolute inset-[1.5px] rounded-[10px] bg-[#04060c] flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2">
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34f7c1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M5 7.5C5 6.12 6.12 5 7.5 5h6A6.5 6.5 0 0 1 20 11.5v1A6.5 6.5 0 0 1 13.5 19h-6A2.5 2.5 0 0 1 5 16.5v-9Z"
            stroke="url(#logo-grad)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="12.5" cy="12" r="2" fill="url(#logo-grad)" />
        </svg>
      </div>
    </div>
  );
}
