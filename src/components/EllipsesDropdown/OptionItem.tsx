import React from 'react';
import { BLUE_MATISSE, SAIL_BLUE } from 'src/constants/colors';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type OptionButtonType = {
  label: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

type OptionItemProps = {
  label: string;
  actions: OptionButtonType[];
};

export const OptionItem: React.FC<OptionItemProps> = ({ label, actions }) => {
  return (
    <Stack spacing={1.5} alignItems="flex-end">
      <Typography
        sx={{ fontSize: '14px', fontWeight: '600' }}
        alignContent="end"
      >
        {label}
      </Typography>
      <Stack direction="row" spacing={1.5}>
        {actions.map(({ label, icon, onClick }, key) => (
          <Box
            key={`${label}-${key}`}
            sx={{
              backgroundColor: SAIL_BLUE,
              display: 'flex',
              justifyContent: 'center',
              padding: '6px 12px',
              columnGap: '5px',
              borderRadius: '4px',
            }}
            onClick={onClick}
          >
            {icon}
            <Typography color={BLUE_MATISSE}>{label}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default OptionItem;
