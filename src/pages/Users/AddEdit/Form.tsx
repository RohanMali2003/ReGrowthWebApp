import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { userRoleProps } from '../constants';

const UserForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserPayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="username"
        label="User Name"
        control={control}
        placeholder="Enter user name"
        error={errors.username?.message}
        trim
      />
      <FormInput
        name="password"
        type="password"
        label="Password"
        control={control}
        placeholder="Enter user password"
        error={errors.password?.message}
        trim
      />
      <FormInput
        name="mobileNumber"
        label="Contact Number"
        control={control}
        placeholder="Enter users's contact number"
        error={errors.mobileNumber?.message}
        trim
      />
      <FormInput
        name="role"
        label="Role"
        type="select"
        menuItems={userRoleProps}
        control={control}
        placeholder="Enter user's role"
        error={errors.role?.message}
        trim
      />
    </Stack>
  );
};

export default UserForm;
