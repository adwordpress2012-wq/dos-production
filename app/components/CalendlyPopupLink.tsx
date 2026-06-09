import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { DISCOVERY_CALL_HREF } from "../lib/booking";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  children: ReactNode;
};

export default function CalendlyPopupLink({ children, ...props }: Props) {
  return (
    <Link href={DISCOVERY_CALL_HREF} {...props}>
      {children}
    </Link>
  );
}
