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
  LoadingBackdrop,
} from 'src/components';
import { listPurchaseOrdersBreadcrumbLinks, purchaseordersTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditPurchaseRoute,
  NEW_PURCHASE_PATH,
  getViewPurchasePath,
  
} from 'src/constants/paths';
import { useDeletePurchaseOrder, useGetPurchaseOrderList } from 'src/hooks/usePurchaseOrder';
import { usePagination } from 'src/hooks/usePagination';
import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const PurchaseOrders: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();
  const { pageNumber, changePageNumber } = usePagination();

  const { response, isFetching, isError, refetch } = useGetPurchaseOrderList({
    apiConfig: {
      params: {
        _page: pageNumber,
        vendorName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deletePurchaseOrder, isPending: isDeleteInProgress } = useDeletePurchaseOrder({
    onSuccess: () => {
      setSnackbarAlertState({
        severity: 'success',
        title: 'Purchase Order Deleted.',
        message: `Purchase order "${deleteConfirmationModalValues?.name}" has been deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deletePurchaseOrder });

  const noData = !response?.content?.length;

  const purchaseOrdersTableColumnsWithActions = useMemo(
    () => [
      ...purchaseordersTableColumns,
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const purchaseOrderValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditPurchaseRoute(purchaseOrderValues.invoiceId.toString()));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  purchaseOrderValues.invoiceId.toString(),
                  purchaseOrderValues.inoviceNumber || 'No Invoice Number'
                );
              }}
              onViewDetails={() => {
                navigate(getViewPurchasePath(purchaseOrderValues.invoiceId.toString()));
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
          pageTitle="PURCHASE ORDERS"
          breadcrumbLinks={listPurchaseOrdersBreadcrumbLinks}
          rightSideButtonText="New Purchase Order"
          rightSideButtonClickEvent={() => {
            navigate(NEW_PURCHASE_PATH);
          }}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Vendor Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No purchase orders found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={purchaseOrdersTableColumnsWithActions}
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

export default PurchaseOrders;
