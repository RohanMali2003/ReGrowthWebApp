import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { loginDefaultFormValues, loginFormValidationSchema } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginUser } from 'src/hooks/useLogin';
import {
  Button,
  ErrorBoundary,
  FormError,
  PageTitle,
  Snackbar,
} from 'src/components';
import { Box, Container } from '@mui/material';
import LoginForm from './Form';
import { DASHBOARD_PATH } from 'src/constants/paths';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();

  const methods = useForm<CreateLoginPayload>({
    defaultValues: loginDefaultFormValues,
    resolver: yupResolver<CreateLoginPayload>(loginFormValidationSchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
  } = methods;

  const { mutate: loginUser } =
    useLoginUser({
      onSuccess: () => {
        navigate(DASHBOARD_PATH, {
          state: {
            alert: {
              severity: 'success',
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

  const onSubmit = (payload: CreateLoginPayload) => {
    loginUser(payload);
  };

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      <Container component="main" maxWidth="xs">
        <FormProvider {...methods}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}> 
            <Box sx={{ marginTop: '40px', maxWidth: '630px' }}>
            <PageTitle>Login</PageTitle> 
            </Box>     
            <Box sx={{ marginTop: '20px', maxWidth: '630px' }}>   
              <LoginForm />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 'fit-content', alignContent: 'center', marginTop: '20px' }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Container>
    </ErrorBoundary>
  );
};

export default Login;
