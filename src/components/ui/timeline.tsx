import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

export function Timeline({ className, children, ...props }: TimelineProps) {
  return (
    <ol className={cn('relative space-y-4', className)} {...props}>
      {children}
    </ol>
  );
}

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export function TimelineItem({ className, children, ...props }: TimelineItemProps) {
  return (
    <li className={cn('relative flex gap-3 text-sm last:after:hidden', className)} {...props}>
      {children}
    </li>
  );
}

export function TimelineSeparator({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col items-center shrink-0', className)} {...props}>
      {children}
    </div>
  );
}

const timelineDotVariants = cva(
  'relative z-10 flex items-center justify-center rounded-full border transition-colors',
  {
    variants: {
      tone: {
        default: 'border-muted-foreground/30 bg-muted text-muted-foreground',
        primary: 'border-primary bg-primary text-primary-foreground',
        success: 'border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-500',
        warning: 'border-amber-500 bg-amber-500 text-white dark:border-amber-400 dark:bg-amber-500',
        destructive: 'border-destructive bg-destructive text-destructive-foreground',
        outline: 'border-border bg-background text-foreground',
      },
      size: {
        default: 'h-6 w-6 text-xs',
        sm: 'h-3.5 w-3.5',
        lg: 'h-8 w-8 text-sm',
      },
    },
    defaultVariants: {
      tone: 'default',
      size: 'default',
    },
  }
);

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  children?: React.ReactNode;
}

export function TimelineDot({ className, tone, size, children, ...props }: TimelineDotProps) {
  return (
    <div className={cn(timelineDotVariants({ tone, size }), className)} {...props}>
      {children}
    </div>
  );
}

export interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
}

export function TimelineConnector({ className, dashed, ...props }: TimelineConnectorProps) {
  return (
    <div
      className={cn(
        'w-[2px] grow -mb-4 mt-1 bg-border',
        dashed && 'border-l-2 border-dashed border-border bg-transparent',
        className
      )}
      {...props}
    />
  );
}

export function TimelineContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('min-w-0 pb-2 space-y-1', className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn('font-medium leading-none tracking-tight text-foreground', className)} {...props}>
      {children}
    </h4>
  );
}

export function TimelineTime({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

export function TimelineDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-0.5 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}
