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
import { useGetMedicinesListBySaleOrderId } from 'src/hooks/useSalesOrder';
import { useNavigate, useParams } from 'react-router-dom';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { usePagination } from 'src/hooks/usePagination';
import { SalesTransactionTableColumns } from '../SalesTransactions/constants';
import {
   NEW_SALES_TRANSACTIONS_PATH,
   getEditSalesTransactionRoute,
   getNewSalesTransactionRoute
 } from 'src/constants/paths';
import { deleteSalesTransaction, useDeleteSalesTransaction } from 'src/hooks/useSalesTransaction';


interface SalesBasicInfoProps {
    salesOrderDetails?: SaleOrder;
  }
  

  const SalesBasicInfo: React.FC<SalesBasicInfoProps> = ({
    salesOrderDetails,
  }): JSX.Element => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { pageNumber, changePageNumber } = usePagination();
    const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();
  
    const { response, isFetching, refetch } = useGetMedicinesListBySaleOrderId(id, {
      apiConfig: {
        params: {
          _page: pageNumber,
        },
      },
    });
  
    const { mutate: deletePurchaseTransaction, isPending: isDeleteInProgress } =
      useDeleteSalesTransaction({
        onSuccess: () => {
          setSnackbarAlertState({
            severity: 'success',
            title: 'Medicine Transaction Deleted.',
            message: `Medicine transaction "${deleteConfirmationModalValues?.name}" deleted successfully.`,
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
    } = useDeleteConfirmationModal({ onDelete: deleteSalesTransaction });
  
    const salesTransactionTableColumnsWithActions = useMemo(
      () => [
        ...SalesTransactionTableColumns,
        {
          header: 'Actions',
          id: 'actions',
          cell: ({ row }) => {
            const salesTransactionValues = row.original;
            return (
              <Actions
                onEditClick={() => {
                                navigate(getEditSalesTransactionRoute(salesTransactionValues.billTransactionId.toString()));
                              }}
                onDeleteClick={() => {
                  onShowDeleteConfirmationModal(
                    salesTransactionValues.billTransactionId.toString(),
                    salesTransactionValues.medName || 'No Medicine Name'
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
              label="Patient Name"
              value={salesOrderDetails?.patientName || 'N/A'}
            />
            <InfoField
              label="Bill Date"
              value={salesOrderDetails?.billDate || 'N/A'}
            />
            <InfoField
              label="Total Cost"
              value={`₹ ${salesOrderDetails?.totalAmount || 0}`}
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
    onClick={() => navigate(NEW_SALES_TRANSACTIONS_PATH, { state: id  })}
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
                columns={salesTransactionTableColumnsWithActions}
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
  
  export default SalesBasicInfo;
  


