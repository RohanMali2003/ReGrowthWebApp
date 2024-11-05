import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { AppError, ErrorBoundary } from './components';
import { ThemeProvider } from '@mui/material/styles';
import baseTheme from './theme';
import AppRoutes from './Routes';
import './App.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The auth token is intermittently sent as undefined in the request
      // headers due to a race condition in token refresh logic. The following
      // code will retry the request twice if it fails because of the auth token
      // being undefined.
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;
        const authHeader =
          axiosError.config?.headers?.Authorization?.toString();
        const isAuthTokenUndefined = authHeader?.includes('undefined');

        return !!isAuthTokenUndefined && failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <ErrorBoundary fallbackComponent={AppError}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
