import React, { useState } from 'react';
import {
  Filters,
  Button,
  ErrorBoundary,
  FiltersState,
  getFiltersLabel,
  TableError,
} from 'src/components';
import Box from '@mui/material/Box';

type TableContainerProps = {
  onFiltersChange?: (state: FiltersState) => void;
  children: (props: { showFilters: boolean }) => JSX.Element;
  leftJSXFragment?: JSX.Element;
  placeholder: string;
  rightJSXFragment?: JSX.Element;
};

export const TableContainer: React.FC<TableContainerProps> = ({
  children,
  onFiltersChange = () => {
    // should be empty callback by default
  },
  leftJSXFragment,
  placeholder,
  rightJSXFragment,
}): JSX.Element => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  return (
    <ErrorBoundary fallbackComponent={TableError}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {leftJSXFragment}
            <Button
              variant="outlined"
              onClick={() => {
                setShowFilters(!showFilters);
              }}
            >
              {getFiltersLabel(showFilters)}
            </Button>
            {rightJSXFragment}
          </Box>
        </Box>

        {showFilters ? (
          <Box>
            <Filters
              onFiltersChange={onFiltersChange}
              placeholder={placeholder}
            />
          </Box>
        ) : null}
      </Box>
      <Box>{children({ showFilters })}</Box>
    </ErrorBoundary>
  );
};

export default TableContainer;
