import React, { useEffect, useState } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import { SxProps } from '@mui/system/styleFunctionSx';

type SelectProps = {
  menuItems: SelectBoxType[];
  error?: string;
  sx?: SxProps;
  field: ControllerRenderProps<FieldValues, string>;
  id: string;
  label: React.ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  name: string;
  autoSelectSingleOption?: boolean;
};

const Select: React.FC<SelectProps> = ({
  sx,
  field,
  error,
  label,
  id,
  multiple,
  disabled,
  menuItems,
  name,
  autoSelectSingleOption = true,
}) => {
  const { setValue } = useFormContext() ?? {};
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | number>('');

  useEffect(() => {
    if (menuItems.length === 1 && autoSelectSingleOption) {
      setSelectedMenuItem(menuItems[0].menuItemValue);
    }
  }, [menuItems.length]);

  // We doing it this way as updating name directly with setValue not causing the component render, we may need to find a better approach to handle this
  useEffect(() => {
    if (selectedMenuItem) {
      field.onChange(menuItems[0].menuItemValue);
      setValue(name, selectedMenuItem, { shouldValidate: true });
    }
  }, [selectedMenuItem]);

  return (
    <FormControl sx={{ width: '100%' }} error={!!error}>
      <InputLabel id={`regrow-select-error-label-${id}`}>{label}</InputLabel>

      <MuiSelect
        sx={{ ...sx }}
        {...field}
        labelId={`regrow-select-error-label-${id}`}
        id={`regrow-select-box-${id}`}
        label={label}
        error={!!error}
        multiple={multiple}
        disabled={disabled}
        data-testid="form-input-select"
        inputProps={{ 'aria-label': name }}
      >
        {menuItems.map((menuItem: SelectBoxType) => (
          <MenuItem
            key={menuItem.menuItemId}
            value={menuItem.menuItemValue}
            disabled={menuItem.disabled}
            data-testid={menuItem.menuItemValue}
          >
            {menuItem.menuItemLabel}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
