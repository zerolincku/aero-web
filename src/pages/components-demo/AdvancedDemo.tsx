import {
    Plus,
    Activity,
    Bell,
    Mail,
    Smartphone,
    CheckCircle2,
    Clock,
    Copy,
    Edit2,
    Trash2,
    Download,
    MoreHorizontal} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';




import { ActionMenu, ActionMenuItem, ActionMenuSubmenu } from '@/components/ActionMenu';


import { ComponentShowcase } from './ComponentShowcase';

export function AdvancedDemo({ t, roleValue, setRoleValue, emailEnabled, setEmailEnabled, smsEnabled, setSmsEnabled,  }: any) {
    return (
        <div className="space-y-12">
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
                    <ComponentShowcase 
                        id="action-form"
                        title={t('components.sections.actionForm')}
                        description={t('components.sections.actionForm')}
                        t={t}
                        preview={
                            <Card className="max-w-md">
                                <CardHeader>
                                    <CardTitle>{t('components.formExample.title')}</CardTitle>
                                    <CardDescription>
                                        {t('components.formExample.description')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('components.formExample.email')}</Label>
                                        <Input id="email" placeholder="name@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">{t('components.formExample.role')}</Label>
                                        <Select value={roleValue} onValueChange={setRoleValue}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">{t('common.role.admin')}</SelectItem>
                                                <SelectItem value="editor">{t('common.role.editor')}</SelectItem>
                                                <SelectItem value="viewer">{t('common.role.viewer')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">
                                        {t('components.formExample.submit')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        }
                        code={`<Card className="max-w-md">
  <CardHeader>
    <CardTitle>Quick Invite</CardTitle>
    <CardDescription>Invite members via email.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="name@example.com" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="role">Role</Label>
      <Select defaultValue="viewer">
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Send Invite</Button>
  </CardFooter>
</Card>`}
                    />
                    <ComponentShowcase 
                        id="empty-state"
                        title={t('components.sections.emptyState')}
                        description={t('components.sections.emptyState')}
                        t={t}
                        preview={
                            <Card className="flex flex-col items-center justify-center p-12 text-center h-[300px] border-dashed">
                                <div className="rounded-full bg-primary/10 p-4 mb-4">
                                    <Activity className="h-8 w-8 text-primary" />
                                </div>
                                <h4 className="text-lg font-semibold mb-2">{t('components.emptyExample.title')}</h4>
                                <p className="text-sm text-muted-foreground max-w-[250px] mb-6">
                                    {t('components.emptyExample.description')}
                                </p>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    {t('components.emptyExample.action')}
                                </Button>
                            </Card>
                        }
                        code={`<Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
  <div className="rounded-full bg-primary/10 p-4 mb-4">
    <Activity className="h-8 w-8 text-primary" />
  </div>
  <h4 className="text-lg font-semibold mb-2">No data found</h4>
  <p className="text-sm text-muted-foreground max-w-[250px] mb-6">
    You don't have any items yet. Create one to get started.
  </p>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Create Item
  </Button>
</Card>`}
                    />
                    <ComponentShowcase 
                        id="settings"
                        title={t('components.sections.settings')}
                        description={t('components.sections.settings')}
                        t={t}
                        preview={
                            <Card className="max-w-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5" />
                                        {t('components.settingsExample.title')}
                                    </CardTitle>
                                    <CardDescription>
                                        {t('components.settingsExample.description')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between space-x-2">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium leading-none flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                {t('components.settingsExample.emailNotif')}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {t('components.settingsExample.emailNotifDesc')}
                                            </span>
                                        </div>
                                        <Button
                                            variant={emailEnabled ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setEmailEnabled(!emailEnabled)}
                                            className={`w-24 ${emailEnabled ? 'bg-primary' : 'bg-transparent'}`}
                                        >
                                            {emailEnabled ? 'Enabled' : 'Disabled'}
                                        </Button>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between space-x-2">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium leading-none flex items-center gap-2">
                                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                {t('components.settingsExample.smsNotif')}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {t('components.settingsExample.smsNotifDesc')}
                                            </span>
                                        </div>
                                        <Button
                                            variant={smsEnabled ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSmsEnabled(!smsEnabled)}
                                            className={`w-24 ${smsEnabled ? 'bg-primary' : 'bg-transparent'}`}
                                        >
                                            {smsEnabled ? 'Enabled' : 'Disabled'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        }
                        code={`<Card className="max-w-xl">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Bell className="h-5 w-5" />
      Notifications
    </CardTitle>
    <CardDescription>Manage your preferences.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-medium leading-none">Email Alerts</span>
        <span className="text-sm text-muted-foreground">Receive updates.</span>
      </div>
      <Button variant="default" size="sm" className="w-24">Enabled</Button>
    </div>
  </CardContent>
</Card>`}
                    />
                    <ComponentShowcase 
                        id="list-item"
                        title={t('components.sections.listItem')}
                        description={t('components.sections.listItem')}
                        t={t}
                        preview={
                            <Card className="max-w-md">
                                <CardHeader>
                                    <CardTitle>{t('components.listExample.title')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 bg-green-500/20 p-1 rounded-full">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {t('components.listExample.item1Title')}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {t('components.listExample.item1Desc')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 bg-blue-500/20 p-1 rounded-full">
                                            <Clock className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {t('components.listExample.item2Title')}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {t('components.listExample.item2Desc')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        }
                        code={`<div className="flex items-start space-x-4">
  <div className="mt-1 bg-green-500/20 p-1 rounded-full">
    <CheckCircle2 className="h-4 w-4 text-green-500" />
  </div>
  <div className="space-y-1">
    <p className="text-sm font-medium leading-none">
      Project Deployed
    </p>
    <p className="text-sm text-muted-foreground">
      Today at 10:23 AM
    </p>
  </div>
</div>`}
                    />
                    <ComponentShowcase 
                        id="action-menu"
                        title={t('components.actionMenuExample.title')}
                        description={t('components.actionMenuExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
                                <ActionMenu ariaLabel={t('components.actionMenuExample.ariaLabel')}>
                                    {({ closeMenu }) => (
                                        <>
                                            <ActionMenuItem icon={<Edit2 className="h-4 w-4" />} onClick={closeMenu}>
                                                {t('components.actionMenuExample.edit')}
                                            </ActionMenuItem>
                                            <ActionMenuItem icon={<Copy className="h-4 w-4" />} onClick={closeMenu}>
                                                {t('components.actionMenuExample.duplicate')}
                                            </ActionMenuItem>
                                            <ActionMenuSubmenu icon={<MoreHorizontal className="h-4 w-4" />} label={t('components.actionMenuExample.more')}>
                                                <ActionMenuItem icon={<Download className="h-4 w-4" />} onClick={closeMenu}>
                                                    {t('components.actionMenuExample.export')}
                                                </ActionMenuItem>
                                            </ActionMenuSubmenu>
                                            <Separator className="my-1" />
                                            <ActionMenuItem icon={<Trash2 className="h-4 w-4" />} className="text-destructive focus:text-destructive hover:bg-destructive/10" onClick={closeMenu}>
                                                {t('components.actionMenuExample.delete')}
                                            </ActionMenuItem>
                                        </>
                                    )}
                                </ActionMenu>
                            </div>
                        }
                        code={`import { ActionMenu, ActionMenuItem, ActionMenuSubmenu } from '@/components/ActionMenu';
import { Edit2, Copy, Trash2, Download, MoreHorizontal, ChevronDown, Folder } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

<ActionMenu ariaLabel="Action menu">
  {({ closeMenu }) => (
    <>
      <ActionMenuItem icon={<Edit2 className="h-4 w-4" />} onClick={closeMenu}>
        Edit
      </ActionMenuItem>
      <ActionMenuItem icon={<Copy className="h-4 w-4" />} onClick={closeMenu}>
        Duplicate
      </ActionMenuItem>
      <ActionMenuSubmenu icon={<MoreHorizontal, ChevronDown, Folder className="h-4 w-4" />} label="More actions">
        <ActionMenuItem icon={<Download className="h-4 w-4" />} onClick={closeMenu}>
          Export Data
        </ActionMenuItem>
      </ActionMenuSubmenu>
      <Separator className="my-1" />
      <ActionMenuItem icon={<Trash2 className="h-4 w-4" />} className="text-destructive" onClick={closeMenu}>
        Delete
      </ActionMenuItem>
    </>
  )}
</ActionMenu>`}
                    />
        </div>
    );
}

