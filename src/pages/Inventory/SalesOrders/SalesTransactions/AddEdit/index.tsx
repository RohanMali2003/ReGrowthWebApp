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
import SalesTransactionForm from './Form';
import { FiSave } from 'react-icons/fi';
import { PURCHASE_ORDERS, SALES_ORDERS, getViewPurchasePath, getViewSalePath } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getAddEditBreadCrumbLinks, salesTransactionDefaultFormValues, salesTransactionFormValidationSchema } from '../constants';
import { createSalesTransaction, useCreateSalesTransaction, useGetSalesTransactionDetail, usePatchSalesTransaction } from 'src/hooks/useSalesTransaction';

const AddEditSalesTransactions: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateSaleTransactionPayload>({
    defaultValues: salesTransactionDefaultFormValues,
    resolver: yupResolver<CreateSaleTransactionPayload>(salesTransactionFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, response: transactionDetail } = useGetSalesTransactionDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && transactionDetail) {
      reset(transactionDetail);
    }
  }, [transactionDetail, isFetching]);

  const { mutate: patchSalesTransaction, isPending: isPatchLoading } = usePatchSalesTransaction(
    id,
    {
      onSuccess: (updatedData: SalesTransaction) => {
        const { billNumber } = updatedData;
        if (billNumber) {
          navigate(getViewSalePath(billNumber.toString()), {
            state: {
              alert: {
                severity:
                  'success',
                title: 'Medicine Updated',
                message: `Medicine updated successfully.`,
              },
            },
          });
        } else {
          setSnackbarAlertState({
            severity: 'error',
            title: 'Error',
            message: 'Unable to retrieve Bill ID after update.',
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

  const { mutate: createSalesTransaction, isPending: isCreatingOrder } =
    useCreateSalesTransaction({
      onSuccess: (createdData: SalesTransaction) => {
        console.log('Created Bill Order Data:', createdData);
        const { billNumber } = createdData || {};
        if (billNumber) {
          navigate(getViewSalePath(billNumber.toString()), {
            state: {
              alert: {
                severity: 'success',
                title: 'Medicine Created',
                message: `Medicine added successfully in bill.`,
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



  const onSubmit = (data: CreateSaleTransactionPayload) => {
    if (isEdit) {
      patchSalesTransaction(data);
    } else {
      createSalesTransaction(data);
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
      />;



      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <SubPanel
            pageTitle={isEdit ? 'Edit Medicine' : 'Add New Medicine'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <SalesTransactionForm />

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

export default AddEditSalesTransactions;