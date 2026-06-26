import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    ChevronDown, Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";





import { ComponentShowcase } from './ComponentShowcase';

export function NavigationDemo({ t,  }: any) {
    return (
        <div className="space-y-12">
                    <ComponentShowcase
                        id="tabs"
                        title={t('components.tabsExample.title')}
                        description={t('components.tabsExample.description')}
                        t={t}
                        preview={
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="password">Password</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">Make changes to your account here.</TabsContent>
                                <TabsContent value="password">Change your password here.</TabsContent>
                            </Tabs>
                        }
                        code={`<Tabs defaultValue="account" className="w-[400px]">
    <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Make changes to your account here.</TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`}
                    />
                    <ComponentShowcase 
                        id="pagination"
                        title={t('components.paginationExample.title')}
                        description={t('components.paginationExample.description')}
                        t={t}
                        preview={
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink isActive>
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink>3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        }
                        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
                    />
                    <ComponentShowcase
                        id="accordion"
                        title={t('components.accordionExample.title')}
                        description={t('components.accordionExample.description')}
                        t={t}
                        preview={
                            <Accordion type="single" collapsible className="w-full max-w-[400px]">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It adheres to the WAI-ARIA design pattern.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It comes with default styles that matches the other components' aesthetic.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        }
                        code={`<Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
    </AccordionItem>
</Accordion>`}
                    />
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
                    <ComponentShowcase
                        id="collapsible"
                        title={t('components.collapsibleExample.title')}
                        description={t('components.collapsibleExample.description')}
                        t={t}
                        preview={
                            <Collapsible className="w-[350px] space-y-2 rounded-xl border bg-card p-4 shadow-sm">
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
                            </Collapsible>
                        }
                        code={`<Collapsible className="w-[350px] space-y-2 rounded-xl border bg-card p-4 shadow-sm">
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
        </div>
    );
}

