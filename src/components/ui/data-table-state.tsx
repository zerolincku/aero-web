import type { ReactNode } from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import { EmptyState, type EmptyStateProps } from './empty-state';
import { TableEmpty } from './table';
import { cn } from '@/lib/utils';

type DataTableStateRowProps = {
  colSpan: number;
  className?: string;
};

type DataTableLoadingRowProps = DataTableStateRowProps & {
  label: ReactNode;
};

type DataTableEmptyRowProps = DataTableStateRowProps &
  Pick<EmptyStateProps, 'action' | 'description' | 'icon' | 'title'>;

type DataTableErrorRowProps = DataTableStateRowProps & {
  title: ReactNode;
  description?: ReactNode;
  retryLabel: string;
  onRetry: () => void;
};

export function DataTableLoadingRow({
  colSpan,
  label,
  className,
}: DataTableLoadingRowProps) {
  return (
    <TableEmpty colSpan={colSpan} className={cn('h-32 p-0', className)}>
      <div
        className="flex items-center justify-center gap-2 whitespace-normal text-sm"
        role="status"
        aria-live="polite"
      >
        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </TableEmpty>
  );
}

export function DataTableEmptyRow({
  colSpan,
  className,
  ...emptyStateProps
}: DataTableEmptyRowProps) {
  return (
    <TableEmpty colSpan={colSpan} className={cn('h-auto p-0 whitespace-normal', className)}>
      <EmptyState {...emptyStateProps} className="py-10" />
    </TableEmpty>
  );
}

export function DataTableErrorRow({
  colSpan,
  title,
  description,
  retryLabel,
  onRetry,
  className,
}: DataTableErrorRowProps) {
  return (
    <TableEmpty colSpan={colSpan} className={cn('h-auto p-0 whitespace-normal', className)}>
      <div role="alert">
        <EmptyState
          icon={<AlertCircle className="h-6 w-6 text-destructive" />}
          title={title}
          description={description}
          action={{
            label: retryLabel,
            onClick: onRetry,
            variant: 'outline',
          }}
          className="py-10"
        />
      </div>
    </TableEmpty>
  );
}
