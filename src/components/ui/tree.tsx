import * as React from "react"
import { ChevronRight, Folder, File, FileText, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export type TreeNode = {
  id: string
  name: string
  type: "folder" | "file" | "image" | "document"
  children?: TreeNode[]
  disabled?: boolean
}

interface TreeProps {
  data: TreeNode[]
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  className?: string
  disabled?: boolean
}

export function Tree({ data, selectedId, onSelect, className, disabled = false }: TreeProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-md border bg-background p-2", className)}>
      <ul role="tree" className="space-y-1">
        {data.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            onSelect={onSelect}
            treeDisabled={disabled}
          />
        ))}
      </ul>
    </div>
  )
}

interface TreeNodeItemProps {
  node: TreeNode
  level: number
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  treeDisabled?: boolean
}

function TreeNodeItem({ node, level, selectedId, onSelect, treeDisabled }: TreeNodeItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id
  const isDisabled = treeDisabled || node.disabled

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    if (isDisabled) return
    if (hasChildren) setIsOpen(!isOpen)
    onSelect?.(node)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleClick(e)
        break
      case 'ArrowRight':
        e.preventDefault()
        if (hasChildren && !isOpen) setIsOpen(true)
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (hasChildren && isOpen) setIsOpen(false)
        break
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault()
        const tree = e.currentTarget.closest('[role="tree"]')
        if (tree) {
          const items = Array.from(tree.querySelectorAll('[role="treeitem"] > div[tabindex="0"]'))
          const index = items.indexOf(e.currentTarget as Element)
          if (e.key === 'ArrowDown' && index < items.length - 1) {
            (items[index + 1] as HTMLElement).focus()
          } else if (e.key === 'ArrowUp' && index > 0) {
            (items[index - 1] as HTMLElement).focus()
          }
        }
        break
    }
  }

  const getIcon = () => {
    switch (node.type) {
      case "folder":
        return <Folder className={cn("h-4 w-4", isOpen ? "fill-primary/20 text-primary" : "text-muted-foreground")} />
      case "image":
        return <ImageIcon className="h-4 w-4 text-emerald-500" />
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />
      default:
        return <File className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isOpen : undefined} aria-selected={isSelected} className="select-none outline-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          className={cn(
            "flex items-center rounded-sm py-1.5 px-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/80",
            isSelected && !isDisabled ? "bg-primary/10 text-primary" : "text-foreground",
            level > 0 && "ml-4"
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {hasChildren ? (
            <CollapsibleTrigger asChild>
              <div className="mr-1 h-4 w-4 shrink-0 cursor-pointer flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <ChevronRight className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-90")} />
              </div>
            </CollapsibleTrigger>
          ) : (
            <div className="mr-1 w-4" /> // Spacer for alignment
          )}
          
          <div className="mr-2 shrink-0">{getIcon()}</div>
          <span className="truncate">{node.name}</span>
        </div>

        {hasChildren && (
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border/50">
            <ul role="group" className="mt-1">
              {node.children!.map((childNode) => (
                <TreeNodeItem
                  key={childNode.id}
                  node={childNode}
                  level={level + 1}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  treeDisabled={treeDisabled}
                />
              ))}
            </ul>
          </CollapsibleContent>
        )}
      </Collapsible>
    </li>
  )
}
