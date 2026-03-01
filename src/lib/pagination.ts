export type PaginationToken = number | 'ellipsis-start' | 'ellipsis-end';

export const buildPaginationTokens = (
  currentPage: number,
  totalPages: number,
  maxVisible = 5,
): PaginationToken[] => {
  if (totalPages <= 0) {
    return [1];
  }

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const tokens: PaginationToken[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage > 3) {
    tokens.push('ellipsis-start');
  }

  for (let page = start; page <= end; page += 1) {
    if (page !== 1 && page !== totalPages) {
      tokens.push(page);
    }
  }

  if (currentPage < totalPages - 2) {
    tokens.push('ellipsis-end');
  }

  tokens.push(totalPages);
  return tokens;
};
