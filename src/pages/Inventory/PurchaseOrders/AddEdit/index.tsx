import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { parse, isValid, format } from 'date-fns';
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
import PurchaseOrderForm from './Form';
import {
  getAddEditBreadCrumbLinks,
  purchaseOrderDefaultFormValues,
  purchaseFormValidationSchema,
} from '../constants';
import {
  useCreatePurchaseOrder,
  useGetPurchaseOrderDetail,
  usePatchPurchaseOrder,
} from 'src/hooks/usePurchaseOrder';
import { PURCHASE_ORDERS,getViewPurchasePath } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';

const AddEditPurchase: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreatePurchasePayload>({
    defaultValues: purchaseOrderDefaultFormValues,
    resolver: yupResolver<CreatePurchasePayload>(purchaseFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetPurchaseOrderDetail({ id });

  useEffect(() => {
    if (!isFetching && data) {
      const formattedData = {
        ...data,
        purchaseDate: data.purchaseDate
          ? format(parse(data.purchaseDate, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
          : '',
      };
      reset(formattedData);  // Reset the form with the formatted date
    }
  }, [data, isFetching]);


  const { mutate: patchPurchaseOrder, isPending: isPatchLoading } = usePatchPurchaseOrder(
    id,
    {
      onSuccess: () => {
        navigate(getViewPurchasePath(id), {
          state: {
            alert: {
              severity: 'success',
              title: 'Purchase Order Updated',
              message: `Purchase order updated successfully.`,
            },
          },
        }); 
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'Error',
          message: err.message,
        });
      },
    },
  );

  const { mutate: createPurchaseOrder, isPending: isCreatingOrder } = useCreatePurchaseOrder({
    onSuccess: (createdData: PurchaseOrder) => {
      console.log('Created Purchase Order Data:', createdData);
      const { invoiceId } = createdData || {};
      if (invoiceId) {
        navigate(getViewPurchasePath(invoiceId.toString()), {
          state: {
            alert: {
              severity: 'success',
              title: 'Purchase Order Created',
              message: `Purchase order created successfully.`,
            },
          },
        });
      } else {
        setSnackbarAlertState({
          severity: 'error',
          title: 'Error',
          message: 'Unable to retrieve Invoice ID after creation.',
        });
      }
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
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: CreatePurchasePayload) => {
    // Ensure the date is in dd-MM-yyyy format before sending to the backend
    const formattedData = {
      ...data,
      purchaseDate: data.purchaseDate
        ? format(parse(data.purchaseDate, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy')
        : '',
    };

    if (isEdit) {
      patchPurchaseOrder(formattedData);
    } else {
      createPurchaseOrder(formattedData);
    }
  };


  const isMutating = isCreatingOrder || isPatchLoading;

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
            pageTitle={isEdit ? 'Edit Purchase Order' : 'New Purchase Order'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <PurchaseOrderForm />

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
                    Save
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

export default AddEditPurchase;
