import {
    Users,
    CreditCard,
    Edit2,
    Trash2,
    Activity,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Server,
    DollarSign,
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
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tree, type TreeNode } from "@/components/ui/tree";
import { ActionMenu, ActionMenuItem } from '@/components/ActionMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Statistic, CompactStatistic } from '@/components/ui/statistic';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineTitle,
    TimelineTime,
    TimelineDescription,
} from '@/components/ui/timeline';
import { Descriptions } from '@/components/ui/descriptions';
import { StatusBadge } from '@/components/ui/status-badge';
import { ComponentShowcase, type ComponentShowcaseProps } from './ComponentShowcase';

interface DataDisplayDemoProps {
    t: ComponentShowcaseProps['t'];
    treeData: TreeNode[];
}

export function DataDisplayDemo({ t, treeData }: DataDisplayDemoProps) {
    return (
        <div className="space-y-12">
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
                        id="statistic"
                        title={t('components.statisticExample.title')}
                        description={t('components.statisticExample.description')}
                        t={t}
                        preview={
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Statistic
                                        title="Active Clusters"
                                        value={142}
                                        trend="up"
                                        trendValue="+12.5%"
                                        icon={Server}
                                        description="2 clusters provisioning"
                                    />
                                    <Statistic
                                        title="Monthly Cloud Spend"
                                        prefix="$"
                                        value="28,450"
                                        suffix="USD"
                                        trend="down"
                                        trendValue="-4.2%"
                                        trendTone="good"
                                        icon={DollarSign}
                                        description="Budget cap: $35,000"
                                    />
                                    <Statistic
                                        title="P99 Gateway Latency"
                                        value="42"
                                        suffix="ms"
                                        trend="up"
                                        trendValue="+8ms"
                                        trendTone="bad"
                                        icon={Activity}
                                        description="SLA target: < 50ms"
                                    />
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <CompactStatistic
                                        title="CPU Allocation Rate"
                                        value="78.4%"
                                        trendValue="+2.1%"
                                        icon={Activity}
                                    />
                                    <CompactStatistic
                                        title="Memory Footprint"
                                        value="64.2 GB"
                                        trendValue="-1.8 GB"
                                        trendTone="good"
                                        icon={Server}
                                    />
                                </div>
                            </div>
                        }
                        code={`<Statistic
  title="Active Clusters"
  value={142}
  trend="up"
  trendValue="+12.5%"
  icon={Server}
  description="2 clusters provisioning"
/>

<CompactStatistic
  title="CPU Allocation Rate"
  value="78.4%"
  trendValue="+2.1%"
  icon={Activity}
/>`}
                    />
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
                    <ComponentShowcase
                        id="status-badge"
                        title={t('components.statusBadgeExample.title')}
                        description={t('components.statusBadgeExample.description')}
                        t={t}
                        preview={
                            <div className="flex flex-wrap items-center gap-3">
                                <StatusBadge status="running" label="Running" dot />
                                <StatusBadge status="healthy" label="Healthy" dot />
                                <StatusBadge status="warning" label="Warning" dot />
                                <StatusBadge status="maintenance" label="Maintenance" />
                                <StatusBadge status="error" label="Failed" dot />
                                <StatusBadge status="offline" label="Offline" />
                                <StatusBadge status="unknown" label="Neutral" />
                            </div>
                        }
                        code={`<StatusBadge status="running" label="Running" dot />
<StatusBadge status="healthy" label="Healthy" dot />
<StatusBadge status="warning" label="Warning" dot />
<StatusBadge status="error" label="Failed" dot />
<StatusBadge status="offline" label="Offline" />`}
                    />
                    <ComponentShowcase 
                        id="avatar"
                        title={t('components.avatarExample.title')}
                        description={t('components.avatarExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/icon.svg" alt="Aero Cloud" />
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
    <AvatarImage src="/icon.svg" alt="Aero Cloud" />
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
                    <ComponentShowcase
                        id="descriptions"
                        title={t('components.descriptionsExample.title')}
                        description={t('components.descriptionsExample.description')}
                        t={t}
                        preview={
                            <div className="space-y-6">
                                <Descriptions
                                    title="Cloud VM Instance Specifications"
                                    bordered
                                    column={3}
                                    items={[
                                        { label: 'Instance ID', children: 'i-09f8c12a7d43e' },
                                        { label: 'Instance Type', children: 'ecs.c7.2xlarge' },
                                        { label: 'Status', children: <StatusBadge status="running" label="Running" dot /> },
                                        { label: 'Region / AZ', children: 'ap-northeast-1 / az-1a' },
                                        { label: 'Private IP', children: '10.240.12.48' },
                                        { label: 'Public EIP', children: '198.51.100.24' },
                                        { label: 'vCPU / Memory', children: '8 vCPU / 16 GiB DDR5' },
                                        { label: 'Storage', children: '500 GiB NVMe SSD (gp3)' },
                                        { label: 'Operating System', children: 'Debian 12 Bookworm (x86_64)' },
                                        { label: 'Security Group', span: 3, children: 'sg-prod-web-front (Ports: 80, 443, 22 inbound restricted)' },
                                    ]}
                                />
                            </div>
                        }
                        code={`<Descriptions
  title="Cloud VM Instance Specifications"
  bordered
  column={3}
  items={[
    { label: 'Instance ID', children: 'i-09f8c12a7d43e' },
    { label: 'Instance Type', children: 'ecs.c7.2xlarge' },
    { label: 'Status', children: <StatusBadge status="running" label="Running" dot /> },
    { label: 'Region / AZ', children: 'ap-northeast-1 / az-1a' },
    { label: 'Private IP', children: '10.240.12.48' },
    { label: 'vCPU / Memory', children: '8 vCPU / 16 GiB DDR5' },
    { label: 'Security Group', span: 3, children: 'sg-prod-web-front' },
  ]}
/>`}
                    />
                    <ComponentShowcase
                        id="timeline"
                        title={t('components.timelineExample.title')}
                        description={t('components.timelineExample.description')}
                        t={t}
                        preview={
                            <div className="max-w-md">
                                <Timeline>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot tone="success">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <TimelineTitle>Production Release v2.4.0 Deployed</TimelineTitle>
                                            <TimelineTime>Today, 14:32 by CI/CD Runner #892</TimelineTime>
                                            <TimelineDescription>
                                                Automated canary verification succeeded. Traffic routed 100% to new cluster.
                                            </TimelineDescription>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot tone="warning">
                                                <AlertTriangle className="h-3.5 w-3.5" />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <TimelineTitle>Horizontal Autoscaling Triggered</TimelineTitle>
                                            <TimelineTime>Today, 11:15 by HPA-Engine</TimelineTime>
                                            <TimelineDescription>
                                                Traffic spike detected (CPU 88%). Scaled replicas from 4 to 8 instances.
                                            </TimelineDescription>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot tone="primary">
                                                <Clock className="h-3.5 w-3.5" />
                                            </TimelineDot>
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <TimelineTitle>Weekly Security Scan Initiated</TimelineTitle>
                                            <TimelineTime>Yesterday, 23:00 scheduled task</TimelineTime>
                                            <TimelineDescription>
                                                Vulnerability and configuration baseline audit completed with 0 CVEs.
                                            </TimelineDescription>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </div>
                        }
                        code={`<Timeline>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot tone="success"><CheckCircle2 className="h-3.5 w-3.5" /></TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Production Release v2.4.0 Deployed</TimelineTitle>
      <TimelineTime>Today, 14:32</TimelineTime>
      <TimelineDescription>Traffic routed 100% to new cluster.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`}
                    />
        </div>
    );
}
