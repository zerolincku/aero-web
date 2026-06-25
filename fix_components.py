import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

states_to_add = """
    // Advanced components state
    const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(['2', '4']);
    
    const treeData = [
        {
            id: "1",
            name: "src",
            type: "folder" as const,
            children: [
                {
                    id: "1-1",
                    name: "components",
                    type: "folder" as const,
                    children: [
                        { id: "1-1-1", name: "Button.tsx", type: "document" as const },
                        { id: "1-1-2", name: "Tree.tsx", type: "document" as const },
                    ]
                },
                { id: "1-2", name: "logo.png", type: "image" as const },
                { id: "1-3", name: "App.tsx", type: "document" as const },
            ]
        },
        {
            id: "2",
            name: "public",
            type: "folder" as const,
            children: [
                { id: "2-1", name: "favicon.ico", type: "image" as const },
                { id: "2-2", name: "index.html", type: "file" as const }
            ]
        },
        { id: "3", name: "package.json", type: "document" as const },
    ];

    const transferData = [
        { id: '1', label: 'Admin User' },
        { id: '2', label: 'Regular User' },
        { id: '3', label: 'Guest User' },
        { id: '4', label: 'Editor', disabled: true },
        { id: '5', label: 'Viewer' },
        { id: '6', label: 'Super Admin' },
        { id: '7', label: 'Tester' },
    ];
"""

# Let's see if we can find where to inject states.
# Maybe `const [date, setDate] = useState<Date | undefined>(new Date());`
if "const [date, setDate] = useState<Date | undefined>(new Date());" in content:
    content = content.replace("const [date, setDate] = useState<Date | undefined>(new Date());", "const [date, setDate] = useState<Date | undefined>(new Date());\n" + states_to_add)

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)
