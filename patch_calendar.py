import re

with open('src/components/ui/calendar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useTranslation import
if "useTranslation" not in content:
    content = content.replace('import * as React from "react"', 'import * as React from "react"\nimport { useTranslation } from "react-i18next"\nimport { zhCN, enUS } from "date-fns/locale"')

# Find Calendar function
calendar_sig = r'(function Calendar\(\{[\s\S]*?\}: React\.ComponentProps<typeof DayPicker> & \{\n  buttonVariant\?: React\.ComponentProps<typeof Button>\["variant"\]\n\}\) \{)'
content = re.sub(calendar_sig, r'\1\n  const { i18n } = useTranslation();\n  const currentLocale = i18n.language === "zh-CN" ? zhCN : enUS;', content)

# Inject locale to DayPicker
content = content.replace('<DayPicker', '<DayPicker\n      locale={currentLocale}')

with open('src/components/ui/calendar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
