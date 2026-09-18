import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  title: React.ReactNode;
  value: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: React.ReactNode;
  trendTone?: 'good' | 'bad' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'compact' | 'bordered';
}

export function Statistic({
  title,
  value,
  prefix,
  suffix,
  precision,
  trend,
  trendValue,
  trendTone,
  icon: Icon,
  description,
  extra,
  footer,
  variant = 'default',
  className,
  ...props
}: StatisticProps) {
  const formattedValue = React.useMemo(() => {
    if (typeof value === 'number' && typeof precision === 'number') {
      return value.toFixed(precision);
    }
    return value;
  }, [value, precision]);

  const resolvedTrend = trend ?? (typeof trendValue === 'string' && trendValue.startsWith('+') ? 'up' : typeof trendValue === 'string' && trendValue.startsWith('-') ? 'down' : undefined);

  const isGood = trendTone
    ? trendTone === 'good'
    : resolvedTrend === 'up';
  const isBad = trendTone
    ? trendTone === 'bad'
    : resolvedTrend === 'down';

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center justify-between rounded-md border bg-card px-3.5 py-2.5 shadow-none transition-colors hover:bg-muted/30',
          className
        )}
        {...props}
      >
        <div className="min-w-0 pr-2">
          <div className="text-xs font-normal text-muted-foreground truncate">{title}</div>
          <div className="flex items-baseline gap-1 mt-0.5">
            {prefix && <span className="text-xs font-medium text-muted-foreground">{prefix}</span>}
            <span className="text-lg font-bold tracking-tight">{formattedValue}</span>
            {suffix && <span className="text-xs font-normal text-muted-foreground">{suffix}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {trendValue && (
            <div
              className={cn(
                'flex items-center text-xs font-medium',
                isGood && 'text-emerald-600 dark:text-emerald-400',
                isBad && 'text-destructive',
                !isGood && !isBad && 'text-muted-foreground'
              )}
            >
              {resolvedTrend === 'up' && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
              {resolvedTrend === 'down' && <ArrowDownRight className="h-3 w-3 mr-0.5" />}
              {resolvedTrend === 'neutral' && <Minus className="h-3 w-3 mr-0.5" />}
              <span>{trendValue}</span>
            </div>
          )}
          {Icon && (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={cn('shadow-none', variant === 'bordered' ? 'border-2' : '', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardDescription className="text-sm font-medium">{title}</CardDescription>
        <div className="flex items-center gap-1.5">
          {extra}
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          {prefix && <span className="text-sm font-semibold text-muted-foreground">{prefix}</span>}
          <div className="text-2xl font-bold tracking-tight">{formattedValue}</div>
          {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
        </div>

        {(trendValue || description) && (
          <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
            {trendValue && (
              <div
                className={cn(
                  'flex items-center font-medium gap-0.5',
                  isGood && 'text-emerald-600 dark:text-emerald-400',
                  isBad && 'text-destructive',
                  !isGood && !isBad && 'text-muted-foreground'
                )}
              >
                {resolvedTrend === 'up' && <ArrowUpRight className="h-3.5 w-3.5" />}
                {resolvedTrend === 'down' && <ArrowDownRight className="h-3.5 w-3.5" />}
                {resolvedTrend === 'neutral' && <Minus className="h-3.5 w-3.5" />}
                <span>{trendValue}</span>
              </div>
            )}
            {description && <div className="truncate">{description}</div>}
          </div>
        )}

        {footer && <div className="mt-3 border-t pt-2.5 text-xs text-muted-foreground">{footer}</div>}
      </CardContent>
    </Card>
  );
}

export function CompactStatistic(props: StatisticProps) {
  return <Statistic variant="compact" {...props} />;
}
