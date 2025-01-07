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
  getAddEditBreadCrumbLinks,
  supplierDefaultFormValues,
  supplierFormValidationSchema,
} from '../constants';
import { SUPPLIERS } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import {
  useCreateSupplier,
  useGetSupplierDetail,
  usePatchSupplier,
} from 'src/hooks/useSuppliers';
import SupplierForm from './Form';

const AddEditSupplier: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateSupplierPayload>({
    defaultValues: supplierDefaultFormValues,
    resolver: yupResolver<CreateSupplierPayload>(supplierFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetSupplierDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
  }, [data, isFetching]);

  const { mutate: patchSupplier, isPending: isPatchLoading } = usePatchSupplier(
    id,
    {
      onSuccess: () => {
        navigate(SUPPLIERS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Supplier Updated.',
              message: `Supplier updated successfully.`,
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

  const { mutate: createSupplier, isPending: isCreatingSupplier } =
    useCreateSupplier({
      onSuccess: () => {
        navigate(SUPPLIERS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Supplier Created.',
              message: `Supplier created successfully.`,
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

  const onSubmit = (data: CreateSupplierPayload) => {
    if (isEdit) {
      patchSupplier(data);
    } else {
      createSupplier(data);
    }
  };

  const isMutating = isCreatingSupplier || isPatchLoading;

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
            pageTitle={isEdit ? 'Edit Supplier' : 'New Supplier'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <SupplierForm />

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
                    Create Supplier
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

export default AddEditSupplier;
