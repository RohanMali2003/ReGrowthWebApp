import React,{ useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import PurchaseTransactionForm  from './Form';
import { FiSave } from 'react-icons/fi';
import { PURCHASE_ORDERS , getViewPurchasePath} from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getAddEditBreadCrumbLinks, purchaseTransactionDefaultFormValues, purchaseTransactionFormValidationSchema } from '../constants';
import { createPurchaseTransaction, useCreatePurchaseTransaction, useGetPurchaseTransactionDetail, usePatchPurchaseTransaction } from 'src/hooks/usePurchaseTransaction';


const AddEditPurchaseTransactions: React.FC = (): JSX.Element => {
  const location = useLocation();
    const { state } = location; // This retrieves the state passed via navigate
    
    const invoiceId = state;
  const navigate = useNavigate();
    const { id = '' } = useParams(); 
    const isEdit = !!id;
  
    const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
      useSnackbarAlert();

    const methods = useForm<CreatePuchaseTransactionPayload>({
        defaultValues: purchaseTransactionDefaultFormValues,
        resolver: yupResolver<CreatePuchaseTransactionPayload>(purchaseTransactionFormValidationSchema),
        mode: 'onBlur',
      });
    
      const { isFetching, response: transactionDetail } = useGetPurchaseTransactionDetail({ 
        id,
        
      });

      useEffect(() => {
        if (!isFetching && transactionDetail) {
          const formattedData = {
            ...transactionDetail,
            expiry: transactionDetail.expiry
              ? format(parse(transactionDetail.expiry, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
              : '',
          };
          reset(formattedData); // Reset the form with the formatted data
        }
      }, [transactionDetail, isFetching]);
      
      
      const { mutate: patchPurchaseTransaction, isPending: isPatchLoading } = 
      usePatchPurchaseTransaction(id, {
        onSuccess: (updatedData: purchaseTransaction) => {
          // Extract invoiceId from the updated data
          const { invoiceId } = updatedData;
          if (invoiceId) {
            navigate(getViewPurchasePath(invoiceId.toString()), {
              state: {
                alert: {
                  severity: 'success',
                  title: 'Purchase Transaction Updated',
                  message: `Purchase transaction updated successfully.`,
                },
              },
            });
          } else {
            setSnackbarAlertState({
              severity: 'error',
              title: 'Error',
              message: 'Unable to retrieve Invoice ID after update.',
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
  
    
      
        const { mutate: createPurchaseTransaction, isPending: isCreatingOrder } =
          useCreatePurchaseTransaction({
            
            onSuccess: (createdData: purchaseTransaction) => {
             console.log('Created Purchase Order Data:', createdData);
                   const { invoiceId } = createdData || {};
                   if (invoiceId) {
                     navigate(getViewPurchasePath(invoiceId.toString()), {
                       state: {
                         alert: {
                           severity: 'success',
                           title: 'Medicine Created',
                           message: `Medicine added successfully in inventory.`,
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
      
        const onSubmit = (data: CreatePuchaseTransactionPayload) => {
          // Ensure the date is in dd-MM-yyyy format before sending to the backend
          const formattedData = {
            ...data,
            expiry: data.expiry
              ? format(parse(data.expiry, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy')
              : '',
          };
      
          if (isEdit) {
            patchPurchaseTransaction(formattedData);
          } else {
            createPurchaseTransaction(formattedData);
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
            pageTitle={isEdit ? 'Edit Medicine' : 'Add New Medicine'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <PurchaseTransactionForm />

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

export default AddEditPurchaseTransactions;
