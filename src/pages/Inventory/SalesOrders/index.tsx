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
import { listSalesOrdersBreadcrumbLinks, salesOrdersTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditSaleRoute,
  NEW_SALES_PATH,
  getViewSalePath,
  
} from 'src/constants/paths';
import { deleteSaleOrder, useDeleteSaleOrder, useGetSalesList } from 'src/hooks/useSalesOrder';
import { usePagination } from 'src/hooks/usePagination';
import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const SalesOrders: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
    const [filters, setFilters] = useState<FiltersState>();
    const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);
  
    const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();
    const { pageNumber, changePageNumber } = usePagination();
  
    const { response, isFetching, isError, refetch } = useGetSalesList({
      apiConfig: {
        params: {
          _page: pageNumber,
          name: debouncedSearchQuery,
        },
      },
    });


    const { mutate: deleteSaleOrder, isPending: isDeleteInProgress } = useDeleteSaleOrder({
        onSuccess: () => {
          setSnackbarAlertState({
            severity: 'success',
            title: 'Medical Bill Deleted.',
            message: `Bill of "${deleteConfirmationModalValues?.name}" has been deleted successfully.`,
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
        } = useDeleteConfirmationModal({ onDelete: deleteSaleOrder });

      const noData = !response?.content?.length;
      
        const salesOrdersTableColumnsWithActions = useMemo(
          () => [
            ...salesOrdersTableColumns,
            {
              header: 'Actions',
              id: 'actions',
              cell: ({ row }) => {
                const salesOrderValues = row.original;
      
                return (
                  <Actions
                    onEditClick={() => {
                      navigate(getEditSaleRoute(salesOrderValues.billId.toString()));
                    }}
                    onDeleteClick={() => {
                      onShowDeleteConfirmationModal(
                        salesOrderValues.billId.toString(),
                        salesOrderValues.patientName || 'No Patient Bill Record'
                      );
                    }}
                    onViewDetails={() => {
                      navigate(getViewSalePath(salesOrderValues.billId.toString()));
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
        pageTitle="MEDICAL BILLS"
        breadcrumbLinks={listSalesOrdersBreadcrumbLinks}
        rightSideButtonText="New Bill"
        rightSideButtonClickEvent={() => {
          navigate(NEW_SALES_PATH);
        }}
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
              emptyMessage="No bill record found"
              Components={{ Loading: 'table' }}
            >
              <Table
                columns={salesOrdersTableColumnsWithActions}
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

export default SalesOrders;
 