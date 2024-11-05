import React from 'react';
import { Button, Modal } from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack sx={{ width: '585px' }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '30px',
            lineHeight: '36px',
            textTransform: 'uppercase',
          }}
        >
          Are you sure?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '49px',
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            sx={{ marginLeft: '20px' }}
            variant="contained"
            onClick={onSubmit}
          >
            Confirm delete
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
