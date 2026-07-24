import Image from "next/image";
import TalkToMicahButton from "./TalkToMicahButton";

export const OFFICIAL_MICAH_PROFILE_SRC = "/micah/micah-official-profile.png";

type Props = {
  priority?: boolean;
  compact?: boolean;
  showCta?: boolean;
  context?: string;
};

export default function OfficialMicahProfile({
  priority = false,
  compact = false,
  showCta = true,
  context = "micah-profile",
}: Props) {
  return (
    <div className={`mx-auto w-full ${compact ? "max-w-[390px]" : "max-w-[560px]"}`}>
      <div className="micah-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090b12]">
        <Image
          src={OFFICIAL_MICAH_PROFILE_SRC}
          alt="Micah, the Directive OS Smart Business Assistant"
          width={1254}
          height={1254}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 92vw"
          className="block h-auto w-full"
        />
      </div>

      {showCta ? (
        <div className="mt-5 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(34,211,197,0.85)]" />
            Micah is online now
          </p>
          <TalkToMicahButton
            context={context}
            className="btn-micah mx-auto mt-3 flex w-full max-w-sm items-center justify-center rounded-2xl px-7 py-4 text-base font-semibold text-white"
          >
            Talk to Micah Live
          </TalkToMicahButton>
          <p className="mt-3 text-xs font-medium tracking-[0.12em] text-ink-muted">
            Voice <span aria-hidden>•</span> Chat <span aria-hidden>•</span> Business Discovery
          </p>
        </div>
      ) : null}
    </div>
  );
}
