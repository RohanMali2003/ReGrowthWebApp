import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ErrorBoundary,
  FormError,
  PageLoader,
  Snackbar,
  SubPanel,
  LoadingBackdrop,
} from 'src/components';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';
import {
  appointmentDefaultFormValidateSchema,
  appointmentDefaultFormValues,
  getAddEditBreadCrumbLinks,
} from '../constants';
import { APPOINTMENTS } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useCreateAppointment, useGetAppointmentDetail, usePatchAppointment } from 'src/hooks/useAppointments';
import AppointmentForm from './Form';
import { formatRegDate } from 'src/util/common';

const AddEditAppointment: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateAppointmentPayload>({
    defaultValues: appointmentDefaultFormValues,
    resolver: yupResolver<CreateAppointmentPayload>(appointmentDefaultFormValidateSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetAppointmentDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && data) {
      if (data.appointmentDate) {
        data.appointmentDate = formatRegDate(data.appointmentDate);
      }
      reset(data);
    }
  }, [data, isFetching]);

  const { mutate: patchAppointment, isPending: isPatchLoading } = usePatchAppointment(
    id,
    {
      onSuccess: () => {
        navigate(APPOINTMENTS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Appointment Updated.',
              message: `Appointment updated successfully.`,
            },
          },
        });
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    },
  );

  const { mutate: createAppointment, isPending: isCreatingAppointment } =
    useCreateAppointment({
      onSuccess: () => {
        navigate(APPOINTMENTS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Appointment Created.',
              message: `Appointment created successfully.`,
            },
          },
        });
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
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: CreateAppointmentPayload) => {
    if (data.appointmentDate) {
      data.appointmentDate = formatRegDate(data.appointmentDate);
    }
    if (isEdit) {
      patchAppointment(data);
    } else {
      createAppointment(data);
    }
  };

  const isMutating = isCreatingAppointment || isPatchLoading;

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <LoadingBackdrop loading={isMutating} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <SubPanel
            pageTitle={isEdit ? 'Edit Appointment' : 'New Appointment'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px'}}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <AppointmentForm />

              <Box sx={{ marginTop: '60px' }}>
                <Button
                  variant="outlined"
                  sx={{ width: '170px', borderWidth: '2px' }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                {!isEdit && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: 'fit-content', marginLeft: '20px' }}
                  >
                    Create Appointment
                  </Button>
                )}
              </Box>
            </PageLoader>
          </Box>
        </Box>
      </FormProvider>
    </ErrorBoundary>
  );
};

export default AddEditAppointment;
