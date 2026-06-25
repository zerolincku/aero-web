with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

imports = """
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
"""

content = content.replace("import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';", "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';" + imports)

showcase_code = """
                    <Separator />

                    {/* Carousel */}
                    <ComponentShowcase
                        id="carousel"
                        title={t('components.carouselExample.title')}
                        description={t('components.carouselExample.description')}
                        t={t}
                        preview={
                            <div className="flex justify-center w-full">
                                <Carousel className="w-full max-w-xs">
                                    <CarouselContent>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        }
                        code={`<Carousel className="w-full max-w-xs">
    <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
                <div className="p-1">
                    <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel>`}
                    />

                    <Separator />

                    {/* Scroll Area */}
                    <ComponentShowcase
                        id="scroll-area"
                        title={t('components.scrollAreaExample.title')}
                        description={t('components.scrollAreaExample.description')}
                        t={t}
                        preview={
                            <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                                Jargon from the web domain.
                                <br />
                                The HTML specification
                                <br />
                                The DOM specification
                                <br />
                                Fetch
                                <br />
                                XMLHttpRequest
                                <br />
                                File API
                                <br />
                                Streams
                                <br />
                                WebGL
                                <br />
                                Web Audio API
                                <br />
                                WebRTC
                                <br />
                                Web Sockets
                            </ScrollArea>
                        }
                        code={`<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
    Jargon from the web domain.
    <br />
    The HTML specification
    <br />
    The DOM specification
    <br />
    Fetch
    <br />
    XMLHttpRequest
    ...
</ScrollArea>`}
                    />

                    <Separator />

                    {/* Command */}
                    <ComponentShowcase
                        id="command"
                        title={t('components.commandExample.title')}
                        description={t('components.commandExample.description')}
                        t={t}
                        preview={
                            <Command className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem>Calendar</CommandItem>
                                        <CommandItem>Search Emoji</CommandItem>
                                        <CommandItem>Calculator</CommandItem>
                                    </CommandGroup>
                                    <CommandGroup heading="Settings">
                                        <CommandItem>Profile</CommandItem>
                                        <CommandItem>Billing</CommandItem>
                                        <CommandItem>Settings</CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        }
                        code={`<Command className="rounded-lg border shadow-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
        </CommandGroup>
    </CommandList>
</Command>`}
                    />

                    <Separator />

                    {/* Collapsible */}
                    <ComponentShowcase
                        id="collapsible"
                        title={t('components.collapsibleExample.title')}
                        description={t('components.collapsibleExample.description')}
                        t={t}
                        preview={
                            <Collapsible className="w-[350px] space-y-2">
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
                            </Collapsible>
                        }
                        code={`<Collapsible className="w-[350px] space-y-2">
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
</Collapsible>`}
                    />

                    <Separator />

                    {/* Resizable */}
                    <ComponentShowcase
                        id="resizable"
                        title={t('components.resizableExample.title')}
                        description={t('components.resizableExample.description')}
                        t={t}
                        preview={
                            <ResizablePanelGroup
                                direction="horizontal"
                                className="max-w-md rounded-lg border"
                            >
                                <ResizablePanel defaultSize={50}>
                                    <div className="flex h-[200px] items-center justify-center p-6">
                                        <span className="font-semibold">One</span>
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel defaultSize={50}>
                                    <ResizablePanelGroup direction="vertical">
                                        <ResizablePanel defaultSize={25}>
                                            <div className="flex h-full items-center justify-center p-6">
                                                <span className="font-semibold">Two</span>
                                            </div>
                                        </ResizablePanel>
                                        <ResizableHandle />
                                        <ResizablePanel defaultSize={75}>
                                            <div className="flex h-full items-center justify-center p-6">
                                                <span className="font-semibold">Three</span>
                                            </div>
                                        </ResizablePanel>
                                    </ResizablePanelGroup>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        }
                        code={`<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
    <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">One</span>
        </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </ResizablePanel>
</ResizablePanelGroup>`}
                    />

                </div>
            </main>
        </div>
"""

content = content.replace("                </div>\n            </main>\n        </div>", showcase_code)

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)
