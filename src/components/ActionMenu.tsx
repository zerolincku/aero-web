import { useCallback, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type ActionMenuRenderProps = {
  closeMenu: () => void;
};

type ActionMenuProps = {
  ariaLabel: string;
  contentClassName?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  children: (props: ActionMenuRenderProps) => ReactNode;
};

type ActionMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  trailing?: ReactNode;
};

type ActionMenuSubmenuProps = {
  icon?: ReactNode;
  label: ReactNode;
  disabled?: boolean;
  title?: string;
  panelClassName?: string;
  children: ReactNode;
};

export function ActionMenu({
  ariaLabel,
  contentClassName,
  align = 'end',
  sideOffset = 6,
  children,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const closeMenuTimerRef = useRef<number | null>(null);

  const clearMenuCloseTimer = useCallback(() => {
    if (closeMenuTimerRef.current !== null) {
      window.clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearMenuCloseTimer();
    setOpen(true);
  }, [clearMenuCloseTimer]);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const closeMenuNow = useCallback(() => {
    clearMenuCloseTimer();
    setOpen(false);
  }, [clearMenuCloseTimer]);

  const scheduleCloseMenu = useCallback(() => {
    clearMenuCloseTimer();
    closeMenuTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeMenuTimerRef.current = null;
    }, 180);
  }, [clearMenuCloseTimer]);

  useEffect(() => {
    return () => {
      clearMenuCloseTimer();
    };
  }, [clearMenuCloseTimer]);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen: boolean) => {
        if (nextOpen) {
          openMenu();
        } else {
          closeMenuNow();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={ariaLabel}
          onPointerDown={(event) => {
            if (open && event.button === 0) {
              event.preventDefault();
            }
          }}
          onClick={(event) => {
            if (open) {
              event.preventDefault();
            }
          }}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleCloseMenu}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        className={cn('z-[70] p-1', contentClassName)}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}
      >
        {children({ closeMenu })}
      </PopoverContent>
    </Popover>
  );
}

export function ActionMenuItem({
  icon,
  trailing,
  className,
  children,
  ...props
}: ActionMenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {icon ? <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">{icon}</span> : null}
      <span className="truncate">{children}</span>
      {trailing ? <span className="ml-auto inline-flex h-4 w-4 items-center justify-center text-muted-foreground">{trailing}</span> : null}
    </button>
  );
}

export function ActionMenuSubmenu({
  icon,
  label,
  disabled = false,
  title,
  panelClassName,
  children,
}: ActionMenuSubmenuProps) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openSubmenu = useCallback(() => {
    if (disabled) {
      return;
    }
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer, disabled]);

  const scheduleCloseSubmenu = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 220);
  }, [clearCloseTimer]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <div
      className="relative"
      onMouseEnter={openSubmenu}
      onMouseLeave={scheduleCloseSubmenu}
    >
      <ActionMenuItem
        icon={icon}
        trailing={<ChevronLeft className="h-3.5 w-3.5" />}
        disabled={disabled}
        title={title}
        onMouseEnter={openSubmenu}
      >
        {label}
      </ActionMenuItem>
      <div
        className={cn(
          'absolute top-0 right-full z-[80] mr-1 w-44 rounded-md border bg-background p-1 shadow-md after:absolute after:top-0 after:-right-1 after:h-full after:w-1 after:content-[""]',
          open && !disabled ? 'block' : 'hidden',
          panelClassName,
        )}
        onMouseEnter={openSubmenu}
        onMouseLeave={scheduleCloseSubmenu}
      >
        {children}
      </div>
    </div>
  );
}
