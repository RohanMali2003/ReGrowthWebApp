import React, { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'; // Import TextField for date input
import { format } from 'date-fns'; // Import the date-fns library for date formatting
import Typography from '@mui/material/Typography';

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
import { appointmentsTableColumns, viewAppointmentByDateBreadCrumbLinks } from '../constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditAppointmentRoute,
  getViewAppointmentPath,
  NEW_APPOINTMENT_PATH,
} from 'src/constants/paths';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteAppointment, useGetAppointmentsByDate } from 'src/hooks/useAppointments';

const ByDateAppointment: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const [selectedDate, setSelectedDate] = useState<string>(''); // To store selected date
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();

  

  // Format selected date to 'dd-MM-yyyy' before sending to the backend
  const formattedDate = selectedDate ? format(new Date(selectedDate), 'dd-MM-yyyy') : '';
  useEffect(() => {
  // Get today's date and format it as 'yyyy-MM-dd'
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // 'yyyy-MM-dd' format
    setSelectedDate(formattedDate); // Set today's date as default
  }, []);

  // Use the new hook that fetches appointments by the selected date
  const { response, isFetching, isError, refetch } = useGetAppointmentsByDate(formattedDate, {
    apiConfig: {
      params: {
        firstName: debouncedSearchQuery, // Filter by patient name if needed
      },
    },
  });

  const { mutate: deleteAppointment, isPending: isDeleteInProgress } =
    useDeleteAppointment({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Appointment Deleted.',
          message: `Appointment "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteAppointment });

  const noData = !response?.length;

  const appointmentsTableColumnsWithActions = useMemo(
    () => [
      ...appointmentsTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const appointmentValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditAppointmentRoute(appointmentValues.appointmentId.toString()));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  appointmentValues.appointmentId.toString(),
                  appointmentValues.firstName,
                );
              }}
              onViewDetails={() => {
                navigate(getViewAppointmentPath(appointmentValues.appointmentId.toString()));
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
          pageTitle="APPOINTMENTS"
          breadcrumbLinks={viewAppointmentByDateBreadCrumbLinks}
          rightSideButtonText="New Appointment"
          rightSideButtonClickEvent={() => {
            navigate(NEW_APPOINTMENT_PATH);
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="appBlack"
            sx={{ fontSize: '23px', fontWeight: 700, marginTop: '13px' }}
          >
            
          </Typography>
          
          <TextField
            label="Filter by Appointment Date"
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value); // Update the selected date on change
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No appointments found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={appointmentsTableColumnsWithActions}
                  data={response || []}
                  totalRecords={response?.length}
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

export default ByDateAppointment;
