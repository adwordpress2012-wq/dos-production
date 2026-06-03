import Image from "next/image";

type Props = {
  className?: string;
};

export default function Logo({ className = "h-8 w-8" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <Image src="/dos-icon-v2.png" alt="DOS" fill sizes="32px" className="object-contain" priority />
    </div>
  );
}
