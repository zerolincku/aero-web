import os

new_code = """import { ReactNode, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

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

type ActionMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
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

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={ariaLabel}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={sideOffset}
        className={cn('w-44', contentClassName)}
      >
        {children({ closeMenu })}
      </DropdownMenuContent>
    </DropdownMenu>
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
    <DropdownMenuItem
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {icon ? <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">{icon}</span> : null}
      <span className="truncate flex-1">{children}</span>
      {trailing ? <span className="ml-auto inline-flex h-4 w-4 items-center justify-center text-muted-foreground">{trailing}</span> : null}
    </DropdownMenuItem>
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
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger disabled={disabled} title={title}>
        {icon ? <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">{icon}</span> : null}
        <span className="truncate flex-1">{label}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className={panelClassName}>
        {children}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
"""

with open("src/components/ActionMenu.tsx", "w", encoding="utf-8") as f:
    f.write(new_code)
