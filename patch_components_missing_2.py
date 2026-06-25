import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add imports
imports_to_add = """
import { MultiSelect } from "@/components/ui/multi-select";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageUpload } from "@/components/ui/image-upload";
import { Tree, TreeNode } from "@/components/ui/tree";
import { Transfer, TransferItem } from "@/components/ui/transfer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
"""

content = content.replace("import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';", "import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';\n" + imports_to_add)

# 2. Add states
states_to_add = """
    // Advanced components state
    const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(['2', '4']);
    
    const treeData: TreeNode[] = [
        {
            id: "1",
            name: "src",
            type: "folder",
            children: [
                {
                    id: "1-1",
                    name: "components",
                    type: "folder",
                    children: [
                        { id: "1-1-1", name: "Button.tsx", type: "document" },
                        { id: "1-1-2", name: "Tree.tsx", type: "document" },
                    ]
                },
                { id: "1-2", name: "logo.png", type: "image" },
                { id: "1-3", name: "App.tsx", type: "document" },
            ]
        },
        {
            id: "2",
            name: "public",
            type: "folder",
            children: [
                { id: "2-1", name: "favicon.ico", type: "image" },
                { id: "2-2", name: "index.html", type: "file" }
            ]
        },
        { id: "3", name: "package.json", type: "document" },
    ];

    const transferData: TransferItem[] = [
        { id: '1', label: 'Admin User' },
        { id: '2', label: 'Regular User' },
        { id: '3', label: 'Guest User' },
        { id: '4', label: 'Editor', disabled: true },
        { id: '5', label: 'Viewer' },
        { id: '6', label: 'Super Admin' },
        { id: '7', label: 'Tester' },
    ];
"""

content = content.replace("const [sliderValue, setSliderValue] = useState([50]);", "const [sliderValue, setSliderValue] = useState([50]);\n" + states_to_add)

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)
