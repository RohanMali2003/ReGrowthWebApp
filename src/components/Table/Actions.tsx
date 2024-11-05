import React from 'react';
import { FiArrowRight, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { AURO_METAL, PRIMARY_BLUE } from 'src/constants/colors';
import ActionsContainer from 'src/components/Table/ActionsContainer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system/styleFunctionSx';

type ActionsProps = {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onViewDetails?: () => void;
  viewDetailsLabel?: string;
  to?: string;
  deleteLabel?: string;
  sxContainer?: SxProps;
};

export const Actions: React.FC<ActionsProps> = ({
  onEditClick,
  onDeleteClick,
  onViewDetails,
  viewDetailsLabel,
  deleteLabel,
  to,
  sxContainer,
}) => (
  <Box
    sx={{
      color: PRIMARY_BLUE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      ...sxContainer,
    }}
  >
    {onEditClick && (
      <Tooltip title="Edit" arrow>
        <IconButton
          size="small"
          sx={{ marginRight: '35px' }}
          onClick={onEditClick}
        >
          <FiEdit3 cursor="pointer" color={AURO_METAL} size={18} />
        </IconButton>
      </Tooltip>
    )}

    {onDeleteClick && deleteLabel ? (
      <Tooltip title="Delete" arrow>
        <Button
          variant="text"
          onClick={onDeleteClick}
          sx={{ color: AURO_METAL }}
          endIcon={<FiTrash2 color={AURO_METAL} cursor="pointer" size={18} />}
        >
          {deleteLabel}
        </Button>
      </Tooltip>
    ) : null}

    {onDeleteClick && !deleteLabel ? (
      <Tooltip title="Delete" arrow>
        <IconButton
          sx={{ marginRight: onViewDetails ? '35px' : '5px' }}
          onClick={onDeleteClick}
        >
          <FiTrash2 color={AURO_METAL} cursor="pointer" size={18} />
        </IconButton>
      </Tooltip>
    ) : null}

    <ActionsContainer to={to} onClick={onViewDetails}>
      <Typography
        sx={{ textDecoration: 'none', marginRight: '5px' }}
        color={PRIMARY_BLUE}
        fontSize="12px"
      >
        {viewDetailsLabel || 'View Details'}
      </Typography>
      <FiArrowRight color={PRIMARY_BLUE} cursor="pointer" size={18} />
    </ActionsContainer>
  </Box>
);

export default Actions;
