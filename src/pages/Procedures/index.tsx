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
  ConfirmationModal,
  LoadingBackdrop,
} from 'src/components';
import { listProceduresBreadcrumbLinks, ProceduresTableColumns } from './constants';
import { useDeleteProcedure, useGetProceduresList } from 'src/hooks/useProcedures';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/util/common';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getEditProcedureRoute, getViewProcedurePath } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Procedures: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState,  onDismiss } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetProceduresList({
    apiConfig: {
      params: {
        _page: pageNumber,// TODO: Change this to full text search
        patientName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteProcedure, isPending: isDeleteInProgress } =
    useDeleteProcedure({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Procedure Deleted.',
          message: `Procedure "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
        });

        refetch();
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    });
  const {
    deleteConfirmationModalValues,
    onDeleteConfirm,
    showDeleteConfirmationModal,
    onShowDeleteConfirmationModal,
    onClose,
  } = useDeleteConfirmationModal({ onDelete: deleteProcedure });

  const noData = !response?.content?.length;

  const proceduresTableColumnsWithActions = useMemo(
    () => [
      ...ProceduresTableColumns,
      
      {
        id: 'actions',
        cell: ({ row }) => {
          const procedureValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                navigate(getEditProcedureRoute(procedureValues.procedureId.toString()));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  procedureValues.procedureId.toString(),
                  procedureValues.procedureDetail,
                );
              }}
              onViewDetails={() => {
                navigate(getViewProcedurePath(procedureValues.procedureId.toString()));
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
      <LoadingBackdrop loading={isDeleteInProgress} />
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
                emptyMessage="No procedures found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={proceduresTableColumnsWithActions}
                  data={response?.content || []}
                  totalRecords={response?.items}
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModal}
      />
    </>
  );
  
};

export default Procedures;