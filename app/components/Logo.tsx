import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = "h-16 w-auto", priority = false }: Props) {
  return (
    <Image
      src="/dos-ecosystem-logo.webp"
      alt="DOS Ecosystem — Automate, Scale, Grow"
      width={1748}
      height={899}
      unoptimized
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`block object-contain ${className}`}
    />
  );
}
