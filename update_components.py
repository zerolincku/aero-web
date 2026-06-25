import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

imports = """
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
"""

content = content.replace("import { Separator } from '@/components/ui/separator';", "import { Separator } from '@/components/ui/separator';" + imports)

showcase_code = """
                    <Separator />

                    {/* Switch */}
                    <ComponentShowcase
                        id="switch"
                        title={t('components.switchExample.title')}
                        description={t('components.switchExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane-mode" />
                                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                            </div>
                        }
                        code={`<div className="flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}
                    />

                    <Separator />

                    {/* Checkbox */}
                    <ComponentShowcase
                        id="checkbox"
                        title={t('components.checkboxExample.title')}
                        description={t('components.checkboxExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Accept terms and conditions</Label>
                            </div>
                        }
                        code={`<div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
                    />

                    <Separator />

                    {/* Radio Group */}
                    <ComponentShowcase
                        id="radio-group"
                        title={t('components.radioGroupExample.title')}
                        description={t('components.radioGroupExample.description')}
                        t={t}
                        preview={
                            <RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">Default</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <Label htmlFor="r2">Comfortable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="r3" />
                                    <Label htmlFor="r3">Compact</Label>
                                </div>
                            </RadioGroup>
                        }
                        code={`<RadioGroup defaultValue="comfortable">
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
    </div>
</RadioGroup>`}
                    />

                    <Separator />

                    {/* Tabs */}
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

                    <Separator />

                    {/* Badge */}
                    <ComponentShowcase
                        id="badge"
                        title={t('components.badgeExample.title')}
                        description={t('components.badgeExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center gap-2">
                                <Badge>Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                            </div>
                        }
                        code={`<div className="flex items-center gap-2">
    <Badge>Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="destructive">Destructive</Badge>
</div>`}
                    />

                    <Separator />

                    {/* Accordion */}
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

                    <Separator />

                    {/* Alert */}
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

                    <Separator />

                    {/* Dialog */}
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

                </div>
            </div>
        </div>
"""

content = content.replace("                </div>\n            </div>\n        </div>", showcase_code)

with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
    f.write(content)

