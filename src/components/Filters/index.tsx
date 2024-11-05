import React, { useEffect, useState } from 'react';
import { LIGHT_PRIMARY_BLUE, PRIMARY_BLUE } from 'src/constants/colors';
import { SearchInput, Icon } from 'src/components';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system/styleFunctionSx';

export type FiltersState = {
  searchQuery: string;
};

type FiltersProps = {
  onFiltersChange: (state: FiltersState) => void;
  placeholder: string;
  containerSx?: SxProps;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getFiltersLabel = (showFilters: boolean) => {
  if (showFilters) {
    return <Icon icon="cross" color={PRIMARY_BLUE} size="25" />;
  } else {
    return 'Filters';
  }
};

export const Filters: React.FC<FiltersProps> = ({
  onFiltersChange,
  placeholder,
  containerSx,
}) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: '',
    type: '',
  });

  function onSearch(searchQuery: string) {
    setFilters({ ...filters, searchQuery });
  }

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  return (
    <Box sx={{ margin: 0, padding: 0 }}>
      <Box
        sx={{
          marginTop: '0px',
          marginBottom: '-16px',
          marginLeft: '18px',
        }}
      >
        <Icon icon="dropupArrow" fill={LIGHT_PRIMARY_BLUE} size="30" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '12px 16px',
          borderRadius: '7px',
          background: LIGHT_PRIMARY_BLUE,
          ...containerSx,
        }}
      >
        <SearchInput
          placeholder={placeholder}
          value={filters.searchQuery}
          onChange={onSearch}
        />
      </Box>
    </Box>
  );
};

export default Filters;
