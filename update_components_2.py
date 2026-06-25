with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

imports = """
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
"""

content = content.replace("import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';", "import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';" + imports)

showcase_code = """
                    <Separator />

                    {/* Toast */}
                    <ComponentShowcase
                        id="toast"
                        title={t('components.toastExample.title')}
                        description={t('components.toastExample.description')}
                        t={t}
                        preview={
                            <Button
                                variant="outline"
                                onClick={() =>
                                    toast("Event has been created", {
                                        description: "Sunday, December 03, 2023 at 9:00 AM",
                                        action: {
                                            label: "Undo",
                                            onClick: () => console.log("Undo"),
                                        },
                                    })
                                }
                            >
                                Show Toast
                            </Button>
                        }
                        code={`<Button
    variant="outline"
    onClick={() =>
        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
    }
>
    Show Toast
</Button>`}
                    />

                    <Separator />

                    {/* Sheet */}
                    <ComponentShowcase
                        id="sheet"
                        title={t('components.sheetExample.title')}
                        description={t('components.sheetExample.description')}
                        t={t}
                        preview={
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Open Sheet</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        }
                        code={`<Sheet>
    <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
    </SheetTrigger>
    <SheetContent>
        <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
                Make changes to your profile here. Click save when you're done.
            </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
        </div>
    </SheetContent>
</Sheet>`}
                    />

                    <Separator />

                    {/* Tooltip */}
                    <ComponentShowcase
                        id="tooltip"
                        title={t('components.tooltipExample.title')}
                        description={t('components.tooltipExample.description')}
                        t={t}
                        preview={
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline">Hover</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add to library</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        }
                        code={`<TooltipProvider>
    <Tooltip>
        <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Add to library</p>
        </TooltipContent>
    </Tooltip>
</TooltipProvider>`}
                    />

                    <Separator />

                    {/* Hover Card */}
                    <ComponentShowcase
                        id="hover-card"
                        title={t('components.hoverCardExample.title')}
                        description={t('components.hoverCardExample.description')}
                        t={t}
                        preview={
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">@nextjs</Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="flex justify-between space-x-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/vercel.png" />
                                            <AvatarFallback>VC</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">@nextjs</h4>
                                            <p className="text-sm">
                                                The React Framework – created and maintained by @vercel.
                                            </p>
                                            <div className="flex items-center pt-2">
                                                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                <span className="text-xs text-muted-foreground">
                                                    Joined December 2021
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        }
                        code={`<HoverCard>
    <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
            <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                        Joined December 2021
                    </span>
                </div>
            </div>
        </div>
    </HoverCardContent>
</HoverCard>`}
                    />

                    <Separator />

                    {/* Slider */}
                    <ComponentShowcase
                        id="slider"
                        title={t('components.sliderExample.title')}
                        description={t('components.sliderExample.description')}
                        t={t}
                        preview={
                            <Slider
                                defaultValue={[50]}
                                max={100}
                                step={1}
                                className="w-[60%]"
                            />
                        }
                        code={`<Slider
    defaultValue={[50]}
    max={100}
    step={1}
    className="w-[60%]"
/>`}
                    />

                    <Separator />

                    {/* Progress */}
                    <ComponentShowcase
                        id="progress"
                        title={t('components.progressExample.title')}
                        description={t('components.progressExample.description')}
                        t={t}
                        preview={
                            <Progress value={33} className="w-[60%]" />
                        }
                        code={`<Progress value={33} className="w-[60%]" />`}
                    />

                    <Separator />

                    {/* Skeleton */}
                    <ComponentShowcase
                        id="skeleton"
                        title={t('components.skeletonExample.title')}
                        description={t('components.skeletonExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        }
                        code={`<div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
    </div>
</div>`}
                    />

                    <Separator />

                    {/* Breadcrumb */}
                    <ComponentShowcase
                        id="breadcrumb"
                        title={t('components.breadcrumbExample.title')}
                        description={t('components.breadcrumbExample.description')}
                        t={t}
                        preview={
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        }
                        code={`<Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
    </BreadcrumbList>
</Breadcrumb>`}
                    />

                </div>
            </main>
        </div>
"""

content = content.replace("                </div>\n            </main>\n        </div>", showcase_code)

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)
