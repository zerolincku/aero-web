import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import {
    Users,
    CreditCard,
    Plus,
    Activity,
    Bell,
    Mail,
    Smartphone,
    CheckCircle2,
    Clock,
    Copy,
    Check,
    Edit2,
    Trash2,
    Download,
    MoreHorizontal
} from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';


import { ActionMenu, ActionMenuItem, ActionMenuSubmenu } from '@/components/ActionMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-md bg-muted">
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={copyToClipboard}
            >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
            <pre className="overflow-x-auto p-4 text-sm">
                <code>{code}</code>
            </pre>
        </div>
    );
}

interface ComponentShowcaseProps {
    title: string;
    description: string;
    id: string;
    preview: React.ReactNode;
    code: string;
    t: (key: string) => string;
}

function ComponentShowcase({ title, description, id, preview, code, t }: ComponentShowcaseProps) {
    const [view, setView] = useState<'preview' | 'code'>('preview');

    return (
        <section id={id} className="scroll-mt-20">
            <div className="mb-4">
                <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="text-muted-foreground mt-1">{description}</p>
            </div>
            
            <div className="border rounded-lg">
                <div className="flex items-center border-b px-4 py-2 bg-muted/50 gap-4 rounded-t-lg">
                    <button 
                        onClick={() => setView('preview')}
                        className={`text-sm font-medium transition-colors hover:text-primary ${view === 'preview' ? 'text-primary border-b-2 border-primary -mb-[9px] pb-2' : 'text-muted-foreground'}`}
                    >
                        {t('components.labels.preview')}
                    </button>
                    <button 
                        onClick={() => setView('code')}
                        className={`text-sm font-medium transition-colors hover:text-primary ${view === 'code' ? 'text-primary border-b-2 border-primary -mb-[9px] pb-2' : 'text-muted-foreground'}`}
                    >
                        {t('components.labels.code')}
                    </button>
                </div>
                <div className="p-6 bg-background rounded-b-lg">
                    {view === 'preview' ? preview : <CodeBlock code={code} />}
                </div>
            </div>
        </section>
    );
}

function CustomTimePicker({ value, onChange }: { value?: string, onChange?: (v: string) => void }) {
    const [hours, setHours] = useState(value ? value.split(':')[0] : '12');
    const [minutes, setMinutes] = useState(value ? value.split(':')[1] : '00');

    const handleHoursChange = (v: string) => {
        setHours(v);
        onChange?.(`${v}:${minutes}`);
    };

    const handleMinutesChange = (v: string) => {
        setMinutes(v);
        onChange?.(`${hours}:${v}`);
    };

    return (
        <div className="flex items-center gap-2">
            <Select value={hours} onValueChange={handleHoursChange} clearable={false}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent side="top" className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const val = i.toString().padStart(2, '0');
                        return <SelectItem key={val} value={val}>{val}</SelectItem>;
                    })}
                </SelectContent>
            </Select>
            <span className="text-muted-foreground">:</span>
            <Select value={minutes} onValueChange={handleMinutesChange} clearable={false}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent side="top" className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 60 }).map((_, i) => {
                        const val = i.toString().padStart(2, '0');
                        return <SelectItem key={val} value={val}>{val}</SelectItem>;
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}

function DatePickerDemo() {
    const [date, setDate] = useState<Date>();
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'zh-CN' ? zhCN : enUS;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale }) : <span>{t('components.datePickerExample.pickDate')}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={locale}
                />
            </PopoverContent>
        </Popover>
    );
}

function DateTimePickerDemo() {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState('12:00');
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'zh-CN' ? zhCN : enUS;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? `${format(date, "PPP", { locale })} ${time}` : <span>{t('components.dateTimePickerExample.pickDateTime')}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={locale}
                />
                <div className="p-3 border-t border-border flex justify-center">
                    <CustomTimePicker value={time} onChange={setTime} />
                </div>
            </PopoverContent>
        </Popover>
    );
}

function TimePickerDemo() {
    return (
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CustomTimePicker />
        </div>
    );
}

export default function ComponentsPage() {
    const { t } = useTranslation();
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(false);
    const [fruitValue, setFruitValue] = useState<string>();
    const [roleValue, setRoleValue] = useState<string>("viewer");

    const navItems = [
        { id: 'button', label: t('components.sections.button') },
        { id: 'input', label: t('components.sections.input') },
        { id: 'select', label: t('components.sections.select') },
        { id: 'card', label: t('components.sections.card') },
        { id: 'stats', label: t('components.sections.stats') },
        { id: 'action-form', label: t('components.sections.actionForm') },
        { id: 'empty-state', label: t('components.sections.emptyState') },
        { id: 'settings', label: t('components.sections.settings') },
        { id: 'list-item', label: t('components.sections.listItem') },
        { id: 'action-menu', label: t('components.sections.actionMenu') },
        { id: 'avatar', label: t('components.sections.avatar') },
        { id: 'table', label: t('components.sections.table') },
    ];

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex h-full flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-r shrink-0">
                <div className="sticky top-0 h-full p-4 overflow-y-auto">
                    <h4 className="mb-4 text-sm font-semibold tracking-tight uppercase text-muted-foreground">
                        {t('components.title')}
                    </h4>
                    <nav className="flex flex-col space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-accent-foreground h-9 px-4 py-2 w-full text-left"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 pt-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {t('components.title')}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        {t('components.subtitle')}
                    </p>
                </div>

                <div className="space-y-12 pb-20 max-w-4xl">
                    
                    <ComponentShowcase 
                        id="button"
                        title={t('components.buttonExample.title')}
                        description={t('components.buttonExample.description')}
                        t={t}
                        preview={
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button>{t('components.buttonExample.primary')}</Button>
                                <Button variant="secondary">{t('components.buttonExample.secondary')}</Button>
                                <Button variant="destructive">{t('components.buttonExample.destructive')}</Button>
                                <Button variant="outline">{t('components.buttonExample.outline')}</Button>
                                <Button variant="ghost">{t('components.buttonExample.ghost')}</Button>
                                <Button variant="link">{t('components.buttonExample.link')}</Button>
                            </div>
                        }
                        code={`import { Button } from '@/components/ui/button';

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
                    />

                    <ComponentShowcase 
                        id="input"
                        title={t('components.inputExample.title')}
                        description={t('components.inputExample.description')}
                        t={t}
                        preview={
                            <div className="grid gap-6 md:grid-cols-2 max-w-xl">
                                <div className="space-y-2">
                                    <Label htmlFor="default-input">{t('components.inputExample.default')}</Label>
                                    <Input id="default-input" placeholder={t('components.inputExample.placeholder')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="disabled-input">{t('components.inputExample.disabled')}</Label>
                                    <Input id="disabled-input" disabled placeholder={t('components.inputExample.placeholder')} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="hint-input">{t('components.inputExample.withLabel')}</Label>
                                    <Input id="hint-input" placeholder="you@example.com" />
                                    <p className="text-[0.8rem] text-muted-foreground">Enter your email address.</p>
                                </div>
                            </div>
                        }
                        code={`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Default
<Input placeholder="Type something..." />

// Disabled
<Input disabled placeholder="Type something..." />

// With Label and Hint
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" />
  <p className="text-[0.8rem] text-muted-foreground">Enter your email address.</p>
</div>`}
                    />

                    <ComponentShowcase 
                        id="select"
                        title={t('components.selectExample.title')}
                        description={t('components.selectExample.description')}
                        t={t}
                        preview={
                            <div className="max-w-xs">
                                <Select value={fruitValue} onValueChange={setFruitValue}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('components.selectExample.placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apple">{t('components.selectExample.apple')}</SelectItem>
                                        <SelectItem value="banana">{t('components.selectExample.banana')}</SelectItem>
                                        <SelectItem value="orange">{t('components.selectExample.orange')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        }
                        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`}
                    />

                    <ComponentShowcase 
                        id="card"
                        title={t('components.cardExample.title')}
                        description={t('components.cardExample.description')}
                        t={t}
                        preview={
                            <Card className="w-[350px]">
                                <CardHeader>
                                    <CardTitle>{t('components.cardExample.cardTitle')}</CardTitle>
                                    <CardDescription>{t('components.cardExample.cardDesc')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{t('components.cardExample.cardContent')}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">{t('components.cardExample.cardAction')}</Button>
                                </CardFooter>
                            </Card>
                        }
                        code={`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A brief description.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the main content area.</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Action</Button>
  </CardFooter>
</Card>`}
                    />

                    <ComponentShowcase 
                        id="stats"
                        title={t('components.sections.stats')}
                        description={t('components.sections.stats')}
                        t={t}
                        preview={
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t('components.statsExample.totalUsers')}
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-muted-foreground">
                                            +19% {t('components.statsExample.vsLastMonth')}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t('components.statsExample.revenue')}
                                        </CardTitle>
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$45,231.89</div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% {t('components.statsExample.vsLastMonth')}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        }
                        code={`<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
    <Users className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">+12,234</div>
    <p className="text-xs text-muted-foreground">+19% vs last month</p>
  </CardContent>
</Card>`}
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
import { Edit2, Copy, Trash2, Download, MoreHorizontal } from 'lucide-react';
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
      <ActionMenuSubmenu icon={<MoreHorizontal className="h-4 w-4" />} label="More actions">
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

                    <ComponentShowcase 
                        id="avatar"
                        title={t('components.avatarExample.title')}
                        description={t('components.avatarExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback className="bg-primary text-primary-foreground">User</AvatarFallback>
                                </Avatar>
                            </div>
                        }
                        code={`import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<div className="flex space-x-4">
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback className="bg-primary text-primary-foreground">
      User
    </AvatarFallback>
  </Avatar>
</div>`}
                    />

                    <ComponentShowcase 
                        id="table"
                        title={t('components.tableExample.title')}
                        description={t('components.tableExample.description')}
                        t={t}
                        preview={
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{t('components.tableExample.name')}</TableHead>
                                            <TableHead>{t('components.tableExample.role')}</TableHead>
                                            <TableHead className="text-right">{t('components.tableExample.status')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Alice</TableCell>
                                            <TableCell>Admin</TableCell>
                                            <TableCell className="text-right text-green-600">{t('components.tableExample.active')}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Bob</TableCell>
                                            <TableCell>Viewer</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{t('components.tableExample.inactive')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        }
                        code={`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Alice</TableCell>
        <TableCell>Admin</TableCell>
        <TableCell className="text-right text-green-600">Active</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Bob</TableCell>
        <TableCell>Viewer</TableCell>
        <TableCell className="text-right text-muted-foreground">Inactive</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>`}
                    />

                    <ComponentShowcase 
                        id="table-fixed-first"
                        title={t('components.tableFixedFirstExample.title')}
                        description={t('components.tableFixedFirstExample.description')}
                        t={t}
                        preview={
                            <div className="rounded-md border">
                                <Table className="min-w-[1200px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="sticky left-0 z-20 w-[120px] min-w-[120px] bg-background shadow-[1px_0_0_hsl(var(--border))]">{t('components.tableExample.name')}</TableHead>
                                            <TableHead className="sticky left-[120px] z-20 w-[120px] min-w-[120px] bg-background shadow-[1px_0_0_hsl(var(--border))] after:absolute after:inset-y-0 after:right-0 after:w-[12px] after:translate-x-full after:bg-gradient-to-r after:from-black/10 after:to-transparent after:pointer-events-none">{t('components.tableExample.role')}</TableHead>
                                            <TableHead>{t('components.tableExample.department')}</TableHead>
                                            <TableHead>{t('components.tableExample.location')}</TableHead>
                                            <TableHead>{t('components.tableExample.email')}</TableHead>
                                            <TableHead>{t('components.tableExample.phone')}</TableHead>
                                            <TableHead>{t('components.tableExample.address')}</TableHead>
                                            <TableHead>{t('components.tableExample.company')}</TableHead>
                                            <TableHead>{t('components.tableExample.project')}</TableHead>
                                            <TableHead>{t('components.tableExample.manager')}</TableHead>
                                            <TableHead>{t('components.tableExample.joinDate')}</TableHead>
                                            <TableHead>{t('components.tableExample.lastLogin')}</TableHead>
                                            <TableHead className="text-right">{t('components.tableExample.status')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="sticky left-0 z-10 w-[120px] min-w-[120px] bg-background font-medium shadow-[1px_0_0_hsl(var(--border))]">Alice</TableCell>
                                            <TableCell className="sticky left-[120px] z-10 w-[120px] min-w-[120px] bg-background shadow-[1px_0_0_hsl(var(--border))] after:absolute after:inset-y-0 after:right-0 after:w-[12px] after:translate-x-full after:bg-gradient-to-r after:from-black/10 after:to-transparent after:pointer-events-none">Admin</TableCell>
                                            <TableCell>Engineering</TableCell>
                                            <TableCell>New York</TableCell>
                                            <TableCell>alice@example.com</TableCell>
                                            <TableCell>+1 234 567 890</TableCell>
                                            <TableCell>123 Tech St</TableCell>
                                            <TableCell>Acme Corp</TableCell>
                                            <TableCell>Project Alpha</TableCell>
                                            <TableCell>Jane Doe</TableCell>
                                            <TableCell>2023-01-15</TableCell>
                                            <TableCell>2 hours ago</TableCell>
                                            <TableCell className="text-right text-green-600">{t('components.tableExample.active')}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="sticky left-0 z-10 w-[120px] min-w-[120px] bg-background font-medium shadow-[1px_0_0_hsl(var(--border))]">Bob</TableCell>
                                            <TableCell className="sticky left-[120px] z-10 w-[120px] min-w-[120px] bg-background shadow-[1px_0_0_hsl(var(--border))] after:absolute after:inset-y-0 after:right-0 after:w-[12px] after:translate-x-full after:bg-gradient-to-r after:from-black/10 after:to-transparent after:pointer-events-none">Viewer</TableCell>
                                            <TableCell>Marketing</TableCell>
                                            <TableCell>London</TableCell>
                                            <TableCell>bob@example.com</TableCell>
                                            <TableCell>+1 987 654 321</TableCell>
                                            <TableCell>456 Market St</TableCell>
                                            <TableCell>Beta LLC</TableCell>
                                            <TableCell>Project Beta</TableCell>
                                            <TableCell>John Smith</TableCell>
                                            <TableCell>2023-03-22</TableCell>
                                            <TableCell>5 days ago</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{t('components.tableExample.inactive')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        }
                        code={`<div className="rounded-md border max-w-sm">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="sticky left-0 z-20 bg-muted/50 shadow-[1px_0_0_hsl(var(--border))]">Name</TableHead>
        <TableHead>Role</TableHead>
        ...
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="sticky left-0 z-10 bg-background font-medium shadow-[1px_0_0_hsl(var(--border))]">Alice</TableCell>
        <TableCell>Admin</TableCell>
        ...
      </TableRow>
    </TableBody>
  </Table>
</div>`}
                    />

                    <ComponentShowcase 
                        id="table-fixed-last"
                        title={t('components.tableFixedLastExample.title')}
                        description={t('components.tableFixedLastExample.description')}
                        t={t}
                        preview={
                            <div className="rounded-md border">
                                <Table className="min-w-[1200px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{t('components.tableExample.name')}</TableHead>
                                            <TableHead>{t('components.tableExample.role')}</TableHead>
                                            <TableHead>{t('components.tableExample.department')}</TableHead>
                                            <TableHead>{t('components.tableExample.location')}</TableHead>
                                            <TableHead>{t('components.tableExample.email')}</TableHead>
                                            <TableHead>{t('components.tableExample.phone')}</TableHead>
                                            <TableHead>{t('components.tableExample.address')}</TableHead>
                                            <TableHead>{t('components.tableExample.company')}</TableHead>
                                            <TableHead>{t('components.tableExample.project')}</TableHead>
                                            <TableHead>{t('components.tableExample.manager')}</TableHead>
                                            <TableHead>{t('components.tableExample.joinDate')}</TableHead>
                                            <TableHead>{t('components.tableExample.lastLogin')}</TableHead>
                                            <TableHead className="sticky right-0 z-20 bg-background text-right shadow-[-1px_0_0_hsl(var(--border))] after:absolute after:inset-y-0 after:left-0 after:w-[12px] after:-translate-x-full after:bg-gradient-to-l after:from-black/10 after:to-transparent after:pointer-events-none">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Alice</TableCell>
                                            <TableCell>Admin</TableCell>
                                            <TableCell>Engineering</TableCell>
                                            <TableCell>New York</TableCell>
                                            <TableCell>alice@example.com</TableCell>
                                            <TableCell>+1 234 567 890</TableCell>
                                            <TableCell>123 Tech St</TableCell>
                                            <TableCell>Acme Corp</TableCell>
                                            <TableCell>Project Alpha</TableCell>
                                            <TableCell>Jane Doe</TableCell>
                                            <TableCell>2023-01-15</TableCell>
                                            <TableCell>2 hours ago</TableCell>
                                            <TableCell className="sticky right-0 z-10 bg-background text-right shadow-[-1px_0_0_hsl(var(--border))] after:absolute after:inset-y-0 after:left-0 after:w-[12px] after:-translate-x-full after:bg-gradient-to-l after:from-black/10 after:to-transparent after:pointer-events-none">
                                                <ActionMenu ariaLabel="Actions">
                                                    {({ closeMenu }) => (
                                                        <>
                                                            <ActionMenuItem icon={<Edit2 className="h-4 w-4" />} onClick={closeMenu}>
                                                                {t('components.actionMenuExample.edit')}
                                                            </ActionMenuItem>
                                                            <ActionMenuItem icon={<Trash2 className="h-4 w-4" />} className="text-destructive focus:text-destructive hover:bg-destructive/10" onClick={closeMenu}>
                                                                {t('components.actionMenuExample.delete')}
                                                            </ActionMenuItem>
                                                        </>
                                                    )}
                                                </ActionMenu>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Bob</TableCell>
                                            <TableCell>Viewer</TableCell>
                                            <TableCell>Marketing</TableCell>
                                            <TableCell>London</TableCell>
                                            <TableCell>bob@example.com</TableCell>
                                            <TableCell>+1 987 654 321</TableCell>
                                            <TableCell>456 Market St</TableCell>
                                            <TableCell>Beta LLC</TableCell>
                                            <TableCell>Project Beta</TableCell>
                                            <TableCell>John Smith</TableCell>
                                            <TableCell>2023-03-22</TableCell>
                                            <TableCell>5 days ago</TableCell>
                                            <TableCell className="sticky right-0 z-10 bg-background text-right shadow-[-1px_0_0_hsl(var(--border))] after:absolute after:inset-y-0 after:left-0 after:w-[12px] after:-translate-x-full after:bg-gradient-to-l after:from-black/10 after:to-transparent after:pointer-events-none">
                                                <ActionMenu ariaLabel="Actions">
                                                    {({ closeMenu }) => (
                                                        <>
                                                            <ActionMenuItem icon={<Edit2 className="h-4 w-4" />} onClick={closeMenu}>
                                                                {t('components.actionMenuExample.edit')}
                                                            </ActionMenuItem>
                                                            <ActionMenuItem icon={<Trash2 className="h-4 w-4" />} className="text-destructive focus:text-destructive hover:bg-destructive/10" onClick={closeMenu}>
                                                                {t('components.actionMenuExample.delete')}
                                                            </ActionMenuItem>
                                                        </>
                                                    )}
                                                </ActionMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        }
                        code={`<div className="rounded-md border max-w-sm">
  <Table>
    <TableHeader>
      <TableRow>
        ...
        <TableHead className="sticky right-0 z-20 bg-muted/50 text-right shadow-[-1px_0_0_hsl(var(--border))]">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        ...
        <TableCell className="sticky right-0 z-10 bg-background text-right shadow-[-1px_0_0_hsl(var(--border))]">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>`}
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
                        id="date-picker"
                        title={t('components.datePickerExample.title')}
                        description={t('components.datePickerExample.description')}
                        t={t}
                        preview={<DatePickerDemo />}
                        code={`const [date, setDate] = useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant={"outline"}
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>`}
                    />

                    <ComponentShowcase 
                        id="date-time-picker"
                        title={t('components.dateTimePickerExample.title')}
                        description={t('components.dateTimePickerExample.description')}
                        t={t}
                        preview={<DateTimePickerDemo />}
                        code={`const [date, setDate] = useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant={"outline"}
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date & time</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
    <div className="p-3 border-t border-border">
      <Input type="time" className="w-full" />
    </div>
  </PopoverContent>
</Popover>`}
                    />

                    <ComponentShowcase 
                        id="time-picker"
                        title={t('components.timePickerExample.title')}
                        description={t('components.timePickerExample.description')}
                        t={t}
                        preview={<TimePickerDemo />}
                        code={`<div className="flex items-center gap-2">
  <Input type="time" className="w-[150px]" defaultValue="12:00" />
</div>`}
                    />

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


    );
}
