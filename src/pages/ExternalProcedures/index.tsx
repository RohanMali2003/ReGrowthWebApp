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
import { ExternalProceduresTableColumns, listExternalProceduresBreadcrumbLinks } from './constants';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getEditExternalProcedureRoute, getViewExternalProcedurePath, NEW_EXTERNAL_PROCEDURE_PATH } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteExternalProcedure, useGetExternalProcedureList } from 'src/hooks/useExternalProcedures';

const ExternalProcedures: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState,  onDismiss } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetExternalProcedureList({
    apiConfig: {
      params: {
        _page: pageNumber,// TODO: Change this to full text search
        doctorName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteExternalProcedure, isPending: isDeleteInProgress } =
    useDeleteExternalProcedure({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'External Procedure Deleted.',
          message: `External Procedure "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteExternalProcedure });

  const noData = !response?.content?.length;

  const externalProcedureTableColumnsWithActions = useMemo(
    () => [
      ...ExternalProceduresTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const procedureValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                navigate(getEditExternalProcedureRoute(procedureValues.doctorId.toString()));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  procedureValues.doctorId.toString(),
                  procedureValues.procedureDetail,
                );
              }}
              onViewDetails={() => {
                navigate(getViewExternalProcedurePath(procedureValues.doctorId.toString()));
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
          pageTitle="EXTERNAL PROCEDURES"
          breadcrumbLinks={listExternalProceduresBreadcrumbLinks}
          rightSideButtonText="New Procedure"
                rightSideButtonClickEvent={() => {
                  navigate(NEW_EXTERNAL_PROCEDURE_PATH);
                }}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Doctor Name"
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
                  columns={externalProcedureTableColumnsWithActions}
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

export default ExternalProcedures;
