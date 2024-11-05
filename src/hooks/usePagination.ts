import { useState } from 'react';

type PaginationProps = {
  page?: number;
  pageLimit?: number;
};

export const usePagination = (props: PaginationProps = {}) => {
  const { page, pageLimit } = props;
  const [pageNumber, setPageNumber] = useState(page ?? 1);
  const [pageSize, setPageSize] = useState(pageLimit ?? 10);

  return {
    pageNumber,
    pageSize,
    changePageNumber: setPageNumber,
    changePageSize: setPageSize,
  };
};
