import re

with open('src/components/ui/pagination.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useTranslation import
content = content.replace('import * as React from "react"', 'import * as React from "react"\nimport { useTranslation } from "react-i18next"')

# Replace Previous text
content = re.sub(
    r'function PaginationPrevious\(.*?\{',
    r'function PaginationPrevious({\n                                className,\n                                ...props\n                            }: React.ComponentProps<typeof PaginationLink>) {\n  const { t } = useTranslation();',
    content,
    flags=re.DOTALL
)
content = content.replace('<span>Previous</span>', '<span>{t("common.pagination.previous", "Previous")}</span>')

# Replace Next text
content = re.sub(
    r'function PaginationNext\(.*?\{',
    r'function PaginationNext({\n                            className,\n                            ...props\n                        }: React.ComponentProps<typeof PaginationLink>) {\n  const { t } = useTranslation();',
    content,
    flags=re.DOTALL
)
content = content.replace('<span>Next</span>', '<span>{t("common.pagination.next", "Next")}</span>')

# Replace Ellipsis text
content = re.sub(
    r'function PaginationEllipsis\(.*?\{',
    r'function PaginationEllipsis({\n                                className,\n                                ...props\n                            }: React.ComponentProps<"span">) {\n  const { t } = useTranslation();',
    content,
    flags=re.DOTALL
)
content = content.replace('<span className="sr-only">More pages</span>', '<span className="sr-only">{t("common.pagination.more", "More pages")}</span>')

with open('src/components/ui/pagination.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
