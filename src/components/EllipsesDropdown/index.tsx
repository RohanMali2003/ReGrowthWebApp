import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BLACK, ROMAN_SILVER } from 'src/constants/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from 'src/components/Icon';

export type EllipsesDropdownOptions = Array<{
  label: string | JSX.Element;
  disabled?: boolean;
  action?: (uid: string, itemName: string, item: unknown) => void;
}>;

type EllipsesDropdownProps = {
  options: EllipsesDropdownOptions;
  style?: React.CSSProperties;
  uid?: string;
  itemName?: string;
  type?:
    | 'splitButton'
    | 'arrowDropDownButton'
    | 'arrowDropdown'
    | 'splitButtonSeparate';
  splitButtonLabel?: string;
  item?: unknown;
  optionsLabel?: string;
  disabled?: boolean;
  variant?: 'outlined' | 'contained' | 'text';
  buttonLabel?: string;
  sxProps?: SxProps;
};

export const EllipsesDropdown: React.FC<EllipsesDropdownProps> = ({
  options,
  style,
  uid = '',
  itemName = '',
  type = 'threeDot',
  splitButtonLabel = 'Actions',
  item,
  optionsLabel,
  disabled = false,
  variant = 'outlined',
  buttonLabel,
  sxProps,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function onIconClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  function onMenuItemClick(
    action:
      | ((uid: string, itemName: string, item: unknown) => void)
      | undefined,
    uid: string,
    itemName: string,
    item: unknown,
  ) {
    if (action) action(uid, itemName, item);
    handleClose();
  }

  return (
    <div style={{ ...style, pointerEvents: disabled ? 'none' : 'fill' }}>
      {type === 'threeDot' && (
        <div onClick={disabled ? undefined : onIconClick}>
          <Icon
            icon="threeVerticalDots"
            color={BLACK}
            size="22"
            cursor="pointer"
          />
        </div>
      )}
      {(type === 'splitButton' || type === 'arrowDropDownButton') && (
        <ButtonGroup
          size="small"
          variant={variant}
          aria-label="split button"
          disabled={disabled}
        >
          {type === 'splitButton' && <Button>{splitButtonLabel}</Button>}
          <Button
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            sx={{
              padding: '7px',
              display: 'flex',
              justifyContent: 'space-around',
              ...sxProps,
            }}
            onClick={onIconClick}
          >
            {buttonLabel}
            {!anchorEl ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </Button>
        </ButtonGroup>
      )}
      {type === 'arrowDropdown' && (
        <div style={{ cursor: 'pointer' }} onClick={onIconClick}>
          {!anchorEl ? (
            <FiChevronDown size="18px" />
          ) : (
            <FiChevronUp size="18px" />
          )}
        </div>
      )}
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: '138px',
            border: `1px solid ${ROMAN_SILVER}`,
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal:
            type === 'splitButton' || type === 'arrowDropDownButton'
              ? 'right'
              : 'center',
        }}
      >
        {optionsLabel ? (
          <Typography
            sx={{ fontWeight: 600, padding: '4px 10px', textAlign: 'center' }}
          >
            {optionsLabel}
          </Typography>
        ) : null}
        {options.map((option, index, array) => (
          <MenuItem
            key={`${uid}-${index}`}
            onClick={() => onMenuItemClick(option.action, uid, itemName, item)}
            disabled={option.disabled}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              fontSize: '13px',
              fontWeigth: '400',
              lineHeight: '18px',
            }}
            divider={array.length === index + 1 ? false : true}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default EllipsesDropdown;
