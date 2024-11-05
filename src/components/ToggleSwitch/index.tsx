import React, { ChangeEvent, forwardRef } from 'react';
import { BLACK_CORAL } from 'src/constants/colors';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { SxProps } from '@mui/system/styleFunctionSx';

const AntSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== 'showIcon',
})<{ showIcon: boolean }>(({ theme, showIcon }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: BLACK_CORAL,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: BLACK_CORAL,
    boxSizing: 'border-box',
    ...(showIcon
      ? {
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 14,
            height: 14,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8, <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>')`,
            left: 13,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            right: 13,
          },
        }
      : {}),
  },
}));

interface SwitchButtonProps {
  type: 'AntSwitch' | 'DefaultMUiSwitch';
  onChange?: (evt: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  sx?: SxProps;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  showIcon?: boolean;
}

export const ToggleSwitch = forwardRef<HTMLButtonElement, SwitchButtonProps>(
  function ToggleSwitch(props, ref) {
    const {
      type,
      onChange,
      sx,
      className,
      disabled,
      checked,
      defaultChecked,
      showIcon = false,
    } = props;

    if (type === 'AntSwitch') {
      return (
        <AntSwitch
          onChange={onChange}
          sx={sx}
          className={className}
          disabled={disabled}
          checked={checked}
          ref={ref}
          showIcon={showIcon}
          defaultChecked={defaultChecked}
        />
      );
    }

    if (type === 'DefaultMUiSwitch') {
      return (
        <Switch
          onChange={onChange}
          sx={sx}
          className={className}
          disabled={disabled}
          checked={checked}
          ref={ref}
        />
      );
    }

    return null;
  },
);

export default ToggleSwitch;
