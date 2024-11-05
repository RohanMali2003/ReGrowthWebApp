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
import { listPatientsBreadcrumbLinks, patientsTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditPatientRoute,
  getViewPatientPath,
  NEW_PATIENT_PATH,
} from 'src/constants/paths';
import { useDeletePatient, useGetPatientList } from 'src/hooks/usePatients';
import { usePagination } from 'src/hooks/usePagination';
import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Patients: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetPatientList({
    apiConfig: {
      params: {
        _page: pageNumber,
        // TODO: Change this to full text search
        firstName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deletePatient, isPending: isDeleteInProgress } =
    useDeletePatient({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Patient Deleted.',
          message: `Patient "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deletePatient });

  const noData = !response?.data?.length;

  const patientsTableColumnsWithActions = useMemo(
    () => [
      ...patientsTableColumns,
      {
        header: 'Registration Date',
        accessorKey: 'patientRegDate',
        cell: ({ getValue }) => (
          <Box className="text-slate-gray">{formatDate(getValue())}</Box>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const patientValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditPatientRoute(patientValues.id));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  patientValues.id,
                  patientValues.firstName,
                );
              }}
              onViewDetails={() => {
                navigate(getViewPatientPath(patientValues.id));
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
          pageTitle="PATIENTS"
          breadcrumbLinks={listPatientsBreadcrumbLinks}
          rightSideButtonText="New Patient"
          rightSideButtonClickEvent={() => {
            navigate(NEW_PATIENT_PATH);
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
                emptyMessage="No patients found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={patientsTableColumnsWithActions}
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
      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModal}
      />
    </>
  );
};

export default Patients;
