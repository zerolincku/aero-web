import { Calendar as CalendarIcon } from 'lucide-react';
import {
    Activity,
    Bell} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';




import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


import { ComponentShowcase } from './ComponentShowcase';

export function FeedbackDemo({ t,  }: any) {
    return (
        <div className="space-y-12">
                    <ComponentShowcase
                        id="alert"
                        title={t('components.alertExample.title')}
                        description={t('components.alertExample.description')}
                        t={t}
                        preview={
                            <div className="flex flex-col gap-4">
                                <Alert>
                                    <Bell className="h-4 w-4" />
                                    <AlertTitle>Heads up!</AlertTitle>
                                    <AlertDescription>
                                        You can add components to your app using the cli.
                                    </AlertDescription>
                                </Alert>
                                <Alert variant="destructive">
                                    <Activity className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        Your session has expired. Please log in again.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        }
                        code={`<div className="flex flex-col gap-4">
    <Alert>
        <Bell className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
            You can add components to your app using the cli.
        </AlertDescription>
    </Alert>
    <Alert variant="destructive">
        <Activity className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            Your session has expired. Please log in again.
        </AlertDescription>
    </Alert>
</div>`}
                    />
                    <ComponentShowcase
                        id="dialog"
                        title={t('components.dialogExample.title')}
                        description={t('components.dialogExample.description')}
                        t={t}
                        preview={
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Username
                                            </Label>
                                            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit">Save changes</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        }
                        code={`<Dialog>
    <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Username
                </Label>
                <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
        </div>
        <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
        </div>
    </DialogContent>
</Dialog>`}
                    />
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
                                <SheetContent className="sm:max-w-md">
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4 px-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" defaultValue="Pedro Duarte" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="role">Role</Label>
                                            <Select value="admin">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="guest">Guest</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <SheetFooter className="px-4 pb-4">
                                        <SheetClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button type="submit">Save changes</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        }
                        code={`<Sheet>
    <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
    </SheetTrigger>
    <SheetContent className="sm:max-w-md">
        <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
                Make changes to your profile here. Click save when you're done.
            </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value="admin">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <SheetFooter className="px-4 pb-4">
            <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
            </SheetClose>
            <SheetClose asChild>
                <Button type="submit">Save changes</Button>
            </SheetClose>
        </SheetFooter>
    </SheetContent>
</Sheet>`}
                    />
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
                    <ComponentShowcase
                        id="progress"
                        title={t('components.progressExample.title')}
                        description={t('components.progressExample.description')}
                        t={t}
                        preview={
                            <div className="w-full max-w-md space-y-5">
                                <div className="space-y-1.5">
                                    <p className="text-sm text-muted-foreground">Default (33%)</p>
                                    <Progress value={33} showValue />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-sm text-muted-foreground">Success (68%)</p>
                                    <Progress value={68} variant="success" showValue />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-sm text-muted-foreground">Warning (50%)</p>
                                    <Progress value={50} variant="warning" showValue />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-sm text-muted-foreground">Destructive (25%)</p>
                                    <Progress value={25} variant="destructive" showValue />
                                </div>
                            </div>
                        }
                        code={`<Progress value={33} showValue />
<Progress value={68} variant="success" showValue />
<Progress value={50} variant="warning" showValue />
<Progress value={25} variant="destructive" showValue />`}
                    />
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
        </div>
    );
}

