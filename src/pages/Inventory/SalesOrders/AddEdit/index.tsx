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

import {
  getAddEditBreadCrumbLinks,
  salesOrderDefaultFormValues,
  salesFormValidationSchema,
} from '../constants';
import {
  useCreateSaleOrder,
  useGetSaleOrderDetail,
  usePatchSaleOrder,
} from 'src/hooks/useSalesOrder';
import { SALES_ORDERS,getViewSalePath } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import SalesOrderForm from './Form';

const AddEditSales: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  interface CreateSaleOrderResponse {
    billId: string; // Adjust the type as per your API response
  }
  

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateSalePayload>({
    defaultValues: salesOrderDefaultFormValues,
    resolver: yupResolver<CreateSalePayload>(salesFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetSaleOrderDetail({ id });

  useEffect(() => {
    if (!isFetching && data) {
      const formattedData = {
        ...data,
        billDate: data.billDate
          ? format(parse(data.billDate, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
          : '',
      };
      reset(formattedData);  // Reset the form with the formatted date
    }
  }, [data, isFetching]);


  const { mutate: patchSaleOrder, isPending: isPatchLoading } = usePatchSaleOrder(
    id,
    {
      onSuccess: () => {
        navigate(getViewSalePath(id), {
          state: {
            alert: {
              severity: 'success',
              title: 'Bill Updated',
              message: `Bill updated successfully.`,
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
  

  const { mutate: createSaleOrder, isPending: isCreatingOrder } = useCreateSaleOrder({
    onSuccess: (createdData: SaleOrder) => {  // Explicitly type createdData
      const { billId } = createdData || {}; 
      if (billId) {
        navigate(getViewSalePath(billId.toString()), {
          state: {
            alert: {
              severity: 'success',
              title: 'Bill Created',
              message: `Bill created successfully.`,
            },
          },
        });
      } else {
        setSnackbarAlertState({
          severity: 'error',
          title: 'Error',
          message: 'Unable to retrieve Bill ID after creation.',
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

  const onSubmit = (data: CreateSalePayload) => {
    // Ensure the date is in dd-MM-yyyy format before sending to the backend
    const formattedData = {
      ...data,
      billDate: data.billDate
        ? format(parse(data.billDate, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy')
        : '',
    };

    if (isEdit) {
      patchSaleOrder(formattedData);
    } else {
      createSaleOrder(formattedData);
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
            pageTitle={isEdit ? 'Edit Bill' : 'New Bill'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <SalesOrderForm />

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
                    Create Purchase Order
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

export default AddEditSales;
