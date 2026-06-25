import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

showcases_to_add = """
                    <Separator />

                    {/* MultiSelect */}
                    <ComponentShowcase
                        id="multi-select"
                        title={t('components.multiSelectExample.title')}
                        description={t('components.multiSelectExample.description')}
                        t={t}
                        preview={
                            <div className="w-[300px]">
                                <MultiSelect
                                    options={[
                                        { label: "React", value: "react" },
                                        { label: "Vue", value: "vue" },
                                        { label: "Angular", value: "angular" },
                                        { label: "Svelte", value: "svelte" },
                                        { label: "Solid", value: "solid" },
                                    ]}
                                    selected={multiSelectValues}
                                    onChange={setMultiSelectValues}
                                    placeholder="Select frameworks..."
                                />
                            </div>
                        }
                        code={`<MultiSelect
    options={[
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
    ]}
    selected={multiSelectValues}
    onChange={setMultiSelectValues}
    placeholder="Select frameworks..."
/>`}
                    />

                    <Separator />

                    {/* File Upload */}
                    <ComponentShowcase
                        id="file-upload"
                        title={t('components.fileUploadExample.title')}
                        description={t('components.fileUploadExample.description')}
                        t={t}
                        preview={
                            <div className="w-full max-w-md">
                                <FileUpload maxFiles={3} onChange={(files) => console.log(files)} />
                            </div>
                        }
                        code={`<FileUpload maxFiles={3} onChange={(files) => console.log(files)} />`}
                    />

                    <Separator />

                    {/* Image Upload */}
                    <ComponentShowcase
                        id="image-upload"
                        title={t('components.imageUploadExample.title')}
                        description={t('components.imageUploadExample.description')}
                        t={t}
                        preview={
                            <div className="w-[300px]">
                                <ImageUpload onChange={(file) => console.log("Image:", file)} />
                            </div>
                        }
                        code={`<ImageUpload onChange={(file) => console.log("Image:", file)} />`}
                    />

                    <Separator />

                    {/* Navigation Menu */}
                    <ComponentShowcase
                        id="navigation-menu"
                        title={t('components.navigationMenuExample.title')}
                        description={t('components.navigationMenuExample.description')}
                        t={t}
                        preview={
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3">
                                                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md" href="/">
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            shadcn/ui
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Beautifully designed components built with Radix UI and Tailwind CSS.
                                                        </p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                        <div className="text-sm font-medium leading-none">Introduction</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Re-usable components built using Radix UI and Tailwind CSS.</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                        <div className="text-sm font-medium leading-none">Installation</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">How to install dependencies and structure your app.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <a href="/docs" className={navigationMenuTriggerStyle()}>
                                            Documentation
                                        </a>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        }
                        code={`<NavigationMenu>
    <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
                {/* Content */}
            </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <a href="/docs" className={navigationMenuTriggerStyle()}>
                Documentation
            </a>
        </NavigationMenuItem>
    </NavigationMenuList>
</NavigationMenu>`}
                    />

                    <Separator />

                    {/* Tree */}
                    <ComponentShowcase
                        id="tree"
                        title={t('components.treeExample.title')}
                        description={t('components.treeExample.description')}
                        t={t}
                        preview={
                            <div className="w-[300px]">
                                <Tree 
                                    data={treeData} 
                                    onSelect={(node) => console.log('Selected:', node)}
                                />
                            </div>
                        }
                        code={`<Tree 
    data={treeData} 
    onSelect={(node) => console.log('Selected:', node)}
/>`}
                    />

                    <Separator />

                    {/* Transfer */}
                    <ComponentShowcase
                        id="transfer"
                        title={t('components.transferExample.title')}
                        description={t('components.transferExample.description')}
                        t={t}
                        preview={
                            <Transfer
                                dataSource={transferData}
                                targetKeys={transferTargetKeys}
                                onChange={setTransferTargetKeys}
                                leftTitle="All Roles"
                                rightTitle="Assigned Roles"
                            />
                        }
                        code={`<Transfer
    dataSource={transferData}
    targetKeys={transferTargetKeys}
    onChange={setTransferTargetKeys}
    leftTitle="All Roles"
    rightTitle="Assigned Roles"
/>`}
                    />
"""

content = content.replace('                </div>\n            </main>\n        </div>\n\n\n    );\n}', showcases_to_add + '\n                </div>\n            </main>\n        </div>\n    );\n}')
content = content.replace('                </div>\n            </main>\n        </div>\n    );\n}', showcases_to_add + '\n                </div>\n            </main>\n        </div>\n    );\n}')

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)

