import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = "h-16 w-auto", priority = false }: Props) {
  return (
    <Image
      src="/dos-hub-logo.png"
      alt="DOS HUB AI Business Solutions"
      width={329}
      height={153}
      priority={priority}
      className={`block object-contain ${className}`}
      sizes="(max-width: 640px) 132px, 172px"
    />
  );
}
