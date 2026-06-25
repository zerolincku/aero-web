import * as React from "react"
import { useTranslation } from "react-i18next"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export type TransferItem = {
  id: string
  label: string
  disabled?: boolean
}

interface TransferProps {
  dataSource: TransferItem[]
  targetKeys: string[]
  onChange: (targetKeys: string[]) => void
  leftTitle?: string
  rightTitle?: string
  className?: string
}

function ListPanel({
  title,
  items,
  selected,
  direction,
  onSelectAll,
  onSelect,
}: {
  title: string
  items: TransferItem[]
  selected: string[]
  direction: "left" | "right"
  onSelectAll: (direction: "left" | "right", checked: boolean) => void
  onSelect: (id: string, checked: boolean) => void
}) {
  const { t } = useTranslation()
  const availableItems = items.filter((i) => !i.disabled)
  const isAllSelected =
    availableItems.length > 0 && selected.length === availableItems.length
  const isIndeterminate =
    selected.length > 0 && selected.length < availableItems.length

  const [listRef] = useAutoAnimate<HTMLDivElement>()

  return (
    <Card className="w-full sm:w-[250px] flex flex-col shadow-none">
      <CardHeader className="p-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isAllSelected || (isIndeterminate ? "indeterminate" : false)}
              onCheckedChange={(c) => onSelectAll(direction, c as boolean)}
              disabled={availableItems.length === 0}
            />
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">
            {selected.length} / {items.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 h-[250px]">
        <ScrollArea className="h-full">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground p-4 text-center">
              {t('common.transfer.noData', 'No data')}
            </div>
          ) : (
            <div className="p-2 space-y-1" ref={listRef}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md transition-colors",
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-muted/50",
                    selected.includes(item.id) && !item.disabled && "bg-primary/5"
                  )}
                  onClick={() => {
                    if (!item.disabled) {
                      onSelect(item.id, !selected.includes(item.id))
                    }
                  }}
                >
                  <Checkbox
                    checked={selected.includes(item.id)}
                    disabled={item.disabled}
                    onCheckedChange={(c) => {
                      if (!item.disabled) onSelect(item.id, c as boolean)
                    }}
                  />
                  <span className="text-sm select-none">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export function Transfer({
  dataSource,
  targetKeys,
  onChange,
  leftTitle,
  rightTitle,
  className,
}: TransferProps) {
  const { t } = useTranslation()
  const defaultLeftTitle = leftTitle || t('common.transfer.source', 'Source')
  const defaultRightTitle = rightTitle || t('common.transfer.target', 'Target')
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])

  const leftDataSource = dataSource.filter((item) => !targetKeys.includes(item.id))
  const rightDataSource = dataSource.filter((item) => targetKeys.includes(item.id))

  const leftSelectedKeys = selectedKeys.filter((key) =>
    leftDataSource.some((item) => item.id === key)
  )
  const rightSelectedKeys = selectedKeys.filter((key) =>
    rightDataSource.some((item) => item.id === key)
  )

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedKeys((prev) => [...prev, id])
    } else {
      setSelectedKeys((prev) => prev.filter((k) => k !== id))
    }
  }

  const handleSelectAll = (direction: "left" | "right", checked: boolean) => {
    const source = direction === "left" ? leftDataSource : rightDataSource
    const availableKeys = source.filter((i) => !i.disabled).map((i) => i.id)

    if (checked) {
      const newKeys = Array.from(new Set([...selectedKeys, ...availableKeys]))
      setSelectedKeys(newKeys)
    } else {
      const newKeys = selectedKeys.filter((k) => !availableKeys.includes(k))
      setSelectedKeys(newKeys)
    }
  }

  const moveToRight = () => {
    const newTargetKeys = [...targetKeys, ...leftSelectedKeys]
    onChange(newTargetKeys)
    setSelectedKeys((prev) => prev.filter((k) => !leftSelectedKeys.includes(k)))
  }

  const moveToLeft = () => {
    const newTargetKeys = targetKeys.filter((k) => !rightSelectedKeys.includes(k))
    onChange(newTargetKeys)
    setSelectedKeys((prev) => prev.filter((k) => !rightSelectedKeys.includes(k)))
  }

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-4", className)}>
      <ListPanel
        title={defaultLeftTitle}
        items={leftDataSource}
        selected={leftSelectedKeys}
        direction="left"
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
      />

      <div className="flex sm:flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToRight}
          disabled={leftSelectedKeys.length === 0}
          className="h-8 w-8 rounded-full shadow-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={moveToLeft}
          disabled={rightSelectedKeys.length === 0}
          className="h-8 w-8 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ListPanel
        title={defaultRightTitle}
        items={rightDataSource}
        selected={rightSelectedKeys}
        direction="right"
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
      />
    </div>
  )
}
