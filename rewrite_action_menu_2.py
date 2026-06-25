import re

with open("src/components/ActionMenu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("import { ReactNode, useState } from 'react';", "import { useState } from 'react';\nimport type { ReactNode } from 'react';")
content = content.replace("import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';", "import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';")

with open("src/components/ActionMenu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
