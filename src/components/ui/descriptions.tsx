import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DescriptionsItemProps {
  label: React.ReactNode;
  span?: number;
  children: React.ReactNode;
  className?: string;
}

export function DescriptionsItem({ children }: DescriptionsItemProps) {
  return <>{children}</>;
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  column?: number;
  size?: 'default' | 'sm';
  layout?: 'horizontal' | 'vertical';
  items?: Array<{
    key?: React.Key;
    label: React.ReactNode;
    children: React.ReactNode;
    span?: number;
  }>;
}

export function Descriptions({
  title,
  extra,
  bordered = false,
  column = 3,
  size = 'default',
  layout = 'horizontal',
  items,
  children,
  className,
  ...props
}: DescriptionsProps) {
  const isSm = size === 'sm';

  // Extract items from children if not provided via items prop
  const resolvedItems = React.useMemo(() => {
    if (items) return items;
    const extracted: Array<{
      key?: React.Key;
      label: React.ReactNode;
      children: React.ReactNode;
      span?: number;
    }> = [];

    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement<DescriptionsItemProps>(child)) {
        extracted.push({
          key: child.key ?? index,
          label: child.props.label,
          children: child.props.children,
          span: child.props.span,
        });
      }
    });

    return extracted;
  }, [items, children]);

  return (
    <div className={cn('w-full space-y-3', className)} {...props}>
      {(title || extra) && (
        <div className="flex items-center justify-between">
          {title && <h4 className="text-base font-semibold leading-none tracking-tight">{title}</h4>}
          {extra && <div className="text-sm text-muted-foreground">{extra}</div>}
        </div>
      )}

      {bordered ? (
        <div className="overflow-hidden rounded-lg border text-sm">
          <table className="w-full border-collapse">
            <tbody>
              {Array.from({ length: Math.ceil(resolvedItems.length / column) }).map((_, rowIndex) => {
                const rowItems = resolvedItems.slice(rowIndex * column, (rowIndex + 1) * column);
                return (
                  <tr key={rowIndex} className="border-b last:border-b-0 divide-x">
                    {rowItems.map((item, itemIndex) => (
                      <React.Fragment key={item.key ?? itemIndex}>
                        <th
                          className={cn(
                            'bg-muted/50 font-medium text-muted-foreground text-left align-top whitespace-nowrap',
                            isSm ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
                          )}
                        >
                          {item.label}
                        </th>
                        <td
                          colSpan={item.span ? item.span * 2 - 1 : 1}
                          className={cn(
                            'text-foreground align-top bg-card',
                            isSm ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
                          )}
                        >
                          {item.children}
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className={cn(
            'grid gap-4',
            column === 1 && 'grid-cols-1',
            column === 2 && 'grid-cols-1 sm:grid-cols-2',
            column === 3 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
            column >= 4 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
          )}
        >
          {resolvedItems.map((item, idx) => (
            <div
              key={item.key ?? idx}
              style={item.span ? { gridColumn: `span ${item.span} / span ${item.span}` } : undefined}
              className={cn(
                layout === 'horizontal' ? 'flex items-baseline gap-2' : 'flex flex-col gap-1',
                isSm ? 'text-xs' : 'text-sm'
              )}
            >
              <span className="font-medium text-muted-foreground shrink-0">
                {item.label}
                {layout === 'horizontal' ? ':' : ''}
              </span>
              <span className="text-foreground min-w-0 break-words">{item.children}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
