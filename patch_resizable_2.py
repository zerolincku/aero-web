import re

with open("src/components/ui/resizable.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r"}: ResizablePrimitive\.PanelGroupProps\)",
    r"}: ResizablePrimitive.PanelGroupProps & { direction?: 'horizontal' | 'vertical' | string })",
    content
)

content = re.sub(
    r"}: ResizablePrimitive\.GroupProps\)",
    r"}: ResizablePrimitive.GroupProps & { direction?: 'horizontal' | 'vertical' | string })",
    content
)


with open("src/components/ui/resizable.tsx", "w", encoding="utf-8") as f:
    f.write(content)
