import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

if "import { ChevronDown" not in content and "import { Folder" not in content:
    content = content.replace("import { ChevronRight } from 'lucide-react';", "import { ChevronRight, ChevronDown, Folder } from 'lucide-react';")

old_code = """<Collapsible className="w-[350px] space-y-2">
                                <div className="flex items-center justify-between space-x-4 px-4">
                                    <h4 className="text-sm font-semibold">
                                        @peduarte starred 3 repositories
                                    </h4>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-9 p-0">
                                            <span className="sr-only">Toggle</span>
                                            <span className="text-xl leading-none">↓</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                    @radix-ui/primitives
                                </div>
                                <CollapsibleContent className="space-y-2">
                                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                        @radix-ui/colors
                                    </div>
                                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                        @stitches/react
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>"""

new_code = """<Collapsible className="w-[350px] space-y-2 rounded-xl border bg-card p-4 shadow-sm">
                                <div className="flex items-center justify-between space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                            <Folder className="h-4 w-4 text-primary" />
                                        </div>
                                        <h4 className="text-sm font-semibold">
                                            Project Resources
                                        </h4>
                                    </div>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-muted group">
                                            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <div className="rounded-md border border-border/50 bg-muted/30 px-4 py-3 text-sm flex items-center justify-between transition-colors hover:bg-muted/50 mt-4">
                                    <span>@radix-ui/primitives</span>
                                    <Badge variant="secondary" className="font-normal">Core</Badge>
                                </div>
                                <CollapsibleContent className="space-y-2 overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                    <div className="rounded-md border border-border/50 bg-muted/30 px-4 py-3 text-sm flex items-center justify-between transition-colors hover:bg-muted/50">
                                        <span>@radix-ui/colors</span>
                                        <Badge variant="outline" className="font-normal text-muted-foreground">Styles</Badge>
                                    </div>
                                    <div className="rounded-md border border-border/50 bg-muted/30 px-4 py-3 text-sm flex items-center justify-between transition-colors hover:bg-muted/50">
                                        <span>@stitches/react</span>
                                        <Badge variant="outline" className="font-normal text-muted-foreground">Legacy</Badge>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>"""

content = content.replace(old_code, new_code)
content = content.replace("code={`<Collapsible className=\"w-[350px] space-y-2\">", "code={`<Collapsible className=\"w-[350px] space-y-2 rounded-xl border bg-card p-4 shadow-sm\">")

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)
