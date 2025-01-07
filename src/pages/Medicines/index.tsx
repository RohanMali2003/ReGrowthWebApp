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
  ConfirmationModal,
  LoadingBackdrop,
} from 'src/components';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteMedicine, useGetMedicinesList } from 'src/hooks/useMedicines';
import {
  listMedicinesBreadcrumbLinks,
  medicinesTableColumns,
} from './constants';
import { getEditMedicineRoute, NEW_MEDICINE_PATH } from 'src/constants/paths';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import { FaTablets } from 'react-icons/fa';

const Medicines: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetMedicinesList({
    apiConfig: {
      params: {
        _page: pageNumber,
        medicineName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicine({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Medicine Deleted.',
          message: `Medicine "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteMedicine });

  const noData = !response?.content?.length;

  const medicinesTableColumnsWithActions = useMemo(
    () => [
      {
        id: 'Box',
        cell: () => {
          return <Icon component={FaTablets} size="20px" />;
        },
      },
      ...medicinesTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const medicineValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditMedicineRoute(medicineValues.medicineId));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  medicineValues.medicineId,
                  medicineValues.medicineName,
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
          pageTitle="MEDICINES"
          breadcrumbLinks={listMedicinesBreadcrumbLinks}
          rightSideButtonText="Add Medicine"
          rightSideButtonClickEvent={() => {
            navigate(NEW_MEDICINE_PATH);
          }}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Medicine Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No medicines found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={medicinesTableColumnsWithActions}
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

export default Medicines;
