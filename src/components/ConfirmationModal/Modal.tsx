import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import MuiModal from '@mui/material/Modal';

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children?: JSX.Element;
};

const modalContentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  padding: '25px 40px',
  border: '0 !important',
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <MuiModal
      aria-labelledby="ReGrowthWeb Modal"
      aria-describedby="general modal for ReGrowthWeb"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalContentStyle}>{children}</Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
