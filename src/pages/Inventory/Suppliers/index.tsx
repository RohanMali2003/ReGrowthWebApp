import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Snackbar,
  Actions,
  LoadingBackdrop,
  ConfirmationModal,
} from 'src/components';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import {
  listSuppliersBreadcrumbLinks,
  suppliersTableColumns,
} from './constants';
import { useDeleteSupplier, useGetSuppliersList } from 'src/hooks/useSuppliers';
import { useNavigate } from 'react-router-dom';
import { getEditSupplierRoute, NEW_SUPPLIER_PATH } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Suppliers: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetSuppliersList({
    apiConfig: {
      params: {
        _page: pageNumber,
        supplierName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteSupplier, isPending: isDeleteInProgress } =
    useDeleteSupplier({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Supplier Deleted.',
          message: `Supplier "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteSupplier });

  const noData = !response?.content?.length;

  const suppliersTableColumnsWithActions = useMemo(
    () => [
      ...suppliersTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const supplierValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditSupplierRoute(supplierValues.id));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  supplierValues.id,
                  supplierValues.supplierName,
                );
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
      <LoadingBackdrop loading={!!isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="SUPPLIERS"
          breadcrumbLinks={listSuppliersBreadcrumbLinks}
          rightSideButtonText="New Supplier"
          rightSideButtonClickEvent={() => {
            navigate(NEW_SUPPLIER_PATH);
          }}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Supplier Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No suppliers found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={suppliersTableColumnsWithActions}
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

export default Suppliers;
