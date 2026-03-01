import type { ComponentType } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  Database,
  Plus,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
  ShieldEllipsis,
  ShieldMinus,
  ShieldPlus,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

type SummaryCard = {
  id: string;
  title: string;
  value: string;
  sub: string;
  meta: string;
  metaRight: string;
  icon: ComponentType<{ className?: string }>;
  accent: 'blue' | 'indigo' | 'amber' | 'emerald';
};

type TopHost = {
  id: string;
  name: string;
  os: string;
  level: 'Critical' | 'High' | 'Normal';
  usage: number;
  color: string;
};

type EventItem = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  text: string;
  time: string;
  dot: string;
  dotBg: string;
};

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const summaryCards: SummaryCard[] = [
    {
      id: 'hosts',
      title: 'Total Hosts',
      value: '1,248',
      sub: '+12%',
      meta: '1,232 Online',
      metaRight: '16 Offline',
      icon: Server,
      accent: 'blue',
    },
    {
      id: 'vms',
      title: 'Active VMs',
      value: '8,421',
      sub: '+4%',
      meta: '7,902 Running',
      metaRight: '519 Paused',
      icon: Activity,
      accent: 'indigo',
    },
    {
      id: 'quota',
      title: 'CPU/RAM Quota',
      value: '420/612 TB',
      sub: '68% Capacity',
      meta: 'Cluster Load',
      metaRight: 'High Utility',
      icon: ShieldPlus,
      accent: 'amber',
    },
    {
      id: 'storage',
      title: 'Storage Used',
      value: '1.2 PB',
      sub: 'of 2.0 PB',
      meta: 'Tier 1 SSD Pool',
      metaRight: 'Healthy',
      icon: Database,
      accent: 'emerald',
    },
  ];

  const topHosts: TopHost[] = [
    { id: '893-X2', name: 'host-prod-012.us-east-1', os: 'Ubuntu 22.04', level: 'Critical', usage: 94.2, color: 'bg-rose-500' },
    { id: '112-D0', name: 'db-replica-2.eu-west-2', os: 'RHEL 9.1', level: 'High', usage: 88.5, color: 'bg-amber-500' },
    { id: '442-A1', name: 'app-node-05.ap-northeast-1', os: 'Ubuntu 22.04', level: 'High', usage: 82.1, color: 'bg-amber-500' },
    { id: '771-C9', name: 'cache-dist-1.us-west-2', os: 'CentOS Stream', level: 'Normal', usage: 76.8, color: 'bg-blue-500' },
    { id: '219-G6', name: 'edge-gateway-4.sa-east-1', os: 'Debian 11', level: 'Normal', usage: 71.2, color: 'bg-blue-500' },
  ];

  const events: EventItem[] = [
    {
      id: 'event-1',
      icon: ShieldCheck,
      text: 'System automatically scaled Web-Tier-ASG in us-east-1a.',
      time: 'Just now',
      dot: 'border-emerald-400',
      dotBg: 'bg-emerald-400',
    },
    {
      id: 'event-2',
      icon: ShieldAlert,
      text: 'Alert: Host host-prod-012 reported High CPU Usage (94%).',
      time: '12 minutes ago',
      dot: 'border-rose-400',
      dotBg: 'bg-rose-400',
    },
    {
      id: 'event-3',
      icon: ShieldPlus,
      text: 'Admin User created new Virtual Machine dev-stack-01.',
      time: '45 minutes ago',
      dot: 'border-blue-400',
      dotBg: 'bg-blue-400',
    },
    {
      id: 'event-4',
      icon: ShieldMinus,
      text: 'Scheduled maintenance started for region eu-west-2.',
      time: '2 hours ago',
      dot: 'border-amber-400',
      dotBg: 'bg-amber-400',
    },
    {
      id: 'event-5',
      icon: ShieldEllipsis,
      text: 'System daily infrastructure backup completed successfully.',
      time: '8 hours ago',
      dot: 'border-muted-foreground/40',
      dotBg: 'bg-muted-foreground/40',
    },
  ];

  const accentClasses: Record<SummaryCard['accent'], string> = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h2>
          <p className="text-muted-foreground">Infrastructure Overview</p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Quick search..." />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Resource
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="shadow-none">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${accentClasses[card.accent]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                  <span className={`text-xs font-semibold ${card.accent === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {card.sub}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{card.meta}</span>
                  <span>{card.metaRight}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Top 5 Hosts by CPU Usage</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => navigate('/infrastructure/hosts')}
              >
                View All Hosts
              </Button>
            </div>
          </CardHeader>

          <CardContent className="divide-y">
            {topHosts.map((host) => (
              <div key={host.id} className="flex items-center justify-between gap-4 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Server className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{host.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{host.os} · ID: {host.id}</p>
                  </div>
                </div>

                <div className="w-32 space-y-1 text-right">
                  <div className="flex items-center justify-between text-xs">
                    <span className={host.level === 'Critical' ? 'text-rose-600' : host.level === 'High' ? 'text-amber-600' : 'text-blue-600'}>{host.level}</span>
                    <span className="font-semibold">{host.usage}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${host.color}`} style={{ width: `${host.usage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">Recent Events</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {events.map((event) => {
              const Icon = event.icon;
              return (
                <div key={event.id} className="flex gap-3">
                  <span className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border ${event.dot}`}>
                    <span className={`h-2 w-2 rounded-full ${event.dotBg}`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm leading-5">{event.text}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Button variant="ghost" className="w-full">Open Audit Logs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
