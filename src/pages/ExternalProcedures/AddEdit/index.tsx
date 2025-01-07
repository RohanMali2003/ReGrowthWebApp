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
  externalProcedureDefaultFormValues,
  externalProcedureFormValidationSchema,
  getAddEditBreadCrumbLinks,
} from '../constants';
import { EXTERNAL_PROCEDURE } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useCreateExternalProcedure, useGetExternalProcedureDetail, usePatchExternalProcedure } from 'src/hooks/useExternalProcedures';
import ExternalProcedureForm from './Form';
import { formatRegDate } from 'src/util/common';

const AddEditExternalProcedure: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;
  
  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateExternalProcedurePayload>({
    defaultValues: externalProcedureDefaultFormValues,
    resolver: yupResolver<CreateExternalProcedurePayload>(externalProcedureFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, response } = useGetExternalProcedureDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && response) {
      if (response.procedureDate) {
        response.procedureDate = formatRegDate(response.procedureDate);;
      }   
      reset(response);
    }
  }, [response, isFetching]);

  const { mutate: patchExternalProcedure, isPending: isPatchLoading } = usePatchExternalProcedure(
    id,
    {
      onSuccess: () => {
        navigate(EXTERNAL_PROCEDURE, {
          state: {
            alert: {
              severity: 'success',
              title: 'External Procedure Updated.',
              message: `External Procedure updated successfully.`,
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

  const { mutate: createExternalProcedure, isPending: isCreatingProcedure } =
  useCreateExternalProcedure({  
      onSuccess: () => {
        navigate(EXTERNAL_PROCEDURE, {
          state: {
            alert: {
              severity: 'success',
              title: 'External Procedure Created.',
              message: `External Procedure created successfully.`,
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

  const onSubmit = (data: CreateExternalProcedurePayload) => {
    if (data.procedureDate) {
      data.procedureDate = formatRegDate(data.procedureDate);;
    }
    if (isEdit) {
      patchExternalProcedure(data);
    } else {
      createExternalProcedure(data);
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

          <Box sx={{ marginTop: '60px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <ExternalProcedureForm />

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

export default AddEditExternalProcedure;
