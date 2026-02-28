import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Plus, Search, MoreHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useStore } from '../store/useStore';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ROLE_LABEL_KEY: Record<string, string> = {
    Admin: 'common.role.admin',
    Editor: 'common.role.editor',
    Viewer: 'common.role.viewer',
    Administrator: 'common.role.administrator',
};

const STATUS_LABEL_KEY: Record<'Active' | 'Inactive', string> = {
    Active: 'common.status.active',
    Inactive: 'common.status.inactive',
};

// Extended Mock Data for Pagination
const allUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' as const },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' as const },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' as const },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'Active' as const },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Viewer', status: 'Active' as const },
    { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'Viewer', status: 'Active' as const },
    { id: 7, name: 'George Martin', email: 'george@example.com', role: 'Admin', status: 'Inactive' as const },
    { id: 8, name: 'Hannah Abbott', email: 'hannah@example.com', role: 'Editor', status: 'Active' as const },
    { id: 9, name: 'Ian Somerhalder', email: 'ian@example.com', role: 'Viewer', status: 'Active' as const },
    { id: 10, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor', status: 'Active' as const },
    { id: 11, name: 'Kyle Broflovski', email: 'kyle@example.com', role: 'Viewer', status: 'Inactive' as const },
    { id: 12, name: 'Liam Neeson', email: 'liam@example.com', role: 'Admin', status: 'Active' as const },
];

export default function Users() {
    const { t } = useTranslation();
    const { addToast } = useStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState('10');

    const handleAddUser = () => {
        addToast({
            title: t('users.toast.title'),
            description: t('users.toast.description'),
        });
    };

    // Filter Logic
    const filteredUsers = allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Pagination Logic
    const pageSize = parseInt(itemsPerPage);
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate pagination range with ellipses
    const renderPageItems = () => {
        const items = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink onClick={() => goToPage(i)} isActive={currentPage === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        } else {
            // Always show first page
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => goToPage(1)} isActive={currentPage === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>,
            );

            if (currentPage > 3) {
                items.push(<PaginationEllipsis key="ellipsis-start" />);
            }

            // Pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (i === 1 || i === totalPages) continue;
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink onClick={() => goToPage(i)} isActive={currentPage === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }

            if (currentPage < totalPages - 2) {
                items.push(<PaginationEllipsis key="ellipsis-end" />);
            }

            // Always show last page
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => goToPage(totalPages)} isActive={currentPage === totalPages}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return items;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('users.title')}</h2>
                    <p className="text-muted-foreground">{t('users.subtitle')}</p>
                </div>
                <Button onClick={handleAddUser}>
                    <Plus className="mr-2 h-4 w-4" /> {t('common.actions.addUser')}
                </Button>
            </div>

            <Card className="shadow-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{t('users.allUsersTitle')}</CardTitle>
                            <CardDescription>{t('users.allUsersDescription')}</CardDescription>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('users.searchPlaceholder')}
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">{t('users.columns.avatar')}</TableHead>
                                <TableHead>{t('users.columns.name')}</TableHead>
                                <TableHead>{t('users.columns.role')}</TableHead>
                                <TableHead>{t('users.columns.status')}</TableHead>
                                <TableHead className="text-right">{t('users.columns.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{t(ROLE_LABEL_KEY[user.role] ?? user.role)}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    user.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                            >
                                                {t(STATUS_LABEL_KEY[user.status])}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        {t('users.noResults')}
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
                                <Select
                                    value={itemsPerPage}
                                    onValueChange={(val) => {
                                        setItemsPerPage(val);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue placeholder="5" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <span>{t('common.actions.perPage')}</span>
                        </div>
                        <span className="opacity-70">
                            {t('users.showingRange', {
                                start: filteredUsers.length === 0 ? 0 : startIndex + 1,
                                end: Math.min(startIndex + pageSize, filteredUsers.length),
                                total: filteredUsers.length,
                            })}
                        </span>
                    </div>

                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => goToPage(currentPage - 1)}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>

                            {renderPageItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => goToPage(currentPage + 1)}
                                    className={currentPage === totalPages || totalPages === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </div>
    );
}
