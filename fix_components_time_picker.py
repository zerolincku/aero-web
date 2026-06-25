import re

with open('src/pages/Components.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'TimePicker' not in content[:2000]:
    content = content.replace('import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";', 'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";\nimport { TimePicker } from "@/components/ui/time-picker";')

with open('src/pages/Components.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
