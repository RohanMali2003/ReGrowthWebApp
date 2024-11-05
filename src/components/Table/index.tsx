import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SxProps } from '@mui/system/styleFunctionSx';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  BLACK_CORAL,
  FADED_WHITE,
  LIGHT_GRAY,
  ROMAN_SILVER,
  SKY_BLUE,
  TEXT_SECONDARY,
} from 'src/constants/colors';
import { Icon, Pagination } from 'src/components';

export type TableSelectionType = 'checkbox' | 'radio';
type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectionType?: TableSelectionType;
  tableContainerSxProps?: SxProps;
  tableHeaderSxProps?: SxProps;
  tableCellSxProps?: SxProps;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enableAllRowSelection?: boolean;
  onRowSelect?: (
    selectedRow: TData[],
    selectionState: RowSelectionState,
  ) => void;
  // Provide this function if you want to update the default unique row id
  // This is mainly used for maintaining the same selection state when the data changes
  getRowId?: (
    originalRow: TData,
    index: number,
    parent?: Row<TData> | undefined,
  ) => string;
  // Unique identifier for each row to be used for selection and `getRowId` default function
  uniqueId?: keyof TData;
  selectedRows?: RowSelectionState;
  totalRecords?: number;
  pageNumber?: number;
  pageSize?: number;
  onPageChange?: (pageNumber: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

const sortIcon = {
  desc: <Icon icon="arrowDown" size="18" />,
  asc: <Icon icon="arrowUp" size="18" />,
};

const getCellStyle = (index: number, rowsCount: number) => ({
  color: TEXT_SECONDARY,
  fontSize: '13px',
  letterSpacing: '-0.02rem',
  lineHeight: '22px',

  height: '65px',
  paddingTop: '12px',
  paddingBottom: '12px',
  borderBottom: index + 1 < rowsCount ? `0.5px solid ${LIGHT_GRAY}` : 'none',
});

export function Table<TData, TValue = unknown>({
  data,
  selectionType = 'checkbox',
  tableContainerSxProps,
  tableHeaderSxProps,
  tableCellSxProps,
  enableSorting = true,
  enableRowSelection,
  enableAllRowSelection = true,
  onRowSelect,
  uniqueId = 'id' as keyof TData,
  selectedRows,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalRecords,
  ...tableProps
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const colHelper = createColumnHelper<TData>();
  const columns = useMemo<ColumnDef<TData, TValue>[]>(
    () => [
      ...(enableRowSelection
        ? [
            colHelper.display({
              id: 'selection',
              header: ({ table }) =>
                enableAllRowSelection && selectionType === 'checkbox' ? (
                  <Checkbox
                    sx={{
                      '&.Mui-checked': {
                        color: SKY_BLUE,
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: SKY_BLUE,
                      },
                      padding: '8px',
                    }}
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    data-testid="select-all-checkbox"
                  />
                ) : null,
              cell: ({ row }) =>
                selectionType === 'checkbox' ? (
                  <Checkbox
                    sx={{
                      '&.Mui-checked': {
                        color: SKY_BLUE,
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: SKY_BLUE,
                      },
                      padding: '8px',
                    }}
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    indeterminate={row.getIsSomeSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                ) : (
                  <Radio
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                ),
            }),
          ]
        : []),
      ...tableProps.columns,
    ],
    [],
  );

  function getRowId(row: TData, index: number) {
    if (typeof row === 'object' && row !== null && uniqueId in row) {
      return row[uniqueId] as string;
    }

    return String(index);
  }

  const table = useReactTable({
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columns: columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    enableSorting: enableSorting,
    enableMultiRowSelection: selectionType === 'checkbox',
    getRowId: tableProps?.getRowId ?? getRowId,
  });

  // Call change handler when row selection changes
  useEffect(() => {
    const flatSelectedRows = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);

    onRowSelect?.(flatSelectedRows, rowSelection);
  }, [JSON.stringify(rowSelection)]);

  useEffect(() => {
    if (selectedRows) {
      setRowSelection(selectedRows);
    }
  }, [JSON.stringify(selectedRows)]);

  return (
    <>
      <TableContainer
        sx={{
          overflow: 'hidden',
          border: 'none',
          borderRadius: '7px',
          boxShadow: 'none',
          background: FADED_WHITE,
          ...tableContainerSxProps,
        }}
      >
        <MUITable stickyHeader aria-label="table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, headerIdx) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{
                      color: BLACK_CORAL,
                      background: FADED_WHITE,
                      paddingTop: '18px',
                      paddingBottom: '12px',
                      fontWeight: 500,
                      lineHeight: '18px',
                      fontSize: '14px',
                      borderBottom: `0.5px solid ${ROMAN_SILVER}`,
                      ...(enableRowSelection && headerIdx === 0
                        ? { width: '30px' }
                        : {}),
                      cursor: header.column.getCanSort()
                        ? 'pointer'
                        : 'default',
                      ...tableHeaderSxProps,
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                    align="left"
                  >
                    <Box display="flex">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sortIcon[
                        header.column.getIsSorted() as keyof typeof sortIcon
                      ] ?? null}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, idx, rowArr) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      boxSizing: 'border-box',
                      ...getCellStyle(idx, rowArr.length),
                      ...tableCellSxProps,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      {pageNumber && onPageChange && totalRecords ? (
        <Pagination
          page={pageNumber}
          onPageChange={onPageChange}
          totalRecords={totalRecords}
          onPageSizeChange={onPageSizeChange}
          pageSize={pageSize}
        />
      ) : null}
    </>
  );
}

export default Table;
