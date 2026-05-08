import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps & { href: string; onClick?: never; type?: never; disabled?: never };
type AsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type Props = AsLink | AsButton;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "btn-neon text-white shadow-lg",
  ghost: "btn-ghost text-white",
  outline:
    "bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition",
};

export default function NeonButton(props: Props) {
  const { variant = "primary", className = "", children } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap active:scale-[0.98] transition";
  const cls = `${base} ${VARIANT_CLASSES[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${cls} disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
    >
      {children}
    </button>
  );
}
