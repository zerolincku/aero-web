import re

with open('src/pages/Components.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if 'TimePicker' not in content[:1000]:
    content = content.replace('import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";', 'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";\nimport { TimePicker } from "@/components/ui/time-picker";')

# Remove CustomTimePicker definition
content = re.sub(r'function CustomTimePicker\(\{.*?\}\s*\{\s*const \[hours.*?return \([\s\S]*?\);\s*\}', '', content)

# Replace <CustomTimePicker with <TimePicker
content = content.replace('<CustomTimePicker', '<TimePicker')

with open('src/pages/Components.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
