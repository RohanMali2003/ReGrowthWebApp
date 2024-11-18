import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const LoginForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLoginPayload>();

  return (
      <Stack spacing={4.5}>
        <FormInput
          name="username"
          label="User Name"
          control={control}
          placeholder="Enter User Name Here"
          error={errors.username?.message}
          trim
        />
        <FormInput
          name="password"
          type='password'
          label="Password"
          control={control}
          placeholder="Enter password here"
          error={errors.password?.message}
          trim
        />
      </Stack>
  );
};

export default LoginForm;
