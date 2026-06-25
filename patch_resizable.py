with open("src/components/ui/resizable.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("}: ResizablePrimitive.GroupProps) {", "}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {")
content = content.replace("}: ResizablePrimitive.PanelProps) {", "}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {")
content = content.replace("}: ResizablePrimitive.SeparatorProps & {", "}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {")

with open("src/components/ui/resizable.tsx", "w", encoding="utf-8") as f:
    f.write(content)
