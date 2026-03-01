import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';
import { Plus, Search, MoreHorizontal, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { useDataTable } from '@/hooks/use-data-table';

const ORG_TYPE_LABEL_KEY: Record<string, string> = {
    University: 'orgs.types.university',
    Hospital: 'orgs.types.hospital',
    Corporate: 'orgs.types.corporate',
    Government: 'orgs.types.government',
    'Public Service': 'orgs.types.publicService',
};

const STATUS_LABEL_KEY: Record<'Active' | 'Inactive', string> = {
    Active: 'common.status.active',
    Inactive: 'common.status.inactive',
};

// Mock Data for Orgs
const allOrgs = [
    { id: 1, name: 'Global Tech University', type: 'University', location: 'San Francisco, CA', status: 'Active' as const, head: 'Dr. Aris Thorne' },
    { id: 2, name: 'City General Hospital', type: 'Hospital', location: 'New York, NY', status: 'Active' as const, head: 'Sarah Jenkins' },
    { id: 3, name: 'Innovate Corp', type: 'Corporate', location: 'Austin, TX', status: 'Active' as const, head: 'Mark Zuckerberg' },
    { id: 4, name: 'National Research Lab', type: 'Government', location: 'Washington, DC', status: 'Inactive' as const, head: 'Jane Foster' },
    { id: 5, name: 'Heritage Museum', type: 'Public Service', location: 'Chicago, IL', status: 'Active' as const, head: 'Arthur Dent' },
    { id: 6, name: "St. Mary's Academy", type: 'University', location: 'Boston, MA', status: 'Active' as const, head: 'Sister Mary' },
    { id: 7, name: 'HealthPlus Clinic', type: 'Hospital', location: 'Miami, FL', status: 'Inactive' as const, head: 'Robert Liston' },
    { id: 8, name: 'Nexus Software Solutions', type: 'Corporate', location: 'Seattle, WA', status: 'Active' as const, head: 'Bill Gates' },
    { id: 9, name: 'Defense Systems Agency', type: 'Government', location: 'Arlington, VA', status: 'Active' as const, head: 'Nick Fury' },
    { id: 10, name: 'Community Arts Center', type: 'Public Service', location: 'Portland, OR', status: 'Active' as const, head: 'Bob Ross' },
    { id: 11, name: 'Northern Star Energy', type: 'Corporate', location: 'Houston, TX', status: 'Active' as const, head: 'Elon Musk' },
    { id: 12, name: 'East Coast Medical', type: 'Hospital', location: 'Philadelphia, PA', status: 'Active' as const, head: 'Gregory House' },
];

export default function Orgs() {
    const { t } = useTranslation();
    const { addToast } = useStore();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Filter States
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
    const [statusFilter, setStatusFilter] = useState<'Active' | 'Inactive' | undefined>(undefined);
    const [locationFilter, setLocationFilter] = useState('');

    const handleAddOrg = () => {
        addToast({
            title: t('orgs.toast.title'),
            description: t('orgs.toast.description'),
        });
    };

    const resetFilters = () => {
        setSearch('');
        setTypeFilter(undefined);
        setStatusFilter(undefined);
        setLocationFilter('');
        table.resetPage();
    };

    const filteredData = allOrgs.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.head.toLowerCase().includes(search.toLowerCase());
        const matchesType = !typeFilter || item.type === typeFilter;
        const matchesStatus = !statusFilter || item.status === statusFilter;
        const matchesLocation = item.location.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesType && matchesStatus && matchesLocation;
    });

    const table = useDataTable({
        rows: filteredData,
        initialPageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('orgs.title')}</h2>
                    <p className="text-muted-foreground">{t('orgs.subtitle')}</p>
                </div>
                <Button onClick={handleAddOrg}>
                    <Plus className="mr-2 h-4 w-4" /> {t('common.actions.addOrg')}
                </Button>
            </div>

            <Card className="shadow-none">
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t('orgs.searchPlaceholder')}
                                    className="pl-8"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        table.resetPage();
                                    }}
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn('h-10 gap-2 font-medium', showAdvancedFilters && 'bg-accent')}
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            >
                                <Filter className="h-4 w-4" />
                                <span>{t('common.actions.filters')}</span>
                                {showAdvancedFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </Button>
                        </div>
                    </div>

                    {showAdvancedFilters && (
                        <div className="mt-4 p-4 border rounded-lg bg-muted/20 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-0">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{t('orgs.filterType')}</Label>
                                    <Select
                                        value={typeFilter}
                                        onValueChange={(val) => { setTypeFilter(val); table.resetPage(); }}
                                        clearable
                                        onClear={() => {
                                            setTypeFilter(undefined);
                                            table.resetPage();
                                        }}
                                        clearAriaLabel={t('hosts.filter.clearAllFilters')}
                                    >
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder={t('orgs.selectTypePlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="University">{t('orgs.types.university')}</SelectItem>
                                            <SelectItem value="Hospital">{t('orgs.types.hospital')}</SelectItem>
                                            <SelectItem value="Corporate">{t('orgs.types.corporate')}</SelectItem>
                                            <SelectItem value="Government">{t('orgs.types.government')}</SelectItem>
                                            <SelectItem value="Public Service">{t('orgs.types.publicService')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-0">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{t('orgs.filterStatus')}</Label>
                                    <Select
                                        value={statusFilter}
                                        onValueChange={(val) => { setStatusFilter(val as 'Active' | 'Inactive'); table.resetPage(); }}
                                        clearable
                                        onClear={() => {
                                            setStatusFilter(undefined);
                                            table.resetPage();
                                        }}
                                        clearAriaLabel={t('hosts.filter.clearAllFilters')}
                                    >
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder={t('orgs.selectStatusPlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">{t('common.status.active')}</SelectItem>
                                            <SelectItem value="Inactive">{t('common.status.inactive')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-0">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{t('orgs.filterLocation')}</Label>
                                    <Input
                                        placeholder={t('orgs.locationPlaceholder')}
                                        className="h-9"
                                        value={locationFilter}
                                        onChange={(e) => { setLocationFilter(e.target.value); table.resetPage(); }}
                                    />
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button variant="ghost" size="sm" className="h-9 w-full text-xs font-semibold" onClick={resetFilters}>
                                        <X className="mr-2 h-3 w-3" /> {t('common.actions.reset')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('orgs.columns.orgName')}</TableHead>
                                <TableHead>{t('orgs.columns.type')}</TableHead>
                                <TableHead>{t('orgs.columns.location')}</TableHead>
                                <TableHead>{t('orgs.columns.headOfDept')}</TableHead>
                                <TableHead>{t('orgs.columns.status')}</TableHead>
                                <TableHead className="text-right">{t('orgs.columns.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {table.pagedRows.length > 0 ? (
                                table.pagedRows.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-semibold">{item.name}</TableCell>
                                        <TableCell>
                                            <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded-md">
                                                {t(ORG_TYPE_LABEL_KEY[item.type] ?? item.type)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm">{item.location}</TableCell>
                                        <TableCell>{item.head}</TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                                                item.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
                                            )}>
                                                {t(STATUS_LABEL_KEY[item.status])}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={t('orgs.columns.actions')}>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                        {t('orgs.noResults')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span>{t('common.actions.show')}</span>
                            <div className="w-20">
                                <Select value={table.pageSizeValue} onValueChange={table.setPageSizeValue}>
                                    <SelectTrigger className="h-8">
                                        <SelectValue placeholder="5" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {table.pageSizeOptions.map((size) => (
                                            <SelectItem key={size} value={String(size)}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <span>{t('common.actions.perPage')}</span>
                        </div>
                        <span className="opacity-70">
                            {t('orgs.showingRange', {
                                start: table.startItem,
                                end: table.endItem,
                                total: table.totalItems,
                            })}
                        </span>
                    </div>

                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => table.setPage(table.currentPage - 1)}
                                    className={table.currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                            {table.paginationTokens.map((token) => (
                                typeof token === 'number' ? (
                                    <PaginationItem key={token}>
                                        <PaginationLink onClick={() => table.setPage(token)} isActive={table.currentPage === token}>{token}</PaginationLink>
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={token}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => table.setPage(table.currentPage + 1)}
                                    className={table.currentPage === table.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </div>
    );
}
