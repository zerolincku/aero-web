import { useStore } from '@/store/useStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, RotateCcw, Activity, Users, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Dashboard() {
    const { count, increment, decrement, reset } = useStore();
    const { t } = useTranslation();

    const stats = [
        {
            title: t('dashboard.stats.totalRevenue.title'),
            value: '$45,231.89',
            icon: DollarSign,
            change: t('dashboard.stats.totalRevenue.change'),
        },
        {
            title: t('dashboard.stats.activeUsers.title'),
            value: '+2350',
            icon: Users,
            change: t('dashboard.stats.activeUsers.change'),
        },
        {
            title: t('dashboard.stats.activeSessions.title'),
            value: '+12,234',
            icon: Activity,
            change: t('dashboard.stats.activeSessions.change'),
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h2>
                <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Interactive State Demo */}
            <Card className="w-full md:w-1/2">
                <CardHeader>
                    <CardTitle>{t('dashboard.stateDemo.title')}</CardTitle>
                    <CardDescription>
                        {t('dashboard.stateDemo.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                    <div className="text-6xl font-bold tabular-nums tracking-tighter">
                        {count}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" /> {t('common.actions.reset')}
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={decrement} disabled={count <= 0}>
                            <Minus className="mr-2 h-4 w-4" /> {t('common.actions.decrease')}
                        </Button>
                        <Button onClick={increment}>
                            <Plus className="mr-2 h-4 w-4" /> {t('common.actions.increase')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Dashboard;
