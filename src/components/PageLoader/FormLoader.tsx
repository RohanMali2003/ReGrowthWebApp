import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function FormLoader() {
  return (
    <Stack width="560px" spacing={2}>
      <Stack>
        <Skeleton animation="wave" height="1rem" width="30%" />
        <Skeleton animation="wave" height="4rem" />
      </Stack>
      <Stack>
        <Skeleton animation="wave" height="1rem" width="30%" />
        <Skeleton animation="wave" height="4rem" />
      </Stack>
      <Skeleton animation="wave" height="14rem" />
      <Stack direction="row" gap={2}>
        <Skeleton animation="wave" height="2rem" width="20%" />
        <Skeleton animation="wave" height="2rem" width="20%" />
      </Stack>
    </Stack>
  );
}
