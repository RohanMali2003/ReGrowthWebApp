import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const SupplierForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateSupplierPayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="supplierName"
        label="Supplier Name"
        control={control}
        placeholder="Enter supplier name"
        error={errors.supplierName?.message}
        trim
      />
       <FormInput
        name="supplierAddress"
        label="Supplier Address"
        control={control}
        placeholder="Enter supplier address"
        error={errors.supplierAddress?.message}
        multiline
        rows={4}
        trim
      />
      <FormInput
        name="supplierMobile"
        label="Supplier Mobile"
        control={control}  
        placeholder="Enter supplier contact number"
        error={errors.supplierMobile?.message}
        trim
      />
    </Stack>
  );
};

export default SupplierForm;
