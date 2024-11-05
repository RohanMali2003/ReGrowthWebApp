import { Control, RegisterOptions } from 'react-hook-form';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { TextFieldProps } from '@mui/material/TextField';
import { SxProps } from '@mui/system/styleFunctionSx';

export type RadioButtonProps = {
  options: Array<{ label: React.ReactNode; value: string | boolean }>;
  'aria-labelledby': string;
  defaultValue?: string | boolean;
  value?: string | boolean;
};

export type FormInputProps = {
  name: string;
  // Type `any` is intentional here based on the type definition of the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: React.ReactNode;
  placeholder?: string;
  title?: string;
  error?: string;
  rules?: RegisterOptions;
  type?: React.InputHTMLAttributes<unknown>['type'];
  radioButtonProps?: RadioButtonProps;
  radioDefaultValue?: string;
  textFieldProps?: TextFieldProps;
  sx?: SxProps;
  menuItems?: SelectBoxType[];
  disabled?: boolean;
  rows?: number;
  helperText?: string;
  buttonText?: string;
  multiple?: boolean;
  multiline?: boolean;
  inputProps?: InputBaseComponentProps;
  autoSelectSingleOption?: boolean;
  /**
   * If true, the input value will be trimmed and remove whitespace
   */
  trim?: boolean;
  showNeverExpireSwitch?: boolean;
  onNeverExpireChange?: (value: boolean) => void;
  neverExpireValue?: boolean;
  disablePastTime?: boolean;
};
