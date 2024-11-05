import React from 'react';
import { FiX } from 'react-icons/fi';
import { FADED_BLACK, WHITE } from 'src/constants/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import { SxProps } from '@mui/material/styles';

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
  sx,
}) => {
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function clearInputHandler() {
    onChange('');
  }

  return (
    <OutlinedInput
      sx={{
        width: '378px',
        padding: '8px 12px 8px 0px',
        height: '40px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        '& input::placeholder': {
          color: FADED_BLACK,
          fontSize: '16px',
          fontWeight: 400,
          opacity: 1,
          padding: '-10px',
        },
        marginRight: '15px',
        background: WHITE,
        ...sx,
      }}
      value={value}
      onChange={onInputChange}
      placeholder={placeholder}
      endAdornment={
        value ? (
          <FiX
            onClick={clearInputHandler}
            color={FADED_BLACK}
            cursor="pointer"
            size={18}
          />
        ) : null
      }
    />
  );
};
export default SearchInput;
