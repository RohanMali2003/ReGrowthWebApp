import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { SxProps } from '@mui/system';

type RadioButtonProps = {
  name: string;
  // Type `any` is intentional here based on the type definition of the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  rules?: RegisterOptions;
  options: Array<{ label: React.ReactNode; value: string | boolean }>;
  defaultValue: string | boolean;
  sx?: SxProps;
  disabled?: boolean;
  row?: boolean;
  value?: string | boolean;
};
export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  control,
  rules,
  sx,
  defaultValue,
  options,
  disabled = false,
  row = false,
  value,
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => {
      return (
        <RadioGroup row={row} defaultValue={defaultValue} value={value}>
          {options.map((op) => (
            <FormControlLabel
              {...field}
              className="customStyleFormControlLabel"
              key={op.value.toString()}
              value={op.value}
              control={<Radio />}
              label={op.label}
              disabled={disabled}
              sx={sx}
            />
          ))}
        </RadioGroup>
      );
    }}
  />
);

export default RadioButton;
