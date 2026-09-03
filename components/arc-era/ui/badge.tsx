import * as React from 'react';

import { cn } from '@/lib/arc-era/utils';

const badgeVariants =
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent bg-primary px-2 py-0.5 text-xs font-medium whitespace-nowrap text-primary-foreground transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!';

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="badge" className={cn(badgeVariants, className)} {...props} />;
}

export { Badge, badgeVariants };
