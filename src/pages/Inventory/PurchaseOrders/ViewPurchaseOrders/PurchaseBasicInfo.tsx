import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  InfoField,
  ErrorBoundary,
  PageLoader,
  Table,
  TableError,
  Button,
  Actions,
  Snackbar,
  LoadingBackdrop,
  ConfirmationModal,
} from 'src/components';
import { WHITE_SMOKE } from 'src/constants/colors';
import { useGetMedicinesListByPurchaseOrderId } from 'src/hooks/usePurchaseOrder';
import { useNavigate, useParams } from 'react-router-dom';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { usePagination } from 'src/hooks/usePagination';
import { PurchaseTransactionTableColumns } from '../PurchaseTransactions/constants';
import {
  NEW_PURCHASE_TRANSACTIONS_PATH,
  getEditPurchaseTransactionRoute,
  getNewPurchaseTransactionRoute
} from 'src/constants/paths';
import { useDeletePurchaseTransaction } from 'src/hooks/usePurchaseTransaction';

interface PurchaseBasicInfoProps {
  purchaseOrderDetails?: PurchaseOrder;
}

const PurchaseBasicInfo: React.FC<PurchaseBasicInfoProps> = ({
  purchaseOrderDetails,
}): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { pageNumber, changePageNumber } = usePagination();
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();

  const { response, isFetching, refetch } = useGetMedicinesListByPurchaseOrderId(id, {
    apiConfig: {
      params: {
        _page: pageNumber,
      },
    },
  });

  const { mutate: deletePurchaseTransaction, isPending: isDeleteInProgress } =
    useDeletePurchaseTransaction({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Purchase Transaction Deleted.',
          message: `Purchase transaction "${deleteConfirmationModalValues?.name}" deleted successfully.`,
        });
        refetch();
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'Error',
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
  } = useDeleteConfirmationModal({ onDelete: deletePurchaseTransaction });

  const purchaseTransactionTableColumnsWithActions = useMemo(
    () => [
      ...PurchaseTransactionTableColumns,
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const purchaseTransactionValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                              navigate(getEditPurchaseTransactionRoute(purchaseTransactionValues.medtransactionId.toString()));
                            }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  purchaseTransactionValues.medtransactionId.toString(),
                  purchaseTransactionValues.medicineName || 'No Medicine Name'
                );
              }}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <Stack spacing={6}>
      <LoadingBackdrop loading={isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      {/* Order Details Section */}
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: WHITE_SMOKE,
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <InfoField
            label="Vendor Name"
            value={purchaseOrderDetails?.invoiceId.toString() || 'N/A'}
          />
          <InfoField
            label="Vendor Name"
            value={purchaseOrderDetails?.vendorName || 'N/A'}
          />
          <InfoField
            label="Purchase Date"
            value={purchaseOrderDetails?.purchaseDate || 'N/A'}
          />
          <InfoField
            label="Total Cost"
            value={`₹ ${purchaseOrderDetails?.totalAmount || 0}`}
          />
        </Box>
      </Stack>

      {/* Medicines List Section */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="appBlack"
            sx={{ fontSize: '23px', fontWeight: 700, marginTop: '13px' }}
          >
            Medicines List
          </Typography>
          <Button
  variant="outlined"
  sx={{ padding: '20px' }}
  onClick={() => navigate(NEW_PURCHASE_TRANSACTIONS_PATH, { state: id  })}
>
  Add Medicine
</Button>


        </Box>
        <ErrorBoundary fallbackComponent={TableError}>
          <PageLoader
            isLoading={isFetching}
            Components={{ Loading: 'table' }}
            emptyMessage="No Medicines Found"
          >
            <Table
              columns={purchaseTransactionTableColumnsWithActions}
              data={response?.content || []}
              totalRecords={response?.items || 0}
              onPageChange={changePageNumber}
              pageNumber={pageNumber}
            />
          </PageLoader>
        </ErrorBoundary>
      </Box>

      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModal}
      />
    </Stack>
  );
};

export default PurchaseBasicInfo;
