import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_BLUE, SAIL_BLUE } from 'src/constants/colors';
import { Button, Icon } from 'src/components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const styles = {
  display: 'flex',
  alignItems: 'center',
};

export const FormError: React.FC = () => {
  const navigate = useNavigate();

  function onBackButtonClick() {
    navigate(-1);
  }

  return (
    <Box>
      <Box
        sx={{
          ...styles,
          backgroundColor: SAIL_BLUE,
          padding: '14px',
          borderRadius: '7px',
          marginTop: '40px',
        }}
      >
        <Icon
          icon="exclamationCircle"
          size="18"
          cursor="pointer"
          fill={PRIMARY_BLUE}
          style={{ marginRight: '10px', fontWeight: 'bold' }}
        />
        <Typography
          className="text-slate-gray font-weight-medium"
          sx={{ fontSize: '14px', fontWeight: '400' }}
        >
          Sorry, an unexpected error occurred on this page. Please try again
          later.
        </Typography>
      </Box>
      <Button
        variant="outlined"
        sx={{ marginTop: '20px', padding: '20px', width: '150px' }}
        startIcon={<Icon icon="arrowLeft" size="18" />}
        onClick={onBackButtonClick}
      >
        Back
      </Button>
    </Box>
  );
};

export default FormError;
