import * as React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  status?: StepStatus;
  disabled?: boolean;
}

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number;
  status?: StepStatus;
  items: StepItem[];
  direction?: 'horizontal' | 'vertical';
  size?: 'default' | 'sm';
  onChange?: (current: number) => void;
}

export function Steps({
  current = 0,
  status = 'process',
  items = [],
  direction = 'horizontal',
  size = 'default',
  onChange,
  className,
  ...props
}: StepsProps) {
  const isVertical = direction === 'vertical';
  const isSm = size === 'sm';

  return (
    <div
      className={cn(
        'w-full',
        isVertical ? 'flex flex-col space-y-4' : 'flex items-start justify-between',
        className
      )}
      {...props}
    >
      {items.map((item, index) => {
        let stepStatus: StepStatus = 'wait';
        if (item.status) {
          stepStatus = item.status;
        } else if (index < current) {
          stepStatus = 'finish';
        } else if (index === current) {
          stepStatus = status;
        } else {
          stepStatus = 'wait';
        }

        const isClickable = !!onChange && !item.disabled;
        const isLast = index === items.length - 1;
        const Icon = item.icon;

        return (
          <div
            key={index}
            className={cn(
              'group relative flex',
              isVertical ? 'items-start gap-4' : 'flex-1 items-start',
              !isLast && !isVertical && 'pr-4'
            )}
          >
            {/* Step header / indicator button */}
            <div
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={() => isClickable && onChange(index)}
              onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onChange(index);
                }
              }}
              className={cn(
                'flex items-center gap-3 text-left',
                isClickable && 'cursor-pointer select-none',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {/* Step indicator circle */}
              <div
                className={cn(
                  'relative z-10 flex shrink-0 items-center justify-center rounded-full font-medium transition-all',
                  isSm ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm',
                  stepStatus === 'wait' && 'border-2 border-muted-foreground/30 bg-muted text-muted-foreground',
                  stepStatus === 'process' && 'border-2 border-primary bg-primary text-primary-foreground shadow-sm',
                  stepStatus === 'finish' && 'border-2 border-primary bg-primary/10 text-primary',
                  stepStatus === 'error' && 'border-2 border-destructive bg-destructive/10 text-destructive'
                )}
              >
                {stepStatus === 'finish' ? (
                  <Check className={cn(isSm ? 'h-3 w-3' : 'h-4 w-4', 'stroke-[2.5]')} />
                ) : stepStatus === 'error' ? (
                  <X className={cn(isSm ? 'h-3 w-3' : 'h-4 w-4', 'stroke-[2.5]')} />
                ) : Icon ? (
                  <Icon className={cn(isSm ? 'h-3 w-3' : 'h-4 w-4')} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Title and description */}
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    'font-medium leading-none',
                    isSm ? 'text-xs' : 'text-sm',
                    stepStatus === 'process' && 'text-foreground font-semibold',
                    stepStatus === 'wait' && 'text-muted-foreground',
                    stepStatus === 'finish' && 'text-foreground',
                    stepStatus === 'error' && 'text-destructive'
                  )}
                >
                  {item.title}
                </div>
                {item.description && (
                  <div
                    className={cn(
                      'mt-1 text-muted-foreground leading-relaxed',
                      isSm ? 'text-[11px]' : 'text-xs'
                    )}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connecting line */}
            {!isLast && (
              isVertical ? (
                <div
                  className={cn(
                    'absolute left-[15px] top-[34px] -bottom-[12px] w-[2px] -translate-x-1/2',
                    index < current ? 'bg-primary' : 'bg-border'
                  )}
                />
              ) : (
                <div
                  className={cn(
                    'ml-3 mt-4 h-[2px] flex-1 transition-colors',
                    index < current ? 'bg-primary' : 'bg-border'
                  )}
                />
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
