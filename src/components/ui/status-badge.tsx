import { cn } from '@/lib/utils';

type StatusVariant = 'success' | 'warning' | 'danger' | 'neutral';

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-muted text-muted-foreground',
};

const STATUS_VARIANT_MAP: Record<string, StatusVariant> = {
  online: 'success',
  active: 'success',
  running: 'success',
  healthy: 'success',
  maintenance: 'warning',
  paused: 'warning',
  inactive: 'warning',
  offline: 'danger',
  error: 'danger',
  down: 'danger',
};

function getStatusVariant(status: string): StatusVariant {
  return STATUS_VARIANT_MAP[status.toLowerCase()] ?? 'neutral';
}

export interface StatusBadgeProps {
  status: string;
  label?: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ status, label, dot = false, className }: StatusBadgeProps) {
  const variant = getStatusVariant(status);
  const displayText = label ?? status;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-emerald-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'neutral' && 'bg-muted-foreground'
          )}
        />
      )}
      {displayText}
    </span>
  );
}
