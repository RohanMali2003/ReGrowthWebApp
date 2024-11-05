import React from 'react';
import { LIGHT_PRIMARY_BLUE, PRIMARY_BLUE } from 'src/constants/colors';
import MenuItem from '@mui/material/MenuItem';
import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type PaginationProps = {
  onPageChange: (page: number) => void;
  onPageSizeChange?: (page: number) => void;
  totalRecords: number;
  pageSize?: number;
  page: number;
};

const numberOfRecordsOptions = [10, 20, 50];

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalRecords,
  pageSize = 10,
  page,
  onPageSizeChange,
}) => {
  const numberOfPages = Math.ceil(totalRecords / pageSize);

  return (
    <Stack direction="row" gap={3} alignItems="center" justifyContent="center">
      <MuiPagination
        page={page}
        count={numberOfPages}
        variant="outlined"
        shape="rounded"
        onChange={(_event, value) => onPageChange(value)}
        sx={{
          height: '50px',
          mt: '20px',
          '& .MuiPaginationItem-root': { height: '40px', width: '40px' },
          '& .Mui-selected': {
            backgroundColor: LIGHT_PRIMARY_BLUE,
            borderColor: PRIMARY_BLUE,
            color: PRIMARY_BLUE,
          },
        }}
      />
      {onPageSizeChange ? (
        <TextField
          select
          label="No. of records"
          sx={{
            width: '132px',
            height: '40px',
            '& .MuiInputBase-root': {
              height: '40px',
            },
          }}
          defaultValue={pageSize}
          onChange={(event) => {
            onPageChange(1);
            onPageSizeChange(Number(event.target.value));
          }}
        >
          {numberOfRecordsOptions.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      ) : null}

      <Typography>
        Total{' '}
        <Typography component="span" sx={{ fontWeight: 600 }}>
          {totalRecords}
        </Typography>
      </Typography>
    </Stack>
  );
};

export default Pagination;
