import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-gray-300 text-secondary-foreground hover:bg-gray-300/80',
        destructive:
          'border-transparent bg-red-500 text-destructive-foreground hover:bg-red-500/80',
        outline: 'text-foreground',
        warning: 'bg-orange-500 text-white hover:bg-orange-500/80',
        success: 'bg-green-500 text-white hover:bg-green-500/80',
        waiting: 'text-white bg-gray-400 hover:bg-gray-400/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
