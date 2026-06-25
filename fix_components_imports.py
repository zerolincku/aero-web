import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

imports_to_add = """
import { MultiSelect } from "@/components/ui/multi-select";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageUpload } from "@/components/ui/image-upload";
import { Tree } from "@/components/ui/tree";
import { Transfer } from "@/components/ui/transfer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
"""

if "import { MultiSelect }" not in content:
    content = content.replace("import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';", "import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';\n" + imports_to_add)
    with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
        f.write(content)
