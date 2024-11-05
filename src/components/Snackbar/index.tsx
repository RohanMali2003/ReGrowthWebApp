import React, { useState } from 'react';
import { WHITE } from 'src/constants/colors';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import MuiSnackbar from '@mui/material/Snackbar';
import Icon from 'src/components/Icon';

type SnackbarProps = {
  message: string | JSX.Element;
  open: boolean;
  onClose: () => void;
  severity: AlertColor;
};

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  open,
  onClose,
  severity,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  const handleExit = () => {
    onClose();
    setShowSnackbar(true);
  };

  return (
    <MuiSnackbar
      sx={{ height: '48px' }}
      open={showSnackbar && open}
      autoHideDuration={severity === 'success' ? 3000 : null}
      TransitionProps={{ onExited: handleExit }}
      onClose={handleClose}
      action={
        <IconButton onClick={onClose}>
          <Icon icon="cross" size="20" />
        </IconButton>
      }
    >
      <Alert
        severity={severity}
        sx={{ width: '100%' }}
        variant="filled"
        onClose={handleClose}
        style={{
          color: WHITE,
        }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
