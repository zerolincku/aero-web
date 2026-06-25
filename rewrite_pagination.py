import re

with open('src/components/ui/pagination.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import * as React from "react"', 'import * as React from "react"\nimport { useTranslation } from "react-i18next"')

# Fix Previous
content = re.sub(
    r'function PaginationPrevious\(\{\n\s*className,\n\s*\.\.\.props\n\s*\}\: React\.ComponentProps\<typeof PaginationLink\>\) \{',
    r'function PaginationPrevious({\n  className,\n  ...props\n}: React.ComponentProps<typeof PaginationLink>) {\n  const { t } = useTranslation();',
    content
)
content = content.replace('<span>Previous</span>', '<span>{t("common.pagination.previous", "Previous")}</span>')

# Fix Next
content = re.sub(
    r'function PaginationNext\(\{\n\s*className,\n\s*\.\.\.props\n\s*\}\: React\.ComponentProps\<typeof PaginationLink\>\) \{',
    r'function PaginationNext({\n  className,\n  ...props\n}: React.ComponentProps<typeof PaginationLink>) {\n  const { t } = useTranslation();',
    content
)
content = content.replace('<span>Next</span>', '<span>{t("common.pagination.next", "Next")}</span>')

# Fix Ellipsis
content = re.sub(
    r'function PaginationEllipsis\(\{\n\s*className,\n\s*\.\.\.props\n\s*\}\: React\.ComponentProps\<"span"\>\) \{',
    r'function PaginationEllipsis({\n  className,\n  ...props\n}: React.ComponentProps<"span">) {\n  const { t } = useTranslation();',
    content
)
content = content.replace('<span className="sr-only">More pages</span>', '<span className="sr-only">{t("common.pagination.more", "More pages")}</span>')

with open('src/components/ui/pagination.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
