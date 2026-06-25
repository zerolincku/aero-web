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
}

interface TreeProps {
  data: TreeNode[]
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  className?: string
}

export function Tree({ data, selectedId, onSelect, className }: TreeProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-md border bg-background p-2", className)}>
      <ul className="space-y-1">
        {data.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            onSelect={onSelect}
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
}

function TreeNodeItem({ node, level, selectedId, onSelect }: TreeNodeItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) setIsOpen(!isOpen)
    onSelect?.(node)
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
    <li className="select-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          className={cn(
            "flex items-center rounded-sm py-1.5 px-2 text-sm font-medium transition-colors cursor-pointer hover:bg-muted/80",
            isSelected ? "bg-primary/10 text-primary" : "text-foreground",
            level > 0 && "ml-4"
          )}
          onClick={handleClick}
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
            <ul className="mt-1">
              {node.children!.map((childNode) => (
                <TreeNodeItem
                  key={childNode.id}
                  node={childNode}
                  level={level + 1}
                  selectedId={selectedId}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          </CollapsibleContent>
        )}
      </Collapsible>
    </li>
  )
}
