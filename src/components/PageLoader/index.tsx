import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

import { NoData } from 'src/components';
import FormLoader from './FormLoader';
import TableLoader from './TableLoader';

interface PageLoaderComponentOverrides {
  Empty?: JSX.Element;
  Loading?: 'table' | 'card' | 'form' | JSX.Element;
  Error?: JSX.Element;
}

interface PageLoaderProps {
  isLoading?: boolean;
  error?: string;
  isEmpty?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  Components?: PageLoaderComponentOverrides;
  children: ReactNode;
}

type LoadingComponentProps = {
  message: string;
  component?: PageLoaderComponentOverrides['Loading'];
};

const LoadingComponent = ({ message, component }: LoadingComponentProps) => {
  if (component === 'table') {
    return <TableLoader />;
  }

  if (component === 'form') {
    return <FormLoader />;
  }

  if (!component) {
    return <Box>{message}</Box>;
  }

  return <Box>{component}</Box>;
};

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = false,
  isEmpty = false,
  error,
  loadingMessage = 'Loading...',
  emptyMessage = 'No records found.',
  Components,
  children,
}) => {
  if (isLoading) {
    return (
      <LoadingComponent
        message={loadingMessage}
        component={Components?.Loading}
      />
    );
  }

  if (error) {
    return Components?.Empty || <NoData message={error} />;
  }

  if (isEmpty) {
    return <Box>{Components?.Empty || <NoData message={emptyMessage} />}</Box>;
  }

  return children;
};

export default PageLoader;
