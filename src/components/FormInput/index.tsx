import React, { useId, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  ERROR_RED,
  FADED_BLACK,
  LIGHT_BORDER,
  PRIMARY_BLUE,
} from 'src/constants/colors';
import { Button, ToggleSwitch } from 'src/components';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Select from './Select';
import { FormInputProps } from './types';

const styles = {
  textField: {
    borderRadius: '4px',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
  },
};

export const FormInput = ({
  name,
  control,
  label = '',
  placeholder,
  title,
  rules,
  type,
  radioButtonProps,
  radioDefaultValue,
  textFieldProps,
  error,
  sx,
  menuItems,
  disabled,
  rows,
  helperText,
  buttonText,
  multiple,
  multiline,
  inputProps,
  trim = false,
  autoSelectSingleOption = true,
  showNeverExpireSwitch = false,
  onNeverExpireChange,
  neverExpireValue,
}: FormInputProps) => {
  const id = useId();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { getValues, setValue } = useFormContext() ?? {};

  return (
    <>
      {title && <Box className="text-auro-metal fixed-fs-14 mb-2">{title}</Box>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          if (type === 'radio' && radioButtonProps) {
            const { defaultValue, options, value } = radioButtonProps;

            return (
              <RadioGroup
                aria-labelledby={radioButtonProps['aria-labelledby']}
                defaultValue={defaultValue}
                value={value}
                row
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                {options.map((op, index) => (
                  <FormControlLabel
                    {...field}
                    className="customStyleFormControlLabel"
                    key={op.value.toString()}
                    value={op.value}
                    control={
                      radioDefaultValue ? (
                        <Radio checked={radioDefaultValue === op.value} />
                      ) : (
                        <Radio />
                      )
                    }
                    label={op.label}
                    disabled={disabled}
                    sx={{
                      border: `1px solid ${LIGHT_BORDER}`,
                      borderRadius: '4px',
                      padding: '10px',
                      marginRight: index === options.length - 1 ? 0 : '20px',
                      flexGrow: '1',
                      marginLeft: 0,
                      ...sx,
                    }}
                  />
                ))}
              </RadioGroup>
            );
          } else if (type === 'select') {
            return (
              <Select
                name={name}
                sx={sx}
                field={field}
                id={`regrow-select-box-${id}`}
                label={label}
                error={error}
                multiple={multiple}
                disabled={disabled}
                menuItems={menuItems ?? []}
                key={field.value}
                autoSelectSingleOption={autoSelectSingleOption}
              />
            );
          } else if (type === 'checkbox') {
            return (
              <FormControl>
                <FormControlLabel
                  sx={sx}
                  control={
                    <Checkbox
                      size="medium"
                      {...field}
                      checked={field.value}
                    ></Checkbox>
                  }
                  label={label}
                />
              </FormControl>
            );
          } else if (type === 'file') {
            const selectedFile = getValues(name);
            const { name: fileName = '' } = selectedFile ?? {};

            const clickInput = (): void => {
              inputFileRef.current?.click();
            };

            const selectFile = (e: React.SyntheticEvent) => {
              const target = (e.target as HTMLInputElement).files?.[0];

              if (target) {
                setValue?.(name, target, { shouldDirty: true });
              }
            };

            const removeFile = () => {
              setValue?.(name, '');
              if (inputFileRef.current) {
                inputFileRef.current.value = '';
              }
            };

            return (
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <TextField
                  {...field}
                  inputProps={{ readOnly: true }}
                  variant="outlined"
                  sx={{
                    ...styles.textField,
                    flexGrow: 1,
                    ...sx,
                  }}
                  label={label}
                  helperText={
                    error ? (
                      <Box sx={{ color: ERROR_RED }}>{error}</Box>
                    ) : (
                      <>
                        {!fileName && <Box component="span">{helperText}</Box>}
                        <Box
                          component="span"
                          sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            cursor: 'pointer',
                          }}
                        >
                          {fileName && (
                            <Button
                              variant="text"
                              sx={{
                                display: 'flex',
                                color: PRIMARY_BLUE,
                                fontSize: 12,
                                padding: 0,
                                height: 'auto',
                              }}
                              onClick={(evt) => {
                                evt.stopPropagation();
                                removeFile();
                              }}
                            >
                              <ClearIcon sx={{ fontSize: 20, margin: 0 }} />
                              Remove file
                            </Button>
                          )}
                        </Box>
                      </>
                    )
                  }
                  onClick={clickInput}
                  value={fileName}
                  placeholder={placeholder}
                />
                <Button
                  variant="outlined"
                  sx={{ height: '51px', minWidth: '172px' }}
                  onClick={clickInput}
                >
                  {buttonText}
                </Button>

                <input
                  type="file"
                  style={{ display: 'none' }}
                  ref={inputFileRef}
                  onChange={(e) => {
                    selectFile(e);
                  }}
                />
              </Stack>
            );
          }

          const customOnChange = async (
            evt: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const target = evt.target;

            if (trim && typeof target.value === 'string' && target.value) {
              target.value = target.value.trim();
            }

            if (neverExpireValue) {
              field.onChange('Never');
              return;
            }

            field.onChange(evt);
          };

          return (
            <Stack gap={1} width="100%">
              {type === 'date' && showNeverExpireSwitch && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.5}
                  justifyContent="flex-end"
                >
                  <Typography>Never Expire</Typography>
                  <ToggleSwitch
                    type="AntSwitch"
                    checked={neverExpireValue}
                    onChange={(_, checked) => {
                      if (onNeverExpireChange) {
                        onNeverExpireChange(checked);
                      }
                    }}
                  />
                </Stack>
              )}
              <TextField
                {...field}
                onChange={customOnChange}
                variant="outlined"
                label={label}
                placeholder={placeholder}
                InputLabelProps={{ sx: { color: FADED_BLACK } }}
                type={type}
                disabled={disabled}
                rows={rows}
                multiline={multiline}
                inputProps={{
                  style: { cursor: disabled ? 'not-allowed' : 'text' },
                  ...inputProps,
                }}
                sx={{
                  ...styles.textField,
                  width: '100%',
                  ...sx,
                }}
                error={!!error}
                helperText={error}
                {...textFieldProps}
              />
            </Stack>
          );
        }}
      />
    </>
  );
};

export default FormInput;
