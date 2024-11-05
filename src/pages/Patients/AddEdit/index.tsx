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
import PatientForm from './Form';
import {
  getAddEditBreadCrumbLinks,
  patientDefaultFormValues,
  patientFormValidationSchema,
} from '../constants';
import {
  useCreatePatient,
  useGetPatientDetail,
  usePatchPatient,
} from 'src/hooks/usePatients';
import { PATIENTS } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';

const AddEditPatient: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreatePatientPayload>({
    defaultValues: patientDefaultFormValues,
    resolver: yupResolver<CreatePatientPayload>(patientFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetPatientDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
  }, [data, isFetching]);

  const { mutate: patchPatient, isPending: isPatchLoading } = usePatchPatient(
    id,
    {
      onSuccess: () => {
        navigate(PATIENTS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Patient Updated.',
              message: `Patient updated successfully.`,
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

  const { mutate: createPatient, isPending: isCreatingPatient } =
    useCreatePatient({
      onSuccess: () => {
        navigate(PATIENTS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Patient Created.',
              message: `Patient created successfully.`,
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

  const onSubmit = (data: CreatePatientPayload) => {
    if (isEdit) {
      patchPatient(data);
    } else {
      createPatient(data);
    }
  };

  const isMutating = isCreatingPatient || isPatchLoading;

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
            pageTitle={isEdit ? 'Edit Patient' : 'New Patient'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <PatientForm />

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
                    Create Patient
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

export default AddEditPatient;
