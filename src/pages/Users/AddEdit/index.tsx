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
import { USERS } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useCreateUser, useGetUserDetail, usePatchUser } from 'src/hooks/useUser';
import UserForm from './Form';
import { getAddEditBreadCrumbLinks, userDefaultFormValues, userFormValidationSchema } from '../constants';

const AddEditUser: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateUserPayload>({
    defaultValues: userDefaultFormValues,
    resolver: yupResolver<CreateUserPayload>(userFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetUserDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
  }, [data, isFetching]);

  const { mutate: patchUser, isPending: isPatchLoading } = usePatchUser(
    id,
    {
      onSuccess: () => {
        navigate(USERS, {
          state: {
            alert: {
              severity: 'success',
              title: 'User Updated.',
              message: `User updated successfully.`,
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

  const { mutate: createUser, isPending: isCreatingUser } =
    useCreateUser({
      onSuccess: () => {
        navigate(USERS, {
          state: {
            alert: {
              severity: 'success',
              title: 'User Created.',
              message: `User created successfully.`,
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

  const onSubmit = (data: CreateUserPayload) => {
    if (isEdit) {
      patchUser(data);
    } else {
      createUser(data);
    }
  };

  const isMutating = isCreatingUser || isPatchLoading;

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
            pageTitle={isEdit ? 'Edit User' : 'New User'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <UserForm />

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
                    Create User
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

export default AddEditUser;
