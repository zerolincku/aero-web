import * as React from "react"
import { useTranslation } from "react-i18next"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export type Option = {
  label: string
  value: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
  maxCount?: number
  maxCountText?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyText,
  className,
  disabled = false,
  maxCount,
  maxCountText,
}: MultiSelectProps) {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const selectedOptions = options.filter((option) => selected.includes(option.value))
  const isMaxReached = maxCount !== undefined && selected.length >= maxCount

  const handleSelect = (value: string) => {
    const isSelected = selected.includes(value)
    if (isSelected) {
      onChange(selected.filter((i) => i !== value))
    } else {
      if (isMaxReached) return
      onChange([...selected, value])
    }
  }

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between h-auto min-h-10 py-1.5 px-3 font-normal",
            className
          )}
        >
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {selectedOptions.length === 0 && (
              <span className="text-muted-foreground">{placeholder || t('common.multiSelect.placeholder', 'Select options...')}</span>
            )}
            {selectedOptions.map((option) => (
              <Badge
                variant="secondary"
                key={option.value}
                className="mr-1 mb-1 hover:bg-secondary/80 font-normal"
                onClick={(e) => {
                  e.stopPropagation()
                  if (!disabled) handleUnselect(option.value)
                }}
              >
                {option.label}
                <X className="ml-1 h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder || t('common.multiSelect.searchPlaceholder', 'Search...')} />
          <CommandList>
            <CommandEmpty>{emptyText || t('common.multiSelect.emptyText', 'No item found.')}</CommandEmpty>
            <CommandGroup>
              {isMaxReached && maxCountText && (
                <div className="px-2 py-1.5 text-xs text-muted-foreground border-b">
                  {maxCountText}
                </div>
              )}
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                const isDisabled = option.disabled || (!isSelected && isMaxReached)
                return (
                  <CommandItem
                    key={option.value}
                    disabled={isDisabled}
                    onSelect={() => {
                      if (!isDisabled) handleSelect(option.value)
                    }}
                    className={cn(isDisabled && "opacity-50 cursor-not-allowed")}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


