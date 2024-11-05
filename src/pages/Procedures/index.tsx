import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Actions,
  Snackbar,
} from 'src/components';
import { listProceduresBreadcrumbLinks, ProceduresTableColumns } from './constants';
import { useGetProceduresList } from 'src/hooks/useProcedures';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/util/common';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getViewProcedurePath } from 'src/constants/paths';

const Procedures: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState,  onDismiss } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError } = useGetProceduresList({
    apiConfig: {
      params: {
        _page: pageNumber,// TODO: Change this to full text search
        patientName: debouncedSearchQuery,
      },
    },
  });

  const noData = !response?.data?.length;

  const proceduresTableColumnsWithActions = useMemo(
    () => [
      ...ProceduresTableColumns,
      {
        header: 'Procedure Date',
        accessorKey: 'procedureDate',
        cell: ({ getValue }) => (
          <Box className="text-slate-gray">{formatDate(getValue())}</Box>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const procedureValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                setSnackbarAlertState({
                  severity: 'success',
                  title: 'Button Click',
                  message: 'Edit button clicked for procedure',
                });

              }}
              onDeleteClick={() => {
                setSnackbarAlertState({
                  severity: 'error',
                  title: 'Button Click',
                  message: 'Delete button clicked for procedure',
                });
              }}
              onViewDetails={() => {
                navigate(getViewProcedurePath(procedureValues.id));
              }}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="PROCEDURES"
          breadcrumbLinks={listProceduresBreadcrumbLinks}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Patient Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No patients found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={proceduresTableColumnsWithActions}
                  data={response?.data || []}
                  totalRecords={response?.items}
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
    </>
  );
  
};

export default Procedures;