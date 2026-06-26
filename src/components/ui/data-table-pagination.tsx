import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import { type UseDataTableResult } from '@/hooks/use-data-table';

interface DataTablePaginationProps<T> {
  table: UseDataTableResult<T>;
  className?: string;
}

export function DataTablePagination<T>({ table, className }: DataTablePaginationProps<T>) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.setPage(table.currentPage - 1)}
            className={table.currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
        {table.paginationTokens.map((token, index) =>
          typeof token === 'number' ? (
            <PaginationItem key={`page-${token}`}>
              <PaginationLink
                isActive={table.currentPage === token}
                onClick={() => table.setPage(token)}
              >
                {token}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => table.setPage(table.currentPage + 1)}
            className={
              table.currentPage === table.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
