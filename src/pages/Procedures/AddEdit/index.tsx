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
import ProcedureForm from './Form';
import {
  getAddEditBreadCrumbLinks,
  procedureDefaultFormValues,
  procedureFormValidationSchema,
} from '../constants';
import {
  useCreateProcedure,
  useGetProcedureDetail,
  usePatchProcedure
} from 'src/hooks/useProcedures';
import { PROCEDURES } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';

const AddEditProcedure: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateProcedurePayload>({
    defaultValues: procedureDefaultFormValues,
    resolver: yupResolver<CreateProcedurePayload>(procedureFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetProcedureDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
  }, [data, isFetching]);

  const { mutate: patchProcedure, isPending: isPatchLoading } = usePatchProcedure(
    id,
    {
      onSuccess: () => {
        navigate(PROCEDURES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Procedure Updated.',
              message: `Procedure updated successfully.`,
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

  const { mutate: createProcedure, isPending: isCreatingProcedure } =
    useCreateProcedure({
      onSuccess: () => {
        navigate(PROCEDURES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Procedure Created.',
              message: `Procedure created successfully.`,
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

  const onSubmit = (data: CreateProcedurePayload) => {
    if (isEdit) {
      patchProcedure(data);
    } else {
      createProcedure(data);
    }
  };

  const isMutating = isCreatingProcedure || isPatchLoading;

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
            pageTitle={isEdit ? 'Edit Procedure' : 'New Procedure'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <ProcedureForm />

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
                    Create Procedure
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

export default AddEditProcedure;